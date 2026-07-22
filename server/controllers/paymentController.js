import Razorpay from 'razorpay';
import crypto from 'crypto';
import RepairBooking from '../models/RepairBooking.js';
import Order from '../models/Order.js';

let razorpayInstance = null;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';
    razorpayInstance = new Razorpay({ key_id, key_secret });
  }
  return razorpayInstance;
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    if (!amount || !bookingId) {
      return res.status(400).json({ message: 'Amount and bookingId are required' });
    }

    const razorpay = getRazorpayInstance();

    // Razorpay expects amount in paise (1 INR = 100 paise)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `booking_${bookingId}`,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Razorpay order', error: err.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ success: false, message: 'Missing payment verification params' });
    }

    const booking = await RepairBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Idempotency check: If already paid, return success
    if (booking.isPaid) {
      return res.json({ success: true, message: 'Payment already verified' });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

    // Generate expected HMAC SHA-256 signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Update booking status in database
    booking.isPaid = true;
    booking.status = 'confirmed';
    booking.razorpayOrderId = razorpay_order_id;
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();

    // Also update Order collection if present
    try {
      const order = await Order.findById(bookingId);
      if (order) {
        order.isPaid = true;
        order.status = 'Accepted';
        order.statusHistory.push({
          status: 'Accepted',
          changedBy: order.customer || booking.customer || order._id,
          timestamp: new Date(),
        });
        await order.save();
      }
    } catch (_) {}

    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Verification failed', error: err.message });
  }
};
