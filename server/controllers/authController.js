import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../config/nodemailer.js';
import User from '../models/userModel.js';
import { sendPasswordResetEmail } from '../services/email.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { OAuth2Client } from 'google-auth-library';
import CustomerProfile from '../models/customerProfileModel.js';
import TechnicianProfile from '../models/technicianProfileModel.js';
import ShopOwnerProfile from '../models/shopOwnerProfileModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  });
};

const signRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  });
};

export const register = asyncHandler(async (req, res, next) => {
  let { name, email, password, role } = req.body;
  email = email.toLowerCase().trim();

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  if (!['customer', 'technician', 'shopOwner'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const user = await User.create({
    name: name.trim(),
    email,
    password,
    role,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000, // 10 mins
  });

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error('Email error:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Registration successful. OTP sent to email.',
    email: user.email
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (user.isVerified) {
    return res.status(400).json({ success: false, message: 'Email is already verified' });
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Email verified successfully. You can now log in.',
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  if (!user.isVerified) {
    return res.status(403).json({ success: false, message: 'Please verify your email before logging in' });
  }

  const accessToken = signAccessToken(user._id, user.role);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set HTTP-only cookie for refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

    res.status(200).json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    },
  });
});

export const googleLogin = asyncHandler(async (req, res, next) => {
  const { credential, role } = req.body; // client must send token and optional role if new user

  if (!credential) {
    return res.status(400).json({ success: false, message: 'Please provide Google credential token' });
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const email = payload.email.toLowerCase().trim();

  let user = await User.findOne({ email });

  if (!user) {
    const assignedRole = role && ['customer', 'technician', 'shopOwner'].includes(role) ? role : 'customer';
    
    // Create new user
    user = await User.create({
      name: payload.name,
      email: email,
      password: crypto.randomBytes(20).toString('hex'), // Random password for google users
      role: assignedRole,
      isVerified: true, // Google emails are already verified
      profileImage: payload.picture,
    });
  } else if (!user.isVerified) {
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
  }

  const accessToken = signAccessToken(user._id, user.role);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      profileImage: user.profileImage,
    },
  });
});

export const refresh = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user._id.toString() !== decoded.userId) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const accessToken = signAccessToken(user._id, user.role);
    res.json({ success: true, accessToken });
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // No content
  }

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide email' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

  await user.save({ validateBeforeSave: false });

  try {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);
  } catch (err) {
    console.error('Password reset email error:', err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ success: false, message: 'Failed to send reset email: ' + err.message });
  }

  res.status(200).json({ success: true, message: 'Reset link sent to your email' });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: 'Please provide token and new password' });
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Token is invalid or has expired' });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save(); 

  res.status(200).json({ success: true, message: 'Password has been reset successfully' });
});

export const getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isProfileComplete: req.user.isProfileComplete,
    },
  });
});

export const completeProfile = asyncHandler(async (req, res, next) => {
  const { skip, phone, address, city, pincode, skills, experienceYears, serviceCity, idProof, bio, shopName, gstNumber, shopCategory, openingHours } = req.body;
  const user = req.user;

  if (!skip) {
    if (user.role === 'customer') {
      await CustomerProfile.create({ userId: user._id, phone, address, city, pincode });
    } else if (user.role === 'technician') {
      await TechnicianProfile.create({ userId: user._id, phone, skills, experienceYears, serviceCity, pincode, idProof, bio });
    } else if (user.role === 'shopOwner') {
      await ShopOwnerProfile.create({ userId: user._id, shopName, phone, address, city, pincode, gstNumber, shopCategory, openingHours });
    }
  }

  user.isProfileComplete = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: skip ? 'Profile setup skipped' : 'Profile completed successfully' });
});
