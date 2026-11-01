export const site = {
  origin: 'https://riad4jardins.com',
  googleTagId: 'G-D3T47X1HLY',
  name: 'Riad 4 Jardins',
  city: 'Marrakech',
  country: 'MA',
  email: 'info@riad4jardins.com',
  phone: '+212808653506',
  phoneDisplay: '+212 808 653 506',
  whatsapp: '212718919926',
  bookingUrl: 'https://riad-4-jardins-spa.hotelrunner.com/bv3/search',
  instagram: 'https://www.instagram.com/riad4jardins/',
  linkedin: 'https://www.linkedin.com/company/riad-4-jardins/',
  // Contact/address confirmed in the client's conditions received 2026-10-28.
  // Map coordinates verified on the property's own HotelRunner engine.
  streetAddress: '6 Derb Arset Aouzal',
  postalCode: '40000',
  latitude: 31.6312682684012,
  longitude: -7.99487516284,
  mapsUrl: 'https://www.google.com/maps/place/31.6312682684012,-7.99487516284',
  mapsEmbedUrl: 'https://www.google.com/maps?q=31.6312682684012%2C-7.99487516284&z=16&output=embed',
};

export function canonicalOrigin(value = site.origin) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /localhost|example\./.test(url.hostname)) {
    throw new Error('SITE_URL must be the final HTTPS origin, without a path, credentials or query.');
  }
  return url.origin;
}
