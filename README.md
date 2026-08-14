# Agent-First Software Playbook

A **vendor-neutral reference repository for coding agents**: how to structure a software project so a capable agent can enter with little prior chat context, understand current truth, execute one bounded task, prove the result, hand it off, and leave durable project state behind.

The repository is designed to be useful to humans **and** to agents from different ecosystems without making any one vendor the project authority.

## Start here

### Coding agent

1. Read [`AGENTS.md`](AGENTS.md).
2. Run `npm run agent:doctor -- --json` when Node.js is available.
3. Follow the route in [`docs/context/README.md`](docs/context/README.md).
4. Work from current repository truth, not historical chat.

### Human adopting the pattern

1. Read [`docs/A_TO_Z_AGENT_FIRST_PROJECT.md`](docs/A_TO_Z_AGENT_FIRST_PROJECT.md).
2. Follow [`docs/PROJECT_BOOTSTRAP_CHECKLIST.md`](docs/PROJECT_BOOTSTRAP_CHECKLIST.md).
3. Copy and adapt [`templates/AGENTS.example.md`](templates/AGENTS.example.md).
4. Keep only the layers justified by the target project's actual risk and complexity.

## Universal design

The canonical shared instruction owner is **`AGENTS.md`**. Tool-specific files are thin discovery adapters only.

Supported patterns include:

- native `AGENTS.md` discovery where the agent supports it;
- `CLAUDE.md` importing the canonical file for Claude Code;
- `GEMINI.md` importing the canonical file for Gemini CLI;
- `.github/copilot-instructions.md` pointing to the canonical file for GitHub Copilot surfaces;
- `.aider.conf.yml` loading the canonical file read-only for Aider;
- manual `Read AGENTS.md first` fallback for any other repository-capable agent.

See [`docs/engineering/AGENT_INTEROPERABILITY.md`](docs/engineering/AGENT_INTEROPERABILITY.md) for the compatibility matrix and official sources.

## Core operating loop

```text
intent / bug / feedback
        ↓
CURRENT_WORK
        ↓
bounded task contract
        ↓
repo-first reconnaissance
        ↓
risk + permission classification
        ↓
focused research if unresolved
        ↓
plan proportional to uncertainty
        ↓
isolated branch/worktree
        ↓
implementation
        ↓
claim-matched evidence
        ↓
fresh evaluation
        ↓
exact-head PR checks
        ↓
merge when authorized
        ↓
runtime/provider proof if required
        ↓
CURRENT_STATE / CURRENT_WORK reconciliation
        ↓
repeat failure → executable guardrail
```

## What makes a repository agent-ready

A strong agent repository provides:

- a short deterministic entrypoint;
- one authority per question;
- hot/warm/cold context routing;
- current truth separated from backlog/history;
- explicit product/domain invariants;
- bounded task contracts and stop conditions;
- risk-proportional verification;
- explicit permission scopes;
- reproducible, isolated development environments;
- running-product/log/metric visibility where applicable;
- independent evaluation for material changes;
- exact-head CI and merge evidence;
- repository-backed handoffs and memory;
- security/supply-chain guardrails;
- a failure-to-guardrail feedback loop;
- continuous cleanup of stale knowledge and duplicated patterns.

## Machine-readable contract

[`agent-contract.json`](agent-contract.json) projects load-bearing repository policy into a simple data file. The scripts do not invent extra policy; they check the contract already documented in the repo.

Commands:

```bash
npm run agent:doctor -- --json
npm run check:knowledge
npm run check:public-safety
npm run verify
```

The GitHub workflow exposes one stable check identity: **`playbook-policy`**.

## Repository map

| File | Authority |
|---|---|
| [`AGENTS.md`](AGENTS.md) | universal agent entrypoint |
| [`agent-contract.json`](agent-contract.json) | machine-readable policy projection |
| [`docs/context/README.md`](docs/context/README.md) | progressive context router |
| [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) | present project truth |
| [`docs/CURRENT_WORK.md`](docs/CURRENT_WORK.md) | NOW / NEXT / BLOCKED / decisions / hold |
| [`docs/PRODUCT.md`](docs/PRODUCT.md) | product contract for this reference repo |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | knowledge/execution/evidence architecture |
| [`docs/RISK_MODEL.md`](docs/RISK_MODEL.md) | Class 0–3 risk policy |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md) | task-to-acceptance lifecycle |
| [`docs/engineering/AGENT_OPERATING_MODEL.md`](docs/engineering/AGENT_OPERATING_MODEL.md) | states, responsibilities, permissions, handoffs |
| [`docs/engineering/AGENT_INTEROPERABILITY.md`](docs/engineering/AGENT_INTEROPERABILITY.md) | cross-agent discovery/adapters |
| [`docs/engineering/ENVIRONMENT_CONTRACT.md`](docs/engineering/ENVIRONMENT_CONTRACT.md) | reproducible/isolation/observability expectations |
| [`docs/engineering/RESEARCH_PROTOCOL.md`](docs/engineering/RESEARCH_PROTOCOL.md) | repo-first external research |
| [`docs/engineering/VERIFICATION_MATRIX.md`](docs/engineering/VERIFICATION_MATRIX.md) | claim → evidence mapping |
| [`docs/engineering/SECURE_DEVELOPMENT.md`](docs/engineering/SECURE_DEVELOPMENT.md) | secure development/supply-chain baseline |
| [`docs/FAILURE_REGISTER.md`](docs/FAILURE_REGISTER.md) | generic failure → guardrail catalogue |
| [`docs/QUALITY_SCORE.md`](docs/QUALITY_SCORE.md) | skeptical agent-readiness scorecard |
| [`templates/`](templates/) | reusable task, packet, handoff, research, evaluation, failure templates |

## Principles

1. **Map, not encyclopedia.** Context is scarce.
2. **Repository before web.** Learn current truth before external advice.
3. **One task, one coherent scope.**
4. **One owner per concept.** Avoid stacked authority and workaround layers.
5. **Risk selects process.** A typo and a production migration are not the same task.
6. **Permissions are explicit.** Technical access is not authorization.
7. **Evidence matches claims.** Build, browser, database and provider checks prove different things.
8. **Exact head or it did not authorize merge.**
9. **Shared memory is reviewed and versioned. Personal memory stays personal.**
10. **Repeated failures become guardrails.** The process should get lighter as the environment gets stronger.

## Scope

This is a **reference implementation**, not a requirement to install a multi-agent framework or copy every file into every project. Start small and add layers only when a real failure mode, domain constraint, or operating risk justifies them.

## Security

This repository is public. Do not submit secrets, private logs, user data, internal provider identifiers, or personal/local agent memory. See [`SECURITY.md`](SECURITY.md) and [`docs/engineering/SECURE_DEVELOPMENT.md`](docs/engineering/SECURE_DEVELOPMENT.md).

## References

The design is grounded in current official guidance from agent-tool vendors plus established secure/software-delivery sources. See [`docs/REFERENCES.md`](docs/REFERENCES.md).

## License

MIT.
