import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Loader2 } from 'lucide-react';
import { getDashboardRoute } from '../utils/dashboardRoute';

const PrivateRoute = ({ allowedRole, roles }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
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

  // If profile not complete, gate access to wizard pages
  if (!user?.isProfileComplete) {
    if (user?.role === 'technician' && location.pathname !== '/onboarding/technician') {
      return <Navigate to="/onboarding/technician" replace />;
    } else if (user?.role !== 'technician' && location.pathname !== '/complete-profile') {
      return <Navigate to="/complete-profile" replace />;
    }
  }

  // Prevent completed users from viewing onboarding — send them to their correct dashboard
  if (user?.isProfileComplete && isWizardPath) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  // Role-based access guard
  if (allowedRole && user?.role !== allowedRole) {
    // Redirect to their own dashboard, not home
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
