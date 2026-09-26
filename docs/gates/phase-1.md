# G1: Secure deterministic HTML MVP

Status: **OPEN — do not infer phase completion from scaffold CI.**

All core format/lint/types/build and behavior suites pass. No attempted offline
egress (including child processes). Secret canaries absent from
provider/logs/staging/artifacts. Denied/link targets never read. Every factual
AST leaf has valid provenance. Malicious README creates no executable DOM.
Deterministic outputs and bounded resource tests pass on the advertised platform
matrix.

## Evidence to attach

- Exact commit and CI run URL.
- Required test IDs and command results; no skipped security controls.
- Known limitations and any expiring exceptions.
- Review confirming all [phase tasks](../roadmap.md) satisfy their acceptance
  criteria.

Prerequisite: G0 (or explicit scope/order ADR).

Do not begin the next phase before this gate is recorded as passed.
