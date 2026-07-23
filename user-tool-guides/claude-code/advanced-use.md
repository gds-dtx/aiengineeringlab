> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Advanced use of Claude Code

## Purpose

This guide covers advanced Claude Code usage including better prompting, context management, and security practices. Use this guide once you are comfortable with the basics.

For customisation through CLAUDE.md files, skills, hooks and Model Context Protocol (MCP) integration, read the [customisation guide](customisation-guide.md).

## Who this is for

This guide is for:

- engineers experienced with Claude Code basics
- teams wanting to use Claude Code more effectively and securely

## What this guide covers

This guide focuses on:

- writing better prompts for complex tasks
- managing context and long-running work
- comprehensive security practices

## Contents

[Before you start](#before-you-start)

[Write better prompts for complex tasks](#1-write-better-prompts-for-complex-tasks)

[Manage context and long-running work](#2-manage-context-and-long-running-work)

[Security](#3-security)

## Before you start

This guide assumes you have:

- completed the [getting started guide](getting-started.md)
- used Claude Code for basic tasks
- an understanding of your project structure and workflows

If you are new to Claude Code, start with the [getting started guide](getting-started.md).

## 1. Write better prompts for complex tasks

Better prompts lead to better results. Claude Code works best when you provide clear context and specific requirements.

Read more about [writing effective prompts for Claude](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview).

### Be specific and provide context

Describe what you want to achieve, include relevant technology details, and specify constraints.

#### Less effective

> 'Create a function to process data'

#### More effective

```
Create a TypeScript function that:

- reads CSV files from an uploads directory
- validates UK postcodes and National Insurance numbers
- filters out records with missing required fields
- returns a list of valid records and a list of validation errors
- handles large files efficiently using streams

Context: Node.js 20, using fs/promises and csv-parser library
```

### Use iterative refinement

Build complexity gradually rather than asking for everything at once:

```
First: 'Create a function to validate postcodes'
Then: 'Add support for all UK postcode formats including BFPO'
Then: 'Add error messages that specify which format rule failed'
Then: 'Add unit tests including edge cases'
```

### High-value use cases

Based on research with engineers, you can save the most time by using Claude Code for:

- codebase exploration to understand unfamiliar projects quickly
- stack trace analysis to paste error messages for diagnosis
- test case generation for comprehensive test suites quickly
- refactoring existing code to modernise and improve legacy code
- learning new techniques to understand unfamiliar patterns
- code documentation to generate docstrings and comments

For detailed prompt engineering techniques and strategies, see the [prompt engineering playbooks](../../playbooks/prompt-engineering/prompt-engineering-index.md).

## 2. Manage context and long-running work

Effective strategies for working on complex tasks that fill your context window or take extended time.

### Keep context focused

#### What and when

Context management prevents Claude's conversation history from becoming too large. Monitor and manage your context window to maintain performance.

Use context management when:

- working on long-running features that span hours or days
- switching between different areas of the codebase
- responses become noticeably slower
- you want to preserve specific decisions whilst clearing clutter

Read more about [context management](https://code.claude.com/docs/en/how-claude-code-works#context-management).

#### Monitor context usage

Check current usage:

```
/context
```

A coloured grid shows how much context you consume. Aim to keep usage below 70 per cent for optimal performance.

#### Compact strategically

Use `/compact` to summarise history whilst preserving important details:

```
/compact
```

You should compact:

- when context usage exceeds 70%
- after completing a major feature
- before starting unrelated work
- when responses become slower

#### Focused compacting

Preserve specific topics:

```
/compact focus on authentication changes and database schema decisions
```

#### Clear context

Use `/clear` for a fresh start:

```
/clear
```

Clear context when:

- starting completely different work
- context is filled with irrelevant information
- the conversation has gone off track

#### Proactive management strategies

Manage context proactively by:

- committing frequently, as each commit creates a natural boundary
- compacting at milestones, including after features, fixes, or merges
- clearing between tasks when switching to unrelated work
- monitoring regularly by checking `/status` for token usage

### Break complex tasks into steps

#### What and when

Agent orchestration lets you decompose complex work into incremental steps with review points between each. Use it when:

- refactoring touches multiple files and requires coordination
- migrations need careful sequencing
- you want to review approach before full execution
- the task is too complex to complete in one pass

#### How to use

Ask Claude to create a plan first, then execute incrementally:

```bash
claude "I need to migrate our authentication from JWT to httpOnly cookies. Create a migration plan before starting."
```

Review the plan, then execute incrementally:

```bash
> Execute step 1 of the plan. After completing, run tests and commit if they pass.
```

Review the changes, then continue:

```bash
> Execute step 2
```

Read more about [exploring before implementing](https://code.claude.com/docs/en/how-claude-code-works#explore-before-implementing).

### Run tasks in parallel

#### What and when

Background processes let you run long-running tasks whilst continuing other work in your main session. Use them when:

- running test suites or coverage reports
- performing large-scale refactoring
- generating documentation across the codebase
- any task takes more than a few minutes

#### How to use

Start tasks in background mode and check their status:

```bash
# Start background task
claude --background "Run full test suite and generate coverage report in HTML format"

# Continue working in main session
claude "Refactor the claim validation logic"

# Check background tasks
claude
> /background
```

Read more about [background mode](https://code.claude.com/docs/en/cli-reference#background-mode).

## 3. Security

Comprehensive security practices for using Claude Code safely in government environments.

### Before you start

You must always:

- review all generated code before committing
- follow your organisation's security policies
- understand your project's security classification (OFFICIAL or OFFICIAL-SENSITIVE)

Read more about [security in Claude Code](https://code.claude.com/docs/en/security).

### Never include in prompts

In prompts, never include:

- API keys, passwords, authentication tokens
- real citizen data or personal information
- production connection strings or database credentials
- security configuration details
- SSH keys, certificates or cryptographic material

Instead, use:

- placeholder values: `<API_KEY>`, `<DATABASE_URL>`, `<SECRET>`
- synthetic test data following realistic formats
- generic descriptions: 'authentication endpoint', 'payment gateway'

Example of incorrect use:

```
'Update the API call to use key abc123-xyz789-prod'
```

Example of correct use:

```
'Update the API call to use key from environment variable API_KEY'
```

### Content exclusions

Configure `.aiexclude` or rely on `.gitignore` patterns to exclude sensitive files from Claude Code access.

Exclude files including:

- `.env` files and environment configurations
- `secrets/` directories
- service account JSON files
- production configuration files
- SSH keys and certificates

Create `.aiexclude` in your project root:

```
.env
.env.*
secrets/
*.pem
*.key
config/production.json
terraform.tfstate
```

### Security-critical code review

For authentication, authorisation, or citizen data handling, add specific security checks to your review prompt.

Example prompt:

```bash
claude "Review @src/auth/jwt.ts for security issues. Check:
- token generation uses sufficient randomness
- expiry times are appropriate
- token verification is correct
- no timing attacks in comparison
- secrets are properly protected

Provide specific concerns with code references."
```

Add review markers in code:

```typescript
// Generated by Claude Code - SECURITY REVIEW REQUIRED
// CHECK: Token expiry appropriate?
// CHECK: Constant-time comparison used?
// CHECK: Rate limiting in place?
```

### Security incident response

Use the followin steps if you discover a security issue in Claude Code generated code.

1. Do not commit the code to version control.
2. Report immediately to your security team using your organisation's incident process.
3. Document the issue by saving the conversation and noting what Claude Code generated.
4. Alert your team to check their recent Claude Code usage for similar issues.

For detailed incident response procedures, see the [incident response playbook](../../governance/incident-response-playbook.md).

### Security in team environments

When using Claude Code in government teams:

- share security configurations (.aiexclude) in version control
- document security review requirements for artificial intelligence (AI)-generated code
- maintain clear escalation paths for security incidents
- regularly review usage patterns for compliance
- conduct security awareness training on AI tool risks

## Further reading

To deepen your understanding and customise Claude Code for your workflows, see the [customisation guide](customisation-guide.md). It covers configuring project-specific context with CLAUDE.md files, creating custom slash commands, setting up skills, implementing hooks, and integrating external tools via Model Context Protocol (MCP) servers.
