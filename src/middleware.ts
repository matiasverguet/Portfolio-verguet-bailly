// En-têtes de sécurité ajoutés à chaque réponse envoyée par le serveur Astro.
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
  const reponse = await next();
  reponse.headers.set("X-Content-Type-Options", "nosniff"); // le navigateur ne devine pas le type des fichiers
  reponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin"); // n'envoie pas l'adresse complète aux sites tiers
  reponse.headers.set("X-Frame-Options", "DENY"); // le site ne peut pas être affiché dans une iframe (clickjacking)
  reponse.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return reponse;
});
