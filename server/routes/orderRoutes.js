import express from 'express';
import { createOrder, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, createOrder);
router.get('/:id', requireAuth, getOrder);
router.patch('/:id/status', requireAuth, updateOrderStatus);

export default router;
