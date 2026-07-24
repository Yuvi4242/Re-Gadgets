import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, BarChart3, ListTodo, Activity, CheckCircle2, TrendingUp } from 'lucide-react';
import { SectionEyebrow, FramedPanel, StatusPill } from '../ui/DesignSystem';

const mockOrders = [
  { id: '#GF-1042', customer: 'Priya Sharma', device: 'iPhone 13 Pro', issue: 'Screen Replacement', status: 'In Progress', eta: '2:30 PM', statusTone: 'ember' },
  { id: '#GF-1041', customer: 'Alex Chen',   device: 'MacBook Air M2', issue: 'Battery Swap',       status: 'Pickup',     eta: '1:00 PM', statusTone: 'amber' },
  { id: '#GF-1040', customer: 'Ravi Kumar',  device: 'Samsung TV 55"', issue: 'Power Supply',       status: 'Complete',   eta: 'Done',    statusTone: 'success' },
];

const ShopOwnerPreviewSection = () => {
  return (
    <section className="py-28 relative bg-[oklch(0.14_0.005_260)] dot-grid-bg overflow-hidden border-t border-[oklch(0.28_0.008_260/0.4)]">
      <div
        className="absolute top-0 right-0 w-[40%] h-[60%] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'oklch(0.78 0.16 75 / 0.05)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 animate-in-up"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <SectionEyebrow color="amber">Shop Owner Console</SectionEyebrow>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[oklch(0.65_0.01_260)] px-2 py-0.5 rounded bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)]">GadgetFix · v4.2</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[oklch(0.96_0.005_260)] tracking-tight">
              Built for{' '}
              <span className="text-[oklch(0.78_0.16_75)]">Shop Owners</span>
            </h2>
          </div>
        </motion.div>

        {/* Framed operations panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FramedPanel>
            {/* KPI stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Revenue — ember tinted */}
              <div className="rounded-2xl p-5 bg-[oklch(0.65_0.19_35/0.08)] border border-[oklch(0.65_0.19_35/0.2)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none" style={{ background: 'oklch(0.65 0.19 35 / 0.08)' }} />
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-2">Revenue Today</p>
                <p className="font-display font-bold text-3xl text-[oklch(0.65_0.19_35)]">$1,240</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-[oklch(0.72_0.17_155)]" />
                  <span className="font-mono text-[10px] text-[oklch(0.72_0.17_155)]">+18% today</span>
                </div>
              </div>
              {/* Pending — amber pulsing */}
              <div className="rounded-2xl p-5 bg-[oklch(0.78_0.16_75/0.08)] border border-[oklch(0.78_0.16_75/0.2)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)]">Pending</p>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.16_75)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.78_0.16_75)]" />
                  </span>
                </div>
                <p className="font-display font-bold text-3xl text-[oklch(0.78_0.16_75)]">6</p>
              </div>
              {/* Active techs */}
              <div className="rounded-2xl p-5 bg-[oklch(0.72_0.17_155/0.08)] border border-[oklch(0.72_0.17_155/0.2)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-2">Active Techs</p>
                <p className="font-display font-bold text-3xl text-[oklch(0.72_0.17_155)]">8</p>
              </div>
              {/* Orders today */}
              <div className="rounded-2xl p-5 bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)]">
                <p className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-2">Orders Today</p>
                <p className="font-display font-bold text-3xl text-[oklch(0.96_0.005_260)]">14</p>
              </div>
            </div>

            {/* Orders table */}
            <div className="rounded-2xl overflow-hidden border border-[oklch(0.28_0.008_260/0.5)]">
              {/* Table header */}
              <div className="grid grid-cols-[80px_1fr_1fr_120px_90px] gap-4 px-5 py-3 bg-[oklch(0.22_0.006_260)] border-b border-[oklch(0.28_0.008_260/0.5)]">
                {['Order ID', 'Customer & Device', 'Issue', 'Status', 'ETA'].map((h) => (
                  <span key={h} className="font-mono uppercase tracking-[0.14em] text-[9px] font-bold text-[oklch(0.65_0.01_260)]">{h}</span>
                ))}
              </div>
              {mockOrders.map((order, i) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[80px_1fr_1fr_120px_90px] gap-4 items-center px-5 py-4 border-b border-[oklch(0.28_0.008_260/0.3)] last:border-0 hover:bg-[oklch(0.22_0.006_260/0.5)] hover:border-l-2 hover:border-l-[oklch(0.65_0.19_35)] transition-all duration-150 group"
                >
                  <span className="font-mono text-[11px] text-[oklch(0.65_0.01_260)]">{order.id}</span>
                  <div>
                    <p className="text-sm font-bold text-[oklch(0.96_0.005_260)]">{order.customer}</p>
                    <p className="text-xs text-[oklch(0.65_0.01_260)]">{order.device}</p>
                  </div>
                  <span className="text-sm text-[oklch(0.65_0.01_260)]">{order.issue}</span>
                  <StatusPill tone={order.statusTone}>{order.status}</StatusPill>
                  <span className="font-mono text-xs text-[oklch(0.65_0.01_260)]">{order.eta}</span>
                </div>
              ))}
            </div>
          </FramedPanel>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopOwnerPreviewSection;
