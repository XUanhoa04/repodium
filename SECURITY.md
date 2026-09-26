# Security policy

## Current status

This project is pre-release architecture/scaffolding. No released version is
supported for production. The CLI does not yet analyze repositories or render
decks. Planned protections are described in the
[threat model](docs/threat-model.md); they must not be interpreted as
implemented guarantees.

## Report a vulnerability

Use
[GitHub private vulnerability reporting](https://github.com/XUanhoa04/repodium/security/advisories/new).
Do not open a public issue containing secrets, exploit payloads against real
users, or private repository content. Provide a minimal synthetic reproduction,
affected commit, impact, and relevant environment details. Response times are
best effort during the pre-release stage.

## Boundary

Repository content is untrusted data. Never run repository scripts or upload raw
source to an AI service. Secret scanning is a risk-reduction control, not a
guarantee that all confidential material is detectable. A compromised host or
malicious concurrent process with the same OS permissions requires OS isolation.
