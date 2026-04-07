import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wrench,
  CalendarPlus,
  MapPin,
  Smartphone,
  CreditCard,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/customer/dashboard' },
  { icon: Wrench, label: 'My Repairs', path: '/customer/repairs', badge: '2 Active' },
  { icon: CalendarPlus, label: 'Book Repair', path: '/customer/book' },
  { icon: MapPin, label: 'Track Order', path: '/customer/tracking' },
  { icon: Smartphone, label: 'Devices', path: '/customer/devices' },
  { icon: CreditCard, label: 'Billing', path: '/customer/billing' },
  { icon: MessageSquare, label: 'AI Chat', path: '/customer/chat' },
  { icon: Settings, label: 'Settings', path: '/customer/settings' },
  { icon: HelpCircle, label: 'Help', path: '/customer/help' }
];

export default function Sidebar({ isExpanded, setIsExpanded, isMobileOpen, setIsMobileOpen }: any) {
  
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  // For responsive behavior, typically the sidebar is an overlay on mobile.
  // We handle both logic here.
  return (
    <>
      {/* Mobile Overlay Background */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isExpanded ? 260 : 72,
          x: isMobileOpen ? 0 : (window.innerWidth < 1024 ? -260 : 0) // Hide on mobile initially
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-[calc(100vh-80px)] z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 overflow-y-auto no-scrollbar"
      >
        {/* Toggle Button (Desktop only) */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-brandPurple border border-white/20 rounded-full items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_10px_rgba(124,58,237,0.5)] z-50"
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Links */}
        <div className="flex-1 px-3 space-y-1.5 flex flex-col">
          {SIDEBAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            
            // Simulating active state since we might just be on /customer/dashboard
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => {
                  // For the sake of this mock, if pathname exactly matches, it's active.
                  const activeClass = isActive 
                    ? "bg-white/10 text-white shadow-[inset_4px_0_0_#7c3aed]"
                    : "text-slate-400 hover:text-white hover:bg-white/5";
                  return `relative flex items-center px-3 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${activeClass}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brandPurple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-brandPurple drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]' : 'group-hover:text-cyan-400'}`} />
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 text-sm font-medium tracking-wide whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Badge */}
                    <AnimatePresence>
                      {isExpanded && item.badge && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="ml-auto bg-brandPurple/20 border border-brandPurple/50 text-brandPurple text-[10px] font-bold px-2 py-0.5 rounded-full"
                        >
                          {item.badge}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {!isExpanded && (
                      <div className="absolute left-14 bg-black/90 border border-white/10 text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}
