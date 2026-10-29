import React from 'react';

/**
 * 2D Vector Illustration: Procurement Officer Analyzing Bids
 */
export function ProcurementOfficerIllustration({ className = "w-64 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="po_bg_grad" x1="0" y1="0" x2="320" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFF6FF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="po_screen_grad" x1="80" y1="60" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="po_blue_accent" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <filter id="soft_shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Background Soft Pill */}
      <rect x="10" y="10" width="300" height="220" rx="20" fill="url(#po_bg_grad)" />

      {/* Desk Surface */}
      <path d="M30 195 C100 190, 220 190, 290 195 L300 220 L20 220 Z" fill="#E2E8F0" />

      {/* Monitor Display Screen */}
      <g filter="url(#soft_shadow)">
        <rect x="75" y="45" width="170" height="110" rx="8" fill="url(#po_screen_grad)" />
        <rect x="80" y="50" width="160" height="100" rx="5" fill="#0B132B" />
        
        {/* Monitor Screen Dashboard UI */}
        <rect x="90" y="60" width="40" height="6" rx="2" fill="#3B82F6" />
        <rect x="135" y="60" width="20" height="6" rx="2" fill="#10B981" />
        <rect x="90" y="72" width="65" height="4" rx="2" fill="#334155" />
        <rect x="90" y="80" width="50" height="4" rx="2" fill="#334155" />
        <rect x="90" y="88" width="58" height="4" rx="2" fill="#334155" />

        {/* Circular Compliance Meter on Screen */}
        <circle cx="195" cy="85" r="22" stroke="#1E293B" strokeWidth="5" />
        <circle cx="195" cy="85" r="22" stroke="#2563EB" strokeWidth="5" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
        <text x="187" y="89" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">94%</text>

        {/* Small Data Bars on Screen */}
        <rect x="90" y="104" width="22" height="30" rx="2" fill="#2563EB" opacity="0.8" />
        <rect x="116" y="112" width="22" height="22" rx="2" fill="#06B6D4" opacity="0.8" />
        <rect x="142" y="98" width="22" height="36" rx="2" fill="#3B82F6" opacity="0.9" />
        <rect x="168" y="118" width="22" height="16" rx="2" fill="#64748B" opacity="0.6" />
      </g>

      {/* Monitor Stand */}
      <path d="M150 155 L170 155 L175 190 L145 190 Z" fill="#94A3B8" />
      <rect x="135" y="188" width="50" height="6" rx="3" fill="#64748B" />

      {/* Floating Procurement Document A */}
      <g filter="url(#soft_shadow)" className="animate-float-slow">
        <rect x="25" y="70" width="55" height="75" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="33" y="80" width="25" height="4" rx="2" fill="#2563EB" />
        <line x1="33" y1="90" x2="68" y2="90" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="97" x2="68" y2="97" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="104" x2="58" y2="104" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="58" cy="125" r="9" fill="#DCFCE7" />
        <path d="M54 125 L57 128 L62 122" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating Verification Badge B */}
      <g filter="url(#soft_shadow)">
        <rect x="235" y="90" width="60" height="70" rx="6" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="265" cy="115" r="14" fill="#EFF6FF" />
        <path d="M265 106 L273 110 L273 118 C273 124 265 128 265 128 C265 128 257 124 257 118 L257 110 Z" fill="url(#po_blue_accent)" />
        <path d="M262 117 L264 119 L268 114" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="245" y="137" width="40" height="4" rx="2" fill="#94A3B8" />
        <rect x="248" y="145" width="34" height="4" rx="2" fill="#CBD5E1" />
      </g>

      {/* Verification Shield Stamp */}
      <circle cx="285" cy="40" r="16" fill="#2563EB" />
      <path d="M285 30 L293 34 L293 42 C293 48 285 52 285 52 C285 52 277 48 277 42 L277 34 Z" fill="#FFFFFF" />
      <path d="M282 41 L284 43 L288 38" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 2D Vector Illustration: AI Holographic Document Scanning
 */
