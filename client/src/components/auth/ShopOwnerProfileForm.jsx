import React from 'react';
import { useForm } from 'react-hook-form';
import { Store, Phone, MapPin, Clock, Hash, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ShopOwnerProfileForm = ({ onSuccess }) => {
  const { api, completeUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/complete-profile', data);
      completeUserProfile(true);
      toast.success('Shop registered successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Shop Name</label>
        <div className="relative group/input">
          <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('shopName', { required: 'Shop name is required' })}
            placeholder="Gadget Hub Pune"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Phone Number</label>
          <div className="relative group/input">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
            <input
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit number' }
              })}
              placeholder="9876543210"
              className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">GST Number (Optional)</label>
          <div className="relative group/input">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
            <input
              {...register('gstNumber')}
              placeholder="27AAACR1234A1Z5"
              className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Shop Category</label>
        <div className="relative group/input">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <select
            {...register('shopCategory', { required: 'Category is required' })}
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple transition-all appearance-none"
          >
            <option value="mobile">Mobile Repair Only</option>
            <option value="laptop">Laptop Repair Only</option>
            <option value="multi">Multi-category (Mobile/Laptop/Tablet)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Shop Address</label>
        <div className="relative group/input">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('address', { required: 'Address is required' })}
            placeholder="Shop 12, Pavan Arcade, MG Road"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Pincode</label>
          <input
            {...register('pincode', { required: 'Pincode is required' })}
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 px-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all font-mono"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-400 uppercase font-mono tracking-tighter text-[10px]">Opening Hours</label>
        <div className="relative group/input">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
          <input
            {...register('openingHours', { required: 'Opening hours are required' })}
            placeholder="10am - 8pm Mon-Sat"
            className="w-full bg-[#020617] border border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-brandPurple/20 transition-all flex items-center justify-center disabled:opacity-50"
      >
        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Complete Shop Registration"}
      </button>
    </form>
  );
};

export default ShopOwnerProfileForm;
