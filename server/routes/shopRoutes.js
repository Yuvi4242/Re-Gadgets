import express from 'express';
import { registerShop, getAllShops } from '../controllers/shopController.js';

const router = express.Router();

router.post('/register', registerShop);
router.get('/', getAllShops);

export default router;
