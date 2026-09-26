# Contracts

The JSON schemas are authoritative for serialized structure. Current schemas are
foundation version 1 and deliberately cover the first slice; extending predicate
or block catalogs requires reviewed samples. Generate TS types when the domain
is implemented; do not hand-maintain a competing schema. All objects reject
unknown fields. No contract accepts raw HTML, CSS, arbitrary provider tools, or
credentials.

## Models

| Contract     | Responsibility                                                      |
| ------------ | ------------------------------------------------------------------- |
| Config       | Presentation preferences and additional exclusions; no capabilities |
| Evidence     | Screened source ID/path, precise locator, digest, extractor version |
| Claim        | Typed predicate/object, epistemic kind, scope, evidence references  |
| Project      | Claims/evidence/components and explicit coverage                    |
| Plan         | Selected claim IDs, known template IDs, slide order                 |
| Presentation | Typed blocks linked to claims/editorial catalog IDs                 |
| Report       | Stage codes, validation outcomes, warning codes, no raw input       |

`ApprovedDocument` is an internal memory-only capability produced after
admission. Do not expose a public unchecked constructor. Type branding is not a
security boundary; runtime constructors must validate origin/policy state.

## Semantic invariants (Phase 1 verifier required)

JSON Schema checks shape, not evidence truth. Contract tests in this scaffold do
**not** establish these runtime properties:

1. Every evidence/claim/component ID is unique within its namespace.
2. Every reference resolves to the same model snapshot.
3. Evidence locators address admitted content with the recorded digest.
4. The extractor's typed value matches the predicate and object exactly.
5. Phrase scope never exceeds claim scope; attribution/qualifiers are retained.
6. Derived claims record a deterministic rule and its complete inputs.
7. Unknown/conflicting/partial observations remain explicit; no false absence
   claim.
8. Every factual text leaf (title, caption, notes, diagram labels included)
   traces to a valid claim. Editorial labels come from the packaged catalog.
9. Renderer and AI layers cannot acquire raw repository filesystem capabilities.
10. Output serialization and logging cannot include rejected documents/findings.

## Grounding

Observed: literal manifest/config fields. Documented: attributed repository
prose. User-asserted: explicitly supplied CLI metadata, attributed as such.
Derived: versioned deterministic rule. Inferred: disabled by default, requires a
label and rationale if introduced. Confidence describes extraction strength, not
the probability that a repository's marketing statements are true.

Examples: `declares_dependency` supports “the manifest declares pg”, not
“production uses PostgreSQL”. `declares_container_image` supports a
configuration statement, not deployment status. Documentation cannot establish
benchmark or security proof.

## AI and AST

AI can only select/reorder allowed claims, choose approved paraphrase templates,
pick approved excerpts, or omit content. No free-form factual sentence. Valid
evidence IDs attached to arbitrary prose do not establish entailment. No
secondary LLM verifier as a guarantee. Invalid proposal means deterministic
fallback.

The initial schema exposes fact phrases and catalog editorial labels; attributed
excerpts, limitations, and user assertions must be added as discriminated blocks
with matching semantic tests, never an unrestricted `text` escape hatch.

## Versioning

Schema version changes are reviewed; unknown versions are rejected. No automatic
migration that broadens security policy. JSON duplicate-key rejection belongs in
the input decoder (Phase 1); Ajv validates parsed objects and cannot detect keys
already lost by JSON.parse. Config cannot silently reinterpret unknown fields.

Run `npm run schemas:check` for positive/negative structural samples.
