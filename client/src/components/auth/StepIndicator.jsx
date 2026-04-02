import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, label: 'Details' },
    { id: 2, label: 'OTP' },
    { id: 3, label: 'Password' },
  ];

  return (
    <div className="w-full flex items-center justify-between mb-8 px-2 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-slate-800 -translate-y-1/2 -z-0"></div>
      
      {/* Active Line Progress */}
      <div 
        className="absolute top-1/2 left-2 h-0.5 bg-brandPurple -translate-y-1/2 -z-0 transition-all duration-700 ease-in-out"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>

      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                isActive
                  ? 'border-brandPurple bg-brandPurple text-white scale-110 shadow-brandPurple/30'
                  : isCompleted
                  ? 'border-brandPurple bg-brandPurple text-white'
                  : 'border-slate-800 bg-[#020617] text-slate-500'
              }`}
            >
              {isCompleted ? (
                <Check className="w-5 h-5 animate-in zoom-in" />
              ) : (
                <span className="text-sm font-bold">{step.id}</span>
              )}
            </div>
            <p
              className={`absolute top-full mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${
                isActive ? 'text-brandPurple' : 'text-slate-500'
              }`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
