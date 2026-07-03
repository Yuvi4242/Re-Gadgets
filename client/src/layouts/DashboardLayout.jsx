import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';

const MotionButton = motion.button;
const MotionDiv = motion.div;

const getRoleFromPath = (pathname) => {
  if (pathname?.startsWith('/admin')) return 'admin';
  if (pathname?.startsWith('/technician')) return 'worker';
  if (pathname?.startsWith('/shopowner')) return 'owner';
  return 'customer';
};

const DashboardLayout = () => {
  const location = useLocation();
  const role = getRoleFromPath(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ErrorBoundary label="Dashboard shell">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 dot-grid-bg opacity-60" />
        <div
          className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{ background: 'oklch(0.65 0.19 35 / 0.10)', animation: 'ember-bloom 8s ease-in-out infinite' }}
        />
      </div>

      <div className="relative z-10 flex h-screen w-full overflow-hidden bg-[oklch(0.14_0.005_260)] font-sans text-[oklch(0.96_0.005_260)]">
        <div className="lg:hidden fixed top-0 inset-x-0 z-[70] flex h-14 items-center justify-between border-b border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.14_0.005_260/0.94)] px-4 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-[8px] bg-[oklch(0.65_0.19_35)] shadow-[0_0_15px_oklch(0.65_0.19_35/0.4)]">
              <span className="font-display text-sm font-black text-[oklch(0.98_0_0)]">RG</span>
            </div>
            <span className="font-display text-sm font-extrabold tracking-tight text-[oklch(0.96_0.005_260)]">RE-GADGETS</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.18_0.006_260)]"
            aria-label="Toggle sidebar"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-[oklch(0.65_0.19_35)] transition-transform ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-[oklch(0.65_0.01_260)] transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-[oklch(0.65_0.19_35)] transition-transform ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <MotionButton
                key="mobile-backdrop"
                type="button"
                aria-label="Close sidebar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              />
              <MotionDiv
                key="mobile-drawer"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                className="fixed bottom-0 left-0 top-0 z-[70] lg:hidden"
              >
                <Sidebar key={role} role={role} setIsMobileOpen={setMobileMenuOpen} />
              </MotionDiv>
            </>
          )}
        </AnimatePresence>

        <div className="hidden lg:block h-full shrink-0">
          <Sidebar key={role} role={role} setIsMobileOpen={setMobileMenuOpen} />
        </div>

        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <TopNavbar role={role} />

          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pt-14 lg:pt-0">
            <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 lg:px-14 lg:py-14">
              <ErrorBoundary label="Dashboard content">
                <AnimatePresence mode="wait">
                  <MotionDiv
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="space-y-12"
                  >
                    <Outlet />
                  </MotionDiv>
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




