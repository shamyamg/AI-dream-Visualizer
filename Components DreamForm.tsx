import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Moon } from "lucide-react";

export function DreamForm({ onSubmit, isGenerating }) {
  const [prompt, setPrompt] = useState("");

  return (
    <motion.form onSubmit={(e) => { e.preventDefault(); prompt.trim() && onSubmit(prompt.trim()); }}
      className="w-full max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <label className="flex items-center gap-2 text-lg font-medium">
        <Moon className="w-5 h-5 text-primary" /> What did you dream about?
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <textarea
          value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating}
          placeholder="I was floating through a neon-lit cyber city where the sky was an ocean..."
          className="relative w-full h-40 p-6 bg-card/80 backdrop-blur-sm border border-white/10 rounded-2xl text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/60">
          {prompt.length} chars • Cmd/Ctrl + Enter to generate
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={!prompt.trim() || isGenerating}
          className="px-8 py-4 rounded-xl font-semibold bg-foreground text-background flex items-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          <Sparkles className="w-5 h-5" />
          {isGenerating ? "Manifesting..." : "Visualize Dream"}
        </button>
      </div>
    </motion.form>
  );
}
