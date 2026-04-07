import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Wrench, Package, BrainCircuit } from 'lucide-react';

export default function QuickDiagnosticTool({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState('');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const performDiagnosis = () => {
    setIsDiagnosing(true);
    // Artficial stream delay mimicking Claude API
    setTimeout(() => {
      setIsDiagnosing(false);
      setResult({
        cause: "The symptoms described typically point to a failing charge port flex cable, commonly caused by lint buildup or liquid damage causing micro-shorts.",
        steps: [
          "Perform visual inspection of the charge port using a microscope.",
          "Use a plastic pick to carefully remove any impacted debris.",
          "Check voltage draw using an ammeter (Should pull >1.0A).",
          "If no draw, proceed with device disassembly and replace the charge port flex module."
        ],
        parts: ["Charge Port Flex Cable (OEM)", "Water Resistance Adhesive Seal"],
        time: "45-60 min",
        difficulty: 3 // Out of 5
      });
    }, 2500);
  };

  return (
    <div className="w-full flex justify-center text-slate-200">
      {!result ? (
        <div className="w-full max-w-xl mx-auto space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex gap-4">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${step >= 1 ? 'bg-cyan-500 text-black' : 'bg-white/10 text-slate-500'}`}>1</div>
               <div className="flex-1">
                 <h3 className="font-bold text-white mb-2">Device Brand & Model</h3>
                 {step === 1 ? (
                   <div className="flex gap-3">
                     <select className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none appearance-none" value={device} onChange={e => setDevice(e.target.value)}>
                        <option value="">Brand...</option>
                        <option>Apple</option>
                        <option>Samsung</option>
                        <option>Google</option>
                     </select>
                     <input type="text" placeholder="Model (e.g. iPhone 13 Pro)" className="flex-2 bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none w-full" value={model} onChange={e => setModel(e.target.value)} />
                     <button disabled={!device || !model} onClick={() => setStep(2)} className="bg-white/10 hover:bg-cyan-500 hover:text-black px-4 rounded-xl font-bold transition-all disabled:opacity-50 text-sm">Next</button>
                   </div>
                 ) : (
                   <p className="text-cyan-400 font-semibold">{device} {model}</p>
                 )}
               </div>
             </div>
          </div>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${step >= 2 ? 'bg-cyan-500 text-black' : 'bg-white/10 text-slate-500'}`}>2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">Symptom / Issue</h3>
                    {step === 2 && !isDiagnosing ? (
                      <div className="space-y-3">
                        <textarea placeholder="Describe the symptom (e.g. 'won't charge when plugged in, but wireless works')..." className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-500 outline-none h-24 resize-none" value={issue} onChange={e => setIssue(e.target.value)} />
                        <button disabled={!issue || issue.length < 5} onClick={performDiagnosis} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                           <BrainCircuit className="w-4 h-4" /> Analyze with AI
                        </button>
                      </div>
                    ) : isDiagnosing ? (
                      <div className="py-8 flex flex-col items-center justify-center text-cyan-400 space-y-4">
                         <div className="relative flex items-center justify-center">
                           <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                           <BrainCircuit className="w-6 h-6 absolute" />
                         </div>
                         <p className="text-sm font-medium animate-pulse">Running diagnostic models...</p>
                      </div>
                    ) : (
                      <p className="text-cyan-400 font-semibold">Diagnosis Complete</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="w-full max-w-2xl bg-[#0a0a1a] border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
          
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2"><Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" /> Diagnostic Results</h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Likely Cause</h4>
              <p className="text-slate-200 text-sm leading-relaxed">{result.cause}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Repair Steps</h4>
              <ul className="space-y-3">
                {result.steps.map((s: string, i: number) => (
                  <motion.li key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i * 0.2}} className="flex gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                    <span className="text-slate-300">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex flex-center gap-1"><Package className="w-3 h-3"/> Required Parts</h4>
                 <div className="space-y-1">
                   {result.parts.map((p:string) => <div key={p} className="text-xs font-semibold text-cyan-400 px-2 py-1 bg-cyan-500/10 rounded">{p}</div>)}
                 </div>
               </div>
               
               <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center flex flex-col justify-center">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Time</h4>
                 <p className="text-xl font-black text-white">{result.time}</p>
               </div>

               <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center flex flex-col justify-center">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Difficulty</h4>
                 <div className="flex justify-center gap-1">
                   {[1,2,3,4,5].map(w => (
                     <Wrench key={w} className={`w-4 h-4 ${w <= result.difficulty ? 'text-amber-500' : 'text-white/10'}`} />
                   ))}
                 </div>
               </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <button className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center justify-center gap-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                Create Job Ticket
              </button>
              <button onClick={() => { setResult(null); setStep(1); }} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors">
                New Diagnostic
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
