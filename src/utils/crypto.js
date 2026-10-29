// Real cryptographic hashing and document analysis utilities for BidSure AI

/**
 * Computes a real SHA-256 hex string for an ArrayBuffer or File using Web Crypto API
 */
export async function calculateSHA256(data) {
  let buffer;
  if (data instanceof File || data instanceof Blob) {
    buffer = await data.arrayBuffer();
  } else if (data instanceof ArrayBuffer) {
    buffer = data;
  } else if (typeof data === 'string') {
    buffer = new TextEncoder().encode(data);
  } else {
    throw new Error('Unsupported data type for SHA-256 computation');
  }

  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const computeSHA256 = calculateSHA256;

/**
 * Normalizes text for comparison (strips punctuation, extra whitespace, lowercase)
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes Jaccard n-gram token similarity between two texts (0 to 1)
 */
export function calculateTextSimilarity(textA, textB) {
  const normA = normalizeText(textA);
  const normB = normalizeText(textB);

  if (!normA && !normB) return 1.0;
  if (!normA || !normB) return 0.0;
  if (normA === normB) return 1.0;

  // Split into tokens (3-word n-grams for semantic precision or 1-word tokens)
  const tokensA = new Set(normA.split(' ').filter(w => w.length > 2));
  const tokensB = new Set(normB.split(' ').filter(w => w.length > 2));

  if (tokensA.size === 0 || tokensB.size === 0) return 0.0;

  let intersection = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersection++;
    }
  }

  const union = new Set([...tokensA, ...tokensB]).size;
  return union === 0 ? 0 : Number((intersection / union).toFixed(3));
}

/**
 * Extracts key Indian & Global procurement entities from text
 */
export function extractEntities(text) {
  if (!text) return { gstin: null, pan: null, cin: null, companyName: null, amounts: [] };

  // GSTIN: 2 numbers + 5 letters + 4 numbers + 1 letter + 1 char + Z + 1 char
  const gstinMatch = text.match(/\b([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})\b/i);
  
  // PAN: 5 uppercase letters + 4 numbers + 1 uppercase letter
  const panMatch = text.match(/\b([A-Z]{5}[0-9]{4}[A-Z]{1})\b/i);

  // CIN: e.g., U74999MH2018PTC123456
  const cinMatch = text.match(/\b([LUlu][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6})\b/i);

  // Company Name heuristics
  const companyMatch = text.match(/\b([A-Z][A-Za-z0-9&., ]{3,40}(?:Pvt\.?\s*Ltd\.?|Limited|Corporation|Enterprises|Constructions|Infra|Technologies|Solutions))\b/i);

  // Monetary amounts
  const amountMatches = Array.from(text.matchAll(/(?:₹|INR|Rs\.?)\s*([0-9,]+(?:\.[0-9]{2})?)/gi)).map(m => m[0]);

  return {
    gstin: gstinMatch ? gstinMatch[1].toUpperCase() : null,
    pan: panMatch ? panMatch[1].toUpperCase() : null,
    cin: cinMatch ? cinMatch[1].toUpperCase() : null,
    companyName: companyMatch ? companyMatch[1].trim() : null,
    amounts: amountMatches
  };
}

/**
 * Performs deep comparison between two documents to identify duplicates or collusive patterns
 */
export async function compareDocuments(docA, docB) {
  const isExactHash = docA.sha256 && docB.sha256 && docA.sha256.toLowerCase() === docB.sha256.toLowerCase();
  const similarityScore = calculateTextSimilarity(docA.content || '', docB.content || '');
  
  const entitiesA = extractEntities(docA.content || '');
  const entitiesB = extractEntities(docB.content || '');

  const matchingFields = [];

  if (isExactHash) {
    matchingFields.push({ field: 'SHA-256 Checksum', docA: docA.sha256, docB: docB.sha256, match: true, severity: 'CRITICAL' });
  }

  if (entitiesA.gstin && entitiesB.gstin && entitiesA.gstin === entitiesB.gstin) {
    matchingFields.push({ field: 'GSTIN Registration', docA: entitiesA.gstin, docB: entitiesB.gstin, match: true, severity: 'HIGH' });
  }

  if (entitiesA.pan && entitiesB.pan && entitiesA.pan === entitiesB.pan) {
    matchingFields.push({ field: 'Permanent Account Number (PAN)', docA: entitiesA.pan, docB: entitiesB.pan, match: true, severity: 'HIGH' });
  }

  if (entitiesA.cin && entitiesB.cin && entitiesA.cin === entitiesB.cin) {
    matchingFields.push({ field: 'Corporate ID (CIN)', docA: entitiesA.cin, docB: entitiesB.cin, match: true, severity: 'HIGH' });
  }

  if (entitiesA.companyName && entitiesB.companyName && normalizeText(entitiesA.companyName) === normalizeText(entitiesB.companyName)) {
    matchingFields.push({ field: 'Company Legal Title', docA: entitiesA.companyName, docB: entitiesB.companyName, match: true, severity: 'MEDIUM' });
  }

  let matchType = 'Unique';
  let severity = 'LOW';
  let reason = 'Documents appear distinct and independent.';
  let aiExplanation = 'Independent document submission with no significant textual or identifier correlation.';

  if (isExactHash) {
    matchType = 'Exact File Duplicate';
    severity = 'CRITICAL';
    reason = 'Identical SHA-256 cryptographic hashes detected across distinct bidder submissions.';
    aiExplanation = 'Both submissions contain an identical binary payload. In public procurement, two purportedly competing bidders submitting identical binary files strongly indicates collusive bidding, shared authoring, or tender bid rigging.';
  } else if (entitiesA.pan && entitiesB.pan && entitiesA.pan === entitiesB.pan) {
    matchType = 'Repeated Identifier (Collusion)';
    severity = 'CRITICAL';
    reason = `Both documents share the same tax identifier PAN: ${entitiesA.pan}.`;
    aiExplanation = `Two distinct bidder entities submitted documents reflecting the identical PAN (${entitiesA.pan}). Under Rule 173 of GFR, separate entities under identical tax registration may represent sister concerns participating simultaneously to create artificial competition.`;
  } else if (entitiesA.gstin && entitiesB.gstin && entitiesA.gstin === entitiesB.gstin) {
    matchType = 'Repeated Identifier (Shared GSTIN)';
    severity = 'HIGH';
    reason = `Identical GSTIN ${entitiesA.gstin} registered across both entities.`;
    aiExplanation = `Both bidding entities claim or utilize the identical GSTIN registration. This indicates common commercial administration or undisclosed joint ownership.`;
  } else if (similarityScore >= 0.85) {
    matchType = 'High Text Similarity';
    severity = 'HIGH';
    reason = `Extracted text exhibits ${(similarityScore * 100).toFixed(1)}% lexical similarity.`;
    aiExplanation = `The documents share substantial verbatim technical, financial, or formatting clauses. While industry boilerplate can cause baseline similarity, scores above 85% warrant forensic verification for template recycling or coordinated bid preparation.`;
  } else if (similarityScore >= 0.65) {
    matchType = 'Similar Structure';
    severity = 'MEDIUM';
    reason = `Moderate text overlap of ${(similarityScore * 100).toFixed(1)}%.`;
    aiExplanation = `Standard procurement format overlaps detected. Likely due to mandatory tender schedules or RFP template forms; human officer review recommended.`;
  }

  return {
    isExactHash,
    similarityScore,
    matchType,
    severity,
    reason,
    aiExplanation,
    matchingFields,
    entitiesA,
    entitiesB
  };
}
