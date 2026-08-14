# Lessons Distilled from MoneyFlow

This is a public-safe case study of engineering patterns learned while evolving MoneyFlow with coding agents. It intentionally omits private operational details, secrets, production identifiers, and internal incident evidence.

The value is not in copying MoneyFlow's exact files. The value is understanding **why the repository evolved the way it did**.

## 1. Chat is temporary; repository state must be durable

Early agent work can appear productive while critical decisions live only in conversation history.

That breaks as soon as:

- a new session starts;
- another agent takes over;
- an old issue is reopened;
- the owner cannot remember which claim was already verified.

The correction was to move current truth into versioned repository artifacts and make agents route through them.

**Reusable lesson:** anything another worker must know later should be discoverable from the repo.

## 2. A giant instruction file becomes a liability

As rules accumulate, the obvious reaction is to keep expanding `AGENTS.md`.

That eventually creates:

- duplicated rules;
- contradictory instructions;
- stale historical constraints;
- wasted context;
- agents reading irrelevant detail for every task.

The correction was to turn `AGENTS.md` into a procedural router: what to read, authority order, invariants, delivery rules, and load-bearing traps. Deeper information lives in routed documents.

**Reusable lesson:** optimize the repo for selective context retrieval, not maximum preloaded context.

## 3. Open issues and PRs are not the current roadmap

A long-running repository accumulates open work that may be:

- already implemented by another route;
- superseded;
- obsolete;
- blocked on owner/provider decisions;
- based on an old architecture.

Agents tend to interpret open state as permission to continue.

The correction was a single Current Work Board with `NOW / NEXT / BLOCKED / OWNER DECISION / TRIAGE / HOLD / RECENTLY DONE`.

**Reusable lesson:** backlog state and execution authority are different concepts.

## 4. Current code can outrank old plans

A detailed historical task can be very persuasive to a model even after the product moved on.

The correction was an explicit authority rule: current executable truth, tests, current project memory, and active execution state outrank old packets/issues.

**Reusable lesson:** historical detail should preserve provenance without silently reopening work.

## 5. UI code can be green while the product is obviously wrong

A recurring class of failure appeared when implementation and tests looked reasonable but runtime presentation was incorrect.

Examples of the general pattern:

- duplicate focus/outline ownership;
- responsive rules fighting base rules;
- multiple scroll owners;
- stale selectors validating the wrong DOM contract;
- screenshots proving appearance but not interaction;
- generic overrides masking the true component owner.

The correction was to require running-app evidence for UI work and to identify the presentation owner instead of stacking overrides.

**Reusable lesson:** UI verification must include the actual rendered/interactive system.

## 6. One concept needs one authoritative owner

Agents are good at localized repair. That can produce architecture where multiple layers each partially own the same state or style.

The long-term result is contradictory behavior and fragile fixes.

The correction was a replace-and-retire mindset:

- find the owner;
- fix the owner;
- migrate consumers;
- remove the obsolete layer;
- test ownership boundaries.

**Reusable lesson:** do not reward fixes that merely add one more override or source of truth.

## 7. Shared primitives have larger risk than their diff size suggests

A tiny edit to a dialog, input, token, transaction helper, or persistence adapter can alter many flows.

Counting changed lines is therefore a weak risk classifier.

The correction was risk classification by:

- blast radius;
- consequence;
- rollback difficulty;
- user/data/security boundary;
- uncertainty.

**Reusable lesson:** classify by impact, not by LOC.

## 8. Demo, authenticated, test, and production modes must not be mixed

Evidence becomes misleading when an agent validates one runtime mode and describes it as another.

The correction was to make runtime/data-store boundaries explicit and require mode-correct tests and claims.

**Reusable lesson:** evidence must identify which environment, identity, data source, and runtime mode it proves.

## 9. Retry-pass is a finding, not instant absolution

Automated suites sometimes fail and then pass on retry.

It is tempting for an agent to report only the final green result.

That hides:

- shared-state leaks;
- resource contention;
- race conditions;
- nondeterministic selectors;
- environment instability.

The correction was to classify initial failure honestly and investigate whether it changes confidence in the task.

**Reusable lesson:** a flaky test is information about the system.

## 10. Exact-head CI matters

A PR can be green and then receive another commit.

If an agent merges based on earlier checks, the evidence no longer corresponds to the merged code.

The correction was to reason about the exact current PR head and use head-SHA guards where available.

**Reusable lesson:** verification attaches to a commit, not to the abstract idea of a PR.

## 11. Risk-proportional gates are better than one giant pipeline

Running every expensive browser/database/provider check for every documentation change wastes time and encourages bypasses.

Running only lightweight static checks for high-consequence changes is unsafe.

The correction was path/boundary-aware gate selection.

**Reusable lesson:** trustworthy automation is selective but explicit.

## 12. Agent self-review is not enough for material work

The implementation agent already shares the assumptions that produced the change.

The correction was fresh independent evaluation that challenges user outcomes, scope, evidence, complexity, ownership, and hidden regressions.

**Reusable lesson:** separate generation from evaluation.

## 13. Product truth matters as much as engineering truth

Agents can optimize code toward capabilities the product should not become.

The correction was to encode product identity, core jobs, non-goals, and irreversible owner decisions in repository-local product documentation.

**Reusable lesson:** good architecture without product law can still produce the wrong product.

## 14. Planning documents need lifecycle hygiene

Active packets that remain active after merge confuse future agents.

The correction was an explicit lifecycle:

`active → implemented/reviewed → merged/accepted → archived/completed`.

**Reusable lesson:** stale process artifacts are a form of technical debt.

## 15. Release readiness is different from feature completion

A set of completed features does not automatically mean a product is safe for public use.

Release readiness needs a whole-product view:

- correctness;
- recovery;
- security/privacy;
- authentication/isolation;
- usability/accessibility;
- operational readiness;
- support burden;
- known limitations.

**Reusable lesson:** keep feature delivery gates separate from launch/go-no-go gates.

## 16. The repository should become smarter after every mistake

The largest productivity gain did not come from telling agents to “be more careful.”

It came from turning repeated lessons into:

- deterministic tests;
- architecture checks;
- CI classification;
- current-state rules;
- ownership constraints;
- templates;
- better routing.

**Reusable lesson:** agent failures are harness-design feedback.

## What not to copy blindly from MoneyFlow

A mature repository naturally accumulates more policy than a new project needs.

Do not start a new project by recreating every mature-process file.

Start with:

- a clear product contract;
- a short agent router;
- current state;
- current work;
- architecture;
- risk model;
- task/work-packet templates;
- basic CI.

Add a new guardrail or document only when a real failure mode justifies it.

The destination is not “become MoneyFlow.”

The destination is a repository that can explain itself and safely improve itself.
