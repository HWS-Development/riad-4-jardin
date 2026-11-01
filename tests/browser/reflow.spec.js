import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('mobile accessibility, short menus and 200%-equivalent desktop reflow', async ({ browser }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 720, height: 450 }, { width: 390, height: 320 }]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: viewport.width === 720 ? 2 : 1, reducedMotion: 'reduce' });
    await context.addInitScript(() => sessionStorage.setItem('r4j-offers-dismissed', '1'));
    const page = await context.newPage();
    for (const path of ['/fr/', '/en/', '/fr/chambres/', '/en/rooms/', '/fr/contact/', '/en/contact/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations.map(violation => violation.id), `${viewport.width}×${viewport.height} ${path}`).toEqual([]);
    }
    await page.locator('.header-menu > summary').click();
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: 'Gallery', exact: true }).scrollIntoViewIfNeeded();
    await expect(nav.getByRole('link', { name: 'Gallery', exact: true })).toBeInViewport();
    await page.keyboard.press('Escape');
    await context.close();
  }
});
