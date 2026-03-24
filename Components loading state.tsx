import { motion } from "framer-motion";

export function LoadingState() {
  return (
    <motion.div className="flex flex-col items-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-primary rounded-full blur-xl animate-pulse opacity-60" />
        <div className="absolute w-6 h-6 bg-white rounded-full blur-sm" />
        <motion.div className="absolute inset-0 border border-primary/30 rounded-full border-t-primary/80"
          animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
      </div>
      <motion.p className="mt-8 text-xl font-medium text-foreground/80"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        Weaving your subconscious into reality...
      </motion.p>
      <p className="mt-2 text-sm text-muted-foreground">The AI is painting with starlight.</p>
    </motion.div>
  );
}
