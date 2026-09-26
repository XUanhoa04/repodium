# Testing and CI

## Current foundation gate

`npm run check` runs format, lint, type checking, build, CLI/contract tests,
docs links/ADR shape checks, and package allowlist. `npm run audit:ci` is a
separate required CI job. Linux executes all foundation checks; macOS/Windows
execute build, tests, and package checks. The test suite is not yet an MVP
security certification.

## Phase 1 test inventory

Implement every SEC-* case in [the threat model](threat-model.md), plus:

| ID              | Cases / assertion                                                        |
| --------------- | ------------------------------------------------------------------------ |
| REL-DOCS        | Absent, tiny, huge, malformed, and malicious README                      |
| REL-ECOSYSTEM   | Node/Python/Go, Java/generic, no manifest, monorepo scopes               |
| REL-TEXT        | Vietnamese, mixed English, NFC/NFD, long title/identifier, invalid UTF-8 |
| REL-FILES       | Binary, minified, unreadable/disappearing files, partial metadata        |
| REL-FAILURE     | Renderer crash, disk full, cancellation, validation failure              |
| GROUND-REF      | Dangling references, invented facts, unsupported predicates              |
| GROUND-SCOPE    | Dependency/config declaration cannot become runtime claim                |
| GROUND-COVERAGE | No absence claim on incomplete scan                                      |
| DET-OUTPUT      | Same admitted input/config/toolchain gives identical AST/HTML            |
| PERF-BOUNDS     | Entry/byte/node/slide caps, worker deadlines, peak RSS regression        |
| HTML-VALID      | DOM allowlist, CSP, resources, citations, slide count                    |
| HTML-VISUAL     | Browser render, Vietnamese glyphs, no overflow or unreadable shrink      |

Secret tests put synthetic known-pattern canaries in .env, docs, config,
manifest, filename, metadata, and later AI responses. Assert absence from
prompt, logs, staging, decoded HTML, and every supported export's
text/metadata/media. Do not only grep compressed PDF/PPTX bytes. Denied-file
tests verify no read was attempted.

Offline integration denies network at OS level and observes attempted
connections through the whole process tree. Unit mocks alone are insufficient. A
positive control must attempt network and fail the harness, proving the detector
works. Dependency installation is separate from offline generation.

## Later gates

Phase 2: config injection, theme preserves claims, all audience profiles,
bundled fonts, optional bounded raster assets. Phase 3: mock provider request
capture, invented IDs/qualifiers, malformed output, timeout, rate/quota/auth
failures, redirect rejection, prompt injection, byte/token limits,
baseline-equal fallback. Phase 4: PDF parse and rasterize; OOXML
ZIP/relationships/notes/media checks; no macros/OLE/external targets; compatible
LibreOffice open/render; export egress and secret non-leak. Image PPTX leakage
tests inspect source raster/canaries too.

## Matrix and release

PR: full Linux tests; native path/link/Unicode/packaging smoke on macOS/Windows;
pinned Chromium visuals on Linux once HTML exists. Nightly/release: full
three-OS suite, Firefox/WebKit smoke, resource stress, export compatibility. Do
not skip link tests because a runner lacks permission; provision a capable
runner.

Audit high/critical findings block unless a reviewed, expiring exception states
scope and owner. Registry/audit outage is not success. Actions are SHA-pinned,
PR permissions read-only, installation scripts disabled, and updates arrive as
PRs. Future releases use protected workflow, OIDC/provenance, package allowlist,
SBOM, clean rebuild, and exact-commit checks. No publish workflow exists yet.

Coverage percentages alone do not prove security. Gates are behavioral
assertions with negative controls, not empty scripts or snapshot-only approval.
