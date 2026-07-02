import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clipboard, DollarSign, UserCheck, AlertCircle } from 'lucide-react';

const statsData = [
  { id: 1, label: 'Total Orders Today', value: 42, icon: Clipboard, color: 'from-amber to-amber-light' },
  { id: 2, label: 'Revenue This Month', value: 12450, icon: DollarSign, color: 'from-success to-success-light', prefix: '$' },
  { id: 3, label: 'Active Technicians', value: 8, icon: UserCheck, color: 'from-ember to-ember-light' },
  { id: 4, label: 'Pending Approvals', value: 3, icon: AlertCircle, color: 'from-danger to-danger-light', pulse: true },
];

const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
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
      whileHover={{ y: -4, borderColor: 'oklch(0.65 0.19 35 / 0.5)', boxShadow: '0 10px 30px -10px oklch(0.65 0.19 35 / 0.2)' }}
      className="bg-elevated/40 backdrop-blur-md border border-border rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-lg relative`}>
          <Icon className="w-6 h-6 text-white relative z-10" />
          {stat.pulse && stat.value > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-danger border-2 border-noir-base"></span>
            </span>
          )}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
        <p className="text-3xl font-bold text-white flex items-baseline gap-1 font-display">
          {stat.prefix && <span className="text-xl text-slate-300">{stat.prefix}</span>}
          {count.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default function ShopOwnerStatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-8">
      {statsData.map((stat, i) => (
        <StatCard key={stat.id} stat={stat} index={i} />
      ))}
    </div>
  );
}
