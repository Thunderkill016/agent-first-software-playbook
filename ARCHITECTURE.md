# Architecture of an agent-ready repository

This repository demonstrates an **operating architecture**, not an application framework.

The central constraint is: each important question has one current owner, while agents receive only the context required for the boundary they are changing.

## Layers

```text
┌──────────────────────────────────────────────┐
│ Intent: PRODUCT + CURRENT_WORK               │
├──────────────────────────────────────────────┤
│ Hot routing: AGENTS + agent-contract         │
├──────────────────────────────────────────────┤
│ Warm knowledge: context router → domain docs │
├──────────────────────────────────────────────┤
│ Execution: task / packet / state / handoff   │
├──────────────────────────────────────────────┤
│ Evidence: tests / runtime / CI / provider    │
├──────────────────────────────────────────────┤
│ Guardrails: scripts / policy / security      │
├──────────────────────────────────────────────┤
│ Cold history: completed decisions/provenance │
└──────────────────────────────────────────────┘
```

## Ownership table

| Question | Owner |
|---|---|
| What is this product/project? | `README.md` + `docs/PRODUCT.md` |
| What is true now? | executable repo + `docs/CURRENT_STATE.md` |
| What happens next? | `docs/CURRENT_WORK.md` |
| How should an agent start? | `AGENTS.md` |
| What policy can tools parse? | `agent-contract.json` |
| What context is relevant? | `docs/context/README.md` |
| How does work move? | `docs/engineering/AGENT_OPERATING_MODEL.md` + `docs/WORKFLOW.md` |
| How much evidence is required? | `docs/RISK_MODEL.md` + verification matrix |
| What should never repeat? | `docs/FAILURE_REGISTER.md` + executable guardrail |

Do not create a second owner for the same fact. Add a link or a narrower scoped delta.

## Progressive disclosure

- **Hot:** always-read navigation, current truth, current work, active task.
- **Warm:** architecture, domain, security, testing, research, UI, provider guidance selected by boundary.
- **Cold:** old PRs, completed plans, superseded research, incident archaeology.

Cold history can explain *why* but does not reopen *what* by itself.

## Machine projection

Human-readable policy remains the source of judgment. Deterministic pieces are projected into `agent-contract.json` and checked by scripts/CI.

The projection must not invent policy unavailable in the docs. If prose and machine policy diverge, repair both in the same focused change.

## Adapter architecture

Vendor/tool adapters may solve discovery differences, but they do not own shared project policy.

```text
agent-specific discovery
        ↓
thin adapter (if needed)
        ↓
AGENTS.md
        ↓
context router
        ↓
affected authority + executable truth
```

## Isolation architecture

Material work should be isolatable by branch/worktree/sandbox. A project becomes much easier for agents when each task can independently:

- install/build/run;
- use unique ports/data namespaces;
- inspect logs/metrics/UI;
- execute tests;
- clean up without damaging another task.

See the environment contract.

## Dependency rule

Prefer boring, inspectable, well-supported dependencies unless a more complex tool solves a measured problem. Agent orchestration technology should never make the product architecture less understandable than the work it coordinates.
