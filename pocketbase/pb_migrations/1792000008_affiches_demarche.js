/// <reference path="../pb_data/types.d.ts" />
/* Migration 9 : projet « Design d'affiche » — outil réel (Affinity) et démarche graphique,
   rédigée à partir des choix visibles dans les affiches (cadrage, lumière, palette, bandeau). */
migrate(
  (app) => {
    const record = app.findFirstRecordByData("projets", "slug", "affiches");
    record.load({
      outils: "Affinity",
      role: "Conception du slogan · Illustration vectorielle · Mise en page · Déclinaison de la série",
      sections: [
        {
          titre: "Le concept",
          mise_en_page: "texte-images",
          texte: [
            "Le slogan « … bat plus fort ici » part d'une idée simple : chaque lieu emblématique du Pays de Montbéliard est un cœur qui fait vivre le territoire. La formule se décline d'une affiche à l'autre en changeant seulement son début, ce qui crée une série immédiatement reconnaissable.",
            "J'ai choisi trois lieux qui racontent trois facettes du territoire : le temple Saint-Martin pour le patrimoine religieux, le château des Ducs de Wurtemberg pour l'histoire, et le stade Auguste-Bonal pour le sport et la ferveur populaire.",
          ],
          images: ["affiche-temple", "affiche-chateau", "affiche-stade"],
        },
        {
          titre: "Démarche & choix graphiques",
          mise_en_page: "texte-images",
          texte: [
            "Contrainte de l'exercice : tout devait être réalisé en vectoriel. J'ai donc reconstruit chaque monument en aplats de couleur sur Affinity, en simplifiant les volumes (façades, toitures, tours) pour garder une lecture claire même de loin, tout en conservant les détails qui rendent chaque lieu identifiable.",
            "Pour unifier la série, les trois affiches partagent la même construction : le monument au centre, mis en scène de nuit et éclairé par des faisceaux de lumière qui convergent vers lui comme des projecteurs, un pictogramme du lieu en haut, le slogan en capitales blanches, puis un bandeau commun avec les logos et le hashtag #EspritMontbeliard.",
            "La palette repose sur un bleu nuit commun, réchauffé par les teintes propres à chaque lieu : les fenêtres orangées du temple, la pierre beige et les toits brun-rouge du château, la pelouse verte et les tribunes bleues du stade, rappel des couleurs du FC Sochaux-Montbéliard.",
          ],
        },
        {
          titre: "Résultats & Compétences acquises",
          mise_en_page: "liste",
          liste: [
            { gras: "Concevoir une série cohérente", texte: "Décliner un même principe graphique (cadrage, lumière, bandeau) sur plusieurs sujets sans perdre l'unité." },
            { gras: "Illustration vectorielle", texte: "Dessiner des bâtiments complexes uniquement avec des formes vectorielles sur Affinity, pour une impression nette à toutes les tailles." },
            { gras: "Écrire un message", texte: "Trouver un slogan court et déclinable qui donne envie de (re)découvrir le patrimoine local." },
          ],
        },
      ],
    });
    app.save(record);
  },
  (app) => {
    // Pas de retour en arrière automatique : ces textes se modifient dans l'interface de PocketBase.
  },
);
