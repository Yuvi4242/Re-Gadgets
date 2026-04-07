import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, PenTool, Laptop, Truck } from 'lucide-react';

const timelineSteps = [
  { id: 1, label: 'Order Placed', status: 'completed', icon: Package, date: 'Jan 10, 09:00 AM' },
  { id: 2, label: 'Device Received', status: 'completed', icon: Laptop, date: 'Jan 11, 02:30 PM' },
  { id: 3, label: 'In Repair', status: 'active', icon: PenTool, date: 'Started Jan 12' },
  { id: 4, label: 'Quality Check', status: 'pending', icon: Check, date: 'Expected tomorrow' },
  { id: 5, label: 'Ready for Pickup', status: 'pending', icon: Truck, date: 'Pending' },
];

export default function RepairTimeline() {
  return (
    <div className="mt-8 relative z-10 w-full xl:col-span-1 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-8">Latest Timeline (REP-9284)</h2>
      
      <div className="relative">
        {/* Continuous background line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-white/10" />

        {/* Animated Fill Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '50%' }} // Simulating 2.5 steps out of 5
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          className="absolute left-[23px] top-0 w-0.5 bg-gradient-to-b from-brandPurple to-cyan-500 shadow-[0_0_10px_#7c3aed]"
        />

        <div className="space-y-8 relative">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + idx * 0.15 }}
                className="flex items-start gap-6 group"
              >
                {/* Node */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted ? 'bg-brandPurple/20 border-brandPurple text-brandPurple' 
                    : isActive ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110'
                    : 'bg-[#0a0a1a] border-white/20 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className={`w-5 h-5 ${isActive && 'animate-pulse'}`} />}
                  </div>
                </div>

                {/* Content */}
                <div className={`pt-2 flex-1 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100 transition-opacity'}`}>
                  <h4 className={`text-base font-semibold ${isActive ? 'text-cyan-400' : isCompleted ? 'text-white' : 'text-slate-400'}`}>
                    {step.label}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{step.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
