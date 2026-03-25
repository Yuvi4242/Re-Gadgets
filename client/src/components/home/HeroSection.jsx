import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Smartphone, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-[#020617] perspective-1000">
      {/* Immersive Animated Background Gradients & Noise */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgwem0zOSAzOXYtMzhIMXYzOGgzOHptLTEgMHYtMzZIMnYzNmgzNnoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMikiLz4KPC9zdmc+')] opacity-30 z-0"></div>
      
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-brandBlue/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[55%] bg-brandPurple/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0"
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3, duration: 0.5 }}
               className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-800/50 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-brandBlue animate-pulse shadow-[0_0_10px_#4f46e5]"></div>
              <span className="text-slate-300 font-semibold text-xs tracking-wider uppercase">AI-Powered Tech Repair</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
              Repair Your Gadgets <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-purple-400 to-indigo-400 animate-gradient-x bg-[length:200%_auto]">
                At Your Doorstep
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Fast, reliable, and intelligent repair services. Our AI instantly diagnostics issues and matches you with verified local master technicians.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link to="/book" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-full font-bold text-lg shadow-[0_0_30px_-5px_var(--color-brandBlue)] hover:shadow-[0_0_50px_0px_var(--color-brandPurple)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative z-10 hidden sm:inline">Book a Repair</span>
                  <span className="relative z-10 sm:hidden">Book Now</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/tracking" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-slate-900/50 backdrop-blur-xl text-slate-200 border border-white/10 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center group"
                >
                  <MapPin className="w-5 h-5 mr-2 text-slate-400 group-hover:text-white transition-colors" />
                  Track Order
                </motion.button>
              </Link>
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-slate-400 font-semibold text-sm"
            >
              <div className="flex flex-col items-start gap-1">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
                </div>
                <span>4.9/5 from 10k+ users</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-white font-bold text-lg leading-none">500+</span>
                <span className="text-slate-500">Verified Shops</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Floating Elements (Apple/Stripe/Linear blend) */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[650px] hidden md:block select-none">
            {/* Main Interactive Status Card */}
            <motion.div 
              animate={{ y: ["-10px", "10px"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] w-[340px] glass-dark !bg-slate-900/60 rounded-3xl p-6 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] z-30 backdrop-blur-2xl"
            >
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5">
                <div>
                  <div className="text-brandBlue font-bold text-xs uppercase tracking-widest mb-1">Live Status</div>
                  <div className="text-white font-extrabold text-xl font-sans tracking-tight">Display Replacement</div>
                  <div className="text-slate-400 text-sm mt-1">iPhone 15 Pro Max</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-brandBlue to-brandPurple rounded-2xl flex items-center justify-center shadow-lg shadow-brandPurple/30">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-white">Diagnostics Complete</span>
                       <span className="text-slate-500">100%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-full" />
                     </div>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-brandBlue/20 border border-brandBlue/30 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-brandBlue/20 animate-ping"></div>
                     <Wrench className="w-4 h-4 text-brandBlue" />
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-brandBlue">Installing Parts...</span>
                       <span className="text-slate-500">75%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                       <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                          className="absolute h-full bg-gradient-to-r from-brandBlue to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] rounded-full"
                       />
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Technician Profile Mock */}
            <motion.div 
              animate={{ y: ["10px", "-10px"] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
              className="absolute top-[55%] right-[5%] w-64 glass-dark !bg-slate-800/80 rounded-[2rem] p-4 border border-white/5 shadow-2xl z-20 backdrop-blur-xl flex items-center gap-4"
            >
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop" className="w-14 h-14 rounded-full border-2 border-slate-700 object-cover" alt="Technician" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-800 rounded-full"></div>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Mike Johnson</div>
                <div className="text-slate-400 text-xs font-medium">Master Technician</div>
                <div className="flex items-center text-amber-400 text-xs mt-1 font-bold">
                  <Star className="w-3 h-3 fill-current mr-1" /> 4.9 (240 jobs)
                </div>
              </div>
            </motion.div>
            
            {/* Background Aesthetic Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] right-[10%] w-[400px] h-[400px] border border-white/5 border-dashed rounded-full -z-10"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-[15%] right-[15%] w-[320px] h-[320px] border border-brandBlue/10 rounded-full -z-10"
            />
          </div>
        </div>
      </div>
      
      {/* Wave bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
