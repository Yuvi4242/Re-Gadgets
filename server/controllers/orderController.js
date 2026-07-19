import Order from '../models/Order.js';
import Shop from '../models/Shop.js';
import Worker from '../models/Worker.js';
import Review from '../models/Review.js';
import { calculateEstimatedCompletion } from '../utils/estimationEngine.js';
import { createNotification } from '../utils/notificationHelper.js';

export const createOrder = async (req, res) => {
  try {
    const { deviceType, deviceModel, issue, pickupAddress, scheduledDate, shopId } = req.body;
    if (!deviceType || !deviceModel || !issue || !pickupAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: deviceType, deviceModel, issue, pickupAddress',
      });
    }

    const userId = req.user?._id || req.user?.id;
    const newOrder = new Order({
      deviceType,
      deviceModel,
      issue,
      pickupAddress,
      scheduledDate,
      shopId,
      customer: userId,
      status: 'Requested',
      statusHistory: [
        {
          status: 'Requested',
          changedBy: userId,
          timestamp: new Date(),
        },
      ],
    });

    await newOrder.save();

    // Notify shop owner if shop assigned
    if (shopId) {
      const shop = await Shop.findById(shopId);
      if (shop?.userId) {
        await createNotification({
          userId: shop.userId,
          type: 'order_status',
          title: 'New repair request',
          message: `New ${deviceType} repair request received.`,
          relatedOrder: newOrder._id,
        });
      }
    }

    res.status(201).json({ success: true, message: 'Order created', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const filter = { customer: req.user?._id || req.user?.id };

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('shopId', 'shopName rating address phone locationCoordinates')
        .populate('workerId', 'name rating phone avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    // Bare array keeps existing frontend (dashboard.tsx) working.
    // Pagination meta is available via response headers for newer clients.
    res.set('X-Total-Count', String(total));
    res.set('X-Page', String(page));
    res.set('X-Pages', String(Math.ceil(total / limit) || 1));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('shopId', 'shopName rating address phone locationCoordinates')
      .populate('workerId', 'name rating phone avatar')
      .populate('customer', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Authorization: customer, assigned worker (via userId), shop owner, or admin
    const userId = req.user._id.toString();
    const role = req.user.role;
    let authorized = role === 'admin' || order.customer?._id?.toString() === userId || order.customer?.toString() === userId;

    if (!authorized && order.workerId) {
      const worker = await Worker.findById(order.workerId._id || order.workerId);
      if (worker?.userId?.toString() === userId) authorized = true;
    }

    if (!authorized && order.shopId) {
      const shop = await Shop.findOne({
        _id: order.shopId._id || order.shopId,
        userId: req.user._id,
      });
      if (shop) authorized = true;
    }

    if (!authorized) {
      return res.status(403).json({ success: false, message: 'Unauthorized to view this order' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Transitions order status enforcing permissions and state machine rules.
 */
export const transitionOrder = async (orderId, newStatus, actorId, actorRole) => {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }

  const currentStatus = order.status;

  if (newStatus === 'Cancelled') {
    if (actorRole !== 'customer' && actorRole !== 'admin') {
      const err = new Error('Only customer or admin can cancel the order');
      err.statusCode = 403;
      throw err;
    }
    if (actorRole === 'customer' && order.customer?.toString() !== actorId.toString()) {
      const err = new Error('Unauthorized to cancel this order');
      err.statusCode = 403;
      throw err;
    }
    if (currentStatus !== 'Requested' && currentStatus !== 'Accepted') {
      const err = new Error('Cannot cancel order after it has been picked up');
      err.statusCode = 400;
      throw err;
    }
  } else {
    const transitionMap = {
      Requested: ['Accepted', 'Cancelled'],
      Accepted: ['Picked', 'Cancelled'],
      Picked: ['Repairing'],
      Repairing: ['Delivered'],
      Delivered: [],
      Cancelled: [],
    };

    const allowedNext = transitionMap[currentStatus] || [];
    if (!allowedNext.includes(newStatus)) {
      const err = new Error(`Invalid transition from ${currentStatus} to ${newStatus}`);
      err.statusCode = 400;
      throw err;
    }

    if (['Accepted', 'Picked', 'Repairing', 'Delivered'].includes(newStatus)) {
      if (!['shopOwner', 'technician', 'admin'].includes(actorRole)) {
        const err = new Error('Only shop owners, technicians or admins can update status');
        err.statusCode = 403;
        throw err;
      }

      // Technicians may only update orders assigned to them
      if (actorRole === 'technician') {
        const worker = await Worker.findOne({ userId: actorId });
        if (!worker || !order.workerId || order.workerId.toString() !== worker._id.toString()) {
          const err = new Error('Technicians can only update their assigned orders');
          err.statusCode = 403;
          throw err;
        }
      }

      // Shop owners may only update orders for their shop
      if (actorRole === 'shopOwner') {
        const shop = await Shop.findOne({ userId: actorId });
        if (!shop || !order.shopId || order.shopId.toString() !== shop._id.toString()) {
          const err = new Error('Unauthorized to update this order');
          err.statusCode = 403;
          throw err;
        }
      }
    }
  }

  if (['Accepted', 'Repairing'].includes(newStatus)) {
    let currentQueueLength = 0;
    if (order.shopId) {
      currentQueueLength = await Order.countDocuments({
        shopId: order.shopId,
        status: { $in: ['Accepted', 'Picked', 'Repairing'] },
      });
    }

    const estimatedISO = calculateEstimatedCompletion({
      deviceType: order.deviceType,
      issue: order.issue,
      shopId: order.shopId,
      currentQueueLength,
    });
    order.estimatedCompletionTime = new Date(estimatedISO);
  }

  order.status = newStatus;
  order.statusHistory.push({
    status: newStatus,
    changedBy: actorId,
    timestamp: new Date(),
  });
  order.updatedAt = new Date();

  if (['Delivered', 'Cancelled'].includes(newStatus) && order.workerId) {
    const worker = await Worker.findById(order.workerId);
    if (worker) {
      worker.currentOrderIds = worker.currentOrderIds.filter(
        (id) => id.toString() !== order._id.toString()
      );
      if (worker.currentOrderIds.length < 3) {
        worker.isAvailable = true;
      }
      await worker.save();
    }
  }

  await order.save();
  return order;
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'status is required' });
    }

    const updatedOrder = await transitionOrder(
      req.params.id,
      status,
      req.user._id,
      req.user.role
    );

    const io = req.app.get('io');
    if (io) {
      io.to(`order:${updatedOrder._id}`).emit('order:statusUpdate', {
        orderId: updatedOrder._id,
        status: updatedOrder.status,
        estimatedCompletionTime: updatedOrder.estimatedCompletionTime,
        updatedAt: updatedOrder.updatedAt,
      });
    }

    // Notify customer of status change
    if (updatedOrder.customer) {
      await createNotification({
        userId: updatedOrder.customer,
        type: 'order_status',
        title: 'Order status updated',
        message: `Your repair order is now: ${updatedOrder.status}`,
        relatedOrder: updatedOrder._id,
      });
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order: updatedOrder,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Technician: list orders assigned to the linked Worker
export const getAssignedOrders = async (req, res) => {
  try {
    if (req.user.role !== 'technician' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only technicians can view assigned orders',
      });
    }

    const worker = await Worker.findOne({ userId: req.user._id });
    if (!worker) {
      return res.status(200).json({
        success: true,
        orders: [],
        message: 'No worker profile linked to this technician account',
      });
    }

    const orders = await Order.find({
      workerId: worker._id,
      status: { $nin: ['Cancelled'] },
    })
      .populate('customer', 'name email phone')
      .populate('shopId', 'shopName address')
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, workerId: worker._id, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update live GPS location + emit Socket.IO event
export const updateOrderLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'lat and lng (numbers) are required',
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Only assigned technician, shop owner, or admin
    const role = req.user.role;
    let authorized = role === 'admin';

    if (!authorized && role === 'technician') {
      const worker = await Worker.findOne({ userId: req.user._id });
      if (worker && order.workerId?.toString() === worker._id.toString()) {
        authorized = true;
      }
    }

    if (!authorized && role === 'shopOwner') {
      const shop = await Shop.findOne({ userId: req.user._id });
      if (shop && order.shopId?.toString() === shop._id.toString()) {
        authorized = true;
      }
    }

    if (!authorized) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update location' });
    }

    order.currentLocation = { lat, lng, updatedAt: new Date() };
    await order.save();

    const io = req.app.get('io');
    if (io) {
      io.to(`order:${order._id}`).emit('order:locationUpdate', {
        orderId: order._id,
        lat,
        lng,
        updatedAt: order.currentLocation.updatedAt,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Location updated',
      currentLocation: order.currentLocation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Customer submits a review on a completed (Delivered) order
export const createOrderReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const orderId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'rating must be a number between 1 and 5',
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.customer?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the order customer can leave a review',
      });
    }

    if (order.status !== 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Reviews can only be submitted for delivered orders',
      });
    }

    if (!order.shopId) {
      return res.status(400).json({
        success: false,
        message: 'Order has no associated shop to review',
      });
    }

    const existing = await Review.findOne({ order: orderId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order',
      });
    }

    const review = await Review.create({
      order: order._id,
      shop: order.shopId,
      customer: req.user._id,
      worker: order.workerId || null,
      rating: Number(rating),
      comment: comment ? String(comment).trim() : '',
    });

    // Auto-recalculate Shop.rating
    const stats = await Review.aggregate([
      { $match: { shop: order.shopId } },
      {
        $group: {
          _id: '$shop',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats[0]) {
      await Shop.findByIdAndUpdate(order.shopId, {
        rating: Math.round(stats[0].avgRating * 10) / 10,
        reviewCount: stats[0].count,
      });
    }

    // Notify shop owner
    const shop = await Shop.findById(order.shopId);
    if (shop?.userId) {
      await createNotification({
        userId: shop.userId,
        type: 'review',
        title: 'New customer review',
        message: `You received a ${rating}-star review.`,
        relatedOrder: order._id,
      });
    }

    res.status(201).json({ success: true, message: 'Review submitted', review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order',
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
