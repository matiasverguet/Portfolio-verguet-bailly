/// <reference path="../pb_data/types.d.ts" />
/* Migration 17 : « Affiches FCSM » — nouvelles versions de « Matchday (célébration) »
   et « Joueur du mois », et éventail de la carte refait avec elles.
   Fichiers : pocketbase/medias/affiches-fcsm/ (mêmes noms qu'avant). */

const SLUG = "affiches-fcsm";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);
const galerie = ["matchday-stade", "matchday-celebration", "joueur-du-mois", "maillot-rose"];

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    record.set("visuel_carte", fichier("eventail"));
    record.set("couverture", fichier("eventail"));
    record.set("galerie", galerie.map(fichier)); // remplace l'ancienne galerie
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : les images se changent dans l'interface de PocketBase.
  },
);
