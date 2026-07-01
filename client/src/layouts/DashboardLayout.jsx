import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import LiveRepairFeed from '../components/shell/LiveRepairFeed';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';

const DashboardLayout = () => {
  const location = useLocation();
  const [role, setRole] = useState('customer'); // Default fallback

  // Dynamically derive role from the URL path for prototype showcasing
  useEffect(() => {
    let currentRole = 'customer';
    if (location.pathname?.startsWith('/admin')) currentRole = 'admin';
    else if (location.pathname?.startsWith('/technician')) currentRole = 'worker';
    else if (location.pathname?.startsWith('/shop')) currentRole = 'owner';
    
    setRole(currentRole);
    console.log(`[DashboardLayout] Rendered for role: ${currentRole} | Path: ${location.pathname}`);
  }, [location.pathname]);

  if (!role) {
    return <div className="w-full h-screen flex items-center justify-center bg-[#060e20] text-brandBlue font-bold">Loading Identity...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-[var(--bg-primary)] overflow-hidden font-sans transition-colors duration-300">
       
       {/* Left Split-Monolith Shell (Sidebar + Live Feed) */}
       <div className="w-72 h-full flex flex-col shrink-0 border-r border-[var(--border-primary)] bg-[var(--bg-primary)] z-20">
          <div className="flex-shrink-0 flex flex-col max-h-[60%]">
             <Sidebar role={role} />
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
             <LiveRepairFeed role={role} />
          </div>
       </div>

       {/* Main Work Area */}
       <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          <TopNavbar role={role} />

          {/* Master Outlet Container (Routes injected dynamically) */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 relative scroll-smooth">
             <div className="h-full w-full max-w-7xl mx-auto">
                <ErrorBoundary>
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.99, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                         <Outlet />
                      </motion.div>
                   </AnimatePresence>
                </ErrorBoundary>
             </div>
          </main>
       </div>
    </div>
    </ErrorBoundary>
  );
};

export default DashboardLayout;