export function AiDocumentScannerIllustration({ className = "w-64 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scan_grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="doc_border_grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Outer ambient glow */}
      <circle cx="160" cy="120" r="95" fill="#F0F9FF" />

      {/* Holographic Target Rings */}
      <circle cx="160" cy="120" r="85" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="6 6" />
      <circle cx="160" cy="120" r="65" stroke="#E0F2FE" strokeWidth="1" />

      {/* Base Document */}
      <g>
        <rect x="95" y="40" width="130" height="160" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Document Header */}
        <rect x="110" y="55" width="45" height="8" rx="3" fill="#2563EB" />
        <rect x="165" y="57" width="45" height="5" rx="2" fill="#E2E8F0" />
        
        {/* Document Content Lines */}
        <line x1="110" y1="75" x2="210" y2="75" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="87" x2="195" y2="87" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="99" x2="205" y2="99" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

        {/* GSTIN Entity Highlight Pill */}
        <rect x="108" y="112" width="104" height="20" rx="4" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
        <rect x="114" y="117" width="30" height="5" rx="1.5" fill="#854D0E" />
        <rect x="148" y="117" width="56" height="5" rx="1.5" fill="#CA8A04" />
        <rect x="114" y="124" width="70" height="4" rx="1.5" fill="#A16207" />

        {/* Lower document lines */}
        <line x1="110" y1="145" x2="185" y2="145" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="157" x2="200" y2="157" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="169" x2="160" y2="169" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Seal Stamp */}
        <circle cx="195" cy="175" r="12" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" />
        <path d="M190 175 L193 178 L200 171" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Dynamic Laser Scanning Beam */}
      <g>
        <line x1="80" y1="105" x2="240" y2="105" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
        <rect x="80" y="85" width="160" height="20" fill="url(#scan_grad)" />
      </g>

      {/* Floating AI Entity Tags */}
      <g>
        {/* Left Tag: SHA-256 */}
        <rect x="25" y="105" width="60" height="24" rx="4" fill="#0B132B" />
        <text x="32" y="121" fill="#38BDF8" fontSize="8" fontWeight="600" fontFamily="monospace">SHA-256 ✓</text>
        <line x1="85" y1="117" x2="95" y2="117" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Right Tag: PAN Match */}
        <rect x="235" y="70" width="65" height="24" rx="4" fill="#2563EB" />
        <text x="242" y="86" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="sans-serif">PAN: VALID</text>
        <line x1="225" y1="82" x2="235" y2="82" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

/**
 * 2D Vector Illustration: Duplicate Detection & Linked Anomaly Nodes
 */
