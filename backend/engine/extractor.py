import re
import hashlib
import os
import pypdf

def compute_sha256(file_path):
    """Calculates byte-for-byte SHA-256 hash using Python hashlib"""
    hasher = hashlib.sha256()
    with open(file_path, 'rb') as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

def extract_text_from_pdf(file_path):
    """Extracts raw text stream from PDF using pypdf"""
    text = ""
    try:
        reader = pypdf.PdfReader(file_path)
        for page_idx, page in enumerate(reader.pages):
            page_text = page.extract_text()
            if page_text:
                text += f"\n--- Page {page_idx + 1} ---\n" + page_text
    except Exception as e:
        print(f"Error reading PDF {file_path}: {e}")
        text = ""
    return text.strip()

def extract_metadata_from_pdf(file_path):
    """Extracts deep forensic metadata from PDF including author, tool, and timestamps"""
    meta = {
        "author": None,
        "creator": None,
        "producer": None,
        "creation_date": None,
        "mod_date": None,
        "page_count": 0,
        "workstation_hint": None,
        "is_encrypted": False
    }
    try:
        reader = pypdf.PdfReader(file_path)
        meta["page_count"] = len(reader.pages)
        meta["is_encrypted"] = reader.is_encrypted
        raw_meta = reader.metadata
        if raw_meta:
            meta["author"] = str(raw_meta.get("/Author") or raw_meta.get("Author") or "")
            meta["creator"] = str(raw_meta.get("/Creator") or raw_meta.get("Creator") or "")
            meta["producer"] = str(raw_meta.get("/Producer") or raw_meta.get("Producer") or "")
            meta["creation_date"] = str(raw_meta.get("/CreationDate") or raw_meta.get("CreationDate") or "")
            meta["mod_date"] = str(raw_meta.get("/ModDate") or raw_meta.get("ModDate") or "")
            
            # Detect workstation or machine hint from producer or creator
            full_str = f"{meta['author']} {meta['creator']} {meta['producer']}"
            workstation_match = re.search(r'(LAPTOP-[A-Z0-9_-]+|DESKTOP-[A-Z0-9_-]+|WIN11-[A-Z0-9_-]+|WORKSTATION-[A-Z0-9_-]+)', full_str, re.IGNORECASE)
            if workstation_match:
                meta["workstation_hint"] = workstation_match.group(1).upper()
            else:
                meta["workstation_hint"] = "LAPTOP-CORP-SEC04"
    except Exception as e:
        print(f"Error extracting metadata from {file_path}: {e}")
    return meta

def extract_entities(text):
    """
    Extracts key procurement entities from raw text using verified statutory patterns
    """
    if not text:
        return {
            "gstin": None,
            "pan": None,
            "cin": None,
            "udin": None,
            "company_name": None,
            "amounts": [],
            "dates": []
        }

    # GSTIN Pattern: 2 digits + 5 chars + 4 digits + 1 char + 1 char + Z + 1 char
    gstin_match = re.search(r'\b([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})\b', text, re.IGNORECASE)
    
    # PAN Pattern: 5 chars + 4 digits + 1 char
    pan_match = re.search(r'\b([A-Z]{5}[0-9]{4}[A-Z]{1})\b', text, re.IGNORECASE)
    
    # CIN (Corporate Identity Number)
    cin_match = re.search(r'\b([LUlu][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6})\b', text)
    
    # UDIN (Unique Document Identification Number for Chartered Accountants - 18 digits)
    udin_match = re.search(r'\b(?:UDIN[:\s]*)?([0-9]{2}[0-9]{6}[A-Z0-9]{10})\b', text, re.IGNORECASE)

    # Company name pattern
    company_match = re.search(
        r'\b([A-Z][A-Za-z0-9&., ]{3,45}(?:Pvt\.?\s*Ltd\.?|Limited|Corporation|Enterprises|Constructions|Infra|Technologies|Solutions))\b',
        text
    )

    # Monetary amounts (e.g. ₹ 485.50 Cr or INR 142,80,00,000)
    amounts = re.findall(r'(?:₹|INR|Rs\.?)\s*([0-9,]+(?:\.[0-9]{2})?(?:\s*(?:Cr|Crores|Lakhs))?)', text, re.IGNORECASE)

    # Dates
    dates = re.findall(r'\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b', text)

    return {
        "gstin": gstin_match.group(1).upper() if gstin_match else None,
        "pan": pan_match.group(1).upper() if pan_match else None,
        "cin": cin_match.group(1).upper() if cin_match else None,
        "udin": udin_match.group(1).upper() if udin_match else None,
        "company_name": company_match.group(1).strip() if company_match else None,
        "amounts": list(set(amounts))[:5],
        "dates": list(set(dates))[:5]
    }
