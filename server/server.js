import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/chat', chatRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Re-Gadgets Premium API is running smoothly.' });
});

// Setup DB connection (Mocked since no URI, but structured properly)
// mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

app.listen(PORT, () => {
  console.log(`Server running optimally on port ${PORT}`);
});
