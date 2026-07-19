import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, Camera, MessageCircle, Gift, Phone, Mail, 
  AlertCircle, Search, MoreVertical, Download, 
  MapPin, CheckCircle, Clock, CheckCircle2, Navigation, Map, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  StatusPill, SectionHeadline, SectionEyebrow, FramedPanel, 
  StatCard, ProgressSegments, TechnicianCard 
} from '../components/ui/DesignSystem';
import { cn } from '../services/utils';
import { getCustomerOrders } from '../services/orderService';

// ── STATUS MAPPING HELPERS ──────────────────────────────────
const getStatusTone = (status: string) => {
  switch (status) {
    case 'Requested': return 'info';
    case 'Accepted': return 'amber';
    case 'Picked': return 'ember';
    case 'Repairing': return 'ember';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'muted';
    default: return 'info';
  }
};

const getStatusIndex = (status: string) => {
  switch (status) {
    case 'Requested':
    case 'Accepted': return 0;
    case 'Picked': return 1;
    case 'Repairing': return 2;
    case 'Delivered': return 3;
    default: return 0;
  }
};

const getProgressPercentage = (status: string) => {
  switch (status) {
    case 'Requested': return 10;
    case 'Accepted': return 25;
    case 'Picked': return 50;
    case 'Repairing': return 75;
    case 'Delivered': return 100;
    default: return 0;
  }
};

const getLiveUpdates = (order: any) => {
  if (order.statusHistory && order.statusHistory.length > 0) {
    return [...order.statusHistory].reverse().map((h: any) => ({
      time: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      event: getEventText(h.status)
    }));
  }
  return [{ time: 'Just now', event: 'Order registered & booked' }];
};

const getEventText = (status: string) => {
  switch (status) {
    case 'Requested': return 'Order registered & booked';
    case 'Accepted': return 'Diagnostic approved by shop';
    case 'Picked': return 'Device picked up and secured';
    case 'Repairing': return 'Technician is repairing your device';
    case 'Delivered': return 'Device delivered successfully';
    case 'Cancelled': return 'Order was cancelled';
    default: return `Status updated to ${status}`;
  }
};

// ── SUBCOMPONENTS ─────────────────────────────────────────────

// A. DashboardHeader
const DashboardHeader = ({ firstName, activeCount, onTrackActive }: { firstName: string; activeCount: number; onTrackActive: () => void }) => {
  const navigate = useNavigate();
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
        <button 
          onClick={() => navigate('/book')}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[oklch(0.65_0.19_35)] text-[oklch(0.98_0_0)] font-bold text-sm shadow-[0_0_20px_oklch(0.65_0.19_35/0.3)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
        >
          <Wrench className="w-4 h-4" />
          <span>+ New Repair</span>
        </button>
        <button 
          onClick={onTrackActive}
          disabled={activeCount === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[oklch(0.18_0.006_260)] text-[oklch(0.96_0.005_260)] font-bold text-sm border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MapPin className="w-4 h-4 text-[oklch(0.65_0.01_260)]" />
          <span>Track Active</span>
        </button>
      </div>
    </div>
  );
};

// B. KPIStrip
const KPIStrip = ({ activeCount, completedCount, totalSpent }: { activeCount: number; completedCount: number; totalSpent: number }) => {
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
        value={completedCount} 
        accent="success" 
      />
      <StatCard 
        label="Total Spent" 
        value={totalSpent} 
        prefix="$" 
        accent="ember" 
      />
      <StatCard 
        label="Loyalty Points" 
        value={completedCount * 100} 
        suffix=" pts" 
        accent="amber" 
        warn={completedCount > 0}
      />
    </div>
  );
};

