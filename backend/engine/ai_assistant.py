import requests
import json
import sqlite3
import os

OLLAMA_URL = "http://localhost:11434/api/generate"

def check_ollama_available():
    """Checks if local Ollama daemon is running on port 11434 with zero paid API keys"""
    try:
        resp = requests.get("http://localhost:11434/api/tags", timeout=1.0)
        if resp.status_code == 200:
            models = resp.json().get("models", [])
            return True, [m.get("name") for m in models]
    except Exception:
        pass
    return False, []

def query_ai_assistant(prompt, db_connection, conversation_history=None):
    """
    Answers procurement officer queries using:
    1. Local Ollama LLM if available locally (100% free)
    2. Local Deterministic Procurement Intelligence Engine pulling live data from SQLite
    """
    is_ollama, models = check_ollama_available()

    # Fetch live context from database to ground answers in actual facts
    cursor = db_connection.cursor()
    
    cursor.execute("SELECT id, name, gstin, pan, compliance_score, status, risk_rating FROM bidders")
    bidders = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT id, match_type, bidders, reason, ai_explanation, review_status, severity FROM findings")
    findings = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT id, name, mandatory, status, extracted_info FROM requirements")
    reqs = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT id, title, severity, score, explanation, recommendation FROM risk_factors")
    risks = [dict(row) for row in cursor.fetchall()]

    context_str = f"""
Live BidSure Database Facts:
- Bidders: {json.dumps(bidders)}
- Collusion/Duplicate Findings: {json.dumps(findings)}
- Compliance Requirements: {json.dumps(reqs)}
- Risk Factors: {json.dumps(risks)}
"""

    if is_ollama and models:
        chosen_model = models[0]
        full_system_prompt = f"You are BidSure AI, an autonomous procurement compliance and anti-collusion assistant. Use these real verified database facts to answer the officer's question:\n{context_str}\nProvide concise, court-admissible, professional responses."
        try:
            payload = {
                "model": chosen_model,
                "prompt": f"{full_system_prompt}\n\nOfficer Query: {prompt}\n\nBidSure AI Answer:",
                "stream": False
            }
            resp = requests.post(OLLAMA_URL, json=payload, timeout=20.0)
            if resp.status_code == 200:
                answer = resp.json().get("response", "").strip()
                return {
                    "source": f"Local Ollama ({chosen_model})",
                    "response": answer,
                    "grounded_facts_used": len(findings) + len(bidders)
                }
        except Exception as e:
            print(f"Ollama execution error, falling back to rule engine: {e}")

    # Fallback to Local Procurement Intelligence Engine
    prompt_lower = prompt.lower()

    if "duplicate" in prompt_lower or "collusion" in prompt_lower or "finding" in prompt_lower or "cartel" in prompt_lower:
        flagged = [f for f in findings if f["severity"] in ["CRITICAL", "HIGH"]]
        response_lines = [
            f"**Forensic Duplicate & Cartel Analysis ({len(findings)} Total Findings Logged):**\n"
        ]
        for f in flagged:
            bidders_list = json.loads(f["bidders"]) if isinstance(f["bidders"], str) else f["bidders"]
            response_lines.append(
                f"- **{f['id']} [{f['match_type']}]**: Involving {', '.join(bidders_list)}. "
                f"**Reason**: {f['reason']}. **AI Determination**: {f['ai_explanation']} "
                f"Status: *{f['review_status']}*."
            )
        response_lines.append("\n**Officer Guidance**: Under Rule 173 of General Financial Rules (GFR), bidders sharing identical tax registrations (PAN) or submitting identical SHA-256 byte hashes are deemed sister concerns. A Show-Cause Notice is recommended.")
        return {
            "source": "Local Rule-Based Intelligence Engine (Zero External Calls)",
            "response": "\n".join(response_lines),
            "grounded_facts_used": len(flagged)
        }

    elif "compliance" in prompt_lower or "score" in prompt_lower or "fail" in prompt_lower or "requirement" in prompt_lower:
        non_compliant = [r for r in reqs if r["status"] != "Compliant"]
        response_lines = [
            f"**Tender Compliance Evaluation Summary:**\n"
        ]
        for r in reqs:
            status_icon = "✓" if r["status"] == "Compliant" else "✗"
            response_lines.append(f"- {status_icon} **{r['name']}**: Status is `{r['status']}`. Verification Note: {r['extracted_info']}.")
        
        response_lines.append("\n**Scoring Formula**: Compliance Score = (Verified Mandatory Clauses / Total Mandatory Clauses) × 100.")
        return {
            "source": "Local Rule-Based Intelligence Engine (Zero External Calls)",
            "response": "\n".join(response_lines),
            "grounded_facts_used": len(reqs)
        }

    elif "risk" in prompt_lower or "fraud" in prompt_lower:
        response_lines = [
            f"**Tender Risk Assessment Breakdown:**\n"
        ]
        for r in risks:
            response_lines.append(
                f"- **[{r['severity']} RISK - Score {r['score']}/100] {r['title']}**: "
                f"{r['explanation']} **Recommended Next Action**: {r['recommendation']}"
            )
        response_lines.append("\n**Notice**: This risk engine operates as an advisory tool for the Tender Evaluation Committee. Final disqualification requires formal committee minute recording.")
        return {
            "source": "Local Rule-Based Intelligence Engine (Zero External Calls)",
            "response": "\n".join(response_lines),
            "grounded_facts_used": len(risks)
        }

    elif "bidder" in prompt_lower or "apex" in prompt_lower or "shivalik" in prompt_lower:
        response_lines = ["**Active Bidder Eligibility Profiles:**\n"]
        for b in bidders:
            response_lines.append(
                f"- **{b['name']}** (PAN: `{b['pan']}` | GSTIN: `{b['gstin']}`): "
                f"Compliance Score: {b['compliance_score']}%, Risk: {b['risk_rating']}, Status: **{b['status']}**."
            )
        return {
            "source": "Local Rule-Based Intelligence Engine (Zero External Calls)",
            "response": "\n".join(response_lines),
            "grounded_facts_used": len(bidders)
        }

    else:
        return {
            "source": "Local Rule-Based Intelligence Engine (Zero External Calls)",
            "response": f"**BidSure Procurement Assistant Ready.**\n\nI have access to real local SQLite records for **{len(bidders)} Bidders**, **{len(findings)} Duplicate/Collusion Findings**, and **{len(reqs)} Compliance Requirements**.\n\nYou can ask me to:\n- *'Explain why finding FIND-2026-081 was flagged for collusion'*\n- *'Summarize compliance failures and missing requirements'*\n- *'What are the high risk factors for the Metro Line 4 tender?'*\n- *'Which bidders share the same PAN or tax registration?'*",
            "grounded_facts_used": len(bidders) + len(findings)
        }
