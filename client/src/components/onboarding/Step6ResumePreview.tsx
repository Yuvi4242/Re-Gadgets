import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Sparkles } from 'lucide-react';
// We will use native print method instead of jspdf/html2canvas due to environment lock
import ResumeCard from './ResumeCard';

export default function Step6ResumePreview({ formData, submit }: any) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const downloadPDF = async () => {
    window.print();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    submit(); // Resolves after artificial timeout in parent
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* Resume Card Display */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative min-h-[500px]">
        {/* We wrap it in a slightly smaller container for the UI, but it renders full res for PDF */}
        <div ref={resumeRef} className="bg-[#0a0a1a] p-4 lg:p-8 border border-white/10 rounded-2xl shadow-2xl">
           <ResumeCard formData={formData} />
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0 z-20">
         <div className="bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">Ready to Launch <Sparkles className="w-5 h-5 text-cyan-400" /></h3>
            <p className="text-slate-400 text-sm mb-8">Review your auto-generated technician profile. You can download a copy for your records before finalizing.</p>
            
            <div className="space-y-4 mt-auto">
               <button 
                 onClick={downloadPDF}
                 disabled={isDownloading || isSubmitting}
                 className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
               >
                 {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                 Download PDF
               </button>

               <button 
                 onClick={handleSubmit}
                 disabled={isSubmitting}
                 className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all group overflow-hidden relative"
               >
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                 {isSubmitting ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" /> Provisioning Dashboard...
                   </>
                 ) : (
                   'Submit & Enter Dashboard'
                 )}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
