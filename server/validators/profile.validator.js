import { body } from 'express-validator';

// Aligned with actual Complete Profile forms (Customer / ShopOwner / Technician)

export const customerProfileValidator = [
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('address').trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('pincode').trim().matches(/^\d{6}$/).withMessage('Pincode must be exactly 6 digits'),
];

export const shopOwnerProfileValidator = [
  body('shopName').trim().notEmpty().withMessage('Shop Name is required'),
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('address').trim().notEmpty().withMessage('Shop Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('pincode').trim().matches(/^\d{6}$/).withMessage('Pincode must be exactly 6 digits'),
  body('shopCategory').trim().notEmpty().withMessage('Shop category is required'),
  body('gstNumber').optional().trim().isString(),
  body('openingHours').optional().trim().isString(),
];

export const technicianProfileValidator = [
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('experienceYears').isInt({ min: 0, max: 50 }).withMessage('Experience years must be between 0 and 50'),
  body('skills')
    .custom((value) => {
      let parsed = value;
      if (typeof value === 'string') {
        try {
          parsed = JSON.parse(value);
        } catch {
          parsed = value.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Please provide at least one skill');
      }
      return true;
    }),
  body('serviceCity').optional().trim().notEmpty().withMessage('Service city is required'),
  body('currentCity').optional().trim().isString(),
  body('pincode').optional().trim().matches(/^\d{6}$/).withMessage('Pincode must be exactly 6 digits'),
  body('bio').optional().trim().isString(),
];
