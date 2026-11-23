// Contenu de l'accordéon des compétences (repris de ma maquette Figma).
// Séparer les données du composant : pour changer un texte, on ne touche qu'à ce fichier.
// Ordre : le graphisme d'abord (mon positionnement), l'intégration web en dernier (un atout en plus).
export const skills = [
  {
    title: "Identité de marque",
    items: [
      "Conception de logos et de systèmes d'identité (La Cimade, Chorus Symphonia)",
      "Choix des typographies et des palettes de couleurs",
      "Déclinaison de l'identité sur supports imprimés et numériques",
    ],
  },
  {
    title: "Graphisme",
    items: [
      "Affiches et supports de communication",
      "Visuels pour les réseaux sociaux",
      "Infographies et visualisation de données",
    ],
  },
  {
    title: "Design UI/UX",
    items: [
      "Wireframes et maquettes d'interfaces web et mobiles",
      "Prototypes interactifs sur Figma",
      "Micro-animations et transitions",
    ],
  },
  {
    title: "Intégration web",
    items: [
      "Intégration de mes maquettes en HTML, CSS et JavaScript, en responsive",
      "Sites avec Astro et Tailwind, contenus gérés dans PocketBase (ce portfolio)",
      "Bases de l'accessibilité et de la performance web",
    ],
  },
];
