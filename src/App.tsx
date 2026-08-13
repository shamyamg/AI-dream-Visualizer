import { useState } from "react";
import { Sparkles, Sliders, Github, Compass, Heart } from "lucide-react";
import { Home } from "@/pages/Home";
import { AmbientAudio } from "@/components/AmbientAudio";

export function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-white font-sans">
      {/* Top Floating Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-white/5 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent p-0.5 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <span className="font-bold text-sm sm:text-base tracking-tight text-foreground font-sans">
            Dream<span className="text-primary font-serif italic ml-0.5">Visualizer</span>
          </span>
        </a>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Theta Dream Soundscape Synthesizer */}
          <AmbientAudio />

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl bg-card/60 hover:bg-card border border-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
            title="Studio Settings & Engine"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/shamyamg/AI-dream-Visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-card/60 hover:bg-card border border-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <Home
          isSettingsOpen={isSettingsOpen}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onCloseSettings={() => setIsSettingsOpen(false)}
        />
      </div>

      {/* Modern Minimalist Footer */}
      <footer className="w-full border-t border-white/5 py-8 px-4 text-center text-xs text-muted-foreground space-y-2 relative z-10 bg-background/50 backdrop-blur-md">
        <div className="flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
          <span>for dreamers, visionaries & nocturnal artists</span>
        </div>
        <p className="text-[11px] text-muted-foreground/60">
          Powered by neural generative models & subconscious interpretation algorithms
        </p>
      </footer>
    </div>
  );
}

export default App;
