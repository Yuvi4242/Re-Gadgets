import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, MapPin, Search, Star, Smartphone, Laptop, Sparkles, Battery, Zap, AlertCircle, Clock } from 'lucide-react';
import Card, { CardContent } from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { cn } from '../../services/utils';

const CustomerDashboard = () => {
  console.log("Rendering Customer Dashboard");
  const [loading, setLoading] = useState(true);

  // Simulate loading state for premium feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  
  // Mock Data
  const activeOrders = [
    { id: 'ORD-8921', device: 'iPhone 13 Pro', issue: 'Screen Replacement', status: 'In Transit', shop: 'TechFix NYC', date: 'Oct 24, 2023', progress: 65 },
    { id: 'ORD-8944', device: 'MacBook Air M2', issue: 'Battery Service', status: 'Repairing', shop: 'Apple Masters', date: 'Oct 26, 2023', progress: 30 },
  ];

  const categories = [
    { name: 'Smartphone', icon: Smartphone, color: 'text-brandBlue', bg: 'bg-brandBlue/10' },
    { name: 'Laptop', icon: Laptop, color: 'text-brandPurple', bg: 'bg-brandPurple/10' },
    { name: 'Tablets', icon: Smartphone, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Audio', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Smart Greeting & Search */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black text-[var(--text-primary)] tracking-tight"
            >
               Welcome back, <span className="text-gradient">Alex</span> 👋
            </motion.h1>
            <p className="text-[var(--text-secondary)] font-medium mt-1">Your gadgets are in good hands.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <Button variant="secondary" className="hidden sm:flex rounded-2xl">
               <Star className="w-4 h-4 mr-2" /> Rate Experiences
            </Button>
            <Button variant="primary" className="rounded-2xl px-8">
               <ShoppingBag className="w-4 h-4 mr-2" /> Book New Repair
            </Button>
         </div>
      </section>

      {/* AI Suggestion Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-brandBlue/20 bg-gradient-to-r from-brandBlue/5 to-brandPurple/5 overflow-hidden ring-1 ring-brandBlue/10">
           <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
              <div className="w-16 h-16 rounded-2xl bg-brandBlue shadow-lg shadow-brandBlue/30 flex items-center justify-center shrink-0 animate-float">
                 <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight flex items-center justify-center md:justify-start gap-2">
                    Smart Diagnostic Alert <span className="px-2 py-0.5 rounded-md bg-brandBlue/10 text-brandBlue text-[10px] uppercase font-black">AI Powered</span>
                 </h2>
                 <p className="text-[var(--text-secondary)] font-medium mt-1">Our AI detected unusual battery drain on your linked **MacBook Pro**. We recommend a health checkup before it impacts your workflow.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                 <Button variant="ghost">Dismiss</Button>
                 <Button variant="primary" className="shadow-none rounded-xl">Check Battery Health</Button>
              </div>
           </CardContent>
           <div className="h-1 bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue w-[200%] animate-[shimmer_3s_linear_infinite]" />
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Tracking Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brandBlue" /> Active Repairs
               </h3>
               <button className="text-sm font-bold text-brandBlue hover:underline">View History</button>
            </div>

            <div className="grid gap-4">
               {loading ? (
                  [1, 2].map(i => <Skeleton key={i} className="h-40 w-full" />)
               ) : (
                  activeOrders?.length > 0 ? activeOrders.map((order, i) => (
                    <motion.div 
                      key={order?.id || i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                       <Card className="group border-[var(--border-primary)] hover:border-brandBlue/30">
                          <CardContent className="p-0">
                             <div className="flex flex-col sm:flex-row items-stretch">
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                   <div>
                                      <div className="flex items-center gap-2 mb-2">
                                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">{order?.id || 'N/A'}</span>
                                         <div className="w-1 h-1 rounded-full bg-slate-300" />
                                         <span className="text-[10px] font-black uppercase text-brandBlue tracking-widest">{order?.status || 'Active'}</span>
                                      </div>
                                      <h4 className="text-lg font-black text-[var(--text-primary)]">{order?.device || 'Unknown Device'}</h4>
                                      <p className="text-sm text-[var(--text-secondary)] font-medium">{order?.issue || 'Pending details'}</p>
                                   </div>
                                   <div className="mt-6 flex items-center gap-4">
                                      <div className="flex -space-x-2">
                                         {[1, 2, 3].map(j => (
                                            <div key={j} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black shadow-sm">U{j}</div>
                                         ))}
                                      </div>
                                      <span className="text-xs text-[var(--text-secondary)] font-bold">Assigned to {order?.shop || 'Partner Shop'}</span>
                                   </div>
                                </div>
                                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 flex flex-col justify-center gap-4 sm:w-72 border-l border-[var(--border-primary)]">
                                   <div className="space-y-2">
                                      <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                                         <span>Repair Progress</span>
                                         <span className={cn(
                                            order?.progress > 50 ? "text-brandBlue" : "text-brandPurple"
                                         )}>{order?.progress || 0}%</span>
                                      </div>
                                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                         <motion.div 
                                           initial={{ width: 0 }}
                                           animate={{ width: `${order?.progress || 0}%` }}
                                           transition={{ duration: 1, ease: 'easeOut' }}
                                           className={cn(
                                              "h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]",
                                              order?.progress > 50 ? "bg-brandBlue" : "bg-brandPurple"
                                           )} 
                                         />
                                      </div>
                                   </div>
                                   <Button variant="secondary" className="text-xs h-10 rounded-xl group-hover:bg-brandBlue group-hover:text-white group-hover:border-transparent transition-all">Track Live Location</Button>
                                </div>
                             </div>
                          </CardContent>
                       </Card>
                    </motion.div>
                  )) : (
                    <div className="p-12 text-center border-2 border-dashed border-[var(--border-primary)] rounded-[2.5rem] text-[var(--text-secondary)] font-bold bg-white/5">
                       No active repairs found. Start by booking one!
                    </div>
                  )
               )}
            </div>
         </div>

         {/* Sidebar Stats Area */}
         <div className="space-y-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-4">
               {categories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-5 rounded-[2.5rem] bg-[var(--bg-primary)] border border-[var(--border-primary)] flex flex-col items-center gap-3 cursor-pointer hover:shadow-xl hover:border-brandBlue/30 transition-all group lg:aspect-square justify-center shadow-sm"
                  >
                     <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm", cat.bg)}>
                        <cat.icon className={cn("w-7 h-7", cat.color)} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cat.name}</span>
                  </motion.div>
               ))}
            </div>

            <Card className="bg-brandBlue text-white border-0 shadow-xl shadow-brandBlue/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
               <CardContent className="p-8 space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight leading-tight">Secure your device against accidental damage.</h4>
                  <p className="text-white/80 text-sm font-medium">Protect + plans starting from just ₹49/month. Limited time offer.</p>
                  <Button variant="secondary" className="bg-white text-brandBlue hover:bg-white/90 border-0 w-full font-black rounded-xl">Get Protection</Button>
               </CardContent>
            </Card>
         </div>
         
      </div>
    </div>
  );
};

export default CustomerDashboard;
