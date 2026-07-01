import { sendEmail } from '../utils/email.js';

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

export const sendPasswordResetEmail = async (email, resetLink) => {
  const subject = 'Password Reset Request - Re-Gadgets';
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
      <h2 style="color: #ff7b72; text-align: center;">Password Reset Request</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">We received a request to reset your password. Click the button below to proceed. This link is valid for 1 hour.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #ff7b72; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; transition: background-color 0.3s;">Reset Password</a>
      </div>
      <p style="font-size: 14px; color: #8b949e; text-align: center;">Or copy this link if the button above doesn't work:</p>
      <p style="font-size: 12px; color: #58a6ff; text-align: center; word-break: break-all;">${resetLink}</p>
      <p style="font-size: 14px; color: #8b949e; margin-top: 20px;">If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};
