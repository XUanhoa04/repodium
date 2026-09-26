# Execution roadmap

The current delivery is foundation documentation, schemas, and a minimal
CLI/toolchain scaffold. Checked tasks below mean the named foundation artifact
is present; they do not mean a phase gate is closed. All phase issues remain
open until their acceptance evidence is reviewed. P1.1 is preparatory scaffold
work only; no generation feature was started ahead of G0.

Each task records task, reason, component, artifact, tests, acceptance, and
blockers. GitHub issue links are in [the tracking index](tracking.md). Start
with [the agent guide](starting-point.md).

## Phase 0: Architecture foundation

**MUST HAVE FOR MVP** — gate **G0**.

### P0.1: Product and support matrix

- [x] Task artifact present: Product and support matrix.
- **Reason:** Prevent scope drift.
- **Component:** docs/architecture.md, support-matrix.md.
- **Expected artifact:** Architecture and support matrix.
- **Required tests:** Requirement mapping review.
- **Acceptance:** Every capability has current/MVP/later status.
- **Dependencies/blockers:** None.

### P0.2: Runtime and renderer ADRs

- [x] Task artifact present: Runtime and renderer ADRs.
- **Reason:** Avoid repeated ecosystem decisions.
- **Component:** docs/adr/0001–0002.
- **Expected artifact:** Accepted ADRs and source links.
- **Required tests:** Stable toolchain/source review.
- **Acceptance:** One runtime, one renderer, export limitations recorded.
- **Dependencies/blockers:** P0.1.

### P0.3: Threat model and authority policy

- [x] Task artifact present: Threat model and authority policy.
- **Reason:** Define security boundaries before implementation.
- **Component:** docs/threat-model.md.
- **Expected artifact:** B1–B7 and SEC-* catalog.
- **Required tests:** Threat/control/test mapping.
- **Acceptance:** All required threats have controls and residual-risk notes.
- **Dependencies/blockers:** P0.1.

### P0.4: Schemas and semantic invariants

- [x] Task artifact present: Schemas and semantic invariants.
- **Reason:** Make boundaries reviewable.
- **Component:** schemas/, docs/contracts.md.
- **Expected artifact:** Versioned schemas and positive/negative samples.
- **Required tests:** npm run schemas:check.
- **Acceptance:** Strict schemas pass examples; semantic obligations explicitly
  separate.
- **Dependencies/blockers:** P0.3.

### P0.5: Analyzer/planner scope and budgets

- [x] Task artifact present: Analyzer/planner scope and budgets.
- **Reason:** Prevent unsupported inferences/unbounded work.
- **Component:** Architecture, ADRs 0005/0006/0012.
- **Expected artifact:** Rule scope and limit tables.
- **Required tests:** Dependency/Compose/README counterexample review.
- **Acceptance:** No declaration is described as runtime proof.
- **Dependencies/blockers:** P0.4.

### P0.6: Gate and CI foundation review

- [ ] Task artifact present: Gate and CI foundation review.
- **Reason:** Ensure next agent has an executable starting point.
- **Component:** docs/testing.md, gates, CI.
- **Expected artifact:** Passed bootstrap checks plus recorded gate review.
- **Required tests:** npm run check; npm run audit:ci; hosted CI.
- **Acceptance:** All MUST requirements mapped; review evidence attached before
  G0 closes.
- **Dependencies/blockers:** P0.2–P0.5.

### Definition of Done / G0

Accepted ADRs and strict schemas; positive/negative examples pass; all MVP
requirements map to behavior tests; no unresolved foundational authority or
grounding decision. Scaffold CI and human/agent gate review evidence must be
attached before closing this phase.

## Phase 1: Secure deterministic HTML MVP

**MUST HAVE FOR MVP** — gate **G1**.

### P1.1: Scaffold package/toolchain

- [x] Task artifact present: Scaffold package/toolchain.
- **Reason:** Establish checks without pretending generation exists.
- **Component:** package, CLI, CI.
- **Expected artifact:** Help/version CLI and package checks.
- **Required tests:** Bootstrap CLI/contracts/build.
- **Acceptance:** Checks pass; generate honestly unavailable; publish disabled.
- **Dependencies/blockers:** G0; scaffold prepared for review.

### P1.2: Policy and strict config decoder

