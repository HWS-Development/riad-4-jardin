import { defineCliConfig } from 'sanity/cli';
import { cms } from '../src/site/cms.js';
export default defineCliConfig({
  api: { projectId: process.env.SANITY_STUDIO_PROJECT_ID || cms.projectId, dataset: process.env.SANITY_STUDIO_DATASET || cms.dataset },
  deployment: { appId: 'ocrakxjkie5bdwb93hn229f3', autoUpdates: false },
});
