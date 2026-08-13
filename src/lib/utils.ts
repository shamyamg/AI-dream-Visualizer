import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DreamStyle {
  id: string;
  name: string;
  badge: string;
  description: string;
  promptSuffix: string;
  icon: string;
}

export const DREAM_STYLES: DreamStyle[] = [
  {
    id: "surrealism",
    name: "Surrealism",
    badge: "Salvador Dalí & Magritte",
    description: "Dreamlike paradoxes, floating geometries, impossible physics and melting realities",
    promptSuffix: "masterpiece surrealist digital art, inspired by Salvador Dali and Rene Magritte, metaphysical painting, subconscious imagery, impossible architecture, dreamlike atmosphere, 8k resolution, vivid lighting",
    icon: "🌌",
  },
  {
    id: "ethereal-cyberpunk",
    name: "Ethereal Cyber",
    badge: "Neon & Astral Glow",
    description: "Luminescent neon mist, cybernetic stardust, glowing holographic flora",
    promptSuffix: "ethereal cyberpunk dreamscape, luminescent neon fog, bioluminescent flora, prismatic light refractions, intricate octane render, highly detailed, trending on ArtStation",
    icon: "⚡",
  },
  {
    id: "studio-ghibli",
    name: "Anime Dream",
    badge: "Ghibli & Makoto Shinkai",
    description: "Soft painted skies, nostalgic warmth, glowing clouds, and tranquil wonder",
    promptSuffix: "Studio Ghibli aesthetic, Makoto Shinkai sky, lush vibrant watercolor painting, serene nostalgia, soft golden hour sunlight, majestic clouds, intricate hand-painted anime background",
    icon: "🍃",
  },
  {
    id: "dark-fantasy",
    name: "Dark Fantasy",
    badge: "Gothic & Eldritch",
    description: "Haunting moonlit ruins, celestial monoliths, twilight mist and obsidian spires",
    promptSuffix: "dark fantasy masterpiece, gothic ethereal atmosphere, moonlit mist, ancient celestial ruins, dramatic volumetric lighting, cinematic composition, dark romanticism",
    icon: "🔮",
  },
  {
    id: "cosmic-watercolor",
    name: "Cosmic Watercolor",
    badge: "Fluid & Stardust",
    description: "Splashes of iridescent starlight, fluid watercolor gradients, dreamy paper textures",
    promptSuffix: "ethereal fluid watercolor and gold leaf paint, galaxy stardust bleeding into canvas, splash art, soft paper texture, expressive brushstrokes, dreamy pastel celestial colors",
    icon: "🎨",
  },
  {
    id: "astral-renaissance",
    name: "Astral Renaissance",
    badge: "Oil on Canvas & Myth",
    description: "Classical renaissance oil painting blended with cosmic nebula and angel wings",
    promptSuffix: "classical Renaissance oil painting with celestial nebulae, dramatic chiaroscuro lighting, intricate golden details, Caravaggio and Rembrandt style, heavenly radiance, museum quality",
    icon: "🏛️",
  },
];

export interface DreamMood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  lightingHint: string;
}

