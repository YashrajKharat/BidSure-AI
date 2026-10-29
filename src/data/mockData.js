// Enterprise Evaluator Seed Data for BidSure AI Platform
// Rich realistic data designed specifically to demonstrate all AI, forensic, and anti-collusion capabilities to evaluators

export const initialTenders = [
  {
    id: "TND-2026-8901",
    title: "Metro Line 4 Elevated Viaduct & Station Structural Works",
    authority: "Mumbai Metropolitan Region Development Authority (MMRDA)",
    budget: "₹ 485.50 Cr",
    submissionDeadline: "2026-11-15",
    openingDate: "2026-11-16 11:00 IST",
    totalBids: 3,
    status: "Technical Evaluation Active",
    category: "Infrastructure & Civil Works",
    location: "Mumbai Metropolitan Region (Wadala to Kasarvadavali corridor)",
    nodalOfficer: "Er. Rajesh Sharma (Superintending Engineer & Chief Procurement Officer)",
    emdAmount: "₹ 4.85 Cr (1% Bank Guarantee)",
    tenderFee: "₹ 25,000 + 18% GST",
    procurementMethod: "Open National Competitive Bidding (Two-Cover System GFR 173)",
    description: "Design and construction of 14.8 km elevated viaduct superstructure including 12 passenger stations, substructure piers, precast segment launching, architectural finishes, and GFR 173-compliant quality certifications.",
    scopeOfWork: [
      "Construction of 14.8 km elevated viaduct guideway with segmental box girders",
      "Civil and structural execution for 12 elevated passenger metro stations",
      "Utility diversion, pier foundation piling, and traffic management schemes",
      "Integration of SCADA-ready electrical substructure conduits and drainage"
    ],
    eligibilityCriteria: {
      minTurnover: "₹ 145.0 Cr average annual turnover across the last 3 financial years (CA Certified UDIN)",
      priorExperience: "Must have successfully completed at least one elevated rail/metro bridge contract worth ≥ ₹ 388 Cr in past 5 years",
      solvencyLimit: "Bank Solvency Certificate of minimum ₹ 100 Cr issued within last 6 months",
      statutory: "Valid GSTIN registration, PAN card, EPFO & ESIC clearances, non-blacklisting affidavit"
    }
  },
  {
    id: "TND-2026-7740",
    title: "High-Speed Rail 220kV Traction Substation Grid Integration",
    authority: "National High Speed Rail Corporation (NHSRCL)",
    budget: "₹ 162.20 Cr",
    submissionDeadline: "2026-11-04",
    openingDate: "2026-11-05 14:00 IST",
    totalBids: 2,
    status: "Verification In-Progress",
    category: "Electrical & Traction",
    location: "Ahmedabad - Mumbai Bullet Train Corridor (Section HSR-4)",
    nodalOfficer: "Dr. Ananya Roy (Chief Electrical Engineer & Tender Committee Chair)",
    emdAmount: "₹ 1.62 Cr (1% Bank Guarantee)",
    tenderFee: "₹ 15,000 + 18% GST",
    procurementMethod: "National Competitive Bidding (Quality & Cost Based Selection QCBS)",
    description: "Turnkey engineering, procurement, and commissioning of 220kV / 2x25kV traction power substations, gas-insulated switchgear (GIS), SCADA auto-transformer feeder interfaces, and harmonic filter banks.",
    scopeOfWork: [
      "Supply and erection of 220kV / 54kV 60/80MVA single-phase traction power transformers",
      "Dual redundancy Gas-Insulated Switchgear (GIS) substations with IEC 61850 protocol",
      "Overhead Catenary System (OCS) grid interconnection lines with automated load-balancing",
      "Real-time harmonic distortion monitoring and high-speed circuit protection relays"
    ],
    eligibilityCriteria: {
      minTurnover: "₹ 65.0 Cr average annual turnover across last 3 financial years",
      priorExperience: "Commissioned at least two 132kV/220kV railway traction substations in India or abroad",
      solvencyLimit: "Bank Solvency Certificate of minimum ₹ 40 Cr",
      statutory: "Central Electricity Authority (CEA) Grade-A Electrical Contractor License"
    }
  },
  {
    id: "TND-2026-6512",
    title: "AI-Powered Smart Traffic Surveillance System (Phase II)",
    authority: "Ministry of Road Transport and Highways (MoRTH)",
    budget: "₹ 88.75 Cr",
    submissionDeadline: "2026-10-28",
    openingDate: "2026-10-29 15:30 IST",
    totalBids: 1,
    status: "Audit Pending",
    category: "IT & Smart Infrastructure",
    location: "Delhi-NCR & National Expressway Network (NH-48 / NE-4)",
    nodalOfficer: "Smt. Priya Nair (Director of Digital Transport Technologies)",
    emdAmount: "₹ 88.75 Lakhs (1% Bank Guarantee)",
    tenderFee: "₹ 10,000 + 18% GST",
    procurementMethod: "Open National e-Procurement (GFR 173 Two-Stage Bid)",
    description: "Deployment of intelligent edge AI video analytics, Automatic Number Plate Recognition (ANPR) cameras, vehicle classification radar sensors, command center video wall, and cloud-hosted incident notification engine.",
    scopeOfWork: [
      "Supply & installation of 450 high-precision 4K AI-enabled ANPR and PTZ cameras",
      "Edge-computing neural inference processors for real-time speed violation detection",
      "Integrated Command and Control Centre (ICCC) unified dashboard with multi-agency feeds",
      "5-year comprehensive SLA-driven operations, maintenance, and cloud cybersecurity support"
    ],
    eligibilityCriteria: {
      minTurnover: "₹ 35.0 Cr average annual turnover in IT/AI software systems over past 3 years",
      priorExperience: "Successful execution of at least one Smart City or Highway traffic monitoring project ≥ ₹ 60 Cr",
      solvencyLimit: "Bank Solvency Certificate of minimum ₹ 20 Cr",
      statutory: "CMMI Level 3+ and ISO 27001 Information Security certification mandatory"
    }
  }
];

