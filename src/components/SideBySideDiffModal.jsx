import React, { useState } from 'react';
import {
  X,
  CopyCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ArrowRight,
  Hash,
  Scale,
  BrainCircuit,
  MessageSquare,
  Save,
  Check,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function SideBySideDiffModal({
  finding,
  isOpen,
  onClose,
  onSaveDecision
}) {
  if (!isOpen || !finding) return null;

  const [decision, setDecision] = useState(finding.reviewStatus || 'Needs Further Review');
  const [officerNotes, setOfficerNotes] = useState(finding.officerNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const docA = finding.docA || {
    name: 'Document_A.pdf',
    bidder: finding.bidders ? finding.bidders[0] : 'Bidder A',
    sha256: '4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1',
    content: 'Empty document content'
  };

  const docB = finding.docB || {
    name: 'Document_B.pdf',
    bidder: finding.bidders ? finding.bidders[1] || 'Bidder B' : 'Bidder B',
    sha256: '4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1',
    content: 'Empty document content'
  };

  const isHashMatch = docA.sha256 && docB.sha256 && docA.sha256 === docB.sha256;

  const handleSave = () => {
    if (onSaveDecision) {
      onSaveDecision(finding.id, decision, officerNotes);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl clay-modal overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl clay-badge-rose">
              <CopyCheck className="w-5 h-5 stroke-[2.2] text-rose-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-white">{finding.id}</span>
                <span className="clay-badge-rose px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                  {finding.matchType}
                </span>
                <span className="text-xs text-blue-200 font-semibold">
                  • Tender {finding.tenderId}
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5 font-medium">
                Side-by-Side Forensic Evidence & Cryptographic Diff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl clay-btn-secondary text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Side-by-Side Document Comparison Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Document A (Left) */}
            <div className="clay-inset p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg clay-badge-blue font-black text-xs text-blue-700">
                    Doc A
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate max-w-[200px]" title={docA.name}>
                      {docA.name}
                    </h4>
                    <span className="text-[11px] font-bold text-blue-700 block">
                      {docA.bidder}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">
                  {docA.size || '1.8 MB'}
                </span>
              </div>

              {/* SHA-256 Digest Bar */}
              <div className="mb-3 px-3 py-2 rounded-xl bg-slate-900 text-slate-300 text-[10px] font-mono flex items-center justify-between shadow-inner">
                <span className="text-slate-400">SHA-256:</span>
                <span className="truncate max-w-[240px] text-cyan-300 font-bold" title={docA.sha256}>
                  {docA.sha256}
                </span>
              </div>

              {/* Rendered Document View */}
              <div className="flex-1 min-h-[220px] clay-card p-4 rounded-xl font-mono text-xs text-slate-700 leading-relaxed overflow-y-auto max-h-[280px] select-text">
                <div className="border-b border-slate-100 pb-2 mb-2 text-[10px] font-sans font-bold text-slate-400 uppercase">
                  Extracted Document Text
                </div>
                <div className="whitespace-pre-line">
                  {String(docA?.content || '').split('\n').map((line, idx) => {
                    const isPAN = line.includes('AAACA7821B');
                    const isGSTIN = line.includes('27AAACA7821B1Z9');
                    const isCompany = line.includes('Apex Infrastructure Solutions Ltd');
                    const isMethodology = line.includes('TECHNICAL SPECIFICATIONS') || line.includes('IS: 14268');

                    if (isPAN || isGSTIN || isCompany || isMethodology) {
                      return (
                        <div key={idx} className="highlight-anomaly font-semibold text-rose-900 my-0.5">
                          {line}
                        </div>
                      );
                    }
                    return <div key={idx}>{line}</div>;
                  })}
                </div>
              </div>
            </div>

            {/* Document B (Right) */}
            <div className="clay-inset p-4 flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg clay-badge-rose font-black text-xs text-rose-700">
                    Doc B
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate max-w-[200px]" title={docB.name}>
                      {docB.name}
                    </h4>
                    <span className="text-[11px] font-bold text-rose-700 block">
                      {docB.bidder}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">
                  {docB.size || '1.8 MB'}
                </span>
              </div>

              {/* SHA-256 Digest Bar */}
              <div className="mb-3 px-3 py-2 rounded-xl bg-slate-900 text-slate-300 text-[10px] font-mono flex items-center justify-between shadow-inner">
                <span className="text-slate-400">SHA-256:</span>
                <span className="truncate max-w-[240px] text-cyan-300 font-bold" title={docB.sha256}>
                  {docB.sha256}
                </span>
              </div>

              {/* Rendered Document View */}
              <div className="flex-1 min-h-[220px] clay-card p-4 rounded-xl font-mono text-xs text-slate-700 leading-relaxed overflow-y-auto max-h-[280px] select-text">
                <div className="border-b border-slate-100 pb-2 mb-2 text-[10px] font-sans font-bold text-slate-400 uppercase">
                  Extracted Document Text
                </div>
                <div className="whitespace-pre-line">
                  {String(docB?.content || '').split('\n').map((line, idx) => {
                    const isPAN = line.includes('AAACA7821B');
                    const isGSTIN = line.includes('27AAACA7821B1Z9');
                    const isCompany = line.includes('Apex Infrastructure Solutions Ltd');
                    const isMethodology = line.includes('TECHNICAL SPECIFICATIONS') || line.includes('IS: 14268');

                    if (isPAN || isGSTIN || isCompany || isMethodology) {
                      return (
                        <div key={idx} className="highlight-anomaly font-semibold text-rose-900 my-0.5">
                          {line}
                        </div>
                      );
                    }
                    return <div key={idx}>{line}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Match Details & Evidence Table */}
          <div className="p-5 clay-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Forensic Match Details & Supporting Evidence
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">Text Similarity:</span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 clay-badge-rose">
                  {(finding.similarityScore * 100).toFixed(1)}% Match
                </span>
              </div>
            </div>

            {/* Hash & Field Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="py-2 px-3">Field / Attribute</th>
                    <th className="py-2 px-3">{docA.bidder}</th>
                    <th className="py-2 px-3">{docB.bidder}</th>
                    <th className="py-2 px-3">Forensic Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-500" /> SHA-256 File Hash
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-600">{docA.sha256?.slice(0, 16)}...</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-600">{docB.sha256?.slice(0, 16)}...</td>
                    <td className="py-2.5 px-3">
                      {isHashMatch ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" /> Exact Duplicate (100%)
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-500">Distinct Hashes</span>
                      )}
                    </td>
                  </tr>

                  {finding.matchingFields && finding.matchingFields.map((field, fIdx) => (
                    <tr key={fIdx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{field.field}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{field.docA}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{field.docB}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          Shared Entity ({field.severity})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Evidence summary */}
            <div className="clay-inset p-3 rounded-xl text-xs">
              <span className="font-bold text-slate-700 block mb-1">Audit Trail & Evidence Log:</span>
              <p className="text-slate-600">{finding.evidence || finding.reason}</p>
            </div>
          </div>

          {/* AI Explanation Panel */}
          <div className="clay-card-dark p-5 rounded-2xl text-white space-y-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                BidSure AI Intelligence Explanation
              </h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {finding.aiExplanation}
            </p>
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Rule Model: Anti-Collusion v4.8</span>
              <span className="text-cyan-400 font-semibold">99.4% Algorithm Confidence</span>
            </div>
          </div>

          {/* Officer Decision & Human Review Panel */}
          <div className="p-5 clay-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Procurement Officer Review & Formal Determination
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 font-bold">
                Logged under Officer ID #RS-90218
              </span>
            </div>

            {/* Review Decision Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setDecision('Confirmed Duplicate')}
                className={`px-4 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  decision === 'Confirmed Duplicate'
                    ? 'clay-btn-danger font-black'
                    : 'clay-btn-secondary font-bold text-slate-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" /> Confirmed Duplicate (Fraud)
              </button>

              <button
                type="button"
                onClick={() => setDecision('Legitimate Shared Information')}
                className={`px-4 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  decision === 'Legitimate Shared Information'
                    ? 'clay-btn-emerald font-black'
                    : 'clay-btn-secondary font-bold text-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Legitimate Shared Info
              </button>

              <button
                type="button"
                onClick={() => setDecision('Needs Further Review')}
                className={`px-4 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  decision === 'Needs Further Review'
                    ? 'clay-btn-amber font-black'
                    : 'clay-btn-secondary font-bold text-slate-700'
                }`}
              >
                <Scale className="w-4 h-4 shrink-0" /> Needs Review (Escalate)
              </button>
            </div>

            {/* Officer Notes Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Officer Justification & Committee Record Notes:
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                placeholder="Enter statutory reasons, clause citations (e.g., GFR Rule 173), or instructions for the Tender Evaluation Committee..."
                className="w-full text-xs p-3 clay-inset font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="clay-btn-secondary px-4 py-2 text-xs font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaved}
                className="clay-btn-primary px-5 py-2.5 text-xs font-black flex items-center gap-2 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" /> Decision Recorded!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Review Decision
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
