import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Screens', 'Batteries', 'Motherboards', 'Accessories', 'Other'],
      default: 'Other',
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    minStock: { type: Number, default: 5, min: 0 },
    supplier: { type: String, trim: true, default: '' },
    cost: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

inventorySchema.index({ shopId: 1, sku: 1 }, { unique: true });
inventorySchema.index({ shopId: 1, category: 1 });

export default mongoose.model('Inventory', inventorySchema);
