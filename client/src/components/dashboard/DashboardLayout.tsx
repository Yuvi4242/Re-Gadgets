import React, { useState } from 'react';
import ThreeBackground from './ThreeBackground';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a1a] text-slate-200 overflow-hidden relative">
      <ThreeBackground />
      
      <Navbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />
        
        {/* Main Content Area */}
        <main 
          className="flex-1 relative overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          {/* Main content wrapper with dynamic max-width for very ultra-wide screens if needed */}
          <div className="w-full h-full p-4 md:p-8 xl:p-10 pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