export function DuplicateDetectionIllustration({ className = "w-64 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dup_link_grad" x1="100" y1="120" x2="220" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.5" stopColor="#EF4444" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Background container */}
      <rect x="15" y="15" width="290" height="210" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Left Bidder Document Card (Bidder A) */}
      <g>
        <rect x="35" y="55" width="95" height="130" rx="6" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
        <rect x="45" y="68" width="40" height="6" rx="2" fill="#2563EB" />
        <text x="45" y="88" fill="#1E293B" fontSize="9" fontWeight="bold">Bidder A</text>
        <line x1="45" y1="98" x2="115" y2="98" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="45" y1="107" x2="110" y2="107" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* Matching Identical Paragraph Box */}
        <rect x="42" y="118" width="81" height="32" rx="3" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" />
        <rect x="47" y="124" width="70" height="4" rx="1.5" fill="#DC2626" />
        <rect x="47" y="132" width="60" height="4" rx="1.5" fill="#EF4444" />
        <rect x="47" y="140" width="50" height="4" rx="1.5" fill="#F87171" />
      </g>

      {/* Right Bidder Document Card (Bidder B) */}
      <g>
        <rect x="190" y="55" width="95" height="130" rx="6" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
        <rect x="200" y="68" width="40" height="6" rx="2" fill="#0284C7" />
        <text x="200" y="88" fill="#1E293B" fontSize="9" fontWeight="bold">Bidder B</text>
        <line x1="200" y1="98" x2="270" y2="98" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="200" y1="107" x2="265" y2="107" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* Matching Identical Paragraph Box */}
        <rect x="197" y="118" width="81" height="32" rx="3" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" />
        <rect x="202" y="124" width="70" height="4" rx="1.5" fill="#DC2626" />
        <rect x="202" y="132" width="60" height="4" rx="1.5" fill="#EF4444" />
        <rect x="202" y="140" width="50" height="4" rx="1.5" fill="#F87171" />
      </g>

      {/* Connecting Forensic Link Wire */}
      <line x1="130" y1="134" x2="190" y2="134" stroke="url(#dup_link_grad)" strokeWidth="3" strokeDasharray="4 3" />

      {/* Center Alert Badge */}
      <circle cx="160" cy="134" r="18" fill="#EF4444" />
      <circle cx="160" cy="134" r="14" fill="#FFFFFF" />
      <path d="M160 126 L160 134 M160 138 L160.01 138" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />

      {/* Match Score Tag */}
      <rect x="128" y="78" width="64" height="22" rx="11" fill="#0B132B" />
      <text x="136" y="93" fill="#F87171" fontSize="9" fontWeight="bold">94.2% MATCH</text>
    </svg>
  );
}

/**
 * 2D Vector Illustration: Successful Verification Shield & Celebration
 */
export function VerificationSuccessIllustration({ className = "w-64 h-48" }) {
  return (
    <svg className={className} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shield_grad" x1="160" y1="40" x2="160" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Soft Glow */}
      <circle cx="160" cy="120" r="90" fill="#F0FDF4" />
      <circle cx="160" cy="120" r="75" stroke="#BBF7D0" strokeWidth="2" strokeDasharray="6 4" />

      {/* Central Majestic Shield */}
      <path
        d="M160 45 L225 70 L225 130 C225 170 160 200 160 200 C160 200 95 170 95 130 L95 70 Z"
        fill="url(#shield_grad)"
        stroke="#3B82F6"
        strokeWidth="3"
      />

      {/* Inner Shield Highlight */}
      <path
        d="M160 55 L215 76 L215 128 C215 162 160 188 160 188 C160 188 105 162 105 128 L105 76 Z"
        fill="#1E40AF"
      />

      {/* Massive White Checkmark */}
      <path
        d="M135 120 L153 138 L188 102"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sparkles / Confetti */}
      <circle cx="70" cy="80" r="4" fill="#3B82F6" />
      <circle cx="250" cy="75" r="5" fill="#10B981" />
      <circle cx="65" cy="160" r="3" fill="#F59E0B" />
      <circle cx="260" cy="155" r="4" fill="#6366F1" />
      
      {/* Stars */}
      <path d="M90 40 L93 47 L100 48 L95 53 L96 60 L90 56 L84 60 L85 53 L80 48 L87 47 Z" fill="#FBBF24" />
      <path d="M230 40 L233 47 L240 48 L235 53 L236 60 L230 56 L224 60 L225 53 L220 48 L227 47 Z" fill="#FBBF24" />
    </svg>
  );
}

/**
 * 2D Vector Illustration: Clean Empty State
 */
export function EmptyStateIllustration({ className = "w-48 h-36", title = "No Items Found" }) {
  return (
    <svg className={className} viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="200" height="140" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="70" y="45" width="100" height="70" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="85" y1="62" x2="155" y2="62" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <line x1="85" y1="74" x2="135" y2="74" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="120" cy="95" r="14" fill="#F1F5F9" />
      <path d="M115 95 L125 95 M120 90 L120 100" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <text x="120" y="145" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="500">{title}</text>
    </svg>
  );
}
