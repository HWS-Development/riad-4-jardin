import { getCliClient } from 'sanity/cli';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { cms } from '../../src/site/cms.js';
import { textDefaults } from '../../scripts/content.mjs';

try {
  const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 20000, maxRetries: 0 });
  const doc = await client.getDocument('page-home-fr');
  const text = doc.texts.find(entry => entry.key === 'home.bookTitle');
  const photo = doc.images.find(entry => entry.key === 'home/rooms.jpg');
  const asset = await client.getDocument((photo.image?.asset || photo.asset)._ref);
  const expectedText = (await textDefaults()).fr['home.bookTitle'];
  const bytes = await readFile(new URL('../../src/assets/home/rooms.jpg', import.meta.url));
  const hash = createHash('sha1').update(bytes).digest('hex');
  let recovered = false;
  if (text.value !== expectedText || asset.sha1hash !== hash) {
    const replacement = (await client.getDocument('page-rooms-fr')).images.find(entry => entry.key === 'rooms/deluxe/main.jpg');
    if (text.value !== 'Réservez votre séjour à Marrakech' || (photo.image?.asset || photo.asset)._ref !== (replacement.image?.asset || replacement.asset)._ref) throw new Error('Content differs from both the original and the known verification state; no automatic overwrite performed.');
    const originalAssetId = await client.fetch('*[_type=="sanity.imageAsset" && sha1hash==$hash][0]._id', { hash });
    if (!originalAssetId) throw new Error('Original source asset not found.');
    await client.patch(doc._id).ifRevisionId(doc._rev).set({
      [`texts[_key=="${text._key}"].value`]: expectedText,
      [`images[_key=="${photo._key}"].${photo.image ? 'image.asset' : 'asset'}`]: { _type: 'reference', _ref: originalAssetId },
    }).commit({ visibility: 'sync' });
    recovered = true;
  }
  const current = await client.getDocument(doc._id);
  const currentPhoto = current.images.find(entry => entry.key === 'home/rooms.jpg');
  const currentAsset = await client.getDocument((currentPhoto.image?.asset || currentPhoto.asset)._ref);
  const report = { projectId: cms.projectId, checkedAt: new Date().toISOString(), textRestored: current.texts.find(entry => entry.key === 'home.bookTitle').value === expectedText, photoRestored: currentAsset.sha1hash === hash, recoveryNeeded: recovered };
  if (!report.textRestored || !report.photoRestored) throw new Error('Restoration check failed.');
  await mkdir(new URL('../../artifacts/', import.meta.url), { recursive: true });
  await writeFile(new URL('../../artifacts/cms-restoration-check.json', import.meta.url), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  console.error(`CMS restoration check failed: ${error.message}`);
  process.exitCode = 1;
}
