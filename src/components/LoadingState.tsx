import { Sparkles, BrainCircuit, Orbit } from "lucide-react";

interface LoadingStateProps {
  phase?: string;
  progress?: number;
}

export function LoadingState({
  phase = "Weaving subconscious thoughts into visual art...",
  progress = 50,
}: LoadingStateProps) {
  return (
    <div className="w-full max-w-xl mx-auto py-16 px-4 flex flex-col items-center text-center animate-fade-in">
      {/* Astral Portal Glow Container */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
        {/* Outer pulsating nebula */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-accent-cyan opacity-40 blur-2xl animate-pulse" />
        
        {/* Rotating Celestial Rings */}
        <div className="absolute inset-2 border-2 border-dashed border-primary/40 rounded-full animate-[spin_8s_linear_infinite]" />
        <div className="absolute inset-6 border border-accent/50 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
        
        {/* Glowing Center Core */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-purple-800 p-0.5 shadow-2xl flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <BrainCircuit className="w-9 h-9 text-primary animate-pulse" />
          </div>
        </div>

        {/* Orbiting Sparkles */}
        <div className="absolute top-2 right-4 text-accent animate-bounce">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-4 left-3 text-accent-cyan animate-pulse">
          <Orbit className="w-4 h-4" />
        </div>
      </div>

      {/* Dynamic Status Text */}
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-tight">
        Materializing Dreamscape
      </h3>
      <p className="text-sm text-primary-light font-medium mb-6 min-h-[1.5rem]">
        {phase}
      </p>

      {/* Progress Track */}
      <div className="w-full max-w-xs bg-white/10 rounded-full h-2 overflow-hidden mb-4 p-0.5 border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-accent-cyan rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, Math.max(10, progress))}%` }}
        />
      </div>

      <p className="text-xs text-muted-foreground italic">
        "Dreams are the language of the soul spoken in painted light."
      </p>
    </div>
  );
}
