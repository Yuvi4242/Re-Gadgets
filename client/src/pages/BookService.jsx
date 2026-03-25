import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Laptop, Tv, Wind, MapPin, Calendar, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const devices = [
  { id: 'mobile', name: 'Mobile Phone', icon: Smartphone, color: 'text-blue-400', bg: 'from-blue-500 to-cyan-400' },
  { id: 'laptop', name: 'Laptop/PC', icon: Laptop, color: 'text-purple-400', bg: 'from-purple-500 to-indigo-500' },
  { id: 'tv', name: 'Television', icon: Tv, color: 'text-pink-400', bg: 'from-pink-500 to-rose-400' },
  { id: 'appliance', name: 'Appliance', icon: Wind, color: 'text-orange-400', bg: 'from-orange-400 to-amber-500' },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100, opacity: 0
  }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({
    zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0
  })
};

const BookService = () => {
  const [[step, direction], setStep] = useState([1, 0]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate();

  const paginate = (newStep) => setStep([newStep, newStep > step ? 1 : -1]);

  const currentDevice = devices.find(d => d.id === selectedDevice);

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 relative isolate min-h-screen">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandPurple/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
      
      {/* Animated Progress Bar */}
      <div className="mb-12 relative max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative z-10">
          <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-white/5 -z-10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brandBlue to-brandPurple rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)]" 
            />
          </div>
          
          {[1, 2, 3].map((s) => (
             <div key={s} className="flex flex-col items-center gap-3">
               <motion.div 
                 animate={{
                   scale: s === step ? 1.2 : 1,
                   backgroundColor: s < step ? '#4f46e5' : s === step ? '#0b1326' : '#0b1326',
                   borderColor: s <= step ? '#4f46e5' : '#1e293b',
                   color: s < step ? '#fff' : s === step ? '#4f46e5' : '#475569'
                 }}
                 transition={{ duration: 0.3 }}
                 className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-sm z-10 relative overflow-hidden"
               >
                 {s === step && <div className="absolute inset-0 bg-brandBlue/10 animate-pulse"></div>}
                 {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
               </motion.div>
               <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${s === step ? 'text-white' : s < step ? 'text-brandBlue' : 'text-slate-600'}`}>
                 {s === 1 ? 'Device' : s === 2 ? 'Details' : 'Schedule'}
               </span>
             </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0b1326]/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 p-8 sm:p-12 relative overflow-hidden min-h-[500px] flex flex-col">
        {/* Subtle inner noise */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          
          {/* Step 1: Device Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full flex-1 flex flex-col justify-center relative z-10"
            >
              <h2 className="text-4xl font-extrabold tracking-tight text-white mb-3 text-center">What needs fixing?</h2>
              <p className="text-slate-400 font-medium mb-12 text-center text-lg">Select the device type to start your intelligent repair request.</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {devices.map((device) => {
                  const Icon = device.icon;
                  const isSelected = selectedDevice === device.id;
                  return (
                    <motion.div 
                      key={device.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDevice(device.id)}
                      className={`cursor-pointer rounded-3xl p-6 flex flex-col items-center justify-center gap-5 transition-all duration-300 border relative group overflow-hidden
                        ${isSelected 
                          ? 'border-brandBlue bg-[#121c33] shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)]' 
                          : 'border-white/5 hover:border-white/20 bg-[#121c33]/50 hover:bg-[#121c33] shadow-md'}`}
                    >
                      {/* Hover / Selected Glow */}
                      {(isSelected || true) && (
                         <div className={`absolute inset-0 bg-gradient-to-br from-brandBlue to-brandPurple opacity-0 ${isSelected ? 'opacity-10' : 'group-hover:opacity-5'} transition-opacity duration-500`} />
                      )}

                      <div className={`p-4 rounded-2xl transition-all duration-500 relative z-10 ${isSelected ? `bg-gradient-to-br ${device.bg} shadow-[0_0_20px_rgba(56,189,248,0.4)] rotate-12 scale-110 text-white` : `bg-[#060e20] ${device.color} shadow-inner group-hover:rotate-12`}`}>
                        <Icon className="w-8 h-8" strokeWidth={2.5}/>
                      </div>
                      <span className={`font-bold text-base relative z-10 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {device.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
              
              <div className="mt-auto flex justify-center">
                <motion.button 
                  whileHover={selectedDevice ? { scale: 1.05 } : {}}
                  whileTap={selectedDevice ? { scale: 0.95 } : {}}
                  onClick={() => selectedDevice && paginate(2)}
                  disabled={!selectedDevice}
                  className={`px-10 py-4 flex items-center justify-center gap-3 transition-all duration-300 text-lg relative overflow-hidden group rounded-full font-bold
                    ${selectedDevice 
                      ? 'bg-gradient-to-r from-brandBlue to-brandPurple text-white shadow-[0_0_30px_-5px_var(--color-brandBlue)] hover:shadow-[0_0_50px_0px_var(--color-brandPurple)]' 
                      : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed opacity-70'}`}
                >
                  {selectedDevice && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>}
                  <span className="relative z-10">Continue</span> <ArrowRight className="w-5 h-5 relative z-10" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Problem Details */}
          {step === 2 && (
            <motion.div
               key="step2"
               custom={direction}
               variants={variants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
               className="w-full flex-1 flex flex-col relative z-10"
            >
               <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10 self-start shadow-inner">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentDevice.bg} shadow-lg text-white`}>
                     <currentDevice.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selected Device</span>
                    <span className="text-lg font-bold text-white tracking-tight">{currentDevice.name}</span>
                  </div>
               </div>

               <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Describe the issue</h2>
               <p className="text-slate-400 font-medium mb-8">Give us some details so our AI can estimate the repair cost.</p>
               
               <div className="space-y-6 mb-10 w-full max-w-2xl">
                 <div>
                   <label className="block text-sm font-bold text-slate-300 mb-2">Device Model or Reference</label>
                   <input 
                     type="text" 
                     placeholder="e.g. iPhone 13 Pro Max (256GB)" 
                     className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-[#060e20]/50 backdrop-blur-md focus:bg-[#060e20] focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all text-white font-medium placeholder-slate-600 shadow-inner"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-slate-300 mb-2">Problem Description</label>
                   <motion.textarea 
                     whileFocus={{ scale: 1.01 }}
                     rows={4}
                     placeholder="The screen is shattered and touch is unresponsive at the top..." 
                     className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-[#060e20]/50 backdrop-blur-md focus:bg-[#060e20] focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all text-white font-medium placeholder-slate-600 shadow-inner resize-none"
                   />
                 </div>
               </div>

               <div className="flex gap-4 mt-auto pt-8 border-t border-white/10">
                 <button 
                   onClick={() => paginate(1)}
                   className="px-8 py-4 rounded-full font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                 >
                   Back
                 </button>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => paginate(3)}
                   className="px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-brandBlue to-brandPurple shadow-[0_0_30px_-5px_var(--color-brandBlue)] transition-all flex items-center justify-center gap-3 ml-auto relative overflow-hidden group"
                 >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                   <span className="relative z-10">Schedule Pickup</span> <ArrowRight className="w-5 h-5 relative z-10" />
                 </motion.button>
               </div>
            </motion.div>
          )}

          {/* Step 3: Schedule & Location */}
          {step === 3 && (
            <motion.div
               key="step3"
               custom={direction}
               variants={variants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
               className="w-full flex-1 flex flex-col relative z-10"
            >
               <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">Location & Time</h2>
               <p className="text-slate-400 font-medium mb-8">Where and when should our experts arrive?</p>
               
               <div className="grid md:grid-cols-2 gap-10 mb-10 w-full">
                 {/* Location Box */}
                 <div className="space-y-4">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-brandBlue" /> Pickup Address
                   </h3>
                   
                   {/* Map Mockup - Dark Mode */}
                   <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="h-44 rounded-[1.5rem] bg-[#020617] border border-white/10 relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-inner"
                   >
                     {/* Map Image (Filtered to Dark) */}
                     <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=14&size=600x300&maptype=roadmap&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-40 mix-blend-screen grayscale group-hover:opacity-60 transition-all duration-700 scale-105 group-hover:scale-100"></div>
                     <div className="absolute inset-0 bg-brandBlue/10 mix-blend-overlay"></div>
                     
                     <motion.div 
                       animate={{ y: [0, -8, 0] }}
                       transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                       className="absolute z-10 w-12 h-12"
                     >
                        <MapPin className="w-12 h-12 text-brandBlue filter drop-shadow-[0_0_15px_rgba(79,70,229,1)]" />
                     </motion.div>
                     
                     <div className="relative mt-24 z-10 px-4 py-2 bg-[#0b1326]/90 backdrop-blur rounded-[14px] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] font-bold text-white text-xs flex items-center gap-2 hover:bg-brandBlue transition-colors">
                       <Navigation className="w-3.5 h-3.5 text-white" /> Use Current Location
                     </div>
                   </motion.div>

                   <textarea 
                     rows={2}
                     placeholder="Enter complete address, building name, flat no..." 
                     className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-[#060e20]/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brandBlue/50 text-white font-medium text-sm shadow-inner transition-all resize-none placeholder-slate-600"
                   />
                 </div>

                 {/* Time Box */}
                 <div className="space-y-4">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-brandPurple" /> Select Slot
                   </h3>
                   
                   <div className="grid grid-cols-2 gap-3">
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-3.5 rounded-2xl border-2 border-brandBlue bg-brandBlue/10 text-center cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                       <span className="font-extrabold text-white text-sm">Today</span>
                       <p className="text-xs text-brandBlue font-medium mt-1">Available</p>
                     </motion.div>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-3.5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 text-center cursor-pointer shadow-sm">
                       <span className="font-bold text-slate-300 text-sm">Tomorrow</span>
                       <p className="text-xs text-slate-500 font-medium mt-1">Slots Open</p>
                     </motion.div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mt-4">
                     {['10:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map((time, i) => (
                       <motion.div 
                         key={i} 
                         whileHover={{ scale: 1.05 }} 
                         whileTap={{ scale: 0.95 }} 
                         className={`p-3 rounded-2xl border-2 text-center cursor-pointer text-sm font-bold transition-all shadow-sm ${i === 1 ? 'border-brandBlue bg-brandBlue text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'border-white/10 bg-white/5 hover:border-brandPurple/50 text-slate-300'}`}
                       >
                         {time}
                       </motion.div>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Estimate banner */}
               <div className="p-5 sm:p-6 rounded-[2rem] bg-gradient-to-r from-[#121c33] to-[#060e20] text-white flex flex-col sm:flex-row items-center justify-between mb-8 shadow-2xl border border-white/10 relative overflow-hidden isolate">
                  <div className="absolute top-0 right-[20%] w-32 h-32 bg-brandBlue/20 rounded-full blur-[40px] pointer-events-none"></div>
                  <div className="flex items-center gap-4 mb-4 sm:mb-0 relative z-10 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.6)] shrink-0">
                       <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-lg tracking-tight">Free diagnostic check</p>
                      <p className="text-sm font-medium text-slate-400">Pay strictly after the repair.</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right relative z-10 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10 flex justify-between sm:block">
                    <p className="text-xs text-brandBlue font-bold uppercase tracking-widest mb-1">Est. Cost</p>
                    <p className="text-2xl font-extrabold text-white">$49 - $99</p>
                  </div>
               </div>

               <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                 <button 
                   onClick={() => paginate(2)}
                   className="px-8 py-4 rounded-full font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 shadow-sm transition-all"
                 >
                   Back
                 </button>
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => navigate("/tracking")}
                   className="flex-1 py-4 rounded-full font-extrabold text-white bg-gradient-to-r from-brandBlue to-brandPurple hover:shadow-[0_0_40px_-5px_var(--color-brandPurple)] transition-all text-lg shadow-xl relative overflow-hidden group"
                 >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                   <span className="relative z-10">Confirm Booking</span>
                 </motion.button>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookService;
