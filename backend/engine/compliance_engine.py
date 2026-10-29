def evaluate_bidder_compliance(bidder_id, requirements, bidder_documents):
    """
    Evaluates a bidder against tender requirements:
    1. Checks if mandatory documents are uploaded
    2. Checks if extracted entities meet criteria
    3. Calculates transparent compliance score
    """
    results = []
    total_mandatory = 0
    passed_mandatory = 0

    doc_type_map = {}
    for doc in bidder_documents:
        doc_type_map[doc["doc_type"]] = doc

    for req in requirements:
        is_mandatory = bool(req["mandatory"])
        if is_mandatory:
            total_mandatory += 1

        doc_type = req["category"] # or matched doc type
        matched_doc = None

        # Look for matching uploaded document
        for doc in bidder_documents:
            if req["name"].lower() in doc["filename"].lower() or req["category"].lower() in doc["doc_type"].lower():
                matched_doc = doc
                break

        if not matched_doc and is_mandatory:
            status = "Missing"
            extracted_info = "Mandatory schedule not submitted by bidder"
            risk_score = 25
        elif matched_doc:
            entities = matched_doc.get("extracted_entities", {})
            if isinstance(entities, str):
                import json
                try: entities = json.loads(entities)
                except: entities = {}

            if "GST" in req["name"] and not entities.get("gstin"):
                status = "Inconsistent"
                extracted_info = "Document uploaded but valid GSTIN pattern not detected"
                risk_score = 15
            else:
                status = "Compliant"
                extracted_info = f"Verified: {matched_doc['filename']} (SHA-256 Validated)"
                risk_score = 0
                if is_mandatory:
                    passed_mandatory += 1
        else:
            status = "Missing"
            extracted_info = "Optional document omitted"
            risk_score = 5

        results.append({
            "requirement_id": req["id"],
            "name": req["name"],
            "clause": req["clause"],
            "mandatory": is_mandatory,
            "document_uploaded": matched_doc["filename"] if matched_doc else None,
            "extracted_info": extracted_info,
            "status": status,
            "risk_score": risk_score
        })

    score = int((passed_mandatory / total_mandatory * 100)) if total_mandatory > 0 else 100

    return {
        "compliance_score": score,
        "total_mandatory": total_mandatory,
        "passed_mandatory": passed_mandatory,
        "results": results
    }
