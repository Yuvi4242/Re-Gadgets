import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Zap } from 'lucide-react';

const areaData = [
  { name: 'W1', jobs: 12 }, { name: 'W2', jobs: 19 }, { name: 'W3', jobs: 15 },
  { name: 'W4', jobs: 25 }, { name: 'W5', jobs: 22 }, { name: 'W6', jobs: 30 }
];

const radarData = [
  { subject: 'Screen', A: 95, fullMark: 100 },
  { subject: 'Battery', A: 90, fullMark: 100 },
  { subject: 'Motherboard', A: 65, fullMark: 100 },
  { subject: 'Water Damage', A: 75, fullMark: 100 },
  { subject: 'Software', A: 85, fullMark: 100 },
];

export default function PerformancePanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="space-y-6 text-slate-200">
      <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2 leading-tight">My Performance Analytics</h1>
        <p className="text-slate-400 text-sm">Real-time breakdown of your repair metrics and proficiency mapping.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Top Stats */}
         <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Award className="w-3.5 h-3.5"/> All-Time Jobs</span>
              <span className="text-3xl font-black text-white">482</span>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-center border-b-2 border-b-cyan-500">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">This Month</span>
              <span className="text-3xl font-black text-cyan-400">94 <span className="text-xs font-semibold text-emerald-400">↑ 12%</span></span>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-5 flex flex-col justify-center">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Zap className="w-3.5 h-3.5 fill-amber-500/20"/> Fastest Repair</span>
              <span className="text-3xl font-black text-white">8<span className="text-sm text-slate-400 font-bold ml-1">min</span></span>
              <span className="text-[10px] text-amber-500 mt-1">iPhone 12 Battery</span>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Rating</span>
              <span className="text-3xl font-black text-white flex items-baseline gap-1">4.9 <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" /></span>
            </div>
         </div>

         {/* Area Chart */}
         <div className="lg:col-span-2 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-cyan-400" /> Jobs Completed (Last 6 Weeks)</h3>
            <div className="flex-1 w-full h-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 26, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                    itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="jobs" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorJobs)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Radar Chart */}
         <div className="lg:col-span-1 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col items-center">
            <h3 className="font-bold text-white w-full text-left mb-2">Proficiency Radar</h3>
            <p className="text-xs text-slate-500 w-full text-left mb-4">Skill vector based on repair success rate.</p>
            <div className="flex-1 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar name="Proficiency" dataKey="A" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Review Distribution & Recent */}
         <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
               <h3 className="font-bold text-white mb-6">Customer Ratings</h3>
               <div className="space-y-3">
                 {[
                   { s: 5, p: 85 }, { s: 4, p: 10 }, { s: 3, p: 3 }, { s: 2, p: 1 }, { s: 1, p: 1 }
                 ].map((r, i) => (
                   <div key={r.s} className="flex items-center gap-3 text-sm">
                     <span className="w-12 text-slate-400 font-bold flex items-center justify-end gap-1">{r.s} <Star className="w-3 h-3 fill-current" /></span>
                     <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                       {mounted && (
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${r.p}%` }}
                           transition={{ duration: 1, delay: i * 0.1, type: 'spring' }}
                           className={`h-full rounded-full ${r.s >= 4 ? 'bg-cyan-500' : r.s === 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                         />
                       )}
                     </div>
                     <span className="w-8 text-right font-medium text-slate-500 text-xs">{r.p}%</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
               <h3 className="font-bold text-white mb-4">Latest Feedback</h3>
               <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-white text-sm">"Incredible speed!"</span>
                       <div className="flex gap-0.5 text-cyan-400">
                         {[1,2,3,4,5].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                       </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">"Highly recommend this guy, fixed my broken camera in 15 mins." — R. Stark</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-white text-sm">"Very professional"</span>
                       <div className="flex gap-0.5 text-cyan-400">
                         {[1,2,3,4,5].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                       </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">"He explained everything before opening the device. Super trustworthy." — N. Romanoff</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
