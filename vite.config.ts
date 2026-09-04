import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Yana Travels — React SPA build (Vite).
// Dev proxy forwards /api and /uploads to the Express API server.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/VIDIO/**",
        "**/LOGO'S/**",
        "**/hero-footage/**",
        "**/*.mp4",
        "**/*.rar",
        "**/*.zip",
      ],
    },
    proxy: {
      "/api": "http://localhost:4000",
      "/uploads": "http://localhost:4000",
    },
  },
  build: {
    outDir: "dist",
  },
});
