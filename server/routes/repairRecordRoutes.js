import express from 'express';
import {
  createOrUpdateRepairRecord,
  uploadRepairPhoto,
  getRepairRecord,
  getDeviceRepairHistory,
  getCustomerRepairHistory,
} from '../controllers/repairRecordController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { uploadRepairPhotoMiddleware } from '../middleware/repairPhotoUpload.js';

const router = express.Router();

// Technician operations
router.post(
  '/',
  protect,
  restrictTo('technician', 'admin'),
  createOrUpdateRepairRecord
);

router.put(
  '/:id',
  protect,
  restrictTo('technician', 'admin'),
  createOrUpdateRepairRecord
);

router.post(
  '/:id/photos',
  protect,
  restrictTo('technician', 'admin'),
  uploadRepairPhotoMiddleware,
  uploadRepairPhoto
);

// Customer repair history (own devices only)
router.get(
  '/customer/history',
  protect,
  restrictTo('customer', 'admin'),
  getCustomerRepairHistory
);

// Device-scoped repair history
router.get(
  '/device/:deviceIdentifier',
  protect,
  getDeviceRepairHistory
);

// Single booking or record lookup
router.get(
  '/booking/:id',
  protect,
  getRepairRecord
);

router.get(
  '/:id',
  protect,
  getRepairRecord
);

export default router;
