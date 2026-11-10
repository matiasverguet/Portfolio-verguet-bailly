/* Image de partage (Open Graph) d'un projet : /og/la-cimade.png, /og/chaleur-en-ville.png…
   C'est l'aperçu affiché quand on partage le lien d'un projet sur LinkedIn, Discord, Messenger…

   Elle est fabriquée à la construction du site avec sharp (déjà installé avec Astro), sans texte
   (le titre et la description sont dans les balises og:title / og:description) :
   grille grise du site + grand dossier bleu, avec le visuel du projet qui en dépasse,
   comme sur les cartes projets. Format conseillé : 1200 × 630.

   Les images viennent de PocketBase : rien à faire à la main, une image par projet est créée. */
import type { APIRoute } from "astro";
import sharp from "sharp";
import { getProjets } from "../../lib/pocketbase.js";

const L = 1200;
const H = 630;

// Couleurs du site (global.css)
const paper = "#e3e3e3";
const ligne = "#d6d6d6";
const folder = "#4fc3f7";
const folderDark = "#1b8fd8";
const ink = "#111111";

// Logo « MB » (mêmes tracés que le header), posé sur l'avant du dossier
const logo = `
  <path fill-rule="evenodd" d="M23.2297 24.6833C22.1721 22.4152 21.8944 22.1031 22.2094 22.0443C22.2924 22.0288 33.5413 22.0109 33.9643 22.0226C34.2251 22.0298 34.162 22.2265 34.1548 22.2491C34.0838 22.4707 31.4543 27.1403 31.2159 27.5636C30.0602 29.616 27.7656 33.8603 27.6705 33.8683C27.5146 33.8815 27.5687 33.7745 23.2297 24.6833Z" />
  <path d="M40.8377 21.9708C41.0299 21.8872 61.3549 21.8768 63.3406 21.9727C74.4185 22.5079 75.7044 30.8641 72.7088 34.8624C71.2303 36.8355 69.5188 37.6077 69.5037 37.6163C69.2571 37.7808 70.0318 37.754 71.6209 38.7999C74.7983 40.8914 74.8082 45.1436 74.2654 46.9405C72.0482 54.2795 62.6621 53.9076 60.3181 53.9034C44.6807 53.8753 37.4751 53.9765 37.324 53.8438C37.0927 53.6363 37.3227 49.5014 37.3064 44.3223C37.2984 41.8146 37.4031 40.887 37.1238 41.5177C37.0011 41.7947 33.2486 48.2283 32.9089 48.8106C30.0441 53.7221 30.1147 53.8848 29.7683 53.8985C28.0316 53.9674 25.0608 53.9086 24.6511 53.9005C24.3453 53.8943 24.41 53.7429 22.3494 49.7354C18.0967 41.4651 17.7517 40.4265 17.8201 41.1973C17.8524 41.5611 17.8365 41.5626 17.825 50.4747C17.8207 53.7168 17.8765 53.855 17.5955 53.8985C17.4953 53.914 9.41936 53.907 8.70485 53.9063C8.21676 53.9059 8.23646 53.7499 8.24586 53.2559C8.42805 43.7372 8.36213 30.23 8.35231 28.2266C8.3117 22.3343 8.157 22.1864 8.45777 22.0889C8.64144 22.0301 15.0281 22.025 15.0808 22.0255C15.3537 22.0318 15.3869 22.2038 16.9617 25.3448C22.9388 37.2677 22.884 37.2947 23.4304 38.3175C23.7346 38.8866 26.9109 44.8302 27.2722 45.4044C27.4006 45.6082 27.4855 45.3934 27.8865 44.7218C35.334 32.2473 40.4194 22.1597 40.8377 21.9708ZM61.3191 42.1573C60.7204 42.005 59.4537 41.6824 53.6033 41.8643C53.1984 41.8769 53.0566 41.8085 53.0281 42.2159C53.0183 42.6554 52.9079 47.6208 53.0877 47.712C53.1147 47.714 58.6185 47.9689 60.7322 47.5811C64.3491 46.9175 64.1752 42.8842 61.3191 42.1573ZM56.7927 29.2208C52.9264 29.2386 52.8181 29.2589 52.7693 29.3253C52.7201 29.3946 52.6888 31.6544 52.7068 33.5352C52.7213 35.0541 52.7423 35.1351 52.9324 35.1427C59.1359 35.3911 60.4469 34.9816 61.0691 34.7872C63.2866 34.0945 63.9541 31.9138 62.5037 30.2442C61.4409 29.3698 60.352 29.2043 56.7927 29.2208Z" />`;

// Position du dossier (centré)
const dx = 170;
const dl = L - 2 * dx; // largeur du dossier
const hautArriere = 200; // haut de l'arrière du dossier
const hautAvant = 380; // haut de l'avant : le visuel dépasse au-dessus

// Fond : grille + onglet et arrière du dossier
const fond = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}">
  <defs>
    <pattern id="grille" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="${ligne}" stroke-width="2" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${paper}" />
  <rect width="100%" height="100%" fill="url(#grille)" />
  <rect x="${dx}" y="${hautArriere - 44}" width="${dl * 0.38}" height="90" rx="22" fill="${folderDark}" />
  <rect x="${dx}" y="${hautArriere}" width="${dl}" height="${H}" rx="26" fill="${folderDark}" />
</svg>`;

// Avant du dossier (par-dessus le visuel), avec une ombre nette et le logo
const avant = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}">
  <rect x="${dx - 10}" y="${hautAvant + 12}" width="${dl}" height="${H}" rx="26" fill="#000" fill-opacity="0.12" />
  <rect x="${dx}" y="${hautAvant}" width="${dl}" height="${H}" rx="26" fill="${folder}" />
  <g transform="translate(${dx + 48} ${hautAvant + 54}) scale(2.2) translate(-8 -21)" fill="${ink}">${logo}</g>
</svg>`;

export async function getStaticPaths() {
  const projets = await getProjets();
  return projets.map((projet) => ({ params: { slug: projet.slug }, props: { visuel: projet.image ?? projet.couverture } }));
}

export const GET: APIRoute = async ({ props }) => {
  const couches: sharp.OverlayOptions[] = [];

  // Visuel du projet : redimensionné pour tenir dans le dossier, aligné en haut,
  // légèrement tourné (comme sur les cartes), puis caché en bas par l'avant du dossier
  if (props.visuel) {
    try {
      const source = Buffer.from(await (await fetch(props.visuel)).arrayBuffer());
      const visuel = await sharp(source)
        .resize({ width: dl - 120, height: 400, fit: "inside" })
        .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
      const { width = 0 } = await sharp(visuel).metadata();
      couches.push({ input: visuel, left: Math.round((L - width) / 2), top: 70 });
    } catch {
      // Visuel introuvable : l'image de partage reste correcte avec le dossier seul
    }
  }

  couches.push({ input: Buffer.from(avant), left: 0, top: 0 });

  const png = await sharp(Buffer.from(fond)).composite(couches).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