- [ ] Task artifact present: Policy and strict config decoder.
- **Reason:** Separate preference from authority.
- **Component:** src/policy, schema decoder.
- **Expected artifact:** EffectiveConfig and RunPolicy.
- **Required tests:** Unknown/duplicate keys, precedence, offline+AI.
- **Acceptance:** Repo cannot increase privileges/limits; safe errors.
- **Dependencies/blockers:** G0, P1.1.

### P1.3: Safe discovery and ignore

- [ ] Task artifact present: Safe discovery and ignore.
- **Reason:** Keep reads within authorized root.
- **Component:** src/discovery.
- **Expected artifact:** Stable bounded inventory.
- **Required tests:** SEC-PATH/LINK/IGNORE/SUBMODULE.
- **Acceptance:** Denied and linked paths never read; native OS fixtures pass.
- **Dependencies/blockers:** P1.2.

### P1.4: Classification, encoding, budgets

- [ ] Task artifact present: Classification, encoding, budgets.
- **Reason:** Bound input before parsing.
- **Component:** src/security/admission.
- **Expected artifact:** Admission outcomes and reason codes.
- **Required tests:** SEC-RESOURCE/PARSER; invalid encoding.
- **Acceptance:** Bounded reads and workers; deterministic failure/partial
  policy.
- **Dependencies/blockers:** P1.3.

### P1.5: Secret and sensitive screening

- [ ] Task artifact present: Secret and sensitive screening.
- **Reason:** Stop unsafe content before extraction.
- **Component:** Scanner adapter.
- **Expected artifact:** Fixed rules and ApprovedDocument constructor.
- **Required tests:** SEC-SECRET/SUPPRESSION; scanner failure.
- **Acceptance:** Rejected input never reaches model, log, or temp files.
- **Dependencies/blockers:** P1.4.

### P1.6: Markdown and generic metadata analysis

- [ ] Task artifact present: Markdown and generic metadata analysis.
- **Reason:** Support useful sparse/generic repositories.
- **Component:** src/analyzers/markdown, generic.
- **Expected artifact:** Attributed excerpts and structural facts.
- **Required tests:** REL-DOCS/TEXT/FILES; malicious Markdown.
- **Acceptance:** No raw HTML/directives; precise evidence locations.
- **Dependencies/blockers:** P1.5.

### P1.7: Node, Python, Go, Compose analyzers

- [ ] Task artifact present: Node, Python, Go, Compose analyzers.
- **Reason:** Extract declarations without executing projects.
- **Component:** src/analyzers.
- **Expected artifact:** Typed scoped claims/evidence.
- **Required tests:** REL-ECOSYSTEM; malformed manifests; monorepo.
- **Acceptance:** No execution; correct declaration semantics and component
  scopes.
- **Dependencies/blockers:** P1.5.

### P1.8: Evidence store and semantic verifier

- [ ] Task artifact present: Evidence store and semantic verifier.
- **Reason:** Prove claims match admitted evidence.
- **Component:** src/evidence, claims.
- **Expected artifact:** VerifiedProjectModel and coverage/conflicts.
- **Required tests:** GROUND-REF/SCOPE/COVERAGE.
- **Acceptance:** Dangling IDs, widened claims, stale evidence rejected.
- **Dependencies/blockers:** P1.6–P1.7.

### P1.9: Deterministic planner and AST

- [ ] Task artifact present: Deterministic planner and AST.
- **Reason:** Create useful decks without AI.
- **Component:** src/planner, presentation.
- **Expected artifact:** Bounded plans and typed AST.
- **Required tests:** Sparse repo, long text, deterministic ordering.
- **Acceptance:** Every factual leaf has provenance; no filler sections.
- **Dependencies/blockers:** P1.8.

### P1.10: Marp HTML and bundled fonts

- [ ] Task artifact present: Marp HTML and bundled fonts.
- **Reason:** Use mature rendering with safe input.
- **Component:** src/renderers/marp, resources.
- **Expected artifact:** Self-contained HTML and licensed fonts.
- **Required tests:** HTML-VALID/VISUAL; SEC-XSS/ASSET.
- **Acceptance:** Vietnamese renders; no runtime network/browser dependency.
- **Dependencies/blockers:** P1.9.

### P1.11: Output validation, staging, diagnostics

