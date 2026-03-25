import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Briefcase, Key, Store, Wrench, ShieldCheck, FileText, UploadCloud, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InputField from './InputField';
import Button from './Button';

const RegisterForm = ({ role }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setHasError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setHasError(true);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Registered as ${role}:`, formData);
    }, 1500);
  };

  const val = (id) => formData[id] || '';

  const commonFields = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
      <InputField id="email" label="Email Address" type="email" icon={Mail} value={val('email')} placeholder="you@example.com" onChange={handleChange} required />
      <InputField id="phone" label="Phone Number" type="tel" icon={Phone} value={val('phone')} placeholder="+1 (555) 000-0000" onChange={handleChange} required />
      <InputField id="password" label="Create Password" type="password" icon={Lock} value={val('password')} placeholder="••••••••" onChange={handleChange} required />
    </motion.div>
  );

  const renderFields = () => {
    switch (role) {
      case 'owner':
        return (
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
               <h3 className="text-xs font-extrabold text-white flex items-center gap-2 uppercase tracking-widest border-b border-white/5 pb-2">
                 <Store className="w-4 h-4 text-brandBlue" /> 1. Shop Details
               </h3>
               <InputField id="shopName" label="Shop Name" icon={Store} value={val('shopName')} placeholder="Re-Gadgets Partner Store" onChange={handleChange} required />
               <InputField id="ownerName" label="Owner Full Name" icon={User} value={val('ownerName')} placeholder="John Doe" onChange={handleChange} required />
               {commonFields}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
               <h3 className="text-xs font-extrabold text-white flex items-center gap-2 uppercase tracking-widest border-b border-white/5 pb-2">
                 <MapPin className="w-4 h-4 text-brandPurple" /> 2. Exact Location
               </h3>
               <InputField id="shopAddress" label="Full Shop Address" icon={MapPin} value={val('shopAddress')} placeholder="123 Tech Avenue" onChange={handleChange} required />
               <div className="grid grid-cols-2 gap-4">
                 <InputField id="cityState" label="City & State" value={val('cityState')} placeholder="New York, NY" onChange={handleChange} required />
                 <InputField id="pincode" label="ZIP" type="number" value={val('pincode')} placeholder="10001" onChange={handleChange} required />
               </div>
            </motion.div>

            {/* Gov Verification section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative isolate group p-[1px] rounded-3xl overflow-hidden mt-6">
               <div className="absolute inset-0 bg-gradient-to-br from-brandBlue to-emerald-400 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-[2px]"></div>
               <div className="relative bg-[#0b1326] backdrop-blur-2xl px-5 py-6 rounded-3xl shadow-2xl h-full border border-white/5">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                         <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white tracking-tight leading-tight">Govt. Verification</h3>
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">✔ Verified Shops Only</p>
                      </div>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <InputField id="gstin" label="GST Number (GSTIN)" icon={FileText} value={val('gstin')} placeholder="22AAAAA0000A1Z5" onChange={handleChange} required />
                   <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                     {['License', 'Owner ID'].map((doc) => (
                       <div key={doc} className="relative overflow-hidden group/drop border-2 border-dashed border-white/10 hover:border-brandBlue bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
                         <UploadCloud className="w-6 h-6 text-slate-500 group-hover/drop:text-brandBlue" />
                         <span className="text-[11px] font-bold text-slate-300">Upload {doc}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
               <h3 className="text-xs font-extrabold text-white flex items-center gap-2 uppercase tracking-widest border-b border-white/5 pb-2">
                 <Wrench className="w-4 h-4 text-amber-500" /> 4. Service Specs
               </h3>
               <InputField id="services" label="Types of Repair" value={val('services')} placeholder="Mobiles, Laptops, Appliances" onChange={handleChange} required />
               <InputField id="shopExp" label="Years in Business" type="number" value={val('shopExp')} placeholder="e.g. 5" onChange={handleChange} required />
            </motion.div>
          </div>
        );
      case 'worker':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <InputField id="fullName" label="Full Name" icon={User} value={val('fullName')} placeholder="Jane Smith" onChange={handleChange} required />
            <InputField id="skills" label="Skills / Expertise" icon={Wrench} value={val('skills')} placeholder="Mobile Repair" onChange={handleChange} required />
            <InputField id="experience" label="Years of Experience" type="number" icon={Briefcase} value={val('experience')} placeholder="e.g. 5" onChange={handleChange} required />
            {commonFields}
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <InputField id="fullName" label="Admin Name" icon={User} value={val('fullName')} placeholder="System Admin" onChange={handleChange} required />
            <InputField id="adminCode" label="Access Code" type="password" icon={Key} value={val('adminCode')} placeholder="Enter access code" onChange={handleChange} required />
            {commonFields}
          </motion.div>
        );
      case 'customer':
      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <InputField id="fullName" label="Full Name" icon={User} value={val('fullName')} placeholder="John Doe" onChange={handleChange} required />
            {commonFields}
          </motion.div>
        );
    }
  };

  return (
    <motion.form 
      animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 w-full mt-2"
    >
      <div className="space-y-4 pt-1 max-h-[45vh] overflow-y-auto pr-3 custom-scrollbar overflow-x-hidden">
        {renderFields()}
      </div>

      <div className="mt-4 pt-4 pb-2 z-10 border-t border-white/5">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
           <Button type="submit" fullWidth isLoading={isLoading}>
             Create Account
           </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
