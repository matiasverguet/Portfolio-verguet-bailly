/// <reference path="../pb_data/types.d.ts" />
/* Migration 4 : ajoute les images de chaque projet dans sa galerie (fichiers de pocketbase/medias/)
   et adapte les noms d'images de certaines sections (certains visuels regroupent plusieurs images). */

// Images de la galerie, par projet (fichiers medias/{slug}/{nom}.webp)
const galeries = {
  "chorus-symphonia": ["moodboard", "flyers", "affiche-abribus", "declinaisons-numeriques", "maquettes-mobile"],
  "la-cimade": ["anciens-logos", "croquis", "logo", "logotype", "declinaisons-logo", "typographies", "supports-communication"],
  affiches: ["affiche-temple", "affiche-chateau", "affiche-stade"],
};

// Fichier du dossier medias/ (chemin relatif au dossier pocketbase/, d'où on lance le serveur)
const fichier = (slug, nom) => $filesystem.fileFromPath(`medias/${slug}/${nom}.webp`);

migrate(
  (app) => {
    for (const [slug, noms] of Object.entries(galeries)) {
      const record = app.findFirstRecordByData("projets", "slug", slug);

      // 1. Galerie
      record.set("galerie", noms.map((nom) => fichier(slug, nom)));

      // 2. Sections : on lit le JSON, on le modifie, on le réécrit
      const sections = JSON.parse(record.getString("sections") || "[]");

      if (slug === "chorus-symphonia") {
        record.set("couverture", fichier(slug, "affiche-abribus")); // image du haut de page
        sections[2].images = ["declinaisons-numeriques"];
      }
      if (slug === "la-cimade") {
        sections[0].images = ["anciens-logos"];
        sections[3].images = ["supports-communication"];
      }
      if (slug === "affiches") {
        sections[0] = {
          titre: "Les affiches",
          mise_en_page: "texte-images",
          texte: ["À compléter : présentation de la série d'affiches, de la direction artistique et des choix graphiques."],
          images: ["affiche-temple", "affiche-chateau", "affiche-stade"],
        };
      }

      record.set("sections", sections);
      app.save(record);
    }
  },
  (app) => {
    // Retour en arrière : on vide les galeries
    for (const slug of Object.keys(galeries)) {
      const record = app.findFirstRecordByData("projets", "slug", slug);
      record.set("galerie", []);
      app.save(record);
    }
  },
);
