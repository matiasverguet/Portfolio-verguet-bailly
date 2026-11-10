/// <reference path="../pb_data/types.d.ts" />
/* Migration 13 : « Chaleur en ville » — plusieurs boutons par section (champ « liens »).
   Liens repris du site publié : https://sae303-verguet-deroo.netlify.app/
   - section « Le défi et la question » : la page du défi Open Data University ;
   - section « Une méthode vérifiable » : le site, le notebook Observable, le code sur GitHub
     et la réutilisation publiée sur data.gouv.fr. */

const SLUG = "chaleur-en-ville";

const liensParSection = {
  "Le défi et la question": [
    { texte: "Le défi sur data.gouv.fr", url: "https://defis.data.gouv.fr/defis/prevention-des-risques-a-bordeaux-metropole" },
  ],
  "Une méthode vérifiable": [
    { texte: "Voir le site", url: "https://sae303-verguet-deroo.netlify.app/" },
    { texte: "Notebook Observable", url: "https://observablehq.com/@mmi-montbeliard/sae-303-gr-02" },
    { texte: "Code sur GitHub", url: "https://github.com/matiasverguet/SAE_303_Verguet-Bailly_Deroo" },
    { texte: "Réutilisation data.gouv.fr", url: "https://www.data.gouv.fr/reuses/chaleur-en-ville-qui-vit-dans-les-ilots-de-chaleur-de-bordeaux-metropole" },
  ],
};

migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    const sections = JSON.parse(record.getString("sections") || "[]");

    for (const section of sections) {
      const liens = liensParSection[section.titre];
      if (liens) {
        section.liens = liens;
        delete section.lien; // remplacé par « liens »
      }
    }

    record.set("sections", sections);
    app.save(record);
  },
  (app) => {
    // Retour en arrière : un seul bouton « Voir le site », comme avant
    const record = app.findFirstRecordByData("projets", "slug", SLUG);
    const sections = JSON.parse(record.getString("sections") || "[]");
    for (const section of sections) {
      if (section.titre === "Une méthode vérifiable") section.lien = { texte: "Voir le site", url: "https://sae303-verguet-deroo.netlify.app/" };
      delete section.liens;
    }
    record.set("sections", sections);
    app.save(record);
  },
);
