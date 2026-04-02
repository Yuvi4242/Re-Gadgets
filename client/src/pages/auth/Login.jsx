import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import PasswordInput from '../../components/auth/PasswordInput';

const Login = () => {
  const navigate = useNavigate();
  const { api, login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data.token, data.user);
      
      if (!data.user.isProfileComplete) {
        navigate('/complete-profile');
      } else {
        const dashboardMap = {
          customer: '/customer/dashboard',
          technician: '/technician/dashboard',
          shopOwner: '/shopowner/dashboard'
        };
        navigate(dashboardMap[data.user.role]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandPurple/10 rounded-full blur-[150px] -z-0"></div>

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-slate-800/50 rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-2">
            RE<span className="text-brandPurple">GADGET</span>
          </h1>
          <div className="h-1 w-12 bg-brandPurple mx-auto rounded-full mb-4"></div>
          <h2 className="text-xl font-bold text-slate-200">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <div className="relative group/input">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#020617] border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <PasswordInput
              value={formData.password}
              placeholder="Your secure password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div className="flex justify-end">
              <button type="button" className="text-[10px] uppercase font-bold tracking-widest text-brandPurple hover:underline">Forgot Password?</button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-black py-4 rounded-xl shadow-2xl shadow-brandPurple/30 transition-all flex items-center justify-center space-x-3 group active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : (
              <>
                <span className="uppercase tracking-[0.2em]">Login Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            New to ReGadget?{' '}
            <Link to="/signup" className="text-brandPurple font-bold hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
