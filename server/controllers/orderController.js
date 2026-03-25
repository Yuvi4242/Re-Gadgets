import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    // Expected req.body: deviceType, deviceModel, issue, pickupAddress, ...
    const newOrder = new Order({ ...req.body, customer: req.user?.id });
    await newOrder.save();
    res.status(201).json({ message: 'Order created', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('shopId', 'shopName rating').populate('workerId', 'name rating phone');
    if(!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if(!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
