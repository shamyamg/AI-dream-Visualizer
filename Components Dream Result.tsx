import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";

export function DreamResult({ imageUrl, prompt, onReset }) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `dream-${Date.now()}.png`;
    a.click();
  };

  return (
    <motion.div className="w-full max-w-4xl mx-auto mt-12 space-y-8"
      initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
      <div className="relative group rounded-3xl overflow-hidden p-2 bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="rounded-2xl overflow-hidden aspect-square md:aspect-[4/3]">
          <img src={imageUrl} alt="Visualized Dream" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
            <p className="text-white/90 text-sm">"{prompt}"</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-white/10 hover:-translate-y-1 transition-all">
          <Download className="w-4 h-4" /> Save Image
        </button>
        <button onClick={onReset} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 border border-primary/30 hover:-translate-y-1 transition-all">
          <RefreshCw className="w-4 h-4" /> Dream Again
        </button>
      </div>
    </motion.div>
  );
          }
