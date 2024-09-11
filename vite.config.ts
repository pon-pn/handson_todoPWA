import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Sakochi Todo App (PWA)",
        short_name: "Sakochi Todo",
        description: "Sakochi Todo プログレッシブ・ウェブアプリの練習",
        id: "/todo/",
        start_url: ".",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#3f51b2",
        background_color: "#efeff4",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512-mask.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
