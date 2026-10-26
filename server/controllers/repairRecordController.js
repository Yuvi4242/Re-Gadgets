import mongoose from 'mongoose';
import RepairRecord from '../models/RepairRecord.js';
import RepairBooking from '../models/RepairBooking.js';
import Order from '../models/Order.js';
import Worker from '../models/Worker.js';

/**
 * Helper to verify whether the actor has technician/admin authorization
 * for the given booking or order.
 */
const verifyTechnicianAccess = async (actor, orderOrBooking) => {
  if (actor.role === 'admin') return true;
  if (actor.role !== 'technician') return false;

  const actorId = actor._id.toString();

  // If order exists, check workerId
  if (orderOrBooking?.workerId) {
    // order.workerId might directly equal the user ID or the Worker document ID
    if (orderOrBooking.workerId.toString() === actorId) return true;

    const worker = await Worker.findById(orderOrBooking.workerId);
    if (worker && worker.userId && worker.userId.toString() === actorId) {
      return true;
    }
  }

  // If order was created by this technician or technician was explicitly assigned
  if (orderOrBooking?.technician && orderOrBooking.technician.toString() === actorId) {
    return true;
  }

  // Check if technician is assigned via Worker record
  const workerProfile = await Worker.findOne({ userId: actor._id });
  if (workerProfile && orderOrBooking?.workerId) {
    if (orderOrBooking.workerId.toString() === workerProfile._id.toString()) {
      return true;
    }
  }

  return false;
};

/**
 * 1. Create or Update a Repair Record (AC1)
 * Records reported issues, services performed, replaced parts, total cost, warranty.
 */
