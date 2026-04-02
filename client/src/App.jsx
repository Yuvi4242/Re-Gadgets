import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookService from './pages/BookService';
import Tracking from './pages/Tracking';
import ChatBot from './components/chat/ChatBot';

// Auth Pages
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import CompleteProfile from './pages/auth/CompleteProfile';

// Dashboard Flow
import PrivateRoute from './components/PrivateRoute';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import ShopOwnerDashboard from './pages/dashboards/ShopDashboard'; // Matches existing filename
import TechnicianDashboard from './pages/dashboards/TechnicianDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard'; 

import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

function App() {
  const { isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-brandPurple animate-spin" />
        <h2 className="text-xl font-bold text-white tracking-widest uppercase">Initializing Re-Gadgets</h2>
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-brandPurple rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-brandPurple rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-brandPurple rounded-full animate-bounce"></span>
        </div>
      </div>
    );
  }

  const isDashboardRoute = location.pathname.startsWith('/customer') || 
                           location.pathname.startsWith('/shopowner') || 
                           location.pathname.startsWith('/technician') || 
                           location.pathname.startsWith('/admin') ||
                           location.pathname.startsWith('/complete-profile');

  const isAuthLayout = location.pathname === '/login' || 
                       location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-brandPurple/30 selection:text-white">
      {!isDashboardRoute && !isAuthLayout && <Navbar />}

      <main className="flex-1 relative flex flex-col h-full w-full">
         <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               {/* Public Routes */}
               <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
               <Route path="/book" element={<PageWrapper><BookService /></PageWrapper>} />
               <Route path="/tracking" element={<PageWrapper><Tracking /></PageWrapper>} />
               
               {/* Auth Routes */}
               <Route path="/auth" element={<Navigate to="/login" replace />} />
               <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
               <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
               
               {/* Protected Profile Route */}
               <Route element={<PrivateRoute />}>
                  <Route path="/complete-profile" element={<PageWrapper><CompleteProfile /></PageWrapper>} />
               </Route>

               {/* CUSTOMER ROUTES */}
               <Route element={<PrivateRoute allowedRole="customer" />}>
                  <Route path="/customer/dashboard" element={<PageWrapper><CustomerDashboard /></PageWrapper>} />
               </Route>

               {/* SHOP OWNER ROUTES */}
               <Route element={<PrivateRoute allowedRole="shopOwner" />}>
                  <Route path="/shopowner/dashboard" element={<PageWrapper><ShopOwnerDashboard /></PageWrapper>} />
               </Route>

               {/* TECHNICIAN ROUTES */}
               <Route element={<PrivateRoute allowedRole="technician" />}>
                  <Route path="/technician/dashboard" element={<PageWrapper><TechnicianDashboard /></PageWrapper>} />
               </Route>

               {/* ADMIN ROUTES */}
               <Route element={<PrivateRoute allowedRole="admin" />}>
                  <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
               </Route>

               {/* Catch-all to Home */}
               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </AnimatePresence>
      </main>

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
