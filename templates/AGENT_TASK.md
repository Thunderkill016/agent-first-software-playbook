# Agent Task

## Goal

What exact outcome must exist when this task is complete?

## Exact scope

What files, components, flows, or boundaries may change?

Explicitly state what is out of scope.

## Acceptance

List observable, testable acceptance criteria.

Prefer behavior over implementation detail.

## Evidence

What must prove completion?

Examples:

- focused tests;
- full static/build verification;
- browser/e2e evidence;
- database/isolation tests;
- provider read-back;
- production smoke;
- independent evaluation.

## Permission scope

What may the agent write or change?

Separate repository/merge authority from provider, production-data, security, credentials, or destructive operations.

## Stop conditions

Stop and report rather than improvising if any of these become true.

Examples:

- required behavior needs an out-of-scope architecture change;
- safe rollback is unclear;
- the base has moved materially;
- an external setting requires ungranted write authority;
- evidence contradicts the task assumptions.

## Delivery

Expected branch/PR/lifecycle output.

State whether the agent may merge when all gates are clean or must stop for a human decision.