// C. ActiveRepairs (Broken-Grid List)
const ActiveRepairs = ({ repairs, onSelectRepair, selectedId }: { repairs: any[]; onSelectRepair: (r: any) => void; selectedId: string }) => {
  const navigate = useNavigate();
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

      {repairs.length === 0 ? (
        <div className="rounded-3xl bg-[oklch(0.18_0.006_260/0.4)] border border-dashed border-[oklch(0.28_0.008_260/0.5)] p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mb-4 border border-[oklch(0.28_0.008_260/0.6)]">
            <Wrench className="w-6 h-6 text-[oklch(0.65_0.01_260)]" />
          </div>
          <h4 className="font-display font-bold text-lg text-white">No Active Repairs</h4>
          <p className="text-sm text-[oklch(0.65_0.01_260)] mt-1 mb-6">Need a gadget fixed? Book a service slot in seconds.</p>
          <button 
            onClick={() => navigate('/book')}
            className="px-6 py-3 rounded-xl bg-[oklch(0.65_0.19_35)] text-white font-bold text-sm shadow-[0_0_20px_oklch(0.65_0.19_35/0.3)] hover:brightness-110 transition-all"
          >
            Book New Repair
          </button>
        </div>
      ) : (
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
                  <span className="font-mono text-sm text-[oklch(0.65_0.01_260)] font-bold">#{primary.id.slice(-6).toUpperCase()}</span>
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
                {primary.tech ? (
                  <TechnicianCard 
                    avatar={primary.tech.avatar}
                    name={primary.tech.name}
                    rating={primary.tech.rating}
                    eta={primary.eta}
                    onCall={() => {}}
                    onMessage={() => {}}
                    className="bg-transparent border-0 p-0 flex-1"
                  />
                ) : (
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.22_0.006_260)] flex items-center justify-center border border-[oklch(0.28_0.008_260/0.5)]">
                       <Wrench className="w-4 h-4 text-[oklch(0.65_0.19_35)]" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs text-[oklch(0.96_0.005_260)]">Unassigned Expert</p>
                      <p className="font-mono text-[9px] uppercase text-[oklch(0.65_0.01_260)]">Matching process ongoing</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 sm:self-center shrink-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tracking?id=${primary.id}`);
                    }}
                    className="text-sm font-bold text-[oklch(0.65_0.19_35)] hover:underline"
                  >
                    Track live →
                  </button>
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
                  <span className="font-mono text-xs text-[oklch(0.65_0.01_260)] font-bold">#{repair.id.slice(-6).toUpperCase()}</span>
                  <StatusPill tone={repair.statusTone}>{repair.status}</StatusPill>
                </div>
                <h5 className="font-display font-bold text-base text-[oklch(0.96_0.005_260)] mb-1">{repair.device}</h5>
                <p className="text-xs text-[oklch(0.65_0.01_260)] mb-4">{repair.issue}</p>
                
                {/* Thin progress bar */}
                <div className="w-full h-1 bg-[oklch(0.22_0.006_260)] rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[oklch(0.65_0.19_35)]" style={{ width: `${repair.progress}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase text-[oklch(0.65_0.01_260)]">Assigned: {repair.tech ? repair.tech.name : 'Pending'}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tracking?id=${repair.id}`);
                    }}
                    className="text-xs font-bold text-[oklch(0.65_0.19_35)] hover:underline"
                  >
                    View details →
                  </button>
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
      )}
    </div>
  );
};

