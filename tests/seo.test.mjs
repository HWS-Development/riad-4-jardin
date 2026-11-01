import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { load } from 'cheerio';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import sharp from 'sharp';
import { pages, locales, pagePath, resolveRoute, legacyRedirects } from '../src/site/routes.js';
import { canonicalOrigin, site } from '../src/site/config.js';
import { safeJson } from '../src/site/seo.js';
import { setKnown, textDefaults } from '../scripts/content.mjs';

test('production artifacts never ship the development JSX runtime', async () => {
  const files = await readdir(new URL('../dist/assets/', import.meta.url));
  assert(!files.some(file => file.includes('jsx-dev-runtime')), 'Build with NODE_ENV=production, including when invoked from the Studio CLI.');
});

test('route and locale mapping never sends an equivalent page to the home', () => {
  for (const page of pages) for (const locale of locales) {
    assert.equal(resolveRoute(pagePath(page.id, locale)).id, page.id);
    assert.equal(resolveRoute(pagePath(page.id, locale)).locale, locale);
  }
  assert.equal(resolveRoute('/en/missing/').id, 'notFound');
  assert.equal(resolveRoute('/en/missing/').locale, 'en');
  assert.throws(() => pagePath('invented', 'en'));
  const redirects = new Map(legacyRedirects());
  assert.equal(redirects.get('/chambres'), '/fr/chambres/');
  assert.equal(redirects.get('/home2/'), '/fr/');
  for (const [from, to] of redirects) { assert.notEqual(from, to); assert(!redirects.has(to), `Redirect chain ${from}`); }
});

test('canonical configuration and serialized CMS values cannot inject markup or prototype keys', () => {
  assert.equal(canonicalOrigin('https://riad4jardins.com/'), 'https://riad4jardins.com');
  for (const origin of ['http://riad4jardins.com', 'https://example.com', 'https://localhost/', 'https://riad4jardins.com/fr/', 'https://user:pass@riad4jardins.com']) assert.throws(() => canonicalOrigin(origin));
  const value = '</script><script>alert(1)</script>';
  assert(!safeJson({ value }).includes('<'));
  assert.equal(JSON.parse(safeJson({ value })).value, value);
  assert.throws(() => setKnown({}, '__proto__.polluted', 'yes'));
  assert.equal({}.polluted, undefined);
  const data = { offers: { items: ['a', 'b'] } };
  setKnown(data, 'offers.items.0', 'A'); assert.equal(data.offers.items[0], 'A');
  assert.throws(() => setKnown(data, 'unknown.value', 'x'));
});

test('every localized document ships complete SEO and visible content before JavaScript', async () => {
  const titles = new Set(), descriptions = new Set();
  for (const page of pages) for (const locale of locales) {
    const path = page.paths[locale];
    const html = await readFile(new URL(`../dist${path}index.html`, import.meta.url), 'utf8');
    const $ = load(html), title = $('title').text(), description = $('meta[name=description]').attr('content');
    assert.equal($('html').attr('lang'), locale);
    assert.equal($('main h1').length, 1, path);
    assert($('main').text().trim().length > 100, path);
    assert(!titles.has(title)); titles.add(title);
    assert(!descriptions.has(description)); descriptions.add(description);
    assert(title.length > 15 && title.length < 76, title);
    assert(description.length > 70 && description.length < 201, description);
    assert.equal($('link[rel=canonical]').attr('href'), `https://riad4jardins.com${path}`);
    for (const language of ['fr', 'en', 'x-default']) assert.equal($(`link[hreflang=${language}]`).attr('href'), `https://riad4jardins.com${page.paths[language === 'x-default' ? 'fr' : language]}`);
    const json = JSON.parse($('script[type="application/ld+json"]').text());
    assert(json['@graph'].some(item => item['@type'] === 'Hotel'));
    assert(!html.includes('aggregateRating'), 'Do not mark up unverified reviews.');
    assert($('meta[property="og:image"]').attr('content').startsWith('https://riad4jardins.com/media/'));
    assert.equal($(`script[src="https://www.googletagmanager.com/gtag/js?id=${site.googleTagId}"]`).length, 1);
    assert($('head').html().includes(`gtag('config',"${site.googleTagId}")`));
    $('main img').each((_, image) => {
      const element = $(image);
      assert(element.attr('src').endsWith('.webp'), `${path}: non-WebP photograph`);
      assert(element.attr('srcset')?.includes('w'), path);
      assert(element.attr('sizes'), path);
      assert(Number(element.attr('width')) > 0 && Number(element.attr('height')) > 0);
      assert(element.attr('alt') !== undefined);
    });
    const payload = JSON.parse($('#page-data').text());
    assert.equal(payload.pageId, page.id);
    assert.equal(payload.locale, locale);
    assert($('footer').text().includes('Developed by HWS'));
  }
  const notFound = load(await readFile(new URL('../dist/404.html', import.meta.url), 'utf8'));
  assert(notFound('meta[name=robots]').attr('content').includes('noindex'));
  assert.equal(notFound('link[rel=canonical]').length, 0);
});

