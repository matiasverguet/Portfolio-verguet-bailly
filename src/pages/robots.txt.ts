// robots.txt généré par Astro : autorise tous les robots et indique où trouver le sitemap.
// Généré (et non écrit à la main dans public/) pour utiliser l'adresse du site de astro.config.mjs.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
