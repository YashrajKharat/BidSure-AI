import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Film
} from 'lucide-react';

export const DEMO_SCENES = [
  {
    id: 1,
    title: "1/6: Public Procurement Problem & BidSure AI Overview",
    duration: 25,
    role: "officer",
    page: "overview",
    audioSrc: "/audio/scene1.wav",
    narration: "Welcome to BidSure AI, an enterprise forensic procurement platform designed to eliminate corruption, bid rigging, and fraudulent cartels in public infrastructure tenders. Government authorities worldwide invest billions of dollars in critical infrastructure projects, yet conventional procurement portals cannot detect covert syndicates. BidSure AI transforms procurement integrity by automating General Financial Rules compliance, cross-bidder forensic analysis, and cryptographic auditability.",
    action: (ctx) => {
      ctx.setCurrentRole('officer');
      ctx.setActiveOfficerId('OFF-001');
      ctx.setActivePage('overview');
    }
  },
  {
    id: 2,
    title: "2/6: Role 1 — Government Authority & Tender Creation",
    duration: 25,
    role: "government",
    page: "tenders",
    audioSrc: "/audio/scene2.wav",
    narration: "In our first role, the Government Authority creates and publishes competitive public tenders. Here, we observe the Mumbai Metropolitan Region Development Authority's Metro Line 4 elevated viaduct project, valued at 485.5 Crores. The procuring authority configures mandatory GFR Rule 173 standards, including an audited annual turnover threshold of 145 Crores, bank solvency limits, and a one percent bank guarantee for earnest money deposit.",
    action: (ctx) => {
      ctx.setCurrentRole('government');
      ctx.setActivePage('tenders');
      if (ctx.tenders && ctx.tenders[0]) {
        ctx.setSelectedTenderId(ctx.tenders[0].id);
      }
    }
  },
  {
    id: 3,
    title: "3/6: Role 2 — Contractor Portal & Strict Zero-Knowledge Privacy",
    duration: 25,
    role: "contractor",
    page: "overview",
    audioSrc: "/audio/scene3.wav",
    narration: "In our second role, contractors access dedicated, confidential bidding dashboards. Strict privacy boundaries are enforced by design. Notice that contractor BuildCraft can inspect tender specifications and only an aggregate count indicating that three contractors have submitted bids. Competitor names, technical methodologies, and commercial quotes remain completely concealed, preventing illegal price discovery or premature collusion.",
    action: (ctx) => {
      ctx.setCurrentRole('contractor');
      ctx.setActiveContractorId('CTR-002');
      ctx.setActivePage('overview');
    }
  },
  {
    id: 4,
    title: "4/6: Role 3 — Procurement Officer & Cryptographic Duplicate Detection",
    duration: 25,
    role: "officer",
    page: "duplicates",
    audioSrc: "/audio/scene4.wav",
    narration: "In our third role, the Procurement Officer activates automated AI forensics. BidSure AI scans all submitted proposals and computes SHA-256 cryptographic fingerprints. The engine instantly uncovers a critical anomaly: Apex Infrastructure and Shivalik Heavy Engineering submitted byte-for-byte identical technical methodology files with identical 256-bit hashes, proving an active cover-bidding syndicate.",
    action: (ctx) => {
      ctx.setCurrentRole('officer');
      ctx.setActiveOfficerId('OFF-001');
      ctx.setActivePage('duplicates');
    }
  },
  {
    id: 5,
    title: "5/6: Cartel Knowledge Graph & Workstation Forensics",
    duration: 25,
    role: "officer",
    page: "cartelGraph",
    audioSrc: "/audio/scene5.wav",
    narration: "Our interactive Cartel Knowledge Graph visually maps the corporate syndicate network. The system reveals that Apex and Shivalik share the exact same tax registration PAN and a common board director. Furthermore, deep workstation metadata confirms that both competing proposals were authored on the exact same laptop by the same user, created just three minutes apart from the same Nariman Point internet gateway.",
    action: (ctx) => {
      ctx.setCurrentRole('officer');
      ctx.setActivePage('cartelGraph');
    }
  },
  {
    id: 6,
    title: "6/6: CST Evaluation Matrix, Disqualification & Sealed Award",
    duration: 25,
    role: "officer",
    page: "comparativeStatement",
    audioSrc: "/audio/scene6.wav",
    narration: "Finally, the Comparative Statement of Tenders synthesizes all statutory and financial findings. Although Apex submitted the lowest commercial quote of 442 Crores, BidSure AI automatically disqualifies them for cartel collusion under GFR Rule 173. The contract is rightfully awarded to legitimate L1 contractor BuildCraft for 468 Crores, and cryptographically sealed with an immutable Letter of Acceptance.",
    action: (ctx) => {
      ctx.setCurrentRole('officer');
      ctx.setActivePage('comparativeStatement');
    }
  }
];

