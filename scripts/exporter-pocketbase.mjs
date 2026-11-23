// Export unique du contenu de PocketBase vers le projet (passage en site statique).
// - les projets sont écrits dans src/data/projets.json ;
// - leurs images sont téléchargées dans src/assets/projets/{id du projet}/ :
//   Astro les optimise (WebP, bonne taille) au moment de construire le site.
// Usage : node scripts/exporter-pocketbase.mjs [adresse de PocketBase]
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PB = process.argv[2] ?? "https://api.verguet-bailly.fr";
const RACINE = path.resolve(import.meta.dirname, "..");

const reponse = await fetch(`${PB}/api/collections/projets/records?sort=ordre&perPage=200`);
if (!reponse.ok) throw new Error(`PocketBase a répondu ${reponse.status}`);
const { items } = await reponse.json();

// On ne garde que les champs utiles au site (pas les dates ni les infos internes de PocketBase)
const champs = ["id", "slug", "titre", "ordre", "sous_titre", "categorie", "logo_outil", "tags", "contexte", "objectif", "role", "outils", "visuel_carte", "couverture", "galerie", "sections"];
const projets = items.map((r) => Object.fromEntries(champs.map((c) => [c, r[c] ?? null])));
await writeFile(path.join(RACINE, "src/data/projets.json"), JSON.stringify(projets, null, 2) + "\n");

for (const r of items) {
  const dossier = path.join(RACINE, "src/assets/projets", r.id);
  await mkdir(dossier, { recursive: true });
  const fichiers = [...new Set([r.visuel_carte, r.couverture, ...(r.galerie ?? [])].filter(Boolean))];
  for (const f of fichiers) {
    const img = await fetch(`${PB}/api/files/${r.collectionId}/${r.id}/${f}`);
    if (!img.ok) { console.warn("introuvable :", r.slug, f); continue; }
    await writeFile(path.join(dossier, f), Buffer.from(await img.arrayBuffer()));
  }
  console.log(r.slug, fichiers.length, "fichiers");
}
