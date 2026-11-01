import { mkdir, writeFile } from 'node:fs/promises';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';

const runs = Number(process.env.LH_RUNS || 3);
const paths = (process.env.LH_PATHS || '/fr/,/en/,/fr/chambres/,/en/rooms/,/fr/contact/,/en/contact/,/fr/conditions-reservation/,/en/booking-conditions/').split(',');
const origin = process.env.LH_ORIGIN || 'http://127.0.0.1:4173';
const output = new URL('../artifacts/performance/', import.meta.url);
await mkdir(output, { recursive: true });
const reports = [];
for (const path of paths) {
  const results = [];
  for (let run = 0; run < runs; run++) {
    const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
    try {
      const result = await lighthouse(`${origin}${path}`, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
      const lhr = result.lhr;
      await writeFile(new URL(`${path.replaceAll('/', '-')}-${run + 1}.json`, output), result.report);
      results.push({ lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime, scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, category]) => [key, Math.round(category.score * 100)])), lcp: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue, tbt: lhr.audits['total-blocking-time'].numericValue,
        issues: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 1 && audit.details?.type !== 'opportunity').map(audit => ({ id: audit.id, title: audit.title, displayValue: audit.displayValue })) });
      console.log(path, run + 1, JSON.stringify(results.at(-1)));
    } finally { await chrome.kill(); }
  }
  const median = values => values.sort((a,b) => a-b)[Math.floor(values.length / 2)];
  reports.push({ path, origin, runs, device: 'Lighthouse default mobile simulated throttling', results, medians: { ...Object.fromEntries(Object.keys(results[0].scores).map(key => [key, median(results.map(result => result.scores[key]))])), lcp: median(results.map(result => result.lcp)), cls: median(results.map(result => result.cls)), tbt: median(results.map(result => result.tbt)) } });
}
const summary = process.env.LH_SUMMARY || 'performance-summary.json';
if (!/^[a-z0-9-]+\.json$/.test(summary)) throw new Error('LH_SUMMARY must be a simple JSON file name.');
await writeFile(new URL(`../artifacts/${summary}`, import.meta.url), JSON.stringify(reports, null, 2));
