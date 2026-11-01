import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { legacyRedirects } from './src/site/routes.js';

const assets = fileURLToPath(new URL('./src/assets/', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'optimized-image-keys', enforce: 'pre',
      load(id) {
        if (id.startsWith(assets) && /\.(jpg|jpeg|png)$/.test(id) && !id.endsWith('logo-full.png')) {
          return `export default ${JSON.stringify(id.slice(assets.length))}`;
        }
      },
    },
    react(),
    {
      name: 'localized-development',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url, 'http://dev');
          const target = new Map(legacyRedirects()).get(url.pathname);
          if (target) { res.statusCode = 302; res.setHeader('Location', target + url.search); res.end(); }
          else next();
        });
        server.middlewares.use('/__content', async (req, res, next) => {
          try {
            const { pageData } = await server.ssrLoadModule('/src/site/data.js');
            const path = new URL(req.url, 'http://dev').searchParams.get('path');
            const snapshot = JSON.parse(await readFile(new URL('./src/generated/content.json', import.meta.url), 'utf8'));
            const media = JSON.parse(await readFile(new URL('./src/generated/media.json', import.meta.url), 'utf8'));
            res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(pageData(path || '/fr/', snapshot, media)));
          } catch (error) { next(error); }
        });
      },
    },
  ],
  build: { manifest: true, target: 'es2022' },
})
