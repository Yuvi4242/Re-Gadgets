import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Edit3, ShieldCheck, Star, Share2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import ResumeCard from '../onboarding/ResumeCard';
import { useAuth } from '../../context/AuthContext';

export default function ProfileResumePanel() {
  const { user } = useAuth();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('resume'); // resume | edit
  const [isPublic, setIsPublic] = useState(true);
  
  // Try loading draft from local storage to mock the user's data
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('techOnboardingDraft');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
       fullName: user?.name || user?.displayName || 'Alex Johnson',
       city: 'Los Angeles, CA', bio: 'Certified hardware specialist with 10 years of experience.', phone: '555-0192', languages: ['English', 'Spanish'],
       education: 'Bachelor Date', field: 'Electrical Engineering', certs: [{id:1, name:'Apple ACMT', org:'Apple', year:'2022'}],
       devices: ['Smartphones', 'Laptops'], skills: ['Screen Replacement', 'Micro-Soldering'], tools: ['Microscope'], experienceYears: 10,
       workplaces: [{id:1, company:'uBreakiFix', role:'Lead Tech', start:'2020-01', end:'', current:true, resp:'Managed repairs.'}], days: ['Mon','Tue','Wed'], startTime: '09:00', endTime: '17:00'
    };
  });

  const downloadPDF = async () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
         <div>
           <h1 className="text-2xl font-bold text-white mb-2 leading-tight">My Profile & Resume</h1>
           <p className="text-slate-400 text-sm">Manage your professional presence and update your skills.</p>
         </div>

         <div className="flex gap-3">
           <button 
             onClick={() => setActiveTab('resume')}
             className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'resume' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'}`}
           >
             View Resume
           </button>
           <button 
             onClick={() => setActiveTab('edit')}
             className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'}`}
           >
             Edit Profile
           </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === 'resume' ? (
                <motion.div key="resume" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                   <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-8 overflow-y-auto min-h-[600px] no-scrollbar">
                     <div ref={resumeRef}>
                        <ResumeCard formData={formData} />
                     </div>
                   </div>
                </motion.div>
              ) : (
                <motion.div key="edit" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                   <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[600px]">
                      <h2 className="text-lg font-bold text-white mb-6">Profile Settings</h2>
                      
                      {/* Accordion mockup */}
                      <div className="space-y-4">
                         {['Personal Details', 'Technical Skills', 'Experience & Education', 'Availability'].map(section => (
                           <div key={section} className="border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
                                 <span className="font-bold text-slate-200">{section}</span>
                                 <ChevronDown className="w-5 h-5 text-slate-500" />
                              </div>
                           </div>
                         ))}
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">Save Changes</button>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>

         {/* Sidebar Metas */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
               
               <h3 className="font-bold text-white mb-6">Profile Strength</h3>
               
               <div className="flex items-end justify-between mb-2">
                 <span className="text-3xl font-black text-white">100<span className="text-lg text-slate-500">%</span></span>
                 <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">All-Star</span>
               </div>
               
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                  <motion.div initial={{width:0}} animate={{width:'100%'}} className="h-full bg-cyan-500 rounded-full" />
               </div>

               <div className="space-y-3 pt-4 border-t border-white/10">
                 <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   <div>
                     <p className="text-sm font-bold text-white">ID Verified</p>
                     <p className="text-[10px] text-slate-400">Identity verified by Persona</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <Star className="w-5 h-5 text-amber-500" />
                   <div>
                     <p className="text-sm font-bold text-white">Top Rated Technician</p>
                     <p className="text-[10px] text-slate-400">Achieved 4.8+ avg rating</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
               <h3 className="font-bold text-white mb-4">Export & Sharing</h3>
               <div className="space-y-4">
                  <button onClick={downloadPDF} disabled={isDownloading} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Download PDF
                  </button>
                  
                  <div className="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded-xl">
                     <div className="flex items-center gap-2">
                       <Share2 className="w-4 h-4 text-cyan-400" />
                       <span className="text-sm font-bold text-slate-300">Public Link</span>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="sr-only peer" />
                       <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
