import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public signup flow
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/create-password', authController.createPassword);

// Public login
router.post('/login', authController.login);

// Protected routes
router.post('/complete-profile', protect, authController.completeProfile);
router.get('/me', protect, authController.getMe);

export default router;
