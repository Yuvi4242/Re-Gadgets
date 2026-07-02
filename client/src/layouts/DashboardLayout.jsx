import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import LiveRepairFeed from '../components/shell/LiveRepairFeed';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [role, setRole] = useState('customer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let currentRole = 'customer';
    if (location.pathname?.startsWith('/admin'))      currentRole = 'admin';
    else if (location.pathname?.startsWith('/technician')) currentRole = 'worker';
    else if (location.pathname?.startsWith('/shopowner'))  currentRole = 'owner';
    setRole(currentRole);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      {/* Ambient Layers — fixed, pointer-events-none */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid-bg opacity-60" />
        {/* Ember radial bloom */}
        <div
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'oklch(0.65 0.19 35 / 0.10)', animation: 'ember-bloom 8s ease-in-out infinite' }}
        />
      </div>

      <div className="flex h-screen w-full bg-[oklch(0.14_0.005_260)] overflow-hidden font-sans relative z-10">

        {/* ── Mobile top header ─────────────────────────────── */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 bg-[oklch(0.14_0.005_260/0.92)] backdrop-blur-xl border-b border-[oklch(0.28_0.008_260/0.5)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_15px_oklch(0.65_0.19_35/0.4)]">
              <span className="font-display font-black text-sm text-[oklch(0.98_0_0)]">RG</span>
            </div>
            <span className="font-display font-extrabold text-sm tracking-tight text-[oklch(0.96_0.005_260)]">RE-GADGETS</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-[oklch(0.65_0.19_35)] transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[oklch(0.65_0.01_260)] transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[oklch(0.65_0.19_35)] transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* ── Mobile sidebar drawer ──────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                key="mobile-drawer"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[oklch(0.14_0.005_260)] border-r border-[oklch(0.28_0.008_260/0.6)]"
              >
                <div className="pt-16 h-full flex flex-col">
                  <div className="flex-shrink-0 flex flex-col max-h-[60%]">
                    <Sidebar role={role} />
                  </div>
                  <div className="flex-1 overflow-hidden min-h-0">
                    <LiveRepairFeed role={role} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Desktop sticky sidebar ─────────────────────────── */}
        <div className="hidden lg:flex w-[300px] h-full flex-col shrink-0 border-r border-[oklch(0.28_0.008_260/0.5)] bg-[oklch(0.14_0.005_260)] z-20 sticky top-0">
          <div className="flex-shrink-0 flex flex-col max-h-[60%]">
            <Sidebar role={role} />
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
            <LiveRepairFeed role={role} />
          </div>
        </div>

        {/* ── Main content area ──────────────────────────────── */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <TopNavbar role={role} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pt-14 lg:pt-0">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 lg:py-16">
              <ErrorBoundary>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="space-y-16"
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardLayout;
