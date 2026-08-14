# Project — agent entrypoint

This file is procedural hot context. Keep it short. Route deeper knowledge instead of duplicating it.

## Product identity

- Who is the product for?
- What are the 2–4 core user jobs?
- What is explicitly not the product?

## Authority order

When sources disagree:

1. current executable code/migrations;
2. intentional tests;
3. current project state;
4. active task/work packet;
5. architecture/product laws;
6. current work board;
7. open issues/PRs;
8. historical plans/chat.

## First-run route

1. Read `README.md`.
2. Inspect affected code/tests.
3. Read `docs/CURRENT_STATE.md`.
4. Read `docs/CURRENT_WORK.md`.
5. Load architecture/product/risk docs only as required.
6. Confirm branch/base/worktree state.
7. Reproduce/confirm current behavior when practical.
8. Classify risk and permission boundaries.
9. Research only unresolved external facts.
10. Implement the smallest coherent change on a focused branch.
11. Run risk-selected verification.
12. Use independent evaluation for material work.
13. Verify exact-head CI before merge.
14. Reconcile current state/work after acceptance.

## Domain invariants

Replace these examples with project laws:

- [invariant]
- [invariant]
- [invariant]

If an invariant can be tested, prefer an executable test/guardrail.

## Risk model

Route to `docs/RISK_MODEL.md`.

State any project-specific escalators here.

## Permission boundaries

Define separately:

- branch/repository writes;
- merge authority;
- production deployment;
- database writes;
- provider/security configuration;
- destructive operations;
- secrets/credentials.

Fail closed when permission is ambiguous.

## Verification contract

Map claims to evidence:

- code/static claim → lint/type/build;
- behavior claim → focused tests;
- UI claim → running browser/e2e/responsive proof;
- database claim → migration/integration/isolation tests;
- provider claim → provider read-back;
- production claim → safe production verification when authorized.

## Load-bearing traps

Keep only recurring project-specific traps that are not obvious from code and are expensive to rediscover.

- [trap]
- [trap]

## Completion

A task is complete only when acceptance, risk-selected evidence, review, exact-head checks, permission boundaries, and lifecycle updates all match the completion claim.
