import axios from 'axios';
import { env } from '../config/env.js';

export async function sendSmsOtp(mobile, otp) {
  if (!env.sms.apiUrl) {
    console.log(`[MOCK SMS] OTP ${otp} sent to ${mobile}`);
    return;
  }

  await axios.post(
    env.sms.apiUrl,
    { mobile, message: `Your SEVA SETU KENDRA OTP is ${otp}` },
    { headers: { Authorization: `Bearer ${env.sms.apiKey}` } }
  );
}