test('sitemap and robots contain exactly the canonical localized routes', async () => {
  const xml = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.equal(XMLValidator.validate(xml), true);
  const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml);
  assert.equal(parsed.urlset.url.length, pages.length * 2);
  assert.deepEqual(parsed.urlset.url.map(url => url.loc).sort(), pages.flatMap(page => locales.map(locale => `https://riad4jardins.com${page.paths[locale]}`)).sort());
  for (const entry of parsed.urlset.url) assert.equal(entry['xhtml:link'].length, 3);
  const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  assert(robots.includes('Allow: /'));
  assert(robots.includes('Sitemap: https://riad4jardins.com/sitemap.xml'));
  const redirects = await readFile(new URL('../dist/_redirects', import.meta.url), 'utf8');
  for (const host of ['riad4jardin.com', 'www.riad4jardin.com', 'www.riad4jardins.com']) {
    assert(redirects.includes(`https://${host}/* https://riad4jardins.com/:splat 301!`));
  }
  const vercel = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.deepEqual(vercel.redirects.slice(0, 3).map(rule => rule.has[0].value), ['riad4jardin\\.com', 'www\\.riad4jardin\\.com', 'www\\.riad4jardins\\.com']);
  assert(vercel.redirects.slice(0, 3).every(rule => rule.destination === 'https://riad4jardins.com/:path*'));
  assert(vercel.redirects.slice(0, 2).every(rule => rule.statusCode === 301));
  assert(vercel.redirects[2].permanent);
  const localizedPaths = new Set(pages.flatMap(page => locales.flatMap(locale => [page.paths[locale], page.paths[locale].slice(0, -1)])));
  const aliases = new Map(vercel.redirects.filter(rule => !rule.has).map(rule => [rule.source, rule]));
  for (const [from, to] of legacyRedirects()) {
    if (localizedPaths.has(from)) continue; // Vercel normalizes localized trailing slashes itself.
    const rule = aliases.get(from);
    assert(rule, `Missing Vercel legacy redirect: ${from}`);
    assert.equal(rule.destination, to);
    assert.equal(rule.statusCode, 301);
    assert(localizedPaths.has(to), `Legacy redirect must end at an existing page: ${from}`);
  }
});

test('generated responsive photos really are WebP and are never upscaled', async () => {
  const media = JSON.parse(await readFile(new URL('../src/generated/media.json', import.meta.url)));
  for (const image of Object.values(media)) {
    let previous = 0;
    for (const variant of image.variants) {
      assert(variant.width <= image.width && variant.width > previous); previous = variant.width;
      const meta = await sharp(await readFile(new URL(`../dist${variant.src}`, import.meta.url))).metadata();
      assert.equal(meta.format, 'webp'); assert.equal(meta.width, variant.width);
    }
  }
});

test('editorial defaults contain both languages for each explicit copy slot', async () => {
  const texts = await textDefaults();
  assert(Object.keys(texts.fr).length >= 150);
  assert.deepEqual(Object.keys(texts.fr), Object.keys(texts.en));
  for (const locale of locales) for (const value of Object.values(texts[locale])) assert(typeof value === 'string' && value.trim());
});
