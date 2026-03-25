import React from 'react';
import { Bell, Search, User, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../services/utils';

const TopNavbar = ({ role }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="h-20 glass border-b border-[var(--border-primary)] flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* Smart Search Bar */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-[var(--text-secondary)]" />
        </div>
        <input 
          type="text" 
          placeholder={`Search ${role} resources...`} 
          className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-2xl py-3 pl-11 pr-4 text-sm font-medium text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandBlue/30 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex-1 md:hidden"></div>

      {/* Right Toolkit */}
      <div className="flex items-center gap-2 sm:gap-4">
         {/* Theme Toggle */}
         <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-white/10 transition-colors"
         >
            <AnimatePresence mode="wait">
               <motion.div
                  key={theme}
                  initial={{ y: 10, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -10, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2 }}
               >
                  {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-brandBlue" />}
               </motion.div>
            </AnimatePresence>
         </motion.button>

         {/* Notification Bell */}
         <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="relative p-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-white/10 transition-colors"
         >
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
         </motion.button>

         <div className="w-px h-8 bg-[var(--border-primary)] mx-2 hidden sm:block"></div>

         {/* Profile Widget */}
         <div className="flex items-center gap-3 cursor-pointer group p-1 pr-3 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="text-right hidden sm:block">
               <p className="text-[var(--text-primary)] text-sm font-black leading-tight">Alex Vance</p>
               <div className="flex items-center justify-end gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3 text-brandBlue" />
                  <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest">{role}</p>
               </div>
            </div>
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300",
              role === 'admin' ? "bg-rose-500/10 border-rose-500/30 text-rose-500" :
              role === 'worker' ? "bg-amber-500/10 border-amber-500/30 text-amber-500" :
              "bg-brandBlue/10 border-brandBlue/30 text-brandBlue"
            )}>
               <User className="w-5 h-5" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default TopNavbar;
