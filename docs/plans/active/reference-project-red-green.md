# Task contract — executable reference project red → green

## Issue

#6 — `reference project: prove red-to-green agent delivery lifecycle`

## Execution state

`evaluating`

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
- [x] Minimal implementation fix changes only authoritative filtering logic.
- [x] Fixed implementation-head CI passes.
- [ ] Evaluation provenance and unverified claims are recorded and checked.
- [ ] Final exact-head CI passes after evaluation metadata.
- [ ] Exact head/base/reviews/threads are rechecked before merge.
- [ ] Merge uses expected-head protection when safe.
- [ ] This active artifact is retired and current state/work are reconciled after merge.

## Observed red evidence

- PR: #7
- exact red head: `54ec722faa3bda95cf7ce0d93f817505eea96da6`
- GitHub merge candidate: `9f630ccdf948e51da60cbdf8019f5534f9ae6b9d`
- workflow: `Playbook policy` run `31826895869`
- result: `failure`
- environment/setup: checkout PASS, Node 24 setup PASS
- knowledge contract: PASS (`40 markdown files checked`)
- public-safety contract: PASS (`54 tracked files inspected`)
- executable reference test: FAIL (`2 passed / 2 failed`)

Failing assertions proved the same root cause: blocked tasks were incorrectly eligible.

Classification: **deterministic implementation defect** in the eligibility filter. No retry was used.

## Fix

Changed only the authoritative predicate in `examples/reference-project/src/next-task.mjs`:

```text
status !== done  →  status === ready
```

Tests, priority ordering, CI workflow, and dependency surface were not changed to obtain green.

## Observed green evidence

- exact fixed head: `73845c27cede0807c0b6c8fed2c9eb69a124eb71`
- GitHub merge candidate: `9ba36d01d067539d2939027b71abe7c18fdb6c6a`
- workflow: `Playbook policy` run `31826966421`
- result: `success`
- Node: `24.19.0`
- knowledge contract: PASS (`40 markdown files checked`)
- public-safety contract: PASS (`54 tracked files inspected`)
- executable reference test: PASS (`4 passed / 0 failed`)
- agent doctor: `ok: true`, runtime `ok: true`, no missing required files

## Research decision

Use Node 24 built-in `node:test` rather than a third-party test framework. The repository already requires Node 24, the test runner is stable, and this avoids adding a dependency solely for the teaching sample.

## Rollback

Revert the focused PR. No external state exists.

## Next allowed action

Evaluate the actual diff and evidence, record provenance/unverified claims, then require a fresh exact-head policy pass after evaluation metadata before moving to `ready_for_review`.
