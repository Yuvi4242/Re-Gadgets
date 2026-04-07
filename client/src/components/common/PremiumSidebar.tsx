import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, ChevronRight, LogOut, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  path?: string; // If using React Router
  icon: React.ElementType;
  badge?: string;
}

interface PremiumSidebarProps {
  menuItems: MenuItem[];
  activePanel?: string;       // If using state-based routing
  setActivePanel?: (id: string) => void;
  accentTheme: 'cyan' | 'amber' | 'purple'; 
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export default function PremiumSidebar({
  menuItems,
  activePanel,
  setActivePanel,
  accentTheme,
  isMobileOpen,
  setIsMobileOpen
}: PremiumSidebarProps) {
  const { logout } = useAuth();
  const location = useLocation();
  
  // Persist sidebar state
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('regadgets_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('regadgets_sidebar_collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  // Handle Resize Auto-Collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        const saved = localStorage.getItem('regadgets_sidebar_collapsed');
        if (saved && !JSON.parse(saved)) {
           setCollapsed(false);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getThemeStyles = () => {
    switch (accentTheme) {
      case 'cyan': return { 
        text: 'text-cyan-400', bg: 'bg-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
        activeBg: 'bg-cyan-500/10', activeBorder: 'border-cyan-500/20', hover: 'group-hover:text-cyan-400'
      };
      case 'amber': return { 
        text: 'text-amber-500', bg: 'bg-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
        activeBg: 'bg-amber-500/10', activeBorder: 'border-amber-500/20', hover: 'group-hover:text-amber-500'
      };
      case 'purple': default: return { 
        text: 'text-purple-400', bg: 'bg-purple-500', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]',
        activeBg: 'bg-purple-500/10', activeBorder: 'border-purple-500/20', hover: 'group-hover:text-purple-400'
      };
    }
  };

  const theme = getThemeStyles();

  // Floating Toggle Button (Orb)
  const ToggleOrb = () => (
    <button 
      onClick={() => setCollapsed(!collapsed)}
      className={`absolute -right-3 top-6 ${theme.bg} text-black p-1 rounded-full ${theme.glow} hover:scale-110 active:scale-95 transition-all z-50 hidden md:flex items-center justify-center`}
    >
      {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
    </button>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed md:relative top-20 md:top-6 left-0 h-[calc(100vh-80px)] md:h-[calc(100vh-80px-48px)] z-50 flex flex-col bg-[#0a0a1a]/70 backdrop-blur-2xl border border-white/5 md:rounded-3xl shadow-2xl md:ml-6 shrink-0`}
      >
        <ToggleOrb />

        <div className="flex-1 overflow-y-auto py-6 px-3 no-scrollbar space-y-1 relative">
          {menuItems.map((item) => {
            const isActive = activePanel ? (activePanel === item.id) : (location.pathname === item.path);
            const Icon = item.icon;
            
            return (
              <div key={item.id} className="relative group">
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 1024) setIsMobileOpen(false); }}
                    className={`w-full flex items-center relative px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Active Indicator Sliding Pill */}
                    {isActive && (
                      <motion.div 
                        layoutId="sidebarActivePill"
                        className={`absolute inset-0 ${theme.activeBg} border ${theme.activeBorder} rounded-xl shadow-inner`}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    <motion.div whileTap={{ scale: 0.9 }}>
                       <Icon className={`w-5 h-5 shrink-0 z-10 transition-colors duration-300 ${
                         isActive ? `${theme.text} drop-shadow-[0_0_8px_currentColor]` : theme.hover
                       }`} />
                    </motion.div>
                    
                    <AnimatePresence mode="popLayout">
                      {!collapsed && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 font-semibold text-sm whitespace-nowrap z-10 flex-1 flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white border border-white/20' : `${theme.activeBg} ${theme.text} border ${theme.activeBorder}`}`}>
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                       if (setActivePanel) setActivePanel(item.id);
                       if (window.innerWidth < 1024) setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center relative px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Active Indicator Sliding Pill */}
                    {isActive && (
                      <motion.div 
                        layoutId="sidebarActivePill"
                        className={`absolute inset-0 ${theme.activeBg} border ${theme.activeBorder} rounded-xl shadow-inner`}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    <motion.div whileTap={{ scale: 0.9 }}>
                       <Icon className={`w-5 h-5 shrink-0 z-10 transition-colors duration-300 ${
                         isActive ? `${theme.text} drop-shadow-[0_0_8px_currentColor]` : theme.hover
                       }`} />
                    </motion.div>
                    
                    <AnimatePresence mode="popLayout">
                      {!collapsed && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 font-semibold text-sm whitespace-nowrap z-10 flex-1 flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white border border-white/20' : `${theme.activeBg} ${theme.text} border ${theme.activeBorder}`}`}>
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )}

                {/* Tooltip on collapse */}
                {collapsed && (
                   <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 flex items-center ${theme.text}`}>
                     <div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-black/90"></div>
                     {item.label}
                   </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Global Footer (Sign Out) */}
        <div className="p-3 border-t border-white/5 mt-auto">
          <div className="relative group">
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors group relative"
            >
              <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-300 transition-colors" />
              <AnimatePresence>
                 {!collapsed && (
                   <motion.span 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, width: 0 }}
                     className="ml-3 font-bold text-sm whitespace-nowrap text-red-400 group-hover:text-red-300"
                   >
                     Sign Out
                   </motion.span>
                 )}
              </AnimatePresence>
            </button>
            {collapsed && (
               <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50">
                 Sign Out
               </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
