import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

/**
 * Vite configuration for Tauri application
 */
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss({
  config: '/tailwind.config.mjs'
})  ],

  // Vite options for Tauri development
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // Ignore src-tauri directory during development
      ignored: ["**/src-tauri/**"],
    },
  },
}));