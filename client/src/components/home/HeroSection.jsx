import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star } from 'lucide-react';

const WORKBENCH = '/images/hero-workbench.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[oklch(0.14_0.005_260)] dot-grid-bg">

      {/* ── Ambient background ─────────────────────────────── */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-60 -left-20 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'oklch(0.72 0.16 40)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'oklch(0.65 0.19 35)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 lg:gap-8">

          {/* ── LEFT HERO CONTENT ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-[52%] text-left animate-in-up"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[oklch(0.65_0.19_35/0.1)] border border-[oklch(0.65_0.19_35/0.4)] mb-8 shadow-[0_0_20px_oklch(0.65_0.19_35/0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.65_0.19_35)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.65_0.19_35)]" />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-[oklch(0.65_0.19_35)]">
                Certified Technicians On-Call
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[oklch(0.96_0.005_260)] mb-6">
              Repair Your<br />
              Gadgets{' '}
              <span className="text-[oklch(0.78_0.16_75)]">
                At Your<br />Doorstep.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[oklch(0.65_0.01_260)] font-medium leading-relaxed max-w-xl mb-10">
              AI-powered diagnostics, verified technicians, and real-time tracking — all from one premium platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link to="/book">
                <motion.button
                  whileHover={{ brightness: 1.1, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden flex items-center gap-2 px-7 py-4 rounded-full bg-[oklch(0.65_0.19_35)] text-[oklch(0.98_0_0)] font-bold text-base shadow-[0_0_30px_oklch(0.65_0.19_35/0.4)] hover:shadow-[0_0_45px_oklch(0.65_0.19_35/0.55)] transition-all duration-300"
                >
                  <span className="relative z-10">Book a Repair</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </Link>
              <Link to="/tracking">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-4 rounded-full bg-[oklch(0.18_0.006_260)] text-[oklch(0.96_0.005_260)] font-bold text-base border border-[oklch(0.28_0.008_260/0.7)] hover:border-[oklch(0.65_0.19_35/0.4)] hover:bg-[oklch(0.22_0.006_260)] transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 text-[oklch(0.65_0.01_260)]" />
                  Track Order
                </motion.button>
              </Link>
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-6"
            >
              <div>
                <div className="flex text-[oklch(0.78_0.16_75)] mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs font-bold text-[oklch(0.65_0.01_260)]">4.9 · 12k+ repairs</p>
              </div>
              <div className="w-px h-8 bg-[oklch(0.28_0.008_260/0.5)]" />
              <div>
                <p className="font-display font-bold text-lg text-[oklch(0.96_0.005_260)] leading-none">500+</p>
                <p className="text-xs text-[oklch(0.65_0.01_260)] mt-0.5">Verified Shops</p>
              </div>
              <div className="w-px h-8 bg-[oklch(0.28_0.008_260/0.5)]" />
              <div>
                <p className="font-display font-bold text-lg text-[oklch(0.96_0.005_260)] leading-none">24/7</p>
                <p className="text-xs text-[oklch(0.65_0.01_260)] mt-0.5">Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT HERO VISUAL — 3 overlapping cards ──────── */}
          <div className="w-full lg:w-[48%] relative h-[520px] hidden md:block">

            {/* Center: Workbench image — 21:9 framed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              animate-float
              className="absolute top-[12%] left-[5%] right-[5%] z-20 rounded-3xl overflow-hidden ring-1 ring-[oklch(0.28_0.008_260/0.6)] shadow-[0_30px_80px_-20px_oklch(0_0_0/0.8)] group"
            >
              <div className="relative" style={{ aspectRatio: '21/9' }}>
                <img src={WORKBENCH} alt="Repair Lab" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.005_260/0.6)] via-transparent to-transparent" />
                {/* Live pill overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.14_0.005_260/0.8)] backdrop-blur-md border border-[oklch(0.28_0.008_260/0.5)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.72_0.17_155)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.72_0.17_155)]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.96_0.005_260)]">Lab session · Live</span>
                </div>
              </div>
            </motion.div>

            {/* Top-left overlap: Rating card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute top-3 left-0 z-30 w-52"
            >
              <motion.div
                animate={{ y: ['-8px', '8px'] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="backdrop-blur-xl bg-[oklch(0.18_0.006_260/0.85)] border border-[oklch(0.28_0.008_260/0.6)] rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[oklch(0.65_0.19_35)] flex items-center justify-center shadow-[0_0_20px_oklch(0.65_0.19_35/0.5)] shrink-0">
                    <span className="font-display font-black text-lg text-[oklch(0.98_0_0)]">4.9</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-[oklch(0.96_0.005_260)] leading-tight">AVG RATING</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[oklch(0.65_0.01_260)]">12k+ repairs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom-right overlap: AI card — amber filled, rotated */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute bottom-4 right-0 z-30 w-52"
            >
              <motion.div
                animate={{ y: ['10px', '-10px'] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
                className="bg-[oklch(0.78_0.16_75)] rounded-2xl p-4 shadow-[0_10px_40px_oklch(0.78_0.16_75/0.4)] hover:rotate-0 transition-all duration-500"
                style={{ transform: 'rotate(3deg)' }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[oklch(0.15_0.02_60/0.7)] mb-1">New</p>
                <p className="font-display font-extrabold text-base text-[oklch(0.15_0.02_60)] leading-tight">AI-Diagnostic</p>
                <p className="font-display font-extrabold text-base text-[oklch(0.15_0.02_60)]">2.0</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="flex-1 h-1 bg-[oklch(0.15_0.02_60/0.2)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="h-full bg-[oklch(0.15_0.02_60/0.6)] rounded-full"
                    />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[oklch(0.15_0.02_60/0.7)]">85%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.28_0.008_260/0.5)] to-transparent" />
    </section>
  );
};

export default HeroSection;
