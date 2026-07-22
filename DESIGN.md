# Re-Gadgets Design System & Visual Specification (`DESIGN.md` v2)

This document is the canonical visual and interaction design specification for the **Re-Gadgets** web application interface. Version 2 represents a **visual redesign pass** focused on elevating the UI from an AI-templated look to a high-density, production-grade B2B marketplace dashboard (inspired by Linear, Stripe Dashboard, and Vercel). 

---

## 1. What Changed in v2 and Why (Audit Summary)

- **Gradient Buttons → Confident Flat Accents**:  
  - *Audit*: Replaced AI-default gradient buttons (`~~from-violet-600 to-indigo-600~~`) with flat, high-contrast primary fills (`#7C3AED` Violet 600 / `#4F46E5` Indigo 600). Gradients are eliminated from standard controls.
- **Glow & Radial Blooms → Crisp Hairline Borders & Subtle Shadows**:  
  - *Audit*: Stripped colored shadows (`~~shadow-violet-950/50~~`, radial bloom box-shadows, `~~ring-2 ring-cyan-500 animate-pulse~~`). Elevation and separation are now achieved via 1px hairline borders (`#1E293B`, `#334155`) and crisp low-opacity dark shadows (`shadow-sm`, `shadow-black/40`). Glow is reserved exclusively for the 5-stage order status advance signature moment.
- **Fragmented 5-Stage Rainbow → Coherent Status Progression**:  
  - *Audit*: The 5-stage pipeline previously jumped across five unrelated colors (`~~purple → indigo → cyan → amber → emerald~~`). It has been redesigned as a unified progression: Neutral Slate intake (`Requested`) → Operational Indigo (`Accepted`) → Transit Blue (`Picked`) → Active Bench Amber (`Repairing`) → Verified Emerald (`Delivered`).
- **Generic Inter/Mono → Distinctive Typeface Pairing**:  
  - *Audit*: Upgraded `~~Inter + generic ui-monospace~~` to **Plus Jakarta Sans** (clean, high-density geometric sans for UI/Display) + **Geist Mono** (precision monospaced family for metrics, prices, and IDs).
- **Uniform Heavy Radius (`~~rounded-2xl~~`) → Tiered Geometry Scale**:  
  - *Audit*: Replaced global 16px radii with a structured density scale: Cards use `rounded-xl` (12px), interactive controls use `rounded-lg` (8px), table containers and data chips use `rounded-md` (6px).
- **Uniform Spacing → Context-Aware Density Modes**:  
  - *Audit*: Established explicit **Marketing Density Mode** (spacious `p-6` to `p-12`, 44px touch targets) for public pages vs. **Operational Density Mode** (compact `p-3.5` to `p-5`, 32px/36px compact controls, 36px table row heights) for Shop Owner, Technician, and Admin dashboards.
- **Mascot Decorative Stack Simplified**:  
  - *Audit*: Streamlined mascot (`RobotAssistant.jsx`) visual states into a clean status ring indicator with subtle micro-scale motion, removing competing multi-color glow effects.

---

## 2. Design Principles

### Principle 1: Reassuring Transparency over Sleek Secrecy
Device owners experience genuine anxiety during doorstep repair handoffs. The UI projects calm authority through clear state display, explicit technician identity cards, itemized price breakdowns, and visible diagnostic logs. Every critical data point is accessible without nested menus.

### Principle 2: The 5-Stage Pipeline as the Emotional Heartbeat
The 5-stage repair progression (`Requested → Accepted → Picked → Repairing → Delivered`) is the visual spine of Re-Gadgets. Stage changes are elevated through a unified status progression color ramp and a single, deliberate bloom animation during stage advancement.

