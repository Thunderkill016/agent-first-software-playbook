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
- [ ] Draft PR exact head fails for the intended blocked-task assertion.
- [ ] Failure is classified from CI logs and preserved here.
- [ ] Minimal implementation fix changes only authoritative filtering logic.
- [ ] Fixed exact-head CI passes.
- [ ] Evaluation provenance and unverified claims are recorded.
- [ ] Exact head/base/reviews/threads are rechecked before merge.
- [ ] Merge uses expected-head protection when safe.
- [ ] This active artifact is retired and current state/work are reconciled after merge.

## Red-state design

The first implementation intentionally filters only `done` tasks. Therefore a `blocked/high` task can be selected ahead of a `ready/medium` task.

The test contract requires only `ready` tasks to be eligible. The failing test must not be weakened, skipped, or rewritten to match the bug.

## Research decision

Use Node 24 built-in `node:test` rather than a third-party test framework. The repository already requires Node 24, the test runner is stable, and this avoids adding a dependency solely for the teaching sample.

## Expected first failure

`test/next-task.test.mjs` should fail because `pickNextTask()` returns a blocked task (or a non-null blocked task when no ready task exists).

If CI instead fails from checkout, Node setup, knowledge/public-safety contracts, syntax, or infrastructure, classify that separately and do not call it the intended red state.

## Rollback

Revert the focused PR. No external state exists.

## Next allowed action

Open a draft PR on the current intentionally-red head and observe the exact CI failure before editing the implementation.
