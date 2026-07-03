import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Moon, Search, Sun, User, X, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../services/utils';
import RoleBadge from './RoleBadge';
import { getCommandItems, getRoleConfig, notificationTone, toneClasses } from './sidebarConfig';

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

const CommandPalette = ({ role, open, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const items = useMemo(() => getCommandItems(role), [role]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items.slice(0, 12);
    return items.filter((item) => `${item.label} ${item.group} ${item.kind} ${item.value || ''}`.toLowerCase().includes(needle)).slice(0, 16);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Enter' && filtered[0]) {
        navigate(filtered[0].path);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, navigate, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
          <MotionButton
            type="button"
            aria-label="Close command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <MotionDiv
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-[oklch(0.28_0.008_260/0.65)] bg-[oklch(0.14_0.005_260/0.96)] shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            <div className="flex h-14 items-center gap-3 border-b border-[oklch(0.28_0.008_260/0.45)] px-4">
              <Search className="h-4 w-4 text-[oklch(0.78_0.16_75)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search navigation, widgets, or actions..."
                className="h-full flex-1 bg-transparent text-sm font-semibold text-[oklch(0.96_0.005_260)] outline-none placeholder:text-[oklch(0.65_0.01_260)]"
              />
              <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[oklch(0.65_0.01_260)] transition-colors hover:bg-white/5 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2 no-scrollbar">
              {filtered.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm font-bold text-[oklch(0.96_0.005_260)]">No matching command</p>
                  <p className="mt-1 text-xs text-[oklch(0.65_0.01_260)]">Try a nav item, widget name, or quick action.</p>
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={`${item.group}-${item.id}`}
                      type="button"
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[oklch(0.18_0.006_260)]',
                        index === 0 && 'bg-[oklch(0.18_0.006_260/0.65)]'
                      )}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-[oklch(0.28_0.008_260/0.5)] bg-[oklch(0.18_0.006_260)] text-[oklch(0.78_0.16_75)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-black text-[oklch(0.96_0.005_260)]">{item.label}</span>
                        <span className="block truncate text-[11px] text-[oklch(0.65_0.01_260)]">{item.kind} / {item.group}{item.value ? ` / ${item.value}` : ''}</span>
                      </span>
                      {index === 0 && <span className="rounded border border-[oklch(0.28_0.008_260/0.55)] px-1.5 py-0.5 text-[10px] font-bold text-[oklch(0.65_0.01_260)]">Enter</span>}
                    </button>
                  );
                })
              )}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function TopNavbar({ role }) {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const config = getRoleConfig(role);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const alertCount = config.notifications.filter((item) => item.urgency === 'alert').length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    const onCustomOpen = () => setPaletteOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('rg-open-command-palette', onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('rg-open-command-palette', onCustomOpen);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.14_0.005_260/0.86)] px-4 backdrop-blur-xl md:px-8">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden h-11 w-full max-w-xl items-center gap-3 rounded-xl border border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.12_0.005_260/0.75)] px-4 text-left text-sm text-[oklch(0.65_0.01_260)] transition-all duration-150 hover:border-[oklch(0.65_0.19_35/0.45)] hover:bg-[oklch(0.18_0.006_260/0.8)] hover:text-[oklch(0.96_0.005_260)] md:flex"
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 truncate">{config.searchPlaceholder}</span>
          <kbd className="rounded-md border border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.18_0.006_260)] px-2 py-1 font-mono text-[10px] font-black text-[oklch(0.65_0.01_260)]">Ctrl K</kbd>
        </button>

        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-2 sm:gap-3">

          <div className="relative">
            <MotionButton
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setNotificationsOpen((value) => !value)}
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-[oklch(0.28_0.008_260/0.55)] bg-[oklch(0.18_0.006_260/0.75)] text-[oklch(0.65_0.01_260)] transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={notificationsOpen}
              aria-label="Open notification center"
            >
              <Bell className="h-5 w-5" />
              <span className={cn('absolute -right-1 -top-1 min-w-5 rounded-full border px-1 text-center text-[10px] font-black leading-5', alertCount ? toneClasses.alert : toneClasses.info)}>
                {config.notifications.length}
              </span>
            </MotionButton>

            <AnimatePresence>
              {notificationsOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-3 w-[320px] overflow-hidden rounded-xl border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.14_0.005_260/0.96)] shadow-2xl backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between border-b border-[oklch(0.28_0.008_260/0.45)] px-4 py-3">
                    <div>
                      <p className="text-sm font-black text-[oklch(0.96_0.005_260)]">Notification Center</p>
                      <p className="text-[11px] text-[oklch(0.65_0.01_260)]">Scoped alerts, no duplicate feed.</p>
                    </div>
                    <Check className="h-4 w-4 text-[oklch(0.72_0.17_155)]" />
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 no-scrollbar">
                    {config.notifications.map((item) => (
                      <div key={item.id} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.03]">
                        <div className="flex items-start gap-2">
                          <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full border', notificationTone[item.urgency] || notificationTone.info)} />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-black text-[oklch(0.96_0.005_260)]">{item.title}</p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[oklch(0.65_0.01_260)]">{item.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          <div className="mx-1 hidden h-8 w-px bg-[oklch(0.28_0.008_260/0.55)] sm:block" />

          <div className="relative" ref={profileRef}>
            <MotionButton
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              aria-label="Open user menu"
              className="flex items-center gap-3 rounded-xl p-1 pr-2 transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.19_35/0.5)]"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-black leading-tight text-[oklch(0.96_0.005_260)]">{user?.name || 'Guest'}</p>
                <div className="mt-1 flex justify-end">
                  <RoleBadge role={role} compact />
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[oklch(0.65_0.19_35/0.34)] bg-[oklch(0.65_0.19_35/0.10)] text-[oklch(0.78_0.16_75)] shadow-sm">
                <User className="h-5 w-5" />
              </div>
            </MotionButton>

            <AnimatePresence>
              {profileOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-[oklch(0.28_0.008_260/0.6)] bg-[oklch(0.14_0.005_260/0.96)] shadow-2xl backdrop-blur-2xl py-2"
                >
                  <div className="border-b border-[oklch(0.28_0.008_260/0.45)] px-4 pb-3 mb-2 pt-1 sm:hidden">
                    <p className="text-sm font-black leading-tight text-[oklch(0.96_0.005_260)]">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-[oklch(0.65_0.01_260)] uppercase mt-1">{role}</p>
                  </div>
                  
                  <div className="px-2">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[oklch(0.96_0.005_260)] transition-colors hover:bg-[oklch(0.18_0.006_260)] hover:text-white text-left">
                      <User className="h-4 w-4 text-[oklch(0.65_0.01_260)]" />
                      My Profile
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[oklch(0.96_0.005_260)] transition-colors hover:bg-[oklch(0.18_0.006_260)] hover:text-white text-left">
                      <SettingsIcon className="h-4 w-4 text-[oklch(0.65_0.01_260)]" />
                      Account Settings
                    </button>
                    
                    <div className="my-2 h-px bg-[oklch(0.28_0.008_260/0.45)]" />
                    
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout && logout();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-500/10 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CommandPalette role={role} open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}



