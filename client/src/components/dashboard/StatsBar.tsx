import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Wrench, CheckCircle, Clock, PiggyBank } from 'lucide-react';

const statsData = [
  { id: 1, label: 'Total Repairs', value: 14, icon: Wrench, color: 'from-brandPurple to-fuchsia-600' },
  { id: 2, label: 'Active Repairs', value: 2, icon: Clock, color: 'from-cyan-400 to-blue-600' },
  { id: 3, label: 'Completed', value: 12, icon: CheckCircle, color: 'from-emerald-400 to-teal-500' },
  { id: 4, label: 'Est. Savings', value: 850, icon: PiggyBank, color: 'from-amber-400 to-orange-500', prefix: '$' },
];

// Animated Counter Hook
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

const StatCard = ({ stat, index }: { stat: typeof statsData[0], index: number }) => {
  const count = useCounter(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, borderColor: 'rgba(124,58,237,0.5)', boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)' }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
        <p className="text-3xl font-bold text-white flex items-baseline gap-1">
          {stat.prefix && <span className="text-xl text-slate-300">{stat.prefix}</span>}
          {count}
        </p>
      </div>
    </motion.div>
  );
};

export default function StatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      {statsData.map((stat, i) => (
        <StatCard key={stat.id} stat={stat} index={i} />
      ))}
    </div>
  );
}
