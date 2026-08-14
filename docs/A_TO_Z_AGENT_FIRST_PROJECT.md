# A to Z: Building a Complete Software Project with Coding Agents

> A repository-centered operating system for humans and AI coding agents.
>
> This guide distills lessons learned from building and repeatedly repairing a real production-minded application with coding agents. The examples are intentionally generalized so the method can be reused safely in public projects.

## The objective

The goal is not to make an agent write more code.

The goal is to create a repository where a capable coding agent can enter with little or no prior chat context and reliably answer:

1. What is this product?
2. What is actually true today?
3. What am I allowed to change?
4. What is the current task?
5. What must never break?
6. What evidence proves the task is done?
7. What requires human judgment or approval?
8. Where should durable lessons be recorded?

If the repository cannot answer those questions, the agent is being asked to reconstruct the project from chat history, stale issues, tribal knowledge, or guesswork. That does not scale.

The central design principle is:

**Humans steer. Agents execute. The repository remembers. Automated checks provide evidence. Pull requests carry change. Runtime behavior is the final proof.**

---

# A — Authority: decide what outranks what

Agentic projects fail when several documents all appear authoritative.

Create an explicit authority order. A practical default is:

1. current executable code and migrations;
2. automated tests that encode intentional behavior;
3. current-state/project-memory documents;
4. active task or work packet;
5. architecture and product laws;
6. current work board;
7. open issues and pull requests;
8. historical plans, old discussions, chat transcripts, screenshots.

This does **not** mean tests are always correct. It means an agent must not casually override current executable truth because an old issue says something different.

Write this rule in `AGENTS.md`.

### Why this matters

A recurring failure mode is an agent opening an old issue, assuming every unchecked box is unfinished, and reimplementing work that already shipped differently. Another is treating an unmerged PR as current architecture.

Open work is evidence. Merged/current runtime is truth.

---

# B — Boundaries: encode what the agent may and may not do

Do not rely on a model to infer permission from tone.

Separate these boundaries:

- repository writes;
- branch creation;
- pull request creation;
- merge permission;
- production deployment;
- database writes;
- provider configuration;
- authentication/security configuration;
- destructive operations;
- secret access.

A project can allow autonomous merges while still requiring explicit approval for production data or provider changes.

### Good boundary rule

> The agent may implement, test, review, and merge a pull request when all repository-required evidence is green and no human-decision boundary remains. Provider, production-data, credential, irreversible, or security-control changes require separately scoped authority.

### Fail closed

When permission is ambiguous, the agent should stop at the boundary rather than improvise.

---

# C — Current state: maintain a compact description of reality

Create `docs/CURRENT_STATE.md`.

It should answer:

- what users can do today;
- what architecture currently exists;
- what deployment/runtime modes exist;
- which major limitations remain;
- which guarantees are already implemented;
- what is explicitly not implemented.

It should **not** be a roadmap.

Update it only when project truth changes.

### Why not use README alone?

README is an entry point. Current state changes more frequently and often contains detail that should not dominate the public landing page.

### Why not use chat memory?

Agents may start in a new session. Repository-local versioned context survives.

---

# D — Definition of done: define proof before implementation

A task is not complete because code exists.

Completion should mean:

- acceptance criteria are satisfied;
- affected tests pass;
- required risk-selected checks pass on the exact head being merged;
- independent review has no unresolved material finding;
- runtime/browser/database/provider evidence exists when the claim requires it;
- current-state/work documents are reconciled when truth changes;
- no permission boundary was crossed implicitly.

A useful sentence to teach agents:

> A generated diff is not completion.

---

# E — Evidence: make claims proportional to proof

Every completion claim should have a matching evidence type.

| Claim | Evidence that can support it |
|---|---|
| TypeScript compiles | typecheck/build |
| business function works | focused unit/integration tests |
| migration is valid | migration checks + database tests |
| tenant isolation works | database/RLS integration test |
| page is usable | running browser/e2e evidence |
| responsive layout is correct | measured responsive/browser proof |
| production configuration is enabled | provider read-back |
| production flow works | safe production smoke |

A build does not prove browser behavior.

A browser screenshot does not prove financial correctness.

A repository diff does not prove a provider setting.

This distinction is one of the most important agentic engineering habits.

---

# F — First-run protocol: teach a new agent how to enter the repo

`AGENTS.md` should contain a deterministic first-run route.

Recommended sequence:

