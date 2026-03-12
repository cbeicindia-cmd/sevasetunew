const Joi = require('joi');
const db = require('../config/db');
const { sendMail } = require('../services/emailService');
const { generateAgentReceipt } = require('../utils/pdf');

const schema = Joi.object({
  fullName: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email().required(),
  aadharNumber: Joi.string().required(),
  panNumber: Joi.string().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  education: Joi.string().required(),
  experience: Joi.string().allow('').required(),
});

async function registerAgent(req, res) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const payload = req.body;
  const result = await db.query(
    `INSERT INTO agents (full_name,mobile,email,aadhar_number,pan_number,state,district,address,education,experience,status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending') RETURNING id`,
    [
      payload.fullName,
      payload.mobile,
      payload.email,
      payload.aadharNumber,
      payload.panNumber,
      payload.state,
      payload.district,
      payload.address,
      payload.education,
      payload.experience,
    ]
  );

  const pdf = await generateAgentReceipt(payload);
  await sendMail({
    to: payload.email,
    subject: 'Agent Registration Request Received - SEVA SETU KENDRA',
    text: 'Your registration request has been received and is under admin review.',
    attachments: [{ filename: 'registration-receipt.pdf', content: pdf }],
  });

  res.status(201).json({ message: 'Agent registration submitted', id: result.rows[0].id });
}

async function listAgents(req, res) {
  const result = await db.query('SELECT * FROM agents ORDER BY created_at DESC');
  res.json(result.rows);
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const { status, remarks } = req.body;
  await db.query('UPDATE agents SET status=$1, remarks=$2 WHERE id=$3', [status, remarks || '', id]);
  res.json({ message: 'Agent status updated' });
}

module.exports = { registerAgent, listAgents, updateStatus };
