# ADR-0013: Bundle fonts and separate language from evidence

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Vietnamese and mixed-language repos must render without relying on
host-installed fonts.

## Decision

Bundle licensed Noto Sans and Mono with checksums and glyph tests.
English/Vietnamese templates; preserve source quotations without unverified
translation. Themes use validated tokens. Split/drop content within budget
instead of unreadable shrink.

## Alternatives

Host fonts, remote font CDN, LLM translating factual text without verification.

## Consequences

Font assets increase package size. Scope and qualifier wording are part of
correctness, not cosmetic customization.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

NFC/NFD Vietnamese, mixed language, long title/identifier and overflow fixtures.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Add language/font support with glyph coverage and packaged resource checks.
Source: https://github.com/notofonts/latin-greek-cyrillic.
