> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Getting started with Claude Code

## Purpose

This guide walks you through installing Claude Code, logging in, and using it for daily development tasks. By the end, you will understand how to use Claude Code for common workflows like writing features, debugging issues, and working with Git.

## Who this is for

This guide is for:

- engineers new to Claude Code
- engineers wanting to integrate artificial intelligence (AI) assistance into their workflow
- teams setting up Claude Code for the first time

## Contents

[Before you start](#before-you-start)

[Installation and setup](#installation-and-setup)

[Daily coding workflows](#daily-coding-workflows)

[Code quality and review](#code-quality-and-review)

[Use Claude Code safely and responsibly](#use-claude-code-safely-and-responsibly)

[Troubleshooting](#troubleshooting)

[Further reading](#further-reading)

## Before you start

Before installing Claude Code, you should understand how access and data handling work.

Most government departments use Claude through centrally managed licensing.

You should know:

- your department controls licensing through the AI Engineering Lab
- if you don't have access you should contact your team lead
- your project's security classification (OFFICIAL or OFFICIAL-SENSITIVE, where SENSITIVE means handling security-sensitive information)
- that Node.js 18 or later is required for terminal installation
- your team's coding standards and review processes

See the [Claude Code documentation](https://code.claude.com/docs) for full reference material. Anthropic publishes its [privacy policy](https://www.anthropic.com/privacy) and security practices on the [Anthropic Trust Center](https://trust.anthropic.com/).

## Installation and setup

For detailed installation instructions, authentication setup, and AI Engineering Lab LiteLLM configuration, see the [Claude Code setup guide](setup-guide.md).

The setup guide covers:

- installing Claude Code on macOS, Windows, and Windows Subsystem for Linux (WSL)
- managed device installation through Company Portal or Intune
- configuring Claude Code with the AI Engineering Lab LiteLLM endpoint
- VS Code extension configuration
- application programming interface (API) key lifecycle and renewal
- troubleshooting common installation issues

## Reviewing Claude's work

You are responsible for all code you commit. Claude's suggestions are not pre-approved.

### Review carefully before accepting

Claude Code shows you proposed changes before making them. Check that suggestions:

- follow your project's existing patterns
- include proper error handling
- match your team's coding standards

### Common issues to watch for

You should look out for:

- assumptions made without asking for clarification
- security-critical code without detailed explanation
- unnecessary complexity
- changes outside the specified scope

### Always get human review

You should always get a human review for:

- authentication and authorisation logic
- cryptographic operations
- database schema changes
- identity and access management (IAM) configurations
- code handling citizen data

Use `/permissions` to control what Claude can do without asking.

## Using Claude Code

Once Claude Code is running, you can use it for development tasks.

You can use Claude Code to:

- understand your codebase by asking questions about structure and dependencies
- make code changes by describing what you want in natural language
- work with Git through conversational commands
- debug issues by providing error context

### First tasks to try

Ask about your project:

```bash
> what does this project do?
```

Make a small change:

```bash
> add error handling to the login function
```

Use Git operations:

```bash
> commit my changes with a descriptive message
```

Claude Code always asks for permission before modifying files. Use `/permissions` to configure approval preferences.

For detailed installation guidance and troubleshooting, see the [installation documentation](https://code.claude.com/docs/en/setup). For a comprehensive walkthrough with additional examples, see the [quickstart guide](https://code.claude.com/docs/en/quickstart).

## Daily coding workflows

Common development tasks and how to approach them with Claude Code. Your workflow depends on whether you are starting a new project or joining existing code.

Read more about [common workflows in Claude Code](https://code.claude.com/docs/en/common-workflows).

### Starting with a new project

When building a new service or feature from scratch, you should always follow these steps.

#### Writing new features

1. Describe your requirements clearly with technology context.

```bash
claude "Implement password reset using Node.js, Express, Prisma, and GOV.UK Notify. Token expires after one hour."
```

2. Refine the approach by adding constraints.

```
> Add rate limiting to prevent abuse
> Include audit logging for security events
> Follow existing patterns in src/auth/
```

3. Generate appropriate tests.

```bash
claude "Generate unit tests covering: valid token, expired token, invalid token, rate limit exceeded, email delivery failure"
```

4. Have Claude commit when satisfied.

```bash
claude "Review all changes, run tests, and commit with a conventional commit message if tests pass"
```

#### Implementing common patterns

For government services, you often need UK-specific patterns. Specify requirements clearly in your prompts.

Data validation:

```bash
claude "Create UK address validation with Zod schema. Support all postcode formats including British Forces Post Office (BFPO)"
```

API client:

```bash
claude "Generate GOV.UK Notify API client with retry logic. Include TypeScript types."
```

Database migrations:

```bash
claude "Create Prisma migration adding citizen_id field with indexing on citizen_id and updated_at"
```

### Joining an existing codebase

When taking over, assessing, or modernising an existing project, you should always follow these steps.

1. Do an initial assessment to understand the project at a high level.

```bash
cd /path/to/project
claude "What does this project do? What is the main purpose?"
claude "What technologies and frameworks does this project use?"
claude "Show me the main entry points and important directories"
```

2. Ask about specific areas you need to work with.

```bash
claude "Explain the authentication flow"
claude "Where is the database schema defined?"
claude "What external services does this integrate with?"
```

3. Generate project documentation by asking Claude to analyse the codebase and create a CLAUDE.md file, including:

- project purpose and structure
- technology stack and dependencies
- coding conventions and patterns
- important architectural decisions


```bash
claude
> /init
```

4. Review this file to understand how the project works and refine it by asking Claude to add missing information or correct inaccuracies.

5. Explore specific areas.

```bash
claude "Explain what @src/services/claims.ts does and how it fits into the application"
claude "Walk through the validateClaim function, focusing on validation logic"
claude "Show me all API endpoints related to user authentication"
claude "Where are environment variables configured and what do they control?"
```

6. Use the `@` symbol to reference specific files or directories.

```bash
claude "Review @src/auth/ and explain the authentication approach"
```

Read [using CLAUDE.md files to customise Claude Code](https://claude.com/blog/using-claude-md-files) for an introduction. For maintaining and customising CLAUDE.md files for your team, see the [customisation guide](customisation-guide.md#claudemd-files).

### Common scenarios for existing codebases

| Scenario | Approach |
|----------|----------|
| Understand complex function | `claude "Explain what this function does and identify any issues"` |
| Find feature implementation | `claude "Where is password reset implemented? Show me the complete flow"` |
| Identify technical debt | `claude "Review @src/services/ for outdated patterns and technical debt"` |
| Generate missing tests | `claude "Create unit tests for @src/auth/jwt.ts covering all edge cases"` |
| Update deprecated code | `claude "Modernise @src/utils/date.ts to use current JavaScript date handling"` |

### Common workflows

These workflows apply whether starting fresh or joining existing code.

#### Making changes with Plan Mode

1. When making significant changes, use Plan Mode to review the approach before Claude writes code.

2. To enable Plan Mode, press Shift+Tab before submitting your prompt.

```bash
# Press Shift+Tab, then type:
> Add UK postcode validation to the address form in @src/components/AddressForm.tsx. 
  Show me what needs to change before making edits.
```

3. Claude will create a plan.

The plan should show:
- files that need modification
- proposed approach and reasoning
- potential risks or impacts

4. Review the plan.

5. Approve to proceed with changes or provide feedback if you're not satisfied.

Plan Mode is particularly useful when:

- working with unfamiliar code
- making changes that affect multiple files
- implementing features where the approach is not obvious
- you want to understand the impact before committing

Read more about [plan mode in Claude Code](https://code.claude.com/docs/en/interactive-mode#plan-mode).

#### Making complex changes safely

For large changes or unfamiliar systems, use incremental approaches to reduce risk:

```bash
# Step 1: Generate tests first to document current behaviour
claude "Generate tests that capture the current behaviour of @src/claims/validator.ts"

# Step 2: Make small, focused changes
claude "Extract the validation logic into separate helper functions. No behaviour changes."

# Step 3: Verify nothing broke
claude "Run all tests and confirm they still pass"
```

This incremental approach:

- reduces risk when working with complex code
- provides verification at each step
- makes it easier to identify which change caused an issue
- builds confidence through small, tested improvements

Use this pattern when:

- refactoring complex functions
- modernising legacy code
- making architectural changes
- working on poorly documented systems
- implementing changes where side effects are unclear

For advanced strategies on context management and large-scale refactoring techniques, see the [Advanced use guide](advanced-use.md).

#### Debugging issues

1. Provide structured context including the error, relevant code, and environment details.

2. Follow up with specific diagnostic questions.

```bash
claude "TypeError: Cannot read property 'id' of undefined at ClaimService.findById (src/services/claim.ts:45)

Context: Node.js 20, Prisma object-relational mapping (ORM), tests pass individually but fail together.
Check @src/services/claim.ts and @tests/services/claim.test.ts"
```

3. Follow up with: 'Could this be a database connection issue?' or 'What test isolation improvements would prevent this?'.

## Code quality and review

You are responsible for all code you commit. Claude's suggestions are not pre-approved. Standard code review processes apply.

Read more about [best practices for using Claude Code](https://code.claude.com/docs/en/best-practices).

### Review checklist for AI-generated code

| Category | Check |
|----------|-------|
| Logic | Does it do what you intended? Are edge cases handled? |
| Security | No hardcoded secrets? Input validation present? No injection vulnerabilities? |
| Compliance | Handles citizen data appropriately? Meets GOV.UK standards? Web Content Accessibility Guidelines (WCAG) compliant? |
| Quality | Follows team standards? Has test coverage? Maintainable? |
| Performance | No obvious issues? Efficient queries? Reasonable resource usage? |

### Improving code quality iteratively

Use progressive refinement with the following steps.

1. Get basic working version: `claude "Implement the user registration endpoint"`.
2. Add error handling: `claude "Add comprehensive error handling with specific exceptions and structured logging"`.
3. Add validation: `claude "Add validation for all inputs including email format, password strength, and postcode format"`.
4. Optimise: `claude "Review for performance issues, especially database queries and email delivery"`.
5. Document: `claude "Add JSDoc comments following our standards"`.
6. Test: `claude "Generate unit tests covering happy path, validation errors, and edge cases"`.

### Code review with Claude

Use Claude to augment human code review. Specify what to look for in your prompt.

```bash
Example:
claude "Review @src/services/claim.ts for:
- security vulnerabilities
- GOV.UK standards compliance  
- code quality issues
- missing test coverage
- performance concerns

Provide specific file:line references and severity levels."
```

## Use Claude Code safely and responsibly

You are always responsible for the code you commit.

You should use Claude Code safely by:

- reviewing all generated code before committing
- checking for security issues, performance problems and accessibility barriers
- never including secrets, API keys or sensitive data in prompts
- following your organisation's coding standards and security policies

For detailed security practices, see the [advanced use guide](advanced-use.md#3-security).

## Troubleshooting

For help with common issues, read the [troubleshooting Claude Code guide](https://code.claude.com/docs/en/troubleshooting).

| Problem | Possible causes | What to try |
|---------|-----------------|-------------|
| Authentication fails | Credentials expired, wrong account type | Use `/login` to sign in again |
| Installation fails | Using deprecated npm method | Use Homebrew, PowerShell, or curl installer from Step 1 |
| Permission errors | Tool permissions not configured | Use `/permissions` to configure access |
| Context fills quickly | Too many files referenced, long conversation | Use `/compact` frequently, reference fewer files |
| Slow responses | Context nearly full, network issues | Check `/context`, compact if over 70 per cent |
| Commands not found | Node.js not in PATH, installation issue | Verify `node --version` and reinstall |
| Model Context Protocol (MCP) server fails | Server not installed, config error | Check `~/.claude/settings.json`, test server independently |
| Changes not as expected | Insufficient context, vague prompt | Provide specific instructions, reference relevant files |

For persistent issues, contact your team's champion or raise a support ticket.

## Further reading
The [advanced use guide](advanced-use.md) covers writing better prompts, managing context for long-running work, and security practices.

The [customisation guide](customisation-guide.md) covers CLAUDE.md files, custom slash commands, skills, hooks, and Model Context Protocol (MCP) server integration.



