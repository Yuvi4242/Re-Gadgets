import React from 'react';
import { motion } from 'framer-motion';
import { User, Store, Wrench, ShieldAlert } from 'lucide-react';

const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      desc: 'Book gadget repairs easily',
      icon: User,
      color: 'from-blue-400 to-indigo-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      id: 'owner',
      title: 'Shop Owner',
      desc: 'Manage your repair shop',
      icon: Store,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/20'
    },
    {
      id: 'worker',
      title: 'Technician',
      desc: 'View & complete repairs',
      icon: Wrench,
      color: 'from-purple-400 to-fuchsia-500',
      shadow: 'shadow-purple-500/20'
    },
    {
      id: 'admin',
      title: 'Admin',
      desc: 'Platform management',
      icon: ShieldAlert,
      color: 'from-rose-400 to-red-500',
      shadow: 'shadow-rose-500/20'
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-slate-400 mb-4 tracking-wide uppercase">Select Your Role</h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const Icon = role.icon;
          
          return (
            <motion.button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-start p-4 text-left rounded-2xl border transition-all duration-300 overflow-hidden group ${
                isSelected 
                  ? 'border-transparent bg-slate-800/80 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                  : 'border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-white/20'
              }`}
            >
              {isSelected && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brandBlue to-brandPurple" />
              )}
              {isSelected && (
                <div className={`absolute -inset-4 bg-gradient-to-br ${role.color} opacity-[0.03] blur-xl`} />
              )}
              
              <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${role.color} text-white shadow-lg ${role.shadow}` 
                  : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <h4 className={`font-bold text-sm sm:text-base mb-1 transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                {role.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium line-clamp-2">
                {role.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
