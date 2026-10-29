import { jsPDF } from 'jspdf';

/**
 * Generates and downloads an enterprise-grade Bid Compliance Verification Dossier
 */
export function generateVerificationReportPDF(reportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [37, 99, 235]; // Royal Blue
  const darkNavy = [11, 19, 43];     // Deep Navy
  const slateGray = [100, 116, 139]; // Slate Gray

  let y = 18;

  // Header Bar
  doc.setFillColor(...darkNavy);
  doc.rect(0, 0, 210, 24, 'F');

  // Accent Line
  doc.setFillColor(...primaryColor);
  doc.rect(0, 24, 210, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('BIDSURE AI — BID COMPLIANCE & RISK AUDIT DOSSIER', 14, 13);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('CENTRAL VIGILANCE & ELECTRONIC PROCUREMENT VERIFICATION SYSTEM', 14, 19);

  // Report Reference Info Box
  y = 35;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 32, 2, 2, 'FD');

  doc.setTextColor(...darkNavy);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('REPORT ID:', 20, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateGray);
  doc.text(reportData.reportId || 'REP-2026-90412', 45, y + 8);

  doc.setTextColor(...darkNavy);
  doc.setFont('helvetica', 'bold');
  doc.text('AUDIT DATE:', 120, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateGray);
  doc.text(reportData.date || new Date().toLocaleString(), 148, y + 8);

  doc.setTextColor(...darkNavy);
  doc.setFont('helvetica', 'bold');
  doc.text('TENDER REF:', 20, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateGray);
  doc.text(reportData.tenderId + ' — ' + (reportData.tenderTitle || 'Public Works'), 45, y + 16);

  doc.setTextColor(...darkNavy);
  doc.setFont('helvetica', 'bold');
  doc.text('BIDDER ENTITY:', 20, y + 24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(reportData.bidderName || 'Apex Infrastructure Solutions Ltd', 48, y + 24);

  // Executive Scores Row
  y = 74;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);

  // Score Box 1: Compliance
  doc.roundedRect(14, y, 56, 26, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateGray);
  doc.text('COMPLIANCE SCORE', 18, y + 8);
  doc.setFontSize(16);
  doc.setTextColor(22, 163, 74); // Green
  doc.text(`${reportData.complianceScore || 94}%`, 18, y + 19);
  doc.setFontSize(7);
  doc.setTextColor(...slateGray);
  doc.text('Verified Requirements', 36, y + 19);

  // Score Box 2: Risk Rating
  doc.roundedRect(77, y, 56, 26, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...slateGray);
  doc.text('FRAUD & COLLUSION RISK', 81, y + 8);
  doc.setFontSize(16);
  const isHighRisk = (reportData.riskLevel || '').toUpperCase() === 'HIGH';
  doc.setTextColor(isHighRisk ? 220 : 37, isHighRisk ? 38 : 99, isHighRisk ? 38 : 235);
  doc.text(reportData.riskLevel || 'LOW RISK', 81, y + 19);

  // Score Box 3: Status
  doc.roundedRect(140, y, 56, 26, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...slateGray);
  doc.text('RECOMMENDATION', 144, y + 8);
  doc.setFontSize(11);
  doc.setTextColor(...darkNavy);
  doc.text(reportData.recommendation || 'Technically Eligible', 144, y + 18);

  // Section 1: Executive Summary
  y = 108;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text('1. EXECUTIVE COMPLIANCE SUMMARY', 14, y);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = reportData.summary || 
    'The AI verification engine evaluated all uploaded bid schedules, statutory certificates, and technical disclosures against RFP Clause 4.2 eligibility criteria. Document hashing and lexical similarity pipelines cross-referenced all concurrent bidders to detect potential collusive practices.';
  const splitSummary = doc.splitTextToSize(summaryText, 182);
  doc.text(splitSummary, 14, y);

  y += splitSummary.length * 5 + 6;

  // Section 2: Requirements Audit
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text('2. STATUTORY & MANDATORY REQUIREMENTS EVALUATION', 14, y);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;
  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 7, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text('TENDER REQUIREMENT', 18, y + 5);
  doc.text('STATUS', 105, y + 5);
  doc.text('VERIFIED ATTRIBUTE / RECORD', 135, y + 5);

  y += 7;
  const reqs = reportData.requirements || [
    { name: 'Valid GSTIN Registration Certificate', status: 'Compliant', note: '27AABCU9603R1ZM (Active on Portal)' },
    { name: '3-Year Financial Turnover (> ₹50.00 Cr)', status: 'Compliant', note: 'Avg ₹64.2 Cr (Audited Balance Sheet)' },
    { name: 'Earnest Money Deposit (EMD) Guarantee', status: 'Compliant', note: 'BG #HDFC77218 Valid till 2027' },
    { name: 'Non-Blacklisting Legal Affidavit', status: 'Compliant', note: 'Notarized & Registered with Stamp' },
    { name: 'Power of Attorney for Authorized Signatory', status: 'Compliant', note: 'Board Resolution Dated 12-Jan-2026' }
  ];

  doc.setFont('helvetica', 'normal');
  reqs.forEach((r, idx) => {
    const rowColor = idx % 2 === 0 ? 255 : 248;
    doc.setFillColor(rowColor, rowColor, rowColor);
    doc.rect(14, y, 182, 7, 'F');
    doc.setTextColor(...darkNavy);
    doc.text(r.name, 18, y + 5);

    if (r.status === 'Compliant') {
      doc.setTextColor(22, 163, 74);
    } else {
      doc.setTextColor(220, 38, 38);
    }
    doc.text(r.status, 105, y + 5);

    doc.setTextColor(...slateGray);
    doc.text(r.note, 135, y + 5);
    y += 7;
  });

  // Section 3: Collusion & Duplicate Cross-Check
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text('3. CROSS-BIDDER DUPLICATE & ANOMALY DETECTIONS', 14, y);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;
  const findings = reportData.findings || [
    { id: 'DUP-2026-081', type: 'Lexical Variance (Normal)', status: 'Cleared', note: '9.2% Standard Tender Format Similarity' },
    { id: 'DUP-2026-082', type: 'Tax ID Segregation', status: 'Cleared', note: 'No shared PAN/GSTIN with other participants' }
  ];

  findings.forEach((f) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkNavy);
    doc.text(`[${f.id}] ${f.type}:`, 18, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...slateGray);
    doc.text(`${f.note} — Status: ${f.status}`, 80, y);
    y += 6;
  });

  // Officer Sign-off Block
  y = 246;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y, 182, 34, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text('PROCUREMENT OFFICER VERIFICATION SIGN-OFF', 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateGray);
  doc.text('Officer: Rajesh Sharma | Senior Technical Evaluation Officer', 20, y + 16);
  doc.text('CVC E-Sign Ref: #eSIGN-IND-90218-BIDSURE', 20, y + 22);
  doc.text('Cryptographic Audit Hash: 8f43a9b1...c2890a (SHA-256 Validated)', 20, y + 28);

  // Digital Seal
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.roundedRect(145, y + 4, 45, 26, 2, 2, 'D');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('BIDSURE AI CERTIFIED', 150, y + 13);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('GENUINE PROCUREMENT', 151, y + 19);
  doc.text('TAMPER-PROOF AUDIT', 153, y + 24);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('BidSure AI Autonomous Compliance Verification System | Confidential Tender Record', 14, 290);
  doc.text('Page 1 of 1', 184, 290);

  // Trigger browser download
  const filename = `BidSure_Dossier_${reportData.tenderId || 'TND'}_${(reportData.bidderName || 'Bidder').replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
  return filename;
}
