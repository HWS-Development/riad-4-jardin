import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Administrative migration only. Reuse the authenticated CLI without reading,
// displaying, copying or bundling the user's access token.
export function sanityApi(endpoint, args = []) {
  const cli = fileURLToPath(new URL('../studio/node_modules/.bin/sanity', import.meta.url));
  const result = spawnSync(cli, ['api', endpoint, ...args], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, CI: '1', SANITY_CLI_NO_TELEMETRY: '1' },
    encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) throw new Error(`Sanity CLI request failed: ${result.error?.message || result.stderr}`);
  try { return JSON.parse(result.stdout); }
  catch { throw new Error(`Sanity CLI returned no JSON: ${result.stderr || result.stdout}`); }
}
