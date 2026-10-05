import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceAssistant = (onTranscriptComplete) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [browserSupported] = useState(
    () => typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  );

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    synthRef.current = typeof window !== 'undefined' ? window.speechSynthesis : null;

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Perfect for Hinglish
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
    } catch (_err) {
      console.log('Recognition already started');
    }
  }, [onTranscriptComplete]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text) => {
    if (!synthRef.current) return;

    synthRef.current.cancel(); // Flush ongoing utterances
    const cleanText = text.replace(/[*#_`]/g, ''); // Strip markdown syntax

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, []);

  return {
    isListening,
    isSpeaking,
    browserSupported,
    startListening,
    stopListening,
    speak,
  };
};
