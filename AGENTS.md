# Agent-First Software Playbook — agent entrypoint

This file is procedural hot context. It is a **router**, not the project encyclopedia.

If you are a coding agent entering this repository for the first time, follow the algorithm below before editing.

## Authority order

When sources disagree, resolve them in this order:

1. current executable code/configuration and repository structure;
2. tests/checks that intentionally encode current behavior;
3. `docs/CURRENT_STATE.md`;
4. the active task/work packet;
5. `ARCHITECTURE.md` and `docs/PRODUCT.md`;
6. `docs/CURRENT_WORK.md`;
7. open issues and pull requests;
8. historical/completed plans and external discussion.

Open/unmerged work is candidate evidence, not current truth.

## First-run algorithm

1. Identify the requested outcome and affected boundary.
2. Read `README.md`.
3. Inspect the affected files/code and nearby tests before reading history.
4. Read `docs/CURRENT_STATE.md`.
5. Read `docs/CURRENT_WORK.md` to distinguish current execution from backlog/hold/owner decisions.
6. Read `ARCHITECTURE.md`, `docs/PRODUCT.md`, and `docs/RISK_MODEL.md` as required by the boundary.
7. For methodology or a non-trivial task, read `docs/A_TO_Z_AGENT_FIRST_PROJECT.md` and `docs/WORKFLOW.md`.
8. Inspect branch/base/worktree state.
9. Confirm or reproduce current behavior when practical.
10. Classify risk and permission boundaries before editing.
11. Research only unresolved external facts, preferring primary/official sources.
12. Create the smallest coherent plan.
13. Implement on a focused branch.
14. Run risk-selected evidence.
15. Use fresh independent evaluation for material work.
16. Open/update a pull request with truthful scope and evidence.
17. Verify required checks against the exact current head before merge.
18. Merge only when authorized and safe.
19. Verify production/provider/runtime truth when the completion claim requires it.
20. Reconcile current state/work and convert repeated failures into guardrails.

## Task structure

For a bounded task use `templates/AGENT_TASK.md`.

Use `templates/WORK_PACKET.md` when work is high-consequence, multi-day, multi-agent, cross-cutting, provider/production-related, hard to roll back, or research-heavy.

Do not create a new management layer when an existing artifact can own the state.

## Risk

Use `docs/RISK_MODEL.md`.

Risk follows consequence, blast radius, rollback difficulty, and uncertainty — not line count.

- **Class 0:** docs/mechanical.
- **Class 1:** bounded code in one subsystem.
- **Class 2:** user flow/UI/multi-component behavior.
- **Class 3:** financial/data/security/auth/migrations/operations/high-consequence work.

## Rules

- One task, one coherent scope.
- Prefer the smallest change that satisfies the acceptance criteria.
- Search existing owners/helpers/tests before adding abstractions.
- Fix the authoritative owner instead of stacking overrides.
- Change requirements/specification before intentionally changing a contract.
- Never invent product requirements, data, or missing operational truth.
- Never claim a check passed if it did not run to a conclusive pass.
- A retry-pass does not erase the first failure; classify why it failed.
- Do not confuse local/demo/test/browser evidence with production evidence.
- Do not broaden scope to fix unrelated defects; report or create follow-up work.
- Never commit secrets, credentials, private user data, or sensitive provider identifiers.
- Separate repository/merge authority from production/provider/database/security/destructive authority.
- Hidden chat context is not a durable handoff.

## Verification contract

Match claims to evidence:

- compile/type claim → static/build checks;
- domain behavior → focused unit/integration tests;
- UI/user-flow claim → running browser/e2e/responsive/accessibility proof;
- database/isolation claim → migration/database boundary tests;
- provider/configuration claim → provider read-back;
- production claim → safe production verification when authorized.

A generated diff is not completion.

## Review contract

Material changes require fresh reasoning that challenges:

- design;
- functionality;
- scope;
- complexity;
- test quality;
- user impact;
- runtime/mode correctness;
- ownership duplication;
- whether evidence actually supports the claims.

Fix material findings. Do not block indefinitely on subjective polish.

## Exact-head rule

Before merge, verify the checks and review apply to the exact current PR head.

Old green CI does not authorize a newer commit.

Use an expected-head SHA merge guard when the platform supports it.

## Completion

A change is complete only when:

- scope and acceptance criteria are satisfied;
- evidence matches the risk and the claims;
- material review findings are resolved or explicitly accepted by the correct authority;
- exact-head checks are clean;
- no ungranted permission boundary remains;
- affected runtime/production/provider behavior is verified when required;
- `CURRENT_STATE` / `CURRENT_WORK` are reconciled if project truth changed;
- completed execution artifacts are closed/archived instead of remaining falsely active.

## Deeper guide

Read [`docs/A_TO_Z_AGENT_FIRST_PROJECT.md`](docs/A_TO_Z_AGENT_FIRST_PROJECT.md) for the full A→Z rationale, failure patterns, maturity model, and reusable operating loop.

Read [`docs/MONEYFLOW_LESSONS.md`](docs/MONEYFLOW_LESSONS.md) for public-safe lessons distilled from a real agent-heavy project.
