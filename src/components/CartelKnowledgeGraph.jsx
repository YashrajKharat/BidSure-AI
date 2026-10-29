import React, { useState, useEffect, useRef } from 'react';
import {
  Network,
  ShieldAlert,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Sparkles,
  Info,
  ExternalLink,
  Building2,
  Laptop,
  CreditCard,
  UserCheck,
  Filter
} from 'lucide-react';
import { api } from '../services/api';

export default function CartelKnowledgeGraph({ onNavigate, showToast }) {
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [highlightCartel, setHighlightCartel] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  // Default fallback data if offline
  const fallbackGraph = {
    nodes: [
      { id: "BIDDER-001", label: "Apex Infrastructure Solutions Ltd", type: "bidder", group: "cartel", risk: "HIGH", score: 48, x: 280, y: 150 },
      { id: "BIDDER-003", label: "Shivalik Heavy Engineering Corp", type: "bidder", group: "cartel", risk: "HIGH", score: 42, x: 520, y: 150 },
      { id: "BIDDER-002", label: "BuildCraft Infra Projects Ltd", type: "bidder", group: "independent", risk: "LOW", score: 98, x: 740, y: 280 },
      { id: "BIDDER-004", label: "Vertex Smart Mobility Tech", type: "bidder", group: "independent", risk: "LOW", score: 91, x: 120, y: 320 },
      { id: "BIDDER-005", label: "Krystal Grid Power Systems", type: "bidder", group: "independent", risk: "LOW", score: 86, x: 260, y: 440 },
      
      { id: "PAN-AAACA7821B", label: "PAN: AAACA7821B", type: "pan", group: "identifier", risk: "CRITICAL", x: 400, y: 60, detail: "Identical Tax Registration (GFR 173 Violation)" },
      { id: "DIR-SINGHANIA", label: "Director: Rajesh Singhania", type: "director", group: "entity", risk: "CRITICAL", x: 400, y: 240, detail: "Common Director (DIN: 08412901)" },
      { id: "WS-LAPTOP08", label: "Workstation: LAPTOP-INFR-08", type: "workstation", group: "forensic", risk: "CRITICAL", x: 400, y: 360, detail: "Both bids authored on this machine 3 mins apart" },
      { id: "IP-192-168-1", label: "IP Gateway: 114.79.132.88", type: "network", group: "forensic", risk: "HIGH", x: 580, y: 340, detail: "Same ISP Subnet in Nariman Point" },
      { id: "BANK-HDFC-FORT", label: "Bank: HDFC Fort Branch", type: "bank", group: "financial", risk: "MEDIUM", x: 680, y: 420, detail: "Coordinated BG Issuance" }
    ],
    links: [
      { source: "BIDDER-001", target: "PAN-AAACA7821B", type: "SHARED_PAN", severity: "CRITICAL", label: "Registered Under PAN" },
      { source: "BIDDER-003", target: "PAN-AAACA7821B", type: "SHARED_PAN", severity: "CRITICAL", label: "Submitted Using Same PAN" },
      { source: "BIDDER-001", target: "DIR-SINGHANIA", type: "COMMON_DIRECTOR", severity: "CRITICAL", label: "Designated Director (40%)" },
      { source: "BIDDER-003", target: "DIR-SINGHANIA", type: "COMMON_DIRECTOR", severity: "CRITICAL", label: "Majority Shareholder (60%)" },
      { source: "BIDDER-001", target: "WS-LAPTOP08", type: "IDENTICAL_WORKSTATION", severity: "CRITICAL", label: "Authored at 14:12" },
      { source: "BIDDER-003", target: "WS-LAPTOP08", type: "IDENTICAL_WORKSTATION", severity: "CRITICAL", label: "Authored at 14:15" },
      { source: "BIDDER-001", target: "IP-192-168-1", type: "SHARED_NETWORK", severity: "HIGH", label: "Submission IP" },
      { source: "BIDDER-003", target: "IP-192-168-1", type: "SHARED_NETWORK", severity: "HIGH", label: "Submission IP" },
      { source: "BIDDER-002", target: "BANK-HDFC-FORT", type: "BANK", severity: "LOW", label: "Independent EMD" }
    ]
  };

  useEffect(() => {
    async function loadGraph() {
      setLoading(true);
      try {
        const data = await api.getNetworkGraph();
        if (data && data.nodes && data.links) {
          // Merge with coordinates
          const mergedNodes = data.nodes.map(node => {
            const fb = fallbackGraph.nodes.find(f => f.id === node.id);
            return { ...node, x: fb ? fb.x : 400 + Math.random() * 200, y: fb ? fb.y : 200 + Math.random() * 150 };
          });
          setGraphData({ nodes: mergedNodes, links: data.links });
        } else {
          setGraphData(fallbackGraph);
        }
      } catch (e) {
        setGraphData(fallbackGraph);
      } finally {
        setLoading(false);
      }
    }
    loadGraph();
  }, []);

  const data = graphData || fallbackGraph;

  // Filter links
  const activeLinks = data.links.filter(l => {
    if (filterType === 'ALL') return true;
    if (filterType === 'PAN') return l.type === 'SHARED_PAN';
    if (filterType === 'DIRECTOR') return l.type === 'COMMON_DIRECTOR';
    if (filterType === 'FORENSIC') return l.type === 'IDENTICAL_WORKSTATION' || l.type === 'SHARED_NETWORK';
    return true;
  });

  const getNodeColor = (node) => {
    if (highlightCartel && node.group === 'cartel') return '#EF4444'; // Red
    if (node.type === 'pan') return '#DC2626';
    if (node.type === 'director') return '#F59E0B';
    if (node.type === 'workstation') return '#8B5CF6';
    if (node.type === 'network') return '#06B6D4';
    if (node.type === 'bidder') return node.group === 'cartel' ? '#EF4444' : '#3B82F6';
    return '#64748B';
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'bidder': return Building2;
      case 'pan': return CreditCard;
      case 'director': return UserCheck;
      case 'workstation': return Laptop;
      default: return Network;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header with Spatial Claymorphism */}
      <div className="clay-card p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 clay-badge">
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" /> Feature 1: Real-Time Cartel & Collusion Knowledge Graph
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Collusion & Entity Network Graph
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Multi-dimensional relationship mapping uncovering covert sister-concern syndicates, shared statutory identifiers (PAN/GSTIN), common board directors (DIN), and identical author workstation origins across competing tender bids.
          </p>
        </div>

        {/* Controls Pod */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setHighlightCartel(!highlightCartel)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              highlightCartel 
                ? 'clay-btn-danger text-white shadow-lg' 
                : 'clay-btn-secondary text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {highlightCartel ? 'Collusion Cluster Highlighted' : 'Highlight Cartel Syndicate'}
          </button>

          <button
            onClick={() => {
              setSelectedNode(null);
              setFilterType('ALL');
              setZoomLevel(1);
              showToast && showToast('Knowledge graph reset to default view.', 'info');
            }}
            className="clay-btn-secondary px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            title="Reset Graph"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Ambient lighting halo */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Graph Visualization Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Columns: Interactive SVG Network Surface */}
        <div className="lg:col-span-3 clay-card-dark p-4 sm:p-6 flex flex-col relative overflow-hidden text-white rounded-3xl min-h-[560px]">
          
          {/* Top floating control bar inside canvas */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
            <div className="flex items-center gap-2 clay-inset-dark px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400 font-medium">Filter Connections:</span>
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${filterType === 'ALL' ? 'clay-btn-primary text-white' : 'text-slate-300 hover:text-white'}`}
              >
                All (12)
              </button>
              <button
                onClick={() => setFilterType('PAN')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${filterType === 'PAN' ? 'clay-btn-danger text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Shared PAN
              </button>
              <button
                onClick={() => setFilterType('DIRECTOR')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${filterType === 'DIRECTOR' ? 'clay-btn-amber text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Common DIN
              </button>
              <button
                onClick={() => setFilterType('FORENSIC')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${filterType === 'FORENSIC' ? 'clay-btn-purple text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Workstation/IP
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 clay-inset-dark p-1 rounded-xl">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
                className="p-1.5 hover:text-white rounded-lg text-slate-300 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono font-bold text-cyan-300 px-1">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
                className="p-1.5 hover:text-white rounded-lg text-slate-300 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="flex-1 w-full h-full relative overflow-auto cursor-crosshair">
            <svg
              className="w-full h-[480px] transition-transform duration-300 origin-center"
              viewBox="0 0 900 520"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Glowing Laser Filter */}
                <filter id="glow-laser" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="grad-cartel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#991B1B" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Connecting Edges */}
              {activeLinks.map((link, idx) => {
                const sourceNode = data.nodes.find(n => n.id === link.source);
                const targetNode = data.nodes.find(n => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isCritical = link.severity === 'CRITICAL';
                const isSelected = selectedNode && (selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id);

                return (
                  <g key={`link-${idx}`} className="transition-all">
                    {/* Glowing pulse line */}
                    {isCritical && (
                      <line
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke="#EF4444"
                        strokeWidth="5"
                        strokeOpacity="0.35"
                        filter="url(#glow-laser)"
                      />
                    )}
                    {/* Main stroke line */}
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isCritical ? '#EF4444' : (isSelected ? '#38BDF8' : '#64748B')}
                      strokeWidth={isCritical ? '2.5' : '1.5'}
                      strokeDasharray={link.type === 'IDENTICAL_WORKSTATION' ? '4 4' : 'none'}
                      strokeOpacity={isSelected ? 1 : 0.8}
                    />

                    {/* Edge Label Badge */}
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 6}
                      fill={isCritical ? '#FCA5A5' : '#94A3B8'}
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {link.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {data.nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isCartel = node.group === 'cartel' || node.risk === 'CRITICAL';
                const IconComp = getNodeIcon(node.type);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-110 group select-none"
                  >
                    {/* Animated Outer Pulse Ring for Flagged Nodes */}
                    {isCartel && highlightCartel && (
                      <circle
                        r="32"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="animate-spin"
                        style={{ animationDuration: '8s' }}
                        opacity="0.6"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r={node.type === 'bidder' ? 26 : 20}
                      fill={getNodeColor(node)}
                      stroke={isSelected ? '#FFFFFF' : (isCartel ? '#FECACA' : '#94A3B8')}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.5))"
                      className="transition-all"
                    />

                    {/* Node Type Label Badge */}
                    <rect
                      x="-55"
                      y={node.type === 'bidder' ? 32 : 24}
                      width="110"
                      height="20"
                      rx="6"
                      fill="#0B132B"
                      fillOpacity="0.85"
                      stroke={isSelected ? '#38BDF8' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y={node.type === 'bidder' ? 46 : 38}
                      fill="#F8FAFC"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {node.label.length > 18 ? node.label.slice(0, 16) + '...' : node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Forensic Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800 gap-2 z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                <span>Cartel Syndicate / Shared Tax ID</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Common Board Director</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span>Identical Author Workstation</span>
              </span>
            </div>
            <span className="text-[11px] text-cyan-400 font-mono">
              Click any node to inspect court-admissible evidence
            </span>
          </div>
        </div>

        {/* Right 1 Column: Node Inspector Drawer */}
        <div className="clay-card p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" /> Entity Forensic Inspector
              </span>
              {selectedNode && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedNode.risk === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {selectedNode.risk || 'NORMAL'}
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-3 animate-in fade-in">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    {selectedNode.label}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    Node ID: {selectedNode.id}
                  </span>
                </div>

                <div className="clay-inset p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Classification:</span>
                    <span className="font-bold text-slate-800 uppercase">{selectedNode.type}</span>
                  </div>
                  {selectedNode.group && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Syndicate Group:</span>
                      <span className={`font-bold ${selectedNode.group === 'cartel' ? 'text-rose-600' : 'text-slate-800'}`}>
                        {selectedNode.group.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {selectedNode.score !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Compliance Score:</span>
                      <span className="font-bold text-emerald-600">{selectedNode.score}%</span>
                    </div>
                  )}
                  {selectedNode.detail && (
                    <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                      <strong>Forensic Note:</strong> {selectedNode.detail}
                    </div>
                  )}
                </div>

                {/* Evidence Box */}
                {selectedNode.group === 'cartel' || selectedNode.risk === 'CRITICAL' ? (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1.5 text-rose-900">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      Statutory Violation Triggered
                    </div>
                    <p className="text-[11px] text-rose-700 leading-relaxed">
                      Under <strong>General Financial Rules (GFR) 2017 Rule 173</strong>, distinct bidding entities controlled by a common director or sharing a tax identity represent illegal proxy participation.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="font-bold">Independent Bidder Verified</div>
                    <p className="text-[11px] mt-1 text-emerald-700">No overlapping directors, bank branches, or workstation hashes detected.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2 text-slate-400">
                <Network className="w-10 h-10 mx-auto opacity-40 animate-pulse-subtle" />
                <p className="text-xs font-semibold">Select any node on the graph to view relationship telemetry</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate && onNavigate('duplicates')}
              className="clay-btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" /> View Side-by-Side Diff Modal
            </button>
            <button
              onClick={() => onNavigate && onNavigate('boqForensics')}
              className="clay-btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2 text-slate-700"
            >
              Check Pricing Markup Anomaly
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
