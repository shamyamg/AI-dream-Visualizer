import { useState } from "react";
import { Sparkles, Moon, Wand2, Lightbulb, Palette, Compass } from "lucide-react";
import { DREAM_STYLES, DREAM_MOODS, INSPIRATION_PROMPTS, cn } from "@/lib/utils";

interface DreamFormProps {
  onSubmit: (prompt: string, styleId: string, moodId: string) => void;
  isGenerating: boolean;
}

export function DreamForm({ onSubmit, isGenerating }: DreamFormProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("surrealism");
  const [selectedMood, setSelectedMood] = useState("mystical");

  const handleRandomInspiration = () => {
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];
    setPrompt(random);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim(), selectedStyle, selectedMood);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        onSubmit(prompt.trim(), selectedStyle, selectedMood);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
      {/* Prompt Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-accent-cyan rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
        
        <div className="relative p-6 sm:p-7 rounded-3xl bg-card/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2.5 text-base sm:text-lg font-semibold text-foreground">
              <span className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
                <Moon className="w-4 h-4" />
              </span>
              Describe Your Subconscious Vision
            </label>

            <button
              type="button"
              onClick={handleRandomInspiration}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspire Me</span>
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder="I was floating through an endless cathedral made of luminous water, where clocks melted into schools of glowing golden koi..."
            rows={4}
            className="w-full p-4 bg-background/70 border border-white/10 rounded-2xl text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base leading-relaxed"
          />

          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{prompt.length} characters</span>
            <span className="hidden sm:inline-block">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-mono">Cmd/Ctrl + Enter</kbd> to visualize</span>
          </div>
        </div>
      </div>

      {/* Dream Artistic Style Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 px-1">
          <Palette className="w-4 h-4 text-accent" />
          <span>Artistic Dream Filter</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {DREAM_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                disabled={isGenerating}
                className={cn(
                  "p-3.5 text-left rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group",
                  isSelected
                    ? "bg-primary/15 border-primary/60 shadow-lg shadow-primary/20 ring-1 ring-primary/40"
                    : "bg-card/60 border-white/5 hover:border-white/20 hover:bg-card/90"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{style.icon}</span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide", isSelected ? "bg-primary text-white" : "bg-white/5 text-muted-foreground")}>
                    {style.badge.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
                    {style.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {style.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dream Mood Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 px-1">
          <Compass className="w-4 h-4 text-accent-cyan" />
          <span>Emotional Dream Atmosphere</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DREAM_MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood.id)}
                disabled={isGenerating}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5",
                  isSelected
                    ? `${mood.color} ring-1 ring-white/20 shadow-md font-semibold`
                    : "bg-card/60 border-white/10 text-muted-foreground hover:text-foreground hover:bg-card/90"
                )}
              >
                <span>{mood.emoji}</span>
                <span>{mood.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Neural image synthesis with multi-stage surreal prompt tuning</span>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] text-white flex items-center justify-center gap-2.5 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Wand2 className="w-5 h-5 animate-pulse" />
          <span>{isGenerating ? "Manifesting Dream..." : "Visualize Dream"}</span>
        </button>
      </div>
    </form>
  );
}
