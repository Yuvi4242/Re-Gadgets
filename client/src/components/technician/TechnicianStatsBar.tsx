import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle, Timer, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Simple counter hook for animating numbers on mount
const useCounter = (endNum: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const tick = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(endNum * easeProgress));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(endNum); // Ensure it strictly ends on exactly endNum
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [endNum, duration]);

  return count;
};

export default function TechnicianStatsBar() {
  const { user } = useAuth();
  
  const jobsToday = useCounter(6);
  const completed = useCounter(24);
  const avgTime = useCounter(45);
  // Custom display for rating
  const [rating, setRating] = useState(0);
  useEffect(() => {
     let start = 0;
     const dur = 1000;
     const startTime = Date.now();
     const interval = setInterval(() => {
        const timePassed = Date.now() - startTime;
        if(timePassed >= dur) {
           setRating(4.8);
           clearInterval(interval);
           return;
        }
        setRating(Number(((timePassed / dur) * 4.8).toFixed(1)));
     }, 30);
     return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Jobs Today', value: jobsToday, icon: Wrench, color: 'text-ember', bg: 'bg-ember/10', border: 'border-ember/20' },
    { title: 'Completed This Week', value: completed, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
    { title: 'Avg Repair Time', value: avgTime, suffix: 'min', icon: Timer, color: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/20' },
    { title: 'My Rating', value: rating, suffix: '★', icon: Star, color: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/20', isDecimal: true },
  ];

  return (
    <div className="mb-8">
      {/* Dynamic Typewriter Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight h-10 flex items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="overflow-hidden whitespace-nowrap border-r-2 border-ember pr-2"
            transition={{ duration: 1.5, ease: "linear" }}
            onAnimationComplete={(definition: any) => {
               // Remove border after typwriter
               if(definition.width) {
                  document.querySelector('.typewriter-cursor')?.classList.add('hidden');
               }
            }}
          >
            Welcome back, {user?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Technician'}!
            <span className="typewriter-cursor"></span>
          </motion.div>
        </h1>
        <p className="text-slate-400 font-medium text-sm mt-1 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
           You have <strong className="text-ember">4 active jobs</strong> today holding priority.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`bg-elevated/40 backdrop-blur-xl border ${stat.border} rounded-2xl p-5 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
              
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.title}</p>
                  <h3 className="text-3xl font-black text-white flex items-baseline gap-1">
                    {stat.value}
                    {stat.suffix && <span className="text-sm font-bold text-slate-500">{stat.suffix}</span>}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} border ${stat.border} shadow-lg shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
