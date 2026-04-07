import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Activity, Clock, LogOut, Zap, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThreeBackground from '../dashboard/ThreeBackground';
import TechnicianSidebar from './TechnicianSidebar';
import QuickDiagnosticTool from './QuickDiagnosticTool';

export default function TechnicianLayout({ children, activePanel, setActivePanel }: any) {
  const { user, logout } = useAuth();
  const [timeStr, setTimeStr] = useState('00:00:00');
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showClockOutConfirm, setShowClockOutConfirm] = useState(false);
  const [showDiagModal, setShowDiagModal] = useState(false);

  // Live elapsed session timer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      setSecondsElapsed(diff);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOvertime = secondsElapsed > (8 * 3600); // Over 8 hours turns red

  const handleClockOut = () => {
    logout();
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col font-sans">
      <ThreeBackground />
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-20 bg-[#0a0a1a]/60 backdrop-blur-2xl border-b border-white/10 z-40 px-6 flex items-center justify-between shadow-2xl"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <span className="text-xl font-black text-black">G</span>
             </div>
             <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 hidden sm:block">
               GadgetFix
             </span>
          </div>

          <div className="relative hidden md:block w-96 ml-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search jobs, parts, manuals..."
              className="w-full h-11 bg-black/40 border border-white/10 rounded-full pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/10 rounded-full text-[10px] font-bold text-slate-400">⌘K</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5">
           {/* Session Pill */}
           <div className="hidden lg:flex items-center bg-black/50 border border-cyan-500/20 rounded-full px-4 h-10 shadow-inner">
              <div className="relative flex items-center justify-center mr-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping opacity-50" />
              </div>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                Station 04 
                <span className={`px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 ${isOvertime ? 'text-red-400 border-red-500/30 font-black' : 'text-slate-300'}`}>
                  {timeStr}
                </span>
              </span>
           </div>

           {/* Quick Action */}
           <button onClick={() => setShowDiagModal(true)} className="hidden sm:flex items-center gap-2 px-4 h-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group">
              <Zap className="w-4 h-4 fill-cyan-400/20 group-hover:fill-cyan-400 transition-colors" /> Quick Diagnostic
           </button>

           <div className="w-px h-6 bg-white/10 hidden sm:block mx-1"></div>

           <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors group">
             <Bell className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
             <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-[#0a0a1a]"></span>
           </button>

           {/* Clock Out */}
           <button onClick={() => setShowClockOutConfirm(true)} className="flex items-center gap-2 px-5 h-10 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-full text-black text-sm font-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
             <LogOut className="w-4 h-4" /> <span className="hidden sm:block">Clock Out</span>
           </button>
        </div>
      </motion.nav>

      {/* MAIN CONTAINER */}
      <div className="flex flex-1 pt-20 relative z-10 w-full h-[100vh] overflow-hidden">
        <TechnicianSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        
        <main className="flex-1 h-full overflow-y-auto no-scrollbar relative">
           <div className="p-6 lg:p-10 pb-32">
             {children}
           </div>
        </main>
      </div>

      {/* Clock Out Confirm Modal */}
      <AnimatePresence>
         {showClockOutConfirm && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowClockOutConfirm(false)} />
             <motion.div initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0}} className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6">
                  <LogOut className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Ready to Clock Out?</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Your current session time of <strong className="text-white">{timeStr}</strong> will be logged to your timesheet. Active jobs will remain in their current state.</p>
                <div className="flex gap-3 w-full">
                  <button onClick={() => setShowClockOutConfirm(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all">Cancel</button>
                  <button onClick={handleClockOut} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl text-black font-black shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">End Shift</button>
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* Quick Diagnostic Modal */}
      <AnimatePresence>
         {showDiagModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDiagModal(false)} />
             <motion.div initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0}} className="relative w-full max-w-3xl bg-[#0a0a1a] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                <div className="p-4 border-b border-white/10 bg-cyan-500/5 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" /> Ai Diagnostic Assistant
                  </h3>
                  <button onClick={() => setShowDiagModal(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Diagnostic component goes here */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                   <QuickDiagnosticTool onClose={() => setShowDiagModal(false)} />
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
