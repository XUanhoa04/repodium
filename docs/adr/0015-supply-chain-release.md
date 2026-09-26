# ADR-0015: Minimal dependencies and protected releases

## Status

Accepted — architecture decision, not implementation completion.

Date: 2026-09-26.

## Context

A local tool can leak data through compromised packages or unsafe release
automation.

## Decision

Use exact direct versions, package-lock/npm ci, SHA-pinned Actions, update PRs,
audit, dependency review, package allowlist, and disabled install scripts.
Before stable release add OIDC publishing, provenance, SBOM, and exact-commit
checks. Keep private:true until release gates pass.

## Alternatives

Unpinned latest installs; long-lived publish token; unrestricted npm package
contents.

## Consequences

Project lockfiles reproduce project builds, not necessarily every consumer
transitive install. Locked distribution strategy remains a Phase 5 decision.
Audit outage is not pass.

Security impact is governed by the [threat model](../threat-model.md).

## Validation

Dependency audit, package smoke on supported OS, clean rebuild and provenance
verification.

The [roadmap](../roadmap.md) tracks delivery; accepted does not mean tests
already exist.

## Revisit

Dependency exceptions require owner/expiry. Source:
https://docs.npmjs.com/trusted-publishers/.
