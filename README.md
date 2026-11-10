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

## Construire le site (SSR)
Le site est en rendu côté serveur (adaptateur `@astrojs/node`, mode standalone) :
chaque page est fabriquée à la visite avec les données de PocketBase.
```
npm run build                          # ou : bun run --bun build
PORT=3000 bun ./dist/server/entry.mjs  # lance le serveur du site
```

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
| Site Astro en SSR | VPS de l'IUT : service `portfolio` (Bun, port local 3010) derrière Apache, sur `https://verguet-bailly.fr` |
| PocketBase (projets, images, messages du formulaire) | VPS de l'IUT : service `pb-portfolio` (port local 8091) derrière Apache, sur `https://api.verguet-bailly.fr` |

```
Internet → Apache :443 ─┬─ verguet-bailly.fr     → Astro SSR  127.0.0.1:3010
                        └─ api.verguet-bailly.fr → PocketBase 127.0.0.1:8091
```

- Sur le VPS, le fichier `/var/www/portfolio/.env` contient `PB_URL=https://api.verguet-bailly.fr` (voir `.env.example`).
- Une modification faite dans l'interface de PocketBase apparaît sur le site sans rien reconstruire
  (les projets sont gardés 30 secondes en mémoire).
- Déploiement automatique : `.github/workflows/deploy.yml` (GitHub Actions) se connecte au VPS en SSH
  à chaque push sur `main`, met à jour PocketBase (migrations, images), reconstruit le site et redémarre les services.
