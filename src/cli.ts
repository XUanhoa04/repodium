#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { version: string };
const args = process.argv.slice(2);

if (args.length === 0 || (args.length === 1 && args[0] === '--help')) {
  process.stdout.write(
    `Repodium — repository presentations with traceable claims\n\nUsage: repodium --help | --version\n\nStatus: architecture foundation. Generation is not implemented yet.\nRoadmap: https://github.com/XUanhoa04/repodium/issues\n`,
  );
} else if (args.length === 1 && args[0] === '--version') {
  process.stdout.write(`${manifest.version}\n`);
} else {
  const planned = args[0] === 'generate';
  process.stderr.write(
    `${JSON.stringify({
      schemaVersion: 1,
      stage: 'CONFIG',
      code: planned ? 'FEATURE_NOT_IMPLEMENTED' : 'INVALID_ARGUMENTS',
      message: planned
        ? 'Generation is planned for Phase 1; no repository was analyzed.'
        : 'Unsupported arguments. Run repodium --help.',
    })}\n`,
  );
  process.exitCode = 2;
}
