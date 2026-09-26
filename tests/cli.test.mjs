import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('../dist/cli.js', import.meta.url));
const run = (args, cwd) =>
  spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd });

test('help describes the actual foundation status', () => {
  const result = run(['--help']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Generation is not implemented/);
  assert.equal(result.stderr, '');
});

test('version is available from the built executable', () => {
  const result = run(['--version']);
  assert.equal(result.status, 0);
  assert.match(result.stdout.trim(), /^\d+\.\d+\.\d+$/);
});

test('planned generate fails honestly without creating artifacts', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'repodium-bootstrap-'));
  try {
    const result = run(['generate', '--offline'], cwd);
    assert.equal(result.status, 2);
    assert.equal(result.stdout, '');
    assert.equal(JSON.parse(result.stderr).code, 'FEATURE_NOT_IMPLEMENTED');
    assert.deepEqual(readdirSync(cwd), []);
  } finally {
    rmSync(cwd, { recursive: true });
  }
});

test('argument errors do not reflect potentially sensitive user input', () => {
  const secret = 'SYNTHETIC_CREDENTIAL_CANARY_9f6a';
  const result = run([secret]);
  assert.equal(result.status, 2);
  assert.equal(JSON.parse(result.stderr).code, 'INVALID_ARGUMENTS');
  assert.ok(!`${result.stdout}${result.stderr}`.includes(secret));
});
