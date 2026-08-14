# A to Z: Building an Agent-Ready Software Project

A vendor-neutral field guide for structuring repositories so coding agents can work effectively without relying on hidden chat history, personal memory, or one specific tool vendor.

The objective is not “more autonomous code generation.” The objective is **reliable delegated engineering**: agents can find truth, stay inside scope/permissions, produce evidence, hand work off, and improve the environment after failures.

---

## A — Authority

Define what outranks what before multiple documents drift into competing truth.

A useful default is executable code/schema/config + intentional tests → current-state snapshot → active task/owner decision → architecture/product → current-work board → open work → history.

Open PRs are proposals, not present truth.

## B — Boundaries

Separate boundaries that are often accidentally collapsed:

- product scope;
- architecture ownership;
- repository write access;
- merge authority;
- provider configuration;
- production data;
- destructive operations.

Technical capability is not authorization.

## C — Context

Context is scarce. Use progressive disclosure:

- hot context for every task;
- warm context selected by boundary;
- cold history only for provenance/conflict/regression archaeology.

A short map beats a giant always-loaded manual.

## D — Definition of Done

Define completion as evidence, not model confidence.

A task is done only when acceptance criteria, risk-selected verification, review, exact-head checks, required runtime/provider proof, and lifecycle reconciliation all match the claim.

## E — Evidence

Design evidence from the claim backward.

Build proves build. Database tests prove database contracts. Browser tests prove exercised flows. Provider read-back proves provider state. Production smoke proves only the affected production path that was actually exercised.

Do not promote evidence across layers.

## F — First Run

A fresh agent should be able to enter and answer:

1. what is the project;
2. what is true now;
3. what task is current;
4. what can I change;
5. what must not break;
6. how do I verify it;
7. what needs approval;
8. where does durable learning go.

If those answers require a previous chat, the repository is not agent-ready.

## G — Guardrails

Move deterministic rules to the earliest enforceable layer:

schema/type → domain test → policy/lint script → runtime/database/provider check → CI → prose.

Prompts guide judgment; they are a weak enforcement mechanism.

## H — Handoffs

A valid handoff contains state, scope, artifacts, evidence, unknowns, risk, permission, stop conditions and one next allowed action.

“Continue from here” is not a durable handoff.

## I — Invariants

Write the product/domain laws that must survive every feature.

Examples in a target project might include money units, tenant isolation, transfer neutrality, idempotency, destructive-action recovery, accessibility rules, or API compatibility.

Then encode deterministic invariants in code/schema/tests instead of repeating them forever in prompts.

## J — Jobs to Be Done

Give agents enough product context to optimize the right outcome:

- who is the user;
- what job are they trying to complete;
- what must feel fast/safe/understandable;
- what is explicitly not the product.

Without this, agents optimize locally for visible code changes.

## K — Knowledge Architecture

One fact, one owner.

Useful layers:

- `README` / product contract;
- `AGENTS` router;
- current truth;
- current work;
- architecture;
- engineering policies;
- active execution packet;
- bounded historical/provenance records.

Index depth; do not duplicate it.

## L — Lifecycle

Use evidence states rather than “70% complete”:

```text
discovery → specified → planned → implementing → evaluating
→ ready_for_review → merged → deployed → accepted
```

Allow backward transitions when evidence invalidates assumptions.

## M — Memory

Shared durable memory belongs in versioned, reviewable repository artifacts.

Personal preferences, local debugging notes and tool auto-memory should stay local unless deliberately promoted into project truth after review.

Do not dump raw chats into the repo.

## N — NOW / NEXT

Keep an owner-facing current-work source separate from general backlog.

At minimum distinguish:

- NOW;
- NEXT;
- BLOCKED;
- OWNER DECISION;
- HOLD;
- RECENTLY DONE.

Reconcile it in the same lifecycle as the change that alters status.

## O — Ownership

Every concept needs an authoritative implementation/documentation owner.

When fixing a bug, ask “which layer owns this behavior?” before adding an override. Repeated wrappers, compatibility CSS, duplicate helpers and multiple policy files are often ownership bugs.

## P — Planning

Plan proportional to uncertainty and consequence.

A tiny mechanical change may need only a clear PR body. A high-consequence or cross-cutting change needs explicit state, acceptance, file/owner map, permissions, research, rollout, rollback and evidence.

Plans are executable contracts, not essays.

