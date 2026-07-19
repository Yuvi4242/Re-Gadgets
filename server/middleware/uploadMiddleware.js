import multer from 'multer';
import {
  idProofStorage,
  certStorage,
  verificationDocStorage,
  profileImageStorage,
} from '../config/cloudinary.js';

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

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const uploadIdProof = multer({
  storage: idProofStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: pdfFileFilter,
}).single('ownerIdProof');

export const uploadCertification = multer({
  storage: certStorage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: mixedFileFilter,
}).single('certifications');

export const uploadVerificationDoc = multer({
  storage: verificationDocStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: mixedFileFilter,
}).single('document');

export const uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: imageFileFilter,
}).single('profileImage');
