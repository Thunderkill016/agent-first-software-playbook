# Agent execution map

This file is a map, not the project encyclopedia.

## Read order

For every change:

1. `README.md`
2. affected code and tests
3. `docs/CURRENT_STATE.md`
4. `docs/CURRENT_WORK.md`
5. `ARCHITECTURE.md` and `docs/PRODUCT.md`
6. `docs/RISK_MODEL.md`

Read deeper planning material only when the task requires it.

## Rules

- Work on one bounded task at a time.
- Prefer the smallest coherent change.
- Search existing code/tests before adding abstractions.
- Treat code and tests as stronger evidence than stale documentation.
- Never claim a gate passed if it did not run or did not finish.
- Do not broaden scope to fix unrelated defects.
- Do not commit secrets or private operational data.
- Use a branch and pull request for changes.
- Risk determines required evidence.
- Update current state/work only when truth actually changes.

## Completion

A change is complete only when:

- scope is satisfied;
- required evidence matches the risk;
- review findings are resolved or explicitly accepted;
- the PR head used for approval is the same head that passed required checks;
- current state/work is reconciled if the change altered project truth.
