# Current Work

## NOW

- [ ] Add a minimal executable reference project that demonstrates the complete lifecycle end-to-end: task contract → failing test → bounded fix → evaluation → exact-head CI → merge → lifecycle closeout.

## NEXT

- [ ] Validate real onboarding behavior with multiple agent ecosystems and document only empirically observed compatibility gaps.
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
- Opinionated application-framework templates before the minimal executable reference project proves the generic contract.

## RECENTLY DONE

- [x] Universal agent reference v2: vendor-neutral contract, machine-readable policy, doctor/checkers, cross-agent routing, environment/security/research/verification guidance and stable policy CI. PR #2 / `fa13b80f96f058f9a75ca953a69984036e04107e`.
- [x] Initial A→Z starter and reusable templates.
