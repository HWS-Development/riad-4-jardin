import { pages, pagePath } from './routes.js';
import { canonicalOrigin } from './config.js';
import { heroImages } from './media-slots.js';

export const seoDefaults = {
  fr: {
    home: ['Riad 4 Jardins | Riad avec jardins et spa à Marrakech', 'Séjournez au Riad 4 Jardins dans la médina de Marrakech : suites, jardins, hammam et cuisine marocaine. Découvrez les offres de réservation directe.'],
    rooms: ['Chambres et suites à Marrakech | Riad 4 Jardins', 'Découvrez les suites du Riad 4 Jardins à Marrakech : suite deluxe avec balcon, suite triple avec vue sur jardins et suite double. Réservez en direct.'],
    spa: ['Spa, hammam et massages à Marrakech | Riad 4 Jardins', 'Découvrez le hammam marocain, les massages et les soins du spa du Riad 4 Jardins à Marrakech. Contactez notre équipe pour préparer votre rendez-vous.'],
    services: ['Transfert et activités à Marrakech | Riad 4 Jardins', 'Préparez votre séjour au Riad 4 Jardins : transfert depuis l’aéroport de Marrakech, ateliers et excursions au Maroc. Contactez le riad pour organiser votre arrivée.'],
    restaurant: ['Restaurant marocain à Marrakech | Riad 4 Jardins', 'Cuisine marocaine, petit-déjeuner dans les jardins et atelier cuisine au Riad 4 Jardins à Marrakech. Découvrez la restauration et contactez notre équipe.'],
    gallery: ['Photos du riad à Marrakech | Riad 4 Jardins', 'Explorez en photos les chambres, les jardins et les espaces du Riad 4 Jardins à Marrakech. Préparez votre séjour et découvrez notre riad avant de réserver.'],
    contact: ['Contact et accès à Marrakech | Riad 4 Jardins', 'Contactez le Riad 4 Jardins à Marrakech par téléphone ou par e-mail pour préparer votre séjour, votre transfert aéroport ou une demande de réservation.'],
    conditions: ['Conditions de réservation et paiement | Riad 4 Jardins', 'Consultez les conditions du Riad 4 Jardins à Marrakech : tarifs, paiement, annulation, remboursements et horaires d’arrivée et de départ.'],
    notFound: ['Page introuvable | Riad 4 Jardins', 'Cette page est introuvable. Retrouvez les chambres, le spa et les informations de contact du Riad 4 Jardins à Marrakech.'],
  },
  en: {
    home: ['Riad 4 Jardins | Gardens and Spa in Marrakech Medina', 'Stay at Riad 4 Jardins in Marrakech medina. Explore suites, gardens, a Moroccan hammam and local cuisine, and discover our direct booking offers.'],
    rooms: ['Rooms and Suites in Marrakech | Riad 4 Jardins', 'Explore Riad 4 Jardins suites in Marrakech: a deluxe suite with balcony, a triple suite with garden views and a double suite. Book directly with the riad.'],
    spa: ['Spa, Hammam and Massage in Marrakech | Riad 4 Jardins', 'Discover the Moroccan hammam, massages and spa treatments at Riad 4 Jardins in Marrakech. Contact our team to arrange your wellness appointment.'],
    services: ['Marrakech Transfers and Activities | Riad 4 Jardins', 'Plan your Riad 4 Jardins stay with Marrakech airport transfers, workshops and excursions in Morocco. Contact the riad to arrange your arrival and activities.'],
    restaurant: ['Moroccan Restaurant in Marrakech | Riad 4 Jardins', 'Enjoy Moroccan cuisine, breakfast in the gardens and cooking workshops at Riad 4 Jardins in Marrakech. Explore our dining and contact the team.'],
    gallery: ['Marrakech Riad Photo Gallery | Riad 4 Jardins', 'Browse photos of the rooms, gardens and spaces at Riad 4 Jardins in Marrakech. Discover the riad and find inspiration for your stay before booking.'],
    contact: ['Contact and Directions in Marrakech | Riad 4 Jardins', 'Contact Riad 4 Jardins in Marrakech by phone or email to plan your stay, arrange an airport transfer or discuss a direct booking enquiry.'],
    conditions: ['Booking and Payment Conditions | Riad 4 Jardins', 'Read the booking conditions for Riad 4 Jardins in Marrakech, including rates, payment, cancellation, refunds, check-in and check-out.'],
    notFound: ['Page Not Found | Riad 4 Jardins', 'This page could not be found. Explore the rooms, spa and contact information for Riad 4 Jardins in Marrakech.'],
  },
};

