import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceInput = ({ onSendMessage, onRecordingStateChange }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (onRecordingStateChange) {
      onRecordingStateChange(isRecording || isProcessing);
    }
  }, [isRecording, isProcessing, onRecordingStateChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleMicClick = () => {
    if (isProcessing) return;
    
    if (isRecording) {
      // Stop recording and process
      setIsRecording(false);
      setIsProcessing(true);
      // Simulate Voice Processing Delay
      setTimeout(() => {
        setIsProcessing(false);
        onSendMessage("My phone screen is broken and needs repair.");
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="p-4 border-t border-white/10 bg-[#0b1326]/90 backdrop-blur-2xl relative z-20">
      
      {/* Listening/Processing Overlay */}
      <AnimatePresence>
         {(isRecording || isProcessing) && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 10 }}
             className="absolute bottom-full left-0 w-full p-3 bg-gradient-to-t from-[#0b1326] flex items-center justify-center gap-3 pb-6 pointer-events-none"
           >
             {isProcessing ? (
               <>
                 <Loader2 className="w-5 h-5 text-brandBlue animate-spin" />
                 <span className="text-xs font-bold text-brandBlue animate-pulse">Understanding request...</span>
               </>
             ) : (
               <>
                 {/* Simulated Waveform */}
                 <div className="flex items-center gap-1 h-6">
                   {[...Array(5)].map((_, i) => (
                     <motion.div 
                       key={i}
                       animate={{ height: ['20%', '100%', '20%'] }}
                       transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1, ease: 'easeInOut' }}
                       className="w-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                     />
                   ))}
                 </div>
                 <span className="text-xs font-bold text-emerald-400 animate-pulse">Listening...</span>
               </>
             )}
           </motion.div>
         )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
        {/* Glow behind input */}
        <div className="absolute inset-0 bg-brandBlue/10 blur-xl rounded-full z-0 pointer-events-none"></div>

        <div className="relative flex-1 z-10 flex items-center bg-[#121c33] rounded-full border border-white/10 focus-within:border-brandBlue/50 focus-within:shadow-[0_0_15px_rgba(79,70,229,0.2)] transition-all overflow-hidden p-1 pr-3">
          
          <input 
            ref={inputRef}
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isRecording || isProcessing}
            placeholder={isRecording ? "Listening..." : "Ask me anything..."}
            className="flex-1 bg-transparent text-sm text-white px-4 py-2.5 outline-none placeholder:text-slate-500 disabled:opacity-50"
          />

          <AnimatePresence>
            {inputText.trim() && (
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                type="submit"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-brandBlue to-brandPurple flex items-center justify-center text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button: Voice Trigger when no text, else hidden (handled by flex gap) */}
        {!inputText.trim() && (
          <button 
            type="button"
            onClick={handleMicClick}
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 relative ${
              isRecording 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                : 'bg-[#121c33] text-slate-400 border border-white/10 hover:border-brandPurple hover:text-brandPurple hover:bg-brandPurple/10'
            }`}
          >
            {/* Infinite Sonar expanding rings when recording */}
            {isRecording && (
              <>
                <motion.div 
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 2.5, 3.5], opacity: [0.8, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/80 pointer-events-none"
                />
                <motion.div 
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 2.5, 3.5], opacity: [0.8, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.6 }}
                  className="absolute inset-0 rounded-full border border-emerald-500/50 pointer-events-none"
                />
                <motion.div 
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 2.5, 3.5], opacity: [0.8, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 1.2 }}
                  className="absolute inset-0 rounded-full border border-emerald-500/30 pointer-events-none"
                />
              </>
            )}
            <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
          </button>
        )}
      </form>
    </div>
  );
};

export default VoiceInput;
