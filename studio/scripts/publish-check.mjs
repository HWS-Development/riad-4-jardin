import { getCliClient } from 'sanity/cli';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { cms } from '../../src/site/cms.js';
import assert from 'node:assert/strict';

const root = new URL('../../', import.meta.url);
const report = { projectId: cms.projectId, dataset: cms.dataset, startedAt: new Date().toISOString(), transport: 'authenticated Sanity SDK, published documents', restored: false };
const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 30000, maxRetries: 1 });
let original, expectedRevision;
const textKey = 'home.bookTitle';
const imageKey = 'home/rooms.jpg';

function build() {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'build'], { cwd: fileURLToPath(root), env: { ...process.env, NODE_ENV: 'production' }, stdio: 'inherit', timeout: 180000 });
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0 ? resolve() : reject(new Error(`Verification build failed (${signal || code})`)));
  });
}
async function save() {
  await mkdir(new URL('artifacts/', root), { recursive: true });
  await writeFile(new URL('artifacts/cms-publication-check.json', root), JSON.stringify(report, null, 2));
}
async function card(locale) {
  const html = await readFile(new URL(`dist/${locale}/index.html`, root), 'utf8');
  const $ = load(html);
  return { text: $('main').text(), src: $('main article').first().find('img').attr('src') };
}

try {
  original = await client.getDocument('page-home-fr');
  const room = await client.getDocument('page-rooms-fr');
  if (!original || !room) throw new Error('Initialize published content before checking publication.');
  const target = original.texts.find(entry => entry.key === textKey);
  const photo = original.images.find(entry => entry.key === imageKey);
  const replacement = room.images.find(entry => entry.key === 'rooms/deluxe/main.jpg');
  const photoAsset = photo?.image?.asset || photo?.asset;
  const replacementAsset = replacement?.image?.asset || replacement?.asset;
  if (!target || !photoAsset || !replacementAsset || photoAsset._ref === replacementAsset._ref) throw new Error('Missing/distinct verification content slots.');
  const before = await card('fr'), english = await card('en');
  report.originalImageSrc = before.src;
  report.phase = 'prepared';
  await save();
  await writeFile(new URL('artifacts/cms-publication-backup.json', root), JSON.stringify({ _id: original._id, _rev: original._rev, texts: original.texts, images: original.images }, null, 2));
  const marker = 'Réservez votre séjour à Marrakech';
  const published = await client.patch(original._id).ifRevisionId(original._rev).set({
    texts: original.texts.map(entry => entry.key === textKey ? { ...entry, value: marker } : entry),
    images: original.images.map(entry => entry.key !== imageKey ? entry : entry.image ? { ...entry, image: { ...entry.image, asset: replacementAsset } } : { ...entry, asset: replacementAsset }),
  }).commit({ visibility: 'sync' });
  expectedRevision = published._rev;
  report.temporaryPublishedRevision = expectedRevision;
  report.phase = 'temporarily_published';
  await save();
  console.log('Published a temporary, factual heading and an existing Riad room photo for verification.');
  await build();
  const after = await card('fr'), englishAfter = await card('en');
  if (!after.text.includes(marker)) throw new Error('The published heading is absent from initial visible HTML.');
  if (after.src === before.src) throw new Error('The published image did not change in the generated HTML.');
  if (englishAfter.src !== english.src) throw new Error('A French image edit unexpectedly changed the English image.');
  if (englishAfter.text !== english.text) throw new Error('A French text edit unexpectedly changed English content.');
  report.changedImageSrc = after.src;
  report.textPublishedInInitialHtml = true;
  report.imagePublishedInInitialHtml = true;
  report.localeIsolation = true;
  report.temporaryPublishedRevision = expectedRevision;
  report.phase = 'verified';
  await save();
  console.log('PASS: published text and image are in initial HTML; English image is unchanged.');
} catch (error) {
  report.error = error.message;
  process.exitCode = 1;
} finally {
  if (original && expectedRevision) {
    try {
      await client.patch(original._id).ifRevisionId(expectedRevision).set({ texts: original.texts, images: original.images }).commit({ visibility: 'sync' });
      report.restored = true;
      report.phase = 'originals_restored_rebuilding';
      await save();
      console.log('Original content restored in Sanity. Regenerating the final local build.');
      await build();
      const restored = await card('fr');
      assert(restored.text.includes(original.texts.find(entry => entry.key === textKey).value), 'Original heading not restored in HTML.');
      assert.equal(restored.src, report.originalImageSrc, 'Original photo not restored in HTML.');
      console.log('PASS: original client text and photo restored; final build regenerated.');
      report.phase = 'complete';
    } catch (error) {
      report.restoreError = error.message;
      process.exitCode = 1;
    }
  }
  report.finishedAt = new Date().toISOString();
  await save();
  console.log(JSON.stringify(report, null, 2));
}
