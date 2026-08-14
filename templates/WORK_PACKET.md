# Work Packet

Use this for high-consequence, multi-day, multi-agent, cross-cutting, hard-to-rollback, provider/production, or research-heavy work.

## Outcome

One paragraph describing the finished user/system result.

## Current truth

What does the current repository/runtime actually do now?

Include exact baseline/ref when important.

## Scope

### In scope

- ...

### Out of scope

- ...

## Product/domain invariants

List only the laws that this work must preserve.

## Acceptance criteria

- **AC1:** ...
- **AC2:** ...

Each criterion should be observable or testable.

## Risk classification

Class: `0 / 1 / 2 / 3`

Why:

- consequence;
- blast radius;
- rollback difficulty;
- uncertainty.

## Permission scope

Repository writes:

Merge:

Production/provider/database/security writes:

Irreversible actions:

## Research questions

Only list unresolved facts that require external evidence.

For each answer record:

- source;
- conclusion;
- project applicability;
- remaining uncertainty.

## Implementation plan

1. ...
2. ...

Prefer small coherent slices.

## Verification plan

### Always-on/project safety

- ...

### Boundary-specific

- ...

### Runtime/user proof

- ...

### Independent evaluation

- ...

## Rollback

How is this reverted safely?

What production/provider state must be restored?

## Stop conditions

- ...

## Execution state

Current actor:

Branch:

Base:

Head:

Completed:

Remaining:

Blocked:

## Evidence log

Record concise outcomes and pointers, not full logs.

## Completion / archive

After acceptance:

- reconcile current state/work;
- close/archive this packet;
- convert repeated failure into a guardrail where appropriate.
