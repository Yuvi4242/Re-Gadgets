import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Laptop, Smartphone } from 'lucide-react';
import TrackingModal from './TrackingModal';

const mockRepairs = [
  {
    id: 'REP-9284',
    device: 'iPhone 14 Pro Max',
    type: 'Screen & Battery Replacement',
    status: 'In Progress',
    progress: 65,
    tech: { name: 'Mike R.', avatar: 'https://i.pravatar.cc/150?img=11' },
    icon: Smartphone,
    color: 'emerald',
    eta: 'Today, 4:30 PM'
  },
  {
    id: 'REP-9285',
    device: 'MacBook Pro M2',
    type: 'Water Damage Diagnostics',
    status: 'Diagnosing',
    progress: 30,
    tech: { name: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?img=5' },
    icon: Laptop,
    color: 'amber',
    eta: 'Tomorrow, 10:00 AM'
  }
];

export default function ActiveRepairs() {
  const [trackingRepairId, setTrackingRepairId] = useState<string | null>(null);

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'amber': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-brandPurple/20 text-brandPurple border-brandPurple/30';
    }
  };

  const getProgressBarColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'amber': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      default: return 'bg-brandPurple shadow-[0_0_10px_rgba(124,58,237,0.5)]';
    }
  };

  return (
    <div className="relative z-10 w-full mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Active Repairs
          <span className="bg-brandPurple/20 text-brandPurple text-xs px-2 py-1 rounded-full border border-brandPurple/30">
            {mockRepairs.length}
          </span>
        </h2>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockRepairs.map((repair, idx) => {
          const Icon = repair.icon;

          return (
            <motion.div
              key={repair.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Device Icon/Image Placeholder */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0a0a1a] to-white/5 flex items-center justify-center border border-white/5 shadow-inner shrink-0">
                  <Icon className="w-8 h-8 text-slate-300 group-hover:text-white transition-colors" />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">{repair.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(repair.color)} uppercase tracking-wider`}>
                          {repair.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{repair.device}</h3>
                      <p className="text-sm text-slate-400">{repair.type}</p>
                    </div>
                    
                    {/* Tech Avatar */}
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-400">Assigned Tech</p>
                        <p className="text-sm font-medium text-white">{repair.tech.name}</p>
                      </div>
                      <img src={repair.tech.avatar} alt="Tech" className="w-10 h-10 rounded-full border-2 border-white/10" />
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="mt-5 mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Received</span>
                      <span className="text-white font-medium">{repair.eta}</span>
                    </div>
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${repair.progress}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
                        className={`h-full rounded-full ${getProgressBarColor(repair.color)} relative`}
                      >
                        {/* Shimmer effect in progress bar */}
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => setTrackingRepairId(repair.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brandPurple/10 hover:bg-brandPurple/20 text-brandPurple rounded-xl text-sm font-semibold transition-colors border border-brandPurple/20"
                    >
                      <MapPin className="w-4 h-4" /> Track Live Location
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <TrackingModal 
        isOpen={!!trackingRepairId} 
        onClose={() => setTrackingRepairId(null)} 
        repairId={trackingRepairId || ''} 
      />

    </div>
  );
}
