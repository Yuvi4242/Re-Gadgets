import mongoose from 'mongoose';

const shopOwnerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String, // optional
  },
  shopCategory: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
});

const ShopOwnerProfile = mongoose.model('ShopOwnerProfile', shopOwnerProfileSchema);
export default ShopOwnerProfile;