## Q — Quality Evaluation

Evaluation is fresh reasoning against the task contract **and actual diff**.

Challenge counterexamples, wrong-mode tests, duplicated ownership, missing states, rollback gaps, permission overreach and stale lifecycle docs.

A self-review can be useful but must not be mislabeled as independent.

## R — Research

Read the repository first. Then research one unresolved question.

Prefer official docs, standards, primary source code/release notes and original research. Use a small source budget by default. Record version/date and what each source does not prove.

Separate fact, inference and project judgment.

## S — Scope

One task, one coherent scope.

Avoid drive-by cleanup and speculative abstractions. If an unrelated defect is found, record it rather than silently expanding the change.

Small changes are easier to review, verify, roll back and reason about.

## T — Testing

Test contracts and failure modes, not implementation trivia.

A strong test suite gives agents cheap local feedback and catches the specific class of error before human/product review. Tests should exercise the real owner when feasible, not a mock that can stay green while runtime breaks.

## U — User / Runtime Proof

For user-facing changes, make the running product legible to the agent:

- bootable isolated environment;
- browser/DOM access;
- synthetic fixtures;
- logs/metrics/traces where useful;
- responsive/accessibility surfaces;
- clear environment/mode identity.

Do not claim physical-device or production readiness without that evidence.

## V — Verification

Use a risk-selected verification matrix. High-risk boundaries get deep targeted checks; low-risk changes stay cheap.

Always report what ran, what passed, what failed, what was not applicable, and what remains unverified.

Retry success does not erase the first failure.

## W — Work Isolation

Use a focused branch/worktree/sandbox. Material tasks should be independently runnable and cleanable.

For parallel agents, require disjoint ownership or explicit interfaces. More agents do not automatically mean more throughput.

## X — eXact Head

Merge readiness belongs to the exact head/merge candidate that was reviewed and checked.

Re-read the current SHA before merge. If the head changed, old green evidence is historical.

Use expected-head merge guards when supported.

## Y — Your Human Decision Layer

Automate mechanics; preserve judgment where consequence or product direction requires it.

Examples:

- product trade-offs;
- irreversible/destructive operations;
- production/provider writes;
- security exceptions;
- risk acceptance;
- final product acceptance.

As guardrails improve, human attention should move upward, not disappear blindly.

## Z — Zero-Repeat Learning

When a failure recurs, ask:

1. what observable signature repeated;
2. why existing defenses missed it;
3. what earliest layer can prevent/detect it;
4. how to prove the guardrail catches the original failure;
5. whether old workaround/prose can now be removed.

The target is not an ever-growing rulebook. It is a system that needs **less** repeated instruction over time.

---

# The complete agent loop

```text
1. Read canonical instructions and current repository truth.
2. Identify outcome, boundary and current behavior.
3. Classify risk and permissions.
4. Route to only the necessary context.
5. Research unresolved external facts.
6. Specify acceptance and non-goals.
7. Plan files/owners/evidence/rollback.
8. Isolate work on branch/worktree.
9. Implement one bounded checkpoint at a time.
10. Run claim-matched local evidence.
11. Evaluate against spec + diff + counterexamples.
12. Open/update PR with failures and unknowns.
13. Resolve material findings.
14. Verify exact-head required checks.
15. Merge only with appropriate authority.
16. Verify deployment/provider/runtime when claimed.
17. Reconcile CURRENT_STATE / CURRENT_WORK.
18. Retire completed execution artifacts.
19. Convert repeat failure into guardrail.
20. Remove obsolete rules/workarounds when the guardrail makes them unnecessary.
```

# Maturity model

## Level 0 — prompt-dependent

Project truth lives in chat/people's heads. Agents guess setup, architecture and tests.

## Level 1 — documented

Repository has instructions and docs, but drift is mostly manual.

## Level 2 — routed

Authority/current truth/current work are separated and context is progressively loaded.

## Level 3 — verified

Knowledge, tests, security and CI mechanically enforce deterministic contracts.

## Level 4 — agent-first

Agents can reproduce, implement, inspect runtime/logs, review, repair CI and hand off from repository artifacts; humans focus on intent/risk/acceptance.

## Level 5 — self-improving environment

Repeated failure classes continuously become executable guardrails, stale knowledge is garbage-collected, and autonomy increases without hiding permissions or evidence.

Do not chase the level number. Add capability only when the target project's real bottleneck justifies it.
