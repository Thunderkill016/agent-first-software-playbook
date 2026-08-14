# Completed task — executable reference project red → green

## Execution state

`accepted`

## Provenance

- Issue: #6
- Implementation PR: #7
- Merge commit: `31a187be14fba15eb25fc990cbbb8f4b2e29476f`
- Risk: Class 1
- Permission used: `branch_write`

## Goal

Prove the playbook with a real dependency-free executable lifecycle:

```text
task contract → intentional behavioral red → bounded fix → evaluation → exact-head green → merge → lifecycle closeout
```

## Result

Accepted.

The repository now contains `examples/reference-project/`, a small Node 24 sample with:

- scoped `AGENTS.md` instructions;
- a pure task-selection function;
- focused built-in `node:test` tests;
- root `npm run verify` integration.

## Red evidence

- exact red head: `54ec722faa3bda95cf7ce0d93f817505eea96da6`
- merge candidate: `9f630ccdf948e51da60cbdf8019f5534f9ae6b9d`
- policy run: `31826895869`
- result: failure
- knowledge contract: PASS
- public-safety contract: PASS
- reference tests: `2 passed / 2 failed`

Both failures proved the same deterministic implementation defect: `blocked` tasks were still eligible.

No retry was used.

## Bounded fix

Only the authoritative eligibility predicate changed:

```text
status !== done  →  status === ready
```

The tests, CI workflow, priority semantics, and dependency surface were not weakened or expanded to obtain green.

## Green evidence

- fixed implementation head `73845c27cede0807c0b6c8fed2c9eb69a124eb71` → run `31826966421` PASS, `4/4` tests;
- evaluation head `ac59d87986cfd53a29b447365d3bf6cd4640e42f` → run `31827068944` PASS;
- ready-for-review head `a82b69ee8ffd2b9807c12ebaca4e1e10e1e3eff6` → run `31827116151` PASS;
- final frozen head `9b94321a9f7ff3723e76580ad0f28b31e3792103` → run `31827264834` PASS.

Immediately before merge:

- PR was non-draft and mergeable;
- `main` still matched the reviewed base `a63fed8db065fef37af1c9e4c8f243c549c71ff7`;
- no review submissions or unresolved review threads existed;
- independent Copilot review had been genuinely requested but returned no review submission, so independent approval was not claimed;
- merge used `expected_head_sha=9b94321a9f7ff3723e76580ad0f28b31e3792103`.

## Rollback

Revert PR #7 / merge commit `31a187be14fba15eb25fc990cbbb8f4b2e29476f`. No external/provider state was created.

## Follow-up

Current execution advances to empirical cross-agent onboarding validation. The task and its evaluation are retired from `docs/plans/active/` by lifecycle closeout rather than remaining falsely active.
