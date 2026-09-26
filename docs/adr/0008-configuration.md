# ADR-0008: Versioned JSON and authority separation

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Convenient executable configuration would turn untrusted repository files into
code.

## Decision

Use repodium.config.json with strict schema, duplicate-key rejection, no unknown
fields, no includes/code. Hard policy > invocation capability > CLI values >
repo preferences > defaults. Exclusions accumulate. Credentials never live in
config. Repo config cannot increase ceilings or enable AI.

## Alternatives

JavaScript/TypeScript config, YAML executable tags, global implicit
configuration.

## Consequences

Some convenience is deliberately unavailable. Explicit metadata paths grant
access to one file only.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Config code/URL/path injection, precedence, version and duplicate-key tests.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Add config fields only with authority classification and schema migration
review.
