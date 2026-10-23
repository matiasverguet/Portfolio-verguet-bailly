/// <reference path="../pb_data/types.d.ts" />
/* Migration 1 : crée la collection « projets ».
   PocketBase exécute automatiquement les fichiers de pb_migrations au démarrage
   (une seule fois chacun). Ainsi, la structure de la base est écrite dans le code
   et versionnée sur GitHub, au lieu d'être cliquée à la main dans l'interface. */
migrate(
  (app) => {
    const images = { maxSize: 5242880, mimeTypes: ["image/webp", "image/png", "image/jpeg"] }; // 5 Mo max

    const collection = new Collection({
      type: "base",
      name: "projets",
      // Règles d'accès : "" = tout le monde peut LIRE ; null = seul l'administrateur peut écrire
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: "text", name: "titre", required: true },
        // slug = morceau d'adresse de la page (/projets/la-cimade) : minuscules, chiffres et tirets
        { type: "text", name: "slug", required: true, pattern: "^[a-z0-9-]+$" },
        { type: "number", name: "ordre", onlyInt: true }, // ordre d'affichage (01, 02, 03…)
        { type: "text", name: "sous_titre" },
        { type: "text", name: "categorie" }, // ex. « UI/UX », affichée entre crochets
        { type: "json", name: "tags" }, // ex. ["Branding", "UI", "2025"]
        { type: "text", name: "contexte", max: 1000 },
        { type: "text", name: "objectif", max: 1000 },
        { type: "text", name: "role", max: 1000 },
        { type: "text", name: "outils", max: 1000 },
        { type: "file", name: "visuel_carte", maxSelect: 1, ...images }, // visuel qui sort du dossier
        { type: "file", name: "couverture", maxSelect: 1, ...images }, // grande image en haut de la page
        { type: "file", name: "galerie", maxSelect: 40, ...images }, // images utilisées dans les sections
        // sections = liste de blocs (titre, textes, images, légende, lien, couleurs, liste)
        { type: "json", name: "sections", maxSize: 200000 },
        { type: "autodate", name: "created", onCreate: true },
        { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
      ],
      // Deux projets ne peuvent pas avoir le même slug
      indexes: ["CREATE UNIQUE INDEX `idx_projets_slug` ON `projets` (`slug`)"],
    });

    app.save(collection);
  },
  (app) => {
    // Retour en arrière : on supprime la collection
    app.delete(app.findCollectionByNameOrId("projets"));
  },
);
