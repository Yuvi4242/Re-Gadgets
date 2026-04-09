import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Plus, Watch, Settings as SettingsIcon } from 'lucide-react';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SchedulePanel() {
  const [activeDay, setActiveDay] = useState(0);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
         <div>
           <h1 className="text-2xl font-bold text-white mb-1">My Schedule</h1>
           <p className="text-slate-400 text-sm">Manage your upcoming shifts and time-off requests.</p>
         </div>
         <button onClick={() => setShowLeaveModal(true)} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold transition-all text-sm flex items-center gap-2">
           <Plus className="w-4 h-4" /> Request Leave
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-6">
            {/* Weekly Grid */}
            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="font-bold text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-cyan-400" /> Current Week
                 </h2>
                 <div className="text-xs font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-400">
                   Oct 12 - Oct 18, 2026
                 </div>
               </div>

               <div className="grid grid-cols-7 gap-2">
                 {WEEK_DAYS.map((day, idx) => (
                   <button 
                     key={day}
                     onClick={() => setActiveDay(idx)}
                     className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                       activeDay === idx 
                         ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                         : idx === 5 || idx === 6 
                           ? 'bg-red-500/5 text-red-400 border-red-500/20 hover:bg-red-500/10'
                           : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                     }`}
                   >
                     <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{day}</span>
                     <span className="text-lg font-black">{12 + idx}</span>
                     {(idx < 5) && (
                       <div className={`mt-2 w-full h-1 rounded-full ${activeDay === idx ? 'bg-black/30' : 'bg-cyan-500/50'}`} />
                     )}
                   </button>
                 ))}
               </div>
            </div>

            {/* Jobs list for active day */}
            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
               <h3 className="font-bold text-white mb-6 flex items-center justify-between">
                 Scheduled Jobs
                 <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-bold">
                   {activeDay > 4 ? 'Day Off' : '3 Jobs'}
                 </span>
               </h3>

               {activeDay > 4 ? (
                 <div className="text-center py-10">
                   <p className="text-slate-500 text-sm font-medium">You have no shifts scheduled for this day.</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {[
                     { time: '09:00 AM', type: 'Screen Replace', device: 'iPhone 13' },
                     { time: '11:30 AM', type: 'Battery Swap', device: 'Samsung S21' },
                     { time: '02:00 PM', type: 'Diagnostics', device: 'MacBook Air' }
                   ].map((job, j) => (
                     <div key={j} className="flex gap-4 p-4 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors group">
                        <div className="w-24 shrink-0 flex flex-col justify-center border-r border-white/10">
                          <span className="text-sm font-bold text-white">{job.time}</span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">Scheduled</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-cyan-400">{job.type}</h4>
                          <p className="text-xs text-slate-300">{job.device}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24">
               <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest"><Clock className="w-4 h-4 inline-block mr-2 text-cyan-400" /> Time Tracking</h3>
               
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">This Week Hours</p>
                     <p className="text-2xl font-black text-white">32.5 <span className="text-sm text-slate-500">/ 40h</span></p>
                   </div>
                   <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-cyan-500 w-[80%] rounded-full"></div>
                   </div>
                 </div>
               </div>

               <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Upcoming</h3>
               <div className="space-y-3">
                 <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                   <p className="text-xs font-bold text-cyan-400 mb-1">Company Meeting</p>
                   <p className="text-[10px] text-slate-300">Fri, Oct 16 • 08:30 AM</p>
                 </div>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {showLeaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowLeaveModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Request Time Off</h3>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400">Start Date</label>
                        <input type="date" className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 mt-1 focus:border-cyan-500 outline-none" style={{colorScheme:'dark'}}/>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">End Date</label>
                        <input type="date" className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 mt-1 focus:border-cyan-500 outline-none" style={{colorScheme:'dark'}}/>
                      </div>
                   </div>
                   <div>
                     <label className="text-xs text-slate-400">Reason / Type</label>
                     <select className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 mt-1 focus:border-cyan-500 outline-none appearance-none">
                       <option>Sick Leave</option>
                       <option>Vacation / PTO</option>
                       <option>Personal Emergency</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs text-slate-400">Notes to Shop Owner</label>
                     <textarea className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-3 mt-1 focus:border-cyan-500 outline-none resize-none h-24" placeholder="Briefly explain..."></textarea>
                   </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowLeaveModal(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold">Cancel</button>
                  <button onClick={() => setShowLeaveModal(false)} className="flex-1 py-3 bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">Submit Request</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
