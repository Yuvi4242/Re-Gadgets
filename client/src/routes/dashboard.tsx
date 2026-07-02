import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, Camera, MessageCircle, Gift, Phone, Mail, 
  AlertCircle, Search, MoreVertical, Download, 
  MapPin, CheckCircle, Clock, CheckCircle2, Navigation, Map
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  StatusPill, SectionHeadline, SectionEyebrow, FramedPanel, 
  StatCard, ProgressSegments, TechnicianCard 
} from '../components/ui/DesignSystem';

// ── MOCK DATA FOR CUSTOMER DASHBOARD ─────────────────────────
const initialActiveRepairs = [
  {
    id: '#GF-9221',
    device: 'iPhone 14 Pro Max',
    issue: 'Screen & Battery Replacement',
    status: 'IN TRANSIT',
    statusTone: 'amber' as const,
    progress: 65,
    currentIndex: 1, // "Picked up"
    eta: 'Arriving in 12m',
    tech: {
      name: 'David Lee',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=120&h=120&fit=crop',
      rating: 4.9,
      specialties: ['iOS Master', 'Screen Specialist']
    },
    liveUpdates: [
      { time: '11:15 AM', event: 'Technician is en route with your device' },
      { time: '10:45 AM', event: 'Device picked up and secured' },
      { time: '09:00 AM', event: 'Diagnostic approved by customer' },
      { time: '08:30 AM', event: 'Order registered & booked' },
    ]
  },
  {
    id: '#GF-9215',
    device: 'MacBook Pro M2',
    issue: 'Liquid Damage Diagnostics',
    status: 'REPAIRING',
    statusTone: 'ember' as const,
    progress: 40,
    currentIndex: 2, // "Repairing"
    eta: 'Est: Tomorrow',
    tech: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
      rating: 4.8,
      specialties: ['Mac Logicboard', 'Liquid Recovery']
    },
    liveUpdates: [
      { time: 'Yesterday', event: 'Ultrasonic cleaning completed' },
      { time: 'Jan 15', event: 'Liquid damage inspection initiated' },
    ]
  }
];

const mockHistory = [
  { id: '#GF-9188', device: 'iPad Air 5', issue: 'Port Replacement', date: '2026-05-12', amount: '$120.00', status: 'Completed', statusTone: 'success' as const },
  { id: '#GF-9102', device: 'Nintendo Switch', issue: 'Joycon Drift Repair', date: '2026-03-08', amount: '$45.00', status: 'Completed', statusTone: 'success' as const },
  { id: '#GF-8994', device: 'iPhone 11', issue: 'Rear Glass Repair', date: '2026-01-20', amount: '$180.00', status: 'Cancelled', statusTone: 'muted' as const },
];

const mockInvoices = [
  { id: 'INV-2026-089', date: 'Jul 02, 2026', amount: '$149.00', status: 'PAID', tone: 'success' as const },
  { id: 'INV-2026-081', date: 'Jun 15, 2026', amount: '$320.00', status: 'DUE', tone: 'amber' as const },
  { id: 'INV-2026-074', date: 'May 12, 2026', amount: '$120.00', status: 'OVERDUE', tone: 'danger' as const },
];

// ── SUBCOMPONENTS ─────────────────────────────────────────────

// A. DashboardHeader
const DashboardHeader = ({ firstName, activeCount }: { firstName: string; activeCount: number }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <SectionEyebrow color="ember">Welcome Back</SectionEyebrow>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[oklch(0.96_0.005_260)] tracking-tight">
          Hey, {firstName}<span className="text-[oklch(0.78_0.16_75)]">.</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.65_0.01_260)] font-medium">
          You have <span className="text-[oklch(0.65_0.19_35)] font-bold">{activeCount} active repair{activeCount !== 1 ? 's' : ''}</span> in progress.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[oklch(0.65_0.19_35)] text-[oklch(0.98_0_0)] font-bold text-sm shadow-[0_0_20px_oklch(0.65_0.19_35/0.3)] hover:brightness-110 hover:-translate-y-0.5 transition-all">
          <Wrench className="w-4 h-4" />
          <span>+ New Repair</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[oklch(0.18_0.006_260)] text-[oklch(0.96_0.005_260)] font-bold text-sm border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] hover:-translate-y-0.5 transition-all">
          <MapPin className="w-4 h-4 text-[oklch(0.65_0.01_260)]" />
          <span>Track Active</span>
        </button>
      </div>
    </div>
  );
};

