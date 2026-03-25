import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../services/utils';

const Card = ({ children, className = '', hover = true, glass = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-primary)] p-1 transition-all duration-300",
        glass ? "glass" : "shadow-sm hover:shadow-xl dark:shadow-none",
        className
      )}
    >
      <div className="rounded-[1.8rem] bg-white/40 dark:bg-slate-900/40 p-1">
        {children}
      </div>
    </motion.div>
  );
};

export const CardHeader = ({ title, subtitle, icon: Icon, action }) => (
  <div className="px-6 py-5 border-b border-[var(--border-primary)] flex items-center justify-between relative z-10">
    <div className="flex items-center gap-4">
      {Icon && (
        <div className="p-3 rounded-2xl bg-brandBlue/10 text-brandBlue border border-brandBlue/20">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <h3 className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-[var(--text-secondary)] font-medium mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {action && <div className="animate-fade-in">{action}</div>}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={cn("p-6 relative z-10", className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={cn("px-6 py-5 border-t border-[var(--border-primary)] bg-slate-50/30 dark:bg-slate-800/30 relative z-10 rounded-b-[1.8rem]", className)}>
    {children}
  </div>
);

export default Card;
