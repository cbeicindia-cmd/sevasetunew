const otpStore = new Map();

export const sendOtp = async (mobile) => {
  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  if (process.env.SMS_API_URL && process.env.SMS_API_KEY) {
    // Replace with actual SMS API integration payload format.
    console.log(`SMS OTP sent to ${mobile}: ${otp}`);
  }

  return { mobile, otpPreview: otp };
};

export const verifyOtp = async (mobile, otp) => {
  const record = otpStore.get(mobile);
  if (!record || record.expiresAt < Date.now() || record.otp !== otp) {
    return false;
  }
  otpStore.delete(mobile);
  return true;
};
