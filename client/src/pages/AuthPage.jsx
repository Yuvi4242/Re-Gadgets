import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Settings, Smartphone, Cpu } from 'lucide-react';
import RoleSelector from '../components/RoleSelector';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import RobotAssistant from '../components/chat/RobotAssistant';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('customer');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#060e20] relative flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden">
      
      {/* 1. ANIMATED BACKGROUND: "The Repair Lab" */}
      {/* Cinematic noise and deep gradients */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-screen pointer-events-none z-0"></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brandBlue/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brandPurple/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen z-0"></div>

      {/* Floating Foreground Lab Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
         
         {/* Central Holographic Blueprint Ring */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] absolute border-[1px] border-white/5 rounded-full"
         />
         <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] absolute border-[2px] border-brandBlue/5 rounded-full border-dashed"
         />
         
         {/* Robot Mascot Repairing (Background Element) */}
         <motion.div 
           initial={{ x: -300, opacity: 0 }}
           animate={{ x: [-250, -260, -250], y: [0, -10, 0], opacity: 0.3 }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 scale-[1.5]"
         >
           <div className="opacity-90 blur-[1px]">
             <RobotAssistant state="repairing" size="normal" />
           </div>
         </motion.div>

         {/* Floating Lab Tools */}
         <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[15%] opacity-30 text-brandBlue">
            <Wrench className="w-16 h-16 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
         </motion.div>
         <motion.div animate={{ y: [0, 40, 0], rotate: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] left-[20%] opacity-20 text-emerald-400">
            <Cpu className="w-12 h-12 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
         </motion.div>
         <motion.div animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[25%] right-[25%] opacity-20 text-brandPurple">
            <Settings className="w-10 h-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
         </motion.div>

         {/* Abstract Broken Phone getting fixed */}
         <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           className="absolute top-[15%] left-[30%] opacity-10"
         >
            <Smartphone className="w-24 h-24 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
         </motion.div>

      </div>

      {/* 2. CENTERED AUTH CARD */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[480px] bg-[#0b1326]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] relative z-10 flex flex-col"
      >
         {/* Branding Header */}
         <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all">
                  <span className="text-white font-black text-xl">R</span>
               </div>
               <span className="text-2xl font-extrabold text-white tracking-tight">Re-Gadgets</span>
            </Link>
            
            <h1 className="text-3xl font-bold text-white mb-2 text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-400 text-sm font-medium text-center">
              {isLogin ? 'Enter the lab to manage your tech' : 'Join the smartest repair network'}
            </p>
         </div>

         {/* Animated Toggle Switch */}
         <div className="relative flex w-full bg-[#121c33]/80 p-1.5 rounded-2xl mb-8 border border-white/5 shadow-inner backdrop-blur-md">
            <button
               onClick={() => setIsLogin(true)}
               className={`flex-1 relative z-10 py-2.5 text-sm font-bold tracking-wide transition-colors ${isLogin ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
               Login
            </button>
            <button
               onClick={() => setIsLogin(false)}
               className={`flex-1 relative z-10 py-2.5 text-sm font-bold tracking-wide transition-colors ${!isLogin ? 'text-white' : 'text-slate-400 hover:text-white'}`}
            >
               Signup
            </button>
            
            {/* Morphing Background Pill */}
            <div className="absolute inset-1.5 flex pointer-events-none">
               <motion.div
                 layout
                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
                 className={`w-1/2 h-full bg-gradient-to-r from-brandBlue to-brandPurple rounded-xl shadow-[0_5px_15px_rgba(79,70,229,0.4)]`}
                 style={{ 
                    x: isLogin ? "0%" : "100%",
                 }}
               />
            </div>
         </div>

         {/* Forms & Role Selector Container */}
         <div className="relative min-h-[400px]">
            {/* Form Transitions */}
            <AnimatePresence mode="wait">
               {isLogin ? (
                  <motion.div 
                     key="login-form"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                     <div className="mb-6">
                        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
                     </div>
                     <LoginForm role={selectedRole} />
                  </motion.div>
               ) : (
                  <motion.div 
                     key="register-form"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                     <div className="mb-6">
                        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
                     </div>
                     <RegisterForm role={selectedRole} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

      </motion.div>

    </div>
  );
};

export default AuthPage;
