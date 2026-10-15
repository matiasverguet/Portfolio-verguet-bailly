// Contenu de la page About (repris de ma maquette Figma).
// Séparer les données des composants : pour changer un texte, on ne touche qu'à ce fichier.

// Parcours scolaire, du plus récent au plus ancien
export const parcours = [
  { diplome: "BUT MMI", ecole: "IUT de Montbéliard", annees: "2025-2028" },
  { diplome: "BUT GMP", ecole: "IUT de Besançon", annees: "2024-2025" },
  { diplome: "Bac Général", ecole: "Lycée Follereau Belfort", annees: "2021-2024" },
];

// Logiciels et langages que j'utilise, avec la fiche affichée au survol
// (categorie = petit titre bleu, produits = liste « Ce que je produis avec »,
//  champs = étiquettes « Champs d'intervention », niveau = « Niveau d'usage »)
export const outils = [
  {
    nom: "Figma",
    categorie: "Design d'interface & expérience",
    description: "Conception d'interfaces web et mobiles soignées, maquettage et création de prototypes interactifs prêts au développement.",
    produits: [
      "Design systems évolutifs (tokens, variables, composants auto-layout).",
      "Prototypes interactifs micro et macro (Smart Animate, transitions).",
      "Hand-off développeur clair avec nomenclatures organisées.",
    ],
    champs: ["UI/UX", "Wireframing", "Responsive", "Design System", "User Flow"],
    niveau: "Avancé / Quotidien",
  },
  {
    nom: "Affinity",
    categorie: "Création vectorielle & assets",
    description: "Création d'illustrations vectorielles précises, conception d'icônes sur-mesure et retouche photographique.",
    produits: [
      "Dessin vectoriel avec courbes de Bézier optimisées.",
      "Préparation et export d'assets SVG légers pour le web.",
      "Retouche photo, composition et détourages complexes.",
    ],
    champs: ["SVG", "Vecteur", "Iconographie", "Retouche photo", "Branding"],
    niveau: "Régulier",
  },
  {
    nom: "Canva",
    categorie: "Communication visuelle & social",
    description: "Génération rapide de déclinaisons de bannières marketing, supports pour réseaux sociaux et présentations visuelles express.",
    produits: [
      "Déclinaisons multi-formats en un temps record.",
      "Conception de bannières pour LinkedIn, X et campagnes promo.",
      "Mise en page de pitch decks et documents de présentation.",
    ],
    champs: ["Pitch Deck", "Bannières", "Social Media", "Marketing"],
    niveau: "Autonome",
  },
  {
    nom: "DaVinci Resolve",
    categorie: "Montage vidéo & motion",
    description: "Montage dynamique de démos de projets, étalonnage colorimétrique soigné et sound design pour mettre en valeur les interfaces.",
    produits: [
      "Montage rythmé de présentations et d'études de cas.",
      "Étalonnage colorimétrique professionnel (Color Page).",
      "Export haute qualité optimisé pour le web et les réseaux.",
    ],
    champs: ["Montage", "Étalonnage", "Showreel", "Case Studies", "Sound Design"],
    niveau: "Bonne maîtrise",
  },
  {
    nom: "WordPress",
    categorie: "CMS & gestion de contenu",
    description: "Mise en place de sites vitrines et éditoriaux administrables en toute autonomie par les clients finaux.",
    produits: [
      "Intégration de maquettes sur-mesure avec ACF (Advanced Custom Fields).",
      "Configuration SEO, sécurité et performance de mise en cache.",
      "Interfaces d'administration simplifiées pour l'utilisateur final.",
    ],
    champs: ["CMS", "SEO", "Maintenance", "Blogging", "Gutenberg"],
    niveau: "Maîtrise complète",
  },
  {
    nom: "HTML/CSS",
    categorie: "Intégration front-end fondamentale",
    description: "Écriture d'un balisage sémantique rigoureux, responsive fluide et animations CSS modernes respectant fidèlement le design.",
    produits: [
      "Respect des normes d'accessibilité et de sémantique.",
      "Maîtrise approfondie de Flexbox, CSS Grid et des animations CSS.",
      "Compatibilité multi-navigateurs et fluidité responsive.",
    ],
    champs: ["CSS Grid", "Flexbox", "Sémantique", "Accessibilité", "Animations"],
    niveau: "Maîtrise complète",
  },
  {
    nom: "Astro",
    categorie: "Framework moderne & performance",
    description: "Développement de portfolios et sites vitrines ultra-rapides, livrant du HTML pur avec zéro JavaScript superflu par défaut.",
    produits: [
      "Architecture en îlots (Islands) pour une hydratation partielle.",
      "Intégration transparente de Tailwind CSS et de Markdown / MDX.",
      "Temps de chargement très courts et scores Lighthouse optimaux.",
    ],
    champs: ["Tailwind", "Zéro JS", "Performance"],
    niveau: "Stack de prédilection",
  },
  {
    nom: "SQL",
    categorie: "Base de données & structure",
    description: "Modélisation de bases relationnelles, écriture de requêtes optimisées et manipulation intègre de volumes de données.",
    produits: [
      "Conception de schémas relationnels clairs et normalisés.",
      "Requêtes complexes (jointures, agrégations, sous-requêtes).",
      "Gestion des index et optimisation des temps d'exécution.",
    ],
    champs: ["MySQL", "Relations", "Requêtes", "Architecture"],
    niveau: "Opérationnel",
  },
];

// Les 4 étapes de ma méthode de travail (section « Concevoir avec créativité »)
export const etapes = [
  {
    titre: "Recherche et stratégie",
    texte:
      "Cette phase initiale pose les fondations du projet. Elle débute par une analyse rigoureuse du brief, un audit complet de l'existant et un benchmark concurrentiel approfondi. L'objectif est de cerner précisément les attentes des utilisateurs cibles, d'identifier les freins d'usage et de définir des objectifs stratégiques clairs pour guider l'ensemble des choix visuels et techniques.",
  },
  {
    titre: "Concept & Idéation",
    texte:
      "C'est l'étape de concrétisation des premières intuitions créatives. Elle passe par la réalisation de planches de tendances (moodboards), de croquis préparatoires et de recherches de signes distinctifs. En confrontant plusieurs axes graphiques, cette démarche permet de dégager une identité visuelle singulière et une direction artistique cohérente avec le positionnement recherché.",
  },
  {
    titre: "Tests",
    texte:
      "Les concepts retenus sont traduits en maquettes fonctionnelles et interactives. Cette étape permet d'éprouver les flux de navigation, la hiérarchie typographique et la lisibilité globale directement en conditions réelles. Les retours utilisateurs et les phases d'itération successives garantissent une expérience fluide, intuitive et parfaitement accessible sur tous les formats.",
  },
  {
    titre: "Déploiement & livrables",
    texte:
      "La finalisation du projet se concrétise par la structuration des livrables finaux : génération des exports haute fidélité pour le print, préparation des assets vectoriels et intégration web optimisée. Le travail s'accompagne de la remise d'un guide d'usage ou d'un design system complet garantissant une application rigoureuse, autonome et durable de l'identité.",
  },
];
