import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import StepIndicator from '../../components/auth/StepIndicator';
import OtpInput from '../../components/auth/OtpInput';
import PasswordInput from '../../components/auth/PasswordInput';

const Signup = () => {
  const navigate = useNavigate();
  const { api, login } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  
  // Step 1 Data
  const [formData, setFormData] = useState({ name: '', email: '', role: 'customer' });
  
  // Step 2 Data
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);

  // Step 3 Data
  const [passwordData, setPasswordData] = useState({ password: '', confirmPassword: '' });

  // Timer for Resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- HANDLERS ---

  const handleStep1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/send-otp', formData);
      setTempToken(data.tempToken);
      setStep(2);
      setTimer(60);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error('Please enter 6-digit OTP');
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { tempToken, otp });
      setTempToken(data.tempToken);
      setStep(3);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/resend-otp', { tempToken });
      toast.success('OTP resent successfully!');
      setTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/create-password', {
        tempToken,
        ...passwordData
      });
      login(data.token, data.user);
      toast.success('Account created successfully!');
      navigate('/complete-profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brandPurple/20 rounded-full blur-[120px] -z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brandBlue/10 rounded-full blur-[100px] -z-0"></div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            RE<span className="text-brandPurple">GADGET</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Join the premier gadget repair marketplace</p>
        </div>

        <StepIndicator currentStep={step} />

        {/* STEP 1: Details */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Full Name</label>
              <div className="relative group/input">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Email Address</label>
              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-brandPurple transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 outline-none focus:border-brandPurple focus:ring-4 focus:ring-brandPurple/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {['customer', 'technician', 'shopOwner'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r })}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg border transition-all ${
                      formData.role === r 
                        ? 'bg-brandPurple border-brandPurple text-white shadow-lg shadow-brandPurple/20' 
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    {r === 'shopOwner' ? 'Owner' : r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-bold py-3.5 rounded-xl mt-6 shadow-xl shadow-brandPurple/20 transition-all flex items-center justify-center space-x-2 group"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Verification code sent to</p>
              <p className="text-white font-bold tracking-wide">{formData.email}</p>
            </div>

            <OtpInput value={otp} onChange={setOtp} />

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-brandPurple hover:bg-brandPurple/90 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brandPurple/20 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Code"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || isLoading}
                  className="text-xs font-bold uppercase tracking-widest text-brandPurple disabled:text-slate-600 flex items-center justify-center space-x-2 mx-auto hover:underline"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading && 'animate-spin'}`} />
                  <span>{timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: Password */}
        {step === 3 && (
          <form onSubmit={handleStep3} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-2">
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="text-white font-bold">Secure Your Account</p>
            </div>

            <PasswordInput
              label="Create Password"
              showStrength
              value={passwordData.password}
              onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
            />

            <PasswordInput
              label="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl mt-4 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brandPurple font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
