import { useState, useEffect, useCallback } from "react";
import { DREAM_STYLES, DREAM_MOODS, analyzeDreamPsychology, type DreamAnalysis } from "@/lib/utils";

export interface DreamRecord {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  styleId: string;
  styleName: string;
  moodId: string;
  moodName: string;
  imageUrl: string;
  createdAt: number;
  analysis: DreamAnalysis;
}

export interface DreamSettings {
  apiKey?: string;
  aspectRatio: "1:1" | "16:9" | "9:16";
  modelEngine: "neural-free" | "openai-dalle3";
  soundEffects: boolean;
}

const STORAGE_KEY = "ai_dream_visualizer_records_v1";
const SETTINGS_KEY = "ai_dream_visualizer_settings_v1";

const DEFAULT_SETTINGS: DreamSettings = {
  aspectRatio: "1:1",
  modelEngine: "neural-free",
  soundEffects: true,
};

export function useDreamVisualizer() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState<string>("Initializing neural link...");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DreamRecord | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [history, setHistory] = useState<DreamRecord[]>([]);
  const [settings, setSettings] = useState<DreamSettings>(DEFAULT_SETTINGS);

  // Load history & settings from localStorage
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) });
      }
    } catch (e) {
      console.error("Failed to load local dream history", e);
    }
  }, []);

  const saveSettings = useCallback((newSettings: Partial<DreamSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to persist settings", e);
      }
      return updated;
    });
  }, []);

  const deleteDream = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to persist history deletion", e);
      }
      return updated;
    });
    if (result?.id === id) {
      setResult(null);
    }
  }, [result]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  }, []);

  const generateDream = async (prompt: string, styleId = "surrealism", moodId = "mystical") => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setProgress(15);
    setGenerationPhase("Decoding subconscious symbols...");

    const selectedStyle = DREAM_STYLES.find((s) => s.id === styleId) || DREAM_STYLES[0];
    const selectedMood = DREAM_MOODS.find((m) => m.id === moodId) || DREAM_MOODS[0];

    const enhancedPrompt = `${prompt.trim()}. ${selectedMood.lightingHint}, ${selectedStyle.promptSuffix}`;
    const analysis = analyzeDreamPsychology(prompt, selectedStyle.name, selectedMood.name);

    try {
      // Step 2 Phase
      const timer1 = setTimeout(() => {
        setProgress(40);
        setGenerationPhase("Channeling ethereal starlight and geometries...");
      }, 1000);

      const timer2 = setTimeout(() => {
        setProgress(75);
        setGenerationPhase("Painting dreamscape with neural brushstrokes...");
      }, 2400);

      let finalImageUrl = "";

      if (settings.modelEngine === "openai-dalle3" && settings.apiKey) {
        // OpenAI DALL-E 3 direct generation
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${settings.apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `OpenAI error: ${response.statusText}`);
        }

        const data = await response.json();
        finalImageUrl = data.data?.[0]?.url || "";
      } else {
        // High-Quality Instant Neural Generation via Pollinations AI
        const seed = Math.floor(Math.random() * 1000000);
        let width = 1024;
        let height = 1024;
        if (settings.aspectRatio === "16:9") {
          width = 1280;
          height = 720;
        } else if (settings.aspectRatio === "9:16") {
          width = 720;
          height = 1280;
        }

        const encodedPrompt = encodeURIComponent(enhancedPrompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true&model=flux`;

        // Preload image to ensure it's rendered and cached before revealing
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            finalImageUrl = imageUrl;
            resolve();
          };
          img.onerror = () => {
            // Fallback to standard turbo model if flux times out
            const fallbackUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=turbo`;
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              finalImageUrl = fallbackUrl;
              resolve();
            };
            fallbackImg.onerror = () => reject(new Error("Unable to synthesize dream image. Please check your internet connection and try again."));
            fallbackImg.src = fallbackUrl;
          };
          img.src = imageUrl;
        });
      }

      clearTimeout(timer1);
      clearTimeout(timer2);

      setProgress(100);
      setGenerationPhase("Dream materialized successfully!");

      const record: DreamRecord = {
        id: `dream_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        prompt: prompt.trim(),
        enhancedPrompt,
        styleId: selectedStyle.id,
        styleName: selectedStyle.name,
        moodId: selectedMood.id,
        moodName: selectedMood.name,
        imageUrl: finalImageUrl,
        createdAt: Date.now(),
        analysis,
      };

      setResult(record);

      // Persist to history
      setHistory((prev) => {
        const updated = [record, ...prev.slice(0, 19)]; // keep latest 20 dreams
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save dream to history", e);
        }
        return updated;
      });
    } catch (err: any) {
      console.error("Dream generation error", err);
      setError({ message: err.message || "Failed to manifest dream. Please try again." });
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return {
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
  };
}
