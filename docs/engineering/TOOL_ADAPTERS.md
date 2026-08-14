# Cross-agent instruction adapters

The repository should have **one canonical shared instruction owner** and thin adapters for tools that discover different filenames.

Canonical owner here: root `AGENTS.md`.

## Why adapters are thin

Duplicating the full instruction set into `CLAUDE.md`, `GEMINI.md`, Copilot instructions, IDE rules and local prompts creates instruction drift. A rule gets fixed in one place and remains stale everywhere else.

Instead:

```text
Codex ───────────────┐
GitHub Copilot ──────┤
Claude Code ─────────┼──> AGENTS.md ──> docs/context/README.md ──> relevant authority
Gemini CLI ──────────┤
future adapters ─────┘
```

## Verified discovery surfaces

### Codex

OpenAI documents repository `AGENTS.md` as the place to tell Codex how to navigate, test and follow project practices. Nested `AGENTS.md` files can scope instructions to subtrees.

Adapter: none required; root `AGENTS.md` is native.

### GitHub Copilot

GitHub documents repository-wide `.github/copilot-instructions.md`, path-specific `.github/instructions/*.instructions.md`, and agent instruction files including `AGENTS.md` for supported features.

Adapter in this repo: `.github/copilot-instructions.md` only points to canonical `AGENTS.md`.

Use path-specific Copilot instructions only when a real subtree/file-type contract cannot be expressed more cleanly as shared repository guidance.

### Claude Code

Anthropic documents project `CLAUDE.md` memory and import syntax. The checked-in root file is team-shared project context.

Adapter in this repo: `CLAUDE.md` imports `AGENTS.md` and contains no duplicate policy.

### Gemini CLI

Gemini CLI documents hierarchical `GEMINI.md` context and `@file` imports. It also allows configuring alternate context filenames.

Adapter in this repo: `GEMINI.md` imports `AGENTS.md`.

## Precedence rule

Tool/system/user instructions may have higher precedence than repository files. The repo cannot override platform safety or an explicit user instruction.

Inside repository-owned guidance:

1. keep root `AGENTS.md` as shared policy;
2. use nested/path-specific instructions only for a genuinely narrower boundary;
3. make more-specific files link to their parent authority and contain only the delta;
4. mechanically verify adapters still route to the canonical owner.

## When to add another adapter

Add a tool-specific file only when:

- the tool officially discovers a different file;
- the adapter materially improves automatic onboarding;
- it can remain thin;
- official documentation confirms the behavior.

Do not add every AI tool's config “just in case.”

## Local/user preferences

Personal preferences that do not belong to project truth should stay in user-level agent configuration rather than the repository.

Examples:

- preferred response tone;
- personal shell aliases;
- private sandbox URLs;
- local credentials;
- machine-specific paths.

Project instructions should be reproducible for collaborators and automation.

## Source maintenance

Current official source links live in `docs/REFERENCES.md`. Re-verify tool discovery behavior when these ecosystems change materially.
