import express from 'express';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import { query } from '../config/db.js';
import { signToken } from '../config/auth.js';
import { validate } from '../middleware/validate.js';
import { sendOtp, verifyOtp } from '../services/otpService.js';
import { createAgentAcknowledgementPdf } from '../services/pdfService.js';
import { sendMailWithAttachment } from '../services/emailService.js';

const router = express.Router();

router.post('/otp/send', [body('mobile').isLength({ min: 10 })], validate, async (req, res) => {
  const result = await sendOtp(req.body.mobile);
  res.json({ message: 'OTP sent', ...result });
});

router.post('/otp/verify', [body('mobile').notEmpty(), body('otp').isLength({ min: 6, max: 6 })], validate, async (req, res) => {
  const valid = await verifyOtp(req.body.mobile, req.body.otp);
  res.json({ verified: valid });
});

router.post('/register/citizen', [
  body('name').notEmpty(),
  body('mobile').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('state').notEmpty(),
  body('district').notEmpty()
], validate, async (req, res) => {
  const { name, mobile, email, password, state, district } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO users (name, mobile, email, password_hash, role, state, district, status)
     VALUES ($1,$2,$3,$4,'citizen',$5,$6,'approved')
     RETURNING id, name, email, role`,
    [name, mobile, email, hash, state, district]
  );
  res.status(201).json(rows[0]);
});

router.post('/register/agent', [
  body('full_name').notEmpty(),
  body('mobile').notEmpty(),
  body('email').isEmail(),
  body('aadhar_number').notEmpty(),
  body('pan_number').notEmpty(),
  body('state').notEmpty(),
  body('district').notEmpty(),
  body('address').notEmpty(),
  body('education').notEmpty(),
  body('experience').notEmpty()
], validate, async (req, res) => {
  const payload = req.body;
  const { rows } = await query(
    `INSERT INTO agent_applications
    (full_name,mobile,email,aadhar_number,pan_number,state,district,address,education,experience,document_urls,status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending') RETURNING *`,
    [payload.full_name, payload.mobile, payload.email, payload.aadhar_number, payload.pan_number, payload.state, payload.district, payload.address, payload.education, payload.experience, payload.document_urls || []]
  );

  const pdf = await createAgentAcknowledgementPdf({ name: payload.full_name, email: payload.email });
  await sendMailWithAttachment({
    to: payload.email,
    subject: 'SEVA SETU KENDRA - Agent Request Received',
    text: 'Your registration request has been received and is under review.',
    attachmentPath: pdf
  });

  res.status(201).json({ message: 'Agent request submitted', application: rows[0] });
});

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

export default router;
