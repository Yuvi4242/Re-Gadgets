import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RobotAssistant = ({ state = 'idle', size = 'normal' }) => {
  // state can be: 'idle', 'hover', 'clicked', 'listening', 'thinking', 'speaking'
  const isMini = size === 'mini';
  const scale = isMini ? 0.6 : 1;

  // Emotional animation variants
  const headBob = {
    idle: { y: [0, -4, 0], rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
    hover: { y: -8, rotate: 5, transition: { type: 'spring' } },
    listening: { y: 5, scale: 1.1, transition: { type: 'spring' } },
    thinking: { y: [0, -2, 0], rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 1.5 } },
    speaking: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.3 } },
    clicked: { rotate: 360, transition: { duration: 0.6 } },
    running: { y: [0, -10, 0], rotate: 15, transition: { repeat: Infinity, duration: 0.3 } },
    repairing: { y: [0, -2, 0], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 0.2 } },
    happy: { y: [0, -15, 0], rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 0.5 } },
  };

  const eyeBlink = {
    idle: { scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.95, 0.97, 1, 1] } },
    hover: { scaleY: 1.2, scaleX: 1.1 },
    listening: { scale: 1.5, filter: 'drop-shadow(0px 0px 8px #34d399)' },
    thinking: { scaleY: 0.8, x: [0, 3, -3, 0], transition: { repeat: Infinity, duration: 2 } },
    speaking: { scaleY: [1, 0.8, 1], transition: { repeat: Infinity, duration: 0.5 } },
    clicked: { scaleY: [1, 0.2, 1.5, 1], transition: { duration: 0.5 } },
    running: { scaleY: 0.9, x: 2 },
    repairing: { scaleY: [1, 0.1, 1], transition: { repeat: Infinity, duration: 0.3 } },
    happy: { scaleY: 0.2, scaleX: 1.3, rotate: -10, transition: { duration: 0.2 } }
  };

  const armWave = {
    idle: { rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    hover: { rotate: [0, -30, 20, -20, 0], transition: { repeat: Infinity, duration: 1 } },
    listening: { rotate: 10 },
    thinking: { rotate: -15, y: -5 },
    speaking: { rotate: [0, 10, 0], transition: { repeat: Infinity, duration: 0.4 } },
    clicked: { rotate: -180, transition: { duration: 0.4 } },
    running: { rotate: [-20, 20, -20], transition: { repeat: Infinity, duration: 0.3 } },
    repairing: { rotate: [0, 45, -20, 30, 0], transition: { repeat: Infinity, duration: 0.2 } },
    happy: { rotate: [0, -180, 0], transition: { duration: 0.5 } }
  };

  const mouthTalk = {
    idle: { scaleY: 1, borderRadius: '50%' },
    hover: { scaleX: 1.5, borderRadius: '50%' },
    listening: { scaleY: 0.5, scaleX: 0.5 },
    thinking: { scaleX: 0.5, x: 2 },
    speaking: { scaleY: [1, 3, 1, 2, 1], borderRadius: '20%', transition: { repeat: Infinity, duration: 0.6 } },
    clicked: { scale: 2, borderRadius: '50%' },
    running: { scale: 1.2, borderRadius: '50%' },
    repairing: { scaleX: 0.5, x: 2 },
    happy: { scaleY: [1, 2, 1], scaleX: 2, borderRadius: '10px 10px 50px 50px', transition: { duration: 0.3 } }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full pointer-events-none" style={{ transform: `scale(${scale})` }}>
       
       {/* Holographic Thinking Gear */}
       <AnimatePresence>
         {state === 'thinking' && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0 }}
             animate={{ opacity: 1, y: -45, scale: 1, rotate: 360 }}
             exit={{ opacity: 0, scale: 0, y: 0 }}
             transition={{ opacity: { duration: 0.2 }, rotate: { repeat: Infinity, duration: 2, ease: 'linear' } }}
             className="absolute drop-shadow-[0_0_8px_rgba(79,70,229,0.8)] z-20"
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
             </svg>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Magic Repair Sparks Overflow */}
       <AnimatePresence>
         {state === 'repairing' && (
           <>
             {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  initial={{ opacity: 1, x: 10, y: 10, scale: 0 }}
                  animate={{ 
                    opacity: [1, 1, 0], 
                    x: 10 + (Math.random() - 0.5) * 80, 
                    y: 10 + (Math.random() - 0.5) * 80, 
                    scale: [0, 1.5, 0],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, repeatDelay: Math.random() * 0.2 }}
                  className="absolute z-50 text-yellow-300 text-lg blur-[0.5px] pointer-events-none drop-shadow-[0_0_5px_#fde047]"
                >
                  ✨
                </motion.div>
             ))}
           </>
         )}
       </AnimatePresence>

       {/* Floating Body Group */}
       <motion.div 
         animate={headBob[state]} 
         className="relative flex flex-col items-center justify-center z-10"
       >
          {/* Antenna */}
          <div className="absolute -top-6 flex flex-col items-center">
             <motion.div 
               animate={{ opacity: state === 'listening' ? [0.5, 1, 0.5] : 1, scale: state === 'listening' ? [1, 1.5, 1] : 1 }}
               transition={{ repeat: Infinity, duration: 1 }}
               className={`w-2.5 h-2.5 rounded-full z-10 ${state === 'listening' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-brandPurple/80 shadow-[0_0_5px_#6366f1]'}`}
             />
             <div className="w-1 h-5 bg-gradient-to-b from-brandPurple to-brandBlue/50 -mt-1 rounded-full z-0"></div>
          </div>

          {/* Main Head */}
          <div className="w-[52px] h-[40px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[18px] border border-[#3b82f6]/40 shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(59,130,246,0.3)] relative flex items-center justify-center overflow-hidden z-10">
             
             {/* Glass Visor */}
             <div className="w-[44px] h-[22px] bg-[#020617] rounded-xl border border-white/5 relative flex items-center justify-center shadow-inner overflow-hidden">
                {/* Scanline reflection */}
                <div className="absolute top-0 left-0 w-full h-[8px] bg-gradient-to-b from-white/10 to-transparent rounded-t-xl"></div>
                
                {/* Eyes Group */}
                <div className="flex gap-2.5 z-10">
                   {/* Left Eye */}
                   <motion.div animate={eyeBlink[state]} className={`w-2.5 h-3 rounded-full flex items-center justify-center ${state === 'listening' ? 'bg-emerald-400' : 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'}`}>
                     <div className="w-1 h-1.5 bg-white/60 rounded-full mt-[-2px]"></div> {/* Pupil highlight */}
                   </motion.div>
                   {/* Right Eye */}
                   <motion.div animate={eyeBlink[state]} className={`w-2.5 h-3 rounded-full flex items-center justify-center ${state === 'listening' ? 'bg-emerald-400' : 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'}`}>
                     <div className="w-1 h-1.5 bg-white/60 rounded-full mt-[-2px]"></div> {/* Pupil highlight */}
                   </motion.div>
                </div>

                {/* Mouth below eyes in visor */}
                <motion.div 
                  animate={mouthTalk[state]}
                  className="absolute bottom-1 w-2 h-[2px] bg-white/40 rounded-full"
                />
             </div>
             
             {/* Head Details */}
             <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-brandBlue rounded-r-md"></div>
             <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-brandBlue rounded-l-md"></div>
          </div>

          {/* Neck */}
          <div className="w-3 h-2 bg-[#1e293b] border-x border-white/10 relative z-0"></div>

          {/* Torso */}
          <div className="w-[36px] h-[28px] bg-gradient-to-b from-brandBlue to-brandPurple rounded-2xl shadow-[0_5px_15px_rgba(79,70,229,0.5)] border border-white/20 relative z-10 flex flex-col items-center pt-2">
             {/* Core Light */}
             <motion.div 
               animate={{ opacity: state === 'listening' ? [0.5, 1, 0.5] : [0.8, 1, 0.8] }}
               transition={{ repeat: Infinity, duration: state === 'listening' ? 0.8 : 2 }}
               className={`w-3 h-3 rounded-full shadow-[0_0_8px_currentColor] ${state === 'listening' ? 'bg-emerald-400 text-emerald-400' : 'bg-white text-white'}`}
             />
             <div className="w-4 h-[2px] bg-white/20 rounded mt-1.5"></div>
             <div className="w-6 h-[2px] bg-white/20 rounded mt-0.5"></div>
          </div>

       </motion.div>

       {/* Left Arm (Floating behind) */}
       <motion.div 
         animate={headBob[state]} 
         className="absolute left-1 top-1/2 z-0 origin-right flex items-center"
       >
         <motion.div 
           animate={{ rotate: [0, -10, 0] }}
           transition={{ repeat: Infinity, duration: 4 }}
           className="w-3 h-5 bg-[#1e293b] rounded-full border border-white/10 relative -ml-1 mt-4"
         />
       </motion.div>

       {/* Right Arm (Waving & Holding Tool) */}
       <motion.div 
         animate={headBob[state]}
         className="absolute right-[2px] top-1/2 z-20 origin-left flex flex-col items-center"
       >
          <motion.div 
            animate={armWave[state]}
            className="origin-top-left -mr-1 mt-4"
          >
            <div className="w-3 h-6 bg-[#1e293b] rounded-full border border-white/10 flex flex-col items-center justify-end pb-1 shadow-[2px_2px_5px_rgba(0,0,0,0.5)]">
               
               {/* Tiny Wrench Emoji/Graphic attached to hand */}
               <motion.div 
                 animate={{ rotate: state === 'hover' ? [0, 45, -45, 0] : 0 }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
                 className="text-[10px] absolute -bottom-3"
               >
                 🔧
               </motion.div>
            </div>
          </motion.div>
       </motion.div>

       {/* Ground Shadow */}
       <motion.div 
         animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
         transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
         className="absolute -bottom-6 w-12 h-2 bg-black blur-[3px] rounded-[100%] pointer-events-none"
       />

    </div>
  );
};

export default RobotAssistant;
