import { chromium } from '@playwright/test';
/* global document, sessionStorage, scrollTo */
import { mkdir, writeFile } from 'node:fs/promises';
import { pages } from '../src/site/routes.js';
import { fileURLToPath } from 'node:url';
const root = new URL('../artifacts/visual/', import.meta.url);
await mkdir(root, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
await context.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
const images = [];
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const entry of pages) {
    await page.goto(`http://127.0.0.1:4173${entry.paths.fr}`);
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === 'true');
    for (let y = 0; y < await page.locator('body').evaluate(body => body.scrollHeight); y += 700) {
      await page.evaluate(y => scrollTo(0, y), y);
      await page.waitForTimeout(90);
    }
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => {}))));
    if (entry.id === 'contact') {
      await page.locator('iframe').scrollIntoViewIfNeeded();
      await page.frameLocator('iframe').getByText('Terms', { exact: true }).waitFor({ timeout: 15000 });
      await page.screenshot({ path: fileURLToPath(new URL(`contact-map-${width}.png`, root)), animations: 'disabled' });
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: fileURLToPath(new URL(`${entry.id}-${width}.png`, root)), fullPage: true, animations: 'disabled' });
    images.push({ width, page: entry.id, photos: await page.locator('main img').evaluateAll(images => images.map(image => ({ currentSrc: image.currentSrc, width: image.naturalWidth, height: image.naturalHeight, rendered: { width: image.clientWidth, height: image.clientHeight } }))) });
  }
}
await writeFile(new URL('media-selection.json', root), JSON.stringify(images, null, 2));
await browser.close();
console.log(`${pages.length * 2} screenshots and responsive currentSrc evidence saved to artifacts/visual/.`);
