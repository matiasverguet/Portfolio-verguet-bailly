# Déclaration d'usage de l'IA

J'ai utilisé des outils d'intelligence artificielle pendant ce projet, surtout pour le **code** et le **déploiement**.
Le design (maquettes Figma, identité, visuels des projets) et le contenu (textes, choix des projets) sont de moi.
Chaque proposition de l'IA a été relue et testée ; plusieurs ont été corrigées ou refusées (voir « Mon rôle » à chaque étape).


## Outils utilisés

- **Claude Code** (assistant de code dans l'éditeur) : code, explications, déploiement.
- **Google Gemini** : avatar 3D et animation du personnage, ensuite retravaillés par moi (montage, détourage).


## Détail par étape

12/10/2026 — Intégration, étape 1 (Claude)

- **Ce que l'IA a fait** : la structure HTML de l'accueil (header, hero, footer) et le CSS de base, à partir de ma maquette Figma.
- **Mon rôle** :
  - j'ai conçu la maquette Figma de l'accueil (header, hero avec le cadre de sélection façon Figma, dossiers animés, footer) ;
  - j'ai choisi la stack de départ : HTML/CSS/JS + PocketBase pour les projets ;
  - j'ai comparé le résultat à ma maquette et demandé les ajustements.

12/10/2026 — Passage à Astro + Tailwind (Claude Code)

- **Ce que l'IA a fait** : la migration du site vers Astro + Tailwind CSS et l'intégration de la page d'accueil
  (hero, compétences, à propos, projets, footer).
- **Mon rôle** :
  - j'ai validé le passage à Astro + Tailwind, pour avoir des composants réutilisables et une charte à un seul endroit ;
  - j'ai fourni la charte (couleurs, polices) et les textes de l'accueil (compétences, à propos) ;
  - j'ai vérifié que la page restait fidèle à la maquette.

15–16/10/2026 — Pages À propos, Projets, Contact (Claude Code)

- **Ce que l'IA a fait** : l'intégration des pages d'après mes maquettes.
- **Mon rôle** :
  - j'ai conçu les maquettes des pages À propos, Projets et Contact ;
  - j'ai écrit les contenus : mon parcours, ma démarche de travail, mes outils, les catégories des projets ;
  - j'ai choisi les réseaux à afficher et les informations du formulaire de contact.

23/10/2026 — PocketBase (Claude Code)

- **Ce que l'IA a fait** : la connexion entre PocketBase et le site (lecture de l'API dans le code, composants des pages projet)
  et l'enregistrement de la base en migrations pour la retrouver à l'identique sur le serveur.
- **Mon rôle** :
  - j'ai choisi les informations à afficher pour chaque projet (contexte, objectif, rôle, outils, sections) ;
  - j'ai préparé et exporté les visuels de mes projets ;
  - j'ai fourni le personnage animé, créé avec Gemini puis retravaillé (montage, détourage).
  - j'ai créé la base PocketBase et je l'ai remplie avec tous mes projets (textes, images, sections).


03/11/2026 — Formulaire, CV, mentions légales (Claude Code)

- **Ce que l'IA a fait** : l'envoi du formulaire vers PocketBase et mise en forme des mentions légales.
- **Mon rôle** : j'ai fait les mentions légales et la durée de conservation des messages (12 mois) et refait mon cv avec la même direction artistique que le site.

10/11/2026 — Visuels de La Cimade (Claude Code)

- **Ce que l'IA a fait** : régler les problèmes de mise en forme.
- **Mon rôle** : j'ai demandé des corrections jusqu'à ce que ce soit propre.

10/11/2026 —  Behance (Claude Code)

- **Ce que l'IA a fait** : des bandeaux défilants entre les projets (Figma + GIF).
- **Mon rôle** : j'ai fait le post Behance avec la même direction artistique que le site et j'ai demandé à Claude de faire des bandeaux défilants ; les premières versions étaient illisibles (trop rapides, pas assez d'images par seconde) et mal raccordées en haut et en bas ; j'ai demandé de les refaire.

10/11/2026 — Mise en ligne, VPS (Claude Code)

- **Ce que l'IA a fait** : aide pour les commandes du VPS (service PocketBase, Apache, HTTPS) et la configuration DNS.
- **Mon rôle** : gérer le VPS et demander de l'aide à Claude si besoin.


10/11/2026 — CI/CD avec GitHub Actions (Claude Code)

- **Ce que l'IA a fait** : le workflow `deploy.yml`, la clé SSH et les droits `sudo` limités.
- **Mon rôle** :
  - j'ai suivi la démarche du TP et créé moi-même les secrets dans GitHub ;

10/11/2026 — Performance et animations (Claude Code)

- **Ce que l'IA a fait** : le cache des images converties et les animations d'entrée et de sortie des projets.
- **Mon rôle** : j'ai repéré la lenteur du site et le visuel qui passait devant le dossier au retour, et demandé les corrections.

16/11/2026 — Documentation (Claude Code)

- **Ce que l'IA a fait** : la mise en forme de `IA.md`, du journal et de `QUALITE.md`.
- **Mon rôle** : écriture des contenus a mettre dans journal, qualité et IA.md.


## Ce que j'en retiens

L'IA m'a fait gagner beaucoup de temps sur le code et le déploiement, mais elle ne remplace pas le regard :
c'est moi qui ai repéré les bugs visuels (coins arrondis, animation, images manquantes en ligne) et j'ai souvent dû demander plusieurs corrections avant que le résultat soit propre.

J'ai appris à vérifier ce qu'elle propose au lieu de l'appliquer directement,
par exemple quand j'ai refusé de confier mes DNS à Netlify.
J'ai aussi compris qu'il faut faire attention à ce qu'on lui envoie :
une de mes captures montrait une partie de ma clé SSH, et j'ai dû la régénérer.

Pour moi, l'IA est un outil de travail, comme Figma ou Astro : le but n'est pas de tout faire seul, mais de bien s'en servir. La prochaine fois, je lui demanderai plus souvent d'expliquer ce qu'elle fait, pour comprendre chaque étape, garder la main sur mes choix et pouvoir corriger moi-même quand quelque chose casse.
