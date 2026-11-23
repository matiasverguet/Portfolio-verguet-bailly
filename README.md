# Portfolio — Matias Verguet--Bailly

Portfolio de designer graphique (BUT MMI 2e année, IUT de Montbéliard).

## Technologies
- [Astro](https://astro.build) : génération du site en statique, découpage en composants
- [Tailwind CSS v4](https://tailwindcss.com) : styles (charte déclarée dans `src/styles/global.css`)
- JavaScript : seulement si nécessaire (l'accordéon des compétences utilise `<details>`, sans JS)
- [Netlify](https://www.netlify.com) : hébergement et formulaire de contact (Netlify Forms)

## Lancer le site en local
```
npm install
npm run dev
```
Puis ouvrir http://localhost:4321

## Construire le site
Le site est **statique** : toutes les pages sont fabriquées en HTML au moment du build,
sans serveur ni base de données en ligne.
```
npm run build     # le site est dans dist/
npm run preview   # aperçu local du site construit
```

## Modifier les projets
- Textes et sections : `src/data/projets.json`.
- Images : `src/assets/projets/{id du projet}/` ; Astro les convertit en WebP à la bonne taille au build.
- Le contenu vient à l'origine de PocketBase (première version du site) ; il a été exporté une fois
  avec `scripts/exporter-pocketbase.mjs`.

## Arborescence
```
src/
  pages/index.astro           accueil (assemble les sections)
  pages/projets/[slug].astro  une page par projet (getStaticPaths)
  pages/og/[slug].png.ts      image de partage de chaque projet, générée au build
  layouts/Layout.astro        <head>, header, footer communs
  components/                 Header, Footer, Hero, Folder, Skills, ProjectCard, ProjectSection…
  lib/projets.js              lecture des projets (JSON + images)
  data/                       projets, compétences, textes de la page About, liens des réseaux
  assets/projets/             images des projets
  styles/global.css           Tailwind + charte graphique (@theme) + transitions entre pages
public/img/                   images (photo, logos)
public/video/                 vidéo du personnage (WebM transparent + MP4 pour Safari)
pocketbase/medias/            fichiers sources des visuels (SVG, WebP)
netlify.toml                  build Netlify et en-têtes de sécurité
IA.md                         déclaration d'usage de l'IA
JOURNAL.md                    journal de bord
QUALITE.md                    démarche qualité (accessibilité, performance, SEO, sécurité, RGPD)
```

## Mise en ligne
| Rôle                                     | Service    |
|------------------------------------------|------------|
| Nom de domaine `verguet-bailly.fr` (DNS) | Infomaniak |
| Site statique et formulaire de contact   | Netlify    |

- À chaque push sur `main`, Netlify reconstruit le site (`npm run build`) et publie le dossier `dist/`.
- Les messages du formulaire sont enregistrés par Netlify Forms et envoyés par email.
- Les en-têtes de sécurité et le cache des fichiers sont réglés dans `netlify.toml`.
