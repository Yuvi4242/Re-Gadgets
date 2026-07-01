import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.GMAIL_USER || 'noreply@re-gadgets.com',
    to,
    subject,
    html
  };

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return await transporter.sendMail(mailOptions);
  } else {
    console.log('DEV MODE: Email not sent. Content:', html);
    return null;
  }
};
