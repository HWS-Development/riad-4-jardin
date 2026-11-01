import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { legacyRedirects } from '../src/site/routes.js';
import { gzipSync } from 'node:zlib';

const dir = resolve('dist'), redirects = new Map(legacyRedirects());
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.woff2': 'font/woff2', '.jpg': 'image/jpeg' };
const portFlag = process.argv.indexOf('--port');
const port = Number(process.env.PORT || (portFlag !== -1 ? process.argv[portFlag + 1] : 4173));
createServer(async (req, res) => {
  let path;
  try { path = decodeURIComponent(new URL(req.url, 'http://local').pathname); } catch { res.writeHead(400); res.end(); return; }
  const redirect = redirects.get(path);
  if (redirect) { res.writeHead(301, { Location: redirect + new URL(req.url, 'http://local').search }); res.end(); return; }
  const file = resolve(dir, `.${path.endsWith('/') ? path + 'index.html' : path}`);
  if (!file.startsWith(dir + sep)) { res.writeHead(403); res.end(); return; }
  let target = file, status = 200;
  try { if (!(await stat(file)).isFile()) throw new Error('not a file'); }
  catch { target = resolve(dir, path.startsWith('/en/') ? 'en/404.html' : '404.html'); status = 404; }
  try {
    let buffer = await readFile(target);
    const compressed = /\.(html|js|css|json|xml|txt)$/.test(target) && /gzip/.test(req.headers['accept-encoding'] || '');
    if (compressed) buffer = gzipSync(buffer);
    res.writeHead(status, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Content-Length': buffer.length, 'Vary': 'Accept-Encoding', ...(compressed ? { 'Content-Encoding': 'gzip' } : {}), 'X-Content-Type-Options': 'nosniff', 'Cache-Control': /\/(media|assets)\//.test(path) ? 'public,max-age=31536000,immutable' : 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : buffer);
  } catch { res.writeHead(500); res.end('Build the site before starting preview.'); }
}).listen(port, '127.0.0.1', () => console.log(`Production preview: http://127.0.0.1:${port}`));