export const DREAM_MOODS: DreamMood[] = [
  { id: "mystical", name: "Mystical", emoji: "✨", color: "text-purple-400 border-purple-500/30 bg-purple-500/10", lightingHint: "luminescent purple aura, mystical glow" },
  { id: "euphoric", name: "Euphoric & Peaceful", emoji: "🕊️", color: "text-amber-300 border-amber-500/30 bg-amber-500/10", lightingHint: "warm golden sunbeams, heavenly dawn light" },
  { id: "nostalgic", name: "Melancholic Nostalgia", emoji: "🌊", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10", lightingHint: "twilight indigo tones, quiet ambient blue hour" },
  { id: "lucid", name: "Lucid Hyper-real", emoji: "👁️", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", lightingHint: "crystal-clear illumination, razor sharp reflections" },
  { id: "eerie", name: "Eldritch Mystery", emoji: "🌑", color: "text-rose-400 border-rose-500/30 bg-rose-500/10", lightingHint: "deep twilight shadows, blood moon rim lighting" },
];

export const INSPIRATION_PROMPTS = [
  "I was floating across a mirror-smooth silver ocean reflecting two moons while clockwork whales swam through the sky.",
  "An ancient overgrown library suspended in zero gravity inside a glass nebula, where books opened into glowing portals.",
  "Walking through a crystalline forest made of frozen lightning bolts where the fallen leaves whispered forgotten languages.",
  "A colossal sleeping stag with antlers made of blooming sakura trees and spiral galaxies resting on a mountain peak.",
  "A city built entirely of golden stained glass floating above violet clouds during an eternal solar eclipse.",
  "A velvet labyrinth with floating antique lanterns where doors led to different eras of my childhood memory.",
  "A tea house at the edge of a black hole where the tea cups spun like spiral galaxies and time flowed backwards.",
  "Diving into a desert of glowing luminescent sand that rippled like warm liquid under a sky of aurora borealis.",
];

export interface DreamAnalysis {
  symbols: { name: string; meaning: string }[];
  dominantEmotion: string;
  jungianArchetype: string;
  subconsciousInsight: string;
}

export function analyzeDreamPsychology(prompt: string, styleName: string, moodName: string): DreamAnalysis {
  const p = prompt.toLowerCase();
  const symbols: { name: string; meaning: string }[] = [];

  if (p.includes("water") || p.includes("ocean") || p.includes("sea") || p.includes("river") || p.includes("lake")) {
    symbols.push({ name: "Water / Ocean", meaning: "Represents the depths of your emotional state and the vast unexplored unconscious mind." });
  }
  if (p.includes("fly") || p.includes("float") || p.includes("sky") || p.includes("fall")) {
    symbols.push({ name: "Flight / Elevation", meaning: "A desire for psychological freedom, rising above earthly anxieties or seeking a broader life perspective." });
  }
  if (p.includes("door") || p.includes("portal") || p.includes("house") || p.includes("room") || p.includes("stairs")) {
    symbols.push({ name: "Thresholds & Rooms", meaning: "Unopened potential, hidden facets of identity, or a major life transition you are navigating." });
  }
  if (p.includes("forest") || p.includes("tree") || p.includes("leaves") || p.includes("flower") || p.includes("garden")) {
    symbols.push({ name: "Flora & Nature", meaning: "Inner regeneration, personal growth, and reconnection with natural instincts." });
  }
  if (p.includes("star") || p.includes("moon") || p.includes("sun") || p.includes("galaxy") || p.includes("cosmic")) {
    symbols.push({ name: "Celestial Bodies", meaning: "Higher spiritual aspiration, cosmic destiny, and illumination of the subconscious path." });
  }
  if (p.includes("clock") || p.includes("time") || p.includes("mirror") || p.includes("reflection") || p.includes("glass")) {
    symbols.push({ name: "Mirrors & Clocks", meaning: "Self-examination, temporal urgency, and confronting illusions versus self-truth." });
  }
  if (p.includes("animal") || p.includes("creature") || p.includes("whale") || p.includes("stag") || p.includes("dragon") || p.includes("bird")) {
    symbols.push({ name: "Totem Animals", meaning: "Instinctual wisdom and animal guides representing repressed inner vitality." });
  }

  if (symbols.length === 0) {
    symbols.push(
      { name: "Surreal Landscape", meaning: "The unconscious mind creating a sanctuary for processing abstract daytime thoughts." },
      { name: "Astral Light", meaning: "An awakening intuition seeking clarity across unresolved life questions." }
    );
  }

  let archetype = "The Cosmic Explorer";
  if (p.includes("fight") || p.includes("run") || p.includes("escape")) archetype = "The Resilient Hero";
  else if (p.includes("book") || p.includes("library") || p.includes("wise") || p.includes("temple")) archetype = "The Sage";
  else if (p.includes("love") || p.includes("embrace") || p.includes("warmth")) archetype = "The Lover & Healer";
  else if (p.includes("child") || p.includes("play") || p.includes("magic") || p.includes("fairy")) archetype = "The Innocent Wanderer";
  else if (p.includes("shadow") || p.includes("dark") || p.includes("ruin") || p.includes("monster")) archetype = "The Shadow Alchemist";

  return {
    symbols: symbols.slice(0, 3),
    dominantEmotion: moodName || "Transcendence & Wonder",
    jungianArchetype: archetype,
    subconsciousInsight: `Your subconscious framed this dream in ${styleName.toLowerCase()} imagery to synthesize waking impressions into visionary wisdom.`,
  };
}
