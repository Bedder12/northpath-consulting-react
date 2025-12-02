import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// --------------------------------------------------
// FINAL CONFIG (Production safe + Dev cache-control)
// --------------------------------------------------

export default defineConfig({
  plugins: [react()],

  // Prevent browsers from caching old JS while developing
  server: {
    headers: {
      "Cache-Control": "no-store",
    },
  },

  // Build optimizations + safer caching on Vercel
  build: {
    sourcemap: false, // optional, reduces build size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
