import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, AlertCircle } from 'lucide-react';
import { createShopWorker } from '../../services/shopService';
import { toast } from 'react-hot-toast';

interface AddTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopId?: string | null;
}

const AVAILABLE_SPECIALIZATIONS = ['Screens', 'Batteries', 'Motherboards', 'Water Damage', 'Software', 'Data Recovery'];

export default function AddTechnicianModal({ isOpen, onClose, shopId }: AddTechnicianModalProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopId) {
      toast.error('Shop not found');
      return;
    }
    setIsSubmitting(true);
    try {
      await createShopWorker(shopId, {
        name: form.name,
        email: form.email || undefined,
        phone: form.phone || undefined,
        skills: selectedSpecs,
      });
      toast.success('Technician added');
      setForm({ name: '', email: '', phone: '' });
      setSelectedSpecs([]);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add technician');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0a0a1a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                Add New Technician
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 overflow-y-auto no-scrollbar space-y-6">
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest border-b border-white/10 pb-2">
                  Basic Info
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Email (links login if technician exists)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest">Specializations</h3>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Select all that apply
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SPECIALIZATIONS.map((spec) => (
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
            </form>

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
