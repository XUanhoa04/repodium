# ADR-0003: A modular application, not services

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Isolation of domain responsibilities is needed; distributed deployment is not.

## Decision

One CLI/package with explicit policy, admission, analyzer, evidence, claims,
planner, AST, renderer, validation, and output modules. Use workers for bounded
parser/renderer execution. Interfaces only at real boundaries.

## Alternatives

Microservices, database-backed pipeline, plugin framework, multi-package
monorepo.

## Consequences

Domain tests remain fast; workers do not constitute an OS security sandbox.
Avoid unrestricted file/network access outside admission/provider layers.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Dependency-direction checks and module contract tests in Phase 1.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Split packages only when release ownership or distribution actually differs.
