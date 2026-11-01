import { getCliClient } from 'sanity/cli';
import { cms } from '../../src/site/cms.js';

try {
  const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 20000, maxRetries: 0 });
  const counts = await client.fetch('{"pages":count(*[_type=="page"]),"images":count(*[_type=="sanity.imageAsset"]),"settings":count(*[_id=="site-settings"])}');
  console.log(JSON.stringify({ projectId: cms.projectId, dataset: cms.dataset, authenticated: Boolean(client.config().token), counts }, null, 2));
} catch (error) {
  console.error(`CMS verification failed: ${error.message}`);
  process.exitCode = 1;
}
