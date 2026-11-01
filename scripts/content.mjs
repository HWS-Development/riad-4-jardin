import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { parse } from '@babel/parser';
import { resources } from '../src/i18n.js';
import { site } from '../src/site/config.js';
import { pages, locales } from '../src/site/routes.js';
import { mediaSlots } from '../src/site/media-slots.js';
import { cms } from '../src/site/cms.js';
import { validateConditions } from '../src/site/conditions.js';

export const generated = new URL('../src/generated/', import.meta.url);
export const apiVersion = cms.apiVersion;
export function loadEnv() { try { process.loadEnvFile('.env'); } catch (error) { if (error.code !== 'ENOENT') throw error; } }

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const [key, child] of Object.entries(node)) {
    if (key === 'loc') continue;
    if (Array.isArray(child)) child.forEach(value => walk(value, visit));
    else if (child && typeof child === 'object') walk(child, visit);
  }
}

export async function textDefaults() {
  const result = { fr: {}, en: {} };
  for (const dir of ['pages', 'components']) {
    for (const file of await readdir(new URL(`../src/${dir}/`, import.meta.url))) {
      if (!file.endsWith('.jsx')) continue;
      const ast = parse(await readFile(new URL(`../src/${dir}/${file}`, import.meta.url), 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
      walk(ast, node => {
        if (node.type !== 'CallExpression' || node.callee.name !== 'copy') return;
        const [key, fr, en] = node.arguments;
        if (![key, fr, en].every(value => value?.type === 'StringLiteral')) throw new Error(`Editorial copy requires three literal strings in ${file}`);
        for (const [locale, value] of [['fr', fr.value], ['en', en.value]]) {
          if (result[locale][key.value] && result[locale][key.value] !== value) throw new Error(`Duplicate copy key ${key.value}`);
          result[locale][key.value] = value;
        }
      });
    }
  }
  return result;
}

export async function translationSlots() {
  const keys = new Set();
  for (const dir of ['pages', 'components']) for (const file of await readdir(new URL(`../src/${dir}/`, import.meta.url))) {
    if (!file.endsWith('.jsx')) continue;
    const ast = parse(await readFile(new URL(`../src/${dir}/${file}`, import.meta.url), 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
    walk(ast, node => {
      if (node.type === 'CallExpression' && node.callee.name === 't' && node.arguments[0]?.type === 'StringLiteral') keys.add(node.arguments[0].value);
    });
  }
  return keys;
}

export function flatten(object, prefix = '', output = {}) {
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) flatten(value, path, output);
    else output[path] = value;
  }
  return output;
}

export function setKnown(object, path, value) {
  const keys = path.split('.');
  if (keys.some(key => ['__proto__', 'prototype', 'constructor'].includes(key))) throw new Error('Invalid editorial key');
  let target = object;
  for (const key of keys.slice(0, -1)) {
    if (!Object.hasOwn(target, key)) throw new Error(`Unknown translation ${path}`);
    target = target[key];
  }
  if (!Object.hasOwn(target, keys.at(-1))) throw new Error(`Unknown translation ${path}`);
  target[keys.at(-1)] = value;
}

export function applySettings(current, values) {
  const next = { ...current };
  for (const key of ['email', 'phone', 'phoneDisplay', 'whatsapp', 'streetAddress', 'postalCode', 'mapsUrl', 'mapsEmbedUrl', 'instagram', 'linkedin']) {
    if (typeof values[key] === 'string') next[key] = values[key].trim();
  }
  for (const key of ['latitude', 'longitude']) if (values[key] !== undefined) {
    const limit = key === 'latitude' ? 90 : 180;
    if (!Number.isFinite(values[key]) || Math.abs(values[key]) > limit) throw new Error(`Invalid coordinate: ${key}`);
    next[key] = values[key];
  }
  if (!/^\S+@\S+\.\S+$/.test(next.email)) throw new Error('Invalid contact email');
  if (!/^\+[1-9]\d{7,14}$/.test(next.phone) || !/^[1-9]\d{7,14}$/.test(next.whatsapp)) throw new Error('Invalid phone/WhatsApp number');
  for (const key of ['mapsUrl', 'mapsEmbedUrl', 'instagram', 'linkedin']) {
    if (!next[key]) continue;
    const url = new URL(next[key]);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`Invalid HTTPS URL: ${key}`);
    if (key === 'mapsEmbedUrl' && !(url.hostname === 'www.google.com' && url.pathname.startsWith('/maps') && (url.pathname.startsWith('/maps/embed') || url.searchParams.get('output') === 'embed'))) throw new Error('Invalid Google Maps embed');
  }
  return next;
}

export async function syncContent() {
  loadEnv();
  const defaults = await textDefaults();
  const snapshot = { settings: { ...site }, locales: {}, source: 'repository' };
  for (const locale of locales) snapshot.locales[locale] = {
    translations: structuredClone(resources[locale].translation), texts: defaults[locale], pages: {}, images: {},
    conditions: validateConditions(JSON.parse(await readFile(new URL(`../content/booking-conditions.${locale}.json`, import.meta.url), 'utf8'))),
  };
  const projectId = (process.env.CONTENT_SOURCE || 'sanity') === 'sanity' ? (process.env.SANITY_PROJECT_ID || cms.projectId) : undefined;
  if (!projectId && process.env.REQUIRE_SANITY === 'true') throw new Error('Sanity is required for this build. Set SANITY_PROJECT_ID and SANITY_DATASET.');
  if (projectId) {
    if (!/^[a-z0-9-]+$/.test(projectId)) throw new Error('Invalid Sanity project ID');
    const dataset = process.env.SANITY_DATASET || cms.dataset;
    if (!/^[a-z0-9_-]+$/.test(dataset)) throw new Error('Invalid Sanity dataset');
    const query = '*[(_type == "page" || _type == "siteSettings") && !(_id in path("drafts.**"))]{..., images[]{..., asset->, image{...,asset->}}}';
    const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Sanity content unavailable (${response.status}); refusing to publish stale content.`);
    const { result } = await response.json();
    const docs = result.filter(doc => !doc._id.startsWith('drafts.'));
    if (process.env.REQUIRE_SANITY !== 'false') {
      const expected = [...pages.map(page => page.id), 'shared', 'notFound'].flatMap(pageId => locales.map(locale => `page-${pageId}-${locale}`));
      if (!docs.some(doc => doc._id === 'site-settings') || expected.some(id => !docs.some(doc => doc._id === id))) throw new Error('Sanity initialization is incomplete. Seed the published page documents before deploying.');
    }
    const settings = docs.find(doc => doc._type === 'siteSettings' && doc._id === 'site-settings');
    if (settings) snapshot.settings = applySettings(snapshot.settings, settings);
    for (const doc of docs.filter(doc => doc._type === 'page')) {
      if (!locales.includes(doc.locale) || ![...pages.map(page => page.id), 'shared', 'notFound'].includes(doc.pageId)) throw new Error(`Invalid CMS page ${doc._id}`);
      if (doc._id !== `page-${doc.pageId}-${doc.locale}`) throw new Error(`Unexpected duplicate/unmanaged CMS document: ${doc._id}`);
      const target = snapshot.locales[doc.locale];
      for (const entry of doc.texts || []) {
        if (typeof entry.value !== 'string' || !entry.value.trim()) continue;
        if (entry.key.startsWith('i18n.')) setKnown(target.translations, entry.key.slice(5), entry.value);
        else if (Object.hasOwn(target.texts, entry.key)) target.texts[entry.key] = entry.value;
        else throw new Error(`Unknown content slot ${entry.key}; re-seed the CMS after a code update.`);
      }
      target.pages[doc.pageId] = { seo: doc.seo, updatedAt: doc._updatedAt };
      if (doc.pageId === 'conditions') target.conditions = validateConditions(doc.conditions);
      for (const image of doc.images || []) {
        if (![...mediaSlots.shared, ...(mediaSlots[doc.pageId] || [])].includes(image.key)) throw new Error(`Unknown image slot ${image.key}`);
        const value = image.image || image;
        if (!value.asset?.url) continue;
        const url = new URL(value.asset.url);
        if (url.hostname !== 'cdn.sanity.io' || url.protocol !== 'https:') throw new Error('Invalid CMS asset origin');
        if (image.alt !== undefined && (typeof image.alt !== 'string' || image.alt.length > 250)) throw new Error('Invalid image alternative text');
        target.images[`${doc.pageId}:${image.key}`] = { src: `cms/${doc.locale}/${doc.pageId}/${image.key.replaceAll('/', '-')}`, slot: image.key, url: url.href, alt: image.alt, crop: value.crop };
      }
    }
    snapshot.source = 'sanity';
  }
  await mkdir(generated, { recursive: true });
  await writeFile(new URL('content.json', generated), JSON.stringify(snapshot));
  console.log(`Content: ${snapshot.source}; ${Object.keys(defaults.fr).length} editable FR/EN text slots.`);
  return snapshot;
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href) await syncContent();
