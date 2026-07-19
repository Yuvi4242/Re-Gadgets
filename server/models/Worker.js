import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  // Optional link to a User with role "technician" for dashboard login
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: { type: String, required: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, default: null },
  avatar: { type: String, default: null },
  skills: { type: [String], default: [] },
  isAvailable: { type: Boolean, default: true },
  currentOrderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Worker', workerSchema);
