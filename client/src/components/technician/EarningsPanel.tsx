import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { DollarSign, ArrowRight, Wallet, History, AlertCircle } from 'lucide-react';

const earningsData = [
  { week: 'W1', earnings: 450 }, { week: 'W2', earnings: 520 },
  { week: 'W3', earnings: 380 }, { week: 'W4', earnings: 600 },
  { week: 'W5', earnings: 490 }, { week: 'W6', earnings: 580 },
  { week: 'W7', earnings: 650 }, { week: 'W8', earnings: 710 }
];

const payouts = [
  { id: 'PAY-892', date: 'Oct 01, 2026', amount: '$600.00', method: 'Bank Transfer (..4920)', status: 'Completed' },
  { id: 'PAY-891', date: 'Sep 15, 2026', amount: '$450.00', method: 'PayPal', status: 'Completed' },
  { id: 'PAY-890', date: 'Sep 01, 2026', amount: '$520.00', method: 'Bank Transfer (..4920)', status: 'Completed' }
];

export default function EarningsPanel() {
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  return (
    <div className="space-y-6 text-slate-200">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Balance Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#0a0a1a] to-slate-900 border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-[0_0_40px_rgba(6,182,212,0.1)]">
             <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
             
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <Wallet className="w-5 h-5 text-cyan-400" />
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Balance</h2>
               </div>
               <div className="text-5xl font-black text-white tracking-tight flex items-baseline">
                 <span className="text-3xl text-cyan-500 mr-1">$</span>1,240<span className="text-2xl text-slate-500">.50</span>
               </div>
               <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                 <AlertCircle className="w-3 h-3" /> Minimum payout threshold is $100
               </p>
             </div>

             <button onClick={() => setShowPayoutModal(true)} className="w-full mt-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex justify-center items-center gap-2 group">
               Request Payout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-h-[300px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-white">Weekly Earnings (Last 8 Weeks)</h3>
               <span className="text-xs font-bold bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/20">Total: $4,340</span>
             </div>
             <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={earningsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                   <Tooltip 
                     cursor={{fill: 'rgba(255,255,255,0.02)'}}
                     contentStyle={{ backgroundColor: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                     itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                     formatter={(val: number) => [`$${val}`, 'Earnings']}
                   />
                   <Bar dataKey="earnings" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={30} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
       </div>

       {/* Payout History */}
       <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
             <History className="w-5 h-5 text-cyan-400" />
             <h3 className="font-bold text-white">Payout History</h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left whitespace-nowrap">
               <thead>
                 <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider bg-white/5">
                   <th className="p-4 rounded-tl-xl">Ref ID</th>
                   <th className="p-4">Date</th>
                   <th className="p-4 font-bold text-slate-300">Amount</th>
                   <th className="p-4">Method</th>
                   <th className="p-4 rounded-tr-xl">Status</th>
                 </tr>
               </thead>
               <tbody>
                 {payouts.map(p => (
                   <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="p-4 text-sm font-mono text-cyan-400">{p.id}</td>
                     <td className="p-4 text-sm text-slate-300">{p.date}</td>
                     <td className="p-4 text-sm font-black text-white">{p.amount}</td>
                     <td className="p-4 text-sm text-slate-400">{p.method}</td>
                     <td className="p-4">
                       <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                         {p.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
       </div>

       <AnimatePresence>
         {showPayoutModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowPayoutModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="relative w-full max-w-sm bg-[#0a0a1a] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl">
                 <h3 className="text-xl font-bold text-white mb-2">Request Payout</h3>
                 <p className="text-slate-400 text-sm mb-6">Available: <strong className="text-cyan-400">$1,240.50</strong></p>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Amount ($)</label>
                      <input type="number" defaultValue="1240.50" max="1240.50" className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none mt-1 font-bold text-xl" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Method</label>
                      <select className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:border-cyan-500 outline-none mt-1 appearance-none shadow-inner">
                        <option>Bank Transfer (..4920)</option>
                        <option>PayPal (tech@example.com)</option>
                        <option>Venmo (@tech-guy)</option>
                      </select>
                    </div>
                 </div>

                 <div className="mt-8 flex gap-3">
                   <button onClick={() => setShowPayoutModal(false)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">Cancel</button>
                   <button onClick={() => setShowPayoutModal(false)} className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-black text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">Confirm</button>
                 </div>
              </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}
