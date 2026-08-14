# Agent operating model

**Status:** active engineering contract

This document defines how coding agents move work through a repository. It is an execution contract, not a runtime agent framework and not a reason to install orchestration software.

The useful idea is simple: deterministic project flow should remain separate from optional agent specialization.

## State machine

Every non-trivial task has one current evidence state:

```text
discovery
  ↓
specified
  ↓
planned
  ↓
implementing
  ↓
evaluating
  ↓
ready_for_review
  ↓
merged
  ↓
deployed
  ↓
accepted
```

A state describes **what evidence exists and what action is allowed next**. It is not a percentage-complete estimate.

| State | Minimum evidence | Next transition |
|---|---|---|
| `discovery` | repository reconnaissance, reproduced/current behavior, unresolved questions | `specified` when uncertainty is bounded |
| `specified` | outcome, acceptance criteria, invariants, non-goals | `planned` after architecture/risk fit is known |
| `planned` | files/owners, tasks, verification, permissions, rollout/rollback | `implementing` when scope is reviewable |
| `implementing` | focused branch/worktree, task-level changes | `evaluating` when implementation claims are complete |
| `evaluating` | fresh evaluation, counterexamples, required evidence | `ready_for_review` when material findings are resolved |
| `ready_for_review` | PR, exact-head checks, known risks, remaining approval boundaries | `merged` only when merge authority is satisfied |
| `merged` | merge commit identified | `deployed` when that exact change is live, if deployment applies |
| `deployed` | exact deployment/runtime verification | `accepted` after product/owner acceptance where required |
| `accepted` | durable current truth reconciled | terminal |

## Backward transitions are allowed

Evidence can invalidate earlier assumptions. Moving backward is correctness, not failure.

Examples:

- `implementing → specified`: code reality disproves the requirement.
- `evaluating → implementing`: evaluation finds a bounded defect.
- `ready_for_review → planned`: base/architecture changed materially.
- `deployed → implementing`: production verification finds a regression.

Record the reason. Never silently relabel state to preserve an appearance of progress.

## Responsibilities, not personas

One agent may perform multiple roles sequentially, but the evidence from each responsibility stays distinct.

| Responsibility | Owns | Required artifact |
|---|---|---|
| Human/product owner | intent, trade-offs, irreversible decisions, acceptance | explicit decision when needed |
| Researcher | repo-first reconnaissance and external evidence | sources, applicability, uncertainty |
| Planner | specification, architecture fit, task graph, verification design | task contract/work packet |
| Implementer | bounded change | diff + implementation evidence |
| Evaluator | challenge spec/diff/evidence | findings + acceptance matrix |
| CI/runtime/provider | repeatable mechanical truth for its layer | checks/logs/artifacts/read-back |

An evaluator must inspect the specification and actual change. Reading only the implementer's summary is not evaluation.

## Permission scopes

Repository access is not equivalent to permission to perform every action.

| Scope | Allowed | Explicitly not implied |
|---|---|---|
| `read_only` | inspect repo, issues, PRs, logs, public/provider metadata | writes |
| `branch_write` | one focused branch/PR and related review updates | main push, force-push, unrelated branches, provider writes |
| `provider_read` | inspect deployment/auth/database/provider state | provider/config/data mutation |
| `provider_write_approved` | one explicit reversible provider action | broad configuration changes or secret disclosure |
| `production_data_write_approved` | one narrowly approved data/migration operation with rollback | ad-hoc mutation of real user data |

Projects may define additional scopes, but they should stay explicit and least-privilege.

A prompt such as “finish everything” does not automatically grant an irreversible permission.

## Handoff contract

A handoff is valid only when another agent/person can continue without reconstructing hidden chat context.

Use `templates/HANDOFF.md`. At minimum record:

- from/to responsibility;
- current state;
- exact scope and forbidden scope;
- branch/base/PR or other artifacts;
- verified facts and evidence;
- unverified claims;
- risks and stop conditions;
- next allowed action.

“Continue from here” is not a handoff.

## Stop/interrupt conditions

Stop implementation and return to the correct earlier state when:

- requirements conflict with current source of truth;
- repository reconnaissance contradicts the task contract;
- the change crosses an unapproved permission or architecture boundary;
- a load-bearing invariant cannot be proven;
- a tool needs broader access than the task justifies;
- tests are green but do not exercise the real owner/runtime path;
- rollback is required but undefined;
- branch/base/head no longer matches reviewed evidence;
- external research is stale, secondary-only, or materially conflicting.

## Parallel work

Parallel agents are useful only when work is actually separable.

Safe parallelism requires:

- disjoint ownership areas or explicit interfaces;
- no ambiguous shared mutable state;
- separate branches/worktrees;
- task contracts that define dependencies and merge order;
- one integration owner for shared contracts.

Do not create a “swarm” merely because multiple agents are available. Coordination overhead is a real cost.

## Repository-backed memory

Durable memory belongs in versioned, reviewable artifacts:

- permanent rules → `AGENTS.md`, product law, architecture, engineering policy;
- current truth → `CURRENT_STATE.md`;
- current execution → `CURRENT_WORK.md` and task/work packet;
- decisions/research → bounded records when needed;
- implementation → branch/PR;
- evidence → tests, CI, screenshots, deployment/read-back;
- recurring learning → `FAILURE_REGISTER.md` plus executable guardrail.

Do not build hidden conversational memory as a substitute for repository legibility.

## Tool/adoption gate

Before adding an agent framework, service, dependency, provider, background system, or architecture pattern, record:

1. the observed problem;
2. why current tools/simpler options are insufficient;
3. license/reuse constraints;
4. secret/privacy/user-data exposure;
5. runtime/deployment/cost impact;
6. ownership and maintenance responsibility;
7. verification/migration/rollback;
8. removal condition if benefit does not appear.

Popularity, benchmark rank, or “AI-native” branding is not enough.

## Success criteria

This operating model succeeds when it produces:

- fewer scope changes after implementation starts;
- smaller, clearer diffs;
- handoffs based on artifacts instead of memory reconstruction;
- fewer accidental permission crossings;
- evidence failures found before merge;
- repeated failures converted into checks or structural constraints;
- more autonomy without losing auditability.

More agents, more prompts, and more documents are not success metrics.
