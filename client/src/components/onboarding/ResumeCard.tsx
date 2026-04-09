import React from 'react';
import { Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export default function ResumeCard({ formData }: any) {
  const { 
    fullName, phone, city, bio, languages = [],
    education, field, certs = [],
    devices = [], skills = [],
    workplaces = [], experienceYears = 0
  } = formData;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-slate-800 rounded-xl overflow-hidden font-sans border border-slate-200" style={{ minHeight: '800px' }}>
       {/* Header Strip */}
       <div className="bg-slate-900 text-white px-8 py-10 flex gap-6 items-center">
         <div className="w-24 h-24 rounded-full bg-cyan-600 flex items-center justify-center text-4xl font-black shadow-lg shrink-0 border-4 border-slate-800">
           {fullName ? fullName.charAt(0).toUpperCase() : 'T'}
         </div>
         <div className="flex-1">
            <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">{fullName || 'Technician Name'}</h1>
            <p className="text-cyan-400 font-semibold tracking-widest text-sm uppercase">Certified Electronics Technician</p>
         </div>
       </div>

       {/* Contact Strip */}
       <div className="bg-cyan-50 border-b border-slate-200 px-8 py-3 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
         {phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +1 {phone}</span>}
         <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> technician@example.com</span>
         {city && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {city}</span>}
         {languages.length > 0 && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {languages.join(' • ')}</span>}
       </div>

       <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
         {/* Left Column (Main content) */}
         <div className="md:col-span-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-cyan-500 pb-1 mb-3">Professional Summary</h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {bio || "A dedicated hardware technician passionate about restoring electronics. Focused on delivering high-quality, efficient repairs and ensuring an excellent customer experience."}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-cyan-500 pb-1 mb-4">Work Experience</h2>
              <div className="space-y-5">
                {workplaces.length > 0 ? workplaces.map((job: any) => (
                  <div key={job.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="absolute w-2.5 h-2.5 bg-cyan-500 rounded-full -left-[1.3px] top-1.5 -translate-x-1/2"></div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800 leading-tight">{job.role || 'Technician'}</h3>
                      <span className="text-xs font-bold text-slate-500 whitespace-nowrap ml-4">
                        {job.start || 'Start'} – {job.current ? 'Present' : (job.end || 'End')}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-cyan-600 mb-2">{job.company || 'Company Name'}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{job.resp || 'Handled diagnosis, repair, and QA for varied consumer electronics.'}</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 italic">No formal experience added.</p>
                )}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-cyan-500 pb-1 mb-4">Education</h2>
              {(education || field) ? (
                 <div>
                   <h3 className="font-bold text-slate-800">{education || 'Degree'} <span className="text-slate-500 font-normal">in {field}</span></h3>
                 </div>
              ) : (
                 <p className="text-sm text-slate-400 italic">No formal education listed.</p>
              )}
            </section>
         </div>

         {/* Right Column (Sidebar) */}
         <div className="md:col-span-4 space-y-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
            {/* Core Skills */}
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b-2 border-cyan-500 pb-1 mb-3">Core Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.length > 0 ? skills.map((skill: string) => (
                  <span key={skill} className="px-2 py-1 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded shadow-sm">{skill}</span>
                )) : (
                   <span className="text-xs text-slate-400 italic">No skills selected</span>
                )}
              </div>
            </section>

            {/* Devices */}
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b-2 border-cyan-500 pb-1 mb-3">Supported Devices</h2>
              <ul className="text-xs space-y-2 text-slate-700 font-medium">
                {devices.length > 0 ? devices.map((d: string) => (
                  <li key={d} className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-500"/> {d}</li>
                )) : (
                  <li className="text-slate-400 italic">No devices selected</li>
                )}
              </ul>
            </section>

            {/* Details */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
               <div>
                  <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-1">Experience Level</h3>
                  <p className="text-sm font-black text-slate-800">{experienceYears}+ Years</p>
               </div>
               {certs.length > 0 && (
                 <div>
                    <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-2">Certifications</h3>
                    <div className="space-y-3 mt-1">
                      {certs.map((c: any) => (
                         <div key={c.id}>
                           <p className="text-xs font-bold text-slate-800">{c.name}</p>
                           <p className="text-[10px] text-cyan-600 font-semibold">{c.org} • {c.year}</p>
                         </div>
                      ))}
                    </div>
                 </div>
               )}
            </section>
         </div>
       </div>
    </div>
  );
}