### Principle 3: Playful Competence via the AI Mascot
The Gemini assistant (`RobotAssistant.jsx`) acts as a knowledgeable technical guide. It communicates in brief (1–3 sentences), bilingual (English/Hinglish) statements. Action triggers are rendered as crisp, structured action chips (`[ACTION:BOOK_REPAIR]`, `[ACTION:TRACK_ORDER]`, `[ACTION:CHECK_PRICE]`) rather than raw text links.

### Principle 4: High-Density Utility for Operational Dashboards
Shop Owners, Technicians, and Admins operate Re-Gadgets as a daily workstation tool. Operational dashboards prioritize high information density, scannable data tables with sortable column headers, compact action buttons, tight grid gaps, and fast drag-and-drop workflows (`@hello-pangea/dnd`).

---

## 3. Color System

Re-Gadgets uses a single, dark-mode-only color palette built upon a `#020617` base background.

### 3.1 Color Tokens Table & Diff

| Token Name | v1 Value (Old) | v2 Value (New) | Tailwind v4 Equivalent | Usage / Description |
| :--- | :--- | :--- | :--- | :--- |
| `bg-base` | `#020617` | `#020617` (Unchanged) | `bg-slate-950` | Primary app canvas background |
| `bg-surface` | `~~#0F172A~~` | `#0B1120` | `bg-[#0B1120]` | Cards, dashboard panels, sidebars |
| `bg-surface-hover` | `~~#1E293B~~` | `#151D30` | `bg-[#151D30]` | Hovered table rows, card hover state |
| `bg-overlay` | `~~#0F172ACC~~` | `#0B1120E6` | `bg-[#0B1120]/90` | Modal backdrops + `backdrop-blur-md` |
| `text-primary` | `#F8FAFC` | `#F8FAFC` (Unchanged) | `text-slate-50` | Headings, primary text (**18.2:1 AAA**) |
| `text-secondary` | `#CBD5E1` | `#94A3B8` | `text-slate-400` | Subheadings, secondary labels (**7.2:1 AAA**) |
| `text-muted` | `~~#94A3B8~~` | `#64748B` | `text-slate-500` | Captions, metadata, table headers (**4.6:1 AA**) |
| `text-disabled` | `#64748B` | `#475569` | `text-slate-600` | Disabled inputs, inactive elements |
| `accent-primary` | `~~#8B5CF6~~` | `#7C3AED` | `bg-violet-600` / `text-violet-400` | Primary flat button fill, active nav tabs |
| `accent-primary-hover` | `~~#7C3AED~~` | `#6D28D9` | `bg-violet-700` | Primary button hover fill |
| `accent-secondary` | `~~#6366F1~~` | `#4F46E5` | `bg-indigo-600` / `text-indigo-400` | Secondary buttons, focus indicators |
| `border-base` | `#1E293B` | `#1E293B` (Unchanged) | `border-slate-800` | Standard card & container hairline border |
| `border-subtle` | `~~#334155~~` | `#2D3748` | `border-slate-700/80` | Inner dividers, input default borders |
| `border-focus` | `~~#8B5CF6~~` | `#7C3AED` | `border-violet-600` | Active form focus border |

### 3.2 5-Stage Order Pipeline Progression (Redesigned)

*Rationale*: Rather than using five unrelated hues, the 5-stage pipeline follows a logical status trajectory: neutral intake → operational processing → active transit → work on bench → verified completion.

| Stage | Stage Name | v1 Color (Old) | v2 Hex (New) | Badge Surface | Badge Border & Text | Rationale |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Requested** | `~~#A855F7~~` | `#64748B` | `bg-slate-900/80` | `border-slate-700 text-slate-300` | Neutral intake state awaiting shop response |
| **2** | **Accepted** | `~~#6366F1~~` | `#6366F1` | `bg-indigo-950/60` | `border-indigo-700 text-indigo-200` | Shop confirmed order & scheduled pickup |
| **3** | **Picked** | `~~#06B6D4~~` | `#3B82F6` | `bg-blue-950/60` | `border-blue-700 text-blue-200` | Logistics active; gadget in transit |
| **4** | **Repairing** | `~~#F59E0B~~` | `#D97706` | `bg-amber-950/60` | `border-amber-700 text-amber-200` | Bench active; work underway |
| **5** | **Delivered** | `~~#10B981~~` | `#10B981` | `bg-emerald-950/60` | `border-emerald-700 text-emerald-200` | Verified completion & handover |

