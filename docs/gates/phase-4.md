# G4: Validated export formats

Status: **OPEN — do not infer phase completion from scaffold CI.**

G4-PDF: parse/rasterize/page count/font/active-content checks pass in isolated
no-egress execution. G4-PPTX only if shipped: ZIP/OOXML/relationship/media/notes
checks and compatible open/render pass, no external objects, limitation
documented. Otherwise format is explicitly unsupported. Export failures never
publish.

## Evidence to attach

- Exact commit and CI run URL.
- Required test IDs and command results; no skipped security controls.
- Known limitations and any expiring exceptions.
- Review confirming all [phase tasks](../roadmap.md) satisfy their acceptance
  criteria.

Prerequisite: G3 (or explicit scope/order ADR).

Do not begin the next phase before this gate is recorded as passed.
