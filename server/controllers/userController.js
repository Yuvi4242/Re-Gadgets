import { asyncHandler } from '../utils/asyncHandler.js';

export const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a profile image file (field: profileImage)',
    });
  }

  const imageUrl = req.file.path || req.file.secure_url;
  req.user.profileImage = imageUrl;
  await req.user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Profile image updated',
    profileImage: imageUrl,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profileImage: imageUrl,
      isProfileComplete: req.user.isProfileComplete,
    },
  });
});
