# Threat model

Status: accepted requirements, not implemented protections. MVP release is
blocked until the corresponding security tests pass.

## Assets and adversary

Protect repository secrets, host credentials/files, API keys, output integrity,
and machine resources. Treat repository text, paths, config, assets, Git
metadata, and provider responses as attacker controlled. A compromised
OS/runtime or concurrent attacker with identical OS privileges is outside the
portable application's guarantee; hostile execution environments require a
read-only snapshot/OS sandbox.

## Trust boundaries

| ID  | Boundary                  | Mandatory controls                                   |
| --- | ------------------------- | ---------------------------------------------------- |
| B1  | Filesystem → admission    | Root containment, no-follow, ignore/type/size checks |
| B2  | Raw input → approved data | Secret and sensitivity screening, bounded parsers    |
| B3  | Approved model → provider | Explicit opt-in, minimized context, egress rescan    |
| B4  | Provider → application    | Strict schema, allowed claims/templates, budgets     |
| B5  | AST → renderer/browser    | Escaping, resource allowlist, CSP, isolation         |
| B6  | Application → output      | Owned staging, no overwrite, validate before publish |
| B7  | CI → package registry     | Protected workflow, pinned dependencies, provenance  |

## Threat/control/test mapping

| Threat                               | Required mitigation                                                    | Test ID         |
| ------------------------------------ | ---------------------------------------------------------------------- | --------------- |
| Traversal, UNC, ADS, device paths    | Canonical containment; reject special path forms                       | SEC-PATH        |
| Symlink/junction/loops               | Reject links and linked ancestors; no recurse                          | SEC-LINK        |
| Hard links and mutation              | Reject multiple links when reported; identity checks before/after read | SEC-RACE        |
| Submodules                           | Skip gitlinks/nested Git roots; never init/update                      | SEC-SUBMODULE   |
| Ignored/credential files             | Hard deny before open; nested gitignore semantics                      | SEC-IGNORE      |
| Huge/binary/generated/minified input | Metadata/content limits, encoding checks                               | SEC-RESOURCE    |
| YAML/JSON/Markdown bombs             | Depth/node limits, no custom tags/aliases, worker deadlines            | SEC-PARSER      |
| Secret leakage                       | Scanner + field allowlist + egress/output rescan                       | SEC-SECRET      |
| Inline scanner suppression           | Fixed scanner config; repository suppression has no authority          | SEC-SUPPRESSION |
| Prompt injection                     | Data-only context, no tools, constrained proposal                      | SEC-PROMPT      |
| Script/HTML injection                | No raw HTML; AST serialization; structural validation                  | SEC-XSS         |
| Malicious SVG/CSS                    | Reject repository SVG/CSS; bundled generated scaffold only             | SEC-ASSET       |
| Network/SSRF                         | No remote assets; fixed HTTPS provider origin; no redirects            | SEC-EGRESS      |
| Offline egress                       | No transport/downloads; process-tree attempted-connect detection       | SEC-OFFLINE     |
| Output overwrite/temp leak           | Fresh output dir; exclusive staging; cleanup on failure                | SEC-OUTPUT      |
| Terminal/diagnostic leakage          | Escape controls; static messages/IDs; no raw trace                     | SEC-LOG         |

## Admission order

Normalize path → denylist and ignore → lstat/ancestor checks → size → bounded
read → strict decoding/classification → secret/sensitive screening → bounded
parse. Only accepted fields/spans enter domain models. Never copy a raw
repository into an exporter staging directory. Reject changed files; no claim of
race-proof cross-platform path resolution against a hostile same-user process.

Hard deny: `.env*`, credentials/private keys/keystores, cloud credential
directories, `.ssh`, `.git` contents, `.npmrc`, `.pypirc`,
dependency/vendor/build/cache folders, logs/dumps/archives, and tool output.
`.env.example` is denied too. Denied files are not opened just to scan them.
Nested `.gitignore` is bounded untrusted control data; negation cannot re-enable
a hard-denied path.

## Secrets and sensitive content

Use a reviewed Secretlint programmatic integration with tool-owned rules/config.
Do not discover repository plugins/config or honor inline disables. Phase 1 must
prove suppressions cannot bypass scanning before adopting the adapter. A finding
excludes the whole document. Scanner failure fails closed. Never log matched
text. Screen metadata, filenames shown publicly, AI context/response, notes, and
outputs. Sensitive dump/log/customer-data categories are excluded independently
of secrets.

Pattern scanners cannot identify all confidential data. No automated image/OCR
confidentiality guarantee. MVP accepts no repository images. A later explicit
user logo is an approved asset, decoded/re-encoded with metadata removed and
bounded dimensions; reject SVG. No remote fetching. User approval does not waive
parser safety or resource checks.

## Renderer policy

No raw Markdown passthrough; source comments/frontmatter/Marp directives are
data. No executable HTML, event attributes, iframe/embed/object/form, unsafe
URLs, external fonts, or arbitrary CSS. Validate generated Marp SVG scaffolding
by adapter version; this does not allow user SVG. Use context-aware escaping,
not string interpolation. Target CSP:
`default-src 'none'; script-src 'none'; connect-src 'none'; img-src data:; font-src data:; style-src 'sha256-<actual-style-hash>'; object-src 'none'; base-uri 'none'; form-action 'none'`.
Normalize controlled style attributes as necessary; never add unsafe-inline just
to make tests pass. CSP complements DOM validation.

## Network and export

Offline forbids attempted DNS/TCP/HTTP requests, telemetry, update checks, and
lazy downloads, including children. Core HTML uses no browser. Provider requests
require explicit invocation opt-in, bounded HTTPS requests to a fixed adapter
origin, TLS verification, and no redirect. Repository config cannot select
endpoint/proxy.

Future remote fetching requires a new ADR: validate resolved A/AAAA against
public IP ranges (including IPv4-mapped IPv6), reject
loopback/private/link-local/metadata destinations and non-HTTP protocols, pin
the validated address during connection, revalidate redirects, and bound
decompressed size/time. Hostname checks alone fail.

Initial browser export uses an optional pre-provisioned local container with
pinned digest, `--pull=never`, network disabled, non-root, read-only root,
resource limits, and only sanitized input/output mounts. Keep the browser
sandbox enabled. No repo, home, credentials, or engine socket mount. Reject
remote container daemons in offline mode. If isolation is unavailable, fail
rather than weaken policy.

## Supply chain

Pin direct dependencies and action SHAs; commit lockfile; use `npm ci`. Review
new dependencies, disable install scripts by default, run audit in CI, and treat
audit unavailability as not passed. Do not execute fork code with privileged
tokens. Publish only after protected release gates, package allowlist,
SBOM/provenance, and exact-commit verification. Build lockfiles do not by
themselves pin every consumer's transitive install tree.
