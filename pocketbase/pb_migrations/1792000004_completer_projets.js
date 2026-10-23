/// <reference path="../pb_data/types.d.ts" />
/* Migration 5 : complète les projets.
   - La Cimade : ajoute l'image des pistes d'étoile, et la carte du logotype en bleu foncé (#1A2238).
   - Design d'affiche : textes du projet (exercice MMI de promotion du Pays de Montbéliard). */
migrate(
  (app) => {
    // ===== La Cimade =====
    const cimade = app.findFirstRecordByData("projets", "slug", "la-cimade");
    // "galerie+" = ajoute ce fichier à la galerie, sans supprimer les autres
    cimade.set("galerie+", $filesystem.fileFromPath("medias/la-cimade/pistes-etoile.webp"));
    const sectionsCimade = JSON.parse(cimade.getString("sections") || "[]");
    sectionsCimade[2].fonds = { logotype: "#1A2238" };
    cimade.set("sections", sectionsCimade);
    app.save(cimade);

    // ===== Design d'affiche =====
    const affiches = app.findFirstRecordByData("projets", "slug", "affiches");
    affiches.load({
      sous_titre: "Campagne d'affiches pour le Pays de Montbéliard — Exercice MMI",
      categorie: "Affiche / Illustration",
      contexte: "Exercice de BUT MMI : concevoir une série d'affiches pour promouvoir le Pays de Montbéliard et son patrimoine.",
      objectif: "Inventer un slogan et le décliner sur plusieurs lieux emblématiques, avec des affiches entièrement réalisées en vectoriel.",
      role: "Conception du slogan · Illustration vectorielle · Mise en page · Déclinaison de la série",
      outils: "Affinity · Illustration vectorielle",
      sections: [
        {
          titre: "Les affiches",
          mise_en_page: "texte-images",
          texte: [
            "Le slogan « … bat plus fort ici » relie trois lieux emblématiques du territoire : le temple Saint-Martin, le château des Ducs de Wurtemberg et le stade Auguste-Bonal.",
            "Chaque affiche suit la même construction : un monument illustré en vectoriel, éclairé par des faisceaux de lumière dans une nuit bleue, et un bandeau commun avec le hashtag #EspritMontbeliard qui unifie la série.",
          ],
          images: ["affiche-temple", "affiche-chateau", "affiche-stade"],
        },
        {
          titre: "Résultats & Compétences acquises",
          mise_en_page: "liste",
          liste: [
            { gras: "Concevoir une série cohérente", texte: "Décliner un même principe graphique (cadrage, lumière, bandeau) sur plusieurs sujets sans perdre l'unité." },
            { gras: "Illustration vectorielle", texte: "Dessiner des bâtiments complexes uniquement avec des formes vectorielles, pour une impression à toutes les tailles." },
            { gras: "Écrire un message", texte: "Trouver un slogan court et déclinable qui donne envie de (re)découvrir le patrimoine local." },
          ],
        },
      ],
    });
    app.save(affiches);
  },
  (app) => {
    // Pas de retour en arrière automatique : ces textes se modifient dans l'interface de PocketBase.
  },
);
