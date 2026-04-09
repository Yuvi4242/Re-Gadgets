import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Smartphone, Wrench, ShieldCheck, CheckCircle } from 'lucide-react';
import JobCard from './JobCard';
import JobDetailModal from './JobDetailModal';

// Dummy data
const initialJobs = [
  { id: 'job-1', jobId: 'JOB-9024', device: 'iPhone 13 Pro', issue: 'Shattered front glass, OLED bleeding at top right.', priority: 'HIGH', customer: 'A. Johnson', timeAssigned: '2h ago', status: 'discovery', isOverdue: true },
  { id: 'job-2', jobId: 'JOB-9025', device: 'Samsung S22 Ultra', issue: 'Not charging, port loose.', priority: 'MEDIUM', customer: 'M. Lee', timeAssigned: '4h ago', status: 'repair', isOverdue: false },
  { id: 'job-3', jobId: 'JOB-9026', device: 'MacBook Air M1', issue: 'Liquid damage trace. Needs sonic bath.', priority: 'HIGH', customer: 'S. White', timeAssigned: '1d ago', status: 'qc', isOverdue: true },
  { id: 'job-4', jobId: 'JOB-9027', device: 'iPad Pro 12.9', issue: 'Battery drain issue, tested new battery.', priority: 'LOW', customer: 'D. Kim', timeAssigned: '3h ago', status: 'ready', isOverdue: false },
  { id: 'job-5', jobId: 'JOB-9028', device: 'Nintendo Switch', issue: 'Joy-con drift (Left edge).', priority: 'LOW', customer: 'J. Smith', timeAssigned: '5h ago', status: 'discovery', isOverdue: false }
];

const COLUMNS = [
  { id: 'discovery', title: 'DISCOVERY', icon: Smartphone, color: 'text-blue-400', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/50', bg: 'bg-blue-500/10' },
  { id: 'repair', title: 'IN REPAIR', icon: Wrench, color: 'text-amber-400', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/50', bg: 'bg-amber-500/10' },
  { id: 'qc', title: 'QC & TESTING', icon: ShieldCheck, color: 'text-emerald-400', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/50', bg: 'bg-emerald-500/10' },
  { id: 'ready', title: 'READY', icon: CheckCircle, color: 'text-cyan-400', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-500/50', bg: 'bg-cyan-500/10' }
];

function DroppableColumn({ col, items, onOpenJob, onDropJob }: any) {
  const [isOver, setIsOver] = useState(false);
  const Icon = col.icon;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) {
      onDropJob(jobId, col.id);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
       <div className={`p-4 rounded-t-2xl border border-white/10 ${col.bg} backdrop-blur-xl flex items-center justify-between`}>
          <div className="flex items-center gap-2">
             <Icon className={`w-5 h-5 ${col.color}`} />
             <h2 className="text-sm font-black text-white">{col.title}</h2>
          </div>
          <motion.div 
            key={items.length} 
            initial={{ scale: 1.5, color: '#06b6d4' }} 
            animate={{ scale: 1, color: '#94a3b8' }} 
            className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold border border-white/10"
          >
            {items.length}
          </motion.div>
       </div>
       
       <div 
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         className={`flex-1 bg-[#0a0a1a]/40 backdrop-blur-xl border border-t-0 border-white/10 rounded-b-2xl p-4 overflow-y-auto no-scrollbar space-y-4 transition-all duration-300 ${isOver ? `shadow-[inset_0_0_50px_rgba(255,255,255,0.05)] ${col.hoverBorder}` : ''}`}
       >
          {isOver && items.length === 0 && (
             <div className="w-full h-32 border-2 border-dashed border-cyan-500/50 rounded-xl flex items-center justify-center pointer-events-none">
                <span className="text-cyan-500 font-bold tracking-widest text-sm">+ DROP HERE</span>
             </div>
          )}
          
          {items.map((job: any) => (
             <JobCard key={job.id} job={job} onOpen={onOpenJob} />
          ))}

          {col.id === 'discovery' && (
             <button className="w-full py-4 border-2 border-dashed border-white/10 hover:border-cyan-500/30 rounded-xl text-slate-500 hover:text-cyan-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors">
               <Plus className="w-4 h-4" /> Add Job
             </button>
          )}
       </div>
    </div>
  );
}

export default function WorkbenchKanban() {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleDropJob = (jobId: string, newStatus: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId && j.status !== newStatus) {
         // UI Particle effect handled manually if needed, removed canvas-confetti for stability
         return { ...j, status: newStatus };
      }
      return j;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
         <div>
           <h1 className="text-2xl font-bold text-white leading-tight">My Workbench</h1>
           <p className="text-slate-400 text-sm mt-1">Drag and drop jobs across your workstation pipeline.</p>
         </div>

         <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search by Job ID or Device..." className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-cyan-400 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {COLUMNS.map(col => (
            <DroppableColumn 
              key={col.id} 
              col={col} 
              items={jobs.filter(j => j.status === col.id)} 
              onOpenJob={setSelectedJob}
              onDropJob={handleDropJob}
            />
         ))}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <JobDetailModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            updateJob={(id: string, updates: any) => {
              setJobs(jobs.map(j => j.id === id ? { ...j, ...updates } : j));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