export const createOrUpdateRepairRecord = async (req, res) => {
  try {
    const {
      bookingId,
      deviceModel,
      deviceType,
      serialNumber,
      reportedIssues,
      servicesPerformed,
      replacedParts,
      totalCost,
      warranty,
      status,
      notes,
    } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'bookingId is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, message: 'Invalid bookingId format' });
    }

    // Locate booking and/or order
    let [booking, order] = await Promise.all([
      RepairBooking.findById(bookingId),
      Order.findById(bookingId),
    ]);

    if (!booking && !order) {
      return res.status(404).json({ success: false, message: 'Booking or Order not found' });
    }

    const orderOrBooking = order || booking;

    // Check technician permissions
    const isAuthorized = await verifyTechnicianAccess(req.user, orderOrBooking);
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Technicians can only manage records for bookings they handle',
      });
    }

    const customerId = orderOrBooking.customer?._id || orderOrBooking.customer;
    if (!customerId) {
      return res.status(400).json({ success: false, message: 'No customer associated with this booking' });
    }

    // Normalize parts
    const partsArray = Array.isArray(replacedParts)
      ? replacedParts.map((p) => ({
          name: String(p.name || '').trim(),
          cost: Number(p.cost) || 0,
        })).filter((p) => p.name.length > 0)
      : [];

    // Calculate total cost if not explicitly provided or recompute
    const partsTotal = partsArray.reduce((acc, p) => acc + p.cost, 0);
    const parsedTotalCost = typeof totalCost === 'number' && totalCost >= 0
      ? totalCost
      : partsTotal > 0
      ? partsTotal
      : (orderOrBooking.price || orderOrBooking.estimatedAmount || 0);

    // Format reported issues and services
    const issuesArray = Array.isArray(reportedIssues)
      ? reportedIssues.map(String).map((s) => s.trim()).filter(Boolean)
      : typeof reportedIssues === 'string' && reportedIssues.trim()
      ? reportedIssues.split(',').map((s) => s.trim()).filter(Boolean)
      : [orderOrBooking.issue || orderOrBooking.issueDescription].filter(Boolean);

    const servicesArray = Array.isArray(servicesPerformed)
      ? servicesPerformed.map(String).map((s) => s.trim()).filter(Boolean)
      : typeof servicesPerformed === 'string' && servicesPerformed.trim()
      ? servicesPerformed.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    // Device identification
    const resolvedDeviceModel =
      deviceModel?.trim() ||
      orderOrBooking.deviceModel ||
      orderOrBooking.deviceType ||
      'Gadget';

    const resolvedSerialNumber = (serialNumber || '').trim();
    const resolvedDeviceIdentifier =
      resolvedSerialNumber ||
      resolvedDeviceModel.toLowerCase().replace(/\s+/g, '-');

    // Warranty calculation
    const warrantyMonths = Number(warranty?.periodMonths) >= 0 ? Number(warranty.periodMonths) : 3;
    let warrantyExpiry = warranty?.expiryDate ? new Date(warranty.expiryDate) : null;
    if (!warrantyExpiry) {
      const exp = new Date();
      exp.setMonth(exp.getMonth() + warrantyMonths);
      warrantyExpiry = exp;
    }

    // Find existing or create new
    let record = await RepairRecord.findOne({
      $or: [{ booking: bookingId }, { order: bookingId }],
    });

    if (record) {
      // Update existing record
      if (reportedIssues) record.reportedIssues = issuesArray;
      if (servicesPerformed) record.servicesPerformed = servicesArray;
      if (replacedParts) record.replacedParts = partsArray;
      record.totalCost = parsedTotalCost;
      record.technician = req.user._id;
      record.deviceModel = resolvedDeviceModel;
      record.deviceIdentifier = resolvedDeviceIdentifier;
      if (deviceType) record.deviceType = deviceType;
      if (resolvedSerialNumber) record.serialNumber = resolvedSerialNumber;
      if (status) record.status = status;
      if (notes !== undefined) record.notes = notes;
      record.warranty = {
        periodMonths: warrantyMonths,
        expiryDate: warrantyExpiry,
        policy: warranty?.policy || 'Standard parts and workmanship warranty',
      };
      await record.save();
    } else {
      // Create new record
      record = await RepairRecord.create({
        booking: booking?._id || order?._id,
        order: order?._id || booking?._id,
        customer: customerId,
        technician: req.user._id,
        deviceIdentifier: resolvedDeviceIdentifier,
        deviceModel: resolvedDeviceModel,
        deviceType: deviceType || orderOrBooking.deviceType || 'Gadget',
        serialNumber: resolvedSerialNumber,
        reportedIssues: issuesArray,
        servicesPerformed: servicesArray,
        replacedParts: partsArray,
        totalCost: parsedTotalCost,
        warranty: {
          periodMonths: warrantyMonths,
          expiryDate: warrantyExpiry,
          policy: warranty?.policy || 'Standard parts and workmanship warranty',
        },
        status: status || 'in_progress',
        notes: notes || '',
        photos: [],
      });
    }

    // Sync reference to booking and order
    if (booking && !booking.repairRecord) {
      booking.repairRecord = record._id;
      await booking.save();
    }
    if (order && !order.repairRecord) {
      order.repairRecord = record._id;
      await order.save();
    }

    await record.populate([
      { path: 'customer', select: 'name email phone' },
      { path: 'technician', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: 'Repair record saved successfully',
      record,
    });
  } catch (error) {
    console.error('Error saving repair record:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. Upload Before / After Photo (AC2)
 * Enforces rule: "The after photo is only allowed once a before photo exists."
 */
export const uploadRepairPhoto = async (req, res) => {
  try {
    const { id } = req.params; // RepairRecord ID or Booking ID
    const { type, caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Photo file is required' });
    }

    if (!type || !['before', 'after'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid photo type. Type must be "before" or "after".',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    // Find record by Record ID, Booking ID, or Order ID
    let record = await RepairRecord.findOne({
      $or: [{ _id: id }, { booking: id }, { order: id }],
    });

    if (!record) {
      return res.status(404).json({ success: false, message: 'Repair record not found' });
    }

    // Check technician authorization
    let [order, booking] = await Promise.all([
      Order.findById(record.order || record.booking),
      RepairBooking.findById(record.booking || record.order),
    ]);

    const isAuthorized = await verifyTechnicianAccess(req.user, order || booking || record);
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Technicians can only upload photos for bookings they handle',
      });
    }

    // CRITICAL ACCEPTANCE RULE:
    // "The after photo is only allowed once a before photo exists."
    if (type === 'after') {
      const hasBeforePhoto = record.photos.some((p) => p.type === 'before');
      if (!hasBeforePhoto) {
        return res.status(400).json({
          success: false,
          message: "An 'after' photo is only allowed once a 'before' photo exists.",
        });
      }
    }

    const photoUrl = req.file.url || req.file.path || `/uploads/repairs/${req.file.filename}`;

    const newPhoto = {
      url: photoUrl,
      type,
      caption: (caption || '').trim(),
      uploadedBy: req.user._id,
      uploadedAt: new Date(),
      publicId: req.file.public_id || null,
    };

    record.photos.push(newPhoto);

    // If after photo is uploaded, we can transition status to completed if currently in_progress
    if (type === 'after' && record.status === 'in_progress') {
      record.status = 'completed';
    }

    await record.save();

    await record.populate([
      { path: 'customer', select: 'name email phone' },
      { path: 'technician', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: `${type === 'before' ? 'Before' : 'After'} photo uploaded successfully`,
      photo: newPhoto,
      record,
    });
  } catch (error) {
    console.error('Error uploading repair photo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. Get single repair record with before & after photos
 */
export const getRepairRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const record = await RepairRecord.findOne({
      $or: [{ _id: id }, { booking: id }, { order: id }],
    }).populate([
      { path: 'customer', select: 'name email phone' },
      { path: 'technician', select: 'name email' },
      { path: 'booking' },
      { path: 'order' },
    ]);

    if (!record) {
      return res.status(404).json({ success: false, message: 'Repair record not found' });
    }

    // Role Guard: Customer can only view their own records
    const userId = req.user._id.toString();
    const isCustomer = req.user.role === 'customer';
    const recordCustomerId = record.customer?._id?.toString() || record.customer?.toString();

    if (isCustomer && recordCustomerId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only view your own device repair records',
      });
    }

    res.status(200).json({ success: true, record });
  } catch (error) {
    console.error('Error fetching repair record:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 4. List Device Repair History (AC3 & AC4)
 * Returns all repair records for a device.
 * Customers are strictly restricted to their own device records.
 */
export const getDeviceRepairHistory = async (req, res) => {
  try {
    const { deviceIdentifier } = req.params;

    if (!deviceIdentifier) {
      return res.status(400).json({ success: false, message: 'Device identifier is required' });
    }

    const isCustomer = req.user.role === 'customer';
    const filter = {
      $or: [
        { deviceIdentifier: new RegExp(`^${deviceIdentifier.trim()}$`, 'i') },
        { serialNumber: new RegExp(`^${deviceIdentifier.trim()}$`, 'i') },
        { deviceModel: new RegExp(`^${deviceIdentifier.trim()}$`, 'i') },
      ],
    };

    // If customer, strictly enforce customer isolation
    if (isCustomer) {
      filter.customer = req.user._id;
    }

    const records = await RepairRecord.find(filter)
      .populate('technician', 'name email')
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      history: records,
    });
  } catch (error) {
    console.error('Error fetching device repair history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 5. Customer's own device repair history list (AC4)
 * Returns all device repair records with side-by-side photo data for the logged-in customer.
 */
export const getCustomerRepairHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await RepairRecord.find({ customer: userId })
      .populate('technician', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      history: records,
    });
  } catch (error) {
    console.error('Error fetching customer repair history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
