import React from 'react';
import { motion, useSpring } from 'framer-motion';

const AnimatedCursor = ({ cursorX, cursorY, isEnabled }) => {
  if (!isEnabled) return null;

  // Tiny trailing effect for the "sparks" behind the main cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  return (
    <>
      {/* Heavy Trailing Spark Particle */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brandPurple blur-[2px] rounded-full pointer-events-none z-[9998] mix-blend-screen shadow-[0_0_15px_#8b5cf6]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
      />

      {/* Main Custom Cursor Anchor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        {/* Glowing Core */}
        <div className="relative flex items-center justify-center">
           <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center border border-white/50 backdrop-blur-sm">
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_5px_#fff]"></div>
           </div>
           
           {/* Tiny Wrench Tool Icon */}
           <div className="absolute -top-3 -right-3 text-[12px] filter drop-shadow-[0_0_3px_#22d3ee]">🔧</div>
           
           {/* Sonar Ring */}
           <motion.div 
             className="absolute w-8 h-8 border border-cyan-400/50 rounded-full"
             animate={{ scale: [1, 2], opacity: [0.8, 0] }}
             transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
           />
        </div>
      </motion.div>
    </>
  );
};

export default AnimatedCursor;
