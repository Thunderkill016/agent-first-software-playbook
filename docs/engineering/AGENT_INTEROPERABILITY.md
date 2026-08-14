# Agent interoperability

**Goal:** one canonical repository contract, discovered by many coding-agent ecosystems without copying policy into vendor-specific files.

Canonical shared owner: root `AGENTS.md`.

`AGENTS.md` is also maintained as a simple open format for coding-agent guidance. The portable design goal is therefore a plain, predictable repository contract rather than a proprietary orchestration format.

## Compatibility matrix

| Agent/tool | Official project instruction surface | Repo strategy |
|---|---|---|
| OpenAI Codex | `AGENTS.md` | native; no adapter |
| Google Jules | root `AGENTS.md` | native; no adapter |
| GitHub Copilot | `AGENTS.md`, `.github/copilot-instructions.md`, path instructions depending on feature | thin Copilot file points to `AGENTS.md`; avoid policy duplication |
| Claude Code | `CLAUDE.md`; supports `@AGENTS.md` import | `CLAUDE.md` imports canonical file |
| Gemini CLI | `GEMINI.md`; supports `@file` imports/configurable context filename | `GEMINI.md` imports canonical file |
| Cursor | project rules and root `AGENTS.md` | use native `AGENTS.md` unless scoped Cursor-only behavior is truly required |
| Windsurf | workspace rules and `AGENTS.md` | use native `AGENTS.md`; subdirectory rules only for real scoped deltas |
| Cline | `.clinerules` plus native `AGENTS.md` compatibility | use native `AGENTS.md`; project command permissions remain tool config |
| Aider | read-only convention files via config/CLI | `.aider.conf.yml` loads `AGENTS.md` read-only |
| Other repository-capable agent | varies | explicitly instruct it to read root `AGENTS.md`; add a thin adapter only after official docs justify it |

## Design rule

```text
agent/tool discovery
      ↓
thin adapter only if required
      ↓
AGENTS.md
      ↓
context router
      ↓
relevant current authority + executable truth
```

Do not make tool adapters a second policy layer.

## Why this works

Multiple modern coding-agent tools support `AGENTS.md` directly, and others can import or load a shared repository file. The AGENTS.md open-format project exists specifically to provide a predictable, vendor-neutral place for agent guidance.

The portable unit is therefore **plain Markdown project policy plus repository artifacts**, not one vendor's orchestration format.

## Scoping

Use nested/path-specific instructions only when the narrower directory/file type has a real invariant that should not consume global context.

Rules for scoped instructions:

1. contain only the delta from parent policy;
2. link to/assume shared authority instead of restating it;
3. remain version-controlled if shared by the team;
4. keep personal preferences in user/local config;
5. test discovery if the rule is load-bearing.

This also reduces known configuration-smell families such as context bloat and conflicting/duplicated instructions. Empirical studies can inform this design, but they do not replace repository-specific evidence.

## Hard guarantees vs guidance

Instruction files are context. They are not a security boundary.

If an action must be prevented or forced, prefer:

- tool permissions/sandbox/deny rules;
- schema/types;
- tests/lint/policy scripts;
- protected branches/rulesets;
- CI;
- provider controls.

Use instructions for judgment/navigation, not as the only barrier to destructive behavior.

## Personal and automatic memory

Do not commit a tool's personal/automatic memory simply because it is useful locally.

Promote a discovered lesson into the repository only when it becomes reviewed project truth, and put it in the correct owner layer. This avoids one user's corrections/preferences silently becoming universal policy.

## Environment interoperability

Instruction discovery alone is not enough. A remote or sandboxed agent also needs a reproducible development environment.

Useful cross-agent properties are:

- explicit runtime/tool versions;
- deterministic setup/run/verify commands;
- isolated task environments;
- synthetic fixtures;
- observable logs/browser/runtime state;
- no hidden dependence on a developer workstation.

Google Jules, for example, runs tasks in short-lived VMs and can use repository environment setup. The portable project pattern is to make setup itself repository-readable rather than relying on tool-specific hidden state.

## Unknown/new tools

When adding support for another agent:

1. read its current official docs;
2. identify project-level instruction discovery and precedence;
3. determine whether it already supports `AGENTS.md`;
4. add the smallest adapter needed;
5. ensure no shared policy is duplicated;
6. update this matrix + references;
7. add a mechanical adapter check when discovery becomes load-bearing.

Never add speculative adapter files for tools the project does not use or validate.
