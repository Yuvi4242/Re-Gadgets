import { body } from 'express-validator';

export const customerProfileValidator = [
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('address').trim().isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('pincode').trim().matches(/^\d{6}$/).withMessage('Pincode must be exactly 6 digits'),
  body('preferredContactMethod').isIn(['call', 'whatsapp', 'email']).withMessage('Invalid contact method'),
];

export const shopOwnerProfileValidator = [
  body('shopName').trim().notEmpty().withMessage('Shop Name is required'),
  body('shopAddress').trim().notEmpty().withMessage('Shop Address is required'),
  body('shopCity').trim().notEmpty().withMessage('Shop City is required'),
  body('shopState').trim().notEmpty().withMessage('Shop State is required'),
  body('shopPincode').trim().matches(/^\d{6}$/).withMessage('Pincode must be exactly 6 digits'),
  body('yearsInBusiness').isInt({ min: 0, max: 100 }).withMessage('Years in business must be a valid number between 0 and 100'),
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('shopDescription').optional().trim().isString(),
];

export const technicianProfileValidator = [
  body('phone').trim().matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),
  body('experienceYears').isInt({ min: 0, max: 50 }).withMessage('Experience years must be between 0 and 50'),
  body('appliancesServiced')
    .custom((value) => {
      let parsed = value;
      if (typeof value === 'string') {
        try {
          parsed = JSON.parse(value);
        } catch (e) {
          throw new Error('Invalid format for appliances serviced');
        }
      }
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Please select at least one appliance');
      }
      return true;
    }),
  body('skillDescription').notEmpty().withMessage('Skill Description is required'),
  body('currentCity').notEmpty().withMessage('Current City is required'),
  body('availabilityStatus').optional().isIn(['available', 'busy', 'offline']).withMessage('Invalid availability status'),
];
