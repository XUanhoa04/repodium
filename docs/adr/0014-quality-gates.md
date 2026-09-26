# ADR-0014: Incremental delivery with behavioral gates

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Scaffold CI can look green while essential security behavior is not implemented.

## Decision

Phase N+1 waits for Gate N. Keep behavior/test IDs and explicit completion
evidence. Linux runs full PR suites; native macOS/Windows check filesystem and
package behavior. Nightly/release broadens coverage. Never stub a missing gate
as a passing script.

## Alternatives

Coverage percentage as the main guarantee; every test on every
OS/runtime/browser combination.

## Consequences

Smaller useful matrix, but each advertised OS needs its native boundary tests.
Initial CI is labeled foundation-only.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Gate manifest review, CI required checks, test harness positive controls.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Scope/order changes require an ADR and an updated roadmap, not skipped tests.
