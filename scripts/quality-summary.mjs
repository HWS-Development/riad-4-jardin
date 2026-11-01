import { readFile, readdir, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const root = new URL('../', import.meta.url);
const summary = process.env.QUALITY_SUMMARY || 'performance-summary.json';
if (!/^[a-z0-9-]+\.json$/.test(summary)) throw new Error('QUALITY_SUMMARY must be a simple JSON file name.');
const reports = JSON.parse(await readFile(new URL(`artifacts/${summary}`, root)));
console.log('| Route | Performance | Accessibilité | Bonnes pratiques | SEO | LCP médian | CLS médian |');
console.log('| --- | ---: | ---: | ---: | ---: | ---: | ---: |');
for (const { path, medians } of reports) console.log(`| ${path} | ${medians.performance} | ${medians.accessibility} | ${medians['best-practices']} | ${medians.seo} | ${(medians.lcp / 1000).toFixed(2)} s | ${medians.cls.toFixed(4)} |`);
const sample = JSON.parse(await readFile(new URL('artifacts/performance/-fr--1.json', root)));
console.log('Tool / device:', sample.lighthouseVersion, sample.environment.hostUserAgent, JSON.stringify(sample.configSettings.throttling), JSON.stringify(sample.configSettings.screenEmulation));
console.log('Runs:', reports.length, 'routes ×', reports[0].runs, 'runs; recorded from', reports[0].results[0].fetchTime, 'to', reports.at(-1).results.at(-1).fetchTime);
console.log('Home initial script transfer bytes:', sample.audits['network-requests'].details.items.filter(item => /\.js(?:\?|$)/.test(item.url)).reduce((sum, item) => sum + item.transferSize, 0));
const assets = new URL('dist/assets/', root);
let jsGzip = 0, cssGzip = 0, fonts = 0;
for (const file of await readdir(assets)) {
  const buffer = await readFile(new URL(file, assets));
  if (file.endsWith('.js')) jsGzip += gzipSync(buffer).length;
  if (file.endsWith('.css')) cssGzip += gzipSync(buffer).length;
  if (file.endsWith('.woff2')) fonts += buffer.length;
}
const media = JSON.parse(await readFile(new URL('src/generated/media.json', root)));
const hero = media['hero/hero.jpg'];
const mobile = (hero.portrait.avif || hero.portrait).variants.at(-1);
const desktop = (hero.avif || hero).variants.at(-1);
console.log('Budgets (bytes):', JSON.stringify({ allRouteJsGzip: jsGzip, stylesheetGzip: cssGzip, allFonts: fonts, heroMobile: (await stat(new URL(`dist${mobile.src}`, root))).size, heroDesktop: (await stat(new URL(`dist${desktop.src}`, root))).size }));
