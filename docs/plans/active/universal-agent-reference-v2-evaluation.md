# Evaluation — universal agent reference v2

## Evaluator provenance

- Evaluator: implementing agent self-review.
- Independent from implementation: **no**.
- GitHub Copilot code review was requested using the official reviewer identity, but no review submission was returned. The request itself is **not** counted as independent evidence.
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
| Private project case-study removed | legacy case-study file absent from branch | PASS |
| One canonical shared agent authority | root `AGENTS.md` + thin adapters + interoperability doc | PASS |
| Broad agent interoperability routed from official docs | AGENTS open format; Codex; Jules; Copilot; Claude Code; Gemini CLI; Cursor; Windsurf; Cline; Aider | PASS |
| Machine-readable policy mirrors repository contract | `agent-contract.json` + `scripts/agent-policy.mjs` | PASS |
| Deterministic knowledge drift checks | final implementation-head `playbook-policy` | PASS |
| Public-safety guard | final implementation-head `playbook-policy` | PASS |
| Least-privilege CI | log confirmed `Contents: read`; checkout credentials not persisted | PASS |
| Immutable Actions pins | checker + checkout/setup-node v6 full commit SHAs | PASS |
| Supported Actions/runtime baseline | Node 24.19; contract requires Node 24+ | PASS |
| Issue-template metadata valid | knowledge checker validates `name:`/`about:` | PASS |
| Independent evaluation | Copilot requested, no review returned | UNAVAILABLE / not claimed |
| Provider/ruleset enforcement | intentionally owner/provider decision | NOT APPLICABLE to branch write; not claimed |

## Final implementation-head CI

`playbook-policy` run `31826162489` completed successfully for PR head `ba599bd6b7c2cb7bcc065920f89c9d662116d495` / GitHub merge candidate `04c724edc6fae694a0ffc5004c6d25c418be256e`.

Observed in the successful job log:

- GitHub token: `Contents: read`, `Metadata: read`;
- checkout v6 exact SHA `d23441a48e516b6c34aea4fa41551a30e30af803`;
- setup-node v6 exact SHA `249970729cb0ef3589644e2896645e5dc5ba9c38`;
- `persist-credentials: false`;
- Node `24.19.0`;
- `Knowledge contract: PASS (37 markdown files checked)`;
- `Public-safety contract: PASS (49 tracked files inspected)`;
- doctor `ok: true`, runtime `ok: true`, no missing required files.

This evaluation update is lifecycle/evidence metadata only and must itself receive the same policy check before merge.

## Findings

### P1 — CI used a deprecated runtime/action generation — RESOLVED

**Observed evidence:** the first successful policy run warned that Node 20 was deprecated and that checkout/setup-node v4 were being forced onto Node 24 by the runner.

**Why this mattered:** a best-practice reference repo should not rely on a compatibility fallback while teaching deterministic environment policy.

**Fix:** upgraded to official checkout/setup-node v6 commit pins, configured Node 24, disabled unnecessary package-manager caching, disabled persisted checkout credentials, declared `engines.node >=24`, added the runtime baseline to `agent-contract.json`, taught `agent:doctor` to validate/report runtime compatibility, and added a minimal lockfile.

**Regression proof:** the later successful run used Node 24.19 and v6 actions without the earlier Node-20 deprecation warning.

### P2 — initial issue-template metadata typo — RESOLVED

**Observed:** the first draft used an invalid `about` key spelling.

**Fix:** corrected metadata and added a knowledge-contract check so future copies fail CI when required frontmatter fields disappear.

**Regression proof:** knowledge contract passed after the checker and correction were present.

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
- [x] Movable GitHub Action tags accepted as supply-chain pinning — workflow uses full commit SHAs.
- [x] One vendor treated as universal authority — the contract is vendor-neutral with verified discovery adapters/native paths.

## Unverified claims

- Truly independent code review (no reviewer submission returned).
- Provider branch/ruleset requirements, because no provider mutation is authorized in this work packet.
- End-to-end empirical onboarding runs across every agent ecosystem; official discovery compatibility is documented, but real multi-tool trials remain future work.
- Stack/domain-specific invariants, because this is a generic reference repository rather than an application product.

## Verdict

`CLEAN WITH INDEPENDENT REVIEW UNAVAILABLE`

Meaning:

- no material self-evaluation finding remains open;
- exact implementation-head policy evidence is green;
- independent review is **not** claimed;
- provider/ruleset enforcement is **not** claimed;
- this metadata update must pass the same exact-head policy gate before merge.

## Next allowed action

Observe policy CI for this evaluation commit. If green, transition the work packet to `ready_for_review`, then require one final policy check on that state-only commit before merge.
