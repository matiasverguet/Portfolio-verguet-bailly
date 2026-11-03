// Transforme cv/cv.html en public/cv.pdf avec Microsoft Edge en mode « sans fenêtre » (headless).
// Commande : npm run cv
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import path from "node:path";

const dossier = path.dirname(fileURLToPath(import.meta.url));
const source = pathToFileURL(path.join(dossier, "cv.html")).href;
const sortie = path.join(dossier, "..", "public", "cv.pdf");
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

execFileSync(edge, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer", // pas de date ni d'adresse imprimées en haut et en bas
  "--allow-file-access-from-files", // pour charger les polices et l'image depuis le disque
  `--user-data-dir=${path.join(tmpdir(), "edge-cv")}`,
  `--print-to-pdf=${sortie}`,
  source,
], { stdio: "ignore" });

console.log("CV généré :", sortie);
