import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { cloudinary } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Ensure local uploads directory exists
const localUploadDir = path.resolve(__dirname, '../uploads/repairs');
if (!fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir, { recursive: true });
}

// Custom storage engine that supports Cloudinary if credentials are valid,
// falling back gracefully to safe local disk storage
class HybridRepairStorage {
  _handleFile(req, file, cb) {
    const hasCloudinary =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET) &&
      process.env.NODE_ENV !== 'test';

    // Safe sanitized filename (strips path traversal, creates random hex)
    const rawExt = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : '.jpg';
    const randomHex = crypto.randomBytes(16).toString('hex');
    const safeFilename = `repair_${Date.now()}_${randomHex}${safeExt}`;

    if (hasCloudinary) {
      try {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'gadgetfix/repairs',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              console.warn('Cloudinary upload error, falling back to disk:', error.message);
              return this._saveToDisk(file, safeFilename, cb);
            }
            cb(null, {
              path: result.secure_url,
              filename: safeFilename,
              public_id: result.public_id,
              url: result.secure_url,
              secure_url: result.secure_url,
              format: result.format,
              bytes: result.bytes,
            });
          }
        );
        file.stream.pipe(uploadStream);
        return;
      } catch (err) {
        console.warn('Cloudinary stream setup failed, falling back to disk:', err.message);
      }
    }

    this._saveToDisk(file, safeFilename, cb);
  }

  _saveToDisk(file, safeFilename, cb) {
    const destinationPath = path.join(localUploadDir, safeFilename);

    // Guard against path traversal
    if (!destinationPath.startsWith(localUploadDir)) {
      return cb(new Error('Invalid destination path traversal detected'));
    }

    const outStream = fs.createWriteStream(destinationPath);
    file.stream.pipe(outStream);

    outStream.on('error', cb);
    outStream.on('finish', () => {
      cb(null, {
        path: destinationPath,
        filename: safeFilename,
        url: `/uploads/repairs/${safeFilename}`,
        bytes: outStream.bytesWritten,
      });
    });
  }

  _removeFile(req, file, cb) {
    if (file.public_id) {
      cloudinary.uploader.destroy(file.public_id, () => {});
    }
    if (file.path && fs.existsSync(file.path)) {
      fs.unlink(file.path, () => {});
    }
    cb(null);
  }
}

const photoFileFilter = (req, file, cb) => {
  const mimeType = (file.mimetype || '').toLowerCase();
  const ext = path.extname(file.originalname || '').toLowerCase();

  if (ALLOWED_MIME_TYPES.has(mimeType) && ALLOWED_EXTENSIONS.has(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and WebP images are allowed.'), false);
  }
};

const upload = multer({
  storage: new HybridRepairStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: photoFileFilter,
});

export const uploadRepairPhotoMiddleware = (req, res, next) => {
  const singleUpload = upload.single('photo');

  singleUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: `File size exceeds the 5MB limit.`,
          });
        }
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};
