/// <reference path="../pb_data/types.d.ts" />
/* Migration 10 : « Design d'affiche » — les affiches arrivent après le texte :
   1. Le concept  2. Démarche & choix graphiques  3. Les affiches  (puis Résultats & compétences). */
migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", "affiches");
    const sections = JSON.parse(record.getString("sections") || "[]");

    const concept = sections.find((s) => s.titre === "Le concept");
    const demarche = sections.find((s) => s.titre === "Démarche & choix graphiques");
    const resultats = sections.find((s) => s.mise_en_page === "liste");

    // Le concept garde son texte mais plus ses images ; elles passent dans une section à part
    const images = concept.images;
    delete concept.images;
    const affiches = { titre: "Les affiches", mise_en_page: "images", images };

    record.set("sections", [concept, demarche, affiches, resultats]);
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : l'ordre se modifie dans l'interface de PocketBase.
  },
);
