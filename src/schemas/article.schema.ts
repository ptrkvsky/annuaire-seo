import { Schema } from '@sanity/schema';

const schemaArticle = Schema.compile({
  name: 'article',
  types: [
    {
      type: 'object',
      name: 'article',
      fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        {
          name: 'articleCategory',
          title: 'Catégorie',
          description: "Catégorie à laquelle appartient l'article",
          type: 'reference',
          to: [{ type: 'category' }],
        },
        {
          name: 'articleUser',
          title: 'Utilisateur',
          type: 'reference',
          to: [{ type: 'user' }],
        },
        {
          name: 'content',
          title: "Contenu de l'article",
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

export default schemaArticle;
