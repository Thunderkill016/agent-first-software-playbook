# Minimal executable reference project

This directory is a deliberately small executable sample used to prove the repository's agent-delivery lifecycle with real machine evidence.

It is intentionally dependency-free and uses Node.js 24's built-in test runner.

## Domain

The sample selects the next task from a small in-memory task list.

A task has:

- `status`: `ready`, `blocked`, or `done`;
- `priority`: `high`, `medium`, or `low`;
- `title`: human-readable text.

Contract:

1. only `ready` tasks are eligible;
2. higher priority wins (`high` → `medium` → `low`);
3. equal-priority tasks preserve input order;
4. no eligible task returns `null`.

## Run

From the repository root:

```bash
npm run test:reference
```

Or from this directory:

```bash
node --test test/next-task.test.mjs
```

## Why this exists

The first implementation in the lifecycle intentionally violates rule 1 so the pull request records a real failing CI head. A later bounded fix changes only the authoritative filtering logic, after which the exact-head CI must pass before merge.

The historical red/green evidence belongs to the issue, PR, CI runs, and completed lifecycle artifact—not comments that pretend a failure happened.
