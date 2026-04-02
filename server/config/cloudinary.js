import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const idProofStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'gadgetfix/id-proofs', resource_type: 'raw', allowed_formats: ['pdf'] },
});

export const certStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'gadgetfix/certifications', resource_type: 'auto' },
});

export { cloudinary };
