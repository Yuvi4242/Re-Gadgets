import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   Clean, Static SVG Emblem — Bold "R" + power arc + lightning bolt (Amber-Orange)
   ───────────────────────────────────────────────────────────────────────────── */
const EmblemSVG = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full block"
  >
    <defs>
      <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA4C1A" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="110%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
      <linearGradient id="boltGrad" x1="0%" y1="0%" x2="20%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.9" />
      </linearGradient>
    </defs>

    {/* Power-ring arc */}
    <path
      d="M 50 10 A 40 40 0 1 1 18 72"
      stroke="url(#ringGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />

    {/* R letterform */}
    <text
      x="18"
      y="82"
      fontFamily="'Arial Black', 'Helvetica Neue', Impact, sans-serif"
      fontWeight="900"
      fontSize="68"
      fill="url(#rGrad)"
    >
      R
    </text>

    {/* Lightning bolt */}
    <path
      d="M 47 2 L 37 26 L 47 26 L 35 50 L 58 22 L 47 22 Z"
      fill="url(#boltGrad)"
    />
  </svg>
);

const SIZES = {
  sm: { icon: 34, font: 'text-base', gap: 'gap-2' },
  md: { icon: 42, font: 'text-xl', gap: 'gap-2.5' },
  lg: { icon: 52, font: 'text-2xl', gap: 'gap-3' },
  xl: { icon: 68, font: 'text-3xl', gap: 'gap-4' },
};

/**
 * Simple, Static Logo Component (No Motion)
 */
const AnimatedLogo = ({ size = 'md', className = '' }) => {
  const currentSize = SIZES[size] || SIZES.md;

  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* Icon Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center p-1 rounded-full bg-slate-900/60 border border-amber-500/20 shadow-md shadow-amber-500/10"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <EmblemSVG />
      </div>

      {/* Brand Name Text - Simple & Static */}
      <span className={`font-display font-extrabold ${currentSize.font} tracking-tight text-white`}>
        Re-<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Gadgets</span>
      </span>
    </div>
  );
};

export default AnimatedLogo;
