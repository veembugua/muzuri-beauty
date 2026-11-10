import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon-96x96.png",
        "favicon.ico",
        "apple-touch-icon.png",
        "safari-pinned-tab.svg",
      ],
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Muzuri Beauty",
        short_name: "Muzuri",
        description: "If she wears Muzuri, she knows ball♥️",
        theme_color: "#e11d48",
        background_color: "#fefce8",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/web-app-manifest-192x192.png", // ✅ Updated to match your actual file
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/web-app-manifest-512x512.png", // ✅ Updated to match your actual file
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
