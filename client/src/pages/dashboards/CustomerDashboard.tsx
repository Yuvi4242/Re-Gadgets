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
    <div className="w-full h-full relative z-10 px-8 lg:px-12 py-8">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Hero Strip */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 pt-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight h-10">
              {greeting}
              <span className="animate-[pulse_1s_infinite] ml-1">|</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-[var(--text-secondary)] font-medium mt-2"
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
            className="group relative overflow-hidden bg-[var(--color-ember-light)] text-[var(--color-noir-base)] px-8 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(245,166,35,0.2)] transition-all flex items-center gap-2"
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
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ember-dark)] via-[var(--color-ember-light)] to-[var(--color-ember-dark)] animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />
                <div className="relative bg-[var(--color-noir-surface-high)]/90 backdrop-blur-xl rounded-[15px] p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="p-3 bg-[var(--color-ember-light)]/20 rounded-xl relative shadow-[0_0_15px_rgba(245,166,35,0.15)] shrink-0">
                    <Sparkles className="w-6 h-6 text-[var(--color-ember-light)] animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--text-primary)] font-bold flex items-center gap-2">
                      Smart Diagnostic Alert
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded border border-[var(--color-ember-light)]/30 text-[var(--color-ember-light)] bg-[var(--color-ember-light)]/10 tracking-widest">AI Agent</span>
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">We noticed your iPhone 14 Pro's battery health has degraded to 79%. Consider replacing it soon.</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto mt-4 md:mt-0">
                    <button 
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-[var(--border-primary)] transition-colors"
                      onClick={() => alert('Opening fake diagnostic chart modal...')}
                    >
                      Check Battery Health
                    </button>
                    <button 
                      onClick={() => setShowAIAlert(false)}
                      className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--color-noir-surface)] hover:bg-[var(--color-noir-surface-elevated)] rounded-xl transition-colors border border-[var(--border-primary)]"
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
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Recent Activity</h2>
                <button className="text-sm text-[var(--color-ember-light)] hover:text-[var(--color-ember-dark)] flex items-center gap-1 transition-colors">
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
                    className="p-4 rounded-xl bg-[var(--color-noir-surface)] border border-[var(--border-primary)] hover:bg-[var(--color-noir-surface-elevated)] transition-colors flex items-center justify-between text-sm group"
                  >
                    <span className="text-[var(--text-primary)] group-hover:text-[var(--color-ember-light)] transition-colors">{act.text}</span>
                    <span className="text-[var(--text-secondary)]">{act.time}</span>
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
    </div>
  );
}
