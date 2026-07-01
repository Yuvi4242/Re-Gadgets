import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../api/axiosInstance';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/verify-email', { email, otp });
      if (response.data.success) {
        toast.success(response.data.message || 'Email verified! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4">
      <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-8 border border-slate-800 shadow-xl text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Verify Email</h2>
        <p className="text-slate-400 mb-8">We've sent a 6-digit code to <br/><span className="text-white font-medium">{email}</span></p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="text" 
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full text-center tracking-[1em] text-2xl font-bold bg-[#1e293b] border border-slate-700 text-white rounded-lg py-4 focus:outline-none focus:border-brandPurple focus:ring-1 focus:ring-brandPurple transition-colors"
              placeholder="000000"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-brandPurple hover:bg-brandPurpleLight text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
