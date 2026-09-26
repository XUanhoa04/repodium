# Architecture

Status: accepted design; see [implementation status](roadmap.md). This document
specifies future behavior. The current executable only offers help/version.

## Product

Repodium turns a local source repository into a presentation whose factual
claims can be traced to repository evidence or explicitly supplied user
metadata. Correctness > security > reliability > maintainability > developer
experience > features.

MVP: local repositories, deterministic planning, technical/showcase profiles,
English/Vietnamese text, and self-contained HTML. No API key or browser
required. Later: design tokens/profiles, constrained AI, isolated PDF, optional
image PPTX. Non-goals: editor UI, cloud service, database, arbitrary plugins,
code execution, deep whole-program analysis, remote assets, editable PPTX, or
dual npm/PyPI runtimes.

## Pipeline and dependencies

```text
CLI/API → RunPolicy + EffectiveConfig + Budget
  → bounded discovery → admission/security screening
  → analyzers → evidence + candidate claims → deterministic claim verifier
  → VerifiedProjectModel + Coverage → deterministic plan
  → optional approved-context AI proposal → proposal validation/fallback
  → PresentationAST → Marp adapter → artifact validation → atomic publication
```

The dependency direction points toward domain contracts. Analyzers receive only
approved documents, planners receive only models, providers receive only
approved contexts, and renderers receive only ASTs and approved resource IDs.
These layers must not import an unrestricted repository reader. No microservices
or framework.

## Layer contracts

| Layer            | Input                     | Output                              | Prohibited                             |
| ---------------- | ------------------------- | ----------------------------------- | -------------------------------------- |
| Policy           | CLI + bounded JSON config | Immutable policy/budgets            | Repository granting new capabilities   |
| Discovery        | Canonical root            | Bounded candidates                  | Follow links, execute Git              |
| Admission        | Candidate + policy        | Approved document or finding        | Persist raw content                    |
| Analyzer         | Approved document         | Evidence and typed candidate claims | Execute code, fetch dependencies       |
| Verifier         | Claims/evidence           | Verified model + conflicts/coverage | LLM-as-proof                           |
| Planner          | Verified model/profile    | Deterministic plan                  | Read files, invent facts               |
| AI               | Approved selected context | Bounded structured proposal         | Tools, arbitrary endpoints, raw source |
| AST builder      | Validated plan            | Typed blocks/citations              | Raw HTML/CSS                           |
| Renderer         | AST + bundled resources   | Candidate artifact                  | Repository access/network              |
| Validator/output | Candidate artifact        | Validated output directory          | Publish partial failure                |

## Evidence semantics

Verified means faithful to evidence, not independently proven production
behavior. `pg` in a manifest means the manifest declares `pg`, not that
production uses PostgreSQL. Compose configuration is not deployment evidence.
README assertions remain attributed assertions. Absence cannot be claimed from a
partial scan. Monorepo components retain separate scopes. Architecture edges
require their own evidence; directory names alone do not establish microservices
or data flow.

## Rendering and text

Choose stable Marp Core for HTML. Serialize a restricted AST to generated
Markdown; never pass raw README Markdown through to Marp. Escape text, suppress
source HTML, comments/frontmatter/directives, and allow only bundled themes. A
minimal static HTML shell is acceptable; do not build a slide layout engine. No
script required. Bundle licensed Noto Sans/Mono with Vietnamese glyph tests in
Phase 1. No host font assumptions. Long content is split or omitted within the
slide budget, never shrunk below the layout's minimum readable size.

Marp's usual PPTX is image-based; editable export is not a supported promise.
Use the same validated AST/content for every output, then validate each format.

## Configuration and UX

`repodium.config.json` only. No executable config, remote includes, or arbitrary
CSS. Hard policy > explicit invocation capability > CLI values > project JSON >
defaults. Repository config may select presentation preferences but cannot
enable network/AI, disable screening, raise hard limits, or choose an arbitrary
endpoint. Exclusions accumulate and cannot override the denylist. No global/home
config. Credentials come from the selected provider's environment variable,
never dotenv autoload. An explicit CLI metadata path authorizes that one file,
not nested paths.

