import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const areaData = [
  { name: '1', earnings: 1200 }, { name: '5', earnings: 1900 }, { name: '10', earnings: 1400 },
  { name: '15', earnings: 2100 }, { name: '20', earnings: 2800 }, { name: '25', earnings: 2400 },
  { name: '30', earnings: 3200 }
];

const pieData = [
  { name: 'Screen Replacement', value: 45 },
  { name: 'Battery Service', value: 25 },
  { name: 'Water Damage', value: 15 },
  { name: 'Data Recovery', value: 10 },
  { name: 'Accessories', value: 5 },
];
const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

const dummyInvoices = [
  { id: 'INV-2026-001', customer: 'John Doe', amount: 145.00, date: 'Oct 24, 2026', status: 'Paid' },
  { id: 'INV-2026-002', customer: 'Alice Smith', amount: 85.50, date: 'Oct 23, 2026', status: 'Pending' },
  { id: 'INV-2026-003', customer: 'TechCorp LLC', amount: 1250.00, date: 'Oct 15, 2026', status: 'Overdue' },
  { id: 'INV-2026-004', customer: 'Emily Watson', amount: 210.00, date: 'Oct 10, 2026', status: 'Paid' },
];

export default function RevenueCharts() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Revenue & Billing</h2>
          <p className="text-slate-400 text-sm">Financial overview, repair category breakdown, and invoicing.</p>
        </div>
        <select 
          className="bg-black/40 border border-white/10 text-white rounded-xl focus:border-amber-500 p-3 outline-none appearance-none font-medium w-48 shadow-lg"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Gross Revenue', value: '$12,450', trend: '+14.5%', isUp: true, icon: TrendingUp, color: 'text-emerald-400 bg-emerald-400/10' },
          { label: 'Expenses', value: '$3,120', trend: '-2.4%', isUp: false, icon: TrendingDown, color: 'text-red-400 bg-red-400/10' },
          { label: 'Net Profit', value: '$9,330', trend: '+21.0%', isUp: true, icon: DollarSign, color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Pending Payouts', value: '$1,250', trend: '3 Invoices', isUp: false, icon: DollarSign, color: 'text-blue-400 bg-blue-400/10' },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <p className="text-slate-400 text-sm font-medium">{card.label}</p>
              <div className={`p-2 rounded-lg ${card.color}`}><card.icon className="w-4 h-4"/></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
              <p className={`text-xs font-bold ${card.isUp ? 'text-emerald-400' : 'text-slate-400'}`}>{card.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-6">Earnings Overview</h3>
          <div className="h-64 sm:h-80 relative">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} dx={-10} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f23', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" animationDuration={1200} />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-2">Revenue by Type</h3>
          <div className="h-64 relative flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" animationDuration={1200} stroke="rgba(0,0,0,0.5)" strokeWidth={2}>
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f23', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <p className="text-xl font-bold text-white">100%</p>
             </div>
          </div>
          <div className="mt-4 space-y-3">
             {pieData.map((entry, i) => (
               <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                     <span className="text-slate-300">{entry.name}</span>
                  </div>
                  <span className="text-white font-mono">{entry.value}%</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-white font-bold">Recent Invoices</h3>
            <button className="text-amber-500 text-sm hover:text-amber-400 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider bg-black/20">
                <th className="p-4 font-semibold pl-6">Invoice</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyInvoices.map((inv) => (
               <tr key={inv.id} className={`border-b border-white/5 transition-colors ${inv.status === 'Overdue' ? 'bg-amber-500/[0.03] hover:bg-amber-500/[0.06]' : 'hover:bg-white/5'}`}>
                 <td className="p-4 pl-6 text-slate-300 font-mono text-sm">{inv.id}</td>
                 <td className="p-4 text-white font-medium">{inv.customer}</td>
                 <td className="p-4 text-slate-400 text-sm">{inv.date}</td>
                 <td className="p-4 text-white font-bold">${inv.amount.toFixed(2)}</td>
                 <td className="p-4">
                    {inv.status === 'Overdue' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold leading-none"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Overdue</span>}
                    {inv.status === 'Paid' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold leading-none">Paid</span>}
                    {inv.status === 'Pending' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 text-xs font-bold leading-none">Pending</span>}
                 </td>
                 <td className="p-4 pr-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                 </td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
