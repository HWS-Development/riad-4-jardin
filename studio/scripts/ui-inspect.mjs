import { getCliClient } from 'sanity/cli';
import { chromium } from '@playwright/test';
import { cms } from '../../src/site/cms.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

let browser;
try {
  const client = getCliClient({ projectId: cms.projectId, dataset: cms.dataset, apiVersion: cms.apiVersion }).withConfig({ useCdn: false, timeout: 20000, maxRetries: 0 });
  const originalRevision = (await client.getDocument('page-home-fr'))._rev;
  const token = client.config().token;
  if (!token) throw new Error('Run with the authenticated CLI session.');
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  // Ephemeral test context only: no storage state or network trace is persisted.
  // The bearer is sent solely to the provider's own API, never to a CDN/site.
  await context.route(/^https:\/\/(?:7041qvs5\.)?api\.sanity\.io\//, route => route.continue({
    headers: route.request().method() === 'OPTIONS' ? route.request().headers() : { ...route.request().headers(), authorization: `Bearer ${token}` },
  }));
  const page = await context.newPage();
  page.setDefaultTimeout(6000);
  await page.goto('http://127.0.0.1:3333/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const body = await page.locator('body').innerText();
  console.log('UI status', JSON.stringify({ editorNavigation: body.includes('Pages en français'), hasLogin: /Log in|Sign in|Se connecter/.test(body) }));
  if (!body.includes('Pages en français')) throw new Error('The authenticated editor did not load.');
  if (await page.getByRole('button', { name: 'Dismiss', exact: true }).count()) await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.getByText('Pages en français', { exact: true }).click();
  await page.getByText('Accueil', { exact: true }).click();
  await page.waitForTimeout(1500);
  // Inspect a mounted editorial field; long arrays use Sanity's virtual list.
  await page.getByText('Aéroport de Marrakech-Menara', { exact: true }).first().click();
  const textInput = page.getByLabel('Texte affiché', { exact: false });
  await textInput.waitFor({ state: 'visible' });
  const textEditable = await textInput.isEditable();
  await page.waitForTimeout(500);
  const artifacts = new URL('../../artifacts/studio/', import.meta.url);
  await mkdir(artifacts, { recursive: true });
  if ((await page.locator('body').innerText()).includes(token)) throw new Error('Unexpected sensitive value in editor UI; no screenshot saved.');
  await page.screenshot({ path: fileURLToPath(new URL('text-editor.png', artifacts)) });
  await page.keyboard.press('Escape');
  await page.getByTestId('group-tab-images').click();
  await page.getByText('home / rooms', { exact: true }).click();
  const altInput = page.getByLabel('Description de la photo (accessibilité)', { exact: false });
  await altInput.waitFor({ state: 'visible' });
  const imageAltEditable = await altInput.isEditable();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Open image options menu', exact: true }).click();
  const chooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('menuitem', { name: 'Upload', exact: true }).click();
  const chooser = await chooserPromise;
  const imageUploadAvailable = Boolean(chooser);
  if ((await page.locator('body').innerText()).includes(token)) throw new Error('Unexpected sensitive value in editor UI; no screenshot saved.');
  await page.screenshot({ path: fileURLToPath(new URL('image-editor.png', artifacts)), animations: 'disabled' });
  const contentUnchanged = (await client.getDocument('page-home-fr'))._rev === originalRevision;
  const result = { checkedAt: new Date().toISOString(), projectId: cms.projectId, authenticatedEditor: true, textEditable, imageAltEditable, imageUploadAvailable, credentialsPersisted: false, changesMade: !contentUnchanged };
  if (!textEditable || !imageAltEditable || !imageUploadAvailable) throw new Error('Expected editable text and image controls are missing.');
  if (!contentUnchanged) throw new Error('Unexpected content change during read-only UI inspection.');
  await writeFile(new URL('ui-check.json', artifacts), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  await context.close();
} catch (error) {
  console.error(`CMS UI inspection failed: ${error.message}`);
  process.exitCode = 1;
} finally { await browser?.close(); }
