import React, { useState } from 'react';
import {
  X,
  FileText,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  IndianRupee,
  Lock,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { computeSHA256 } from '../utils/crypto';

export default function BidSubmissionModal({
  isOpen,
  onClose,
  tender,
  tenders = [],
  activeContractor,
  onSubmitBid,
  showToast
}) {
  const [selectedTenderId, setSelectedTenderId] = useState(tender?.id || tenders[0]?.id || 'TND-2026-8901');
  const [quoteValue, setQuoteValue] = useState('');
  const [technicalDocName, setTechnicalDocName] = useState('Technical_Proposal_Schedule.pdf');
  const [financialDocName, setFinancialDocName] = useState('Audited_Balance_Sheet_3Yr.pdf');
  const [integritySigned, setIntegritySigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentTender = tenders.find(t => t.id === selectedTenderId) || tender || tenders[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quoteValue) {
      if (showToast) showToast('Please enter your commercial quote value.', 'warning');
      return;
    }
    if (!integritySigned) {
      if (showToast) showToast('You must accept the GFR 173 Integrity Pact declaration.', 'warning');
      return;
    }

    setSubmitting(true);

    try {
      // Generate cryptographic hashes for attached documents
      const technicalHash = await computeSHA256(`${technicalDocName}_${Date.now()}_${activeContractor?.id}`);
      const financialHash = await computeSHA256(`${financialDocName}_${Date.now()}_${activeContractor?.id}`);

      const newBid = {
        id: `BID-${Date.now().toString().slice(-4)}`,
        tenderId: currentTender.id,
        tender_id: currentTender.id,
        contractorId: activeContractor?.id || 'CTR-001',
        contractor_id: activeContractor?.id || 'CTR-001',
        name: activeContractor?.name || 'Contractor Entity',
        contractorName: activeContractor?.name || 'Contractor Entity',
        state: activeContractor?.state || 'Maharashtra',
        cin: activeContractor?.cin || 'U45200MH2012PLC238910',
        pan: activeContractor?.pan || 'AAACA7821B',
        gstin: activeContractor?.gstin || '27AAACA7821B1Z9',
        turnover: activeContractor?.turnover || '₹ 100.0 Cr',
        quoteValue: `₹ ${quoteValue.replace('₹', '').trim()} Cr`,
        quote_value: `₹ ${quoteValue.replace('₹', '').trim()} Cr`,
        submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        complianceScore: 92,
        riskRating: 'LOW',
        status: 'Compliant',
        bidStatus: 'Submitted & Sealed',
        documents: [
          {
            name: technicalDocName,
            type: 'Technical Methodology Schedule',
            sha256: technicalHash,
            size: '2.4 MB'
          },
          {
            name: financialDocName,
            type: '3-Year Audited Financial Schedule',
            sha256: financialHash,
            size: '3.1 MB'
          }
        ]
      };

      if (onSubmitBid) {
        await onSubmitBid(newBid);
      }

      if (showToast) {
        showToast(`Bid for ${currentTender.id} submitted and sealed successfully under GFR 173!`, 'success');
      }

      onClose();
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Error submitting bid. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl clay-modal max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl clay-badge-blue flex items-center justify-center text-blue-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Submit Sealed Commercial & Technical Bid
              </h3>
              <p className="text-xs text-slate-500">
                Rule 173 Two-Cover Electronic Procurement System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl clay-btn-secondary text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Submitting Contractor Pill */}
          <div className="p-4 clay-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-blue-100">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Bidding Entity (Your Firm)
              </div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                {activeContractor?.name || 'Apex Infrastructure Solutions Ltd'}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <span>PAN: <strong className="text-slate-700 font-mono">{activeContractor?.pan || 'AAACA7821B'}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong className="text-slate-700 font-mono">{activeContractor?.gstin || '27AAACA7821B1Z9'}</strong></span>
              </div>
            </div>
            <span className="clay-badge-emerald text-xs font-black px-2.5 py-1 self-start sm:self-auto flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Registered Bidder
            </span>
          </div>

          {/* Select Target Tender */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700">
              Target Public Tender RFP <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedTenderId}
              onChange={(e) => setSelectedTenderId(e.target.value)}
              className="w-full px-3.5 py-2.5 clay-inset text-xs font-bold text-slate-800 bg-transparent rounded-xl focus:outline-none cursor-pointer"
            >
              {tenders.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} — {t.title} ({t.budget})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Tender Summary Box */}
          {currentTender && (
            <div className="p-4 clay-inset rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" /> {currentTender.authority}
                </span>
                <span className="font-mono text-emerald-700 font-black">
                  Approved Outlay: {currentTender.budget}
                </span>
              </div>
              <p className="text-slate-600 font-medium line-clamp-2">
                {currentTender.title}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-500" /> Deadline: <strong className="text-slate-600">{currentTender.submissionDeadline}</strong>
                </span>
                <span>•</span>
                <span>EMD: <strong className="text-slate-600">{currentTender.emdAmount}</strong></span>
              </div>
            </div>
          )}

          {/* Commercial Quote Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
              <span>Total Commercial Bid Value (in ₹ Crores) <span className="text-rose-500">*</span></span>
              <span className="text-[11px] text-slate-400 font-normal">All-inclusive BOQ lump sum</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">
                ₹
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 445.50"
                value={quoteValue}
                onChange={(e) => setQuoteValue(e.target.value)}
                required
                className="w-full pl-8 pr-16 py-2.5 clay-inset text-xs font-black text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                Cr
              </span>
            </div>
          </div>

          {/* Technical & Statutory Documents */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-slate-700 block">
              Encrypted Submission Dossier Attachments
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Technical Schedule */}
              <div className="p-3 clay-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl clay-badge-blue flex items-center justify-center text-blue-600 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 truncate">
                    {technicalDocName}
                  </div>
                  <div className="text-[10px] text-slate-400">Technical Methodology Schedule</div>
                </div>
                <span className="clay-badge-emerald text-[9px] font-black px-1.5 py-0.5">
                  Attached
                </span>
              </div>

              {/* Financial Balance Sheet */}
              <div className="p-3 clay-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl clay-badge-emerald flex items-center justify-center text-emerald-600 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 truncate">
                    {financialDocName}
                  </div>
                  <div className="text-[10px] text-slate-400">CA Audited 3-Yr Financials</div>
                </div>
                <span className="clay-badge-emerald text-[9px] font-black px-1.5 py-0.5">
                  Attached
                </span>
              </div>
            </div>
          </div>

          {/* GFR 173 Integrity Pact Checkbox */}
          <div className="p-3.5 clay-inset rounded-2xl flex items-start gap-3">
            <input
              type="checkbox"
              id="integrityPact"
              checked={integritySigned}
              onChange={(e) => setIntegritySigned(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
            <label htmlFor="integrityPact" className="text-xs text-slate-600 cursor-pointer select-none leading-relaxed">
              <strong className="text-slate-800">GFR 173 Non-Collusion & Integrity Declaration:</strong> We solemnly affirm that this bid is submitted independently without collusion, price-fixing, or coordinate cover bidding with any competitor entity. All statutory certificates submitted are authentic under the Indian Penal Code & GFR 2017.
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 clay-btn-secondary text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 clay-btn-primary text-xs font-black text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              {submitting ? 'Encrypting & Submitting...' : 'Seal & Submit Bid'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
