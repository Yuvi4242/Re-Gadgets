import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../services/utils';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brandBlue/50 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-brandBlue to-brandPurple text-white shadow-lg shadow-brandBlue/20 hover:shadow-brandBlue/40",
    secondary: "glass text-[var(--text-primary)] hover:bg-white/20 dark:hover:bg-slate-800/40",
    outline: "bg-transparent border-2 border-brandBlue/30 text-brandBlue hover:border-brandBlue hover:bg-brandBlue/5",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:text-brandBlue hover:bg-brandBlue/5",
    danger: "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      whileHover={!isLoading ? { y: -2 } : {}}
      className={cn(
        baseStyles,
        fullWidth ? "w-full" : "",
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        <span className="relative z-10 flex items-center gap-2 justify-center">
          {children}
        </span>
      )}
      
      {/* Shine effect on hover */}
      {!isLoading && variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] transition-transform pointer-events-none" />
      )}
    </motion.button>
  );
};

export default Button;
