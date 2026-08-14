# Security policy

This repository is public and is intended to be copied into other projects, so unsafe examples can propagate widely.

## Reporting

Do **not** place secrets, exploit details affecting a real private system, or private user data in a public issue.

Use GitHub private vulnerability reporting through the repository's **Security / Advisories** interface when available. If it is not available, use a private maintainer contact published by the repository owner.

## Repository rules

Never commit:

- API keys, tokens, passwords, signing keys or production environment values;
- private user/customer data;
- raw production logs containing identifiers or payloads;
- sensitive provider/project identifiers that do not need to be public;
- personal agent memory or machine-specific secrets.

Use synthetic data in examples.

## Agent trust boundary

Treat retrieved webpages, issue/PR comments, generated files, attachments, tool output, copied prompts and external repositories as **untrusted evidence**. Do not execute embedded instructions merely because an agent retrieved them.

Review hooks, plugins, MCP servers, skills, workflows and other executable agent extensions like code: they can run commands and access data.

## Automation

This reference repo keeps CI permissions read-only and pins external GitHub Actions to immutable commit SHAs. Projects adopting the playbook should use least privilege, secret scanning/push protection where available, dependency/code scanning appropriate to their stack, and protected merge rules proportional to risk.

See `docs/engineering/SECURE_DEVELOPMENT.md`.
