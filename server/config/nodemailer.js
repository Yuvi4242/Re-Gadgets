import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import OTP from '../models/otpModel.js';

dotenv.config();

/**
 * For Gmail setup:
 * 1. Enable 2-Factor Authentication (2FA) in your Google Account.
 * 2. Go to Google Account Settings -> Security -> App Passwords.
 * 3. Generate a new "App Password" for "Mail".
 * 4. Use this 16-character password as GMAIL_APP_PASSWORD in your .env file.
 */

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use host/port for generic SMTP
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"ReGadget Support" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Your ReGadget Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333 text-align: center;">Welcome to ReGadget!</h2>
          <p style="font-size: 16px; color: #555 text-align: center;">Use the code below to verify your email address. It is valid for 5 minutes.</p>
          <div style="background-color: #f0f0f0; margin: 30px 0; padding: 20px; text-align: center; border-radius: 5px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #7c3aed;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #888 text-align: center;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #aaa text-align: center;">&copy; ${new Date().getFullYear()} ReGadget - Gadget Repair Marketplace</p>
        </div>
      </div>
    `,
  };

  // Before sending, delete old OTP for this email
  await OTP.deleteMany({ email: toEmail });

  // Save new OTP
  await OTP.create({ email: toEmail, otp });

  // Send email
  return transporter.sendMail(mailOptions);
};

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"ReGadget Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html
  };

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return await transporter.sendMail(mailOptions);
  } else {
    console.error('Email service not configured. Missing GMAIL_USER or GMAIL_APP_PASSWORD');
    return null;
  }
};
