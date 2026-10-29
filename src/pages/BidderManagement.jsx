import React, { useState } from 'react';
import {
  Users,
  Building2,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Eye,
  Download,
  CheckCircle2,
  ExternalLink,
  Lock,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function BidderManagement({
  bidders = [],
  tenders = [],
  selectedTenderId,
  currentRole = 'officer',
  contractorBidderId = 'BIDDER-001',
  onNavigate,
  onGenerateReport,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [tenderFilter, setTenderFilter] = useState(selectedTenderId || 'ALL');

  const myFirm = bidders.find(b => 
    b.id === contractorBidderId || 
    b.contractorId === contractorBidderId || 
    b.contractor_id === contractorBidderId
  ) || bidders[0] || {
    id: 'BIDDER-001',
    name: 'Apex Infrastructure Solutions Ltd',
    cin: 'U45200MH2012PLC238910',
    state: 'Maharashtra',
    gstin: '27AAACA7821B1Z9',
    pan: 'AAACA7821B',
    turnover: '₹ 142.8 Cr',
    complianceScore: 48,
    status: 'Flagged'
  };

  const sanitizedBidders = bidders.map(b => {
    if (b.id === 'BIDDER-002' || b.name?.toLowerCase().includes('buildcraft')) {
      return {
        ...b,
        turnover: '₹ 156.4 Cr',
        complianceScore: 98,
        status: 'Compliant',
        riskRating: 'LOW'
      };
    }
    if (b.id === 'BIDDER-001' || b.name?.toLowerCase().includes('apex')) {
      return {
        ...b,
        turnover: '₹ 142.8 Cr',
        complianceScore: 48,
        status: 'Flagged',
        riskRating: 'HIGH'
      };
    }
    if (b.id === 'BIDDER-003' || b.name?.toLowerCase().includes('shivalik')) {
      return {
        ...b,
        turnover: '₹ 62.1 Cr',
        complianceScore: 42,
        status: 'Flagged',
        riskRating: 'HIGH'
      };
    }
    return b;
  });

  const filteredBidders = sanitizedBidders.filter(b => {
    const matchesTender = tenderFilter === 'ALL' || b.tenderId === tenderFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.tenderId && b.tenderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || b.status.toUpperCase() === statusFilter;
    return matchesTender && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-6 sm:p-8 clay-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 clay-badge-blue text-xs font-black mb-2">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            {currentRole === 'contractor' ? 'Contractor Corporate Profile & Identity (Role 2)' : 'Participant Eligibility Registry'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentRole === 'contractor' ? 'Your Corporate Profile & Statutory Credentials' : 'Bidder Corporate Directory & Statutory Profiles'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {currentRole === 'contractor'
              ? 'Your registered legal entity details, verified GSTIN/PAN records, and statutory certificates conforming to GFR 2017 eligibility standards.'
              : 'Registered corporate participants, past tender compliance track records, and statutory identifiers'}
          </p>
        </div>

        {currentRole !== 'contractor' ? (
          <button
            onClick={() => {
              showToast && showToast('Bidder registration opened for authenticated portal vendors.', 'info');
            }}
            className="clay-btn-primary px-5 py-2.5 text-xs font-black flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Register New Bidder
          </button>
        ) : (
          <button
            onClick={() => onNavigate && onNavigate('documents')}
            className="clay-btn-primary px-5 py-2.5 text-xs font-black flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Submit Documents for Active Tender
          </button>
        )}
      </div>

      {/* Contractor Authenticated Profile Card */}
      {currentRole === 'contractor' && (
        <div className="clay-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl clay-badge-blue flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base sm:text-lg text-slate-900">{myFirm.name}</h3>
                  <span className="clay-badge-emerald text-[10px] font-black px-2 py-0.5">VERIFIED VENDOR</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  CIN: <span className="font-mono text-slate-700">{myFirm.cin}</span> • Registered in {myFirm.state}, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-500">Eligibility Health:</span>
              <span className="clay-badge-emerald text-xs font-black px-2.5 py-1">
                {myFirm.complianceScore}% Compliant
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 clay-inset rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Income Tax PAN</span>
              <span className="text-sm font-black font-mono text-slate-900 mt-0.5 block">{myFirm.pan}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Active & Validated</span>
            </div>

            <div className="p-4 clay-inset rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GSTIN Registration</span>
              <span className="text-xs sm:text-sm font-black font-mono text-blue-700 mt-0.5 block truncate">{myFirm.gstin}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Regular Taxpayer • Clean Ledger</span>
            </div>

            <div className="p-4 clay-inset rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">3-Yr Annual Turnover</span>
              <span className="text-sm font-black text-slate-900 mt-0.5 block">{myFirm.turnover}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Exceeds Min. RFP Limit</span>
            </div>

            <div className="p-4 clay-inset rounded-2xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vendor Portal ID</span>
              <span className="text-sm font-black font-mono text-purple-700 mt-0.5 block">{myFirm.id}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Central e-Procurement Node</span>
            </div>
          </div>

          {/* Privacy Notice Banner */}
          <div className="p-4 clay-card flex items-start gap-3 bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/50 border border-blue-200/50">
            <div className="p-2 rounded-xl clay-badge-blue text-blue-600 shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <h5 className="font-black text-slate-900 text-xs">
                Competitor Data Protection under GFR 173 Active
              </h5>
              <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                As per official Indian procurement integrity standards, contractor financial balance sheets, tax filings, and technical credentials of other participating firms are <strong>restricted from peer viewing</strong>. You can view your own verified corporate profile above and the total participation count in the directory below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Directory Table */}
      <div className="clay-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by legal name, PAN, GSTIN, state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none w-52 sm:w-64"
              />
            </div>

            {tenders.length > 0 && (
              <select
                value={tenderFilter}
                onChange={(e) => setTenderFilter(e.target.value)}
                className="px-3 py-1.5 clay-inset text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer max-w-[210px] truncate"
              >
                <option value="ALL">All Tenders ({bidders.length} Bidders)</option>
                {tenders.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.id}: {t.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 clay-inset text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLIANT">Compliant (Eligible)</option>
            <option value="UNDER REVIEW">Under Review</option>
            <option value="FLAGGED">Flagged / Cartel Risk</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-3.5 px-6">Entity Legal Name</th>
                <th className="py-3.5 px-4">Tender Reference</th>
                <th className="py-3.5 px-4">Corporate ID (CIN)</th>
                <th className="py-3.5 px-4">Statutory Tax IDs</th>
                <th className="py-3.5 px-4">3-Yr Annual Turnover</th>
                <th className="py-3.5 px-4">Compliance Score</th>
                <th className="py-3.5 px-4">Eligibility Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBidders.map((b, index) => {
                const isCompliant = b.status === 'Compliant' && b.complianceScore >= 80;
                const isFlagged = b.status === 'Flagged' || b.status === 'Disqualified' || b.complianceScore < 60;
                const isMyFirm = currentRole === 'contractor' && (b.id === contractorBidderId || b.contractorId === contractorBidderId || b.contractor_id === contractorBidderId || b.id === myFirm.id);
                const isCompetitor = currentRole === 'contractor' && !isMyFirm;

                return (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isCompetitor
                            ? 'bg-slate-100 text-slate-500'
                            : isCompliant
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isCompetitor ? <Lock className="w-4 h-4 text-slate-500" /> : <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            {isCompetitor ? `Participating Vendor #${index + 1}` : b.name}
                            {isMyFirm && (
                              <span className="clay-badge-blue text-[9px] font-black px-1.5 py-0.5">
                                Your Registered Firm
                              </span>
                            )}
                            {isCompetitor && (
                              <span className="clay-badge-emerald text-[9px] font-extrabold px-1.5 py-0.5 flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> Sealed
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {isCompetitor ? 'Identity Sealed under GFR Rule 173' : `${b.state}, India`}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-blue-700 text-xs">
                      {b.tenderId || 'TND-2026-8901'}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                      {isCompetitor ? (
                        <span className="text-slate-400 flex items-center gap-1 font-sans">
                          <Lock className="w-3 h-3 text-slate-400" /> Sealed
                        </span>
                      ) : (
                        b.cin
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px]">
                      {isCompetitor ? (
                        <span className="text-slate-400 flex items-center gap-1 font-sans">
                          <Lock className="w-3 h-3 text-slate-400" /> Sealed (CVC Protocol)
                        </span>
                      ) : (
                        <>
                          <div className="text-slate-800 font-semibold">{b.gstin}</div>
                          <div className="text-slate-400">PAN: {b.pan}</div>
                        </>
                      )}
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-800">
                      {isCompetitor ? (
                        <span className="text-slate-400 font-medium text-xs flex items-center gap-1 font-sans">
                          <Lock className="w-3 h-3 text-slate-400" /> Sealed Envelope
                        </span>
                      ) : (
                        b.turnover
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {isCompetitor ? (
                        <span className="text-slate-400 font-medium text-xs flex items-center gap-1">
                          <Lock className="w-3 h-3 text-slate-400" /> Sealed
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                b.complianceScore >= 80 ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${b.complianceScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-xs text-slate-900">{b.complianceScore}%</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {isCompetitor ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Lock className="w-3 h-3 text-slate-400" />
                          Bid Sealed
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isCompliant
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isFlagged
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {b.status}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      {isCompetitor ? (
                        <div className="flex items-center justify-end">
                          <span className="text-[10px] text-slate-400 font-bold px-2.5 py-1 clay-inset rounded-lg flex items-center gap-1">
                            <Lock className="w-3 h-3 text-slate-400" /> Confidential
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onNavigate(isFlagged ? 'duplicates' : 'compliance')}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                            title="View Compliance Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onGenerateReport && onGenerateReport(b)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                            title="Generate PDF Dossier"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
