import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, Settings, LogOut, User, ChevronDown, ClipboardList, Package, UserCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DUMMY_SEARCH_RESULTS = [
  { id: 1, type: 'Order', title: 'Order #3928', desc: 'Screen replacement - pending', icon: ClipboardList },
  { id: 2, type: 'Technician', title: 'Mark Anderson', desc: 'Available - In Store', icon: UserCheck },
  { id: 3, type: 'Inventory', title: 'iPhone 13 Battery', desc: 'Low stock - 5 remaining', icon: Package }
];

export default function ShopOwnerNavbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileName = user?.name || user?.displayName || 'Owner Admin';
  const initial = profileName.charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10 h-20 flex items-center justify-between px-4 lg:px-8">
      {/* Left: Logo & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <Link to="/shopowner/dashboard" className="flex items-center gap-3 group">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="text-amber-500"
          >
            <Settings className="w-8 h-8" />
          </motion.div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-300">
            GadgetFix
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-500/80 mt-1 ml-1 hidden sm:block">Owner</span>
        </Link>
      </div>

      {/* Center: Live Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchInputRef}>
        <motion.div 
          animate={{ width: isSearchFocused ? '100%' : '80%' }}
          className="relative mx-auto"
        >
          <div className={`flex items-center px-4 py-2.5 rounded-full border transition-all duration-300 ${
            isSearchFocused ? 'bg-black/60 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}>
            <Search className={`w-5 h-5 mr-3 transition-colors ${isSearchFocused ? 'text-amber-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search orders, technicians, shops..."
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* Keyboard Shortcuts hint */}
            {!isSearchFocused && !searchQuery && (
              <div className="hidden lg:flex items-center gap-1 border border-white/10 rounded px-1.5 py-0.5 pointer-events-none">
                <span className="text-[10px] text-slate-400 font-mono">⌘</span>
                <span className="text-[10px] text-slate-400 font-mono">K</span>
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2"
              >
                {DUMMY_SEARCH_RESULTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-start gap-4 group transition-colors">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-500 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">{item.type}</span>
                          <span className="text-sm font-medium text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4 lg:gap-6">
        <button className="relative p-2 text-slate-300 hover:text-white transition-colors group">
          <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#0a0a1a] animate-pulse"></span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
              {initial}
            </div>
            <div className="hidden lg:block text-left mr-2">
              <p className="text-sm font-medium text-white">{profileName}</p>
              <p className="text-xs text-slate-400">Shop Owner</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl py-1 z-50"
              >
                <div className="px-4 py-3 border-b border-white/10 lg:hidden">
                  <p className="text-sm font-medium text-white">{profileName}</p>
                  <p className="text-xs text-slate-400">Shop Owner</p>
                </div>
                <Link to="/shopowner/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <User className="w-4 h-4" /> Management Profile
                </Link>
                <div className="h-px bg-white/10 my-1"></div>
                <button 
                  onClick={() => logout && logout()}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
