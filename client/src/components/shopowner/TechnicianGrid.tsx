import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, UserPlus, Briefcase, Loader2 } from 'lucide-react';
import AddTechnicianModal from './AddTechnicianModal';
import { getOwnerStats, getShopWorkers } from '../../services/shopService';

export default function TechnicianGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<any | null>(null);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [shopId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stats = await getOwnerStats();
        const id = stats.shopId;
        setShopId(id);
        if (id) {
          const workers = await getShopWorkers(id);
          setTechnicians(
            workers.map((w: any) => ({
              id: w._id,
              name: w.name,
              role: w.userId ? 'Linked Technician' : 'Shop Worker',
              avatar: w.name?.charAt(0)?.toUpperCase() || 'T',
              avatarUrl: w.avatar,
              specs: w.skills?.length ? w.skills : ['General'],
              workload: { current: w.currentOrderIds?.length || 0, max: 3 },
              rating: w.rating || 0,
              status: w.isAvailable ? 'Online' : 'Offline',
              jobsCompleted: 0,
              phone: w.phone,
              email: w.email,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load technicians', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isModalOpen]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'text-emerald-400 bg-emerald-400/20 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
      case 'Offline':
        return 'text-slate-400 bg-slate-400/20';
      default:
        return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getWorkloadColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'bg-red-500';
    if (ratio >= 0.7) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
          <p className="text-slate-400 text-sm">Monitor workload, specializations, and performance stats.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!shopId}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <UserPlus className="w-5 h-5" /> Add Technician
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : technicians.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No technicians yet. Add your first team member.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
          {technicians.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{
                y: -4,
                boxShadow: '0 10px 30px -10px rgba(245,158,11,0.15)',
                borderColor: 'rgba(245,158,11,0.4)',
              }}
              className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-colors"
              onClick={() => setSelectedTech(tech)}
            >
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                      {tech.avatar}
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0a1a] ${getStatusColor(
                        tech.status
                      )}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold group-hover:text-amber-400 transition-colors">{tech.name}</h3>
                    <p className="text-xs text-slate-400">{tech.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white">{tech.rating || '—'}</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {tech.specs.map((spec: string) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Active Jobs
                    </span>
                    <span className="text-white font-medium">
                      {tech.workload.current} / {tech.workload.max}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getWorkloadColor(tech.workload.current, tech.workload.max)}`}
                      style={{
                        width: `${Math.min(100, (tech.workload.current / tech.workload.max) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shopId={shopId}
      />
    </div>
  );
}
