import { getCliClient } from 'sanity/cli';
import { mkdir, writeFile } from 'node:fs/promises';
import { cms } from '../../src/site/cms.js';

try {
  const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 30000, maxRetries: 1 });
  const docs = await client.fetch('*[_type=="page" && !(_id in path("drafts.**")) && count(images[defined(asset)]) > 0]{_id,_rev,images}');
  const artifacts = new URL('../../artifacts/', import.meta.url);
  await mkdir(artifacts, { recursive: true });
  await writeFile(new URL('cms-image-slot-migration-backup.json', artifacts), JSON.stringify(docs, null, 2));
  let count = 0;
  for (const doc of docs) {
    const images = doc.images.map(slot => {
      if (slot.image?.asset || !slot.asset) return slot;
      const { asset, crop, hotspot, ...rest } = slot;
      return { ...rest, image: { _type: 'image', asset, ...(crop ? { crop } : {}), ...(hotspot ? { hotspot } : {}) } };
    });
    await client.patch(doc._id).ifRevisionId(doc._rev).set({ images }).commit({ visibility: 'sync' });
    count++;
    console.log(`Preserved image references and fields: ${doc._id}`);
  }
  console.log(`Migrated ${count} page documents to native image inputs. Texts and SEO were not changed.`);
} catch (error) {
  console.error(`Image model migration failed: ${error.message}`);
  process.exitCode = 1;
}
