import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

const PasswordInput = ({ 
  label = 'Password', 
  value, 
  onChange, 
  error, 
  placeholder = '••••••••', 
  id = 'password',
  name = 'password',
  onBlur,
  showStrength = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Simple password strength check
  const getStrength = (pwd) => {
    if (!pwd) return null;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    
    if (strength <= 1) return 'weak';
    if (strength === 2 || strength === 3) return 'medium';
    return 'strong';
  };

  const strength = getStrength(value);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative group/input">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-brandPurple transition-colors">
          <Lock className="w-5 h-5" />
        </div>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full bg-[#020617] border ${error ? 'border-red-500' : 'border-slate-800' } group-focus-within/input:border-brandPurple rounded-lg py-2.5 pl-10 pr-10 text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:ring-4 focus:ring-brandPurple/10`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      
      {showStrength && value && (
        <div className="mt-2 space-y-1">
          <div className="flex space-x-1 h-1">
            <div className={`flex-1 rounded-full transition-all duration-500 ${strength === 'weak' ? 'bg-red-500' : (strength === 'medium' || strength === 'strong' ? 'bg-amber-500' : 'bg-slate-800')}`}></div>
            <div className={`flex-1 rounded-full transition-all duration-500 ${strength === 'medium' ? 'bg-amber-500' : (strength === 'strong' ? 'bg-emerald-500' : 'bg-slate-800' )}`}></div>
            <div className={`flex-1 rounded-full transition-all duration-500 ${strength === 'strong' ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Strength: <span className={`transition-colors ${strength === 'weak' ? 'text-red-500' : (strength === 'medium' ? 'text-amber-500' : 'text-emerald-500')}`}>{strength}</span>
          </p>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1 pl-1 font-medium">{error}</p>}
    </div>
  );
};

export default PasswordInput;
