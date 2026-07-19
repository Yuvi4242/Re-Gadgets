import Inventory from '../models/Inventory.js';
import Shop from '../models/Shop.js';

const assertShopOwner = async (shopId, user) => {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    const err = new Error('Shop not found');
    err.statusCode = 404;
    throw err;
  }
  if (shop.userId.toString() !== user._id.toString() && user.role !== 'admin') {
    const err = new Error('Unauthorized to manage this shop inventory');
    err.statusCode = 403;
    throw err;
  }
  return shop;
};

export const listInventory = async (req, res) => {
  try {
    const { shopId } = req.params;
    await assertShopOwner(shopId, req.user);

    const category = req.query.category;
    const filter = { shopId };
    if (category && category !== 'All') filter.category = category;

    const items = await Inventory.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createInventoryItem = async (req, res) => {
  try {
    const { shopId } = req.params;
    await assertShopOwner(shopId, req.user);

    const { name, sku, category, stock, minStock, supplier, cost } = req.body;
    if (!name || !sku) {
      return res.status(400).json({
        success: false,
        message: 'name and sku are required',
      });
    }

    const item = await Inventory.create({
      shopId,
      name: String(name).trim(),
      sku: String(sku).trim().toUpperCase(),
      category: category || 'Other',
      stock: Number(stock) || 0,
      minStock: Number(minStock) ?? 5,
      supplier: supplier || '',
      cost: Number(cost) || 0,
    });

    res.status(201).json({ success: true, message: 'Inventory item created', item });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists for this shop',
      });
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const { shopId, itemId } = req.params;
    await assertShopOwner(shopId, req.user);

    const item = await Inventory.findOne({ _id: itemId, shopId });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    const fields = ['name', 'sku', 'category', 'stock', 'minStock', 'supplier', 'cost'];
    for (const f of fields) {
      if (req.body[f] !== undefined) {
        item[f] = f === 'sku' ? String(req.body[f]).trim().toUpperCase() : req.body[f];
      }
    }

    await item.save();
    res.status(200).json({ success: true, message: 'Inventory item updated', item });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const { shopId, itemId } = req.params;
    await assertShopOwner(shopId, req.user);

    const item = await Inventory.findOneAndDelete({ _id: itemId, shopId });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    res.status(200).json({ success: true, message: 'Inventory item deleted' });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
