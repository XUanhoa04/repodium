import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: true });
for (const file of readdirSync(new URL('../schemas/', import.meta.url))) {
  if (file.endsWith('.schema.json'))
    ajv.addSchema(
      JSON.parse(
        readFileSync(new URL(`../schemas/${file}`, import.meta.url), 'utf8'),
      ),
    );
}
const valid = (name) =>
  JSON.parse(
    readFileSync(
      new URL(`fixtures/contracts/valid-${name}.json`, import.meta.url),
      'utf8',
    ),
  );
const validator = (name) =>
  ajv.getSchema(`https://repodium.dev/schemas/${name}.v1.schema.json`);

for (const name of [
  'config',
  'evidence',
  'claim',
  'project',
  'plan',
  'presentation',
  'report',
]) {
  test(`${name} accepts the documented structural example`, () => {
    const check = validator(name);
    assert.ok(check(valid(name)), ajv.errorsText(check.errors));
  });
  test(`${name} rejects unsupported schema versions and unknown fields`, () => {
    assert.equal(validator(name)({ ...valid(name), schemaVersion: 99 }), false);
    assert.equal(
      validator(name)({ ...valid(name), rawSource: 'not allowed' }),
      false,
    );
  });
}

test('config cannot grant network, tools, credential or executable theme capabilities', () => {
  for (const extra of [
    { offline: false },
    { ai: { enabled: true } },
    { apiKey: 'synthetic' },
    { theme: { css: 'url(https://example.invalid)' } },
    { tools: ['shell'] },
  ]) {
    assert.equal(validator('config')({ ...valid('config'), ...extra }), false);
  }
});

test('a declaration cannot be structurally relabeled as production evidence', () => {
  assert.equal(
    validator('claim')({ ...valid('claim'), scope: 'production' }),
    false,
  );
  assert.equal(
    validator('claim')({ ...valid('claim'), predicate: 'production_uses' }),
    false,
  );
  assert.equal(
    validator('claim')({ ...valid('claim'), evidenceIds: [] }),
    false,
  );
});

test('evidence paths reject obvious traversal and Windows special forms', () => {
  for (const safePath of [
    '../secret',
    'a/../../secret',
    '/etc/passwd',
    'C:/secret',
    'a\\secret',
    'file:stream',
    'a\u0000b',
  ]) {
    assert.equal(
      validator('evidence')({ ...valid('evidence'), safePath }),
      false,
    );
  }
});

test('presentation rejects free-form prose, raw HTML and excessive slide count', () => {
  const doc = valid('presentation');
  doc.slides[0].blocks.push({ kind: 'html', value: '<script>bad()</script>' });
  assert.equal(validator('presentation')(doc), false);
  const tooLong = valid('presentation');
  tooLong.slides = Array.from({ length: 31 }, () => tooLong.slides[0]);
  assert.equal(validator('presentation')(tooLong), false);
});

test('plans permit approved references/templates, not AI prose or unknown operations', () => {
  const plan = valid('plan');
  plan.slides[0].phrases[0].text = 'Invented production behavior';
  assert.equal(validator('plan')(plan), false);
});
