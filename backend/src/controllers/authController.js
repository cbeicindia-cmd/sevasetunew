const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const db = require('../config/db');
const { sendOtp, verifyOtp } = require('../services/otpService');

const citizenSchema = Joi.object({
  name: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email().required(),
  state: Joi.string().required(),
  district: Joi.string().required(),
  password: Joi.string().min(6).required(),
  otp: Joi.string().required(),
});

async function requestOtp(req, res) {
  const { mobile } = req.body;
  const result = await sendOtp(mobile);
  res.json(result);
}

async function registerCitizen(req, res) {
  const { error } = citizenSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { name, mobile, email, state, district, password, otp } = req.body;
  if (!verifyOtp(mobile, otp)) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (name,mobile,email,state,district,password_hash,role,status)
     VALUES ($1,$2,$3,$4,$5,$6,'citizen','approved') RETURNING id,role,email,name`,
    [name, mobile, email, state, district, hash]
  );

  const token = jwt.sign(result.rows[0], process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({ token, user: result.rows[0] });
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, user: { id: user.id, role: user.role, name: user.name } });
}

module.exports = { requestOtp, registerCitizen, login };
