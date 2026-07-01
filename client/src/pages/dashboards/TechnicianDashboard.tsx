import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TechnicianLayout from '../../components/technician/TechnicianLayout';
import TechnicianStatsBar from '../../components/technician/TechnicianStatsBar';
import WorkbenchKanban from '../../components/technician/WorkbenchKanban';
import PartsRequestPanel from '../../components/technician/PartsRequestPanel';
import PerformancePanel from '../../components/technician/PerformancePanel';
import SchedulePanel from '../../components/technician/SchedulePanel';
import EarningsPanel from '../../components/technician/EarningsPanel';
import ProfileResumePanel from '../../components/technician/ProfileResumePanel';

export default function TechnicianDashboard() {
  const { user } = useAuth();
  const [activePanel, setActivePanel] = useState('workbench');

  // Role Guard
  // Only accessible by technician
  if (user && user.role !== 'technician') {
     return <Navigate to="/unauthorized" replace />;
  }

  // Onboarding Guard (if somehow bypassed the PrivateRoute)
  if (user && !user.isProfileComplete) {
     return <Navigate to="/onboarding/technician" replace />;
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'workbench':
        return (
          <>
            <TechnicianStatsBar />
            <WorkbenchKanban />
          </>
        );
      case 'parts':
        return <PartsRequestPanel />;
      case 'performance':
        return <PerformancePanel />;
      case 'schedule':
        return <SchedulePanel />;
      case 'earnings':
        return <EarningsPanel />;
      case 'profile':
        return <ProfileResumePanel />;
      default:
        // 'jobs', 'history', 'manuals', 'settings'
        return (
           <div className="h-[60vh] flex flex-col justify-center items-center text-center opacity-50 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
              <p className="text-slate-400">This panel is currently under construction for technicians.</p>
           </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative z-10 px-8 lg:px-12 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {renderPanel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
