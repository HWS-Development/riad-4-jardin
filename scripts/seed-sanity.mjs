import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { textDefaults, translationSlots, flatten, apiVersion, loadEnv } from './content.mjs';
import { resources } from '../src/i18n.js';
import { site } from '../src/site/config.js';
import { pages } from '../src/site/routes.js';
import { seoDefaults } from '../src/site/seo.js';
import { mediaSlots } from '../src/site/media-slots.js';
import { cms } from '../src/site/cms.js';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { validateConditions } from '../src/site/conditions.js';

export async function seedSanity({ client } = {}) {
loadEnv();
const dryRun = process.argv.includes('--dry-run');
const projectId = process.env.SANITY_PROJECT_ID || cms.projectId;
const dataset = process.env.SANITY_DATASET || cms.dataset;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!dryRun && (!projectId || (!token && !client))) throw new Error('Run npm run cms:import with the authenticated Sanity CLI, or configure a scoped migration token. Use --dry-run to inspect without writing.');
if (!/^[a-z0-9-]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset)) throw new Error('Invalid CMS project/dataset identifier');
if (client && (client.config().projectId !== projectId || client.config().dataset !== dataset)) throw new Error('Authenticated CMS client points to a different project/dataset.');
const uploaded = new Map();
const existingAssets = !dryRun && client ? await client.fetch('*[_type == "sanity.imageAsset"]{_id,sha1hash}') : [];
const byHash = new Map(existingAssets.map(asset => [asset.sha1hash, { _type: 'reference', _ref: asset._id }]));
const defaults = await textDefaults();
const translatedSlots = await translationSlots();
const conditions = {};
for (const locale of ['fr', 'en']) {
  const body = validateConditions(JSON.parse(await readFile(new URL(`../content/booking-conditions.${locale}.json`, import.meta.url), 'utf8')));
  conditions[locale] = { ...body, _type: 'conditions', sections: body.sections.map(section => ({
    ...section, _key: section.id, _type: 'conditionSection',
    ...(section.rates ? { rates: section.rates.map(rate => ({ ...rate, _key: rate.id, _type: 'rateCondition' })) } : {}),
  })) };
}
const documents = [{ _type: 'siteSettings', _id: 'site-settings', ...Object.fromEntries(['email', 'phone', 'phoneDisplay', 'whatsapp', 'streetAddress', 'postalCode', 'latitude', 'longitude', 'mapsUrl', 'mapsEmbedUrl', 'instagram', 'linkedin'].map(key => [key, site[key]])) }];

function photoAlt(key, locale) {
  const fr = locale === 'fr';
  if (key.startsWith('gallery/')) return defaults[locale][`gallery.photo${Number(key.match(/g(\d+)/)[1])}`];
  if (key.startsWith('rooms/')) return `${defaults[locale][`rooms.${key.split('/')[1]}Title`]} — ${fr ? 'vue de la chambre' : 'room interior'}`;
  const labels = {
    'logo-full.png': ['Riad 4 Jardins – Charme et traditions', 'Riad 4 Jardins – Charm and traditions'],
    'home/airport.jpg': ['Aéroport de Marrakech-Menara', 'Marrakech Menara airport'],
    'services/city.jpg': ['Découverte de Marrakech et de ses environs', 'Discover Marrakech and its surroundings'],
    'services/workshops.jpg': ['Atelier cuisine au riad', 'Cooking workshop at the riad'],
    'services/souk.jpg': ['Découverte des souks de Marrakech', 'Explore Marrakech souks'],
    'services/rooftop.jpg': ['Terrasse du Riad 4 Jardins', 'Riad 4 Jardins terrace'],
    'spa/hammam.jpg': ['Hammam traditionnel marocain', 'Traditional Moroccan hammam'],
    'spa/massage.jpg': ['Espace de massage au spa du riad', 'Massage room in the riad spa'],
    'spa/esthetique.jpg': ['Soins du visage au spa du riad', 'Facial treatments at the riad spa'],
    'restaurant/breakfast.jpg': ['Petit-déjeuner dans les jardins', 'Breakfast in the gardens'],
    'restaurant/table.jpg': ['Table dressée au Riad 4 Jardins', 'Dining table at Riad 4 Jardins'],
    'home/rooms.jpg': ['Chambre du Riad 4 Jardins', 'Room at Riad 4 Jardins'],
    'home/spa.jpg': ['Spa et bien-être au Riad 4 Jardins', 'Spa and wellness at Riad 4 Jardins'],
    'home/restaurant.jpg': ['Restaurant du Riad 4 Jardins', 'Riad 4 Jardins restaurant'],
    'home/souk.jpg': ['Les souks de Marrakech', 'Marrakech souks'],
  };
  return (labels[key] || ['Les jardins et espaces du Riad 4 Jardins', 'The gardens and spaces at Riad 4 Jardins'])[fr ? 0 : 1];
}

