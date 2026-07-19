import express from 'express';
import {
  registerShop,
  getAllShops,
  getShopById,
  uploadVerificationDocs,
  verifyShop,
  getPendingVerifications,
  findNearbyShops,
  getOwnerOrders,
  getOwnerStats,
  createShopWorker,
  getShopReviews,
} from '../controllers/shopController.js';
import {
  listInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/inventoryController.js';
import { getShopWorkers } from '../controllers/workerController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { uploadVerificationDoc } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllShops);
router.get('/nearby', findNearbyShops);

// Owner routes (must be before /:id)
router.get('/owner/orders', protect, restrictTo('shopOwner', 'admin'), getOwnerOrders);
router.get('/owner/stats', protect, restrictTo('shopOwner', 'admin'), getOwnerStats);

// Admin pending list before /:id
router.get('/pending-verification', protect, restrictTo('admin'), getPendingVerifications);

// Single shop
router.get('/:id', getShopById);
router.get('/:id/reviews', getShopReviews);
router.get('/:id/workers', protect, getShopWorkers);

// Protected mutations
router.post('/register', protect, restrictTo('shopOwner', 'admin'), registerShop);
router.post(
  '/:id/verification-docs',
  protect,
  uploadVerificationDoc,
  uploadVerificationDocs
);
router.post('/:shopId/workers', protect, restrictTo('shopOwner', 'admin'), createShopWorker);

// Inventory CRUD
router.get('/:shopId/inventory', protect, listInventory);
router.post('/:shopId/inventory', protect, restrictTo('shopOwner', 'admin'), createInventoryItem);
router.patch('/:shopId/inventory/:itemId', protect, restrictTo('shopOwner', 'admin'), updateInventoryItem);
router.delete('/:shopId/inventory/:itemId', protect, restrictTo('shopOwner', 'admin'), deleteInventoryItem);

// Admin-only
router.patch('/:id/verify', protect, restrictTo('admin'), verifyShop);

export default router;
