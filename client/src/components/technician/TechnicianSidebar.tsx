import React from 'react';
import PremiumSidebar from '../common/PremiumSidebar';
import { LayoutDashboard, Briefcase, History, PackagePlus, Zap, BarChart, BookOpen, Calendar, UserCheck, DollarSign, Settings } from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'workbench', label: 'My Workbench', icon: LayoutDashboard },
  { id: 'jobs', label: 'My Jobs', icon: Briefcase },
  { id: 'history', label: 'Job History', icon: History },
  { id: 'parts', label: 'Parts Request', icon: PackagePlus },
  { id: 'diagnostic', label: 'Quick Diagnostic', icon: Zap },
  { id: 'performance', label: 'My Performance', icon: BarChart },
  { id: 'manuals', label: 'Repair Manuals', icon: BookOpen },
  { id: 'schedule', label: 'My Schedule', icon: Calendar },
  { id: 'profile', label: 'My Profile & Resume', icon: UserCheck },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function TechnicianSidebar({ activePanel, setActivePanel, isMobileOpen, setIsMobileOpen }: any) {
  return (
    <PremiumSidebar 
      menuItems={SIDEBAR_ITEMS}
      activePanel={activePanel}
      setActivePanel={setActivePanel}
      accentTheme="cyan"
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
    />
  );
}
