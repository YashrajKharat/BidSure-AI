import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def normalize_text(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def compute_text_similarity_tfidf(text1, text2):
    """Computes TF-IDF cosine similarity between two document texts"""
    norm1 = normalize_text(text1)
    norm2 = normalize_text(text2)

    if not norm1 and not norm2:
        return 1.0
    if not norm1 or not norm2:
        return 0.0
    if norm1 == norm2:
        return 1.0

    try:
        vectorizer = TfidfVectorizer(min_df=1, stop_words='english', ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([norm1, norm2])
        sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return round(float(sim), 3)
    except Exception as e:
        print(f"TF-IDF similarity calculation fallback: {e}")
        # Token Jaccard fallback
        tokens1 = set(norm1.split())
        tokens2 = set(norm2.split())
        if not tokens1 or not tokens2:
            return 0.0
        return round(len(tokens1 & tokens2) / len(tokens1 | tokens2), 3)

def check_for_duplicates(doc_new, existing_docs):
    """
    Compares a newly uploaded document against existing documents in the tender
    to detect:
    1. Exact SHA-256 byte collision (100% duplicate)
    2. Repeated tax identifier (Shared PAN / GSTIN indicates sister entity collusion)
    3. High lexical similarity (> 85% via TF-IDF cosine similarity)
    """
    findings = []

    new_sha256 = doc_new.get("sha256", "").lower()
    new_text = doc_new.get("extracted_text", "")
    new_entities = doc_new.get("extracted_entities", {})
    new_bidder_id = doc_new.get("bidder_id")
    new_bidder_name = doc_new.get("bidder_name")

    for doc_old in existing_docs:
        # Don't compare with itself or documents by the same bidder
        if doc_old["id"] == doc_new["id"]:
            continue
        if doc_old["bidder_id"] == new_bidder_id:
            continue

        old_sha256 = doc_old.get("sha256", "").lower()
        old_text = doc_old.get("extracted_text", "")
        old_entities = doc_old.get("extracted_entities", {})
        old_bidder_name = doc_old.get("bidder_name")

        # 1. Exact Binary Hash Match
        is_exact_hash = bool(new_sha256 and old_sha256 and new_sha256 == old_sha256)
        
        # 2. Text Similarity via TF-IDF
        similarity_score = compute_text_similarity_tfidf(new_text, old_text)

        # 3. Field matching
        matching_fields = []
        if is_exact_hash:
            matching_fields.append({
                "field": "Cryptographic SHA-256 Hash",
                "docA": old_sha256[:16] + "...",
                "docB": new_sha256[:16] + "...",
                "match": True,
                "severity": "CRITICAL"
            })

        if new_entities.get("pan") and old_entities.get("pan") and new_entities["pan"] == old_entities["pan"]:
            matching_fields.append({
                "field": "Permanent Account Number (PAN)",
                "docA": old_entities["pan"],
                "docB": new_entities["pan"],
                "match": True,
                "severity": "CRITICAL"
            })

        if new_entities.get("gstin") and old_entities.get("gstin") and new_entities["gstin"] == old_entities["gstin"]:
            matching_fields.append({
                "field": "GSTIN Registration",
                "docA": old_entities["gstin"],
                "docB": new_entities["gstin"],
                "match": True,
                "severity": "HIGH"
            })

        if new_entities.get("company_name") and old_entities.get("company_name") and normalize_text(new_entities["company_name"]) == normalize_text(old_entities["company_name"]):
            matching_fields.append({
                "field": "Legal Entity Title",
                "docA": old_entities["company_name"],
                "docB": new_entities["company_name"],
                "match": True,
                "severity": "HIGH"
            })

        # Determine finding classification
        if is_exact_hash:
            findings.append({
                "match_type": "Exact File Duplicate",
                "severity": "CRITICAL",
                "similarity_score": 1.0,
                "bidders": [old_bidder_name, new_bidder_name],
                "bidder_ids": [doc_old["bidder_id"], new_bidder_id],
                "doc_a": {"name": doc_old["filename"], "bidder": old_bidder_name, "sha256": old_sha256, "size": doc_old.get("file_size"), "content": old_text[:1000]},
                "doc_b": {"name": doc_new["filename"], "bidder": new_bidder_name, "sha256": new_sha256, "size": doc_new.get("file_size"), "content": new_text[:1000]},
                "matching_fields": matching_fields,
                "reason": f"Identical SHA-256 binary hash ({new_sha256[:16]}...) across two competing bidder submissions.",
                "ai_explanation": f"The document submitted by {new_bidder_name} is byte-for-byte identical to {doc_old['filename']} previously submitted by {old_bidder_name}. In public procurement, two purportedly competing entities submitting identical binary files indicates proxy bidding or collusive bid rigging under GFR Rule 173.",
                "evidence": f"Cryptographic SHA-256 byte digest match: {new_sha256}.",
                "review_status": "Needs Further Review"
            })
        elif any(f["field"] == "Permanent Account Number (PAN)" for f in matching_fields):
            shared_pan = new_entities.get("pan")
            findings.append({
                "match_type": "Repeated Identifier (Shared PAN)",
                "severity": "CRITICAL",
                "similarity_score": similarity_score,
                "bidders": [old_bidder_name, new_bidder_name],
                "bidder_ids": [doc_old["bidder_id"], new_bidder_id],
                "doc_a": {"name": doc_old["filename"], "bidder": old_bidder_name, "sha256": old_sha256, "size": doc_old.get("file_size"), "content": old_text[:1000]},
                "doc_b": {"name": doc_new["filename"], "bidder": new_bidder_name, "sha256": new_sha256, "size": doc_new.get("file_size"), "content": new_text[:1000]},
                "matching_fields": matching_fields,
                "reason": f"Both independent bidders share the identical tax registration PAN: {shared_pan}.",
                "ai_explanation": f"Two distinct bidding entities submitted schedules referencing the same PAN ({shared_pan}). Under Indian Public Procurement guidelines, distinct companies sharing tax identities represent sister concerns or proxy bidders.",
                "evidence": f"Shared statutory identifier PAN: {shared_pan}.",
                "review_status": "Needs Further Review"
            })
        elif similarity_score >= 0.85:
            findings.append({
                "match_type": f"Similar Documents ({int(similarity_score * 100)}%)",
                "severity": "HIGH",
                "similarity_score": similarity_score,
                "bidders": [old_bidder_name, new_bidder_name],
                "bidder_ids": [doc_old["bidder_id"], new_bidder_id],
                "doc_a": {"name": doc_old["filename"], "bidder": old_bidder_name, "sha256": old_sha256, "size": doc_old.get("file_size"), "content": old_text[:1000]},
                "doc_b": {"name": doc_new["filename"], "bidder": new_bidder_name, "sha256": new_sha256, "size": doc_new.get("file_size"), "content": new_text[:1000]},
                "matching_fields": matching_fields,
                "reason": f"Extracted document text exhibits {int(similarity_score * 100)}% TF-IDF cosine similarity.",
                "ai_explanation": f"The technical proposals or schedules contain substantial verbatim clauses between {old_bidder_name} and {new_bidder_name}. While boilerplate tender forms cause baseline similarity, scores above 85% suggest coordinated bid preparation or template sharing.",
                "evidence": f"TF-IDF cosine similarity: {similarity_score}.",
                "review_status": "Pending"
            })

    return findings
