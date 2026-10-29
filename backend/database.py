import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "bidsure.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Tenders Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS tenders (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        authority TEXT NOT NULL,
        budget TEXT NOT NULL,
        submission_deadline TEXT NOT NULL,
        total_bids INTEGER DEFAULT 0,
        status TEXT NOT NULL,
        category TEXT NOT NULL
    )
    ''')

    # Bidders Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS bidders (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        name TEXT NOT NULL,
        state TEXT NOT NULL,
        cin TEXT NOT NULL,
        pan TEXT NOT NULL,
        gstin TEXT NOT NULL,
        turnover TEXT NOT NULL,
        compliance_score INTEGER DEFAULT 0,
        risk_rating TEXT NOT NULL,
        status TEXT NOT NULL,
        submission_date TEXT NOT NULL,
        FOREIGN KEY (tender_id) REFERENCES tenders(id)
    )
    ''')

    # Uploaded Documents Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        bidder_id TEXT NOT NULL,
        bidder_name TEXT NOT NULL,
        filename TEXT NOT NULL,
        file_path TEXT,
        doc_type TEXT NOT NULL,
        file_size TEXT NOT NULL,
        sha256 TEXT NOT NULL,
        extracted_entities TEXT, -- JSON string
        extracted_text TEXT,
        processing_status TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (tender_id) REFERENCES tenders(id),
        FOREIGN KEY (bidder_id) REFERENCES bidders(id)
    )
    ''')

    # Findings Table (Collusion, Duplicates & Anomalies)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS findings (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        bidders TEXT NOT NULL, -- JSON list
        bidder_ids TEXT NOT NULL, -- JSON list
        doc_a TEXT NOT NULL, -- JSON object
        doc_b TEXT, -- JSON object
        match_type TEXT NOT NULL,
        similarity_score REAL DEFAULT 0.0,
        matching_fields TEXT, -- JSON list
        reason TEXT NOT NULL,
        ai_explanation TEXT NOT NULL,
        evidence TEXT NOT NULL,
        review_status TEXT NOT NULL,
        officer_notes TEXT,
        reviewed_by TEXT,
        reviewed_at TEXT,
        severity TEXT NOT NULL,
        FOREIGN KEY (tender_id) REFERENCES tenders(id)
    )
    ''')

    # Compliance Requirements Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS requirements (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        mandatory INTEGER DEFAULT 1,
        document_uploaded TEXT,
        extracted_info TEXT,
        status TEXT NOT NULL,
        clause TEXT NOT NULL,
        verification_method TEXT NOT NULL,
        risk_score INTEGER DEFAULT 0,
        FOREIGN KEY (tender_id) REFERENCES tenders(id)
    )
    ''')

    # Risk Factors Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS risk_factors (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        title TEXT NOT NULL,
        severity TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        affected_bidders TEXT NOT NULL, -- JSON list
        evidence TEXT NOT NULL,
        explanation TEXT NOT NULL,
        recommendation TEXT NOT NULL,
        rule_citation TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (tender_id) REFERENCES tenders(id)
    )
    ''')

    # Audit Logs Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        tender_id TEXT,
        action TEXT NOT NULL,
        detail TEXT NOT NULL,
        officer TEXT DEFAULT 'Rajesh Sharma (Senior Evaluation Officer)',
        timestamp TEXT NOT NULL,
        log_type TEXT NOT NULL
    )
    ''')

    # Merkle Tamper-Proof Audit Ledger Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS merkle_ledger (
        block_index INTEGER PRIMARY KEY,
        block_hash TEXT NOT NULL,
        prev_hash TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        officer TEXT NOT NULL,
        action TEXT NOT NULL,
        payload_digest TEXT NOT NULL,
        is_valid INTEGER DEFAULT 1
    )
    ''')

    # Financial Bill of Quantities (BOQ) Items Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS boq_items (
        id TEXT PRIMARY KEY,
        tender_id TEXT NOT NULL,
        bidder_id TEXT NOT NULL,
        bidder_name TEXT NOT NULL,
        item_no TEXT NOT NULL,
        description TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        unit_rate REAL NOT NULL,
        total_amount REAL NOT NULL,
        engineer_rate REAL NOT NULL
    )
    ''')

    # Forensic Document Metadata Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS forensic_metadata (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        bidder_id TEXT NOT NULL,
        bidder_name TEXT NOT NULL,
        filename TEXT NOT NULL,
        author TEXT,
        os_user TEXT,
        workstation_id TEXT,
        producer TEXT,
        creator_tool TEXT,
        creation_timestamp TEXT,
        mod_timestamp TEXT,
        matched_with_bidder TEXT,
        forensic_risk TEXT
    )
    ''')

    # Chat Messages for AI Assistant
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL
    )
    ''')

    # Contractors Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contractors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT NOT NULL,
        cin TEXT NOT NULL,
        pan TEXT NOT NULL,
        gstin TEXT NOT NULL,
        turnover TEXT NOT NULL,
        email TEXT,
        contact_person TEXT,
        phone TEXT,
        status TEXT DEFAULT 'Active',
        registered_date TEXT NOT NULL,
        registered_by TEXT
    )
    ''')

    # Officers Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS officers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        department TEXT NOT NULL,
        employee_id TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        jurisdiction TEXT DEFAULT 'State / Central',
        registered_date TEXT NOT NULL
    )
    ''')

    # Safe migrations for bidders table
    try:
        cursor.execute("ALTER TABLE bidders ADD COLUMN contractor_id TEXT")
    except Exception:
        pass
    try:
        cursor.execute("ALTER TABLE bidders ADD COLUMN quote_value TEXT")
    except Exception:
        pass

    conn.commit()

    # Seed clean initial data if tables are empty
    seed_if_empty(conn)
    conn.close()

def seed_if_empty(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM tenders")
    if cursor.fetchone()[0] == 0:
        # Seed Clean Tenders with 0 mock bids
        cursor.executemany('''
        INSERT INTO tenders (id, title, authority, budget, submission_deadline, total_bids, status, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
            ("TND-2026-8901", "Metro Line 4 Elevated Viaduct & Station Structural Works", "Mumbai Metropolitan Region Development Authority (MMRDA)", "₹ 485.50 Cr", "2026-11-15", 0, "Open for Bidding", "Infrastructure & Civil Works"),
            ("TND-2026-7740", "High-Speed Rail 220kV Traction Substation Grid Integration", "National High Speed Rail Corporation (NHSRCL)", "₹ 162.20 Cr", "2026-11-04", 0, "Open for Bidding", "Electrical & Traction"),
            ("TND-2026-6512", "AI-Powered Smart Traffic Surveillance System (Phase II)", "Ministry of Road Transport and Highways (MoRTH)", "₹ 88.75 Cr", "2026-10-28", 0, "Open for Bidding", "IT & Smart Infrastructure")
        ])

    cursor.execute("SELECT COUNT(*) FROM contractors")
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
        INSERT INTO contractors (id, name, state, cin, pan, gstin, turnover, email, contact_person, phone, status, registered_date, registered_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
            ("CTR-001", "Apex Infrastructure Solutions Ltd", "Maharashtra", "U45200MH2012PLC238910", "AAACA7821B", "27AAACA7821B1Z9", "₹ 142.8 Cr", "tenders@apexinfra.com", "Vikram Malhotra", "+91 98201 11223", "Active", "2026-10-15 10:00", "Officer Er. Rajesh Sharma"),
            ("CTR-002", "BuildCraft Infra Projects Ltd", "Maharashtra", "U45203MH2016PTC284911", "AAACB4419K", "27AAACB4419K1Z4", "₹ 156.4 Cr", "contact@buildcraft.in", "Suresh Kulkarni", "+91 98202 33445", "Active", "2026-10-16 11:30", "Officer Er. Rajesh Sharma")
        ])

    cursor.execute("SELECT COUNT(*) FROM officers")
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
        INSERT INTO officers (id, name, designation, department, employee_id, email, phone, jurisdiction, registered_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
            ("OFF-001", "Er. Rajesh Sharma", "Chief Procurement Officer & Superintending Engineer", "Mumbai Metropolitan Region Development Authority (MMRDA)", "GOV-MMRDA-8901", "r.sharma@mmrda.gov.in", "+91 22 2659 0001", "MMRDA Urban Transport", "2026-01-10"),
            ("OFF-002", "Dr. Ananya Roy", "Chief Electrical Engineer & Tender Committee Chair", "National High Speed Rail Corporation (NHSRCL)", "GOV-NHSRCL-7740", "a.roy@nhsrcl.gov.in", "+91 11 2341 0002", "National High-Speed Rail", "2026-02-15")
        ])

    conn.commit()

if __name__ == "__main__":
    init_db()
    print("BidSure AI SQLite Database Initialized Successfully!")
