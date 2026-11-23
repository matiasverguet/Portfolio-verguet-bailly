// Configuration Astro : on branche Tailwind CSS (v4) via son plugin Vite
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Adresse du site en ligne (domaine Infomaniak) : sert au sitemap, au robots.txt,
  // à l'adresse canonique et à l'Open Graph.
  site: "https://verguet-bailly.fr",

  // Site statique : toutes les pages sont fabriquées en HTML au moment de « npm run build »
  // (dossier dist/), puis publiées telles quelles sur Netlify. Pas de serveur ni de base
  // de données en ligne : les projets viennent de src/data/projets.json.
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
