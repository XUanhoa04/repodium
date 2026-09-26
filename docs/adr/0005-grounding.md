# ADR-0005: Typed claims with evidence and bounded meaning

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

An evidence ID beside arbitrary prose is not an entailment proof.

## Decision

Separate observed, documented, user-asserted, derived, inferred, and unknown
knowledge. Verify typed predicates against extraction rules, preserve
scope/attribution, and prohibit unsupported factual leaves. Inference is off by
default. Confidence is extraction confidence, not truth probability.

## Alternatives

Free-form prose with citations; a second LLM serving as a hallucination
guarantee.

## Consequences

Claims may sound conservative. Dependency declarations do not prove runtime use;
docs remain attributed. Partial scans cannot prove absence.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

GROUND-REF, GROUND-SCOPE, GROUND-COVERAGE; qualifiers and contradiction
fixtures.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Extend predicate catalogs only with deterministic rules and counterexamples.