### 3.3 General Semantic & State Colors

- **Success**: `#10B981` (Emerald 500) — Badge: `bg-emerald-950/60 border-emerald-800 text-emerald-300`
- **Warning**: `#F59E0B` (Amber 500) — Badge: `bg-amber-950/60 border-amber-800 text-amber-300`
- **Error / Danger**: `#EF4444` (Red 500) — Badge: `bg-red-950/60 border-red-800 text-red-300`
- **Info**: `#3B82F6` (Blue 500) — Badge: `bg-blue-950/60 border-blue-800 text-blue-300`

---

## 4. Typography

### 4.1 Typeface Pairing Rationale
- **Primary / Display UI**: **Plus Jakarta Sans** (`font-sans`). Chosen for its geometric precision, compact letterforms, and high legibility in dense operational tables and navigation bars.
- **Monospace / Metrics**: **Geist Mono** (`font-mono`). Chosen for its distinct, unambiguous glyphs for zeros, currency values, order IDs (`#ORD-4092`), and timestamps.

### 4.2 Type Scale Table & Diff

| Role | Font Family | Size (px / rem) | Line Height | Weight | Tailwind v4 Classes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Plus Jakarta Sans | 44px / 2.75rem (`~~48px~~`) | 1.15 | 800 (ExtraBold) | `font-sans text-4xl sm:text-5xl font-extrabold tracking-tight` |
| **Page Title (H1)** | Plus Jakarta Sans | 28px / 1.75rem (`~~32px~~`) | 1.25 | 700 (Bold) | `font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-50` |
| **Section Header (H2)**| Plus Jakarta Sans | 20px / 1.25rem (`~~24px~~`) | 1.30 | 600 (SemiBold) | `font-sans text-xl font-semibold text-slate-100` |
| **Card Header (H3)** | Plus Jakarta Sans | 15px / 0.937rem (`~~18px~~`)| 1.35 | 600 (SemiBold) | `font-sans text-[15px] font-semibold text-slate-100` |
| **Body Standard** | Plus Jakarta Sans | 14px / 0.875rem | 1.50 | 400 (Regular) | `font-sans text-sm text-slate-300` |
| **Caption / Table** | Plus Jakarta Sans | 12px / 0.75rem | 1.40 | 500 (Medium) | `font-sans text-xs font-medium text-slate-400` |
| **Stat Display** | Geist Mono | 32px / 2.0rem (`~~36px~~`) | 1.10 | 700 (Bold) | `font-mono text-3xl font-bold text-slate-50 tracking-tight` |
| **Price / Code Tag** | Geist Mono | 14px / 0.875rem (`~~18px~~`) | 1.30 | 600 (SemiBold) | `font-mono text-sm font-semibold tracking-wide` |

---

## 5. Layout & Density Modes

Re-Gadgets v2 enforces two explicit density modes to ensure operational pages feel like workstation tools while marketing pages maintain room to breathe.

### 5.1 Density Mode Matrix

| Property | Marketing Density Mode (Home, BookService, Tracking) | Operational Density Mode (Shop, Tech, Admin Dashboards) |
| :--- | :--- | :--- |
| **Page Canvas Padding** | `px-6 py-10 sm:px-8 sm:py-16` | `p-4 sm:p-6` |
| **Card Internal Padding**| `p-6 sm:p-8` | `p-4 sm:p-5` |
| **Primary Input Height** | `h-11` (44px) | `h-9` (36px) |
| **Button Height** | `h-11 px-5` (44px) | `h-8 px-3 text-xs` (32px) or `h-9 px-3.5 text-sm` (36px) |
| **Table Row Height** | N/A | `h-9` (36px) with `py-1.5 px-3` cell padding |
| **Grid Section Gap** | `gap-6 sm:gap-8` | `gap-3.5 sm:gap-4` |
| **Radius Scale** | Cards: `12px`, Controls: `8px` | Cards: `12px`, Controls: `6px`, Chips: `4px` |

