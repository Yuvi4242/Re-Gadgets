import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import OTP from '../models/otpModel.js';
import CustomerProfile from '../models/customerProfileModel.js';
import TechnicianProfile from '../models/technicianProfileModel.js';
import ShopOwnerProfile from '../models/shopOwnerProfileModel.js';
import { sendOTPEmail } from '../config/nodemailer.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const signToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn || process.env.ACCESS_TOKEN_EXPIRY,
  });
};

// --- SIGNUP FLOW ---

// STEP 1: Send OTP
export const sendOTP = asyncHandler(async (req, res, next) => {
  let { name, email, role } = req.body;
  email = email.toLowerCase().trim();

  if (!name || !email || !role) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and role' });
  }

  if (!['customer', 'technician', 'shopOwner'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOTPEmail(email, otp);

  const tempToken = signToken({ name, email, role, step: 'otp_sent' }, '10m');

  res.status(200).json({
    success: true,
    message: 'OTP sent to your email',
    tempToken,
  });
});

// STEP 2: Verify OTP
export const verifyOTP = asyncHandler(async (req, res, next) => {
  const { tempToken } = req.body;
  const otp = req.body.otp?.toString();

  if (!tempToken || !otp) {
    return res.status(400).json({ success: false, message: 'Please provide tempToken and OTP' });
  }

  const decoded = jwt.verify(tempToken, process.env.ACCESS_TOKEN_SECRET);
  const email = decoded.email.toLowerCase().trim();

  if (decoded.step !== 'otp_sent') {
    return res.status(400).json({ success: false, message: 'Invalid signup step' });
  }

  const otpDoc = await OTP.findOne({ email, otp });
  if (!otpDoc) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  await OTP.deleteOne({ _id: otpDoc._id });

  const nextTempToken = signToken(
    { name: decoded.name, email: decoded.email, role: decoded.role, step: 'otp_verified' },
    '10m'
  );

  res.status(200).json({
    success: true,
    message: 'OTP verified',
    tempToken: nextTempToken,
  });
});

// STEP 3: Create Password
export const createPassword = asyncHandler(async (req, res, next) => {
  const { tempToken, password, confirmPassword } = req.body;

  if (!tempToken || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const decoded = jwt.verify(tempToken, process.env.ACCESS_TOKEN_SECRET);
  const email = decoded.email.toLowerCase().trim();

  if (decoded.step !== 'otp_verified') {
    return res.status(400).json({ success: false, message: 'Invalid signup step' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  // Password validation: min 8 chars, 1 upper, 1 number, 1 special
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character',
    });
  }

  const user = await User.create({
    name: decoded.name.trim(),
    email,
    password,
    role: decoded.role,
    isVerified: true,
  });

  const token = signToken({ userId: user._id, role: user.role });

  res.status(201).json({
    success: true,
    message: 'Account created',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: false,
    },
  });
});

// --- LOGIN ---
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = signToken({ userId: user._id, role: user.role });

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    },
  });
});

// --- PROFILE COMPLETION ---
export const completeProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const role = req.user.role;

  let profile;
  if (role === 'customer') {
    profile = await CustomerProfile.create({ ...req.body, userId });
  } else if (role === 'technician') {
    profile = await TechnicianProfile.create({ ...req.body, userId });
  } else if (role === 'shopOwner') {
    profile = await ShopOwnerProfile.create({ ...req.body, userId });
  }

  await User.findByIdAndUpdate(userId, { isProfileComplete: true });

  res.status(200).json({
    success: true,
    message: 'Profile complete',
    redirectTo: `/dashboard/${role}`,
  });
});

// --- RESEND OTP ---
export const resendOTP = asyncHandler(async (req, res, next) => {
  const { tempToken } = req.body;

  if (!tempToken) {
    return res.status(400).json({ success: false, message: 'tempToken is required' });
  }

  const decoded = jwt.verify(tempToken, process.env.ACCESS_TOKEN_SECRET);
  const email = decoded.email.toLowerCase().trim();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOTPEmail(email, otp);

  res.status(200).json({
    success: true,
    message: 'New OTP sent',
  });
});

// --- GET ME ---
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
