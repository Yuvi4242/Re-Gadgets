import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './AnimatedLogo.css';

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Emblem — Bold "R" + open power-ring + lightning bolt (orange-amber theme)
   ───────────────────────────────────────────────────────────────────────────── */
const EmblemSVG = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
  >
    <defs>
      <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FBBF24" />
        <stop offset="50%"  stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA4C1A" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="110%">
        <stop offset="0%"   stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
      <linearGradient id="boltGrad" x1="0%" y1="0%" x2="20%" y2="100%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.9" />
      </linearGradient>
      <filter id="rGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="boltGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Open power-ring arc — ~270° gap at top where bolt sits */}
    <path
      d="M 50 10 A 40 40 0 1 1 18 72"
      stroke="url(#ringGrad)"
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
      filter="url(#rGlow)"
    />

    {/* R letterform */}
    <text
      x="18" y="82"
      fontFamily="'Arial Black','Helvetica Neue',Impact,sans-serif"
      fontWeight="900"
      fontSize="68"
      fill="url(#rGrad)"
      filter="url(#rGlow)"
    >R</text>

    {/* Lightning bolt */}
    <path
      d="M 47 2 L 37 26 L 47 26 L 35 50 L 58 22 L 47 22 Z"
      fill="url(#boltGrad)"
      filter="url(#boltGlow)"
    />
  </svg>
);

/* ─── Spark particle data (8 sparks at 45° intervals) ────────────────────── */
const SPARK_DEFS = [
  { angle: 0,   dist: 38, h: 11, delay: 0    },
  { angle: 45,  dist: 32, h: 8,  delay: 30   },
  { angle: 90,  dist: 40, h: 13, delay: 10   },
  { angle: 135, dist: 34, h: 9,  delay: 50   },
  { angle: 180, dist: 36, h: 12, delay: 20   },
  { angle: 225, dist: 30, h: 8,  delay: 40   },
  { angle: 270, dist: 42, h: 14, delay: 15   },
  { angle: 315, dist: 33, h: 9,  delay: 35   },
];

/* ─── Size map ─────────────────────────────────────────────────────────────── */
const SIZES = {
  sm:  { icon: 40,  font: 15, gap: 9  },
  md:  { icon: 52,  font: 21, gap: 11 },
  lg:  { icon: 68,  font: 28, gap: 14 },
  xl:  { icon: 90,  font: 38, gap: 18 },
};

const CHARS = Array.from('Re-Gadgets');

/* ─── Fixed top-level letter controls (10 chars) ──────────────────────────── */
const useLetterControls = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const c0 = useAnimation(); const c1 = useAnimation(); const c2 = useAnimation();
  const c3 = useAnimation(); const c4 = useAnimation(); const c5 = useAnimation();
  const c6 = useAnimation(); const c7 = useAnimation(); const c8 = useAnimation();
  const c9 = useAnimation();
  /* eslint-enable react-hooks/rules-of-hooks */
  return [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9];
};

/**
 * AnimatedLogo
 * Orange-amber theme • 360° thunder spin • spark burst • premium text reveal
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} loop
 * @param {string}  className
 */
