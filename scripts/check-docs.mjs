import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', 'node_modules', 'dist', '.local-work'].includes(entry.name))
      return [];
    const path = resolve(directory, entry.name);
    return entry.isDirectory()
      ? walk(path)
      : path.endsWith('.md')
        ? [path]
        : [];
  });
}

const files = walk(process.cwd());
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    assert.ok(
      existsSync(resolve(dirname(file), decodeURIComponent(target))),
      `Broken link in ${file}: ${target}`,
    );
  }
}
for (const required of [
  'README.md',
  'SECURITY.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'docs/architecture.md',
  'docs/threat-model.md',
  'docs/contracts.md',
  'docs/roadmap.md',
  'docs/testing.md',
]) {
  assert.ok(existsSync(required), `Missing foundation document: ${required}`);
}
const adrs = readdirSync('docs/adr').filter((name) =>
  /^\d{4}-.*\.md$/.test(name),
);
assert.equal(adrs.length, 17);
for (const adr of adrs) {
  const content = readFileSync(`docs/adr/${adr}`, 'utf8');
  for (const heading of [
    'Status',
    'Context',
    'Decision',
    'Alternatives',
    'Consequences',
    'Validation',
    'Revisit',
  ]) {
    assert.ok(content.includes(`## ${heading}`), `${adr} missing ${heading}`);
  }
}
console.log(
  `Documentation links and ${adrs.length} ADR structures passed (${files.length} documents).`,
);
