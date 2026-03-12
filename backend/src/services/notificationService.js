const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail({ to, subject, html, attachments = [] }) {
  return transporter.sendMail({
    from: 'SEVA SETU KENDRA <noreply@sevasetu.local>',
    to,
    subject,
    html,
    attachments
  });
}

async function sendSmsOtp(mobile, otp) {
  // Integrate with provider in production; fallback logs for local environments.
  if (!process.env.SMS_API_URL || process.env.SMS_API_URL.includes('example')) {
    console.log(`OTP for ${mobile}: ${otp}`);
    return { status: 'mocked' };
  }

  return fetch(process.env.SMS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SMS_API_KEY}`
    },
    body: JSON.stringify({ to: mobile, message: `Your SEVA SETU KENDRA OTP is ${otp}` })
  });
}

module.exports = { sendEmail, sendSmsOtp };
