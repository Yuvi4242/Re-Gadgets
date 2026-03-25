import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isAI = message.sender === 'ai';

  // Typing Indicator Variant
  if (message.isTyping) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex w-full justify-start mb-4 pr-12"
      >
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.3)] border border-white/10">
            <Settings className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gradient-to-br from-brandBlue/20 to-brandPurple/20 border border-brandBlue/30 shadow-[0_5px_15px_rgba(0,0,0,0.2)] flex gap-1.5 items-center justify-center h-[46px]">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0 }} className="w-2 h-2 rounded-full bg-cyan-400"></motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }} className="w-2 h-2 rounded-full bg-brandBlue"></motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }} className="w-2 h-2 rounded-full bg-brandPurple"></motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: isAI ? -30 : 30, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      className={`flex w-full mb-4 ${isAI ? 'justify-start pr-8' : 'justify-end pl-8'}`}
    >
      <div className={`flex items-end gap-2 max-w-[90%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
          isAI 
            ? 'bg-gradient-to-br from-brandBlue to-brandPurple shadow-[0_0_15px_rgba(79,70,229,0.3)] border-white/10' 
            : 'bg-[#121c33] border-white/10 shadow-inner'
        }`}>
          {isAI ? <Settings className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-400" />}
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-1 w-full relative group">
          <div className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isAI
              ? 'rounded-2xl rounded-bl-sm bg-gradient-to-br from-brandBlue/20 to-brandPurple/20 border border-brandBlue/30 shadow-[0_5px_15px_rgba(0,0,0,0.2)] text-slate-200'
              : 'rounded-2xl rounded-br-sm bg-white/10 border border-white/5 shadow-inner text-white'
          }`}>
            <div>
               {message.text}
               
               {/* Action Context Injections */}
               {message.actionContext && (
                  <div className="mt-4 border-t border-white/10 pt-3 flex flex-wrap gap-2">
                     {message.actionContext === 'BOOK_REPAIR' && (
                        <button className="flex-1 min-w-[120px] bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-[11px] py-2 px-3 rounded-lg shadow-[0_5px_15px_rgba(52,211,153,0.4)] hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] hover:scale-[1.02] transition-all">
                          Book a Repair Now 🚀
                        </button>
                     )}
                     {message.actionContext === 'TRACK_ORDER' && (
                        <button className="flex-1 min-w-[120px] bg-gradient-to-r from-brandPurple to-brandBlue text-white font-bold text-[11px] py-2 px-3 rounded-lg shadow-[0_5px_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all">
                          Track Active Order 📦
                        </button>
                     )}
                     {message.actionContext === 'CHECK_PRICE' && (
                        <button className="flex-1 min-w-[120px] bg-white/10 text-white font-bold text-[11px] py-2 px-3 rounded-lg border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all">
                          View Pricing 💰
                        </button>
                     )}
                  </div>
               )}
            </div>
          </div>

          {/* Timestamp */}
          <span className={`text-[10px] font-medium text-slate-500 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isAI ? 'left-2' : 'right-2'}`}>
            {message.time || 'Just now'}
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default MessageBubble;
