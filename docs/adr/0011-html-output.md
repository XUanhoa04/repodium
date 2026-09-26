# ADR-0011: Restricted AST, escaping, and output validation

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Markdown may carry HTML, directives, URLs, SVG, and CSS capable of code
execution or exfiltration.

## Decision

Do not pass repository Markdown directly to Marp. Escape AST leaves; allow
bundled themes/resources only. No script/raw HTML/arbitrary CSS. Validate
generated DOM, resource protocols, citations, and CSP before publication. Treat
trusted Marp SVG scaffolding separately from rejected repository SVG.

## Alternatives

Sanitize after rendering unrestricted input; unsafe template interpolation;
disable CSP for compatibility.

## Consequences

Adapter profiles depend on pinned renderer behavior. Browser visual checks run
in CI without imposing a browser on core users.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

SEC-XSS, SEC-ASSET, HTML-VALID, directive/frontmatter injection and CSP
fixtures.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Renderer upgrades require golden DOM/visual and security regression review.
