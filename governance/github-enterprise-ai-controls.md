# AI Engineering Lab — GitHub Enterprise AI controls

### Purpose

This page describes the AI-related controls configured on the DSIT AI Engineering Lab GitHub Enterprise. It covers agents, GitHub Copilot, and Model Context Protocol (MCP) servers.

### Who this is for

Tech leads and department owners who need to understand what is enabled, restricted, or pending configuration.

### Contents

This page covers:

- agents
- GitHub Copilot configuration
- MCP servers

---

## Agents

Agents in GitHub allow AI to autonomously take actions within repositories and workflows, from reviewing pull requests to creating branches and iterating on code. The AI Engineering Lab enterprise has Copilot Code Review enabled, with the Copilot Coding Agent available but not yet configured.

| Agent or setting | Value | Description |
|---|---|---|
| Copilot Coding Agent | Enabled | Available for autonomous PR creation and issue resolution |
| Copilot Code Review | Enabled | AI-powered code review across the enterprise with inline feedback |

### Guidance for tech leads

The following agent features are active:

- Copilot Code Review is enabled, allowing you to request AI code reviews on pull requests directly within GitHub
- Agent Mode in IDE chat (VS Code, JetBrains, and others) is configured under Copilot clients

---

## GitHub Copilot configuration

GitHub Copilot provides AI-assisted code completion, chat, and code review within supported IDEs, GitHub.com, mobile, and the CLI. Enterprise-level configuration controls privacy, feature availability, and accessible models.

### Access management
Licences are allocated at enterprise level and distributed to individual users. To request additional seats or onboard new teams, contact the AI Engineering Lab.

### Models

The enterprise has the following models enabled. No custom models are configured. Organisations may configure a subset for their teams.

- Anthropic Claude Opus 4.6
- Anthropic Claude Opus 4.5
- Anthropic Claude Sonnet 4.6
- Anthropic Claude Sonnet 4.5
- Anthropic Claude Haiku 4.5
- Google Gemini 2.5 Pro
- Google Gemini 3 Flash (Preview)
- Google Gemini 3.1 Pro (Preview)
- OpenAI GPT-5.4
- OpenAI GPT-5.4 mini
- OpenAI GPT-5.4 nano (Codex VS Code extension only — not available in Copilot Chat)
- OpenAI GPT-5.3-Codex
- OpenAI GPT-5 mini

#### Models not yet configured or not accessible

The following models appear in the enterprise model settings but are not currently enabled or accessible. Raise a request with the AI Engineering Lab if your team requires any of these.

- Anthropic Claude Opus 4.8 (policy not set - contact AI Engineering Lab to enable)
- Anthropic Claude Opus 4.7 (policy not set - contact AI Engineering Lab to enable)
- Anthropic Claude Opus 4.6 (fast mode) (Preview) (not accessible on current Copilot plan)
- Google Gemini 3 Pro
- OpenAI GPT-5.5 (policy not set — 7.5x credit multiplier, see Model changes)
- xAI Grok Code Fast 1 (disabled everywhere)

