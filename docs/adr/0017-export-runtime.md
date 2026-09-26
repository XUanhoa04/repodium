# ADR-0017: Optional isolated export runtime

## Status

Deferred — boundary constraints accepted; implementation selection waits for its
phase.

Date: 2026-09-26.

## Context

Browser-backed PDF/PPTX introduces resource and egress behavior absent from core
HTML.

## Decision

Deferred implementation details to P4.1. Baseline requirement: pre-provisioned
local container image pinned by digest, no network/pull, non-root/read-only,
resource caps, browser sandbox enabled, only sanitized mounts, no
credentials/repo/engine socket. PDF first; image PPTX optional.

## Alternatives

Unrestricted host browser; forcing a browser/container onto every HTML user.

## Consequences

Container tooling affects optional export DX. Native exporters require
equivalent isolation evidence. Editable PPTX is not promised.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Export offline process tree, sandbox capability, PDF rasterization,
OOXML/compatible-open and leakage tests.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Finalize image/tool versions and supported hosts in Phase 4; keep baseline
boundary intact.
