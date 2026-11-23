// =========================================================
// Projets du portfolio (site statique)
// Le contenu vient de src/data/projets.json et les images de src/assets/projets/{id}/,
// exportés une fois depuis PocketBase (scripts/exporter-pocketbase.mjs).
// Tout est lu au moment de construire le site : les pages sont du HTML fixe,
// sans serveur ni base de données en ligne.
// =========================================================
import donnees from "../data/projets.json";

// Toutes les images des projets, importées d'un coup par Vite.
// Chaque valeur est une « ImageMetadata » qu'Astro sait optimiser (WebP, bonne taille).
const images = import.meta.glob("../assets/projets/*/*.{webp,png,jpg,jpeg}", { eager: true, import: "default" });

// Image d'un projet à partir de son nom de fichier (ou null si elle n'existe pas)
function fichier(record, nom) {
  return (nom && images[`../assets/projets/${record.id}/${nom}`]) || null;
}

// Chemin sur le disque (pour l'image de partage, fabriquée avec sharp)
function chemin(record, nom) {
  return nom ? `src/assets/projets/${record.id}/${nom}` : null;
}

// Retrouve une image de la galerie à partir de son nom.
// PocketBase avait renommé les fichiers : "affiche-abribus.webp" est devenu
// "affiche_abribus_x8k2m0q1zt.webp" (tirets → _, puis _ + 10 caractères au hasard).
// On compare donc le nom demandé à chaque fichier, sans ce suffixe.
function trouverDansGalerie(record, nom) {
  const cle = nom.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const trouve = (record.galerie ?? []).find((f) => f.replace(/_[a-z0-9]{10}\.\w+$/i, "") === cle);
  return fichier(record, trouve);
}

// Transforme un projet du JSON en objet simple, prêt pour les composants
function normaliser(record) {
  // Une image de section = son nom (pour l'emplacement vide si elle manque) + l'image
  const image = (nom) => ({ nom, url: trouverDansGalerie(record, nom) });

  return {
    slug: record.slug,
    titre: record.titre,
    num: String(record.ordre ?? 0).padStart(2, "0"), // 1 → "01"
    sous_titre: record.sous_titre,
    categorie: record.categorie,
    logo_outil: record.logo_outil,
    tags: record.tags ?? [],
    contexte: record.contexte,
    objectif: record.objectif,
    role: record.role,
    outils: record.outils,
    image: fichier(record, record.visuel_carte), // visuel de la carte (dossier)
    couverture: fichier(record, record.couverture),
    visuelPartage: chemin(record, record.visuel_carte ?? record.couverture),
    sections: (record.sections ?? []).map((section) => ({
      ...section,
      images: (section.images ?? []).map(image),
      images_bas: (section.images_bas ?? []).map(image),
    })),
  };
}

// Tous les projets, triés par « ordre »
const projets = [...donnees].sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0)).map(normaliser);

export function getProjets() {
  return projets;
}
