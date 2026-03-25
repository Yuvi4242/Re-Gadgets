import React from 'react';
import { motion } from 'framer-motion';
import { Database, Wrench, BarChart3, ShoppingBag } from 'lucide-react';

const Placeholder = ({ title, role }) => {
  const getTheme = () => {
    switch (role) {
      case 'admin': return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', icon: Database };
      case 'worker': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', icon: Wrench };
      case 'owner': return { bg: 'bg-brandPurple/10', text: 'text-brandPurple', border: 'border-brandPurple/20', icon: BarChart3 };
      case 'customer':
      default: return { bg: 'bg-brandBlue/10', text: 'text-brandBlue', border: 'border-brandBlue/20', icon: ShoppingBag };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div className={`w-full h-[60vh] flex flex-col items-center justify-center rounded-3xl border border-white/5 ${role === 'customer' ? 'bg-white shadow-xl' : 'bg-[#0b1326] shadow-2xl relative overflow-hidden'}`}>
       
       {role !== 'customer' && (
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[80px] rounded-full mix-blend-screen opacity-20 ${theme.bg.replace('/10', '')}`}></div>
       )}

       <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ type: "spring", bounce: 0.5 }}
         className="flex flex-col items-center relative z-10"
       >
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-2xl border ${theme.bg} ${theme.border}`}>
             <Icon className={`w-12 h-12 ${theme.text}`} />
          </div>
          
          <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${role === 'customer' ? 'text-slate-800' : 'text-white'}`}>
            {title} Module
          </h1>
          <p className={`font-medium max-w-sm text-center px-4 ${role === 'customer' ? 'text-slate-500' : 'text-slate-400'}`}>
            This interface is currently being engineered. Check back shortly for the full data grid deployment.
          </p>

          <div className="mt-8 flex gap-3">
             <div className="h-2 w-2 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: '0ms' }}></div>
             <div className="h-2 w-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
             <div className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
       </motion.div>
    </div>
  );
};

export default Placeholder;
