import express from 'express';
import { updateProfileImage } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadProfileImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.patch('/profile-image', protect, uploadProfileImage, updateProfileImage);

export default router;
