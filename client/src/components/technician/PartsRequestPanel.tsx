import React, { useState, useEffect } from 'react';
import { Search, PackagePlus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_INVENTORY = [
  { id: 1, name: 'iPhone 13 Pro Screen (OEM)', stock: 12, cost: '$145.00', compatible: 'A2638, A2483' },
  { id: 2, name: 'Samsung S22 Ultra Battery', stock: 3, cost: '$45.00', compatible: 'SM-S908U' },
  { id: 3, name: 'MacBook M1 Trackpad', stock: 0, cost: '$89.00', compatible: 'A2337' },
  { id: 4, name: 'Nintendo Switch Joy-Con Stick', stock: 45, cost: '$8.50', compatible: 'HAC-015' }
];

const DUMMY_REQUESTS = [
  { id: 101, part: 'iPhone 13 Pro Screen (OEM)', qty: 1, status: 'Approved', date: 'Today, 10:45 AM' },
  { id: 102, part: 'Samsung S22 Ultra Battery', qty: 2, status: 'Pending', date: 'Today, 09:12 AM' },
  { id: 103, part: 'Soldering Paste 50g', qty: 1, status: 'Delivered', date: 'Yesterday, 04:30 PM' }
];

export default function PartsRequestPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeReqId, setActiveReqId] = useState<number | null>(null);
  const [reqQty, setReqQty] = useState(1);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const results = debouncedSearch.length > 2 
    ? DUMMY_INVENTORY.filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
         <div>
           <h1 className="text-2xl font-bold text-white leading-tight">Parts & Requisitions</h1>
           <p className="text-slate-400 text-sm mt-1">Search central inventory and request components for your jobs.</p>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inventory Search Block */}
          <div className="space-y-4">
             <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col min-h-[500px]">
                <div className="relative mb-6">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                   <input 
                     type="text" 
                     placeholder="Search parts by name, model, or SKU..."
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all shadow-inner"
                   />
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                   {debouncedSearch.length > 0 && debouncedSearch.length <= 2 && (
                     <p className="text-slate-500 text-center py-10 text-sm font-medium">Keep typing...</p>
                   )}
                   {debouncedSearch.length > 2 && results.length === 0 && (
                     <p className="text-slate-500 text-center py-10 text-sm font-medium">No components found.</p>
                   )}
                   
                   <AnimatePresence>
                      {results.map(part => (
                         <motion.div 
                           key={part.id} 
                           initial={{ opacity: 0, y: 10 }} 
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className={`bg-white/5 border rounded-xl p-4 transition-all ${activeReqId === part.id ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-cyan-500/5' : 'border-white/10 hover:border-white/20'}`}
                         >
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-white text-sm">{part.name}</h3>
                               <div className="flex flex-col items-end gap-1">
                                  <span className="font-mono text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2 rounded border border-cyan-500/20">{part.cost}</span>
                                  {part.stock < 5 && part.stock > 0 && (
                                     <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Low Stock</span>
                                  )}
                               </div>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">Compatible: {part.compatible}</p>
                            
                            <div className="flex items-center justify-between mt-auto">
                               <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${part.stock > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                 {part.stock > 0 ? `${part.stock} in stock` : 'Out of Stock'}
                               </span>
                               
                               {activeReqId === part.id ? (
                                  <div className="flex items-center gap-2">
                                     <input type="number" min="1" max={part.stock} value={reqQty} onChange={e => setReqQty(Number(e.target.value))} className="w-16 bg-black/40 border border-white/10 rounded-lg text-sm text-center py-1.5 focus:border-cyan-500 outline-none text-white" />
                                     <button onClick={() => { setActiveReqId(null); setReqQty(1); }} className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">Cancel</button>
                                     <button className="px-3 py-1.5 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors">Submit</button>
                                  </div>
                               ) : (
                                  <button disabled={part.stock === 0} onClick={() => setActiveReqId(part.id)} className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-black font-bold text-xs flex items-center gap-1 transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                     <PackagePlus className="w-3 h-3"/> Request
                                  </button>
                               )}
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                </div>
             </div>
          </div>

          {/* My Requests Track */}
          <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
             <h2 className="text-lg font-bold text-white mb-6">My Recent Requests</h2>
             <div className="space-y-4 flex-1">
                {DUMMY_REQUESTS.map(req => (
                   <div key={req.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <span className="text-cyan-500 text-xs font-mono bg-cyan-500/10 px-1 rounded">x{req.qty}</span>
                          {req.part}
                        </h4>
                        <p className="text-xs text-slate-500">{req.date}</p>
                      </div>
                      
                      <div>
                        {req.status === 'Approved' && (
                          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                          </div>
                        )}
                        {req.status === 'Pending' && (
                          <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold flex items-center gap-1 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
                            <Clock className="w-3.5 h-3.5 relative z-10" /> <span className="relative z-10">Pending</span>
                          </div>
                        )}
                        {req.status === 'Delivered' && (
                          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold flex items-center gap-1">
                            <PackagePlus className="w-3.5 h-3.5" /> Delivered
                          </div>
                        )}
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
