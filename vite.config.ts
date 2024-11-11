import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import vitetsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    vitetsConfigPaths(),
    svgr({
      include: [/\.svg$/],
    }),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: "build",
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
