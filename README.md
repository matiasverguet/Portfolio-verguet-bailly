# Portfolio — Matias Verguet--Bailly

Portfolio de designer graphique (BUT MMI 2e année, IUT de Montbéliard).

## Technologies
- [Astro](https://astro.build) : génération du site, découpage en composants
- [Tailwind CSS v4](https://tailwindcss.com) : styles (charte déclarée dans `src/styles/global.css`)
- JavaScript : seulement si nécessaire (l'accordéon des compétences utilise `<details>`, sans JS)
- PocketBase : base de données des projets et des images (à venir)

## Lancer le site en local
```
npm install
npm run dev
```
Puis ouvrir http://localhost:4321

## Arborescence
```
src/
  pages/index.astro        accueil (assemble les sections)
  layouts/Layout.astro     <head>, header, footer communs
  components/              Header, Footer, Hero, Folder, Skills, AboutPreview, ProjectCard, ProjectsPreview
  data/                    textes des compétences et liste des projets
  styles/global.css        Tailwind + charte graphique (@theme)
public/img/                images (photo, visuels des projets)
IA.md                      déclaration d'usage de l'IA
JOURNAL.md                 journal de bord
```
