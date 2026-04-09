import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThreeBackground from '../../components/dashboard/ThreeBackground';
import OnboardingProgressBar from '../../components/onboarding/OnboardingProgressBar';

// Emulated steps (these will be separate files)
import Step1PersonalProfile from '../../components/onboarding/Step1PersonalProfile';
import Step2Qualifications from '../../components/onboarding/Step2Qualifications';
import Step3Skills from '../../components/onboarding/Step3Skills';
import Step4Experience from '../../components/onboarding/Step4Experience';
import Step5Availability from '../../components/onboarding/Step5Availability';
import Step6ResumePreview from '../../components/onboarding/Step6ResumePreview';

export default function TechnicianOnboarding() {
  const { user, completeUserProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  
  // Try loading draft from local storage
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('techOnboardingDraft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {
       fullName: user?.name || user?.displayName || '',
       city: '', bio: '', phone: '', languages: [],
       education: '', field: '', certs: [],
       devices: [], skills: [], tools: [], experienceYears: 0,
       workplaces: [], days: [], startTime: '09:00', endTime: '17:00'
    };
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('techOnboardingDraft', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (updates: any) => {
    setFormData((prev: any) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitProfile = async () => {
    // Artificial save simulation
    setTimeout(() => {
      localStorage.removeItem('techOnboardingDraft');
      completeUserProfile(true);
      navigate('/technician/dashboard');
    }, 2500);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    in: {
      x: 0,
      opacity: 1
    },
    out: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a1a] text-slate-200 overflow-hidden relative flex flex-col">
      <ThreeBackground />
      
      {/* Header slightly simplified for focus */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-center">
         <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
           GadgetFix Onboarding
         </span>
      </header>

      <main className="flex-1 relative z-10 w-full max-w-5xl mx-auto pt-24 pb-12 px-4 flex flex-col h-full">
        <OnboardingProgressBar currentStep={currentStep} totalSteps={6} />

        <div className="relative flex-1 flex flex-col w-full min-h-[500px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute w-full h-full pb-20"
            >
              {currentStep === 1 && <Step1PersonalProfile formData={formData} update={updateFormData} />}
              {currentStep === 2 && <Step2Qualifications formData={formData} update={updateFormData} />}
              {currentStep === 3 && <Step3Skills formData={formData} update={updateFormData} />}
              {currentStep === 4 && <Step4Experience formData={formData} update={updateFormData} />}
              {currentStep === 5 && <Step5Availability formData={formData} update={updateFormData} />}
              {currentStep === 6 && <Step6ResumePreview formData={formData} submit={submitProfile} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {currentStep < 6 && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl p-4 z-40">
             <div className="max-w-5xl mx-auto flex justify-between">
                <button 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors disabled:opacity-30"
                >
                  Back
                </button>
                <button 
                  onClick={nextStep}
                  className="px-8 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Continue
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
