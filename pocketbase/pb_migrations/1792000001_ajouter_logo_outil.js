/// <reference path="../pb_data/types.d.ts" />
/* Migration 2 : ajoute le champ « logo_outil » à la collection projets.
   C'est le nom d'un logo affiché à côté de la catégorie (ex. "figma" → /img/figma.svg). */
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("projets");
    collection.fields.add(new TextField({ name: "logo_outil" }));
    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("projets");
    collection.fields.removeByName("logo_outil");
    app.save(collection);
  },
);
