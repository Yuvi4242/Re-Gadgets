import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, User, MapPin, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Orders', path: '/dashboard/orders' },
    { icon: MapPin, label: 'Tracking', path: '/tracking' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <motion.div 
      animate={{ width: isExpanded ? 256 : 88 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // smooth spring-like ease
      className="h-screen bg-[#0b1326] border-r border-white/5 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] hidden md:flex sticky top-0 relative z-40 overflow-visible"
    >
      {/* Background glow texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none mix-blend-screen"></div>

      {/* Collapse/Expand Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3.5 top-8 w-7 h-7 bg-[#121c33] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:border-brandBlue hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all z-50 group"
      >
         {isExpanded ? <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
      </button>

      {/* Sidebar Header */}
      <div className="h-24 flex items-center px-6 border-b border-white/5 relative isolate overflow-hidden">
        {/* Glow behind logo */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2 w-16 h-16 bg-brandBlue/20 blur-[20px] -z-10 rounded-full"></div>

        <Link to="/" className="flex items-center gap-4 group w-full">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
            <Settings className="w-5 h-5 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, display: 'none' }}
                transition={{ duration: 0.2 }}
                className="font-extrabold text-2xl tracking-tighter text-white whitespace-nowrap"
              >
                Re-Gadgets
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto no-scrollbar relative z-10">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <div key={index} className="relative group/tooltip">
              <Link
                to={item.path}
                className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group overflow-hidden border ${
                  isActive
                    ? 'bg-gradient-to-r from-brandBlue/20 to-brandPurple/10 text-white border-brandBlue/30 shadow-[0_0_20px_rgba(79,70,229,0.15)]'
                    : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
                } ${!isExpanded ? 'justify-center px-0' : ''}`}
              >
                {/* Active Left Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActive"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-brandBlue rounded-r-full shadow-[0_0_10px_#4f46e5]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Background Glow on Hover (Non-active) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-brandBlue/0 group-hover:bg-brandBlue/10 transition-colors duration-300 opacity-0 group-hover:opacity-100"></div>
                )}

                <div className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-brandBlue drop-shadow-[0_0_8px_rgba(79,70,229,0.8)]' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                       initial={{ opacity: 0, width: 0 }}
                       animate={{ opacity: 1, width: 'auto' }}
                       exit={{ opacity: 0, width: 0, display: 'none' }}
                       className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              {/* Tooltip for Collapsed State */}
              <AnimatePresence>
                 {!isExpanded && (
                   <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 pointer-events-none z-50">
                      <motion.div 
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        whileInView={{ opacity: 0 }} /* Hide by default */
                        whileHover={{ opacity: 1 }}
                        /* To make it appear on group hover: */
                        className="opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover/tooltip:translate-x-0"
                      >
                         <div className="bg-[#121c33] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brandBlue shadow-[0_0_8px_#4f46e5]"></div>
                            {item.label}
                         </div>
                      </motion.div>
                   </div>
                 )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-white/5 relative z-10">
        <Link to="/dashboard/profile" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-[#121c33]/50 border border-white/10 cursor-pointer hover:bg-[#121c33] hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all group overflow-hidden ${!isExpanded ? 'justify-center px-0' : ''}`}>
          <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-[2px] shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform">
             <div className="w-full h-full rounded-full bg-[#0b1326] flex items-center justify-center font-extrabold text-white text-sm">
                JD
             </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
               <motion.div 
                 initial={{ opacity: 0, width: 0 }}
                 animate={{ opacity: 1, width: 'auto' }}
                 exit={{ opacity: 0, width: 0, display: 'none' }}
                 className="flex-1 whitespace-nowrap overflow-hidden"
               >
                 <p className="text-sm font-extrabold text-white tracking-tight">John Doe</p>
                 <p className="text-[10px] text-brandBlue font-bold uppercase tracking-widest mt-0.5">Premium</p>
               </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;
