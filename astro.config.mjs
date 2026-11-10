// Configuration Astro : on branche Tailwind CSS (v4) via son plugin Vite
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// Adresse de PocketBase, lue dans les variables d'environnement :
// - en local : rien à faire, on utilise le serveur de mon PC (127.0.0.1:8090) ;
// - sur le VPS : variable PB_URL dans le fichier .env (https://api.verguet-bailly.fr).
const { PB_URL = "http://127.0.0.1:8090" } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const pb = new URL(PB_URL);

export default defineConfig({
  // Adresse du site en ligne (domaine Infomaniak) : sert au sitemap, au robots.txt,
  // à l'adresse canonique et à l'Open Graph.
  site: "https://verguet-bailly.fr",

  // Rendu côté serveur (SSR), comme dans les TP : Astro tourne sur le VPS (adaptateur Node, mode standalone),
  // Apache le sert en reverse proxy. Les pages lisent PocketBase à chaque visite :
  // une modification dans PocketBase apparaît sur le site sans reconstruire quoi que ce soit.
  output: "server",
  adapter: node({ mode: "standalone" }),

  // Astro est derrière Apache : on déclare le domaine public pour qu'il reconnaisse l'adresse réelle du site.
  security: {
    allowedDomains: [
      { protocol: "https", hostname: "verguet-bailly.fr" },
      { protocol: "https", hostname: "www.verguet-bailly.fr" },
    ],
  },

  // Images distantes autorisées : celles de PocketBase (en local ou sur le VPS).
  // Astro les optimise (WebP, bonne taille) au moment où elles sont demandées.
  image: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8090" },
      { protocol: pb.protocol.replace(":", ""), hostname: pb.hostname },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
