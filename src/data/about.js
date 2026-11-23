// Contenu de la page About (repris de ma maquette Figma).
// Séparer les données des composants : pour changer un texte, on ne touche qu'à ce fichier.

// Parcours scolaire, du plus récent au plus ancien
export const parcours = [
  { diplome: "BUT MMI", ecole: "IUT de Montbéliard", annees: "2025-2028" },
  { diplome: "BUT GMP", ecole: "IUT de Besançon", annees: "2024-2025" },
  { diplome: "Bac Général", ecole: "Lycée Raoul-Follereau, Belfort", annees: "2021-2024" },
];

// Logiciels et langages que j'utilise, avec la fiche affichée au survol
// (categorie = petit titre bleu, produits = liste « Ce que je produis avec »,
//  champs = étiquettes « Champs d'intervention », niveau = « Niveau d'usage »)
export const outils = [
  {
    nom: "Figma",
    categorie: "Design d'interface & expérience",
    description: "Mon outil principal : maquettes de sites et d'applications, prototypes, et la maquette complète de ce portfolio.",
    produits: [
      "Maquettes web et mobile, avec composants et auto-layout.",
      "Prototypes cliquables pour tester un parcours.",
      "Présentations de projets et diaporamas de soutenance.",
    ],
    champs: ["UI/UX", "Wireframing", "Responsive", "Prototypage"],
    niveau: "Quotidien",
  },
  {
    nom: "Affinity",
    categorie: "Création vectorielle & assets",
    description: "Logos, illustrations vectorielles et mises en page print : c'est là que j'ai dessiné les logos de La Cimade et de Chorus Symphonia.",
    produits: [
      "Logos et pictogrammes vectoriels.",
      "Affiches et supports imprimés.",
      "Export de fichiers SVG pour le web.",
    ],
    champs: ["Vecteur", "Branding", "Print", "SVG"],
    niveau: "Régulier",
  },
  {
    nom: "Canva",
    categorie: "Communication visuelle & réseaux sociaux",
    description: "Déclinaisons rapides de visuels pour les réseaux sociaux à partir d'une identité déjà définie.",
    produits: [
      "Posts et bannières pour les réseaux sociaux.",
      "Déclinaisons d'un même visuel en plusieurs formats.",
    ],
    champs: ["Réseaux sociaux", "Bannières", "Déclinaisons"],
    niveau: "Régulier",
  },
  {
    nom: "DaVinci Resolve",
    categorie: "Montage vidéo & motion",
    description: "Montage de courtes vidéos pour présenter mes projets, vu en cours et sur des projets de BUT.",
    produits: [
      "Montage simple : coupes, titres, musique.",
      "Export de vidéos pour le web et les réseaux.",
    ],
    champs: ["Montage", "Vidéo", "Réseaux sociaux"],
    niveau: "Bases",
  },
  {
    nom: "WordPress",
    categorie: "CMS & gestion de contenu",
    description: "Création de sites à partir d'un thème, vue en TP de BUT MMI.",
    produits: [
      "Installation et configuration d'un site.",
      "Mise en page avec l'éditeur de blocs (Gutenberg).",
    ],
    champs: ["CMS", "Gutenberg"],
    niveau: "Bases",
  },
  {
    nom: "HTML/CSS",
    categorie: "Intégration front-end fondamentale",
    description: "Intégration de mes maquettes en pages web responsive, comme celles de ce portfolio.",
    produits: [
      "Pages en HTML sémantique, mises en page avec Flexbox et Grid.",
      "Animations CSS simples (survols, transitions).",
      "Vérification de l'accessibilité avec Lighthouse.",
    ],
    champs: ["Flexbox", "CSS Grid", "Responsive", "Accessibilité"],
    niveau: "Régulier",
  },
  {
    nom: "Astro",
    categorie: "Framework moderne & performance",
    description: "Le framework de ce portfolio, découvert sur ce projet : des composants réutilisables et des pages construites depuis PocketBase.",
    produits: [
      "Composants réutilisables (en-tête, cartes, sections).",
      "Pages générées à partir des données de PocketBase.",
      "Mise en forme avec Tailwind CSS.",
    ],
    champs: ["Tailwind", "PocketBase", "Composants"],
    niveau: "En apprentissage",
  },
  {
    nom: "SQL",
    categorie: "Base de données & structure",
    description: "Bases de données relationnelles, vues en cours de BUT MMI.",
    produits: [
      "Schémas de tables simples.",
      "Requêtes de lecture et jointures de base.",
    ],
    champs: ["MySQL", "Requêtes"],
    niveau: "Bases",
  },
];

// Les 4 étapes de ma méthode de travail (section « Concevoir avec créativité »)
export const etapes = [
  {
    titre: "Recherche & stratégie",
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
