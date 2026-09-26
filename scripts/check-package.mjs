import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

// npm_execpath avoids shell interpolation and Windows .cmd quoting.
const result = spawnSync(
  process.execPath,
  [process.env.npm_execpath, 'pack', '--dry-run', '--json', '--ignore-scripts'],
  { encoding: 'utf8' },
);
assert.equal(result.status, 0, result.stderr);
const [pack] = JSON.parse(result.stdout);
const paths = pack.files.map(({ path }) => path);
for (const path of paths) {
  assert.match(
    path,
    /^(dist\/|schemas\/|package\.json$|README\.md$|LICENSE$|SECURITY\.md$)/,
  );
}
for (const required of [
  'dist/cli.js',
  'package.json',
  'README.md',
  'LICENSE',
  'SECURITY.md',
]) {
  assert.ok(paths.includes(required), `Missing package file: ${required}`);
}
console.log(
  `Package allowlist passed (${paths.length} files). Publishing remains disabled.`,
);
