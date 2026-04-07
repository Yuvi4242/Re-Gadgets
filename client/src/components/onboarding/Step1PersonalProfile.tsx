import React from 'react';
import { Camera, Phone, MapPin, AlignLeft, Globe } from 'lucide-react';

export default function Step1PersonalProfile({ formData, update }: any) {
  const toggleLang = (lang: string) => {
    const list = formData.languages || [];
    if (list.includes(lang)) {
      update({ languages: list.filter((l: string) => l !== lang) });
    } else {
      update({ languages: [...list, lang] });
    }
  };

  return (
    <div className="w-full bg-[#0a0a1a]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-10 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Personal Profile</h2>
        <p className="text-slate-400 mt-1">Let's start with the basics so shop owners know who you are.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Photo Upload Area */}
        <div className="md:col-span-4 flex flex-col items-center gap-4">
           <div className="w-40 h-40 rounded-3xl border-2 border-dashed border-cyan-500/50 bg-cyan-500/5 flex flex-col items-center justify-center text-cyan-500 cursor-pointer hover:bg-cyan-500/10 transition-colors group relative overflow-hidden">
              <Camera className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Upload Photo</span>
              {/* Optional mocked preview here */}
           </div>
           <p className="text-[10px] text-slate-500 text-center px-4">Clear frontal photos increase your hire rate by 60%.</p>
        </div>

        {/* Inputs */}
        <div className="md:col-span-8 space-y-5">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1">Full Name</label>
               <input 
                 className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 p-3.5 outline-none transition-all" 
                 value={formData.fullName || ''}
                 onChange={(e) => update({ fullName: e.target.value })}
                 placeholder="e.g. Alex Johnson"
               />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Phone Number</label>
               <div className="flex bg-black/40 border border-white/10 rounded-xl focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-all overflow-hidden">
                 <span className="flex items-center px-3 bg-white/5 text-slate-400 border-r border-white/10 text-sm">+1</span>
                 <input 
                   className="flex-1 bg-transparent text-white p-3.5 outline-none" 
                   value={formData.phone || ''}
                   onChange={(e) => update({ phone: e.target.value })}
                   placeholder="(555) 000-0000"
                 />
               </div>
             </div>

             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> City / Location</label>
               <input 
                 className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 p-3.5 outline-none transition-all" 
                 value={formData.city || ''}
                 onChange={(e) => update({ city: e.target.value })}
                 placeholder="e.g. New York, NY"
               />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-semibold text-slate-400 ml-1">Gender (Optional)</label>
               <select className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-cyan-500 p-3.5 outline-none transition-all appearance-none">
                 <option>Prefer not to say</option><option>Male</option><option>Female</option><option>Other</option>
               </select>
             </div>
           </div>

           <div className="space-y-1">
             <div className="flex justify-between">
               <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-1"><AlignLeft className="w-3 h-3"/> Professional Bio</label>
               <span className="text-xs text-cyan-500">{(formData.bio || '').length}/200</span>
             </div>
             <textarea 
               className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 p-3.5 outline-none transition-all resize-none h-24 text-sm" 
               value={formData.bio || ''}
               onChange={(e) => update({ bio: e.target.value.substring(0, 200) })}
               placeholder="Briefly describe your passion for electronics repair..."
             />
           </div>

           <div className="space-y-2">
             <label className="text-xs font-semibold text-slate-400 ml-1 flex items-center gap-1"><Globe className="w-3 h-3"/> Languages Spoken</label>
             <div className="flex flex-wrap gap-2">
               {['English', 'Spanish', 'Hindi', 'Mandarin', 'French', 'Arabic'].map(lang => {
                 const isSel = (formData.languages || []).includes(lang);
                 return (
                   <button 
                     key={lang}
                     onClick={() => toggleLang(lang)}
                     className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                       isSel 
                         ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                         : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                     }`}
                   >
                     {lang}
                   </button>
                 );
               })}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
