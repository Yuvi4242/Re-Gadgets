import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Navigation2, CheckCircle2 } from 'lucide-react';

const LiveTrackingSection = () => {
  return (
    <section className="py-24 relative bg-[var(--bg-primary)] bg-film-grain bg-dot-grid overflow-hidden border-t border-[var(--border-primary)]">
      <div className="absolute left-[-10%] top-[20%] w-[40%] h-[60%] bg-[var(--color-ember-dark)]/10 blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Tracking System
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Follow Your Repair <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Every Step of the Way</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8 max-w-xl">
              From the moment our technician picks up your device to the second it's delivered back to you, see real-time location and status updates on a live interactive map.
            </p>
            
            <ul className="space-y-4 mb-10">
              {['GPS tracked delivery & pickup', 'Turn-by-turn repair progress updates', 'Direct chat with your assigned tech'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brandBlue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Right: The Mock UI Wrapper */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative perspective-1000"
          >
            <div className="relative w-full aspect-square max-h-[600px] bg-[#0b1326] rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* Fake Map Background */}
              <div className="absolute inset-0 bg-[#0f172a] opacity-80">
                <div className="w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=800&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent"></div>
              </div>

              {/* Pulsing Location Dot */}
              <div className="absolute top-[40%] left-[45%] z-10">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-4 bg-brandBlue rounded-full blur-md opacity-20"></motion.div>
                <div className="w-4 h-4 rounded-full bg-brandBlue shadow-[0_0_15px_#4f46e5] border-2 border-white relative z-10"></div>
                
                {/* Simulated Path Line */}
                <svg className="absolute top-2 left-2 w-40 h-40 overflow-visible -z-10" viewBox="0 0 100 100">
                   <motion.path 
                     d="M0,0 Q50,20 80,80" 
                     fill="none" 
                     stroke="url(#grad)" 
                     strokeWidth="3"
                     strokeDasharray="5,5"
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     transition={{ duration: 4, repeat: Infinity }}
                   />
                   <defs>
                     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#4f46e5" />
                       <stop offset="100%" stopColor="#9333ea" />
                     </linearGradient>
                   </defs>
                </svg>
              </div>

              {/* Foreground UI Components */}
              <div className="absolute bottom-6 inset-x-6 z-20">
                <div className="bg-[#1e293b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border border-slate-600" alt="Courier" />
                      <div>
                        <div className="text-white font-bold tracking-tight">David Lee</div>
                        <div className="text-brandBlue text-xs font-bold uppercase tracking-wider">Arriving in 12 mins</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brandBlue hover:text-white transition-colors cursor-pointer">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brandBlue flex items-center justify-center text-white"><CheckCircle2 className="w-4 h-4" /></div>
                      <span className="text-[10px] text-white font-bold uppercase">Picked Up</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-brandBlue/30 mx-2"><div className="w-full h-full bg-brandBlue"></div></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brandBlue flex items-center justify-center shadow-[0_0_10px_#4f46e5]">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      </div>
                      <span className="text-[10px] text-brandBlue font-bold uppercase">In Transit</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-slate-700 mx-2"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Quick helper
const PhoneIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

export default LiveTrackingSection;
