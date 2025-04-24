import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import UnoCSS from "unocss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "favicons/favicon.ico",
        "favicons/apple-touch-icon.png",
        "favicons/pwa-192x192.png",
        "favicons/pwa-512x512.png",
      ],
      manifest: {
        name: "DutyDays",
        short_name: "DutyDays",
        description: "Приложение для управления дежурствами",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/favicons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
            },
          },
          // Кэширование запросов к Firestore
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "firestore-data-cache",
              expiration: {
                maxEntries: 50, // Максимум 50 записей в кэше
                maxAgeSeconds: 30 * 24 * 60 * 60, // Хранить 30 дней
              },
              cacheableResponse: {
                statuses: [0, 200], // Кэшировать успешные ответы
              },
            },
          },
          // Кэширование запросов к Identity Toolkit (Auth)
          {
            urlPattern: /^https:\/\/identitytoolkit\.googleapis\.com\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "auth-data-cache",
              expiration: {
                maxEntries: 20, // Максимум 20 записей в кэше
                maxAgeSeconds: 7 * 24 * 60 * 60, // Хранить 7 дней
              },
              cacheableResponse: {
                statuses: [0, 200], // Кэшировать успешные ответы
              },
            },
          },
        ],
      },
    }),
  ],
});