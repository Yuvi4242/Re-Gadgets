import React from 'react';
import { Clock, Eye, MessageSquarePlus } from 'lucide-react';

export default function JobCard({ job, onOpen }: any) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('jobId', job.id);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to prevent drag UI from disappearing in some browsers
    setTimeout(() => {
       const el = e.target as HTMLElement;
       el.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const el = e.target as HTMLElement;
    el.style.opacity = '1';
  };

  const priorityColors: { [key: string]: string } = {
    'HIGH': 'text-red-400 border-red-500/30 bg-red-500/10',
    'MEDIUM': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    'LOW': 'text-slate-400 border-white/10 bg-white/5'
  };

  const borderColors: { [key: string]: string } = {
    'discovery': 'border-t-blue-500',
    'repair': 'border-t-amber-500',
    'qc': 'border-t-emerald-500',
    'ready': 'border-t-cyan-500'
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        bg-black/60 border border-white/10 ${borderColors[job.status]} border-t-2 rounded-xl p-4 
        shadow-lg cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:scale-[1.02] 
        hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all
        z-10 flex flex-col relative group
      `}
    >
       <div className="flex justify-between items-start mb-3">
         <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{job.jobId}</span>
         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${priorityColors[job.priority]}`}>
            {job.priority === 'HIGH' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            {job.priority}
         </span>
       </div>

       <h4 className="font-bold text-white text-sm mb-1">{job.device}</h4>
       <p className="text-xs text-slate-400 mb-4 line-clamp-2">{job.issue}</p>

       <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
               {job.customer.charAt(0)}
            </div>
            <span className="text-xs font-medium text-slate-300">{job.customer}</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
             <Clock className="w-3 h-3" />
             <span className={job.isOverdue ? 'text-amber-500' : ''}>{job.timeAssigned}</span>
          </div>
       </div>

       {/* Actions (Only visible on hover/touch inside kanban) */}
       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4 pointer-events-none group-hover:pointer-events-auto">
          <button 
            type="button"
            onPointerDown={(e) => { e.stopPropagation(); onOpen(job); }}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <Eye className="w-4 h-4" /> View Details
          </button>
          <button 
            type="button"
            onPointerDown={(e) => { e.stopPropagation(); }}
            className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" /> Log Note
          </button>
       </div>
    </div>
  );
}
