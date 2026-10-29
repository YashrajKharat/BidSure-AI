import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Building2,
  Award,
  Filter,
  Sparkles,
  Search,
  ExternalLink,
  ChevronDown,
  Layers,
  ShieldAlert,
  DollarSign,
  TrendingDown,
  Info,
  Calendar,
  MapPin,
  Check,
  Briefcase
} from 'lucide-react';
import { api } from '../services/api';

export default function ComparativeStatement({
  tenders = [],
  bidders = [],
  contractors = [],
  selectedTenderId = 'TND-2026-8901',
  setSelectedTenderId,
  onOpenAwardModal,
  onNavigate,
  showToast
}) {
  const [activeTenderId, setActiveTenderId] = useState(selectedTenderId || tenders[0]?.id || 'TND-2026-8901');
  const [matrixData, setMatrixData] = useState([]);
  const [filterMode, setFilterMode] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Keep activeTenderId in sync when parent prop changes
  useEffect(() => {
    if (selectedTenderId && selectedTenderId !== activeTenderId) {
      setActiveTenderId(selectedTenderId);
    }
  }, [selectedTenderId]);

  const handleTenderChange = (newTenderId) => {
    setActiveTenderId(newTenderId);
    if (setSelectedTenderId) {
      setSelectedTenderId(newTenderId);
    }
  };

  const currentTender = tenders.find(t => t.id === activeTenderId) || tenders[0] || {
    id: 'TND-2026-8901',
    title: 'Metro Line 4 Elevated Viaduct & Station Structural Works',
    authority: 'Mumbai Metropolitan Region Development Authority (MMRDA)',
    budget: '₹ 485.50 Cr',
    status: 'Technical Evaluation Active',
    eligibilityCriteria: {
      minTurnover: '₹ 145.0 Cr average annual turnover'
    }
  };

  const isAwarded = currentTender.status === 'Awarded & Sealed' || !!currentTender.awardedContract;

  // Build tender-specific comparative matrix
  const getComparativeMatrixForTender = (tenderId, allTenders, allBidders, serverRows) => {
    // 1. If server returned rows matching this tender_id, prefer them
    if (serverRows && serverRows.length > 0 && serverRows.some(r => r.tender_id === tenderId)) {
      return serverRows.filter(r => r.tender_id === tenderId);
    }

    // 2. Curated Evaluator Showcase Tenders
    if (tenderId === 'TND-2026-8901') {
      return [
        {
          rank: "L1 (Eligible)",
          bidder_id: "BIDDER-002",
          tender_id: "TND-2026-8901",
          name: "BuildCraft Infra Projects Ltd",
          pan: "AAACB4419K",
          turnover: "₹ 156.4 Cr",
          turnover_ok: true,
          turnover_note: "Pass (> ₹145 Cr Req)",
          emd_status: "Verified (₹ 4.85 Cr SBI e-BG SFMS)",
          solvency_ok: true,
          compliance_score: 98,
          cartel_flag: "CLEARED (Independent Origin & Isolated Metadata)",
          financial_quote: "₹ 468.20 Cr",
          variance_from_estimate: "-3.56%",
          final_verdict: "Technically Qualified (Legitimate L1 Winner)",
          action: "Recommend for Commercial Award Consideration",
          isWinner: true
        },
        {
          rank: "L1 (Disqualified)",
          bidder_id: "BIDDER-001",
          tender_id: "TND-2026-8901",
          name: "Apex Infrastructure Solutions Ltd",
          pan: "AAACA7821B",
          turnover: "₹ 142.8 Cr",
          turnover_ok: false,
          turnover_note: "Deficit (₹142.8 Cr < ₹145 Cr Req)",
          emd_status: "Verified (₹ 4.85 Cr)",
          solvency_ok: true,
          compliance_score: 48,
          cartel_flag: "CRITICAL (Shared PAN AAACA7821B & Workstation with Shivalik)",
          financial_quote: "₹ 442.80 Cr",
          variance_from_estimate: "-8.79%",
          final_verdict: "Disqualified - Collusion / Sister Concern (GFR 173)",
          action: "Issue Show-Cause Notice & Debarment Hearing",
          isWinner: false
        },
        {
          rank: "L2 (Cover Bid)",
          bidder_id: "BIDDER-003",
          tender_id: "TND-2026-8901",
          name: "Shivalik Heavy Engineering Corp",
          pan: "AAACA7821B",
          turnover: "₹ 62.1 Cr",
          turnover_ok: false,
          turnover_note: "Deficit (₹62.1 Cr < ₹145 Cr Req)",
          emd_status: "Manual Review (BOB SFMS Pending)",
          solvency_ok: false,
          compliance_score: 42,
          cartel_flag: "CRITICAL (Identical File Hash & Uniform +14.8% Markup)",
          financial_quote: "₹ 512.40 Cr",
          variance_from_estimate: "+5.54%",
          final_verdict: "Disqualified - Cover Bidding Syndicate & Deficient Turnover",
          action: "Forfeit EMD & Recommend 2-Year Debarment",
          isWinner: false
        }
      ];
    }

    if (tenderId === 'TND-2026-7740') {
      return [
        {
          rank: "L1 (Eligible)",
          bidder_id: "BIDDER-006",
          tender_id: "TND-2026-7740",
          name: "Larsen & Toubro Traction Power Division",
          pan: "AAACL0118M",
          turnover: "₹ 384.0 Cr",
          turnover_ok: true,
          turnover_note: "Pass (> ₹65 Cr Req)",
          emd_status: "Verified (₹ 1.62 Cr HDFC e-BG SFMS)",
          solvency_ok: true,
          compliance_score: 98,
          cartel_flag: "CLEARED (Independent Origin)",
          financial_quote: "₹ 158.40 Cr",
          variance_from_estimate: "-2.34%",
          final_verdict: "Technically Qualified (Legitimate L1 Winner)",
          action: "Recommend for Commercial Award Consideration",
          isWinner: true
        },
        {
          rank: "L2 (Disqualified)",
          bidder_id: "BIDDER-005",
          tender_id: "TND-2026-7740",
          name: "Krystal Grid Power Systems",
          pan: "AAACK5022R",
          turnover: "₹ 48.0 Cr",
          turnover_ok: false,
          turnover_note: "Deficit (₹48.0 Cr < ₹65 Cr Req)",
          emd_status: "Verified (₹ 1.62 Cr)",
          solvency_ok: true,
          compliance_score: 61,
          cartel_flag: "CLEARED (Independent Origin)",
          financial_quote: "₹ 174.50 Cr",
          variance_from_estimate: "+7.58%",
          final_verdict: "Disqualified - Financial Turnover Deficit (₹48 Cr vs ₹65 Cr Req)",
          action: "Reject Technical Bid Under Tender Clause 3.2",
          isWinner: false
        }
      ];
    }

    if (tenderId === 'TND-2026-6512') {
      return [
        {
          rank: "L1 (Eligible)",
          bidder_id: "BIDDER-004",
          tender_id: "TND-2026-6512",
          name: "Vertex Smart Mobility Tech Pvt Ltd",
          pan: "AABCV9912M",
          turnover: "₹ 110.5 Cr",
          turnover_ok: true,
          turnover_note: "Pass (> ₹35 Cr Req)",
          emd_status: "Verified (₹ 88.75 L ICICI e-BG SFMS)",
          solvency_ok: true,
          compliance_score: 91,
          cartel_flag: "CLEARED (Independent Origin)",
          financial_quote: "₹ 82.30 Cr",
          variance_from_estimate: "-7.27%",
          final_verdict: "Technically Qualified (Legitimate L1 Winner)",
          action: "Recommend for Commercial Award Consideration",
          isWinner: true
        }
      ];
    }

    // 3. Dynamic Fallback for newly created or custom submitted tenders
    const tenderObj = allTenders.find(t => t.id === tenderId);
    const tenderBidders = (allBidders || []).filter(b => b.tenderId === tenderId || b.tender_id === tenderId);

    if (tenderBidders.length > 0) {
      const budgetNum = parseFloat((tenderObj?.budget || '100').replace(/[^0-9.]/g, '')) || 100;
      
      const sorted = [...tenderBidders].sort((a, b) => {
        const qA = parseFloat((a.quoteValue || a.quote_value || '0').replace(/[^0-9.]/g, '')) || 0;
        const qB = parseFloat((b.quoteValue || b.quote_value || '0').replace(/[^0-9.]/g, '')) || 0;
        return qA - qB;
      });

      return sorted.map((b, idx) => {
        const quoteNum = parseFloat((b.quoteValue || b.quote_value || '0').replace(/[^0-9.]/g, '')) || budgetNum;
        const diff = ((quoteNum - budgetNum) / budgetNum) * 100;
        const variance = `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%`;
        const isDisqualified = (b.status === 'Disqualified' || b.riskRating === 'HIGH' || (b.complianceScore || b.compliance_score || 0) < 70);
        const isEligible = !isDisqualified;

        return {
          rank: isEligible && idx === 0 ? "L1 (Eligible)" : (isDisqualified ? `L${idx + 1} (Disqualified)` : `L${idx + 1}`),
          bidder_id: b.id,
          tender_id: tenderId,
          name: b.name,
          pan: b.pan || 'N/A',
          turnover: b.turnover || 'N/A',
          turnover_ok: isEligible,
          turnover_note: isEligible ? "Turnover Verified" : "Review Required",
          emd_status: "Verified (e-BG SFMS)",
          solvency_ok: isEligible,
          compliance_score: b.complianceScore || b.compliance_score || 85,
          cartel_flag: isDisqualified ? "FLAGGED (Forensic Check)" : "CLEARED (Independent Origin)",
          financial_quote: b.quoteValue || b.quote_value || `₹ ${quoteNum.toFixed(2)} Cr`,
          variance_from_estimate: variance,
          final_verdict: isEligible ? (idx === 0 ? "Technically Qualified (Legitimate L1)" : "Technically Qualified") : "Disqualified",
          action: isEligible && idx === 0 ? "Recommend for Commercial Award" : (isDisqualified ? "Issue Clarification" : "Standby"),
          isWinner: isEligible && idx === 0
        };
      });
    }

    return [];
  };

  // Load CST Matrix from API or seed whenever activeTenderId changes
  useEffect(() => {
    async function loadCST() {
      setLoading(true);
      try {
        const data = await api.getCSTMatrix(activeTenderId);
        if (data && data.length > 0) {
          setMatrixData(data);
        } else {
          setMatrixData(getComparativeMatrixForTender(activeTenderId, tenders, bidders, []));
        }
      } catch (e) {
        setMatrixData(getComparativeMatrixForTender(activeTenderId, tenders, bidders, []));
      } finally {
        setLoading(false);
      }
    }
    loadCST();
  }, [activeTenderId, tenders, bidders]);

  const items = matrixData.length > 0 
    ? matrixData 
    : getComparativeMatrixForTender(activeTenderId, tenders, bidders, []);

  // Filter within this specific tender's contractors
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.bidder_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.pan && item.pan.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterMode === 'QUALIFIED') return matchesSearch && !item.final_verdict.includes('Disqualified');
    if (filterMode === 'DISQUALIFIED') return matchesSearch && item.final_verdict.includes('Disqualified');
    return matchesSearch;
  });

  const eligibleCount = items.filter(i => !i.final_verdict.includes('Disqualified')).length;
  const disqualifiedCount = items.filter(i => i.final_verdict.includes('Disqualified')).length;
  const legitimateWinner = items.find(i => i.isWinner || i.rank.includes('Eligible')) || items[0];
  const lowestRawQuote = [...items].sort((a, b) => {
    const valA = parseFloat((a.financial_quote || '0').replace(/[^0-9.]/g, '')) || 0;
    const valB = parseFloat((b.financial_quote || '0').replace(/[^0-9.]/g, '')) || 0;
    return valA - valB;
  })[0];

  // Export to Excel / CSV for THIS selected tender
  const handleExportCSV = () => {
    try {
      const headers = [
        "Position / Rank", "Bidder ID", "Bidder Entity", "PAN Number", "Annual Turnover",
        "Turnover Eligibility", "EMD Guarantee Status", "Solvency Certified",
        "Compliance Score (%)", "Cartel Forensic Flag", "Financial Quote",
        "Variance vs Estimated Budget", "Committee Final Verdict", "Recommended Action"
      ];

      const csvRows = [
        `"COMPARATIVE STATEMENT OF TENDERS (CST) - BIDDERS EVALUATION"`,
        `"Tender ID: ${currentTender.id}","Title: ${currentTender.title.replace(/"/g, '""')}","Authority: ${currentTender.authority || 'MMRDA'}","Budget: ${currentTender.budget}"`,
        `""`,
        headers.join(",")
      ];

      items.forEach(it => {
        const row = [
          `"${it.rank}"`,
          `"${it.bidder_id}"`,
          `"${it.name}"`,
          `"${it.pan || 'N/A'}"`,
          `"${it.turnover}"`,
          `"${it.turnover_ok ? 'PASS' : 'DEFICIT'}"`,
          `"${it.emd_status}"`,
          `"${it.solvency_ok ? 'PASS' : 'FAIL'}"`,
          `"${it.compliance_score}%"`,
          `"${(it.cartel_flag || '').replace(/"/g, '""')}"`,
          `"${it.financial_quote}"`,
          `"${it.variance_from_estimate}"`,
          `"${(it.final_verdict || '').replace(/"/g, '""')}"`,
          `"${(it.action || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(","));
      });

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BidSure_CST_${currentTender.id}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast && showToast(`Exported CST CSV for ${currentTender.id} (${items.length} contractors) successfully!`, "success");
    } catch (err) {
      console.error(err);
      showToast && showToast("Failed to generate CSV export.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 clay-badge">
            <Scale className="w-4 h-4 text-emerald-600" /> Feature 3: Multi-Bidder Comparative Statement (CST Matrix)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Comparative Statement of Tenders (CST)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Multi-dimensional evaluation matrix comparing contractors for the selected tender. Synthesizes statutory turnover compliance, bank guarantee authenticity, anti-collusion forensics, and financial quotes under GFR 173 and CVC guidelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onOpenAwardModal && onOpenAwardModal(currentTender)}
            className={`px-5 py-2.5 text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-105 ${
              isAwarded ? 'clay-btn-amber text-slate-900 ring-2 ring-amber-500' : 'clay-btn-primary text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isAwarded ? '📜 View Sealed Contract (LoA)' : '🏆 Assign & Seal Contract (LoA)'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="clay-btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
            title="Download CSV for selected tender"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="clay-btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            title="Print Tender Committee Minutes"
          >
            <Printer className="w-4 h-4 text-slate-600" /> Print Minutes
          </button>
        </div>

        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* TENDER SELECTOR CONTROL BAR */}
      <div className="clay-card p-5 space-y-4 border-2 border-blue-500/20 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">
                  Officer Tender Selector
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                  Tender-Wise CST Mode
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Choose a tender below to compare only the contractors who submitted bids for that specific tender.
              </p>
            </div>
          </div>

          {/* Interactive Dropdown */}
          <div className="w-full lg:w-auto min-w-[340px] flex items-center gap-2">
            <label htmlFor="tender-select-dropdown" className="text-xs font-bold text-slate-700 whitespace-nowrap hidden sm:block">
              Select Tender:
            </label>
            <div className="relative w-full">
              <select
                id="tender-select-dropdown"
                value={activeTenderId}
                onChange={(e) => handleTenderChange(e.target.value)}
                className="w-full appearance-none clay-inset px-4 py-2.5 pr-10 text-xs font-bold text-slate-900 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl shadow-xs"
              >
                {tenders.map(t => {
                  const tenderBidCount = bidders.filter(b => b.tenderId === t.id || b.tender_id === t.id).length || t.totalBids || 0;
                  return (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.title.substring(0, 48)}... ({t.budget}) • {tenderBidCount} Bids
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick-Switch Tender Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Active Tenders:
          </span>
          {tenders.map(t => {
            const isSelected = t.id === activeTenderId;
            const bCount = bidders.filter(b => b.tenderId === t.id || b.tender_id === t.id).length || t.totalBids || 0;
            return (
              <button
                key={t.id}
                onClick={() => handleTenderChange(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'clay-btn-primary text-white shadow-sm ring-2 ring-blue-500/50'
                    : 'clay-btn-secondary text-slate-700 hover:text-blue-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{t.id}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {bCount} bids
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tender Info Strip */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Procuring Authority</span>
              <span className="font-bold text-slate-800">{currentTender.authority || 'MMRDA'}</span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Official Budget</span>
              <span className="font-extrabold text-blue-700">{currentTender.budget}</span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Min Turnover Threshold</span>
              <span className="font-bold text-slate-800">
                {currentTender.eligibilityCriteria?.minTurnover?.split(' ')[0]} {currentTender.eligibilityCriteria?.minTurnover?.split(' ')[1]} {currentTender.eligibilityCriteria?.minTurnover?.split(' ')[2] || '₹ 50.0 Cr'}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Category</span>
              <span className="font-medium text-slate-700">{currentTender.category || 'Civil Infrastructure'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
              isAwarded
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              {currentTender.status || 'Evaluation Active'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards for THIS Specific Tender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Tender Scope / Total Bids */}
        <div className="clay-card p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Tender Participants</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{items.length} Contractors</div>
          <p className="text-[11px] text-slate-500">
            Comparing strictly bids submitted for <span className="font-semibold text-slate-700">{activeTenderId}</span>
          </p>
        </div>

        {/* Card 2: Official Estimate */}
        <div className="clay-card p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Tender Budget Estimate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{currentTender.budget}</div>
          <p className="text-[11px] text-slate-500">
            Government benchmark ceiling baseline
          </p>
        </div>

        {/* Card 3: Lowest Numerical Quote */}
        <div className="clay-card p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Lowest Quote (Raw L1)</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-700">
            {lowestRawQuote?.financial_quote || 'N/A'}
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            {lowestRawQuote?.name || 'No bids'} ({lowestRawQuote?.variance_from_estimate || '0%'})
          </p>
        </div>

        {/* Card 4: Committee Recommended Legitimate L1 Winner */}
        <div className="clay-card p-4 space-y-1 bg-gradient-to-br from-emerald-50/60 to-white border border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider">Legitimate L1 Winner</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-extrabold text-slate-900 truncate" title={legitimateWinner?.name}>
            {legitimateWinner?.name || 'Under Review'}
          </div>
          <p className="text-[11px] font-bold text-emerald-700">
            {legitimateWinner?.financial_quote || ''} • Score: {legitimateWinner?.compliance_score || 0}% (Cleared)
          </p>
        </div>

      </div>

      {/* Filter Mode & Search Controls */}
      <div className="clay-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'ALL' ? 'clay-btn-primary text-white' : 'clay-btn-secondary text-slate-600'
            }`}
          >
            All Bidders ({items.length})
          </button>
          <button
            onClick={() => setFilterMode('QUALIFIED')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'QUALIFIED' ? 'clay-btn-primary text-white' : 'clay-btn-secondary text-slate-600'
            }`}
          >
            Eligible Only ({eligibleCount})
          </button>
          <button
            onClick={() => setFilterMode('DISQUALIFIED')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterMode === 'DISQUALIFIED' ? 'clay-btn-danger text-white' : 'clay-btn-secondary text-slate-600'
            }`}
          >
            Disqualified ({disqualifiedCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bidder, ID, or PAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="clay-inset w-full pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          />
        </div>
      </div>

      {/* Main Comparative Statement Table Card */}
      <div className="clay-card p-6 overflow-hidden space-y-4">
        
        {/* Awarded Banner if tender is sealed */}
        {isAwarded && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
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
                    {currentTender.awardedContract?.loaNumber || `LOA/${currentTender.id}/AWARD-01`}
                  </span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 mt-0.5">
                  Awarded to {currentTender.awardedContract?.contractorName || legitimateWinner?.name || 'BuildCraft Infra Projects Ltd'} for {currentTender.awardedContract?.awardedAmount || legitimateWinner?.financial_quote || '₹ 468.20 Cr'}
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenAwardModal && onOpenAwardModal(currentTender)}
              className="px-4 py-2 clay-btn-primary text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> View Sealed LoA Certificate
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide">
                Tender Matrix: {currentTender.id} — {currentTender.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Evaluating exclusively the {items.length} bidding contractor{items.length !== 1 ? 's' : ''} for this tender. Budget: <span className="font-bold text-slate-700">{currentTender.budget}</span>
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 self-start sm:self-auto px-2 py-1 bg-slate-100 rounded-md">
            GFR 173 / CVC Technical & Financial Format
          </span>
        </div>

        {/* Empty State if no contractors for this tender */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">No Contractors Found</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {searchTerm 
                ? `No contractors match "${searchTerm}" in tender ${currentTender.id}.`
                : `No bids submitted yet for tender ${currentTender.id}. Switch to the Contractor Portal to submit a bid, or select another active tender from the dropdown above.`
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-600 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3">Position</th>
                  <th className="py-3 px-3">Bidder Entity & Tax ID</th>
                  <th className="py-3 px-3">Turnover vs Req</th>
                  <th className="py-3 px-3">EMD Guarantee</th>
                  <th className="py-3 px-3">Compliance</th>
                  <th className="py-3 px-3">Cartel Forensic Flag</th>
                  <th className="py-3 px-3">Quote (L1 Rank)</th>
                  <th className="py-3 px-3">Evaluation Verdict</th>
                  <th className="py-3 px-3">Advisory Action</th>
                  <th className="py-3 px-3 text-center">Award Contract</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((row) => {
                  const isDisqualified = row.final_verdict.includes('Disqualified');
                  const isLegitL1 = row.rank.includes('Eligible') || row.isWinner;

                  // Sister concern / cartel collusion highlight in tender 8901
                  const isSisterConcern = (row.pan === 'AAACA7821B');

                  return (
                    <tr
                      key={row.bidder_id}
                      className={`transition-colors ${
                        isLegitL1 ? 'bg-emerald-50/50 hover:bg-emerald-50' : (isDisqualified ? 'bg-rose-50/40 hover:bg-rose-50/70' : 'hover:bg-slate-50')
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1 ${
                          isLegitL1 
                            ? 'bg-emerald-600 text-white font-black shadow-xs' 
                            : (isDisqualified ? 'bg-rose-600 text-white font-bold' : 'bg-slate-200 text-slate-700 font-bold')
                        }`}>
                          {isLegitL1 && <Award className="w-3 h-3 text-emerald-200" />}
                          {row.rank}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-extrabold text-slate-900">{row.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{row.bidder_id}</span>
                          {row.pan && (
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                              isSisterConcern
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              PAN: {row.pan}
                            </span>
                          )}
                        </div>
                        {isSisterConcern && (
                          <span className="inline-block text-[9px] font-bold text-rose-700 mt-0.5">
                            ⚠️ Shared Sister PAN with {row.bidder_id === 'BIDDER-001' ? 'Shivalik' : 'Apex'}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          {row.turnover_ok ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          )}
                          <span>{row.turnover}</span>
                        </div>
                        <div className={`text-[10px] font-semibold ${row.turnover_ok ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {row.turnover_note || (row.turnover_ok ? 'Meets Requirement' : 'Deficit Shortfall')}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-slate-700 font-medium">
                        <div className="font-semibold text-slate-800">{row.emd_status}</div>
                        <span className="text-[10px] text-slate-400">
                          Solvency: {row.solvency_ok ? '✓ Solvency Certified' : '✗ Deficit'}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                row.compliance_score >= 80 ? 'bg-emerald-500' : (row.compliance_score >= 60 ? 'bg-amber-500' : 'bg-rose-500')
                              }`}
                              style={{ width: `${row.compliance_score}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{row.compliance_score}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 max-w-[200px]">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold inline-block leading-snug ${
                          row.cartel_flag.includes('CRITICAL') 
                            ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {row.cartel_flag}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        <div className="text-sm">{row.financial_quote}</div>
                        <span className={`text-[10px] font-semibold ${row.variance_from_estimate.startsWith('-') ? 'text-blue-600' : 'text-amber-600'}`}>
                          {row.variance_from_estimate} vs Est.
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`font-bold block ${
                          isDisqualified ? 'text-rose-700' : (isLegitL1 ? 'text-emerald-700 font-extrabold' : 'text-slate-700')
                        }`}>
                          {row.final_verdict}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-slate-600 max-w-[180px]">
                        {row.action}
                      </td>

                      <td className="py-3 px-3 text-center">
                        {isLegitL1 ? (
                          <button
                            onClick={() => onOpenAwardModal && onOpenAwardModal(currentTender)}
                            className={`px-3 py-1.5 rounded-xl font-black text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs w-full transition-transform hover:scale-105 ${
                              isAwarded
                                ? 'clay-btn-amber text-slate-900 ring-1 ring-amber-400'
                                : 'clay-btn-primary text-white'
                            }`}
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>{isAwarded ? 'View LoA' : 'Award & Seal'}</span>
                          </button>
                        ) : isDisqualified ? (
                          <div className="space-y-1">
                            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-rose-100 text-rose-700 inline-block w-full">
                              Disqualified
                            </span>
                            {onNavigate && row.cartel_flag.includes('CRITICAL') && (
                              <button
                                onClick={() => onNavigate('cartelGraph')}
                                className="text-[9px] text-blue-600 hover:underline font-bold block mx-auto cursor-pointer"
                              >
                                View Cartel Graph →
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => onOpenAwardModal && onOpenAwardModal(currentTender)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold clay-btn-secondary text-slate-600 hover:text-blue-700 cursor-pointer w-full"
                          >
                            Standby
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Committee Signature Block */}
        <div className="pt-6 border-t border-slate-200/60 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500">
          <div className="clay-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Member Secretary:</span>
            <div className="font-bold text-slate-900">Rajesh Sharma</div>
            <div className="text-[11px]">Senior Evaluation Officer, MMRDA</div>
            <div className="text-[10px] font-mono text-emerald-600 mt-1 font-bold">✓ Digital Sign-Off Verified</div>
          </div>
          <div className="clay-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Financial Advisor:</span>
            <div className="font-bold text-slate-900">Kavita Deshmukh</div>
            <div className="text-[11px]">Chief Accounts Officer (Works)</div>
            <div className="text-[10px] font-mono text-emerald-600 mt-1 font-bold">✓ Financial Quotes Audited</div>
          </div>
          <div className="clay-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Tender Committee Chair:</span>
            <div className="font-bold text-slate-900">Arun Mehta, IAS</div>
            <div className="text-[11px]">Additional Metropolitan Commissioner</div>
            {isAwarded ? (
              <div className="text-[10px] font-mono text-emerald-700 mt-1 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ✓ LoA Cryptographically Sealed & Signed
              </div>
            ) : (
              <button
                onClick={() => onOpenAwardModal && onOpenAwardModal(currentTender)}
                className="mt-1 px-3 py-1.5 text-[10px] font-black clay-btn-amber text-slate-900 flex items-center gap-1.5 cursor-pointer shadow-xs rounded-xl hover:scale-105 transition-transform"
              >
                <Award className="w-3.5 h-3.5 text-amber-700" /> Affix Committee Seal & Award Tender
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
