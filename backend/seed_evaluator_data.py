import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "bidsure.db")

def seed():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Clear existing tables
    tables = ["tenders", "contractors", "officers", "bidders", "documents", "findings", "requirements", "risk_factors", "forensic_metadata"]
    for t in tables:
        try:
            c.execute(f"DELETE FROM {t}")
        except Exception:
            pass

    # Tenders
    c.executemany('''
    INSERT INTO tenders (id, title, authority, budget, submission_deadline, total_bids, status, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("TND-2026-8901", "Metro Line 4 Elevated Viaduct & Station Structural Works", "Mumbai Metropolitan Region Development Authority (MMRDA)", "₹ 485.50 Cr", "2026-11-15", 3, "Technical Evaluation Active", "Infrastructure & Civil Works"),
        ("TND-2026-7740", "High-Speed Rail 220kV Traction Substation Grid Integration", "National High Speed Rail Corporation (NHSRCL)", "₹ 162.20 Cr", "2026-11-04", 2, "Verification In-Progress", "Electrical & Traction"),
        ("TND-2026-6512", "AI-Powered Smart Traffic Surveillance System (Phase II)", "Ministry of Road Transport and Highways (MoRTH)", "₹ 88.75 Cr", "2026-10-28", 1, "Audit Pending", "IT & Smart Infrastructure")
    ])

    # Contractors
    c.executemany('''
    INSERT INTO contractors (id, name, state, cin, pan, gstin, turnover, email, contact_person, phone, status, registered_date, registered_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("CTR-001", "Apex Infrastructure Solutions Ltd", "Maharashtra", "U45200MH2012PLC238910", "AAACA7821B", "27AAACA7821B1Z9", "₹ 142.8 Cr", "tenders@apexinfra.com", "Vikram Malhotra", "+91 98201 11223", "Flagged (Collusion Conflict)", "2026-10-15 10:00", "Officer Er. Rajesh Sharma"),
        ("CTR-002", "BuildCraft Infra Projects Ltd", "Maharashtra", "U45203MH2016PTC284911", "AAACB4419K", "27AAACB4419K1Z4", "₹ 156.4 Cr", "contact@buildcraft.in", "Suresh Kulkarni", "+91 98202 33445", "Active (Verified L1)", "2026-10-16 11:30", "Officer Er. Rajesh Sharma"),
        ("CTR-003", "Shivalik Heavy Engineering Corp", "Gujarat", "U28112GJ2010PLC061129", "AAACA7821B", "24AAACA7821B1Z2", "₹ 62.1 Cr", "bids@shivalikcorp.com", "Mahesh Patel", "+91 79 2658 9901", "Flagged (Collusion)", "2026-10-17 09:15", "Self Onboarded"),
        ("CTR-004", "Vertex Smart Mobility Tech Pvt Ltd", "Karnataka", "U72200KA2019PTC120448", "AABCV9912M", "29AABCV9912M1Z0", "₹ 110.5 Cr", "proposals@vertexmobility.com", "Dr. K. S. Rao", "+91 80 4122 3344", "Active", "2026-10-17 14:00", "Officer Smt. Priya Nair"),
        ("CTR-005", "Krystal Grid Power Systems", "Tamil Nadu", "U40106TN2014PLC098221", "AAACK5022R", "33AAACK5022R1Z8", "₹ 48.0 Cr", "tenders@krystalgrid.in", "R. Sundaram", "+91 44 2811 5566", "Active", "2026-10-16 16:30", "Officer Dr. Ananya Roy"),
        ("CTR-006", "Larsen & Toubro Traction Power Division", "Maharashtra", "L99999MH1946PLC004768", "AAACL0118M", "27AAACL0118M1Z3", "₹ 384.0 Cr", "railways.tenders@larsentoubro.com", "Alok Deshpande", "+91 22 6752 5656", "Active", "2026-10-15 11:00", "Officer Dr. Ananya Roy")
    ])

    # Officers
    c.executemany('''
    INSERT INTO officers (id, name, designation, department, employee_id, email, phone, jurisdiction, registered_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("OFF-001", "Er. Rajesh Sharma", "Chief Procurement Officer & Superintending Engineer", "Mumbai Metropolitan Region Development Authority (MMRDA)", "GOV-MMRDA-8901", "r.sharma@mmrda.gov.in", "+91 22 2659 0001", "MMRDA Urban Transport & Civil Projects", "2026-01-10"),
        ("OFF-002", "Dr. Ananya Roy", "Chief Electrical Engineer & Tender Committee Chair", "National High Speed Rail Corporation (NHSRCL)", "GOV-NHSRCL-7740", "a.roy@nhsrcl.gov.in", "+91 11 2341 0002", "National High-Speed Rail & Electrical Systems", "2026-02-15"),
        ("OFF-003", "Smt. Priya Nair", "Director of Digital Transport Technologies", "Ministry of Road Transport and Highways (MoRTH)", "GOV-MORTH-6512", "p.nair@morth.gov.in", "+91 11 2371 0015", "National Expressways & Smart Traffic Infrastructure", "2026-03-20")
    ])

    # Bidders
    c.executemany('''
    INSERT INTO bidders (id, tender_id, name, state, cin, pan, gstin, turnover, compliance_score, risk_rating, status, submission_date, contractor_id, quote_value)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("BIDDER-001", "TND-2026-8901", "Apex Infrastructure Solutions Ltd", "Maharashtra", "U45200MH2012PLC238910", "AAACA7821B", "27AAACA7821B1Z9", "₹ 142.8 Cr", 48, "HIGH", "Flagged", "2026-10-18 14:32", "CTR-001", "₹ 442.80 Cr"),
        ("BIDDER-002", "TND-2026-8901", "BuildCraft Infra Projects Ltd", "Maharashtra", "U45203MH2016PTC284911", "AAACB4419K", "27AAACB4419K1Z4", "₹ 156.4 Cr", 98, "LOW", "Compliant", "2026-10-19 11:15", "CTR-002", "₹ 468.20 Cr"),
        ("BIDDER-003", "TND-2026-8901", "Shivalik Heavy Engineering Corp", "Gujarat", "U28112GJ2010PLC061129", "AAACA7821B", "24AAACA7821B1Z2", "₹ 62.1 Cr", 42, "HIGH", "Flagged", "2026-10-19 16:40", "CTR-003", "₹ 512.40 Cr"),
        ("BIDDER-004", "TND-2026-6512", "Vertex Smart Mobility Tech Pvt Ltd", "Karnataka", "U72200KA2019PTC120448", "AABCV9912M", "29AABCV9912M1Z0", "₹ 110.5 Cr", 91, "LOW", "Compliant", "2026-10-17 09:20", "CTR-004", "₹ 82.30 Cr"),
        ("BIDDER-005", "TND-2026-7740", "Krystal Grid Power Systems", "Tamil Nadu", "U40106TN2014PLC098221", "AAACK5022R", "33AAACK5022R1Z8", "₹ 48.0 Cr", 61, "HIGH", "Disqualified", "2026-10-16 17:05", "CTR-005", "₹ 174.50 Cr"),
        ("BIDDER-006", "TND-2026-7740", "Larsen & Toubro Traction Power Division", "Maharashtra", "L99999MH1946PLC004768", "AAACL0118M", "27AAACL0118M1Z3", "₹ 384.0 Cr", 98, "LOW", "Compliant", "2026-10-17 11:30", "CTR-006", "₹ 158.40 Cr")
    ])

    # Uploaded Documents
    c.executemany('''
    INSERT INTO documents (id, tender_id, bidder_id, bidder_name, filename, file_path, doc_type, file_size, sha256, extracted_entities, extracted_text, processing_status, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("DOC-8901-01", "TND-2026-8901", "BIDDER-001", "Apex Infrastructure Solutions Ltd", "GSTIN_Active_Certificate_Apex.pdf", None, "Statutory Tax Registration", "1.84 MB", "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1", json.dumps({"gstin": "27AAACA7821B1Z9", "pan": "AAACA7821B", "companyName": "Apex Infrastructure Solutions Ltd"}), "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate. Registration Number: 27AAACA7821B1Z9. Legal Name: Apex Infrastructure Solutions Ltd.", "Verified", "2026-10-18 14:35"),
        ("DOC-8901-02", "TND-2026-8901", "BIDDER-001", "Apex Infrastructure Solutions Ltd", "Audited_Balance_Sheet_3Yr_Apex.pdf", None, "Financial Turnover Schedule", "4.12 MB", "9f01a74e2bca88349271649d01eef4a89c20e11946059d6718cb10385923bc01", json.dumps({"caName": "K. R. Mehta & Associates", "udin": "26098211AAAB8901", "avgTurnover": "₹ 142.8 Cr"}), "INDEPENDENT AUDITOR'S REPORT & TURNOVER CERTIFICATE. UDIN: 26098211AAAB8901. Turnover FY24: INR 164.2 Cr.", "Verified", "2026-10-18 14:36"),
        ("DOC-8901-03", "TND-2026-8901", "BIDDER-002", "BuildCraft Infra Projects Ltd", "Technical_Capability_Solvency_BuildCraft.pdf", None, "Bank Solvency Certificate", "2.35 MB", "7c12ff314051a89b093411e86ca7b49204c3e80954b81093557acb1239857d42", json.dumps({"bank": "State Bank of India", "solvencyAmount": "₹ 50.00 Cr"}), "BANK SOLVENCY CERTIFICATE. Ref: SBI/IFB/SOLV/2026/894. Solvency limit: INR 50,00,00,000.", "Verified", "2026-10-19 11:18"),
        ("DOC-8901-04", "TND-2026-8901", "BIDDER-003", "Shivalik Heavy Engineering Corp", "Registration_Affidavit_Shivalik.pdf", None, "Statutory Tax Registration", "1.84 MB", "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1", json.dumps({"gstin": "24AAACA7821B1Z2", "pan": "AAACA7821B", "status": "Flagged Collusion"}), "GOVERNMENT OF INDIA - FORM GST REG-06. Registration Certificate. Registration Number: 27AAACA7821B1Z9. Matches Apex Infra.", "Flagged Collusion", "2026-10-19 16:42"),
        ("DOC-8901-05", "TND-2026-8901", "BIDDER-003", "Shivalik Heavy Engineering Corp", "Technical_Specification_Shivalik.pdf", None, "Technical Schedule / Methodology", "3.77 MB", "e34b1928fa88c12a760b299e120894e6629910aab64c892b1578ca39912aa410", json.dumps({"lexicalSimilarity": "94.2%", "authorMetadata": "r.sharma_apex_design"}), "TECHNICAL SPECIFICATIONS & METHODOLOGY FOR PRE-CAST SEGMENTAL VIADUCT ERECTION.", "Flagged Collusion", "2026-10-19 16:44")
    ])

    # Findings
    c.executemany('''
    INSERT INTO findings (id, tender_id, bidders, bidder_ids, doc_a, doc_b, match_type, similarity_score, matching_fields, reason, ai_explanation, evidence, review_status, officer_notes, reviewed_by, reviewed_at, severity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        (
            "FIND-2026-081",
            "TND-2026-8901",
            json.dumps(["Apex Infrastructure Solutions Ltd", "Shivalik Heavy Engineering Corp"]),
            json.dumps(["BIDDER-001", "BIDDER-003"]),
            json.dumps({"name": "GSTIN_Active_Certificate_Apex.pdf", "bidder": "Apex Infrastructure Solutions Ltd", "sha256": "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1", "size": "1.84 MB"}),
            json.dumps({"name": "Registration_Affidavit_Shivalik.pdf", "bidder": "Shivalik Heavy Engineering Corp", "sha256": "4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1", "size": "1.84 MB"}),
            "Exact File Duplicate",
            1.0,
            json.dumps([{"field": "Cryptographic SHA-256 Hash", "docA": "4b82d3e0...04bb1", "docB": "4b82d3e0...04bb1", "match": True, "severity": "CRITICAL"}, {"field": "Tax Identifier (PAN)", "docA": "AAACA7821B", "docB": "AAACA7821B", "match": True, "severity": "CRITICAL"}]),
            "Identical SHA-256 binary hash across two competing bidder submissions.",
            "The statutory certificate submitted by Shivalik Heavy Engineering Corp is byte-for-byte identical to the statutory registration certificate submitted by Apex Infrastructure Solutions Ltd. Both documents reference the identical PAN (AAACA7821B). Under GFR 173, this represents clear evidence of sister entity collusion.",
            "Cryptographic hash match 4b82d3e098a87612efc405a8d90471b6982ec432ba06d9129034afcde2904bb1.",
            "Needs Further Review",
            "Escalating to Tender Evaluation Committee for formal GFR 173 show-cause notice.",
            None,
            None,
            "CRITICAL"
        ),
        (
            "FIND-2026-082",
            "TND-2026-8901",
            json.dumps(["Apex Infrastructure Solutions Ltd", "Shivalik Heavy Engineering Corp"]),
            json.dumps(["BIDDER-001", "BIDDER-003"]),
            json.dumps({"name": "Technical_Methodology_Apex.pdf", "bidder": "Apex Infrastructure Solutions Ltd", "sha256": "b901a882d41094ea511c900e120155b231908ca8892176bba920551028399bb2", "size": "3.75 MB"}),
            json.dumps({"name": "Technical_Specification_Shivalik.pdf", "bidder": "Shivalik Heavy Engineering Corp", "sha256": "e34b1928fa88c12a760b299e120894e6629910aab64c892b1578ca39912aa410", "size": "3.77 MB"}),
            "Similar Documents (94.2%)",
            0.942,
            json.dumps([{"field": "Engineering Methodology Clauses", "docA": "Verbatim Paragraphs 1-5", "docB": "Verbatim Paragraphs 1-5", "match": True, "severity": "HIGH"}, {"field": "Document Author Metadata", "docA": "r.sharma_apex_design", "docB": "r.sharma_apex_design", "match": True, "severity": "HIGH"}]),
            "Extracted technical methodology exhibits 94.2% lexical and structural identity.",
            "The technical proposals submitted contain verbatim sentences and identical equipment serial numbers, sharing the identical author metadata tag 'r.sharma_apex_design'.",
            "Token n-gram Jaccard coefficient: 0.942. Document PDF metadata /Author match.",
            "Pending",
            "",
            None,
            None,
            "HIGH"
        )
    ])

    # Forensic Metadata
    c.executemany('''
    INSERT INTO forensic_metadata (id, document_id, bidder_id, bidder_name, filename, author, os_user, workstation_id, producer, creator_tool, creation_timestamp, mod_timestamp, matched_with_bidder, forensic_risk)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("EXIF-001", "DOC-8901-01", "BIDDER-001", "Apex Infrastructure Solutions Ltd", "GSTIN_Active_Certificate_Apex.pdf", "r.sharma_apex_design", "rajesh.sharma", "WORKSTATION-APEX-04", "macOS Acrobat Pro 2024", "AutoCAD Civil 3D", "2026-10-18 14:10:02.104", "2026-10-18 14:15:33.201", None, "CLEAN"),
        ("EXIF-002", "DOC-8901-04", "BIDDER-003", "Shivalik Heavy Engineering Corp", "Registration_Affidavit_Shivalik.pdf", "r.sharma_apex_design", "rajesh.sharma", "WORKSTATION-APEX-04", "macOS Acrobat Pro 2024", "AutoCAD Civil 3D", "2026-10-18 14:10:02.104", "2026-10-19 16:20:11.902", "Apex Infrastructure Solutions Ltd", "CRITICAL_COLLUSION"),
        ("EXIF-003", "DOC-8901-03", "BIDDER-002", "BuildCraft Infra Projects Ltd", "Technical_Capability_Solvency_BuildCraft.pdf", "suresh_kulkarni_bc", "s.kulkarni", "DESKTOP-BC-901", "Microsoft Windows PDF Engine", "MS Word 2021", "2026-10-19 10:45:12.800", "2026-10-19 11:05:44.100", None, "CLEAN")
    ])

    # Risk Factors
    c.executemany('''
    INSERT INTO risk_factors (id, tender_id, title, severity, score, affected_bidders, evidence, explanation, recommendation, rule_citation, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        ("RISK-01", "TND-2026-8901", "Collusive Bidding & Sister Entity Cross-Submission", "HIGH", 88, json.dumps(["Shivalik Heavy Engineering Corp", "Apex Infrastructure Solutions Ltd"]), "Registration_Affidavit_Shivalik.pdf shares identical SHA-256 hash and PAN AAACA7821B with Apex Infra.", "Two competing entities submitting identical tax certificate indicates common control under GFR 173.", "Issue Show-Cause Notice under Clause 12.3.", "GFR Rule 173(xxiii)", "Action Required"),
        ("RISK-02", "TND-2026-8901", "Technical Specification Lexical Cloning (94.2% Overlap)", "HIGH", 82, json.dumps(["Shivalik Heavy Engineering Corp"]), "Technical proposal exhibits 94.2% lexical similarity and identical author metadata tag 'r.sharma_apex_design'.", "Shared document authoring pipeline across separate bidding companies indicates coordinated bid preparation.", "Verify submission machine IP addresses via NIC e-Procurement audit logs.", "Competition Act Section 3(3)(d)", "Under Investigation")
    ])

    conn.commit()
    conn.close()
    print("Evaluator Dummy Data Seeded Successfully into bidsure.db!")

if __name__ == "__main__":
    seed()