- [ ] Task artifact present: Output validation, staging, diagnostics.
- **Reason:** Never publish corrupt partial results.
- **Component:** src/validation, output, diagnostics.
- **Expected artifact:** Validated artifact and structured errors.
- **Required tests:** SEC-OUTPUT/LOG; REL-FAILURE.
- **Acceptance:** Publish only after validation; cleanup/codes correct.
- **Dependencies/blockers:** P1.10.

### P1.12: Integrated security/platform qualification

- [ ] Task artifact present: Integrated security/platform qualification.
- **Reason:** Prove the MVP boundary end to end.
- **Component:** tests, CI.
- **Expected artifact:** G1 evidence report.
- **Required tests:** SEC-OFFLINE/SECRET; E2E; PERF-BOUNDS.
- **Acceptance:** Built package passes representative and native OS cases.
- **Dependencies/blockers:** P1.11.

### Definition of Done / G1

All core format/lint/types/build and behavior suites pass. No attempted offline
egress (including child processes). Secret canaries absent from
provider/logs/staging/artifacts. Denied/link targets never read. Every factual
AST leaf has valid provenance. Malicious README creates no executable DOM.
Deterministic outputs and bounded resource tests pass on the advertised platform
matrix.

## Phase 2: Themes and configuration

**LATER** — gate **G2**.

### P2.1: Audience profile catalog

- [ ] Task artifact present: Audience profile catalog.
- **Reason:** Adapt outline without inventing content.
- **Component:** Planner profiles.
- **Expected artifact:** Academic/product/internal/technical/showcase presets.
- **Required tests:** Profile fixture comparison.
- **Acceptance:** Only claim selection/order/templates differ.
- **Dependencies/blockers:** G1.

### P2.2: Validated theme tokens

- [ ] Task artifact present: Validated theme tokens.
- **Reason:** Separate appearance from content.
- **Component:** Config and theme compiler.
- **Expected artifact:** Theme schema and bundled variants.
- **Required tests:** CSS/URL injection; value bounds.
- **Acceptance:** No arbitrary CSS or executable config.
- **Dependencies/blockers:** P2.1.

### P2.3: Localization and overflow rules

- [ ] Task artifact present: Localization and overflow rules.
- **Reason:** Preserve readability and qualifiers.
- **Component:** Phrase/font/layout resources.
- **Expected artifact:** EN/VI catalogs and layout constraints.
- **Required tests:** NFC/NFD; mixed language; long identifiers.
- **Acceptance:** No clipping or unreadable shrink; qualifiers retained.
- **Dependencies/blockers:** P2.2.

### P2.4: Explicit user metadata

- [ ] Task artifact present: Explicit user metadata.
- **Reason:** Support user context with honest authority.
- **Component:** Metadata admission/schema.
- **Expected artifact:** Attributed user assertions.
- **Required tests:** Secrets/traversal/authority fixtures.
- **Acceptance:** Only explicit input becomes user_asserted.
- **Dependencies/blockers:** P2.1.

### P2.5: Optional approved raster logo

- [ ] Task artifact present: Optional approved raster logo.
- **Reason:** Allow branding with bounded decoding.
- **Component:** Asset admission.
- **Expected artifact:** PNG/JPEG decode/re-encode pipeline.
- **Required tests:** Broken/oversized image, SVG rejection.
- **Acceptance:** No automatic repo-image discovery; stripped metadata.
- **Dependencies/blockers:** P2.2; optional scope decision.

### P2.6: Separation and compatibility checks

- [ ] Task artifact present: Separation and compatibility checks.
- **Reason:** Ensure cosmetics cannot change facts.
- **Component:** Contract/golden tests.
- **Expected artifact:** G2 evidence report.
- **Required tests:** Theme-only claim-set equality.
- **Acceptance:** All presets/config changes satisfy content separation.
- **Dependencies/blockers:** P2.3–P2.5 or documented asset deferral.

### Definition of Done / G2

Configuration cannot execute code or broaden authority. Theme-only changes
preserve claims/evidence. Profiles add no facts.
Vietnamese/mixed-language/long-text visual suite passes. Optional asset path, if
shipped, passes decode/re-encode/limit tests.

## Phase 3: Constrained AI-assisted narrative

**LATER / OPTIONAL CAPABILITY** — gate **G3**.

### P3.1: Select first provider adapter

