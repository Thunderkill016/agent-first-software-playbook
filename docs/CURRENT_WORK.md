# Current Work

## NOW

- [ ] Validate real onboarding behavior with multiple agent ecosystems and document only empirically observed compatibility gaps.

## NEXT

- [ ] Add a dry-run bootstrap utility that proposes the minimal contract for an existing repository without overwriting files.
- [ ] Add an optional release/provenance module only for projects that actually publish artifacts.

## BLOCKED

- None.

## OWNER DECISION

- [ ] Decide whether to make `playbook-policy` a provider-required branch/ruleset check after observing stable runs.
- [ ] Decide whether to enable automatic Copilot code review in provider settings; it is optional and must not become shared project authority.

## HOLD

- Installing an agent-orchestration framework without a measured coordination problem.
- Large vendor-specific rule libraries that duplicate `AGENTS.md`.
- Repository-committed personal/automatic agent memory.
- Opinionated application-framework templates before cross-agent onboarding and bootstrap portability are empirically validated.

## RECENTLY DONE

- [x] Minimal executable reference project with real red CI → one-owner fix → exact-head green CI → squash merge. Issue #6 / PR #7 / `31a187be14fba15eb25fc990cbbb8f4b2e29476f`.
- [x] Universal agent reference v2: vendor-neutral contract, machine-readable policy, doctor/checkers, cross-agent routing, environment/security/research/verification guidance and stable policy CI. PR #2 / `fa13b80f96f058f9a75ca953a69984036e04107e`.
- [x] Initial A→Z starter and reusable templates.
