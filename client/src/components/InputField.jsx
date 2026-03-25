import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../services/utils';

const InputField = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-[var(--text-secondary)] ml-1 tracking-tight">
          {label} {required && <span className="text-brandBlue">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {/* Animated Gradient Border Focus Indicator */}
        <div 
          className={cn(
            "absolute -inset-[2px] bg-gradient-to-r from-brandBlue to-brandPurple rounded-[1.2rem] opacity-0 blur-[2px] transition-opacity duration-300",
            isFocused ? "opacity-40" : ""
          )} 
        />
        
        {/* Input Container */}
        <div className={cn(
          "relative flex items-center w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[1.1rem] overflow-hidden transition-all duration-300",
          isFocused ? "ring-2 ring-brandBlue/20 border-brandBlue/50" : "hover:border-[var(--text-secondary)]/30"
        )}>
          {Icon && (
            <div className={cn(
              "pl-4 flex items-center justify-center transition-colors duration-300",
              isFocused ? "text-brandBlue" : "text-[var(--text-secondary)]"
            )}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-0 py-4 px-4 placeholder-slate-400 dark:placeholder-slate-600 transition-all",
              Icon ? "pl-3" : "pl-5"
            )}
            required={required}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 text-[var(--text-secondary)] hover:text-brandBlue transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-rose-500 font-bold ml-1 flex items-center gap-1.5 overflow-hidden"
          >
            <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputField;
