import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../services/utils';

export default function RoleBadge({ role, compact = false, className = '' }) {
  const label = role === 'owner' ? 'Owner' : role === 'worker' ? 'Worker' : role === 'admin' ? 'Admin' : 'Customer';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-[oklch(0.65_0.19_35/0.32)] bg-[oklch(0.65_0.19_35/0.10)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[oklch(0.78_0.16_75)]',
        compact && 'px-1.5 py-0.5 text-[9px]',
        className
      )}
    >
      <Sparkles className="h-3 w-3 text-[oklch(0.65_0.19_35)]" />
      {label}
    </span>
  );
}