1. Read `README.md`.
2. Read the affected code and nearby tests.
3. Read `docs/CURRENT_STATE.md`.
4. Read `docs/CURRENT_WORK.md`.
5. Read `ARCHITECTURE.md` and `docs/PRODUCT.md` only as needed.
6. Read `docs/RISK_MODEL.md`.
7. Locate the active task/issue/packet.
8. Inspect git status, branch, base, and recent relevant history.
9. Reproduce or confirm the problem before editing when practical.
10. Classify the change risk.
11. Build a gate plan.
12. Only then implement.

The agent should not preload years of PR history.

Context is a budget. Spend it on the changed boundary.

---

# G — Guardrails: convert repeated failures into executable rules

When the same mistake happens twice, do not merely add another paragraph to `AGENTS.md`.

Ask:

> What executable guardrail would have caught this earlier?

Examples:

- repeated import-boundary violations → architecture check;
- stale migration identity → migration checker;
- CSS ownership conflicts → style ownership checker;
- agent reports old CI as green → exact-head status verifier;
- secret accidentally committed → secret-history scan;
- stale project state → knowledge/current-work consistency check;
- unscoped database access → tenant-isolation tests.

The best documentation tells the agent where the guardrail is.

The guardrail itself should enforce the invariant.

---

# H — Handoffs: never use hidden chat context as project state

A handoff must be inspectable by the next worker.

For non-trivial tasks record:

- goal;
- current state;
- exact branch/base/head;
- completed work;
- remaining work;
- blockers;
- permission scope;
- evidence already collected;
- failed/inconclusive attempts that matter.

Good handoff locations:

- active work packet;
- issue body/comment;
- PR description;
- current work board;
- project memory when truth changes.

Bad handoff:

> “The previous chat knows what to do.”

---

# I — Invariants: encode domain laws the agent must never casually reinterpret

Architecture describes structure. Invariants describe laws.

Examples:

- monetary values are integer minor units, never floating point;
- a transfer is balanced and never revenue/expense;
- user-owned rows require tenant isolation;
- destructive operations require recoverability;
- an unauthenticated demo store must never be described as authenticated truth;
- no financial value may be invented from missing data.

Keep the number of invariants small and load-bearing.

If an invariant can be automatically tested, test it.

---

# J — Jobs to be done: tell the agent why the product exists

Agents optimize locally unless the repo supplies product intent.

`docs/PRODUCT.md` should define:

- target user;
- core user jobs;
- product identity;
- non-goals;
- irreversible product decisions;
- important UX principles.

This prevents a technically valid change from moving the product in the wrong direction.

For example, a personal ledger should not silently become an investment dashboard merely because a model thinks charts look impressive.

---

# K — Knowledge architecture: separate hot, warm, and cold context

Do not build one giant project bible.

Use three temperatures of knowledge.

## Hot

Read almost every task:

- `README.md`;
- `AGENTS.md`;
- `CURRENT_STATE.md`;
- `CURRENT_WORK.md`.

## Warm

Read when relevant:

- architecture;
- product principles;
- risk model;
- subsystem guides;
- active work packet.

## Cold

Read only for provenance:

- completed plans;
- old PR memory;
- superseded research;
- historical incident records.

The key rule:

> `AGENTS.md` is a router, not an encyclopedia.

A huge instruction file consumes context, goes stale, and becomes internally contradictory.

---

# L — Lifecycle: give every substantive task a beginning and an end

A robust task lifecycle is:

1. reconnaissance;
2. focused research if facts are uncertain;
3. specification and acceptance criteria;
4. risk classification;
5. implementation plan;
6. small-task decomposition;
7. implementation;
8. independent evaluation;
9. exact-head verification;
10. merge;
11. affected runtime/production verification;
12. lifecycle and memory update;
13. archive/close.

Do not let completed tasks remain in `NOW`.

Do not leave old active packets pretending to own current execution.

---

# M — Memory: keep durable truth small

Project memory should record facts future agents would otherwise have to rediscover.

Good memory:

- current architecture;
- accepted product behavior;
- security boundaries;
- known operational limitations;
- recurring failure patterns;
- why an unusual constraint exists.

Bad memory:

- full CI logs;
- raw patches;
- secrets;
- every review comment;
- temporary debugging output;
- copied chat conversations.

A useful rule is:

> Record the conclusion and durable evidence pointer, not the entire investigation transcript.

---

# N — NOW/NEXT board: expose execution state in one place

Create `docs/CURRENT_WORK.md` with a small vocabulary:

- `NOW` — currently authorized work;
- `NEXT` — sequenced work not started;
- `BLOCKED` — cannot proceed until a condition changes;
- `OWNER DECISION` — evidence can be prepared, but a human decision is required;
- `TRIAGE` — unresolved historical/open work awaiting classification;
- `HOLD` — explicitly not authorized now;
- `RECENTLY DONE` — compact recent completion history.

