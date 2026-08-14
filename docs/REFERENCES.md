# Primary Engineering References

**Last reviewed:** 2026-08-15

External sources are evidence for this playbook, not repository authority. Tool behavior changes; re-check current official documentation before relying on a discovery/permission detail.

## Agent repository instructions and context

### AGENTS.md — open format

- https://agents.md/
- https://github.com/agentsmd/agents.md

Establishes: a simple vendor-neutral `AGENTS.md` format, root and nested project guidance, and broad ecosystem adoption. The format is a discovery/context convention, not an enforcement or security boundary.

### OpenAI — Codex / Harness Engineering

- https://openai.com/index/introducing-codex/
- https://openai.com/index/harness-engineering/

Establishes: repository `AGENTS.md`, configured development environments, reliable tests, repository knowledge as system of record, short instruction map + progressive disclosure, mechanical knowledge checks, application/runtime legibility, feedback-loop/guardrail improvement.

### Google — Jules

- https://jules.google/docs/
- https://jules.google/docs/environment/

Establishes: automatic root `AGENTS.md` discovery, isolated short-lived VM execution, repository/environment setup, test-oriented task execution and repository-scoped work.

### GitHub Copilot

- https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- https://docs.github.com/en/copilot/concepts/prompting/response-customization
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
- https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/copilot-code-review

Establishes: repository-wide/path-specific/agent instructions, `AGENTS.md` support in relevant Copilot surfaces, instruction precedence, CLI file references, Copilot review behavior and REST reviewer identity.

### Anthropic — Claude Code

- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/debug-your-config

Establishes: project `CLAUDE.md`, `@AGENTS.md` import pattern, concise instructions, path-scoped rules, distinction between behavioral guidance and permissions/hooks, local auto-memory vs checked-in shared project context.

### Google — Gemini CLI

- https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html

Establishes: hierarchical `GEMINI.md` context, `@file` imports, configurable context filenames, context inspection/refresh.

### Cursor

- https://docs.cursor.com/context/rules

Establishes: project rules and `AGENTS.md` as a simple project instruction mechanism; scoped rules reduce irrelevant context.

### Windsurf

- https://docs.windsurf.com/windsurf/cascade/memories

Establishes: `AGENTS.md` discovery, workspace rules, distinction between local auto-memory and repository-shared rules, concise/scoped instruction guidance.

### Cline

- https://docs.cline.bot/customization/cline-rules
- https://docs.cline.bot/getting-started/config

Establishes: native `AGENTS.md` compatibility, project rules/conditional scope, explicit command permissions, and the need to review executable hooks/plugins.

### Aider

- https://aider.chat/docs/usage/conventions.html
- https://aider.chat/docs/repomap.html
- https://aider.chat/docs/git.html

Establishes: read-only convention files, concise repository maps, and Git-based review/undo mechanics. This repo's `.aider.conf.yml` loads `AGENTS.md` as the shared conventions file.

## Emerging empirical evidence

These papers are primary research, useful for testing assumptions but **not** universal policy authority.

### Configuration smells in coding-agent instruction files (2026)

- https://arxiv.org/abs/2606.15828

Reports recurring smells including context bloat, duplicated/conflicting instruction families and leakage of rules better enforced elsewhere. This supports the playbook's short-router, one-owner and executable-guardrail design, while the study sample and heuristics remain research constraints.

### Impact of AGENTS.md on coding-agent efficiency (2026)

- https://arxiv.org/abs/2601.20404

Reports lower median runtime/output-token use with AGENTS.md in a limited multi-repository experiment while task completion stayed comparable. Treat the result as promising evidence for repository-level instructions, not a guarantee for every agent/project.

## Change size and review

### Google Engineering Practices

- https://google.github.io/eng-practices/review/developer/small-cls.html
- https://google.github.io/eng-practices/review/reviewer/looking-for.html
- https://google.github.io/eng-practices/review/reviewer/standard.html

Establishes: small self-contained changes, related tests with behavior, review of design/functionality/complexity/tests/user impact, and code-health improvement rather than perfectionism.

## GitHub delivery/security

- https://docs.github.com/en/pull-requests/reference/status-checks
- https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks
- https://docs.github.com/en/actions/reference/security/secure-use
- https://docs.github.com/en/actions/concepts/security/github_token
- https://docs.github.com/en/actions/how-tos/secure-your-work
- https://github.com/actions/checkout
- https://github.com/actions/setup-node

Establishes: commit/merge-candidate scoped status checks, latest-head relevance, least-privilege workflow token permissions, immutable full-SHA action pinning, secure workflow/deployment guidance, and current Node 24-based official action generations. This reference repo uses checkout/setup-node v6 commit pins and Node 24.

## Secure development and supply chain

### NIST SSDF

- https://csrc.nist.gov/pubs/sp/800/218/final
- https://csrc.nist.gov/Projects/ssdf/publications

Establishes: secure development practices integrated into the SDLC, protection of software and development environments, secure production, vulnerability response and root-cause prevention. Check the publications page for the current revision status.

### SLSA

- https://slsa.dev/spec/v1.2/build-track-basics
- https://slsa.dev/spec/v1.2/provenance

Establishes: incremental build/supply-chain assurance and verifiable provenance for projects that produce artifacts. This playbook treats provenance as optional until a project actually has a release artifact boundary.

## Attribution and applicability

The operating model and wording in this repository are original synthesis. These references validate interoperability and engineering principles; they do not imply endorsement by the referenced organizations.
