import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
    watch: {
      usePolling: true,
      interval: 50,
      followSymlinks: false,
    },
    hmr: {
      overlay: true,
      port: 3001,
    },
  },
  optimizeDeps: {
    force: true,
  },
});
