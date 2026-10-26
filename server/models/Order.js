import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deviceType: { type: String, required: true },
  deviceModel: { type: String, required: true },
  issue: { type: String, required: true },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'Picked', 'Repairing', 'Delivered', 'Cancelled'],
    default: 'Requested',
  },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
  pickupAddress: { type: String, required: true },
  scheduledDate: { type: Date },
  price: { type: Number },
  estimatedCompletionTime: { type: Date },
  isPaid: { type: Boolean, default: false },
  repairRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'RepairRecord' },
  // Live GPS for technician tracking (Tracking.jsx listens via Socket.IO)
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number },
    updatedAt: { type: Date },
  },
  repairHistory: [{
    issue: { type: String, default: '' },
    servicesPerformed: { type: String, default: '' },
    replacedParts: { type: String, default: '' },
    repairCost: { type: Number, default: null },
    warranty: { type: String, default: '' },
    beforePhotos: [{ type: String }],
    afterPhotos: [{ type: String }],
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  }],
  statusHistory: [
    {
      status: { type: String, required: true },
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.index({ shopId: 1, status: 1 });
orderSchema.index({ workerId: 1, status: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });

orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Order', orderSchema);
