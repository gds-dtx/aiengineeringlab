> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Claude Code manager tool guide

## Purpose

This guide provides engineering managers with practical guidance for implementing Claude Code within UK government departments. It covers capabilities assessment, security considerations, phased rollout strategies, and success measurement to support informed decision making and sustainable adoption.

This guide also explains how Claude Code differs from other artificial intelligence (AI) code assistants. It covers how to use it effectively for complex software development tasks.

## Who this is for

This guide is for:

- engineering managers responsible for AI Engineering Lab adoption in their teams
- technical leads overseeing tool implementation and developer workflows
- delivery managers coordinating rollout and measuring adoption success

## Contents

[What Claude Code does](#what-claude-code-does)

[How it compares with other AI code assistants](#how-it-compares-with-other-ai-code-assistants)

[Claude Code models and task suitability](#claude-code-models-and-task-suitability)

[UK government specific considerations](#uk-government-specific-considerations)

[Training requirements](#training-requirements)

[Measuring success](#measuring-success)

[Common troubleshooting scenarios](#common-troubleshooting-scenarios)

[Policy configuration reference](#policy-configuration-reference)

[Language style guides](#language-style-guides)

[Integration with development workflow](#integration-with-development-workflow)

[Further reading](#further-reading)

## Before you start

Before reading this guide, you should understand:

- your team's current development workflow and tooling
- basic software development lifecycle concepts
- your department's security classification requirements
- the [AI Engineering Lab maturity assessment](../../assessment/maturity-assessment-framework.md) framework

## What Claude Code does

Claude Code is an AI-powered software development assistant that helps developers design, write, test, and maintain code through natural language conversation. Unlike inline autocomplete tools, Claude Code understands full codebases and performs multi-step tasks autonomously.

Primary capabilities include:

- exploring and understanding entire codebases and navigating dependencies
- editing multiple files whilst maintaining consistency across the project
- running terminal commands including tests, builds, lints, and Git operations
- generating and maintaining code documentation and API references
- creating test cases, generating test data, and running test suites
- analysing errors, identifying root causes, and suggesting fixes
- modernising legacy code and applying design patterns
- integrating with GitHub, GitLab, and development tools via Model Context Protocol (MCP) servers

### Claude Code interaction modes

Claude Code supports multiple interaction modes. Each is designed for a different stage of software development.

| Mode | Description | Best suited for |
|------|-------------|-----------------|
| Terminal | Command-line interface for development workflows | Daily coding, complex multi-step tasks, codebase exploration |
| IDE integration | Visual editing inside VS Code or JetBrains | Inline edits, side-by-side code changes, file navigation |
| Web browser | Browser-based access at [claude.ai/code](https://claude.ai/code) | Quick tasks, parallel sessions, no installation required |
| Agent mode | Autonomous multi-step task execution with approval | Complex refactoring, migrations, end-to-end feature development |

You should:

- use the terminal for daily development work and complex codebase tasks
- use IDE integration for visual editing alongside existing workflows
- use the web browser for quick one-off tasks or when working without a local setup
- use agent mode for large, multi-step tasks that span multiple files

### Best suited for

Claude Code is best suited for:

- teams working on complex codebases requiring deep contextual understanding
- projects involving legacy code modernisation or large-scale refactoring
- engineers needing a conversational development partner rather than autocomplete
- teams using MCP servers to connect AI to government systems and standards

### Not designed for

Claude Code is not designed for:

- replacing code review and quality assurance processes
- making decisions about architecture without human oversight
- accessing classified systems or data above OFFICIAL
- autonomous deployment without human approval at each stage

## How it compares with other AI code assistants

For a detailed comparison of Claude Code with other AI coding assistants, see the [comparative guidance](../comparative-guidance.md).

## Claude Code models and task suitability

Claude Code uses Anthropic's Claude model family. Each model offers a different balance of capability, speed, and cost.

| Model | Strengths | Typical tasks |
|-------|-----------|---------------|
| Claude Opus 4.5 | Deepest reasoning and complex code understanding | Architectural decisions, complex refactoring, difficult debugging |
| Claude Sonnet 4.5 | Balanced reasoning and speed | General coding, feature development, test generation |
| Claude Haiku 4.5 | Fastest responses, most cost effective | Quick edits, simple questions, boilerplate generation |

### Recommended model by task

| Task | Recommended model | Why |
|------|-------------------|-----|
| Explore a large unfamiliar codebase | Claude Sonnet 4.5 | Good balance of context understanding and speed |
| Debug a complex production issue | Claude Opus 4.5 | Deep reasoning about multi-layer problems |
| Write unit tests | Claude Haiku 4.5 | Sufficient for structured, repetitive patterns |
| Refactor legacy code | Claude Opus 4.5 | Needs deep understanding of code structure |
| Generate boilerplate | Claude Haiku 4.5 | Cost effective for simple patterns |
| Design API contracts | Claude Sonnet 4.5 | Strong natural language and technical reasoning |
| Security code review | Claude Sonnet 4.5 | Strong pattern recognition for vulnerabilities |
| Implement a complex algorithm | Claude Opus 4.5 | Superior mathematical reasoning |
| Answer quick questions | Claude Haiku 4.5 | Fast, sufficient for simple queries |

### Controlling model selection

You can select models when starting a Claude Code session or switch mid-session using `/model`. Claude Code will default to Sonnet unless you specify otherwise. For detailed model capabilities and limitations, see the [Claude models overview](https://anthropic.com/claude) and [AI model comparison](../comparative-guidance.md).

## UK government specific considerations

### Regulatory context

The UK uses a principle-based approach to AI regulation, working through existing legal frameworks and sector-specific guidance. Government departments must follow the AI Playbook for the UK Government, which sets out principles for using AI lawfully, ethically, and responsibly.

Key principles include safety, security, transparency, fairness, accountability, and governance.

### Security classification

The following table summarises acceptable use by security classification.

| Classification | Acceptable use |
|----------------|----------------|
| OFFICIAL | Generally acceptable with appropriate content exclusions configured |
| OFFICIAL-SENSITIVE | Requires risk assessment and strict content exclusions |
| SECRET and above | Not appropriate for use with Claude Code |

Consult your departmental security team before deployment. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment.

### Content exclusions

You must configure Claude Code to exclude sensitive files and patterns. The following exclusions are recommended for government projects.

```
# Secrets and environment files
.env
.env.*
secrets/
*.key
*.pem
credentials

# AWS and cloud credentials
.aws/
api-keys/

# Configuration files
config/production.yml
terraform/production/

# Citizen data
citizen-data/
personal-identifiable-information/
user-data/

# Security configurations
security-configurations/
auth-config/
firewall-rules/
```

Add these patterns to a `.claude/settings.json` file at the root of your repository to prevent Claude Code from reading or indexing sensitive files.

### Data residency

Claude Code processes requests through Anthropic's infrastructure, hosted on Amazon Web Services (AWS) in the United States. UK and EEA-specific data residency is not available by default.

Check your department's data residency requirements and complete a Data Protection Impact Assessment (DPIA) before deployment. Reference your departmental data protection officer for guidance.

For departments with strict data residency requirements, consult the [data residency guidance](../data-residency.md).

### Intellectual property

Anthropic's terms of service state that code you submit is not used to train future models by default on paid plans. Verify your subscription terms before deployment.

For government projects, use a paid subscription tier only. Free and trial tiers do not provide the same data handling commitments.

### Procurement

Claude models within the AI Engineering Lab are accessed through AWS Bedrock, with requests routed through a centralised LiteLLM gateway (referred to internally as LLMLite). This removes the need for individual Anthropic subscriptions or direct API keys from Anthropic.

#### How access works

The LiteLLM gateway is deployed within a dedicated AWS account in the EU (London) region (`eu-west-2`). This keeps data within UK-compliant infrastructure. It exposes an OpenAI-compatible API. Developers authenticate with a virtual API key issued by a LiteLLM administrator, rather than managing AWS credentials or Anthropic accounts directly.

#### What this means for your department

Rather than procuring Claude licences separately, departments in the AI Engineering Lab programme receive access through the centrally managed LiteLLM gateway. Your LiteLLM administrator creates user accounts, assigns team membership, and issues virtual API keys. These keys can be scoped to specific models, rate limits, and spend budgets at both individual and team level.

#### Available models through the gateway

| Model | Availability |
|-------|-------------|
| Claude Sonnet | Available via Bedrock through the LiteLLM gateway |
| Claude Opus | Available via Bedrock through the LiteLLM gateway |

Model access for each user is controlled at the gateway layer. Your administrator configures which models your team can use and the associated spend limits.

#### Steps to get access

1. Confirm your department is enrolled in the AI Engineering Lab programme.
2. Request a user account from your LiteLLM administrator.
3. Once assigned to a team, request a virtual API key.
4. Configure your IDE or CLI tool to point at the LiteLLM gateway endpoint and authenticate with your virtual key.

#### Key governance features provided by the gateway

The LiteLLM gateway enforces per-user and per-team spend budgets, rate limits (requests per minute and tokens per minute), and model access controls automatically. All usage is logged and attributed to individual keys. This gives full cost visibility and audit trails without requiring departments to manage AWS IAM credentials or Bedrock configuration directly.

For detailed guidance on managing users, teams, and keys, refer to the LiteLLM administration guides.

### Installation process

Complete the following steps to get a team started with Claude Code.

#### Step 1: team account setup

1. Create an Anthropic account or sign in at [console.anthropic.com](https://console.anthropic.com).
2. Set up a team workspace and invite engineers.
3. Configure usage limits and model access policies.
4. Enable usage logging for audit purposes.

#### Step 2: engineer installation

For macOS using Homebrew.

```bash
brew install --cask claude-code
```

For macOS, Linux, or Windows Subsystem for Linux (WSL).

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

For Windows using PowerShell.

```powershell
irm https://claude.ai/install.ps1 | iex
```

Verify the installation by running the following command.

```bash
claude --version
```

#### Step 3: authentication

Engineers authenticate using their Anthropic account or an API key from the team workspace. For team deployments, configure authentication through the `ANTHROPIC_API_KEY` environment variable to avoid engineers sharing individual keys.

#### Step 4: IDE integration

For VS Code.

1. Open Extensions (Ctrl+Shift+X on Windows or Linux, Cmd+Shift+X on macOS).
2. Search for Claude Code.
3. Click 'Install' and restart if prompted.

For JetBrains IDEs.

1. Go to 'Settings' then 'Plugins'.
2. Search for Claude Code.
3. Install and restart your IDE.

#### Step 5: verification

Test installation by running `claude` in a terminal from a project directory. Claude Code should greet you and confirm it can see your project files.

## Training requirements

### Engineer training (approximately 45 minutes)

Module 1: basic usage (15 minutes)

This module covers:

- starting a Claude Code session in the terminal
- common commands including `/help`, `/clear`, and `/exit`
- asking Claude Code to explain and explore an existing codebase
- when to use the terminal versus IDE integration

Module 2: effective prompting (15 minutes)

This module covers:

- providing context through file references and codebase instructions
- writing prompts that produce specific, actionable results
- using CLAUDE.md files to set persistent codebase instructions
- common patterns that work well for government development teams

Module 3: security and quality (15 minutes)

This module covers:

- reviewing generated code critically before accepting
- recognising and rejecting insecure patterns
- content exclusion configuration and what it prevents
- integration with code review processes

This training should be delivered as a live demonstration with hands-on practice using real project examples.

### Manager briefing (30 minutes)

This briefing covers:

- capability overview and realistic expectations
- usage metrics and how to interpret them
- content exclusion configuration and data handling
- addressing team concerns about AI tools

This briefing should be delivered as a presentation with a question and answer session.

## Measuring success

### Quality metrics

For quality metrics refer to the [measurement playbook](../../quality-metrics/measurement-playbook.md) and [quality strategy](../../quality-metrics/quality-strategy.md) documentation.

## Common troubleshooting scenarios

### Claude Code not starting

Symptoms include:

- `claude` command not found in terminal
- error on launch about missing dependencies

Follow these steps to resolve the issue.

1. Verify installation completed successfully by running `claude --version`.
2. Check that Node.js 18 or later is installed by running `node --version`.
3. Reinstall using the native installer for your platform.
4. Restart your terminal session to reload the PATH variable.
5. Check the [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/overview) for platform-specific troubleshooting.

### Authentication errors

Symptoms include:

- prompts to log in repeatedly
- API key not recognised errors

Follow these steps to resolve the issue.

1. Verify your API key is valid at [console.anthropic.com](https://console.anthropic.com).
2. Check that the `ANTHROPIC_API_KEY` environment variable is set correctly.
3. Confirm your subscription plan has not expired or exceeded its limit.
4. Sign out and back in using `/logout` followed by `claude login`.
5. Contact your team administrator to verify workspace access permissions.

### Poor response quality

Symptoms include:

- responses that do not match the project's patterns or conventions
- irrelevant or incorrect code generated

Follow these steps to resolve the issue.

1. Add a `CLAUDE.md` file to the project root with your team's coding standards and patterns.
2. Provide more context by referencing specific files in your prompt.
3. Break large complex requests into smaller, more focused tasks.
4. Specify the model you need for the task using `/model` if the default is insufficient.
5. See the [customisation guide](../../user-tool-guides/claude-code/customisation-guide.md) for detailed instructions on CLAUDE.md setup.

### Agent tasks failing or timing out

Symptoms include:

- agent tasks stopping partway through execution
- timeout errors on complex multi-file operations

Follow these steps to resolve the issue.

1. Break complex tasks into smaller bounded steps.
2. Confirm Claude Code has read access to all files it needs.
3. Review the task description for ambiguity and provide clearer instructions.
4. Monitor agent progress and provide clarification when requested.
5. Check your subscription plan has sufficient usage for long-running agent sessions.

### High token usage or unexpected costs

Symptoms include:

- usage limits reached sooner than expected
- higher than anticipated API costs

Follow these steps to resolve the issue.

1. Review usage logs at [console.anthropic.com](https://console.anthropic.com) to identify high-usage sessions.
2. Use Claude Haiku 4.5 for simple tasks to reduce token costs.
3. Enable usage limits per engineer in the team workspace settings.
4. Review CLAUDE.md to ensure it does not include large unnecessary files in context.
5. Remind engineers to use `/clear` between unrelated tasks to reset context.

### Security incidents

If an engineer discovers or accepts code containing:

- hardcoded secrets or credentials
- known security vulnerabilities
- data protection violations

They must take the following immediate actions.

1. Do not commit the code.
2. Report to your security team using the standard incident process.
3. Document the suggestion for analysis.
4. Update content exclusions if pattern based.

They must follow up by:

- reviewing similar code in recent commits
- updating the team training materials
- sharing learning without blame

## Language style guides

Starter style guide files are available for each language supported by the [GDS Way programming language guidance](https://gds-way.digital.cabinet-office.gov.uk/standards/programming-languages.html#programming-languages).

- [Ruby](style-guides/ruby.md)
- [Python](style-guides/python.md)
- [JavaScript](style-guides/javascript.md)
- [Gp](style-guides/go.md)
- [Java](style-guides/java.md)
- [HTML and CSS](style-guides/html-css.md)
- [Shell and Bash](style-guides/shell.md)

Copy the relevant block into your project's `CLAUDE.md` to give Claude Code persistent, language-specific coding standards. See the [style guides README](style-guides/README.md) for more detail on how to use them.

## Integration with development workflow

### Code review

All AI-generated code must go through the same code review process as human-written code. Reviewers should:

- check that generated code follows team conventions set out in CLAUDE.md
- verify that no sensitive data was included in Claude Code prompts
- confirm tests accompany all significant new code

### Git workflow

Claude Code can create commits, branches, and pull requests when given appropriate permissions. Teams should:

- restrict Claude Code Git access to feature branches only
- require human review before merging AI-assisted pull requests
- tag commits that include AI assistance for audit purposes

### Testing

Claude Code can generate unit tests, integration tests, and test data. Teams should:

- require engineers to verify generated tests cover the intended behaviour
- run the full test suite before accepting AI-generated changes
- use Claude Code to identify gaps in existing test coverage

### Continuous integration and continuous deployment

Teams should configure their continuous integration (CI) and continuous deployment (CD) pipelines to:

- run security scanning on all code including AI-assisted code
- require all tests to pass before merging
- block deployments that include unreviewed AI-generated changes

## Policy configuration reference

### CLAUDE.md setup

A `CLAUDE.md` file at the root of a repository provides persistent instructions to Claude Code. Use it to enforce team standards across all sessions.

Example `CLAUDE.md` structure.

```markdown
# Project instructions for Claude Code

## Security requirements

Never read, modify, or reference files in the following directories:
- secrets/
- .env
- config/production/

Never suggest hardcoded credentials, API keys, or passwords.
Always recommend environment variables for configuration values.

## Coding standards

Follow [Government Digital Service (GDS) coding standards](https://gds-way.digital.cabinet-office.gov.uk/standards/programming-languages.html)

This project uses [LANGUAGE]. Apply the standards from the relevant style guide:
- Ruby - 2-space indentation, frozen_string_literal, RuboCop enforced
- Python - PEP 8, 4-space indentation, type hints, black formatted
- JavaScript - ES2015+, const/let not var, StandardJS style, semicolons
- Go - gofmt formatted, Effective Go conventions, explicit error handling
- Java - Google Java Style Guide, 4-space indentation, google-java-format
- HTML/CSS - GOV.UK Design System components, BEM naming, semantic HTML
- Shell - set -euo pipefail, ShellCheck passing, quoted variables

Use British English in comments and documentation.
Write tests for all new functions.
Keep functions under 20 lines where possible.

## Review requirements

All generated code must be reviewed by a human before committing.
```

### IDE level settings

Example VS Code settings for Claude Code.

```json
{
  "claude-code.autostart": false,
  "claude-code.defaultModel": "claude-sonnet-4-5",
  "claude-code.showInlineCompletions": true
}
```

### Agent permission settings

Control what Claude Code can do autonomously by configuring approval requirements in your `.claude/settings.json` file.

```json
{
  "permissions": {
    "allow": [
      "Read(*)",
      "Edit(src/**)",
      "Bash(git status, git diff, git log)"
    ],
    "deny": [
      "Bash(git push, git merge, rm -rf)",
      "Edit(secrets/**, .env, config/production/**)"
    ]
  }
}
```

This restricts Claude Code to reading all files, editing only source files, and running safe Git read commands. It prevents pushes, merges, and deletions.

## Further reading

[Anthropic Trust Center](https://www.anthropic.com/trust)

[Claude Code GitHub discussions](https://github.com/anthropics/anthropic-sdk-python/discussions)

[NCSC secure development and deployment guidance](https://www.ncsc.gov.uk/collection/developers-collection/principles/develop-and-deploy-your-software-securely)

[AI Playbook for the UK Government](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)

[Crown Commercial Service G-Cloud framework](https://www.cloudstore.service.gov.uk/)

[User guide for Claude Code](../../user-tool-guides/claude-code/README.md)

[Getting started guide](../../user-tool-guides/claude-code/getting-started.md)

[Advanced use guide](../../user-tool-guides/claude-code/advanced-use.md)

[Safe usage guidance](../../user-tool-guides/claude-code/safe-usage-prototyping-vs-production.md)

[AI-assisted SDLC playbook](../../playbooks/ai-sdlc-playbook.md)

[Model selection playbook](../../playbooks/model-selection.md)

[Base guardrails](../../governance/guardrails-base.md)