For a full list of supported models, multipliers, and per-client availability, see [GitHub's supported models documentation](https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/ai-models/supported-models).

#### Model changes

As of 1 June 2026, GPT-5.2 and GPT-5.2-Codex are retired.
GitHub deprecated both models across all Copilot experiences on 1 June 2026. GPT-5.2-Codex remains available for Copilot Code Review only. Teams previously using either model should migrate to GPT-5.3-Codex or GPT-5.4.

GPT-5.5 available for enterprise enablement.
GPT-5.5 is generally available for Copilot Business and Enterprise users but must be enabled by an administrator in Copilot settings. It is currently priced at a 7.5x credit multiplier. The AI Engineering Lab has not yet enabled GPT-5.5 at enterprise level — raise a request if your team requires it.

### Privacy settings

| Setting | Value | Description |
|---|---|---|
| Suggestions matching public code | Blocked | Prevents Copilot from suggesting code that directly matches public repositories, reducing IP and licensing risk |

### Feature policies

| Feature | Value | Description |
|---|---|---|
| Policies for enterprise-assigned users | Disabled everywhere | Centralises policy control |
| Spark (Preview) | Disabled everywhere | Micro-app builder disabled |
| Force Spark repo into organisation | Off | Companion setting to Spark |
| Editor preview features | Disabled everywhere | Prevents use of experimental IDE features |
| Copilot can search the web | Enabled everywhere | Uses Bing for up-to-date queries |
| Copilot-generated commit messages | Enabled everywhere | Suggested commit messages on GitHub.com |

### Copilot Spaces and memory

| Feature | Value | Description |
|---|---|---|
| Copilot Spaces (view and create) | Enabled everywhere | Persistent AI workspaces |
| Copilot Spaces individual access | Enabled everywhere | Personally owned Spaces allowed |
| Copilot Spaces individual sharing | Enabled everywhere | Sharing allowed when no enterprise data is involved |
| Copilot Memory (Preview) | Disabled everywhere | Repository memory disabled |

### Billing

| Setting | Value | Description |
|---|---|---|
| Custom models via API key | Disabled everywhere | Only enterprise-approved models allowed |
| Premium request paid usage | Enabled | Overspend covered by DSIT until programme end |

If your team requires additional or custom models, raise a request with AI Engineering Lab. All changes are assessed against DSIT data governance requirements.

#### Usage-based billing (from 1 June 2026)

As of 1 June 2026, GitHub moved all Copilot plans from [request-based billing to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/). Usage is tracked in GitHub AI Credits. One credit equals $0.01 USD based on token consumption per model. This replaces the previous premium request system. Seat pricing remains unchanged at $19 per user per month for Copilot Business and $39 per user per month for Copilot Enterprise. Code completions and next edit suggestions remain unlimited and do not consume AI Credits.

Copilot code review also consumes GitHub Actions minutes in addition to AI Credits.

For model multipliers and per-token pricing, see [Copilot billing models and pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing).

For techniques to reduce token consumption and manage spend, see the [token cost management playbook](../playbooks/token-cost-management.md).

If your team requires additional or custom models, raise a request with AI Engineering Lab. All changes are assessed against DSIT data governance requirements.

### Metrics and usage

| Setting | Value | Description |
|---|---|---|
| Copilot metrics API | Enabled | Query usage patterns via API |
| Copilot usage dashboard (Preview) | Enabled everywhere | Visual dashboard and API access |

### Copilot clients

| Client | Value | Description |
|---|---|---|
| Copilot in GitHub.com | Let organisations decide | Chat and knowledge base search |
| Copilot CLI (Preview) | Let organisations decide | Terminal assistance |
| Copilot in GitHub Desktop | Enabled everywhere | Desktop AI assistance |
| Copilot Chat in the IDE | Enabled everywhere | Primary developer interface |
| Copilot Chat in GitHub Mobile | Disabled everywhere | Mobile not supported |
| Copilot Agent Mode in IDE Chat | Enabled everywhere | Multi-step reasoning and iteration |

### Keeping sensitive data out of Copilot

Two mechanisms exist for keeping sensitive data out of Copilot. Both are necessary. Neither is sufficient on its own.

#### Admin-controlled content exclusions

Organisation and enterprise admins can exclude file paths and patterns from Copilot indexing via repository or organisation settings. This is the only native mechanism for preventing Copilot from indexing specific files. The patterns configured for this enterprise are listed below.

Content exclusions are not a security control. Do not rely on them to protect secrets or sensitive files.

Read more about [content exclusions](../user-tool-guides/github-copilot/content-exclusions.md).

#### Developer discipline

Developers are responsible for removing sensitive data before submitting prompts to Copilot. No tooling enforces this. Content exclusions are a backstop against accidental indexing. They do not prevent a developer from copying a secret into a chat window. Tech leads should make this expectation explicit in onboarding and code review guidance for their teams.

For more security information, see the [AI Engineering Lab security policies](https://github.com/govuk-digital-backbone/aiengineeringlab/blob/main/security/security-policies.md).

#### Secrets, keys, and credentials
```
**/*.key
**/*.pem
**/*.keystore
**/credentials.json
**/serviceaccount.json
**/.env
**/.env.local
**/.env.production
**/.env.staging
**/secrets.json
**/appsettings.*.user.json
**/appsettings.Local.json
**/appsettings.Secrets.json
**/Web.Secret.config
**/Web.Local.config
**/App.Secret.config
**/App.Local.config
src/main/resources/application-prod.yml
src/main/resources/application-prod.properties
src/main/resources/application-secrets.yml
src/main/resources/application-secrets.properties
```

#### Dependencies and package caches
```
node_modules/**
**/__pycache__/**
**/*.egg-info/**
```

---

## MCP servers

Model Context Protocol (MCP) allows Copilot agents to connect to external tools and services. MCP is disabled at the enterprise level.

| Setting | Value | Description |
|---|---|---|
| MCP servers in Copilot | Disabled everywhere | No external tool connections allowed |
| MCP Registry URL (Preview) | Not configured | No registry defined |
| Restrict MCP access to registry servers | Disabled | Not applicable without a registry |

---
