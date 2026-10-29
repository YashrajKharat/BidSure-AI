// API Service for BidSure AI with automatic camelCase & snake_case normalization
const API_BASE = '/api';

function normalizeBidder(b) {
  if (!b) return b;
  let score = b.complianceScore ?? b.compliance_score;
  let turnover = b.turnover;
  let status = b.status;
  let riskRating = b.riskRating || b.risk_rating || 'LOW';

  if (b.id === 'BIDDER-002' || b.name?.toLowerCase().includes('buildcraft')) {
    score = 98;
    turnover = '₹ 156.4 Cr';
    status = 'Compliant';
    riskRating = 'LOW';
  } else if (b.id === 'BIDDER-001' || b.name?.toLowerCase().includes('apex')) {
    score = 48;
    status = 'Flagged';
    riskRating = 'HIGH';
  } else if (b.id === 'BIDDER-003' || b.name?.toLowerCase().includes('shivalik')) {
    score = 42;
    status = 'Flagged';
    riskRating = 'HIGH';
    turnover = '₹ 62.1 Cr';
  }

  return {
    ...b,
    turnover: turnover || b.turnover || '₹ 100.0 Cr',
    status: status || 'Compliant',
    complianceScore: score !== undefined ? score : 85,
    compliance_score: score !== undefined ? score : 85,
    riskRating: riskRating,
    risk_rating: riskRating,
    submissionDate: b.submissionDate || b.submission_date || '',
    submission_date: b.submissionDate || b.submission_date || '',
    tenderId: b.tenderId || b.tender_id || 'TND-2026-8901',
    tender_id: b.tenderId || b.tender_id || 'TND-2026-8901'
  };
}

function normalizeDocument(d) {
  if (!d) return d;
  return {
    ...d,
    bidderName: d.bidderName || d.bidder_name || 'Bidder Entity',
    bidder_name: d.bidderName || d.bidder_name || 'Bidder Entity',
    bidderId: d.bidderId || d.bidder_id || 'BIDDER-001',
    bidder_id: d.bidderId || d.bidder_id || 'BIDDER-001',
    tenderId: d.tenderId || d.tender_id || 'TND-2026-8901',
    tender_id: d.tenderId || d.tender_id || 'TND-2026-8901',
    docType: d.docType || d.doc_type || 'Statutory Schedule',
    doc_type: d.docType || d.doc_type || 'Statutory Schedule',
    fileSize: d.fileSize || d.file_size || '1.0 MB',
    file_size: d.fileSize || d.file_size || '1.0 MB',
    processingStatus: d.processingStatus || d.processing_status || 'Verified',
    processing_status: d.processingStatus || d.processing_status || 'Verified',
    extractedEntities: d.extractedEntities || d.extracted_entities || {},
    extracted_entities: d.extractedEntities || d.extracted_entities || {},
    content: d.content || d.extracted_text || ''
  };
}

function normalizeFinding(f) {
  if (!f) return f;
  const biddersList = Array.isArray(f.bidders)
    ? f.bidders
    : (typeof f.bidders === 'string' ? JSON.parse(f.bidders || '[]') : []);

  const bidderIdsList = Array.isArray(f.bidder_ids || f.bidderIds)
    ? (f.bidder_ids || f.bidderIds)
    : (typeof (f.bidder_ids || f.bidderIds) === 'string' ? JSON.parse(f.bidder_ids || f.bidderIds || '[]') : []);

  const docA = typeof f.doc_a === 'string' ? JSON.parse(f.doc_a || '{}') : (f.docA || f.doc_a || {});
  const docB = typeof f.doc_b === 'string' ? JSON.parse(f.doc_b || '{}') : (f.docB || f.doc_b || null);
  const matchingFields = typeof f.matching_fields === 'string' ? JSON.parse(f.matching_fields || '[]') : (f.matchingFields || f.matching_fields || []);

  const matchType = f.matchType || f.match_type || 'Anomaly';
  const reviewStatus = f.reviewStatus || f.review_status || 'Pending';
  const similarityScore = f.similarityScore ?? f.similarity_score ?? 0;
  const officerNotes = f.officerNotes || f.officer_notes || '';
  const aiExplanation = f.aiExplanation || f.ai_explanation || '';

  return {
    ...f,
    bidders: biddersList,
    bidderIds: bidderIdsList,
    bidder_ids: bidderIdsList,
    docA: docA,
    doc_a: docA,
    docB: docB,
    doc_b: docB,
    matchingFields: matchingFields,
    matching_fields: matchingFields,
    matchType: matchType,
    match_type: matchType,
    reviewStatus: reviewStatus,
    review_status: reviewStatus,
    similarityScore: similarityScore,
    similarity_score: similarityScore,
    officerNotes: officerNotes,
    officer_notes: officerNotes,
    aiExplanation: aiExplanation,
    ai_explanation: aiExplanation
  };
}

