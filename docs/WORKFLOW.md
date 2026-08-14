# End-to-End Agent Delivery Workflow

This file defines the execution loop. It complements `AGENTS.md`; it does not replace product or architecture authority.

## 1. Intake

Convert a request into a bounded task contract:

- Goal
- Exact scope
- Acceptance criteria
- Evidence required
- Stop conditions
- Delivery expectations

If any of these are materially ambiguous, resolve them from current repository authority before editing.

## 2. Reconnaissance

Before changing code:

1. inspect the affected implementation;
2. inspect nearby tests;
3. read current project state/work;
4. reproduce or confirm the current behavior when practical;
5. identify the actual owner of the behavior;
6. check git branch/base/worktree state.

Do not start by reading all historical issues.

## 3. Research

Research only unresolved external facts.

Use official/primary sources for APIs, frameworks, security controls, standards, and provider behavior.

Record:

- what the source establishes;
- what does not apply;
- how it matches or conflicts with actual repo/runtime evidence.

## 4. Classify risk

Use `RISK_MODEL.md`.

The risk class determines:

- planning depth;
- verification depth;
- independent review requirement;
- production/provider proof;
- permission boundary.

## 5. Plan

Prefer the smallest coherent vertical slice.

A plan should state:

- files/components likely affected;
- behavior/invariants preserved;
- implementation steps;
- tests/evidence;
- rollback or stop condition.

Do not use planning as a substitute for implementation.

## 6. Branch

Use a focused branch for substantive changes.

Keep unrelated work out of the branch.

If the base moved materially, reconcile before relying on old evidence.

## 7. Implement

Rules:

- search for existing owners/helpers before adding abstractions;
- do not broaden scope;
- fix ownership rather than stacking overrides;
- keep behavior and tests together;
- update requirements/specification before intentionally changing the contract.

## 8. Local verification

Run risk-selected checks.

Do not claim an interrupted command as passed.

If a failing check passes on retry, investigate whether the first failure indicates flakiness, shared-state contamination, timing sensitivity, or environment/resource contention.

## 9. Runtime/user proof

For user-facing work, drive the running product.

For boundary-specific work, use the matching evidence:

- UI → browser/e2e/responsive/accessibility;
- DB → migration/integration/isolation;
- security/provider → targeted security checks + provider read-back;
- production behavior → safe smoke when required and authorized.

## 10. Independent evaluation

For material work, use a fresh reviewer/context.

Challenge:

- scope;
- correctness;
- hidden regressions;
- complexity;
- test quality;
- mode correctness;
- evidence quality;
- ownership duplication.

Fix every material finding before calling the task clean.

## 11. Pull request

The PR should state:

- what changed;
- why;
- scope/non-scope;
- risk class;
- exact head when relevant;
- checks/evidence;
- reviewer findings/fixes;
- limitations.

A PR is part of durable project memory.

## 12. Exact-head verification

Immediately before merge verify:

- current PR head;
- required checks on that exact head;
- base relevance/up-to-date requirement;
- unresolved review threads;
- no unexpected skipped checks;
- no new material blocker.

Use an expected-head SHA merge guard when available.

## 13. Merge

Merge only if:

- the project permits it;
- all required evidence is clean;
- no owner-decision boundary remains;
- no irreversible/provider/data/security permission is being smuggled through the merge.

## 14. Post-merge proof

Where the changed behavior crosses into production/provider/runtime truth, verify it after merge/deployment.

Do not claim production success from pre-merge local evidence.

## 15. Reconcile lifecycle

After acceptance:

- remove completed work from `NOW`;
- update `CURRENT_STATE.md` when reality changed;
- update `CURRENT_WORK.md` when execution state changed;
- archive/close completed plans and stale tasks;
- record durable failure lessons only when future agents would otherwise rediscover them.

## 16. Improve the harness

After meaningful failures ask:

1. Why was the wrong action plausible?
2. What signal was missing?
3. Where should the rule live?
4. Can it be executable?

Prefer one guardrail over ten new warning paragraphs.
