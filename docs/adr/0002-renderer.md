# ADR-0002: Marp and HTML-only MVP

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

The product needs predictable generated decks, not a general-purpose editor or
an interactive application framework.

## Decision

Use a stable Marp Core behind an AST adapter. MVP exports self-contained HTML
only, with no runtime browser. Later export uses the same Marp content model. Do
not use release candidates by default or promise editable PPTX.

## Alternatives

reveal.js is strong for interactive HTML but needs extra export orchestration.
Slidev adds a component/build stack beyond this product. A custom renderer adds
unnecessary layout work.

## Consequences

HTML stays lightweight. Marp PPTX normally uses slide images; editable mode is
experimental and can lose fidelity. Browser export is optional.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

AST-to-Markdown escaping, renderer profile contract, DOM/CSP checks, browser
visual fixtures.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Revisit only for a demonstrated layout/export blocker. Sources:
https://github.com/marp-team/marp-cli and
https://github.com/marp-team/marp-core; alternatives
https://revealjs.com/pdf-export/ and https://sli.dev/guide/exporting.
