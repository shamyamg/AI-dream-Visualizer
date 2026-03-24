import { motion, AnimatePresence } from "framer-motion";
import { Stars } from "lucide-react";
import { useDreamVisualizer } from "@/hooks/use-dream";
import { DreamForm } from "@/components/DreamForm";
import { DreamResult } from "@/components/DreamResult";
import { LoadingState } from "@/components/LoadingState";

export default function Home() {
  const { generateDream, isGenerating, result, error, reset } = useDreamVisualizer();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center pt-20 pb-12 px-4">
      {/* Ambient background glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <main className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center p-2 mb-6 rounded-full bg-white/5 border border-white/10">
            <span className="flex items-center gap-2 px-3 text-sm text-white/80">
              <Stars className="w-4 h-4 text-primary" /> Powered by advanced neural networks
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            AI <span className="text-gradient">Dream Visualizer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Translate the elusive visions of your sleep into stunning visual art.
          </p>
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="w-full max-w-2xl mb-8">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm">{error.message || "Something went wrong."}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {!result && !isGenerating && (
              <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                <DreamForm onSubmit={generateDream} isGenerating={isGenerating} />
              </motion.div>
            )}
            {isGenerating && <motion.div key="loading"><LoadingState /></motion.div>}
            {result && !isGenerating && (
              <motion.div key="result">
                <DreamResult imageUrl={result.imageUrl} prompt={result.prompt} onReset={reset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
      }
