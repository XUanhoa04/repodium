# ADR-0007: Offline forbids attempted egress

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Catching failed network calls is weaker than never making them, and children can
bypass application transports.

## Decision

Offline creates no provider client and performs no DNS, telemetry, updates, or
downloads. Core HTML has no browser. Export requires a pre-provisioned isolated
profile; never pull during generation. No remote assets or repository-supplied
endpoint.

## Alternatives

Best-effort offline with caught request errors; automatic browser installation.

## Consequences

Installation is separate from execution. Missing export runtime is an explicit
error. No promise to police unrelated host processes.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

SEC-OFFLINE process-tree detection with positive control and OS-denied network.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

New network capabilities require explicit authority, bounds, and egress tests.