// B. KPIStrip
const KPIStrip = ({ activeCount }: { activeCount: number }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Active Repairs" 
        value={activeCount} 
        accent="ember" 
        warn={activeCount > 0} 
      />
      <StatCard 
        label="Completed" 
        value={14} 
        accent="success" 
      />
      <StatCard 
        label="Total Spent" 
        value={485} 
        prefix="$" 
        accent="ember" 
      />
      <StatCard 
        label="Loyalty Points" 
        value={1200} 
        suffix=" pts" 
        accent="amber" 
        warn={true}
      />
    </div>
  );
};

// C. ActiveRepairs (Broken-Grid List)
const ActiveRepairs = ({ repairs, onSelectRepair, selectedId }: { repairs: any[]; onSelectRepair: (r: any) => void; selectedId: string }) => {
  const steps = ['Booked', 'Picked up', 'Repairing', 'Delivered'];
  const primary = repairs[0];
  const compacts = repairs.slice(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SectionEyebrow color="ember">In Progress</SectionEyebrow>
        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.19_35)] animate-ping" />
      </div>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Your Active Repairs</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Card (lg:col-span-2 lg:row-span-2) */}
        {primary && (
          <div 
            onClick={() => onSelectRepair(primary)}
            className={cn(
              "lg:col-span-2 lg:row-span-2 flex flex-col justify-between rounded-3xl bg-[oklch(0.18_0.006_260)] border p-8 cursor-pointer transition-all duration-300",
              selectedId === primary.id ? "border-[oklch(0.65_0.19_35)] shadow-[0_0_25px_oklch(0.65_0.19_35/0.2)]" : "border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.45)] hover:shadow-[0_0_20px_oklch(0.65_0.19_35/0.15)]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-sm text-[oklch(0.65_0.01_260)] font-bold">{primary.id}</span>
                <StatusPill tone={primary.statusTone}>{primary.status}</StatusPill>
              </div>

              <h4 className="font-display font-extrabold text-2xl text-[oklch(0.96_0.005_260)] mb-1">{primary.device}</h4>
              <p className="text-sm text-[oklch(0.65_0.01_260)] font-medium mb-8">{primary.issue}</p>

              {/* Segmented progress bar */}
              <div className="mb-8 bg-[oklch(0.14_0.005_260/0.4)] p-5 rounded-2xl border border-[oklch(0.28_0.008_260/0.4)]">
                <ProgressSegments steps={steps} currentIndex={primary.currentIndex} accent="ember" />
              </div>
            </div>

            {/* Technician info row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-[oklch(0.28_0.008_260/0.4)]">
              <TechnicianCard 
                avatar={primary.tech.avatar}
                name={primary.tech.name}
                rating={primary.tech.rating}
                eta={primary.eta}
                onCall={() => {}}
                onMessage={() => {}}
                className="bg-transparent border-0 p-0 flex-1"
              />
              <div className="flex items-center gap-4 sm:self-center shrink-0">
                <button className="text-sm font-bold text-[oklch(0.65_0.19_35)] hover:underline">Track live →</button>
                <button className="text-xs font-mono uppercase tracking-wider text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">View invoice</button>
              </div>
            </div>
          </div>
        )}

        {/* Compact Cards */}
        <div className="flex flex-col gap-4">
          {compacts.map((repair) => (
            <div
              key={repair.id}
              onClick={() => onSelectRepair(repair)}
              className={cn(
                "rounded-2xl bg-[oklch(0.18_0.006_260)] border p-5 cursor-pointer transition-all duration-300",
                selectedId === repair.id ? "border-[oklch(0.65_0.19_35)] shadow-[0_0_20px_oklch(0.65_0.19_35/0.15)]" : "border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] hover:-translate-y-1 hover:shadow-ember-sm"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[oklch(0.65_0.01_260)] font-bold">{repair.id}</span>
                <StatusPill tone={repair.statusTone}>{repair.status}</StatusPill>
              </div>
              <h5 className="font-display font-bold text-base text-[oklch(0.96_0.005_260)] mb-1">{repair.device}</h5>
              <p className="text-xs text-[oklch(0.65_0.01_260)] mb-4">{repair.issue}</p>
              
              {/* Thin progress bar */}
              <div className="w-full h-1 bg-[oklch(0.22_0.006_260)] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[oklch(0.65_0.19_35)]" style={{ width: `${repair.progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase text-[oklch(0.65_0.01_260)]">Assigned: {repair.tech.name}</span>
                <button className="text-xs font-bold text-[oklch(0.65_0.19_35)] hover:underline">View details →</button>
              </div>
            </div>
          ))}

          {/* Empty state placeholder inside grid if no second card */}
          {compacts.length === 0 && (
            <div className="rounded-2xl bg-[oklch(0.18_0.006_260/0.4)] border border-dashed border-[oklch(0.28_0.008_260/0.5)] p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-[oklch(0.65_0.01_260)]" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-[oklch(0.65_0.01_260)]">No secondary jobs</p>
              <p className="text-[11px] text-[oklch(0.65_0.01_260/0.7)] mt-1">Book another device diagnostic today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// D. Live Tracking Panel
const CustomerTracking = ({ repair }: { repair: any }) => {
  if (!repair) return null;

  return (
    <div className="space-y-6">
      <SectionEyebrow color="amber">Live Tracking</SectionEyebrow>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Real-Time Routing</h3>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-stretch">
        {/* Left column: 4:5 map representation */}
        <div className="relative rounded-3xl overflow-hidden border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.18_0.006_260)] min-h-[400px]">
          <img 
            src="/images/tracking-map.jpg" 
            alt="Tracking Location Map" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.005_260/0.9)] via-transparent to-transparent pointer-events-none" />
          
          {/* Active satellite overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.14_0.005_260/0.8)] border border-[oklch(0.28_0.008_260/0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.17_155)] animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[oklch(0.96_0.005_260)]">Tracking Active</span>
          </div>

          {/* Map tag overlay bottom */}
          <div className="absolute bottom-6 inset-x-6">
            <div className="bg-[oklch(0.14_0.005_260/0.92)] backdrop-blur-xl border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={repair.tech.avatar} className="w-10 h-10 rounded-full object-cover border border-[oklch(0.65_0.19_35/0.5)]" alt="Tech" />
                <div>
                  <h5 className="font-display font-bold text-xs text-[oklch(0.96_0.005_260)]">{repair.tech.name}</h5>
                  <p className="font-mono text-[9px] uppercase text-[oklch(0.65_0.19_35)]">{repair.eta}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Info blocks */}
        <div className="flex flex-col justify-between gap-5">
          {/* Tech specialties card */}
          <div className="p-6 rounded-2xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)]">
            <h5 className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-4">Your Assigned Expert</h5>
            <div className="flex items-center gap-4 mb-4">
              <img src={repair.tech.avatar} alt="Technician" className="w-14 h-14 rounded-full object-cover border-2 border-[oklch(0.28_0.008_260/0.6)]" />
              <div>
                <p className="font-display font-extrabold text-base text-[oklch(0.96_0.005_260)]">{repair.tech.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[oklch(0.78_0.16_75)] text-sm">★</span>
                  <span className="text-xs font-bold text-[oklch(0.96_0.005_260)]">{repair.tech.rating}</span>
                  <span className="text-xs text-[oklch(0.65_0.01_260)]">(Certified Operator)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {repair.tech.specialties.map((spec: string) => (
                <span key={spec} className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] text-[oklch(0.65_0.01_260)]">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="p-6 rounded-2xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex-1 flex flex-col justify-between">
            <div>
              <h5 className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-4">Live Updates Feed</h5>
              <div className="relative border-l border-[oklch(0.28_0.008_260/0.5)] ml-2 space-y-4 py-1">
                {repair.liveUpdates.map((update: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    {/* timeline node */}
                    <span className={cn(
                      "absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[oklch(0.18_0.006_260)]",
                      idx === 0 ? "bg-[oklch(0.65_0.19_35)]" : "bg-[oklch(0.28_0.008_260)]"
                    )} />
                    <p className="font-mono text-[9px] font-bold text-[oklch(0.65_0.01_260)] leading-none uppercase">{update.time}</p>
                    <p className="text-xs text-[oklch(0.96_0.005_260)] font-medium mt-1 leading-relaxed">{update.event}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions row */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[oklch(0.28_0.008_260/0.4)]">
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] font-bold text-xs transition-colors">
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] font-bold text-xs transition-colors">
                <MessageCircle className="w-3.5 h-3.5" /> Message
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.62_0.22_25/0.4)] text-[oklch(0.62_0.22_25)] font-bold text-xs transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// E. Order History Table
const OrderHistory = () => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const filteredHistory = mockHistory.filter(item => {
    const matchesFilter = filter === 'All' || item.status === filter;
    const matchesSearch = item.device.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <SectionEyebrow color="ember">Archive</SectionEyebrow>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Order Log</h3>

      <FramedPanel className="p-0 overflow-hidden">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-[oklch(0.28_0.008_260/0.6)]">
          <div className="flex items-center gap-2">
            {(['All', 'Completed', 'Cancelled'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  filter === t 
                    ? "bg-[oklch(0.65_0.19_35/0.12)] border border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.65_0.19_35)]"
                    : "bg-transparent text-[oklch(0.65_0.01_260)] hover:text-white border border-transparent"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.65_0.01_260)]">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search by ID or Device..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[oklch(0.14_0.005_260)] border border-[oklch(0.28_0.008_260/0.6)] text-xs text-[oklch(0.96_0.005_260)] placeholder-[oklch(0.65_0.01_260/0.6)] focus:outline-none focus:border-[oklch(0.65_0.19_35)] transition-all"
            />
          </div>
        </div>

        {/* Table Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[oklch(0.18_0.006_260/0.5)] border-b border-[oklch(0.28_0.008_260/0.4)]">
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">Order ID</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">Device</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">Issue</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">Date</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] text-right">Amount</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">Status</th>
                <th className="px-6 py-4 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[oklch(0.28_0.008_260/0.3)]">
              {filteredHistory.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-white/[0.02] hover:border-l-2 hover:border-l-[oklch(0.65_0.19_35)] transition-all duration-150 group"
                >
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.65_0.01_260)]">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[oklch(0.96_0.005_260)]">{item.device}</td>
                  <td className="px-6 py-4 text-xs text-[oklch(0.65_0.01_260)]">{item.issue}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.65_0.01_260)]">{item.date}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.96_0.005_260)] text-right font-bold">{item.amount}</td>
                  <td className="px-6 py-4">
                    <StatusPill tone={item.statusTone}>{item.status}</StatusPill>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 rounded hover:bg-[oklch(0.22_0.006_260)] text-[oklch(0.65_0.01_260)] hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mx-auto mb-4 border border-[oklch(0.28_0.008_260/0.6)]">
                      <AlertCircle className="w-5 h-5 text-[oklch(0.65_0.01_260)]" />
                    </div>
                    <p className="text-sm font-bold text-[oklch(0.96_0.005_260)]">No matching records found</p>
                    <p className="text-xs text-[oklch(0.65_0.01_260)] mt-1">Try adjusting your filters or search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </FramedPanel>
    </div>
  );
};

// F. Invoices Section
const InvoicesSection = () => {
  return (
    <div className="space-y-6">
      <SectionEyebrow color="ember">Payments</SectionEyebrow>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Billing & Statements</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Invoice List */}
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] mb-2 font-bold">Recent Invoices</h4>
          {mockInvoices.map((inv) => (
            <div 
              key={inv.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.3)] transition-colors group"
            >
              <div className="space-y-1">
                <span className="font-mono text-xs text-[oklch(0.65_0.01_260)] font-bold">{inv.id}</span>
                <p className="text-[10px] text-[oklch(0.65_0.01_260/0.7)] font-medium">Issued on: {inv.date}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-sm text-[oklch(0.96_0.005_260)]">{inv.amount}</span>
                <StatusPill tone={inv.tone}>{inv.status}</StatusPill>
                <button className="p-2 rounded-lg bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] text-[oklch(0.65_0.01_260)] hover:text-white transition-all">
                  <Download className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Payment Summary */}
        <div className="rounded-2xl bg-[oklch(0.18_0.006_260/0.65)] border border-[oklch(0.28_0.008_260/0.6)] p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px]" style={{ background: 'oklch(0.65 0.19 35 / 0.05)' }} />
          
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] mb-4 font-bold">Outstanding Balance</h4>
            <p className="font-display font-black text-4xl text-[oklch(0.96_0.005_260)] mb-6">$320.00</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Subtotal</span>
                <span className="font-mono font-bold text-[oklch(0.96_0.005_260)]">$300.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Tax & Service fees</span>
                <span className="font-mono font-bold text-[oklch(0.96_0.005_260)]">$20.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Discount applied</span>
                <span className="font-mono font-bold text-[oklch(0.72_0.17_155)]">-$0.00</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 rounded-xl bg-[oklch(0.65_0.19_35)] hover:brightness-110 text-[oklch(0.98_0_0)] font-bold text-sm tracking-wide shadow-[0_4px_25px_oklch(0.65_0.19_35/0.3)] transition-all">
            Pay Balance Now
          </button>
        </div>
      </div>
    </div>
  );
};

// G. Quick Actions Grid
const QuickActions = () => {
  const actions = [
    { label: 'Book New Repair', desc: 'Setup device pickup', icon: Wrench, tone: 'ember' as const },
    { label: 'Get Estimate', desc: 'AI instant diagnostic scan', icon: Camera, tone: 'neutral' as const },
    { label: 'Chat Support', desc: 'Speak to live expert', icon: MessageCircle, tone: 'neutral' as const },
    { label: 'Refer & Earn', desc: 'Get $20 credit per user', icon: Gift, tone: 'amber' as const },
  ];

  return (
    <div className="space-y-6">
      <SectionEyebrow color="ember">Hub</SectionEyebrow>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Quick Actions</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className={cn(
                "rounded-2xl border p-5 cursor-pointer flex flex-col justify-between h-40 relative overflow-hidden group transition-all duration-300",
                act.tone === 'ember'
                  ? "bg-[oklch(0.65_0.19_35/0.05)] border-[oklch(0.65_0.19_35/0.25)] hover:border-[oklch(0.65_0.19_35/0.5)]"
                  : act.tone === 'amber'
                  ? "bg-[oklch(0.78_0.16_75/0.05)] border-[oklch(0.78_0.16_75/0.25)] hover:border-[oklch(0.78_0.16_75/0.5)] hover:shadow-amber-sm"
                  : "bg-[oklch(0.18_0.006_260)] border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)]"
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon className={cn(
                  "w-4 h-4",
                  act.tone === 'ember' ? "text-[oklch(0.65_0.19_35)]" : act.tone === 'amber' ? "text-[oklch(0.78_0.16_75)]" : "text-[oklch(0.65_0.01_260)]"
                )} />
              </div>

              <div>
                <h5 className="font-display font-bold text-sm text-[oklch(0.96_0.005_260)] mb-1 leading-snug">{act.label}</h5>
                <p className="text-[10px] text-[oklch(0.65_0.01_260)] font-medium">{act.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ── MAIN CUSTOMER DASHBOARD CONTAINER ──────────────────────────
export default function CustomerDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Guest';

  // Active repairs state mapping
  const [repairs, setRepairs] = useState(initialActiveRepairs);
  const [selectedRepair, setSelectedRepair] = useState(initialActiveRepairs[0]);

  return (
    <div className="space-y-16 animate-in-up">
      {/* A. Header row */}
      <DashboardHeader firstName={firstName} activeCount={repairs.length} />

      {/* B. KPI strip */}
      <KPIStrip activeCount={repairs.length} />

      {/* C. Active repairs broken-grid */}
      <ActiveRepairs 
        repairs={repairs} 
        onSelectRepair={(r) => setSelectedRepair(r)} 
        selectedId={selectedRepair?.id} 
      />

      {/* D. Live tracking panel scoped to selected active repair */}
      <CustomerTracking repair={selectedRepair} />

      {/* E. Order history table */}
      <OrderHistory />

      {/* F. Invoices block */}
      <InvoicesSection />

      {/* G. Quick Actions grid */}
      <QuickActions />
    </div>
  );
}