// D. Live Tracking Panel
const CustomerTracking = ({ repair }: { repair: any }) => {
  const navigate = useNavigate();
  if (!repair) return null;

  const hasTech = !!repair.tech;

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
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.005_260/0.9)] via-transparent to-transparent pointer-events-none" />
          
          {/* Active satellite overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.14_0.005_260/0.8)] border border-[oklch(0.28_0.008_260/0.5)]">
            <span className={cn("w-1.5 h-1.5 rounded-full animate-ping", hasTech ? "bg-[oklch(0.72_0.17_155)]" : "bg-[oklch(0.65_0.19_35)]")} />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[oklch(0.96_0.005_260)]">
              {hasTech ? "Tracking Active" : "Order Placed"}
            </span>
          </div>

          {/* Map tag overlay bottom */}
          <div className="absolute bottom-6 inset-x-6">
            <div className="bg-[oklch(0.14_0.005_260/0.92)] backdrop-blur-xl border border-[oklch(0.28_0.008_260/0.5)] rounded-2xl p-4 flex items-center justify-between">
              {hasTech ? (
                <div className="flex items-center gap-3">
                  <img src={repair.tech.avatar} className="w-10 h-10 rounded-full object-cover border border-[oklch(0.65_0.19_35/0.5)]" alt="Tech" />
                  <div>
                    <h5 className="font-display font-bold text-xs text-[oklch(0.96_0.005_260)]">{repair.tech.name}</h5>
                    <p className="font-mono text-[9px] uppercase text-[oklch(0.65_0.19_35)]">{repair.eta}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.22_0.006_260)] flex items-center justify-center border border-[oklch(0.28_0.008_260/0.5)]">
                     <Wrench className="w-4 h-4 text-[oklch(0.65_0.19_35)] animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-[oklch(0.96_0.005_260)]">Assigning Expert</h5>
                    <p className="font-mono text-[9px] uppercase text-[oklch(0.65_0.01_260)]">Awaiting shop acceptance</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button 
                  disabled={!hasTech}
                  className="w-8 h-8 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button 
                  disabled={!hasTech}
                  className="w-8 h-8 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
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
            {hasTech ? (
              <>
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
              </>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                 <div className="w-10 h-10 rounded-xl bg-[oklch(0.22_0.006_260)] flex items-center justify-center mb-3">
                   <Clock className="w-5 h-5 text-[oklch(0.65_0.01_260)] animate-pulse" />
                 </div>
                 <p className="text-sm font-bold text-white">Technician Assignment Pending</p>
                 <p className="text-xs text-[oklch(0.65_0.01_260)] mt-1">Matching your request with nearby verified experts.</p>
              </div>
            )}
          </div>

          {/* Timeline Feed */}
          <div className="p-6 rounded-2xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex-1 flex flex-col justify-between">
            <div>
              <h5 className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)] mb-4">Live Updates Feed</h5>
              <div className="relative border-l border-[oklch(0.28_0.008_260/0.5)] ml-2 space-y-4 py-1 max-h-[160px] overflow-y-auto pr-2">
                {repair.liveUpdates && repair.liveUpdates.map((update: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    {/* timeline node */}
                    <span className={cn(
                      "absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[oklch(0.18_0.006_260)]",
                      idx === 0 ? "bg-[oklch(0.65_0.19_35)] shadow-[0_0_8px_oklch(0.65_0.19_35)]" : "bg-[oklch(0.28_0.008_260)]"
                    )} />
                    <p className="font-mono text-[9px] font-bold text-[oklch(0.65_0.01_260)] leading-none uppercase">{update.time}</p>
                    <p className="text-xs text-[oklch(0.96_0.005_260)] font-medium mt-1 leading-relaxed">{update.event}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions row */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[oklch(0.28_0.008_260/0.4)]">
              <button 
                disabled={!hasTech}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
              <button 
                disabled={!hasTech}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.65_0.19_35/0.4)] text-[oklch(0.96_0.005_260)] font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Message
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] hover:border-[oklch(0.62_0.22_25/0.4)] text-[oklch(0.62_0.22_25)] font-bold text-xs transition-colors"
              >
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
const OrderHistory = ({ history }: { history: any[] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(item => {
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
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.65_0.01_260)]">#{item.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[oklch(0.96_0.005_260)]">{item.device}</td>
                  <td className="px-6 py-4 text-xs text-[oklch(0.65_0.01_260)]">{item.issue}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.65_0.01_260)]">{item.date}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[oklch(0.96_0.005_260)] text-right font-bold">{item.amount}</td>
                  <td className="px-6 py-4">
                    <StatusPill tone={item.statusTone}>{item.status}</StatusPill>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => navigate(`/tracking?id=${item.id}`)}
                      className="text-xs font-bold text-[oklch(0.65_0.19_35)] hover:underline"
                    >
                      Details
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
const InvoicesSection = ({ invoices, outstanding }: { invoices: any[]; outstanding: number }) => {
  const subtotal = outstanding > 0 ? outstanding * 0.9 : 0;
  const tax = outstanding > 0 ? outstanding * 0.1 : 0;

  return (
    <div className="space-y-6">
      <SectionEyebrow color="ember">Payments</SectionEyebrow>
      <h3 className="font-display font-bold text-2xl text-[oklch(0.96_0.005_260)] tracking-tight">Billing & Statements</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Invoice List */}
        <div className="space-y-3">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] mb-2 font-bold">Recent Invoices</h4>
          {invoices.map((inv) => (
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
          {invoices.length === 0 && (
            <div className="p-6 rounded-xl border border-dashed border-[oklch(0.28_0.008_260/0.5)] text-center text-xs text-[oklch(0.65_0.01_260)]">
              No invoices generated yet. Mapped automatically upon job acceptance.
            </div>
          )}
        </div>

        {/* Right Column: Payment Summary */}
        <div className="rounded-2xl bg-[oklch(0.18_0.006_260/0.65)] border border-[oklch(0.28_0.008_260/0.6)] p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px]" style={{ background: 'oklch(0.65 0.19 35 / 0.05)' }} />
          
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.65_0.01_260)] mb-4 font-bold">Outstanding Balance</h4>
            <p className="font-display font-black text-4xl text-[oklch(0.96_0.005_260)] mb-6">${outstanding.toFixed(2)}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Subtotal</span>
                <span className="font-mono font-bold text-[oklch(0.96_0.005_260)]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Tax & Service fees</span>
                <span className="font-mono font-bold text-[oklch(0.96_0.005_260)]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.65_0.01_260)] font-medium">Discount applied</span>
                <span className="font-mono font-bold text-[oklch(0.72_0.17_155)]">-$0.00</span>
              </div>
            </div>
          </div>

          <button 
            disabled={outstanding === 0}
            className="w-full py-4 rounded-xl bg-[oklch(0.65_0.19_35)] hover:brightness-110 text-[oklch(0.98_0_0)] font-bold text-sm tracking-wide shadow-[0_4px_25px_oklch(0.65_0.19_35/0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay Balance Now
          </button>
        </div>
      </div>
    </div>
  );
};

