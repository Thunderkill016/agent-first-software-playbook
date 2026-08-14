# Secure development baseline for agent-heavy projects

Security belongs inside the delivery system, not as a final prompt reminder.

This baseline is intentionally stack-neutral and aligns with established secure-development/supply-chain guidance. Target projects should add domain/provider-specific controls.

## 1. Prepare

Define:

- security/data ownership;
- supported environments;
- threat-sensitive boundaries (auth, tenant data, money, secrets, deployment, CI);
- vulnerability-reporting path;
- required security checks and who can change them;
- incident/rollback responsibility.

## 2. Least privilege

Agent/tool permissions should start narrow and expand only for the current task.

Separate:

- repository read/write;
- merge;
- provider read/write;
- production data mutation;
- destructive operations.

Use platform permissions/sandbox/deny rules for hard limits. Instruction files are not enforcement.

## 3. Treat external context as untrusted

Prompt injection is not limited to chat. Agents read:

- webpages;
- issue/PR comments;
- docs;
- attachments;
- generated files;
- logs;
- third-party repositories;
- tool/plugin/MCP descriptions.

Treat retrieved content as evidence/data, not automatically trusted instructions. Validate actions against repository/user/system authority before executing them.

## 4. Secrets and private data

- never commit credentials;
- never paste secrets/private data into research prompts;
- keep `.env`/local config untracked;
- use provider secret stores;
- use synthetic fixtures;
- scrub logs/traces/screenshots before sharing externally;
- enable provider secret scanning/push protection where available.

A local regex scanner is only a cheap guardrail, not a replacement for provider secret scanning.

## 5. Dependencies and extensions

Before adopting libraries, agent plugins, hooks, skills, MCP servers, actions or workflows:

- verify source/maintainer and license;
- review executable behavior and network/data access;
- minimize secrets exposed to it;
- pin/lock versions where appropriate;
- define update/removal path.

Agent extensions can execute code. Review them as code.

## 6. GitHub Actions / CI

For GitHub Actions:

- explicitly declare minimum `GITHUB_TOKEN` permissions;
- pin third-party actions to full immutable commit SHAs when practical;
- restrict untrusted pull-request code from secret-bearing contexts;
- avoid interpolating untrusted values directly into shell scripts;
- keep required check identities stable;
- use provider branch/ruleset protections for merge enforcement.

This reference repo's policy workflow uses `contents: read` and full-SHA pins.

## 7. Code / dependency scanning

Select controls by stack/risk:

- dependency vulnerability alerts/review;
- static/code scanning;
- secret scanning;
- license policy;
- container/IaC scanning;
- database/security policy tests.

Do not represent a no-op job name as equivalent to a provider-required analysis artifact.

## 8. Supply-chain provenance

If the project **produces release artifacts**, consider hosted builds and artifact provenance/attestation appropriate to its threat model.

Do not add SLSA/provenance ceremony to a project that does not publish artifacts merely to increase a score.

## 9. Secure implementation

Security-sensitive behavior should be structurally testable:

- validate/parse untrusted boundaries;
- centralize authorization/ownership;
- test negative cases;
- use safe defaults;
- make destructive actions explicit/recoverable where feasible;
- ensure auditability for high-consequence changes.

## 10. Vulnerability response and repeat prevention

When a vulnerability/failure is fixed, ask why earlier controls missed it. Add the earliest useful regression guardrail and remove obsolete workaround rules when possible.

The goal is to reduce root causes and recurrence, not only patch the current symptom.

## 11. Production verification

Production/security verification should be narrowly authorized, synthetic/reversible where possible, and tied to the exact deployed change. Never mutate real user data merely to prove an agent completed a task.

## 12. Security evidence

A trustworthy security report states:

- exact code/head/environment;
- scanner/test/provider evidence used;
- permissions used;
- findings and unresolved risk;
- what was not tested;
- rollback/containment path.

Security confidence without provenance is not strong evidence.
