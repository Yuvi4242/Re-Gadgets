import express from 'express';
import {
  createOrder,
  getOrder,
  updateOrderStatus,
  getCustomerOrders,
  getAssignedOrders,
  updateOrderLocation,
  createOrderReview,
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getCustomerOrders);
router.get('/assigned', protect, restrictTo('technician', 'admin'), getAssignedOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, updateOrderStatus);
router.patch('/:id/location', protect, restrictTo('technician', 'shopOwner', 'admin'), updateOrderLocation);
router.post('/:id/reviews', protect, restrictTo('customer', 'admin'), createOrderReview);

export default router;
