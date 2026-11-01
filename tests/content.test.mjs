import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { syncContent, applySettings } from '../scripts/content.mjs';
import { site } from '../src/site/config.js';
import { pageData } from '../src/site/data.js';
import { resolveRoute } from '../src/site/routes.js';
import { seoHead } from '../src/site/seo.js';

test('published CMS data changes visible copy, photos and initial SEO; drafts are excluded', async () => {
  const originalFetch = globalThis.fetch, project = process.env.SANITY_PROJECT_ID, requireSanity = process.env.REQUIRE_SANITY, source = process.env.CONTENT_SOURCE;
  const file = new URL('../src/generated/content.json', import.meta.url), previous = await readFile(file);
  try {
    process.env.SANITY_PROJECT_ID = 'fixture';
    process.env.CONTENT_SOURCE = 'sanity';
    process.env.REQUIRE_SANITY = 'false';
    let requests = 0;
    globalThis.fetch = async url => {
      requests++;
      assert(String(url).startsWith('https://fixture.api.sanity.io/'));
      assert(decodeURIComponent(String(url)).includes('drafts.**'));
      return Response.json({ result: [
        { _type: 'page', _id: 'drafts.page-home-fr', pageId: 'home', locale: 'fr', texts: [{ key: 'home.bookTitle', value: 'Never publish this draft' }] },
        { _type: 'page', _id: 'page-home-fr', pageId: 'home', locale: 'fr', texts: [{ key: 'home.bookTitle', value: 'Titre publié dans Sanity' }], seo: { title: 'Titre SEO publié — Riad 4 Jardins à Marrakech', description: 'Une description de démonstration pour vérifier la publication du contenu éditorial et de ses métadonnées depuis Sanity.' }, images: [
          { key: 'home/rooms.jpg', alt: 'Nouvelle photo de chambre', asset: { url: 'https://cdn.sanity.io/images/fixture/production/abc-800x600.jpg' } },
          { key: 'home/airport.jpg', alt: 'Accueil — transfert', asset: { url: 'https://cdn.sanity.io/images/fixture/production/airport-home-800x600.jpg' } },
        ] },
        { _type: 'page', _id: 'page-services-fr', pageId: 'services', locale: 'fr', images: [{ key: 'home/airport.jpg', alt: 'Services — transfert', image: { _type: 'image', asset: { url: 'https://cdn.sanity.io/images/fixture/production/airport-services-800x600.jpg' } } }] },
      ] });
    };
    const snapshot = await syncContent();
    assert.equal(requests, 1);
    assert.equal(snapshot.source, 'sanity');
    const data = pageData('/fr/', snapshot, {});
    assert.equal(data.texts['home.bookTitle'], 'Titre publié dans Sanity');
    assert.equal(data.images['home/rooms.jpg'].alt, 'Nouvelle photo de chambre');
    assert.equal(data.images['home/rooms.jpg'].slot, 'home/rooms.jpg');
    assert.equal(data.images['home/airport.jpg'].alt, 'Accueil — transfert');
    assert.equal(pageData('/fr/services-activites/', snapshot, {}).images['home/airport.jpg'].alt, 'Services — transfert');
    assert.notEqual(data.images['home/airport.jpg'].src, pageData('/fr/services-activites/', snapshot, {}).images['home/airport.jpg'].src);
    const seo = seoHead(resolveRoute('/fr/'), data, snapshot, { origin: site.origin });
    assert(seo.includes('Titre SEO publié'));
    assert(!seo.includes('Never publish this draft'));
    const preview = seoHead(resolveRoute('/fr/'), data, snapshot, { origin: site.origin, preview: true });
    assert(preview.includes('noindex, follow'));
    globalThis.fetch = async () => new Response('Failure', { status: 503 });
    await assert.rejects(syncContent(), /refusing to publish stale content/);
  } finally {
    globalThis.fetch = originalFetch;
    if (project === undefined) delete process.env.SANITY_PROJECT_ID; else process.env.SANITY_PROJECT_ID = project;
    if (requireSanity === undefined) delete process.env.REQUIRE_SANITY; else process.env.REQUIRE_SANITY = requireSanity;
    if (source === undefined) delete process.env.CONTENT_SOURCE; else process.env.CONTENT_SOURCE = source;
    await writeFile(file, previous);
  }
});

test('editorial settings cannot inject script URLs or invalid physical coordinates', () => {
  assert.throws(() => applySettings(site, { instagram: 'javascript:alert(1)' }));
  assert.throws(() => applySettings(site, { mapsEmbedUrl: 'https://malicious.test/map' }));
  assert.throws(() => applySettings(site, { mapsUrl: 'http://www.google.com/maps' }));
  assert.throws(() => applySettings(site, { phone: 'invalid' }));
  assert.throws(() => applySettings(site, { longitude: 181 }));
  assert.equal(applySettings(site, { streetAddress: 'Adresse validée' }).streetAddress, 'Adresse validée');
});
