import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, GripVertical, HelpCircle, LogOut, Pin, Settings } from 'lucide-react';
import { cn } from '../../services/utils';
import { useAuth } from '../../context/AuthContext';
import RoleBadge from './RoleBadge';
import { bottomItems, dashboardPath, getRoleConfig, toneClasses } from './sidebarConfig';

const MotionDiv = motion.div;

const MIN_WIDTH = 240;
const DEFAULT_WIDTH = 280;
const MAX_WIDTH = 320;
const COLLAPSED_WIDTH = 72;

const Badge = ({ value, tone = 'primary' }) => (
  <span className={cn('min-w-5 rounded border px-1.5 py-0.5 text-center font-mono text-[10px] font-black leading-none', toneClasses[tone] || toneClasses.primary)}>
    {value}
  </span>
);

const NavRow = ({ item, active, collapsed, onSelect, mobileClose }) => {
  const Icon = item.icon;
  const content = (
    <>
      {active && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-[oklch(0.65_0.19_35)] shadow-[0_0_10px_oklch(0.65_0.19_35)]" />}
      <span className={cn(
        'grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition-colors duration-150',
        active
          ? 'border-[oklch(0.65_0.19_35/0.35)] bg-[oklch(0.65_0.19_35/0.14)] text-[oklch(0.78_0.16_75)]'
          : 'border-[oklch(0.28_0.008_260/0.45)] bg-[oklch(0.18_0.006_260)] text-[oklch(0.65_0.01_260)] group-hover:text-[oklch(0.96_0.005_260)]'
      )}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      {!collapsed && (
        <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span className="truncate text-[13px] font-bold tracking-tight">{item.label}</span>
          {item.badge && <Badge value={item.badge} tone={item.badgeTone} />}
        </span>
      )}
    </>
  );

  return (
    <Link
      to={item.path || '#'}
      onClick={() => {
        onSelect(item.id);
        if (mobileClose) mobileClose(false);
      }}
      title={collapsed ? item.label : undefined}
      className={cn(
        'group relative flex h-8 items-center gap-2 rounded-lg px-2 text-left transition-all duration-200 ease-out hover:bg-[oklch(0.18_0.006_260)] hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.19_35/0.35)]',
        active ? 'bg-[oklch(0.65_0.19_35/0.10)] text-[oklch(0.96_0.005_260)]' : 'text-[oklch(0.65_0.01_260)] hover:text-[oklch(0.96_0.005_260)]',
        collapsed && 'justify-center px-0'
      )}
    >
      {content}
    </Link>
  );
};

const Section = ({ section, open, onToggle, collapsed, activeId, setActiveId, setIsMobileOpen }) => (
  <div className="space-y-1">
    <button
      type="button"
      onClick={onToggle}
      className={cn('flex h-7 w-full items-center justify-between rounded-md px-2 text-[10px] font-black uppercase tracking-[0.16em] text-[oklch(0.65_0.01_260)] transition-colors hover:text-[oklch(0.96_0.005_260)]', collapsed && 'justify-center px-0')}
      aria-expanded={open}
    >
      {!collapsed ? <span>{section.title}</span> : <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.19_35)]" />}
      {!collapsed && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-150', !open && '-rotate-90')} />}
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <MotionDiv
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="space-y-1">
            {section.items.map((navItem) => (
              <NavRow
                key={navItem.id}
                item={navItem}
                active={activeId === navItem.id}
                collapsed={collapsed}
                onSelect={setActiveId}
                mobileClose={setIsMobileOpen}
              />
            ))}
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  </div>
);

export default function Sidebar({ role = 'customer', setIsMobileOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const config = getRoleConfig(role);
  const [activeId, setActiveId] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('rg_sidebar_collapsed') === 'true');
  const [width, setWidth] = useState(() => Number(localStorage.getItem('rg_sidebar_width')) || DEFAULT_WIDTH);
  const [sectionsOpen, setSectionsOpen] = useState(() => {
    const hasFavorites = config.sections.some(s => s.items.some(i => i.favorite));
    return Object.fromEntries(config.sections.map((section) => [
      section.id,
      section.id === 'main' && hasFavorites ? false : section.defaultOpen
    ]));
  });

  useEffect(() => {
    localStorage.setItem('rg_sidebar_collapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem('rg_sidebar_width', String(width));
  }, [width]);


  const favorites = useMemo(
    () => config.sections.flatMap((section) => section.items).filter((navItem) => navItem.favorite),
    [config]
  );
  const initials = (user?.name || 'RG').split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();
  const visibleWidth = collapsed ? COLLAPSED_WIDTH : width;

  const startResize = (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = width;
    const onMove = (moveEvent) => {
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + moveEvent.clientX - startX));
      setWidth(next);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative flex h-full shrink-0 flex-col rounded-r-[14px] border-r border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.14_0.005_260)] transition-[width] duration-200 ease-out z-40"
      style={{ width: visibleWidth }}
      aria-label={`${config.label} sidebar`}
    >
      <div className={cn('flex h-[84px] shrink-0 items-center gap-3 border-b border-[oklch(0.28_0.008_260/0.45)] px-4', collapsed && 'justify-center px-2')}>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[oklch(0.65_0.19_35)] shadow-[0_0_20px_oklch(0.65_0.19_35/0.45)]">
          <span className="font-display text-sm font-black text-[oklch(0.98_0_0)]">RG</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display text-sm font-extrabold leading-none text-[oklch(0.96_0.005_260)]">RE-GADGETS</p>
            <div className="mt-1 flex items-center gap-2">
              <RoleBadge role={role} compact />
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-2 px-3 py-3">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('rg-open-command-palette'))}
          className={cn('flex h-9 w-full items-center gap-2 rounded-lg border border-[oklch(0.28_0.008_260/0.5)] bg-[oklch(0.18_0.006_260/0.75)] px-3 text-left text-xs text-[oklch(0.65_0.01_260)] transition-colors hover:border-[oklch(0.65_0.19_35/0.35)] hover:text-[oklch(0.96_0.005_260)]', collapsed && 'justify-center px-0')}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.19_35)]" />
          {!collapsed && <span className="truncate">Search or run command</span>}
        </button>

        {favorites.length > 0 && (
          <div className="space-y-1">
            {!collapsed && (
              <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-[0.16em] text-[oklch(0.65_0.01_260)]">
                <Pin className="h-3 w-3 text-[oklch(0.78_0.16_75)]" /> Pinned
              </div>
            )}
            {favorites.slice(0, collapsed ? 4 : 5).map((navItem) => (
              <NavRow
                key={`favorite-${navItem.id}`}
                item={navItem}
                active={activeId === navItem.id}
                collapsed={collapsed}
                onSelect={setActiveId}
                mobileClose={setIsMobileOpen}
              />
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 space-y-1 px-3 pb-2">
        {config.sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            open={sectionsOpen[section.id]}
            onToggle={() => setSectionsOpen((current) => ({ ...current, [section.id]: !current[section.id] }))}
            collapsed={collapsed}
            activeId={activeId}
            setActiveId={setActiveId}
            setIsMobileOpen={setIsMobileOpen}
          />
        ))}
      </div>

      <div className={cn('mx-3 mb-2 min-h-0 flex-1 rounded-lg border border-[oklch(0.28_0.008_260/0.45)] bg-[oklch(0.16_0.006_260/0.42)]', collapsed && 'hidden')}>
        <div className="flex h-9 items-center justify-between border-b border-[oklch(0.28_0.008_260/0.4)] px-3">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[oklch(0.65_0.01_260)]">Insights</span>
          <span className="text-[10px] font-bold text-[oklch(0.78_0.16_75)]">{config.widgets.length}</span>
        </div>
        <div className="max-h-full overflow-y-auto p-2 no-scrollbar">
          <div className="space-y-1.5">
            {config.widgets.map((widget) => (
              <div key={widget.id} className="flex min-h-9 items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-150 hover:bg-white/[0.03]">
                <span className={cn('h-2 w-2 shrink-0 rounded-full border', toneClasses[widget.tone] || toneClasses.primary)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-[oklch(0.96_0.005_260)]">{widget.label}</p>
                  <p className="truncate text-[10px] text-[oklch(0.65_0.01_260)]">{widget.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto shrink-0 border-t border-[oklch(0.28_0.008_260/0.45)] p-3">
        {!collapsed && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-[oklch(0.28_0.008_260/0.45)] bg-[oklch(0.18_0.006_260)] p-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-[oklch(0.65_0.19_35/0.3)] bg-[oklch(0.65_0.19_35/0.12)] text-[11px] font-black text-[oklch(0.78_0.16_75)]">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black text-[oklch(0.96_0.005_260)]">{user?.name || 'Guest'}</p>
              <p className="truncate text-[10px] text-[oklch(0.65_0.01_260)]">{config.navLabel}</p>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {bottomItems.map((bottomItem) => {
            const Icon = bottomItem.icon;
            return (
              <Link key={bottomItem.id} to={dashboardPath[role] || location.pathname} className={cn('flex h-8 items-center gap-2 rounded-lg px-2 text-[13px] font-bold text-[oklch(0.65_0.01_260)] transition-colors hover:bg-[oklch(0.18_0.006_260)] hover:text-white', collapsed && 'justify-center px-0')} title={collapsed ? bottomItem.label : undefined}>
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{bottomItem.label}</span>}
              </Link>
            );
          })}
          <button onClick={logout} className={cn('flex h-8 w-full items-center gap-2 rounded-lg px-2 text-[13px] font-bold text-[oklch(0.62_0.22_25)] transition-colors hover:bg-[oklch(0.62_0.22_25/0.10)]', collapsed && 'justify-center px-0')} title={collapsed ? 'Sign Out' : undefined}>
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-8 w-8 place-items-center rounded-full border border-[oklch(0.65_0.19_35/0.35)] bg-[oklch(0.18_0.006_260)] text-[oklch(0.78_0.16_75)] shadow-[0_0_14px_oklch(0.65_0.19_35/0.25)] transition-all duration-200 ease-out hover:scale-110 hover:shadow-[0_0_20px_oklch(0.65_0.19_35/0.4)] lg:grid z-50"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {!collapsed && (
        <button
          type="button"
          onMouseDown={startResize}
          className="absolute -right-1 top-0 hidden h-full w-2 cursor-col-resize items-center justify-center text-[oklch(0.65_0.01_260/0.5)] transition-colors hover:text-[oklch(0.78_0.16_75)] lg:flex"
          aria-label="Resize sidebar"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
    </motion.aside>
  );
}



