import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export default function Step4Experience({ formData, update }: any) {
  const workplaces = formData.workplaces || [];

  const addJob = () => {
    update({ workplaces: [...workplaces, { id: Date.now(), company: '', role: '', start: '', end: '', current: false, resp: '' }] });
  };

  const updateJob = (id: number, field: string, value: any) => {
    update({ workplaces: workplaces.map((w: any) => w.id === id ? { ...w, [field]: value } : w) });
  };

  const removeJob = (id: number) => {
    update({ workplaces: workplaces.filter((w: any) => w.id !== id) });
  };

  return (
    <div className="w-full bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="mb-8 shrink-0 flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-bold text-white">Work Experience</h2>
           <p className="text-slate-400 mt-1">List your previous roles in electronics repair or IT support.</p>
         </div>
         <button onClick={addJob} className="flex items-center gap-2 text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
           <Plus className="w-4 h-4" /> Add Experience
         </button>
      </div>

      <div className="space-y-6">
         <AnimatePresence>
           {workplaces.length === 0 && (
             <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-16 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center">
               <Briefcase className="w-12 h-12 text-slate-600 mb-4" />
               <h3 className="text-white font-bold mb-1">No Experience Listed</h3>
               <p className="text-slate-500 text-sm mb-4">Are you self-taught or a freelancer? You can still add your independent work!</p>
               <button onClick={addJob} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">Add an entry manually</button>
             </motion.div>
           )}
           
           {workplaces.map((job: any) => (
             <motion.div 
               key={job.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-black/40 border border-white/10 rounded-2xl p-6 relative group"
             >
               <button onClick={() => removeJob(job.id)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                 <Trash2 className="w-5 h-5" />
               </button>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pr-12">
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-400 ml-1">Company / Shop Name</label>
                   <input className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none transition-all" value={job.company} onChange={(e) => updateJob(job.id, 'company', e.target.value)} placeholder="e.g. uBreakiFix" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-400 ml-1">Job Title / Role</label>
                   <input className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none transition-all" value={job.role} onChange={(e) => updateJob(job.id, 'role', e.target.value)} placeholder="e.g. Lead Level 3 Technician" />
                 </div>

                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-400 ml-1">Start Date</label>
                   <input type="month" className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none transition-all" value={job.start} onChange={(e) => updateJob(job.id, 'start', e.target.value)} style={{colorScheme:'dark'}} />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-400 ml-1 flex justify-between">End Date <label className="flex items-center gap-1.5 cursor-pointer text-cyan-400"><input type="checkbox" checked={job.current} onChange={(e) => updateJob(job.id, 'current', e.target.checked)} className="accent-cyan-500" /> Current</label></label>
                   <input type="month" disabled={job.current} className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none transition-all disabled:opacity-50" value={job.end} onChange={(e) => updateJob(job.id, 'end', e.target.value)} style={{colorScheme:'dark'}} />
                 </div>

                 <div className="md:col-span-2 space-y-1">
                   <label className="text-xs font-semibold text-slate-400 ml-1">Key Responsibilities & Achievements</label>
                   <textarea className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3 outline-none transition-all resize-none h-24" value={job.resp} onChange={(e) => updateJob(job.id, 'resp', e.target.value)} placeholder="• Repaired average 15 devices per day..."></textarea>
                 </div>
               </div>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>
    </div>
  );
}