This prevents open issues from automatically becoming current priorities.

It also prevents agents from inventing work because they see a tempting stale PR.

---

# O — Ownership: every layer needs one owner

A recurring engineering failure is multiple layers trying to own the same behavior.

Examples:

- two CSS layers both controlling the same spacing;
- server and browser state both claiming to own a balance;
- multiple documents each claiming to own roadmap priority;
- duplicated validation in UI and domain code with different semantics.

Use the rule:

> One concept, one authoritative owner; other layers may consume or present it.

When replacing an old owner, retire it. Do not indefinitely stack overrides.

This is especially important in agent-generated code because models often fix symptoms by adding another layer.

---

# P — Planning: scale planning with uncertainty, not file count

Not every change needs a plan document.

### Inline plan

Use for:

- docs;
- mechanical changes;
- small isolated fixes.

### Short task packet

Use for:

- bounded user-flow work;
- multi-component changes;
- work with meaningful acceptance criteria.

### Full work packet

Use for:

- security;
- financial/data semantics;
- schema migrations;
- provider/production operations;
- cross-cutting architecture;
- multi-day or multi-agent missions;
- uncertain rollback;
- unresolved external research.

A full work packet should contain:

- outcome;
- scope;
- non-goals;
- current truth;
- acceptance criteria;
- risk class;
- dependencies;
- permission scope;
- implementation plan;
- verification plan;
- rollback/stop conditions;
- evidence/handoff state.

The packet owns execution. It should not duplicate the entire handbook.

---

# Q — Quality review: separate authoring from evaluation

The same agent that wrote a change is biased toward its own assumptions.

For material work, add an independent evaluation step.

The evaluator should challenge:

- is the requested outcome actually achieved?
- did the implementation broaden scope?
- are there hidden regressions?
- are tests validating behavior or merely matching implementation details?
- is there a simpler design?
- were runtime modes confused?
- does the evidence support the claims?
- are old owners/layers still active?

Independent review can be a human, another agent, a fresh context, or a specialized evaluator.

The important part is **fresh reasoning**, not the brand of model.

Review should optimize for system health, not aesthetic perfection.

---

# R — Research: research only the uncertainty that matters

Agentic development can waste enormous time browsing before understanding the repo.

Use this order:

1. inspect current code/tests/config;
2. identify the exact unknown;
3. search primary/official sources;
4. compare external guidance with actual project behavior;
5. record the conclusion only if it changes durable project knowledge.

Research questions should be narrow:

Bad:

> Research best practices for authentication.

Better:

> Confirm whether the currently installed authentication provider supports leaked-password checks on the active plan and what runtime behavior changes when enabled.

Prefer primary sources for framework/API/security behavior.

Treat web pages as evidence, never as project authority.

---

# S — Scope: one task, one coherent change

Small changes are easier to reason about, review, test, merge, and roll back.

For every task ask:

- what exact outcome is required?
- what is explicitly out of scope?
- what unrelated defect might be discovered?
- if that defect appears, should we stop, report, or create a follow-up?

Do not fix unrelated problems opportunistically unless they are required for correctness of the current task.

Avoid combining:

- feature + refactor;
- redesign + architecture rewrite;
- dependency upgrade + behavior change;
- bug fix + broad cleanup.

The smaller the conceptual delta, the stronger the evidence.

---

# T — Tests: test contracts, not textual accidents

Tests are executable project knowledge.

Prefer assertions about:

- outputs;
- persisted state;
- invariants;
- user-observable behavior;
- boundary conditions;
- ownership contracts.

Avoid over-coupling tests to:

- exact JSX formatting;
- implementation-specific helper names;
- arbitrary CSS order;
- incidental copy unless copy is the contract;
- stale snapshots that hide semantic regressions.

A dangerous test is one that is green while measuring the wrong thing.

When a production bug escaped a test, do not merely add a regression test for the exact symptom. Ask why the previous test model failed.

---

# U — User/runtime proof: drive the actual product

For user-facing work, source review is insufficient.

At minimum verify the changed journey in a running application.

Examples:

- complete the form rather than only checking it renders;
- exercise success and failure states;
- test authenticated and demo modes separately when both exist;
- verify mobile/short-height behavior when overlays/forms are involved;
- measure scroll ownership and overflow instead of guessing from CSS;
- inspect light/dark themes when both are supported;
- confirm recovery paths for destructive actions.

Never label simulator/browser evidence as physical-device evidence.

Never label demo/local data as production truth.

Mode-correct evidence matters.

---

