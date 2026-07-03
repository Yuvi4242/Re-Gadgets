import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const TechnicianLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    if (!useAuthStore.getState().error) {
      navigate('/technician/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center relative isolate">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[oklch(0.78_0.16_75/0.1)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-md"
      >
        <div className="text-center mb-8">
           <div className="mx-auto w-16 h-16 bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260)] rounded-2xl flex items-center justify-center mb-6 shadow-lg text-[oklch(0.78_0.16_75)]">
             <Wrench className="w-8 h-8" />
           </div>
           <h1 className="text-3xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">Technician Portal</h1>
           <p className="text-[oklch(0.65_0.01_260)] font-medium mt-2">Access your assigned repairs, maps, and earnings.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 shadow-2xl">
          {error && (
             <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm font-bold text-rose-400 text-center">
               {error}
             </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3.5 text-[oklch(0.96_0.005_260)] focus:outline-none focus:border-[oklch(0.78_0.16_75/0.8)] focus:ring-1 focus:ring-[oklch(0.78_0.16_75)] transition-all" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)]">Password</label>
                <Link to="/forgot-password" className="text-xs text-[oklch(0.78_0.16_75)] hover:underline font-bold">Forgot?</Link>
              </div>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3.5 text-[oklch(0.96_0.005_260)] focus:outline-none focus:border-[oklch(0.78_0.16_75/0.8)] focus:ring-1 focus:ring-[oklch(0.78_0.16_75)] transition-all" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-[oklch(0.78_0.16_75)] hover:bg-[oklch(0.78_0.16_75/0.8)] disabled:opacity-50 text-[oklch(0.12_0.005_260)] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In as Technician'}
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-[oklch(0.65_0.01_260)] text-sm">
             Want to earn money repairing devices? <br className="sm:hidden" />
             <Link to="/contact" className="text-[oklch(0.78_0.16_75)] font-bold hover:underline ml-1">Apply as a Technician <ArrowRight className="inline w-3 h-3" /></Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicianLogin;
