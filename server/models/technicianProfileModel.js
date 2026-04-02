import mongoose from 'mongoose';

const technicianProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  serviceCity: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  idProof: {
    type: String, // file URL
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const TechnicianProfile = mongoose.model('TechnicianProfile', technicianProfileSchema);
export default TechnicianProfile;
