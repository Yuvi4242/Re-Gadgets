import express from 'express';
import rateLimit from 'express-rate-limit';
import { createBooking, getBooking, confirmCOD } from '../controllers/repairBookingController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many booking requests from this IP, please try again later.' },
});

router.post('/', bookingLimiter, optionalAuth, createBooking);
router.get('/:id', getBooking);
router.patch('/:id/cod', confirmCOD);

export default router;
