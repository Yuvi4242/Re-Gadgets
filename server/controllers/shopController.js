import Shop from '../models/Shop.js';

export const registerShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).json({ message: 'Shop registered successfully', shop: newShop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find({ isVerified: true });
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
