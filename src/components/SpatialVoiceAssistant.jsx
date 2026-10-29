import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Command,
  X,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export default function SpatialVoiceAssistant({ onNavigate, showToast }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseSpeech, setResponseSpeech] = useState('');
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech Recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          handleVoiceCommand(text);
        }
      };

      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speakText = (text) => {
    if (isVoiceMuted || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech synthesis error:', e);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      showToast && showToast('Speech Recognition not supported in this browser. Use quick command buttons below.', 'info');
      setIsExpanded(true);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsExpanded(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleVoiceCommand = async (commandText) => {
    const cmd = commandText.toLowerCase().trim();
    setIsProcessing(true);
    let reply = '';

    if (cmd.includes('graph') || cmd.includes('network') || cmd.includes('cartel')) {
      reply = 'Navigating to Interactive Cartel Knowledge Graph. Highlighting Apex and Shivalik sister concern cluster.';
      onNavigate && onNavigate('cartelGraph');
    } else if (cmd.includes('metadata') || cmd.includes('workstation') || cmd.includes('laptop')) {
      reply = 'Opening PDF Workstation and Forensic Metadata Inspector. Reviewing author timestamp collisions.';
      onNavigate && onNavigate('metadataInspector');
    } else if (cmd.includes('comparative') || cmd.includes('cst') || cmd.includes('matrix')) {
      reply = 'Opening Multi-Bidder Comparative Statement CST Matrix.';
    } else if (cmd.includes('pricing') || cmd.includes('boq') || cmd.includes('rates') || cmd.includes('quote')) {
      reply = 'Opening Multi-Bidder Comparative Statement CST Matrix.';
      onNavigate && onNavigate('comparativeStatement');
    } else if (cmd.includes('finding') || cmd.includes('081') || cmd.includes('collusion')) {
      reply = 'Finding 081 flags Apex Infrastructure and Shivalik Corp for submitting byte-for-byte identical tax registrations under GFR Rule 173.';
      onNavigate && onNavigate('duplicates');
    } else if (cmd.includes('flagged') || cmd.includes('bidders')) {
      reply = 'Two bidders are currently flagged for collusion: Apex Infrastructure Solutions and Shivalik Heavy Engineering Corp.';
      onNavigate && onNavigate('bidders');
    } else {
      // Query backend AI assistant
      try {
        const aiRes = await api.queryAI(commandText);
        reply = aiRes.response || 'Understood. Reviewing live procurement records.';
      } catch (e) {
        reply = `Command recognized: "${commandText}". Executing officer triage.`;
      }
    }

    setResponseSpeech(reply);
    setIsProcessing(false);
    speakText(reply);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      
      {/* Expanded Voice Conversation Pod */}
      {isExpanded && (
        <div className="clay-card-dark p-5 mb-3 w-80 sm:w-96 text-white shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                <BrainCircuit className="w-4 h-4" />
              </span>
              <span className="font-extrabold text-xs tracking-tight text-white">
                AI Voice Officer Command Mode
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsVoiceMuted(!isVoiceMuted)}
                className="p-1 text-slate-400 hover:text-white"
                title={isVoiceMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transcript / Sound wave row */}
          <div className="space-y-3">
            {isListening && (
              <div className="flex items-center justify-center gap-1.5 py-2">
                <div className="w-1 bg-cyan-400 rounded-full animate-soundwave-1"></div>
                <div className="w-1 bg-blue-500 rounded-full animate-soundwave-2"></div>
                <div className="w-1 bg-cyan-300 rounded-full animate-soundwave-3"></div>
                <div className="w-1 bg-blue-400 rounded-full animate-soundwave-4"></div>
                <span className="text-xs font-mono text-cyan-300 ml-2 animate-pulse">Listening for officer command...</span>
              </div>
            )}

            {transcript && (
              <div className="clay-inset-dark p-2.5 text-xs font-mono text-cyan-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-sans">You said:</span>
                "{transcript}"
              </div>
            )}

            {responseSpeech && (
              <div className="clay-inset-dark p-3 rounded-xl text-xs text-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-cyan-300 block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> BidSure AI Copilot:
                </span>
                <p className="leading-relaxed font-sans">{responseSpeech}</p>
              </div>
            )}

            {/* Quick Voice Command Pills */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Officer Commands:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Show collusion graph",
                  "Open CST matrix",
                  "Check BOQ markup",
                  "Inspect workstation metadata",
                  "Open document intelligence"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTranscript(prompt);
                      handleVoiceCommand(prompt);
                    }}
                    className="px-2.5 py-1 rounded-xl clay-btn-secondary text-slate-200 text-[11px] font-semibold cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Spatial Voice Orb Button */}
      <button
        onClick={toggleListening}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening
            ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white spatial-glow-rose ring-4 ring-rose-400/30 scale-105'
            : 'bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 text-white spatial-glow-blue shadow-2xl hover:scale-105 active:scale-95'
        } border border-white/40`}
        title="Voice-Activated Procurement Assistant"
      >
        {isListening ? (
          <MicOff className="w-6 h-6 animate-pulse" />
        ) : (
          <div className="relative">
            <Mic className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 ring-2 ring-slate-900 animate-ping"></span>
          </div>
        )}
      </button>

    </div>
  );
}
