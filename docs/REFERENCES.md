# Public Engineering References

This playbook is repository-specific guidance informed by public engineering practice. External sources are evidence and inspiration; they do not override the repository's own authority.

## OpenAI — Harness engineering

https://openai.com/index/harness-engineering/

Key ideas used here:

- humans steer while agents execute;
- repository-local, versioned knowledge makes a system legible to agents;
- missing tools/guardrails should be treated as environment design problems;
- architecture should enforce important invariants without micromanaging every implementation;
- autonomy increases as testing, review, feedback, and recovery become encoded in the environment.

## OpenAI — How OpenAI uses Codex

https://openai.com/business/guides-and-resources/how-openai-uses-codex/

Key ideas used here:

- structure agent work like a strong GitHub issue;
- keep tasks well scoped;
- use `AGENTS.md` for persistent repository context;
- iteratively improve the agent's development environment rather than relying only on better prompts.

## Google Engineering Practices — Small CLs

https://google.github.io/eng-practices/review/developer/small-cls.html

Key ideas used here:

- one self-contained change is easier to review and reason about;
- related tests should travel with behavior changes;
- smaller changes are easier to merge, roll back, and design well;
- refactors should usually be separated from functional changes.

## Google Engineering Practices — Code review

https://google.github.io/eng-practices/review/

https://google.github.io/eng-practices/review/reviewer/looking-for.html

https://google.github.io/eng-practices/review/reviewer/standard.html

Key ideas used here:

- review design, functionality, complexity, tests, and user impact;
- optimize for improving code health over time rather than demanding perfection;
- review should be independent reasoning, not merely a style pass.

## GitHub Docs — Status checks

https://docs.github.com/en/pull-requests/reference/status-checks

https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks

Key ideas used here:

- checks attach validation to commits;
- required checks gate protected-branch merges;
- required checks need to succeed against the latest relevant commit SHA;
- old green checks are not evidence for a newer PR head.

## GitHub Docs — Protected branches

https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches

Key ideas used here:

- protected branches can require successful validation before merge;
- repository policy should make important delivery constraints enforceable rather than purely advisory.

## Attribution note

The wording and operating model in this repository are original synthesis. The linked sources should be consulted directly for their full guidance and licenses.
