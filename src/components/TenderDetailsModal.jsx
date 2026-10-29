import React, { useState } from 'react';
import {
  FileSpreadsheet,
  X,
  Calendar,
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  UserCheck,
  Download,
  ExternalLink,
  PlusCircle,
  FileText,
  Briefcase,
  Lock,
  Award
} from 'lucide-react';

export default function TenderDetailsModal({
  isOpen,
  onClose,
  tender,
  bidders = [],
  onNavigate,
  onSwitchRole,
  showToast,
  currentRole = 'officer',
  contractorBidderId = 'BIDDER-001',
  onOpenAwardModal
}) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !tender) return null;

  // Filter bidders submitted specifically for this tender
  const tenderBidders = bidders.filter(b => b.tenderId === tender.id);

  // Default fallback values if newly created tender has minimal fields
  const scopeItems = tender.scopeOfWork || [
    "Comprehensive engineering, procurement, and execution adhering to statutory specifications",
    "Deployment of certified materials, quality inspection protocols, and milestone audit sign-offs",
    "Supply, testing, and continuous operational integration under procuring authority supervision",
    "Provision of 3-year comprehensive warranty and post-commissioning maintenance guarantee"
  ];

  const eligibility = tender.eligibilityCriteria || {
    minTurnover: `Minimum average annual turnover of ₹ ${(parseFloat(tender.budget?.replace(/[^\d.]/g, '') || 50) * 0.3).toFixed(1)} Cr over past 3 financial years`,
    priorExperience: `Successful completion of at least one similar infrastructure/engineering contract worth ≥ 80% of tender value`,
    solvencyLimit: `Bank Solvency Certificate of minimum ₹ ${(parseFloat(tender.budget?.replace(/[^\d.]/g, '') || 50) * 0.2).toFixed(1)} Cr from a Scheduled Bank`,
    statutory: "Valid GSTIN registration, PAN, EPFO & ESIC clearances, with non-blacklisting affidavit on stamp paper"
  };

  const handleExportSummary = () => {
    const summaryData = {
      tenderId: tender.id,
      title: tender.title,
      authority: tender.authority,
      budget: tender.budget,
      status: tender.status,
      category: tender.category,
      submissionDeadline: tender.submissionDeadline,
      openingDate: tender.openingDate || "TBD",
      nodalOfficer: tender.nodalOfficer || "Senior Procurement Officer",
      submittedBidsCount: tenderBidders.length,
      bidders: tenderBidders.map(b => ({
        id: b.id,
        name: b.name,
        gstin: b.gstin,
        pan: b.pan,
        complianceScore: b.complianceScore,
        status: b.status,
        quote: b.quoteValue || "Under Sealed Cover"
      }))
    };

    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tender_Dossier_${tender.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (showToast) {
      showToast(`Exported Official Dossier for ${tender.id}`, 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col clay-card p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="clay-badge clay-badge-blue text-xs font-mono font-black">
                {tender.id}
              </span>
              <span className="clay-badge clay-badge-emerald text-[11px] font-black">
                {tender.status || 'Active Notice'}
              </span>
              <span className="clay-badge text-[11px] text-slate-600 font-bold">
                {tender.category || 'General Procurement'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {tender.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <strong className="text-slate-800">{tender.authority}</strong>
              </span>
              {tender.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tender.location}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentRole !== 'contractor' && (
              <button
                onClick={() => {
                  onClose();
                  if (onOpenAwardModal) onOpenAwardModal(tender);
                }}
                className="px-3.5 py-2 rounded-xl font-black text-xs clay-btn-amber text-slate-900 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>{tender.status === 'Awarded & Sealed' || tender.awardedContract ? '📜 View Sealed LoA' : '🏆 Award & Seal'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl clay-btn-secondary text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'clay-btn-primary text-white shadow-xs'
                : 'clay-btn-secondary text-slate-600 hover:text-slate-900'
            }`}
          >
            Tender Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'eligibility'
                ? 'clay-btn-primary text-white shadow-xs'
                : 'clay-btn-secondary text-slate-600 hover:text-slate-900'
            }`}
          >
            GFR 173 Qualification Mandates
          </button>
          <button
            onClick={() => setActiveTab('bidders')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bidders'
                ? 'clay-btn-primary text-white shadow-xs'
                : 'clay-btn-secondary text-slate-600 hover:text-slate-900'
            }`}
          >
            Submitted Bids
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'bidders' ? 'bg-white/30 text-white' : 'bg-blue-100 text-blue-700'
            }`}>
              {tenderBidders.length}
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
          
          {/* TAB 1: Overview & Specs */}
          {activeTab === 'overview' && (
            <div className="space-y-6">

              {/* Awarded Contract Plaque if sealed */}
              {(tender.status === 'Awarded & Sealed' || tender.awardedContract) && (
                <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-200 text-amber-900 uppercase">
                          🔒 Official Contract Awarded & Sealed
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-600">
                          {tender.awardedContract?.loaNumber || 'LOA/MMRDA/2026/CIVIL-8901/AWARD-01'}
                        </span>
                      </div>
                      <div className="font-extrabold text-sm text-slate-900 mt-0.5">
                        Awarded to {tender.awardedContract?.contractorName || 'BuildCraft Infra Projects Ltd'} for {tender.awardedContract?.awardedAmount || '₹ 468.20 Cr'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenAwardModal) onOpenAwardModal(tender);
                    }}
                    className="px-4 py-2 clay-btn-primary text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Sealed Certificate
                  </button>
                </div>
              )}
              {/* Key Financial & Schedule Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 clay-inset rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Budget</span>
                  <span className="text-base sm:text-lg font-black text-slate-900 font-mono mt-0.5 block">
                    {tender.budget}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Total Approved Outlay</span>
                </div>

                <div className="p-4 clay-inset rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EMD Guarantee</span>
                  <span className="text-sm sm:text-base font-black text-blue-700 font-mono mt-0.5 block">
                    {tender.emdAmount || '₹ 1.50 Cr (1%)'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Bank Guarantee / FDR</span>
                </div>

                <div className="p-4 clay-inset rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Submission Deadline</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">
                    {tender.submissionDeadline}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">17:00 IST Strict Cutoff</span>
                </div>

                <div className="p-4 clay-inset rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tech Bid Opening</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-700 mt-0.5 block">
                    {tender.openingDate || 'Within 24 Hours'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Public Decryption Stage</span>
                </div>
              </div>

              {/* Description */}
              <div className="clay-card p-5 space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" /> Executive Description & Engineering Scope
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {tender.description || 'Turnkey engineering, statutory compliance, material supply, civil execution, and quality certification conforming to CVC procurement standards and state infrastructure mandates.'}
                </p>
              </div>

              {/* Scope of Work Deliverables */}
              <div className="clay-card p-5 space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Mandatory Scope Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scopeItems.map((item, idx) => (
                    <div key={idx} className="p-3 clay-inset rounded-xl flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-semibold leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nodal Officer & Method Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 clay-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl clay-btn-primary flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supervising Nodal Officer</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      {tender.nodalOfficer || 'Er. Rajesh Sharma (Superintending Engineer)'}
                    </span>
                    <span className="text-[10px] text-slate-500">{tender.authority}</span>
                  </div>
                </div>

                <div className="p-4 clay-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl clay-badge-blue flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Procurement Methodology</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      {tender.procurementMethod || 'Open National Bidding (Two-Cover System GFR 173)'}
                    </span>
                    <span className="text-[10px] text-slate-500">Tender Fee: {tender.tenderFee || '₹ 25,000'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GFR 173 Eligibility Criteria */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-800 leading-relaxed font-medium">
                <strong>Mandatory Statutory Notice:</strong> In accordance with General Financial Rules (GFR) 2017 Rule 173 and Central Vigilance Commission (CVC) directives, all participating bidders must meet every threshold without deviation.
              </div>

              <div className="space-y-3">
                <div className="p-4 clay-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">1. Minimum Financial Turnover</span>
                    <span className="clay-badge-blue text-[10px] font-extrabold px-2 py-0.5">MANDATORY</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {eligibility.minTurnover}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">Verified via ICAI UDIN-stamped chartered accountant balance sheets.</p>
                </div>

                <div className="p-4 clay-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">2. Prior Technical Execution Experience</span>
                    <span className="clay-badge-blue text-[10px] font-extrabold px-2 py-0.5">MANDATORY</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {eligibility.priorExperience}
                  </p>
                  <p className="text-[11px] text-slate-400">Must submit completion certificates signed by an officer not below Executive Engineer rank.</p>
                </div>

                <div className="p-4 clay-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">3. Bank Solvency & Working Capital</span>
                    <span className="clay-badge-blue text-[10px] font-extrabold px-2 py-0.5">MANDATORY</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {eligibility.solvencyLimit}
                  </p>
                  <p className="text-[11px] text-slate-400">Issued by a nationalized or scheduled commercial bank in official RBI format.</p>
                </div>

                <div className="p-4 clay-card space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">4. Statutory Registrations & Integrity Pact</span>
                    <span className="clay-badge-emerald text-[10px] font-extrabold px-2 py-0.5">ANTI-COLLUSION</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {eligibility.statutory}
                  </p>
                  <p className="text-[11px] text-rose-600 font-semibold">Strict debarment under Competition Act 2002 if common PAN or sister concern bids are detected.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Submitted Bidders */}
          {activeTab === 'bidders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {currentRole === 'contractor'
                    ? `Registered Bids for ${tender.id} (${tenderBidders.length} Submissions)`
                    : `Participant Dossiers Submitted for ${tender.id} (${tenderBidders.length})`}
                </h4>
                {tenderBidders.length > 0 && (
                  <span className="text-xs text-slate-500 font-medium">
                    {currentRole === 'contractor'
                      ? `${tenderBidders.length} Total Bids Registered`
                      : `${tenderBidders.filter(b => b.status === 'Compliant').length} Qualified / ${tenderBidders.length} Total`}
                  </span>
                )}
              </div>

              {/* Contractor Confidentiality Notice under GFR 173 */}
              {currentRole === 'contractor' && (
                <div className="p-3.5 clay-card flex items-start gap-3 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/60 border border-blue-200/50">
                  <div className="p-2 rounded-xl clay-badge-blue text-blue-600 shrink-0">
                    <Lock className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-xs">
                    <div className="font-black text-slate-900 flex items-center gap-1.5">
                      <span>GFR 173 Sealed Cover Privacy Protection</span>
                      <span className="clay-badge-emerald text-[9px] font-black px-1.5 py-0.5">Confidential</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                      Total <strong>{tenderBidders.length} bids</strong> have been registered for this tender. Competitor pricing quotes, corporate tax filings, and technical schedules remain strictly sealed until public tender opening.
                    </p>
                  </div>
                </div>
              )}

              {tenderBidders.length > 0 ? (
                <div className="divide-y divide-slate-100 clay-card overflow-hidden">
                  {tenderBidders.map((b, idx) => {
                    const isMyBid = currentRole === 'contractor' && (b.id === contractorBidderId || b.contractorId === contractorBidderId || b.contractor_id === contractorBidderId);
                    const isCompetitor = currentRole === 'contractor' && !isMyBid;

                    return (
                      <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-slate-900">
                              {isCompetitor ? `Participating Contractor #${idx + 1}` : b.name}
                            </span>
                            {isMyBid && (
                              <span className="clay-badge-blue text-[9px] font-black px-1.5 py-0.5">
                                Your Registered Firm
                              </span>
                            )}
                            {isCompetitor && (
                              <span className="clay-badge-emerald text-[9px] font-extrabold px-1.5 py-0.5 flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> Sealed
                              </span>
                            )}
                            {!isCompetitor && (
                              <span className="font-mono text-xs text-slate-400">({b.id})</span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            {isCompetitor ? (
                              <span className="flex items-center gap-1 text-slate-400">
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span>Statutory filings & identity sealed under GFR Rule 173</span>
                              </span>
                            ) : (
                              <>
                                <span>PAN: <strong className="font-mono text-slate-700">{b.pan}</strong></span>
                                <span>•</span>
                                <span>GSTIN: <strong className="font-mono text-slate-700">{b.gstin}</strong></span>
                                <span>•</span>
                                <span>State: <strong className="text-slate-700">{b.state}</strong></span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Commercial Quote</span>
                            <span className="font-mono font-black text-xs sm:text-sm text-slate-900">
                              {isCompetitor ? (
                                <span className="text-slate-400 font-sans text-xs flex items-center gap-1">
                                  <Lock className="w-3 h-3 text-slate-400" /> Sealed Cover
                                </span>
                              ) : (
                                b.quoteValue || 'Sealed Cover'
                              )}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Compliance</span>
                            {isCompetitor ? (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                                Sealed
                              </span>
                            ) : (
                              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                                b.complianceScore >= 85 ? 'bg-emerald-100 text-emerald-800' :
                                b.complianceScore >= 65 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {b.complianceScore}%
                              </span>
                            )}
                          </div>

                          {isCompetitor ? (
                            <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-400" /> Sealed Bid
                            </span>
                          ) : (
                            <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                              b.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              b.status === 'Flagged' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              b.status === 'Disqualified' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {b.status}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center clay-card space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl clay-badge-blue flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900">No Bids Submitted Yet for This Tender</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    This procurement notice was recently published and is currently in the active bidding window. Contractors can submit technical and commercial dossiers until {tender.submissionDeadline}.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      if (onSwitchRole) onSwitchRole('contractor');
                      if (onNavigate) onNavigate('documents');
                    }}
                    className="clay-btn-primary px-4 py-2 text-xs font-black inline-flex items-center gap-1.5 cursor-pointer mt-2"
                  >
                    <PlusCircle className="w-4 h-4" /> Submit First Bid as Contractor
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleExportSummary}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold clay-btn-secondary text-slate-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" /> Export Official Tender Dossier (JSON)
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('comparativeStatement');
              }}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold clay-btn-secondary text-emerald-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View CST Matrix
            </button>

            <button
              onClick={() => {
                onClose();
                if (onSwitchRole) onSwitchRole('contractor');
                if (onNavigate) onNavigate('documents');
              }}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-black clay-btn-primary flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Submit Bid For Tender
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
