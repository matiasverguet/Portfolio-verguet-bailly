// Données de SECOURS, utilisées seulement si PocketBase est éteint (voir src/lib/pocketbase.js).
// Les vraies données sont dans PocketBase : http://127.0.0.1:8090/_/
// Même forme que les projets venant de PocketBase, avec le strict minimum.
const base = { sous_titre: "", logo_outil: "", contexte: "", objectif: "", role: "", outils: "", couverture: null, sections: [] };

export const projets = [
  { ...base, num: "01", titre: "Identité visuelle & maquettage", categorie: "UI/UX", tags: ["Branding", "UI", "2025"], slug: "chorus-symphonia", image: "/img/chorus.webp" },
  { ...base, num: "02", titre: "Design d'affiche", categorie: "Affiche / Édition", tags: ["Affiche", "Édition", "2025"], slug: "affiches", image: "/img/affiches.webp" },
  { ...base, num: "03", titre: "Identité visuelle", categorie: "Graphisme / Branding", tags: ["Branding", "Print", "2025"], slug: "la-cimade", image: "/img/cimade.webp" },
];
