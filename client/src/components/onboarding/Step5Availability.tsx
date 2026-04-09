import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Zap } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Step5Availability({ formData, update }: any) {
  const days = formData.days || [];

  const toggleDay = (day: string) => {
    if (days.includes(day)) update({ days: days.filter((d: string) => d !== day) });
    else update({ days: [...days, day] });
  };

  return (
    <div className="w-full bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="mb-8 shrink-0">
         <h2 className="text-2xl font-bold text-white">Availability & Preferences</h2>
         <p className="text-slate-400 mt-1">Set your schedule and branch preferences to match with shop owners.</p>
      </div>

      <div className="space-y-8">
         {/* Days of Week */}
         <section className="bg-black/20 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Calendar className="w-4 h-4"/> Working Days</h3>
            <div className="flex flex-wrap gap-3">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`w-14 h-14 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                    days.includes(day)
                      ? 'bg-cyan-500 text-black shadow-[0_4px_15px_rgba(6,182,212,0.4)]'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
         </section>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Hours */}
           <section className="bg-black/20 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock className="w-4 h-4"/> Working Hours</h3>
              <div className="flex items-center gap-4">
                 <div className="flex-1 space-y-1">
                   <label className="text-xs font-semibold text-slate-400">Start Time</label>
                   <input type="time" className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-cyan-500" value={formData.startTime || '09:00'} onChange={(e) => update({startTime: e.target.value})} style={{colorScheme:'dark'}} />
                 </div>
                 <div className="text-slate-500 mt-5">to</div>
                 <div className="flex-1 space-y-1">
                   <label className="text-xs font-semibold text-slate-400">End Time</label>
                   <input type="time" className="w-full bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-cyan-500" value={formData.endTime || '17:00'} onChange={(e) => update({endTime: e.target.value})} style={{colorScheme:'dark'}} />
                 </div>
              </div>
           </section>

           {/* Location / Work Style */}
           <section className="bg-black/20 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin className="w-4 h-4"/> Work Preferences</h3>
              <div className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-400">Preferred Work Style</label>
                   <select className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none appearance-none" value={formData.workStyle} onChange={(e) => update({workStyle: e.target.value})}>
                     <option>In-Shop Only (Full Time)</option>
                     <option>In-Shop Only (Part Time)</option>
                     <option>Mobile / Call-out Repairs</option>
                     <option>Freelance / Contract</option>
                   </select>
                 </div>
                 
                 <label className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors">
                   <input type="checkbox" className="w-4 h-4 accent-cyan-500 cursor-pointer" checked={formData.emergency || false} onChange={e => update({emergency: e.target.checked})} />
                   <div>
                     <p className="text-sm font-bold text-cyan-400 flex items-center gap-1">Available for Emergency Repairs <Zap className="w-3 h-3 fill-current"/></p>
                     <p className="text-xs text-slate-400">Higher payout, varying hours.</p>
                   </div>
                 </label>
              </div>
           </section>
         </div>
      </div>
    </div>
  );
}
