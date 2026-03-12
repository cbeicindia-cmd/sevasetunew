import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendMailWithAttachment = async ({ to, subject, text, attachmentPath }) => {
  const attachments = attachmentPath
    ? [{ filename: path.basename(attachmentPath), content: fs.createReadStream(attachmentPath) }]
    : [];

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    attachments
  });
};
