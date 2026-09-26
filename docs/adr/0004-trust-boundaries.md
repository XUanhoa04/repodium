# ADR-0004: Repository content never grants capabilities

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

README, source, paths, config, and metadata can all be attacker controlled.

## Decision

Use B1–B7 in the threat model. Only invocation policy grants capabilities.
Analyzers receive ApprovedDocument, planners models, AI approved context,
renderers AST/resource IDs. Type branding supplements runtime admission, not
replaces it.

## Alternatives

Passing root paths throughout the pipeline; letting repository config enable
network/tools.

## Consequences

More explicit data handoffs; fewer ambient privileges. No repository scripts or
build execution.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

SEC-PATH, SEC-IGNORE, SEC-PROMPT, SEC-EGRESS and boundary import tests.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Any new capability needs a threat-model update and negative tests.
