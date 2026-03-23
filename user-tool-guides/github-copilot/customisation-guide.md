> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us improve it.

# GitHub Copilot customisation guide

A practical guide to customising GitHub Copilot through instructions, custom agents, subagents, hooks and skills.

This guide assumes you are already familiar with everyday Copilot usage. If you are new to Copilot, start with the [advanced use guide](advanced-use.md) first, which covers effective prompting, refactoring, and test generation.

## Contents

[Instructions](#instructions)

[Custom agents](#custom-agents)

[Subagents](#subagents)

[Hooks](#hooks)

[Skills](#skills)

[How they work together](#how-they-work-together)

[Quick start checklist](#quick-start-checklist)

## Instructions

### What and when

Instructions provide ongoing context about your project that influences every Copilot response. Use them for:

- coding standards
- project structure
- tech stack details
- team conventions

### File types

Repository wide instructions use `.github/copilot-instructions.md` and apply to the entire repository.

Path specific instructions use `*.instructions.md` and apply to files matching a pattern.

```markdown
---
applyTo: '**/*.test.ts'
---
# Test guidelines
- Use descriptive names: 'should [behaviour] when [condition]'
- Always include negative test cases
```

Cross tool standard instructions use `AGENTS.md` at repository root. This works with multiple AI tools.

### Example

`.github/copilot-instructions.md`:

```markdown
# Project instructions

## Tech stack
- Frontend: React 18 and TypeScript
- Backend: Node.js and Express
- Database: PostgreSQL and Prisma
- Testing: Jest and Playwright

## Conventions
- use `interface` for objects in TypeScript and enable strict mode
- use functional components with hooks only in React
- use RESTful naming and proper HTTP status codes for API
- use AAA pattern with 80% or higher coverage required for testing
- never log PII and validate all inputs with Zod for security

## Workflow
- Run `npm test` before committing
- Format with Prettier (auto on save)
```

The example above uses TypeScript strict mode. Strict mode is a compiler setting that enables additional type-checking rules. Enable it by adding `"strict": true` to `compilerOptions` in your `tsconfig.json` file. See the [TypeScript strict mode documentation](https://www.typescriptlang.org/tsconfig#strict) for the full list of checks it enables.

Keep instructions concise because Copilot adds them to every request. Link to detailed documentation rather than duplicating it.

## Custom agents

### What and when

Custom agents are specialised personas you select for specific workflows. Use them when you need:

- consistent expertise such as testing, security or documentation
- restricted available tools

The model a custom agent uses determines the premium request cost of every session. An agent running on an included model (GPT-4.1, GPT-4o, GPT-5 mini) costs nothing. An agent running on Claude Opus 4.5 costs three premium requests per message. Before deploying custom agents for team-wide use, check which model they will run on and what your monthly allowance supports. Read [agent mode and credit consumption](premium-credit-management.md#agent-mode-and-credit-consumption) for worked examples showing how agent sessions translate into credit costs.

### File format

Create agent profile files in `.github/agents/`. Both `.md` and `.agent.md` extensions are supported. The `.agent.md` extension is the recommended convention in VS Code.

```markdown
---
name: Agent Name                    # Human-readable name
description: Brief purpose          # When to use this agent
tools: ['read', 'edit', 'search']  # Optional: limit available tools
---

# Detailed agent instructions and expertise go here
```

### Example test specialist

File: `.github/agents/test-specialist.agent.md`

```markdown
---
name: Test Specialist
description: Writes comprehensive tests without modifying production code
tools: ['read', 'search', 'edit', 'bash']
---

# Test specialist

You focus exclusively on test quality and coverage.

## Responsibilities
- Write unit, integration and E2E tests
- Identify coverage gaps
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive names: `should [expected] when [condition]`

## Commands
- Run tests: `npm test`
- Coverage: `npm run coverage`

## Boundaries

You can:

- read production code to understand behaviour
- create and modify test files

You cannot:

- modify production code unless explicitly requested
- remove failing tests to make builds pass

Always aim for 80% or higher coverage with clear, maintainable tests.
```

### Using agents

#### Agents tab on GitHub.com

The agents tab provides a centralised dashboard for managing Copilot coding agent sessions directly on GitHub.com. You can start tasks, monitor progress and manage agent sessions without leaving your browser. Copilot creates pull requests autonomously.

1. Open the agents tab at github.com/copilot/agents or select the Copilot icon in the navigation bar on any GitHub page.
2. Select the repository and optionally a base branch.
3. Choose a custom agent from the dropdown or use the default coding agent.
4. Describe your task and select Start task.

Copilot works autonomously in its own environment. It analyses your codebase, makes changes and runs tests. It then opens a pull request with you as the reviewer.

To monitor and steer a session:

- view session logs, progress and token usage in real time
- provide steering input during the session to redirect Copilot without stopping the run
- once complete, review the pull request, request changes by mentioning `@copilot`, or approve and merge

You can also start agent tasks through other entry points. These include assigning GitHub Issues to `@copilot`, from VS Code, or through integrations with Slack, Teams and Linear.

#### VS Code

In Copilot Chat, select the agents dropdown, then select your agent.

#### CLI

Use `copilot --agent=test-specialist --prompt 'Add authentication tests'` or use `/agent test-specialist` interactively.

## Subagents

### What and when

Subagents are context-isolated sessions that you invoke to handle bounded tasks. They are not independent entities. They handle tasks such as research and analysis without cluttering your main context. The subagent loads what it needs, processes it and returns only the summary.

Use subagents to:

- manage context size
- isolate research
- chain specialised workflows

### How to invoke

You can invoke subagents using three methods.

Method 1 uses an explicit request:

```
'Use #runSubagent to research React 18 best practices and return a summary'
```

Method 2 invokes a custom agent as a subagent:

```
'Use @documentation-reader as a subagent to fetch and summarise the migration guide'
```

Method 3 configures agents to use subagents through agent instructions:

```markdown
Before implementing features use the following steps.

1. Use @research-agent to gather best practices.
2. Then implement using the insights.
```

### Example: research workflow

File: `.github/agents/documentation-reader.agent.md`

```markdown
---
name: Documentation Reader
description: Fetches and summarises external documentation
tools: ['fetch', 'search', 'read']
---

# Documentation reader

You specialise in reading and summarising technical documentation.

Use the following steps to invoke a subagent.

1. Fetch specified documentation.
2. Extract key points and best practices.
3. Return concise summary with a maximum of 500 words.

## Output format

### Key concepts

- main concepts as bullets

### Best practices

- recommended approaches

### Code examples

Minimal relevant examples in appropriate language.

Focus on summarisation and not on implementation.
```

Usage:

```
User: 'Implement pagination in our React app'

Main Agent: 'Let me research first...'
[Invokes @documentation-reader subagent]
'Fetch React 18 pagination best practices'

[Subagent loads docs, returns summary]
[Main agent implements with fresh context]
```

Subagents cannot invoke other subagents. There is no nesting.

## Hooks

### What and when

Hooks are custom shell commands that execute at points during agent execution. Use hooks to:

- validate actions before they happen
- enforce security policies
- log activity for compliance
- integrate with external systems

Hooks are the only customisation feature that can approve or deny agent actions.

### Hook types

| Hook type | When it runs | Common uses |
|-----------|-------------|-------------|
| sessionStart | Agent session begins | Initialise environments and log session start |
| sessionEnd | Session completes | Clean up resources and generate reports |
| userPromptSubmitted | User submits prompt | Log requests for auditing |
| preToolUse | Before agent uses tool | Approve or deny actions and enforce policies |
| postToolUse | After tool execution | Log results and track statistics |
| errorOccurred | When errors occur | Alert teams and log failures |

The preToolUse hook is the most powerful because it can block agent actions.

### File location

Create `*.json` files in `.github/hooks/`:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "./scripts/security-check.sh",
        "timeoutSec": 30
      }
    ]
  }
}
```

### Example for security validation

File `.github/hooks/security.json`.

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "./scripts/validate-command.sh",
        "comment": "Block dangerous operations"
      }
    ],
    "postToolUse": [
      {
        "type": "command",
        "bash": "./scripts/audit-log.sh",
        "comment": "Log all tool usage"
      }
    ]
  }
}
```

File `scripts/validate-command.sh`.

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
TOOL_ARGS=$(echo "$INPUT" | jq -r '.toolArgs')

# Block dangerous commands
if echo "$TOOL_ARGS" | grep -qE "rm -rf /|DROP TABLE|sudo"; then
  echo '{"permissionDecision":"deny","permissionDecisionReason":"Dangerous command blocked"}'
  exit 0
fi

# Allow by default
echo '{"permissionDecision":"allow"}'
```

File `scripts/audit-log.sh`.

```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
RESULT=$(echo "$INPUT" | jq -r '.toolResult.resultType')

# Log to audit trail
echo "$(date -d @$((TIMESTAMP/1000))): Tool=$TOOL_NAME Result=$RESULT" >> audit.log
```

### Hook input and output

Hooks receive input as JSON via stdin containing context about the action.

For preToolUse hooks only, output a JSON object with your permission decision:

```json
{
  "permissionDecision": "deny",
  "permissionDecisionReason": "Security policy violation"
}
```

### Common use cases

Hooks support common use cases to:

- block destructive commands and enforce file access policies for security
- log all actions for audit trails for compliance
- run linters before code edits and validate test coverage for quality
- alert teams on production changes for notifications
- track tool usage across teams for cost management. For broader guidance on controlling credit spend and setting organisation-wide spending limits, see the [premium credit management guide](premium-credit-management.md#managing-agent-mode-and-premium-credit-spend)

## Skills

### What and when

Skills are folders with instructions, scripts and resources. Copilot automatically activates them when tasks match. Use them for repeatable workflows that benefit from automation and bundled resources.

### Directory structure

```
.github/skills/
└── skill-name/
    ├── SKILL.md              # Required: instructions
    ├── scripts/              # Optional: automation
    │   └── runner.py
    ├── templates/            # Optional: starter code
    │   └── scaffold.ts
    ├── references/           # Optional: documentation
    │   └── api-guide.md
    └── assets/               # Optional: static files
        └── baseline.png
```

Each folder serves a specific role with:

- templates containing code that Copilot modifies
- references containing documentation that Copilot reads for guidance
- assets containing files Copilot uses as is in output
- scripts containing executable automation

### SKILL.md format

Example `SKILL.md` file structure.

```yaml
---
name: skill-name
description: When to use this skill. Be specific so Copilot knows when to activate it.
---
```

Content sections should include:

- when to use for specific trigger scenarios
- available tools for scripts and their usage
- best practices for key guidelines

Script usage example where `--param` is the parameter description:

```bash
python scripts/tool.py --param value
```

### Example component generator

File `.github/skills/component-generator/SKILL.md`.

```yaml
---
name: component-generator
description: Generate React components following project conventions. Use when creating new React components, hooks or TypeScript interfaces.
---
```

Use this content structure when:

- creating new React components
- generating custom hooks
- scaffolding component tests

Generation script:

```bash
python scripts/generate.py --name Button --type basic --with-tests
```

Parameters include:

- `--name` which is the component name in PascalCase
- `--type` which is either basic, form, layout or data display
- `--with-tests` which includes the test file
- `--with-story` which includes the Storybook story

This script creates a:

- component file with TypeScript
- CSS module
- test file, if optional
- Storybook story, if optional
- barrel export

Use `templates/basic-component.tsx` as the base template with placeholder values that get replaced during generation.

Use:

- PascalCase matching component name for files
- `ComponentNameProps` interfaces for props
- React Testing Library with 80% or higher coverage for tests
- CSS modules and mobile first for CSS

Copilot activates skills automatically when you work on matching tasks. You do not need to invoke them explicitly.

## How they work together

### Execution flow

```
User request
    ↓
Custom agent (optional, if selected)
    ↓
Instructions (always active)
    ↓
Throughout execution:
  • Hooks validate at key points
  • Skills auto-activate by task
  • Subagents invoked as needed
    ↓
Result
```

### Complete example workflow

In this example task, comprehensive tests are added for an authentication module.

1. Custom agent where user selects `@test-specialist` with restricted tools that cannot modify production code and testing expertise.

2. Instructions that Copilot applies automatically where project uses Jest, requiring 80% coverage and follows the AAA pattern.

3. Hooks where `sessionStart` logs task initiation, `preToolUse` validates file edits, `postToolUse` logs test creation and `sessionEnd` generates coverage reports.

4. Skill where Copilot activates `unit-testing` skill, loads test templates and accesses test runner scripts.

5. Subagent where test specialist needs research, invokes `@documentation-reader`, gets Jest best practices summary and returns to main agent.

6. Result is a complete test suite that follows project conventions (instructions), created by the specialist (custom agent), validated by security policies (hooks), uses templates (skill) and is informed by research (subagent).

### Comparison

The following table compares the five customisation features.

| Feature | Purpose | When active |
|---------|---------|-------------|
| Instructions | Guidelines | Always |
| Custom agents | Personas | When selected |
| Subagents | Context isolation | When invoked |
| Hooks | Validation and logging | At key points |
| Skills | Automation | Auto by task |

This provides the following capabilities.

| Feature | Best for | Resources | Invocation | Can block actions |
|---------|----------|-----------|------------|-------------------|
| Instructions | Standards | Text only | Automatic | No |
| Custom agents | Expertise | Text only | User selects | No |
| Subagents | Research | Text only | Agent invokes | No |
| Hooks | Security and compliance | Scripts | Automatic | Yes (preToolUse) |
| Skills | Workflows | Scripts and files | Automatic | No |

### Real-world combinations

#### Security first development

Never commit secrets and validate all inputs for instructions. Use `@security-auditor` as a custom agent with read-only tools to review code for vulnerabilities.

Implement `preToolUse` hooks that block hardcoded credentials and dangerous commands. Create a `secret-scanner` skill with automated scanning to detect and prevent secrets in commits.

#### Compliance heavy environment

Track all actions through comprehensive audit logging for instructions. Use `@compliance-auditor` as a custom agent with role-specific tools limited to read and reporting functions.

Implement `sessionStart` hooks to log user and session metadata, `preToolUse` hooks to enforce file access policies, `postToolUse` hooks to track all actions to a database, and `sessionEnd` hooks to generate compliance reports. Create an `audit-trail-generator` skill with automated report generation and policy templates.

#### Quality focused testing

Require 80% or higher coverage and follow the AAA pattern for instructions. Use `@test-specialist` as a custom agent with testing expertise and restricted tools.

Implement `preToolUse` hooks that run linters before code edits to enforce code quality standards. Create a `unit-testing` skill with test templates and automated test runners. Invoke `@documentation-reader` as a subagent to fetch and summarise framework documentation when implementing new features.

## Quick start checklist

Implement GitHub Copilot customisation by following these phases.

### Phase 1: foundation

Start by establishing your project instructions.

1. Create `.github/copilot-instructions.md` with project basics.
2. Add path specific `*.instructions.md` for tests and documentation.

### Phase 2: specialisation

Add custom agents for key roles in your team.

1. Identify two to three key roles such as testing, documentation and security.
2. Create agent profiles in `.github/agents/`.
3. Define tool restrictions as needed.

### Phase 3: governance

Implement hooks to enforce policies and maintain audit trails.

1. Add `preToolUse` hooks for security validation.
2. Add `postToolUse` hooks for audit logging.
3. Test hook scripts locally: `echo '{"toolName":"bash"}' | ./script.sh`

### Phase 4: automation

Create skills for repeatable workflows.

1. Identify repeatable tasks.
2. Create skill folders in `.github/skills/`.
3. Add scripts, templates and references.
4. Write clear SKILL.md descriptions.

### Phase 5: validation

Test that your customisations work correctly.

1. Verify instructions appear in chat references.
2. Test agent selection and behaviour.
3. Confirm hooks block or allow as expected.
4. Check that Copilot activates skills for appropriate tasks.
5. Try subagent invocations.

### Phase 6: iteration

Refine your configuration based on usage patterns.

1. Monitor Copilot behaviour and hook logs.
2. Review audit trails for patterns.
3. Gather team feedback.
4. Refine and update configurations.

## Further reading

[GitHub Copilot documentation](https://docs.github.com/copilot)

[Custom instructions guidance](https://docs.github.com/copilot/how-tos/configure-custom-instructions)

[Custom agents guidance](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)

[Hooks reference](https://docs.github.com/en/copilot/reference/hooks-configuration)

[Agent skills guidance](https://docs.github.com/copilot/concepts/agents/about-agent-skills)

[Awesome Copilot repository](https://github.com/github/awesome-copilot) for community examples

[AGENTS.md standard](https://agents.md/) for cross-tool format
