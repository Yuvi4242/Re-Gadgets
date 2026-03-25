import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Users, Server, Database, Activity, FileCheck, Search, Zap, Cpu, Globe, BarChart3, BellRing, Terminal } from 'lucide-react';
// Mock Recharts components for environment stability
const ResponsiveContainer = ({ children }) => <div className="w-full h-full">{children}</div>;
const LineChart = ({ data, children }) => <svg className="w-full h-full" viewBox="0 0 400 200">{children}</svg>;
const Line = () => <path d="M0 150 Q 100 100 200 150 T 400 50" fill="none" stroke="#3b82f6" strokeWidth="2" />;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;
const AreaChart = ({ children }) => <svg className="w-full h-full">{children}</svg>;
const Area = () => null;
const BarChart = ({ children }) => <svg className="w-full h-full">{children}</svg>;
const Bar = () => null;

import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { cn } from '../../services/utils';

const AdminDashboard = () => {
  console.log("Rendering Admin Dashboard");
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([
    { type: 'sys', msg: 'System integrity check passed.', time: '12:40:01' },
    { type: 'info', msg: 'Auth token rotation complete.', time: '12:40:05' },
    { type: 'warn', msg: 'High latency detected in AP-South-1.', time: '12:40:12' },
    { type: 'sys', msg: 'Backup routine initialized.', time: '12:40:20' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    
    // Simulate live logs
    const logInterval = setInterval(() => {
       const newLog = { 
          type: Math.random() > 0.8 ? 'warn' : 'info', 
          msg: `Matrix heartbeat pulse ${Math.floor(Math.random() * 1000)}ms`,
          time: new Date().toLocaleTimeString()
       };
       setLogs(prev => [newLog, ...prev.slice(0, 8)]);
    }, 4000);

    return () => {
       clearTimeout(timer);
       clearInterval(logInterval);
    };
  }, []);

  const serverData = [
    { time: '12:00', cpu: 40, mem: 60 },
    { time: '12:10', cpu: 55, mem: 65 },
    { time: '12:20', cpu: 45, mem: 58 },
    { time: '12:30', cpu: 70, mem: 80 },
    { time: '12:40', cpu: 30, mem: 50 },
    { time: '12:50', cpu: 85, mem: 90 },
    { time: '13:00', cpu: 50, mem: 60 },
  ];

  const metrics = [
    { label: 'Active Sessions', value: '2,841', icon: Users, color: 'text-brandBlue', bg: 'bg-brandBlue/10' },
    { label: 'DB Queries/sec', value: '142', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Uptime', value: '99.99%', icon: Activity, color: 'text-brandPurple', bg: 'bg-brandPurple/10' },
    { label: 'Security Threats', value: '0', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Crimson Core Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-rose-500 shadow-xl shadow-rose-500/20 flex items-center justify-center animate-pulse-glow">
               <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <div>
               <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">Admin <span className="text-rose-500">Cortex</span></h1>
               <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 uppercase tracking-widest">
                    Root Access Verified
                  </span>
                  <p className="text-[var(--text-secondary)] text-sm font-bold">Lvl 4 Control Clearance</p>
               </div>
            </div>
         </div>
         <div className="flex gap-3">
            <Button variant="danger" className="rounded-2xl px-6">
               Emergency Lockdown
            </Button>
            <Button variant="secondary" className="rounded-2xl px-8 border-[var(--border-primary)]">
               Audit Logs
            </Button>
         </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {metrics.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
               <Card className="border-[var(--border-primary)] shadow-sm hover:border-rose-500/30 group">
                  <CardContent className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", stat.bg)}>
                           <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div className="text-[var(--text-secondary)]">
                           <Zap className="w-4 h-4 fill-amber-500 text-amber-500 opacity-50" />
                        </div>
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">{stat.label}</p>
                     <h3 className="text-3xl font-black text-[var(--text-primary)] mt-1 tracking-tighter">{loading ? <Skeleton className="h-8 w-24" /> : stat.value}</h3>
                  </CardContent>
               </Card>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* System Performance Chart */}
         <div className="lg:col-span-2 space-y-4">
            <Card className="h-full border-[var(--border-primary)] overflow-hidden">
               <CardHeader 
                  title="Cluster Performance" 
                  subtitle="CPU and Memory utilization across global nodes" 
                  icon={Cpu}
               />
               <CardContent className="h-[350px] pt-8">
                  {loading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={serverData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.4)" />
                          <XAxis 
                             dataKey="time" 
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
                          <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="mem" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 8 }} />
                       </LineChart>
                    </ResponsiveContainer>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Live Console Logs */}
         <div className="flex flex-col gap-4 h-full">
            <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight px-2 flex items-center gap-2">
               <Terminal className="w-5 h-5 text-rose-500" /> Live Console
            </h3>
            <Card className="flex-1 bg-slate-900 border-slate-800 shadow-2xl overflow-hidden min-h-[400px]">
               <CardContent className="p-0 h-full flex flex-col font-mono text-[11px]">
                  <div className="bg-slate-800 p-3 flex items-center gap-2 px-5">
                     <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                     </div>
                     <span className="text-slate-400 font-bold ml-2">matrix_cortex.sh</span>
                  </div>
                  <div className="p-5 space-y-3 overflow-y-auto bg-slate-900/50 flex-1">
                     <AnimatePresence>
                        {logs.map((log, i) => (
                           <motion.div 
                              key={log.time + i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-3 leading-relaxed"
                           >
                              <span className="text-slate-600 shrink-0">[{log.time}]</span>
                              <span className={cn(
                                 "font-bold uppercase tracking-tighter shrink-0",
                                 log.type === 'sys' ? "text-emerald-500" :
                                 log.type === 'warn' ? "text-rose-500" : "text-brandBlue"
                              )}>[{log.type}]</span>
                              <span className="text-slate-300">{log.msg}</span>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>
                  <div className="p-4 bg-slate-900 border-t border-slate-800">
                     <div className="flex items-center gap-2 text-emerald-500">
                        <span className="font-black">$</span>
                        <input className="bg-transparent border-0 focus:ring-0 text-white w-full outline-none p-0 h-4" placeholder="Type command..." />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
