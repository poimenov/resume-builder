import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const base = "/resume-builder/"; // Замените на название вашего репозитория

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      manifest: {
        name: "Resume Builder",
        short_name: "ResumeBuilder",
        description: "Create professional resumes",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: `${base}index.html`,
        scope: base,
        icons: [
          {
            src: `${base}icon-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${base}icon-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: base,
});
