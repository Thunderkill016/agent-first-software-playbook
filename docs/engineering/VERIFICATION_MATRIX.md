# Verification matrix

Verification is not “run tests.” It is matching each completion claim to evidence from the layer capable of proving it.

## Claim → evidence

| Claim | Minimum useful evidence | Does **not** prove |
|---|---|---|
| docs/knowledge routing is coherent | knowledge contract, local-link validation, diff review | product runtime behavior |
| code parses/types/builds | lint/typecheck/build | user flow correctness, data isolation |
| domain logic is correct | focused unit/integration tests with counterexamples | UI behavior or provider state |
| database ownership/isolation is correct | migration/reset/database-policy tests | browser behavior |
| user flow works | running browser/e2e evidence in the correct mode | production provider configuration |
| responsive/a11y behavior is correct | targeted viewport/a11y evidence and human review | physical-device behavior unless a device was used |
| provider configuration is correct | provider read-back after exact change | application flow unless exercised |
| production behavior is correct | exact deployment identity + safe affected-flow smoke | unrelated production behavior |
| change is merge-ready | resolved material findings + exact-head required checks | post-deployment correctness |

A build is not universal proof.

## Risk-selected gate model

### Class 0 — docs/mechanical

Expected:

- knowledge/structure contract;
- public-safety/secret guard;
- diff hygiene;
- stable repository-required provider checks, if configured.

Do not install a full application toolchain merely to validate prose.

### Class 1 — bounded executable change

Add:

- affected tests;
- lint/typecheck/static analysis as applicable;
- build when executable packaging changes;
- runtime smoke when shipped behavior changes.

### Class 2 — user flow/UI

Add:

- running flow proof;
- responsive evidence where layout can change;
- accessibility evidence where interaction/semantics can change;
- light/dark/long-data/error states when relevant;
- evaluator review of actual runtime, not screenshots alone.

### Class 3 — high consequence

Add the affected boundary evidence:

- schema/database tests;
- auth/tenant isolation tests;
- security analysis and secret controls;
- rollback and migration proof;
- provider read-back;
- exact affected production verification;
- explicit owner/permission approval where required.

## Exact-head contract

Only evidence attached to the **current relevant head/merge candidate** supports merge readiness.

Before merge:

1. read current PR head SHA;
2. confirm the reviewed diff is that head;
3. confirm required checks apply to that exact head or platform merge candidate;
4. confirm review findings were resolved after their fixing commit;
5. use an expected-head guard when merging if supported.

Old green CI does not authorize a new commit.

## Stable required checks

If a repository makes a check required, keep its identity stable and make the workflow start for every PR where the rule expects it.

Avoid path-filtering an entire required workflow: many platforms leave the required check pending when the workflow never starts. Instead keep a stable job and let non-applicable heavy steps report an explicit not-applicable result where appropriate.

Provider-required scanning may be stricter than local risk classification. If the provider requires a real uploaded analysis, a green no-op shell is not equivalent evidence.

## Retry rule

A retry that passes does not erase the first failure.

Classify the first failure as one of:

- deterministic product/test defect;
- deterministic CI/policy defect;
- environment/infrastructure failure;
- known flake with a tracked root-cause plan;
- inconclusive evidence.

If the reason is unknown, report “passed on retry; first failure unexplained,” not a clean pass.

Repeated unexplained retry success is a reliability defect.

## Runtime mode rule

Always identify the mode being proved:

- local fixture/demo;
- test database;
- authenticated staging;
- production;
- synthetic provider smoke.

Never promote one mode’s evidence into another mode’s claim.

## Generated evidence rule

Screenshots, videos, coverage reports, traces and CI artifacts are useful only when their provenance is clear:

- exact commit/head;
- mode/environment;
- test data type (synthetic vs real);
- viewport/browser/device where relevant;
- command/workflow that produced them.

A screenshot without provenance is illustration, not strong evidence.

## Independent evaluation

For material work, evaluation should actively search for counterexamples:

- missing acceptance states;
- wrong owner/duplicated logic;
- scope expansion;
- false-green tests;
- mode confusion;
- rollback gaps;
- permission overreach;
- UX/accessibility regressions;
- stale docs/lifecycle state.

Independent means fresh reasoning. A second pass by the implementing agent may help but should not be mislabeled as independent if no separate reviewer/model/person actually evaluated it.

## Production verification

Do it only when the completion claim requires it and permission allows it.

Production verification should be:

- narrow;
- synthetic where possible;
- reversible;
- non-destructive by default;
- tied to the exact deployed commit;
- recorded without secrets/private user data.

## Definition of a clean verification report

A trustworthy report says exactly:

- what ran;
- on which SHA/environment/mode;
- what passed;
- what failed;
- what was skipped/not applicable;
- what remains unverified;
- which permission/owner boundary remains.

Do not turn absence of evidence into evidence of absence.
