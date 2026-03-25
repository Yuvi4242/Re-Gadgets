import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookService from './pages/BookService';
import Tracking from './pages/Tracking';
import AuthPage from './pages/AuthPage.jsx';
import DashboardLayout from './layouts/DashboardLayout';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import ShopDashboard from './pages/dashboards/ShopDashboard';
import TechnicianDashboard from './pages/dashboards/TechnicianDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Placeholder from './pages/dashboards/Placeholder';
import ChatBot from './components/chat/ChatBot';

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/customer') || 
                           location.pathname.startsWith('/shop') || 
                           location.pathname.startsWith('/technician') || 
                           location.pathname.startsWith('/admin');
  const isAuthLayout = location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-brandPurple/30 selection:text-white">
      {!isDashboardRoute && !isAuthLayout && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full w-full">
         <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               {/* Public Routes */}
               <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
               <Route path="/book" element={<PageWrapper><BookService /></PageWrapper>} />
               <Route path="/tracking" element={<PageWrapper><Tracking /></PageWrapper>} />
               <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />

               {/* Multi-Role Dashboard Routes */}
               
               {/* CUSTOMER NESTED ROUTES */}
               <Route path="/customer" element={<PageWrapper><DashboardLayout role="customer" /></PageWrapper>}>
                  <Route path="dashboard" element={<CustomerDashboard />} />
                  <Route path="orders" element={<Placeholder title="Active Orders" role="customer" />} />
                  <Route path="history" element={<Placeholder title="Repair History" role="customer" />} />
                  <Route path="reviews" element={<Placeholder title="Platform Reviews" role="customer" />} />
               </Route>

               {/* SHOP OWNER NESTED ROUTES */}
               <Route path="/shop" element={<PageWrapper><DashboardLayout role="owner" /></PageWrapper>}>
                  <Route path="dashboard" element={<ShopDashboard />} />
                  <Route path="requests" element={<Placeholder title="Incoming Requests" role="owner" />} />
                  <Route path="technicians" element={<Placeholder title="Staff Technicians" role="owner" />} />
                  <Route path="earnings" element={<Placeholder title="Financial Earnings" role="owner" />} />
               </Route>

               {/* TECHNICIAN NESTED ROUTES */}
               <Route path="/technician" element={<PageWrapper><DashboardLayout role="worker" /></PageWrapper>}>
                  <Route path="dashboard" element={<TechnicianDashboard />} />
                  <Route path="active" element={<Placeholder title="Active Repair Matrix" role="worker" />} />
                  <Route path="completed" element={<Placeholder title="Completed Service Logs" role="worker" />} />
               </Route>

               {/* ADMIN NESTED ROUTES */}
               <Route path="/admin" element={<PageWrapper><DashboardLayout role="admin" /></PageWrapper>}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<Placeholder title="Global User Matrix" role="admin" />} />
                  <Route path="analytics" element={<Placeholder title="Platform Analytics" role="admin" />} />
                  <Route path="logs" element={<Placeholder title="Core System Logs" role="admin" />} />
               </Route>
            </Routes>
         </AnimatePresence>
      </main>

      {/* Global AI Assistant */}
      <ChatBot />
    </div>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default App;
