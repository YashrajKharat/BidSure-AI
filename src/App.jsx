import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import Dashboard from './pages/Dashboard';
import BidderManagement from './pages/BidderManagement';
import TenderManagement from './pages/TenderManagement';
import DocumentIntelligence from './pages/DocumentIntelligence';
import DuplicateDetection from './pages/DuplicateDetection';
import ComplianceAnalysis from './pages/ComplianceAnalysis';
import RiskAssessment from './pages/RiskAssessment';
import AIAssistant from './pages/AIAssistant';
import VerificationReports from './pages/VerificationReports';
import HumanReview from './pages/HumanReview';
import Settings from './pages/Settings';
import UserRegistration from './pages/UserRegistration';

// Standout Forensic & Anti-Cartel Components
import CartelKnowledgeGraph from './components/CartelKnowledgeGraph';
import ForensicMetadataInspector from './components/ForensicMetadataInspector';
import ComparativeStatement from './components/ComparativeStatement';
import SpatialVoiceAssistant from './components/SpatialVoiceAssistant';

import TenderDetailsModal from './components/TenderDetailsModal';
import BidSubmissionModal from './components/BidSubmissionModal';
import AwardContractModal from './components/AwardContractModal';
import DemoTourPlayer from './components/DemoTourPlayer';

// Seed Data & Utilities
import {
  initialTenders,
  initialContractors,
  initialOfficers,
  initialBidders,
  initialUploadedDocs,
  initialFindings,
  initialComplianceRequirements,
  getBidderComplianceRequirements,
  initialRiskFactors
} from './data/mockData';
import { api } from './services/api';
import { compareDocuments } from './utils/crypto';
import { generateVerificationReportPDF } from './utils/pdfGenerator';

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Application State
  const [tenders, setTenders] = useState(initialTenders);
  const [contractors, setContractors] = useState(initialContractors);
  const [officers, setOfficers] = useState(initialOfficers);
  const [activeContractorId, setActiveContractorId] = useState('CTR-001');
  const [activeOfficerId, setActiveOfficerId] = useState('OFF-001');
  const [bidders, setBidders] = useState(initialBidders);
  const [documents, setDocuments] = useState(initialUploadedDocs);
  const [findings, setFindings] = useState(initialFindings);
  const [requirements, setRequirements] = useState(initialComplianceRequirements);
  const [riskFactors, setRiskFactors] = useState(initialRiskFactors);
  const [selectedTenderId, setSelectedTenderId] = useState(initialTenders[0]?.id || 'TND-2026-8901');
  const [currentRole, setCurrentRole] = useState('officer'); // 'government' | 'contractor' | 'officer'
  const [contractorBidderId, setContractorBidderId] = useState('CTR-001');

  // Bid Submission Modal State
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidModalTender, setBidModalTender] = useState(null);

  const activeContractor = contractors.find(c => c.id === activeContractorId) || contractors[0];
  const activeOfficer = officers.find(o => o.id === activeOfficerId) || officers[0];

  // Tender Details Modal Inspection
  const [tenderDetailsModalOpen, setTenderDetailsModalOpen] = useState(false);
  const [inspectingTender, setInspectingTender] = useState(null);

  const handleOpenTenderDetails = (tenderOrId) => {
    let target = tenderOrId;
    if (typeof tenderOrId === 'string') {
      target = tenders.find(t => t.id === tenderOrId) || tenders[0];
    }
    setInspectingTender(target || tenders.find(t => t.id === selectedTenderId) || tenders[0]);
    setTenderDetailsModalOpen(true);
  };

  const handleOpenBidModal = (tender) => {
    setBidModalTender(tender || tenders.find(t => t.id === selectedTenderId) || tenders[0]);
    setBidModalOpen(true);
  };

  // Award Contract Modal State
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awardModalTender, setAwardModalTender] = useState(null);

  // 90-Second Guided AI Demo Tour State
  const [demoTourActive, setDemoTourActive] = useState(false);

  const handleOpenAwardModal = (tenderOrId) => {
    let target = tenderOrId;
    if (typeof tenderOrId === 'string') {
      target = tenders.find(t => t.id === tenderOrId) || tenders[0];
    }
    setAwardModalTender(target || tenders.find(t => t.id === selectedTenderId) || tenders[0]);
    setAwardModalOpen(true);
  };

  const handleAwardTender = async (tenderId, awardRecord) => {
    setTenders(prev => prev.map(t => {
      if (t.id === tenderId) {
        return {
          ...t,
          status: 'Awarded & Sealed',
          awardedContract: awardRecord
        };
      }
      return t;
    }));

    setBidders(prev => prev.map(b => {
      if (b.tenderId === tenderId || b.tender_id === tenderId) {
        if (b.id === awardRecord.bidderId) {
          return { ...b, status: 'Awarded', riskRating: 'CLEARED' };
        }
      }
      return b;
    }));

    try {
      await api.awardTender(tenderId, awardRecord);
    } catch (e) {
      console.log('Tender awarded in state');
    }
  };

  const handleSubmitBid = async (newBid) => {
    setBidders(prev => [newBid, ...prev]);
    setTenders(prev => prev.map(t => {
      if (t.id === newBid.tenderId || t.id === newBid.tender_id) {
        return { ...t, totalBids: (t.totalBids || 0) + 1 };
      }
      return t;
    }));
    try {
      await api.createBidder(newBid);
    } catch (e) {
      console.log('Bid saved in state');
    }
  };

  const handleRegisterContractor = async (newCtr) => {
    setContractors(prev => [newCtr, ...prev]);
    setActiveContractorId(newCtr.id);
    try {
      await api.createContractor(newCtr);
    } catch (e) {}
  };

  const handleRegisterOfficer = async (newOff) => {
    setOfficers(prev => [newOff, ...prev]);
    setActiveOfficerId(newOff.id);
    try {
      await api.createOfficer(newOff);
    } catch (e) {}
  };

  // Toast System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Load from Flask SQLite backend on initial mount
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [t, b, d, f, r, rk, c, o] = await Promise.all([
          api.getTenders(),
          api.getBidders(),
          api.getDocuments(),
          api.getFindings(),
          api.getCompliance(),
          api.getRisk(),
          api.getContractors(),
          api.getOfficers()
        ]);

        if (t && t.length > 0) setTenders(t);
        if (b && b.length > 0) setBidders(b);
        if (d && d.length > 0) setDocuments(d);
        if (f && f.length > 0) setFindings(f);
        if (r && r.length > 0) setRequirements(r);
        if (rk && rk.length > 0) setRiskFactors(rk);
        if (c && c.length > 0) setContractors(c);
        if (o && o.length > 0) setOfficers(o);
      } catch (err) {
        console.log('Running in local browser persistence mode');
      }
    }
    loadBackendData();
  }, []);

  // Upload handler with real duplicate & anomaly detection cross-check
  const handleUploadDocument = async (newDoc) => {
    // Check against existing documents for duplicate hash or high text similarity
    let detectedFinding = null;

    for (const existingDoc of documents) {
      if (existingDoc.id !== newDoc.id) {
        const comparison = await compareDocuments(newDoc, existingDoc);
        if (comparison.isExactHash || comparison.similarityScore >= 0.85 || comparison.matchingFields.some(f => f.field.includes('PAN') || f.field.includes('GSTIN'))) {
          detectedFinding = {
            id: `FIND-2026-${(findings.length + 1).toString().padStart(3, '0')}`,
            tenderId: newDoc.tenderId,
            bidders: Array.from(new Set([newDoc.bidderName, existingDoc.bidderName])),
            bidderIds: [newDoc.bidderId, existingDoc.bidderId],
            docA: {
              name: existingDoc.filename,
              bidder: existingDoc.bidderName,
              sha256: existingDoc.sha256,
              size: existingDoc.fileSize,
              content: existingDoc.content
            },
            docB: {
              name: newDoc.filename,
              bidder: newDoc.bidderName,
              sha256: newDoc.sha256,
              size: newDoc.fileSize,
              content: newDoc.content
            },
            matchType: comparison.matchType,
            similarityScore: comparison.similarityScore,
            matchingFields: comparison.matchingFields,
            reason: comparison.reason,
            aiExplanation: comparison.aiExplanation,
            evidence: `SHA-256 Digest: ${newDoc.sha256}. Token Jaccard overlap: ${(comparison.similarityScore * 100).toFixed(1)}%.`,
            reviewStatus: 'Needs Further Review',
            officerNotes: '',
            reviewedBy: null,
            reviewedAt: null,
            severity: comparison.severity
          };
          break;
        }
      }
    }

    if (detectedFinding) {
      newDoc.processingStatus = 'Flagged Collusion';
      setFindings(prev => [detectedFinding, ...prev]);
      
      // Update bidder status to Flagged
      setBidders(prev => prev.map(b => {
        if (b.id === newDoc.bidderId) {
          return { ...b, status: 'Flagged', complianceScore: Math.max(40, b.complianceScore - 30) };
        }
        return b;
      }));

      showToast(`Warning: Collusion/Duplicate anomaly flagged between ${detectedFinding.bidders.join(' and ')}!`, 'warning');
    }

    setDocuments(prev => [newDoc, ...prev]);
  };

  // Delete Document
  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document removed from verification repository.', 'info');
  };

  // Save Review Decision for Finding (Persists to SQLite)
  const handleSaveFindingDecision = async (findingId, decision, officerNotes) => {
    // 1. Update state locally
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          reviewStatus: decision,
          officerNotes: officerNotes || f.officerNotes,
          reviewedBy: 'Rajesh Sharma (Senior Evaluation Officer)',
          reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
      }
      return f;
    }));

    if (decision === 'Confirmed Duplicate') {
      const targetFinding = findings.find(f => f.id === findingId);
      if (targetFinding && targetFinding.bidderIds) {
        setBidders(prev => prev.map(b => {
          if (targetFinding.bidderIds.includes(b.id)) {
            return { ...b, status: 'Disqualified' };
          }
          return b;
        }));
      }
    }

    // 2. Persist to Flask SQLite backend
    try {
      await api.saveFindingDecision(findingId, decision, officerNotes);
    } catch (e) {
      console.log('Saved to local state');
    }
  };

  // Generate Report Directly
  const handleGenerateReport = (bidder) => {
    try {
      const currentTender = tenders.find(t => t.id === bidder.tenderId) || tenders[0];
      const bidderReqs = getBidderComplianceRequirements(bidder, currentTender);
      const filename = generateVerificationReportPDF({
        reportId: `REP-2026-${bidder.id.replace('BIDDER-', '')}904`,
        bidderName: bidder.name,
        tenderId: bidder.tenderId,
        tenderTitle: currentTender.title,
        complianceScore: bidder.complianceScore,
        riskLevel: bidder.riskRating,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        recommendation: bidder.complianceScore >= 80 ? 'Technically Qualified (GFR 173 Cleared)' : 'Disqualified (GFR 173 Cartel Conflict / Deficient)',
        summary: `BidSure AI audit completed for ${bidder.name}. Automated statutory checklist and collusion cross-checks generated.`,
        requirements: bidderReqs.map(r => ({ name: r.name, status: r.status, note: r.extractedInfo })),
        findings: findings.map(f => ({ id: f.id, type: f.matchType, status: f.reviewStatus, note: f.reason }))
      });
      showToast(`Audit report PDF generated: ${filename}`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Error generating PDF dossier.', 'error');
    }
  };

  const pendingReviewCount = findings.filter(f => f.reviewStatus === 'Pending' || f.reviewStatus === 'Needs Further Review').length;

  return (
    <div className="min-h-screen bg-[#EAF0F8] flex flex-col font-sans text-slate-800">
      
      {/* Sidebar (Desktop Persistent & Mobile Drawer) */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        pendingReviewCount={pendingReviewCount}
        duplicateFindingCount={findings.length}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        tenders={tenders}
        selectedTenderId={selectedTenderId}
        bidders={bidders}
        activeContractor={activeContractor}
        activeOfficer={activeOfficer}
      />

      {/* Main Content Workspace Container */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          setMobileOpen={setMobileMenuOpen}
          isCollapsed={isSidebarCollapsed}
          tenders={tenders}
          selectedTenderId={selectedTenderId}
          setSelectedTenderId={setSelectedTenderId}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          showToast={showToast}
          onOpenTenderDetails={handleOpenTenderDetails}
          contractors={contractors}
          officers={officers}
          activeContractor={activeContractor}
          activeOfficer={activeOfficer}
          onStartDemoTour={() => setDemoTourActive(true)}
          onSwitchContractor={(id) => { setActiveContractorId(id); setContractorBidderId(id); setCurrentRole('contractor'); }}
          onSwitchOfficer={(id) => { setActiveOfficerId(id); setCurrentRole('officer'); }}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <ErrorBoundary>
            {activePage === 'overview' && (
              <Dashboard
                bidders={bidders}
                tenders={tenders}
                findings={findings}
                selectedTenderId={selectedTenderId}
                currentRole={currentRole}
                contractorBidderId={contractorBidderId}
                activeContractor={activeContractor}
                activeOfficer={activeOfficer}
                contractors={contractors}
                officers={officers}
                onNavigate={setActivePage}
                onGenerateReport={handleGenerateReport}
                onOpenTenderDetails={handleOpenTenderDetails}
                onOpenBidModal={handleOpenBidModal}
                onOpenAwardModal={handleOpenAwardModal}
                onSwitchContractor={(id) => { setActiveContractorId(id); setContractorBidderId(id); }}
                onSwitchOfficer={(id) => { setActiveOfficerId(id); }}
              />
            )}

            {activePage === 'bidders' && (
              <BidderManagement
                bidders={bidders}
                tenders={tenders}
                selectedTenderId={selectedTenderId}
                currentRole={currentRole}
                contractorBidderId={contractorBidderId}
                onNavigate={setActivePage}
                onGenerateReport={handleGenerateReport}
                showToast={showToast}
              />
            )}

            {activePage === 'tenders' && (
              <TenderManagement
                tenders={tenders}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
                onNavigate={setActivePage}
                showToast={showToast}
                currentRole={currentRole}
                onOpenTenderDetails={handleOpenTenderDetails}
                onOpenBidModal={handleOpenBidModal}
                onOpenAwardModal={handleOpenAwardModal}
                onCreateTender={(newTender) => {
                  setTenders(prev => [newTender, ...prev]);
                  setSelectedTenderId(newTender.id);
                  showToast(`Contract ${newTender.id} published successfully! Bidding is now open.`, 'success');
                }}
              />
            )}

            {activePage === 'documents' && (
              <DocumentIntelligence
                documents={documents}
                bidders={bidders}
                tenders={tenders}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
                currentRole={currentRole}
                contractorBidderId={contractorBidderId}
                setContractorBidderId={setContractorBidderId}
                onUploadDocument={handleUploadDocument}
                onDeleteDocument={handleDeleteDocument}
                onInspectDocument={() => setActivePage('duplicates')}
                showToast={showToast}
              />
            )}

            {activePage === 'duplicates' && (
              <DuplicateDetection
                findings={findings}
                bidders={bidders}
                onSaveFindingDecision={handleSaveFindingDecision}
                showToast={showToast}
              />
            )}

            {activePage === 'compliance' && (
              <ComplianceAnalysis
                requirements={requirements}
                bidders={bidders}
                tenders={tenders}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
                currentRole={currentRole}
                contractorBidderId={contractorBidderId}
                onGenerateReport={handleGenerateReport}
                onNavigate={setActivePage}
                showToast={showToast}
              />
            )}

            {activePage === 'risk' && (
              <RiskAssessment
                riskFactors={riskFactors}
                bidders={bidders}
                onNavigate={setActivePage}
                showToast={showToast}
              />
            )}

            {activePage === 'assistant' && (
              <AIAssistant
                findings={findings}
                bidders={bidders}
                showToast={showToast}
              />
            )}

            {activePage === 'reports' && (
              <VerificationReports
                bidders={bidders}
                tenders={tenders}
                findings={findings}
                requirements={requirements}
                showToast={showToast}
              />
            )}

            {activePage === 'humanReview' && (
              <HumanReview
                findings={findings}
                bidders={bidders}
                onSaveFindingDecision={handleSaveFindingDecision}
                showToast={showToast}
              />
            )}

            {activePage === 'cartelGraph' && (
              <CartelKnowledgeGraph
                onNavigate={setActivePage}
                showToast={showToast}
              />
            )}

            {activePage === 'metadataInspector' && (
              <ForensicMetadataInspector
                showToast={showToast}
              />
            )}

            {activePage === 'comparativeStatement' && (
              <ComparativeStatement
                tenders={tenders}
                bidders={bidders}
                contractors={contractors}
                selectedTenderId={selectedTenderId}
                setSelectedTenderId={setSelectedTenderId}
                onOpenAwardModal={handleOpenAwardModal}
                onNavigate={setActivePage}
                showToast={showToast}
              />
            )}


            {activePage === 'registration' && (
              <UserRegistration
                contractors={contractors}
                officers={officers}
                activeContractorId={activeContractorId}
                activeOfficerId={activeOfficerId}
                onRegisterContractor={handleRegisterContractor}
                onRegisterOfficer={handleRegisterOfficer}
                onSwitchContractor={(id) => { setActiveContractorId(id); setContractorBidderId(id); setCurrentRole('contractor'); }}
                onSwitchOfficer={(id) => { setActiveOfficerId(id); setCurrentRole('officer'); }}
                onNavigate={setActivePage}
                showToast={showToast}
              />
            )}

            {activePage === 'settings' && (
              <Settings showToast={showToast} />
            )}
          </ErrorBoundary>
        </main>

        {/* Global Footer with Claymorphic Styling */}
        <footer className="mt-auto mx-4 sm:mx-6 lg:mx-8 mb-4 clay-card py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">BidSure AI Platform</span>
            <span>•</span>
            <span className="font-semibold text-blue-600">Claymorphism Edition</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 100% Free Stack (SQLite + Python Flask)
            </span>
          </div>
          <div className="font-medium text-slate-500">
            Adheres strictly to General Financial Rules (GFR) 2017 & CVC Anti-Collusion Guidelines
          </div>
        </footer>
      </div>

      {/* Global Comprehensive Tender Details & GFR 173 Specs Modal */}
      <TenderDetailsModal
        isOpen={tenderDetailsModalOpen}
        onClose={() => setTenderDetailsModalOpen(false)}
        tender={inspectingTender || tenders.find(t => t.id === selectedTenderId) || tenders[0]}
        bidders={bidders}
        currentRole={currentRole}
        contractorBidderId={contractorBidderId}
        onNavigate={setActivePage}
        onSwitchRole={setCurrentRole}
        onOpenAwardModal={handleOpenAwardModal}
        showToast={showToast}
      />

      {/* Global Bid Submission Modal */}
      <BidSubmissionModal
        isOpen={bidModalOpen}
        onClose={() => setBidModalOpen(false)}
        tender={bidModalTender || tenders.find(t => t.id === selectedTenderId) || tenders[0]}
        tenders={tenders}
        activeContractor={activeContractor}
        onSubmitBid={handleSubmitBid}
        showToast={showToast}
      />

      {/* Global Official Contract Award & Sealing Modal */}
      <AwardContractModal
        isOpen={awardModalOpen}
        onClose={() => setAwardModalOpen(false)}
        tender={awardModalTender || tenders.find(t => t.id === selectedTenderId) || tenders[0]}
        bidders={bidders}
        contractors={contractors}
        activeOfficer={activeOfficer}
        onAwardTender={handleAwardTender}
        showToast={showToast}
      />

      {/* 90-Second Guided AI Demo Tour Player & Video Recorder */}
      <DemoTourPlayer
        isActive={demoTourActive}
        onClose={() => setDemoTourActive(false)}
        setCurrentRole={setCurrentRole}
        setActivePage={setActivePage}
        setSelectedTenderId={setSelectedTenderId}
        setActiveContractorId={setActiveContractorId}
        setActiveOfficerId={setActiveOfficerId}
        onOpenTenderDetails={handleOpenTenderDetails}
        onOpenBidModal={handleOpenBidModal}
        onOpenAwardModal={handleOpenAwardModal}
        tenders={tenders}
        bidders={bidders}
        showToast={showToast}
      />

      {/* Omnipresent Floating Spatial Voice Assistant */}
      <SpatialVoiceAssistant
        onNavigate={setActivePage}
        showToast={showToast}
      />

      {/* Global Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
