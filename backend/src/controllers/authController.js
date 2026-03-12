import bcrypt from 'bcryptjs';
import { Role, UserStatus } from '@prisma/client';
import { prisma } from '../config/db.js';
import { generateOtp, getOtpExpiry } from '../utils/otp.js';
import { signToken } from '../utils/jwt.js';
import { sendSmsOtp } from '../services/smsService.js';
import { sendEmail } from '../services/emailService.js';
import { generateAgentAcknowledgementPdf } from '../services/pdfService.js';

export async function requestOtp(req, res) {
  const { mobile } = req.body;
  const otp = generateOtp();
  const otpExpiresAt = getOtpExpiry();

  await prisma.user.upsert({
    where: { mobile },
    update: { otpCode: otp, otpExpiresAt },
    create: {
      fullName: `User ${mobile}`,
      mobile,
      email: `${mobile}@placeholder.local`,
      passwordHash: await bcrypt.hash('Temp@123', 10),
      role: Role.CITIZEN,
      status: UserStatus.PENDING,
      otpCode: otp,
      otpExpiresAt
    }
  });

  await sendSmsOtp(mobile, otp);
  res.json({ message: 'OTP sent successfully' });
}

export async function verifyOtp(req, res) {
  const { mobile, otp } = req.body;
  const user = await prisma.user.findUnique({ where: { mobile } });
  if (!user || user.otpCode !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { otpVerified: true, otpCode: null, otpExpiresAt: null }
  });

  res.json({ message: 'OTP verified' });
}

export async function register(req, res) {
  const { fullName, mobile, email, password, role = 'CITIZEN', ...profile } = req.body;
  const existing = await prisma.user.findFirst({ where: { OR: [{ mobile }, { email }] } });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const isAgent = role === 'AGENT';
  const user = await prisma.user.create({
    data: {
      fullName,
      mobile,
      email,
      passwordHash,
      role,
      status: isAgent ? UserStatus.PENDING : UserStatus.ACTIVE,
      ...profile
    }
  });

  if (isAgent) {
    const pdf = await generateAgentAcknowledgementPdf(fullName);
    await sendEmail({
      to: email,
      subject: 'SEVA SETU KENDRA - Agent Registration Received',
      html: '<p>Your registration request has been received and is under review.</p>',
      attachments: [{ filename: 'Agent-Registration-Acknowledgement.pdf', content: pdf }]
    });
  }

  res.status(201).json({ id: user.id, message: 'Registration successful' });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.role === 'AGENT' && user.status !== 'APPROVED') {
    return res.status(403).json({ message: 'Agent pending approval' });
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  res.json({ token, role: user.role, name: user.fullName });
}