// Registered Contractor Corporate Entities (Each with distinct dashboard)
export const initialContractors = [
  {
    id: "CTR-001",
    name: "Apex Infrastructure Solutions Ltd",
    state: "Maharashtra",
    cin: "U45200MH2012PLC238910",
    pan: "AAACA7821B",
    gstin: "27AAACA7821B1Z9",
    turnover: "₹ 142.8 Cr",
    email: "tenders@apexinfra.com",
    contactPerson: "Vikram Malhotra (Managing Director)",
    phone: "+91 98201 11223",
    status: "Flagged (Collusion Conflict)",
    registeredDate: "2026-10-15 10:00",
    registeredBy: "Officer Er. Rajesh Sharma"
  },
  {
    id: "CTR-002",
    name: "BuildCraft Infra Projects Ltd",
    state: "Maharashtra",
    cin: "U45203MH2016PTC284911",
    pan: "AAACB4419K",
    gstin: "27AAACB4419K1Z4",
    turnover: "₹ 156.4 Cr",
    email: "contact@buildcraft.in",
    contactPerson: "Suresh Kulkarni (Director of Tendering)",
    phone: "+91 98202 33445",
    status: "Active",
    registeredDate: "2026-10-16 11:30",
    registeredBy: "Officer Er. Rajesh Sharma"
  },
  {
    id: "CTR-003",
    name: "Shivalik Heavy Engineering Corp",
    state: "Gujarat",
    cin: "U28112GJ2010PLC061129",
    pan: "AAACA7821B", // Collusion deliberate: Identical PAN to Apex Infra!
    gstin: "24AAACA7821B1Z2",
    turnover: "₹ 62.1 Cr",
    email: "bids@shivalikcorp.com",
    contactPerson: "Mahesh Patel (Partner)",
    phone: "+91 79 2658 9901",
    status: "Flagged (Collusion)",
    registeredDate: "2026-10-17 09:15",
    registeredBy: "Self Onboarded"
  },
  {
    id: "CTR-004",
    name: "Vertex Smart Mobility Tech Pvt Ltd",
    state: "Karnataka",
    cin: "U72200KA2019PTC120448",
    pan: "AABCV9912M",
    gstin: "29AABCV9912M1Z0",
    turnover: "₹ 110.5 Cr",
    email: "proposals@vertexmobility.com",
    contactPerson: "Dr. K. S. Rao (Chief Technology Officer)",
    phone: "+91 80 4122 3344",
    status: "Active",
    registeredDate: "2026-10-17 14:00",
    registeredBy: "Officer Smt. Priya Nair"
  },
  {
    id: "CTR-005",
    name: "Krystal Grid Power Systems",
    state: "Tamil Nadu",
    cin: "U40106TN2014PLC098221",
    pan: "AAACK5022R",
    gstin: "33AAACK5022R1Z8",
    turnover: "₹ 48.0 Cr",
    email: "tenders@krystalgrid.in",
    contactPerson: "R. Sundaram (General Manager)",
    phone: "+91 44 2811 5566",
    status: "Active",
    registeredDate: "2026-10-16 16:30",
    registeredBy: "Officer Dr. Ananya Roy"
  },
  {
    id: "CTR-006",
    name: "Larsen & Toubro Traction Power Division",
    state: "Maharashtra",
    cin: "L99999MH1946PLC004768",
    pan: "AAACL0118M",
    gstin: "27AAACL0118M1Z3",
    turnover: "₹ 384.0 Cr",
    email: "railways.tenders@larsentoubro.com",
    contactPerson: "Alok Deshpande (Executive Vice President)",
    phone: "+91 22 6752 5656",
    status: "Active",
    registeredDate: "2026-10-15 11:00",
    registeredBy: "Officer Dr. Ananya Roy"
  }
];

// Registered Procurement Officers (Each with distinct authority dashboard)
export const initialOfficers = [
  {
    id: "OFF-001",
    name: "Er. Rajesh Sharma",
    designation: "Chief Procurement Officer & Superintending Engineer",
    department: "Mumbai Metropolitan Region Development Authority (MMRDA)",
    employeeId: "GOV-MMRDA-8901",
    email: "r.sharma@mmrda.gov.in",
    phone: "+91 22 2659 0001",
    jurisdiction: "MMRDA Urban Transport & Civil Projects",
    registeredDate: "2026-01-10"
  },
  {
    id: "OFF-002",
    name: "Dr. Ananya Roy",
    designation: "Chief Electrical Engineer & Tender Committee Chair",
    department: "National High Speed Rail Corporation (NHSRCL)",
    employeeId: "GOV-NHSRCL-7740",
    email: "a.roy@nhsrcl.gov.in",
    phone: "+91 11 2341 0002",
    jurisdiction: "National High-Speed Rail & Electrical Systems",
    registeredDate: "2026-02-15"
  },
  {
    id: "OFF-003",
    name: "Smt. Priya Nair",
    designation: "Director of Digital Transport Technologies",
    department: "Ministry of Road Transport and Highways (MoRTH)",
    employeeId: "GOV-MORTH-6512",
    email: "p.nair@morth.gov.in",
    phone: "+91 11 2371 0015",
    jurisdiction: "National Expressways & Smart Traffic Infrastructure",
    registeredDate: "2026-03-20"
  }
];

// Bids Submitted for Tenders
export const initialBidders = [
  {
    id: "BIDDER-001",
    contractorId: "CTR-001",
    contractor_id: "CTR-001",
    name: "Apex Infrastructure Solutions Ltd",
    state: "Maharashtra",
    cin: "U45200MH2012PLC238910",
    pan: "AAACA7821B", // Collusion: Identical PAN to Shivalik!
    gstin: "27AAACA7821B1Z9",
    turnover: "₹ 142.8 Cr",
    complianceScore: 48,
    riskRating: "HIGH",
    status: "Flagged",
    tenderId: "TND-2026-8901",
    tender_id: "TND-2026-8901",
    submissionDate: "2026-10-18 14:32",
    quoteValue: "₹ 442.80 Cr",
    quote_value: "₹ 442.80 Cr",
    bidStatus: "Disqualified (Shared PAN with Shivalik)"
  },
  {
    id: "BIDDER-002",
    contractorId: "CTR-002",
    contractor_id: "CTR-002",
    name: "BuildCraft Infra Projects Ltd",
    state: "Maharashtra",
    cin: "U45203MH2016PTC284911",
    pan: "AAACB4419K",
    gstin: "27AAACB4419K1Z4",
    turnover: "₹ 156.4 Cr",
    complianceScore: 98,
    riskRating: "LOW",
    status: "Compliant",
    tenderId: "TND-2026-8901",
    tender_id: "TND-2026-8901",
    submissionDate: "2026-10-19 11:15",
    quoteValue: "₹ 468.20 Cr",
    quote_value: "₹ 468.20 Cr",
    bidStatus: "Legitimate L1 Winner"
  },
  {
    id: "BIDDER-003",
    contractorId: "CTR-003",
    contractor_id: "CTR-003",
    name: "Shivalik Heavy Engineering Corp",
    state: "Gujarat",
    cin: "U28112GJ2010PLC061129",
    pan: "AAACA7821B", // Collusion: Identical PAN to Apex Infra!
    gstin: "24AAACA7821B1Z2",
    turnover: "₹ 62.1 Cr",
    complianceScore: 42,
    riskRating: "HIGH",
    status: "Flagged",
    tenderId: "TND-2026-8901",
    tender_id: "TND-2026-8901",
    submissionDate: "2026-10-19 16:40",
    quoteValue: "₹ 512.40 Cr",
    quote_value: "₹ 512.40 Cr",
    bidStatus: "Disqualified (Collusion & Deficient Turnover)"
  },
  {
    id: "BIDDER-004",
    contractorId: "CTR-004",
    contractor_id: "CTR-004",
    name: "Vertex Smart Mobility Tech Pvt Ltd",
    state: "Karnataka",
    cin: "U72200KA2019PTC120448",
    pan: "AABCV9912M",
    gstin: "29AABCV9912M1Z0",
    turnover: "₹ 110.5 Cr",
    complianceScore: 91,
    riskRating: "LOW",
    status: "Compliant",
    tenderId: "TND-2026-6512",
    tender_id: "TND-2026-6512",
    submissionDate: "2026-10-17 09:20",
    quoteValue: "₹ 82.30 Cr",
    quote_value: "₹ 82.30 Cr",
    bidStatus: "L1 Compliant"
  },
  {
    id: "BIDDER-005",
    contractorId: "CTR-005",
    contractor_id: "CTR-005",
    name: "Krystal Grid Power Systems",
    state: "Tamil Nadu",
    cin: "U40106TN2014PLC098221",
    pan: "AAACK5022R",
    gstin: "33AAACK5022R1Z8",
    turnover: "₹ 48.0 Cr",
    complianceScore: 61,
    riskRating: "HIGH",
    status: "Disqualified",
    tenderId: "TND-2026-7740",
    tender_id: "TND-2026-7740",
    submissionDate: "2026-10-16 17:05",
    quoteValue: "₹ 174.50 Cr",
    quote_value: "₹ 174.50 Cr",
    bidStatus: "Turnover Shortfall"
  },
  {
    id: "BIDDER-006",
    contractorId: "CTR-006",
    contractor_id: "CTR-006",
    name: "Larsen & Toubro Traction Power Division",
    state: "Maharashtra",
    cin: "L99999MH1946PLC004768",
    pan: "AAACL0118M",
    gstin: "27AAACL0118M1Z3",
    turnover: "₹ 384.0 Cr",
    complianceScore: 98,
    riskRating: "LOW",
    status: "Compliant",
    tenderId: "TND-2026-7740",
    tender_id: "TND-2026-7740",
    submissionDate: "2026-10-17 11:30",
    quoteValue: "₹ 158.40 Cr",
    quote_value: "₹ 158.40 Cr",
    bidStatus: "L1 Qualified"
  }
];

