import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Package, DollarSign } from 'lucide-react';

interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPartModal({ isOpen, onClose }: AddPartModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 600);
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#0a0a1a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" /> Add New Part
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-xs text-slate-400 ml-1">Part Name</label>
                  <input required className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">SKU</label>
                  <input required className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Category</label>
                  <select className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none appearance-none">
                    <option>Screens</option>
                    <option>Batteries</option>
                    <option>Motherboards</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1 flex items-center gap-1"><Package className="w-3 h-3"/> Quantity</label>
                  <input required type="number" min="0" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Min Threshold</label>
                  <input required type="number" min="0" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs text-slate-400 ml-1">Supplier</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs text-slate-400 ml-1 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Unit Cost ($)</label>
                  <input required type="number" step="0.01" min="0" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 p-3 outline-none" />
                </div>
              </div>
            </form>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
              <button type="button" onClick={onClose} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all">
                {isSubmitting ? 'Saving...' : 'Add Part'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
