import express from 'express';
import {
  assignWorkerToOrder,
  autoAssignWorker,
  getShopWorkers,
} from '../controllers/workerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.patch('/orders/:id/assign-worker', protect, assignWorkerToOrder);
router.post('/orders/:id/auto-assign', protect, autoAssignWorker);

// Kept for backward compatibility (also available under shopRoutes)
router.get('/shops/:id/workers', protect, getShopWorkers);

export default router;
