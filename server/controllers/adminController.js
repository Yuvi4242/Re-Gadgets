import User from '../models/userModel.js';
import Order from '../models/Order.js';
import Shop from '../models/Shop.js';
import Worker from '../models/Worker.js';

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalCustomers,
      totalShopOwners,
      totalTechnicians,
      totalShops,
      verifiedShops,
      totalOrders,
      activeOrders,
      completedOrders,
      revenueAgg,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'shopOwner' }),
      User.countDocuments({ role: 'technician' }),
      Shop.countDocuments(),
      Shop.countDocuments({ isVerified: true }),
      Order.countDocuments(),
      Order.countDocuments({
        status: { $in: ['Requested', 'Accepted', 'Picked', 'Repairing'] },
      }),
      Order.countDocuments({ status: 'Delivered' }),
      Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$price' } } },
      ]),
    ]);

    const totalWorkers = await Worker.countDocuments();
    const totalRevenue = revenueAgg[0]?.total || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCustomers,
        totalShopOwners,
        totalTechnicians,
        totalWorkers,
        totalShops,
        verifiedShops,
        pendingShops: totalShops - verifiedShops,
        totalOrders,
        activeOrders,
        completedOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;
    const role = req.query.role;
    const search = req.query.search?.trim();

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password -refreshToken -otp -resetPasswordToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isVerified, isProfileComplete, name } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent demoting the last admin or self-lockout casually
    if (role !== undefined) {
      if (!['customer', 'technician', 'shopOwner', 'admin'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
      }
      if (user.role === 'admin' && role !== 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          return res.status(400).json({
            success: false,
            message: 'Cannot demote the last admin account',
          });
        }
      }
      user.role = role;
    }

    if (typeof isVerified === 'boolean') user.isVerified = isVerified;
    if (typeof isProfileComplete === 'boolean') user.isProfileComplete = isProfileComplete;
    if (name && typeof name === 'string') user.name = name.trim();

    // Unlock account if admin clears lock
    if (req.body.unlock === true) {
      user.failedLoginAttempts = 0;
      user.lockUntil = undefined;
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'User updated',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        isProfileComplete: user.isProfileComplete,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
