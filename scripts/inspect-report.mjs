import { readFile } from 'node:fs/promises';
for (const name of process.argv.slice(2)) {
  const report = JSON.parse(await readFile(name, 'utf8'));
  const audits = report.audits;
  console.log(name);
  console.log('Config', JSON.stringify(report.configSettings));
  for (const key of ['lcp-breakdown-insight', 'lcp-discovery-insight', 'image-delivery-insight', 'heading-order']) console.log(key, JSON.stringify(audits[key]?.details));
  console.log('Requests', JSON.stringify(audits['network-requests'].details.items.map(item => ({ url: item.url, bytes: item.transferSize, start: item.networkRequestTime, end: item.networkEndTime, priority: item.priority })).sort((a,b) => b.bytes - a.bytes).slice(0,15)));
}
