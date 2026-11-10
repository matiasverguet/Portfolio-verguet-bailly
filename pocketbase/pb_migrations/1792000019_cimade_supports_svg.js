/// <reference path="../pb_data/types.d.ts" />
/* Migration 20 : « La Cimade » — nouvelles versions à partir des SVG finaux :
   - anciens-logos.webp : les deux anciens logos (anciens-logo-blanc.svg + anciens-logo-rouge.svg)
   - supports-communication.webp : publication Instagram, affiche « Construire l'avenir », dépliants
     (publication-instagram.svg, affiche.svg, depliants.svg)
   - logo.webp et logotype.webp : même format qu'avant, logo un peu plus petit dans l'image
   Les SVG sont gardés dans pocketbase/medias/la-cimade/, exportés en WebP haute définition. */

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
