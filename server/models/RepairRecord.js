import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Photo URL is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['before', 'after'],
      required: [true, 'Photo type must be "before" or "after"'],
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    publicId: {
      type: String,
      default: null,
    },
  },
  { _id: true }
);

const replacedPartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Part name is required'],
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, 'Part cost is required'],
      min: [0, 'Part cost cannot be negative'],
    },
  },
  { _id: true }
);

const repairRecordSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RepairBooking',
      required: [true, 'Booking reference is required'],
      index: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      index: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required'],
      index: true,
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Technician reference is required'],
      index: true,
    },
    deviceIdentifier: {
      type: String,
      required: [true, 'Device identifier is required'],
      trim: true,
      index: true,
    },
    deviceModel: {
      type: String,
      required: [true, 'Device model is required'],
      trim: true,
    },
    deviceType: {
      type: String,
      trim: true,
      default: 'Gadget',
    },
    serialNumber: {
      type: String,
      trim: true,
      default: '',
    },
    reportedIssues: {
      type: [String],
      default: [],
    },
    servicesPerformed: {
      type: [String],
      default: [],
    },
    replacedParts: {
      type: [replacedPartSchema],
      default: [],
    },
    totalCost: {
      type: Number,
      required: [true, 'Total repair cost is required'],
      min: [0, 'Total cost cannot be negative'],
      default: 0,
    },
    warranty: {
      periodMonths: {
        type: Number,
        default: 3,
        min: 0,
      },
      expiryDate: {
        type: Date,
      },
      policy: {
        type: String,
        default: 'Standard parts and workmanship warranty',
      },
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'verified'],
      default: 'in_progress',
    },
    photos: {
      type: [photoSchema],
      default: [],
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for fast lookups
repairRecordSchema.index({ customer: 1, deviceIdentifier: 1 });
repairRecordSchema.index({ deviceIdentifier: 1, createdAt: -1 });

export default mongoose.model('RepairRecord', repairRecordSchema);
