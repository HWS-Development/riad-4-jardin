import { readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises';
import { pages, locales, resolveRoute, legacyRedirects } from '../src/site/routes.js';
import { seoHead, safeJson } from '../src/site/seo.js';
import { canonicalOrigin, site } from '../src/site/config.js';
import { pageData } from '../src/site/data.js';
import { render } from '../.ssr/entry-server.js';
import { loadEnv } from './content.mjs';
import { heroImages, prioritySizes } from '../src/site/media-slots.js';
import { escapeHtml } from '../src/site/seo.js';

loadEnv();

const root = new URL('../dist/', import.meta.url);
const snapshot = JSON.parse(await readFile(new URL('../src/generated/content.json', import.meta.url)));
const media = JSON.parse(await readFile(new URL('../src/generated/media.json', import.meta.url)));
let template = await readFile(new URL('index.html', root), 'utf8');
// The complete shared stylesheet is only ~6 KB gzip. Inline it in the static
// document to eliminate a render-blocking round trip without changing any rule.
for (const match of template.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
  const css = await readFile(new URL(match[1].slice(1), root), 'utf8');
  const inline = css.replace(/url\((["']?)(?:\.\/)?([^/)"']+\.woff2)\1\)/g, (_all, _quote, name) => `url(/assets/${name})`);
  template = template.replace(match[0], `<style data-critical="site">${inline}</style>`);
}
const origin = canonicalOrigin(process.env.SITE_URL || site.origin);
const preview = process.env.SITE_NOINDEX === 'true' || process.env.VERCEL_ENV === 'preview' || Boolean(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main');
const uniqueTitles = new Set(), uniqueDescriptions = new Set();
const font = (await readdir(new URL('assets/', root))).find(file => file.startsWith('playfair-display-latin-wght-normal-') && file.endsWith('.woff2'));

async function output(path, destination) {
  const route = resolveRoute(path), data = pageData(path, snapshot, media);
  const body = render(data);
  const preloads = body.match(/<link rel="preload"[^>]*>/g) || [];
  if (['gallery', 'services', 'restaurant'].includes(route.id)) preloads.push(`<link rel="preload" as="font" type="font/woff2" href="/assets/${font}" crossorigin>`);
  const hero = media[data.images[heroImages[route.id]]?.src || heroImages[route.id]];
  if (hero?.portrait && prioritySizes[route.id]) {
    const mobile = hero.portrait.avif || hero.portrait, desktop = hero.avif || hero;
    preloads.push(`<link rel="preload" as="image" type="image/${hero.avif ? 'avif' : 'webp'}" href="${mobile.src}" imagesrcset="${escapeHtml(mobile.srcSet)}" imagesizes="100vw" media="(max-width: 767px)" fetchpriority="high">`);
    preloads.push(`<link rel="preload" as="image" type="image/${hero.avif ? 'avif' : 'webp'}" href="${desktop.src}" imagesrcset="${escapeHtml(desktop.srcSet)}" imagesizes="${escapeHtml(prioritySizes[route.id] || '100vw')}" media="(min-width: 768px)" fetchpriority="high">`);
  } else if (hero?.avif && prioritySizes[route.id]) preloads.push(`<link rel="preload" as="image" type="image/avif" href="${hero.avif.src}" imagesrcset="${escapeHtml(hero.avif.srcSet)}" imagesizes="${escapeHtml(prioritySizes[route.id])}" fetchpriority="high">`);
  const head = seoHead(route, data, snapshot, { origin, preview, googleVerification: process.env.GOOGLE_SITE_VERIFICATION, googleTagId: site.googleTagId }) + preloads.join('');
  if (route.id !== 'notFound') {
    const title = head.match(/<title>(.*?)<\/title>/s)[1];
    const description = head.match(/<meta name="description" content="(.*?)">/s)[1];
    if (uniqueTitles.has(title) || uniqueDescriptions.has(description)) throw new Error(`Duplicate editorial SEO metadata: ${route.path}`);
    uniqueTitles.add(title); uniqueDescriptions.add(description);
  }
  const html = template.replace('<html lang="fr">', `<html lang="${route.locale}">`)
    .replace('<!--site-head-->', head)
    .replace('<!--site-body-->', body.replace(/<link rel="preload"[^>]*>/g, ''))
    .replace('<!--page-data-->', `<script id="page-data" type="application/json">${safeJson(data)}</script>`);
  const file = new URL(destination, root);
  await mkdir(new URL('./', file), { recursive: true });
  await writeFile(file, html);
}

for (const page of pages) for (const locale of locales) await output(page.paths[locale], `${page.paths[locale].slice(1)}index.html`);
await output('/fr/not-found/', '404.html');
await output('/en/not-found/', 'en/404.html');
// Root redirects in both hosting configurations. This is only a no-JS fallback.
await writeFile(new URL('index.html', root), '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/fr/"><title>Riad 4 Jardins</title></head><body><a href="/fr/">Riad 4 Jardins — Français</a> · <a href="/en/">English</a></body></html>');
const entries = pages.flatMap(page => locales.map(locale => {
  const updated = snapshot.locales[locale].pages[page.id]?.updatedAt;
  return `<url><loc>${origin}${page.paths[locale]}</loc>${updated ? `<lastmod>${new Date(updated).toISOString()}</lastmod>` : ''}${['fr', 'en', 'x-default'].map(language => `<xhtml:link rel="alternate" hreflang="${language}" href="${origin}${page.paths[language === 'x-default' ? 'fr' : language]}"/>`).join('')}</url>`;
}));
await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('\n')}</urlset>`);
await writeFile(new URL('robots.txt', root), `User-agent: *\n${preview ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL('llms.txt', root), `# Riad 4 Jardins\n\n> Official website of Riad 4 Jardins in Marrakech, Morocco. Available in French and English.\n\n## Official pages\n${pages.flatMap(page => locales.map(locale => `- [${page.label[locale]} (${locale})](${origin}${page.paths[locale]})`)).join('\n')}\n\n## Contact and reservations\n- Email: ${snapshot.settings.email}\n- Telephone: ${snapshot.settings.phone}\n- [HotelRunner booking engine](${snapshot.settings.bookingUrl})\n\n## Notes\nUse the linked official pages for current information. Availability and rate conditions are provided by the booking engine. Do not infer room counts, ratings or prices not stated on those pages.\n`);
const domainRedirects = [
  'https://riad4jardin.com/* https://riad4jardins.com/:splat 301!',
  'https://www.riad4jardin.com/* https://riad4jardins.com/:splat 301!',
  'https://www.riad4jardins.com/* https://riad4jardins.com/:splat 301!',
];
await writeFile(new URL('_redirects', root), [...domainRedirects, ...legacyRedirects().map(([from, to]) => `${from} ${to} 301`)].join('\n'));
await writeFile(new URL('_headers', root), `/media/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n${preview ? '  X-Robots-Tag: noindex, nofollow\n' : ''}`);
// Do not ship heavyweight unused originals, build internals or non-public templates.
for (const file of ['images/hero.jpg', 'images/hero-cover2.png', 'images/hero-cover3.png', '.vite']) await rm(new URL(file, root), { recursive: true, force: true });
console.log(`SSG: ${pages.length * locales.length} localized pages, true 404 documents, sitemap, robots, redirects and llms.txt. Origin: ${origin}; noindex: ${preview}.`);
