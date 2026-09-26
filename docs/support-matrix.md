# Support matrix

| Capability                    | Current scaffold         | MVP commitment                                    | Later                        |
| ----------------------------- | ------------------------ | ------------------------------------------------- | ---------------------------- |
| Node.js 24 / npm 11           | Help/version and tooling | Supported                                         | New LTS after CI             |
| Linux/macOS/Windows           | Scaffold CI              | Native core support                               | Export profile checks        |
| HTML generation               | Not implemented          | Self-contained, no browser dependency             | More themes                  |
| Node/Python/Go                | Schema examples only     | Manifest/docs/metadata                            | Deeper analyzers             |
| Java/other repositories       | Not implemented          | Docs/generic metadata; no full dependency promise | Demand-driven                |
| Monorepo                      | Not implemented          | Scoped components                                 | Additional workspace formats |
| Vietnamese/English            | Not implemented          | Bundled fonts and catalogs                        | Additional locales           |
| AI                            | Not implemented          | Not required                                      | Phase 3 explicit opt-in      |
| PDF                           | Not implemented          | Not included                                      | Phase 4 isolated exporter    |
| PPTX                          | Not implemented          | Not included                                      | Optional image-based export  |
| Remote assets / editable PPTX | Unsupported              | Unsupported                                       | New ADR required             |
| PyPI/cloud backend            | Unsupported              | Unsupported                                       | No current commitment        |

Node patches are pinned for CI and updated with security maintenance. A
successful scaffold build is not evidence of implemented analysis or rendering
support.