- [ ] Task artifact present: Select first provider adapter.
- **Reason:** Constrain scope to one implementation.
- **Component:** ADR-0016, provider interface.
- **Expected artifact:** Accepted adapter/model policy.
- **Required tests:** Provider capability/transport fixture review.
- **Acceptance:** Fixed endpoint; no repo-defined tools/origin.
- **Dependencies/blockers:** G2.

### P3.2: Approved context builder

- [ ] Task artifact present: Approved context builder.
- **Reason:** Minimize data leaving the host.
- **Component:** src/ai/context.
- **Expected artifact:** Allowlisted claims/spans and budgets.
- **Required tests:** Secret/path/byte/token checks.
- **Acceptance:** Only approved selected data enters requests.
- **Dependencies/blockers:** P3.1.

### P3.3: Bounded transport

- [ ] Task artifact present: Bounded transport.
- **Reason:** Handle unreliable providers safely.
- **Component:** src/ai/transport.
- **Expected artifact:** Timeout/retry/error mapping.
- **Required tests:** 429/503/auth/quota/redirect/oversize.
- **Acceptance:** Deadline and retry bounds; no credential diagnostics.
- **Dependencies/blockers:** P3.2.

### P3.4: Structured proposal validation

- [ ] Task artifact present: Structured proposal validation.
- **Reason:** Prevent AI from adding unsupported facts.
- **Component:** Proposal schema/validator.
- **Expected artifact:** Constrained plan transformations.
- **Required tests:** Unknown IDs, free text, qualifiers, fabricated edges.
- **Acceptance:** Only allowed operations/claims/templates accepted.
- **Dependencies/blockers:** P3.3.

### P3.5: Deterministic fallback

- [ ] Task artifact present: Deterministic fallback.
- **Reason:** Keep generation available on AI failure.
- **Component:** Orchestrator.
- **Expected artifact:** Baseline-preserving fallback.
- **Required tests:** Every failure class with mock provider.
- **Acceptance:** Fallback AST equals deterministic baseline.
- **Dependencies/blockers:** P3.4.

### P3.6: Injection, egress, offline qualification

- [ ] Task artifact present: Injection, egress, offline qualification.
- **Reason:** Prove the provider boundary.
- **Component:** Security/E2E tests.
- **Expected artifact:** G3 evidence report.
- **Required tests:** SEC-PROMPT/Egress/OFFLINE and capture tests.
- **Acceptance:** No tools or secret leakage; zero provider calls offline.
- **Dependencies/blockers:** P3.5.

### Definition of Done / G3

Captured requests contain approved context only. Invented claims/qualifiers and
malformed proposals are rejected. Timeout/rate/quota/auth failures preserve the
baseline AST. No tools, raw logging, or offline provider calls.

## Phase 4: Validated export formats

**LATER; PPTX OPTIONAL** — gate **G4**.

### P4.1: Provision isolated export profile

- [ ] Task artifact present: Provision isolated export profile.
- **Reason:** Contain browser/filesystem/network effects.
- **Component:** ADR-0017, image/runtime adapter.
- **Expected artifact:** Pinned pre-provisioned exporter.
- **Required tests:** No-network, mount, sandbox, resource-kill tests.
- **Acceptance:** No pull at runtime; no repo/credentials mount; sandbox
  enabled.
- **Dependencies/blockers:** G3 or explicit roadmap ADR.

### P4.2: PDF export adapter

- [ ] Task artifact present: PDF export adapter.
- **Reason:** Reuse validated presentation content.
- **Component:** Marp PDF adapter.
- **Expected artifact:** PDF candidate artifact.
- **Required tests:** Page count, font readiness, timeout.
- **Acceptance:** Same claim/slide set as HTML.
- **Dependencies/blockers:** P4.1.

### P4.3: PDF validation

- [ ] Task artifact present: PDF validation.
- **Reason:** Ensure exported document actually opens.
- **Component:** PDF validators.
- **Expected artifact:** Parsed and rasterized validation result.
- **Required tests:** Corruption, active content, Vietnamese render.
- **Acceptance:** Invalid PDF never published; G4-PDF passes.
- **Dependencies/blockers:** P4.2.

### P4.4: Optional image PPTX export

- [ ] Task artifact present: Optional image PPTX export.
- **Reason:** Provide slides without promising editability.
- **Component:** Marp PPTX adapter.
- **Expected artifact:** Image-based PPTX and limitation docs.
- **Required tests:** Slides/notes/fidelity.
- **Acceptance:** No experimental editable path; limits explicit.
- **Dependencies/blockers:** P4.3; scope opt-in.

