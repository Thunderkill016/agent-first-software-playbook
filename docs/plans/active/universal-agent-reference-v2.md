# Work packet — universal agent reference v2

## Execution state

`ready_for_review`

## Goal

Turn the repository into a vendor-neutral, project-neutral reference implementation that a fresh coding agent can discover and use without private project history or personal memory.

## Reconnaissance

The previous v1 already had an A→Z guide, root `AGENTS.md`, risk/workflow docs, current state/work, templates and public references. Gaps found before this change:

- no machine-readable contract;
- no executable agent doctor/knowledge drift check;
- no CI enforcing repository legibility;
- cross-agent discovery was incomplete;
- environment/security/supply-chain guidance was under-specified;
- a private-project-derived case-study document was inappropriate for a universal template;
- current issue template metadata contained a typo;
- GitHub Actions initially used a deprecated Node-20 generation/runtime path.

## Scope

### In

- universalize shared documentation and remove project-specific case-study material;
- add machine-readable policy and diagnostics;
- add cross-agent discovery adapters without duplicating policy;
- add environment, research, verification and secure-development contracts;
- add stable least-privilege CI with immutable action pins;
- add failure/quality/handoff/evaluation mechanisms;
- update references from current official/primary sources.

### Out

- application-framework-specific architecture;
- production/provider writes;
- branch/ruleset changes;
- installing an orchestration framework;
- committing personal/automatic agent memory;
- claiming compatibility without current primary evidence.

## Acceptance

- [x] Root contract is vendor-neutral and routes through one canonical `AGENTS.md`.
- [x] Private-project case-study material is removed from shared repo architecture.
- [x] Major coding-agent ecosystems have a documented native/thin-adapter route based on current primary docs.
- [x] Machine-readable policy mirrors documented authority.
- [x] `agent:doctor`, knowledge and public-safety checks exist without third-party runtime dependencies.
- [x] CI uses least-privilege token permissions, current Node 24 tooling and immutable action SHAs.
- [x] Policy CI passed after all material implementation findings were fixed.
- [x] Independent review was attempted; no review submission returned, and absence is explicitly recorded rather than claimed.
- [x] Material self-evaluation findings are resolved with regression evidence.
- [ ] Final state-only exact-head policy check passes.
- [ ] Exact-head/base/review-thread readiness is rechecked immediately before merge.
- [ ] Lifecycle artifacts are reconciled after merge.

## Risk

**Class 3** — CI policy, shared permission/security guidance and repository governance contracts change.

Blast radius: future contributors/agents and projects that copy this reference pattern.

Rollback: revert the focused PR; no provider/production state is changed by this branch.

## Permission scope

`branch_write`

Allowed: focused branch, PR, repository files, review/fix loop, safe merge only after evidence requirements.

Not allowed: provider security settings, branch rulesets, production systems/data, external secrets.

## Research

Current primary/official sources include the AGENTS.md open format, OpenAI Codex/Harness Engineering, Google Jules/Gemini CLI, GitHub Copilot/Actions, Anthropic Claude Code, Cursor, Windsurf, Cline, Aider, Google Engineering Practices, NIST SSDF and SLSA. Recent primary research is used only as limited empirical evidence. Applicability is summarized in `docs/REFERENCES.md`.

## Evaluation

See `docs/plans/active/universal-agent-reference-v2-evaluation.md`.

Current verdict: `CLEAN WITH INDEPENDENT REVIEW UNAVAILABLE`.

Resolved findings include:

- Node-20 / actions-v4 deprecation path → Node 24 + checkout/setup-node v6 exact-SHA pins, explicit runtime contract and regression run;
- invalid issue-template metadata → corrected and mechanically guarded.

## Verification evidence

Implementation/evaluation heads received successful `playbook-policy` runs. The clean implementation run confirmed:

- `Contents: read` token permission;
- checkout credentials not persisted;
- Node 24.19 runtime;
- knowledge contract pass;
- public-safety contract pass;
- agent doctor `ok: true` with no missing required files.

This `ready_for_review` state change is deliberately followed by one final exact-head policy run before merge.

## Stop conditions

- final policy gate fails, flakes or is unexplained;
- a material review finding appears;
- base/head moves materially;
- provider mutation becomes necessary without explicit approval;
- merge evidence no longer applies to exact current head/merge candidate.

## Next allowed action

Observe the final policy check for this state-only commit, re-read PR head/base/reviews/threads, then merge with an expected-head guard only if all remain clean.
