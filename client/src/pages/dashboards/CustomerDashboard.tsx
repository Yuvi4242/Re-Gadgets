import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, Activity } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsBar from '../../components/dashboard/StatsBar';
import ActiveRepairs from '../../components/dashboard/ActiveRepairs';
import QuickActions from '../../components/dashboard/QuickActions';
import RepairTimeline from '../../components/dashboard/RepairTimeline';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [showAIAlert, setShowAIAlert] = useState(true);
  const [greeting, setGreeting] = useState('');
  
  const firstName = user?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Alex';
  const fullGreeting = `Welcome back, ${firstName}`;

  // Typewriter effect for greeting
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setGreeting(fullGreeting.substring(0, i + 1));
      i++;
      if (i === fullGreeting.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullGreeting]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Hero Strip */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 pt-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight h-10">
              {greeting}
              <span className="animate-[pulse_1s_infinite] ml-1">|</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-slate-400 font-medium mt-2"
            >
              Your personal GadgetFix command center.
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden bg-brandPurple text-white px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center gap-2"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Activity className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Book New Repair</span>
          </motion.button>
        </section>

        {/* Smart AI Alert Banner */}
        <AnimatePresence>
          {showAIAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 mb-8"
            >
              <div className="relative p-[1px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-brandPurple via-cyan-400 to-brandPurple animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />
                <div className="relative bg-[#0a0a1a]/90 backdrop-blur-xl rounded-[15px] p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="p-3 bg-brandPurple/20 rounded-xl relative shadow-[0_0_15px_rgba(124,58,237,0.3)] shrink-0">
                    <Sparkles className="w-6 h-6 text-brandPurple animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      Smart Diagnostic Alert
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded border border-brandPurple/30 text-brandPurple bg-brandPurple/10 tracking-widest">AI Agent</span>
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">We noticed your iPhone 14 Pro's battery health has degraded to 79%. Consider replacing it soon.</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto mt-4 md:mt-0">
                    <button 
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/10 transition-colors"
                      onClick={() => alert('Opening fake diagnostic chart modal...')}
                    >
                      Check Battery Health
                    </button>
                    <button 
                      onClick={() => setShowAIAlert(false)}
                      className="p-2.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <StatsBar />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
          <div className="xl:col-span-2 space-y-8">
            <ActiveRepairs />
            
            {/* Recent Activity Feed */}
            <div className="relative z-10 w-full pt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <button className="text-sm text-brandPurple hover:text-cyan-400 flex items-center gap-1 transition-colors">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { text: 'Diagnostic complete for MacBook Pro M2', time: '2 hours ago', type: 'info' },
                  { text: 'Payment of $149.00 received', time: 'Yesterday', type: 'success' },
                  { text: 'iPhone 13 Screen Replacement completed', time: 'Jan 15', type: 'success' },
                ].map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between text-sm group"
                  >
                    <span className="text-white group-hover:text-cyan-300 transition-colors">{act.text}</span>
                    <span className="text-slate-500">{act.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <QuickActions />
            <RepairTimeline />
          </div>
        </div>

      </div>

      {/* Subtle Grid Background for Main Area */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </DashboardLayout>
  );
}