const AnimatedLogo = ({ size = 'md', loop = true, className = '' }) => {
  const { icon: iconSize, font: fontSize, gap } = SIZES[size] ?? SIZES.md;

  const emblemCtrl  = useAnimation(); // scale + opacity
  const spinCtrl    = useAnimation(); // 360° rotation (inner wrapper)
  const glowCtrl    = useAnimation(); // ambient glow blob
  const boltCtrl    = useAnimation(); // bolt extra flicker
  const shineCtrl   = useAnimation(); // text shine sweep
  const letterCtrls = useLetterControls();

  // Spark burst key — increment to remount CSS-animated sparks
  const [sparkKey,  setSparkKey]  = useState(null);
  const [cycle,     setCycle]     = useState(0);

  useEffect(() => {
    let dead = false;
    const wait = ms => new Promise(r => setTimeout(r, ms));

    const run = async () => {
      // ── Hard reset all controls ─────────────────────────────────────────
      emblemCtrl.set({ opacity: 0, scale: 0.6 });
      spinCtrl.set({ rotate: 0 });
      boltCtrl.set({ opacity: 1 });
      glowCtrl.set({ opacity: 0, scale: 0.8 });
      shineCtrl.set({ x: '-130%' });
      letterCtrls.forEach(c => c.set({ opacity: 0, scale: 1.6, filter: 'blur(10px)', y: -6 }));
      setSparkKey(null);

      // ── Stage 1 (0s – 1.2s): 360° thunder spin + emblem materialises ───
      // Emblem fades + scales in
      emblemCtrl.start({
        opacity: 1, scale: 1,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });

      // Inner spin — full 360° with mechanical ease-out
      spinCtrl.start({
        rotate: 360,
        transition: { duration: 1.15, ease: [0.33, 1, 0.68, 1] },
      });

      // ── Stage 1b (0.35s): Orange spark burst ───────────────────────────
      await wait(350);
      if (dead) return;
      setSparkKey(k => (k ?? 0) + 1);  // remount sparks → CSS anim restarts

      // ── Stage 1c (0.4s): Bolt lightning flicker ─────────────────────────
      await wait(50);
      if (dead) return;
      await boltCtrl.start({
        opacity: [1, 0, 1, 0.5, 1, 0.7, 1],
        transition: { duration: 0.45, ease: 'linear', times: [0, 0.15, 0.3, 0.5, 0.65, 0.82, 1] },
      });

      // ── Stage 1d (0.8s): Warm glow heartbeat ────────────────────────────
      if (dead) return;
      glowCtrl.start({
        opacity: [0, 0.75, 0.3, 0],
        scale:   [0.8, 1.55, 1.2, 0.8],
        transition: { duration: 1.5, ease: 'easeInOut', times: [0, 0.3, 0.65, 1] },
      });

      // ── Stage 1e: Slow idle rotation after spin settles ─────────────────
      await wait(450);
      if (dead) return;
      // Continue rotating slowly (takes 8s for one full rotation)
      spinCtrl.start({
        rotate: 720,  // one more full rotation over 8s
        transition: { duration: 8, ease: 'linear' },
      });

      // ── Stage 2 (1.0s – 1.9s): Wordmark "materializer" reveal ───────────
      // Each letter blurs in from above with spring bounce — premium feel
      for (let i = 0; i < CHARS.length; i++) {
        if (dead) return;
        letterCtrls[i].start({
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 320,
            damping: 22,
            delay: i * 0.048,
          },
        });
      }

      // Wait until last letter has landed (~10 chars × 48ms + 400ms spring)
      await wait(CHARS.length * 48 + 420);
      if (dead) return;

      // ── Stage 3: Orange shine sweep across wordmark ──────────────────────
      shineCtrl.set({ x: '-130%' });
      await shineCtrl.start({
        x: '130%',
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      });
      if (dead) return;

      // ── Stage 4: Hold beat then loop ─────────────────────────────────────
      await wait(900);
      if (dead) return;
      if (loop) setCycle(k => k + 1);
    };

    run();
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <div
      className={`al-root ${className}`}
      style={{ gap }}
      role="img"
      aria-label="Re-Gadgets logo"
    >
      {/* ── Emblem ──────────────────────────────────────────────────────── */}
      <div
        className="al-icon-wrapper"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Warm ambient glow blob (behind everything) */}
        <motion.div
          className="al-ambient-glow"
          animate={glowCtrl}
          style={{
            width:  iconSize * 2.5,
            height: iconSize * 2.5,
            top:    -(iconSize * 0.75),
            left:   -(iconSize * 0.75),
          }}
        />

        {/* Orange spark particles — CSS-animated, keyed to remount on burst */}
        {sparkKey !== null && SPARK_DEFS.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const tx  = Math.cos(rad) * s.dist;
          const ty  = Math.sin(rad) * s.dist;
          return (
            <div
              key={`${sparkKey}-${i}`}
              className="al-spark-particle"
              style={{
                '--tx':    `${tx}px`,
                '--ty':    `${ty}px`,
                '--rot':   `${s.angle + 90}deg`,
                '--h':     `${s.h}px`,
                '--delay': `${s.delay}ms`,
                position:  'absolute',
                width:     '3px',
                height:    `${s.h}px`,
                top:       '50%',
                left:      '50%',
                marginLeft: '-1.5px',
                marginTop:  `-${s.h / 2}px`,
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          );
        })}

        {/* Scale/opacity envelope */}
        <motion.div
          className="al-emblem-box"
          animate={emblemCtrl}
          initial={{ opacity: 0, scale: 0.6 }}
          style={{ width: iconSize, height: iconSize }}
        >
          {/* Inner spin wrapper — rotates independently */}
          <motion.div
            animate={spinCtrl}
            initial={{ rotate: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Bolt glow flicker driven by boltCtrl */}
            <motion.div
              className="al-bolt-flash"
              animate={boltCtrl}
              initial={{ opacity: 1 }}
            />
            <EmblemSVG />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Wordmark ────────────────────────────────────────────────────── */}
      <div className="al-wordmark-wrapper">
        {/* Amber shine sweep */}
        <motion.div
          className="al-text-shine"
          animate={shineCtrl}
          initial={{ x: '-130%' }}
        />

        <span
          className="al-wordmark"
          style={{ fontSize, letterSpacing: '-0.02em' }}
          aria-hidden="true"
        >
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              animate={letterCtrls[i]}
              initial={{ opacity: 0, scale: 1.6, filter: 'blur(10px)', y: -6 }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </span>

        <span className="al-sr-only">Re-Gadgets</span>
      </div>
    </div>
  );
};

export default AnimatedLogo;
