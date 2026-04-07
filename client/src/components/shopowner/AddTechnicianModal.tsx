import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, AlertCircle } from 'lucide-react';

interface AddTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_SPECIALIZATIONS = ['Screens', 'Batteries', 'Motherboards', 'Water Damage', 'Software', 'Data Recovery'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddTechnicianModal({ isOpen, onClose }: AddTechnicianModalProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSpec = (spec: string) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter(s => s !== spec));
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  const toggleDay = (day: string) => {
    if (schedule.includes(day)) {
      setSchedule(schedule.filter(d => d !== day));
    } else {
      setSchedule([...schedule, day]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Handle success toast here in a real app
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0a0a1a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Technician
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleCreate} className="p-6 overflow-y-auto no-scrollbar space-y-6">
              
              {/* Basic Info */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2">Basic Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Full Name</label>
                    <input required type="text" placeholder="Sarah Jenkins" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Email Address</label>
                    <input required type="email" placeholder="sarah.j@gadgetfix.com" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                    <input required type="tel" placeholder="(555) 000-0000" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Assigned Branch</label>
                    <select className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none appearance-none">
                      <option>Downtown Main HQ</option>
                      <option>Northside Mall</option>
                      <option>West End Kiosk</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Specializations */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest">Specializations</h3>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Select all that apply</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SPECIALIZATIONS.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpec(spec)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        selectedSpecs.includes(spec) 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </section>

              {/* Schedule */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2">Availability Schedule</h3>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                        schedule.includes(day)
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-[#0a0a1a] shadow-[0_4px_10px_rgba(245,158,11,0.3)]'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </section>

            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isSubmitting ? 'Creating...' : 'Create Profile'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
