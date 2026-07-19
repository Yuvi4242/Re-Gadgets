import Worker from '../models/Worker.js';
import Order from '../models/Order.js';
import Shop from '../models/Shop.js';

const MAX_CONCURRENT_LOAD = 3;

// Helper to assign a worker to an order
const performAssignment = async (order, worker) => {
  // If order was already assigned to another worker, clean up that worker's load first
  if (order.workerId && order.workerId.toString() !== worker._id.toString()) {
    const oldWorker = await Worker.findById(order.workerId);
    if (oldWorker) {
      oldWorker.currentOrderIds = oldWorker.currentOrderIds.filter(
        id => id.toString() !== order._id.toString()
      );
      if (oldWorker.currentOrderIds.length < MAX_CONCURRENT_LOAD) {
        oldWorker.isAvailable = true;
      }
      await oldWorker.save();
    }
  }

  // Assign to new worker
  order.workerId = worker._id;
  await order.save();

  if (!worker.currentOrderIds.some(id => id.toString() === order._id.toString())) {
    worker.currentOrderIds.push(order._id);
  }
  
  if (worker.currentOrderIds.length >= MAX_CONCURRENT_LOAD) {
    worker.isAvailable = false;
  }
  await worker.save();
};

// Manually assigns a technician/worker to a repair order
export const assignWorkerToOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { workerId } = req.body;

    if (!workerId) {
      return res.status(400).json({ error: 'workerId is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    // Verify worker belongs to the same shop as the order
    if (!order.shopId || order.shopId.toString() !== worker.shopId.toString()) {
      return res.status(400).json({ error: 'Worker must belong to the shop assigned to the order' });
    }

    // Verify actor is the owner of the shop or admin
    if (req.user.role !== 'admin') {
      const shop = await Shop.findById(worker.shopId);
      if (!shop || shop.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized to assign workers for this shop' });
      }
    }

    // Verify worker availability / capacity
    if (worker.currentOrderIds.length >= MAX_CONCURRENT_LOAD) {
      return res.status(400).json({ error: `Worker has reached maximum capacity of ${MAX_CONCURRENT_LOAD} orders` });
    }

    await performAssignment(order, worker);

    res.status(200).json({
      message: 'Worker assigned successfully',
      order,
      worker
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Automatically assigns the available shop technician with the lowest active load
export const autoAssignWorker = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!order.shopId) {
      return res.status(400).json({ error: 'Order is not assigned to a shop yet' });
    }

    // Retrieve all workers at that shop
    const workers = await Worker.find({ shopId: order.shopId });
    if (workers.length === 0) {
      return res.status(404).json({ error: 'No technicians registered for this shop' });
    }

    // Filter available workers
    const availableWorkers = workers.filter(w => w.currentOrderIds.length < MAX_CONCURRENT_LOAD);
    if (availableWorkers.length === 0) {
      return res.status(404).json({ error: 'All technicians for this shop are currently at maximum capacity' });
    }

    // Sort: lowest active load first, tie-break by rating descending
    availableWorkers.sort((a, b) => {
      const loadA = a.currentOrderIds.length;
      const loadB = b.currentOrderIds.length;
      if (loadA !== loadB) return loadA - loadB;
      return b.rating - a.rating;
    });

    const chosenWorker = availableWorkers[0];
    await performAssignment(order, chosenWorker);

    res.status(200).json({
      message: `Auto-assigned worker ${chosenWorker.name} to order`,
      order,
      worker: chosenWorker
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lists all workers and availability status for a shop dashboard
export const getShopWorkers = async (req, res) => {
  try {
    const { id } = req.params; // Shop ID

    // Authenticate: user must own this shop, or be admin
    if (req.user.role !== 'admin') {
      const shop = await Shop.findById(id);
      if (!shop || shop.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized to view workers for this shop' });
      }
    }

    const workers = await Worker.find({ shopId: id });
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
