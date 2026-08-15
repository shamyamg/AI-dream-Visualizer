
# 🌌 AI Dream Visualizer

An AI-powered web studio that translates subconscious dreams, night visions, and surreal thoughts into high-definition digital art, complete with Jungian psychological interpretation and an ethereal ambient theta soundscape.

[![Live Demo](https://img.shields.io/badge/Live%20Website-ai--dream--visualise.onrender.com-6366f1?style=for-the-badge&logo=render&logoColor=white)](https://ai-dream-visualise.onrender.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-dream-visualizer.vercel.app/)

👉 **Live App**: 
🌐 https://ai-dream-visualizer.vercel.app

![AI Dream Visualizer](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop)

---

## ✨ Features

- 🧠 **Subconscious Vision Translation**: Transforms text dream descriptions into vivid, surreal images using multi-layer prompt engineering and neural diffusion models.
- 🎨 **Artistic Dream Filters**: Select from 6 curated aesthetic styles:
  - *Surrealism* (Salvador Dalí & René Magritte)
  - *Ethereal Cyberpunk* (Bioluminescent neon mist & holographic flora)
  - *Anime Dream* (Studio Ghibli & Makoto Shinkai watercolor)
  - *Dark Fantasy* (Moonlit gothic ruins & eldritch spires)
  - *Cosmic Watercolor* (Fluid iridescent stardust on textured paper)
  - *Astral Renaissance* (Chiaroscuro oil painting blended with celestial nebulae)
- 🕊️ **Atmospheric Mood Controls**: Infuse dreams with *Mystical*, *Euphoric*, *Melancholic*, *Lucid*, or *Eldritch* lighting.
- 🔮 **Subconscious Archetype Interpretation**: Automatically extracts psychological symbolism and Jungian archetypes from your dream narrative.
- 🎵 **Ethereal Ambient Soundscape**: Built-in procedural theta wave frequency synthesizer using Web Audio API for immersive dreaming.
- 🗄️ **Private Dream Journal Vault**: Automatically archives all manifested dreams locally in your browser with export, download, and copy features.
- ⚡ **Zero Setup Required**: Ready-to-use instant free neural engine + optional custom OpenAI DALL-E 3 key support in settings.

---

## 🚀 One-Click Deployments

### Deploy on Vercel
1. Go to [Vercel](https://vercel.com/new) and import this repository (`shamyamg/AI-dream-Visualizer`).
2. Vercel automatically detects the Vite framework and settings from `vercel.json`.
3. Click **Deploy**.

### Deploy on Render (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Web Service**.
2. Connect this repository (`shamyamg/AI-dream-Visualizer`).
3. Set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. Click **Create Web Service**.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
├── dist/                  # Production build output
├── src/
│   ├── components/        # UI components (DreamForm, DreamResult, LoadingState, etc.)
│   ├── hooks/             # Custom hooks (useDreamVisualizer)
│   ├── lib/               # Utility functions, styles, and dream analyzer
│   ├── pages/             # Pages (Home, NotFound)
│   ├── App.tsx            # Main app shell & navigation
│   ├── index.css          # Tailwind CSS styles & variables
│   └── main.tsx           # Application entrypoint
├── server.js              # Production Express Node.js web server
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── render.yaml            # Render deployment blueprint
├── vercel.json            # Vercel SPA configuration
└── vite.config.ts         # Vite build configuration
```

---

## 📄 License
MIT © Shamya
