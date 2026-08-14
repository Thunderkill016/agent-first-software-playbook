# Evaluation — executable reference project red → green

## Evaluator provenance

- Evaluator: implementing agent self-review.
- Independent from implementation: **no**.
- Task: issue #6 / PR #7.
- Independent review will be requested when the PR is ready; the request alone will not count as completed review.

## Scope reviewed

Changed files:

- `package.json`
- `examples/reference-project/README.md`
- `examples/reference-project/AGENTS.md`
- `examples/reference-project/src/next-task.mjs`
- `examples/reference-project/test/next-task.test.mjs`
- `docs/plans/active/reference-project-red-green.md`

No UI, database, provider, workflow file, branch ruleset, dependency, secret, or production boundary changed.

## Acceptance matrix

| Acceptance | Evidence | Result |
|---|---|---|
| Executable dependency-free sample exists | source/test/README under `examples/reference-project/` | PASS |
| Scoped agent instructions contain only local delta | nested `AGENTS.md` inherits root and defines domain/test boundary | PASS |
| Root verification exercises sample | root `verify` invokes `test:reference` | PASS |
| Real red state exists | PR #7 head `54ec722f…`, policy run `31826895869` | PASS |
| Red failure is behavioral, not infrastructure | setup + knowledge + public-safety passed; 2 focused assertions failed | PASS |
| Failure preserved rather than hidden | active lifecycle artifact records exact head/run/assertions/classification | PASS |
| Fix is bounded to authoritative owner | one predicate changed in `src/next-task.mjs` | PASS |
| Tests were not weakened to get green | test file unchanged across fix commit | PASS |
| Fixed implementation passes | head `73845c27…`, run `31826966421`, 4/4 tests pass | PASS |
| Doctor/knowledge/public safety remain green | same fixed-head run | PASS |
| Independent evaluation | not yet obtained | UNVERIFIED / not claimed |
| Final exact-head gate after this evaluation artifact | pending | PENDING |

## Red → green proof

### Red

At exact head `54ec722faa3bda95cf7ce0d93f817505eea96da6`, `playbook-policy` run `31826895869` failed only after repository knowledge/public-safety checks had passed and `test:reference` executed.

Observed failures:

- no-ready input returned a blocked task instead of `null`;
- blocked/high outranked ready/medium.

Classification: deterministic implementation defect. No retry.

### Fix

The only behavior fix changed eligibility from `task.status !== 'done'` to `task.status === 'ready'`.

### Green

At exact fixed head `73845c27cede0807c0b6c8fed2c9eb69a124eb71`, `playbook-policy` run `31826966421` passed with:

- Node `24.19.0`;
- knowledge contract PASS;
- public-safety contract PASS;
- reference tests `4 passed / 0 failed`;
- agent doctor `ok: true`.

## Counterexamples challenged

- [x] Could green have come from weakening/removing the failing test? No; the fix touched only source logic.
- [x] Could blocked work still win due to priority? No; eligibility filtering now occurs before ranking.
- [x] Could done work still win? No; only exact `ready` status enters candidates.
- [x] Could equal-priority sorting become unstable? The original index remains the tie-breaker and the dedicated test passes.
- [x] Could the sample silently add a framework/dependency? No dependency/package installation was added.
- [x] Could root CI stop exercising the sample later without an obvious diff? `verify` now includes `test:reference`; removing it would be a visible contract change.
- [x] Could the intentional red run be confused with flake? The two assertions deterministically match the known predicate defect; there was no retry.

## Unverified claims

- Truly independent review has not yet been returned.
- This sample does not prove UI/database/provider/production workflows; it proves only a Class 1 dependency-free executable lifecycle.
- Multi-agent/vendor onboarding remains separate future work.

## Verdict

`CLEAN WITH INDEPENDENT REVIEW PENDING`

No material self-review finding is open. The current evaluation commit must itself receive a successful `playbook-policy` run before the PR can move to `ready_for_review`.

## Next allowed action

Require exact-head policy success for this evaluation head, mark the PR ready, request independent review, then recheck findings/head/base before final merge state.
