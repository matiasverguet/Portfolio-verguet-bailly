/// <reference path="../pb_data/types.d.ts" />
/* Migration 8 : relecture des textes des projets (fautes, formulations) et lien vers la maquette Figma
   de Chorus Symphonia (prototype de la SAÉ 105). */
migrate(
  (app) => {
    // Remplace un texte dans toutes les chaînes d'une section (titre, paragraphes, légende, listes)
    const remplacer = (valeur, avant, apres) =>
      JSON.parse(JSON.stringify(valeur).split(avant).join(apres));

    // ===== Chorus Symphonia =====
    const chorus = app.findFirstRecordByData("projets", "slug", "chorus-symphonia");
    chorus.set("sous_titre", "Identité visuelle & UI/UX — Projet étudiant, BUT MMI 1re année");
    chorus.set("outils", "Figma · Affinity");
    let sections = JSON.parse(chorus.getString("sections") || "[]");
    sections = remplacer(sections, "Formats mobile pour", "Formats mobiles pour");
    for (const section of sections) {
      if (section.lien) {
        section.lien.url =
          "https://www.figma.com/proto/usq1bz0cVckOY43GVjOnvh/SAE-105?node-id=1-920&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A920";
      }
    }
    chorus.set("sections", sections);
    app.save(chorus);

    // ===== La Cimade =====
    const cimade = app.findFirstRecordByData("projets", "slug", "la-cimade");
    cimade.set("outils", "Canva · Affinity");
    let sectionsCimade = JSON.parse(cimade.getString("sections") || "[]");
    sectionsCimade = remplacer(sectionsCimade, "Méthodologie de branding complet", "Méthodologie de branding complète");
    sectionsCimade = remplacer(sectionsCimade, "supports digitaux", "supports numériques");
    sectionsCimade = remplacer(sectionsCimade, "le responsive web / social media", "le web responsive et les réseaux sociaux");
    cimade.set("sections", sectionsCimade);
    app.save(cimade);
  },
  (app) => {
    // Pas de retour en arrière automatique : ces textes se modifient dans l'interface de PocketBase.
  },
);
