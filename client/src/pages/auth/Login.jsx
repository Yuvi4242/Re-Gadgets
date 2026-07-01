import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { Loader2, Mail, Lock, LogIn } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { getDashboardRoute } from '../../utils/dashboardRoute';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      toast.success('Login successful!');
      const userRole = useAuthStore.getState().user?.role;
      const fromPath = location.state?.from?.pathname;
      const destination = (fromPath && fromPath !== '/') ? fromPath : getDashboardRoute(userRole);
      navigate(destination, { replace: true });
    } else {
      setErrorMsg(res.message || 'Failed to login');
      toast.error(res.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
      <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Log in to your Re-Gadgets account</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-brandPurple hover:text-brandPurpleLight transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brandPurple hover:bg-brandPurpleLight text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brandPurple hover:text-brandPurpleLight font-medium transition-colors">
            Sign up
          </Link>
        </p>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-slate-700 w-full"></div>
          <span className="bg-[#0f172a] px-3 text-slate-500 text-sm">or</span>
          <div className="border-t border-slate-700 w-full"></div>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await useAuthStore.getState().loginWithGoogle(credentialResponse.credential);
              if (res.success) {
                toast.success('Login with Google successful!');
                const userRole = useAuthStore.getState().user?.role;
                const fromPath = location.state?.from?.pathname;
                const destination = (fromPath && fromPath !== '/') ? fromPath : getDashboardRoute(userRole);
                navigate(destination, { replace: true });
              } else {
                toast.error(res.message || 'Failed to login with Google');
              }
            }}
            onError={() => {
              toast.error('Google Login Failed');
            }}
            theme="filled_black"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
