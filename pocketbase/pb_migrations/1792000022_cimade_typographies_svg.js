/// <reference path="../pb_data/types.d.ts" />
/* Migration 23 : « La Cimade » — typographies.webp refaite en vectoriel (typographies.svg : Caveat + Lilita One
   vectorisées, texte net à toutes les tailles). Fichiers : pocketbase/medias/la-cimade/ (mêmes noms). */

const SLUG = "la-cimade";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);
const galerie = ["anciens-logos", "croquis", "logotype", "typographies", "supports-communication", "pistes-etoile", "logo", "declinaisons-logo"];

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    record.set("galerie", galerie.map(fichier)); // remplace l'ancienne galerie (mêmes noms)
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : les images se changent dans l'interface de PocketBase.
  },
);
