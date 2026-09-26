# ADR-0016: First provider adapter

## Status

Deferred — boundary constraints accepted; implementation selection waits for its
phase.

Date: 2026-09-26.

## Context

Vendor choice does not block a secure deterministic MVP.

## Decision

Deferred to P3.1: choose exactly one concrete provider and model policy.
Required constraints are already accepted in ADR-0006/0007/0009: approved
context, fixed HTTPS origin, bounded transport, structured proposal, no tools,
no new claims, deterministic fallback.

## Alternatives

Multiple providers at once; custom repository endpoints.

## Consequences

No provider dependency or credentials integration in the foundation.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Provider capability/transport/negative fixtures before implementation is
accepted.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Finalize at Phase 3 entry after previous gates pass.
