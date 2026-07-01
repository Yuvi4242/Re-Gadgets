import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, UserCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CustomerProfileForm from '../../components/auth/CustomerProfileForm';
import TechnicianProfileForm from '../../components/auth/TechnicianProfileForm';
import ShopOwnerProfileForm from '../../components/auth/ShopOwnerProfileForm';
import { toast } from 'react-hot-toast';
import { getDashboardRoute } from '../../utils/dashboardRoute';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading, completeUserProfile, api } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
    if (!isLoading && user?.isProfileComplete) {
      navigate(getDashboardRoute(user.role));
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="h-screen w-full bg-[#020617] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brandPurple/30 border-t-brandPurple rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Loading profile setup...</p>
      </div>
    );
  }

  const renderForm = () => {
    const onSuccess = () => navigate(getDashboardRoute(user.role));

    switch (user.role) {
      case 'customer':
        return <CustomerProfileForm onSuccess={onSuccess} />;
      case 'technician':
        return <TechnicianProfileForm onSuccess={onSuccess} />;
      case 'shopOwner':
        return <ShopOwnerProfileForm onSuccess={onSuccess} />;
      default:
        return <p className="text-red-500 text-center font-bold">Invalid user role detected.</p>;
    }
  };

  const handleSkip = async () => {
    try {
      await api.post('/auth/complete-profile', { skip: true });
      completeUserProfile(true);
      toast.success('Profile setup skipped.');
      navigate(getDashboardRoute(user.role));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to skip profile setup');
    }
  };

  const getRoleLabel = () => {
    const labels = {
      customer: 'Customer',
      technician: 'Technician',
      shopOwner: 'Shop Owner'
    };
    return labels[user.role] || 'User';
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandPurple/5 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-[100px] -z-0"></div>

      <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-12 relative z-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-10 gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-black text-white tracking-widest uppercase mb-2">
              Complete <span className="text-brandPurple">Profile</span>
            </h1>
            <div className="h-1 w-20 bg-brandPurple mb-4 mx-auto sm:mx-0 rounded-full"></div>
            <p className="text-slate-400 text-sm">
               Welcome <span className="font-bold text-white tracking-wide">{user.name}</span>! 
               Please provide some additional details to set up your <span className="text-brandPurple font-bold">{getRoleLabel()}</span> account.
            </p>
          </div>
          <div className="flex-shrink-0 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-brandPurple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <UserCircle className="w-14 h-14 text-brandPurple relative z-10" />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full border-2 border-slate-950">
              <ShieldCheck className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-950/50 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-inner">
           {renderForm()}
           <button 
             onClick={handleSkip} 
             className="w-full mt-4 bg-transparent border border-slate-700 text-slate-400 font-bold py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center group"
           >
             Skip for now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
           <ShieldAlert className="w-3 h-3" />
           <span>Your data is encrypted and secure</span>
           <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
           <Sparkles className="w-3 h-3 text-brandPurple" />
           <span>Premium Service Guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
