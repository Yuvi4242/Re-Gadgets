import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I am GadgetFix AI. How can I assist you with your devices today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI typing delay
    setTimeout(() => {
      const responses = [
        "I can certainly help with that! Let me check the knowledge base for your device.",
        "Based on what you've described, it sounds like a battery degradation issue. We can replace that within 1 hour.",
        "Your order REP-9284 is currently in the 'In Progress' phase. The technician is running diagnostics.",
        "I recommend backing up your data to iCloud before bringing the device in."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-brandPurple to-cyan-500 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center justify-center text-white z-50 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-6 h-6 absolute animate-[pulse_2s_infinite]" />
            <MessageSquare className="w-5 h-5 absolute z-10 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-brandPurple/20 to-cyan-500/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brandPurple/20 rounded-lg text-cyan-400 border border-brandPurple/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">GadgetFix AI</h3>
                  <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user' 
                    ? 'bg-brandPurple text-white rounded-br-sm' 
                    : 'bg-white/10 text-slate-200 border border-white/5 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 text-slate-400 flex items-center gap-1.5">
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0,-3,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/40">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your repair..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brandPurple transition-colors shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1 w-8 h-8 flex items-center justify-center bg-brandPurple text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brandPurple/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </form>
            </div>
            
            {/* Disclaimer */}
            <div className="py-1 text-center bg-black/60">
              <span className="text-[9px] text-slate-500">AI can make mistakes. Verify important info.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
