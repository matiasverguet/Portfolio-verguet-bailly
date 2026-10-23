// =========================================================
// Accès à PocketBase depuis Astro
// Les pages appellent getProjets() dans leur partie serveur (entre les ---) :
// - en développement (npm run dev), les données sont relues à chaque chargement de page ;
// - à la construction (npm run build), elles sont lues une fois et figées dans le HTML.
// On utilise simplement fetch() sur l'API REST de PocketBase (pas besoin de bibliothèque).
// =========================================================
import { projets as projetsSecours } from "../data/projets.js";

// Adresse de PocketBase : variable d'environnement PB_URL, sinon le serveur local
export const PB_URL = import.meta.env.PB_URL ?? "http://127.0.0.1:8090";

// Adresse d'un fichier stocké par PocketBase : /api/files/{collection}/{id}/{fichier}
function urlFichier(record, fichier) {
  return fichier ? `${PB_URL}/api/files/${record.collectionId}/${record.id}/${fichier}` : null;
}

// Retrouve une image de la galerie à partir de son nom.
// PocketBase renomme les fichiers envoyés : "affiche-abribus.webp" devient
// "affiche_abribus_x8k2m0q1zt.webp" (tirets → _, puis _ + 10 caractères au hasard).
// On compare donc le nom demandé à chaque fichier, sans ce suffixe.
function trouverDansGalerie(record, nom) {
  const cle = nom.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const fichier = (record.galerie ?? []).find((f) => f.replace(/_[a-z0-9]{10}\.\w+$/i, "") === cle);
  return fichier ? urlFichier(record, fichier) : null;
}

// Transforme un enregistrement PocketBase en objet simple, prêt pour les composants
function normaliser(record) {
  // Une image de section = son nom (pour l'emplacement vide si elle manque) + son adresse
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
    image: urlFichier(record, record.visuel_carte), // visuel de la carte (dossier)
    couverture: urlFichier(record, record.couverture),
    sections: (record.sections ?? []).map((section) => ({
      ...section,
      images: (section.images ?? []).map(image),
      images_bas: (section.images_bas ?? []).map(image),
    })),
  };
}

// Tous les projets, triés par « ordre ».
// Si PocketBase est éteint, on utilise les données de secours (data/projets.js)
// pour que le site s'affiche quand même.
export async function getProjets() {
  try {
    const reponse = await fetch(`${PB_URL}/api/collections/projets/records?sort=ordre&perPage=200`);
    if (!reponse.ok) throw new Error(`réponse ${reponse.status}`);
    const donnees = await reponse.json();
    return donnees.items.map(normaliser);
  } catch (erreur) {
    console.warn(`[PocketBase] indisponible (${erreur.message}) : données de secours utilisées.`);
    return projetsSecours;
  }
}
