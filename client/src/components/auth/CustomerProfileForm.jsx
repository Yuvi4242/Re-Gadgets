import React from 'react';
import { useForm } from 'react-hook-form';
import { Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const CustomerProfileForm = ({ onSuccess }) => {
  const { api, completeUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/complete-profile', data);
      completeUserProfile(true);
      toast.success('Profile completed successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5 w-full">
        <label className="text-sm font-medium text-slate-400">Phone Number</label>
        <div className="relative group/input">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit Indian mobile number' }
            })}
            placeholder="9876543210"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500 pl-1 font-medium">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5 w-full">
        <label className="text-sm font-medium text-slate-400">Full Address</label>
        <div className="relative group/input">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('address', { required: 'Full address is required' })}
            placeholder="Flat 101, Galaxy Apartments"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
        {errors.address && <p className="text-xs text-red-500 pl-1 font-medium">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            placeholder="Mumbai"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
          {errors.city && <p className="text-xs text-red-500 pl-1 font-medium">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400">Pincode</label>
          <input
            {...register('pincode', { 
              required: 'Pincode is required',
              pattern: { value: /^\d{6}$/, message: 'Invalid 6-digit pincode' }
            })}
            placeholder="400001"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
          />
          {errors.pincode && <p className="text-xs text-red-500 pl-1 font-medium">{errors.pincode.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-brandPurple/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          "Complete Profile"
        )}
      </button>
    </form>
  );
};

export default CustomerProfileForm;
