import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { uploadIdProof } from '../middleware/uploadMiddleware.js';
import {
  signupValidator,
  loginValidator,
  verifyOtpValidator,
  emailValidator,
  resetPasswordValidator,
  validateResult,
} from '../validators/auth.validator.js';
import {
  customerProfileValidator,
  shopOwnerProfileValidator,
  technicianProfileValidator,
} from '../validators/profile.validator.js';

const router = express.Router();

// Role-aware profile validation (skip when body.skip is true)
const completeProfileValidation = (req, res, next) => {
  if (req.body.skip === true || req.body.skip === 'true') {
    return next();
  }
  const role = req.user?.role;
  let validators = [];
  if (role === 'customer') validators = customerProfileValidator;
  else if (role === 'shopOwner') validators = shopOwnerProfileValidator;
  else if (role === 'technician') validators = technicianProfileValidator;

  if (validators.length === 0) return next();

  Promise.all(validators.map((v) => v.run(req))).then(() => validateResult(req, res, next));
};

router.post('/register', authLimiter, signupValidator, validateResult, authController.register);
router.post('/verify-email', verifyOtpValidator, validateResult, authController.verifyEmail);
router.post('/login', authLimiter, loginValidator, validateResult, authController.login);
router.post('/google', authController.googleLogin);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/forgot-password', emailValidator, validateResult, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, validateResult, authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post(
  '/complete-profile',
  protect,
  uploadIdProof,
  completeProfileValidation,
  authController.completeProfile
);

export default router;
