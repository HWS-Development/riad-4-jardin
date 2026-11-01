const locales = [{ title: 'Français', value: 'fr' }, { title: 'English', value: 'en' }];
const required = rule => rule.required();

export const schemaTypes = [
  {
    name: 'page', title: 'Page du site', type: 'document',
    groups: [{ name: 'content', title: 'Textes', default: true }, { name: 'images', title: 'Photos' }, { name: 'seo', title: 'Référencement' }],
    fields: [
      { name: 'title', title: 'Page', type: 'string', readOnly: true },
      { name: 'pageId', type: 'string', hidden: true, validation: required },
      { name: 'locale', title: 'Langue', type: 'string', options: { list: locales }, readOnly: true, validation: required },
      { name: 'texts', title: 'Textes de la page', description: 'Modifiez les valeurs, sans changer la mise en page. Les versions FR et EN se gèrent séparément.', type: 'array', group: 'content', options: { sortable: false }, of: [{
        name: 'textSlot', title: 'Texte', type: 'object', fields: [
          { name: 'key', type: 'string', hidden: true, validation: required },
          { name: 'label', title: 'Emplacement', type: 'string', readOnly: true },
          { name: 'value', title: 'Texte affiché', type: 'text', rows: 4, validation: rule => rule.required().min(1).max(4000) },
        ], preview: { select: { title: 'label', subtitle: 'value' } },
      }] },
      { name: 'conditions', title: 'Conditions de réservation et de paiement', type: 'object', group: 'content', hidden: ({ document }) => document?.pageId !== 'conditions', fields: [
        { name: 'title', title: 'Titre de la page', type: 'string', validation: rule => rule.required().max(200) },
        { name: 'updatedAt', title: 'Date de mise à jour des conditions', type: 'date', validation: required },
        { name: 'sections', title: 'Les dix articles', description: 'Modifier les articles existants. Les identifiants et l’ordre protègent la structure et les liens du sommaire.', type: 'array', options: { sortable: false }, validation: rule => rule.required().length(10), of: [{
          name: 'conditionSection', type: 'object', fields: [
            { name: 'id', type: 'string', readOnly: true, validation: required },
            { name: 'title', title: 'Titre de l’article', type: 'string', validation: rule => rule.required().max(200) },
            { name: 'paragraphs', title: 'Paragraphes', type: 'array', of: [{ type: 'text', rows: 4 }], validation: rule => rule.max(30) },
            { name: 'items', title: 'Liste des modalités', type: 'array', of: [{ type: 'text', rows: 3 }], validation: rule => rule.max(30) },
            { name: 'rates', title: 'Conditions par tarif', type: 'array', options: { sortable: false }, of: [{ name: 'rateCondition', type: 'object', fields: [
              { name: 'id', type: 'string', readOnly: true, validation: required },
              { name: 'title', title: 'Nom du tarif', type: 'string', validation: rule => rule.required().max(200) },
              { name: 'items', title: 'Modalités', type: 'array', of: [{ type: 'text', rows: 3 }], validation: rule => rule.required().min(1).max(30) },
            ], preview: { select: { title: 'title', subtitle: 'id' } } }] },
          ], preview: { select: { title: 'title', subtitle: 'id' } },
        }] },
      ] },
      { name: 'images', title: 'Photographies', description: 'Remplacez la photo souhaitée et décrivez-la. Les formats WebP et les tailles mobiles sont générés automatiquement à la publication du site.', type: 'array', group: 'images', options: { sortable: false }, of: [{
        name: 'photoSlot', type: 'object', title: 'Photo', fields: [
          { name: 'key', type: 'string', hidden: true, validation: required },
          { name: 'label', title: 'Emplacement', type: 'string', readOnly: true },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: false }, validation: required },
          { name: 'alt', title: 'Description de la photo (accessibilité)', type: 'string', validation: rule => rule.required().max(250) },
        ], preview: { select: { title: 'label', subtitle: 'alt', media: 'image' } },
      }] },
      { name: 'seo', title: 'Référencement et partage', type: 'object', group: 'seo', fields: [
        { name: 'title', title: 'Titre pour les moteurs', description: 'Unique et naturel : sujet de la page, Marrakech et nom du Riad.', type: 'string', validation: rule => rule.required().min(15).max(75) },
        { name: 'description', title: 'Description pour les moteurs', description: 'Résumé utile de la page. Pas de répétitions artificielles de mots-clés.', type: 'text', rows: 3, validation: rule => rule.required().min(70).max(200) },
      ] },
    ],
    preview: { select: { title: 'title', subtitle: 'locale' } },
  },
  {
    name: 'siteSettings', title: 'Coordonnées du Riad', type: 'document',
    fields: [
      { name: 'email', title: 'Adresse e-mail de contact', type: 'string', validation: rule => rule.required().email() },
      { name: 'phone', title: 'Téléphone (format international, ex. +212…)', type: 'string', validation: rule => rule.required().regex(/^\+[1-9]\d{7,14}$/) },
      { name: 'phoneDisplay', title: 'Téléphone affiché', type: 'string', validation: required },
      { name: 'whatsapp', title: 'WhatsApp (chiffres uniquement, avec indicatif)', type: 'string', validation: rule => rule.required().regex(/^[1-9]\d{7,14}$/) },
      { name: 'streetAddress', title: 'Adresse postale exacte (hors ville et pays)', description: 'Publier uniquement une adresse confirmée par l’établissement.', type: 'string' },
      { name: 'mapsUrl', title: 'Lien Google Maps vérifié', type: 'url' },
      { name: 'postalCode', title: 'Code postal', type: 'string' },
      { name: 'latitude', title: 'Latitude vérifiée', type: 'number', validation: rule => rule.min(-90).max(90) },
      { name: 'longitude', title: 'Longitude vérifiée', type: 'number', validation: rule => rule.min(-180).max(180) },
      { name: 'mapsEmbedUrl', title: 'URL d’intégration Google Maps', description: 'Copier uniquement le src HTTPS de l’iframe Partager > Intégrer une carte.', type: 'url', validation: rule => rule.custom(value => !value || /^https:\/\/www\.google\.com\/maps(?:\/embed|\?)/.test(value) || 'Utiliser une URL d’intégration Google Maps officielle.') },
      { name: 'instagram', title: 'Instagram officiel', type: 'url', validation: required },
      { name: 'linkedin', title: 'LinkedIn officiel', type: 'url', validation: required },
    ],
    preview: { prepare: () => ({ title: 'Riad 4 Jardins — coordonnées' }) },
  },
];
