import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Cpu, Zap, Search, AlertCircle, ArrowRight, Loader2, Image as ImageIcon, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIDiagnostics = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file && !description) return;
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        likelyCause: 'Screen OLED Panel Failure & Digitizer Damage',
        confidence: '94%',
        urgency: 'High (Immediate fix recommended)',
        costRange: '$120 - $180',
        timeEstimate: '45 mins',
        summary: 'Based on the provided details, your device shows classic signs of deep panel damage. The outer glass may be intact, but the underlying OLED layer is compromised.',
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative isolate">
      {/* Background glow orb */}
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[oklch(0.65_0.19_35/0.1)] blur-[150px] -z-10 rounded-full pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[oklch(0.65_0.19_35/0.1)] border border-[oklch(0.65_0.19_35/0.2)] text-[oklch(0.65_0.19_35)] font-bold text-xs uppercase tracking-wider mb-4 shadow-[0_0_15px_oklch(0.65_0.19_35/0.2)]">
          <Cpu className="w-4 h-4" />
          AI-Powered Diagnosis
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[oklch(0.96_0.005_260)] tracking-tight">What's wrong with your device?</h1>
        <p className="text-[oklch(0.65_0.01_260)] font-medium mt-3 text-lg max-w-2xl mx-auto">Upload a photo of the damage or describe the issue. Our AI will instantly analyze the problem and estimate the repair cost.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-[oklch(0.12_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-3xl p-6 shadow-2xl relative"
        >
           <h3 className="text-lg font-bold text-[oklch(0.96_0.005_260)] mb-4 flex items-center gap-2">
             <Search className="w-5 h-5 text-[oklch(0.65_0.19_35)]" /> Describe the Issue
           </h3>
           
           <div className="space-y-6">
             <div>
                <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Upload Photo (Optional)</label>
                <div className="border-2 border-dashed border-[oklch(0.28_0.008_260/0.8)] rounded-2xl p-8 text-center hover:bg-[oklch(0.18_0.006_260/0.5)] transition-colors cursor-pointer relative">
                   <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                   {file ? (
                     <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-[oklch(0.65_0.19_35)]" />
                        <p className="text-sm font-bold text-white">{file.name}</p>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center gap-2 text-[oklch(0.65_0.01_260)]">
                        <Camera className="w-8 h-8 mb-1 opacity-50" />
                        <p className="text-sm font-medium">Click or drag image to upload</p>
                        <p className="text-xs opacity-70">JPG, PNG up to 5MB</p>
                     </div>
                   )}
                </div>
             </div>

             <div>
                <label className="block text-sm font-semibold text-[oklch(0.65_0.01_260)] mb-2">Issue Description</label>
                <textarea 
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="E.g., My screen is completely black but I can still hear notifications..."
                   className="w-full bg-[oklch(0.18_0.006_260/0.4)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-4 text-[oklch(0.96_0.005_260)] placeholder:text-[oklch(0.65_0.01_260)] focus:outline-none focus:border-[oklch(0.65_0.19_35/0.8)] focus:ring-1 focus:ring-[oklch(0.65_0.19_35)] transition-all resize-none h-32"
                ></textarea>
             </div>

             <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!file && !description)}
                className="w-full bg-[oklch(0.65_0.19_35)] hover:bg-[oklch(0.65_0.19_35/0.8)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
             >
                {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                {isAnalyzing ? 'Analyzing with AI...' : 'Run Diagnostics'}
             </button>
           </div>
        </motion.div>

        {/* Result Area */}
        <div className="h-full">
           <AnimatePresence mode="wait">
              {isAnalyzing && (
                 <motion.div 
                   key="loading"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="h-full border border-[oklch(0.28_0.008_260/0.3)] bg-[oklch(0.14_0.005_260/0.5)] rounded-3xl flex flex-col items-center justify-center p-8 text-center border-dashed"
                 >
                    <div className="w-16 h-16 rounded-2xl bg-[oklch(0.65_0.19_35/0.1)] border border-[oklch(0.65_0.19_35/0.3)] flex items-center justify-center mb-6 relative">
                       <Cpu className="w-8 h-8 text-[oklch(0.65_0.19_35)] animate-pulse" />
                       <div className="absolute inset-0 border-2 border-[oklch(0.65_0.19_35)] border-t-transparent rounded-2xl animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Analyzing Data</h3>
                    <p className="text-[oklch(0.65_0.01_260)] text-sm">Our AI is cross-referencing thousands of repair logs...</p>
                 </motion.div>
              )}

              {!isAnalyzing && result && (
                 <motion.div 
                   key="result"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-gradient-to-br from-[oklch(0.18_0.006_260)] to-[oklch(0.12_0.005_260)] border border-[oklch(0.65_0.19_35/0.3)] rounded-3xl p-6 shadow-2xl relative overflow-hidden h-full flex flex-col"
                 >
                    {/* Top Accent */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-[oklch(0.65_0.19_35)] shadow-[0_0_15px_oklch(0.65_0.19_35)]"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                       <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[oklch(0.65_0.19_35/0.1)] text-[oklch(0.65_0.19_35)] text-xs font-bold border border-[oklch(0.65_0.19_35/0.2)]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Diagnosis Complete
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] text-[oklch(0.65_0.01_260)] uppercase tracking-wider font-bold">AI Confidence</p>
                          <p className="text-emerald-400 font-extrabold text-lg">{result.confidence}</p>
                       </div>
                    </div>

                    <div className="mb-6">
                       <p className="text-sm text-[oklch(0.65_0.01_260)] font-semibold uppercase tracking-wider mb-1">Likely Cause</p>
                       <h2 className="text-2xl font-black text-white leading-tight">{result.likelyCause}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-[oklch(0.14_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3">
                          <p className="text-xs text-[oklch(0.65_0.01_260)] font-semibold uppercase mb-1">Est. Cost</p>
                          <p className="text-xl font-bold text-white">{result.costRange}</p>
                       </div>
                       <div className="bg-[oklch(0.14_0.005_260)] border border-[oklch(0.28_0.008_260/0.5)] rounded-xl p-3">
                          <p className="text-xs text-[oklch(0.65_0.01_260)] font-semibold uppercase mb-1">Turnaround</p>
                          <p className="text-xl font-bold text-white">{result.timeEstimate}</p>
                       </div>
                    </div>

                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3 mb-8">
                       <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                       <div>
                          <p className="text-sm font-bold text-rose-400 mb-1">Urgency: {result.urgency}</p>
                          <p className="text-xs text-[oklch(0.65_0.01_260)] leading-relaxed">{result.summary}</p>
                       </div>
                    </div>

                    <div className="mt-auto pt-4 flex gap-3">
                       <Link to="/book" className="flex-1 bg-[oklch(0.65_0.19_35)] hover:bg-[oklch(0.65_0.19_35/0.8)] text-white text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                          Book Repair Now <ArrowRight className="w-4 h-4" />
                       </Link>
                    </div>
                 </motion.div>
              )}

              {!isAnalyzing && !result && (
                 <div className="h-full border border-[oklch(0.28_0.008_260/0.3)] bg-[oklch(0.14_0.005_260/0.3)] rounded-3xl flex flex-col items-center justify-center p-8 text-center border-dashed">
                    <div className="w-16 h-16 rounded-full bg-[oklch(0.18_0.006_260)] border border-[oklch(0.28_0.008_260/0.5)] flex items-center justify-center mb-4">
                       <Cpu className="w-6 h-6 text-[oklch(0.65_0.01_260)]" />
                    </div>
                    <p className="text-[oklch(0.65_0.01_260)] font-medium max-w-[200px]">Upload details on the left to get an instant AI diagnosis.</p>
                 </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIDiagnostics;