// G. Quick Actions Grid
const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { label: 'Book New Repair', desc: 'Setup device pickup', icon: Wrench, tone: 'ember' as const, path: '/book' },
    { label: 'Get Estimate', desc: 'AI instant diagnostic scan', icon: Camera, tone: 'neutral' as const, path: '/diagnostics' },
    { label: 'Chat Support', desc: 'Speak to live expert', icon: MessageCircle, tone: 'neutral' as const, action: 'chat' },
    { label: 'Refer & Earn', desc: 'Get $20 credit per user', icon: Gift, tone: 'amber' as const, action: 'refer' },
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
              onClick={() => {
                if (act.path) navigate(act.path);
                else if (act.action === 'chat') {
                  const chatBtn = document.getElementById('chat-toggle-btn') || document.querySelector('[aria-label="Toggle chat"]');
                  if (chatBtn) (chatBtn as HTMLElement).click();
                } else if (act.action === 'refer') {
                  alert('Referral program coming soon! Get $20 credit for every friend you refer.');
                }
              }}
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
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRepair, setSelectedRepair] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrders();
        setOrders(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching customer orders:', err);
        setError('Failed to fetch dashboard records.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Split and map orders to UI shapes
  const activeRepairs = orders
    .filter(order => !['Delivered', 'Cancelled'].includes(order.status))
    .map(order => ({
      id: order._id,
      device: order.deviceModel,
      issue: `${order.deviceType} - ${order.issue}`,
      status: order.status.toUpperCase(),
      statusTone: getStatusTone(order.status) as any,
      progress: getProgressPercentage(order.status),
      currentIndex: getStatusIndex(order.status),
      eta: order.estimatedCompletionTime 
        ? `Est: ${new Date(order.estimatedCompletionTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` 
        : 'Awaiting Estimate',
      tech: order.workerId ? {
        name: order.workerId.name,
        avatar: order.workerId.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
        rating: order.workerId.rating || 5.0,
        specialties: ['Certified Technician']
      } : null,
      liveUpdates: getLiveUpdates(order)
    }));

  const historyOrders = orders
    .filter(order => ['Delivered', 'Cancelled'].includes(order.status))
    .map(order => ({
      id: order._id,
      device: order.deviceModel,
      issue: `${order.deviceType} - ${order.issue}`,
      date: new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      amount: order.price ? `$${order.price.toFixed(2)}` : '$0.00',
      status: order.status === 'Delivered' ? 'Completed' : 'Cancelled',
      statusTone: order.status === 'Delivered' ? ('success' as const) : ('muted' as const)
    }));

  const invoiceList = orders
    .filter(order => order.price)
    .map(order => ({
      id: `INV-${order._id.slice(-6).toUpperCase()}`,
      date: new Date(order.updatedAt || order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: `$${order.price.toFixed(2)}`,
      status: order.isPaid ? 'PAID' : 'DUE',
      tone: order.isPaid ? ('success' as const) : ('amber' as const),
      rawAmount: order.price,
      isPaid: order.isPaid
    }));

  // Auto-select first active repair when list loads
  useEffect(() => {
    if (activeRepairs.length > 0 && !selectedRepair) {
      setSelectedRepair(activeRepairs[0]);
    }
  }, [orders, selectedRepair]);

  // Statistics
  const completedCount = orders.filter(o => o.status === 'Delivered').length;
  const totalSpent = orders
    .filter(o => o.price && (o.isPaid || o.status === 'Delivered'))
    .reduce((sum, o) => sum + o.price, 0);
  const outstandingBalance = invoiceList
    .filter(inv => !inv.isPaid)
    .reduce((sum, inv) => sum + inv.rawAmount, 0);

  const handleTrackActiveLink = () => {
    if (activeRepairs.length > 0) {
      navigate(`/tracking?id=${activeRepairs[0].id}`);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[oklch(0.65_0.19_35)] animate-spin" />
        <p className="font-mono text-xs uppercase tracking-widest text-[oklch(0.65_0.01_260)]">Syncing customer workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h4 className="font-display font-bold text-lg text-white">Synchronization Error</h4>
        <p className="text-sm text-[oklch(0.65_0.01_260)]">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-xl bg-[oklch(0.18_0.006_260)] text-white font-bold text-xs border border-[oklch(0.28_0.008_260/0.6)] hover:border-white transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in-up">
      {/* A. Header row */}
      <DashboardHeader firstName={firstName} activeCount={activeRepairs.length} onTrackActive={handleTrackActiveLink} />

      {/* B. KPI strip */}
      <KPIStrip activeCount={activeRepairs.length} completedCount={completedCount} totalSpent={totalSpent} />

      {/* C. Active repairs broken-grid */}
      <ActiveRepairs 
        repairs={activeRepairs} 
        onSelectRepair={(r) => setSelectedRepair(r)} 
        selectedId={selectedRepair?.id} 
      />

      {/* D. Live tracking panel scoped to selected active repair */}
      {selectedRepair && <CustomerTracking repair={selectedRepair} />}

      {/* E. Order history table */}
      <OrderHistory history={historyOrders} />

      {/* F. Invoices block */}
      <InvoicesSection invoices={invoiceList} outstanding={outstandingBalance} />

      {/* G. Quick Actions grid */}
      <QuickActions />
    </div>
  );
}
