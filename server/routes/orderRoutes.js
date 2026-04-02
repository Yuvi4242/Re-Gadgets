import express from 'express';
import { createOrder, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, updateOrderStatus);

export default router;
