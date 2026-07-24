import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

const services = [
  { name: 'Website & Dashboard', status: 'operational', uptime: '99.99%' },
  { name: 'API Services', status: 'operational', uptime: '99.98%' },
  { name: 'Booking Engine', status: 'operational', uptime: '100%' },
  { name: 'Live Tracking (GPS)', status: 'degraded', uptime: '98.5%' },
  { name: 'Payment Gateway', status: 'operational', uptime: '99.99%' },
  { name: 'Technician App', status: 'operational', uptime: '99.95%' },
];

const incidents = [
  {
    date: 'Oct 12, 2026',
    title: 'Live Tracking Delay',
    status: 'Monitoring',
    description: 'We are experiencing slight delays in GPS updates from technician devices in the Seattle area. A fix has been deployed and we are monitoring the results.',
    type: 'warning'
  },
  {
    date: 'Oct 5, 2026',
    title: 'Payment Gateway Timeout',
    status: 'Resolved',
    description: 'Our payment provider experienced a brief 5-minute outage resulting in failed booking transactions. Service was fully restored at 14:05 PST.',
    type: 'resolved'
  }
];

const Status = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative isolate">
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-emerald-500/5 blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-8 shadow-xl">
           <div>
             <h1 className="text-3xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">System Status</h1>
             <p className="text-[oklch(0.65_0.01_260)] mt-2">Real-time service availability for Re-Gadgets.</p>
           </div>
           <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CheckCircle2 className="w-5 h-5" /> All Systems Operational
           </div>
        </div>
      </motion.div>

      <div className="space-y-6 mb-16">
        <h2 className="text-xl font-bold text-[oklch(0.96_0.005_260)] mb-4">Current Services</h2>
        <div className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl overflow-hidden shadow-lg divide-y divide-[oklch(0.28_0.008_260/0.4)]">
          {services.map((service, idx) => (
            <div key={idx} className="p-5 flex items-center justify-between hover:bg-[oklch(0.14_0.005_260)] transition-colors">
               <span className="font-semibold text-white">{service.name}</span>
               <div className="flex items-center gap-6">
                 <span className="text-[oklch(0.65_0.01_260)] text-sm font-medium hidden sm:block">{service.uptime} uptime</span>
                 {service.status === 'operational' ? (
                   <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-lg">
                     <CheckCircle2 className="w-4 h-4" /> Operational
                   </span>
                 ) : service.status === 'degraded' ? (
                   <span className="flex items-center gap-1.5 text-amber-400 font-bold text-sm bg-amber-500/10 px-3 py-1 rounded-lg">
                     <AlertTriangle className="w-4 h-4" /> Degraded
                   </span>
                 ) : (
                   <span className="flex items-center gap-1.5 text-rose-400 font-bold text-sm bg-rose-500/10 px-3 py-1 rounded-lg">
                     <XCircle className="w-4 h-4" /> Outage
                   </span>
                 )}
               </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-[oklch(0.96_0.005_260)] mb-6">Past Incidents</h2>
        <div className="space-y-6">
          {incidents.map((incident, idx) => (
            <div key={idx} className="relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] last:before:hidden before:w-0.5 before:bg-[oklch(0.28_0.008_260/0.5)]">
               <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-[oklch(0.14_0.005_260)] flex items-center justify-center z-10 ${incident.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
               <div className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-6 shadow-md">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                   <h3 className="text-lg font-bold text-white">{incident.title}</h3>
                   <span className="text-[oklch(0.65_0.01_260)] text-sm flex items-center gap-1.5"><Clock className="w-4 h-4" /> {incident.date}</span>
                 </div>
                 <span className={`inline-block px-2 py-1 rounded border text-xs font-bold mb-4 ${incident.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                   {incident.status}
                 </span>
                 <p className="text-[oklch(0.65_0.01_260)] text-sm leading-relaxed">{incident.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Status;
