import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Building,
  UserCheck,
  PlusCircle,
  CheckCircle2,
  Phone,
  Mail,
  FileText,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Search,
  Building2,
  Briefcase
} from 'lucide-react';

export default function UserRegistration({
  contractors = [],
  officers = [],
  activeContractorId,
  activeOfficerId,
  onRegisterContractor,
  onRegisterOfficer,
  onSwitchContractor,
  onSwitchOfficer,
  onNavigate,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('contractor'); // 'contractor' | 'officer'
  const [searchTerm, setSearchTerm] = useState('');

  // Contractor Form State
  const [contractorForm, setContractorForm] = useState({
    name: '',
    state: 'Maharashtra',
    cin: '',
    pan: '',
    gstin: '',
    turnover: '',
    contactPerson: '',
    email: '',
    phone: ''
  });

  // Officer Form State
  const [officerForm, setOfficerForm] = useState({
    name: '',
    designation: 'Procurement Officer',
    department: 'State Public Works Authority',
    employeeId: '',
    email: '',
    phone: '',
    jurisdiction: 'State & Regional Tenders'
  });

  const [loading, setLoading] = useState(false);

  // Handle Contractor Registration
  const handleContractorSubmit = async (e) => {
    e.preventDefault();
    if (!contractorForm.name || !contractorForm.pan || !contractorForm.gstin) {
      if (showToast) showToast('Please enter Company Name, PAN, and GSTIN.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const newContractor = {
        id: `CTR-${String(contractors.length + 1).padStart(3, '0')}`,
        name: contractorForm.name,
        state: contractorForm.state || 'Maharashtra',
        cin: contractorForm.cin || `U45200MH${new Date().getFullYear()}PLC${Math.floor(100000 + Math.random() * 900000)}`,
        pan: contractorForm.pan.toUpperCase(),
        gstin: contractorForm.gstin.toUpperCase(),
        turnover: contractorForm.turnover.includes('₹') ? contractorForm.turnover : `₹ ${contractorForm.turnover || '50.0'} Cr`,
        email: contractorForm.email || 'info@contractor.in',
        contactPerson: contractorForm.contactPerson || 'Authorized Representative',
        phone: contractorForm.phone || '+91 98000 00000',
        status: 'Active',
        registeredDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        registeredBy: 'Procurement Officer'
      };

      if (onRegisterContractor) {
        await onRegisterContractor(newContractor);
      }

      setContractorForm({
        name: '',
        state: 'Maharashtra',
        cin: '',
        pan: '',
        gstin: '',
        turnover: '',
        contactPerson: '',
        email: '',
        phone: ''
      });

      if (showToast) {
        showToast(`Contractor "${newContractor.name}" registered successfully with ID ${newContractor.id}!`, 'success');
      }
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to register contractor.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle Officer Registration
  const handleOfficerSubmit = async (e) => {
    e.preventDefault();
    if (!officerForm.name || !officerForm.email) {
      if (showToast) showToast('Please enter Officer Full Name and Official Email.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const newOfficer = {
        id: `OFF-${String(officers.length + 1).padStart(3, '0')}`,
        name: officerForm.name,
        designation: officerForm.designation,
        department: officerForm.department,
        employeeId: officerForm.employeeId || `GOV-EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        email: officerForm.email,
        phone: officerForm.phone || '+91 11 2345 6789',
        jurisdiction: officerForm.jurisdiction,
        registeredDate: new Date().toISOString().slice(0, 10)
      };

      if (onRegisterOfficer) {
        await onRegisterOfficer(newOfficer);
      }

      setOfficerForm({
        name: '',
        designation: 'Procurement Officer',
        department: 'State Public Works Authority',
        employeeId: '',
        email: '',
        phone: '',
        jurisdiction: 'State & Regional Tenders'
      });

      if (showToast) {
        showToast(`Officer "${newOfficer.name}" registered successfully with ID ${newOfficer.id}!`, 'success');
      }
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Failed to register officer.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredContractors = contractors.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gstin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOfficers = officers.filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-7 rounded-3xl space-y-3 border border-blue-100/60 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="clay-badge clay-badge-blue text-xs font-mono font-black">
                ADMIN & ONBOARDING
              </span>
              <span className="clay-badge clay-badge-emerald text-[11px] font-black">
                Officer Authority Level
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Entity Registration & Account Provisioning
            </h2>
            <p className="text-xs text-slate-500">
              Procurement officers register new verified contractors and government evaluation officers into the system.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="clay-inset px-4 py-2.5 rounded-2xl text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contractors</span>
              <span className="text-base font-black text-slate-900 font-mono">{contractors.length}</span>
            </div>
            <div className="clay-inset px-4 py-2.5 rounded-2xl text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Officers</span>
              <span className="text-base font-black text-slate-900 font-mono">{officers.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('contractor')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'contractor'
                ? 'clay-btn-primary text-white shadow-sm'
                : 'clay-btn-secondary text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. Register New Contractor ({contractors.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('officer')}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'officer'
                ? 'clay-btn-emerald text-slate-900 shadow-sm'
                : 'clay-btn-secondary text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>2. Register New Procurement Officer ({officers.length})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Registration Form on Left, Directory on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Registration Form (7 cols) */}
        <div className="lg:col-span-7 clay-card p-6 sm:p-7 rounded-3xl space-y-6">
          {activeTab === 'contractor' ? (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" /> Onboard New Contractor
                  </h3>
                  <p className="text-xs text-slate-500">
                    Creates a dedicated contractor portal and dashboard with separate credentials
                  </p>
                </div>
                <span className="clay-badge-blue text-[10px] font-black px-2 py-0.5">
                  GFR 173 Verified
                </span>
              </div>

              <form onSubmit={handleContractorSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    Company Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Projects Ltd / Shapoorji Pallonji & Co"
                    value={contractorForm.name}
                    onChange={(e) => setContractorForm({ ...contractorForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Permanent Account Number (PAN) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AAACA7821B"
                      value={contractorForm.pan}
                      onChange={(e) => setContractorForm({ ...contractorForm, pan: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-mono font-bold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      GSTIN Registration <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 27AAACA7821B1Z9"
                      value={contractorForm.gstin}
                      onChange={(e) => setContractorForm({ ...contractorForm, gstin: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-mono font-bold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Corporate Identity Number (CIN)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. U45200MH2012PLC238910"
                      value={contractorForm.cin}
                      onChange={(e) => setContractorForm({ ...contractorForm, cin: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-mono text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      State of Incorporation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maharashtra / Gujarat / Delhi"
                      value={contractorForm.state}
                      onChange={(e) => setContractorForm({ ...contractorForm, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      3-Year Average Turnover (in ₹ Cr)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 125.5 Cr"
                      value={contractorForm.turnover}
                      onChange={(e) => setContractorForm({ ...contractorForm, turnover: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Authorized Signatory Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Malhotra (MD)"
                      value={contractorForm.contactPerson}
                      onChange={(e) => setContractorForm({ ...contractorForm, contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="tenders@company.com"
                      value={contractorForm.email}
                      onChange={(e) => setContractorForm({ ...contractorForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98201 11223"
                      value={contractorForm.phone}
                      onChange={(e) => setContractorForm({ ...contractorForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 clay-btn-primary text-xs font-black text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {loading ? 'Registering...' : 'Register Contractor & Grant Portal Access'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Register Procurement Officer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adds an authorized evaluation officer with independent dashboard and audit privileges
                  </p>
                </div>
                <span className="clay-badge-emerald text-[10px] font-black px-2 py-0.5">
                  Officer Privileges
                </span>
              </div>

              <form onSubmit={handleOfficerSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    Officer Full Name (with Title) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. Sunil Varma / Dr. Sneha Kulkarni"
                    value={officerForm.name}
                    onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Official Designation <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Procurement Officer / Superintending Engineer"
                      value={officerForm.designation}
                      onChange={(e) => setOfficerForm({ ...officerForm, designation: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Government Department / Agency <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MMRDA / NHSRCL / MoRTH / Rail Vikas Nigam"
                      value={officerForm.department}
                      onChange={(e) => setOfficerForm({ ...officerForm, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Government Employee ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. GOV-MMRDA-9041"
                      value={officerForm.employeeId}
                      onChange={(e) => setOfficerForm({ ...officerForm, employeeId: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-mono font-bold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Assigned Jurisdiction / Sector
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Urban Metro Transport / Highways"
                      value={officerForm.jurisdiction}
                      onChange={(e) => setOfficerForm({ ...officerForm, jurisdiction: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Official Government Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="s.varma@authority.gov.in"
                      value={officerForm.email}
                      onChange={(e) => setOfficerForm({ ...officerForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700">
                      Official Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+91 22 2659 0001"
                      value={officerForm.phone}
                      onChange={(e) => setOfficerForm({ ...officerForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 clay-btn-emerald text-xs font-black text-slate-900 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    {loading ? 'Commissioning...' : 'Register Officer & Create Officer Dashboard'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right: Live Registered Entities Directory (5 cols) */}
        <div className="lg:col-span-5 clay-card p-6 sm:p-7 rounded-3xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                {activeTab === 'contractor' ? 'Registered Contractors Directory' : 'Registered Officers Directory'}
              </h3>
              <p className="text-xs text-slate-500">
                Switch to any account to test their independent dashboard
              </p>
            </div>
            <span className="clay-badge-blue text-xs font-black px-2 py-0.5 font-mono">
              {activeTab === 'contractor' ? contractors.length : officers.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTab === 'contractor' ? "Search contractors, PAN, GSTIN..." : "Search officers, department..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 clay-inset text-xs font-semibold text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none"
            />
          </div>

          {/* Directory Cards */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {activeTab === 'contractor' ? (
              filteredContractors.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No contractors match the filter.
                </div>
              ) : (
                filteredContractors.map((ctr) => {
                  const isActive = ctr.id === activeContractorId;
                  return (
                    <div
                      key={ctr.id}
                      className={`p-4 clay-card rounded-2xl space-y-2.5 transition-all ${
                        isActive ? 'ring-2 ring-blue-500/80 bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {ctr.id}
                            </span>
                            <span className="font-black text-xs text-slate-900 leading-tight">
                              {ctr.name}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {ctr.state} • Turnover: <strong className="text-slate-700">{ctr.turnover}</strong>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="clay-badge-blue text-[9px] font-black px-2 py-0.5 shrink-0">
                            Current Active
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span>PAN: {ctr.pan}</span>
                        <span>•</span>
                        <span>GSTIN: {ctr.gstin}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400">
                          {ctr.contactPerson || ctr.email}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (onSwitchContractor) onSwitchContractor(ctr.id);
                            if (onNavigate) onNavigate('overview');
                            if (showToast) showToast(`Switched active contractor session to ${ctr.name}!`, 'info');
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isActive
                              ? 'clay-btn-primary text-white shadow-xs'
                              : 'clay-btn-secondary text-blue-600 hover:text-blue-800'
                          }`}
                        >
                          <span>{isActive ? 'Active Dashboard' : 'Open Dashboard'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              filteredOfficers.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No officers match the filter.
                </div>
              ) : (
                filteredOfficers.map((off) => {
                  const isActive = off.id === activeOfficerId;
                  return (
                    <div
                      key={off.id}
                      className={`p-4 clay-card rounded-2xl space-y-2.5 transition-all ${
                        isActive ? 'ring-2 ring-emerald-500/80 bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {off.id}
                            </span>
                            <span className="font-black text-xs text-slate-900 leading-tight">
                              {off.name}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {off.designation}
                          </div>
                        </div>

                        {isActive ? (
                          <span className="clay-badge-emerald text-[9px] font-black px-2 py-0.5 shrink-0">
                            Current Active
                          </span>
                        ) : null}
                      </div>

                      <div className="text-[11px] text-slate-600 font-medium">
                        {off.department}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span>ID: {off.employeeId}</span>
                        <span>•</span>
                        <span>{off.email}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400">
                          {off.jurisdiction}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (onSwitchOfficer) onSwitchOfficer(off.id);
                            if (onNavigate) onNavigate('overview');
                            if (showToast) showToast(`Switched active officer session to ${off.name}!`, 'info');
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isActive
                              ? 'clay-btn-emerald text-slate-900 shadow-xs'
                              : 'clay-btn-secondary text-emerald-700 hover:text-emerald-900'
                          }`}
                        >
                          <span>{isActive ? 'Active Dashboard' : 'Open Dashboard'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
