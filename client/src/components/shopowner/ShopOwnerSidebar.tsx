import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MapPin,
  Package,
  BarChart2,
  Star,
  Tag,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'orders', icon: ClipboardList, label: 'Orders Management', badge: '5 Pending' },
  { id: 'technicians', icon: Users, label: 'Technicians' },
  { id: 'locations', icon: MapPin, label: 'Shop Locations' },
  { id: 'inventory', icon: Package, label: 'Inventory', badge: 'Low Stock' },
  { id: 'revenue', icon: BarChart2, label: 'Revenue & Billing' },
  { id: 'reviews', icon: Star, label: 'Customer Reviews' },
  { id: 'promotions', icon: Tag, label: 'Promotions' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  activePanel: string;
  setActivePanel: (id: string) => void;
}

export default function ShopOwnerSidebar({ 
  isExpanded, 
  setIsExpanded, 
  isMobileOpen, 
  setIsMobileOpen,
  activePanel,
  setActivePanel
}: SidebarProps) {
  const { logout } = useAuth();
  const toggleSidebar = () => setIsExpanded(!isExpanded);

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
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-amber-500 border border-white/20 rounded-full items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.5)] z-50"
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Links */}
        <div className="flex-1 px-3 space-y-1.5 flex flex-col pb-6">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            const activeClass = isActive 
              ? "bg-white/10 text-white shadow-[inset_4px_0_0_#f59e0b]"
              : "text-slate-400 hover:text-white hover:bg-white/5";

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePanel(item.id);
                  if (window.innerWidth < 1024) setIsMobileOpen(false);
                }}
                className={`w-full relative flex items-center text-left px-3 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${activeClass}`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'group-hover:text-amber-400'}`} />
                
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
                      className="ml-auto bg-amber-500/20 border border-amber-500/50 text-amber-500 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
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
              </button>
            );
          })}
          
          <div className="mt-auto pt-6 border-t border-white/5">
            <button
              onClick={() => logout && logout()}
              className="w-full relative flex items-center text-left px-3 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden text-red-500 hover:bg-red-500/10"
            >
               <LogOut className="w-5 h-5 flex-shrink-0 transition-colors duration-300 group-hover:text-red-400" />
               <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 text-sm font-medium tracking-wide whitespace-nowrap"
                    >
                      Sign Out
                    </motion.span>
                  )}
                </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
