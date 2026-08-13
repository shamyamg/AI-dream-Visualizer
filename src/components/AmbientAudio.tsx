import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isInitializedRef = useRef(false);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Ethereal chord frequencies (Theta dream frequencies ~ 432Hz ambient chord)
      // Root: 216Hz, Minor Third: 256.8Hz, Fifth: 324Hz, Octave: 432Hz, 9th: 486Hz
      const chordFrequencies = [216, 259.2, 324, 432, 648];

      chordFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low frequency oscillator for gentle shimmer/tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(freq * 0.015, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        // Individual voice gain
        gain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);

        osc.start();
        oscillatorsRef.current.push(osc);
      });

      isInitializedRef.current = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      return;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
      setIsPlaying(true);
    } else if (audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isPlaying ? volume : 0, audioCtxRef.current.currentTime);
    }
  }, [volume, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-white/10 backdrop-blur-md text-xs text-muted-foreground hover:text-foreground transition-all">
      <button
        onClick={toggleSound}
        className="flex items-center gap-1.5 font-medium transition-colors hover:text-primary"
        title={isPlaying ? "Mute Ethereal Soundscape" : "Play Ambient Theta Soundscape"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-primary font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Ethereal Audio On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span>Ambient Audio</span>
          </>
        )}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="0.4"
          step="0.02"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
          title="Adjust Volume"
        />
      )}
    </div>
  );
}
