# Project Bootstrap Checklist

Use this to turn a normal repository into an agent-legible repository without copying unnecessary process.

## Phase 0 — Product truth

- [ ] Write one paragraph: who is the product for and what problem does it solve?
- [ ] Define 2–4 core user jobs.
- [ ] Define explicit non-goals.
- [ ] List the small set of domain/product invariants that must never be casually reinterpreted.
- [ ] Identify any irreversible owner decisions already made.

Output: `docs/PRODUCT.md`.

## Phase 1 — Current implementation truth

- [ ] Map major runtime entrypoints.
- [ ] Map data stores and external providers.
- [ ] Map authentication/authorization boundaries.
- [ ] Map deployment/runtime modes.
- [ ] Identify existing tests and CI.
- [ ] Record major current capabilities and named limitations.

Output: `ARCHITECTURE.md` + `docs/CURRENT_STATE.md`.

## Phase 2 — Agent entrypoint

- [ ] Create a short root `AGENTS.md`.
- [ ] Define authority order.
- [ ] Define first-run read order.
- [ ] Route deeper documents rather than copying them.
- [ ] Define permission boundaries.
- [ ] Define evidence/verification rules.
- [ ] Record only truly load-bearing project-specific traps.

Start from `templates/AGENTS.example.md`.

Test it by giving a fresh agent a simple read-only question about the repo. If it cannot locate the correct source of truth, the routing is not good enough.

## Phase 3 — Current work

- [ ] Create exactly one execution board.
- [ ] Separate `NOW` from backlog/history.
- [ ] Add `NEXT`, `BLOCKED`, `OWNER DECISION`, `TRIAGE`, `HOLD`, and compact `RECENTLY DONE` only if useful.
- [ ] Define what qualifies an item to move into `NOW`.
- [ ] Define how completed items leave `NOW`.

Output: `docs/CURRENT_WORK.md`.

## Phase 4 — Risk and permissions

- [ ] Define Class 0–3 (or equivalent) change categories.
- [ ] Define which categories require browser/database/security/provider evidence.
- [ ] Define which categories require a full plan/work packet.
- [ ] Separate merge permission from production/provider/database/destructive permission.
- [ ] Define fail-closed stop conditions.

Output: `docs/RISK_MODEL.md`.

## Phase 5 — Task contract

- [ ] Standardize Goal.
- [ ] Standardize Exact scope / non-scope.
- [ ] Standardize Acceptance criteria.
- [ ] Standardize Evidence.
- [ ] Standardize Permission scope.
- [ ] Standardize Stop conditions.
- [ ] Standardize Delivery.

Output: `templates/AGENT_TASK.md`.

For complex/high-risk work also adopt `templates/WORK_PACKET.md`.

## Phase 6 — Verification harness

Start from the failures you cannot afford.

- [ ] lint/static checks;
- [ ] type checks;
- [ ] unit/domain tests;
- [ ] build;
- [ ] migration checks;
- [ ] DB/isolation tests;
- [ ] browser/e2e tests;
- [ ] accessibility/responsive checks;
- [ ] security/secret scanning;
- [ ] architecture/ownership checks where repeated failures justify them.

Do not create every check on day one. Prioritize high-consequence and recurring failure modes.

## Phase 7 — Branch and PR policy

- [ ] Substantive work uses focused branches.
- [ ] PR descriptions explain what and why.
- [ ] Related tests travel with behavior changes.
- [ ] Required checks gate protected branches when available.
- [ ] Review is separate from authoring for material work.
- [ ] Exact current head is rechecked before merge.
- [ ] Prefer expected-head merge guards when supported.

## Phase 8 — Runtime evidence

For each product boundary ask what source code cannot prove.

- [ ] UI → run the app.
- [ ] responsive UI → measure target viewports.
- [ ] auth → exercise correct identity mode.
- [ ] DB → test isolation and persistence.
- [ ] provider config → read back provider state.
- [ ] production behavior → safe post-deploy smoke when required.

Never upgrade weak evidence into a stronger claim.

## Phase 9 — Independent evaluation

- [ ] Use a fresh reviewer/context for material work.
- [ ] Review design, functionality, complexity, tests, user impact, scope, ownership, and evidence.
- [ ] Distinguish material findings from subjective alternatives.
- [ ] Fix all material findings before clean completion.

## Phase 10 — Memory and lifecycle

- [ ] Update `CURRENT_STATE` only when present truth changes.
- [ ] Update `CURRENT_WORK` when execution state changes.
- [ ] Archive completed task packets.
- [ ] Close/supersede stale issues after evidence-based reconciliation.
- [ ] Keep historical evidence discoverable but cold.
- [ ] Never use hidden chat context as the only handoff.

## Phase 11 — Failure → guardrail loop

After a meaningful failure:

- [ ] identify why the wrong action was plausible;
- [ ] identify missing/misleading evidence;
- [ ] decide the narrowest authoritative place for the lesson;
- [ ] automate the rule if practical;
- [ ] remove obsolete owners/process layers when replaced.

The repository should become easier for the next agent after every failure.

## Phase 12 — Fresh-agent test

Give a fresh agent no prior project conversation and ask it to answer:

1. What does this product do?
2. What is true today?
3. What work is currently authorized?
4. What is blocked or held?
5. What are the critical invariants?
6. What tests apply to a UI/database/security/docs change?
7. What may the agent merge or modify?
8. Where should it record completion and durable lessons?

If it cannot answer these from repository-local artifacts, the repository is not yet agent-legible.

## Exit condition

Do **not** measure success by document count.

The project is ready when a fresh agent can take a small bounded task from intent through verified PR delivery without reconstructing basic project truth from the owner's memory.
