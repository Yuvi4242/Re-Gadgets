import React from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Briefcase, MapPin, FileUp, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const TechnicianProfileForm = ({ onSuccess }) => {
  const { api, completeUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Note: In real app, idProof would be a file upload to Cloudinary/S3
      // For now, we'll treat it as a placeholder string since we're using JSON body
      // and haven't implemented Multer logic in the controller yet.
      const transformedData = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
        idProof: "https://via.placeholder.com/150", 
      };
      
      await api.post('/auth/complete-profile', transformedData);
      completeUserProfile(true);
      toast.success('Professional profile completed!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Phone Number</label>
          <div className="relative group/input">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
            <input
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit mobile number' }
              })}
              placeholder="9876543210"
              className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
            />
          </div>
          {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Years of Experience</label>
          <div className="relative group/input">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
            <input
              type="number"
              {...register('experienceYears', { required: 'Experience is required', min: 0 })}
              placeholder="5"
              className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
            />
          </div>
          {errors.experienceYears && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.experienceYears.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Skills (Comma separated)</label>
        <div className="relative group/input">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('skills', { required: 'At least one skill is required' })}
            placeholder="Mobile Repair, Laptop Screen, Tablet Diagnostic"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
        {errors.skills && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.skills.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Service City</label>
          <input
            {...register('serviceCity', { required: 'City is required' })}
            placeholder="Pune"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Pincode</label>
          <input
            {...register('pincode', { required: 'Pincode is required' })}
            placeholder="411001"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Short Bio</label>
        <textarea
          {...register('bio', { required: 'Please provide a short bio' })}
          placeholder="I have 10 years of experience in motherboard micro-soldering..."
          rows={3}
          className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all resize-none"
        ></textarea>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 font-mono tracking-tighter uppercase text-[10px]">Upload ID Proof (Aadhar/Voter ID)</label>
        <div className="border-2 border-dashed border-slate-800 rounded-lg p-4 text-center hover:border-brandPurple transition-colors cursor-pointer group">
          <FileUp className="w-8 h-8 text-slate-500 group-hover:text-brandPurple mx-auto mb-1 transition-colors" />
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tap to drop or click to upload</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-brandPurple/20 transition-all flex items-center justify-center disabled:opacity-50 group"
      >
        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Apply as Technician"}
      </button>
    </form>
  );
};

export default TechnicianProfileForm;
