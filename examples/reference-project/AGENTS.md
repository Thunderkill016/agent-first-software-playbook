# Reference-project scoped agent instructions

Inherit the root `AGENTS.md`. This file contains only the delta for `examples/reference-project/`.

## Boundary

This sample is intentionally dependency-free Node.js code. Do not add a framework, package, database, network service, build step, or provider integration to solve its bounded tasks.

## Domain invariants

- Eligible task status is exactly `ready`.
- `blocked` and `done` tasks are never selected.
- Priority order is `high` before `medium` before `low`.
- Equal-priority tasks preserve input order.
- No eligible task returns `null`.

## Verification

Run:

```bash
node --test test/next-task.test.mjs
```

From repository root, `npm run test:reference` must exercise the same test.

When a task intentionally demonstrates red-to-green delivery, preserve the failing CI evidence in GitHub/lifecycle artifacts; do not weaken or skip the test to obtain green CI.
