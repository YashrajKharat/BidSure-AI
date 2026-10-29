import os
import subprocess
import wave

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

# 6 Choreographed Scenes for Exactly 2 Minutes 30 Seconds (150 Seconds Total)
# Each scene runs for exactly 25 seconds
SCENES = [
    {
        "id": "scene1",
        "title": "Scene 1: Public Procurement Problem & BidSure AI Overview",
        "text": "Welcome to BidSure AI, an enterprise forensic procurement platform designed to eliminate corruption, bid rigging, and fraudulent cartels in public infrastructure tenders. Government authorities worldwide invest billions of dollars in critical infrastructure projects, yet conventional procurement portals cannot detect covert syndicates. BidSure AI transforms procurement integrity by automating General Financial Rules compliance, cross-bidder forensic analysis, and cryptographic auditability."
    },
    {
        "id": "scene2",
        "title": "Scene 2: Role 1 — Government Authority & Tender Creation",
        "text": "In our first role, the Government Authority creates and publishes competitive public tenders. Here, we observe the Mumbai Metropolitan Region Development Authority's Metro Line 4 elevated viaduct project, valued at 485.5 Crores. The procuring authority configures mandatory GFR Rule 173 standards, including an audited annual turnover threshold of 145 Crores, bank solvency limits, and a one percent bank guarantee for earnest money deposit."
    },
    {
        "id": "scene3",
        "title": "Scene 3: Role 2 — Contractor Portal & Strict Zero-Knowledge Privacy",
        "text": "In our second role, contractors access dedicated, confidential bidding dashboards. Strict privacy boundaries are enforced by design. Notice that contractor BuildCraft can inspect tender specifications and only an aggregate count indicating that three contractors have submitted bids. Competitor names, technical methodologies, and commercial quotes remain completely concealed, preventing illegal price discovery or premature collusion."
    },
    {
        "id": "scene4",
        "title": "Scene 4: Role 3 — Procurement Officer & Cryptographic Duplicate Detection",
        "text": "In our third role, the Procurement Officer activates automated AI forensics. BidSure AI scans all submitted proposals and computes SHA-256 cryptographic fingerprints. The engine instantly uncovers a critical anomaly: Apex Infrastructure and Shivalik Heavy Engineering submitted byte-for-byte identical technical methodology files with identical 256-bit hashes, proving an active cover-bidding syndicate."
    },
    {
        "id": "scene5",
        "title": "Scene 5: Cartel Knowledge Graph & Workstation Forensics",
        "text": "Our interactive Cartel Knowledge Graph visually maps the corporate syndicate network. The system reveals that Apex and Shivalik share the exact same tax registration PAN and a common board director. Furthermore, deep workstation metadata confirms that both competing proposals were authored on the exact same laptop by the same user, created just three minutes apart from the same Nariman Point internet gateway."
    },
    {
        "id": "scene6",
        "title": "Scene 6: CST Evaluation Matrix, Disqualification & Sealed Award",
        "text": "Finally, the Comparative Statement of Tenders synthesizes all statutory and financial findings. Although Apex submitted the lowest commercial quote of 442 Crores, BidSure AI automatically disqualifies them for cartel collusion under GFR Rule 173. The contract is rightfully awarded to legitimate L1 contractor BuildCraft for 468 Crores, and cryptographically sealed with an immutable Letter of Acceptance."
    }
]

def generate_audio():
    print(f"Generating 6 Studio Audio Tracks (2:30 min master) into {AUDIO_DIR}...")
    for idx, sc in enumerate(SCENES, 1):
        out_path = os.path.join(AUDIO_DIR, f"{sc['id']}.wav")
        # Rate = 1 produces natural, executive, fluent professional cadence (~23-24 seconds per scene)
        ps_cmd = f"""
        Add-Type -AssemblyName System.Speech;
        $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer;
        $synth.SelectVoice('Microsoft Zira Desktop');
        $synth.Rate = 1;
        $synth.SetOutputToWaveFile('{out_path.replace('\\', '/')}');
        $synth.Speak('{sc['text'].replace("'", "''")}');
        $synth.Dispose();
        """
        proc = subprocess.run(["powershell", "-Command", ps_cmd], capture_output=True, text=True)
        if proc.returncode == 0 and os.path.exists(out_path):
            with wave.open(out_path, 'rb') as w:
                dur = round(w.getnframes() / float(w.getframerate()), 1)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"[OK] [{idx}/6] Generated {sc['id']}.wav ({dur}s | {size_kb:.1f} KB)")
        else:
            print(f"[ERROR] Failed to generate {sc['id']}: {proc.stderr}")

if __name__ == "__main__":
    generate_audio()
