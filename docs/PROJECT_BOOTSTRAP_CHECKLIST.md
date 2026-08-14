# Bootstrap checklist: turn a normal repo into an agent-ready repo

Do not copy this entire repository blindly. Apply the smallest set that solves the target project's real onboarding, correctness and safety problems.

## Phase 0 — observe before adding process

- [ ] Read current code/config/tests and existing contributor docs.
- [ ] Identify current setup/run/test/release commands.
- [ ] Identify product/domain invariants.
- [ ] Identify where current truth/work actually live.
- [ ] List recurring agent/new-developer failures.
- [ ] Identify provider/production/security boundaries.

## Phase 1 — canonical entrypoint

- [ ] Add a root `AGENTS.md` under roughly 100–180 lines.
- [ ] Make it a router: authority, first-run algorithm, commands, risk, permissions, verification, completion.
- [ ] Remove generic advice agents already know.
- [ ] Link to deeper owners instead of copying them.

## Phase 2 — current truth

Create/adapt:

- [ ] `README.md` — project overview;
- [ ] `docs/PRODUCT.md` — user/job/product laws;
- [ ] `ARCHITECTURE.md` — ownership/boundaries;
- [ ] `docs/CURRENT_STATE.md` — present truth;
- [ ] `docs/CURRENT_WORK.md` — NOW/NEXT/BLOCKED/DECISION/HOLD/DONE.

Do not use open issues as an implicit current-state database.

## Phase 3 — context routing

- [ ] Add a context router if the repo has enough docs to justify it.
- [ ] Separate hot/warm/cold context.
- [ ] Route by task boundary.
- [ ] Define one owner per question.
- [ ] Stop loading full PR/history archives by default.

## Phase 4 — agent interoperability

- [ ] Check current official docs for the agents actually used.
- [ ] Use `AGENTS.md` natively where supported.
- [ ] Add thin import/pointer adapters only where discovery requires it.
- [ ] Keep personal/local memory out of shared repo policy.
- [ ] Add a mechanical adapter check if the mapping is load-bearing.

## Phase 5 — environment contract

- [ ] deterministic setup;
- [ ] documented runtime/tool versions/lockfiles;
- [ ] one-command verify;
- [ ] isolated worktree/branch execution;
- [ ] safe synthetic fixtures;
- [ ] discoverable logs/browser/runtime evidence;
- [ ] cleanup/reset;
- [ ] no embedded secrets.

## Phase 6 — risk + permissions

- [ ] define change classes proportional to consequence;
- [ ] define when a full work packet is required;
- [ ] separate repo write, merge, provider write and production-data write permissions;
- [ ] define stop/escalation conditions;
- [ ] define rollback expectations.

## Phase 7 — task and handoff contracts

- [ ] bounded task template;
- [ ] high-consequence work packet;
- [ ] handoff template with state/artifacts/unknowns/next action;
- [ ] evaluation template that records independence provenance;
- [ ] research note for load-bearing external decisions.

## Phase 8 — verification

Build a claim→evidence matrix for the target stack.

- [ ] static/build;
- [ ] domain/unit/integration;
- [ ] database/ownership;
- [ ] browser/e2e;
- [ ] responsive/a11y;
- [ ] provider read-back;
- [ ] production smoke;
- [ ] exact-head merge checks.

Do not run irrelevant heavy gates only because they exist.

## Phase 9 — machine-readable guardrails

For deterministic repository rules, add the cheapest executable layer:

- [ ] policy/data manifest if useful;
- [ ] knowledge/link/structure checker;
- [ ] architecture/lint contract;
- [ ] CI classifier where risk-selected gates are complex;
- [ ] secret/public-safety guard;
- [ ] stable CI check identities.

The machine projection must mirror documented policy, not invent it.

## Phase 10 — CI/security

- [ ] least-privilege workflow permissions;
- [ ] immutable action pins where practical;
- [ ] dependency/secret/code scanning appropriate to stack/risk;
- [ ] protected merge rules where justified;
- [ ] untrusted PR isolation from secrets;
- [ ] release provenance only if artifacts are actually published.

## Phase 11 — failure learning

- [ ] create a failure→guardrail register only when recurring patterns exist;
- [ ] record observable signature, not vague warning;
- [ ] implement regression proof;
- [ ] prefer earliest structural guardrail;
- [ ] periodically remove stale rules/workarounds.

## Phase 12 — prove onboarding

Test with a fresh agent/session/worktree:

1. Can it identify the product/current state/current task?
2. Can it find the setup/run/verify commands?
3. Can it classify risk and permission boundaries?
4. Can it implement a small task without historical chat?
5. Can it prove the result in the correct runtime mode?
6. Can another agent/person continue from artifacts?
7. Can CI catch a deliberate contract violation?

Fix the repository if the agent struggles. Do not merely give that session more hidden context.

## Exit criterion

The project is agent-ready for its current maturity when a fresh capable agent can execute the normal delivery loop from repository artifacts, while high-consequence actions remain explicitly controlled and evidence stays truthful.
