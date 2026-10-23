// Configuration Astro : on branche Tailwind CSS (v4) via son plugin Vite
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Images distantes autorisées : celles de PocketBase (serveur local, port 8090).
  // Astro les télécharge et les optimise à la construction du site.
  image: {
    remotePatterns: [{ protocol: "http", hostname: "127.0.0.1", port: "8090" }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
