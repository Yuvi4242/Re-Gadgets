import RepairBooking from '../models/RepairBooking.js';
import Order from '../models/Order.js';

const PHONE_REGEX = /^[6-9]\d{9}$/;

export const createBooking = async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      customerName,
      customerPhone,
      deviceType,
      issueDescription,
      preferredDateTime,
      serviceType,
      estimatedAmount,
    } = req.body;

    if (!customerName || !customerPhone || !deviceType || !issueDescription || !preferredDateTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!PHONE_REGEX.test(customerPhone)) {
      return res.status(400).json({ message: 'Invalid 10-digit phone number' });
    }

    const userId = req.user?._id || req.user?.id || null;

    const booking = await RepairBooking.create({
      customer: userId,
      shopId,
      shopName,
      customerName,
      customerPhone,
      deviceType,
      issueDescription,
      preferredDateTime,
      serviceType,
      estimatedAmount: estimatedAmount || 500,
      status: 'payment_pending',
      paymentMethod: 'online',
    });

    // Create synchronized Order in Order collection so it appears in all Dashboards immediately!
    try {
      await Order.create({
        _id: booking._id,
        customer: userId,
        deviceType: serviceType || 'Mobile Repair',
        deviceModel: deviceType || 'Gadget',
        issue: issueDescription,
        pickupAddress: `${customerName} (${customerPhone}) - Shop: ${shopName}`,
        scheduledDate: preferredDateTime,
        price: estimatedAmount || 500,
        status: 'Requested',
        isPaid: false,
        statusHistory: [
          {
            status: 'Requested',
            changedBy: userId || booking._id,
            timestamp: new Date(),
          },
        ],
      });
    } catch (orderErr) {
      console.warn('Order sync warning:', orderErr.message);
    }

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await RepairBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch booking', error: err.message });
  }
};

export const confirmCOD = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await RepairBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentMethod = 'cod';
    booking.status = 'confirmed';
    await booking.save();

    // Sync status to Order collection if present
    try {
      const order = await Order.findById(id);
      if (order) {
        order.status = 'Accepted';
        order.statusHistory.push({
          status: 'Accepted',
          changedBy: req.user?._id || order.customer || order._id,
          timestamp: new Date(),
        });
        await order.save();
      }
    } catch (_) {}

    res.status(200).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to confirm COD booking', error: err.message });
  }
};
