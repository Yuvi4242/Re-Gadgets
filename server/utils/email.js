import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER || 'noreply@re-gadgets.com',
    to,
    subject,
    text
  };

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return await transporter.sendMail(mailOptions);
  } else {
    console.log('DEV MODE: Email not sent. Content:', text);
    return null;
  }
};
