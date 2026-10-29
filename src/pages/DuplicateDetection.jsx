import React, { useState } from 'react';
import {
  CopyCheck,
  FileText,
  AlertTriangle,
  Scale,
  Search,
  Filter,
  RotateCcw,
  Eye,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import StatCard from '../components/StatCard';
import SideBySideDiffModal from '../components/SideBySideDiffModal';
import { DuplicateDetectionIllustration, EmptyStateIllustration } from '../components/Illustrations';

export default function DuplicateDetection({
  findings = [],
  bidders = [],
  onSaveFindingDecision,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [bidderFilter, setBidderFilter] = useState('ALL');
  const [activeModalFinding, setActiveModalFinding] = useState(null);

  // Compute 4 Top Summary Counts safely
  const exactDuplicatesCount = (findings || []).filter(f => String(f.matchType || f.match_type || '').includes('Exact')).length;
  const similarDocsCount = (findings || []).filter(f => String(f.matchType || f.match_type || '').includes('Similar')).length;
  const repeatedIdentifiersCount = (findings || []).filter(f => String(f.matchType || f.match_type || '').includes('Identifier')).length;
  const pendingReviewCount = (findings || []).filter(f => {
    const status = String(f.reviewStatus || f.review_status || 'Pending');
    return status === 'Pending' || status === 'Needs Further Review';
  }).length;

  // Filtered Findings
  const filteredFindings = (findings || []).filter(f => {
    const id = String(f.id || '').toLowerCase();
    const reason = String(f.reason || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    const biddersList = Array.isArray(f.bidders) ? f.bidders : [];

    const matchesSearch = id.includes(search) ||
                          biddersList.some(b => String(b).toLowerCase().includes(search)) ||
                          reason.includes(search);

    const matchTypeStr = String(f.matchType || f.match_type || '').toUpperCase();
    const matchesType = typeFilter === 'ALL' || matchTypeStr.includes(typeFilter);
    const matchesBidder = bidderFilter === 'ALL' || biddersList.includes(bidderFilter);

    return matchesSearch && matchesType && matchesBidder;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('ALL');
    setBidderFilter('ALL');
  };

  const handleSaveDecision = (findingId, decision, officerNotes) => {
    if (onSaveFindingDecision) {
      onSaveFindingDecision(findingId, decision, officerNotes);
      showToast && showToast(`Saved officer determination: "${decision}" for ${findingId}`, 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header / Forensic Context Banner */}
      <div className="p-6 sm:p-8 clay-card flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 clay-badge-rose text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> High-Priority Anti-Collusion & Cartel Scan
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cross-Bidder Duplicate & Collusion Detection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Identifies collusive proxy bidding, shared tax identities (PAN/GSTIN), identical author workstation metadata, and recycled bill-of-quantities schedules across competing procurement dossiers.
          </p>
        </div>

        <div className="shrink-0 hidden lg:block">
          <DuplicateDetectionIllustration className="w-56 h-40 drop-shadow-md" />
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Exact File Duplicates"
          value={exactDuplicatesCount}
          suffix=" Matches"
          trend="SHA-256 Collision"
          trendType="down"
          icon={CopyCheck}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          borderColor="border-rose-200/80"
          subtitle="Identical byte payload"
        />

        <StatCard
          title="Similar Documents"
          value={similarDocsCount}
          suffix=" Pairs"
          trend="Over 85% Text Overlap"
          trendType="down"
          icon={FileText}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          borderColor="border-amber-200/80"
          subtitle="Lexical cloning detected"
        />

        <StatCard
          title="Repeated Identifiers"
          value={repeatedIdentifiersCount}
          suffix=" Entities"
          trend="Shared PAN / GSTIN"
          trendType="down"
          icon={AlertTriangle}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          borderColor="border-indigo-200/80"
          subtitle="Sister firm indicators"
        />

        <StatCard
          title="Findings Requiring Review"
          value={pendingReviewCount}
          suffix=" Actions"
          trend="Vigilance Queue"
          trendType="neutral"
          icon={Scale}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          borderColor="border-blue-200/80"
          subtitle="Officer determination required"
        />
      </div>

      {/* Findings Table Section */}
      <div className="clay-card overflow-hidden">
        
        {/* Search, Filter & Reset Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search finding ID, bidder, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none w-52 sm:w-64"
              />
            </div>

            {/* Finding Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 clay-inset text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Finding Types</option>
              <option value="EXACT">Exact File Duplicate (Hash)</option>
              <option value="SIMILAR">High Text Similarity (&gt;85%)</option>
              <option value="IDENTIFIER">Repeated Tax Identifier</option>
              <option value="REVIEW">Needs Officer Review</option>
            </select>

            {/* Bidder Filter */}
            <select
              value={bidderFilter}
              onChange={(e) => setBidderFilter(e.target.value)}
              className="px-3 py-1.5 clay-inset text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer max-w-[180px] truncate"
            >
              <option value="ALL">All Bidders</option>
              {bidders.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>

            {/* Reset Button */}
            {(searchTerm || typeFilter !== 'ALL' || bidderFilter !== 'ALL') && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 clay-btn-secondary text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" /> Reset
              </button>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{filteredFindings.length}</strong> findings
          </span>
        </div>

        {/* Findings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <th className="py-3.5 px-6">Finding ID</th>
                <th className="py-3.5 px-4">Involved Bidders</th>
                <th className="py-3.5 px-4">Document Pair</th>
                <th className="py-3.5 px-4">Match Classification</th>
                <th className="py-3.5 px-4">Similarity Score</th>
                <th className="py-3.5 px-4">Review Determination</th>
                <th className="py-3.5 px-6 text-right">Side-by-Side</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFindings.length > 0 ? (
                filteredFindings.map((finding) => {
                  const isCritical = finding.severity === 'CRITICAL';
                  const isHigh = finding.severity === 'HIGH';
                  const isCleared = finding.reviewStatus === 'Legitimate Shared Information';

                  return (
                    <tr key={finding.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            isCritical ? 'bg-rose-500 animate-ping' : isHigh ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          {finding.id}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-800">
                        <div className="space-y-0.5">
                          {(Array.isArray(finding.bidders) ? finding.bidders : []).map((b, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-900 truncate max-w-[200px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> {b}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-medium text-slate-600">
                        <div className="text-[11px] truncate max-w-[200px]" title={finding.docA?.name}>
                          A: {finding.docA?.name || 'Schedule A.pdf'}
                        </div>
                        {finding.docB && (
                          <div className="text-[11px] truncate max-w-[200px] text-slate-400" title={finding.docB?.name}>
                            B: {finding.docB?.name}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {finding.matchType || finding.match_type}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        {(finding.similarityScore !== undefined || finding.similarity_score !== undefined) && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  (finding.similarityScore ?? finding.similarity_score) >= 0.9
                                    ? 'bg-rose-500'
                                    : (finding.similarityScore ?? finding.similarity_score) >= 0.7
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                                }`}
                                style={{ width: `${Math.min(100, Math.round(((finding.similarityScore ?? finding.similarity_score) || 0) * 100))}%` }}
                              />
                            </div>
                            <span className="font-extrabold text-slate-900 text-xs">
                              {(((finding.similarityScore ?? finding.similarity_score) || 0) * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isCleared
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : (finding.reviewStatus || finding.review_status) === 'Confirmed Duplicate'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {finding.reviewStatus || finding.review_status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setActiveModalFinding(finding)}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect Match
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <EmptyStateIllustration title="No Duplicates Match Filter" />
                    <button
                      onClick={handleResetFilters}
                      className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Reset all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Diff Modal Component */}
      <SideBySideDiffModal
        isOpen={Boolean(activeModalFinding)}
        finding={activeModalFinding}
        onClose={() => setActiveModalFinding(null)}
        onSaveDecision={handleSaveDecision}
      />
    </div>
  );
}
