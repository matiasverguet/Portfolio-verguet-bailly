/// <reference path="../pb_data/types.d.ts" />
/* Migration 16 : « Affiches FCSM » — les 4 affiches sont remplacées par leur version
   au même format (story 9:19,5), et l'éventail de la carte est refait avec elles.
   Fichiers : pocketbase/medias/affiches-fcsm/ (mêmes noms qu'avant). */

const SLUG = "affiches-fcsm";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);
const galerie = ["matchday-stade", "matchday-celebration", "joueur-du-mois", "maillot-rose"];

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    record.set("visuel_carte", fichier("eventail"));
    record.set("couverture", fichier("eventail"));
    // La nouvelle galerie remplace l'ancienne (PocketBase supprime les anciens fichiers)
    record.set("galerie", galerie.map(fichier));
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : les images se changent dans l'interface de PocketBase.
  },
);
