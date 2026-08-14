# Task contract — executable reference project red → green

## Issue

#6 — `reference project: prove red-to-green agent delivery lifecycle`

## Execution state

`ready_for_review`

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
- [x] Evaluation provenance and unverified claims are recorded.
- [x] Evaluation-head exact CI passes.
- [x] Ready-for-review state CI passes.
- [x] Independent review was genuinely requested; no review returned, so unavailability is explicitly recorded and no independent approval is claimed.
- [ ] Final frozen-head CI passes after review provenance is recorded.
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

Classification: **deterministic implementation defect** in the eligibility filter. No retry was used.

## Fix

Changed only the authoritative predicate in `examples/reference-project/src/next-task.mjs`:

```text
status !== done  →  status === ready
```

Tests, priority ordering, CI workflow, and dependency surface were not changed to obtain green.

## Green evidence

- fixed head `73845c27cede0807c0b6c8fed2c9eb69a124eb71` → run `31826966421` PASS, reference tests `4/4`;
- evaluation head `ac59d87986cfd53a29b447365d3bf6cd4640e42f` → run `31827068944` PASS;
- ready-for-review head `a82b69ee8ffd2b9807c12ebaca4e1e10e1e3eff6` → run `31827116151` PASS.

## Evaluation

See `docs/plans/active/reference-project-red-green-evaluation.md`.

Current verdict: `CLEAN WITH INDEPENDENT REVIEW UNAVAILABLE`.

A real GitHub Copilot review request was made after PR #7 left draft state. GitHub returned no review submission/reviewer state, so the absence is recorded rather than treated as approval.

## Research decision

Use Node 24 built-in `node:test` rather than a third-party test framework. The repository already requires Node 24, the test runner is stable, and this avoids adding a dependency solely for the teaching sample.

## Rollback

Revert the focused PR. No external state exists.

## Next allowed action

Let this frozen-evidence commit pass `playbook-policy`, then re-read exact head/base/reviews/threads and merge with expected-head protection only if still clean.
