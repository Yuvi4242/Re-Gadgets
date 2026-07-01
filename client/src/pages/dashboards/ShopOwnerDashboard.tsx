import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ShopOwnerLayout from '../../components/shopowner/ShopOwnerLayout';
import ShopOwnerStatsBar from '../../components/shopowner/ShopOwnerStatsBar';
import OrdersTable from '../../components/shopowner/OrdersTable';
import TechnicianGrid from '../../components/shopowner/TechnicianGrid';
import InventoryTable from '../../components/shopowner/InventoryTable';
import RevenueCharts from '../../components/shopowner/RevenueCharts';
import ReviewsPanel from '../../components/shopowner/ReviewsPanel';
import PromotionsPanel from '../../components/shopowner/PromotionsPanel';

export default function ShopOwnerDashboard() {
  const { user } = useAuth();
  const [activePanel, setActivePanel] = useState('overview');

  // Role Guard
  // Only accessible by shopOwner
  if (user && user.role !== 'shopOwner') {
     return <Navigate to="/unauthorized" replace />;
  }

  // Panel Renderer
  const renderPanel = () => {
    switch (activePanel) {
      case 'overview':
        return (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-extrabold text-white tracking-tight h-10 flex items-center">
                Dashboard Overview
              </h1>
              <p className="text-slate-400 font-medium text-sm mt-1">
                Your shop's command center.
              </p>
            </motion.div>
            <ShopOwnerStatsBar />
            {/* Show a preview of recent orders and charts on the overview */}
            <div className="grid grid-cols-1 gap-8 mt-4">
               <div>
                 <h3 className="text-white font-bold mb-4 flex items-center justify-between">Recent Orders <button onClick={() => setActivePanel('orders')} className="text-sm font-medium text-amber-500 hover:text-amber-400">View All</button></h3>
                 <OrdersTable />
               </div>
            </div>
          </>
        );
      case 'orders':
        return <OrdersTable />;
      case 'technicians':
        return <TechnicianGrid />;
      case 'inventory':
        return <InventoryTable />;
      case 'revenue':
        return <RevenueCharts />;
      case 'reviews':
        return <ReviewsPanel />;
      case 'promotions':
        return <PromotionsPanel />;
      default:
        return (
           <div className="h-[60vh] flex flex-col justify-center items-center text-center opacity-50">
              <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
              <p className="text-slate-400">This panel is currently under construction.</p>
           </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative z-10 px-8 lg:px-12 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {renderPanel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