for (const locale of ['fr', 'en']) for (const pageId of [...pages.map(page => page.id), 'shared', 'notFound']) {
  const texts = Object.entries(defaults[locale]).filter(([key]) => pageId === 'shared' ? /^(header|footer|shared)\./.test(key) : key.startsWith(`${pageId}.`));
  if (pageId === 'home' || pageId === 'shared') for (const [key, value] of Object.entries(flatten(resources[locale].translation))) {
    if (![...translatedSlots].some(slot => key === slot || key.startsWith(`${slot}.`))) continue;
    if ((pageId === 'shared') === /^(nav|footer)\./.test(key)) texts.push([`i18n.${key}`, value]);
  }
  const images = [];
  for (const [index, key] of (mediaSlots[pageId] || []).entries()) {
    const path = key.startsWith('hero/') ? new URL(`../public/images/${key.slice(5)}`, import.meta.url) : new URL(`../src/assets/${key}`, import.meta.url);
    let asset;
    if (!dryRun && uploaded.has(path.href)) asset = uploaded.get(path.href);
    else if (!dryRun) {
      const bytes = await readFile(path);
      const sha1 = createHash('sha1').update(bytes).digest('hex');
      const endpoint = `assets/images/${dataset}?filename=${encodeURIComponent(key.split('/').at(-1))}`;
      let document;
      if (byHash.has(sha1)) asset = byHash.get(sha1);
      else if (client) document = await client.assets.upload('image', bytes, { filename: key.split('/').at(-1) });
      else {
        const upload = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/${endpoint}`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': key.endsWith('.png') ? 'image/png' : 'image/jpeg' }, body: bytes, signal: AbortSignal.timeout(30000),
        });
        if (!upload.ok) throw new Error(`Image import failed: ${key}, HTTP ${upload.status}`);
        document = (await upload.json()).document;
      }
      asset ||= { _type: 'reference', _ref: document._id };
      byHash.set(sha1, asset);
      uploaded.set(path.href, asset);
      console.log(`Imported image ${uploaded.size}: ${key}`);
    }
    const label = pageId === 'conditions' ? 'Image de partage — réseaux sociaux' : key === 'logo-full.png' ? 'Logo du Riad' : key.replace(/\.(jpg|png)$/, '').replaceAll('/', ' / ');
    images.push({ _type: 'photoSlot', _key: `photo${index}`, key, label, alt: photoAlt(key, locale), image: { _type: 'image', ...(asset ? { asset } : {}) } });
  }
  const seo = seoDefaults[locale][pageId];
  documents.push({ _id: `page-${pageId}-${locale}`, _type: 'page', pageId, locale, title: `${pages.find(page => page.id === pageId)?.label.fr || (pageId === 'shared' ? 'Textes communs' : 'Page 404')} — ${locale.toUpperCase()}`,
    texts: texts.map(([key, value], index) => ({ _type: 'textSlot', _key: `text${index}`, key, label: value.length > 95 ? `${value.slice(0, 92)}…` : value, value })), images,
    ...(seo ? { seo: { title: seo[0], description: seo[1] } } : {}),
    ...(pageId === 'conditions' ? { conditions: conditions[locale] } : {}),
  });
}
if (dryRun) {
  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
  await writeFile(new URL('../src/generated/sanity-seed.json', import.meta.url), JSON.stringify(documents, null, 2));
  console.log(`Dry run: ${documents.length} documents, no external writes. Preview: src/generated/sanity-seed.json`);
} else {
  const mutations = { mutations: documents.map(doc => ({ createIfNotExists: doc })) };
  if (client) await client.mutate(mutations.mutations);
  else {
  const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(mutations),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Sanity seed rejected (HTTP ${response.status}). Existing documents were not overwritten.`);
  }
  console.log(`Initialized ${documents.length} documents (createIfNotExists). Existing editorial changes preserved.`);
}
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try { await seedSanity(); }
  catch (error) { console.error(`CMS import failed: ${error.message}`); process.exitCode = 1; }
}
