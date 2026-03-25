import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';

const LoginForm = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setHasError(false); // reset error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setHasError(true);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call and redirect based on role
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submitted:', formData, 'Role:', role);
      // Execute role-based routing dynamically
      if (role === 'owner') navigate('/shop/dashboard');
      else if (role === 'worker') navigate('/technician/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/customer/dashboard'); // Fallback to customer
    }, 1500);
  };

  return (
    <motion.form 
      animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit} 
      className="flex flex-col gap-5 w-full mt-2"
    >
      {/* Verify Shop Owner Trust Badge */}
      {role === 'owner' && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col gap-2 mb-2 shadow-inner isolate relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 blur-[20px] rounded-full pointer-events-none -z-10"></div>
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-emerald-400 tracking-tight">Login as Verified Shop</span>
           </div>
           <p className="text-xs text-emerald-500/80 font-bold flex items-center gap-1.5 mt-1 border-t border-emerald-500/10 pt-2 uppercase tracking-widest">
             <CheckCircle2 className="w-3.5 h-3.5" /> Trusted by 500+ verified partner shops
           </p>
        </motion.div>
      )}

      <InputField 
        id="email"
        label="Email Address"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={hasError && !formData.email ? 'Email is required' : ''}
        required
      />
      
      <div className="flex flex-col gap-1">
        <InputField 
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={hasError && !formData.password ? 'Password is required' : ''}
          required
        />
        <div className="flex justify-end mt-1">
          <a href="#" className="flex group focus:outline-none focus:ring-2 focus:ring-brandBlue/50 rounded-md ring-offset-2 ring-offset-[#0b1326]">
            <span className="text-[11px] font-bold text-brandBlue hover:text-brandPurple transition-colors relative">
              Forgot Password?
              <span className="absolute bottom-0 left-0 w-full h-px bg-brandPurple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </span>
          </a>
        </div>
      </div>

      <div className="mt-4">
        {/* The Button component likely has its own hover/tap but we wrap it to ensure bounce if needed */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
           <Button type="submit" fullWidth isLoading={isLoading}>
             Secure Login
           </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default LoginForm;
