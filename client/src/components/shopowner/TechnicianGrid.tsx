import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Circle, UserPlus, FileMusic, Briefcase, Activity } from 'lucide-react';
import AddTechnicianModal from './AddTechnicianModal';

const dummyTechnicians = [
  { id: 1, name: 'Sarah Jenkins', role: 'Level 4 Apple Certified', avatar: 'S', specs: ['Screens', 'Batteries', 'Motherboards'], workload: { current: 3, max: 5 }, rating: 4.9, status: 'Online', jobsCompleted: 142 },
  { id: 2, name: 'Mike Ross', role: 'Level 2 Android Tech', avatar: 'M', specs: ['Screens', 'Software'], workload: { current: 5, max: 5 }, rating: 4.6, status: 'Online', jobsCompleted: 89 },
  { id: 3, name: 'Emily Davis', role: 'Level 3 General Tech', avatar: 'E', specs: ['Batteries', 'Water Damage'], workload: { current: 1, max: 6 }, rating: 4.8, status: 'On Leave', jobsCompleted: 230 },
  { id: 4, name: 'Aaron Taylor', role: 'Level 1 Junior', avatar: 'A', specs: ['Screens', 'Batteries'], workload: { current: 0, max: 3 }, rating: 4.2, status: 'Offline', jobsCompleted: 15 },
  { id: 5, name: 'Jessica Chen', role: 'Data Recovery Specialist', avatar: 'J', specs: ['Data Recovery', 'Motherboards'], workload: { current: 2, max: 4 }, rating: 5.0, status: 'Online', jobsCompleted: 310 },
];

export default function TechnicianGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<any | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'text-emerald-400 bg-emerald-400/20 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
      case 'Offline': return 'text-slate-400 bg-slate-400/20';
      case 'On Leave': return 'text-amber-400 bg-amber-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getWorkloadColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'bg-red-500';
    if (ratio >= 0.7) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
          <p className="text-slate-400 text-sm">Monitor workload, specializations, and performance stats.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> Add Technician
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
        {dummyTechnicians.map((tech, i) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: '0 10px 30px -10px rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.4)' }}
            className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-colors"
            onClick={() => setSelectedTech(tech)}
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {tech.avatar}
                  </div>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0a1a] ${getStatusColor(tech.status)}`} />
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-amber-400 transition-colors">{tech.name}</h3>
                  <p className="text-xs text-slate-400">{tech.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">{tech.rating}</span>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5">
                {tech.specs.map(spec => (
                  <span key={spec} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-300">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Workload Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Active Jobs</span>
                  <span className="text-white font-medium">{tech.workload.current} / {tech.workload.max}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(tech.workload.current / tech.workload.max) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${getWorkloadColor(tech.workload.current, tech.workload.max)}`}
                  />
                </div>
                {tech.workload.current >= tech.workload.max && (
                  <p className="text-[10px] text-red-400 mt-1">At capacity</p>
                )}
              </div>
            </div>
            
            {/* Quick Stats Strip */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 relative z-10">
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Total Completed</p>
                  <p className="text-lg font-bold text-white">{tech.jobsCompleted}</p>
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Status</p>
                  <p className={`text-sm font-bold ${tech.status === 'Online' ? 'text-emerald-400' : 'text-slate-400'}`}>{tech.status}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AddTechnicianModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Technician Drawer Note: Following prompt 'performance drawer' */}
      <AnimatePresence>
        {selectedTech && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setSelectedTech(null)}
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-[400px] h-screen bg-[#0f0f23] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-[70] p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTech.name}</h2>
                  <p className="text-amber-500 font-medium">Performance Metrics</p>
                </div>
                <button onClick={() => setSelectedTech(null)} className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                {/* Mocking drawer content for now to fulfill requirement */}
                <div className="text-center p-6 text-slate-400">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-white/20" />
                  <p>Performance charts (Recharts sparkline) and active job list go here.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
