import React, { useState } from 'react';
import ThreeBackground from '../dashboard/ThreeBackground';
import ShopOwnerNavbar from './ShopOwnerNavbar';
import ShopOwnerSidebar from './ShopOwnerSidebar';
import AIChatWidget from '../dashboard/AIChatWidget'; // Reuse the AI widget

interface ShopOwnerLayoutProps {
  children: React.ReactNode;
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export default function ShopOwnerLayout({ children, activePanel, setActivePanel }: ShopOwnerLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a1a] text-slate-200 overflow-hidden relative">
      <ThreeBackground />
      
      <ShopOwnerNavbar onMenuToggle={() => setIsMobileSidebarOpen(true)} />
      
      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <ShopOwnerSidebar 
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
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

      <AIChatWidget />
    </div>
  );
}