# V — Verification: select gates from the changed boundary

Do not run a random bag of commands and call it verification.

Build a risk-selected gate plan.

A generic mapping:

| Change | Gates |
|---|---|
| docs | link/knowledge/diff checks |
| isolated code | lint + type + unit + build |
| domain behavior | focused domain tests + full verify |
| UI | full verify + browser/e2e + responsive/accessibility proof |
| database | migrations + DB integration + isolation |
| auth/security | targeted security tests + provider/runtime proof |
| CI/policy | policy tests + intentionally selected representative jobs |
| production config | safe read-back + smoke + rollback readiness |

Track outcomes honestly:

- PASS;
- FAIL;
- BLOCKED;
- NOT APPLICABLE;
- INCONCLUSIVE.

A retry that passes after a failure is not automatically a clean pass. Investigate whether the first failure revealed flakiness, shared-state pollution, resource contention, or a real race.

---

# W — Work branches and pull requests: make change history useful

Never make substantive changes directly on the protected default branch.

Use one focused branch per task.

A good PR description should explain:

- what changed;
- why;
- exact scope;
- what did not change;
- risk classification;
- evidence run;
- known limitations;
- review findings and fixes;
- exact head SHA when high confidence matters.

The PR becomes durable historical context.

Do not write descriptions like “fix bug” or “phase 1”.

Future agents need enough context to understand why the change exists.

---

# X — Exact-head correctness: green CI must belong to what you merge

This deserves its own rule.

Before merging, verify:

1. the PR head has not moved since review;
2. required checks completed on the current head;
3. the base has not changed in a way that invalidates evidence;
4. unresolved material review threads are zero;
5. no gate is being interpreted as green from an older commit;
6. no relevant test was skipped unexpectedly.

When available, merge with an expected-head SHA guard so the platform rejects the operation if the PR changed after verification.

Never say:

> CI was green earlier, so this head is probably safe.

---

# Y — Yield control intelligently: know when the human must decide

Agents should autonomously execute mechanics but should surface decisions with irreversible product or operational consequences.

Examples of human-decision boundaries:

- public launch/go-no-go;
- accepting a known security limitation;
- changing product identity;
- destructive production data changes;
- enabling a provider feature with cost/compliance impact;
- choosing between competing strategic directions;
- accepting material UX trade-offs not resolved by requirements.

The agent should present:

- the decision;
- options;
- evidence;
- risks;
- recommendation if useful;
- what becomes unblocked after the decision.

Do not hide a product decision inside an implementation PR.

---

# Z — Zero-repeat learning: the repository should get smarter after every failure

The strongest agentic repository compounds knowledge.

After a meaningful failure, ask four questions:

1. **Why did the agent believe the wrong thing?**
2. **What evidence was missing or misleading?**
3. **Where should the correct rule live?**
4. **Can the rule be made executable?**

Possible outputs:

- one test;
- one architecture guard;
- one CI classifier rule;
- one short `AGENTS.md` trap;
- one current-state correction;
- one reusable script;
- one retired obsolete layer.

The worst response to repeated failure is endlessly expanding prompts.

The best response is improving the environment until the mistake becomes hard to make.

---

# The complete operating loop

A mature agent-first repository should support this loop end to end:

```text
Human intent / user feedback
        ↓
CURRENT_WORK
        ↓
Bounded task contract
        ↓
Agent first-run route
        ↓
Reconnaissance in current code/tests
        ↓
Focused external research if needed
        ↓
Risk classification + gate plan
        ↓
Plan proportional to uncertainty
        ↓
Focused branch
        ↓
Implementation
        ↓
Local risk-selected verification
        ↓
Running-product evidence when relevant
        ↓
Independent evaluation
        ↓
Fix material findings
        ↓
Pull request
        ↓
Exact-head CI / security / provider evidence
        ↓
Merge if authorized and safe
        ↓
Production/provider verification when required
        ↓
CURRENT_STATE + CURRENT_WORK reconciliation
        ↓
Failure → guardrail learning
```

---

# Minimum repository contract

A project starting today can begin with only this:

```text
README.md
AGENTS.md
ARCHITECTURE.md

/docs
  PRODUCT.md
  CURRENT_STATE.md
  CURRENT_WORK.md
  RISK_MODEL.md
  WORKFLOW.md

/templates
  AGENT_TASK.md
  WORK_PACKET.md
```

Add more only when a real recurring need appears.

Do not create:

- multiple roadmap sources;
- multiple architecture authorities;
- giant prompt libraries;
- a separate memory file for every conversation;
- permanent documents for transient debugging;
- process layers that no tool or person consumes.

