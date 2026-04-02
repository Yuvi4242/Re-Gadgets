import { sendEmail } from '../config/nodemailer.js';

export const sendOtpEmail = async (email, otp) => {
  const subject = 'Your Verification Code - Re-Gadgets';
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
      <h2 style="color: #58a6ff; text-align: center;">Re-Gadgets Verification</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Please use the following OTP to verify your email. It is valid for 5 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; background-color: #161b22; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: white;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #8b949e;">Do not share this code with anyone.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

export const sendWelcomeEmail = async (email, role) => {
  const subject = 'Welcome to Re-Gadgets!';
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
      <h2 style="color: #58a6ff; text-align: center;">Welcome Aboard!</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Your profile as a <strong style="color: white; text-transform: capitalize;">${role}</strong> has been completed successfully.</p>
      <p style="font-size: 16px;">Log in to your dashboard to start using the platform.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

export const sendPasswordResetEmail = async (email, otp) => {
  const subject = 'Password Reset OTP - Re-Gadgets';
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto;">
      <h2 style="color: #ff7b72; text-align: center;">Password Reset Request</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">We received a request to reset your password. Use the following OTP to proceed. It is valid for 5 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; background-color: #161b22; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #ff7b72;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #8b949e;">If you did not request a password reset, please ignore this email.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};
