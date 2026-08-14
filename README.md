# Agent-First Software Playbook

A practical, repository-centered operating system for building complete software projects with AI coding agents.

The objective is simple:

> A capable coding agent should be able to open the repository with little or no prior chat context, understand the product and current state, take one bounded task, implement it, prove it, hand it off, and leave the repository safer and clearer than it found it.

This playbook is tool-agnostic. It can be adapted to Codex, Claude, Copilot, Gemini, or other coding agents.

## Start here

**If you are a human:** read [`docs/A_TO_Z_AGENT_FIRST_PROJECT.md`](docs/A_TO_Z_AGENT_FIRST_PROJECT.md).

**If you are a coding agent:** read [`AGENTS.md`](AGENTS.md) and follow its first-run algorithm.

**If you want the real-project lessons behind the method:** read [`docs/MONEYFLOW_LESSONS.md`](docs/MONEYFLOW_LESSONS.md).

## Core model

**Humans steer. Agents execute. The repository remembers. Automated checks provide evidence. Pull requests carry change. Runtime behavior is the final proof.**

```text
human intent / user feedback
        ↓
CURRENT_WORK
        ↓
bounded task contract
        ↓
agent reads current repo truth
        ↓
risk + permission classification
        ↓
focused research if needed
        ↓
plan proportional to uncertainty
        ↓
focused branch
        ↓
implementation
        ↓
risk-selected verification
        ↓
running-product proof when relevant
        ↓
independent evaluation
        ↓
exact-head PR checks
        ↓
merge when authorized and safe
        ↓
production/provider verification when required
        ↓
CURRENT_STATE / CURRENT_WORK reconciliation
        ↓
failure → guardrail learning
```

## What this repository teaches

The A→Z guide covers:

- authority order;
- permission boundaries;
- current-state memory;
- definition of done;
- evidence design;
- first-run agent protocol;
- executable guardrails;
- durable handoffs;
- product/domain invariants;
- jobs-to-be-done context;
- hot/warm/cold knowledge architecture;
- task lifecycle;
- project memory;
- NOW/NEXT work boards;
- single-owner architecture;
- proportional planning;
- independent review;
- focused research;
- scope control;
- contract-focused tests;
- real user/runtime proof;
- risk-selected verification;
- branches and pull requests;
- exact-head CI;
- human decision boundaries;
- zero-repeat learning from failures.

## Minimal repository structure

A new project does not need a giant process stack.

Start with:

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

Add more only when a real recurring failure or domain need justifies it.

## Why this exists

Agent-heavy projects tend to fail in predictable ways:

- project truth exists only in chat;
- `AGENTS.md` grows into a stale encyclopedia;
- old issues look like current authority;
- agents stack fixes instead of repairing the real owner;
- tests are green while the running UI is wrong;
- demo/test/production evidence gets mixed together;
- CI from an old commit is treated as approval for a new one;
- retries hide flaky systems;
- high-risk work gets the same process as a typo;
- failures lead to longer prompts instead of better guardrails.

This repository turns those lessons into a reusable system.

## Repository map

| File | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | deterministic agent entrypoint and authority route |
| [`docs/A_TO_Z_AGENT_FIRST_PROJECT.md`](docs/A_TO_Z_AGENT_FIRST_PROJECT.md) | complete A→Z playbook |
| [`docs/MONEYFLOW_LESSONS.md`](docs/MONEYFLOW_LESSONS.md) | public-safe lessons distilled from a real agent-heavy project |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | architecture of the operating model |
| [`docs/PRODUCT.md`](docs/PRODUCT.md) | product contract for the playbook |
| [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) | present truth, not roadmap |
| [`docs/CURRENT_WORK.md`](docs/CURRENT_WORK.md) | NOW / NEXT / BLOCKED / OWNER DECISION / HOLD |
| [`docs/RISK_MODEL.md`](docs/RISK_MODEL.md) | Class 0→3 risk-proportional delivery |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md) | task-to-merge-to-memory execution loop |
| [`templates/AGENT_TASK.md`](templates/AGENT_TASK.md) | bounded task contract |
| [`templates/WORK_PACKET.md`](templates/WORK_PACKET.md) | full packet for high-consequence/complex work |
| [`docs/REFERENCES.md`](docs/REFERENCES.md) | primary public engineering references |

## Principles

1. Give agents a map, not an encyclopedia.
2. One task, one coherent scope.
3. Current executable truth outranks stale prose.
4. Risk determines process weight.
5. Machine evidence outranks self-confidence.
6. Open work is not authority until reconciled.
7. Separate implementation authority from irreversible operational authority.
8. Repeated failures should become executable guardrails.
9. Do not create documentation that has no clear owner or consumer.
10. Completion means the claim and the evidence match.

## External engineering references

The playbook is original synthesis informed by public guidance from OpenAI, Google Engineering Practices, and GitHub. See [`docs/REFERENCES.md`](docs/REFERENCES.md).

## Security and public examples

This repository is public. Do not contribute credentials, private user data, sensitive provider identifiers, production logs, or private repository material. Use synthetic examples for sensitive workflows. See [`SECURITY.md`](SECURITY.md).

## Contributing

Contributions should make agentic software delivery more legible, safe, testable, or efficient. Prefer concrete failure modes and executable guardrails over giant prompt libraries. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT.
