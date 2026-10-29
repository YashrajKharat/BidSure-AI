import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  X,
  FileText,
  AlertTriangle,
  Building2,
  Lock,
  Printer,
  Download,
  Calendar,
  DollarSign,
  UserCheck,
  Hash,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function AwardContractModal({
  isOpen,
  onClose,
  tender,
  bidders = [],
  contractors = [],
  activeOfficer,
  onAwardTender,
  showToast
}) {
  if (!isOpen || !tender) return null;

  // Filter bidders for this tender
  const tenderBidders = bidders.filter(b => (b.tenderId === tender.id || b.tender_id === tender.id));

  // Determine legitimate L1 or default winner
  // BuildCraft (BIDDER-002) is the legitimate cleared L1
  const defaultWinner = tenderBidders.find(b => 
    b.name?.toLowerCase().includes('buildcraft') || 
    b.contractorId === 'CTR-002' ||
    b.status === 'Under Review' ||
    b.status === 'Compliant'
  ) || tenderBidders[0] || {
    id: 'BIDDER-002',
    name: 'BuildCraft Infra Projects Ltd',
    contractorId: 'CTR-002',
    quoteValue: '₹ 468.20 Cr',
    complianceScore: 98,
    riskRating: 'LOW'
  };

  const isAlreadyAwarded = tender.status === 'Awarded & Sealed' || !!tender.awardedContract;

  const [selectedBidderId, setSelectedBidderId] = useState(
    tender.awardedContract?.bidderId || defaultWinner.id
  );
  const [awardAmount, setAwardAmount] = useState(
    tender.awardedContract?.awardedAmount || defaultWinner.quoteValue || '₹ 468.20 Cr'
  );
  const [loaNumber, setLoaNumber] = useState(
    tender.awardedContract?.loaNumber || `LOA/${tender.authority?.split(' ')[0] || 'MMRDA'}/2026/${tender.id}/AWARD-01`
  );
  const [executionMonths, setExecutionMonths] = useState(
    tender.awardedContract?.executionPeriod || '24 Months'
  );
  const [officerNotes, setOfficerNotes] = useState(
    tender.awardedContract?.officerNotes || 'Tender Evaluation Committee has reviewed all technical, statutory, and forensic findings. The bidder is technically compliant, financially solvent, and cleared of any anti-competitive syndicate collusion.'
  );
  const [statutoryChecked, setStatutoryChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewCertificateMode, setViewCertificateMode] = useState(isAlreadyAwarded);

  const selectedBidder = tenderBidders.find(b => b.id === selectedBidderId) || defaultWinner;
  const selectedContractor = contractors.find(c => c.id === selectedBidder.contractorId) || {
    name: selectedBidder.name,
    cin: selectedBidder.cin || 'U45203MH2016PTC284911',
    gstin: selectedBidder.gstin || '27AAACB4419K1Z4',
    pan: selectedBidder.pan || 'AAACB4419K',
    state: selectedBidder.state || 'Maharashtra'
  };

  // Flag if user selects a collusive firm (Apex or Shivalik)
  const isFlaggedForCollusion = 
    selectedBidder.name?.toLowerCase().includes('apex') || 
    selectedBidder.name?.toLowerCase().includes('shivalik') ||
    selectedBidder.riskRating === 'HIGH' ||
    selectedBidder.status === 'Flagged';

  // Compute 5% Performance Security
  const budgetNum = parseFloat(awardAmount.replace(/[^\d.]/g, '') || 468.2);
  const pbgAmount = `₹ ${(budgetNum * 0.05).toFixed(2)} Cr`;

  // Cryptographic Seal Hash
  const [sealHash, setSealHash] = useState(
    tender.awardedContract?.sealHash || 
    '7e91f0a29c15e8b417e082b2094c3d82a47291a8e104f932840d2871b69f98a1'
  );

  const handleBidderChange = (bidderId) => {
    setSelectedBidderId(bidderId);
    const b = tenderBidders.find(item => item.id === bidderId);
    if (b && b.quoteValue) {
      setAwardAmount(b.quoteValue);
    }
  };

  const handleSealAndAward = () => {
    if (!statutoryChecked) {
      showToast && showToast('Please certify statutory compliance before sealing.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedSeal = `SEAL-${Math.random().toString(36).substring(2, 10).toUpperCase()}-SHA256-${Date.now().toString(16)}`;
      setSealHash(generatedSeal);

      const awardRecord = {
        tenderId: tender.id,
        tenderTitle: tender.title,
        bidderId: selectedBidder.id,
        contractorId: selectedBidder.contractorId || 'CTR-002',
        contractorName: selectedBidder.name,
        cin: selectedContractor.cin,
        gstin: selectedContractor.gstin,
        pan: selectedContractor.pan,
        loaNumber: loaNumber,
        awardedAmount: awardAmount,
        performanceGuarantee: `${pbgAmount} (5% Bank Guarantee via SFMS within 14 Days)`,
        executionPeriod: executionMonths,
        awardedDate: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) + ' IST',
        awardedBy: activeOfficer?.name || 'Er. Rajesh Sharma (Chief Procurement Officer)',
        officerDesignation: activeOfficer?.designation || 'Chief Procurement Officer & Superintending Engineer',
        committeeChair: 'Arun Mehta, IAS (Additional Metropolitan Commissioner)',
        officerNotes: officerNotes,
        sealHash: generatedSeal,
        status: 'Awarded & Sealed'
      };

      if (onAwardTender) {
        onAwardTender(tender.id, awardRecord);
      }

      setIsSubmitting(false);
      setViewCertificateMode(true);
      showToast && showToast(`Tender ${tender.id} awarded to ${selectedBidder.name} and cryptographically sealed!`, 'success');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="clay-modal p-6 sm:p-8 max-w-4xl w-full my-auto space-y-6 max-h-[92vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-black">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="clay-badge clay-badge-amber text-[10px] font-black uppercase">
                  {viewCertificateMode ? 'Official Sealed Award Document' : 'Letter of Acceptance (LoA) Issuance'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {tender.id}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {viewCertificateMode
                  ? 'Official Certificate of Contract Award & Sealed LoA'
                  : 'Assign Tender & Affix Cryptographic Contract Seal'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAlreadyAwarded && !viewCertificateMode && (
              <button
                onClick={() => setViewCertificateMode(true)}
                className="px-3 py-1.5 text-xs font-bold clay-btn-secondary text-blue-700 cursor-pointer"
              >
                View Certificate
              </button>
            )}
            {viewCertificateMode && isAlreadyAwarded && (
              <button
                onClick={() => setViewCertificateMode(false)}
                className="px-3 py-1.5 text-xs font-bold clay-btn-secondary text-slate-700 cursor-pointer"
              >
                Edit Award Terms
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 text-xs">
          
          {/* VIEW MODE 1: AWARD CONFIGURATION & SEALING */}
          {!viewCertificateMode ? (
            <div className="space-y-6">
              
              {/* Tender Context Summary */}
              <div className="p-4 clay-inset rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50/40">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Public RFP:</span>
                  <div className="font-extrabold text-sm text-slate-900 leading-snug">{tender.title}</div>
                  <div className="text-slate-500 font-medium text-[11px] mt-0.5">
                    Authority: {tender.authority}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Approved Budget:</span>
                  <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                    {tender.budget}
                  </span>
                </div>
              </div>

              {/* Warning Alert if selecting collusive contractor */}
              {isFlaggedForCollusion && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 space-y-1 animate-pulse">
                  <div className="flex items-center gap-2 font-black text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>GFR 173 Collusion / Cartel Violation Detected!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    AI Cartel Forensics flagged <strong>{selectedBidder.name}</strong> for sister-concern collusion (shared PAN & identical workstation SHA-256 collision). Awarding this contract to a collusive entity is strictly prohibited under CVC guidelines.
                  </p>
                </div>
              )}

              {/* Step 1: Assign to Contractor */}
              <div className="clay-card p-5 space-y-4">
                <h4 className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 text-xs">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  1. Assign Winning Contractor (Select Evaluated Bidder)
                </h4>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Select Qualified Contractor for Contract Award:
                  </label>
                  <select
                    value={selectedBidderId}
                    onChange={(e) => handleBidderChange(e.target.value)}
                    className="w-full clay-inset p-3 rounded-xl text-slate-900 font-bold focus:outline-none cursor-pointer"
                  >
                    {tenderBidders.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} — Quote: {b.quoteValue || '₹ 468.20 Cr'} (Compliance: {b.complianceScore || 80}%) {b.name?.toLowerCase().includes('buildcraft') ? '🌟 RECOMMENDED (L1 Eligible)' : ''}
                      </option>
                    ))}
                    {tenderBidders.length === 0 && (
                      <>
                        <option value="BIDDER-002">BuildCraft Infra Projects Ltd — Quote: ₹ 468.20 Cr (Compliance: 78%) 🌟 RECOMMENDED (L1 Eligible)</option>
                        <option value="BIDDER-001">Apex Infrastructure Solutions Ltd — Quote: ₹ 442.80 Cr (DISQUALIFIED: Collusion)</option>
                        <option value="BIDDER-003">Shivalik Heavy Engineering Corp — Quote: ₹ 512.40 Cr (DISQUALIFIED: Cover Bid)</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Selected Contractor Badge Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3 clay-inset rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Company CIN:</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">{selectedContractor.cin}</span>
                  </div>
                  <div className="p-3 clay-inset rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">Permanent Account No:</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">{selectedContractor.pan}</span>
                  </div>
                  <div className="p-3 clay-inset rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">GSTIN Registration:</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">{selectedContractor.gstin}</span>
                  </div>
                  <div className="p-3 clay-inset rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold block">CST Evaluation Status:</span>
                    <span className={`font-bold text-[11px] ${isFlaggedForCollusion ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {isFlaggedForCollusion ? 'Disqualified (Syndicate)' : 'Legitimate L1 Awardee'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2: Contract Terms & LoA Parameters */}
              <div className="clay-card p-5 space-y-4">
                <h4 className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 text-xs">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  2. Letter of Acceptance (LoA) & Commercial Award Terms
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Final Contract Outlay / Awarded Consideration:
                    </label>
                    <input
                      type="text"
                      value={awardAmount}
                      onChange={(e) => setAwardAmount(e.target.value)}
                      className="w-full clay-inset p-3 rounded-xl font-mono font-black text-slate-900 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                      Matches evaluated financial proposal (3.56% below estimated budget)
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Letter of Acceptance (LoA) Reference Number:
                    </label>
                    <input
                      type="text"
                      value={loaNumber}
                      onChange={(e) => setLoaNumber(e.target.value)}
                      className="w-full clay-inset p-3 rounded-xl font-mono font-bold text-blue-700 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                      Statutory dispatch reference for official government gazette
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      5% Performance Security Deposit (PBG):
                    </label>
                    <div className="p-3 clay-inset rounded-xl font-mono font-bold text-slate-800 bg-slate-50">
                      {pbgAmount}
                    </div>
                    <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
                      Mandatory Submission via SFMS within 14 Calendar Days
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Contract Execution Period:
                    </label>
                    <input
                      type="text"
                      value={executionMonths}
                      onChange={(e) => setExecutionMonths(e.target.value)}
                      className="w-full clay-inset p-3 rounded-xl font-bold text-slate-800 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                      Turnkey commissioning milestone schedule
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Procurement Committee Award Justification & Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    className="w-full clay-inset p-3 rounded-xl text-slate-800 font-medium focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Step 3: Cryptographic Sealing & Sign-Off */}
              <div className="clay-card p-5 space-y-4 bg-amber-50/30 border border-amber-200/60">
                <h4 className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 text-xs">
                  <Lock className="w-4 h-4 text-amber-600" />
                  3. Cryptographic Tamper-Proof Sealing & Officer Signature
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
                  <div className="p-3.5 clay-card rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Authorized Procurement Officer:</span>
                    <div className="font-bold text-slate-900">{activeOfficer?.name || 'Er. Rajesh Sharma'}</div>
                    <div className="text-slate-500">{activeOfficer?.designation || 'Chief Procurement Officer & Superintending Engineer'}</div>
                    <div className="text-emerald-700 font-bold text-[10px] mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Digital DSC Token Ready
                    </div>
                  </div>

                  <div className="p-3.5 clay-card rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tender Committee Co-Signatory:</span>
                    <div className="font-bold text-slate-900">Arun Mehta, IAS</div>
                    <div className="text-slate-500">Additional Metropolitan Commissioner & Committee Chair</div>
                    <div className="text-blue-700 font-bold text-[10px] mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Minutes of Meeting Ratified
                    </div>
                  </div>
                </div>

                <div className="p-3 clay-inset rounded-xl flex items-center justify-between gap-3 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Pre-Computed Sealed Digest (SHA-256):</span>
                      <span className="font-mono text-[11px] font-bold text-slate-900 truncate block max-w-sm sm:max-w-md">
                        {sealHash}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-800 shrink-0">
                    CVC Cryptographic Protocol
                  </span>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={statutoryChecked}
                    onChange={(e) => setStatutoryChecked(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 mt-0.5 cursor-pointer"
                  />
                  <span className="text-slate-700 font-medium leading-relaxed text-[11px]">
                    I hereby certify that all technical, statutory, and anti-collusion forensic evaluations have been performed. This tender is officially awarded to <strong>{selectedBidder.name}</strong> in strict compliance with General Financial Rules (GFR Rule 173) and Central Vigilance Commission guidelines.
                  </span>
                </label>
              </div>

            </div>
          ) : (
            /* VIEW MODE 2: OFFICIAL SEALED AWARD CERTIFICATE & LETTER OF ACCEPTANCE */
            <div className="space-y-6">
              
              {/* Sovereign Certificate Paper Container */}
              <div id="sealed-certificate-container" className="clay-card p-6 sm:p-10 border-4 border-double border-amber-600/30 rounded-3xl space-y-8 bg-linear-to-b from-amber-50/20 via-white to-blue-50/10 relative overflow-hidden">
                
                {/* Golden Watermark Seal in Background */}
                <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-400/5 pointer-events-none flex items-center justify-center">
                  <Award className="w-48 h-48 text-amber-500/10" />
                </div>

                {/* Authority Header */}
                <div className="text-center space-y-2 border-b-2 border-slate-200 pb-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    🏛️ Sovereign Public Procurement Authority of India
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {tender.authority}
                  </h2>
                  <div className="text-xs font-bold text-slate-600">
                    Department of Mass Rapid Transit & Infrastructure Development
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    Notification No: <span className="font-bold text-slate-700">{loaNumber}</span> | Date of Sealing: <span className="font-bold text-slate-700">{tender.awardedContract?.awardedDate || new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                {/* Certificate Title */}
                <div className="text-center space-y-1 relative z-10">
                  <span className="text-[11px] font-black tracking-widest uppercase text-amber-700 block">
                    FORM OF FORMAL CONTRACT AWARD & LETTER OF ACCEPTANCE (LoA)
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    CERTIFICATE OF TENDER AWARD & STATUTORY SEAL
                  </h3>
                </div>

                {/* Official Preamble Text */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed relative z-10">
                  <p>
                    This is to formally notify and certify that following the rigorous evaluation of technical proposals, financial bids, and forensic anti-collusion clearance under <strong>General Financial Rules (GFR Rule 173)</strong>, the Competent Procurement Authority has accepted the tender proposal submitted by:
                  </p>

                  {/* Contractor Plaque */}
                  <div className="p-5 clay-card rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">Awardee Contractor Entity:</span>
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        {tender.awardedContract?.contractorName || selectedBidder.name}
                      </div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span>CIN: <strong>{selectedContractor.cin}</strong></span>
                        <span>PAN: <strong>{selectedContractor.pan}</strong></span>
                        <span>GSTIN: <strong>{selectedContractor.gstin}</strong></span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Awarded Consideration:</span>
                      <span className="text-lg sm:text-2xl font-black text-emerald-700 font-mono">
                        {tender.awardedContract?.awardedAmount || awardAmount}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-semibold">Inclusive of All Applicable Duties & GST</span>
                    </div>
                  </div>

                  <p>
                    For the execution, completion, and maintenance of works entitled: <br />
                    <strong className="text-slate-900 font-black">"{tender.title}"</strong> (Tender ID: <span className="font-mono font-bold text-blue-700">{tender.id}</span>).
                  </p>
                </div>

                {/* Statutory Conditions & Guarantee Requirements */}
                <div className="p-4 clay-inset rounded-2xl space-y-2 text-xs relative z-10 bg-slate-50/80">
                  <div className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Statutory Award Terms & Conditions:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                    <li>
                      <strong>Performance Security:</strong> The Contractor must furnish a Performance Bank Guarantee of <strong>{tender.awardedContract?.performanceGuarantee || pbgAmount}</strong> within fourteen (14) days from the issuance date via SFMS bank transmission.
                    </li>
                    <li>
                      <strong>Execution Timeline:</strong> Works must commence within thirty (30) days and achieve full commercial commissioning within <strong>{tender.awardedContract?.executionPeriod || executionMonths}</strong>.
                    </li>
                    <li>
                      <strong>Anti-Collusion Integrity Pact:</strong> BidSure AI forensic hashing confirmed zero cryptographic hash collisions, zero shared PAN identifiers, and zero IP/workstation overlap.
                    </li>
                  </ul>
                </div>

                {/* Cryptographic Seal & Signatures Block */}
                <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative z-10">
                  
                  {/* Digital Seal Emblem */}
                  <div className="p-4 clay-card rounded-2xl text-center space-y-2 border border-amber-300 bg-amber-50/40">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-white mx-auto flex items-center justify-center font-black shadow-md">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-amber-900 uppercase">Cryptographic Seal Verified</div>
                      <div className="font-mono text-[9px] font-bold text-slate-500 break-all mt-1">
                        {tender.awardedContract?.sealHash || sealHash}
                      </div>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[8px] font-black bg-emerald-100 text-emerald-800">
                      ✓ Tamper-Proof Hash Active
                    </span>
                  </div>

                  {/* Procurement Officer Sign */}
                  <div className="clay-card p-4 rounded-2xl space-y-1">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">Issued By:</span>
                    <div className="font-black text-slate-900 text-xs sm:text-sm">
                      {tender.awardedContract?.awardedBy || activeOfficer?.name || 'Er. Rajesh Sharma'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Superintending Engineer & Chief Procurement Officer
                    </div>
                    <div className="text-[9px] font-mono text-emerald-700 font-bold mt-1">
                      ✓ DSC Token Sign-Off Completed
                    </div>
                  </div>

                  {/* Committee Chair Sign */}
                  <div className="clay-card p-4 rounded-2xl space-y-1">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">Ratified By:</span>
                    <div className="font-black text-slate-900 text-xs sm:text-sm">
                      Arun Mehta, IAS
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Additional Metropolitan Commissioner & Tender Committee Chair
                    </div>
                    <div className="text-[9px] font-mono text-blue-700 font-bold mt-1">
                      ✓ Competent Authority Approved
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-slate-500 text-[11px] font-medium">
            {!viewCertificateMode ? (
              <span>🔒 Sealing freezes further bid modifications and updates official tender status.</span>
            ) : (
              <span>📜 Letter of Acceptance (LoA) is legally binding and court-admissible.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!viewCertificateMode ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 clay-btn-secondary text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSealAndAward}
                  className="flex-1 sm:flex-none px-6 py-2.5 clay-btn-primary text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Affixing Digital Seal...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Affix Signature & Seal Tender</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 sm:flex-none px-5 py-2.5 clay-btn-secondary text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2.5 clay-btn-primary text-white font-black text-xs shadow-md cursor-pointer"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
