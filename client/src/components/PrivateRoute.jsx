import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ allowedRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-brandPurple animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Encrypting Connection...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isWizardPath = location.pathname === '/complete-profile' || location.pathname === '/onboarding/technician';

  if (!user?.isProfileComplete) {
    if (user?.role === 'technician' && location.pathname !== '/onboarding/technician') {
      return <Navigate to="/onboarding/technician" replace />;
    } else if (user?.role !== 'technician' && location.pathname !== '/complete-profile') {
      return <Navigate to="/complete-profile" replace />;
    }
  }

  // Prevent completed users from viewing onboarding
  if (user?.isProfileComplete && isWizardPath) {
     return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
