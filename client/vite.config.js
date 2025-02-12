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
            // Split MUI into smaller chunks
            "vendor-mui-core": ["@mui/material/styles", "@mui/material/colors"],
            "vendor-mui-base": ["@mui/material/Button", "@mui/material/Box", "@mui/material/Typography"],
            "vendor-mui-icons": ["@mui/icons-material"],
            "vendor-mui-rest": ["@mui/material"],

            // Core vendor dependencies
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-redux": ["redux", "react-redux", "@reduxjs/toolkit"],
            "vendor-core": ["axios", "lodash"],

            // Split features by domain
            "feature-scanner": ["react-qr-reader"],
          },
          // Optimize chunk distribution
          chunkFileNames: chunkInfo => {
            const name = chunkInfo.name;
            if (name.includes("vendor")) {
              return "vendor/[name]-[hash].js";
            }
            if (name.includes("feature")) {
              return "features/[name]-[hash].js";
            }
            return "chunks/[name]-[hash].js";
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
        },
      },
      // Add source map for production debugging
      sourcemap: mode === "development",
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize dependencies pre-bundling
      optimizeDeps: {
        include: ["react", "react-dom", "react-router-dom", "@mui/material", "@mui/icons-material"],
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
