import { useState } from "react";
import { Sparkles, Stars, Moon, Compass, Shield, Image as ImageIcon, Wand2, Info, ArrowDown } from "lucide-react";
import { useDreamVisualizer } from "@/hooks/use-dream";
import { DreamForm } from "@/components/DreamForm";
import { DreamResult } from "@/components/DreamResult";
import { LoadingState } from "@/components/LoadingState";
import { DreamGallery } from "@/components/DreamGallery";
import { SettingsModal } from "@/components/SettingsModal";

interface HomeProps {
  onOpenSettings: () => void;
  isSettingsOpen: boolean;
  onCloseSettings: () => void;
}

export function Home({ onOpenSettings, isSettingsOpen, onCloseSettings }: HomeProps) {
  const {
    generateDream,
    isGenerating,
    generationPhase,
    progress,
    result,
    setResult,
    error,
    reset,
    history,
    deleteDream,
    clearHistory,
    settings,
    saveSettings,
  } = useDreamVisualizer();

  const [activeTab, setActiveTab] = useState<"studio" | "journal">("studio");

  const handleSelectJournalDream = (dream: any) => {
    setResult(dream);
    setActiveTab("studio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Ambient background glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-primary/15 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-accent/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="w-full max-w-5xl mx-auto px-4 pt-12 sm:pt-16 pb-20 relative z-10 flex flex-col items-center">
        {/* Hero Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
              Subconscious Neural Synthesis
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 font-sans">
            AI <span className="bg-gradient-to-r from-primary via-accent to-accent-cyan bg-clip-text text-transparent">Dream Visualizer</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Translate the elusive visions, feelings, and nightscapes of your sleep into breathtaking high-definition surreal art.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("studio")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "studio"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/5"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Dream Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "journal"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/5"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dream Vault ({history.length})</span>
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="w-full max-w-2xl mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-md">
            <p className="text-xs sm:text-sm text-rose-300 font-medium text-center">
              ⚠️ {error.message || "Failed to generate dream image. Please try again."}
            </p>
          </div>
        )}

        {/* Active View: Studio vs Journal */}
        <div className="w-full">
          {activeTab === "studio" ? (
            <div className="w-full transition-all duration-500">
              {isGenerating ? (
                <LoadingState phase={generationPhase} progress={progress} />
              ) : result ? (
                <DreamResult dream={result} onReset={reset} />
              ) : (
                <DreamForm onSubmit={generateDream} isGenerating={isGenerating} />
              )}
            </div>
          ) : (
            <DreamGallery
              history={history}
              onSelectDream={handleSelectJournalDream}
              onDeleteDream={deleteDream}
              onClearHistory={clearHistory}
            />
          )}
        </div>

        {/* Feature Highlights / How it Works */}
        {!result && !isGenerating && activeTab === "studio" && (
          <section className="w-full max-w-4xl mx-auto mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-foreground">Subconscious Prompting</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Describe whatever fragments you remember—flying across water, strange impossible cities, or celestial symbols.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-foreground">Psychological & Style Tuning</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our multi-layer prompt enhancer applies Surrealism, Ghibli, Cyberpunk or Astral aesthetics with mood lighting.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-accent-cyan/20 text-accent-cyan flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-foreground">Analysis & HD Archival</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive high-resolution digital art, extracted Jungian archetypes, and auto-archive into your private dream vault.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={onCloseSettings}
        settings={settings}
        onSave={saveSettings}
      />
    </div>
  );
}
