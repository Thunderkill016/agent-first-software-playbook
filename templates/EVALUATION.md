# Evaluation

## Evaluator provenance

- Evaluator: human | separate agent/model | implementing agent self-review
- Independent from implementation? yes/no
- Exact head/diff reviewed:
- Specification/task contract reviewed:

Do not label a self-review as independent.

## Acceptance matrix

| Acceptance criterion | Evidence | Result | Notes |
|---|---|---|---|
| | | PASS / FAIL / UNVERIFIED | |

## Counterexamples challenged

- [ ] wrong runtime/environment/mode
- [ ] missing empty/loading/error/recovery states
- [ ] duplicated owner or stacked workaround
- [ ] hidden scope expansion
- [ ] stale base/head evidence
- [ ] false-green or overly mocked tests
- [ ] rollback/compatibility gap
- [ ] permission overreach
- [ ] stale current-state/current-work docs
- [ ] security/privacy/accessibility concerns where applicable

## Findings

### P0 — release/merge blocker

- None / finding:

### P1 — material correctness/safety issue

- None / finding:

### P2 — bounded improvement

- None / finding:

### Nit / subjective alternative

- Optional; must not be confused with a blocker.

## Unverified claims

- [ ]

## Verdict

`CLEAN | CHANGES_REQUIRED | INCONCLUSIVE`

## Next allowed action

One bounded action or state transition.
