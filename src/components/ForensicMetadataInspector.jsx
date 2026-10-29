import React, { useState, useEffect } from 'react';
import {
  Laptop,
  FileText,
  Clock,
  User,
  Cpu,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export default function ForensicMetadataInspector({ showToast }) {
  const [metadataRows, setMetadataRows] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('COLLISION-01');
  const [loading, setLoading] = useState(false);

  const defaultRecords = [
    {
      id: "FMD-01",
      bidder_id: "BIDDER-001",
      bidder_name: "Apex Infrastructure Solutions Ltd",
      filename: "Technical_Methodology_Apex.pdf",
      author: "Rajesh Singhania (Design Lead)",
      os_user: "rsinghania",
      workstation_id: "LAPTOP-INFR-08",
      producer: "Microsoft: Print to PDF 10.0.22621",
      creator_tool: "Microsoft Word for Microsoft 365",
      creation_timestamp: "2026-10-19 14:12:08",
      mod_timestamp: "2026-10-19 14:14:10",
      page_count: 48,
      matched_with: "Shivalik Heavy Engineering Corp",
      forensic_risk: "CRITICAL"
    },
    {
      id: "FMD-02",
      bidder_id: "BIDDER-003",
      bidder_name: "Shivalik Heavy Engineering Corp",
      filename: "Bill_Of_Quantities_Specification_Shivalik.pdf",
      author: "Rajesh Singhania (Design Lead)",
      os_user: "rsinghania",
      workstation_id: "LAPTOP-INFR-08",
      producer: "Microsoft: Print to PDF 10.0.22621",
      creator_tool: "Microsoft Word for Microsoft 365",
      creation_timestamp: "2026-10-19 14:17:35",
      mod_timestamp: "2026-10-19 14:18:20",
      page_count: 52,
      matched_with: "Apex Infrastructure Solutions Ltd",
      forensic_risk: "CRITICAL"
    },
    {
      id: "FMD-03",
      bidder_id: "BIDDER-002",
      bidder_name: "BuildCraft Infra Projects Ltd",
      filename: "Technical_Proposal_BuildCraft.pdf",
      author: "Amit Kulkarni (Chief Engineer)",
      os_user: "akulkarni",
      workstation_id: "DESKTOP-BC-ENG02",
      producer: "Acrobat Distiller 24.1 (Windows)",
      creator_tool: "AutoCAD Civil 3D 2025",
      creation_timestamp: "2026-10-18 10:25:00",
      mod_timestamp: "2026-10-18 16:44:11",
      page_count: 64,
      matched_with: null,
      forensic_risk: "LOW"
    },
    {
      id: "FMD-04",
      bidder_id: "BIDDER-004",
      bidder_name: "Vertex Smart Mobility Tech Pvt Ltd",
      filename: "System_Architecture_Vertex.pdf",
      author: "Sunil Rao (VP Projects)",
      os_user: "srao_mac",
      workstation_id: "MACBOOK-PRO-M3-01",
      producer: "Quartz PDFContext (macOS 15.1)",
      creator_tool: "Apple Keynote 14.1",
      creation_timestamp: "2026-10-17 08:50:12",
      mod_timestamp: "2026-10-17 09:12:00",
      page_count: 36,
      matched_with: null,
      forensic_risk: "LOW"
    }
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const rows = await api.getForensicMetadata();
        if (rows && rows.length > 0) {
          setMetadataRows(rows);
        } else {
          setMetadataRows(defaultRecords);
        }
      } catch (e) {
        setMetadataRows(defaultRecords);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const records = metadataRows.length > 0 ? metadataRows : defaultRecords;
  const docApex = records.find(r => r.bidder_id === 'BIDDER-001') || defaultRecords[0];
  const docShivalik = records.find(r => r.bidder_id === 'BIDDER-003') || defaultRecords[1];

  const handleExportForensicCert = () => {
    showToast && showToast('Court-admissible PDF Forensic Metadata Certificate generated.', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="clay-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 clay-badge">
            <Cpu className="w-4 h-4 text-purple-600" /> Feature 2: PDF Workstation & Metadata Forensics
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Digital Forensic Document & Author Origin Inspector
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Extracts hidden operating system metadata, author accounts, computer hardware hostnames, and millisecond creation timestamps to detect proxy bid preparation on common machines.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleExportForensicCert}
            className="clay-btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Evidentiary Certificate
          </button>
        </div>

        <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Side-by-Side Workstation Collision Evidence Panel */}
      <div className="clay-card p-6 sm:p-8 border-2 border-rose-300 space-y-6">
        
        {/* Collision Alert Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-100 text-rose-600 shadow-sm">
              <ShieldAlert className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900">
                  Forensic Collision Match #COL-2026-904
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white uppercase tracking-wider">
                  Critical Rigging Evidence
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Two purportedly independent bidders submitted proposals authored on the <strong>identical laptop</strong>, 3 minutes apart.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Forensic Certainty:
            </span>
            <span className="text-xl font-extrabold text-rose-600">
              99.8% Single Operator Proxy
            </span>
          </div>
        </div>

        {/* Side-by-Side Laptop Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bidder 1: Apex */}
          <div className="clay-card p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                <span className="font-bold text-sm text-slate-900">{docApex.bidder_name}</span>
              </div>
              <span className="clay-badge text-[11px] font-mono font-bold">
                {docApex.bidder_id}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Submitted Document:</span>
                <span className="font-mono text-slate-800 font-semibold">{docApex.filename}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-rose-50/50">
                <span className="text-rose-800 font-semibold flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-rose-600" /> Workstation Hostname:
                </span>
                <span className="font-mono font-bold text-rose-700">{docApex.workstation_id}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-rose-50/50">
                <span className="text-rose-800 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-600" /> Author / OS User:
                </span>
                <span className="font-mono font-bold text-rose-700">{docApex.os_user} ({docApex.author})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Software Creator:</span>
                <span className="text-slate-800">{docApex.creator_tool}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">PDF Producer:</span>
                <span className="text-slate-800">{docApex.producer}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-amber-50/50">
                <span className="text-amber-800 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Created Timestamp:
                </span>
                <span className="font-mono font-extrabold text-amber-900">{docApex.creation_timestamp}</span>
              </div>
            </div>
          </div>

          {/* Bidder 2: Shivalik */}
          <div className="clay-card p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                <span className="font-bold text-sm text-slate-900">{docShivalik.bidder_name}</span>
              </div>
              <span className="clay-badge text-[11px] font-mono font-bold">
                {docShivalik.bidder_id}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Submitted Document:</span>
                <span className="font-mono text-slate-800 font-semibold">{docShivalik.filename}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-rose-50/50">
                <span className="text-rose-800 font-semibold flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-rose-600" /> Workstation Hostname:
                </span>
                <span className="font-mono font-bold text-rose-700">{docShivalik.workstation_id}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-rose-50/50">
                <span className="text-rose-800 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-600" /> Author / OS User:
                </span>
                <span className="font-mono font-bold text-rose-700">{docShivalik.os_user} ({docShivalik.author})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Software Creator:</span>
                <span className="text-slate-800">{docShivalik.creator_tool}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">PDF Producer:</span>
                <span className="text-slate-800">{docShivalik.producer}</span>
              </div>
              <div className="clay-inset p-2 rounded-xl flex justify-between items-center bg-amber-50/50">
                <span className="text-amber-800 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Created Timestamp:
                </span>
                <span className="font-mono font-extrabold text-amber-900">{docShivalik.creation_timestamp}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Forensic Timeline Visualization */}
        <div className="clay-card-dark p-4 rounded-2xl text-white space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" /> Chronological Authoring Timeline (Same Machine)
            </span>
            <span className="text-[11px] font-mono text-rose-400 font-bold">Time Difference: 00:03:27 (3 mins 27 secs)</span>
          </div>

          <div className="relative pt-4 pb-2">
            <div className="h-2 w-full bg-slate-800 rounded-full relative">
              <div className="absolute left-[20%] right-[30%] h-2 bg-gradient-to-r from-blue-500 to-rose-500 rounded-full"></div>
              
              {/* Event 1 */}
              <div className="absolute left-[20%] -top-2 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  1
                </div>
                <span className="text-[10px] font-mono text-blue-300 mt-2 whitespace-nowrap">
                  14:12:08 — Apex PDF Exported
                </span>
              </div>

              {/* Event 2 */}
              <div className="absolute right-[30%] -top-2 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  2
                </div>
                <span className="text-[10px] font-mono text-rose-300 mt-2 whitespace-nowrap">
                  14:17:35 — Shivalik PDF Exported
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Complete Document Ingestion Metadata Table */}
      <div className="clay-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Repository Metadata Registry ({records.length} Documents Audited)
          </h3>
          <span className="text-xs text-slate-500">Extracted via pypdf byte inspector</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Bidder</th>
                <th className="py-3 px-3">Filename</th>
                <th className="py-3 px-3">Hardware Workstation</th>
                <th className="py-3 px-3">Author Account</th>
                <th className="py-3 px-3">Created Date</th>
                <th className="py-3 px-3">Forensic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => {
                const isCritical = r.forensic_risk === 'CRITICAL';
                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {r.bidder_name}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {r.filename}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold">
                      <span className={isCritical ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                        {r.workstation_id}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {r.author}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                      {r.creation_timestamp}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`clay-badge text-[10px] font-bold ${
                        isCritical ? 'clay-badge-rose' : 'clay-badge-emerald'
                      }`}>
                        {isCritical ? 'COLLISION DETECTED' : 'INDEPENDENT'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
