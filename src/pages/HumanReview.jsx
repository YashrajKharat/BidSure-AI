import React, { useState } from 'react';
import {
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Clock,
  MessageSquare,
  Save,
  Check,
  Search,
  Filter,
  Eye,
  Building2,
  FileText
} from 'lucide-react';
import SideBySideDiffModal from '../components/SideBySideDiffModal';

export default function HumanReview({
  findings = [],
  bidders = [],
  onSaveFindingDecision,
  showToast
}) {
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [activeModalFinding, setActiveModalFinding] = useState(null);
  const [decision, setDecision] = useState('Needs Further Review');
  const [comments, setComments] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter pending review findings safely
  const pendingFindings = (findings || []).filter(f => {
    const s = f.reviewStatus || f.review_status;
    return s !== 'Confirmed Duplicate' && s !== 'Legitimate Shared Information';
  });
  const resolvedFindings = (findings || []).filter(f => {
    const s = f.reviewStatus || f.review_status;
    return s === 'Confirmed Duplicate' || s === 'Legitimate Shared Information';
  });

  const currentFinding = selectedFinding || pendingFindings[0] || findings[0];

  const handleDecisionSave = () => {
    if (!currentFinding) return;
    if (onSaveFindingDecision) {
      onSaveFindingDecision(currentFinding.id, decision, comments);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
      showToast && showToast(`Saved officer decision for ${currentFinding.id}`, 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 clay-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 clay-badge-blue text-xs font-black">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Vigilance & Procurement Discretion Queue
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Human Officer Review & Triage
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            The AI system surfaces statistical correlations and cryptographic anomalies; final statutory determinations are reserved exclusively for the procurement officer in compliance with tender authority guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 clay-badge-amber text-center">
            <div className="text-xl font-black text-amber-800">{pendingFindings.length}</div>
            <div className="text-[10px] font-extrabold uppercase">Pending Review</div>
          </div>
          <div className="px-4 py-2.5 clay-badge-emerald text-center">
            <div className="text-xl font-black text-emerald-800">{resolvedFindings.length}</div>
            <div className="text-[10px] font-extrabold uppercase">Decisions Saved</div>
          </div>
        </div>
      </div>

      {/* Main Review Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Triage Queue List */}
        <div className="lg:col-span-1 clay-card p-5 space-y-4 flex flex-col max-h-[700px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-700">
              Pending Review Tasks ({pendingFindings.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold">Select to inspect</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {pendingFindings.length > 0 ? (
              pendingFindings.map((f) => {
                const isSelected = currentFinding?.id === f.id;
                const isCritical = f.severity === 'CRITICAL';

                return (
                  <div
                    key={f.id}
                    onClick={() => { setSelectedFinding(f); setDecision(f.reviewStatus || f.review_status || 'Needs Further Review'); setComments(f.officerNotes || f.officer_notes || ''); }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'clay-card border-blue-500'
                        : 'clay-inset hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-xs text-slate-900">{f.id}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                        isCritical ? 'clay-badge-rose' : 'clay-badge-amber'
                      }`}>
                        {f.matchType || f.match_type}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 truncate">
                      {f.bidders.join(' vs ')}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-medium">
                      {f.reason}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Tender {f.tenderId}</span>
                      <span className="text-blue-600 font-bold">Review Now →</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 font-semibold">
                All triage tasks currently resolved!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Review Card */}
        {currentFinding && (
          <div className="lg:col-span-2 clay-card p-6 space-y-6">
            
            {/* Finding Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-slate-900">{currentFinding.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                    {currentFinding.matchType}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Affecting Bidders: <strong className="text-slate-800">{currentFinding.bidders.join(', ')}</strong>
                </p>
              </div>

              <button
                onClick={() => setActiveModalFinding(currentFinding)}
                className="clay-btn-secondary hover:clay-btn-primary px-3.5 py-2 text-xs font-black inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> View Side-by-Side Diff
              </button>
            </div>

            {/* AI Explanation & Reason */}
            <div className="p-4 clay-inset space-y-2 text-xs">
              <span className="font-black text-slate-700 uppercase tracking-wider text-[10px] block">
                Algorithmic Finding Reason:
              </span>
              <p className="text-slate-800 leading-relaxed font-bold">
                {currentFinding.reason}
              </p>
              <p className="text-slate-500 leading-relaxed pt-2 border-t border-slate-200/60 font-medium">
                {currentFinding.aiExplanation}
              </p>
            </div>

            {/* Evidence summary */}
            <div className="p-4 clay-inset text-xs">
              <span className="font-black text-blue-900 uppercase tracking-wider text-[10px] block mb-1">
                Cryptographic Evidence Digest:
              </span>
              <span className="font-mono text-slate-800 font-bold break-all">
                {currentFinding.evidence || 'Binary hash collision verified on portal upload gateway.'}
              </span>
            </div>

            {/* Decision Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                Officer Final Determination:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDecision('Confirmed Duplicate')}
                  className={`p-3 text-xs text-left cursor-pointer ${
                    decision === 'Confirmed Duplicate'
                      ? 'clay-btn-danger font-black'
                      : 'clay-btn-secondary font-bold text-slate-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 mb-1" />
                  <div className="font-black">Confirmed Duplicate</div>
                  <div className={`text-[10px] font-medium ${decision === 'Confirmed Duplicate' ? 'text-rose-100' : 'text-slate-400'}`}>
                    Disqualify under GFR Rule 173
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('Legitimate Shared Information')}
                  className={`p-3 text-xs text-left cursor-pointer ${
                    decision === 'Legitimate Shared Information'
                      ? 'clay-btn-emerald font-black'
                      : 'clay-btn-secondary font-bold text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 mb-1" />
                  <div className="font-black">Legitimate Shared Info</div>
                  <div className={`text-[10px] font-medium ${decision === 'Legitimate Shared Information' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    Consortium / Common OEM
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('Needs Further Review')}
                  className={`p-3 text-xs text-left cursor-pointer ${
                    decision === 'Needs Further Review'
                      ? 'clay-btn-amber font-black'
                      : 'clay-btn-secondary font-bold text-slate-700'
                  }`}
                >
                  <Scale className="w-4 h-4 mb-1" />
                  <div className="font-black">Needs Further Review</div>
                  <div className={`text-[10px] font-medium ${decision === 'Needs Further Review' ? 'text-amber-100' : 'text-slate-400'}`}>
                    Escalate to Vigilance Officer
                  </div>
                </button>
              </div>
            </div>

            {/* Officer Justification Comments */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-800">
                Officer Audit Comments & Legal Remarks:
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter justification reasons to be permanently filed into the tender audit dossier..."
                className="w-full text-xs p-3 clay-inset font-semibold text-slate-800 focus:outline-none"
              />
            </div>

            {/* Save Action */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-semibold">
                Officer Session: Rajesh Sharma (#RS-90218)
              </span>

              <button
                type="button"
                onClick={handleDecisionSave}
                className="clay-btn-primary px-6 py-2.5 text-xs font-black flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" /> Decision Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Review Decision
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Side-by-Side Modal */}
      <SideBySideDiffModal
        isOpen={Boolean(activeModalFinding)}
        finding={activeModalFinding}
        onClose={() => setActiveModalFinding(null)}
        onSaveDecision={(fId, dec, notes) => {
          if (onSaveFindingDecision) onSaveFindingDecision(fId, dec, notes);
          setActiveModalFinding(null);
        }}
      />
    </div>
  );
}
