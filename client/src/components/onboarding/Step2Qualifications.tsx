import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Award, Upload } from 'lucide-react';

export default function Step2Qualifications({ formData, update }: any) {
  const certs = formData.certs || [];

  const addCert = () => {
    update({ certs: [...certs, { id: Date.now(), name: '', org: '', year: '' }] });
  };

  const updateCert = (id: number, field: string, value: string) => {
    update({ certs: certs.map((c: any) => c.id === id ? { ...c, [field]: value } : c) });
  };

  const removeCert = (id: number) => {
    update({ certs: certs.filter((c: any) => c.id !== id) });
  };

  return (
    <div className="w-full bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="mb-8 shrink-0">
        <h2 className="text-2xl font-bold text-white">Qualifications & Training</h2>
        <p className="text-slate-400 mt-1">Stand out by sharing your formal education and industry certifications.</p>
      </div>

      <div className="space-y-8">
        {/* Education Base */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest border-b border-white/10 pb-2">Highest Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1">Education Level</label>
               <select className="w-full bg-black/60 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3.5 outline-none transition-all appearance-none" value={formData.education} onChange={(e) => update({education: e.target.value})}>
                 <option value="">Select Level...</option>
                 <option>High School Diploma</option>
                 <option>Associate Degree</option>
                 <option>Bachelor's Degree</option>
                 <option>Trade School / Vocational</option>
               </select>
             </div>
             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1">Field of Study</label>
               <input 
                 className="w-full bg-black/60 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3.5 outline-none transition-all" 
                 placeholder="e.g. Electronics Engineering"
                 value={formData.field || ''}
                 onChange={(e) => update({field: e.target.value})}
               />
             </div>
          </div>
        </section>

        {/* Certifications Dynamic List */}
        <section>
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2"><Award className="w-4 h-4"/> Certifications</h3>
             <button onClick={addCert} className="flex items-center gap-1 text-xs font-bold bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black px-3 py-1.5 rounded-lg transition-colors">
               <Plus className="w-4 h-4" /> Add Certification
             </button>
           </div>

           <div className="space-y-4">
             <AnimatePresence>
               {certs.length === 0 && (
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-6 border-2 border-dashed border-white/10 rounded-xl">
                   <p className="text-slate-500 text-sm">No certifications added yet. (e.g. Apple ACMT, CompTIA A+)</p>
                 </motion.div>
               )}
               {certs.map((c: any) => (
                 <motion.div 
                   key={c.id}
                   initial={{ opacity: 0, height: 0, scale: 0.95 }}
                   animate={{ opacity: 1, height: 'auto', scale: 1 }}
                   exit={{ opacity: 0, height: 0, scale: 0.95 }}
                   className="bg-black/40 border border-white/10 rounded-xl p-5 relative group"
                 >
                   <button onClick={() => removeCert(c.id)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                   <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pr-10">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Certification Name</label>
                        <input className="w-full bg-transparent border-b border-white/10 text-white focus:border-cyan-500 pb-2 outline-none text-sm transition-colors" placeholder="e.g. ITIL Foundation" value={c.name} onChange={(e) => updateCert(c.id, 'name', e.target.value)} />
                      </div>
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Issuing Organization</label>
                        <input className="w-full bg-transparent border-b border-white/10 text-white focus:border-cyan-500 pb-2 outline-none text-sm transition-colors" placeholder="e.g. CompTIA" value={c.org} onChange={(e) => updateCert(c.id, 'org', e.target.value)} />
                      </div>
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-500">Year</label>
                        <input className="w-full bg-transparent border-b border-white/10 text-white focus:border-cyan-500 pb-2 outline-none text-sm transition-colors" placeholder="YYYY" value={c.year} onChange={(e) => updateCert(c.id, 'year', e.target.value)} />
                      </div>
                      <div className="md:col-span-12 mt-2">
                        <button className="flex items-center gap-2 text-xs font-semibold text-cyan-500 hover:text-cyan-400 bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/20 transition-colors w-fit">
                          <Upload className="w-3.5 h-3.5" /> Upload File (Optional)
                        </button>
                      </div>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </section>
      </div>
    </div>
  );
}
