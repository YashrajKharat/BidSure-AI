import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  DollarSign,
  Eye,
  Award,
  Lock
} from 'lucide-react';

export default function TenderManagement({
  tenders = [],
  onNavigate,
  showToast,
  onCreateTender,
  currentRole = 'officer',
  selectedTenderId,
  setSelectedTenderId,
  onOpenTenderDetails,
  onOpenBidModal,
  onOpenAwardModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTender, setNewTender] = useState({
    title: '',
    authority: 'Mumbai Metropolitan Region Development Authority (MMRDA)',
    budget: '₹ 85.00 Cr',
    submissionDeadline: '15 Dec 2026, 17:00 IST',
    category: 'Civil Infrastructure & Smart Transport'
  });

  const filteredTenders = tenders.filter(t => {
    return t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           t.authority.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTender.title.trim()) {
      showToast && showToast('Please enter a contract title.', 'error');
      return;
    }

    const budgetVal = parseFloat(newTender.budget.replace(/[^\d.]/g, '') || 85);

    const created = {
      id: `TND-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTender.title,
      authority: newTender.authority,
      budget: newTender.budget,
      submissionDeadline: newTender.submissionDeadline,
      openingDate: '16 Dec 2026, 11:00 IST',
      status: 'Open for Bidding',
      totalBids: 0,
      category: newTender.category,
      emdAmount: `₹ ${(budgetVal * 0.01).toFixed(2)} Cr (1% Bank Guarantee)`,
      tenderFee: '₹ 25,000 + 18% GST',
      nodalOfficer: 'Er. Rajesh Sharma (Chief Procurement Officer)',
      procurementMethod: 'Open National Competitive Bidding (Two-Cover System GFR 173)',
      location: 'National Procurement Jurisdiction',
      description: `Comprehensive procurement, engineering, and statutory verification contract for ${newTender.title} as issued by ${newTender.authority}.`,
      scopeOfWork: [
        'Site survey, engineering validation, and statutory GFR 173 documentation clearance',
        'Supply and procurement of approved materials with third-party QA milestone sign-offs',
        'Turnkey execution with milestone-linked delivery stages and digital twin progress logs',
        'Mandatory anti-collusion integrity pact compliance and 36-month performance guarantee'
      ],
      eligibilityCriteria: {
        minTurnover: `₹ ${(budgetVal * 0.3).toFixed(1)} Cr average annual turnover over past 3 financial years (CA Certified)`,
        priorExperience: `Execution of at least 1 similar contract worth ≥ 80% of tender outlay in past 5 years`,
        solvencyLimit: `Bank Solvency Certificate of minimum ₹ ${(budgetVal * 0.2).toFixed(1)} Cr from Scheduled Bank`,
        statutory: 'Valid GSTIN registration, PAN, EPFO & ESIC clearances, with non-blacklisting affidavit'
      }
    };

    if (onCreateTender) {
      onCreateTender(created);
    } else {
      showToast && showToast(`Tender ${created.id} published successfully!`, 'success');
    }

    if (setSelectedTenderId) {
      setSelectedTenderId(created.id);
    }

    setIsModalOpen(false);
    setNewTender({
      title: '',
      authority: 'Mumbai Metropolitan Region Development Authority (MMRDA)',
      budget: '₹ 85.00 Cr',
      submissionDeadline: '15 Dec 2026, 17:00 IST',
      category: 'Civil Infrastructure & Smart Transport'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-6 sm:p-8 clay-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 clay-badge-blue text-xs font-black mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
            {currentRole === 'government' ? '🏛️ Role 1: Government Authority Portal' : 'Procurement Notice Portfolio'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentRole === 'government' ? 'Create & Publish Government Contracts' : 'Tender Notice & Evaluation Management'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {currentRole === 'government'
              ? 'Publish new public tenders, assign approved budget outlays, set GFR 173 qualification standards, and invite competitive contractor bids.'
              : 'Active tenders, submission deadlines, technical bid opening schedules, and participant counts'}
          </p>
        </div>

        {currentRole === 'government' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-xs font-black flex items-center gap-2 shrink-0 cursor-pointer clay-btn-amber text-slate-900 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Publish New Tender RFP
          </button>
        )}
      </div>

      {/* Tender Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTenders.map((tender) => {
          const isSelected = tender.id === selectedTenderId;
          const bidsCount = tender.totalBids || 0;
          const isAwarded = tender.status === 'Awarded & Sealed' || !!tender.awardedContract;

          return (
            <div
              key={tender.id}
              onClick={() => setSelectedTenderId && setSelectedTenderId(tender.id)}
              className={`p-6 clay-card flex flex-col justify-between space-y-4 cursor-pointer transition-all ${
                isSelected ? 'ring-3 ring-blue-500/60 shadow-lg' : 'hover:scale-[1.01]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-black text-blue-700 px-2.5 py-0.5 clay-badge-blue">
                    {tender.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="clay-badge clay-badge-blue text-[9px] font-black">
                        Selected
                      </span>
                    )}
                    {isAwarded ? (
                      <span className="clay-badge-amber px-2.5 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                        🔒 Awarded & Sealed
                      </span>
                    ) : (
                      <span className="clay-badge-emerald px-2.5 py-0.5 text-[10px] font-black">
                        {tender.status || 'Open'}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-black text-sm sm:text-base text-slate-900 leading-snug line-clamp-2">
                  {tender.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{tender.authority}</span>
                </p>
              </div>

              {/* Awarded Contract Plaque if sealed */}
              {isAwarded && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-slate-800 space-y-0.5">
                  <span className="text-[9px] font-black text-amber-800 uppercase block">Contract Awardee:</span>
                  <div className="font-extrabold text-slate-900 truncate">
                    {tender.awardedContract?.contractorName || 'BuildCraft Infra Projects Ltd'}
                  </div>
                  <div className="font-mono text-emerald-700 font-bold text-[10px] flex items-center justify-between">
                    <span>{tender.awardedContract?.awardedAmount || '₹ 468.20 Cr'}</span>
                    <span className="text-slate-400 font-sans text-[9px]">LoA Sealed</span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Estimated Outlay:</span>
                  <span className="font-black text-slate-900 font-mono">{tender.budget}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Deadline:</span>
                  <span className="font-bold text-slate-800">{tender.submissionDeadline}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{currentRole === 'contractor' ? 'Submissions Count:' : 'Submissions:'}</span>
                  <span className="font-extrabold text-blue-700 font-mono bg-blue-50/70 px-2 py-0.5 rounded">
                    {bidsCount} {bidsCount === 1 ? 'Contractor Submitted' : 'Contractors Submitted'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenTenderDetails) onOpenTenderDetails(tender);
                  }}
                  className="px-3 py-2.5 clay-btn-secondary text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:text-blue-700"
                  title="View complete specifications and GFR 173 criteria"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" /> Specs
                </button>

                {currentRole === 'contractor' ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenBidModal) onOpenBidModal(tender);
                    }}
                    className="flex-1 py-2.5 clay-btn-primary text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit Bid</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenAwardModal) onOpenAwardModal(tender);
                      }}
                      className={`px-3 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        isAwarded
                          ? 'clay-btn-amber text-slate-900 ring-1 ring-amber-400'
                          : 'clay-btn-secondary text-amber-800 hover:clay-btn-primary hover:text-white'
                      }`}
                      title={isAwarded ? 'View Sealed LoA Certificate' : 'Assign to contractor and seal contract'}
                    >
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isAwarded ? 'Sealed LoA' : 'Award & Seal'}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTenderId && setSelectedTenderId(tender.id);
                        onNavigate('overview');
                      }}
                      className={`flex-1 py-2.5 font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected ? 'clay-btn-primary text-white shadow-xs' : 'clay-btn-secondary hover:clay-btn-primary hover:text-white'
                      }`}
                    >
                      <span>Workspace</span> <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Contract Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="clay-modal p-6 sm:p-8 max-w-lg w-full space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="clay-badge clay-badge-blue text-[10px] font-black uppercase">
                  GFR 173 Compliant Notice
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Publish New Government Contract RFP
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Contract / Project Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart City Metro Feeder Transit Corridors Phase 2"
                  value={newTender.title}
                  onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
                  className="w-full clay-inset p-3 rounded-xl text-slate-900 font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Procuring Authority:</label>
                  <input
                    type="text"
                    required
                    value={newTender.authority}
                    onChange={(e) => setNewTender({ ...newTender, authority: e.target.value })}
                    className="w-full clay-inset p-3 rounded-xl text-slate-900 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Budget (Outlay):</label>
                  <input
                    type="text"
                    required
                    value={newTender.budget}
                    onChange={(e) => setNewTender({ ...newTender, budget: e.target.value })}
                    className="w-full clay-inset p-3 rounded-xl text-slate-900 font-semibold focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Submission Deadline:</label>
                  <input
                    type="text"
                    required
                    value={newTender.submissionDeadline}
                    onChange={(e) => setNewTender({ ...newTender, submissionDeadline: e.target.value })}
                    className="w-full clay-inset p-3 rounded-xl text-slate-900 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Work Category:</label>
                  <select
                    value={newTender.category}
                    onChange={(e) => setNewTender({ ...newTender, category: e.target.value })}
                    className="w-full clay-inset p-3 rounded-xl text-slate-900 font-semibold focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="Civil Infrastructure & Smart Transport">Civil Infrastructure</option>
                    <option value="IT Surveillance & Smart City Feeds">IT & AI Surveillance</option>
                    <option value="Water Treatment & Municipal Supply">Water Treatment & Utilities</option>
                    <option value="Highway Expansion & Bridges">Highways & Bridges</option>
                  </select>
                </div>
              </div>

              <div className="clay-inset p-3 rounded-xl text-[11px] text-slate-500 space-y-1">
                <span className="font-bold text-slate-700 block">✓ Automatic Verification Trigger:</span>
                Once published, this tender notice will be accessible to all registered contractors. When bidders upload their proposals, the AI will immediately scan them for cartel collusion, tax validity, and price anomalies.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 clay-btn-secondary text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 clay-btn-primary text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Publish Contract & Open Bids
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
