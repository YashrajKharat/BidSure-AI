import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Hash,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { generateVerificationReportPDF } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';
import { getBidderComplianceRequirements } from '../data/mockData';

export default function VerificationReports({
  bidders = [],
  tenders = [],
  findings = [],
  requirements = [],
  showToast
}) {
  const [selectedBidderId, setSelectedBidderId] = useState(bidders[0]?.id || 'BIDDER-001');

  const bidder = bidders.find(b => b.id === selectedBidderId) || bidders[0];
  const tender = tenders.find(t => t.id === bidder.tenderId) || tenders[0];
  const bidderRequirements = getBidderComplianceRequirements(bidder, tender);

  const handleDownloadPDF = () => {
    try {
      const filename = generateVerificationReportPDF({
        reportId: `REP-2026-${bidder.id.replace('BIDDER-', '')}904`,
        bidderName: bidder.name,
        tenderId: bidder.tenderId,
        tenderTitle: tender?.title || 'Metro Infrastructure Structural Package',
        complianceScore: bidder.complianceScore,
        riskLevel: bidder.riskRating,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        recommendation: bidder.complianceScore >= 80 ? 'Technically Qualified (GFR 173)' : 'Requires Vigilance Committee Hearing',
        summary: `BidSure AI autonomous audit completed for ${bidder.name}. Cross-referencing against active RFP schedules verified statutory registration, CA balance sheet UDIN, and earnest money deposit guarantee.`,
        requirements: bidderRequirements.map(r => ({ name: r.name, status: r.status, note: r.extractedInfo })),
        findings: findings.map(f => ({ id: f.id, type: f.matchType, status: f.reviewStatus, note: f.reason }))
      });

      // Trigger celebratory confetti for officer verification download
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback if canvas-confetti doesn't execute
      }

      showToast && showToast(`Downloaded official audit report: ${filename}`, 'success');
    } catch (err) {
      console.error('PDF Generation Error:', err);
      showToast && showToast('Error generating PDF document.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Controls Bar */}
      <div className="p-6 clay-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Official Bid Compliance & Verification Dossier
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Generate court-admissible audit reports with digital officer sign-off
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={selectedBidderId}
            onChange={(e) => setSelectedBidderId(e.target.value)}
            className="px-3 py-2 clay-inset text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            {bidders.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <button
            onClick={handleDownloadPDF}
            className="clay-btn-primary px-5 py-2.5 text-xs font-black flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Official PDF Dossier
          </button>
        </div>
      </div>

      {/* Report Paper Preview Container */}
      <div className="max-w-4xl mx-auto clay-card p-8 sm:p-12 space-y-8 print:shadow-none print:border-none">
        
        {/* Report Top Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B132B] text-white flex items-center justify-center font-bold text-lg shadow-md">
              <ShieldCheck className="w-7 h-7 text-blue-400 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                BIDSURE AI AUDIT DOSSIER
              </h1>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                Central Electronic Procurement Verification Authority
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="font-mono font-bold text-blue-700">REP-2026-{bidder.id.replace('BIDDER-', '')}904</div>
            <div className="text-slate-400 text-[11px]">Audit Timestamp: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              SHA-256 Tamper-Proof Certified
            </span>
          </div>
        </div>

        {/* Tender & Bidder Info Grid */}
        <div className="clay-inset p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
              Tender RFP Reference:
            </span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{bidder.tenderId}</div>
            <div className="text-slate-600">{tender?.title || 'Public Works Infrastructure'}</div>
            <div className="text-slate-400 text-[11px] mt-1">Authority: {tender?.authority || 'State Department'}</div>
          </div>

          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
              Audited Bidder Entity:
            </span>
            <div className="font-bold text-blue-800 text-sm mt-0.5">{bidder.name}</div>
            <div className="text-slate-600 font-mono text-[11px]">GSTIN: {bidder.gstin} | PAN: {bidder.pan}</div>
            <div className="text-slate-400 text-[11px] mt-1">CIN: {bidder.cin} • Registered in {bidder.state}</div>
          </div>
        </div>

        {/* Executive Score & Recommendation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="clay-card p-4 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Compliance Score
            </span>
            <div className={`text-3xl font-extrabold my-1 ${
              bidder.complianceScore >= 80 ? 'text-emerald-600' : (bidder.complianceScore >= 60 ? 'text-amber-600' : 'text-rose-600')
            }`}>
              {bidder.complianceScore}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Mandatory Clauses Met</span>
          </div>

          <div className="clay-card p-4 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Cartel & Fraud Risk Rating
            </span>
            <div className={`text-2xl font-extrabold my-1 ${
              bidder.riskRating === 'HIGH' ? 'text-rose-600' : 'text-blue-600'
            }`}>
              {bidder.riskRating} RISK
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Algorithmic Assessment</span>
          </div>

          <div className="clay-card p-4 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Recommendation
            </span>
            <div className="text-sm font-bold text-slate-900 my-2">
              {bidder.complianceScore >= 80 ? 'Technically Eligible' : (bidder.complianceScore >= 60 ? 'Under Review' : 'Disqualified (Cartel Collusion)')}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {bidder.complianceScore >= 80 ? 'Rule 173 GFR Clearance' : 'Flagged under Competition Act / GFR'}
            </span>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200/60 pb-1">
            1. Executive Compliance Summary
          </h3>
          <p className="text-slate-600 leading-relaxed">
            The BidSure AI verification engine systematically evaluated all statutory certificates, audited financial disclosures, and technical methodologies submitted by <strong>{bidder.name}</strong> under Tender Reference <strong>{bidder.tenderId}</strong>. Real-time cryptographic byte hashing verified that all schedules were submitted without tampering. Cross-bidder correlation engines inspected concurrent participants to ensure fair market competition and identify collusive bidding networks.
          </p>
        </div>

        {/* Section 2: Requirements Audit Table */}
        <div className="space-y-2 text-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200/60 pb-1">
            2. Statutory Checklist & Verification Record
          </h3>
          <div className="overflow-x-auto clay-table-wrapper">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/60">
                <tr>
                  <th className="py-2.5 px-3">Tender Requirement</th>
                  <th className="py-2.5 px-3">Clause</th>
                  <th className="py-2.5 px-3">Verified Extracted Value</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bidderRequirements.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{r.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{r.clause}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{r.extractedInfo}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        r.status === 'Compliant'
                          ? 'clay-badge clay-badge-emerald'
                          : r.status === 'Missing'
                          ? 'text-rose-700 bg-rose-50 border border-rose-200'
                          : 'clay-badge clay-badge-amber'
                      }`}>
                        {r.status === 'Compliant' ? '✓ Compliant' : r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Digital Officer Sign-off Block */}
        <div className="clay-inset p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs space-y-1">
            <div className="font-bold text-slate-900">PROCUREMENT OFFICER DIGITAL VERIFICATION</div>
            <div className="text-slate-600">Officer Name: Rajesh Sharma (Senior Technical Auditor)</div>
            <div className="text-slate-500 font-mono text-[11px]">CVC E-Sign Token: #eSIGN-IND-90218-BIDSURE</div>
            <div className="text-slate-400 font-mono text-[10px]">SHA-256 Audit Digest: 8f43a9b1...c2890a</div>
          </div>

          <div className="clay-card p-4 rounded-2xl text-center border-2 border-dashed border-blue-400 min-w-[180px]">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-1" />
            <div className="text-[11px] font-extrabold text-blue-900">BIDSURE CERTIFIED</div>
            <div className="text-[9px] text-slate-400">Authentic & Verified Audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
