import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Wrench, CheckCircle, ChevronDown, MoreHorizontal, BarChart3, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
// Mock Recharts components for environment stability
const ResponsiveContainer = ({ children }) => <div className="w-full h-full">{children}</div>;
const AreaChart = ({ data, children }) => <svg className="w-full h-full" viewBox="0 0 400 200">{children}</svg>;
const Area = () => <path d="M0 150 Q 100 100 200 150 T 400 50" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />;
const BarChart = ({ children }) => <svg className="w-full h-full">{children}</svg>;
const Bar = () => null;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;
const Cell = () => null;

import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { cn } from '../../services/utils';

const ShopDashboard = () => {
  console.log("Rendering Shop Dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const requests = [
    { id: '#REQ-209', customer: 'Sarah Connor', device: 'Samsung S22 Ultra', issue: 'Shattered Back Glass', date: '2 hrs ago', status: 'Pending', urgent: true },
    { id: '#REQ-208', customer: 'John Wick', device: 'iPad Pro 12.9', issue: 'Not turning on', date: '5 hrs ago', status: 'Accepted', urgent: false },
    { id: '#REQ-207', customer: 'Tony Stark', device: 'Pixel 7 Pro', issue: 'Camera blurry', date: '1 day ago', status: 'In Progress', urgent: true },
  ];

  const chartData = [
    { name: 'Mon', revenue: 4200, jobs: 12 },
    { name: 'Tue', revenue: 3800, jobs: 8 },
    { name: 'Wed', revenue: 5600, jobs: 15 },
    { name: 'Thu', revenue: 4900, jobs: 11 },
    { name: 'Fri', revenue: 7200, jobs: 19 },
    { name: 'Sat', revenue: 6100, jobs: 14 },
    { name: 'Sun', revenue: 3500, jobs: 6 },
  ];

  const stats = [
    { title: 'Total Revenue', value: '₹1,24,500', trend: '+14%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Active Jobs', value: '42', trend: '+5%', icon: Wrench, color: 'text-brandBlue', bg: 'bg-brandBlue/10' },
    { title: 'Teams on Duty', value: '08', trend: 'Full Strength', icon: Users, color: 'text-brandPurple', bg: 'bg-brandPurple/10' },
    { title: 'CSAT Score', value: '4.9', trend: '+0.2', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div>
            <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Shop HQ <span className="text-brandBlue">Analytics</span></h1>
            <p className="text-[var(--text-secondary)] font-medium mt-1">Real-time performance metrics and request nexus.</p>
         </div>
         <div className="flex gap-3">
            <Button variant="secondary" className="rounded-2xl border-[var(--border-primary)]">
               Export CSV
            </Button>
            <Button variant="primary" className="rounded-2xl px-6">
               <TrendingUp className="w-4 h-4 mr-2" /> Performance Report
            </Button>
         </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
               <Card className="border-[var(--border-primary)] shadow-sm hover:border-brandBlue/30">
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-3 rounded-2xl", stat.bg)}>
                           <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg border",
                          stat.trend.includes('+') ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" : "text-[var(--text-secondary)] bg-slate-500/5 border-slate-500/10"
                        )}>
                           {stat.trend.includes('+') ? <ArrowUpRight className="w-3 h-3" /> : null}
                           {stat.trend}
                        </div>
                     </div>
                     <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">{stat.title}</p>
                     <h3 className="text-3xl font-black text-[var(--text-primary)] mt-1 tracking-tighter">{loading ? <Skeleton className="h-8 w-24" /> : stat.value}</h3>
                  </CardContent>
               </Card>
            </motion.div>
         ))}
      </div>

      {/* Analytics & Request Nexus Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Revenue Chart */}
         <div className="lg:col-span-2 space-y-4">
            <Card className="h-full border-[var(--border-primary)]">
               <CardHeader 
                  title="Revenue Streams" 
                  subtitle="Weekly earnings breakdown by repair volume" 
                  icon={BarChart3}
                  action={
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                       <button className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-white dark:bg-slate-700 shadow-sm">Revenue</button>
                       <button className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg text-slate-400">Jobs</button>
                    </div>
                  }
               />
               <CardContent className="h-[350px] pt-8">
                  {loading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.4)" />
                          <XAxis 
                             dataKey="name" 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} 
                          />
                          <YAxis 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 700 }} 
                          />
                          <Tooltip 
                             contentStyle={{ 
                                backgroundColor: 'var(--bg-primary)', 
                                border: '1px solid var(--border-primary)',
                                borderRadius: '1rem',
                                boxShadow: 'var(--card-shadow)'
                             }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                       </AreaChart>
                    </ResponsiveContainer>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Request Inbox */}
         <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight px-2">Priority Queue</h3>
            <div className="space-y-4">
               {loading ? (
                  [1, 2, 3].map(i => <Skeleton key={i} className="h-28 w-full" />)
               ) : (
                  requests.map((req, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                       <Card className={cn(
                          "relative overflow-hidden group border-[var(--border-primary)]",
                          req.urgent ? "border-rose-500/30" : ""
                       )}>
                          <CardContent className="p-5">
                             <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-black text-brandBlue uppercase tracking-widest">{req.id}</span>
                                {req.urgent && <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[8px] font-black uppercase animate-pulse">Urgent</span>}
                             </div>
                             <h4 className="text-sm font-black text-[var(--text-primary)] leading-tight">{req.customer}</h4>
                             <p className="text-xs text-[var(--text-secondary)] font-medium mt-1">{req.device} • {req.issue}</p>
                             
                             <div className="mt-4 pt-4 border-t border-[var(--border-primary)] flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 capitalize">{req.date}</span>
                                <div className="flex gap-2">
                                   <Button variant="secondary" className="h-8 px-3 text-[10px] rounded-lg">Details</Button>
                                   <Button variant="primary" className="h-8 px-3 text-[10px] rounded-lg shadow-none">Accept</Button>
                                </div>
                             </div>
                          </CardContent>
                       </Card>
                    </motion.div>
                  ))
               )}
               <Button variant="ghost" className="w-full text-xs font-black uppercase tracking-widest py-4 border-2 border-dashed border-[var(--border-primary)] rounded-[2rem]">
                  Enter Full Matrix View
               </Button>
            </div>
         </div>

      </div>

    </div>
  );
};

export default ShopDashboard;
