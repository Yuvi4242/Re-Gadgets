import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../services/utils';

/* ============================================================
   RE-GADGETS — Shared Design System Primitives
   Noir & Ember v4  |  lucide-react icons only
   ============================================================ */

// ── StatusPill ────────────────────────────────────────────────
// tone: "ember" | "amber" | "success" | "muted" | "danger"
export const StatusPill = ({ tone = 'muted', children, className }: {
  tone?: 'ember' | 'amber' | 'success' | 'muted' | 'danger';
  children: React.ReactNode;
  className?: string;
}) => {
  const tones = {
    ember:   'bg-[oklch(0.65_0.19_35/0.15)] text-[oklch(0.65_0.19_35)] border-[oklch(0.65_0.19_35/0.35)]',
    amber:   'bg-[oklch(0.78_0.16_75/0.15)] text-[oklch(0.78_0.16_75)] border-[oklch(0.78_0.16_75/0.35)]',
    success: 'bg-[oklch(0.72_0.17_155/0.15)] text-[oklch(0.72_0.17_155)] border-[oklch(0.72_0.17_155/0.35)]',
    muted:   'bg-[oklch(0.22_0.006_260/0.8)] text-[oklch(0.65_0.01_260)] border-[oklch(0.28_0.008_260/0.4)]',
    danger:  'bg-[oklch(0.62_0.22_25/0.15)] text-[oklch(0.62_0.22_25)] border-[oklch(0.62_0.22_25/0.35)]',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-[10px] font-bold px-2 py-1 rounded border',
      tones[tone],
      className
    )}>
      {children}
    </span>
  );
};

// ── SectionEyebrow ────────────────────────────────────────────
export const SectionEyebrow = ({ color = 'ember', children, className }: {
  color?: 'ember' | 'amber';
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn(
    'font-mono uppercase tracking-[0.2em] text-xs font-bold mb-3',
    color === 'ember' ? 'text-[oklch(0.65_0.19_35)]' : 'text-[oklch(0.78_0.16_75)]',
    className
  )}>
    {children}
  </p>
);

// ── SectionHeadline ───────────────────────────────────────────
export const SectionHeadline = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn(
    'font-display font-bold text-3xl md:text-5xl tracking-tight text-[oklch(0.96_0.005_260)] leading-[1.05]',
    className
  )}>
    {children}
  </h2>
);

// ── FramedPanel ───────────────────────────────────────────────
export const FramedPanel = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn(
    'rounded-[2rem] bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.6)] p-6 backdrop-blur-xl',
    className
  )}>
    {children}
  </div>
);

// ── useCountUp Hook ───────────────────────────────────────────
export const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
};

