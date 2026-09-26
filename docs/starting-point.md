# Start here, coding agent

1. Read architecture, threat model, contracts, and accepted ADRs.
2. Review Phase 0's gate in the roadmap; attach command results and check any
   remaining review items in its GitHub sub-epic before closing it.
3. Do not infer that scaffold CI satisfies Phase 1. Map every Phase 1 acceptance
   criterion to a real test before marking the phase complete.
4. Implement P1.2 policy/schema decoding, then P1.3 safe discovery, P1.4
   admission, and P1.5 screening before any repository content reaches
   rendering.
5. Build the first vertical slice: safe package.json + README → evidence → one
   declaration claim → deterministic AST → self-contained validated HTML.
6. Include .env canary, external link, and malicious README negative fixtures in
   that slice. No raw-source temp files and no external network calls.
7. Extend supported manifests only after the slice passes its gates.

Do not start with prompts, PPTX, remote assets, a theme gallery, or deep AST
parsing. Do not remove package publishing protection before Phase 5. Rename the
CLI/config consistently to Repodium (`repodium`, `repodium.config.json`).
