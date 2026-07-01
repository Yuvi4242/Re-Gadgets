import React from 'react';
import { motion } from 'framer-motion';
import { Store, Users, BarChart3, ListTodo, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '../../services/utils';

const ShopOwnerPreviewSection = () => {
  return (
    <section className="relative py-24 bg-[var(--bg-primary)] overflow-hidden bg-film-grain bg-dot-grid">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6"
          >
            Built for <span className="text-gradient">Shop Owners</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg"
          >
            Manage technicians, track revenue, and monitor active repairs all from one powerful, centralized dashboard.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto max-w-5xl rounded-[2rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex h-[600px] backdrop-blur-3xl"
        >
           {/* Mock Sidebar */}
           <div className="w-64 border-r border-[var(--border-primary)] bg-[var(--color-noir-surface)] flex flex-col shrink-0 relative z-10">
              <div className="p-6 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-ember-light)] to-[var(--color-ember-dark)] flex items-center justify-center text-white font-black">R</div>
                 <span className="font-black text-[var(--text-primary)] tracking-tight">Shop HQ</span>
              </div>
              <div className="px-4 space-y-1 mt-4">
                 {[
                   { name: 'Overview', icon: Store, active: true },
                   { name: 'Requests', icon: ListTodo },
                   { name: 'Technicians', icon: Users },
                   { name: 'Revenue', icon: BarChart3 }
                 ].map((item, i) => (
                    <div key={i} className={cn(
                       "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors",
                       item.active ? "bg-[var(--color-ember-light)]/10 text-[var(--text-primary)] border border-[var(--color-ember-light)]/20" : "text-[var(--text-secondary)]"
                    )}>
                       <item.icon className={cn("w-4 h-4", item.active ? "text-[var(--color-ember-light)]" : "")} />
                       {item.name}
                    </div>
                 ))}
              </div>
              {/* Mock Live Feed */}
              <div className="mt-auto border-t border-[var(--border-primary)] bg-[var(--color-noir-surface-elevated)] flex-1 overflow-hidden p-4">
                 <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4 flex items-center justify-between">
                    Live Feed
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ember-light)] animate-pulse"></div>
                 </div>
                 <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                       <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                          <p className="text-[10px] text-[var(--text-primary)] font-medium">Mike finished Job #1040</p>
                       </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                       <div className="flex items-start gap-2">
                          <Activity className="w-3.5 h-3.5 text-[var(--color-ember-light)] mt-0.5" />
                          <p className="text-[10px] text-[var(--text-primary)] font-medium">New order #1056</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Mock Main Content */}
           <div className="flex-1 p-8 bg-[var(--bg-primary)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-ember-dark)]/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold text-[var(--text-primary)]">Today's Overview</h3>
              </div>

              {/* Asymmetric Stats */}
              <div className="flex gap-4 mb-8 h-32">
                 <div className="flex-[2] rounded-2xl bg-[var(--color-noir-surface-high)] border border-[var(--border-primary)] p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-ember-light)]/10 blur-2xl group-hover:bg-[var(--color-ember-light)]/20 transition-all"></div>
                    <div className="text-[var(--text-secondary)] text-sm font-bold mb-2">Revenue Today</div>
                    <div className="text-4xl font-black text-[var(--text-primary)]">$1,240.00</div>
                 </div>
                 <div className="flex-1 rounded-2xl bg-[var(--color-noir-surface-elevated)] border border-[var(--border-primary)] p-5">
                    <div className="text-[var(--text-secondary)] text-sm font-bold mb-2">Orders</div>
                    <div className="text-3xl font-black text-[var(--text-primary)]">14</div>
                 </div>
                 <div className="flex-1 rounded-2xl bg-[var(--color-noir-surface-elevated)] border border-[var(--border-primary)] p-5">
                    <div className="text-[var(--text-secondary)] text-sm font-bold mb-2">Techs</div>
                    <div className="text-3xl font-black text-[var(--text-primary)] text-emerald-400">8 <span className="text-sm text-[var(--text-secondary)] font-medium">active</span></div>
                 </div>
              </div>

              {/* Mock Table */}
              <div className="rounded-2xl bg-[var(--color-noir-surface-elevated)] border border-[var(--border-primary)] overflow-hidden flex-1 flex flex-col h-[260px]">
                 <div className="px-6 py-4 border-b border-[var(--border-primary)] flex gap-4 text-sm font-bold">
                    <span className="text-[var(--color-ember-light)] border-b border-[var(--color-ember-light)] pb-1">All Orders</span>
                    <span className="text-[var(--text-secondary)]">Pending</span>
                    <span className="text-[var(--text-secondary)]">In Progress</span>
                 </div>
                 <div className="p-4 space-y-2">
                    {[1042, 1041, 1040].map((id, i) => (
                       <div key={id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-noir-surface)] border border-transparent hover:border-[var(--border-primary)] transition-all">
                          <div className="font-bold text-sm text-[var(--text-primary)]">#{id}</div>
                          <div className="text-sm text-[var(--text-secondary)]">iPhone 13 Screen</div>
                          <div className="px-2 py-1 rounded bg-[var(--color-ember-light)]/10 text-[var(--color-ember-light)] text-[10px] font-bold uppercase tracking-wider">
                             In Progress
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopOwnerPreviewSection;
