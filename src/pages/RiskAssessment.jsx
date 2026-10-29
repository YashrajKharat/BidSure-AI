import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Scale,
  ExternalLink,
  Info,
  ChevronDown,
  Building2,
  BookOpen
} from 'lucide-react';

export default function RiskAssessment({
  riskFactors = [],
  bidders = [],
  onNavigate,
  showToast
}) {
  const [selectedBidderId, setSelectedBidderId] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const highRiskCount = (riskFactors || []).filter(r => (r.severity || '').toUpperCase() === 'HIGH').length;
  const mediumRiskCount = (riskFactors || []).filter(r => (r.severity || '').toUpperCase() === 'MEDIUM').length;
  const lowRiskCount = (riskFactors || []).filter(r => (r.severity || '').toUpperCase() === 'LOW').length;

  const filteredRisks = (riskFactors || []).filter(r => {
    const severity = (r.severity || '').toUpperCase();
    const matchesSeverity = severityFilter === 'ALL' || severity === severityFilter;
    const affected = Array.isArray(r.affectedBidders) ? r.affectedBidders : (Array.isArray(r.affected_bidders) ? r.affected_bidders : []);
    const matchesBidder = selectedBidderId === 'ALL' || affected.some(b => String(b).includes(selectedBidderId));
    return matchesSeverity && matchesBidder;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Risk Overview Header Card */}
      <div className="p-6 sm:p-8 clay-card flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 clay-badge-amber text-xs font-extrabold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Procurement Decision Support Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Procurement Integrity & Cartel Risk Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Forensic risk scoring evaluates covert proxy submissions, sister-company syndicates, and financial irregularities. 
            <strong className="text-slate-800"> Important Notice:</strong> This assessment functions exclusively as an advisory aid for the Procurement Officer; final statutory qualification rests solely with the competent tender authority.
          </p>
        </div>

        {/* Global Overall Risk Indicator Dial */}
        <div className="shrink-0 p-5 clay-hero flex flex-col items-center justify-center min-w-[200px] text-center text-white">
          <span className="text-[11px] font-extrabold text-blue-200 uppercase tracking-wider mb-1">
            Aggregate Tender Risk
          </span>
          <div className="text-3xl font-black text-rose-300 my-1">
            MODERATE
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>2 High-Risk Indicators</span>
          </div>
        </div>
      </div>

      {/* 3 Risk Severity Summary Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 clay-card flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider block mb-1">
              High Severity Risks
            </span>
            <div className="text-2xl font-black text-slate-900">{highRiskCount} Factors</div>
            <span className="text-[11px] text-slate-400 font-medium">Potential GFR Rule 173 violation</span>
          </div>
          <div className="p-3 rounded-2xl clay-badge-rose text-rose-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 clay-card flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block mb-1">
              Medium Severity Risks
            </span>
            <div className="text-2xl font-black text-slate-900">{mediumRiskCount} Factors</div>
            <span className="text-[11px] text-slate-400 font-medium">Requires clarification notice</span>
          </div>
          <div className="p-3 rounded-2xl clay-badge-amber text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 clay-card flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block mb-1">
              Cleared & Verified Items
            </span>
            <div className="text-2xl font-black text-slate-900">{lowRiskCount} Factors</div>
            <span className="text-[11px] text-slate-400 font-medium">Statutory checks passed</span>
          </div>
          <div className="p-3 rounded-2xl clay-badge-emerald text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Risk Factors List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Detailed Risk Factors & Officer Recommendations
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-1.5 clay-inset text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Severities</option>
              <option value="HIGH">High Severity Only</option>
              <option value="LOW">Cleared / Low Only</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRisks.map((risk) => {
            const isHigh = risk.severity === 'HIGH';
            const isLow = risk.severity === 'LOW';

            return (
              <div
                key={risk.id}
                className="p-6 clay-card space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl shrink-0 ${
                      isHigh ? 'clay-badge-rose text-rose-700' : isLow ? 'clay-badge-emerald text-emerald-700' : 'clay-badge-amber text-amber-700'
                    }`}>
                      {isHigh ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm sm:text-base text-slate-900">{risk.title}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          isHigh ? 'clay-badge-rose' : isLow ? 'clay-badge-emerald' : 'clay-badge-amber'
                        }`}>
                          {risk.severity} RISK ({risk.score}/100)
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">
                        Legal Ref: {risk.ruleCitation || risk.rule_citation || 'GFR Rule 173 / CVC Guidelines'}
                      </span>
                    </div>
                  </div>

                  <span className={`px-3 py-0.5 rounded-full text-xs font-extrabold self-start sm:self-auto ${
                    risk.status === 'Cleared' ? 'clay-badge-emerald' : 'clay-badge-rose'
                  }`}>
                    {risk.status}
                  </span>
                </div>

                {/* Affected Entities */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-600">Affected Bidding Parties:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(risk.affectedBidders) ? risk.affectedBidders : (Array.isArray(risk.affected_bidders) ? risk.affected_bidders : [])).map((b, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md clay-badge text-slate-800 font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explanation & Evidence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 clay-inset space-y-1">
                    <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                      Forensic Root Cause Analysis:
                    </span>
                    <p className="text-slate-600 leading-relaxed font-normal">{risk.explanation}</p>
                  </div>

                  <div className="p-4 clay-inset space-y-1">
                    <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                      Documentary & Cryptographic Evidence:
                    </span>
                    <p className="text-slate-600 leading-relaxed font-mono text-[11px] font-semibold">{risk.evidence}</p>
                  </div>
                </div>

                {/* Officer Recommended Action */}
                <div className="p-4 clay-inset flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-black text-blue-900 block mb-0.5">
                      Recommended Next Action for Procurement Officer:
                    </span>
                    <p className="text-blue-800 font-medium">{risk.recommendation}</p>
                  </div>

                  {isHigh && (
                    <button
                      onClick={() => onNavigate('duplicates')}
                      className="clay-btn-primary px-4 py-2 text-xs font-black shrink-0 cursor-pointer"
                    >
                      Open Diff Dossier →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
