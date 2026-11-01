import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas.js';
import { cms } from '../src/site/cms.js';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || cms.projectId;
if (!projectId) throw new Error('Configurez SANITY_STUDIO_PROJECT_ID dans studio/.env.local avec votre projet Sanity Free.');
const pageNames = { home: 'Accueil', rooms: 'Chambres', spa: 'Spa', services: 'Services & activités', restaurant: 'Restaurant', gallery: 'Galerie', contact: 'Contact', conditions: 'Conditions de réservation', shared: 'Textes communs', notFound: 'Page 404' };

export default defineConfig({
  name: 'riad-4-jardins', title: 'Riad 4 Jardins — Contenus',
  projectId, dataset: process.env.SANITY_STUDIO_DATASET || cms.dataset,
  // No AI Assist, media-library add-on, paid roles or paid plugins.
  plugins: [structureTool({ structure: S => S.list().title('Votre site').items([
    S.listItem().title('Coordonnées du Riad').child(S.document().schemaType('siteSettings').documentId('site-settings')),
    ...['fr', 'en'].map(locale => S.listItem().title(locale === 'fr' ? 'Pages en français' : 'Pages in English').child(
      S.list().title(locale === 'fr' ? 'Français' : 'English').items(Object.entries(pageNames).map(([id, title]) =>
        S.listItem().title(title).child(S.document().schemaType('page').documentId(`page-${id}-${locale}`)),
      )),
    )),
  ]) })],
  schema: { types: schemaTypes, templates: [] },
  document: {
    newDocumentOptions: () => [],
    actions: (previous, { schemaType }) => ['page', 'siteSettings'].includes(schemaType)
      ? previous.filter(action => !['delete', 'duplicate', 'unpublish'].includes(action.action))
      : previous,
  },
});