export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

export function seoHead(route, data, snapshot, { origin, preview = false, googleVerification = '', googleTagId = '' } = {}) {
  origin = canonicalOrigin(origin);
  const fallback = seoDefaults[route.locale][route.id];
  const cms = snapshot.locales[route.locale].pages[route.id]?.seo;
  const title = cms?.title || fallback[0], description = cms?.description || fallback[1];
  if (title.length > 75 || description.length > 200 || !title.trim() || !description.trim()) throw new Error(`Invalid SEO length: ${route.path}`);
  const indexable = route.id !== 'notFound';
  const url = `${origin}${route.path}`;
  const selected = data.images[heroImages[route.id]]?.src || heroImages[route.id];
  const image = data.media[selected]?.variants.at(-1)?.src;
  const label = pages.find(page => page.id === route.id)?.label[route.locale];
  const entity = {
    '@type': 'Hotel', '@id': `${origin}/#riad`, name: data.settings.name, url: `${origin}/fr/`,
    telephone: data.settings.phone, email: data.settings.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA', ...(data.settings.streetAddress ? { streetAddress: data.settings.streetAddress } : {}), ...(data.settings.postalCode ? { postalCode: data.settings.postalCode } : {}) },
    ...(Number.isFinite(data.settings.latitude) && Number.isFinite(data.settings.longitude) ? { geo: { '@type': 'GeoCoordinates', latitude: data.settings.latitude, longitude: data.settings.longitude } } : {}),
    sameAs: [data.settings.instagram, data.settings.linkedin].filter(Boolean),
    ...(image ? { image: `${origin}${image}` } : {}),
    ...(data.settings.mapsUrl ? { hasMap: data.settings.mapsUrl } : {}),
    availableLanguage: ['French', 'English'],
  };
  const graph = [entity, { '@type': 'WebSite', '@id': `${origin}/#website`, url: origin, name: data.settings.name, inLanguage: ['fr', 'en'], publisher: { '@id': `${origin}/#riad` } },
    { '@type': route.id === 'contact' ? 'ContactPage' : 'WebPage', '@id': `${url}#page`, url, name: title, description, inLanguage: route.locale, isPartOf: { '@id': `${origin}/#website` }, about: { '@id': `${origin}/#riad` } }];
  if (indexable && route.id !== 'home') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: route.locale === 'fr' ? 'Accueil' : 'Home', item: `${origin}${pagePath('home', route.locale)}` },
    { '@type': 'ListItem', position: 2, name: label, item: url },
  ] });
  return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
${googleVerification ? `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}">` : ''}
${googleTagId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${safeJson(googleTagId)});</script>` : ''}
<meta name="robots" content="${preview || !indexable ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
${indexable ? `<link rel="canonical" href="${url}">
${['fr', 'en', 'x-default'].map(locale => `<link rel="alternate" hreflang="${locale}" href="${origin}${pagePath(route.id, locale === 'x-default' ? 'fr' : locale)}">`).join('\n')}` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Riad 4 Jardins">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${route.locale === 'fr' ? 'fr_MA' : 'en_GB'}">
<meta property="og:locale:alternate" content="${route.locale === 'fr' ? 'en_GB' : 'fr_MA'}">
${image ? `<meta property="og:image" content="${origin}${image}"><meta property="og:image:alt" content="${escapeHtml(data.settings.name)} — Marrakech">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
${image ? `<meta name="twitter:image" content="${origin}${image}">` : ''}
${indexable ? `<script type="application/ld+json">${safeJson({ '@context': 'https://schema.org', '@graph': graph })}</script>` : ''}`;
}
