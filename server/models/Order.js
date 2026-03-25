import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deviceType: { type: String, required: true },
  deviceModel: { type: String, required: true },
  issue: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Requested', 'Accepted', 'Picked', 'Repairing', 'Delivered'],
    default: 'Requested'
  },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
  pickupAddress: { type: String, required: true },
  scheduledDate: { type: Date },
  price: { type: Number },
  estimatedCompletionTime: { type: Date },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Order', orderSchema);