export default function DemoTourPlayer({
  isActive,
  onClose,
  setCurrentRole,
  setActivePage,
  setSelectedTenderId,
  setActiveContractorId,
  setActiveOfficerId,
  onOpenTenderDetails,
  onOpenBidModal,
  onOpenAwardModal,
  tenders = [],
  bidders = [],
  showToast
}) {
  if (!isActive) return null;

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const totalDuration = 150; // Exactly 2 minutes and 30 seconds (150s)

  const audioElementRef = useRef(null);
  const timerRef = useRef(null);

  const scene = DEMO_SCENES[currentSceneIdx];

  // Context bundle for scene choreography
  const tourContext = {
    setCurrentRole,
    setActivePage,
    setSelectedTenderId,
    setActiveContractorId,
    setActiveOfficerId,
    onOpenTenderDetails,
    onOpenBidModal,
    onOpenAwardModal,
    tenders,
    bidders,
    showToast
  };

  // Play audio for scene
  const playSceneAudio = (idx) => {
    const sc = DEMO_SCENES[idx];
    if (!sc) return;

    if (isMuted) {
      if (audioElementRef.current) audioElementRef.current.pause();
      return;
    }

    try {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
      }
      const audioEl = audioElementRef.current;
      audioEl.pause();
      audioEl.src = sc.audioSrc;
      audioEl.currentTime = 0;
      audioEl.play().catch(() => {
        // Fallback to SpeechSynthesis if local audio file autoplay is restricted
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(sc.narration);
          utter.rate = 1.0;
          window.speechSynthesis.speak(utter);
        }
      });
    } catch (e) {
      console.log("Audio trigger:", e);
    }
  };

  // Execute scene actions and play voiceover whenever current scene index changes
  useEffect(() => {
    const sc = DEMO_SCENES[currentSceneIdx];
    if (sc && isPlaying) {
      sc.action(tourContext);
      playSceneAudio(currentSceneIdx);
    }
  }, [currentSceneIdx, isPlaying]);

  // Master 150-second tick timer (25 seconds per scene)
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        if (next >= totalDuration) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          if (showToast) showToast('2:30 Min Complete Executive Demo Tour Finished!', 'success');
          return totalDuration;
        }

        // Each scene is 25 seconds
        const nextSceneIdx = Math.min(5, Math.floor(next / 25));
        if (nextSceneIdx !== currentSceneIdx) {
          setCurrentSceneIdx(nextSceneIdx);
        }

        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIdx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElementRef.current) audioElementRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (audioElementRef.current) audioElementRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSceneAudio(currentSceneIdx);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIdx < DEMO_SCENES.length - 1) {
      const nextIdx = currentSceneIdx + 1;
      setCurrentSceneIdx(nextIdx);
      setElapsedSeconds(nextIdx * 25);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      const prevIdx = currentSceneIdx - 1;
      setCurrentSceneIdx(prevIdx);
      setElapsedSeconds(prevIdx * 25);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIdx(0);
    setElapsedSeconds(0);
    setIsPlaying(true);
    playSceneAudio(0);
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      if (audioElementRef.current) audioElementRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      playSceneAudio(currentSceneIdx);
    }
  };

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6 pointer-events-none animate-in slide-in-from-bottom-6 duration-300">
      <div className="max-w-4xl mx-auto clay-modal p-4 sm:p-5 border-2 border-rose-500/50 shadow-2xl pointer-events-auto bg-slate-900/95 text-white backdrop-blur-md rounded-3xl space-y-3">
        
        {/* Top Bar: Scene Title, Chapter Progress, Timeline & Close */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white flex items-center gap-1 shadow-xs">
              <Film className="w-3 h-3" /> 2:30 Min Executive AI Demo Tour
            </span>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-100 truncate max-w-sm sm:max-w-md">
              {scene.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono shrink-0">
            <span className="font-black text-rose-400 bg-black/40 px-2.5 py-1 rounded-xl">
              {formatTime(elapsedSeconds)} / {formatTime(totalDuration)}
            </span>
            <button
              onClick={() => {
                if (audioElementRef.current) audioElementRef.current.pause();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 rounded-xl hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Exit Demo Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6-Segment Visual Timeline Bar (Each Segment is exactly 25 Seconds) */}
        <div className="grid grid-cols-6 gap-1.5 h-2 w-full bg-white/10 rounded-full overflow-hidden">
          {DEMO_SCENES.map((s, idx) => {
            const isCompleted = currentSceneIdx > idx;
            const isCurrent = currentSceneIdx === idx;
            const progressWithinScene = isCurrent ? ((elapsedSeconds % 25) / 25) * 100 : (isCompleted ? 100 : 0);

            return (
              <div key={s.id} className="h-full bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCurrent ? 'bg-linear-to-r from-amber-400 via-rose-500 to-indigo-500' : (isCompleted ? 'bg-emerald-500' : 'bg-transparent')
                  }`}
                  style={{ width: `${progressWithinScene}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Closed-Caption Teleprompter (Executive English High-Contrast Transcript Box) */}
        <div className="p-3.5 rounded-2xl bg-black/75 border border-white/15 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-medium shadow-inner flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '6s' }} />
          <p className="line-clamp-2 sm:line-clamp-3 italic">
            "{scene.narration}"
          </p>
        </div>

        {/* Player Controls Deck */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevScene}
              disabled={currentSceneIdx === 0}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 cursor-pointer transition-colors"
              title="Previous Chapter"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={handleNextScene}
              disabled={currentSceneIdx === DEMO_SCENES.length - 1}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 cursor-pointer transition-colors"
              title="Next Chapter"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Restart from Beginning (00:00)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl cursor-pointer transition-colors ${
                isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
              title={isMuted ? 'Unmute AI Voiceover' : 'Mute Voiceover'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Chapter {currentSceneIdx + 1} of {DEMO_SCENES.length}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span className="text-rose-400 font-semibold">{scene.role.toUpperCase()} VIEW</span>
          </div>
        </div>

        {/* Audio Element for voiceover playback */}
        <audio ref={audioElementRef} preload="auto" className="hidden" />

      </div>
    </div>
  );
}
