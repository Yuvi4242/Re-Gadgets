import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, Clock, CheckCircle, Package, ArrowRight, Activity, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, subValue, icon: Icon, trend, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#0b1326] border border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-xl hover:border-brandBlue/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all duration-500"
    >
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-extrabold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-cyan-400 transition-all duration-300">
            {value}
          </h3>
        </div>
        <div className={`p-4 rounded-2xl border transition-colors duration-500 ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20' : 'bg-brandBlue/10 text-brandBlue border-brandBlue/20 group-hover:bg-brandBlue/20'}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center gap-2 relative z-10">
        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${trend === 'up' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-300 bg-white/5 border border-white/10'}`}>
          {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
          {subValue}
        </span>
        <span className="text-xs font-medium text-slate-500">vs last period</span>
      </div>
      
      {/* Decorative background circle */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[30px] pointer-events-none group-hover:scale-150 transition-transform duration-700 ${trend === 'up' ? 'bg-emerald-500/10' : 'bg-brandBlue/10'}`}></div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const activeOrders = [
    { id: '#RG-9823', device: 'iPhone 13 Pro', issue: 'Screen Replacement', status: 'In Transit', date: 'Today, 11:30 AM', color: 'bg-brandBlue/10 text-brandBlue border-brandBlue/30 shadow-[0_0_10px_rgba(79,70,229,0.3)]' },
    { id: '#RG-9824', device: 'Samsung TV 55"', issue: 'Power Supply', status: 'Repairing', date: 'Today, 09:00 AM', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]' },
  ];

  const recentOrders = [
    { id: '#RG-9701', device: 'MacBook Air M1', status: 'Completed', date: '12 Oct, 2024', price: '$299.00', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    { id: '#RG-9650', device: 'LG AC 1.5 Ton', status: 'Completed', date: '05 Oct, 2024', price: '$50.00', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    { id: '#RG-9621', device: 'PS5 Console', status: 'Completed', date: '28 Sep, 2024', price: '$85.00', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  ];

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full relative min-h-screen bg-[#020617] text-slate-200 selection:bg-brandPurple/30 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brandBlue/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0b1326] shadow-[0_0_15px_#4f46e5]">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back, John 👋</h1>
              <p className="text-slate-400 font-medium text-sm mt-1">You have <span className="text-brandBlue font-bold">2 repairs</span> currently active.</p>
            </div>
          </motion.div>
        </div>
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="self-start md:self-auto"
        >
          <Link to="/book" className="bg-gradient-to-r from-brandBlue to-brandPurple text-white px-8 py-3.5 rounded-full font-bold shadow-[0_0_20px_-5px_var(--color-brandBlue)] hover:shadow-[0_0_40px_0px_var(--color-brandPurple)] active:scale-95 transition-all text-sm flex items-center justify-center gap-2 group relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
             <span className="relative z-10">+ Book Repair</span>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
             key="skeleton"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-10"
          >
             {/* Stats Skeleton */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="h-40 bg-[#0b1326] rounded-3xl border border-white/5 shadow-xl p-6 flex flex-col justify-between">
                     <div className="flex justify-between">
                       <div className="space-y-3">
                         <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                         <div className="h-8 w-16 bg-white/10 rounded animate-pulse"></div>
                       </div>
                       <div className="h-14 w-14 bg-white/5 rounded-2xl animate-pulse"></div>
                     </div>
                     <div className="h-4 w-32 bg-white/5 rounded animate-pulse"></div>
                  </div>
                ))}
             </div>
             
             {/* Layout Skeleton */}
             <div className="grid lg:grid-cols-3 gap-10">
               <div className="lg:col-span-2 space-y-4">
                 <div className="h-8 w-40 bg-white/10 rounded mb-6 animate-pulse"></div>
                 {[1,2].map(i => <div key={i} className="h-32 bg-[#0b1326] rounded-2xl border border-white/5 animate-pulse"></div>)}
               </div>
               <div className="space-y-4">
                 <div className="h-8 w-40 bg-white/10 rounded mb-6 animate-pulse"></div>
                 <div className="h-64 bg-[#0b1326] rounded-2xl border border-white/5 animate-pulse"></div>
               </div>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <StatCard delay={0.1} title="Total Repairs" value="5" subValue="+24%" icon={Package} trend="up" />
              <StatCard delay={0.2} title="Active Orders" value="2" subValue="+2" icon={Activity} trend="neutral" />
              <StatCard delay={0.3} title="Total Spent" value="$434" subValue="-12%" icon={TrendingUp} trend="up" />
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Active Orders List */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Active Orders</h2>
                    <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg">View History</button>
                  </div>
                  
                  <div className="grid gap-5">
                    {activeOrders.map((order, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        key={idx}
                      >
                        <div className="group cursor-pointer bg-[#0b1326] rounded-3xl border border-white/5 p-6 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-xl hover:border-brandBlue/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all duration-300 relative overflow-hidden">
                           <div className="flex items-center gap-5 w-full sm:w-auto relative z-10">
                             <div className="w-16 h-16 rounded-2xl bg-[#060e20] flex items-center justify-center border border-white/10 shadow-inner group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:border-brandBlue/50 transition-all duration-300 overflow-hidden relative">
                               <Package className="w-8 h-8 text-slate-400 group-hover:text-brandBlue transition-colors relative z-10" />
                               <div className="absolute inset-0 bg-brandBlue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             </div>
                             <div>
                               <h3 className="font-extrabold text-lg text-white group-hover:text-brandBlue transition-colors tracking-tight">{order.device}</h3>
                               <p className="text-sm text-slate-400 font-bold mt-0.5">{order.issue}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">{order.id} • {order.date}</p>
                             </div>
                           </div>
                           
                           <div className="flex items-center justify-between w-full sm:w-auto gap-8 sm:gap-10 border-t sm:border-t-0 border-white/10 sm:border-l sm:pl-8 pt-4 sm:pt-0 relative z-10">
                             <div className="text-left sm:text-right">
                                <p className="text-[10px] text-slate-500 font-bold mb-1.5 uppercase tracking-widest">Status</p>
                                <span className={`px-4 py-1.5 rounded-lg text-xs font-extrabold border ${order.color}`}>
                                  {order.status}
                                </span>
                             </div>
                             <Link to="/tracking" className="w-12 h-12 rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-brandBlue group-hover:text-white group-hover:border-brandBlue group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
                               <ArrowRight className="w-6 h-6" />
                             </Link>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 divide-y divide-white/5">
                  <h2 className="text-xl font-extrabold text-white mb-6 tracking-tight">Recent History</h2>
                  <div className="grid gap-4">
                    {recentOrders.map((order, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 + (idx * 0.1) }}
                         key={idx}
                       >
                         <div className="bg-[#0b1326]/50 border border-white/5 hover:border-white/10 hover:bg-[#0b1326] rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition-all">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                               <CheckCircle className="w-5 h-5 text-emerald-400" />
                             </div>
                             <div>
                               <h3 className="font-bold text-sm text-slate-200">{order.device}</h3>
                               <p className="text-xs text-slate-500 font-medium">{order.id} • {order.date}</p>
                             </div>
                           </div>
                           <div className="font-extrabold text-white border-l border-white/10 pl-4 py-1">
                              {order.price}
                           </div>
                         </div>
                       </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Promotion Banner - Animated Gradient */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-[2rem] bg-gradient-to-br from-[#121c33] to-[#060e20] p-8 text-white relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-white/10 group isolate"
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen pointer-events-none"></div>
                  <motion.div 
                    animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-brandBlue to-brandPurple rounded-full blur-[40px] opacity-60 z-0 pointer-events-none"
                  ></motion.div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                       <Target className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="font-extrabold text-2xl tracking-tight mb-2">Refer & Earn</h3>
                    <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                      Invite a friend to Re-Gadgets and get <strong className="text-white bg-white/10 px-1 py-0.5 rounded">$20 credit</strong> towards your next repair.
                    </p>
                    <button className="w-full bg-white text-slate-900 font-extrabold py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95 transition-all text-sm flex items-center justify-center gap-2 group-hover:-translate-y-1">
                      Share Link <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Secure Trust Center */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="bg-[#0b1326] rounded-[2rem] border border-white/5 shadow-xl overflow-hidden"
                >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400">
                            <ShieldCheck className="w-5 h-5" />
                         </div>
                         <h3 className="font-extrabold text-white tracking-tight">Trust Center</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-brandBlue/30 hover:bg-white/5 transition-all group cursor-pointer shadow-inner">
                           <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                             <CheckCircle className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-sm font-bold text-slate-200">100% Data Guarantee</p>
                             <p className="text-xs text-slate-500 font-medium mt-0.5">Your files are untouched.</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-brandPurple/30 hover:bg-white/5 transition-all group cursor-pointer shadow-inner">
                           <div className="w-10 h-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                             <ShieldAlert className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                             <p className="text-sm font-bold text-slate-200">Premium Parts</p>
                             <p className="text-xs text-slate-500 font-medium mt-0.5">OEM-certified components.</p>
                           </div>
                        </div>
                      </div>
                    </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
