/// <reference path="../pb_data/types.d.ts" />
/* Migration 19 : « La Cimade » — logo (icône) et logotype (horizontal) recadrés au même format
   (2000 × 1591, logo centré) pour qu'ils aient la même hauteur côte à côte, comme avant.
   Fichiers : pocketbase/medias/la-cimade/ (mêmes noms). */

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
