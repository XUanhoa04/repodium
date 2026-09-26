# ADR-0009: Screen before every external boundary

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

Secrets can be in docs, config, filenames, metadata, prompts, and diagnostics,
not just .env.

## Decision

Hard-deny before read, classify/limit/decode, then use reviewed fixed-config
Secretlint integration plus sensitive-category exclusions. Prove inline
suppressions cannot bypass it. Reject a document on a finding or scanner
failure. Rescan outgoing context and output strings. Never log matched text.

## Alternatives

Raw repo uploads; redaction-only pipelines; honoring repository scanner
configuration.

## Consequences

False positives can omit useful context. Pattern scans cannot detect all
confidential data. MVP avoids repository assets and source dumps.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

SEC-SECRET across provider/logs/staging/artifacts; SEC-SUPPRESSION; scanner
timeout.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Scanner changes need corpus/false-negative review. Source:
https://github.com/secretlint/secretlint.
