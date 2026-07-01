import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import api from '../../api/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      if (response.data.success) {
        toast.success(response.data.message || 'Reset link sent!');
        setIsSent(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
        <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-xl text-center">
          <div className="w-16 h-16 bg-brandPurple/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-brandPurple" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
          <p className="text-slate-400 mb-8">We've sent a password reset link to <br/><span className="text-white">{email}</span></p>
          <Link to="/login" className="text-brandPurple hover:text-brandPurpleLight font-medium transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
      <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-xl">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        
        <h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
        <p className="text-slate-400 mb-8">Enter your email address and we'll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !email}
            className="w-full bg-brandPurple hover:bg-brandPurpleLight text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
