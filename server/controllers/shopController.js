import Shop from '../models/Shop.js';
import Order from '../models/Order.js';
import Worker from '../models/Worker.js';
import User from '../models/userModel.js';
import Review from '../models/Review.js';

const ALLOWED_SHOP_FIELDS = [
  'shopName',
  'shopCategory',
  'address',
  'city',
  'state',
  'pincode',
  'gstNumber',
  'shopLicense',
  'phone',
  'locationCoordinates',
  'servicesOffered',
];

// Registers a new shop — explicit field extraction (no mass-assignment)
export const registerShop = async (req, res) => {
  try {
    const {
      shopName,
      shopCategory,
      address,
      city,
      state,
      pincode,
      gstNumber,
      shopLicense,
      phone,
      locationCoordinates,
      servicesOffered,
    } = req.body;

    // Reject unexpected fields
    const unexpected = Object.keys(req.body).filter((k) => !ALLOWED_SHOP_FIELDS.includes(k));
    if (unexpected.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Unexpected fields rejected: ${unexpected.join(', ')}`,
      });
    }

    if (!shopName || !shopCategory || !address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'shopName, shopCategory, address, city, state, and pincode are required',
      });
    }

    if (
      !locationCoordinates ||
      !Array.isArray(locationCoordinates.coordinates) ||
      locationCoordinates.coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message: 'locationCoordinates.coordinates [lng, lat] is required',
      });
    }

    const newShop = new Shop({
      userId: req.user._id,
      shopName: String(shopName).trim(),
      shopCategory: String(shopCategory).trim(),
      address: String(address).trim(),
      city: String(city).trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      gstNumber: gstNumber ? String(gstNumber).trim() : undefined,
      shopLicense: shopLicense ? String(shopLicense).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
      locationCoordinates: {
        type: 'Point',
        coordinates: [
          parseFloat(locationCoordinates.coordinates[0]),
          parseFloat(locationCoordinates.coordinates[1]),
        ],
      },
      servicesOffered: Array.isArray(servicesOffered) ? servicesOffered : [],
      verificationStatus: 'Pending',
      isVerified: false,
    });

    await newShop.save();
    res.status(201).json({
      success: true,
      message: 'Shop registered successfully',
      shop: newShop,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Returns all verified shops (paginated)
export const getAllShops = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim();

    const filter = { isVerified: true };
    if (search) {
      filter.$text = { $search: search };
    }

    const [shops, total] = await Promise.all([
      Shop.find(filter).skip(skip).limit(limit).sort({ rating: -1 }),
      Shop.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      shops,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single shop detail
export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('userId', 'name email');
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }
    res.status(200).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Uploads verification document via Cloudinary (req.file from multer)
export const uploadVerificationDocs = async (req, res) => {
  try {
    const { id } = req.params;
    const documentType = req.body.documentType;
    const fileUrl = req.file?.path || req.file?.secure_url || req.body.url;

    if (!documentType || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'documentType and a document file (or url) are required',
      });
    }

    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    if (shop.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to modify this shop profile' });
    }

    shop.verificationDocuments.push({
      documentType,
      url: fileUrl,
      uploadedAt: new Date(),
    });
    shop.verificationStatus = 'UnderReview';

    await shop.save();
    res.status(200).json({
      success: true,
      message: 'Verification documents uploaded. Status is now UnderReview.',
      verificationStatus: shop.verificationStatus,
      verificationDocuments: shop.verificationDocuments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!['Verified', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'Verified' or 'Rejected'",
      });
    }

    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    shop.verificationStatus = status;
    if (status === 'Verified') {
      shop.isVerified = true;
      shop.verificationReason = undefined;
    } else {
      shop.isVerified = false;
      shop.verificationReason = reason || 'Failed to meet criteria';
    }

    await shop.save();
    res.status(200).json({
      success: true,
      message: `Shop verification updated to ${status}`,
      shop,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPendingVerifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = {
      verificationStatus: { $in: ['Pending', 'UnderReview'] },
      isVerified: false,
    };
    const total = await Shop.countDocuments(query);
    const shops = await Shop.find(query)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      shops,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const findNearbyShops = async (req, res) => {
  try {
    const { lat, lng, radiusKm, deviceType, city, sort } = req.query;

    if (lat && lng) {
      const radiusMeters = (parseFloat(radiusKm) || 15) * 1000;
      const pipeline = [
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            distanceField: 'distanceMeters',
            maxDistance: radiusMeters,
            spherical: true,
            query: { isVerified: true },
          },
        },
      ];

      if (deviceType) {
        pipeline[0].$geoNear.query.servicesOffered = { $in: [deviceType] };
      }

      if (sort === 'rating') {
        pipeline.push({ $sort: { rating: -1 } });
      }

      const results = await Shop.aggregate(pipeline);
      const shopsWithKm = results.map((shop) => ({
        ...shop,
        distanceKm: shop.distanceMeters
          ? parseFloat((shop.distanceMeters / 1000).toFixed(2))
          : 0,
      }));

      return res.status(200).json(shopsWithKm);
    }

    const filter = { isVerified: true };
    if (city) {
      filter.$or = [
        { city: { $regex: new RegExp(city, 'i') } },
        { address: { $regex: new RegExp(city, 'i') } },
      ];
    }
    if (deviceType) {
      filter.servicesOffered = { $in: [deviceType] };
    }

    let query = Shop.find(filter);
    if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    }

    const shops = await query;
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Orders for the authenticated shop owner's shop
export const getOwnerOrders = async (req, res) => {
  try {
    const shop = await Shop.findOne({ userId: req.user._id });
    if (!shop) {
      return res.status(404).json({ success: false, message: 'No shop found for this owner' });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = { shopId: shop._id };
    if (status) filter.status = status;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('customer', 'name email phone profileImage')
        .populate('workerId', 'name phone avatar rating')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      shopId: shop._id,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats for shop owner dashboard
export const getOwnerStats = async (req, res) => {
  try {
    const shop = await Shop.findOne({ userId: req.user._id });
    if (!shop) {
      return res.status(404).json({ success: false, message: 'No shop found for this owner' });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      ordersToday,
      pendingApprovals,
      activeTechnicians,
      revenueAgg,
    ] = await Promise.all([
      Order.countDocuments({ shopId: shop._id }),
      Order.countDocuments({ shopId: shop._id, createdAt: { $gte: startOfToday } }),
      Order.countDocuments({ shopId: shop._id, status: 'Requested' }),
      Worker.countDocuments({ shopId: shop._id, isAvailable: true }),
      Order.aggregate([
        {
          $match: {
            shopId: shop._id,
            isPaid: true,
            createdAt: { $gte: startOfMonth },
          },
        },
        { $group: { _id: null, total: { $sum: '$price' } } },
      ]),
    ]);

    const revenueThisMonth = revenueAgg[0]?.total || 0;

    res.status(200).json({
      success: true,
      shopId: shop._id,
      shopName: shop.shopName,
      stats: {
        totalOrders,
        ordersToday,
        revenueThisMonth,
        activeTechnicians,
        pendingApprovals,
        shopRating: shop.rating,
        reviewCount: shop.reviewCount || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create technician/worker for a shop (with optional User linking)
export const createShopWorker = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, email, phone, avatar, skills } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Technician name is required' });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    if (shop.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to add workers to this shop' });
    }

    let linkedUserId = null;
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase().trim(),
        role: 'technician',
      });
      if (existingUser) {
        linkedUserId = existingUser._id;
      }
    }

    const worker = await Worker.create({
      shopId: shop._id,
      userId: linkedUserId,
      name: name.trim(),
      email: email ? email.toLowerCase().trim() : undefined,
      phone: phone || null,
      avatar: avatar || null,
      skills: Array.isArray(skills) ? skills : [],
      isAvailable: true,
    });

    res.status(201).json({
      success: true,
      message: linkedUserId
        ? 'Technician created and linked to existing user account'
        : 'Technician created (no login account linked)',
      worker,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Shop reviews (read-only for shop owners / public)
export const getShopReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const shop = await Shop.findById(id).select('rating reviewCount shopName');
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    const [reviews, total] = await Promise.all([
      Review.find({ shop: id })
        .populate('customer', 'name profileImage')
        .populate('worker', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments({ shop: id }),
    ]);

    // Rating distribution
    const distribution = await Review.aggregate([
      { $match: { shop: shop._id } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({
      success: true,
      rating: shop.rating,
      reviewCount: shop.reviewCount || total,
      distribution,
      page,
      pages: Math.ceil(total / limit) || 1,
      total,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
