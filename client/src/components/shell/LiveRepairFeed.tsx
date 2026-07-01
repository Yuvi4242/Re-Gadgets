import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../services/utils';

// Mock live data generator for prototype
const generateMockEvent = (role) => {
  const events = {
    customer: [
      { id: Date.now(), text: 'Technician Mike accepted your repair', type: 'info', icon: CheckCircle2 },
      { id: Date.now(), text: 'Order #1042 moved to In Progress', type: 'update', icon: Activity },
      { id: Date.now(), text: 'Diagnostic complete for iPhone 13', type: 'success', icon: CheckCircle2 },
    ],
    technician: [
      { id: Date.now(), text: 'New job #1055 assigned to you', type: 'alert', icon: AlertCircle },
      { id: Date.now(), text: 'Customer updated drop-off time', type: 'update', icon: Clock },
      { id: Date.now(), text: 'Parts arrived for Job #1049', type: 'success', icon: CheckCircle2 },
    ],
    shopOwner: [
      { id: Date.now(), text: 'New repair order #1056 received', type: 'info', icon: CheckCircle2 },
      { id: Date.now(), text: 'Technician Sarah completed Job #1040', type: 'success', icon: CheckCircle2 },
      { id: Date.now(), text: 'Inventory low: iPhone batteries', type: 'alert', icon: AlertCircle },
    ]
  };
  
  const roleEvents = events[role === 'owner' ? 'shopOwner' : role === 'worker' ? 'technician' : 'customer'];
  return roleEvents[Math.floor(Math.random() * roleEvents.length)];
};

const LiveRepairFeed = ({ role }) => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Initial feed load
    setFeed([
      { ...generateMockEvent(role), id: Date.now() - 10000 },
      { ...generateMockEvent(role), id: Date.now() - 20000 },
    ]);

    // Simulate live events coming in every 8-15 seconds
    const interval = setInterval(() => {
      setFeed(prev => {
        const newEvent = { ...generateMockEvent(role), id: Date.now() };
        return [newEvent, ...prev].slice(0, 50); // Keep last 50
      });
    }, Math.floor(Math.random() * 7000) + 8000);

    return () => clearInterval(interval);
  }, [role]);

  return (
    <div className="flex flex-col h-full border-t border-[var(--border-primary)] bg-[var(--bg-primary)] overflow-hidden">
      
      <div className="p-4 pb-2 flex items-center justify-between border-b border-[var(--border-primary)] bg-[var(--color-noir-surface)]">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-2 h-2">
             <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-ember-light)] opacity-75 animate-ping"></span>
             <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-ember-dark)]"></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Live Feed</span>
        </div>
        <Activity className="w-3.5 h-3.5 text-[var(--text-secondary)] opacity-50" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2 bg-film-grain relative">
         <AnimatePresence initial={false}>
            {feed.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-sm relative overflow-hidden group",
                  idx === 0 && "ring-1 ring-[var(--color-ember-light)] ring-opacity-20"
                )}
              >
                 {idx === 0 && (
                    <motion.div 
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-[var(--color-ember-light)]/10 to-transparent"
                    />
                 )}
                 <div className="flex items-start gap-3 relative z-10">
                    <item.icon className={cn(
                       "w-4 h-4 shrink-0 mt-0.5",
                       item.type === 'alert' ? "text-rose-400" :
                       item.type === 'success' ? "text-emerald-400" :
                       "text-[var(--color-ember-light)]"
                    )} />
                    <p className="text-xs font-medium leading-snug text-[var(--text-primary)]">
                      {item.text}
                    </p>
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveRepairFeed;
