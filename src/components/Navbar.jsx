import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  LogOut,
  Sliders,
  HelpCircle,
  X,
  ExternalLink,
  Building,
  Eye,
  Play,
  Film
} from 'lucide-react';

export default function Navbar({
  activePage,
  setActivePage,
  setMobileOpen,
  isCollapsed,
  tenders = [],
  selectedTenderId,
  setSelectedTenderId,
  currentRole = 'officer',
  setCurrentRole,
  showToast,
  onSearchQuery,
  onOpenTenderDetails,
  onStartDemoTour,
  contractors = [],
  officers = [],
  activeContractor,
  activeOfficer,
  onSwitchContractor,
  onSwitchOfficer
}) {
  const [searchVal, setSearchVal] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const notifRef = useRef(null);
  const profRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profRef.current && !profRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pageTitles = {
    overview: { title: 'Tender Compliance Overview', subtitle: 'Real-time automated audit telemetry & compliance status' },
    cartelGraph: { title: 'Cartel & Collusion Knowledge Graph', subtitle: 'Interactive visual entity network and sister-concern clusters' },
    metadataInspector: { title: 'Workstation & Forensic Metadata Inspector', subtitle: 'Hardware ID, OS user accounts, and millisecond creation timestamps' },
    comparativeStatement: { title: 'Comparative Statement of Tenders (CST)', subtitle: 'Multi-bidder side-by-side evaluation matrix and Excel export' },
    bidders: { title: 'Bidder Registry & Eligibility', subtitle: 'Participant profiles, statutory filings, and past verification ratings' },
    tenders: { title: 'Tender Management Workspace', subtitle: 'Active RFP notices, submission deadlines, and evaluation pipelines' },
    documents: { title: 'Document Intelligence & Extraction', subtitle: 'High-speed OCR, regex entity extraction, and SHA-256 fingerprinting' },
    duplicates: { title: 'Duplicate & Collusion Detection', subtitle: 'Forensic cross-bidder hash matching, text similarity, and shared identifiers' },
    compliance: { title: 'Compliance Rule Matrix', subtitle: 'Automated statutory checklist, clause validation, and scoring breakdown' },
    risk: { title: 'Fraud & Procurement Risk Assessment', subtitle: 'Collusion indicators, sister concern checks, and officer recommendations' },
    assistant: { title: 'AI Procurement Copilot & Intelligence Assistant', subtitle: 'Evidence-grounded explanations, clause validation, and local AI query engine' },
    reports: { title: 'Verification Dossiers & Audit Reports', subtitle: 'Court-admissible PDF audit generation and digital verification sign-off' },
    humanReview: { title: 'Human Review & Officer Triage', subtitle: 'Vigilance queue for ambiguous findings requiring officer discretion' },
    settings: { title: 'System Settings & Rule Engine', subtitle: 'Threshold calibration, OCR models, and government registry integrations' },
  };

  const currentInfo = pageTitles[activePage] || { title: 'BidSure AI Dashboard', subtitle: 'Procurement Compliance Verification Platform' };

  const notifications = [
    {
      id: 'N1',
      title: 'Collusion Warning Flagged',
      detail: 'Apex Infra and Shivalik Corp share identical SHA-256 file hash.',
      time: '12m ago',
      unread: true,
      type: 'alert'
    },
    {
      id: 'N2',
      title: 'Document Analysis Finished',
      detail: 'Extracted GSTIN and Audited UDIN for 6 submitted bids.',
      time: '45m ago',
      unread: true,
      type: 'success'
    },
    {
      id: 'N3',
      title: 'Tender TND-2026-8901 Deadline Passed',
      detail: 'Technical opening portal is now closed; ready for automated audit.',
      time: '2h ago',
      unread: false,
      type: 'info'
    }
  ];

  return (
    <header className="sticky top-0 z-20 mx-4 sm:mx-6 lg:mx-8 my-3.5 clay-card px-4 sm:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Breadcrumbs / Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl clay-btn-secondary text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-0.5">
              <span>BidSure AI</span>
              <span>/</span>
              <span className="text-blue-600 font-extrabold capitalize">{activePage}</span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
              {currentInfo.title}
            </h1>
          </div>
        </div>

        {/* Center / Right: Global Search & Controls */}
        <div className="flex items-center gap-3">
          {/* Active Tender Selector dropdown */}
          <div className="hidden lg:flex items-center gap-2 clay-inset px-3 py-1.5 text-xs text-slate-700">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Tender:</span>
            <select
              value={selectedTenderId}
              onChange={(e) => {
                const newId = e.target.value;
                if (setSelectedTenderId) setSelectedTenderId(newId);
                const target = tenders.find(t => t.id === newId);
                if (target && showToast) {
                  showToast(`Switched active context to ${target.id} (${target.title.slice(0, 32)}...)`, 'info');
                }
              }}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer max-w-[200px] truncate"
            >
              {tenders.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id}: {t.title.slice(0, 30)}...
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                const target = tenders.find(t => t.id === selectedTenderId) || tenders[0];
                if (onOpenTenderDetails && target) onOpenTenderDetails(target);
              }}
              title="View Complete Tender Dossier & RFP Specifications"
              className="p-1 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Trigger Button */}
          <div className="relative">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl clay-inset text-slate-500 hover:text-slate-800 text-xs font-semibold transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Search bids, entities, PAN...</span>
              <span className="sm:hidden">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-extrabold text-blue-600 bg-white rounded-md shadow-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* 3-Role Persona Switcher Pill */}
          <div className="flex items-center gap-1 p-1 clay-inset rounded-2xl select-none">
            <button
              type="button"
              onClick={() => {
                setCurrentRole && setCurrentRole('government');
                setActivePage('tenders');
                showToast && showToast('Switched to Role 1: Government Authority (Publish & Manage Tenders)', 'info');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'government'
                  ? 'clay-btn-amber text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Role 1: Government Authority - Creates and publishes Tenders/RFPs"
            >
              <Building className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline">1. Government</span>
              <span className="xl:hidden">Gov</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole && setCurrentRole('contractor');
                setActivePage('documents');
                showToast && showToast('Switched to Role 2: Contractor / Bidder (Submit Bids & Proposals)', 'info');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'contractor'
                  ? 'clay-btn-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Role 2: Contractor / Bidder - Submits proposals and BOQ quotes for tenders"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden xl:inline">2. Contractor</span>
              <span className="xl:hidden">Bidder</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentRole && setCurrentRole('officer');
                setActivePage('overview');
                showToast && showToast('Switched to Role 3: Procurement Officer (Full Vigilance & Forensic Suite)', 'info');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                currentRole === 'officer'
                  ? 'clay-btn-emerald text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Role 3: Procurement Officer - Full audit, CST L1 ranking, cartel & collusion detection"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">3. Officer</span>
              <span className="xl:hidden">Auditor</span>
            </button>
          </div>


          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl clay-btn-secondary text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 clay-modal py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900">Notifications</span>
                    <span className="clay-badge-rose text-[9px] font-extrabold px-1.5 py-0.2">2 New</span>
                  </div>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] text-blue-600 hover:underline font-bold"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.type === 'alert') setActivePage('duplicates');
                        setNotificationsOpen(false);
                      }}
                      className={`p-3 text-xs hover:bg-white/80 cursor-pointer transition-colors flex gap-3 ${
                        n.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {n.type === 'info' && <FileText className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-slate-900 truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{n.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2 border-t border-slate-200/60 text-center">
                  <button
                    onClick={() => { setActivePage('humanReview'); setNotificationsOpen(false); }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    View All Officer Triage Tasks <ChevronDown className="w-3 h-3 -rotate-90" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative" ref={profRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl clay-btn-secondary transition-colors cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                currentRole === 'government' ? 'clay-badge-amber text-amber-900' :
                currentRole === 'contractor' ? 'clay-badge-blue text-blue-900' :
                'clay-badge-emerald text-emerald-900'
              }`}>
                {currentRole === 'government' ? 'GA' : currentRole === 'contractor' ? (activeContractor?.id || 'CTR') : (activeOfficer?.id || 'OFF')}
              </div>
              <div className="hidden sm:flex flex-col text-left pr-1">
                <span className="text-xs font-extrabold text-slate-800 leading-tight truncate max-w-[140px]">
                  {currentRole === 'government' ? 'Authority Portal' : currentRole === 'contractor' ? (activeContractor?.name?.split(' ')[0] + ' Infra' || 'Apex Infra') : (activeOfficer?.name || 'Er. Rajesh Sharma')}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {currentRole === 'government' ? 'Tender Issuer' : currentRole === 'contractor' ? (activeContractor?.id || 'CTR-001') : (activeOfficer?.id || 'OFF-001')}
                </span>
              </div>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400 mr-1" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 clay-modal py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-200/60">
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    {currentRole === 'government' ? 'Public Works & Urban Affairs Authority' : currentRole === 'contractor' ? (activeContractor?.name || 'Apex Infrastructure Solutions') : (activeOfficer?.name || 'Er. Rajesh Sharma')}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate">
                    {currentRole === 'government' ? 'procurement@authority.gov.in' : currentRole === 'contractor' ? (activeContractor?.email || 'tenders@contractor.in') : (activeOfficer?.email || 'officer@gov.in')}
                  </div>
                  <span className={`inline-block mt-1 text-[9px] font-black px-2 py-0.5 rounded-full ${
                    currentRole === 'government' ? 'clay-badge-amber' : currentRole === 'contractor' ? 'clay-badge-blue' : 'clay-badge-emerald'
                  }`}>
                    {currentRole === 'government' ? '🏛️ Role 1: Government Authority' : currentRole === 'contractor' ? `🏗️ ${activeContractor?.id || 'CTR-001'} (Confidential)` : `🛡️ ${activeOfficer?.id || 'OFF-001'} (Auditor)`}
                  </span>
                </div>

                {/* Account Switcher Section inside Dropdown */}
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    {currentRole === 'contractor' ? 'Switch Contractor Account' : currentRole === 'officer' ? 'Switch Officer Account' : 'Authority Context'}
                  </div>
                  
                  {currentRole === 'contractor' && (
                    <div className="space-y-1 max-h-36 overflow-y-auto">
                      {contractors.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            if (onSwitchContractor) onSwitchContractor(c.id);
                            setProfileOpen(false);
                            if (showToast) showToast(`Switched active contractor dashboard to ${c.name}`, 'info');
                          }}
                          className={`p-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                            c.id === activeContractor?.id ? 'bg-blue-100/70 font-bold text-blue-900' : 'hover:bg-white text-slate-700'
                          }`}
                        >
                          <span className="truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">{c.id}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentRole === 'officer' && (
                    <div className="space-y-1 max-h-36 overflow-y-auto">
                      {officers.map((o) => (
                        <div
                          key={o.id}
                          onClick={() => {
                            if (onSwitchOfficer) onSwitchOfficer(o.id);
                            setProfileOpen(false);
                            if (showToast) showToast(`Switched active officer dashboard to ${o.name}`, 'info');
                          }}
                          className={`p-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                            o.id === activeOfficer?.id ? 'bg-emerald-100/70 font-bold text-emerald-900' : 'hover:bg-white text-slate-700'
                          }`}
                        >
                          <span className="truncate">{o.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">{o.id}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setActivePage('registration'); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-xs text-left text-blue-600 font-bold hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Register New Contractors / Officers</span>
                  </button>

                  <button
                    onClick={() => { setActivePage('settings'); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-400" /> Compliance Settings
                  </button>
                  <button
                    onClick={() => { setActivePage('reports'); setProfileOpen(false); }}
                    className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Audit Dossiers
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl clay-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-2">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 clay-inset gap-3">
              <Search className="w-4 h-4 text-blue-600" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search bidders (Apex, Shivalik), GSTIN, PAN, or Tender ID..."
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  onSearchQuery && onSearchQuery(e.target.value);
                }}
                className="w-full text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
              {searchVal && (
                <button onClick={() => setSearchVal('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ESC
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="p-4 max-h-80 overflow-y-auto space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Suggested Quick Jumps
              </div>

              <div
                onClick={() => { setActivePage('duplicates'); setSearchModalOpen(false); }}
                className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span className="font-semibold text-slate-800">Duplicate Finding #FIND-2026-081</span>
                  <span className="text-slate-400">(Apex vs Shivalik)</span>
                </div>
                <span className="text-blue-600 font-medium">Inspect Match →</span>
              </div>

              <div
                onClick={() => { setActivePage('documents'); setSearchModalOpen(false); }}
                className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-slate-800">Upload & Analyse New Bid Documents</span>
                  <span className="text-slate-400">OCR & SHA-256 Engine</span>
                </div>
                <span className="text-blue-600 font-medium">Upload →</span>
              </div>

              <div
                onClick={() => { setActivePage('compliance'); setSearchModalOpen(false); }}
                className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-800">Apex Infrastructure Compliance Score</span>
                  <span className="text-slate-400">94% Compliant</span>
                </div>
                <span className="text-blue-600 font-medium">View Matrix →</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
