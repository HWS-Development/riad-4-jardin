import { loadEnv } from './content.mjs';
import { cms } from '../src/site/cms.js';
loadEnv();
console.log(JSON.stringify({
  contentSource: process.env.CONTENT_SOURCE || 'sanity',
  sanityProjectId: process.env.SANITY_PROJECT_ID || cms.projectId,
  sanityProjectConfigured: Boolean(process.env.SANITY_PROJECT_ID || cms.projectId),
  sanityWriteCredentialPresent: Boolean(process.env.SANITY_API_WRITE_TOKEN),
  emailjsServiceConfigured: Boolean(process.env.VITE_EMAILJS_SERVICE_ID),
  emailjsTemplateConfigured: Boolean(process.env.VITE_EMAILJS_TEMPLATE_ID),
  emailjsPublicKeyConfigured: Boolean(process.env.VITE_EMAILJS_PUBLIC_KEY),
  googleVerificationConfigured: Boolean(process.env.GOOGLE_SITE_VERIFICATION),
  unsafeLegacyBrowserSecretPresent: Boolean(process.env.VITE_RESEND_API_KEY),
}, null, 2));
