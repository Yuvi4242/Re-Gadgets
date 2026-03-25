import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Settings } from 'lucide-react';
import MessageBubble from './MessageBubble';
import VoiceInput from './VoiceInput';
import RobotAssistant from './RobotAssistant';
import { sendChatMessage } from '../../services/aiService';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto Greeting
  useEffect(() => {
    if (messages.length === 0) {
       setMessages([{ id: 1, text: "Hi! I'm the Re-Gadgets AI 🤖. Need help repairing your device or tracking an order?", sender: 'ai' }]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle Speech STT completion wrapper
  const handleVoiceInput = useCallback((transcript) => {
     handleSendMessage(transcript);
  }, []);

  const { isListening, isSpeaking, startListening, stopListening, speak } = useVoiceAssistant(handleVoiceInput);

  const handleSendMessage = async (text) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    // Add user message to UI
    const newUserMessage = { id: Date.now(), text: messageText, sender: 'user' };
    const conversationalContext = [...messages, newUserMessage];
    
    setMessages(conversationalContext);
    setInputText('');
    setIsTyping(true);

    try {
      // Call Backend Gemini AI Engine with fully updated context
      const aiResponse = await sendChatMessage(messageText, conversationalContext);
      
      // Stop typing state
      setIsTyping(false);
      
      const newAIMessage = { 
         id: Date.now() + 1, 
         text: aiResponse.reply, 
         sender: 'ai', 
         actionContext: aiResponse.actionContext 
      };

      setMessages(prev => [...prev, newAIMessage]);

      // If voice was active right before sending this, read it back out loud!
      if (isListening) {
         speak(aiResponse.reply);
      } else {
         // Optionally you can always read it back if they prefer, but let's only read if they recently used mic
         // Actually, let's read it back if it's a direct Voice Input request.
      }

    } catch (error) {
      console.error('[ChatWindow] Fallback UI Error rendering:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Something went wrong, please try again. 🤖💥", sender: 'ai' }]);
    }
  };

  const handleMicClick = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const getRobotState = () => {
     if (isListening) return 'listening';
     if (isTyping) return 'thinking';
     if (isSpeaking) return 'speaking';
     return 'idle';
  };

  return (
    <motion.div
      layoutId="chatbot-modal"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      className="w-[380px] h-[600px] bg-[#0b1326] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(79,70,229,0.3)] border border-brandBlue/30 overflow-hidden flex flex-col relative"
    >
       {/* Cinematic Noise Background */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
       <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-brandBlue/20 via-brandPurple/5 to-transparent pointer-events-none"></div>

       {/* Header */}
       <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0b1326]/50 backdrop-blur-md relative z-10 transition-colors duration-500">
         <div className="flex items-center gap-3">
            <div className={`relative w-12 h-12 rounded-xl bg-[#121c33] flex items-center justify-center border transition-all duration-300 overflow-hidden ${isListening ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]' : 'border-brandBlue/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]'}`}>
               <RobotAssistant state={getRobotState()} size="mini" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-sm tracking-tight">Re-Gadgets AI</h3>
              <p className="text-brandBlue text-xs font-semibold flex items-center gap-1.5 opacity-90">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px_currentColor] ${isListening ? 'bg-emerald-400 text-emerald-400' : isTyping ? 'bg-brandPurple text-brandPurple' : 'bg-green-400 text-green-400'}`}></span>
                {isListening ? 'Listening intensely...' : isTyping ? 'Scanning databases...' : isSpeaking ? 'Speaking...' : 'Online • Smart Assist'}
              </p>
            </div>
         </div>
         <div className="flex items-center gap-2">
           <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors">
             <Settings className="w-4 h-4" />
           </button>
           <button 
             onClick={onClose}
             className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors group"
           >
             <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
           </button>
         </div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-5 pb-8 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          
          <AnimatePresence>
            {messages.map((msg, index) => (
              <MessageBubble key={msg.id} message={msg} delay={index * 0.1} />
            ))}
          </AnimatePresence>

          {isTyping && (
            <MessageBubble message={{ isTyping: true, sender: 'ai' }} delay={0} />
          )}
          
          <div ref={messagesEndRef} />
       </div>

       {/* Quick Actions (Floating above input) */}
       <div className="absolute bottom-20 left-0 w-full px-4 overflow-x-auto whitespace-nowrap hidden-scrollbar">
          <div className="flex gap-2">
             <button onClick={() => handleSendMessage("Suggest a repair solution for broken screen.")} className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-brandBlue/20 hover:border-brandBlue/40 transition-all">
                Screen Repair <ChevronRight className="w-3 h-3" />
             </button>
             <button onClick={() => handleSendMessage("Can I track my order?")} className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-brandPurple/20 hover:border-brandPurple/40 transition-all">
                Track Order <ChevronRight className="w-3 h-3" />
             </button>
             <button onClick={() => handleSendMessage("What are your business timings?")} className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">
                Timings <ChevronRight className="w-3 h-3" />
             </button>
          </div>
       </div>

       {/* Input Area */}
       <VoiceInput 
         inputText={inputText}
         setInputText={setInputText}
         onSendMessage={() => handleSendMessage()}
         isListening={isListening}
         onMicClick={handleMicClick}
       />
    </motion.div>
  );
};

export default ChatWindow;
