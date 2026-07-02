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
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import CompleteProfile from './pages/auth/CompleteProfile';

// Dashboard Flow
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';
import CustomerDashboard from './pages/dashboards/CustomerDashboard.tsx';
import ShopOwnerDashboard from './pages/dashboards/ShopOwnerDashboard.tsx';
import TechnicianDashboard from './pages/dashboards/TechnicianDashboard.tsx';
import AdminDashboard from './pages/dashboards/AdminDashboard'; 
import TechnicianOnboarding from './pages/onboarding/TechnicianOnboarding';

import useAuthStore from './store/authStore';
import { Loader2 } from 'lucide-react';

function App() {
  const { isLoading, loadUser } = useAuthStore();
  const location = useLocation();

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[oklch(0.14_0.005_260)] flex flex-col items-center justify-center space-y-4">
        {/* Ember ambient bloom */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-[oklch(0.65_0.19_35/0.08)] blur-[160px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_30px_oklch(0.65_0.19_35/0.5)]">
              <span className="font-display font-black text-xl text-[oklch(0.98_0_0)]">R</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[oklch(0.65_0.19_35)] animate-ping opacity-30" />
          </div>
          <h2 className="font-display font-extrabold text-xl text-[oklch(0.96_0.005_260)] tracking-widest uppercase">
            Re-Gadgets
          </h2>
          <div className="flex space-x-1.5">
            <span className="w-2 h-2 bg-[oklch(0.65_0.19_35)] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-[oklch(0.65_0.19_35)] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-[oklch(0.65_0.19_35)] rounded-full animate-bounce" />
          </div>
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
                       location.pathname === '/signup' ||
                       location.pathname === '/verify-email' ||
                       location.pathname === '/forgot-password' ||
                       location.pathname === '/reset-password';

  return (
    <div className="min-h-screen bg-[oklch(0.14_0.005_260)] text-[oklch(0.96_0.005_260)] font-sans flex flex-col grain-overlay">
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
               <Route path="/verify-email" element={<PageWrapper><VerifyEmail /></PageWrapper>} />
               <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
               <Route path="/reset-password" element={<PageWrapper><ResetPassword /></PageWrapper>} />
               
               {/* Protected Profile Route */}
               <Route element={<PrivateRoute />}>
                  <Route path="/complete-profile" element={<PageWrapper><CompleteProfile /></PageWrapper>} />
                  <Route path="/onboarding/technician" element={<PageWrapper><TechnicianOnboarding /></PageWrapper>} />
               </Route>

               {/* DASHBOARDS - SHARED SHELL */}
               <Route element={<DashboardLayout />}>
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
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default App;
