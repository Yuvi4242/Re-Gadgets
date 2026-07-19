import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Smartphone, Wrench, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import JobCard from './JobCard';
import JobDetailModal from './JobDetailModal';
import { getAssignedOrders, updateOrderStatus } from '../../services/orderService';

const COLUMNS = [
  { id: 'Accepted', title: 'DISCOVERY', icon: Smartphone, color: 'text-blue-400', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/50', bg: 'bg-blue-500/10' },
  { id: 'Picked', title: 'PICKED UP', icon: Wrench, color: 'text-amber-400', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/50', bg: 'bg-amber-500/10' },
  { id: 'Repairing', title: 'IN REPAIR', icon: ShieldCheck, color: 'text-emerald-400', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/50', bg: 'bg-emerald-500/10' },
  { id: 'Delivered', title: 'READY', icon: CheckCircle, color: 'text-cyan-400', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-500/50', bg: 'bg-cyan-500/10' },
];

const STATUS_FLOW = ['Accepted', 'Picked', 'Repairing', 'Delivered'];

function DroppableColumn({ col, items, onOpenJob, onDropJob }: any) {
  const [isOver, setIsOver] = useState(false);
  const Icon = col.icon;

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
      <div className={`p-4 rounded-t-2xl border border-white/10 ${col.bg} backdrop-blur-xl flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${col.color}`} />
          <h2 className="text-sm font-black text-white">{col.title}</h2>
        </div>
        <div className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold border border-white/10 text-slate-400">
          {items.length}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
          const jobId = e.dataTransfer.getData('jobId');
          if (jobId) onDropJob(jobId, col.id);
        }}
        className={`flex-1 bg-[#0a0a1a]/40 backdrop-blur-xl border border-t-0 border-white/10 rounded-b-2xl p-4 overflow-y-auto no-scrollbar space-y-4 transition-all duration-300 ${
          isOver ? `shadow-[inset_0_0_50px_rgba(255,255,255,0.05)] ${col.hoverBorder}` : ''
        }`}
      >
        {items.map((job: any) => (
          <JobCard key={job.id} job={job} onOpen={onOpenJob} />
        ))}
        {col.id === 'Accepted' && items.length === 0 && (
          <div className="w-full py-8 text-center text-slate-500 text-sm">No assigned jobs yet</div>
        )}
      </div>
    </div>
  );
}

const mapOrderToJob = (o: any) => ({
  id: o._id,
  jobId: `JOB-${String(o._id).slice(-4).toUpperCase()}`,
  device: o.deviceModel,
  issue: o.issue,
  priority: o.status === 'Accepted' ? 'HIGH' : 'MEDIUM',
  customer: o.customer?.name || 'Customer',
  timeAssigned: new Date(o.updatedAt || o.createdAt).toLocaleString(),
  status: o.status,
  isOverdue: false,
  raw: o,
});

export default function WorkbenchKanban() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAssignedOrders()
      .then((orders) => setJobs(orders.map(mapOrderToJob)))
      .catch((err) => {
        console.error(err);
        setError('Failed to load assigned jobs');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDropJob = async (jobId: string, newStatus: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job || job.status === newStatus) return;

    const fromIdx = STATUS_FLOW.indexOf(job.status);
    const toIdx = STATUS_FLOW.indexOf(newStatus);
    // Only allow forward one step via the state machine
    if (toIdx !== fromIdx + 1) return;

    const prev = jobs;
    setJobs((list) => list.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));

    try {
      await updateOrderStatus(jobId, newStatus);
    } catch (err) {
      console.error('Status update failed', err);
      setJobs(prev);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">My Workbench</h1>
          <p className="text-slate-400 text-sm mt-1">
            {error || 'Drag jobs forward through your repair pipeline.'}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Job ID or Device..."
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 outline-none"
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-cyan-400 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((col) => (
          <DroppableColumn
            key={col.id}
            col={col}
            items={jobs.filter((j) => j.status === col.id)}
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
              setJobs(jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
