// sitemap.xml : la liste de toutes les pages pour les moteurs de recherche.
// Fabriqué à chaque demande : les projets créés dans PocketBase y apparaissent tout de suite.
import type { APIRoute } from "astro";
import { getProjets } from "../lib/pocketbase.js";

export const GET: APIRoute = async ({ site }) => {
  const projets = await getProjets();
  const chemins = ["/", "/about/", "/projets/", "/contact/", "/mentions-legales/", ...projets.map((p) => `/projets/${p.slug}/`)];
  const urls = chemins.map((chemin) => `  <url><loc>${new URL(chemin, site)}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
};