### P4.5: PPTX validation and compatible open

- [ ] Task artifact present: PPTX validation and compatible open.
- **Reason:** Catch structural/fidelity issues.
- **Component:** OOXML/LibreOffice adapter.
- **Expected artifact:** Structural/open/render result.
- **Required tests:** ZIP limits, external rels, macro/OLE, media.
- **Acceptance:** Valid slide count; compatible render; G4-PPTX passes.
- **Dependencies/blockers:** P4.4.

### P4.6: Export leakage and failure qualification

- [ ] Task artifact present: Export leakage and failure qualification.
- **Reason:** Protect all exported surfaces.
- **Component:** Security/export E2E.
- **Expected artifact:** G4 evidence report.
- **Required tests:** Secrets in text/notes/metadata/media; offline; crash
  cleanup.
- **Acceptance:** No successful output after validation failure.
- **Dependencies/blockers:** P4.3; P4.5 if PPTX ships.

### Definition of Done / G4

G4-PDF: parse/rasterize/page count/font/active-content checks pass in isolated
no-egress execution. G4-PPTX only if shipped: ZIP/OOXML/relationship/media/notes
checks and compatible open/render pass, no external objects, limitation
documented. Otherwise format is explicitly unsupported. Export failures never
publish.

## Phase 5: Production polish and release

**MUST BEFORE STABLE RELEASE** — gate **G5**.

### P5.1: User documentation and examples

- [ ] Task artifact present: User documentation and examples.
- **Reason:** Make capabilities usable and honest.
- **Component:** README/guides/examples.
- **Expected artifact:** Runnable documented examples.
- **Required tests:** Run all documented commands.
- **Acceptance:** Docs match shipped capability matrix.
- **Dependencies/blockers:** G4.

### P5.2: Contribution and security maintenance policy

- [ ] Task artifact present: Contribution and security maintenance policy.
- **Reason:** Make project supportable.
- **Component:** CONTRIBUTING/SECURITY/support policy.
- **Expected artifact:** Maintainer/security procedures.
- **Required tests:** Triage/release/dependency review.
- **Acceptance:** Disclosure and supported versions clearly stated.
- **Dependencies/blockers:** P5.1.

### P5.3: Installed-package qualification

- [ ] Task artifact present: Installed-package qualification.
- **Reason:** Verify actual consumer artifacts.
- **Component:** Package allowlist and smoke.
- **Expected artifact:** Tarball install reports for 3 OS.
- **Required tests:** Fonts/licenses/secret exclusion/CLI/API.
- **Acceptance:** No accidental files; installed behavior passes.
- **Dependencies/blockers:** P5.1.

### P5.4: SemVer/changelog/protected release

- [ ] Task artifact present: SemVer/changelog/protected release.
- **Reason:** Prevent accidental or mismatched publish.
- **Component:** Release workflow.
- **Expected artifact:** Dry-run release artifacts.
- **Required tests:** Version/tag/commit/package consistency.
- **Acceptance:** Publish remains disabled until explicit gate pass.
- **Dependencies/blockers:** P5.2–P5.3.

### P5.5: SBOM/provenance/reproducibility

- [ ] Task artifact present: SBOM/provenance/reproducibility.
- **Reason:** Make releases auditable.
- **Component:** Release artifacts/ADR-0015 follow-up.
- **Expected artifact:** Verified provenance/SBOM/checksums.
- **Required tests:** Clean rebuild; package/provenance verification.
- **Acceptance:** Only evidenced reproducibility claims; distribution decision
  recorded.
- **Dependencies/blockers:** P5.4.

### P5.6: Release candidate qualification

- [ ] Task artifact present: Release candidate qualification.
- **Reason:** Ensure no advertised capability is untested.
- **Component:** Compatibility/performance report.
- **Expected artifact:** G5 release decision.
- **Required tests:** Full release matrix.
- **Acceptance:** No blockers; security and prerequisite gates passed.
- **Dependencies/blockers:** P5.5.

### Definition of Done / G5

Installed package runs documented examples on every supported OS; tarball
allowlist and dependency audit pass; disclosures/licenses/contribution/changelog
complete; protected release dry-run, SBOM, checksums, and provenance verified;
no blocking issue remains.