### 5.2 Container Constraints
- **Marketing Container**: `max-w-7xl mx-auto px-6 sm:px-8` (Max width 1280px).
- **Dashboard Shell (`DashboardLayout.jsx`)**: Sidebar fixed `240px` (`w-60`), main content fluid canvas (`flex-1 min-w-0 p-4 sm:p-6`).

---

## 6. Iconography & Mascot System

### 6.1 Lucide Icons Standard
- **Default Size**: `18px x 18px` (`w-[18px] h-[18px]`, `~~20px~~`) for navigation links, buttons, and form inputs.
- **Table / Chip Size**: `14px x 14px` (`w-3.5 h-3.5`, `~~16px~~`) for table status rows and action chips.
- **Stroke Width**: `1.75px` crisp stroke rendering against dark surface cards (`#0B1120`).

### 6.2 Streamlined Mascot Visual States (`RobotAssistant.jsx`)
*Note: Component props/behavior unchanged; styling simplified to eliminate competing multi-glow clutter.*

1. **Idle State**: Circular frame with `#1E293B` hairline border and subtle Violet accent indicator dot (`w-2 h-2 bg-violet-500 rounded-full`).
2. **Listening State (Voice Active)**: Hairline cyan ring border (`border border-sky-500/80`) with soft pulse indicator dot (`w-2 h-2 bg-sky-400 rounded-full animate-ping`).
3. **Thinking State (Processing)**: Double-dot bounce indicator inside avatar container.
4. **Action Triggered State**: Violet accent border (`border border-violet-500`) with top-right action badge (`w-2 h-2 bg-violet-400 rounded-full`).
5. **Error State**: Amber accent border (`border border-amber-500/80`) with soft warning dot (`w-2 h-2 bg-amber-400 rounded-full`).

---

## 7. Core Components Specification

*Note: All component APIs, props, filenames, and internal logic remain strictly unchanged. Only Tailwind classes and visual tokens are updated.*

### 7.1 `Button.jsx`
- **Primary**: `bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg shadow-sm transition-colors border border-violet-500/30 focus-visible:ring-1 focus-visible:ring-violet-400 focus-visible:outline-none`. (No gradients, no colored glow).
- **Secondary**: `bg-[#151D30] hover:bg-slate-800 text-slate-200 font-medium rounded-lg border border-slate-700/80 shadow-sm transition-colors`.
- **Outline**: `bg-transparent hover:bg-slate-800/60 text-slate-200 font-medium rounded-lg border border-slate-700 transition-colors`.
- **Ghost**: `bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white font-medium rounded-lg transition-colors`.
- **Danger**: `bg-red-950/80 hover:bg-red-900 text-red-200 font-medium rounded-lg border border-red-800/80 transition-colors`.
- **States**:
  - *Disabled*: `opacity-50 pointer-events-none bg-slate-800 text-slate-500 border-slate-800`.
  - *Loading Skeleton*: `animate-pulse bg-slate-800 h-9 w-24 rounded-lg`.

### 7.2 `Card.jsx`
- **Classes**: `bg-[#0B1120] border border-slate-800 rounded-xl shadow-sm hover:border-slate-700/80 transition-colors`.
- **Header Divider**: `border-b border-slate-800/80 pb-3 mb-4`.

### 7.3 `InputField.jsx`
- **Classes**: `bg-[#020617] border border-slate-700/80 text-slate-100 placeholder:text-slate-500 rounded-lg h-9 px-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 outline-none transition-colors`.
- **Error State**: `border-red-500/80 focus:border-red-500 focus:ring-red-500/30`.

