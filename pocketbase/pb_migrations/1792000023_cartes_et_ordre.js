/// <reference path="../pb_data/types.d.ts" />
/* Migration 24 : réglages faits à la main dans l'interface de PocketBase sur mon PC, mis en migration
   pour que le PocketBase du VPS ait exactement les mêmes données :
   - visuel de la carte de « Chorus Symphonia » (medias/chorus-symphonia/carte.webp)
   - visuel de la carte + couverture de « Design d'affiche » (medias/affiches/carte.webp)
   - ordre des projets : Affiches FCSM en premier. */

const fichier = (slug, nom) => $filesystem.fileFromPath(`medias/${slug}/${nom}.webp`);
const ordre = ["affiches-fcsm", "chorus-symphonia", "affiches", "la-cimade", "chaleur-en-ville"];

migrate(
  (app) => {
    ordre.forEach((slug, i) => {
      const record = app.findFirstRecordByData("projets", "slug", slug);
      record.set("ordre", i + 1);
      if (slug === "chorus-symphonia") record.set("visuel_carte", fichier(slug, "carte"));
      if (slug === "affiches") {
        record.set("visuel_carte", fichier(slug, "carte"));
        record.set("couverture", fichier(slug, "carte"));
      }
      app.save(record);
    });
  },
  (app) => {
    // Pas de retour en arrière automatique : ces réglages se changent dans l'interface de PocketBase.
  },
);
