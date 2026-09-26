# ADR-0001: TypeScript, Node.js, and one npm package

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Marp is in the JavaScript ecosystem. A second runtime adds packaging and process
boundaries before it adds product value.

## Decision

Use TypeScript strict mode, Node.js 24 LTS, ESM, npm, a committed package-lock,
and precompiled JavaScript. Pin a maintained Node patch for CI. One package; no
PyPI wrapper in MVP.

## Alternatives

Python with a Node subprocess; dual-runtime distributions.

## Consequences

Typed authoring plus runtime schema validation; one installation path. New LTS
support requires matrix verification.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Three-OS package/CLI smoke, typecheck, clean npm ci/build.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Revisit when real users require another ecosystem, not merely because wrappers
are possible.
