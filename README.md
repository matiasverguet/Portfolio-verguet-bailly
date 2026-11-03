# Portfolio — Matias Verguet--Bailly

Portfolio de designer graphique (BUT MMI 2e année, IUT de Montbéliard).

## Technologies
- [Astro](https://astro.build) : génération du site, découpage en composants
- [Tailwind CSS v4](https://tailwindcss.com) : styles (charte déclarée dans `src/styles/global.css`)
- JavaScript : seulement si nécessaire (l'accordéon des compétences utilise `<details>`, sans JS)
- PocketBase : base de données des projets et de leurs images

## Lancer le site en local
1. Mettre `pocketbase.exe` dans le dossier `pocketbase/` (non versionné), puis dans un premier terminal :
   ```
   npm run pb
   ```
   Interface d'administration : http://127.0.0.1:8090/_/
   Au premier lancement, les migrations de `pocketbase/pb_migrations/` créent la collection
   `projets` et la remplissent avec mes projets.
2. Dans un second terminal :
   ```
   npm install
   npm run dev
   ```
   Puis ouvrir http://localhost:4321

Si PocketBase est éteint, le site utilise les données de secours de `src/data/projets.js`.

## Construire le site
`npm run build` lit PocketBase, crée une page par projet (`/projets/[slug]`) et télécharge
les images pour les optimiser : le dossier `dist/` est un site statique, indépendant de PocketBase.

## Arborescence
```
src/
  pages/index.astro        accueil (assemble les sections)
  layouts/Layout.astro     <head>, header, footer communs
  components/              Header, Footer, Hero, Folder, Skills, AboutPreview, ProjectCard, ProjectsPreview
  pages/projets/[slug].astro  une page par projet (données PocketBase)
  lib/pocketbase.js        lecture de PocketBase (fetch sur l'API REST)
  data/                    textes des compétences, de la page About, projets de secours
  styles/global.css        Tailwind + charte graphique (@theme)
public/img/                images (photo, logos, visuels de secours)
public/video/              vidéo du personnage (WebM transparent + MP4 pour Safari)
pocketbase/pb_migrations/  structure et contenu de départ de la base (versionnés)
IA.md                      déclaration d'usage de l'IA
JOURNAL.md                 journal de bord
```

## Mise en ligne
| Rôle | Service |
|---|---|
| Nom de domaine `verguet-bailly.fr` (DNS) | Infomaniak |
| Site statique (pages générées par Astro) | Netlify, déployé automatiquement à chaque push sur `main` (`netlify.toml`) |
| PocketBase (projets, images, messages du formulaire) | VPS de l'IUT, sur `https://api.verguet-bailly.fr` |

- Variable d'environnement à régler dans Netlify : `PB_URL=https://api.verguet-bailly.fr` (voir `.env.example`).
- Les pages projet sont générées **au moment du build** : après une modification dans PocketBase,
  relancer un déploiement Netlify (bouton « Trigger deploy » ou *build hook*).
- Le formulaire de contact écrit directement dans PocketBase : le VPS doit être en ligne et en HTTPS.
