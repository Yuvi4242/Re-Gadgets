import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import RobotAssistant from './RobotAssistant';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [robotState, setRobotState] = useState('idle');
  const constraintsRef = useRef(null);
  const btnRef = useRef(null);

  const controls = useAnimation();
  
  // Proximity following logic (when strictly hovering near the docked bot)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
    setRobotState('hover'); // Looks active/waving while dragging
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    setRobotState('idle');

    const screenWidth = window.innerWidth;
    
    // Magnetic Snap Logic
    if (info.point.x < screenWidth / 2) {
       // Throw to left edge
       controls.start({ x: -screenWidth + 104, transition: { type: 'spring', bounce: 0.4, mass: 0.8 } }); 
    } else {
       // Throw to right edge
       controls.start({ x: 0, transition: { type: 'spring', bounce: 0.4, mass: 0.8 } }); 
    }
  };

  // Calculate micro-movement tracking when hovered
  let gazeX = 0;
  let gazeY = 0;
  if (isHovered && !isDragging && btnRef.current) {
     const rect = btnRef.current.getBoundingClientRect();
     const centerX = rect.left + rect.width / 2;
     const centerY = rect.top + rect.height / 2;
     gazeX = (mousePos.x - centerX) * 0.15; // 15% follow stretch
     gazeY = (mousePos.y - centerY) * 0.15;
  }

  return (
    <>
      {/* Invisible bounding box covering the screen to constrain drag limits */}
      <div 
        ref={constraintsRef} 
        className="fixed top-4 left-4 right-4 bottom-24 pointer-events-none z-[49]" 
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
         
         <AnimatePresence mode="wait">
            {isOpen ? (
               <div className="pointer-events-auto">
                 <ChatWindow key="window" onClose={() => setIsOpen(false)} />
               </div>
            ) : (
               <motion.button
                 key="button"
                 ref={btnRef}
                 layoutId="chatbot-modal"
                 drag
                 dragConstraints={constraintsRef}
                 dragElastic={0.15}
                 dragMomentum={false}
                 onDragStart={handleDragStart}
                 onDragEnd={handleDragEnd}
                 animate={controls}
                 onMouseEnter={() => { setIsHovered(true); setRobotState('hover'); }}
                 onMouseLeave={() => { setIsHovered(false); setRobotState('idle'); }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                 onClick={() => {
                    if (!isDragging) setIsOpen(true);
                 }}
                 className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(79,70,229,0.5)] border z-50 group hover:shadow-[0_0_40px_rgba(79,70,229,0.8)] transition-shadow relative bg-[#0b1326] border-brandBlue/30 origin-center cursor-grab overflow-visible mt-6 pointer-events-auto"
               >
                 {/* Tooltip visible only when hovering and not dragging */}
                 <AnimatePresence>
                    {isHovered && !isDragging && (
                       <motion.div
                          initial={{ opacity: 0, x: -10, scale: 0.9 }}
                          animate={{ opacity: 1, x: -30, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.9 }}
                          className="absolute right-full mr-2 bg-[#121c33] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-brandBlue/30 whitespace-nowrap pointer-events-none"
                       >
                          Chat with AI
                          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#121c33] border-t border-r border-brandBlue/30 transform rotate-45"></div>
                       </motion.div>
                    )}
                 </AnimatePresence>

                 {/* Pulsing ring */}
                 <div className="absolute inset-0 rounded-full border border-brandBlue animate-ping opacity-30"></div>
      
                 <motion.div
                   animate={{ x: gazeX, y: gazeY }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                   className="w-full h-full p-2 relative z-10 pointer-events-none"
                 >
                    <RobotAssistant state={robotState} />
                 </motion.div>
               </motion.button>
            )}
         </AnimatePresence>
      </div>
    </>
  );
};

export default ChatBot;
