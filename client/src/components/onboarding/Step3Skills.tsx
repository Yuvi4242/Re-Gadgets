import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Tablet, Gamepad2, Watch, Monitor, Tv, Cpu, Wrench } from 'lucide-react';

export default function Step3Skills({ formData, update }: any) {
  const devices = formData.devices || [];
  const skills = formData.skills || [];
  const tools = formData.tools || [];

  const toggleList = (list: string[], val: string, key: string) => {
    if (list.includes(val)) update({ [key]: list.filter(v => v !== val) });
    else update({ [key]: [...list, val] });
  };

  const DEVICE_TYPES = [
    { name: 'Smartphones', icon: Smartphone }, { name: 'Laptops', icon: Laptop },
    { name: 'Tablets', icon: Tablet }, { name: 'Gaming Consoles', icon: Gamepad2 },
    { name: 'Smartwatches', icon: Watch }, { name: 'Desktop PCs', icon: Monitor },
    { name: 'TVs & Monitors', icon: Tv }, { name: 'Other Electronics', icon: Cpu }
  ];

  const REPAIR_SKILLS = [
    'Screen Replacement', 'Battery Service', 'Motherboard Repair', 'Water Damage',
    'Camera Module', 'Charging Port', 'Speaker/Mic', 'Software Debugging',
    'Data Recovery', 'Micro-Soldering', 'Back Glass', 'Thermal Paste'
  ];

  const COMMON_TOOLS = [
    'Soldering Iron', 'Multimeter', 'Heat Gun', 'Microscope', 
    'DC Power Supply', 'iFixit Pro Tech Toolkit', 'Screen Separator'
  ];

  return (
    <div className="w-full bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="mb-8 shrink-0">
         <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
         <p className="text-slate-400 mt-1">What can you fix? Select your specialties and capabilities.</p>
      </div>

      <div className="space-y-8">
         {/* Device Types */}
         <section>
            <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4"/> Supported Devices
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DEVICE_TYPES.map(device => {
                 const isSel = devices.includes(device.name);
                 const Icon = device.icon;
                 return (
                   <motion.button
                     key={device.name}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.96 }}
                     onClick={() => toggleList(devices, device.name, 'devices')}
                     className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border ${
                       isSel ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-cyan-400' 
                             : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5'
                     }`}
                   >
                     <Icon className={`w-8 h-8 ${isSel ? 'text-cyan-400' : 'text-slate-500'}`} />
                     <span className="text-xs font-semibold text-center">{device.name}</span>
                   </motion.button>
                 )
              })}
            </div>
         </section>

         {/* Repair Skills */}
         <section>
            <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4"/> Hardware & Software Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {REPAIR_SKILLS.map(skill => {
                 const isSel = skills.includes(skill);
                 return (
                   <motion.button
                     key={skill}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => toggleList(skills, skill, 'skills')}
                     className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                       isSel ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                             : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                     }`}
                   >
                     {skill}
                   </motion.button>
                 )
              })}
            </div>
         </section>

         {/* Experience Slider + Tools */}
         <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/20 p-6 rounded-2xl border border-white/5">
            <div>
               <h3 className="text-sm font-bold text-white mb-4">Years of Professional Experience</h3>
               <div className="flex items-center gap-4">
                 <input 
                   type="range" min="0" max="20" step="1" 
                   className="flex-1 accent-cyan-500 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
                   value={formData.experienceYears || 0}
                   onChange={(e) => update({experienceYears: parseInt(e.target.value)})}
                 />
                 <div className="w-16 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center font-bold text-cyan-400 text-lg">
                   {formData.experienceYears === 20 ? '20+' : formData.experienceYears}
                 </div>
               </div>
            </div>

            <div>
               <h3 className="text-sm font-bold text-white mb-4">Tools I Own / Operate</h3>
               <div className="flex flex-wrap gap-2">
                 {COMMON_TOOLS.map(tool => {
                   const isSel = tools.includes(tool);
                   return (
                     <button
                       key={tool}
                       onClick={() => toggleList(tools, tool, 'tools')}
                       className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                         isSel ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                               : 'bg-black/60 border-white/10 text-slate-500 hover:text-slate-300'
                       }`}
                     >
                       {tool}
                     </button>
                   )
                 })}
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
