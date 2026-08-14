# Evaluation — universal agent reference v2

## Evaluator provenance

- Evaluator: implementing agent self-review.
- Independent from implementation: **no**.
- GitHub Copilot code review was requested using the official reviewer identity, but no review submission was returned at the time this evaluation was written. The request itself is **not** counted as independent evidence.
- Task/work packet: `docs/plans/active/universal-agent-reference-v2.md`.

## Scope reviewed

The change was reviewed as **Class 3** because it modifies CI/security/permission/governance policy, despite most repository content being documentation.

Review focus:

- canonical instruction routing and cross-agent adapters;
- machine-readable policy vs prose;
- knowledge/public-safety check behavior;
- CI permissions, action pinning and runtime baseline;
- generic/project-neutral content;
- exact-head/lifecycle semantics;
- research authority and applicability;
- provider/production boundaries.

## Acceptance matrix

| Acceptance | Evidence | Result |
|---|---|---|
| Vendor/project-neutral root contract | rewritten `README.md`, `AGENTS.md`, A→Z guide | PASS |
| Private project case-study removed | `docs/MONEYFLOW_LESSONS.md` absent from branch | PASS |
| One canonical shared agent authority | root `AGENTS.md` + thin adapters + interoperability doc | PASS |
| Major agent ecosystems routed from official docs | references + interoperability matrix | PASS |
| Machine-readable policy mirrors repository contract | `agent-contract.json` + `scripts/agent-policy.mjs` | PASS |
| Deterministic knowledge drift checks | `scripts/check-knowledge.mjs` | PASS on first PR policy run; must rerun on final head |
| Public-safety guard | `scripts/check-public-safety.mjs` | PASS on first PR policy run; must rerun on final head |
| Least-privilege CI | workflow `permissions: contents: read`; first run log confirmed Contents: read | PASS |
| Immutable Actions pins | checker + exact full-SHA pins | PASS; pins upgraded after evaluation finding |
| Current supported Actions runtime | checkout/setup-node v6 + Node 24 | FIXED; final-head run required |
| Issue-template metadata valid | knowledge checker validates `name:`/`about:` | PASS on first run after typo correction |
| Exact-head evidence | final head CI and review state | PENDING |
| Independent evaluation | Copilot requested, no review returned | UNVERIFIED / not claimed |
| Provider/ruleset enforcement | intentionally owner/provider decision | NOT APPLICABLE to branch write; not claimed |

## Findings

### P1 — CI used a deprecated runtime/action generation

**Observed evidence:** the first successful `playbook-policy` log warned that Node 20 was deprecated and that `actions/checkout@v4` / `actions/setup-node@v4` were being forced onto Node 24 by the runner.

**Why this mattered:** a best-practice reference repo should not rely on a compatibility fallback while teaching deterministic environment policy.

**Fix:** upgraded to official checkout/setup-node v6 commit pins, configured Node 24, disabled unnecessary package-manager caching, disabled persisted checkout credentials, declared `engines.node >=24`, added runtime baseline to `agent-contract.json`, taught `agent:doctor` to validate/report the runtime, and added a minimal lockfile.

**Status:** fixed in branch; requires final-head CI confirmation.

### P2 — initial issue-template metadata typo

**Observed:** the first draft used `a bout:` instead of `about:`.

**Fix:** corrected metadata and added a knowledge-contract check so future copies fail CI when required frontmatter fields disappear.

**Status:** fixed and mechanically guarded.

## Counterexamples challenged

- [x] Shared policy duplicated into vendor adapters — adapters remain thin.
- [x] Personal/automatic memory committed as project truth — explicitly excluded/ignored.
- [x] `AGENTS.md` context bloat — machine line budget enforced.
- [x] Documentation-only classification despite CI/security changes — work is Class 3.
- [x] Local green presented as provider branch protection — ruleset remains explicit owner decision.
- [x] Lightweight regex scan presented as secret scanning — docs explicitly reject that equivalence.
- [x] Build/CI status presented as runtime/product proof — reference repo claims only policy/tooling evidence.
- [x] Copilot review request presented as completed independent review — explicitly not claimed.
- [x] Old successful workflow treated as final after head changed — explicitly rejected.
- [x] Movable GitHub Action tags accepted as supply-chain pinning — final workflow uses full commit SHAs.

## Unverified claims

- Final exact-head CI after Node 24/evaluation/research updates.
- Truly independent code review (no reviewer submission yet).
- Provider branch/ruleset requirements, because no provider mutation is authorized in this work packet.
- Real cross-tool onboarding execution; official discovery compatibility is documented, but end-to-end empirical runs across every tool remain future work.

## Verdict

`CHANGES_REQUIRED` until final-head `playbook-policy` succeeds.

After final-head CI succeeds and no material review thread appears, the self-evaluation verdict may move to `CLEAN WITH INDEPENDENT REVIEW UNAVAILABLE`, which is intentionally weaker than claiming independent approval.

## Next allowed action

Run/observe `playbook-policy` on the exact current head, re-check PR review threads and base/head, then update the packet/PR evidence before any merge.
