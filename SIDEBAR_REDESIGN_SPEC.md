# RE-GADGETS Sidebar Redesign Spec

## Information Architecture

The sidebar is one compact system shared by Customer, Owner, and Worker dashboards. It uses the same role badge, section model, command index, notification tones, and bottom account actions across roles.

Customer navigation: Dashboard, My Repairs, Track Repair, Repair Timeline, Repair History, Quotes & Approvals, Invoices, Payments, Warranty, Pickup & Delivery, Messages, Notifications, Support, Profile, Settings.

Owner navigation: Dashboard, Orders, Customers, Technicians, Inventory, Suppliers, Purchase Orders, Finance, Payments, Invoices, Analytics, Reports, Appointments, Warranty Claims, Feedback, Marketing, Messages, User Management, AI Assistant, Activity Logs, Settings.

Technician navigation: Dashboard, Assigned Jobs, Active Repairs, Repair Queue, Completed Jobs, QC Testing, Requested Parts, Inventory, Knowledge Base, Repair Manuals, Messages, Schedule, Performance, Support, Settings.

## Layout Spec

Expanded desktop width: 304px default, user-resizable from 256px to 360px.
Collapsed icon-only width: 72px.
Mobile drawer width: follows the expanded sidebar shell and overlays content.
Top bar height: 80px desktop, 56px mobile header.
Base corners: 8px for nav rows and compact widgets, 10-12px for launchers and overlays.
Glass treatment: used on command palette and notification popover only, not on base navigation surfaces.

The primary navigation never scrolls. Pinned items, grouped nav, and bottom account actions are fixed inside the sidebar. Only the compact Insights widget panel uses internal scrolling.

## Component List

- `Sidebar.jsx`: resizable/collapsible role-aware shell, grouped sections, pinned items, compact widgets, fixed bottom account actions.
- `TopNavbar.jsx`: command palette trigger, keyboard shortcut handling, notification center, role badge profile area.
- `RoleBadge.jsx`: shared role label component used across all dashboards.
- `sidebarConfig.js`: single source of truth for role IA, quick actions, widgets, notifications, badges, and command search data.
- `ErrorBoundary.jsx`: contextual inline recovery card with retry.
- `ChatBot.jsx`: docked AI launcher button with contained assistant panel.

## Responsive Behavior

Desktop >= 1024px: persistent sidebar, drag handle enabled, collapse toggle enabled, full command trigger visible.
Tablet 768-1023px: mobile drawer pattern with top header; content remains full-width when drawer is closed.
Mobile < 768px: drawer overlay, compact top header, command palette remains keyboard/event accessible and fits viewport width.

## Interaction Notes

Command palette: `Ctrl K` opens searchable commands. It indexes sidebar items, quick actions, and widgets. Enter opens the first result; Escape closes.
Sidebar: sections collapse with 150-200ms motion. Active state uses a left accent rail and compact highlighted row. Notification badges follow red alert, amber warning, blue info, purple AI, emerald success.
Notifications: live feed duplication is removed. The top-bar bell opens a scoped notification center with count and urgency color.
AI assistant: launcher is docked to the bottom-right corner and no longer drags over dashboard content.

## Accessibility Notes

Interactive controls use explicit button/link elements and aria labels where the visible label may disappear in collapsed mode. Collapsed navigation exposes native `title` tooltips. Command palette is a modal dialog with Escape handling and focus sent to the search field on open.
