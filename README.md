# Repodium

**Your repository, ready for the podium.**

Turn source repositories into presentations with claims you can trace back to
their evidence. Formerly planned as `repo2deck`.

[![CI](https://github.com/XUanhoa04/repodium/actions/workflows/ci.yml/badge.svg)](https://github.com/XUanhoa04/repodium/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

## Status

**Architecture foundation and CLI scaffold. Deck generation is not
implemented.** This repository contains accepted architecture decisions,
versioned contract schemas, an execution roadmap, contributor tooling, and CI.
It is not a production-ready presentation generator and is not published to npm.

## Intended experience

```sh
# Planned Phase 1 interface — not available in this scaffold
repodium generate ./my-project --offline --language vi
```

The MVP will generate self-contained HTML without an API key, network access, or
browser installation. PDF and optional image-based PPTX come later. AI will be
an optional, constrained enhancement; it will never be required to produce a
deck.

## Why Repodium?

- **Evidence before prose:** a declared dependency is not proof of production
  use.
- **Offline by design:** deterministic planning is the complete core path.
- **Untrusted repositories:** no repository scripts, raw HTML, or unrestricted
  AI tools.
- **One small application:** TypeScript, Node.js, and Marp; no backend
  infrastructure.
- **Vietnamese and English:** bundled fonts and explicit localization are MVP
  requirements.

These are architecture commitments, not claims that the security pipeline is
already implemented.

## Work on the foundation

Use Node.js **24.21.0** (see [.node-version](.node-version)) and its bundled
npm 11.

```sh
npm ci
npm run check
node dist/cli.js --help
node dist/cli.js --version
```

`generate` deliberately returns a structured `FEATURE_NOT_IMPLEMENTED` error and
does not inspect a repository. `private: true` prevents accidental npm
publishing.

## Architecture

```text
Repository → safe discovery → admission / screening → analyzers
  → evidence + verified claims → deterministic plan → optional constrained AI
  → claim validation → presentation AST → Marp → output validation
```

Start with the [architecture](docs/architecture.md), [ADRs](docs/adr/README.md),
[contracts](docs/contracts.md), and [threat model](docs/threat-model.md).

## Roadmap

Follow the [roadmap epic #1](https://github.com/XUanhoa04/repodium/issues/1) and
its [six linked sub-epics](docs/tracking.md).

| Phase | Outcome                                                     |
| ----- | ----------------------------------------------------------- |
| 0     | Architecture, contracts, threat model, gates                |
| 1     | Secure deterministic HTML MVP                               |
| 2     | Themes, configuration, presentation profiles                |
| 3     | Constrained AI assistance and deterministic fallback        |
| 4     | Validated PDF and optional image-based PPTX                 |
| 5     | Production documentation, packaging, and release automation |

The [execution roadmap](docs/roadmap.md) contains actionable tasks, tests,
acceptance criteria, and dependencies. Phase N+1 cannot start before Gate N
passes; scope changes require an explicit ADR.

## Contributing and security

See [CONTRIBUTING](CONTRIBUTING.md) before implementing a phase and
[SECURITY](SECURITY.md) for responsible disclosure. Priorities are correctness,
security, reliability, maintainability, developer experience, then features.

Licensed under [Apache-2.0](LICENSE).
