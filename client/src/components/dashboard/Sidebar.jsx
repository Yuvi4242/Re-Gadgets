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
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const roleNav = {
    customer: [
      { name: 'My Dashboard', path: '/customer/dashboard', icon: Home },
      { name: 'Active Orders', path: '/customer/orders', icon: ShoppingBag },
      { name: 'History', path: '/customer/history', icon: Clock },
      { name: 'Reviews', path: '/customer/reviews', icon: Star },
    ],
    shopOwner: [
      { name: 'Shop HQ', path: '/shop/dashboard', icon: Store },
      { name: 'Incoming Requests', path: '/shop/requests', icon: ListTodo },
      { name: 'Technicians', path: '/shop/technicians', icon: Users },
      { name: 'Earnings', path: '/shop/earnings', icon: BarChart3 },
    ],
    technician: [
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
     if (role === 'technician') return 'amber';
     return 'brandBlue';
  };

  const color = getThemeColor();

  return (
    <div className="w-full h-full bg-[var(--color-noir-surface)] bg-film-grain flex flex-col relative z-20 transition-all duration-300 shadow-[15px_0_30px_-15px_rgba(245,166,35,0.05)] border-r border-[var(--glass-border)]">
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
            {role?.replace('Owner', ' Owner') || 'User'} Interface
          </span>
        </div>
      </div>

      {/* Gamification User Profile */}
      <div className="mx-6 my-4 p-4 rounded-2xl bg-[var(--color-noir-surface-high)] border border-[var(--glass-border)] shadow-lg relative overflow-hidden group">
         <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-ember-dark)] to-[var(--color-ember-light)] p-[1px] relative">
               <div className="absolute inset-0 bg-[var(--color-ember-light)]/40 blur-md rounded-xl"></div>
               <div className="w-full h-full rounded-xl bg-[var(--color-noir-surface-elevated)] flex items-center justify-center relative z-10">
                 <span className="text-xs font-black text-[var(--text-primary)]">AV</span>
               </div>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-black text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
               <div className="flex items-center gap-2 mt-0.5">
                  <div className="px-1.5 py-0.5 rounded flex items-center gap-1 bg-[var(--color-ember-light)]/10 border border-[var(--color-ember-light)]/20">
                     <Award className="w-3 h-3 text-[var(--color-ember-light)]" />
                     <span className="text-[9px] font-black text-[var(--color-ember-light)] uppercase tracking-tighter">Pro</span>
                  </div>
                  <div className="px-1.5 py-0.5 rounded flex items-center gap-1 bg-[var(--color-noir-surface-elevated)] border border-[var(--border-primary)] text-[var(--text-secondary)]">
                     <Zap className="w-3 h-3" />
                     <span className="text-[9px] font-black uppercase tracking-tighter">1.2k pts</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2 no-scrollbar">
        <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4 ml-2">Main Menu</p>
        {currentNav?.map((item) => {
          if (!item) return null;
          const isActive = location.pathname === item.path;
          return (
             <Link key={item.path} to={item.path} className="block relative group">
                <div className={cn(
                  "relative px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-300 border",
                  isActive 
                    ? "bg-[var(--color-noir-surface-elevated)] border-[var(--border-primary)] shadow-sm" 
                    : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--color-noir-surface-high)]/50 hover:border-[var(--border-primary)]"
                )}>
                   {isActive && (
                      <motion.div 
                        layoutId="activeAccent"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[var(--color-ember-light)] rounded-r-full shadow-[0_0_10px_var(--color-ember-light)]"
                      />
                   )}
                   <div className={cn(
                     "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                     isActive ? "bg-[var(--color-ember-light)]/10" : "bg-[var(--color-noir-surface)] border border-transparent group-hover:border-[var(--border-primary)]"
                   )}>
                     <item.icon className={cn(
                       "w-4 h-4 transition-colors",
                       isActive ? "text-[var(--color-ember-light)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                     )} />
                   </div>
                   <span className={cn(
                     "font-bold text-sm tracking-tight transition-colors",
                     isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                   )}>{item.name}</span>
                </div>
             </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="px-6 py-4 border-t border-[var(--border-primary)] bg-[var(--color-noir-surface-high)]/50 flex flex-col gap-2 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent"></div>
        <Link to="/settings" className="px-3 py-2.5 rounded-xl flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-noir-surface-elevated)] border border-transparent hover:border-[var(--border-primary)] transition-all group">
           <div className="w-8 h-8 rounded-lg bg-[var(--color-noir-surface)] border border-transparent group-hover:border-[var(--border-primary)] flex items-center justify-center transition-all">
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
           </div>
           <span className="font-bold text-sm">Settings</span>
        </Link>
        
        <div className="h-px w-full bg-[var(--border-primary)] my-1"></div>

        <button 
          onClick={logout}
          className="px-3 py-2.5 rounded-xl flex items-center gap-3 text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all group"
        >
           <div className="w-8 h-8 rounded-lg bg-rose-500/5 group-hover:bg-rose-500/20 flex items-center justify-center transition-all">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
           </div>
           <span className="font-bold text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
