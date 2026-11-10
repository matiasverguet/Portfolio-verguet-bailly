/// <reference path="../pb_data/types.d.ts" />
/* Migration 15 : « Affiches FCSM » — les 4 affiches s'affichent à la même hauteur
   (option « meme_hauteur » des sections, voir components/ProjectSection.astro).
   Les affiches n'ont pas toutes le même format : elles ne sont pas recadrées, seule leur largeur change. */

const SLUG = "affiches-fcsm";

function regler(app, valeur) {
  const record = app.findFirstRecordByData("projets", "slug", SLUG);
  const sections = JSON.parse(record.getString("sections") || "[]");
  for (const section of sections) {
    if (section.images?.length) {
      if (valeur) section.meme_hauteur = true;
      else delete section.meme_hauteur;
    }
  }
  record.set("sections", sections);
  app.save(record);
}

migrate(
  (app) => regler(app, true),
  (app) => regler(app, false),
);
