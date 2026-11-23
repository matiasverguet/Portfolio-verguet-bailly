# Journal de bord

Portfolio de Matias Verguet--Bailly — https://verguet-bailly.fr

## Semaine du 12/10/2026 — Démarrage et page d'accueil
- Création du dépôt GitHub et du dossier de projet.
- Premier choix technique : HTML/CSS/JS + PocketBase pour les projets et leurs images.
- Intégration de l'accueil d'après ma maquette Figma : header, hero (cadre de sélection façon Figma, dossiers animés), footer.
- **Changement de technologie** : passage de HTML/CSS à **Astro + Tailwind CSS v4**.
  Raison : des composants réutilisables (header, footer, cartes) et une charte graphique déclarée à un seul endroit (`@theme` dans `global.css`).
- Page d'accueil complète : compétences en accordéon (`<details>`, sans JavaScript), aperçu « À propos », cartes projets en forme de dossier qui s'ouvre au survol.

**Ce qui a coincé** : en HTML/CSS simple, le header, le footer et les cartes devaient être recopiés sur chaque page,
et la moindre modification était à refaire partout.
Les dossiers qui dépassent sur le côté créaient aussi une barre de défilement horizontale.

**Ce que j'ai décidé** : passer à Astro + Tailwind dès la première semaine, avant d'avoir trop de pages à reprendre.
Pour la barre de défilement, `overflow-x-clip` sur la page (`overflow-hidden` cassait le header qui reste en haut).

## 15–16/10/2026 — Pages statiques
- Page **À propos** : présentation, parcours (formation), démarche de travail, outils (`about.js` regroupe les textes).
- Page **Contact** avec formulaire, et page **Projets** avec filtres par catégorie.
- Liens vers les réseaux regroupés dans un composant (`SocialLinks`), réutilisé dans le header et le footer.

**Ce qui a coincé** : les liens vers mes réseaux étaient écrits deux fois (header et footer), avec un risque d'oubli
quand j'en change un.
Les cartes d'une même ligne n'avaient pas la même hauteur quand les titres étaient plus ou moins longs.

**Ce que j'ai décidé** : un seul composant `SocialLinks` (et une seule liste dans `reseaux.js`), utilisé aux deux endroits.
Les cartes s'étirent toutes à la hauteur de la plus grande, et la flèche est toujours alignée en bas.

## 23/10/2026 — Pages dynamiques avec PocketBase
- Création de la base PocketBase et remplissage avec tous mes projets (textes, images, sections).
- Connexion de PocketBase au site : les pages lisent les projets via l'API.
- Base enregistrée en **migrations** (`pocketbase/pb_migrations/`) : la structure et le contenu sont versionnés dans Git, donc reproductibles sur une autre machine ou sur le serveur.
- Une page par projet (`/projets/[slug]`), construite à partir des sections enregistrées dans PocketBase (texte, image, galerie, demi-largeur…).
- Composant `PbImage` : images PocketBase optimisées en WebP par Astro.
- Personnage animé (vidéo WebM transparente + MP4 pour Safari).

**Ce qui a coincé** : mes projets n'ont pas tous la même mise en page, donc une page projet unique était trop rigide.
La vidéo transparente du personnage ne s'affichait pas correctement sur Safari, qui ne gère pas la transparence en WebM.

**Ce que j'ai décidé** : découper chaque projet en sections (texte, image, galerie, demi-largeur…) que je choisis dans PocketBase.
Pour Safari, une version MP4 en secours, dont le fond blanc est effacé en CSS.

## Semaine du 03/11/2026 — Finitions et contenu
- Formulaire de contact relié à une collection `messages` de PocketBase (validation côté base, piège à robots « honeypot »).
- Intégration du CV en pdf.
- Favicon, curseurs personnalisés façon Figma.
- Mentions légales et politique de confidentialité (LCEN, RGPD).
- Nouveau projet : **Chaleur en ville** (dataviz), avec ses maquettes.

**Ce qui a coincé** : un formulaire public reçoit vite du spam envoyé par des robots, et il collecte des données personnelles
(nom, email, message), ce qui impose des obligations légales.

**Ce que j'ai décidé** : un champ invisible piège les robots, sans CAPTCHA qui gênerait les vrais visiteurs.
Côté RGPD : information au moment de l'envoi, messages gardés 12 mois au maximum, et page de mentions légales complète.
Aucun cookie ni outil de statistiques, donc pas besoin de bandeau de consentement.

