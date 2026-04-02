import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Repair', path: '/book' },
  ];

  if (isAuthenticated && user) {
     const dashboardMap = {
        customer: '/customer/dashboard',
        technician: '/technician/dashboard',
        shopOwner: '/shopowner/dashboard',
        admin: '/admin/dashboard'
      };
     navLinks.push({ name: 'Dashboard', path: dashboardMap[user.role] || '/dashboard' });
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#060e20]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-brandBlue/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center text-white font-bold transition-all duration-300 border ${scrolled ? 'shadow-[0_0_20px_rgba(79,70,229,0.5)] border-transparent' : 'border-white/20 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]'}`}>
              <Settings className="w-5 h-5 animate-spin-slow" style={{ animationDuration: '10s' }} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-all duration-500">
              Re-Gadgets
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8 relative items-center h-full">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group text-sm font-bold transition-all duration-300 py-2 flex items-center justify-center h-full"
                  >
                    <span className={`transition-colors duration-300 relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                      {link.name}
                    </span>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-x-0 -bottom-1 h-8 bg-brandBlue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute -bottom-[21px] left-0 w-full h-[3px] bg-gradient-to-r from-brandBlue to-cyan-400 rounded-t-full shadow-[0_-5px_15px_rgba(56,189,248,0.8)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-5">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link to="/signup" className="relative group px-6 py-2.5 rounded-full text-sm font-bold text-white bg-white/5 border border-white/10 hover:border-transparent transition-all duration-300 shadow-lg active:scale-95 overflow-hidden block">
                    <span className="relative z-10">Sign up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brandBlue to-brandPurple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Outer Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brandBlue to-brandPurple blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end mr-1 text-right">
                    <span className="text-[10px] font-black text-brandBlue uppercase tracking-widest leading-none mb-1">{user?.role}</span>
                    <span className="text-xs font-bold text-white leading-none capitalize truncate max-w-[100px]">{user?.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-slate-900 shadow-2xl border border-white/5 text-slate-400 hover:text-rose-500 transition-all hover:bg-rose-500/5 group/logout"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4 group-hover/logout:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-xl transition-colors border border-transparent hover:border-white/10 hover:bg-white/5"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0b1326]/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden shadow-2xl absolute w-full left-0 top-full"
          >
            <div className="px-6 py-8 space-y-4 relative isolate">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

              {navLinks.map((link) => {
                 const isActive = location.pathname === link.path;
                 return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-2xl text-base font-bold transition-all duration-300 border ${isActive ? 'bg-brandBlue/10 text-white border-brandBlue/30 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full block text-center py-4 font-bold text-slate-300 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">Log in</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full block text-center bg-gradient-to-r from-brandBlue to-brandPurple text-white py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95 transition-transform">Sign up for free</Link>
                  </>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="w-full text-center py-4 font-bold text-rose-500 border border-rose-500/20 bg-rose-500/5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
                  >
                    <LogOut className="w-5 h-5" /> Sign Out from Re-Gadgets
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
