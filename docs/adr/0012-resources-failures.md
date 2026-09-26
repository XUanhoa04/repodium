# ADR-0012: Bounded resources and explicit failures

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

A CLI should not hang, exhaust memory, or create hundreds of slides on hostile
input.

## Decision

Adopt documented configurable defaults with hard ceilings, deterministic
inventory ordering, worker deadlines, and fresh staged output. Optional AI fails
back; security, renderer, and artifact failures stop publication. No unlimited
retries or timing-dependent partial deck.

## Alternatives

Best-effort unbounded scan; silently publish partial renderer output.

## Consequences

Initial numbers require benchmark calibration. V8 heap limits are not OS memory
quotas. Explicit partial coverage cannot support absence claims.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

PERF-BOUNDS, REL-FAILURE, DET-OUTPUT and cancellation/disk-full tests.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Adjust limits with measured fixtures and documented rationale.
