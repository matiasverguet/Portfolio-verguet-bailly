/// <reference path="../pb_data/types.d.ts" />
/* Migration 11 : ajoute le projet « Chaleur en ville » (SAÉ 303, data visualisation en binôme).
   Textes, chiffres et captures repris du site publié : https://sae303-verguet-deroo.netlify.app/
   Images : fichiers de pocketbase/medias/chaleur-en-ville/ (mises en situation navigateur + téléphone, en WebP). */

const SLUG = "chaleur-en-ville";
const fichier = (nom) => $filesystem.fileFromPath(`medias/${SLUG}/${nom}.webp`);

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("projets");
    const record = new Record(collection);

    record.load({
      titre: "Chaleur en ville",
      slug: SLUG,
      ordre: 4,
      sous_titre: "Data visualisation & site Astro — SAÉ 303, BUT MMI 2e année, en binôme avec Valentin Deroo",
      categorie: "Data visualisation",
      tags: ["Dataviz", "Web", "2026"],
      contexte:
        "SAÉ 303 : répondre en binôme à un défi de l'Open Data University (association Latitudes) avec des données ouvertes réelles. Nous avons choisi le défi « Prévention des risques à Bordeaux Métropole ».",
      objectif:
        "Faire comprendre à un habitant de la métropole si sa commune est exposée aux îlots de chaleur, et si les plus fragiles le sont davantage, avec un récit en 4 temps et une méthode vérifiable.",
      role: "Exploration et nettoyage des données · Visualisations · Intégration du site · Rédaction du récit et de la page Méthode",
      outils: "Observable · Observable Plot · Astro · Tailwind CSS · mapshaper · Netlify",
      sections: [
        {
          titre: "Le défi et la question",
          mise_en_page: "texte-images",
          texte: [
            "Le 11 juillet 2022, un satellite a mesuré la température de surface de toute la métropole de Bordeaux : environ 31 % de sa surface était à +3 °C ou plus au-dessus de la moyenne. C'est ce que Bordeaux Métropole appelle un îlot de chaleur.",
            "Une zone chaude n'est pas encore un risque. Nous avons construit le récit sur la formule risque = aléa × enjeu × vulnérabilité : la chaleur, les habitants qui y vivent, et ceux qui auront le plus de mal à y faire face (les 80 ans et plus, les ménages pauvres). Le site suit une structure en 4 temps : contexte, exploration, révélation, conclusion.",
          ],
        },
        {
          titre: "Une part, pas un nombre",
          mise_en_page: "moitie",
          texte: [
            "Compter les habitants avantagerait toujours les grandes communes : Bordeaux aura toujours plus de monde concerné qu'Ambès. La carte montre donc une part : sur 100 habitants de la commune, combien vivent en îlot de chaleur. Résultat : de 1 % à 95 % selon la commune.",
            "Cinq classes de 20 points plutôt qu'un dégradé continu, pour pouvoir dire « ma commune est dans la tranche la plus haute ». La carte est la même pour tout le monde : elle est calculée à la construction du site (SVG statique, sans JavaScript).",
          ],
          images: ["mockup-carte"],
        },
        {
          titre: "Ma commune est-elle plus exposée ?",
          mise_en_page: "moitie",
          texte: [
            "Le lecteur choisit sa commune et la situe parmi les 28 de la métropole. Ce graphique change selon le choix : il est donc calculé dans le navigateur, avec un premier rendu fait à la construction pour rester lisible sans JavaScript.",
            "La ligne de référence est le taux de toute la métropole (69,2 %), calculé sur tous ses habitants, et non la moyenne des 28 taux (46,3 %), qui donnerait autant de poids à une commune de 927 habitants qu'à Bordeaux.",
          ],
          images: ["mockup-ma-commune"],
        },
        {
          titre: "Les plus fragiles sont-ils plus exposés ?",
          mise_en_page: "moitie",
          texte: [
            "Pour chaque commune, nous comparons la part des 80 ans et plus vivant en îlot de chaleur à celle de l'ensemble des habitants. Sur toute la métropole : 70,5 % contre 69,2 %, et l'écart change de sens d'une commune à l'autre.",
            "Les ménages pauvres, eux, sont plus souvent en îlot de chaleur que l'ensemble des ménages : 76,3 % contre 71,6 %. Nous présentons un constat, sans inventer de cause.",
          ],
          images: ["mockup-ages"],
        },
        {
          titre: "Une page par commune",
          mise_en_page: "moitie",
          texte: [
            "Chaque commune a sa propre fiche, générée à la construction du site avec getStaticPaths d'Astro : 28 pages statiques, partageables et indexables, sans calcul chez le lecteur.",
            "On y retrouve la part des habitants en îlot de chaleur, le rang de la commune, l'écart à la métropole, les 80 ans et plus, les ménages pauvres, et une carte où la commune est entourée.",
          ],
          images: ["mockup-fiche-commune"],
        },
        {
          titre: "Une méthode vérifiable",
          mise_en_page: "texte-images",
          texte: [
            "Les données viennent de Bordeaux Métropole (îlots de chaleur 2022, contours des communes) et de l'Insee (Filosofi 2019, carreaux de 200 m). Le fichier national de l'Insee (2 287 884 carreaux, 454 Mo) a été réduit aux 6 751 carreaux des 28 communes ; seul un fichier préfiltré d'une ligne par commune est publié.",
            "La page Méthode détaille les sources, les licences, les traitements et les limites : une température du sol et non de l'air, un seul jour de relevé, des habitants absents de Filosofi (résidents d'EHPAD, étudiants en résidence). Les données sont téléchargeables en CSV et en JSON, et le site est publié comme réutilisation sur data.gouv.fr.",
          ],
          images: ["mockup-methode"],
          lien: { texte: "Voir le site", url: "https://sae303-verguet-deroo.netlify.app/" },
        },
        {
          titre: "Résultats & Compétences acquises",
          mise_en_page: "liste",
          liste: [
            { gras: "Préparer des données réelles", texte: "Filtrer un fichier national de 454 Mo, rattacher chaque carreau à sa commune et contrôler ce qui tombe à côté des jointures." },
            { gras: "Choisir la bonne représentation", texte: "Garder le bon dénominateur (une part plutôt qu'un nombre), une référence honnête et une carte seulement pour répondre à un « où ? »." },
            { gras: "Intégrer des visualisations dans Astro", texte: "Choisir pour chaque graphique sa route d'export : à la construction, dans le navigateur ou une page par valeur." },
            { gras: "Accessibilité et transparence", texte: "Figures légendées, textes alternatifs, page Méthode, données téléchargeables et publication sur data.gouv.fr." },
          ],
        },
      ],
    });

    record.set("visuel_carte", fichier("mockup-site"));
    record.set("couverture", fichier("mockup-site"));
    record.set("galerie", ["mockup-carte", "mockup-ma-commune", "mockup-ages", "mockup-fiche-commune", "mockup-methode"].map(fichier));

    app.save(record);
  },
  (app) => {
    // Retour en arrière : on supprime le projet
    app.delete(app.findFirstRecordByData("projets", "slug", SLUG));
  },
);
