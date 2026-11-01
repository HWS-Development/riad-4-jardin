import { getCliClient } from 'sanity/cli';
import { cms } from '../../src/site/cms.js';
import { seedSanity } from '../../scripts/seed-sanity.mjs';

try {
  const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 30000, maxRetries: 1 });
  await seedSanity({ client });
} catch (error) {
  // Do not print SDK error objects, which can contain authenticated request data.
  console.error(`CMS import failed: ${error.message}`);
  process.exitCode = 1;
}
