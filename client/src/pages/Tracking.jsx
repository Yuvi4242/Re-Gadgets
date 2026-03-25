import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, PenTool, Truck, CheckCircle2, PhoneCall, Star, MapPin } from 'lucide-react';

const Tracking = () => {
  const steps = [
    { label: 'Booking Confirmed', date: 'Today, 10:30 AM', icon: CheckCircle2, status: 'completed' },
    { label: 'Agent Assigned', date: 'Today, 10:45 AM', icon: PackageSearch, status: 'completed' },
    { label: 'Device Picked Up', date: 'Today, 11:30 AM', icon: Truck, status: 'current' },
    { label: 'Repairing', date: 'Pending', icon: PenTool, status: 'upcoming' },
    { label: 'Delivered', date: 'Pending', icon: CheckCircle2, status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative isolate">
      {/* Background glow orb */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brandPurple/10 blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-10 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Tracking Active
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Order #RG-9823</h1>
        <p className="text-slate-400 font-medium mt-2 text-lg">iPhone 13 Pro Max - Screen Repair</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column - Map & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Animated Map mockup */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="overflow-hidden border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-2 bg-[#0b1326] relative isolate">
              {/* Internal glow behind map */}
              <div className="absolute inset-0 bg-brandBlue/5 rounded-3xl blur-2xl -z-10 pointer-events-none"></div>

              <div className="h-72 rounded-2xl bg-[#020617] relative group overflow-hidden isolate">
                  {/* Fake Map Dark Mode version */}
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=800x400&maptype=roadmap&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-40 mix-blend-screen grayscale group-hover:opacity-60 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-brandBlue/10 mix-blend-overlay"></div>
                  
                  {/* Animated Agent Marker */}
                  <motion.div 
                     animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                     transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                     <div className="relative">
                       <MapPin className="w-10 h-10 text-brandBlue filter drop-shadow-[0_0_15px_rgba(79,70,229,0.8)]" />
                       <div className="absolute top-1 right-2 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#060e20]"></div>
                       {/* Pulse ring */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-brandBlue/20 rounded-full blur-md -z-10 animate-ping" style={{ animationDuration: '3s'}}></div>
                     </div>
                  </motion.div>

                  {/* Overlay UI element */}
                  <motion.div 
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.5, type: 'spring' }}
                     className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#0b1326]/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] border border-white/10 font-bold text-white flex items-center gap-4 text-sm"
                  >
                    <div className="relative flex h-3 w-3 shadow-[0_0_10px_#4f46e5] rounded-full">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandBlue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brandBlue"></span>
                    </div>
                    Agent arrives in 12 mins
                  </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl shadow-2xl bg-[#0b1326] border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none"></div>

              <h3 className="font-extrabold text-2xl tracking-tight text-white mb-10 relative z-10">Repair Status</h3>
              <div className="relative z-10">
                {/* Connecting Line */}
                <div className="absolute left-[1.35rem] top-6 bottom-6 w-1 bg-white/5 rounded-full"></div>
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: '50%' }}
                   transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                   className="absolute left-[1.35rem] top-6 w-1 bg-gradient-to-b from-brandBlue to-brandPurple rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)] z-0"
                ></motion.div>
                
                <div className="space-y-10 relative z-10">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';
                    
                    return (
                      <motion.div 
                         key={idx} 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 + (idx * 0.1) }}
                         className="flex gap-8 items-start group"
                      >
                        <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-md border-2
                          ${isCompleted ? 'bg-gradient-to-br from-brandBlue to-brandPurple border-transparent text-white shadow-brandBlue/30' : 
                            isCurrent ? 'bg-[#121c33] border-brandBlue text-brandBlue shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-110 rotate-3' : 
                            'bg-[#0b1326] border-white/10 text-slate-600'}`}
                        >
                          <Icon className={`${isCurrent ? 'w-6 h-6' : 'w-5 h-5'}`} />
                          
                          {isCurrent && (
                            <div className="absolute -inset-2 rounded-2xl border border-brandPurple/50 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                          )}
                        </div>
                        <div className="pt-2">
                          <h4 className={`font-extrabold text-lg tracking-tight transition-colors ${isCurrent ? 'text-brandBlue text-shadow-[0_0_10px_#4f46e5]' : isCompleted ? 'text-white group-hover:text-brandBlue' : 'text-slate-500'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-sm font-semibold mt-1 ${isCurrent || isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                            {step.date}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Worker & Summary */}
        <div className="space-y-8">
          {/* Worker Details Card */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
          >
            <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#0b1326] shadow-2xl">
              <div className="h-28 bg-gradient-to-r from-brandBlue via-brandIndigo to-brandPurple relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30"></div>
                 <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0b1326] to-transparent"></div>
              </div>
              <div className="-mt-14 relative pt-0 px-6 pb-8 z-10">
                <motion.img 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=128&h=128&fit=crop" 
                  alt="Worker" 
                  className="w-24 h-24 rounded-[1.5rem] border-[4px] border-[#0b1326] shadow-xl object-cover mb-4 -rotate-3 hover:rotate-0 transition-transform"
                />
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <h3 className="font-extrabold text-2xl tracking-tight text-white">David Lee</h3>
                     <p className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mt-1">Master Technician</p>
                   </div>
                   <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-xl text-sm font-extrabold border justify-center border-amber-500/20 shadow-sm">
                     <Star className="w-4 h-4 fill-amber-500" /> 4.9
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center shadow-inner">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Repairs Done</p>
                    <p className="font-extrabold text-2xl text-white">520<span className="text-brandBlue">+</span></p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center shadow-inner">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Experience</p>
                    <p className="font-extrabold text-2xl text-white">4<span className="text-brandPurple">Yrs</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="flex-1 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-2xl py-4 font-bold text-base shadow-[0_0_20px_-5px_var(--color-brandPurple)] flex items-center justify-center gap-2 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    <PhoneCall className="w-5 h-5 relative z-10" /> <span className="relative z-10">Call Agent</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
          >
            <div className="rounded-3xl border border-white/5 bg-[#0b1326] shadow-2xl overflow-hidden relative isolate">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue/10 blur-3xl rounded-full -z-10 mt-10 pointer-events-none"></div>

              <div className="p-8 relative z-10">
                <h3 className="font-extrabold text-lg tracking-tight text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-brandBlue rounded-full shadow-[0_0_10px_#4f46e5]"></span> Payment Summary
                </h3>
                <div className="space-y-4 text-sm font-bold mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>Diagnostic Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Screen Component</span>
                    <span className="text-white">$89.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Service Charge</span>
                    <span className="text-white">$30.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs py-4 border-y border-dashed border-white/10 mt-2">
                    <span className="font-medium">Coupon Applied <b className="text-brandBlue border border-brandBlue/30 bg-brandBlue/10 px-2 py-0.5 rounded-md ml-1 tracking-wider">SAVE10</b></span>
                    <span className="text-emerald-400 font-extrabold">-$10.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-extrabold text-white pt-2">
                    <span>Total Amount</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">$109.00</span>
                  </div>
                </div>
                <div className="text-xs text-center text-emerald-400 font-semibold bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Payment required after service completion
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
