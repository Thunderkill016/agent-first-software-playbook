# Failure record

## Observable signature

What happened, in reproducible terms?

## Impact / blast radius

What user, system, delivery or trust boundary was affected?

## Evidence

- Exact SHA/environment/mode:
- Failing check/runtime observation:
- Reproduction:

## Root cause

Known root cause, or clearly labeled hypothesis if not yet proven.

## Why existing defenses missed it

Which earlier layer could have caught this?

## Earliest useful prevention layer

`type/schema | unit/contract test | policy script/lint | browser/database/provider check | CI | documentation`

## Guardrail

What executable or structural change will prevent/detect recurrence?

## Regression proof

How do we prove the guardrail catches the original signature without blocking valid work?

## Owner

Who owns the guardrail?

## Removal / replacement condition

When can this guardrail be simplified or removed?

## Register update

Add or update the matching row in `docs/FAILURE_REGISTER.md` when this is a reusable failure family.
