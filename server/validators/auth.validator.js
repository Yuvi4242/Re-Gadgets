import { body, validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors.array().map((e) => e.msg),
    });
  }
  next();
};

export const signupValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role')
    .isIn(['customer', 'shopOwner', 'technician'])
    .withMessage('Invalid role specified'),
];

export const verifyOtpValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('otp').trim().isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  // Role is optional — frontend login does not always send it
  body('role')
    .optional()
    .isIn(['customer', 'shopOwner', 'technician', 'admin'])
    .withMessage('Invalid role specified'),
];

export const emailValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
];

export const resetPasswordValidator = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/(?=.*[A-Z])/)
    .withMessage('Password must contain uppercase letter')
    .matches(/(?=.*\d)/)
    .withMessage('Password must contain a number')
    .matches(/(?=.*[\W_])/)
    .withMessage('Password must contain a special character'),
];
