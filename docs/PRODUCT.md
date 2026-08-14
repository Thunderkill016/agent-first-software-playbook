# Product contract for an agent-first project

Even an engineering playbook needs a product contract.

## User

A small software team or solo builder using AI coding agents as implementation partners.

## Core jobs

- decide what should be built;
- let agents execute bounded work;
- understand what is currently true;
- know what is blocked;
- verify changes before merging;
- continue work later without relying on chat memory.

## Product laws

- Humans own goals, trade-offs, and irreversible decisions.
- Agents may own implementation mechanics inside explicit boundaries.
- Repository state is durable; chat context is not.
- Evidence must be appropriate to the risk.
- Process should become lighter, not heavier, as guardrails improve.
