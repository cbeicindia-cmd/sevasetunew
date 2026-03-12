const otpStore = new Map();

const generateOtp = () => `${Math.floor(100000 + Math.random() * 900000)}`;

async function sendOtp(mobile) {
  const otp = generateOtp();
  otpStore.set(mobile, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });
  // Integrate SMS API here (provider specific).
  return { message: 'OTP sent', otpForDev: otp };
}

function verifyOtp(mobile, otp) {
  const data = otpStore.get(mobile);
  if (!data || data.expiresAt < Date.now() || data.otp !== otp) return false;
  otpStore.delete(mobile);
  return true;
}

module.exports = { sendOtp, verifyOtp };
