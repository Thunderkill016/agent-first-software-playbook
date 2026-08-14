# Task contract — executable reference project red → green

## Issue

#6 — `reference project: prove red-to-green agent delivery lifecycle`

## Execution state

`implementing`

## Risk

Class 1 — bounded executable change with straightforward rollback.

## Permission scope

`branch_write`

No provider/ruleset/production/data/secret writes are required or implied.

## Goal

Prove the playbook with a real dependency-free executable sample and real CI history:

```text
task contract → intentional behavioral red → bounded fix → evaluation → exact-head green → merge → lifecycle closeout
```

## Acceptance

- [x] Sample README states domain contract and run commands.
- [x] Scoped `AGENTS.md` adds only reference-project invariants.
- [x] Built-in Node test encodes the behavior before the fix.
- [x] Root `npm run verify` runs the executable sample test.
- [x] Draft PR exact head fails for the intended blocked-task assertion.
- [x] Failure is classified from CI logs and preserved here.
- [ ] Minimal implementation fix changes only authoritative filtering logic.
- [ ] Fixed exact-head CI passes.
- [ ] Evaluation provenance and unverified claims are recorded.
- [ ] Exact head/base/reviews/threads are rechecked before merge.
- [ ] Merge uses expected-head protection when safe.
- [ ] This active artifact is retired and current state/work are reconciled after merge.

## Red-state design

The first implementation intentionally filters only `done` tasks. Therefore a `blocked/high` task can be selected ahead of a `ready/medium` task.

The test contract requires only `ready` tasks to be eligible. The failing test must not be weakened, skipped, or rewritten to match the bug.

## Observed red evidence

- PR: #7 (draft)
- exact red head: `54ec722faa3bda95cf7ce0d93f817505eea96da6`
- GitHub merge candidate: `9f630ccdf948e51da60cbdf8019f5534f9ae6b9d`
- workflow: `Playbook policy` run `31826895869`
- result: `failure`
- environment/setup: checkout PASS, Node 24 setup PASS
- knowledge contract: PASS (`40 markdown files checked`)
- public-safety contract: PASS (`54 tracked files inspected`)
- executable reference test: FAIL (`2 passed / 2 failed`)

Failing assertions:

1. `returns null when no task is ready` — actual result was `{ status: 'blocked', priority: 'high', title: 'Blocked' }` instead of `null`.
2. `never selects blocked or done work` — actual result was the `blocked/high` task instead of the `ready/medium` task.

Classification: **deterministic implementation defect** in the eligibility filter. This is the intended red state; no retry was used and no infrastructure explanation is needed.

## Research decision

Use Node 24 built-in `node:test` rather than a third-party test framework. The repository already requires Node 24, the test runner is stable, and this avoids adding a dependency solely for the teaching sample.

## Fix contract

Change only the authoritative eligibility predicate in `src/next-task.mjs` from “not done” to “status is exactly ready”.

Do not change the tests, priority ordering, CI workflow, or dependency surface to obtain green.

## Rollback

Revert the focused PR. No external state exists.

## Next allowed action

Apply the one-owner eligibility fix, then require a fresh exact-head policy run before evaluation.
