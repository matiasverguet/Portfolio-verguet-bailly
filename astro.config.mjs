// Configuration Astro : on branche Tailwind CSS (v4) via son plugin Vite
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Adresse de PocketBase, lue dans les variables d'environnement :
// - en local : rien à faire, on utilise le serveur de mon PC (127.0.0.1:8090) ;
// - sur Netlify : variable PB_URL = adresse du PocketBase hébergé sur le VPS de l'IUT
//   (réglée dans Netlify → Site configuration → Environment variables).
const { PB_URL = "http://127.0.0.1:8090" } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const pb = new URL(PB_URL);

export default defineConfig({
  // Adresse du site en ligne (domaine Infomaniak) : sert au sitemap, au robots.txt,
  // à l'adresse canonique et à l'Open Graph.
  site: "https://verguet-bailly.fr",

  // Génère sitemap-index.xml à la construction : la liste de toutes les pages pour les moteurs de recherche
  // (les pages projet créées depuis PocketBase y sont incluses automatiquement).
  integrations: [sitemap()],

  // Images distantes autorisées : celles de PocketBase (en local ou sur le VPS).
  // Astro les télécharge et les optimise à la construction du site : le site publié sur Netlify
  // contient ses propres copies des images et ne dépend pas du VPS pour les afficher.
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
