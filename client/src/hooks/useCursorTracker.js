import { useEffect } from 'react';
import { useMotionValue, useSpring, useVelocity } from 'framer-motion';

export const useCursorTracker = (isEnabled = true) => {
  // Exact coordinates for the custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Lagged spring coordinates for the Robot
  const springConfig = { damping: 20, stiffness: 80, mass: 1.2 };
  const robotX = useSpring(cursorX, springConfig);
  const robotY = useSpring(cursorY, springConfig);

  // Velocities to detect movement speed
  const cursorVelocityX = useVelocity(cursorX);
  const cursorVelocityY = useVelocity(cursorY);

  useEffect(() => {
    if (!isEnabled) {
      document.body.style.cursor = 'auto';
      return;
    }

    // Hide native cursor for immersion
    document.body.style.cursor = 'none';

    const updateMousePos = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePos);

    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      document.body.style.cursor = 'auto'; // cleanup
    };
  }, [cursorX, cursorY, isEnabled]);

  return { 
    cursorX, 
    cursorY, 
    robotX, 
    robotY, 
    cursorVelocityX, 
    cursorVelocityY 
  };
};
