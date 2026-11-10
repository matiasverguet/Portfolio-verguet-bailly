/// <reference path="../pb_data/types.d.ts" />
/* Migration 18 : « La Cimade » — logos refaits à partir des SVG finaux (icône, horizontal, vertical,
   pistes). Les SVG sont gardés dans pocketbase/medias/la-cimade/ (logo.svg, logo-horizontal.svg,
   logo-vertical.svg, pistes.svg) et exportés en WebP haute définition, parce que le site final
   télécharge et optimise les images de PocketBase à la construction (un SVG ne passerait pas).
   - logo.webp : icône · logotype.webp : version horizontale (même format, centrés, pour avoir la même hauteur)
   - declinaisons-logo.webp : horizontal / vertical / icône
   - pistes-etoile.webp : planche des pistes
   - carte.webp : icône, pour la carte du projet et la couverture */

const SLUG = "la-cimade";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);
const galerie = ["anciens-logos", "croquis", "logotype", "typographies", "supports-communication", "pistes-etoile", "logo", "declinaisons-logo"];

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    record.set("visuel_carte", fichier("carte"));
    record.set("couverture", fichier("carte"));
    record.set("galerie", galerie.map(fichier)); // remplace l'ancienne galerie (mêmes noms)
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : les images se changent dans l'interface de PocketBase.
  },
);
