# ADR-0010: Root confinement and explicit filesystem limits

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Paths and filesystem objects can escape lexical root checks or trigger unbounded
traversal.

## Decision

Reject links/junctions, linked ancestors, special path forms, non-regular files,
and multi-link files when detectable. Skip nested repositories/submodules. Bound
reads, check identity before/after, and fail on mutation. No Git subprocess in
MVP.

## Alternatives

Follow symlinks with prefix-string checks; scan all submodules; shell-based
discovery.

## Consequences

Portable protections assume a stable filesystem. A hostile same-user concurrent
process requires read-only snapshot/OS isolation; do not claim race-proof JS
path resolution.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

SEC-PATH, SEC-LINK, SEC-RACE, SEC-SUBMODULE on native OS runners.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Broader path access requires explicit capability design, not an unsafe bypass
flag.