// ── StatCard ──────────────────────────────────────────────────
export const StatCard = ({ label, value, prefix = '', suffix = '', accent = 'ember', warn = false, className }: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  accent?: 'ember' | 'amber' | 'success' | 'muted';
  warn?: boolean;
  className?: string;
}) => {
  const { count, ref } = useCountUp(value);

  const accentMap = {
    ember:   { value: 'text-[oklch(0.65_0.19_35)]', bg: 'bg-[oklch(0.65_0.19_35/0.08)]', border: 'border-[oklch(0.65_0.19_35/0.2)]' },
    amber:   { value: 'text-[oklch(0.78_0.16_75)]',  bg: 'bg-[oklch(0.78_0.16_75/0.08)]',  border: 'border-[oklch(0.78_0.16_75/0.2)]' },
    success: { value: 'text-[oklch(0.72_0.17_155)]', bg: 'bg-[oklch(0.72_0.17_155/0.08)]', border: 'border-[oklch(0.72_0.17_155/0.2)]' },
    muted:   { value: 'text-[oklch(0.96_0.005_260)]', bg: 'bg-[oklch(0.18_0.006_260)]',      border: 'border-[oklch(0.28_0.008_260/0.6)]' },
  };

  const colors = accentMap[accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className={cn(
        'relative rounded-2xl p-5 border overflow-hidden cursor-default group',
        colors.bg, colors.border,
        className
      )}
    >
      {/* inner glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top right, ${accent === 'ember' ? 'oklch(0.65 0.19 35 / 0.07)' : accent === 'amber' ? 'oklch(0.78 0.16 75 / 0.07)' : accent === 'success' ? 'oklch(0.72 0.17 155 / 0.07)' : 'transparent'}, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono uppercase tracking-[0.14em] text-[10px] font-bold text-[oklch(0.65_0.01_260)]">
            {label}
          </p>
          {warn && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.16_75)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.78_0.16_75)]" />
            </span>
          )}
        </div>
        <p className={cn('font-display font-bold text-3xl tracking-tight', colors.value)}>
          {prefix}{count}{suffix}
        </p>
      </div>
    </motion.div>
  );
};

// ── ProgressSegments ──────────────────────────────────────────
export const ProgressSegments = ({ steps, currentIndex, accent = 'ember', className }: {
  steps: string[];
  currentIndex: number;
  accent?: 'ember' | 'amber' | 'success';
  className?: string;
}) => {
  const accentColor = {
    ember:   'bg-[oklch(0.65_0.19_35)]',
    amber:   'bg-[oklch(0.78_0.16_75)]',
    success: 'bg-[oklch(0.72_0.17_155)]',
  }[accent];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-1.5 mb-2">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className={cn('h-1 flex-1 rounded-full', i <= currentIndex ? accentColor : 'bg-[oklch(0.22_0.006_260)]')}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <span key={i} className={cn(
            'text-[9px] font-mono uppercase tracking-wide font-bold',
            i <= currentIndex ? 'text-[oklch(0.65_0.19_35)]' : 'text-[oklch(0.65_0.01_260)]'
          )}>
            {i <= currentIndex ? '✓ ' : ''}{step}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── LiveTicket ────────────────────────────────────────────────
export const LiveTicket = ({ id, status, progress, label, accent = 'ember', className }: {
  id: string;
  status: string;
  progress: number;
  label: string;
  accent?: 'ember' | 'amber' | 'success';
  className?: string;
}) => {
  const statusTone = accent === 'ember' ? 'ember' : accent === 'amber' ? 'amber' : 'success';
  const barColor = accent === 'ember' ? 'bg-[oklch(0.65_0.19_35)]' : accent === 'amber' ? 'bg-[oklch(0.78_0.16_75)]' : 'bg-[oklch(0.72_0.17_155)]';

  return (
    <div className={cn(
      'rounded-xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] p-4 space-y-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[oklch(0.65_0.19_35/0.4)] hover:shadow-[0_0_15px_oklch(0.65_0.19_35/0.15)]',
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-[oklch(0.65_0.01_260)] font-bold uppercase tracking-wider">{id}</span>
        <StatusPill tone={statusTone as any}>{status}</StatusPill>
      </div>
      <div className="w-full h-0.5 bg-[oklch(0.22_0.006_260)] rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs text-[oklch(0.96_0.005_260)] font-medium truncate">{label}</p>
    </div>
  );
};

// ── TechnicianCard ────────────────────────────────────────────
export const TechnicianCard = ({ avatar, name, rating, eta, onCall, onMessage, className }: {
  avatar: string;
  name: string;
  rating?: number;
  eta?: string;
  onCall?: () => void;
  onMessage?: () => void;
  className?: string;
}) => (
  <div className={cn(
    'flex items-center gap-3 p-4 rounded-2xl bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)]',
    className
  )}>
    <div className="relative shrink-0">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-[oklch(0.28_0.008_260/0.6)]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[oklch(0.72_0.17_155)] border-2 border-[oklch(0.14_0.005_260)] rounded-full" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-display font-bold text-sm text-[oklch(0.96_0.005_260)] truncate">{name}</p>
      {rating && (
        <p className="text-[10px] text-[oklch(0.78_0.16_75)] font-bold">★ {rating.toFixed(1)}</p>
      )}
      {eta && (
        <p className="font-mono text-[10px] text-[oklch(0.65_0.19_35)] uppercase tracking-wide">{eta}</p>
      )}
    </div>
    {(onCall || onMessage) && (
      <div className="flex gap-2 shrink-0">
        {onCall && (
          <button onClick={onCall} className="w-8 h-8 rounded-full bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-[oklch(0.65_0.19_35)] hover:border-[oklch(0.65_0.19_35/0.5)] transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </button>
        )}
        {onMessage && (
          <button onClick={onMessage} className="w-8 h-8 rounded-full bg-[oklch(0.22_0.006_260)] border border-[oklch(0.28_0.008_260/0.6)] flex items-center justify-center text-[oklch(0.65_0.01_260)] hover:text-[oklch(0.65_0.19_35)] hover:border-[oklch(0.65_0.19_35/0.5)] transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        )}
      </div>
    )}
  </div>
);
