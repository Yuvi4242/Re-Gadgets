import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, X, RefreshCw } from 'lucide-react';

const dummyPromotions = [
  { id: 1, code: 'NEWCUSTOMER15', discount: '15%', validUntil: 'Dec 31, 2026', usage: 42, maxUsage: 100, status: 'Active' },
  { id: 2, code: 'SCREENFIX50', discount: '$50', validUntil: 'Nov 15, 2026', usage: 12, maxUsage: 50, status: 'Active' },
  { id: 3, code: 'SUMMER20', discount: '20%', validUntil: 'Aug 31, 2026', usage: 89, maxUsage: 100, status: 'Expired' },
];

export default function PromotionsPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotions, setPromotions] = useState(dummyPromotions);

  const handleRenew = (id: number) => {
    setPromotions(promotions.map(p => p.id === id ? { ...p, status: 'Active', validUntil: 'Dec 31, 2026' } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Promotions & Discounts</h2>
          <p className="text-slate-400 text-sm">Manage discount codes and promotional campaigns.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Promotion
        </button>
      </div>

      <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider bg-black/20">
                <th className="p-5 font-semibold pl-8">Promo Code</th>
                <th className="p-5 font-semibold">Discount</th>
                <th className="p-5 font-semibold">Valid Until</th>
                <th className="p-5 font-semibold">Usage</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className={`border-b border-white/5 transition-colors ${promo.status === 'Expired' ? 'opacity-60 bg-white/[0.01]' : 'hover:bg-white/5'}`}>
                  <td className="p-5 pl-8">
                    <span className="font-mono font-bold px-2 py-1 bg-white/5 border border-white/10 rounded text-amber-500 text-sm">{promo.code}</span>
                  </td>
                  <td className="p-5 text-white font-bold">{promo.discount}</td>
                  <td className="p-5 text-slate-400 text-sm">{promo.validUntil}</td>
                  <td className="p-5 text-sm text-slate-300">
                    {promo.usage} / {promo.maxUsage}
                    <div className="h-1 w-full bg-white/10 rounded-full mt-1.5 max-w-[100px]">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(promo.usage/promo.maxUsage)*100}%` }} />
                    </div>
                  </td>
                  <td className="p-5">
                    {promo.status === 'Active' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">Active</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">Expired</span>
                    )}
                  </td>
                  <td className="p-5 pr-8 text-right">
                    {promo.status === 'Expired' && (
                      <button 
                        onClick={() => handleRenew(promo.id)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-slate-300 rounded-lg text-xs font-semibold transition-all flex items-center justify-end gap-1.5 ml-auto"
                      >
                        <RefreshCw className="w-3 h-3" /> Renew
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic Create Promotion Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden p-6">
              <h3 className="text-xl font-bold text-white mb-6">Create Promotion</h3>
              <div className="space-y-4">
                 <div>
                   <label className="text-xs text-slate-400">Promo Code</label>
                   <div className="flex gap-2 mt-1">
                     <input type="text" placeholder="e.g. SUMMER24" className="flex-1 bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none font-mono uppercase" />
                     <button className="px-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10">Gen</button>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-xs text-slate-400">Type</label>
                     <select className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 mt-1 outline-none appearance-none"><option>Percentage (%)</option><option>Fixed ($)</option></select>
                   </div>
                   <div>
                     <label className="text-xs text-slate-400">Amount</label>
                     <input type="number" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 mt-1 outline-none" />
                   </div>
                 </div>
                 <div>
                   <label className="text-xs text-slate-400">Expiry Date</label>
                   <input type="date" className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 mt-1 outline-none" style={{ colorScheme: 'dark' }} />
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                 <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white/5 text-white rounded-xl text-sm">Cancel</button>
                 <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-amber-500 text-black font-bold rounded-xl text-sm">Create</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
