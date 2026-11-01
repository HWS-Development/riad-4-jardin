export const locales = ['fr', 'en'];

// Stable IDs are shared by navigation, SSG, canonicals, translations and the CMS.
export const pages = [
  { id: 'home', paths: { fr: '/fr/', en: '/en/' }, label: { fr: 'Accueil', en: 'Home' } },
  { id: 'rooms', paths: { fr: '/fr/chambres/', en: '/en/rooms/' }, label: { fr: 'Chambres', en: 'Rooms' }, legacy: '/chambres' },
  { id: 'spa', paths: { fr: '/fr/spa/', en: '/en/spa/' }, label: { fr: 'Spa & Bien-être', en: 'Spa & Wellness' }, legacy: '/spa' },
  { id: 'services', paths: { fr: '/fr/services-activites/', en: '/en/services-activities/' }, label: { fr: 'Services & Activités', en: 'Services & Activities' }, legacy: '/services-activites' },
  { id: 'restaurant', paths: { fr: '/fr/restaurant/', en: '/en/restaurant/' }, label: { fr: 'Restaurant', en: 'Restaurant' }, legacy: '/restaurant' },
  { id: 'gallery', paths: { fr: '/fr/galerie/', en: '/en/gallery/' }, label: { fr: 'Galerie', en: 'Gallery' }, legacy: '/galerie' },
  { id: 'contact', paths: { fr: '/fr/contact/', en: '/en/contact/' }, label: { fr: 'Contact & accès', en: 'Contact & directions' }, legacy: '/contact' },
  { id: 'conditions', paths: { fr: '/fr/conditions-reservation/', en: '/en/booking-conditions/' }, label: { fr: 'Conditions de réservation', en: 'Booking conditions' }, legacy: '/conditions-reservation' },
];

export function pagePath(id, locale = 'fr') {
  const page = pages.find(page => page.id === id || page.legacy === id || (id === '/' && page.id === 'home'));
  if (!page || !locales.includes(locale)) throw new Error(`Unknown page/locale: ${id}/${locale}`);
  return page.paths[locale];
}

export function resolveRoute(pathname) {
  for (const page of pages) {
    for (const locale of locales) {
      if (page.paths[locale] === pathname) return { ...page, locale, path: pathname };
    }
  }
  return { id: 'notFound', locale: pathname.startsWith('/en') ? 'en' : 'fr', path: pathname };
}

export function legacyRedirects() {
  return [
    ['/', '/fr/'], ['/index.html', '/fr/'], ['/home2', '/fr/'], ['/home2/', '/fr/'],
    ...pages.filter(page => page.legacy).flatMap(page => [[page.legacy, page.paths.fr], [`${page.legacy}/`, page.paths.fr]]),
    ...pages.flatMap(page => locales.map(locale => [page.paths[locale].slice(0, -1), page.paths[locale]])),
  ];
}
