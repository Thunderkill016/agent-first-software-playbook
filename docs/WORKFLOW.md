# End-to-end delivery workflow

This workflow turns an intent into an accepted repository state without depending on hidden chat context.

Detailed state/permission rules: `docs/engineering/AGENT_OPERATING_MODEL.md`.

## 1. Capture outcome

Define:

- user/project outcome;
- exact in/out scope;
- acceptance criteria;
- prohibited behavior;
- required evidence;
- stop conditions.

Use `templates/AGENT_TASK.md` or `templates/WORK_PACKET.md`.

## 2. Reconnaissance — `discovery`

Read current repository truth first:

- affected implementation/tests/config/schema;
- current state/work;
- architecture/product authority;
- active task;
- runtime/logs where the report is behavioral.

Output: relevant owners/files, reproduced/current behavior, reusable paths, uncertainty.

## 3. Research — `discovery → specified`

Research only unresolved external facts. Use `docs/engineering/RESEARCH_PROTOCOL.md` and `templates/RESEARCH_NOTE.md` for load-bearing decisions.

## 4. Specification — `specified`

Write observable acceptance and non-goals before prescribing implementation. Resolve or explicitly exclude unknown product decisions.

## 5. Plan — `planned`

Identify:

- files/owners/interfaces;
- existing code to reuse;
- risk class;
- permission scope;
- task checkpoints;
- evidence per claim;
- compatibility/rollout/rollback;
- stop/approval points.

## 6. Isolate work — `implementing`

Use one focused branch/worktree/sandbox. Keep unrelated user changes safe. Parallel work requires disjoint ownership or explicit interfaces.

## 7. Implement

- one checkpoint at a time;
- smallest coherent change;
- fix authoritative owners rather than stacking overrides;
- change specification first if requirements change;
- record unrelated defects separately.

## 8. Verify locally

Use `docs/engineering/VERIFICATION_MATRIX.md`.

Report exact commands, SHA/mode/environment where relevant, passes/failures/not-applicable steps, retry history and remaining unknowns.

## 9. Evaluate — `evaluating`

Use `templates/EVALUATION.md`. The evaluator reads the task/spec and actual diff, challenges counterexamples, and identifies unverified claims.

Self-review is allowed but must be labeled as self-review. Independent means a separate reviewer/model/person.

## 10. PR — `ready_for_review`

The PR body records:

- outcome/scope;
- risk/permissions;
- exact evidence;
- initial failures and retries;
- evaluation provenance/findings;
- exact head;
- lifecycle/current-state impact;
- deployment/provider verification plan if needed.

## 11. Exact-head gate

Before merge, re-read current head/base and required checks. If the head changed after review/checks, re-evaluate the changed delta and evidence.

## 12. Merge

Merge only when:

- material findings are resolved/accepted by correct authority;
- required checks are clean for the exact head/merge candidate;
- no ungranted permission boundary remains;
- rollback/compatibility is acceptable.

Use expected-head merge protection where supported.

## 13. Deploy / provider action

Only when applicable and authorized. Identify the exact deployed commit/provider change.

## 14. Runtime verification — `deployed`

Verify only the affected boundary with the narrowest safe synthetic/reversible method. Do not infer production truth from local/test evidence.

## 15. Accept and reconcile — `accepted`

- update current state if capability/architecture/security/operations truth changed;
- update current work status;
- retire/archive completed active execution artifacts;
- preserve only useful provenance;
- update failure register and executable guardrail when a reusable failure was found.

## 16. Garbage collect

Periodically remove:

- stale instructions;
- duplicated owners;
- obsolete workarounds;
- completed plans left active;
- dead rules/tests that no longer protect a real contract.

Agent-first repositories need continuous entropy control, not permanent process accumulation.
