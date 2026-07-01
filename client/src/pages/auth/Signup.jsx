import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader2, User, Mail, Lock } from 'lucide-react';
import api from '../../api/axiosInstance';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../store/authStore';
import { getDashboardRoute } from '../../utils/dashboardRoute';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      if (response.data.success) {
        toast.success(response.data.message || 'OTP sent to your email');
        // Redirect to verify-email with email state
        navigate('/verify-email', { state: { email: formData.email } });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to sign up';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] bg-film-grain bg-dot-grid p-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--color-ember-dark)]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0"></div>
      
      <div className="max-w-md w-full glass bg-[var(--color-noir-surface-high)]/80 rounded-3xl p-8 z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight">Create Account</h2>
          <p className="text-[var(--text-secondary)] font-medium">Join the Re-Gadgets platform</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[var(--color-noir-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-ember-light)] focus:ring-1 focus:ring-[var(--color-ember-light)] transition-colors appearance-none"
            >
              <option value="customer">Customer</option>
              <option value="technician">Technician</option>
              <option value="shopOwner">Shop Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-ember-light)] transition-colors" />
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[var(--color-noir-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[var(--color-ember-light)] focus:ring-1 focus:ring-[var(--color-ember-light)] transition-colors placeholder:text-slate-600"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-ember-light)] transition-colors" />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--color-noir-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[var(--color-ember-light)] focus:ring-1 focus:ring-[var(--color-ember-light)] transition-colors placeholder:text-slate-600"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-ember-light)] transition-colors" />
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[var(--color-noir-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[var(--color-ember-light)] focus:ring-1 focus:ring-[var(--color-ember-light)] transition-colors placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--color-ember-light)] transition-colors" />
              <input 
                type="password" 
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[var(--color-noir-surface)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[var(--color-ember-light)] focus:ring-1 focus:ring-[var(--color-ember-light)] transition-colors placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[var(--color-ember-light)] to-[var(--color-ember-dark)] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-6 group"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-[var(--text-secondary)] text-sm font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-ember-light)] hover:text-white font-bold transition-colors">
            Log in
          </Link>
        </p>

        <div className="mt-8 flex items-center justify-center">
          <div className="border-t border-[var(--border-primary)] w-full"></div>
          <span className="bg-[var(--color-noir-surface-high)] px-4 text-[var(--text-secondary)] text-xs font-bold uppercase tracking-wider">or</span>
          <div className="border-t border-[var(--border-primary)] w-full"></div>
        </div>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await useAuthStore.getState().loginWithGoogle(credentialResponse.credential, formData.role);
              if (res.success) {
                toast.success('Signed up with Google successfully!');
                const userRole = useAuthStore.getState().user?.role;
                navigate(getDashboardRoute(userRole), { replace: true });
              } else {
                toast.error(res.message || 'Failed to sign up with Google');
              }
            }}
            onError={() => {
              toast.error('Google Sign Up Failed');
            }}
            theme="filled_black"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
