import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, MessageSquare, Phone, Mail, MapPin, Calculator } from 'lucide-react';

interface OrderDetailDrawerProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailDrawer({ order, isOpen, onClose }: OrderDetailDrawerProps) {
  const [internalNotes, setInternalNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleNotesBlur = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 600); // Mock save
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-[400px] h-screen bg-[#0f0f23] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-[70] flex flex-col overflow-y-auto no-scrollbar"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 sticky top-0 z-10 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-bold text-white">Order {order.id}</h2>
                <p className="text-sm text-slate-400 capitalize">{order.status} • {order.priority} Priority</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8 flex-1">
              {/* Customer Info */}
              <section>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-4">Customer Details</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{order.customer}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3" /> (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    example@mail.com
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                    <button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Send SMS Update
                    </button>
                  </div>
                </div>
              </section>

              {/* Device & Issue */}
              <section>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-4">Device & Issue</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm">Device</span>
                    <span className="text-white font-medium text-right">{order.device}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 text-sm">Reported Issue</span>
                    <span className="text-white font-medium text-right">{order.issue}</span>
                  </div>
                </div>
              </section>

              {/* Technician Assignment */}
              <section>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-4">Assignment</h3>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 pl-1">Assigned Technician</label>
                  <select 
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all p-3 appearance-none outline-none"
                    defaultValue={order.technician}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Sarah Jenkins">Sarah Jenkins (Level 4)</option>
                    <option value="Mike Ross">Mike Ross (Level 2)</option>
                    <option value="Emily Davis">Emily Davis (Level 3)</option>
                  </select>
                </div>
              </section>

              {/* Estimate Tool (Mock) */}
              <section>
                <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Cost Estimate
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Parts</span>
                    <span className="text-white">$85.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Labor</span>
                    <span className="text-white">$60.00</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between items-center font-bold">
                    <span className="text-slate-300">Total</span>
                    <span className="text-amber-400">$145.00</span>
                  </div>
                </div>
              </section>

              {/* Internal Notes */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    Internal Notes
                  </h3>
                  {isSaving && <span className="text-xs text-amber-400 flex items-center gap-1"><Save className="w-3 h-3 animate-pulse" /> Saving...</span>}
                </div>
                <textarea
                  className="w-full bg-black/40 border border-white/10 text-slate-300 text-sm rounded-xl p-3 h-32 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                  placeholder="Technician eyes only..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                ></textarea>
              </section>
            </div>

            {/* Sticky Actions */}
            <div className="p-6 border-t border-white/10 bg-[#0f0f23] sticky bottom-0 z-10 space-y-3">
               <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 py-3 rounded-xl font-medium transition-all text-sm">
                    Cancel Order
                  </button>
                  <button className="bg-brandPurple hover:bg-fuchsia-600 border border-brandPurple text-white py-3 rounded-xl font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all text-sm">
                    Update Status
                  </button>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
