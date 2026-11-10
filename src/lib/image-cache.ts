// Point d'entrée /_image du site en ligne, avec un cache.
// En SSR, Astro recompresse l'image PocketBase à CHAQUE visite (~1,7 s par image).
// Ici, chaque image convertie est gardée en mémoire et sur le disque (dossier cache/images/) :
// seule la toute première visite paie la conversion, ensuite l'image part tout de suite,
// même après un redémarrage du serveur.
// Quand on change une image dans PocketBase, son nom de fichier change : l'ancienne version
// en cache n'est donc plus jamais utilisée (pas de risque d'afficher une vieille image).
import type { APIRoute } from "astro";
import { GET as convertir } from "astro/assets/endpoint/generic";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DOSSIER = path.resolve(process.cwd(), "cache/images");
const memoire = new Map<string, { data: Buffer; type: string }>();
const enCours = new Map<string, Promise<{ data: Buffer; type: string } | null>>();
const MAX_MEMOIRE = 300; // nombre d'images gardées en mémoire vive

function reponse(image: { data: Buffer; type: string }) {
  return new Response(new Uint8Array(image.data), {
    headers: { "Content-Type": image.type, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

export const GET: APIRoute = async (contexte) => {
  const cle = createHash("sha1").update(new URL(contexte.request.url).search).digest("hex");

  const deja = memoire.get(cle);
  if (deja) return reponse(deja);

  // Si la même image est demandée plusieurs fois en même temps, on ne la convertit qu'une fois.
  if (!enCours.has(cle)) {
    enCours.set(
      cle,
      (async () => {
        const fichier = path.join(DOSSIER, cle);
        try {
          const [data, type] = await Promise.all([readFile(fichier), readFile(fichier + ".type", "utf8")]);
          return { data, type };
        } catch {
          // pas encore sur le disque : on la convertit
        }
        const res = await convertir(contexte);
        if (res.status !== 200) return null;
        const image = { data: Buffer.from(await res.arrayBuffer()), type: res.headers.get("Content-Type") ?? "image/webp" };
        try {
          await mkdir(DOSSIER, { recursive: true });
          await writeFile(fichier, image.data);
          await writeFile(fichier + ".type", image.type);
        } catch {
          // disque indisponible : l'image reste au moins en mémoire
        }
        return image;
      })().finally(() => enCours.delete(cle)),
    );
  }

  const image = await enCours.get(cle)!;
  if (!image) return convertir(contexte); // erreur (404, 403…) : on renvoie la réponse d'Astro telle quelle
  if (memoire.size >= MAX_MEMOIRE) memoire.delete(memoire.keys().next().value!);
  memoire.set(cle, image);
  return reponse(image);
};
