# Agent interoperability

**Goal:** one canonical repository contract, discovered by many coding-agent ecosystems without copying policy into vendor-specific files.

Canonical shared owner: root `AGENTS.md`.

## Compatibility matrix

| Agent/tool | Official project instruction surface | Repo strategy |
|---|---|---|
| OpenAI Codex | `AGENTS.md` | native; no adapter |
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

Several modern coding-agent tools either support `AGENTS.md` directly or support importing a shared file. For tools that do not, most can load a read-only conventions/instruction file.

The portable unit is therefore **plain Markdown project policy plus repository artifacts**, not one vendor's orchestration format.

## Scoping

Use nested/path-specific instructions only when the narrower directory/file type has a real invariant that should not consume global context.

Rules for scoped instructions:

1. contain only the delta from parent policy;
2. link to/assume shared authority instead of restating it;
3. remain version-controlled if shared by the team;
4. keep personal preferences in user/local config;
5. test discovery if the rule is load-bearing.

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
