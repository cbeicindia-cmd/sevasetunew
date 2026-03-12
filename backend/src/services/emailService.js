import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: false,
  auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
});

export async function sendEmail({ to, subject, html, attachments = [] }) {
  if (!env.smtp.host) {
    console.log(`[MOCK EMAIL] ${to}: ${subject}`);
    return;
  }

  await transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html,
    attachments
  });
}
