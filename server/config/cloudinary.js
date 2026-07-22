import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Custom Cloudinary Storage Engine for Multer.
 * Eliminates third-party peer dependency conflicts while streaming uploads directly to Cloudinary.
 */
class CustomCloudinaryStorage {
  constructor(options = {}) {
    this.options = options;
  }

  _handleFile(req, file, cb) {
    const params = typeof this.options.params === 'function' 
      ? this.options.params(req, file) 
      : this.options.params || {};

    const folder = params.folder || 'gadgetfix';
    const resource_type = params.resource_type || 'auto';
    const transformation = params.transformation || undefined;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        transformation,
      },
      (error, result) => {
        if (error) return cb(error);
        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          public_id: result.public_id,
          url: result.secure_url,
          secure_url: result.secure_url,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );

    file.stream.pipe(uploadStream);
  }

  _removeFile(req, file, cb) {
    if (file && file.public_id) {
      cloudinary.uploader.destroy(file.public_id, (err, res) => cb(err, res));
    } else {
      cb(null);
    }
  }
}

export const idProofStorage = new CustomCloudinaryStorage({
  params: { folder: 'gadgetfix/id-proofs', resource_type: 'raw' },
});

export const certStorage = new CustomCloudinaryStorage({
  params: { folder: 'gadgetfix/certifications', resource_type: 'auto' },
});

export const verificationDocStorage = new CustomCloudinaryStorage({
  params: { folder: 'gadgetfix/verification-docs', resource_type: 'auto' },
});

export const profileImageStorage = new CustomCloudinaryStorage({
  params: {
    folder: 'gadgetfix/profile-images',
    resource_type: 'image',
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
  },
});

export { cloudinary };
