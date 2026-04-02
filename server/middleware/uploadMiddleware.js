import multer from 'multer';
import { idProofStorage, certStorage } from '../config/cloudinary.js';

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const mixedFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only Images or PDF files are allowed!'), false);
  }
};

export const uploadIdProof = multer({ 
  storage: idProofStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: pdfFileFilter
}).single('ownerIdProof');

export const uploadCertification = multer({
  storage: certStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: mixedFileFilter
}).single('certifications');