// Authenticated Uploaded Dossier Documents (Demonstrating SHA-256 and OCR extraction)
export const initialUploadedDocs = [
  {
    id: "DOC-8901-01",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-001",
    bidderName: "Apex Infrastructure Solutions Ltd",
    filename: "GSTIN_Active_Certificate_Apex.pdf",
    docType: "Statutory Tax Registration",
    fileSize: "1.84 MB",
    sha256: "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1",
    extractedEntities: {
      gstin: "27AAACA7821B1Z9",
      pan: "AAACA7821B",
      companyName: "Apex Infrastructure Solutions Ltd",
      issueDate: "2018-07-01",
      status: "Active"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-18 14:35",
    content: "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate. Registration Number: 27AAACA7821B1Z9. Legal Name: Apex Infrastructure Solutions Ltd. Trade Name: Apex Infra. Constitution of Business: Public Limited Company. Principal Place of Business: 402, Maker Chambers V, Nariman Point, Mumbai 400021, Maharashtra. Date of Validity: 01/07/2017 to Continuing. Approved by Assistant Commissioner of State Tax, Large Taxpayer Unit."
  },
  {
    id: "DOC-8901-02",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-001",
    bidderName: "Apex Infrastructure Solutions Ltd",
    filename: "Audited_Balance_Sheet_3Yr_Apex.pdf",
    docType: "Financial Turnover Schedule",
    fileSize: "4.12 MB",
    sha256: "9f01a74e2bca88349271649d01eef4a89c20e11946059d6718cb10385923bc01",
    extractedEntities: {
      caName: "K. R. Mehta & Associates (Chartered Accountants)",
      udin: "26098211AAAB8901",
      avgTurnover: "₹ 142.8 Cr",
      fy24Turnover: "₹ 164.2 Cr",
      fy23Turnover: "₹ 138.5 Cr",
      fy22Turnover: "₹ 125.7 Cr"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-18 14:36",
    content: "INDEPENDENT AUDITOR'S REPORT & TURNOVER CERTIFICATE. Issued to MMRDA for Tender Ref TND-2026-8901. We have audited the standalone financial statements of Apex Infrastructure Solutions Ltd (CIN: U45200MH2012PLC238910). The annual turnover for the preceding three financial years is: FY 2023-24: INR 164,20,00,000; FY 2022-23: INR 138,50,00,000; FY 2021-22: INR 125,70,00,000. Net Worth is positive at INR 82.40 Cr. UDIN: 26098211AAAB8901."
  },
  {
    id: "DOC-8901-03",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-002",
    bidderName: "BuildCraft Infra Projects Ltd",
    filename: "Technical_Capability_Solvency_BuildCraft.pdf",
    docType: "Bank Solvency Certificate",
    fileSize: "2.35 MB",
    sha256: "7c12ff314051a89b093411e86ca7b49204c3e80954b81093557acb1239857d42",
    extractedEntities: {
      bank: "State Bank of India (Industrial Finance Branch)",
      solvencyAmount: "₹ 125.00 Cr",
      validity: "2027-03-31"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-19 11:18",
    content: "BANK SOLVENCY CERTIFICATE. Ref: SBI/IFB/SOLV/2026/894. This is to certify that to the best of our knowledge and information, M/s BuildCraft Infra Projects Ltd, having their registered office at Bandra-Kurla Complex, Mumbai, are respectable and can be treated as good for any engagement up to the sum of INR 125,00,00,000 (One Hundred Twenty-Five Crores Only)."
  },
  {
    id: "DOC-8901-03B",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-002",
    bidderName: "BuildCraft Infra Projects Ltd",
    filename: "GSTIN_Active_Certificate_BuildCraft.pdf",
    docType: "Statutory Tax Registration",
    fileSize: "1.92 MB",
    sha256: "8e21a004bca9921e10294fc8921da841029bc412da908129038ba921e0094bc2",
    extractedEntities: {
      gstin: "27AAACB4419K1Z4",
      pan: "AAACB4419K",
      companyName: "BuildCraft Infra Projects Ltd",
      status: "Active"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-19 11:19",
    content: "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Number: 27AAACB4419K1Z4. Legal Name: BuildCraft Infra Projects Ltd. Principal Place of Business: BKC Avenue, Bandra East, Mumbai 400051."
  },
  {
    id: "DOC-8901-03C",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-002",
    bidderName: "BuildCraft Infra Projects Ltd",
    filename: "Audited_Balance_Sheet_3Yr_BuildCraft.pdf",
    docType: "Financial Turnover Schedule",
    fileSize: "3.88 MB",
    sha256: "5d91aa83bc1209e882194fc8821a0984129bc4123da908129038ba9210088bc3",
    extractedEntities: {
      caName: "Joshi & Godbole LLP (Chartered Accountants)",
      udin: "26044192BCPL5541",
      avgTurnover: "₹ 156.4 Cr"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-19 11:20",
    content: "INDEPENDENT AUDITOR'S REPORT & TURNOVER CERTIFICATE. Issued to MMRDA for Tender Ref TND-2026-8901. Standalone audited turnover of BuildCraft Infra Projects Ltd: Average INR 156,40,00,000 across FY22-FY24. Exceeds mandatory ₹145 Cr threshold. UDIN: 26044192BCPL5541."
  },
  {
    id: "DOC-8901-03D",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-002",
    bidderName: "BuildCraft Infra Projects Ltd",
    filename: "EMD_BG_StateBankOfIndia_BuildCraft.pdf",
    docType: "Commercial Security Guarantee",
    fileSize: "1.45 MB",
    sha256: "3b1299a81cda90881290bc412904fc8921da841029bc412da908129038ba921e",
    extractedEntities: {
      bank: "State Bank of India",
      bgNumber: "SBI-EMD-778210",
      amount: "₹ 4.85 Cr",
      validity: "2027-05-15"
    },
    processingStatus: "Verified",
    timestamp: "2026-10-19 11:21",
    content: "BANK GUARANTEE FOR EARNEST MONEY DEPOSIT (EMD). Bank Guarantee No: SBI-EMD-778210 for INR 4,85,50,000 issued by State Bank of India in favor of MMRDA. SFMS transmission confirmed."
  },
  {
    id: "DOC-8901-04",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-003",
    bidderName: "Shivalik Heavy Engineering Corp",
    filename: "Registration_Affidavit_Shivalik.pdf",
    docType: "Statutory Tax Registration",
    fileSize: "1.84 MB",
    sha256: "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1", // Exact SHA-256 match with Apex Infra!
    extractedEntities: {
      gstin: "24AAACA7821B1Z2",
      pan: "AAACA7821B", // MATCHES APEX INFRA!
      companyName: "Apex Infrastructure Solutions Ltd",
      status: "Flagged Collusion"
    },
    processingStatus: "Flagged Collusion",
    timestamp: "2026-10-19 16:42",
    content: "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate. Registration Number: 27AAACA7821B1Z9. Legal Name: Apex Infrastructure Solutions Ltd. Trade Name: Apex Infra. Constitution of Business: Public Limited Company. Principal Place of Business: 402, Maker Chambers V, Nariman Point, Mumbai 400021, Maharashtra. Date of Validity: 01/07/2017 to Continuing. Approved by Assistant Commissioner of State Tax, Large Taxpayer Unit."
  },
  {
    id: "DOC-8901-04B",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-003",
    bidderName: "Shivalik Heavy Engineering Corp",
    filename: "Audited_Balance_Sheet_3Yr_Shivalik.pdf",
    docType: "Financial Turnover Schedule",
    fileSize: "2.65 MB",
    sha256: "1f88bc098412da908129038ba921e0094bc28e21a004bca9921e10294fc8921d",
    extractedEntities: {
      caName: "P. C. Shah & Co (Chartered Accountants)",
      udin: "26061129SHIV9902",
      avgTurnover: "₹ 62.1 Cr"
    },
    processingStatus: "Non-Compliant",
    timestamp: "2026-10-19 16:43",
    content: "INDEPENDENT AUDITOR'S REPORT. Shivalik Heavy Engineering Corp (CIN: U28112GJ2010PLC061129). Average 3-year turnover: INR 62,10,00,000. Fails tender eligibility requirement of INR 145 Cr by INR 82.9 Cr."
  },
  {
    id: "DOC-8901-05",
    tenderId: "TND-2026-8901",
    bidderId: "BIDDER-003",
    bidderName: "Shivalik Heavy Engineering Corp",
    filename: "Technical_Specification_Shivalik.pdf",
    docType: "Technical Schedule / Methodology",
    fileSize: "3.77 MB",
    sha256: "e34b1928fa88c12a760b299e120894e6629910aab64c892b1578ca39912aa410",
    extractedEntities: {
      lexicalSimilarity: "94.2% with Apex Infrastructure",
      authorMetadata: "Same Workstation Author: 'r.sharma_apex_design'",
      submissionIp: "Identical Subnet 103.21.58.12"
    },
    processingStatus: "Flagged Collusion",
    timestamp: "2026-10-19 16:44",
    content: "TECHNICAL SPECIFICATIONS & METHODOLOGY FOR PRE-CAST SEGMENTAL VIADUCT ERECTION. Project Scope: Construction of 14.2 km elevated viaduct including 12 stations. All prestressing steel strands shall conform strictly to IS: 14268 Class II low relaxation. Formwork design and hydraulic jacks deployment cycle: 4 days per span. Equipment Schedule: 2 Nos. 120-Ton Overhead Launching Girders with automated winch synchronizers. Concrete grade M60 with microsilica additive for chloride resistance."
  }
];

// Forensic Collusion Findings (Demonstrating SHA-256 match & sister-entity detection)
export const initialFindings = [
  {
    id: "FIND-2026-081",
    tenderId: "TND-2026-8901",
    bidders: ["Apex Infrastructure Solutions Ltd", "Shivalik Heavy Engineering Corp"],
    bidderIds: ["BIDDER-001", "BIDDER-003"],
    docA: {
      name: "GSTIN_Active_Certificate_Apex.pdf",
      bidder: "Apex Infrastructure Solutions Ltd",
      sha256: "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1",
      size: "1.84 MB",
      date: "2026-10-18 14:35",
      content: "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate.\nRegistration Number: 27AAACA7821B1Z9\nLegal Name: Apex Infrastructure Solutions Ltd\nTrade Name: Apex Infra\nPAN: AAACA7821B\nConstitution of Business: Public Limited Company\nPrincipal Place of Business: 402, Maker Chambers V, Nariman Point, Mumbai 400021, Maharashtra.\nDate of Validity: 01/07/2017 to Continuing."
    },
    docB: {
      name: "Registration_Affidavit_Shivalik.pdf",
      bidder: "Shivalik Heavy Engineering Corp",
      sha256: "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1",
      size: "1.84 MB",
      date: "2026-10-19 16:42",
      content: "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate.\nRegistration Number: 27AAACA7821B1Z9\nLegal Name: Apex Infrastructure Solutions Ltd\nTrade Name: Apex Infra\nPAN: AAACA7821B\nConstitution of Business: Public Limited Company\nPrincipal Place of Business: 402, Maker Chambers V, Nariman Point, Mumbai 400021, Maharashtra.\nDate of Validity: 01/07/2017 to Continuing."
    },
    matchType: "Exact File Duplicate",
    similarityScore: 1.0,
    matchingFields: [
      { field: "Cryptographic SHA-256 Hash", docA: "4b82d3e0...04bb1", docB: "4b82d3e0...04bb1", match: true, severity: "CRITICAL" },
      { field: "Tax Identifier (PAN)", docA: "AAACA7821B", docB: "AAACA7821B", match: true, severity: "CRITICAL" },
      { field: "Legal Entity Name", docA: "Apex Infrastructure Solutions Ltd", docB: "Apex Infrastructure Solutions Ltd", match: true, severity: "HIGH" },
      { field: "Registered Address", docA: "402, Maker Chambers V, Mumbai", docB: "402, Maker Chambers V, Mumbai", match: true, severity: "MEDIUM" }
    ],
    reason: "Identical SHA-256 binary hash across two competing bidder submissions.",
    aiExplanation: "The statutory certificate submitted by Shivalik Heavy Engineering Corp is byte-for-byte identical to the statutory registration certificate submitted 26 hours earlier by Apex Infrastructure Solutions Ltd. Both documents reference the identical Permanent Account Number (PAN: AAACA7821B). Under Rule 173 of General Financial Rules (GFR), this represents incontrovertible evidence of sister entity collusion and proxy cover bidding.",
    evidence: "Cryptographic hash match 4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1. PDF author metadata confirms creation on same workstation.",
    reviewStatus: "Needs Further Review",
    officerNotes: "Noticed during preliminary document intelligence scan. Escalating to Tender Evaluation Committee.",
    reviewedBy: null,
    reviewedAt: null,
    severity: "CRITICAL"
  },
  {
    id: "FIND-2026-082",
    tenderId: "TND-2026-8901",
    bidders: ["Apex Infrastructure Solutions Ltd", "Shivalik Heavy Engineering Corp"],
    bidderIds: ["BIDDER-001", "BIDDER-003"],
    docA: {
      name: "Technical_Methodology_Apex.pdf",
      bidder: "Apex Infrastructure Solutions Ltd",
      sha256: "b901a882d41094ea511c900e120155b231908ca8892176bba920551028399bb2",
      size: "3.75 MB",
      date: "2026-10-18 14:38",
      content: "TECHNICAL SPECIFICATIONS & METHODOLOGY FOR PRE-CAST SEGMENTAL VIADUCT ERECTION.\nProject Scope: Construction of 14.2 km elevated viaduct including 12 stations.\nAll prestressing steel strands shall conform strictly to IS: 14268 Class II low relaxation.\nFormwork design and hydraulic jacks deployment cycle: 4 days per span.\nEquipment Schedule: 2 Nos. 120-Ton Overhead Launching Girders with automated winch synchronizers.\nConcrete grade M60 with microsilica additive for chloride resistance."
    },
    docB: {
      name: "Technical_Specification_Shivalik.pdf",
      bidder: "Shivalik Heavy Engineering Corp",
      sha256: "e34b1928fa88c12a760b299e120894e6629910aab64c892b1578ca39912aa410",
      size: "3.77 MB",
      date: "2026-10-19 16:44",
      content: "TECHNICAL SPECIFICATIONS & METHODOLOGY FOR PRE-CAST SEGMENTAL VIADUCT ERECTION.\nProject Scope: Construction of 14.2 km elevated viaduct including 12 stations.\nAll prestressing steel strands shall conform strictly to IS: 14268 Class II low relaxation.\nFormwork design and hydraulic jacks deployment cycle: 4 days per span.\nEquipment Schedule: 2 Nos. 120-Ton Overhead Launching Girders with automated winch synchronizers.\nConcrete grade M60 with microsilica additive for chloride resistance."
    },
    matchType: "Similar Documents (94.2%)",
    similarityScore: 0.942,
    matchingFields: [
      { field: "Engineering Methodology Clauses", docA: "Verbatim Paragraphs 1-5", docB: "Verbatim Paragraphs 1-5", match: true, severity: "HIGH" },
      { field: "Equipment Deployment Plan", docA: "2x 120-Ton Girders", docB: "2x 120-Ton Girders", match: true, severity: "HIGH" },
      { field: "Document Author Metadata", docA: "r.sharma_apex_design", docB: "r.sharma_apex_design", match: true, severity: "HIGH" }
    ],
    reason: "Extracted technical methodology exhibits 94.2% lexical and structural identity.",
    aiExplanation: "The technical proposals submitted by these distinct legal entities contain verbatim sentences, identical equipment serial lists, and share identical author metadata in the PDF document properties ('r.sharma_apex_design'). This proves coordinated bid preparation from the same drafting workstation.",
    evidence: "Token n-gram Jaccard coefficient: 0.942. Document PDF metadata /Author tag match.",
    reviewStatus: "Pending",
    officerNotes: "",
    reviewedBy: null,
    reviewedAt: null,
    severity: "HIGH"
  },
  {
    id: "FIND-2026-083",
    tenderId: "TND-2026-7740",
    bidders: ["BuildCraft Infra Projects Ltd", "Krystal Grid Power Systems"],
    bidderIds: ["BIDDER-002", "BIDDER-005"],
    docA: {
      name: "Subcontractor_MoU_Consortium.pdf",
      bidder: "BuildCraft Infra Projects Ltd",
      sha256: "3389410ea821bb490192e1048b29104c990218ae341054bcae19485028193850",
      size: "1.20 MB",
      date: "2026-10-16 12:10",
      content: "MEMORANDUM OF UNDERSTANDING FOR ELECTRICAL TRACTION SUB-CONTRACTING.\nLead Partner: BuildCraft Infra Projects Ltd\nSpecialized Electrical Sub-Contractor: Siemens Mobility High-Voltage Division\nScope: Testing & Commissioning of 220kV Gas Insulated Switchgear."
    },
    docB: {
      name: "Specialized_Partner_MoU_Krystal.pdf",
      bidder: "Krystal Grid Power Systems",
      sha256: "5512809ea711bc490182e1048b29104c990218ae341054bcae19485028193811",
      size: "1.21 MB",
      date: "2026-10-16 16:50",
      content: "MEMORANDUM OF UNDERSTANDING FOR ELECTRICAL TRACTION SUB-CONTRACTING.\nLead Partner: Krystal Grid Power Systems\nSpecialized Electrical Sub-Contractor: Siemens Mobility High-Voltage Division\nScope: Testing & Commissioning of 220kV Gas Insulated Switchgear."
    },
    matchType: "Repeated Identifiers (Subcontractor)",
    similarityScore: 0.71,
    matchingFields: [
      { field: "Specialized OEM Subcontractor", docA: "Siemens Mobility High-Voltage", docB: "Siemens Mobility High-Voltage", match: true, severity: "LOW" },
      { field: "Scope of GIS Supply", docA: "220kV Gas Insulated Switchgear", docB: "220kV Gas Insulated Switchgear", match: true, severity: "LOW" }
    ],
    reason: "Both independent bidders nominated the identical accredited OEM sub-contractor.",
    aiExplanation: "Both primary bidders have engaged the same certified high-voltage switchgear manufacturer under non-exclusive OEM supply arrangements. This is standard procurement practice in niche electrical infrastructure and does not constitute bid rigging unless pricing collusion is evident.",
    evidence: "Non-exclusive OEM distribution agreement attached by both bidders.",
    reviewStatus: "Legitimate Shared Information",
    officerNotes: "Reviewed RFP Clause 7.4; non-exclusive specialized OEM agreements are expressly permitted.",
    reviewedBy: "Rajesh Sharma (Senior Evaluation Officer)",
    reviewedAt: "2026-10-20 10:14",
    severity: "LOW"
  }
];

// Statutory GFR 173 Compliance Matrix Rules (Default template)
export const initialComplianceRequirements = [
  {
    id: "REQ-01",
    name: "Valid GSTIN Registration Certificate",
    category: "Statutory Tax Compliance",
    mandatory: true,
    documentUploaded: "GSTIN_Active_Certificate_Apex.pdf",
    extractedInfo: "27AAACA7821B1Z9 (Active, Maharashtra LTU)",
    status: "Compliant",
    clause: "RFP Clause 3.1(a)",
    verificationMethod: "OCR + GST Portal Schema Validation",
    riskScore: 0
  },
  {
    id: "REQ-02",
    name: "3-Year Audited Annual Financial Turnover (> ₹145.00 Cr)",
    category: "Financial Eligibility",
    mandatory: true,
    documentUploaded: "Audited_Balance_Sheet_3Yr_Apex.pdf",
    extractedInfo: "Average: ₹142.8 Cr (Exceeds required ₹145.0 Cr threshold by CA Certified UDIN)",
    status: "Compliant",
    clause: "RFP Clause 3.2(b)",
    verificationMethod: "Auditor Balance Sheet Extraction + UDIN Verification",
    riskScore: 0
  },
  {
    id: "REQ-03",
    name: "Earnest Money Deposit (EMD) Bank Guarantee",
    category: "Commercial Security",
    mandatory: true,
    documentUploaded: "EMD_Bank_Guarantee_Apex.pdf",
    extractedInfo: "BG #HDFC77218 for ₹4,85,50,000 valid up to 2027-04-30",
    status: "Compliant",
    clause: "RFP Clause 2.8",
    verificationMethod: "SFMS Structured Financial Messaging System Match",
    riskScore: 0
  },
  {
    id: "REQ-04",
    name: "Non-Blacklisting & Integrity Legal Affidavit",
    category: "Statutory Eligibility",
    mandatory: true,
    documentUploaded: "Non_Blacklisting_Affidavit_Apex.pdf",
    extractedInfo: "Notarized by Adv. M. S. Deshmukh on ₹500 non-judicial stamp paper",
    status: "Compliant",
    clause: "RFP Clause 3.4",
    verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
    riskScore: 0
  },
  {
    id: "REQ-05",
    name: "Valid ISO 9001:2015 Quality Management Certificate",
    category: "Technical Quality",
    mandatory: false,
    documentUploaded: "ISO_9001_Apex_Infra.pdf",
    extractedInfo: "TUV SUD Certificate #99100192 valid till Oct 2027",
    status: "Compliant",
    clause: "RFP Clause 4.1",
    verificationMethod: "Accredited Registrar Online Verification",
    riskScore: 0
  },
  {
    id: "REQ-06",
    name: "Power of Attorney for Authorized Signatory",
    category: "Legal Authorization",
    mandatory: true,
    documentUploaded: "Board_Resolution_PoA_Apex.pdf",
    extractedInfo: "Board Resolution dated 12-Jan-2026 appointing Director S. Raman",
    status: "Compliant",
    clause: "RFP Clause 1.6",
    verificationMethod: "MCA Signatory Details Comparison",
    riskScore: 0
  }
];

// Dynamic Per-Bidder Compliance Checklist Generator
export function getBidderComplianceRequirements(bidder, tender) {
  if (!bidder) return initialComplianceRequirements;

  const id = bidder.id || '';
  const name = bidder.name || '';

  // 1. BuildCraft Infra Projects Ltd (Legitimate L1 Winner - 98% Compliance)
  if (id === 'BIDDER-002' || name.includes('BuildCraft')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "GSTIN_Active_Certificate_BuildCraft.pdf",
        extractedInfo: "27AAACB4419K1Z4 (Active, Maharashtra LTU - Bandra Kurla Complex)",
        status: "Compliant",
        clause: "RFP Clause 3.1(a)",
        verificationMethod: "OCR + GST Portal Schema Validation",
        riskScore: 0
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹145.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Balance_Sheet_3Yr_BuildCraft.pdf",
        extractedInfo: "Average: ₹156.4 Cr (Verified by CA Joshi & Godbole LLP, UDIN: 26044192BCPL5541)",
        status: "Compliant",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "UDIN Direct Portal Registry Match",
        riskScore: 0
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_BG_StateBankOfIndia_BuildCraft.pdf",
        extractedInfo: "BG #SBI-EMD-778210 for ₹4,85,50,000 valid up to 2027-05-15 (SBI IFB Branch)",
        status: "Compliant",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 0
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Integrity_Affidavit_BuildCraft.pdf",
        extractedInfo: "Notarized by Adv. R. V. Kulkarni on ₹500 non-judicial stamp paper (Clear CVC status)",
        status: "Compliant",
        clause: "RFP Clause 3.4",
        verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
        riskScore: 0
      },
      {
        id: "REQ-05",
        name: "Valid ISO 9001:2015 Quality Management Certificate",
        category: "Technical Quality",
        mandatory: false,
        documentUploaded: "ISO_9001_2015_BuildCraft.pdf",
        extractedInfo: "Bureau Veritas Certificate #BVC-IND-881903 valid till Nov 2028",
        status: "Compliant",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 0
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "PoA_Resolution_BuildCraft.pdf",
        extractedInfo: "Board Resolution dated 15-Jan-2026 appointing Director Suresh Kulkarni",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // 2. Shivalik Heavy Engineering Corp (Collusive Syndicate - 42% Deficient/Flagged)
  if (id === 'BIDDER-003' || name.includes('Shivalik')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "Registration_Affidavit_Shivalik.pdf",
        extractedInfo: "24AAACA7821B1Z2 (Flagged: PAN AAACA7821B identical to competitor Apex Infra!)",
        status: "Inconsistent",
        clause: "RFP Clause 3.1(a)",
        verificationMethod: "Cross-Bidder Tax Entity Anomaly Detector",
        riskScore: 88
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹145.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Balance_Sheet_3Yr_Shivalik.pdf",
        extractedInfo: "Average: ₹62.1 Cr (FAIL: Deficient by ₹82.9 Cr from minimum statutory ₹145 Cr)",
        status: "Missing",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "Automated Turnover Threshold Audit",
        riskScore: 75
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_Bank_Guarantee_Shivalik.pdf",
        extractedInfo: "BG #BOB-EMD-991204 for ₹4,85,50,000 (Bank of Baroda - SFMS pending confirmation)",
        status: "Manual Review",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 40
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Non_Blacklisting_Affidavit_Shivalik.pdf",
        extractedInfo: "Notarized by Adv. K. L. Mehta (Flagged: Common Director Rajesh Singhania linked to Apex)",
        status: "Inconsistent",
        clause: "RFP Clause 3.4",
        verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
        riskScore: 92
      },
      {
        id: "REQ-05",
        name: "Valid ISO 9001:2015 Quality Management Certificate",
        category: "Technical Quality",
        mandatory: false,
        documentUploaded: "ISO_Certificate_Shivalik.pdf",
        extractedInfo: "Expired ISO 9001:2008 Certificate #DNV-08-4412 (Expired on 31-Dec-2024)",
        status: "Missing",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 30
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "PoA_Partnership_Shivalik.pdf",
        extractedInfo: "Partnership Deed dated 04-Feb-2020 appointing Partner Mahesh Patel",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // 3. Apex Infrastructure Solutions Ltd (Collusive Syndicate with Shivalik - 48% Flagged/Disqualified)
  if (id === 'BIDDER-001' || name.includes('Apex')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "GSTIN_Active_Certificate_Apex.pdf",
        extractedInfo: "27AAACA7821B1Z9 (CRITICAL CONFLICT: Shares identical PAN AAACA7821B with co-bidder Shivalik Heavy Engineering Corp under GFR Rule 173)",
        status: "Inconsistent",
        clause: "RFP Clause 3.1(a) & GFR Rule 173(xxiii)",
        verificationMethod: "Cross-Bidder Tax Entity Anomaly Detector (Collusion Match)",
        riskScore: 94
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹145.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Balance_Sheet_3Yr_Apex.pdf",
        extractedInfo: "Average: ₹142.8 Cr (Exceeds required threshold, CA: K. R. Mehta, UDIN: 26098211AAAB8901)",
        status: "Compliant",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "UDIN Direct Portal Registry Match",
        riskScore: 0
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_Bank_Guarantee_Apex.pdf",
        extractedInfo: "BG #HDFC77218 for ₹4,85,50,000 valid up to 2027-04-30 (HDFC Bank Fort Branch)",
        status: "Compliant",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 0
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Non_Blacklisting_Affidavit_Apex.pdf",
        extractedInfo: "Affidavit submitted (CRITICAL CONFLICT: Shares Common Director Rajesh Singhania & Workstation LAPTOP-INFR-08 with co-bidder Shivalik)",
        status: "Inconsistent",
        clause: "RFP Clause 3.4 & CVC Anti-Syndicate Norms",
        verificationMethod: "Corporate Registry & Workstation Forensics Anomaly Scan",
        riskScore: 96
      },
      {
        id: "REQ-05",
        name: "Valid ISO 9001:2015 Quality Management Certificate",
        category: "Technical Quality",
        mandatory: false,
        documentUploaded: "ISO_9001_Apex_Infra.pdf",
        extractedInfo: "TUV SUD Certificate #99100192 valid till Oct 2027",
        status: "Compliant",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 0
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "Board_Resolution_PoA_Apex.pdf",
        extractedInfo: "Board Resolution dated 12-Jan-2026 appointing Director S. Raman",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // 4. Vertex Smart Mobility Tech Pvt Ltd (Smart Traffic Project - 96% Compliance)
  if (id === 'BIDDER-004' || name.includes('Vertex')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "GSTIN_Active_Certificate_Vertex.pdf",
        extractedInfo: "29AABCV9912M1Z0 (Active, Karnataka Commercial Taxes - Bengaluru)",
        status: "Compliant",
        clause: "RFP Clause 3.1(a)",
        verificationMethod: "OCR + GST Portal Schema Validation",
        riskScore: 0
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹35.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Turnover_Schedule_Vertex.pdf",
        extractedInfo: "Average: ₹110.5 Cr (Exceeds ₹35.0 Cr requirement by 215%, UDIN: 26012044VERT8810)",
        status: "Compliant",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "UDIN Direct Portal Registry Match",
        riskScore: 0
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_Bank_Guarantee_Canara_Vertex.pdf",
        extractedInfo: "BG #CNRB-88912 for ₹88,75,000 valid up to 2027-03-31 (Canara Bank)",
        status: "Compliant",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 0
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Integrity_Pact_Affidavit_Vertex.pdf",
        extractedInfo: "Notarized by Adv. S. Murthy (Clear CVC status)",
        status: "Compliant",
        clause: "RFP Clause 3.4",
        verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
        riskScore: 0
      },
      {
        id: "REQ-05",
        name: "CMMI Level 3+ and ISO 27001 Information Security Certification",
        category: "Technical Quality",
        mandatory: true,
        documentUploaded: "CMMI_Level3_ISO27001_Vertex.pdf",
        extractedInfo: "BSI Certificate #IS-890122 (ISO 27001:2022 valid till Nov 2027)",
        status: "Compliant",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 0
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "Board_Resolution_PoA_Vertex.pdf",
        extractedInfo: "Board Resolution dated 08-Jan-2026 appointing CTO Dr. K. S. Rao",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // 5. Krystal Grid Power Systems (Traction Substation - 61% Deficient Turnover)
  if (id === 'BIDDER-005' || name.includes('Krystal')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "GSTIN_Active_Certificate_Krystal.pdf",
        extractedInfo: "33AAACK5022R1Z8 (Active, Tamil Nadu State Taxes - Chennai)",
        status: "Compliant",
        clause: "RFP Clause 3.1(a)",
        verificationMethod: "OCR + GST Portal Schema Validation",
        riskScore: 0
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹65.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Balance_Sheet_Krystal.pdf",
        extractedInfo: "Average: ₹48.0 Cr (FAIL: Deficient by ₹17.0 Cr from required ₹65.0 Cr threshold)",
        status: "Missing",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "Automated Turnover Threshold Audit",
        riskScore: 45
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_BG_IndianBank_Krystal.pdf",
        extractedInfo: "BG #INDB-66712 for ₹1,62,00,000 valid up to 2027-02-28 (Indian Bank)",
        status: "Compliant",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 0
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Integrity_Affidavit_Krystal.pdf",
        extractedInfo: "Notarized by Adv. N. Raman on ₹500 non-judicial stamp paper",
        status: "Compliant",
        clause: "RFP Clause 3.4",
        verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
        riskScore: 0
      },
      {
        id: "REQ-05",
        name: "CEA Grade-A Electrical Contractor License",
        category: "Technical Quality",
        mandatory: true,
        documentUploaded: "CEA_GradeA_Electrical_License_Krystal.pdf",
        extractedInfo: "License #CEA-TN-2021-998 valid up to 2028-12-31",
        status: "Compliant",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 0
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "PoA_Resolution_Krystal.pdf",
        extractedInfo: "Board Resolution appointing GM R. Sundaram",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // 6. Larsen & Toubro Traction Power Division (98% Eligible)
  if (id === 'BIDDER-006' || name.includes('Larsen') || name.includes('L&T')) {
    return [
      {
        id: "REQ-01",
        name: "Valid GSTIN Registration Certificate",
        category: "Statutory Tax Compliance",
        mandatory: true,
        documentUploaded: "GSTIN_Active_Certificate_LT.pdf",
        extractedInfo: "27AAACL0118M1Z3 (Active, Maharashtra LTU - Powai Mumbai)",
        status: "Compliant",
        clause: "RFP Clause 3.1(a)",
        verificationMethod: "OCR + GST Portal Schema Validation",
        riskScore: 0
      },
      {
        id: "REQ-02",
        name: "3-Year Audited Annual Financial Turnover (> ₹65.00 Cr)",
        category: "Financial Eligibility",
        mandatory: true,
        documentUploaded: "Audited_Financial_Statement_LT.pdf",
        extractedInfo: "Average: ₹384.0 Cr (Exceeds ₹65.0 Cr requirement by 490%, UDIN: 26004768LTTR1102)",
        status: "Compliant",
        clause: "RFP Clause 3.2(b)",
        verificationMethod: "UDIN Direct Portal Registry Match",
        riskScore: 0
      },
      {
        id: "REQ-03",
        name: "Earnest Money Deposit (EMD) Bank Guarantee",
        category: "Commercial Security",
        mandatory: true,
        documentUploaded: "EMD_BG_ICICI_Bank_LT.pdf",
        extractedInfo: "BG #ICIC-992100 for ₹1,62,00,000 valid up to 2027-04-30 (ICICI Bank)",
        status: "Compliant",
        clause: "RFP Clause 2.8",
        verificationMethod: "SFMS Structured Financial Messaging System Match",
        riskScore: 0
      },
      {
        id: "REQ-04",
        name: "Non-Blacklisting & Integrity Legal Affidavit",
        category: "Statutory Eligibility",
        mandatory: true,
        documentUploaded: "Integrity_Pact_Declaration_LT.pdf",
        extractedInfo: "Notarized by Adv. K. G. Shah on ₹500 non-judicial stamp paper",
        status: "Compliant",
        clause: "RFP Clause 3.4",
        verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
        riskScore: 0
      },
      {
        id: "REQ-05",
        name: "CEA Grade-A Electrical Contractor License & ISO 45001",
        category: "Technical Quality",
        mandatory: true,
        documentUploaded: "CEA_GradeA_License_ISO45001_LT.pdf",
        extractedInfo: "CEA All-India License #CEA-HQ-9901 + DNV ISO 45001:2018 Cert",
        status: "Compliant",
        clause: "RFP Clause 4.1",
        verificationMethod: "Accredited Registrar Online Verification",
        riskScore: 0
      },
      {
        id: "REQ-06",
        name: "Power of Attorney for Authorized Signatory",
        category: "Legal Authorization",
        mandatory: true,
        documentUploaded: "Board_Resolution_PoA_LT.pdf",
        extractedInfo: "Board Resolution dated 10-Jan-2026 appointing EVP Alok Deshpande",
        status: "Compliant",
        clause: "RFP Clause 1.6",
        verificationMethod: "MCA Signatory Details Comparison",
        riskScore: 0
      }
    ];
  }

  // Dynamic fallback for any newly registered contractor
  const safeName = (name || 'Contractor').replace(/[^a-zA-Z0-9]/g, '_');
  const safeGstin = bidder.gstin || '27AAACA0000A1Z5';
  const safeTurnover = bidder.turnover || '₹ 50.0 Cr';
  const safeState = bidder.state || 'Maharashtra';

  return [
    {
      id: "REQ-01",
      name: "Valid GSTIN Registration Certificate",
      category: "Statutory Tax Compliance",
      mandatory: true,
      documentUploaded: `GSTIN_Registration_${safeName}.pdf`,
      extractedInfo: `${safeGstin} (Active, ${safeState} Commercial Tax Jurisdiction)`,
      status: "Compliant",
      clause: "RFP Clause 3.1(a)",
      verificationMethod: "OCR + GST Portal Schema Validation",
      riskScore: 0
    },
    {
      id: "REQ-02",
      name: "3-Year Audited Annual Financial Turnover",
      category: "Financial Eligibility",
      mandatory: true,
      documentUploaded: `Audited_Turnover_${safeName}.pdf`,
      extractedInfo: `Average: ${safeTurnover} (Chartered Accountant Certified, UDIN Active)`,
      status: "Compliant",
      clause: "RFP Clause 3.2(b)",
      verificationMethod: "UDIN Direct Portal Registry Match",
      riskScore: 0
    },
    {
      id: "REQ-03",
      name: "Earnest Money Deposit (EMD) Bank Guarantee",
      category: "Commercial Security",
      mandatory: true,
      documentUploaded: `EMD_BankGuarantee_${safeName}.pdf`,
      extractedInfo: `BG for ${tender?.emdAmount || '1% EMD'} (SFMS Verified Bank Guarantee)`,
      status: "Compliant",
      clause: "RFP Clause 2.8",
      verificationMethod: "SFMS Structured Financial Messaging System Match",
      riskScore: 0
    },
    {
      id: "REQ-04",
      name: "Non-Blacklisting & Integrity Legal Affidavit",
      category: "Statutory Eligibility",
      mandatory: true,
      documentUploaded: `Integrity_Affidavit_${safeName}.pdf`,
      extractedInfo: `Notarized on ₹500 non-judicial stamp paper (Clear CVC status)`,
      status: "Compliant",
      clause: "RFP Clause 3.4",
      verificationMethod: "Central CVC & GeM Debarred Vendor Registry Cross-Check",
      riskScore: 0
    },
    {
      id: "REQ-05",
      name: "Quality Management & Technical Certification",
      category: "Technical Quality",
      mandatory: false,
      documentUploaded: `ISO_QualityCert_${safeName}.pdf`,
      extractedInfo: `Accredited Quality Certificate valid through 2028`,
      status: "Compliant",
      clause: "RFP Clause 4.1",
      verificationMethod: "Accredited Registrar Online Verification",
      riskScore: 0
    },
    {
      id: "REQ-06",
      name: "Power of Attorney for Authorized Signatory",
      category: "Legal Authorization",
      mandatory: true,
      documentUploaded: `PoA_Resolution_${safeName}.pdf`,
      extractedInfo: `Board Resolution appointing Authorized Signatory`,
      status: "Compliant",
      clause: "RFP Clause 1.6",
      verificationMethod: "MCA Signatory Details Comparison",
      riskScore: 0
    }
  ];
}

// Fraud & Procurement Risk Factors
export const initialRiskFactors = [
  {
    id: "RISK-01",
    title: "Collusive Bidding & Sister Entity Cross-Submission",
    severity: "HIGH",
    score: 88,
    affectedBidders: ["Shivalik Heavy Engineering Corp", "Apex Infrastructure Solutions Ltd"],
    evidence: "Document 'Registration_Affidavit_Shivalik.pdf' shares identical SHA-256 hash and PAN AAACA7821B with Apex Infrastructure.",
    explanation: "Two supposedly competing entities submitting the identical tax registration certificate indicates common control or collusive proxy bidding under Rule 173 of General Financial Rules.",
    recommendation: "Immediate escalation: Issue Show-Cause Notice under Clause 12.3 and suspend technical qualification of Shivalik Heavy Engineering pending formal committee hearing.",
    ruleCitation: "GFR Rule 173(xxiii) - Anti-Collusion & Sister Company Participation",
    status: "Action Required"
  },
  {
    id: "RISK-02",
    title: "Technical Specification Lexical Cloning (94.2% Overlap)",
    severity: "HIGH",
    score: 82,
    affectedBidders: ["Shivalik Heavy Engineering Corp"],
    evidence: "Technical proposal exhibits 94.2% lexical similarity and identical author metadata tag 'r.sharma_apex_design'.",
    explanation: "Shared document authoring pipeline across separate bidding companies indicates coordinated bid preparation.",
    recommendation: "Request original editable source files and verify submission machine IP addresses via NIC e-Procurement audit logs.",
    ruleCitation: "Competition Act Section 3(3)(d) - Bid Rigging & Cover Bidding",
    status: "Under Investigation"
  },
  {
    id: "RISK-03",
    title: "Financial Turnover Discrepancy (Balance Sheet vs Portal Declaration)",
    severity: "LOW",
    score: 12,
    affectedBidders: ["Apex Infrastructure Solutions Ltd"],
    evidence: "Portal declared turnover ₹142.80 Cr matches 3-year audited average exactly (FY24 ₹164.2 Cr, FY23 ₹138.5 Cr, FY22 ₹125.7 Cr).",
    explanation: "Figures are completely verified with UDIN #26098211AAAB8901 on the Institute of Chartered Accountants of India portal.",
    recommendation: "No action required. Risk cleared.",
    ruleCitation: "Standard Financial Evaluation Guidelines Clause 4.2",
    status: "Cleared"
  },
  {
    id: "RISK-04",
    title: "Government Blacklist & Debarred Registry Verification",
    severity: "LOW",
    score: 4,
    affectedBidders: ["All Active Bidders"],
    evidence: "Real-time cross-reference against CVC Debarred List, GeM Incident Management, and World Bank Debarred Firms.",
    explanation: "None of the active bidders or designated directors appear on active debarment or vigilance surveillance registries.",
    recommendation: "Maintain archival snapshot in tender dossier.",
    ruleCitation: "Public Procurement (Debarment of Bidders) Orders 2021",
    status: "Cleared"
  }
];

// Real-Time Event Audit Stream
export const initialActivities = [
  {
    id: "ACT-01",
    action: "SHA-256 Collision Flagged",
    detail: "Identical cryptographic hash flagged between Apex Infra and Shivalik Corp",
    timestamp: "10 minutes ago",
    type: "critical"
  },
  {
    id: "ACT-02",
    action: "Document Intelligence Extraction Completed",
    detail: "Extracted GSTIN, PAN, and Turnover from 5 bid schedules",
    timestamp: "24 minutes ago",
    type: "success"
  },
  {
    id: "ACT-03",
    action: "Compliance Matrix Computed",
    detail: "Apex Infrastructure Solutions scored 94% on mandatory criteria",
    timestamp: "1 hour ago",
    type: "info"
  },
  {
    id: "ACT-04",
    action: "Human Review Decision Logged",
    detail: "Officer Rajesh Sharma cleared non-exclusive OEM MoU #FIND-2026-083",
    timestamp: "3 hours ago",
    type: "success"
  },
  {
    id: "ACT-05",
    action: "New Tender Submissions Imported",
    detail: "Imported 3 participant dossiers for Metro Line 4 Structural Works",
    timestamp: "Yesterday",
    type: "info"
  }
];
