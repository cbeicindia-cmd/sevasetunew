const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const db = require('../config/db');
const { sendSmsOtp, sendEmail } = require('../services/notificationService');
const { generateAgentReceiptPdf } = require('../services/pdfService');

const router = express.Router();

router.post('/otp/send', async (req, res) => {
  const schema = z.object({ mobile: z.string().min(10).max(15) });
  const { mobile } = schema.parse(req.body);
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await db.query('INSERT INTO otp_verifications (mobile, otp_code, expires_at) VALUES ($1, $2, $3)', [mobile, otp, expiresAt]);
  await sendSmsOtp(mobile, otp);
  return res.json({ message: 'OTP sent successfully' });
});

router.post('/otp/verify', async (req, res) => {
  const schema = z.object({ mobile: z.string(), otp: z.string().length(6) });
  const { mobile, otp } = schema.parse(req.body);

  const result = await db.query(
    `UPDATE otp_verifications
     SET is_verified = true
     WHERE id = (
       SELECT id FROM otp_verifications
       WHERE mobile = $1 AND otp_code = $2 AND expires_at > NOW() AND is_verified = false
       ORDER BY created_at DESC LIMIT 1
     )
     RETURNING id`,
    [mobile, otp]
  );

  return result.rowCount ? res.json({ verified: true }) : res.status(400).json({ verified: false });
});

router.post('/register/agent', async (req, res) => {
  const schema = z.object({
    fullName: z.string(),
    mobile: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    aadharNumber: z.string(),
    panNumber: z.string(),
    state: z.string(),
    district: z.string(),
    address: z.string(),
    education: z.string(),
    experience: z.string().optional()
  });

  const data = schema.parse(req.body);
  const hash = await bcrypt.hash(data.password, 10);
  const user = await db.query(
    `INSERT INTO users (full_name, mobile, email, password_hash, role, state, district, is_mobile_verified)
     VALUES ($1,$2,$3,$4,'agent',$5,$6,true) RETURNING id`,
    [data.fullName, data.mobile, data.email, hash, data.state, data.district]
  );

  await db.query(
    `INSERT INTO agents (user_id, aadhar_number, pan_number, address, education, experience)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [user.rows[0].id, data.aadharNumber, data.panNumber, data.address, data.education, data.experience || '']
  );

  const pdf = await generateAgentReceiptPdf(data.fullName);
  await sendEmail({
    to: data.email,
    subject: 'SEVA SETU KENDRA - Registration Received',
    html: '<p>Your agent registration request is received and under review.</p>',
    attachments: [{ filename: 'agent-registration-receipt.pdf', content: pdf }]
  });

  return res.status(201).json({ message: 'Agent registration submitted' });
});

router.post('/register/citizen', async (req, res) => {
  const schema = z.object({
    fullName: z.string(),
    mobile: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    state: z.string(),
    district: z.string()
  });
  const data = schema.parse(req.body);
  const hash = await bcrypt.hash(data.password, 10);
  const user = await db.query(
    `INSERT INTO users (full_name, mobile, email, password_hash, role, state, district, is_mobile_verified)
     VALUES ($1,$2,$3,$4,'citizen',$5,$6,true) RETURNING id`,
    [data.fullName, data.mobile, data.email, hash, data.state, data.district]
  );
  await db.query('INSERT INTO citizens (user_id) VALUES ($1)', [user.rows[0].id]);
  return res.status(201).json({ message: 'Citizen registered' });
});

router.post('/login', async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string() });
  const { email, password } = schema.parse(req.body);
  const result = await db.query('SELECT id, full_name, email, password_hash, role FROM users WHERE email = $1', [email]);

  if (!result.rowCount || !(await bcrypt.compare(password, result.rows[0].password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, role: user.role, fullName: user.full_name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token, role: user.role, fullName: user.full_name });
});

module.exports = router;
