# Contributing

Read [the roadmap](docs/roadmap.md), [ADRs](docs/adr/README.md), and
[contracts](docs/contracts.md) before picking a task. Link the phase issue and
task ID in the PR. Do not implement later phases before their prerequisite gate
passes.

## Development

Use the Node version in `.node-version` and npm 11. Run `npm ci`,
`npm run check`, and `npm run audit:ci`. Installation lifecycle scripts are
disabled by `.npmrc`. Use `npm run format` for formatting. Tests use Node's
built-in runner.

## Changes

- Keep work bounded to one roadmap task or a coherent vertical slice.
- Add meaningful tests for changed behavior; never add empty gate scripts.
- Treat JSON Schema as the serialized contract source of truth.
- Update ADRs for runtime, renderer, policy, or trust-boundary changes.
- Never commit real credentials, source dumps, raw prompts, or customer data.
- Review a dependency's necessity, license, transitive tree, maintenance,
  lifecycle scripts, and filesystem/network behavior before adding it.
- Keep lockfile changes reviewable; do not bypass dependency audit failures.

The current CI checks the scaffold and contracts only. Runtime security, offline
integration, rendering, and performance gates remain Phase 1 tasks. Passing this
CI does not mean the product MVP is complete.

Publishing is disabled until Phase 5. Do not remove `private: true` as
incidental cleanup.
