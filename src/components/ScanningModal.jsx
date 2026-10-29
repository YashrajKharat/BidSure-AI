import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  Cpu,
  Hash,
  Search,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

export default function ScanningModal({
  isOpen,
  file,
  extractedData,
  onComplete,
  onClose
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [revealedPills, setRevealedPills] = useState([]);

  const scanSteps = [
    { title: 'Cryptographic Hashing', desc: 'Computing SHA-256 byte digest via WebCrypto...', icon: Hash },
    { title: 'Optical Character Recognition', desc: 'Parsing raster layers & tokenizing text stream...', icon: Cpu },
    { title: 'Entity Extraction Engine', desc: 'Identifying GSTIN, PAN, CIN, and monetary values...', icon: Search },
    { title: 'Forensic Cross-Check', desc: 'Verifying against active tender submissions for duplicates...', icon: Sparkles },
    { title: 'Compliance Verification', desc: 'Synthesizing audit report and confidence metrics...', icon: ShieldCheck }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setRevealedPills([]);
      return;
    }

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          if (onComplete) {
            setTimeout(onComplete, 900);
          }
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(stepInterval);
  }, [isOpen]);

  // Progressively reveal extracted entity pills as scanning advances
  useEffect(() => {
    if (!extractedData) return;

    if (currentStepIndex >= 1 && !revealedPills.includes('hash')) {
      setRevealedPills(prev => [...prev, 'hash']);
    }
    if (currentStepIndex >= 2 && !revealedPills.includes('gstin') && extractedData.gstin) {
      setRevealedPills(prev => [...prev, 'gstin']);
    }
    if (currentStepIndex >= 3 && !revealedPills.includes('pan') && extractedData.pan) {
      setRevealedPills(prev => [...prev, 'pan']);
    }
    if (currentStepIndex >= 4 && !revealedPills.includes('company') && extractedData.companyName) {
      setRevealedPills(prev => [...prev, 'company']);
    }
  }, [currentStepIndex, extractedData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl clay-modal overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl clay-badge-blue">
              <Sparkles className="w-4 h-4 animate-spin text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">BidSure Document Intelligence</h3>
              <p className="text-[11px] text-blue-200 font-medium">Deep Neural Verification & Anti-Collusion Scan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl clay-btn-secondary text-slate-700 hover:text-slate-900">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2D Animated Scanner Stage */}
        <div className="p-6 clay-inset m-4 flex flex-col items-center">
          <div className="relative w-64 h-52 clay-card overflow-hidden p-4 flex flex-col justify-between">
            {/* Laser Scanning Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-scanline z-20 pointer-events-none" />

            {/* Document Header representation */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-black text-slate-800 truncate max-w-[130px]">
                  {file?.name || 'Bid_Document.pdf'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 clay-badge-blue font-bold">
                OCR LIVE
              </span>
            </div>

            {/* Simulated text lines */}
            <div className="space-y-2 py-2">
              <div className="h-2 rounded bg-slate-200 w-5/6"></div>
              <div className="h-2 rounded bg-slate-100 w-full"></div>
              <div className="h-2 rounded bg-blue-100 w-4/6 border-l-2 border-blue-500 pl-1"></div>
              <div className="h-2 rounded bg-slate-200 w-3/4"></div>
              <div className="h-2 rounded bg-slate-100 w-5/6"></div>
            </div>

            {/* Footer with Seal */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              <span>SHA-256 Verified</span>
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                ✓
              </span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="w-full mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">
                {scanSteps[currentStepIndex].title}
              </span>
              <span className="text-blue-600 font-bold">
                {Math.round(((currentStepIndex + 1) / scanSteps.length) * 100)}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / scanSteps.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 italic text-center">
              {scanSteps[currentStepIndex].desc}
            </p>
          </div>
        </div>

        {/* Progressively Extracted Entities Bar */}
        <div className="p-6 bg-white space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Real-time Extracted Metadata
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* SHA-256 Pill */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
              revealedPills.includes('hash')
                ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-40'
            }`}>
              <div className="text-[10px] text-slate-400 font-semibold">SHA-256 Hash</div>
              <div className="font-mono text-[10px] truncate">
                {extractedData?.sha256 ? `${extractedData.sha256.slice(0, 18)}...` : 'Computing hash...'}
              </div>
            </div>

            {/* GSTIN Pill */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
              revealedPills.includes('gstin')
                ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-40'
            }`}>
              <div className="text-[10px] text-slate-400 font-semibold">GSTIN Registration</div>
              <div className="font-bold text-xs text-emerald-700">
                {extractedData?.gstin || (revealedPills.includes('gstin') ? 'Verified' : 'Scanning...')}
              </div>
            </div>

            {/* PAN Pill */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
              revealedPills.includes('pan')
                ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-40'
            }`}>
              <div className="text-[10px] text-slate-400 font-semibold">Permanent Account No (PAN)</div>
              <div className="font-bold text-xs text-indigo-700">
                {extractedData?.pan || (revealedPills.includes('pan') ? 'Verified' : 'Scanning...')}
              </div>
            </div>

            {/* Company Title */}
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
              revealedPills.includes('company')
                ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-40'
            }`}>
              <div className="text-[10px] text-slate-400 font-semibold">Legal Entity Title</div>
              <div className="font-bold text-xs text-amber-800 truncate">
                {extractedData?.companyName || (revealedPills.includes('company') ? 'Verified' : 'Scanning...')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
