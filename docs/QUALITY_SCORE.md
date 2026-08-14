# Agent-readiness quality score

Use this score to evaluate whether a repository is actually legible and safe for coding agents. It is a diagnostic, not a vanity metric.

Score each dimension:

- **0 — absent/unsafe:** agent must guess or reconstruct it.
- **1 — documented:** a human-readable contract exists but drift is plausible.
- **2 — enforced/verified:** authority is clear and important deterministic parts are mechanically checked.

Maximum: **30**.

## Scorecard

| Dimension | 0 | 1 | 2 | This repo |
|---|---|---|---|---:|
| Entry point | no agent instructions | one instruction file | canonical router + thin cross-agent adapters | 2 |
| Authority | conflicting/stale sources | prose precedence | explicit owner per question + router checks | 2 |
| Current truth | chat/issues only | current-state doc | current state separated from history and checked as required artifact | 2 |
| Current work | scattered backlog | work board | NOW/NEXT/blocked/decision lifecycle contract | 2 |
| Context loading | read everything | manual links | hot/warm/cold progressive router | 2 |
| Product/domain invariants | implicit | documented | key deterministic invariants encoded in code/tests where applicable | 1 |
| Risk classification | same process for all | risk classes documented | machine-readable policy + selected gates | 2 |
| Permissions | repo access implies authority | boundaries documented | explicit scopes + approval/stop conditions | 1 |
| Task contracts | prompt only | reusable task template | state/acceptance/evidence/permission handoff contract | 2 |
| Research | ad hoc browsing | research guidance | repo-first protocol + structured research template | 2 |
| Verification | “tests passed” | claim/evidence docs | stable CI + exact-head contract + risk-specific checks | 2 |
| Independent evaluation | implementer self-check only | reviewer requested | fresh evaluator provenance required for material work | 1 |
| Failure learning | repeated warnings | failure log | failure→guardrail register + executable checks | 2 |
| Public/security hygiene | trust contributors | security doc | lightweight scanner + provider scanning recommendation | 2 |
| Lifecycle closure | merged work remains active | manual cleanup | current-state/current-work reconciliation is Definition of Done | 1 |

**Current self-score after the operating-system upgrade: 26/30.**

The missing four points are intentionally not faked:

- product/domain invariants become fully enforced only inside a concrete software product with real domain tests;
- provider/production permissions require platform-specific enforcement, not only repo docs;
- independent evaluation needs a genuinely separate reviewer/model/person;
- lifecycle closure can be further automated once the repo has enough history to justify it.

## Interpretation

| Score | Meaning |
|---|---|
| 0–9 | prompt-dependent; agents will reconstruct or guess project truth |
| 10–17 | usable with supervision; key knowledge is documented but drift-prone |
| 18–24 | agent-friendly; most work can proceed from repository artifacts |
| 25–28 | agent-first; autonomy is supported by routing, contracts and machine feedback |
| 29–30 | mature for its current scope; keep looking for simplification, not more ceremony |

A high score does not mean “safe to automate everything.” High-consequence permissions remain explicit.

## How to use this in another project

Do not copy the score of this documentation repo. Score the target project against its own actual implementation.

For every dimension below 2, ask:

1. Is the gap causing a real failure or slowing delivery?
2. Can the rule be made structurally true in code/schema/tests?
3. If not, can a small deterministic checker enforce it?
4. If judgment is required, which document/person owns that judgment?
5. What evidence would justify raising the score?

## Anti-gaming rule

Never award a 2 because a document *says* something is enforced. Inspect the executable mechanism.

Examples:

- a branch-protection paragraph is not branch protection;
- a “run tests” instruction is not a CI check;
- a security policy is not secret scanning;
- a handoff template is not evidence that handoffs are complete;
- a test name is not proof it exercises the intended runtime owner.

The score is useful only when it stays skeptical.
