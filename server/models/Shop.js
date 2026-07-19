import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true },
  shopCategory: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  gstNumber: { type: String },
  shopLicense: { type: String },
  phone: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'UnderReview', 'Verified', 'Rejected'],
    default: 'Pending',
  },
  verificationReason: { type: String },
  verificationDocuments: [
    {
      documentType: { type: String, required: true },
      url: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
  locationCoordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  servicesOffered: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

shopSchema.index({ locationCoordinates: '2dsphere' });
// Text search for shop name / address
shopSchema.index({ shopName: 'text', address: 'text', city: 'text' });

export default mongoose.model('Shop', shopSchema);
