/// <reference path="../pb_data/types.d.ts" />
/* Migration 7 : collection « messages » pour le formulaire de contact.
   Règles d'accès :
   - createRule "" : tout le monde peut ENVOYER un message (le formulaire public) ;
   - list / view / update / delete null : personne ne peut lire les messages par l'API,
     seul l'administrateur les voit dans l'interface de PocketBase (données personnelles, RGPD).
   Les contrôles (champs obligatoires, format de l'email, longueur) sont faits par PocketBase :
   même si quelqu'un contourne le formulaire, la base refuse une donnée invalide. */
migrate(
  (app) => {
    const collection = new Collection({
      type: "base",
      name: "messages",
      listRule: null,
      viewRule: null,
      createRule: "",
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: "text", name: "nom", required: true, min: 2, max: 100 },
        { type: "email", name: "email", required: true },
        { type: "select", name: "sujet", required: true, maxSelect: 1, values: ["Stage/Alternance", "Identité visuelle", "Autre"] },
        { type: "text", name: "message", required: true, min: 10, max: 5000 },
        { type: "bool", name: "lu" }, // pour cocher dans l'interface les messages déjà traités
        { type: "autodate", name: "created", onCreate: true },
        { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
      ],
    });
    app.save(collection);

    // Anti-spam : 3 messages maximum par minute pour une même adresse IP
    try {
      const settings = app.settings();
      settings.rateLimits.enabled = true;
      settings.rateLimits.rules.push({ label: "messages:create", audience: "", duration: 60, maxRequests: 3 });
      app.save(settings);
    } catch (erreur) {
      console.log("Limite anti-spam non appliquée : " + erreur);
    }
  },
  (app) => {
    app.delete(app.findCollectionByNameOrId("messages"));
  },
);
