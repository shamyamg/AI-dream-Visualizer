import { Sparkles, Trash2, Clock, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import type { DreamRecord } from "@/hooks/use-dream";

interface DreamGalleryProps {
  history: DreamRecord[];
  onSelectDream: (dream: DreamRecord) => void;
  onDeleteDream: (id: string) => void;
  onClearHistory: () => void;
}

export function DreamGallery({
  history,
  onSelectDream,
  onDeleteDream,
  onClearHistory,
}: DreamGalleryProps) {
  if (history.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-6 rounded-3xl bg-card/40 border border-white/5 text-center">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground mb-3">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-foreground mb-1">Your Dream Journal is Empty</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Every dream you materialize will be archived here automatically in your browser's private local vault.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-base font-bold text-foreground">Dream Journal Vault</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
            {history.length}
          </span>
        </div>

        <button
          onClick={onClearHistory}
          className="text-xs text-muted-foreground hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Vault</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((dream) => (
          <div
            key={dream.id}
            onClick={() => onSelectDream(dream)}
            className="group relative rounded-2xl overflow-hidden bg-card/70 border border-white/10 hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-video bg-background/60 overflow-hidden">
              <img
                src={dream.imageUrl}
                alt={dream.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-md">
                  {dream.styleName}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteDream(dream.id);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white/80 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                title="Delete dream"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Meta Info */}
            <div className="p-4 space-y-2">
              <p className="text-xs text-foreground/90 font-medium line-clamp-2 italic">
                "{dream.prompt}"
              </p>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-white/5">
                <span>{new Date(dream.createdAt).toLocaleDateString()}</span>
                <span className="text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View Dream <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