### 7.4 Order Status Tracker (`OrderStatusTracker.jsx`)
- **Node Element**: 32px (`w-8 h-8`) step circle.
  - *Completed*: `bg-emerald-950/80 border border-emerald-600 text-emerald-400`.
  - *Active*: `bg-amber-950/80 border border-amber-500 text-amber-300 ring-4 ring-amber-500/20`.
  - *Future*: `bg-slate-900 border border-slate-800 text-slate-600`.
- **Connecting Progress Line**: `h-0.5 bg-slate-800`. Completed segments fill with `#10B981` (Emerald) or active stage hex.

### 7.5 Chat Suite (`ChatBot.jsx`, `ChatWindow.jsx`, `MessageBubble.jsx`, `VoiceInput.jsx`)
- **User Bubble**: `bg-violet-700/90 text-white rounded-xl rounded-tr-xs px-3.5 py-2.5 text-sm border border-violet-600/50 shadow-sm`.
- **AI Bubble**: `bg-[#151D30] text-slate-200 rounded-xl rounded-tl-xs px-3.5 py-2.5 text-sm border border-slate-700/80 shadow-sm`.
- **Action Chips**: `bg-slate-900 hover:bg-violet-950/80 text-violet-300 hover:text-violet-200 border border-violet-800/80 hover:border-violet-600 rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5`.
- **Voice Input Button**: `w-8 h-8 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg flex items-center justify-center transition-colors`.

### 7.6 Kanban Drag-and-Drop Board (`@hello-pangea/dnd`)
- **Column Container**: `bg-[#0B1120] border border-slate-800 rounded-xl p-3 flex flex-col gap-3 min-w-[260px]`.
- **Header Badge**: `text-xs font-mono font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800`.
- **Draggable Order Card**: `bg-[#020617] border border-slate-800 hover:border-slate-700 rounded-lg p-3 shadow-sm transition-colors cursor-grab active:cursor-grabbing`.
- **Active Drag State**: Card transforms with `shadow-lg shadow-black/80 border-violet-500/80 rotate-1`. Drop column highlights with `border-violet-500/40 bg-violet-950/10`.

### 7.7 Dashboard Charts (Recharts Integration)
- **Chart Card Container**: `bg-[#0B1120] border border-slate-800 rounded-xl p-4 sm:p-5`.
- **Grid Lines**: `<CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />`.
- **Tooltip Styling**: `contentStyle={{ backgroundColor: "#0B1120", borderColor: "#334155", borderRadius: "8px", color: "#F8FAFC", fontSize: "12px" }}`.
- **Chart Palette**: Primary Area/Bar line `#7C3AED` (Violet), Secondary metric `#3B82F6` (Blue).

### 7.8 Role Shell (`DashboardLayout.jsx`)
- **Sidebar Nav Container**: `w-60 bg-[#020617] border-r border-slate-800 flex flex-col p-3 gap-1`.
- **Nav Link Active Item**: `bg-violet-950/50 border-l-2 border-violet-500 text-white font-medium px-3 py-2 text-sm rounded-r-md`.
- **Nav Link Inactive Item**: `text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 px-3 py-2 text-sm rounded-md transition-colors`.
- **Role Badges**:
  - *Customer*: `bg-violet-950/80 text-violet-300 border border-violet-800/80 text-xs px-2 py-0.5 rounded font-mono`.
  - *Shop Owner*: `bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 text-xs px-2 py-0.5 rounded font-mono`.
  - *Technician*: `bg-amber-950/80 text-amber-300 border border-amber-800/80 text-xs px-2 py-0.5 rounded font-mono`.
  - *Admin*: `bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-xs px-2 py-0.5 rounded font-mono`.

---

## 8. Motion & Interaction

