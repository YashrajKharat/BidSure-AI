import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Sliders,
  ShieldCheck,
  Cpu,
  Database,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Save,
  Check,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function Settings({ showToast }) {
  const [similarityThreshold, setSimilarityThreshold] = useState(85);
  const [demoMode, setDemoMode] = useState(true);
  const [autoFlagSisterConcerns, setAutoFlagSisterConcerns] = useState(true);
  const [requireCaUdin, setRequireCaUdin] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    showToast && showToast('Compliance and forensic engine configurations saved.', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      
      {/* Header */}
      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="clay-badge clay-badge-blue inline-flex items-center gap-2 mb-1">
          <Sliders className="w-3.5 h-3.5" /> Rule Calibration & Algorithm Settings
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          System Verification & Forensic Engine Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Calibrate similarity thresholds, sister concern detection heuristics, and external registry connections
        </p>
      </div>

      {/* Threshold Configuration Card */}
      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shadow-sm">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Duplicate & Lexical Similarity Sensitivity
            </h3>
            <p className="text-[11px] text-slate-500">Set the heuristic trigger levels for NLP and n-gram overlap</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="clay-inset p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Text Similarity Alert Threshold (%):
              </span>
              <span className="clay-badge clay-badge-blue font-mono font-extrabold text-xs">
                {similarityThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="1"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Documents exhibiting token Jaccard similarity equal to or above this value will be automatically escalated to the Collusion & Cartel detection triage queue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <label className="clay-card p-4 rounded-2xl flex items-start gap-3 cursor-pointer hover:scale-[1.01] transition-transform">
              <input
                type="checkbox"
                checked={autoFlagSisterConcerns}
                onChange={(e) => setAutoFlagSisterConcerns(e.target.checked)}
                className="mt-1 w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Auto Sister Concern Collusion
                </span>
                <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                  Flag submissions sharing common PAN, director DIN, or identical registered addresses under GFR Rule 173.
                </span>
              </div>
            </label>

            <label className="clay-card p-4 rounded-2xl flex items-start gap-3 cursor-pointer hover:scale-[1.01] transition-transform">
              <input
                type="checkbox"
                checked={requireCaUdin}
                onChange={(e) => setRequireCaUdin(e.target.checked)}
                className="mt-1 w-4 h-4 accent-blue-600 rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Strict CA UDIN Enforcement
                </span>
                <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                  Require 18-digit Unique Document Identification Number verification on audited balance sheet submissions.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* External Government API Connectivity Status */}
      <div className="clay-card p-6 sm:p-8 rounded-3xl space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shadow-sm">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              External Government Registries & Verification Gateways
            </h3>
            <p className="text-[11px] text-slate-500">Live statutory data verification pipes and compliance caches</p>
          </div>
        </div>

        <div className="clay-inset p-4 rounded-2xl border border-amber-300/40 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Explicit Demonstration Mode Notice:</strong>
            Live governmental e-Courts and MCA21 direct write access requires authorized NIC sandbox credentials. The platform operates in verified deterministic demonstration mode using cryptographic local validations.
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="clay-card p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">GST Portal Public API</div>
              <div className="text-[11px] text-slate-500">Format schema regex & checksum validation active</div>
            </div>
            <span className="clay-badge clay-badge-emerald text-[10px]">
              Demo Mode Active (Verified)
            </span>
          </div>

          <div className="clay-card p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Ministry of Corporate Affairs (MCA21)</div>
              <div className="text-[11px] text-slate-500">CIN and Director DIN registry cross-referencing</div>
            </div>
            <span className="clay-badge text-[10px] text-slate-600">
              Simulated Offline Registry
            </span>
          </div>

          <div className="clay-card p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">CVC / GeM Incident Management Debarment</div>
              <div className="text-[11px] text-slate-500">Public blacklist surveillance cache</div>
            </div>
            <span className="clay-badge clay-badge-emerald text-[10px]">
              Connected (Local Cache)
            </span>
          </div>
        </div>
      </div>

      {/* Save Action Bar */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="clay-btn-primary px-7 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {isSaved ? 'Settings Saved' : 'Save Configurations'}
        </button>
      </div>
    </div>
  );
}
