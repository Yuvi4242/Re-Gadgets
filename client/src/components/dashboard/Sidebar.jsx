import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, Star, Clock, Home,
  Store, Users, BarChart3, Settings,
  Wrench, CheckCircle, ListTodo,
  ShieldAlert, Database,
  LogOut, Zap
} from 'lucide-react';
import { cn } from '../../services/utils';
import { useAuth } from '../../context/AuthContext';
import { LiveTicket } from '../ui/DesignSystem';

/* ── Sidebar — Noir & Ember design ─────────────────────────── */

const liveTickets = [
  { id: '#GF-9221', status: 'IN TRANSIT',  progress: 65, label: 'iPhone 14 Pro · Screen',   accent: 'amber'   },
  { id: '#GF-9215', status: 'REPAIRING',   progress: 40, label: 'MacBook M2 · Water DMG',   accent: 'ember'   },
  { id: '#GF-9208', status: 'COMPLETE',    progress: 100, label: 'Samsung TV · Power Supply', accent: 'success' },
];

const roleNav = {
  customer: [
    { name: 'Dashboard',     path: '/customer/dashboard',  icon: Home },
    { name: 'Active Orders', path: '/customer/orders',     icon: ShoppingBag },
    { name: 'History',       path: '/customer/history',    icon: Clock },
    { name: 'Reviews',       path: '/customer/reviews',    icon: Star },
  ],
  owner: [
    { name: 'Shop HQ',        path: '/shopowner/dashboard', icon: Store },
    { name: 'Incoming Jobs',  path: '/shopowner/requests',  icon: ListTodo },
    { name: 'Technicians',    path: '/shopowner/techs',     icon: Users },
    { name: 'Earnings',       path: '/shopowner/earnings',  icon: BarChart3 },
  ],
  worker: [
    { name: 'My Jobs',        path: '/technician/dashboard', icon: Wrench },
    { name: 'Active Repair',  path: '/technician/active',    icon: Clock },
    { name: 'Completed',      path: '/technician/completed', icon: CheckCircle },
  ],
  admin: [
    { name: 'Master Control', path: '/admin/dashboard',   icon: ShieldAlert },
    { name: 'User Matrix',    path: '/admin/users',       icon: Users },
    { name: 'Platform Stats', path: '/admin/analytics',   icon: BarChart3 },
    { name: 'System Logs',    path: '/admin/logs',        icon: Database },
  ],
};

const roleMeta = {
  customer: { label: 'Your Repairs',    dot: true },
  owner:    { label: 'Operations',      dot: true },
  worker:   { label: 'Active Jobs',     dot: true },
  admin:    { label: 'Live Feed',       dot: false },
};

const Sidebar = ({ role }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const nav   = roleNav[role] || roleNav.customer;
  const meta  = roleMeta[role] || roleMeta.customer;
  const initials = (user?.name || 'User').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="w-full h-full flex flex-col bg-[oklch(0.14_0.005_260)] border-r border-[oklch(0.28_0.008_260/0.5)]">

      {/* ── Brand Header ─────────────────────────────────────── */}
      <div className="px-6 pt-7 pb-5 flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <div className="w-10 h-10 rounded-[10px] bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_20px_oklch(0.65_0.19_35/0.5)]">
            <span className="font-display font-black text-sm text-[oklch(0.98_0_0)]">RG</span>
          </div>
          <div className="absolute inset-0 rounded-[10px] bg-[oklch(0.65_0.19_35)] opacity-20 animate-pulse" />
        </div>
        <div>
          <p className="font-display font-extrabold text-sm tracking-tight text-[oklch(0.96_0.005_260)] leading-none">
            RE-GADGETS
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[oklch(0.65_0.01_260)] mt-0.5">
            GadgetFix v4
          </p>
        </div>
      </div>

      {/* ── Live Feed Section Label ──────────────────────────── */}
      <div className="px-6 pb-3 flex items-center gap-2">
        {meta.dot && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.65_0.19_35)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.65_0.19_35)]" />
          </span>
        )}
        <span className="font-mono uppercase tracking-[0.18em] text-[10px] font-bold text-[oklch(0.65_0.01_260)]">
          {meta.label}
        </span>
      </div>

      {/* ── Live Ticket Cards ─────────────────────────────────── */}
      <div className="px-4 space-y-2 pb-4">
        {liveTickets.map((ticket) => (
          <LiveTicket
            key={ticket.id}
            id={ticket.id}
            status={ticket.status}
            progress={ticket.progress}
            label={ticket.label}
            accent={ticket.accent}
          />
        ))}
      </div>

      {/* ── Nav divider ──────────────────────────────────────── */}
      <div className="mx-6 h-px bg-[oklch(0.28_0.008_260/0.5)] mb-3" />

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 no-scrollbar pb-2">
        <p className="px-2 mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[oklch(0.65_0.01_260/0.7)]">Menu</p>
        {nav.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className="block relative group">
              <div className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 border',
                isActive
                  ? 'bg-[oklch(0.65_0.19_35/0.12)] border-[oklch(0.65_0.19_35/0.3)] text-[oklch(0.96_0.005_260)]'
                  : 'border-transparent text-[oklch(0.65_0.01_260)] hover:bg-[oklch(0.18_0.006_260)] hover:border-[oklch(0.28_0.008_260/0.6)] hover:text-[oklch(0.96_0.005_260)]'
              )}>
                {/* Active left accent bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveBar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[55%] bg-[oklch(0.65_0.19_35)] rounded-r-full shadow-[0_0_8px_oklch(0.65_0.19_35)]"
                  />
                )}
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all',
                  isActive ? 'bg-[oklch(0.65_0.19_35/0.15)]' : 'bg-[oklch(0.18_0.006_260)] group-hover:bg-[oklch(0.22_0.006_260)]'
                )}>
                  <Icon className={cn(
                    'w-3.5 h-3.5 transition-colors',
                    isActive ? 'text-[oklch(0.65_0.19_35)]' : 'text-[oklch(0.65_0.01_260)] group-hover:text-[oklch(0.96_0.005_260)]'
                  )} />
                </div>
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* ── User Chip + Logout ───────────────────────────────── */}
      <div className="border-t border-[oklch(0.28_0.008_260/0.5)] px-4 py-4 space-y-2">
        {/* Avatar chip */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)]">
          <div className="w-8 h-8 rounded-full bg-[oklch(0.65_0.19_35/0.2)] border border-[oklch(0.65_0.19_35/0.4)] flex items-center justify-center shrink-0">
            <span className="font-display font-black text-[10px] text-[oklch(0.65_0.19_35)]">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[oklch(0.96_0.005_260)] truncate">{user?.name || 'User'}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Zap className="w-2.5 h-2.5 text-[oklch(0.78_0.16_75)]" />
              <span className="font-mono text-[9px] text-[oklch(0.78_0.16_75)] uppercase tracking-wide">1.2k pts</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[oklch(0.62_0.22_25/0.7)] hover:text-[oklch(0.62_0.22_25)] hover:bg-[oklch(0.62_0.22_25/0.08)] border border-transparent hover:border-[oklch(0.62_0.22_25/0.2)] transition-all group"
        >
          <div className="w-7 h-7 rounded-lg bg-[oklch(0.62_0.22_25/0.06)] flex items-center justify-center shrink-0">
            <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