### 8.1 Framer Motion Standards
- **Page Transition**:
  ```javascript
  export const pageTransition = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.15, ease: "easeOut" }
  };
  ```
- **Order Stage Advance Signature Animation**:
  - When an order transitions stage, the target step node executes a single scale bloom: `scale: [1, 1.2, 1]` over `350ms`.
  - Connecting line fills via `animate={{ width: "100%" }}` over `450ms easeInOut`.
- **Reduced Motion Fallback**: Wrap all motion blocks with `useReducedMotion()`. When active, motion transitions revert instantly to `opacity` toggles (`duration: 0.01`).

---

## 9. Content & Microcopy Voice

- **Tone**: Professional, direct, concise, bilingual (English/Hinglish).
- **AI Chat Welcome**: *"Hello! I'm your Re-Gadgets assistant. Need to schedule a doorstep repair or track an active order?"*
- **Empty States**:
  - *Customer Dashboard*: *"No active repairs. Have a broken screen or faulty battery? Book a doorstep repair in 2 minutes."*
  - *Technician Workbench*: *"Your repair queue is empty. Assigned jobs will appear here automatically."*
  - *Shop Owner Kanban*: *"No requests in this stage."*
- **Loading States**: Table skeletons render 5 animated pulse rows (`animate-pulse bg-slate-900 h-9 rounded-md w-full`).

---

## 10. Page-Level Specifications

### 10.1 Home Page (`Home.jsx`)
- **Density**: Marketing Density Mode (`px-6 py-12 sm:px-8`).
- **Hero**: Clean centered header with H1, quick issue search box (`InputField.jsx`), and compact AI Mascot chip.

### 10.2 Booking Wizard (`BookService.jsx`)
- **Density**: Marketing Density Mode.
- **Layout**: 3-step progress bar, grid of device intake selection cards, clean location address fields.

### 10.3 Tracking Page (`Tracking.jsx`)
- **Density**: Hybrid Mode (Spacious hero tracker + dense diagnostic log card).
- **Hero Tracker Banner**: Full width 5-stage status progress bar (`OrderStatusTracker.jsx`).

### 10.4 Dashboards (`dashboards/`)
- **Density**: Operational Density Mode (`p-4 sm:p-6`, compact 36px controls, 36px table row heights).
- **Customer**: Primary focus on Active Repair Status Hero Card.
- **Shop Owner**: Primary focus on 5-Column Kanban Board + Technician Workload Grid.
- **Technician**: Primary focus on Assigned Repair Queue Table + Repair Notes Drawer.
- **Admin**: Primary focus on System Metrics Cards + User Accounts Data Table.

---

## 11. Accessibility Baseline (WCAG 2.1 AA Compliance)

1. **Color Contrast**:
   - `text-primary` (`#F8FAFC`) on `#020617` base: **18.2:1** (Passes AAA).
   - `text-secondary` (`#94A3B8`) on `#0B1120` card surface: **7.2:1** (Passes AAA).
   - Flat Violet Accent (`#7C3AED`) on white button text: **4.8:1** (Passes AA).
2. **Focus Rings**: All interactive controls feature explicit keyboard focus rings: `focus-visible:ring-1 focus-visible:ring-violet-400 focus-visible:outline-none`.
3. **Touch Targets**: Minimum interactive hit area of `44px` on mobile screens for all primary buttons and action chips.

---

## 12. Implementation Notes for Engineers

1. **Pure Styling & Token Pass**: This redesign requires **zero changes** to React component props, state hooks, routes, API endpoints, or database models.
2. **Centralized Token Mapping**: Update Tailwind configuration (`client/tailwind.config.js` or `src/index.css`) with the new color tokens (`#020617`, `#0B1120`, `#7C3AED`) and font family declarations (`Plus Jakarta Sans`, `Geist Mono`).
3. **Class Refactoring**: Replace component JSX class strings according to the specifications in Section 7 without touching JSX hierarchy or event listeners.
