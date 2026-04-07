import React from 'react';
import PremiumSidebar from '../common/PremiumSidebar';
import { 
  LayoutDashboard, Wrench, CalendarPlus, MapPin, 
  Smartphone, CreditCard, MessageSquare, Settings, HelpCircle 
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/customer/dashboard' },
  { id: 'repairs', icon: Wrench, label: 'My Repairs', path: '/customer/repairs', badge: '2 Active' },
  { id: 'book', icon: CalendarPlus, label: 'Book Repair', path: '/customer/book' },
  { id: 'tracking', icon: MapPin, label: 'Track Order', path: '/customer/tracking' },
  { id: 'devices', icon: Smartphone, label: 'Devices', path: '/customer/devices' },
  { id: 'billing', icon: CreditCard, label: 'Billing', path: '/customer/billing' },
  { id: 'chat', icon: MessageSquare, label: 'AI Chat', path: '/customer/chat' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/customer/settings' },
  { id: 'help', icon: HelpCircle, label: 'Help', path: '/customer/help' }
];

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: any) {
  // Using React Router paths instead of activePanel state
  return (
    <PremiumSidebar 
      menuItems={SIDEBAR_ITEMS}
      accentTheme="purple"
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
    />
  );
}
