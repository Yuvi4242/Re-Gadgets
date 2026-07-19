import express from 'express';
import {
  getAdminStats,
  getAdminUsers,
  updateAdminUser,
} from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.patch('/users/:id', updateAdminUser);

export default router;
