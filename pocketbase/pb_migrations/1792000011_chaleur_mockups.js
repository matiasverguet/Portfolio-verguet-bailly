/// <reference path="../pb_data/types.d.ts" />
/* Migration 12 : « Chaleur en ville » — les captures brutes du site sont remplacées par des
   mises en situation (fenêtre de navigateur + téléphone, fond transparent).
   Fichiers : pocketbase/medias/chaleur-en-ville/mockup-*.webp */

const SLUG = "chaleur-en-ville";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);

// Ancien nom d'image dans les sections → nouveau visuel
const remplacements = {
  "carte-communes": "mockup-carte",
  "ma-commune": "mockup-ma-commune",
  "ages-pauvrete": "mockup-ages",
  "fiche-commune": "mockup-fiche-commune",
  methode: "mockup-methode",
};

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);

    record.set("visuel_carte", fichier("mockup-site"));
    record.set("couverture", fichier("mockup-site"));
    // La nouvelle galerie remplace l'ancienne (PocketBase supprime les anciens fichiers)
    record.set("galerie", Object.values(remplacements).map(fichier));

    const sections = JSON.parse(record.getString("sections") || "[]");
    for (const section of sections) {
      if (section.images) section.images = section.images.map((nom) => remplacements[nom] ?? nom);
    }
    record.set("sections", sections);

    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : les images se changent dans l'interface de PocketBase.
  },
);
