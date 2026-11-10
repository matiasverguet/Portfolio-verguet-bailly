/// <reference path="../pb_data/types.d.ts" />
/* Migration 14 : ajoute le projet personnel « Affiches FCSM » (4 affiches au format story
   pour le FC Sochaux-Montbéliard, réalisées de ma propre initiative).
   Images : fichiers de pocketbase/medias/affiches-fcsm/ (WebP).
   - eventail : les 4 affiches en éventail, fond transparent → visuel de la carte et couverture
   L'étiquette « Perso » affiche la mention « projet personnel » en bas de la page du projet. */

const SLUG = "affiches-fcsm";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);
const galerie = ["matchday-stade", "matchday-celebration", "joueur-du-mois", "maillot-rose"];

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("projets");
    const record = new Record(collection);

    record.load({
      titre: "Affiches FCSM",
      slug: SLUG,
      ordre: 5,
      sous_titre: "Série d'affiches au format story pour le FC Sochaux-Montbéliard — Projet personnel",
      categorie: "Affiche / Réseaux sociaux",
      tags: ["Affiche", "Perso", "2026"],
      contexte:
        "Projet personnel : une série d'affiches pour les réseaux sociaux du FC Sochaux-Montbéliard, le club de ma région, autour de l'actualité de la saison 2026-2027 de Ligue 2.",
      objectif:
        "Créer des visuels qui donnent envie de venir au stade Bonal, avec une identité forte (jaune et bleu du club) mais un traitement différent pour chaque type de publication.",
      role: "Concept · Photomontage · Typographie · Mise en page",
      outils: "Affinity",
      sections: [
        {
          titre: "Matchday : Sochaux vs Boulogne",
          mise_en_page: "texte-images",
          texte: [
            "Deux propositions pour annoncer le même match du 9 octobre 2026 au stade Auguste-Bonal. La première joue sur l'échelle : un joueur géant, poings serrés, posé au-dessus du stade vu du ciel, au milieu des usines et de la ville.",
            "La seconde mise sur l'émotion collective : une célébration de buts, encadrée par une vague jaune en pointillés, avec les logos des deux clubs en haut et le nom des équipes en grand.",
          ],
          images: ["matchday-stade", "matchday-celebration"],
        },
        {
          titre: "Joueur du mois",
          mise_en_page: "moitie",
          texte: [
            "Une affiche pour mettre en avant le joueur du mois de septembre : le nom du joueur répété en contour sur tout le fond crée une texture typographique derrière la photo.",
          ],
          images: ["joueur-du-mois"],
        },
        {
          titre: "L'histoire en rose et blanc",
          mise_en_page: "moitie",
          texte: [
            "Une affiche pour le maillot rose et blanc d'Octobre rose : la couleur de la campagne recouvre toute l'image, et le logo du club, répété en filigrane, sert de motif en bas.",
          ],
          images: ["maillot-rose"],
        },
        {
          titre: "Résultats & Compétences acquises",
          mise_en_page: "liste",
          liste: [
            { gras: "Photomontage", texte: "Détourer, intégrer et éclairer des joueurs dans un décor pour créer une image qui attire l'œil." },
            { gras: "Hiérarchie typographique", texte: "Rendre lisibles en un coup d'œil le match, la date et le lieu, sur un format vertical vu sur téléphone." },
            { gras: "Décliner une identité", texte: "Garder les codes du club (couleurs, logo) tout en changeant de traitement selon le message." },
          ],
        },
      ],
    });

    record.set("visuel_carte", fichier("eventail"));
    record.set("couverture", fichier("eventail"));
    record.set("galerie", galerie.map(fichier));

    app.save(record);
  },
  (app) => {
    // Retour en arrière : on supprime le projet
    app.delete(app.findFirstRecordByData("projets", "slug", SLUG));
  },
);
