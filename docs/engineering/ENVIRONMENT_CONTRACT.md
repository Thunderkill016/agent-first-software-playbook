# Agent development-environment contract

Agents become far more effective when the repository exposes a predictable, isolated environment instead of requiring manual tribal setup.

This document defines the target properties. Each adopting project supplies stack-specific commands.

## Required answers

A fresh agent should be able to discover:

- prerequisites and supported versions;
- one deterministic setup command;
- one normal run command;
- one verification command;
- environment/config sources of truth;
- safe synthetic test data;
- ports/services/databases used;
- cleanup/reset behavior;
- where logs/metrics/traces/browser evidence live.

If these answers are only in a teammate's memory, the environment is not agent-ready.

## Reproducibility

Prefer:

- lockfiles and pinned runtime/tool versions;
- checked-in example configuration with no secrets;
- deterministic migrations/seeds;
- setup scripts that fail with actionable errors;
- CI using the same core commands as local verification.

Avoid setup that depends on undocumented GUI clicks or mutable shared state.

## Isolation

A material task should be runnable in a branch/worktree/sandbox without corrupting another task.

Design for:

- unique ports or automatic port allocation;
- isolated database/schema/data namespace;
- synthetic fixtures;
- per-worktree caches/build outputs where collisions matter;
- deterministic cleanup;
- no shared production credentials.

Parallel agents sharing the same mutable local database/port/cache are not truly isolated.

## Application legibility

For user-facing/runtime systems, give agents tools to inspect the system directly:

- browser/DOM interaction;
- screenshots/video with provenance;
- application/server logs;
- metrics/traces when they materially reduce diagnosis time;
- database/provider read access where safe;
- exact environment/mode identifiers.

An agent cannot validate a surface it cannot inspect.

## Observability

Observability should answer task-relevant questions, not dump unlimited telemetry into context.

Useful patterns:

- structured logs with correlation IDs;
- queryable local traces/metrics;
- concise failure artifacts attached to CI;
- per-task ephemeral observability stacks for large systems;
- privacy scrubbing before any external telemetry provider.

## Network and dependencies

Define when network access is required. Cache/install dependencies during an explicit setup phase when possible.

For restricted/offline agent runners, document which commands can still run and what evidence cannot be claimed.

## Secrets

Never encode real secrets in setup docs, fixtures or agent memory.

Use:

- environment/provider secret stores;
- `.env.example` with placeholders;
- least-privilege test credentials;
- separate environments;
- synthetic data.

## One-command verification

Every project should converge on a small command surface such as:

```text
setup
run
verify
boundary-specific checks
```

The command names can differ. The important property is discoverability and reproducibility.

## Worktree rule

If agents will work concurrently, explicitly test the project in multiple worktrees. Verify that setup/run/test/cleanup do not rely on hidden global state.

## Completion evidence

Do not claim environment readiness because setup succeeded once. Exercise a fresh clone/worktree path periodically and update documentation when the real bootstrap path changes.
