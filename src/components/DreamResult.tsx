import { useState } from "react";
import { Download, RefreshCw, Copy, Check, Share2, Maximize2, X, Sparkles, Brain, Eye } from "lucide-react";
import type { DreamRecord } from "@/hooks/use-dream";

interface DreamResultProps {
  dream: DreamRecord;
  onReset: () => void;
}

export function DreamResult({ dream, onReset }: DreamResultProps) {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(dream.imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `ai-dream-${dream.styleId}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback direct link download
      const a = document.createElement("a");
      a.href = dream.imageUrl;
      a.download = `ai-dream-${Date.now()}.png`;
      a.target = "_blank";
      a.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(dream.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Visualized Dream",
          text: `"${dream.prompt}" - Visualized with AI Dream Studio`,
          url: window.location.href,
        });
      } catch (err) {
        handleCopyPrompt();
      }
    } else {
      handleCopyPrompt();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Visual Canvas Card */}
      <div className="relative group rounded-3xl overflow-hidden p-2 sm:p-3 bg-card/80 border border-white/15 backdrop-blur-xl shadow-2xl">
        <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] bg-background/50 flex items-center justify-center">
          <img
            src={dream.imageUrl}
            alt={dream.prompt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />

          {/* Quick Overlay Bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsZoomed(true)}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110"
                title="View Full Size"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                  {dream.styleName}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 backdrop-blur-md">
                  {dream.moodName}
                </span>
              </div>
              <p className="text-white text-sm sm:text-base font-medium line-clamp-2 italic drop-shadow-md">
                "{dream.prompt}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? "Saving..." : "Save High-Res"}</span>
        </button>

        <button
          onClick={handleCopyPrompt}
          className="px-5 py-3.5 rounded-2xl bg-card/80 border border-white/10 hover:border-white/20 text-foreground font-semibold flex items-center gap-2 hover:bg-card transition-all hover:scale-105 active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Prompt Copied!" : "Copy Prompt"}</span>
        </button>

        <button
          onClick={handleShare}
          className="px-5 py-3.5 rounded-2xl bg-card/80 border border-white/10 hover:border-white/20 text-foreground font-semibold flex items-center gap-2 hover:bg-card transition-all hover:scale-105 active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={onReset}
          className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-foreground font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Visualize Another</span>
        </button>
      </div>

      {/* Psychological Symbolism & Archetype Interpretation Card */}
      {dream.analysis && (
        <div className="p-6 sm:p-7 rounded-3xl bg-card/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-accent/20 text-accent border border-accent/30">
                <Brain className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-base font-bold text-foreground">Subconscious Dream Interpretation</h4>
                <p className="text-xs text-muted-foreground">Jungian archetypal breakdown of your dream imagery</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
              <Eye className="w-3.5 h-3.5" /> {dream.analysis.jungianArchetype}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dream.analysis.symbols.map((symbol, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-background/50 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary-light">
                  <Sparkles className="w-3 h-3" />
                  <span>{symbol.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {symbol.meaning}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-foreground/90 leading-relaxed">
            <span className="font-semibold text-primary-light">Psychological Synthesis: </span>
            {dream.analysis.subconsciousInsight}
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={dream.imageUrl}
            alt={dream.prompt}
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
