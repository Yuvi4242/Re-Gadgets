import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Star, Clock, Home, // Customer
  Store, Users, BarChart3, Settings, // Shop
  Wrench, CheckCircle, ListTodo, // Technician
  ShieldAlert, Database, // Admin
  LogOut, Award, Zap
} from 'lucide-react';
import { cn } from '../../services/utils';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const roleNav = {
    customer: [
      { name: 'My Dashboard', path: '/customer/dashboard', icon: Home },
      { name: 'Active Orders', path: '/customer/orders', icon: ShoppingBag },
      { name: 'History', path: '/customer/history', icon: Clock },
      { name: 'Reviews', path: '/customer/reviews', icon: Star },
    ],
    owner: [
      { name: 'Shop HQ', path: '/shop/dashboard', icon: Store },
      { name: 'Incoming Requests', path: '/shop/requests', icon: ListTodo },
      { name: 'Technicians', path: '/shop/technicians', icon: Users },
      { name: 'Earnings', path: '/shop/earnings', icon: BarChart3 },
    ],
    worker: [
      { name: 'My Jobs', path: '/technician/dashboard', icon: Wrench },
      { name: 'Active Repair', path: '/technician/active', icon: Clock },
      { name: 'Completed Logs', path: '/technician/completed', icon: CheckCircle },
    ],
    admin: [
      { name: 'Master Control', path: '/admin/dashboard', icon: ShieldAlert },
      { name: 'User Matrix', path: '/admin/users', icon: Users },
      { name: 'Platform Stats', path: '/admin/analytics', icon: BarChart3 },
      { name: 'System Logs', path: '/admin/logs', icon: Database },
    ],
  };

  const currentNav = roleNav[role] || roleNav['customer'] || [];

  const getThemeColor = () => {
     if (role === 'admin') return 'rose';
     if (role === 'worker') return 'amber';
     return 'brandBlue';
  };

  const color = getThemeColor();

  return (
    <div className="w-72 h-full bg-[var(--bg-primary)] border-r border-[var(--border-primary)] flex flex-col relative z-20 transition-all duration-300">
      
      {/* Brand Header */}
      <div className="p-8 pb-6 flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-[1.2rem] flex items-center justify-center shadow-xl text-white font-black text-2xl animate-pulse-glow",
          role === 'admin' ? "bg-gradient-to-br from-rose-500 to-rose-700 shadow-rose-500/20" :
          role === 'worker' ? "bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-500/20" :
          "bg-gradient-to-br from-brandBlue to-brandPurple shadow-brandBlue/20"
        )}>
          R
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">Re-Gadgets</span>
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            role === 'admin' ? "text-rose-500" :
            role === 'worker' ? "text-amber-500" :
            "text-brandBlue"
          )}>
            {role} Interface
          </span>
        </div>
      </div>

      {/* Gamification User Profile */}
      <div className="mx-6 my-4 p-4 rounded-3xl bg-slate-500/5 border border-[var(--border-primary)] relative overflow-hidden group">
         <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-200 to-white dark:from-slate-700 dark:to-slate-900 border border-white/20 flex items-center justify-center shrink-0">
               <span className="text-xs font-black">AV</span>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-black text-[var(--text-primary)] truncate">Alex Vance</p>
               <div className="flex items-center gap-2 mt-0.5">
                  <div className="px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center gap-1">
                     <Award className="w-3 h-3 text-amber-500" />
                     <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">Pro</span>
                  </div>
                  <div className="px-1.5 py-0.5 rounded-md bg-brandBlue/10 border border-brandBlue/20 flex items-center gap-1">
                     <Zap className="w-3 h-3 text-brandBlue" />
                     <span className="text-[9px] font-black text-brandBlue uppercase tracking-tighter">1.2k pts</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
        <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 ml-2 opacity-50">Main Menu</p>
        {currentNav?.map((item) => {
          if (!item) return null;
          const isActive = location.pathname === item.path;
          return (
             <Link key={item.path} to={item.path} className="block relative group">
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActiveBG" 
                      className={cn(
                        "absolute inset-0 rounded-2xl border transition-all duration-300",
                        role === 'admin' ? "bg-rose-500/5 border-rose-500/20" :
                        role === 'worker' ? "bg-amber-500/5 border-amber-500/20" :
                        "bg-brandBlue/5 border-brandBlue/20"
                      )}
                    />
                  )}
                </AnimatePresence>
                
                <div className={cn(
                  "relative px-4 py-3.5 rounded-2xl flex items-center gap-4 transition-all duration-300",
                  isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                )}>
                   <item.icon className={cn(
                     "w-5 h-5 transition-all duration-300",
                     isActive ? (role === 'admin' ? "text-rose-500 scale-110" : role === 'worker' ? "text-amber-500 scale-110" : "text-brandBlue scale-110") : "group-hover:translate-x-1"
                   )} />
                   <span className="font-bold text-sm tracking-tight">{item.name}</span>
                   
                   {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className={cn(
                          "ml-auto w-1.5 h-1.5 rounded-full",
                          role === 'admin' ? "bg-rose-500" :
                          role === 'worker' ? "bg-amber-500" :
                          "bg-brandBlue"
                        )}
                      />
                   )}
                </div>
             </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-6 border-t border-[var(--border-primary)] flex flex-col gap-1">
        <Link to="/settings" className="px-4 py-3 rounded-2xl flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all group">
           <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
           <span className="font-bold text-sm">Settings</span>
        </Link>
        <Link to="/auth" className="px-4 py-3 rounded-2xl flex items-center gap-4 text-rose-500/80 hover:text-rose-500 hover:bg-rose-500/10 transition-all group">
           <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
           <span className="font-bold text-sm">Sign Out</span>
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;