Planned commands: `generate [root]`, `validate [output]`; default root is cwd.
`--slides` is an upper bound. `--offline --ai` is a config error. Existing
output directories are not overwritten in MVP. `generate` never downloads
dependencies.

Normal logs show stages/results; verbose/debug add counts/timings and sanitized
operation IDs, never raw source, credentials, prompts, or stack traces. JSON
errors carry schema version, stage, code, and safe message. Escape terminal
control/BiDi characters. Planned exits: 0 success (including AI fallback); 2
config; 3 policy or budget; 4 insufficient evidence/analysis; 5 render/export; 6
validation; 7 output I/O; 130 cancellation. The scaffold uses exit 2 for
unavailable commands.

## Failure semantics

Missing docs/manifest/optional metadata: preserve coverage and omit unsupported
sections. Invalid UTF-8, oversized files, and unsupported types: skip with
reason. Scanner error, unsafe path, exhausted hard inventory budget, renderer
failure, or invalid artifact: fail closed. AI timeout/quota/invalid output: use
the unchanged deterministic plan. Do not create filler slides when evidence is
sparse.

AI: 5s connect, 20s request, <=1 retry, <=45s total. Retry transient responses
only within budget; do not retry ambiguous billed requests without idempotency
support. Reject redirects. Bound response bytes and model tokens. Browser
export: 120s, no automatic crash retry. Cancellation kills workers and removes
owned staging only.

## Resource policy

Initial defaults require benchmark calibration; they are not measured
guarantees.

| Limit                        | Initial value                  | Purpose                                      |
| ---------------------------- | ------------------------------ | -------------------------------------------- |
| Visited entries / depth      | 100,000 / 32                   | Bound traversal including skipped candidates |
| Admitted text files          | 10,000                         | Bound analysis work                          |
| Text per file / total        | 1 MiB / 32 MiB                 | Bound reads and parser input                 |
| Structured depth / nodes     | 64 / 100,000 per file          | Prevent parser amplification                 |
| Evidence payload             | 512 KiB                        | Keep model proportional to a deck            |
| AI serialized input / tokens | 64 KiB / 8,000                 | Both limits apply, including envelopes       |
| AI response / tokens         | 16 KiB / 2,000                 | Bound proposal parsing                       |
| Slides                       | 12 default / 30 maximum        | No unbounded output                          |
| Optional logo                | 1 MiB / 4 megapixels / 1 asset | Bound decoding                               |
| Workers                      | 2 scanners/parsers, 1 renderer | Predictable concurrency                      |
| File worker / core deadline  | 2s / 60s                       | Stop pathological inputs                     |
| Core peak RSS target         | 512 MiB                        | Performance gate, not an OS memory sandbox   |

Inventory is sorted before priority selection. Exceeding the inventory cap or a
deadline fails instead of producing a timing-dependent partial result. Explicit
partial mode may select deterministically from a complete bounded inventory and
must record omissions. Repository config cannot increase hard ceilings.

## Output

`repodium-output/index.html`, `claims.json`, `run-report.json`. Publish a fresh
staged directory only after validation. No raw-source intermediates on disk.
HTML and AST are byte-stable for identical admitted input/config/toolchain;
operational timings stay in the report. PDF/PPTX promise semantic/visual
stability, not identical binary bytes. Public report paths and strings are
screened; raw findings are never serialized. Model/schema versions and partial
coverage are explicit.

## Repository layout

The initial tree contains only implemented scaffold files. Add `src/policy`,
`discovery`, `security`, `analyzers`, `evidence`, `claims`, `planner`,
`presentation`, `renderers/marp`, `validation`, `output`, and `diagnostics` as
Phase 1 tasks start. Add `ai` in Phase 3. Keep one npm package. Schemas live in
`schemas/`; tests separate contract, unit, integration, security,
browser/visual, and E2E suites as they exist. Do not create placeholder scripts
that make missing gates appear successful.

See [ADRs](adr/README.md), [contracts](contracts.md),
[threat model](threat-model.md), [testing](testing.md), and
[roadmap](roadmap.md).
