import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");

  return {
    plugins: [react(), envCompatible()],
    define: {
      "process.env": JSON.stringify({
        ...env,
        NODE_ENV: mode,
      }),
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-mui": ["@mui/material", "@mui/icons-material"],
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-redux": ["redux", "react-redux", "@reduxjs/toolkit"],
            "vendor-core": ["axios", "lodash"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": "http://localhost:8080",
      },
    },
  };
});