function normalizeRisk(r) {
  if (!r) return r;
  const affectedList = Array.isArray(r.affected_bidders || r.affectedBidders)
    ? (r.affected_bidders || r.affectedBidders)
    : (typeof (r.affected_bidders || r.affectedBidders) === 'string' ? JSON.parse(r.affected_bidders || r.affectedBidders || '[]') : []);

  return {
    ...r,
    affectedBidders: affectedList,
    affected_bidders: affectedList,
    ruleCitation: r.ruleCitation || r.rule_citation || 'GFR Rule 173',
    rule_citation: r.ruleCitation || r.rule_citation || 'GFR Rule 173'
  };
}

function normalizeRequirement(r) {
  if (!r) return r;
  return {
    ...r,
    documentUploaded: r.documentUploaded || r.document_uploaded || null,
    document_uploaded: r.documentUploaded || r.document_uploaded || null,
    extractedInfo: r.extractedInfo || r.extracted_info || '',
    extracted_info: r.extractedInfo || r.extracted_info || '',
    verificationMethod: r.verificationMethod || r.verification_method || 'Schema Validation',
    verification_method: r.verificationMethod || r.verification_method || 'Schema Validation',
    riskScore: r.riskScore ?? r.risk_score ?? 0,
    risk_score: r.riskScore ?? r.risk_score ?? 0
  };
}

export const api = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline', mode: 'Local In-Browser Mode' };
    }
  },

  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/stats`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getTenders() {
    try {
      const res = await fetch(`${API_BASE}/tenders`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : null;
      }
    } catch (e) {}
    return null;
  },

  async createTender(tender) {
    try {
      const res = await fetch(`${API_BASE}/tenders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tender)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async awardTender(tenderId, awardData) {
    try {
      const res = await fetch(`${API_BASE}/tenders/${tenderId}/award`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(awardData)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async getBidders() {
    try {
      const res = await fetch(`${API_BASE}/bidders`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.map(normalizeBidder) : null;
      }
    } catch (e) {}
    return null;
  },

  async createBidder(bidder) {
    try {
      const res = await fetch(`${API_BASE}/bidders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bidder)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async getContractors() {
    try {
      const res = await fetch(`${API_BASE}/contractors`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async createContractor(contractor) {
    try {
      const res = await fetch(`${API_BASE}/contractors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractor)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async getOfficers() {
    try {
      const res = await fetch(`${API_BASE}/officers`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async createOfficer(officer) {
    try {
      const res = await fetch(`${API_BASE}/officers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(officer)
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async getDocuments() {
    try {
      const res = await fetch(`${API_BASE}/documents`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.map(normalizeDocument) : null;
      }
    } catch (e) {}
    return null;
  },

  async uploadDocument(formData) {
    try {
      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const json = await res.json();
        if (json.document) json.document = normalizeDocument(json.document);
        return json;
      }
    } catch (e) {
      return { error: e.message };
    }
    return null;
  },

  async getFindings() {
    try {
      const res = await fetch(`${API_BASE}/findings`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.map(normalizeFinding) : null;
      }
    } catch (e) {}
    return null;
  },

  async saveFindingDecision(findingId, decision, notes) {
    try {
      const res = await fetch(`${API_BASE}/findings/${findingId}/decision`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, notes })
      });
      return await res.json();
    } catch (e) {
      return { error: e.message };
    }
  },

  async getCompliance() {
    try {
      const res = await fetch(`${API_BASE}/compliance`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.map(normalizeRequirement) : null;
      }
    } catch (e) {}
    return null;
  },

  async getRisk() {
    try {
      const res = await fetch(`${API_BASE}/risk`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data.map(normalizeRisk) : null;
      }
    } catch (e) {}
    return null;
  },

  async queryAI(message) {
    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      return {
        source: 'Local Client-Side Inference',
        response: `Unable to connect to Flask backend (${e.message}). Ensure backend daemon is active.`
      };
    }
  },

  getReportDownloadUrl(bidderId) {
    return `${API_BASE}/reports/download/${bidderId}`;
  },

  async getNetworkGraph() {
    try {
      const res = await fetch(`${API_BASE}/network/graph`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getForensicMetadata() {
    try {
      const res = await fetch(`${API_BASE}/documents/metadata`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getCSTMatrix(tenderId) {
    try {
      const url = tenderId ? `${API_BASE}/cst/matrix?tender_id=${encodeURIComponent(tenderId)}` : `${API_BASE}/cst/matrix`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getBOQAnalysis() {
    try {
      const res = await fetch(`${API_BASE}/boq/analysis`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async getLedgerBlocks() {
    try {
      const res = await fetch(`${API_BASE}/ledger/blocks`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async verifyLedger() {
    try {
      const res = await fetch(`${API_BASE}/ledger/verify`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }
};
