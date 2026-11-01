import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { site } from '../src/site/config.js';
import { validateConditions } from '../src/site/conditions.js';

test('client-confirmed conditions and business identity stay aligned without exposing template annotations', async () => {
  const conditions = JSON.parse(await readFile(new URL('../content/booking-conditions.fr.json', import.meta.url), 'utf8'));
  assert.equal(conditions.approval.status, 'client_confirmed');
  assert.equal(conditions.updatedAt, '2026-10-28');
  assert.equal(conditions.sections.length, 10);
  assert.equal(new Set(conditions.sections.map(section => section.id)).size, 10);
  for (const key of ['email', 'phone', 'streetAddress', 'postalCode']) assert.equal(site[key], conditions.property[key], `Contact mismatch: ${key}`);
  const publicText = JSON.stringify(conditions.sections);
  assert(!/À compléter|VERSION DE TRAVAIL|FICHE DE VALIDATION/.test(publicText));
  const rates = conditions.sections.find(section => section.id === 'rates').rates;
  assert.equal(rates.length, 3);
  assert(rates.find(rate => rate.id === 'flexible').items.some(item => item.includes('5 jours') && item.includes('23 h 59')));
  assert(conditions.sections.find(section => section.id === 'refunds').paragraphs[0].includes('7 jours ouvrés'));
  assert(conditions.sections.find(section => section.id === 'arrival').items.some(item => item.includes('20 € par nuit')));
});

test('published conditions are complete, translated consistently and stripped of internal metadata', async () => {
  const fr = JSON.parse(await readFile(new URL('../content/booking-conditions.fr.json', import.meta.url), 'utf8'));
  const en = JSON.parse(await readFile(new URL('../content/booking-conditions.en.json', import.meta.url), 'utf8'));
  const body = validateConditions(en);
  assert.deepEqual(body.sections.map(section => section.id), fr.sections.map(section => section.id));
  assert.equal(body.approval, undefined);
  assert.equal(body.property, undefined);
  assert(body.sections[2].rates[0].items.some(item => item.includes('5 days') && item.includes('23:59')));
  assert(body.sections[5].paragraphs[0].includes('7 business days'));
  assert(body.sections[6].items.some(item => item.includes('14:00')));
  assert(body.sections[6].items.some(item => item.includes('11:00')));
  assert(body.sections[6].items.some(item => item.includes('€20 per night')));
  assert.throws(() => validateConditions({ ...en, updatedAt: '2026-02-31' }));
  assert.throws(() => validateConditions({ ...en, sections: en.sections.slice(1) }));
});
