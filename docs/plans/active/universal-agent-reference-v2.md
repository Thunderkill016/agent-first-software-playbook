# Work packet — universal agent reference v2

## Execution state

`evaluating`

## Goal

Turn the repository into a vendor-neutral, project-neutral reference implementation that a fresh coding agent can discover and use without private project history or personal memory.

## Reconnaissance

The previous v1 already had an A→Z guide, root `AGENTS.md`, risk/workflow docs, current state/work, templates and public references. Gaps found before this change:

- no machine-readable contract;
- no executable agent doctor/knowledge drift check;
- no CI enforcing repository legibility;
- cross-agent discovery was documented but incomplete;
- environment/security/supply-chain guidance was under-specified;
- a private-project-derived case-study document was inappropriate for a universal template;
- current issue template metadata contained a typo;
- GitHub Actions were referenced by movable tags rather than immutable SHAs.

## Scope

### In

- universalize shared documentation and remove project-specific case-study material;
- add machine-readable policy and diagnostics;
- add cross-agent discovery adapters without duplicating policy;
- add environment, research, verification and secure-development contracts;
- add stable least-privilege CI with immutable action pins;
- add failure/quality/handoff/evaluation mechanisms;
- update references from current official primary sources.

### Out

- application-framework-specific architecture;
- production/provider writes;
- branch/ruleset changes;
- installing an orchestration framework;
- committing personal/automatic agent memory;
- claiming compatibility with an agent that has not been verified from official docs.

## Acceptance

- [x] Root contract is vendor-neutral and routes through one canonical `AGENTS.md`.
- [x] Private-project case-study material is removed from shared repo architecture.
- [x] Major coding-agent ecosystems have a documented native/thin-adapter route based on official docs.
- [x] Machine-readable policy mirrors documented authority.
- [x] `agent:doctor`, knowledge and public-safety checks exist without third-party runtime dependencies.
- [x] CI uses least-privilege token permissions and immutable action SHAs.
- [ ] Exact-head CI passes on the pull request.
- [ ] Fresh independent evaluation is obtained when available; otherwise absence is explicitly recorded.
- [ ] Material findings are resolved.
- [ ] Exact-head merge readiness is rechecked before merge.
- [ ] Lifecycle artifacts are reconciled after merge.

## Risk

**Class 3** — the change modifies CI policy, shared agent permission/security guidance and repository governance contracts.

Blast radius: future contributors/agents and projects that copy this reference pattern.

Rollback: revert the focused PR; no provider/production state is changed by this branch.

## Permission scope

`branch_write`

Allowed: focused branch, PR, repository files, review/fix loop, safe merge only after evidence requirements.

Not allowed by this packet: provider security settings, branch rulesets, production systems/data, external secrets.

## Research

Primary official sources consulted include OpenAI Codex/Harness Engineering, GitHub Copilot/Actions, Anthropic Claude Code, Gemini CLI, Cursor, Windsurf, Cline, Aider, Google Engineering Practices, NIST SSDF and SLSA. Applicability is summarized in `docs/REFERENCES.md`.

## Verification

- `playbook-policy` exact-head GitHub Actions check;
- `npm run verify` inside that workflow;
- `npm run agent:doctor -- --json` inside that workflow;
- branch diff/structure review;
- direct confirmation that removed case-study file no longer exists;
- independent Copilot code review request if available for this repository/account.

## Stop conditions

- CI contract fails or becomes flaky/unexplained;
- a tool adapter requires duplicated/conflicting policy;
- source research is secondary-only for a load-bearing interoperability claim;
- provider mutation becomes necessary without explicit approval;
- independent review finds a material unresolved issue.

## Next allowed action

Finish evaluation, open the PR, obtain exact-head CI and fresh review, then decide merge readiness from evidence.
