import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Tablet, Headphones, AlertTriangle, Battery } from 'lucide-react';

const actions = [
  { id: 1, label: 'Smartphone', icon: Smartphone, color: 'from-blue-400 to-indigo-600' },
  { id: 2, label: 'Laptop', icon: Laptop, color: 'from-purple-400 to-fuchsia-600' },
  { id: 3, label: 'Tablet', icon: Tablet, color: 'from-cyan-400 to-teal-600' },
  { id: 4, label: 'Accessories', icon: Headphones, color: 'from-pink-400 to-rose-600' },
  { id: 5, label: 'Emergency', icon: AlertTriangle, color: 'from-red-400 to-orange-600' },
  { id: 6, label: 'Battery', icon: Battery, color: 'from-emerald-400 to-green-600' },
];

export default function QuickActions() {
  return (
    <div className="mt-8 relative z-10 w-full xl:col-span-1">
      <h2 className="text-xl font-bold text-white mb-6">Quick Book</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 10,
                rotateY: -10,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                borderColor: 'rgba(255,255,255,0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{ perspective: 1000 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center gap-3 transition-colors hover:bg-white/10 group"
            >
              <div className={`p-4 rounded-full bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
