import { useState } from "react";
import { X, Key, ShieldCheck, Cpu, Sliders, Check } from "lucide-react";
import type { DreamSettings } from "@/hooks/use-dream";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DreamSettings;
  onSave: (settings: Partial<DreamSettings>) => void;
}

export function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(settings.apiKey || "");
  const [engine, setEngine] = useState<"neural-free" | "openai-dalle3">(settings.modelEngine);
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">(settings.aspectRatio);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      apiKey: apiKey.trim(),
      modelEngine: engine,
      aspectRatio,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl bg-card border border-white/15 p-6 sm:p-7 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">Studio Settings</h3>
              <p className="text-xs text-muted-foreground">Customize your AI rendering engine and formats</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Engine Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-primary" /> AI Generation Engine
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEngine("neural-free")}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  engine === "neural-free"
                    ? "bg-primary/20 border-primary text-foreground ring-1 ring-primary"
                    : "bg-background/50 border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-semibold text-xs text-foreground mb-1">⚡ Neural Dream (Free)</div>
                <div className="text-[11px] text-muted-foreground">Instant high-speed AI generation with 0 setup required</div>
              </button>

              <button
                type="button"
                onClick={() => setEngine("openai-dalle3")}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  engine === "openai-dalle3"
                    ? "bg-primary/20 border-primary text-foreground ring-1 ring-primary"
                    : "bg-background/50 border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-semibold text-xs text-foreground mb-1">🔑 OpenAI DALL-E 3</div>
                <div className="text-[11px] text-muted-foreground">Requires your personal OpenAI API Key</div>
              </button>
            </div>
          </div>

          {/* OpenAI API Key Input (if selected) */}
          {engine === "openai-dalle3" && (
            <div className="space-y-1.5 p-4 rounded-2xl bg-background/60 border border-primary/30">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" /> OpenAI API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full p-3 rounded-xl bg-card border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Your key is stored only inside your browser's localStorage.
              </p>
            </div>
          )}

          {/* Aspect Ratio Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Canvas Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {(["1:1", "16:9", "9:16"] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    aspectRatio === ratio
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-background/50 border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {ratio === "1:1" ? "1:1 Square" : ratio === "16:9" ? "16:9 Cinema" : "9:16 Portrait"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
