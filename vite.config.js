import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or whatever you're using
  },
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});
