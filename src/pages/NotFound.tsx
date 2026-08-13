import { Moon, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-3xl bg-primary/20 text-primary flex items-center justify-center mb-6">
        <Moon className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-foreground mb-2">404 - Lost in the Dreamscape</h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8">
        This dream path dissolved into the ether. Return to the waking studio to materialize new visions.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-2xl bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary-dark transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dream Studio</span>
      </a>
    </div>
  );
}
