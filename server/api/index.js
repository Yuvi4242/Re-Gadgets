import { connectDB } from '../config/db.js';
import app from '../app.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error in Vercel function:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection failure',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }

  return app(req, res);
}