---

# Recommended `AGENTS.md` algorithm

A coding agent entering the repo should be able to follow an algorithm similar to this:

```text
1. Identify the requested task and changed boundary.
2. Read README + affected code/tests.
3. Read CURRENT_STATE and CURRENT_WORK.
4. Resolve conflicts using repository authority order.
5. Determine whether the task is actually current/authorized.
6. Classify risk.
7. Identify required permissions and stop conditions.
8. Reproduce/confirm the current behavior.
9. Research only unresolved external facts.
10. Create the smallest coherent plan.
11. Implement on a focused branch.
12. Run risk-selected checks.
13. Run product/runtime proof when the claim requires it.
14. Perform independent evaluation for material changes.
15. Fix all real findings; do not hide flaky or inconclusive evidence.
16. Open/update the PR with exact scope and evidence.
17. Verify required checks against the exact current head.
18. Merge only when authorized and all safety conditions are satisfied.
19. Verify affected production/provider behavior when required.
20. Reconcile current state/work and archive completed execution records.
21. Convert any repeated failure into a guardrail.
```

---

# What agents should never do

Even a highly autonomous repository should forbid these defaults:

- invent requirements;
- treat old issues as current truth without reconciliation;
- merge because a PR is merely `mergeable`;
- report unrun tests as passed;
- call a retry-pass a clean pass without investigation;
- silently broaden scope;
- add another ownership layer instead of repairing the owner;
- publish secrets or operational identifiers;
- confuse local/demo/browser evidence with production evidence;
- perform irreversible provider/data/security writes without authority;
- preserve stale active plans after work is done;
- depend on private chat context for the next worker.

---

# Practical lessons from real agent-heavy development

## 1. The first bottleneck is usually not model intelligence

It is repository legibility.

A capable model performs poorly when:

- commands are undocumented;
- tests need hidden setup;
- architecture is implicit;
- runtime modes are confusing;
- current tasks are scattered;
- CI failures are hard to reproduce;
- permissions are ambiguous.

Improve the environment before endlessly rewriting prompts.

## 2. More documentation can make agents worse

Documentation improves performance until it becomes redundant, contradictory, or stale.

A small routing document plus precise subsystem docs is usually stronger than a giant handbook loaded every turn.

## 3. UI work exposes false confidence quickly

An agent can produce code that is syntactically clean while the actual experience is visibly wrong.

For UI work insist on running-app proof, responsive evidence, and fresh evaluation.

## 4. Shared primitives have hidden blast radius

A change to a shared dialog, input, typography token, storage adapter, or domain helper can affect many surfaces.

Classify by blast radius, not by lines changed.

## 5. Replace-and-retire beats override-and-accumulate

Agents often solve presentation and architecture problems by adding one more override.

Require ownership clarity and removal of obsolete paths when replacement is intentional.

## 6. Current work needs a single owner

Issue trackers are excellent evidence stores, but an old open issue should not automatically become the next task.

Use a current-work board to separate current execution from backlog/history.

## 7. Risk-proportional delivery keeps autonomy practical

If every typo requires full end-to-end verification, people will bypass the process.

If every database/security change receives the same lightweight treatment as a typo, autonomy becomes unsafe.

Match ceremony to consequence.

## 8. Machine evidence should replace repeated human reminders

Every time a human says “remember to check X”, ask whether X can become a deterministic check.

This is how an agent-first repository compounds capability.

---

# Suggested maturity levels

## Level 0 — Chat-driven

- prompts contain most context;
- no durable current state;
- manual testing;
- agent frequently asks what to do next.

## Level 1 — Repository-guided

- `AGENTS.md` exists;
- architecture and product docs exist;
- branches/PRs are standard;
- basic CI exists.

## Level 2 — Evidence-driven

- risk model;
- current-work board;
- exact-head checks;
- browser/database/security-specific gates;
- independent review.

## Level 3 — Self-improving

- recurring failures become automated guards;
- stale knowledge is detected;
- agents can reproduce, implement, verify, review, and update lifecycle state;
- humans mostly steer priorities and high-consequence decisions.

## Level 4 — High-autonomy

- agent can safely drive bounded features end to end;
- merge/deploy permissions are encoded by boundary;
- rollback and runtime verification are systematic;
- human attention is concentrated on product judgment and exceptional risk.

Do not jump directly to Level 4. Earn autonomy by building evidence and guardrails.

---

# Final rule

A good agent-first project is not a project with the most AI.

It is a project where a new agent can enter, understand reality, make one correct bounded change, prove it, hand it off, and leave the repository clearer and safer than it found it.
