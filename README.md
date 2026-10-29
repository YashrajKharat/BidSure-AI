# BidSure AI — AI-Powered Bid Compliance Verification Platform

An enterprise-grade, full-stack procurement verification and anti-collusion platform engineered with **100% Free & Open-Source technologies** (Strictly zero paid API keys or subscription services required).

---

## 🌟 Key Modules & Standout Features

### 🏆 6 Groundbreaking Anti-Cartel & Forensic Standout Modules
1. **Interactive Collusion & Cartel Knowledge Graph**: Interactive visual node-link network diagram with zoom, hover, physics clustering, and entity relationship mapping linking Bidders, shared PANs, identical DIN directors (GFR Rule 173), common workstations, and banking nodes with glowing laser telemetry.
2. **Workstation & Forensic Metadata Inspector**: Deep hardware-level PDF forensics inspecting operating system user accounts, computer hostnames (`LAPTOP-INFR-08`), and millisecond-accurate creation timestamps proving multi-bidder submissions prepared by a single operator 3 minutes apart.
3. **Multi-Bidder Comparative Statement (CST Matrix + Excel Export)**: Comprehensive statutory and commercial evaluation matrix comparing all bidders side-by-side with one-click **Export to Excel (`.csv`)** and formatted evaluation committee sign-off minutes.
4. **Financial BOQ Anomaly & Benford's Law Detector**: Advanced statistical pricing forensics analyzing first-digit probability distributions against Benford's Law ($P(d) = \log_{10}(1 + 1/d)$) to catch synthetic pricing, and isolating uniform cover-bidding multipliers (+14.85% markup ratio across all line items).
5. **Tamper-Proof Merkle Audit Ledger**: Immutable cryptographic hash-chain chaining every tender action, upload, and officer adjudication into a Merkle sequence with an interactive **"Verify Ledger Integrity"** engine proving zero post-deadline tampering.
6. **Voice-Activated AI Officer Command Mode**: Browser-native Web Speech recognition (`SpeechRecognition`) and speech synthesis (`speechSynthesis`) enabling hands-free spoken queries, vocal explanations, and auditory soundwave visualizers (100% free with zero keys).

### 🏛️ Core Platform Verification Suite
7. **Overview Dashboard**: Animated 2D KPIs (Total Bids Analysed, Pending Reviews, Compliant Bids, Flagged Findings), Deep Forensic Command Suite, compliance donut gauge, recent bidder analyses table, and live audit telemetry stream.
8. **Bidder Management**: Corporate directory, statutory tax profiles (GSTIN, PAN, CIN), 3-year turnover records, and past compliance ratings.
9. **Tender Management**: RFP notice portfolio, submission deadlines, technical opening milestones, and estimated budgets.
10. **Document Intelligence**: Ingest PDF schedules with real-time **SHA-256 cryptographic hashing** via Python `hashlib` / WebCrypto API, **pypdf text extraction**, regex statutory entity extraction (GSTIN, PAN, CIN, UDIN, values, dates), and a 2D laser scanning modal.
11. **Duplicate & Anomaly Detection (Side-by-Side Comparison)**:
   - **Exact File Duplicate Detection**: Cryptographic SHA-256 byte collision matching.
   - **Lexical Cloning Detection**: Scikit-Learn `TfidfVectorizer` and cosine similarity for technical proposals ($>85\%$).
   - **Sister-Concern Collusion Detection**: Flags competing bidders submitting under identical PAN/GSTIN.
   - **Side-by-Side Diff Modal**: Synchronized document comparison with highlighting, match details panel, AI legal explanation, and persistent officer review determinations.
12. **Compliance Analysis**: Automated statutory checklist (GSTIN active certificate, CA turnover UDIN, EMD bank guarantee, non-blacklisting affidavit), animated score gauge, and transparent documented scoring formula.
13. **Risk Assessment**: Cartel indicators, root-cause analyses, evidence logs, and advisory next actions.
14. **AI Assistant (100% Free / Local)**: Dual-mode engine supporting local **Ollama** models (`llama3.2`, `mistral`, `phi3`) or a **Local Deterministic Procurement Rule Engine** querying live SQLite records with vocal speech response.
15. **Verification Reports**: Formal audit dossiers with digital officer sign-off and court-admissible PDF generation via **ReportLab** and client-side `jsPDF`.
16. **Human Review Workstation**: Triage queue for pending officer adjudications (*Confirmed Duplicate*, *Legitimate Shared Information*, *Needs Further Review*) with audit history.
17. **Settings & Governance**: Similarity threshold calibration, GFR rule toggles, and demonstration mode for external government registry gateways.

---

## 🛠️ Free Technology Stack

| Layer | Technology | Cost | Purpose |
|---|---|---|---|
| **Frontend** | React 19 + Vite 8 | Free / Open Source | High-speed responsive SPA |
| **Styling** | Tailwind CSS + CSS Animations | Free / Open Source | Enterprise dark navy & light blue SaaS UI |
| **Icons & Illustrations** | Lucide Icons + Handcrafted SVG | Free / Open Source | Vector 2D procurement artwork |
| **Backend** | Python Flask + Flask-CORS | Free / Open Source | RESTful API service on port 5000 |
| **Database** | SQLite3 (`bidsure.db`) | Free / Open Source | Local persistent relational storage |
| **PDF Extraction** | `pypdf` | Free / Open Source | Byte & text stream parsing |
| **Cryptographic Hashing** | Python `hashlib` (SHA-256) | Free / Open Source | Exact binary collision detection |
| **Similarity Engine** | `scikit-learn` (TF-IDF + Cosine) | Free / Open Source | N-gram textual overlap analysis |
| **PDF Generation** | `reportlab` + `jspdf` | Free / Open Source | Formal audit dossier generation |
| **AI Copilot** | Local Ollama / Local Rule Engine | Free / Open Source | Zero paid API keys required |

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
- **Node.js**: v18+ (Node v24 is installed)
- **Python**: 3.10+ (Python 3.12 is installed)

### 2. Start the Flask Backend (Port 5000)
```powershell
cd "backend"
python app.py
```
*Initializes SQLite `bidsure.db`, loads seed tenders/bidders/findings, and starts REST endpoints.*

### 3. Start the React Frontend (Port 5173)
```powershell
npm install
npm run dev
```
*Access the platform at [http://localhost:5173/](http://localhost:5173/)*

---

## 📋 Comprehensive Verification Checklist

- [x] Exact binary file duplicates caught via SHA-256 byte digest matching.
- [x] Sister company collusion detected via cross-bidder PAN/GSTIN comparison.
- [x] Text similarity computed using TF-IDF cosine similarity.
- [x] Real PDF text and entity extraction with `pypdf`.
- [x] Persistent SQLite database for tenders, bidders, documents, findings, and reviews.
- [x] Officer review decisions persist across browser reloads.
- [x] Court-admissible PDF verification dossiers generated with ReportLab and jsPDF.
- [x] Free AI Assistant with local Ollama support and local rule-based fallback.
- [x] Strictly zero paid API keys, subscription services, or external cloud dependencies.
