import React from 'react';
import PremiumSidebar from '../common/PremiumSidebar';
import { LayoutDashboard, ClipboardList, Users, MapPin, Package, BarChart2, Star, Tag, FileText, Settings } from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'orders', icon: ClipboardList, label: 'Orders Management', badge: '5 Pending' },
  { id: 'technicians', icon: Users, label: 'Technicians' },
  { id: 'locations', icon: MapPin, label: 'Shop Locations' },
  { id: 'inventory', icon: Package, label: 'Inventory', badge: 'Low Stock' },
  { id: 'revenue', icon: BarChart2, label: 'Revenue & Billing' },
  { id: 'reviews', icon: Star, label: 'Customer Reviews' },
  { id: 'promotions', icon: Tag, label: 'Promotions' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

export default function ShopOwnerSidebar({ activePanel, setActivePanel, isMobileOpen, setIsMobileOpen }: any) {
  return (
    <PremiumSidebar 
      menuItems={SIDEBAR_ITEMS}
      activePanel={activePanel}
      setActivePanel={setActivePanel}
      accentTheme="amber"
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
    />
  );
}
