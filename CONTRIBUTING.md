# Contributing

Contributions from humans and coding agents are welcome when they make agentic software delivery more **legible, safe, testable, interoperable, or efficient**.

## Before editing

1. Read `AGENTS.md`.
2. Run `npm run agent:doctor -- --json`.
3. Read current state/work and the relevant context route.
4. Keep the change bounded.

## What belongs here

Prefer:

- reusable cross-agent patterns;
- concrete failure signatures and executable guardrails;
- small reference tooling with no unnecessary dependencies;
- primary-source research with applicability limits;
- improvements that reduce future ceremony or ambiguity.

Avoid:

- vendor tribalism;
- personal preferences or machine-local memory;
- private/project-specific case studies presented as universal rules;
- giant prompt dumps;
- speculative management layers;
- adding agent frameworks without an observed orchestration problem;
- claims that one tool/model fits every project.

## Pull requests

Use the PR template. State:

- outcome and exact scope;
- risk and permission scope;
- commands/evidence and exact head;
- initial failures/retries;
- evaluator provenance;
- unverified claims;
- lifecycle/current-state impact.

Run:

```bash
npm run verify
```

Material changes should receive fresh evaluation. Changes to CI/security/permission policy should be treated as high-consequence even when the diff is small.

## Research

Prefer official documentation, standards, primary repositories/source code, and original research. Record what a source establishes and what it does not.

## Security

Never include credentials, private user data, raw production logs, internal provider identifiers, or personal/local agent memory. Follow `SECURITY.md`.
