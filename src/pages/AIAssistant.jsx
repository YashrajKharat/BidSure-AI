import React, { useState, useEffect, useRef } from 'react';
import {
  BrainCircuit,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  FileCheck2,
  AlertTriangle,
  Scale,
  RefreshCw,
  Info,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { api } from '../services/api';

export default function AIAssistant({ findings = [], bidders = [], showToast }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello Officer Rajesh Sharma. I am **BidSure AI Assistant**.\n\nI operate using **100% Free & Open Source local execution** (Zero paid API keys). I have indexed live SQLite database records across active tenders, extracted statutory certificates, and cross-bidder collusion telemetry.\n\nHow can I assist your bid evaluation today?`,
      source: 'BidSure Local Engine',
      timestamp: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    async function loadStatus() {
      const h = await api.getHealth();
      setBackendStatus(h);
    }
    loadStatus();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-IN';
      rec.onstart = () => setIsListening(true);
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setInputVal(text);
        handleSendMessage(text);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      showToast && showToast('Speech Recognition not supported in this browser.', 'info');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*_#`]/g, '');
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputVal.trim();
    if (!textToSend || loading) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputVal('');
    setLoading(true);

    try {
      const res = await api.queryAI(textToSend);
      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: res.response || 'Analysis complete.',
        source: res.source || 'BidSure Intelligence Node',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Unable to communicate with local engine. Please verify backend is running.',
          source: 'System Error',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { title: 'Explain Collusion Finding #FIND-2026-081', icon: ShieldAlert },
    { title: 'Summarize Compliance Failures', icon: FileCheck2 },
    { title: 'Which Bidders Share the Same PAN/GSTIN?', icon: AlertTriangle },
    { title: 'What Are the Highest Risk Factors for Metro Line 4?', icon: Scale }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header Banner */}
      <div className="clay-card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700 shadow-sm">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              AI Procurement Copilot & Intelligence Assistant
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Evidence-grounded explanations, clause validation summaries, and anti-collusion intelligence
          </p>
        </div>

        {/* Engine Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs shrink-0 shadow-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-semibold">
            {backendStatus?.ai_engine?.mode || 'Local Free Intelligence Node'}
          </span>
          <span className="text-[10px] text-cyan-300 font-mono">(Zero API Fees)</span>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 clay-card space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isUser
                    ? 'clay-btn-primary text-white'
                    : 'clay-card-dark text-cyan-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs max-w-2xl leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'clay-btn-primary text-white rounded-tr-none'
                    : 'clay-card text-slate-800 rounded-tl-none'
                }`}
              >
                <div>{typeof m.content === 'string' ? m.content : JSON.stringify(m.content)}</div>

                <div
                  className={`mt-2.5 pt-1.5 border-t text-[10px] flex items-center justify-between ${
                    isUser
                      ? 'border-blue-400/40 text-blue-100'
                      : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span>{m.source || 'Officer'} • {m.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => speakText(typeof m.content === 'string' ? m.content : '')}
                      className="p-1 hover:text-blue-600 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                      title="Read out loud"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl clay-card-dark text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            </div>
            <div className="clay-inset p-3.5 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="font-medium text-slate-600 ml-1">Analyzing database records & statutory rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        {quickPrompts.map((q, idx) => {
          const Icon = q.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.title)}
              className="clay-btn-secondary px-3.5 py-1.5 text-xs text-slate-700 font-semibold whitespace-nowrap flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all shrink-0"
            >
              <Icon className="w-3.5 h-3.5 text-blue-600" /> {q.title}
            </button>
          );
        })}
      </div>

      {/* Claymorphic Input Box */}
      <div className="clay-card p-2 sm:p-2.5 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={isListening ? "Listening... Speak your procurement query..." : "Ask AI Assistant about collusion, compliance failures, GFR Rule 173, or bidder profiles..."}
          className="flex-1 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none clay-inset"
        />

        {/* Microphone Toggle Button */}
        <button
          onClick={toggleMic}
          className={`p-2.5 rounded-xl transition-all cursor-pointer ${
            isListening 
              ? 'clay-btn-danger animate-pulse' 
              : 'clay-btn-secondary text-slate-600 hover:text-blue-600'
          }`}
          title={isListening ? "Stop Listening" : "Speak Voice Query"}
        >
          {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
        </button>

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputVal.trim() || loading}
          className="clay-btn-primary px-5 py-2.5 text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </div>
    </div>
  );
}