## Semaine du 10/11/2026 — Nouveaux projets et mise en ligne
- Nouveaux projets : **Affiches FCSM**, refonte des visuels de **La Cimade** (logos, supports et typographies redessinés en SVG).
- Ordre des projets et visuels des cartes ajoutés en migration (sinon ils n'existaient que dans ma base locale et manquaient en ligne).

- **Passage en SSR sur le VPS** :
  - adaptateur `@astrojs/node`, serveur lancé avec Bun en service `systemd` (`portfolio`, port local 3010) ;
  - Apache en reverse proxy et certificat HTTPS Let's Encrypt (certbot) ;
  - les pages lisent PocketBase à chaque visite : une modification dans l'interface de PocketBase apparaît tout de suite sur le site;
  - sitemap et image de partage générés à la demande ; en-têtes de sécurité ajoutés (`src/middleware.ts`).
- **CI/CD avec GitHub Actions** (`.github/workflows/deploy.yml`), comme vu en TP : à chaque push sur `main`, GitHub se connecte au VPS en SSH, met à jour le code, applique les migrations PocketBase, reconstruit le site et redémarre les services.
  - Clé SSH dédiée à GitHub, droits `sudo` limités au redémarrage des deux services.
  - Incident : une capture d'écran montrait une partie de la clé privée → clé régénérée et remplacée dans les secrets GitHub.
- **Lenteur des images** : en SSR, Astro recompressait chaque image à chaque visite (~1,7 s par image). Ajout d'un cache (`src/lib/image-cache.ts`) : après la première conversion, une image part en quelques millisecondes.
- **Animations entre les pages** améliorées : le visuel sort du dossier pour devenir la couverture du projet, puis y rentre au retour ; seule la carte cliquée s'anime, et le sens de l'animation dépend de la navigation (ouvrir, revenir, projet suivant).
- Communication autour du portfolio : bandeaux animés entre les projets sur Behance, bannière Behance, mise à jour LinkedIn.

**Ce qui a coincé** (la semaine la plus difficile) :
- le sous-domaine `api.verguet-bailly.fr` était introuvable : il manquait l'enregistrement DNS chez Infomaniak ;
- l'adresse `www` ne marchait pas : un ancien enregistrement DNS entrait en conflit avec le nouveau ;
- une fois en ligne, les images des cartes manquaient : je les avais réglées à la main dans ma base locale, elles n'existaient pas sur le serveur ;
- le site en ligne était très lent à charger : chaque image était recompressée à chaque visite ;
- en revenant à la liste, le visuel du projet passait devant le dossier au lieu de rentrer dedans ;
- une capture d'écran de mon terminal montrait une partie de ma clé SSH privée.

**Ce que j'ai décidé** :
- garder le DNS chez Infomaniak plutôt que de le confier à Netlify, pour ne pas casser mes autres sous-domaines et ma messagerie ;
- tout ce qui touche au contenu passe désormais par une migration, pour que le serveur ait toujours la même base que mon PC ;
- passer le site en SSR sur le VPS pour respecter la consigne de la SAE (le site doit tourner sur le VPS) ;
- garder les images converties en cache sur le serveur : quelques millisecondes au lieu de 1,7 s ;
- régénérer la clé SSH et la remplacer dans GitHub, plutôt que de prendre le risque de la garder.

## Semaine du 16/11/2026 — Tests et documentation
- Audit Lighthouse : 100 en performances, accessibilité, bonnes pratiques et SEO, sur mobile et sur ordinateur.
- Test du formulaire de contact en ligne avec un vrai message : il arrive bien dans PocketBase.
- Test du site sur mon téléphone et sur un autre navigateur.
- Ajout d'un projet directement dans l'interface de PocketBase, sans toucher au code.
- Rédaction de `QUALITE.md` (démarche qualité et vérifications), mise à jour de `IA.md` et de ce journal.

## Semaine du 23/11/2026 — Retours de la soutenance et passage en site statique
Retours du jury : direction artistique, études de cas, `QUALITE.md` et processus validés.
À améliorer : un positionnement qui oscille entre graphisme et développement, des niveaux d'outils
surévalués, une présence LinkedIn trop légère et des commits pas assez fréquents.

- **Positionnement** : une seule phrase reprise partout (description Google, accueil, À propos) :
  designer graphique d'abord, l'intégration web en plus. L'accordéon des compétences met le graphisme
  en premier ; « Développement web » devient « Intégration web ».
- **Outils** : chaque fiche décrit ce que j'ai vraiment fait, avec une échelle honnête
  (Quotidien, Régulier, En apprentissage, Bases) au lieu de « maîtrise complète ».
- **Page Projets** : 3 familles de filtres (Identité visuelle, Affiche & édition, Web & UI)
  au lieu de 8 étiquettes pour 5 projets.
- Mention « Portfolio-2026 » retirée de l'en-tête.
- **Passage en site statique sur Netlify** :
  - le contenu des projets est exporté de PocketBase une fois pour toutes (`scripts/exporter-pocketbase.mjs`)
    dans `src/data/projets.json`, et les images dans `src/assets/projets/` ;
  - Astro fabrique toutes les pages en HTML au moment du build (`getStaticPaths` pour les pages projets
    et les images de partage) ;
  - le formulaire de contact passe par Netlify Forms (message envoyé par email) ;
  - en-têtes de sécurité déplacés dans `netlify.toml` ; mentions légales mises à jour (hébergeur Netlify).

**Pourquoi** : un portfolio change peu ; un site statique est plus simple à héberger, plus rapide
et ne dépend plus d'un serveur ni d'une base de données à maintenir.

**Ce que j'ai décidé** : faire un commit par modification pour que l'historique montre mieux l'avancement.
