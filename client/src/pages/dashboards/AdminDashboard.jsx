import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Users, Activity, Zap, Cpu, Terminal, Store, Wrench } from 'lucide-react';

import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { cn } from '../../services/utils';
import { getAdminStats } from '../../services/adminService';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([
    { type: 'sys', msg: 'Admin cortex online.', time: new Date().toLocaleTimeString() },
  ]);

  useEffect(() => {
    getAdminStats()
      .then((s) => {
        setStats(s);
        setLogs((prev) => [
          {
            type: 'info',
            msg: `Loaded ${s.totalUsers} users, ${s.totalOrders} orders.`,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      })
      .catch((err) => {
        console.error(err);
        setLogs((prev) => [
          {
            type: 'warn',
            msg: 'Failed to load live admin stats.',
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    {
      label: 'Total Users',
      value: stats?.totalUsers ?? '—',
      icon: Users,
      color: 'text-brandBlue',
      bg: 'bg-brandBlue/10',
    },
    {
      label: 'Active Orders',
      value: stats?.activeOrders ?? '—',
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Verified Shops',
      value: stats?.verifiedShops ?? '—',
      icon: Store,
      color: 'text-brandPurple',
      bg: 'bg-brandPurple/10',
    },
    {
      label: 'Technicians',
      value: stats?.totalTechnicians ?? '—',
      icon: Wrench,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[1.5rem] bg-rose-500 shadow-xl shadow-rose-500/20 flex items-center justify-center animate-pulse-glow">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight uppercase italic">
              Admin <span className="text-rose-500">Cortex</span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 uppercase tracking-widest">
                Root Access Verified
              </span>
              <p className="text-[var(--text-secondary)] text-sm font-bold">
                Revenue: ${Number(stats?.totalRevenue || 0).toLocaleString()}
              </p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-[var(--border-primary)] shadow-sm hover:border-rose-500/30 group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn('p-3 rounded-2xl group-hover:scale-110 transition-transform', stat.bg)}>
                    <stat.icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                  <div className="text-[var(--text-secondary)]">
                    <Zap className="w-4 h-4 fill-amber-500 text-amber-500 opacity-50" />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-[var(--text-primary)] mt-1 tracking-tighter">
                  {loading ? <Skeleton className="h-8 w-24" /> : stat.value}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="h-full border-[var(--border-primary)] overflow-hidden">
            <CardHeader title="Platform Snapshot" subtitle="Live counts from MongoDB" icon={Cpu} />
            <CardContent className="h-[350px] pt-8">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <div className="grid grid-cols-2 gap-4 p-4">
                  {[
                    ['Customers', stats?.totalCustomers],
                    ['Shop Owners', stats?.totalShopOwners],
                    ['Total Shops', stats?.totalShops],
                    ['Pending Shops', stats?.pendingShops],
                    ['Completed Orders', stats?.completedOrders],
                    ['Workers', stats?.totalWorkers],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className="text-2xl font-black text-white mt-1">{value ?? 0}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
                      <span
                        className={cn(
                          'font-bold uppercase tracking-tighter shrink-0',
                          log.type === 'sys'
                            ? 'text-emerald-500'
                            : log.type === 'warn'
                              ? 'text-rose-500'
                              : 'text-brandBlue'
                        )}
                      >
                        [{log.type}]
                      </span>
                      <span className="text-slate-300">{log.msg}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
