import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages, locales } from '../../src/site/routes.js';

test('all production routes, requests, hydration, initial content and HTTP statuses', async ({ page, request }) => {
  const errors = [], failures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) failures.push(response.url()); });
  for (const entry of pages) for (const locale of locales) {
    const response = await page.goto(entry.paths[locale]);
    expect(response.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await page.waitForLoadState('networkidle');
  }
  expect(errors).toEqual([]); expect(failures).toEqual([]);
  expect((await request.get('/not-a-real-route/')).status()).toBe(404);
  expect((await request.get('/en/not-a-real-route/')).status()).toBe(404);
  const old = await request.get('/chambres', { maxRedirects: 0 });
  expect(old.status()).toBe(301); expect(old.headers().location).toBe('/fr/chambres/');
});

test('responsive layout, logos and menus preserve usable geometry', async ({ page }) => {
  test.setTimeout(180000);
  await page.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
  for (const [width, height] of [[320, 740], [390, 844], [430, 932], [768, 1024], [1024, 768], [1440, 900], [1920, 1080], [844, 390]]) {
    await page.setViewportSize({ width, height });
    for (const entry of pages) for (const locale of locales) {
      await page.goto(entry.paths[locale]);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(overflow, `${width}×${height}: ${locale}/${entry.id}`).toBe(false);
      if (entry.id === 'contact' && width >= 768) {
        const picture = await page.locator('main img').first().boundingBox();
        expect(picture.x, 'Contact photo must stay in the right-hand desktop column').toBeGreaterThan(width / 2 - 10);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/chambres/');
  await page.locator('.header-menu > summary').click();
  await expect(page.getByRole('navigation', { name: 'Navigation principale' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.header-menu')).not.toHaveAttribute('open');
  for (const name of ['Chaabi Payment', 'Verified by Visa', 'Mastercard SecureCode']) {
    const image = page.getByRole('img', { name, exact: true });
    await image.scrollIntoViewIfNeeded(); await image.evaluate(image => image.decode());
    expect(await image.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
  }
});

test('equivalent locale navigation and gallery keyboard/focus behavior', async ({ page }) => {
  await page.goto('/fr/chambres/');
  await page.locator('.language-menu:visible > summary').click();
  await page.locator('.language-menu:visible a[lang=en]').click();
  await expect(page).toHaveURL(/\/en\/rooms\/$/);
  await page.goto('/en/gallery/');
  await page.locator('main a[data-photo]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const original = await dialog.locator('img').getAttribute('src');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('img')).not.toHaveAttribute('src', original);
  await page.keyboard.press('Escape'); await expect(dialog).toHaveCount(0);
  await expect(page.locator('main a[data-photo]').first()).toBeFocused();
});

test('early form input survives hydration; only an accepted response claims success', async ({ page }) => {
  await page.route('**/assets/client-*.js', async route => { await new Promise(resolve => setTimeout(resolve, 400)); await route.continue(); });
  let sent;
  await page.route('https://api.emailjs.com/**', route => {
    sent = JSON.parse(route.request().postData()).template_params;
    return route.fulfill({ status: 503, body: 'Unavailable' });
  });
  await page.goto('/fr/restaurant/');
  await page.locator('main #name').fill('Test interne');
  await page.locator('main #phone').fill('+212600000000');
  await page.locator('main button[type=submit]').click();
  await expect(page.locator('main [role=status]')).toContainText('erreur');
  await expect(page.locator('main [role=status]')).not.toContainText('bien été envoyée');
  expect(sent.name).toBe('Test interne'); expect(sent.phone).toBe('+212600000000');
  await page.unroute('https://api.emailjs.com/**');
  await page.route('https://api.emailjs.com/**', route => route.fulfill({ status: 200, body: 'OK' }));
  await page.locator('main button[type=submit]').click();
  await expect(page.locator('main [role=status]')).toContainText('bien été envoyée');
});

for (const locale of locales) test(`accessibility: home, rooms, spa, contact (${locale})`, async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
  for (const id of ['home', 'rooms', 'spa', 'services', 'restaurant', 'gallery', 'contact', 'conditions']) {
    await page.goto(pages.find(page => page.id === id).paths[locale]);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), id).toEqual([]);
  }
});

test('confirmed booking conditions are readable and linked in both languages', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
  await page.goto('/fr/');
  await page.locator('footer').getByRole('link', { name: 'Conditions de réservation', exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/conditions-reservation\/$/);
  await expect(page.locator('main section[id^="conditions-"]')).toHaveCount(10);
  await expect(page.locator('#conditions-rates')).toContainText('5 jours');
  await expect(page.locator('#conditions-refunds')).toContainText('7 jours ouvrés');
  await expect(page.locator('#conditions-arrival')).toContainText('20 € par nuit');
  await expect(page.locator('main')).not.toContainText('VERSION DE TRAVAIL');
  await page.locator('.language-menu:visible > summary').click();
  await page.locator('.language-menu:visible a[lang=en]').click();
  await expect(page).toHaveURL(/\/en\/booking-conditions\/$/);
  await expect(page.locator('#conditions-rates')).toContainText('23:59');
  await expect(page.locator('#conditions-contact')).toContainText('info@riad4jardins.com');
});

test('without JavaScript: visible HTML, navigation and native menu still work', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/en/');
  await expect(page.locator('main')).toContainText('Marrakech');
  await page.locator('.header-menu > summary').click();
  await page.getByRole('link', { name: 'Rooms', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/rooms\/$/);
  await page.locator('main a[data-photo]').first().click();
  await expect(page).toHaveURL(/\/media\/.*\.webp$/);
  await context.close();
});

test('reduced motion keeps the hero static and offers dialog has working keyboard dismissal', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fr/');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Fermer la fenêtre' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await page.waitForTimeout(6500);
  await expect(page.locator('main > div > section').first().locator('picture')).toHaveCount(1);
});

test('all photographs decode when scrolled into view, including the lower sections', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
  for (const entry of pages) {
    await page.goto(entry.paths.fr);
    const photos = page.locator('main img');
    for (let index = 0; index < await photos.count(); index++) {
      const photo = photos.nth(index);
      await photo.scrollIntoViewIfNeeded();
      await photo.evaluate(image => image.decode());
      expect(await photo.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
    }
  }
});
