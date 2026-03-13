// astro.config.mjs
import { defineConfig } from "astro/config";
import path from 'path';
import react from "@astrojs/react";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve("./src/components"),
        "@lib": path.resolve("./src/lib"),
        "@layouts": path.resolve("./src/layouts"),
        "@pages": path.resolve("./src/pages"),
        "@routes": path.resolve("./src/routes"),
        "@services": path.resolve("./src/services"),
        "@styles": path.resolve("./src/styles"),
        "@types": path.resolve("./src/types"),
        "@utils": path.resolve("./src/utils")
      }
    },
    server: {
      proxy: {
        "/api": "http://localhost:3000"
      }
    }
  },
  site: "https://glowingalien.com",
  integrations: [react()],
  outDir: "dist",
  publicDir: "public",
});