# Failure → guardrail register

This is not a blame log. It is a reusable catalogue of failure patterns observed in agent-heavy software delivery and the earliest useful layer that should prevent recurrence.

The operating rule is:

> When a meaningful failure repeats, improve the environment before adding another paragraph to the prompt.

## Register

| Failure pattern | Why it happens | Earliest useful guardrail | Status in this repo |
|---|---|---|---|
| Project truth exists only in chat | sessions are ephemeral and agents reconstruct context differently | repository-backed `CURRENT_STATE`, `CURRENT_WORK`, task artifacts | encoded |
| Giant `AGENTS.md` becomes stale | every rule is loaded as hot context and no owner/layer is clear | short router + warm-context index + mechanical knowledge checks | encoded |
| Old issue/PR looks like current authority | open state is mistaken for product truth | explicit authority order; open work = candidate evidence | encoded |
| Active board remains stale after merge | lifecycle docs are treated as separate cleanup | reconcile current work/state in the same delivery lifecycle | encoded |
| Agent researches before reading repo | duplicates known work or adopts incompatible advice | repo-first research protocol | encoded |
| Research mixes facts and opinions | sources, inference and product judgment blur together | research note with authority/applicability/uncertainty fields | encoded |
| Tool/framework adopted because it is popular | novelty substitutes for an observed need | adoption gate: problem, cost, privacy, owner, rollback, removal condition | encoded |
| Agent invents requirements | ambiguous intent is silently converted into implementation choices | specification/non-goals + backward transition to `specified` | encoded |
| Same conceptual rule has multiple owners | fixes stack instead of replacing the actual authority | one-owner architecture + context router | encoded |
| UI/test is green but real flow is wrong | test exercises the wrong DOM/state/mode | claim→evidence matrix + running-flow proof | documented; app-specific implementation required |
| Demo/test evidence is presented as production truth | environment provenance is omitted | explicit mode/environment in evidence | encoded |
| Shared primitive change has hidden blast radius | local task framing hides global ownership | risk escalation + cross-surface evaluation | encoded |
| CSS/compatibility fixes stack forever | workaround is cheaper than finding presentation owner | replace-and-retire rule; fix owning layer | documented |
| Legacy layer remains after migration | “new path works” is confused with migration completion | retirement acceptance criterion + consistency audit | documented |
| CI from old SHA is treated as current | summaries mention green checks without rebinding head | exact-head contract + expected-head merge guard | encoded |
| Required workflow is path-skipped | provider waits forever for a check that never starts | stable required job identity; skip internal heavy steps, not whole required workflow | encoded in this repo CI |
| Green no-op scan is treated as security analysis | check name is confused with provider-required evidence | distinguish workflow status from real uploaded analysis | documented |
| Retry-pass hides flake | final green state overwrites first failure | retry classification rule; unexplained retry remains a finding | encoded |
| Implementer reviews only its own summary | confirmation bias and omitted diff context | evaluator reads spec + actual diff + counterexamples | encoded |
| “Independent review” is claimed without independence | second self-pass is mislabeled | evidence report must name reviewer/evaluator provenance | encoded |
| Multiple agents edit same owner concurrently | orchestration enthusiasm creates conflicts and semantic races | disjoint ownership/worktrees + integration owner | encoded |
| Branch/base moves under reviewed plan | plan/evidence no longer matches implementation | base/head revalidation; backward transition if material | encoded |
| Provider/repository access is treated as permission | technical capability is confused with authorization | explicit permission scopes | encoded |
| Production write is performed to “finish everything” | broad task language is interpreted as broad authority | provider/data-write scopes require explicit approval + rollback | encoded |
| Secret/private operational data enters memory | useful context is copied without trust classification | public-safety scan + memory trust boundary | encoded |
| A build is called complete verification | one cheap gate stands in for every layer | verification matrix | encoded |
| Screenshots are treated as self-proving | provenance/mode/commit omitted | evidence provenance contract | encoded |
| Design work begins from aesthetics alone | styling is optimized before problem/flow/ownership | problem → architecture → design direction → runtime proof sequence | documented |
| Candidate visual direction becomes authority | exploration artifacts are mistaken for selected product truth | explicit owner selection/accepted state before implementation | documented |
| Large speculative refactor accompanies feature | agent “cleans up” nearby areas while context is open | one task/one scope; separate refactors unless required | encoded |
| Documentation grows faster than executable guardrails | process is mistaken for safety | migrate repeated/load-bearing prose into scripts/tests/CI | encoded |
| Every task runs every expensive gate | safety policy ignores actual changed boundary | risk-proportional delivery | encoded |
| Tiny task gets a full bureaucracy packet | process overhead reduces throughput without reducing risk | packet decision test | encoded |
| High-risk task gets only a PR paragraph | consequence/rollback/permission is under-specified | full work packet for Class 3/cross-cutting/research-heavy work | encoded |
| Agent cannot tell where to start | repo has many useful docs but no deterministic route | cross-agent adapters → root `AGENTS.md` → context router | encoded |
| Different agent tools receive divergent rules | duplicated `CLAUDE.md`/`GEMINI.md`/Copilot instructions drift | thin adapters pointing to one canonical `AGENTS.md` | encoded |

## How to add a failure

Use `templates/FAILURE_RECORD.md` when a failure is material enough to preserve.

A new register entry should include:

1. observable signature;
2. impact/blast radius;
3. root cause or current hypothesis;
4. earliest detection/prevention layer;
5. guardrail implementation;
6. regression proof;
7. owner and removal condition where relevant.

Do not add generic warnings without an observed signature.

## Guardrail hierarchy

Prefer prevention at the earliest reliable layer:

1. type/schema/domain invariant;
2. unit/contract test;
3. repository policy script/lint;
4. browser/database/provider check;
5. CI orchestration;
6. documentation/prompt warning.

Documentation is valuable for judgment and navigation, but it is the weakest place to enforce a deterministic rule.

## Review cadence

Review this register when:

- the same failure family occurs again;
- a guardrail generates false positives;
- a policy becomes obsolete;
- a simpler structural solution makes a warning unnecessary.

The goal is fewer repeated failures and less process over time, not a permanently growing rulebook.
