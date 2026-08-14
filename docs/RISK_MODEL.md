# Risk-Proportional Delivery Model

Process weight should follow consequence and uncertainty, not how impressive a task sounds.

## Class 0 — Mechanical

Typical work:

- documentation;
- comments;
- spelling;
- non-executable metadata;
- deterministic generated-file refreshes.

Expected evidence:

- diff hygiene;
- documentation/link/knowledge checks where available.

Planning:

- inline task/PR description is normally enough.

## Class 1 — Bounded code

Typical work:

- isolated bug fix;
- one helper or subsystem;
- straightforward refactor with clear rollback;
- contained dependency-compatible change.

Expected evidence:

- focused tests;
- lint/type/build as applicable;
- exact-head CI.

Planning:

- short implementation plan.

## Class 2 — User flow / multi-component behavior

Typical work:

- user-facing UI behavior;
- multi-component interaction;
- responsive/accessibility work;
- workflow changes without high-consequence data semantics.

Expected evidence:

- Class 1 gates;
- browser/e2e proof;
- responsive/accessibility evidence when relevant;
- fresh functional review/evaluation.

Planning:

- bounded task packet for multi-flow or uncertain work.

## Class 3 — High consequence

Typical work:

- money/financial semantics;
- authentication/authorization;
- tenant isolation;
- schema migrations;
- destructive/recovery behavior;
- security controls;
- provider/production operations;
- infrastructure with meaningful blast radius.

Expected evidence:

- explicit plan and rollback/stop conditions;
- domain/boundary tests;
- database/provider/security checks as appropriate;
- independent review;
- exact-head CI;
- safe production/provider read-back when the completion claim requires it;
- explicit authority for irreversible/high-consequence writes.

Planning:

- full work packet.

## Cross-cutting escalators

Escalate planning/evidence even if the code diff is small when the work is:

- multi-day;
- multi-agent;
- cross-cutting architecture;
- hard to roll back;
- based on unresolved external research;
- modifying a shared primitive with large blast radius;
- changing production/provider state.

## Evidence vocabulary

Use explicit outcomes:

- `PASS`
- `FAIL`
- `BLOCKED`
- `NOT APPLICABLE`
- `INCONCLUSIVE`

Do not turn `INCONCLUSIVE` into `PASS` in prose.

## Core rule

A green build proves only that the build is green.

It does not prove browser behavior, financial correctness, database isolation, provider state, production configuration, or physical-device usability.
