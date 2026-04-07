import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Square, Pause, Save, CheckCircle2, Phone, MessageSquare, AlertTriangle, User, Share } from 'lucide-react';

export default function JobDetailModal({ job, onClose, updateJob }: any) {
  const [notes, setNotes] = useState(job.notes || '');
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(job.timeSpent || 0);
  
  // Real implementaton would use intervals for the timer
  // This is a UI mock

  const parts = [
    { id: 1, name: 'iPhone 13 Pro OLED Assembly (OEM)', used: true },
    { id: 2, name: 'Water Resistance Seal', used: false },
    { id: 3, name: 'Bottom Pentalobe Screws (x2)', used: true }
  ];

  const steps = [
    { id: 1, text: 'Initial device evaluation & test', done: true },
    { id: 2, text: 'Screen removal & frame cleaning', done: true },
    { id: 3, text: 'Apply new water tight seal', done: false },
    { id: 4, text: 'FaceID flex transfer & testing', done: false },
    { id: 5, text: 'Final assembly & QA testing', done: false }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
       <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
       
       <motion.div 
         initial={{ y: '100%', opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: '100%', opacity: 0 }}
         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         className="relative w-full h-[95vh] sm:h-auto sm:max-h-[90vh] sm:max-w-6xl bg-[#0a0a1a] sm:rounded-3xl border-t sm:border border-white/10 shadow-2xl flex flex-col overflow-hidden"
       >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/5">
             <div className="flex items-center gap-4">
                <span className="font-mono text-xl font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">{job.jobId}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:block ${job.priority === 'HIGH' ? 'text-red-400 border-red-500/30' : 'text-slate-400 border-white/10'}`}>
                  {job.priority} PRIORITY
                </span>
             </div>
             <div className="flex items-center gap-3">
               <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 rounded-full px-4 h-10 mr-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${timerRunning ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></div>
                  <span className="font-mono text-white text-sm font-bold">00:45:12</span>
                  <div className="flex items-center gap-1 ml-3 border-l border-white/10 pl-3">
                     <button onClick={() => setTimerRunning(!timerRunning)} className="p-1 hover:text-cyan-400"><Play className="w-4 h-4"/></button>
                     <button className="p-1 hover:text-red-400"><Square className="w-4 h-4"/></button>
                  </div>
               </div>
               <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
               </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Col (Main Info & Actions) */}
                <div className="lg:col-span-8 space-y-8">
                   <div className="flex gap-6">
                      <div className="w-32 h-32 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative group">
                        <img src={`https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=300&q=80`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Device" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center text-[10px] font-bold text-white">Before Photo</div>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div>
                          <h2 className="text-2xl font-black text-white">{job.device}</h2>
                          <p className="text-sm text-cyan-400 font-semibold">Customer Issue: {job.issue}</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1">
                             <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Passcode</p>
                             <p className="font-mono text-white tracking-widest text-sm">240899</p>
                           </div>
                           <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1">
                             <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">IMEI / Serial</p>
                             <p className="font-mono text-white text-sm">358204992</p>
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <h3 className="font-bold text-white flex items-center gap-2"><Share className="w-4 h-4"/> Repair Checklist</h3>
                       <span className="text-xs text-slate-400 font-medium">2 of 5 completed</span>
                     </div>
                     <div className="space-y-2">
                        {steps.map(step => (
                          <label key={step.id} className="flex items-center gap-3 p-3 bg-black/40 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                            <input type="checkbox" defaultChecked={step.done} className="w-4 h-4 accent-cyan-500" />
                            <span className={`text-sm ${step.done ? 'text-slate-400 line-through' : 'text-slate-200 font-medium'}`}>{step.text}</span>
                          </label>
                        ))}
                     </div>
                   </div>

                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white"><span className="text-cyan-400">#</span> Technician Notes</h3>
                        <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1"><Save className="w-3 h-3"/> Auto-saved</span>
                      </div>
                      <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none min-h-[150px] resize-none"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Log diagnostic findings, screw sizes, internal notes..."
                      />
                   </div>
                </div>

                {/* Right Col (Meta & Parts) */}
                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-1"><User className="w-4 h-4"/> Customer Details</h3>
                      
                      <div className="space-y-3">
                         <div className="flex items-center justify-between">
                           <span className="text-slate-300 font-bold">{job.customer}</span>
                           <span className="text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded font-bold uppercase">VIP Member</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm text-slate-400">
                           <Phone className="w-4 h-4 shrink-0" /> (555) 123-4567
                         </div>
                         <div className="flex items-start gap-2 text-sm text-slate-400">
                           <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" /> 
                           <span className="text-xs leading-relaxed italic">"Please make sure not to wipe data, holding important photos."</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-black/40 border border-white/10 p-5 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Parts Consumed</h3>
                        <button className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300">Request Part</button>
                      </div>
                      <div className="space-y-3">
                        {parts.map(p => (
                          <div key={p.id} className="flex items-center justify-between gap-3">
                            <span className="text-xs text-slate-300 truncate font-medium flex-1">{p.name}</span>
                            {p.used ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/20 shrink-0"></div>
                            )}
                          </div>
                        ))}
                      </div>
                   </div>

                   <button className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-xl text-black font-black flex items-center justify-center gap-2 transition-all">
                     Move to QC & Testing
                   </button>

                   <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
                     <AlertTriangle className="w-4 h-4" /> Escalate to Shop Owner
                   </button>
                </div>

             </div>
          </div>
       </motion.div>
    </div>
  );
}
