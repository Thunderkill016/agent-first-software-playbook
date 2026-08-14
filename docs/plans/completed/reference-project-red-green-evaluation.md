# Completed evaluation — executable reference project red → green

## Evaluator provenance

- Evaluator: implementing agent self-review.
- Independent from implementation: **no**.
- Independent GitHub Copilot review was genuinely requested after PR #7 left draft state.
- GitHub returned no review submission/reviewer state, so independent review is recorded as **unavailable**, not approved.

## Verdict

`CLEAN WITH INDEPENDENT REVIEW UNAVAILABLE`

## Acceptance summary

| Claim | Evidence | Result |
|---|---|---|
| Real executable sample exists | `examples/reference-project/` | PASS |
| Root verification exercises it | `npm run verify` includes `test:reference` | PASS |
| Red state was real and behavioral | head `54ec722f…`, run `31826895869` | PASS |
| Red was not infrastructure | setup/knowledge/public safety passed first | PASS |
| Fix stayed at authoritative owner | one eligibility predicate changed | PASS |
| Tests were not weakened | behavior test file unchanged across fix | PASS |
| Fixed behavior passed | head `73845c27…`, run `31826966421`, `4/4` | PASS |
| Evaluation/readiness states passed | runs `31827068944`, `31827116151` | PASS |
| Final frozen exact head passed | head `9b94321a…`, run `31827264834` | PASS |
| Independent approval | no review returned | UNAVAILABLE / not claimed |
| Merge used stale evidence | expected-head guard rejected this risk | PASS |

## Counterexamples challenged

- blocked work cannot outrank ready work because eligibility filters exact `ready` before priority ranking;
- done work cannot be selected for the same reason;
- equal-priority order stays deterministic through original-index tie breaking;
- green did not come from deleting/skipping/changing the tests;
- no framework/dependency/provider boundary was introduced;
- no retry concealed the red state;
- a reviewer request was not relabeled as reviewer approval.

## Unverified claims

This example does **not** claim to prove:

- UI/browser/accessibility delivery;
- database/schema/ownership delivery;
- provider/production verification;
- cross-agent interoperability in real executions.

Those require their own boundary-specific evidence.

## Accepted merge

PR #7 was squash-merged as `31a187be14fba15eb25fc990cbbb8f4b2e29476f` after final exact-head CI and head/base/review-thread rechecks.
