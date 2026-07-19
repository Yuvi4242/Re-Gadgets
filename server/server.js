import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import chatRoutes from './routes/chat.js';
import workerRoutes from './routes/workerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

import User from './models/userModel.js';
import Order from './models/Order.js';
import Shop from './models/Shop.js';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});

app.set('io', io);
const PORT = process.env.PORT || 5000;

// Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api', workerRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Re-Gadgets Premium API is running smoothly.',
  });
});

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

// Socket.IO authentication middleware
io.use(async (socket, next) => {
  try {
    let token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token && socket.handshake.headers?.authorization) {
      if (socket.handshake.headers.authorization.startsWith('Bearer ')) {
        token = socket.handshake.headers.authorization.split(' ')[1];
      } else {
        token = socket.handshake.headers.authorization;
      }
    }

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId || decoded.id);
    if (!user) {
      return next(new Error('User not found'));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication failed: Invalid or expired token'));
  }
});

io.on('connection', (socket) => {
  console.log(`Socket client connected: ${socket.id} (${socket.user.email})`);

  socket.on('joinOrder', async ({ orderId }) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return socket.emit('error', { message: 'Order not found' });
      }

      const userId = socket.user._id.toString();
      const role = socket.user.role;

      let isAuthorized = false;

      if (role === 'admin') {
        isAuthorized = true;
      } else if (order.customer && order.customer.toString() === userId) {
        isAuthorized = true;
      } else if (order.workerId) {
        // Worker model may be linked via userId
        const Worker = (await import('./models/Worker.js')).default;
        const worker = await Worker.findById(order.workerId);
        if (worker && (worker.userId?.toString() === userId || worker._id.toString() === userId)) {
          isAuthorized = true;
        }
      }

      if (!isAuthorized && order.shopId) {
        const shop = await Shop.findOne({ _id: order.shopId, userId: socket.user._id });
        if (shop) {
          isAuthorized = true;
        }
      }

      if (!isAuthorized) {
        return socket.emit('error', { message: 'Unauthorized to track this order' });
      }

      socket.join(`order:${orderId}`);
      console.log(`Socket ${socket.id} joined room order:${orderId}`);
      socket.emit('joined', { orderId });
    } catch (err) {
      socket.emit('error', { message: 'Error joining order room' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket client disconnected: ${socket.id}`);
  });
});

let serverInstance = null;

const startServer = async () => {
  try {
    await connectDB();
    serverInstance = httpServer.listen(PORT, () => {
      console.log(`Server running optimally on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    if (serverInstance) {
      await new Promise((resolve, reject) => {
        serverInstance.close((err) => (err ? reject(err) : resolve()));
      });
    }
    io.close();
    await mongoose.connection.close();
    console.log('HTTP server, Socket.IO, and MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
