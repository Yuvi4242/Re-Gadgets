import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgressBar({ currentStep, totalSteps }: OnboardingProgressBarProps) {
  const steps = [
    'Profile',
    'Education',
    'Skills',
    'Experience',
    'Availability',
    'Review'
  ];

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 relative z-20">
      <div className="relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full"></div>
        <motion.div 
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((label, i) => {
            const stepNum = i + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            const isUpcoming = currentStep < stepNum;

            return (
              <div key={label} className="flex flex-col items-center">
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isCurrent ? 1.2 : 1,
                    backgroundColor: isCompleted ? '#06b6d4' : (isCurrent ? '#0a0a1a' : '#0a0a1a'),
                    borderColor: isCompleted || isCurrent ? '#06b6d4' : 'rgba(255,255,255,0.2)'
                  }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 z-10 transition-colors duration-300 ${isCurrent ? 'shadow-[0_0_15px_rgba(6,182,212,0.6)]' : ''}`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className={`text-xs font-bold ${isCurrent ? 'text-cyan-500' : 'text-slate-500'}`}>
                      {stepNum}
                    </span>
                  )}
                </motion.div>
                <motion.span 
                  animate={{
                    color: isCompleted || isCurrent ? '#fff' : 'rgba(148,163,184,0.5)',
                    fontWeight: isCurrent ? 'bold' : 'normal'
                  }}
                  className="text-[10px] uppercase tracking-wider hidden sm:block whitespace-nowrap absolute top-10"
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
