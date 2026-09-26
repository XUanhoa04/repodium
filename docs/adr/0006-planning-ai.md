# ADR-0006: Deterministic planning with constrained AI

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

The product must work with no key, no network, or an unavailable provider.

## Decision

The deterministic plan is the complete baseline. AI can select/reorder allowed
claims, choose approved templates/excerpts, and omit content. No free-form
factual text, no tools, no new architecture edges. Invalid proposals fall back
unchanged.

## Alternatives

AI-first generation, unrestricted rewrite followed by heuristic verification.

## Consequences

Less expressive AI output; stronger automatic validation. AI is optional and off
by default.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Malformed/timeout/quota/429/auth and injection fixtures; fallback AST equals
baseline.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Human-approved free-form narrative needs a separate ADR and cannot silently
replace this path.
