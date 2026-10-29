import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  FileSpreadsheet,
  Download,
  Building2,
  Sparkles,
  Network,
  Laptop,
  Scale,
  Percent,
  Lock,
  Mic,
  ShieldAlert,
  Building,
  UserCheck,
  Users,
  Briefcase,
  ChevronDown,
  UploadCloud,
  FileCheck,
  Check,
  Award
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { ProcurementOfficerIllustration, EmptyStateIllustration } from '../components/Illustrations';

export default function Dashboard({
  bidders = [],
  tenders = [],
  findings = [],
  selectedTenderId,
  currentRole = 'officer',
  contractorBidderId = 'CTR-001',
  activeContractor,
  activeOfficer,
  contractors = [],
  officers = [],
  onNavigate,
  onGenerateReport,
  onOpenTenderDetails,
  onOpenBidModal,
  onOpenAwardModal,
  onSwitchContractor,
  onSwitchOfficer
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [contractorSwitcherOpen, setContractorSwitcherOpen] = useState(false);
  const [officerSwitcherOpen, setOfficerSwitcherOpen] = useState(false);

  // Active Contractor object
  const currentContractor = activeContractor || contractors.find(c => c.id === contractorBidderId) || contractors[0] || {
    id: "CTR-001",
    name: "Apex Infrastructure Solutions Ltd",
    state: "Maharashtra",
    cin: "U45200MH2012PLC238910",
    pan: "AAACA7821B",
    gstin: "27AAACA7821B1Z9",
    turnover: "₹ 142.8 Cr",
    email: "tenders@apexinfra.com",
    contactPerson: "Vikram Malhotra"
  };

  // Active Officer object
  const currentOfficer = activeOfficer || officers.find(o => o.id === (activeOfficer?.id || 'OFF-001')) || officers[0] || {
    id: "OFF-001",
    name: "Er. Rajesh Sharma",
    designation: "Chief Procurement Officer & Superintending Engineer",
    department: "Mumbai Metropolitan Region Development Authority (MMRDA)",
    employeeId: "GOV-MMRDA-8901",
    email: "r.sharma@mmrda.gov.in",
    jurisdiction: "MMRDA Urban Transport & Civil Projects"
  };

  // Selected Tender
  const activeTender = tenders.find(t => t.id === selectedTenderId) || tenders[0] || {
    id: "TND-2026-8901",
    title: "Metro Line 4 Elevated Viaduct & Station Structural Works",
    authority: "MMRDA",
    budget: "₹ 485.50 Cr",
    submissionDeadline: "2026-11-15",
    status: "Open for Bidding",
    category: "Infrastructure & Civil Works"
  };

  // Helper to count bids for a tender
  const getTenderBidsCount = (tId) => {
    return bidders.filter(b => (b.tenderId === tId || b.tender_id === tId)).length;
  };

  // Contractor-specific bids: STRICTLY isolated to this contractor only
  const contractorMyBids = bidders.filter(b => 
    b.contractorId === currentContractor.id ||
    b.contractor_id === currentContractor.id ||
    b.bidderId === currentContractor.id ||
    b.id === currentContractor.id ||
    b.name === currentContractor.name
  );

  // =========================================================================
  // VIEW 1: CONTRACTOR INDEPENDENT DASHBOARD
  // =========================================================================
  if (currentRole === 'contractor') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Contractor Profile Header Card */}
        <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-4 border border-blue-100/60 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="clay-badge clay-badge-blue text-xs font-mono font-black">
                  {currentContractor.id}
                </span>
                <span className="clay-badge clay-badge-emerald text-[11px] font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Registered Contractor
                </span>
                <span className="clay-badge text-[11px] text-slate-700 font-bold bg-slate-100">
                  {currentContractor.state}
                </span>
                <span className="text-[11px] text-blue-600 font-extrabold flex items-center gap-1 ml-1">
                  <Lock className="w-3.5 h-3.5" /> GFR 173 Confidential Mode
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {currentContractor.name}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                <span>
                  PAN: <strong className="text-slate-800 font-mono">{currentContractor.pan}</strong>
                </span>
                <span>•</span>
                <span>
                  GSTIN: <strong className="text-slate-800 font-mono">{currentContractor.gstin}</strong>
                </span>
                <span>•</span>
                <span>
                  Annual Turnover: <strong className="text-slate-800">{currentContractor.turnover}</strong>
                </span>
              </div>
            </div>

            {/* Account Switcher for Contractor */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setContractorSwitcherOpen(!contractorSwitcherOpen)}
                className="px-4 py-2.5 rounded-2xl clay-card hover:bg-white text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer shadow-sm border border-blue-100"
              >
                <Building className="w-4 h-4 text-blue-600" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-normal">Switch Contractor Account</div>
                  <div className="font-black truncate max-w-[170px]">{currentContractor.name.split(' ')[0]} Infra</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {contractorSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-72 clay-modal p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch Contractor Dashboard
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                    {contractors.map((ctr) => (
                      <div
                        key={ctr.id}
                        onClick={() => {
                          if (onSwitchContractor) onSwitchContractor(ctr.id);
                          setContractorSwitcherOpen(false);
                        }}
                        className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          ctr.id === currentContractor.id ? 'bg-blue-50 font-bold text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <div className="font-extrabold truncate">{ctr.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{ctr.id} • {ctr.pan}</div>
                        </div>
                        {ctr.id === currentContractor.id && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="pt-1.5 border-t border-slate-100">
                    <button
                      onClick={() => { onNavigate('registration'); setContractorSwitcherOpen(false); }}
                      className="w-full text-center py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 block"
                    >
                      + Register New Contractor
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Award Banner if this contractor has won any tender */}
        {(() => {
          const awardedTenderForMe = tenders.find(t => 
            t.awardedContract && (
              t.awardedContract.contractorId === currentContractor.id ||
              t.awardedContract.contractorName?.toLowerCase().includes(currentContractor.name?.toLowerCase()) ||
              currentContractor.name?.toLowerCase().includes(t.awardedContract.contractorName?.toLowerCase())
            )
          );
          if (!awardedTenderForMe) return null;

          return (
            <div className="p-6 rounded-3xl bg-linear-to-r from-amber-500/20 via-emerald-500/15 to-blue-500/10 border-2 border-amber-400 text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg animate-in zoom-in-95 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shrink-0 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white uppercase tracking-wider">
                      🎉 Contract Awarded to Your Firm!
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-600">
                      {awardedTenderForMe.awardedContract?.loaNumber}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    Letter of Acceptance (LoA) Issued for "{awardedTenderForMe.title}"
                  </h3>
                  <p className="text-xs text-slate-600">
                    The Procuring Authority has cryptographically sealed your bid contract award for <strong>{awardedTenderForMe.awardedContract?.awardedAmount}</strong>. Please furnish the 5% Performance Bank Guarantee within 14 calendar days.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenAwardModal && onOpenAwardModal(awardedTenderForMe)}
                className="px-5 py-3 clay-btn-amber text-slate-900 font-black text-xs flex items-center gap-2 shadow-md shrink-0 cursor-pointer rounded-2xl hover:scale-105 transition-transform"
              >
                <Award className="w-4 h-4 text-amber-800" />
                <span>📜 View Official Sealed Award Certificate</span>
              </button>
            </div>
          );
        })()}

        {/* Contractor Key Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Available Open Tenders"
            value={tenders.length}
            suffix=" Active Notices"
            trend="Open for Bidding"
            trendType="up"
            icon={FileSpreadsheet}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            borderColor="border-blue-200/80"
            subtitle="Browse specifications & scope"
            onClick={() => onNavigate('tenders')}
          />

          <StatCard
            title="Your Submitted Bids"
            value={contractorMyBids.length}
            suffix=" Bids"
            trend={contractorMyBids.length > 0 ? "Under Evaluation" : "Zero Bids"}
            trendType={contractorMyBids.length > 0 ? "up" : "neutral"}
            icon={FileText}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            borderColor="border-emerald-200/80"
            subtitle="Strictly your firm's proposals"
          />

          <StatCard
            title="Competitor Privacy"
            value="100%"
            suffix=" Sealed"
            trend="GFR Rule 173"
            trendType="up"
            icon={Lock}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
            borderColor="border-indigo-200/80"
            subtitle="Competitor details masked"
          />

          <StatCard
            title="Tender AI Clarification"
            value="Voice AI"
            suffix=" Active"
            trend="Ask Questions"
            trendType="up"
            icon={Mic}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
            borderColor="border-purple-200/80"
            subtitle="Instant eligibility clause answers"
            onClick={() => onNavigate('assistant')}
          />
        </div>

        {/* Section: Available Tenders (Contractor can see no. of tenders, details, and ONLY count of bids submitted) */}
        <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" /> Available Procurement Notices
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Open Tenders Ready for Contractor Bidding ({tenders.length})
              </h3>
              <p className="text-xs text-slate-500">
                Inspect tender scope, approved budget, and submission deadlines. Only aggregate count of submitted bids is shown.
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenBidModal) onOpenBidModal(activeTender);
              }}
              className="px-5 py-2.5 clay-btn-primary text-white text-xs font-black shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Submit Bid for Tender</span>
            </button>
          </div>

          {/* Tender Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tenders.map((t) => {
              const bidsCount = getTenderBidsCount(t.id);
              const hasMyBid = contractorMyBids.some(b => (b.tenderId === t.id || b.tender_id === t.id));
              const myBid = contractorMyBids.find(b => (b.tenderId === t.id || b.tender_id === t.id));

              return (
                <div
                  key={t.id}
                  className="clay-card p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-lg transition-all border border-blue-50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                        {t.id}
                      </span>
                      <span className="clay-badge-emerald text-[10px] font-black px-2 py-0.5">
                        {t.status || 'Open'}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-slate-900 leading-snug line-clamp-2" title={t.title}>
                      {t.title}
                    </h4>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{t.authority}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Budget Outlay: <strong className="text-slate-900 font-mono">{t.budget}</strong>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Deadline: <strong className="text-slate-800">{t.submissionDeadline}</strong>
                      </div>
                    </div>

                    {/* ONLY NO. OF CONTRACTORS SUBMITTED BIDS - STRICT REQUIREMENT */}
                    <div className="p-2.5 clay-inset rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Submissions Count:</span>
                      <span className="font-black text-slate-900 font-mono bg-white px-2 py-0.5 rounded-lg shadow-xs">
                        {bidsCount} {bidsCount === 1 ? 'Contractor Submitted' : 'Contractors Submitted'}
                      </span>
                    </div>

                    {/* Has This Firm Already Bid Status */}
                    {hasMyBid ? (
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Your Bid Submitted: {myBid.quoteValue || myBid.quote_value}</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenTenderDetails && onOpenTenderDetails(t)}
                      className="flex-1 py-2 rounded-xl clay-btn-secondary text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>Details & Scope</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenBidModal) onOpenBidModal(t);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1 cursor-pointer ${
                        hasMyBid
                          ? 'clay-btn-secondary text-slate-700'
                          : 'clay-btn-primary text-white'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{hasMyBid ? 'Submit Revision' : 'Submit Bid'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Your Firm's Submitted Bids (Strictly isolated to active contractor) */}
        <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Confidential Bid Ledger
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {currentContractor.name} — Submitted Proposals ({contractorMyBids.length})
              </h3>
              <p className="text-xs text-slate-500">
                Only bids submitted by your firm are visible here. Other contractors cannot see your proposals.
              </p>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1.5 clay-inset rounded-xl text-slate-700 self-start sm:self-auto">
              PAN: {currentContractor.pan}
            </span>
          </div>

          {contractorMyBids.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 rounded-3xl clay-card mx-auto flex items-center justify-center text-slate-400">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                No Bids Submitted Yet by {currentContractor.name}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your firm has not submitted any proposals yet. Select any open tender above and click "Submit Bid" to upload your sealed technical schedule and price quote.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (onOpenBidModal) onOpenBidModal(tenders[0]);
                }}
                className="px-5 py-2.5 clay-btn-primary text-white text-xs font-black shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit Your First Bid Now</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="py-3.5 px-6">Bid Reference</th>
                    <th className="py-3.5 px-4">Tender Information</th>
                    <th className="py-3.5 px-4">Your Quote Value</th>
                    <th className="py-3.5 px-4">Submission Date</th>
                    <th className="py-3.5 px-4">Status Verdict</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contractorMyBids.map((b) => {
                    const tenderInfo = tenders.find(t => (t.id === b.tenderId || t.id === b.tender_id)) || {};
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/75 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-mono font-black text-blue-600">{b.id}</div>
                          <div className="text-[10px] text-slate-400">GFR 173 Sealed Packet</div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{b.tenderId || b.tender_id}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{tenderInfo.title || 'Metro Infrastructure Project'}</div>
                        </td>

                        <td className="py-4 px-4 font-mono font-black text-slate-900">
                          {b.quoteValue || b.quote_value || '₹ 442.80 Cr'}
                        </td>

                        <td className="py-4 px-4 text-slate-600">
                          {b.submissionDate || b.submission_date || '2026-10-22'}
                        </td>

                        <td className="py-4 px-4">
                          <span className="clay-badge-emerald text-[10px] font-black px-2.5 py-0.5">
                            {b.status || 'Compliant'}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => onGenerateReport && onGenerateReport(b)}
                            className="px-3 py-1.5 rounded-xl clay-btn-secondary text-blue-600 hover:text-blue-800 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Receipt</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PROCUREMENT OFFICER INDEPENDENT DASHBOARD
  // =========================================================================
  const totalBidsCount = bidders.length;
  const compliantBidsCount = bidders.filter(b => b.status === 'Compliant').length;
  const flaggedBidsCount = bidders.filter(b => b.status === 'Flagged' || b.status === 'Under Review').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Officer Profile Header Card */}
      <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-4 border border-emerald-100/60 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="clay-badge clay-badge-emerald text-xs font-mono font-black">
                {currentOfficer.id}
              </span>
              <span className="clay-badge text-[11px] font-black text-slate-800 bg-white shadow-xs">
                {currentOfficer.designation}
              </span>
              <span className="clay-badge text-[11px] text-slate-700 font-bold bg-slate-100">
                {currentOfficer.department}
              </span>
              <span className="text-[11px] text-emerald-600 font-extrabold flex items-center gap-1 ml-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Full Vigilance & Audit Access
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Officer Dashboard: {currentOfficer.name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
              <span>
                Employee ID: <strong className="text-slate-800 font-mono">{currentOfficer.employeeId}</strong>
              </span>
              <span>•</span>
              <span>
                Official Email: <strong className="text-slate-800">{currentOfficer.email}</strong>
              </span>
              <span>•</span>
              <span>
                Jurisdiction: <strong className="text-slate-800">{currentOfficer.jurisdiction}</strong>
              </span>
            </div>
          </div>

          {/* Account Switcher for Officers */}
          <div className="relative shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenAwardModal) onOpenAwardModal(activeTender);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer ${
                activeTender.status === 'Awarded & Sealed' || activeTender.awardedContract
                  ? 'clay-btn-amber text-slate-900 ring-1 ring-amber-400'
                  : 'clay-btn-secondary text-amber-800 hover:clay-btn-primary hover:text-white'
              }`}
              title="Assign and cryptographically seal tender award"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>{activeTender.status === 'Awarded & Sealed' || activeTender.awardedContract ? '📜 Sealed LoA' : '🏆 Award & Seal Tender'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('registration')}
              className="px-3.5 py-2.5 rounded-2xl clay-btn-primary text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Entity</span>
            </button>

            <button
              type="button"
              onClick={() => setOfficerSwitcherOpen(!officerSwitcherOpen)}
              className="px-4 py-2.5 rounded-2xl clay-card hover:bg-white text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer shadow-sm border border-emerald-100"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-normal">Switch Officer</div>
                <div className="font-black truncate max-w-[150px]">{currentOfficer.name}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {officerSwitcherOpen && (
              <div className="absolute right-0 top-12 w-72 clay-modal p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Officer Dashboard
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                  {officers.map((off) => (
                    <div
                      key={off.id}
                      onClick={() => {
                        if (onSwitchOfficer) onSwitchOfficer(off.id);
                        setOfficerSwitcherOpen(false);
                      }}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        off.id === currentOfficer.id ? 'bg-emerald-50 font-bold text-emerald-800' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="font-extrabold truncate">{off.name}</div>
                        <div className="text-[10px] text-slate-400">{off.designation}</div>
                      </div>
                      {off.id === currentOfficer.id && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="pt-1.5 border-t border-slate-100">
                  <button
                    onClick={() => { onNavigate('registration'); setOfficerSwitcherOpen(false); }}
                    className="w-full text-center py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 block"
                  >
                    + Register New Officer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Officer Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Tenders in Portfolio"
          value={tenders.length}
          suffix=" Active RFPs"
          trend="Supervised"
          trendType="up"
          icon={FileSpreadsheet}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          borderColor="border-blue-200/80"
          subtitle="Civil & Infrastructure tenders"
          onClick={() => onNavigate('tenders')}
        />

        <StatCard
          title="Total Bids Received"
          value={totalBidsCount}
          suffix=" Bids"
          trend={totalBidsCount > 0 ? "Bids Recorded" : "Awaiting Bids"}
          trendType={totalBidsCount > 0 ? "up" : "neutral"}
          icon={FileText}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          borderColor="border-emerald-200/80"
          subtitle="Across all active tenders"
          onClick={() => onNavigate('bidders')}
        />

        <StatCard
          title="Registered Contractors"
          value={contractors.length}
          suffix=" Entities"
          trend="Verified PAN/GST"
          trendType="up"
          icon={Building}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          borderColor="border-indigo-200/80"
          subtitle="Click to register new entities"
          onClick={() => onNavigate('registration')}
        />

        <StatCard
          title="Vigilance & Forensics"
          value={findings.length}
          suffix=" Flags"
          trend={findings.length === 0 ? "Clean Ledger" : "Anomalies Flagged"}
          trendType={findings.length === 0 ? "up" : "down"}
          icon={ShieldAlert}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          borderColor="border-rose-200/80"
          subtitle="Cartel & duplicate detection"
          onClick={() => onNavigate('duplicates')}
        />
      </div>

      {/* Quick Officer Command Palette */}
      <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Officer Evaluation & Administration Command Suite
            </h3>
            <p className="text-xs text-slate-500">
              Direct access to comparative statements, entity onboarding, and forensic collusion analyzers
            </p>
          </div>
          <span className="clay-badge-emerald text-xs font-mono font-bold px-2 py-0.5">
            Role 3 Officer Mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('registration')}
            className="p-4 clay-card cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between space-y-2 group"
          >
            <div>
              <div className="p-2 w-8 h-8 rounded-xl clay-badge-blue flex items-center justify-center text-blue-600 mb-2">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Register Contractors & Officers
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Add new corporate bidders or evaluation officers to the system.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-2 border-t border-slate-100">
              <span>Open Registration Portal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('comparativeStatement')}
            className="p-4 clay-card cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between space-y-2 group"
          >
            <div>
              <div className="p-2 w-8 h-8 rounded-xl clay-badge-emerald flex items-center justify-center text-emerald-600 mb-2">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                Comparative Statement (CST)
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Automated multi-bidder commercial matrix and L1 qualification table.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 gap-1 pt-2 border-t border-slate-100">
              <span>Generate CST Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('cartelGraph')}
            className="p-4 clay-card cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between space-y-2 group"
          >
            <div>
              <div className="p-2 w-8 h-8 rounded-xl clay-badge-rose flex items-center justify-center text-rose-600 mb-2">
                <Network className="w-4 h-4" />
              </div>
              <h4 className="font-black text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                Cartel Knowledge Graph
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Interactive network graph exposing shared PANs and sister-concern clusters.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-rose-600 gap-1 pt-2 border-t border-slate-100">
              <span>Inspect Syndicate Nodes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('duplicates')}
            className="p-4 clay-card cursor-pointer hover:scale-[1.02] transition-all flex flex-col justify-between space-y-2 group"
          >
            <div>
              <div className="p-2 w-8 h-8 rounded-xl clay-badge-blue flex items-center justify-center text-blue-600 mb-2">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                Duplicate & Collusion Detection
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Forensic SHA-256 fingerprint cross-matching and document similarity scan.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-2 border-t border-slate-100">
              <span>Inspect Duplicates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Tenders & Submissions Overview for Officer */}
      <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Tender Submissions & Evaluation Pipeline
            </h3>
            <p className="text-xs text-slate-500">
              Supervise live bidding schedules and review contractor dossier submissions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="clay-badge-emerald text-xs font-black px-2.5 py-1">
              {totalBidsCount} Total Bids Recorded
            </span>
          </div>
        </div>

        {totalBidsCount === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-14 h-14 rounded-3xl clay-card mx-auto flex items-center justify-center text-slate-400">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-800">
              No Submissions Received Yet
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              All mock test bids have been removed. Switch to a Contractor account to submit bids, or register new contractors via the Registration Portal.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('registration')}
                className="px-4 py-2 clay-btn-primary text-white text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Register Contractors</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <th className="py-3.5 px-6">Bidder Entity</th>
                  <th className="py-3.5 px-4">Tender Reference</th>
                  <th className="py-3.5 px-4">Tax IDs (PAN / GSTIN)</th>
                  <th className="py-3.5 px-4">Commercial Quote</th>
                  <th className="py-3.5 px-4">Compliance Rating</th>
                  <th className="py-3.5 px-4">Status Verdict</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bidders.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-900">{b.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{b.id} • {b.state}</div>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-slate-700">
                      {b.tenderId || b.tender_id}
                    </td>

                    <td className="py-4 px-4 text-[11px] font-mono text-slate-600">
                      <div>PAN: <strong className="text-slate-800">{b.pan}</strong></div>
                      <div>GST: <span className="text-slate-500">{b.gstin}</span></div>
                    </td>

                    <td className="py-4 px-4 font-mono font-black text-slate-900">
                      {b.quoteValue || b.quote_value || '₹ 440.00 Cr'}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className={b.complianceScore >= 80 ? 'text-emerald-700' : 'text-rose-700'}>
                          {b.complianceScore}%
                        </span>
                        <div className="w-12 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${b.complianceScore >= 80 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            style={{ width: `${b.complianceScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        b.status === 'Compliant' ? 'clay-badge-emerald' :
                        b.status === 'Flagged' ? 'clay-badge-rose' : 'clay-badge-amber'
                      }`}>
                        {b.status || 'Compliant'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => onGenerateReport && onGenerateReport(b)}
                        className="px-3 py-1.5 rounded-xl clay-btn-secondary text-blue-600 hover:text-blue-800 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Audit Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
