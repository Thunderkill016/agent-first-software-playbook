# Risk-proportional delivery

Risk selects process. File count does not.

Classify using consequence, blast radius, rollback difficulty, uncertainty, and permission boundary.

## Class 0 — docs / mechanical

Examples:

- prose, links, templates;
- non-executable metadata;
- formatting with no shipped behavior.

Expected evidence:

- knowledge/structure contract;
- public-safety contract;
- diff hygiene;
- any provider-required repository check.

Planning: inline plan or clear PR body unless the docs redefine architecture/security/product policy.

## Class 1 — bounded executable change

Examples:

- localized bug fix/helper;
- one subsystem with straightforward rollback;
- test/tool script change with limited consequence.

Expected evidence:

- Class 0 contracts;
- affected tests;
- lint/type/static/build checks as applicable;
- runtime smoke when shipped behavior changes.

Planning: concise bounded plan.

## Class 2 — user flow / UI / multi-component behavior

Examples:

- forms/navigation;
- shared component behavior;
- responsive/accessibility/layout change;
- multi-component user state.

Expected evidence:

- Class 1;
- running-flow/browser proof;
- responsive/a11y/mode/long-data/error-state evidence where relevant;
- fresh evaluation of actual runtime.

Planning: concise plan for bounded surface; full packet for cross-flow redesign or unresolved product research.

## Class 3 — high consequence

Examples:

- security/auth/authorization;
- schema/data ownership/migrations;
- financial or other high-consequence domain semantics;
- destructive behavior;
- provider/production writes;
- secrets/deployment;
- CI policy, required-check behavior, security scanning;
- broad architecture or hard-to-rollback compatibility changes.

Expected evidence:

- explicit work packet;
- rollback/migration plan;
- boundary-specific tests;
- security/secret controls as applicable;
- fresh independent evaluation where available/required;
- exact-head verification;
- provider/production read-back when the claim crosses that boundary;
- explicit approval for permission scopes that require it.

## Packet decision test

Use a full work packet when any answer is yes:

- Does it alter security, auth, schema/data ownership, financial/high-consequence semantics, CI policy, provider state or production data?
- Does it cross multiple architectural owners?
- Is rollback non-obvious?
- Does it depend on unresolved external research?
- Will it span multiple agents/days/handoffs?
- Does it require an irreversible or explicitly approved permission?

Otherwise keep the plan small.

## Risk escalation

Escalate when implementation reveals larger blast radius, shared ownership, unknown data shape, hidden permission, or rollback uncertainty. Do not preserve a lower class merely because work already started.

## Risk de-escalation

A high-risk area can still have a low-risk change when the changed boundary is genuinely mechanical and executable truth is untouched. Explain why the high-consequence boundary is not actually crossed.

## Rule

Run the **smallest useful evidence set that can prove the claims**, plus stable provider/repository checks that are required regardless of application risk.
