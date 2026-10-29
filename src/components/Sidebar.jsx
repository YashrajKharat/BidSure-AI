import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  FileSearch,
  CopyCheck,
  ShieldCheck,
  AlertTriangle,
  BrainCircuit,
  FileText,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Network,
  Laptop,
  Scale,
  Percent,
  Lock,
  Building
} from 'lucide-react';

export default function Sidebar({
  activePage,
  setActivePage,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  pendingReviewCount = 2,
  duplicateFindingCount = 4,
  currentRole = 'officer',
  setCurrentRole,
  tenders = [],
  selectedTenderId,
  bidders = [],
  activeContractor,
  activeOfficer
}) {
  const activeTender = tenders.find(t => t.id === selectedTenderId) || tenders[0] || {
    id: "TND-2026-8901",
    title: "Metro Line 4 Elevated Viaduct Works",
    authority: "MMRDA",
    budget: "₹ 485.50 Cr",
    totalBids: 6
  };
  const tenderBidsCount = bidders.filter(b => b.tenderId === activeTender.id).length || activeTender.totalBids || 0;
  const governmentNav = [
    { id: 'tenders', label: 'Tender Management & RFPs', icon: FileSpreadsheet, badge: 'PUBLISH' },
    { id: 'overview', label: 'Tender Portfolio Overview', icon: LayoutDashboard },
    { id: 'bidders', label: 'Registered Contractors', icon: Users },
    { id: 'reports', label: 'Approved Evaluation Dossiers', icon: FileText },
    { id: 'settings', label: 'Statutory Calibration', icon: Settings },
  ];

  const contractorNav = [
    { id: 'overview', label: 'Tender Overview & Status', icon: LayoutDashboard },
    { id: 'documents', label: 'Submit Bid & Documents', icon: FileSearch, badge: 'SUBMIT' },
    { id: 'tenders', label: 'Browse Open Tenders', icon: FileSpreadsheet, badge: 'ACTIVE' },
    { id: 'bidders', label: 'Corporate Profile (GST/PAN)', icon: Users },
    { id: 'assistant', label: 'Tender Clarification AI', icon: BrainCircuit, badge: 'VOICE AI' },
  ];

  const officerNav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'registration', label: 'Register Contractors & Officers', icon: Users, badge: 'ONBOARD', badgeColor: 'bg-blue-500' },
    { id: 'cartelGraph', label: 'Cartel Knowledge Graph', icon: Network, badge: 'NEW', badgeColor: 'bg-rose-500' },
    { id: 'metadataInspector', label: 'Workstation Forensics', icon: Laptop, badge: 'EXIF', badgeColor: 'bg-purple-500' },
    { id: 'comparativeStatement', label: 'Comparative Statement (CST)', icon: Scale, badge: 'EXCEL', badgeColor: 'bg-emerald-500' },
    { id: 'bidders', label: 'Bidder Management', icon: Users },
    { id: 'tenders', label: 'Tender Management', icon: FileSpreadsheet },
    { id: 'documents', label: 'Document Intelligence', icon: FileSearch, badge: 'AI OCR' },
    { id: 'duplicates', label: 'Duplicate Detection', icon: CopyCheck, badge: duplicateFindingCount, badgeColor: 'bg-rose-500' },
    { id: 'compliance', label: 'Compliance Analysis', icon: ShieldCheck },
    { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle, badge: 'Flagged', badgeColor: 'bg-amber-500' },
    { id: 'assistant', label: 'AI Assistant', icon: BrainCircuit, badge: 'Voice AI', badgeColor: 'bg-cyan-500' },
    { id: 'reports', label: 'Verification Reports', icon: FileText },
    { id: 'humanReview', label: 'Human Review', icon: UserCheck, badge: pendingReviewCount, badgeColor: 'bg-blue-500' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navItems = currentRole === 'government' ? governmentNav : currentRole === 'contractor' ? contractorNav : officerNav;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FD] to-[#EAF0F8] text-slate-700 shadow-[8px_0_28px_-6px_rgba(148,163,184,0.35)] border-r border-white/90 select-none">
      {/* Brand Header */}
      <div className={`flex items-center justify-between px-4 h-16 border-b border-slate-200/60 transition-all ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <div 
          onClick={() => { setActivePage('overview'); if (mobileOpen) setMobileOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Clay Logo Icon */}
          <div className="relative flex items-center justify-center w-10 h-10 clay-btn-primary p-2 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 stroke-[2.4] text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse"></span>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">BidSure</span>
                <span className="clay-badge-blue text-[10px] font-bold px-1.5 py-0.5">AI</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wide">Procurement Compliance</span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 clay-btn-secondary text-slate-500 hover:text-slate-800"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Active Role Persona Indicator */}
      {!isCollapsed && (
        <div className="mx-3 mt-2.5 p-2.5 clay-card flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">
              {currentRole === 'government' ? '🏛️' : currentRole === 'contractor' ? '🏗️' : '🛡️'}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 leading-tight">
                {currentRole === 'government' ? 'Gov Authority' : currentRole === 'contractor' ? 'Contractor Portal' : 'Procurement Officer'}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                {currentRole === 'government' ? 'Tender Issuer' : currentRole === 'contractor' ? 'Bidder Mode' : 'Vigilance Auditor'}
              </span>
            </div>
          </div>
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
            currentRole === 'government' ? 'clay-badge-amber' : currentRole === 'contractor' ? 'clay-badge-blue' : 'clay-badge-emerald'
          }`}>
            Role {currentRole === 'government' ? '1' : currentRole === 'contractor' ? '2' : '3'}
          </span>
        </div>
      )}

      {/* Tender Context Pill (when expanded) */}
      {!isCollapsed && (
        <div className="mx-3 my-2.5 p-3 clay-inset">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider">ACTIVE TENDER</span>
            <span className="clay-badge-emerald text-[9px] font-extrabold px-1.5 py-0.2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
            </span>
          </div>
          <div className="text-xs font-bold text-slate-800 truncate" title={activeTender.title}>
            {activeTender.id}: {activeTender.title}
          </div>
          <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            {activeTender.authority} • {tenderBidsCount} Submitted Bids • {activeTender.budget}
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1.5">
        <div className={`px-2 mb-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? '•••' : 'Verification Suite'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                if (mobileOpen) setMobileOpen(false);
              }}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all relative group cursor-pointer ${
                isActive
                  ? 'clay-btn-primary text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70 hover:shadow-[3px_5px_12px_rgba(148,163,184,0.2),-2px_-2px_6px_rgba(255,255,255,0.9)]'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600 group-hover:scale-110'}`} />
              
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {/* Badges */}
              {!isCollapsed && item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/30 text-white' : 'clay-badge text-slate-700 bg-white/80'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Collapsed dot badge */}
              {isCollapsed && item.badge && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 shadow-xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* Local Engine Status Mini Card */}
      {!isCollapsed && (
        <div className="mx-3 mb-2 p-3 clay-card">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-lg clay-badge-blue flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-[11px] font-bold text-slate-800">Local AI Engine</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            SQLite + Python Daemon Active. Zero external API fees.
          </p>
          <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-medium">Stack</span>
            <span className="clay-badge-emerald text-[9px] font-bold px-1.5 py-0.2">100% Free</span>
          </div>
        </div>
      )}

      {/* User Mini Bar at bottom of sidebar */}
      <div className="p-3 border-t border-slate-200/60 flex items-center gap-3 bg-white/40">
        <div className="relative">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
            currentRole === 'contractor' ? 'clay-badge-blue text-blue-700' :
            currentRole === 'government' ? 'clay-badge-amber text-amber-700' : 'clay-badge-emerald text-emerald-700'
          }`}>
            {currentRole === 'contractor' ? 'CTR' : currentRole === 'government' ? 'GOV' : 'OFF'}
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate">
              {currentRole === 'contractor' ? (activeContractor?.name || 'Apex Infra Solutions') :
               currentRole === 'government' ? 'Government Authority' :
               (activeOfficer?.name || 'Er. Rajesh Sharma')}
            </div>
            <div className="text-[10px] text-slate-500 font-medium truncate">
              {currentRole === 'contractor' ? `ID: ${activeContractor?.id || 'CTR-001'}` :
               currentRole === 'government' ? 'Tender Issuer' :
               (activeOfficer?.designation || 'Chief Procurement Officer')}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Sliding Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
