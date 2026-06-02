> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us improve it.

# GitHub Copilot content exclusions

A consolidated guide to how file exclusion works in GitHub Copilot, what guarantees exist, and how government teams should configure exclusions based on their security classification.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[The three levels of content exclusion](#the-three-levels-of-content-exclusion)

[How content exclusion works technically](#how-content-exclusion-works-technically)

[What exclusion does and does not prevent](#what-exclusion-does-and-does-not-prevent)

[Where content exclusion does not apply](#where-content-exclusion-does-not-apply)

[The .gitignore question](#the-gitignore-question)

[The .copilotignore question](#the-copilotignore-question)

[Pattern syntax](#pattern-syntax)

[Known limitations](#known-limitations)

[Audit logs and change tracking](#audit-logs-and-change-tracking)

[Certainty levels by mechanism](#certainty-levels-by-mechanism)

[Decision matrix for government teams](#decision-matrix-for-government-teams)

[Recommended exclusion patterns](#recommended-exclusion-patterns)

[Defence-in-depth principle](#defence-in-depth-principle)

[Related guidance](#related-guidance)

## Purpose

This guide explains how GitHub Copilot content exclusion mechanisms work, how they differ from each other, and what level of certainty engineers and security teams can have that excluded files are not being sent to GitHub's servers.

Multiple documents in this repository refer to content exclusions without explaining the underlying technical mechanisms, the significant limitations, or the critical gaps where exclusion does not apply. This guide addresses those gaps directly and provides an honest assessment of what each mechanism guarantees.

## Who this is for

This guide is for:

- engineers working on government codebases who want to understand whether excluded files are genuinely protected
- security and compliance teams making risk acceptance decisions about Copilot use
- engineering managers and technical leads configuring content exclusions for their teams
- administrators responsible for organisation or enterprise Copilot settings

You should already be familiar with basic GitHub Copilot usage. For setup and safe usage guidance, see the [safe usage guidance: prototyping vs production](safe-usage-prototyping-vs-production.md).

Content exclusions require a Copilot Business or Copilot Enterprise plan. They are not available on Copilot Free, Individual, or Pro.

## The three levels of content exclusion

GitHub Copilot content exclusions can be configured at three levels. These operate independently and combine together — a file excluded at any level is excluded across all applicable users.

### Enterprise-level exclusions

Enterprise owners configure these settings via GitHub Enterprise settings under AI controls > Copilot > Content exclusion.

Rules set at enterprise level apply to all Copilot users in the enterprise, regardless of which organisation allocated their seat.

Use enterprise-level exclusions for patterns that should be universally excluded across your entire GitHub Enterprise. For example, credential file patterns and environment files.

### Organisation-level exclusions

Organisation owners configure these settings via organisation settings under Copilot > Content exclusion.

Rules set at organisation level apply to users who were allocated a Copilot seat by that specific organisation. They do not apply to users whose seat was allocated by a different organisation in the same enterprise.

Organisation-level exclusions can cover:

- files in Git repositories belonging to the organisation
- files anywhere on the developer's local filesystem that are not under Git control

This is significant. Organisation-level exclusions are the only mechanism that can protect files outside of Git repositories.

### Repository-level exclusions

Repository administrators configure these settings via repository settings under Copilot > Content exclusion. Users with the Maintain role can view but not edit these settings.

Rules set at repository level apply to any Copilot user working within that specific repository. They only cover files within that Git repository, not files elsewhere on the filesystem.

### How the levels interact

All three levels combine. A user working in a repository receives the combined rules from all applicable levels.

1. Enterprise-level exclusions, if any.
2. Organisation-level exclusions from the organisation that allocated their seat.
3. Repository-level exclusions for the repository they are working in.

When you open a file in your IDE, the Copilot extension checks whether that file matches any pattern across all applicable levels. If it matches, the file is excluded.

There is no override mechanism where one level can re-include a file that a higher level has excluded.

## How content exclusion works technically

Understanding the technical mechanism is important for assessing the strength of the control.

### Client-side enforcement after server-side policy retrieval

Content exclusion is enforced client-side in the IDE extension, not server-side at GitHub's infrastructure. The process works as follows.

1. When you open a repository in your IDE, the Copilot extension sends the repository URL to GitHub's servers.
2. GitHub's servers return the applicable content exclusion policy for that repository, combining all relevant enterprise, organisation, and repository-level rules.
3. The IDE extension stores this policy locally and applies it for the duration of the session.
4. When you open or edit a file, the extension checks the file path against the local policy. If it matches an exclusion pattern, the file content is not sent to GitHub's servers.
5. Repository URLs used for policy lookup are not logged by GitHub.

The practical implication is that exclusion is enforced before file content leaves your machine. GitHub states that excluded file content is not transmitted to its servers.

However, because enforcement is in the IDE extension (not in GitHub's network infrastructure), this relies on the extension behaving as documented. There is no independent, externally verifiable guarantee at network level.

### Propagation delay

After you add or change content exclusion settings, it can take up to 30 minutes for the updated policy to reach IDEs where the settings are already loaded.

If you need changes to take effect immediately, you can manually reload:

- for Visual Studio Code, open the Command Palette, type `reload`, and select Developer: Reload Window
- for JetBrains and Visual Studio, close and reopen the application
- for Vim or Neovim, exclusions are fetched automatically each time you open a file

## What exclusion does and does not prevent

When a file is excluded, GitHub Copilot will not:

- offer inline code completions inside the excluded file
- use content from the excluded file to inform inline completions in other open files
- use content from the excluded file when responding to Copilot Chat queries
- include the excluded file in Copilot code review results on GitHub.com

GitHub states that content from excluded files is not sent to its servers for any of these purposes.

### What exclusion does not prevent

Exclusion does not prevent Copilot from using semantic information that the IDE itself provides indirectly. Examples include:

- type information inferred from an excluded file (for example, if you hover over a symbol defined in an excluded file, the IDE may provide a type definition that Copilot can see)
- hover-over definitions for symbols used in included files but defined in excluded files
- build configuration information that the IDE surfaces from excluded files

This is a documented limitation from GitHub. The exclusion prevents direct file access, not indirect semantic exposure via IDE language services.

Exclusion also does not hide:

- file names and directory paths — Copilot may be able to infer the existence of excluded files from import statements or directory listings, even if it cannot read their content
- the fact that a file exists (though not its content)

## Where content exclusion does not apply

This is the most important section of this guide for government teams assessing risk. Content exclusion has significant gaps that must be understood before treating it as a reliable control.

### Agent mode in IDE Chat

Content exclusion is not supported in agent mode in VS Code and other IDEs.

In agent mode, Copilot can autonomously read, edit, and reference files. This includes files listed in content exclusion settings. The exclusion rules are not applied in this mode.

This is confirmed in GitHub's documentation:

> "Content exclusion is currently not supported in Edit and Agent modes of Copilot Chat in Visual Studio Code and other editors."

If your repository contains files protected by content exclusion settings, those files are not protected during agent mode sessions. Your team should be aware of this gap.

### Edit mode in IDE Chat

Content exclusion is also not supported in edit mode in Copilot Chat. The same limitation applies as for agent mode.

### Copilot CLI

Content exclusion does not apply to Copilot CLI (the terminal-based interface). Files accessible in the terminal are accessible to Copilot CLI regardless of content exclusion settings.

### Copilot cloud agent (GitHub.com)

Copilot cloud agent does not account for content exclusions. GitHub's documentation states:

> "Copilot cloud agent doesn't account for content exclusions. Content exclusions allow administrators to configure Copilot to ignore certain files. When using Copilot cloud agent, Copilot will not ignore these files, and will be able to see and update them."

The Copilot cloud agent, also called the coding agent, runs in a GitHub Actions-powered environment. It can read, modify, and commit files across the repository. Any file exclusion policy you have configured is not enforced when the cloud agent is performing a task.

Do not use the cloud agent in repositories containing OFFICIAL-SENSITIVE files unless all content in the repository can be safely accessed by the agent.

### Copilot Coding Agent

The Copilot Coding Agent (which can autonomously resolve issues and create pull requests) is subject to the same limitation as the cloud agent. Content exclusions are not enforced.

### Summary of where exclusion applies

| Copilot feature | Content exclusion enforced? |
|---|---|
| Inline completions (IDE) | Yes |
| Copilot Chat — Ask mode (IDE) | Yes |
| Copilot Chat — Edit mode (IDE) | No |
| Copilot Chat — Agent mode (IDE) | No |
| Code review (GitHub.com) | Yes |
| GitHub.com Copilot Chat | Yes (public preview) |
| GitHub Mobile | Yes (public preview) |
| Copilot CLI | No |
| Copilot cloud agent | No |
| Copilot Coding Agent | No |

## The .gitignore question

A common question is whether files listed in `.gitignore` are automatically excluded from Copilot.

They are not.

`.gitignore` controls what Git tracks. It has no documented relationship with GitHub Copilot content exclusions. GitHub's content exclusion documentation makes no mention of `.gitignore` as an exclusion mechanism.

In practice:

- a file listed in `.gitignore` that has never been committed to Git will not appear in Git context, but if it is open in your IDE, Copilot may still read it during inline completions and Chat sessions
- a file listed in `.gitignore` that has been committed to Git (a common misconfiguration) is fully tracked by Git and fully accessible to Copilot — the `.gitignore` entry has no effect on files already tracked
- a file not committed and not open in your IDE is less likely to be read by Copilot, but this is a side-effect of it not being accessible, not a deliberate exclusion mechanism

Do not treat `.gitignore` entries as Copilot exclusions. If you want a file excluded from Copilot, you must configure it explicitly in content exclusion settings.

## The .copilotignore question

Some older documentation and community resources reference a `.copilotignore` file as a way to exclude files from Copilot at the project level.

`.copilotignore` is not a currently documented feature in GitHub's official documentation.

GitHub's content exclusion documentation describes only the enterprise, organisation, and repository settings mechanisms. There is no reference to `.copilotignore` in GitHub's current documentation. Whether it was previously supported and has been removed, or whether it was only ever a community convention, is unclear.

Do not rely on `.copilotignore` as a security control. There is no GitHub documentation confirming its current behaviour, when it was last changed, or whether it applies to all Copilot features. References to `.copilotignore` in safe usage guides across this repository should be treated as potentially unreliable pending official clarification from GitHub.

For reliable exclusion, use the content exclusion settings in repository, organisation, or enterprise settings.

## Pattern syntax

Content exclusion patterns use fnmatch notation (Ruby `File.fnmatch`), which is case-insensitive.

This is different from `.gitignore`'s pathspec syntax. The two formats are similar but not identical. Patterns that work in `.gitignore` may not behave the same way in content exclusion settings.

Common fnmatch patterns are shown in the table below.

| Pattern | What it matches |
|---|---|
| `*.env` | Any file named `.env` or ending in `.env` at any level |
| `**/.env` | `.env` files from all filesystem roots (Git and non-Git) |
| `/src/some-dir/kernel.rs` | The specific file at that path in this repository |
| `secrets.json` | Files called `secrets.json` anywhere in the repository |
| `secret*` | Files whose names begin with `secret` anywhere |
| `/scripts/**` | All files in or below the `/scripts` directory |
| `{server,session}*` | Files beginning with `server` or `session` |
| `*.m[dk]` | Files ending in `.md` or `.mk` |

For organisation-level settings, you can also reference specific repositories by URL. Files outside a repository can be excluded using the `"*":` prefix followed by the path pattern.

Patterns are evaluated case-insensitively. A pattern matching `README.md` will also match `readme.md`.

## Known limitations

The following limitations are documented by GitHub and should be factored into risk decisions.

### Semantic leakage via IDE

Copilot may use semantic information from excluded files if the IDE provides it indirectly. This includes type information, hover-over definitions, and general project properties such as build configuration.

For example, suppose an included file imports a function from an excluded file. The IDE language server may still resolve type information for that function. Copilot can observe this type information even though it cannot read the excluded file directly.

### Symbolic links

Content exclusions do not apply to symbolic links. If an excluded file is accessible via a symlink, Copilot may still read its content through the symlink.

### Remote filesystems

Content exclusions do not apply to repositories located on remote filesystems.

### Propagation delay

Changes to content exclusion settings can take up to 30 minutes to reach active IDE sessions.

### File names and directory structure are not hidden

Exclusion prevents file content from being sent. It does not prevent Copilot from observing that an excluded file exists. This can happen through import statements in included files, directory listings, or build output references.

### Tracked but gitignored files

If a file is listed in `.gitignore` but has already been committed to Git (tracked), it is fully accessible to Copilot. Content exclusion must be explicitly configured for such files.

### Conflict between inclusion and exclusion patterns

If you have both an exclusion and a re-inclusion pattern at different levels, there is no override mechanism. All exclusions combine (union), and there is no way to re-include a file excluded at a higher level. If any applicable rule excludes a file, it is excluded.

## Audit logs and change tracking

GitHub provides audit logging for changes to content exclusion settings. The `copilot.content_exclusion_changed` event is logged when any administrator changes exclusion settings at repository or organisation level.

Organisation owners can review this audit log to see who changed content exclusion settings and when.

What the audit log does not record:

- when a developer opened an excluded file
- when the Copilot extension attempted to access an excluded file
- whether an excluded file was accessed in agent mode or via the cloud agent

There is no per-access audit trail for content exclusions. Audit logging covers configuration changes, not access events.

## Certainty levels by mechanism

This section provides an honest assessment of what each mechanism guarantees, using three levels:

- 'GitHub states' — GitHub's documentation makes a direct claim about this behaviour
- 'Documented limitation' — GitHub's documentation explicitly notes a gap or limitation
- 'Not documented' — GitHub's documentation does not address this scenario

| Scenario | Certainty level | Basis |
|---|---|---|
| Excluded files not used in inline completions | GitHub states | Content exclusion documentation |
| Excluded files not used in Chat Ask mode | GitHub states | Content exclusion documentation |
| Excluded file content not sent to GitHub's servers | GitHub states | Content exclusion documentation |
| Exclusions not applied in Agent mode | Documented limitation | Content exclusion documentation |
| Exclusions not applied in Edit mode | Documented limitation | Content exclusion documentation |
| Exclusions not applied in Copilot CLI | Documented limitation | Referenced in exclusion how-to page |
| Exclusions not applied to Copilot cloud agent | Documented limitation | Cloud agent documentation |
| .gitignore providing Copilot exclusion | Not documented | No mention in GitHub exclusion docs |
| .copilotignore providing reliable exclusion | Not documented | Not present in current GitHub docs |
| Semantic information from excluded files blocked | Documented limitation | Content exclusion limitations section |
| Symlink-accessed excluded files blocked | Documented limitation | Content exclusion limitations section |
| Excluded files not indexed for Enterprise search | GitHub states | Follows from "content won't inform Chat responses" |
| Per-access audit trail for excluded files | Not available | Audit log only records config changes |

## Decision matrix for government teams

Use this matrix to determine which exclusion approach is appropriate based on your security classification and use case.

### OFFICIAL classification

For OFFICIAL work:

- configure content exclusions at organisation level for sensitive file patterns (credentials, environment files, keys)
- apply repository-level exclusions for any production configuration files
- content exclusion provides a reasonable additional control in combination with secret scanning and access controls
- agent mode and cloud agent can be used, with the understanding that content exclusion is not enforced in those modes
- treat exclusion as defence-in-depth, not as a primary control

### OFFICIAL-SENSITIVE classification

For OFFICIAL-SENSITIVE work:

- content exclusions should be configured at enterprise level for universal patterns and at organisation or repository level for specific sensitive files
- do not use agent mode (IDE) in repositories containing OFFICIAL-SENSITIVE files unless you are confident the agent can safely access all content
- do not use the Copilot cloud agent in repositories containing OFFICIAL-SENSITIVE files
- do not use Copilot CLI in sessions where OFFICIAL-SENSITIVE files may be in scope
- the absence of content exclusion enforcement in agentic modes means these modes cannot be used as a defence for OFFICIAL-SENSITIVE repositories
- consult your department's information governance team before using Copilot in any context involving OFFICIAL-SENSITIVE data

### Repositories containing credentials or secrets

Regardless of classification:

- secrets must not be committed to Git repositories
- if secrets have been committed, they are compromised and must be rotated
- content exclusions provide a residual control for configuration files that reference secrets but should not be treated as a substitute for not committing secrets
- enable GitHub secret scanning and push protection as the primary control

### Monorepos with mixed classification levels

For monorepos where different directories have different sensitivity levels:

- configure repository-level exclusions for the sensitive subdirectories (for example, `/config/production/**`, `/secrets/**`)
- be aware that directory structure and file names are not hidden — only file content
- agent mode and cloud agent limitations apply to the entire repository, not just the sensitive directories
- consider whether a monorepo is the right structure if you need strong isolation between classification levels

## Recommended exclusion patterns

The following patterns are recommended for government teams. These should be configured at organisation or enterprise level.

### Credentials, keys, and secrets

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
**/.env.*
**/secrets.json
**/secrets/**
**/keys/**
```

### Application configuration files with sensitive values

```
**/config/production.*
**/config/secrets.*
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

### Infrastructure state and vault files

```
**/terraform.tfstate
**/terraform.tfstate.backup
**/.terraform/**
**/ansible/vault/**
**/ansible/group_vars/*/vault
```

### Dependencies and package caches (to reduce noise)

```
node_modules/**
**/__pycache__/**
**/*.egg-info/**
```

These patterns use fnmatch syntax as described in the [pattern syntax section](#pattern-syntax).

## Defence-in-depth principle

Content exclusion should be treated as one layer of a defence-in-depth approach, not as a sole control.

Take the following steps to manage content exclusion risk:

- do not commit sensitive data to repositories — content exclusion is not a mitigation for committed sensitive data
- enable push protection and secret scanning to prevent secrets from entering repositories in the first place
- configure content exclusions for configuration files that are legitimately in repositories but should not inform AI suggestions
- document any team decision to use agent mode or cloud agent in a sensitive repository, and note this in the project risk register
- review repository access controls — content exclusion does not replace appropriate access restrictions

Whether excluded files are genuinely not sent to GitHub's servers depends on the Copilot feature in use.

For inline completions and Copilot Chat in Ask mode, GitHub states that excluded file content is not sent. For agent mode, edit mode, CLI, and the cloud agent, content exclusion is explicitly not enforced.

Security teams cannot rely on content exclusion alone to make a defensible risk acceptance statement for OFFICIAL-SENSITIVE data. Exclusion should be documented as one control in a broader set, with explicit acknowledgement of the agentic mode gap.

## Related guidance

[Safe usage guidance: prototyping vs production](safe-usage-prototyping-vs-production.md)

[Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot), GitHub documentation

[Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion), GitHub documentation

[Reviewing changes to content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes), GitHub documentation

[About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent), GitHub documentation

[GitHub Copilot Trust Centre](https://copilot.github.trust.page/faq)

[Base guardrails](../../governance/guardrails-base.md)

[GitHub enterprise AI controls](../../governance/github-enterprise-ai-controls.md)