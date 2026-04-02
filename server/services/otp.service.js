import bcrypt from 'bcryptjs';
import { generateOTP } from '../utils/generateOTP.js';
import OTP from '../models/OTP.js';

export const createAndSaveOTP = async (email, purpose) => {
  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 12);

  // Delete existing OTP for this email and purpose
  await OTP.deleteMany({ email, purpose });

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins TTL

  await OTP.create({
    email,
    otp: hashedOtp,
    purpose,
    expiresAt,
  });

  return otp; // Return plaintext to send in email
};

export const verifyOTP = async (email, otp, purpose) => {
  const otpDoc = await OTP.findOne({ email, purpose });
  
  if (!otpDoc) throw new Error('OTP not found or already used');
  if (otpDoc.expiresAt < Date.now()) {
    await OTP.deleteOne({ _id: otpDoc._id });
    throw new Error('OTP expired, request a new one');
  }

  const isValid = await bcrypt.compare(otp, otpDoc.otp);
  if (!isValid) throw new Error('Invalid OTP');

  // If valid, delete it
  await OTP.deleteOne({ _id: otpDoc._id });
  return true;
};
