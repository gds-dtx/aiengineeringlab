> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Claude Code: customisation guide

A practical guide to customising Claude Code through CLAUDE.md files, custom slash commands, skills, hooks and Model Context Protocol (MCP) integration.

## Contents

[Before you start](#before-you-start)

[CLAUDE.md files](#claudemd-files)

[Custom slash commands](#custom-slash-commands)

[Skills](#skills)

[Hooks](#hooks)

[Model Context Protocol (MCP) integration](#model-context-protocol-mcp-integration)

[Agent orchestration](#agent-orchestration)

[Background processes](#background-processes)

[How customisations work together](#how-customisations-work-together)

 [Quick start checklist](#quick-start-checklist)

## Before you start

This guide assumes you:

- have completed the [getting started guide](getting-started.md)
- are comfortable using Claude Code for daily tasks
- understand your team's workflows and standards
- have appropriate permissions to configure customisations

Customisations help teams to:

- enforce coding standards automatically
- reduce repeated prompting
- integrate with external tools
- maintain security policies
- share best practices

## CLAUDE.md files

### What and when

CLAUDE.md files provide persistent context that influences every Claude Code session. Use them for:

- technology stack and project structure
- coding standards and conventions
- testing requirements
- security practices
- commit message formats

Read more about [using CLAUDE.md files to customise Claude Code](https://claude.com/blog/using-claude-md-files).

### File locations

| Location | Scope | Use for |
|----------|-------|---------|
| `~/.claude/CLAUDE.md` | All your projects | Personal preferences |
| `.claude/CLAUDE.md` | Current repository | Project standards |
| `src/.claude/CLAUDE.md` | Subdirectory | Module-specific guidance |

### Example: project configuration

`.claude/CLAUDE.md`:

```markdown
# Project: Claim Processing Service

## Technology stack

- Node.js 20 with TypeScript 5.3
- Express 4.18, Prisma 5.x, PostgreSQL 15
- Jest for testing, GOV.UK Notify for emails

## Coding standards

- use async/await, not callbacks
- all functions must have JSDoc comments
- follow GOV.UK naming conventions
- maximum line length - 100 characters
- use 2-space indentation

## Government requirements

- all dates in ISO 8601 format
- postcodes - Royal Mail Postcode Address File (PAF) format
- National Insurance numbers - AA 12 34 56 A (example format)
- follow National Cyber Security Centre (NCSC) secure coding guidelines
- meet Web Content Accessibility Guidelines (WCAG) 2.2 AA for user-facing features

## Commit conventions
Use conventional commits: feat:, fix:, refactor:, test:, docs:, chore:
```

### Best practices

Keep CLAUDE.md concise and focused. For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, remove it.

#### What to include

| Include | Do not include |
|---------|---------|
| Bash commands Claude cannot guess | Anything Claude can determine by reading code |
| Code style rules that differ from defaults | Standard language conventions Claude already knows |
| Testing instructions and preferred test runners | Detailed API documentation (link to documentation instead) |
| Repository conventions (branch naming, pull request process) | Information that changes frequently |
| Architectural decisions specific to your project | Long explanations or tutorials |
| Developer environment quirks (required environment variables) | File-by-file descriptions of the codebase |
| Common gotchas or non-obvious behaviour | Self-evident practices like 'write clean code' |

If Claude ignores instructions, the file may be too long. If Claude asks questions answered in CLAUDE.md, rephrase for clarity.

Use emphasis (IMPORTANT, YOU MUST) for critical instructions. Check files into version control so your team can contribute.

#### Importing additional files

Reference other files using `@path/to/file` syntax:
```markdown
See @README.md for project overview and @package.json for available npm commands.

# Additional instructions
- Git workflow: @docs/git-instructions.md
```

Read more about [using CLAUDE.md files to customise Claude Code](https://claude.com/blog/using-claude-md-files).

## Custom slash commands

### What and when

Custom slash commands are shortcuts for prompts you use repeatedly. Use them when you need:

- standardised workflows (for example, PR reviews following your team's checklist)
- complex prompts with parameters
- consistent task execution across your team

Read more about [slash commands in Claude Code](https://code.claude.com/docs/en/slash-commands).

### How to create

Create `.claude/commands/review-pr.md`:

```markdown
Review GitHub pull request #$ARGUMENTS:

1. Use `gh pr view $ARGUMENTS --json files,additions,deletions` to get details.
2. Review all changed files for:
   - Security vulnerabilities
   - GOV.UK standards compliance
   - Test coverage
   - WCAG 2.2 AA accessibility (for user-facing code)
3. Check commit messages follow conventional commits.
4. Provide structured feedback with severity levels.
```

### Usage

```bash
claude
> /review-pr 123
```

## Skills

### What and when

Skills organise folders containing instructions and resources that Claude loads automatically when relevant. Use skills when you need:

- procedural knowledge that should persist (for example, organisational coding standards)
- automated application of team patterns
- context that activates only for specific tasks

Read more about [Claude skills](https://code.claude.com/docs/en/skills).

### How to create

Create skills in `.claude/skills/` directories.

### Example: GOV.UK compliance skill

Create `.claude/skills/gov-uk-compliance/SKILL.md` to ensure code follows GOV.UK Service Standard. The skill checks for:

- GOV.UK Frontend component usage
- WCAG 2.2 AA accessibility requirements
- progressive enhancement patterns
- Government Digital Service (GDS) API standards compliance

Claude will automatically apply this skill when you work on user-facing components or APIs.

## Hooks

### What and when

Hooks are shell commands that execute at specific points in Claude's lifecycle. Use hooks to:

- validate actions before they happen, for example, security checks)
- automate formatting after file edits
- enforce policies, for example, running tests before commits
- integrate with external systems, for example, logging to compliance database

Hooks are the only customisation feature that can block Claude's actions. Read [more about hooks](https://code.claude.com/docs/en/hooks).

### Hook types

| Hook type | When it runs | Common uses |
|-----------|-------------|-------------|
| PreToolUse | Before tool execution | Validate inputs, check permissions |
| PostToolUse | After tool completes | Format files, run linters |
| Notification | When Claude sends notifications | Custom alerts, Slack integration |
| Stop | When Claude finishes responding | Generate reports, clean up |

### Configure hooks

Edit `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": {
      "matcher": "Write|Edit",
      "command": "npx prettier --write $FILE",
      "description": "Format files after editing"
    },
    "PreToolUse": {
      "matcher": "Bash(git commit:.*)",
      "command": "npm test",
      "description": "Run tests before commits"
    }
  }
}
```

### Common hook patterns

#### Automatic formatting

```json
{
  "matcher": "Write|Edit",
  "command": "npx prettier --write $FILE"
}
```

#### Pre-commit checks

```json
{
  "matcher": "Bash(git commit:.*)",
  "command": "./scripts/pre-commit-checks.sh"
}
```

#### Security scanning

```json
{
  "matcher": "Write",
  "command": "npm audit"
}
```

## Model Context Protocol (MCP) integration

### What and when

Model Context Protocol (MCP) servers connect Claude Code to external tools, databases, and APIs. Use MCP servers when you need:

- access to external systems (GitHub, Slack, Jira, Linear)
- database queries without leaving Claude Code
- integration with your organisation's internal tools
- real-time data that Claude does not have in its training

Read more about [how to connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp).

### How to configure

Edit `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Common MCP servers

| Server | Purpose | Use for |
|--------|---------|---------|
| GitHub | Repository operations | Creating PRs, managing issues |
| Slack | Team communication | Sending notifications |
| PostgreSQL | Database access | Querying data directly |
| Figma | Design integration | Fetching design specs |

## Agent orchestration

### What and when

Agent orchestration lets you decompose complex work into incremental steps with review points between each. Use it when:

- refactoring touches multiple files and requires coordination
- migrations need careful sequencing
- you want to review approach before full execution
- the task is too complex to complete in one pass

Read more about [sub-agents and orchestration](https://code.claude.com/docs/en/sub-agents).

### Dynamic workflows (research preview)

Dynamic workflows, available in research preview, allow Claude to take on significantly larger tasks in Claude Code. Claude can plan the work and then run hundreds of parallel subagents in a single session (with Opus 4.8, the agents can run for even longer). Claude verifies its outputs before reporting back to the user.

For example, Claude Code with Opus 4.8 can now carry out codebase-scale migrations across hundreds of thousands of lines of code from kickoff to merge, with the existing test suite as its bar.

Dynamic workflows are available in Claude Code for Enterprise, Team, and Max plans. Read more about [dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code).

### How to use

#### Plan mode for reviewing changes

Plan mode helps Claude create a plan before writing code. Use it for complex refactoring, migrations, or multi-file changes.

Press Shift+Tab before submitting your prompt to enable plan mode. Claude will create an execution plan for you to review before starting work.

#### Using plan mode

1. Press Shift+Tab to enable plan mode.
2. Describe your task clearly with requirements.
3. Review the proposed plan Claude creates.
4. Approve the plan to begin execution.
5. Monitor work and provide feedback.

#### Example

```bash
# Press Shift+Tab, then:
> Migrate our authentication from JSON Web Token (JWT) stored in localStorage to httpOnly cookies. This affects:
- src/auth/jwt.ts (token generation)
- src/middleware/auth.ts (token verification)  
- src/routes/auth.ts (login/logout endpoints)
- tests throughout

Include Cross-Site Request Forgery (CSRF) protection and ensure backwards compatibility during migration.
```

Read more about [plan mode in Claude Code](https://code.claude.com/docs/en/interactive-mode#plan-mode).

#### Incremental execution

1. Ask Claude to create a plan first, then execute incrementally.

```bash
claude "I need to migrate our authentication from JWT to httpOnly cookies. Create a migration plan before starting."
```

2. Review the plan, then execute incrementally.

```bash
> Execute step 1 of the plan. After completing, run tests and commit if they pass.
```

3. Review the changes, then continue.

```bash
> Execute step 2
```

## Background processes

### What and when

Background processes let you run long-running tasks whilst continuing other work in your main session. Use them when:

- running test suites or coverage reports
- performing large-scale refactoring
- generating documentation across the codebase
- any task that takes more than a few minutes

### How to use

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

## How customisations work together

### Execution flow

```
User request
    ↓
CLAUDE.md files (always loaded)
    ↓
Skills (auto-activated by task)
    ↓
Slash commands (if invoked)
    ↓
Throughout execution:
  • Hooks validate at important points
  • MCP provides external data
  • Plan mode structures work
    ↓
Result
```

### Example workflow

Add comprehensive tests for the authentication module.

1. Review the `CLAUDE.md` file for project context.

   It explains that the project:
   - uses Jest
   - requires 80% coverage
   - follows the Arrange, Act, Assert (AAA) pattern

2. Ask Claude to generate a plan for adding tests.

   The `unit-testing` skill activates automatically and:

   - loads test templates
   - accesses test runner scripts

3. Run the implementation.

   Hooks enforce project policies and:

   - use `PreToolUse` to validate file permissions
   - use `PostToolUse` to run the linter on test files

4. If MCP integration is configured, retrieve supporting information.

   This can include:

   - related GitHub issues
   - existing test coverage from the database

5. Review the completed test suite.

   Check that it:

   - follows project conventions in `CLAUDE.md`
   - uses the provided templates
   - passes policy checks
   - reflects relevant external data

### Comparison of customisation features

| Feature | Best for | When it's active | Resources | Can block actions |
|---------|----------|-------------|-----------|-------------------|
| CLAUDE.md | Standards and context | Always | Text only | No |
| Slash commands | Repeated workflows | When invoked | Text only | No |
| Skills | Automation with resources | Auto by task | Scripts and files | No |
| Hooks | Security and compliance | At important points | Scripts | Yes (PreToolUse) |
| MCP | External tool integration | On demand | Network services | No |

## Quick start checklist

Use this checklist to implement Claude Code customisation in phases.

### Phase 1: Foundation

Start by establishing your project context.

1. Create `.claude/CLAUDE.md`.

   Include:

   - technology stack
   - coding standards
   - testing approach

2. Check that Claude references this context in its responses.

### Phase 2: Repeated workflows

Add custom commands for common tasks.

1. Identify 2 to 3 repeated prompts your team uses.

2. Create slash commands in `.claude/commands/`.

3. Share the commands with your team using version control.

### Phase 3: Governance

Implement hooks to enforce policies.

1. Add `PostToolUse` hooks for automatic formatting.

2. Add `PreToolUse` hooks for security validation, if needed.

3. Test hook scripts locally before deploying them.

### Phase 4: Automation

Create skills for complex workflows.

1. Identify repeatable tasks that would benefit from bundled resources.

2. Create skill folders in `.claude/skills/`.

3. Add scripts, templates and reference materials.

4. Write clear `SKILL.md` descriptions.

### Phase 5: Integration

Connect external tools using MCP.

1. Identify the external systems Claude needs to access.

2. Install and configure MCP servers.

3. Test the connections independently.

4. Document the configuration for your team.

### Phase 6: Validation

Test that your customisations work correctly.

1. Check that `CLAUDE.md` context appears in responses.

2. Test slash commands with different parameters.

3. Confirm that skills activate for appropriate tasks.

4. Check that hooks execute at the expected points.

5. Validate that MCP integrations return correct data.

## Working with customisations in teams

When customising Claude Code in team environments:

- share CLAUDE.md files and skills through version control
- document hook purposes and requirements clearly
- test customisations before rolling out to the team
- avoid configurations that bypass security reviews
- maintain a central registry of MCP integrations

Customisations should support collaboration, not create silos.

## Further reading

The official [Claude Code documentation](https://code.claude.com/docs) covers [quickstart](https://code.claude.com/docs/en/quickstart), [installation and setup](https://code.claude.com/docs/en/setup), and the [CLI reference](https://code.claude.com/docs/en/cli-reference).
