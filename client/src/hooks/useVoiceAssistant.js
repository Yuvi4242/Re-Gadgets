import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceAssistant = (onTranscriptComplete) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
     synthRef.current = window.speechSynthesis;

     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-IN'; // Perfect for Hinglish
     } else {
        setBrowserSupported(false);
     }
  }, []);

  const startListening = useCallback(() => {
     if (!recognitionRef.current) return;
     if (synthRef.current) synthRef.current.cancel(); // Interrupt speech

     recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onTranscriptComplete) onTranscriptComplete(transcript);
     };

     recognitionRef.current.onend = () => setIsListening(false);
     recognitionRef.current.onerror = () => setIsListening(false);

     setIsListening(true);
     
     try {
       recognitionRef.current.start();
     } catch (err) {
       console.log('Recognition already started');
     }
  }, [onTranscriptComplete]);

  const stopListening = useCallback(() => {
     if (!recognitionRef.current) return;
     recognitionRef.current.stop();
     setIsListening(false);
  }, []);

  const speak = useCallback((text, onEndCallback) => {
     if (!synthRef.current) return;
     synthRef.current.cancel(); // Stop talking before saying new thing
     
     const utterThis = new SpeechSynthesisUtterance(text);
     
     // Remove emojis before speech, otherwise it sounds weird
     const textWithoutEmojis = text.replace(/[\u1000-\uFFFF]+/g, '');
     utterThis.text = textWithoutEmojis;
     
     // English voice but handles Hinglish okay
     utterThis.lang = 'en-IN'; 
     utterThis.pitch = 1.2;
     utterThis.rate = 1.1;

     utterThis.onstart = () => setIsSpeaking(true);
     utterThis.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
     };
     
     synthRef.current.speak(utterThis);
  }, []);

  const stopSpeaking = useCallback(() => {
     if (!synthRef.current) return;
     synthRef.current.cancel();
     setIsSpeaking(false);
  }, []);

  return { isListening, isSpeaking, startListening, stopListening, speak, stopSpeaking, browserSupported };
};
