/// <reference path="../pb_data/types.d.ts" />
/* Migration 3 : remplit la collection « projets » avec mes 3 projets (textes de mes maquettes).
   Ensuite, tout se modifie dans l'interface de PocketBase (http://127.0.0.1:8090/_/).

   Les « sections » sont une liste de blocs. Chaque bloc peut contenir :
   - titre        : titre de la section (numérotée automatiquement, sauf les listes)
   - mise_en_page : "image-texte"  → images à gauche, texte à droite
                    "texte-images" → texte en haut, images en grille dessous
                    "images"       → images seules, en grille
                    "moitie"       → section sur une demi-largeur (deux à la suite = côte à côte)
                    "liste"        → liste à puces (Résultats & compétences), sans numéro
   - texte        : liste de paragraphes
   - images       : noms des images à prendre dans le champ « galerie »
                    (ex. "moodboard" → fichier moodboard.webp envoyé dans la galerie)
   - cadre        : true = chaque image est posée dans une carte blanche
   - couleurs     : couleurs de la charte (hex, rgb, cmjn)
   - images_bas   : images affichées en pleine largeur après les couleurs
   - legende, lien: texte en italique et bouton (ex. lien vers la maquette Figma)
   - liste        : éléments { gras, texte } */

const projets = [
  {
    titre: "Chorus Symphonia",
    slug: "chorus-symphonia",
    ordre: 1,
    sous_titre: "Identité visuelle & UI/UX — Projet étudiant MMI 1",
    categorie: "UI/UX",
    logo_outil: "figma",
    tags: ["Branding", "UI", "2025"],
    contexte: "Festival de musique symphonique fictif organisé à la Citadelle de Besançon.",
    objectif: "Créer une identité premium mais accessible, déclinable du print à une expérience mobile.",
    role: "Direction artistique · Identité visuelle · UI/UX · Prototypage",
    outils: "Figma · Affinity · etc.",
    visuel_carte: "../public/img/chorus.webp",
    sections: [
      {
        titre: "Recherches & Intentions",
        mise_en_page: "image-texte",
        images: ["moodboard"],
        texte: [
          "Cette direction artistique s'articule autour de trois notions : patrimoine, musique et élégance. Le bleu nocturne évoque les concerts en soirée, tandis que les tons dorés rappellent la pierre de la Citadelle et apportent un caractère prestigieux.",
          "Ces recherches m'ont conduit à associer la silhouette de la Citadelle aux courbes d'un violon, créant ainsi un langage graphique directement décliné sur l'affiche et les différents supports de communication.",
        ],
      },
      { titre: "Supports Print", mise_en_page: "images", images: ["flyers", "affiche-abribus"] },
      { titre: "Déclinaisons Numériques & Réseaux Sociaux", mise_en_page: "moitie", images: ["story", "reseaux-sociaux"] },
      { titre: "Expérience Mobile & Interface UI", mise_en_page: "moitie", images: ["maquettes-mobile"] },
      {
        legende:
          "Formats mobile pour les réseaux et parcours utilisateur mobile axé sur la découverte des artistes, les lieux du festival et le compte à rebours de l'événement.",
        lien: { texte: "Explorer la maquette Figma", url: "" },
      },
      {
        titre: "Résultats & Compétences acquises",
        mise_en_page: "liste",
        liste: [
          { gras: "Identité globale & cohérente", texte: "Déclinaison harmonieuse de la direction artistique du print (affiche, flyers) jusqu'aux supports numériques (réseaux sociaux, interface web)." },
          { gras: "Conception centrée utilisateur", texte: "Structuration d'une interface mobile ergonomique facilitant la consultation de la programmation et l'accès à la billetterie." },
          { gras: "Outils & Méthodologie", texte: "Maîtrise de Figma (composants, mise en page responsive) et préparation des assets graphiques pour le développement web." },
        ],
      },
    ],
  },
  {
    titre: "Design d'affiche",
    slug: "affiches",
    ordre: 2,
    sous_titre: "Série d'affiches — Projet étudiant",
    categorie: "Affiche / Édition",
    tags: ["Affiche", "Édition", "2025"],
    contexte: "À compléter : contexte du projet.",
    objectif: "À compléter : objectif du projet.",
    role: "À compléter : mon rôle.",
    outils: "Affinity · etc.",
    visuel_carte: "../public/img/affiches.webp",
    couverture: "../public/img/affiches.webp",
    sections: [
      {
        titre: "Les affiches",
        mise_en_page: "image-texte",
        images: ["affiche-1", "affiche-2"],
        texte: ["À compléter : présentation de la série d'affiches, de la direction artistique et des choix graphiques."],
      },
      {
        titre: "Résultats & Compétences acquises",
        mise_en_page: "liste",
        liste: [{ gras: "À compléter", texte: "compétences acquises sur ce projet." }],
      },
    ],
  },
  {
    titre: "La Cimade",
    slug: "la-cimade",
    ordre: 3,
    sous_titre: "Refonte d'identité visuelle & Stratégie de marque — Projet étudiant",
    categorie: "Graphisme / Branding",
    tags: ["Branding", "Print", "2025"],
    contexte: "Association historique (1939) de défense des droits et d'accueil des personnes réfugiées et migrantes.",
    objectif: "Moderniser une identité vieillissante et clivante (rouge/noir) pour affirmer un rôle d'accueil chaleureux, protecteur et lisible sur les supports actuels.",
    role: "Audit visuel, benchmark associatif, repositionnement graphique, création du logotype et de la charte.",
    outils: "Canva · Affinity · etc.",
    visuel_carte: "../public/img/cimade.webp",
    couverture: "../public/img/cimade.webp",
    sections: [
      {
        titre: "Audit & Problématique",
        mise_en_page: "image-texte",
        images: ["ancien-logo-rouge", "ancien-logo-blanc"],
        texte: [
          "L'analyse de l'identité d'origine a mis en évidence des freins majeurs : le contraste rouge et noir connotait une lutte agressive manquant de bienveillance pour l'accueil, tandis que les filets horizontaux alourdissaient le logo sur mobile et formats réduits. L'enjeu était de conserver l'ancrage militant historique tout en insufflant la sérénité et la clarté nécessaires à une structure d'entraide.",
        ],
      },
      {
        titre: "Recherches & Exploration du signe",
        mise_en_page: "texte-images",
        cadre: true,
        texte: [
          "L'exploration s'est orientée vers la métaphore de la boussole et de l'étoile protectrice, symbole de guide et d'espoir dans le parcours d'exil. Le travail typographique et le tracé du monogramme « C » apportent une spontanéité humaine, rompant avec la froideur institutionnelle.",
        ],
        images: ["croquis", "pistes-etoile"],
      },
      {
        titre: "Le Logotype & la Charte Graphique",
        mise_en_page: "images",
        cadre: true,
        images: ["logo", "logotype"],
        couleurs: [
          { hex: "#4363F0", rgb: "67, 99, 240", cmjn: "72, 59, 0, 6 %" },
          { hex: "#1A2238", rgb: "26, 34, 56", cmjn: "54, 39, 0, 78 %" },
          { hex: "#FFFFFF", rgb: "255, 255, 255", cmjn: "0, 0, 0, 0 %" },
        ],
        images_bas: ["declinaisons-logo", "typographies"],
      },
      {
        titre: "Déclinaisons & Supports de Communication",
        mise_en_page: "texte-images",
        texte: [
          "Déclinaison du système visuel sur des supports digitaux (posts réseaux sociaux, bannières de sensibilisation) et print (dépliants d'accueil, affiches militantes), garantissant un impact immédiat sur le terrain.",
        ],
        images: ["post-instagram", "affiche-construire", "depliant"],
      },
      {
        titre: "Résultats & Compétences acquises",
        mise_en_page: "liste",
        liste: [
          { gras: "Méthodologie de branding complet", texte: "De l'audit stratégique à la rédaction de la charte graphique et des règles d'utilisation." },
          { gras: "Sens du message & éthique", texte: "Savoir traduire des valeurs humaines et militantes sans tomber dans le misérabilisme." },
          { gras: "Déclinaison multi-supports", texte: "Adaptation d'un signe identitaire pour le print (brochures, papeterie) et le responsive web / social media." },
        ],
      },
    ],
  },
];

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("projets");

    for (const projet of projets) {
      const record = new Record(collection);
      const { visuel_carte, couverture, ...donnees } = projet;
      record.load(donnees);

      // Images déjà présentes dans le site (chemin relatif au dossier pocketbase/).
      // try/catch : si un fichier manque, le projet est quand même créé.
      try {
        if (visuel_carte) record.set("visuel_carte", $filesystem.fileFromPath(visuel_carte));
        if (couverture) record.set("couverture", $filesystem.fileFromPath(couverture));
      } catch (erreur) {
        console.log("Image introuvable pour " + projet.slug + " : " + erreur);
      }

      app.save(record);
    }
  },
  (app) => {
    // Retour en arrière : on supprime les projets créés ici
    for (const projet of projets) {
      try {
        app.delete(app.findFirstRecordByData("projets", "slug", projet.slug));
      } catch (erreur) {
        // déjà supprimé
      }
    }
  },
);
