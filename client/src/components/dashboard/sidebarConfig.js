import {
  Activity,
  AlertTriangle,
  Archive,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  Inbox,
  Landmark,
  MapPin,
  MessageSquare,
  Package,
  PackagePlus,
  Receipt,
  ScanLine,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserCog,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';

export const dashboardPath = {
  customer: '/customer/dashboard',
  owner: '/shopowner/dashboard',
  worker: '/technician/dashboard',
  admin: '/admin/dashboard',
};

const item = (id, label, icon, role, options = {}) => ({
  id,
  label,
  icon,
  path: options.path || dashboardPath[role],
  badge: options.badge,
  badgeTone: options.badgeTone,
  favorite: Boolean(options.favorite),
});

export const roleConfig = {
  customer: {
    label: 'Customer',
    eyebrow: 'Customer',
    navLabel: 'Customer workspace',
    searchPlaceholder: 'Search customer commands...',
    sections: [
      {
        id: 'main',
        title: 'My Repairs',
        defaultOpen: true,
        items: [
          item('dashboard', 'Dashboard', Home, 'customer', { favorite: true }),
          item('my-repairs', 'My Repairs', Wrench, 'customer', { badge: '2', badgeTone: 'info', favorite: true }),
          item('track-repair', 'Track Repair', MapPin, 'customer', { favorite: true }),
          item('timeline', 'Repair Timeline', Clock, 'customer'),
          item('history', 'Repair History', Archive, 'customer'),
          item('quotes', 'Quotes & Approvals', ClipboardCheck, 'customer', { badge: '1', badgeTone: 'warning' }),
        ],
      },
      {
        id: 'support-payments',
        title: 'Support & Payments',
        defaultOpen: true,
        items: [
          item('invoices', 'Invoices', Receipt, 'customer'),
          item('payments', 'Payments', CreditCard, 'customer', { badge: '1', badgeTone: 'alert' }),
          item('warranty', 'Warranty', ShieldCheck, 'customer'),
          item('pickup', 'Pickup & Delivery', Truck, 'customer'),
          item('messages', 'Messages', MessageSquare, 'customer', { badge: '3', badgeTone: 'info' }),
          item('notifications', 'Notifications', Bell, 'customer'),
          item('support', 'Support', HelpCircle, 'customer'),
          item('profile', 'Profile', UserCog, 'customer'),
        ],
      },
    ],
    quickActions: [
      { id: 'new-repair', label: 'New Repair Request', icon: Wrench, tone: 'primary' },
      { id: 'track', label: 'Track Repair', icon: MapPin, tone: 'info' },
      { id: 'pickup', label: 'Book Pickup', icon: Truck, tone: 'primary' },
      { id: 'chat-tech', label: 'Chat with Technician', icon: MessageSquare, tone: 'info' },
      { id: 'invoice', label: 'Download Invoice', icon: Receipt, tone: 'success' },
    ],
    widgets: [
      { id: 'current-status', label: 'Current Repair Status', value: 'iPhone 14 Pro in transit', tone: 'warning' },
      { id: 'upcoming-pickup', label: 'Upcoming Pickup', value: 'Today, 4:30 PM', tone: 'info' },
      { id: 'pending-payments', label: 'Pending Payments', value: '$320 due', tone: 'alert' },
      { id: 'warranty-status', label: 'Warranty Status', value: '2 devices covered', tone: 'success' },
      { id: 'unread-messages', label: 'Unread Messages', value: '3 new', tone: 'info' },
      { id: 'recent-notifications', label: 'Recent Notifications', value: 'Diagnostic ready', tone: 'primary' },
    ],
    notifications: [
      { id: 'c1', title: 'Payment required', body: 'MacBook M2 invoice is due.', urgency: 'alert' },
      { id: 'c2', title: 'Pickup scheduled', body: 'Driver window opens at 4:30 PM.', urgency: 'info' },
      { id: 'c3', title: 'Warranty active', body: 'Samsung TV repair is covered.', urgency: 'success' },
    ],
  },
  owner: {
    label: 'Owner',
    eyebrow: 'Owner',
    navLabel: 'Owner command center',
    searchPlaceholder: 'Search owner commands...',
    sections: [
      {
        id: 'main',
        title: 'Main Navigation',
        defaultOpen: true,
        items: [
          item('dashboard', 'Dashboard', Home, 'owner', { favorite: true }),
          item('orders', 'Orders', ClipboardList, 'owner', { badge: '5', badgeTone: 'warning', favorite: true }),
          item('customers', 'Customers', Users, 'owner'),
          item('technicians', 'Technicians', UserCog, 'owner', { favorite: true }),
          item('inventory', 'Inventory', Package, 'owner', { badge: '4', badgeTone: 'alert', favorite: true }),
          item('suppliers', 'Suppliers', Truck, 'owner'),
          item('purchase-orders', 'Purchase Orders', ShoppingBag, 'owner'),
        ],
      },
      {
        id: 'operations',
        title: 'Operations',
        defaultOpen: true,
        items: [
          item('finance', 'Finance', Landmark, 'owner'),
          item('payments', 'Payments', Wallet, 'owner'),
          item('invoices', 'Invoices', Receipt, 'owner'),
          item('analytics', 'Analytics', BarChart3, 'owner'),
          item('reports', 'Reports', FileText, 'owner'),
          item('appointments', 'Appointments', Calendar, 'owner'),
          item('warranty-claims', 'Warranty Claims', ShieldCheck, 'owner', { badge: '2', badgeTone: 'warning' }),
          item('feedback', 'Feedback', Star, 'owner'),
        ],
      },
      {
        id: 'insights',
        title: 'Insights',
        defaultOpen: false,
        items: [
          item('marketing', 'Marketing', Sparkles, 'owner'),
          item('messages', 'Messages', MessageSquare, 'owner', { badge: '7', badgeTone: 'info' }),
          item('user-management', 'User Management', Users, 'owner'),
          item('ai-assistant', 'AI Assistant', Bot, 'owner', { badge: 'AI', badgeTone: 'ai' }),
          item('activity-logs', 'Activity Logs', Activity, 'owner'),
        ],
      },
    ],
    quickActions: [
      { id: 'create-order', label: 'Create Repair Order', icon: ClipboardList, tone: 'primary' },
      { id: 'assign-tech', label: 'Assign Technician', icon: UserCog, tone: 'info' },
      { id: 'add-inventory', label: 'Add Inventory', icon: PackagePlus, tone: 'success' },
      { id: 'order-parts', label: 'Order Parts', icon: ShoppingBag, tone: 'warning' },
      { id: 'create-invoice', label: 'Create Invoice', icon: Receipt, tone: 'primary' },
      { id: 'reports', label: 'Generate Reports', icon: FileText, tone: 'info' },
      { id: 'add-customer', label: 'Add Customer', icon: Users, tone: 'success' },
    ],
    widgets: [
      { id: 'revenue', label: "Today's Revenue", value: '$2.4k', tone: 'success' },
      { id: 'active-repairs', label: 'Active Repairs', value: '42 live', tone: 'info' },
      { id: 'approvals', label: 'Pending Approvals', value: '3 waiting', tone: 'warning' },
      { id: 'low-stock', label: 'Low Stock Alerts', value: '4 SKUs', tone: 'alert' },
      { id: 'tech-availability', label: 'Technician Availability', value: '8 available', tone: 'success' },
      { id: 'performance', label: 'Shop Performance', value: '+12% week', tone: 'success' },
      { id: 'health', label: 'Business Health Score', value: '86/100', tone: 'success' },
      { id: 'ai-insights', label: 'AI Insights', value: '2 actions', tone: 'ai' },
      { id: 'recent-activity', label: 'Recent Activity', value: '15 events', tone: 'info' },
    ],
    notifications: [
      { id: 'o1', title: 'Inventory low', body: 'iPhone batteries dropped below threshold.', urgency: 'alert' },
      { id: 'o2', title: 'Approval queue', body: '3 customer approvals are waiting.', urgency: 'warning' },
      { id: 'o3', title: 'Revenue target', body: 'Today is tracking 12% above average.', urgency: 'success' },
      { id: 'o4', title: 'New order', body: 'Repair order #1056 received.', urgency: 'info' },
    ],
  },
  worker: {
    label: 'Worker',
    eyebrow: 'Technician',
    navLabel: 'Technician workbench',
    searchPlaceholder: 'Search technician commands...',
    sections: [
      {
        id: 'main',
        title: 'Active Jobs',
        defaultOpen: true,
        items: [
          item('dashboard', 'Dashboard', Home, 'worker', { favorite: true }),
          item('assigned-jobs', 'Assigned Jobs', ClipboardList, 'worker', { badge: '6', badgeTone: 'info', favorite: true }),
          item('active-repairs', 'Active Repairs', Wrench, 'worker', { favorite: true }),
          item('repair-queue', 'Repair Queue', Inbox, 'worker', { badge: '9', badgeTone: 'warning' }),
          item('completed-jobs', 'Completed Jobs', CheckCircle2, 'worker'),
          item('qc-testing', 'QC Testing', ClipboardCheck, 'worker'),
        ],
      },
      {
        id: 'tools-knowledge',
        title: 'Tools & Knowledge',
        defaultOpen: true,
        items: [
          item('requested-parts', 'Requested Parts', PackagePlus, 'worker', { badge: '2', badgeTone: 'warning' }),
          item('inventory', 'Inventory', Package, 'worker'),
          item('knowledge-base', 'Knowledge Base', BookOpen, 'worker'),
          item('repair-manuals', 'Repair Manuals', FileText, 'worker'),
          item('messages', 'Messages', MessageSquare, 'worker', { badge: '4', badgeTone: 'info' }),
          item('schedule', 'Schedule', Calendar, 'worker'),
          item('performance', 'Performance', Gauge, 'worker'),
          item('support', 'Support', HelpCircle, 'worker'),
        ],
      },
    ],
    quickActions: [
      { id: 'start-repair', label: 'Start Repair', icon: Wrench, tone: 'primary' },
      { id: 'pause-repair', label: 'Pause Repair', icon: Clock, tone: 'warning' },
      { id: 'upload-photos', label: 'Upload Photos', icon: ScanLine, tone: 'info' },
      { id: 'request-parts', label: 'Request Parts', icon: PackagePlus, tone: 'warning' },
      { id: 'complete-repair', label: 'Complete Repair', icon: CheckCircle2, tone: 'success' },
      { id: 'escalate', label: 'Escalate Issue', icon: AlertTriangle, tone: 'alert' },
      { id: 'scan-device', label: 'Scan Device', icon: ScanLine, tone: 'info' },
    ],
    widgets: [
      { id: 'jobs', label: "Today's Jobs", value: '6 assigned', tone: 'info' },
      { id: 'tasks', label: 'Pending Tasks', value: '11 open', tone: 'warning' },
      { id: 'parts', label: 'Waiting for Parts', value: '2 jobs', tone: 'warning' },
      { id: 'checklist', label: 'Checklist Progress', value: '68%', tone: 'success' },
      { id: 'repair-time', label: 'Average Repair Time', value: '42 min', tone: 'info' },
      { id: 'messages', label: 'Customer Messages', value: '4 unread', tone: 'info' },
      { id: 'updates', label: 'Live Updates', value: '3 new', tone: 'primary' },
    ],
    notifications: [
      { id: 't1', title: 'New job assigned', body: 'Job #1055 needs intake review.', urgency: 'alert' },
      { id: 't2', title: 'Parts arrived', body: 'OLED assembly is ready for pickup.', urgency: 'success' },
      { id: 't3', title: 'Customer update', body: 'Drop-off time changed to 3:00 PM.', urgency: 'warning' },
    ],
  },
};

roleConfig.admin = roleConfig.owner;

export const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export const toneClasses = {
  primary: 'text-[oklch(0.65_0.19_35)] bg-[oklch(0.65_0.19_35/0.12)] border-[oklch(0.65_0.19_35/0.35)]',
  success: 'text-[oklch(0.72_0.17_155)] bg-[oklch(0.72_0.17_155/0.12)] border-[oklch(0.72_0.17_155/0.35)]',
  info: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  ai: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  warning: 'text-[oklch(0.78_0.16_75)] bg-[oklch(0.78_0.16_75/0.12)] border-[oklch(0.78_0.16_75/0.35)]',
  alert: 'text-[oklch(0.62_0.22_25)] bg-[oklch(0.62_0.22_25/0.12)] border-[oklch(0.62_0.22_25/0.35)]',
};

export const notificationTone = {
  alert: toneClasses.alert,
  warning: toneClasses.warning,
  info: toneClasses.info,
  success: toneClasses.success,
};

export const getRoleConfig = (role = 'customer') => roleConfig[role] || roleConfig.customer;

export const getCommandItems = (role = 'customer') => {
  const config = getRoleConfig(role);
  const path = dashboardPath[role] || dashboardPath.customer;
  const nav = config.sections.flatMap((section) =>
    section.items.map((navItem) => ({ ...navItem, group: section.title, kind: 'Navigation' }))
  );
  const actions = config.quickActions.map((action) => ({
    ...action,
    path,
    group: 'Quick Actions',
    kind: 'Action',
  }));
  const widgets = config.widgets.map((widget) => ({
    id: widget.id,
    label: widget.label,
    icon: Activity,
    path,
    group: 'Widgets',
    kind: 'Widget',
    value: widget.value,
  }));

  return [...nav, ...actions, ...widgets];
};
