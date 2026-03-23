> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# GitHub Copilot manager tool guide

## Purpose

This guide provides engineering managers with practical guidance for implementing GitHub Copilot within UK government departments. It covers capabilities assessment, security considerations, phased rollout strategies, and success measurement to support informed decision-making and sustainable adoption.

## Audience

This guide is for:

- engineering managers responsible for AI Engineering Lab adoption in their teams
- technical leads overseeing tool implementation and developer workflows
- delivery managers coordinating rollout and measuring adoption success

## What is in this guide

This guide is organised into the following sections.

1. Understanding GitHub Copilot

- [what GitHub Copilot does](#what-github-copilot-does) - core capabilities and interaction modes
- [how it compares with other AI code assistants](#how-it-compares-with-other-ai-code-assistants) - feature comparison and when to use different tools
- [Copilot models and task suitability](#copilot-models-and-task-suitability) - choosing the right model for different tasks

2. Implementation planning

- [government-specific considerations](#government-specific-considerations) - security classifications, data residency, and procurement
- [safe usage guidance: prototyping vs production](../../user-tool-guides/github-copilot/safe-usage-prototyping-vs-production.md) - differentiated controls for different environments
- [getting started](#getting-started) - licensing options and installation process
- [training requirements](#training-requirements) - engineer and manager training programmes

3. Managing adoption

- [managing agent mode and premium credit spend](#managing-agent-mode-and-premium-credit-spend) - controlling model access and preventing unexpected costs
- [measuring success](#measuring-success) - quality metrics and troubleshooting
- [policy configuration reference](#policy-configuration-reference) - content exclusions and IDE settings

4. Additional resources

- [contributing](#contributing) - how to improve this guide

## Before you start

Before reading this guide, you should understand:

- your team's current development workflow and tooling
- basic software development lifecycle concepts
- your department's security classification requirements
- the [AI Engineering Lab maturity assessment](../../assessment/maturity-assessment-framework.md) framework

## What GitHub Copilot does

[GitHub Copilot](https://docs.github.com/en/copilot) provides real-time code suggestions directly in your team's development environment. It generates code completions, entire functions, tests, and documentation based on context from the current file.

Primary capabilities include:

- autocompleting code as engineers type
- generating implementation from function signatures or comments
- creating unit tests based on existing code
- producing documentation and code explanations
- suggesting fixes for errors and warnings

### Copilot interaction modes

GitHub Copilot offers several ways to interact with AI assistance, each suited for different tasks:

| Mode | Description | Best for | Available in |
|------|-------------|----------|--------------|
| Inline suggestions | Real-time completions as you type | Quick code completion, boilerplate | All tiers |
| Copilot Chat | Conversational interface in IDE | Explanations, debugging, questions | All tiers |
| Copilot Edits | Multi-file editing with AI assistance | Refactoring across files, applying patterns | Business and Enterprise |
| Copilot Workspace | Plan and implement features from issues | Feature planning, task breakdown | Enterprise only |
| Agent mode | Autonomous task execution with approval | Complex multi-step tasks, investigations | Enterprise only |

- inline suggestions for daily coding, implementing known patterns, and writing tests
- chat for understanding unfamiliar code, debugging errors, and generating documentation
- edits for renaming variables across files, applying security fixes, and refactoring
- workspace for planning new features, breaking down epics, and designing implementations
- agent mode for investigating bugs across codebase, migrating frameworks, and comprehensive refactoring

Agent mode can be extended with custom agents, hooks, and skills to enforce policies and automate repeatable workflows. Read the [GitHub Copilot customisation guide](../../user-tool-guides/github-copilot/customisation-guide.md) for more detail on these features.

### Best suited for

GitHub Copilot is best suited for:

- teams seeking productivity gains in routine coding tasks
- projects with substantial boilerplate or repetitive patterns
- accelerating test coverage creation
- supporting less experienced engineers with examples

### Not designed for

GitHub Copilot is not designed for:

- complex architectural decisions requiring codebase-wide understanding
- security-critical code generation without thorough review
- replacing code review and quality assurance processes
- full-stack application generation from requirements

## How it compares with other AI code assistants

For a detailed comparison of GitHub Copilot with other AI code assistants, see the [comparative guidance](../comparative-guidance.md). The [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers integrating AI coding assistants across the full software development lifecycle.

### When to combine with other tools

Consider combining GitHub Copilot with other tools when:

- you need Claude Code for complex refactoring or architectural questions
- you need Claude with GitHub MCP server for AI-assisted code reviews, pull request analysis, and issue management
- you need Amazon Q for AWS-specific deployment tasks
- you need government MCP servers with Claude for standards compliance checking

### MCP servers and extended workflows

For detailed guidance on MCP servers and integration with other AI code assistants, see the MCP servers documentation in the AI Engineering Lab repository.

## Copilot models and task suitability

GitHub Copilot uses different models depending on the task. Understanding which model suits which task helps set appropriate expectations. The [model selection playbook](../../playbooks/model-selection.md) provides broader guidance on choosing the right AI tool across the AI Engineering Lab.

### Model comparison

The table below combines task suitability information from the [GitHub Copilot model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) and cost multipliers from [supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models). Check both pages for the latest information, as the model catalogue changes regularly.

| Model | Provider | Best for | Cost | Notes |
|---|---|---|---|---|
| GPT-4.1 | OpenAI | General coding, fast completions | Included | No premium requests on paid plans |
| GPT-5 mini | OpenAI | Balanced speed and capability | Included | No premium requests on paid plans |
| GPT-5.1 | OpenAI | Latest OpenAI capabilities | 1x | Enhanced reasoning |
| GPT-5.1-Codex-Max | OpenAI | Extended agentic coding tasks | 1x | Optimised for long-running agent workflows |
| GPT-5.1-Codex-Mini (Preview) | OpenAI | Lightweight agentic coding | 0.33x | Cost effective agent option, preview |
| GPT-5.2 | OpenAI | Advanced reasoning and code generation | 1x | Best for complex tasks |
| GPT-5.2-Codex | OpenAI | Agentic coding with advanced reasoning | 1x | Codex variant of GPT-5.2 |
| GPT-5.3-Codex | OpenAI | Latest agentic coding model | 1x | Most recent Codex model |
| Claude Haiku 4.5 | Anthropic | Fast responses, simple tasks | 0.33x | Cost-effective option |
| Claude Sonnet 4 | Anthropic | Balanced reasoning and speed | 1x | Good all-rounder |
| Claude Sonnet 4.5 | Anthropic | Advanced coding tasks | 1x | Strong code understanding |
| Claude Sonnet 4.6 | Anthropic | Latest balanced coding model | 1x | Updated Sonnet with improved capabilities |
| Claude Opus 4.5 | Anthropic | Superior reasoning capabilities | 3x | Advanced reasoning model |
| Claude Opus 4.6 | Anthropic | Most advanced Claude model | 3x | Latest Opus with strongest reasoning |
| Gemini 2.5 Pro | Google | Multimodal tasks, large context | 1x | Good for visual and code tasks |
|  Gemini 3.1 Pro (Preview) | Google | Next generation multimodal capabilities | 1x | Preview, may have stability limitations |
| Grok Code Fast 1 | xAI | Fast code generation | 0.25x | Currently complimentary |
| Raptor mini | Fine-tuned GPT-5 mini | Optimised completions | Included | Preview - tuned for coding |

### Recommended models by task

The recommendations below come from the [GitHub Copilot model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison). GitHub adds new models frequently, so check that page to confirm the most suitable option for your task.

| Task | Recommended model | Why |
|---|---|---|
| Autocomplete as you type | GPT-4.1 or Raptor mini (default) | Fast response, no premium cost |
| Generate unit tests | GPT-5.2 or Claude Sonnet 4.5 | Better understanding of edge cases |
| Debug complex issues | Claude Opus 4.6 or GPT-5.2 | Superior reasoning about code behaviour |
| Write boilerplate code | GPT-5 mini or Claude Haiku 4.5 | Sufficient for repetitive patterns, cost-effective |
| Refactor legacy code | Claude Opus 4.6 or GPT-5.1 | Needs deep understanding of code structure |
| Implement algorithms | GPT-5.2 | Optimised for mathematical reasoning |
| Generate documentation | GPT-5.2 or Claude Sonnet 4.6 | Strong natural language generation |
| SQL query generation | GPT-5.1 | Better syntax accuracy and optimisation |
| Security code review | Claude Sonnet 4.6 | Strong pattern recognition for vulnerabilities |
| API client generation | GPT-5 mini | Template-based, does not need premium model |
| Multimodal tasks (images and code) | Gemini 3.1 Pro or Gemini 2.5 Pro | Best multimodal support |
| Agentic coding (multi step, autonomous) | GPT-5.3-Codex or GPT-5.2-Codex | Purpose built for long running agentic workflows |
| Lightweight agentic tasks | GPT-5.1-Codex-Mini | Cost effective agent option at 0.33x |
| Extended agentic sessions | GPT-5.1-Codex-Max | Optimised for sustained agent task execution |

### Controlling model selection

In Copilot Chat, engineers select models from the model picker dropdown. When using Auto mode, Copilot automatically selects the best model based on availability and stays within 0× to 1× multiplier models. This means it won't route to high-cost models such as Claude Opus. Read more about [Copilot auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection). 

Included models (no premium requests on paid plans) are:

- GPT-4.1
- GPT-5 mini
- Raptor mini

Premium models (consume premium requests) are:

- all Claude models (Haiku, Sonnet, Opus variants)
- GPT-5, GPT-5.1, GPT-5.2, GPT-5.x-Codex
- Gemini models
- Grok Code Fast 1 (currently complimentary)

Model availability depends on your licence tier. Business and Enterprise tiers have access to all models. Premium model usage counts towards your organisation's monthly allowance.

For detailed guidance on managing premium request budgets, preventing unexpected costs, and understanding what happens when teams exceed their allowance, see [Premium credit management](../../user-tool-guides/github-copilot/premium-credit-management.md).

### Adding additional models

You can add more models beyond those available by default using your own API keys. This allows access to:

- additional model versions
- models from other providers
- local or self-hosted models

For configuration details, see [Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model).

For detailed model capabilities and limitations, see:

- [GitHub Copilot supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)

## Government-specific considerations

Check the [base guardrails](../../governance/guardrails-base.md) for foundational security controls that apply to all AI tool usage.

### Security classification

GitHub Copilot sends code snippets to GitHub's servers for processing. This means:

- OFFICIAL: generally acceptable with appropriate content exclusions configured
- OFFICIAL-SENSITIVE: requires risk assessment and strict content exclusions
- SECRET and above: not appropriate for these classifications

Consult your departmental security team before deployment. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment and [NCSC secure development and deployment guidance](https://www.ncsc.gov.uk/collection/developers-collection) for security best practices. The [Copilot Trust Center](https://resources.github.com/copilot-trust-center/) provides GitHub's security, privacy, and compliance information for Copilot.

### Content exclusions

You must [configure Copilot to exclude sensitive files and patterns](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/setting-policies-for-copilot-in-your-organization/excluding-content-from-github-copilot). Recommended exclusions for government projects:

```yaml
# Environment and configuration files
/.env
/.env.
/secrets/
/config/production.yml
/config/production/

# AWS and API credentials
/credentials
/aws/config
/.aws/
/api-keys/

# Department-specific patterns
/citizen-data/
/personal-identifiable-information/
/security-configurations/
```

### Data residency

As of January 2025, GitHub Copilot processes requests through Azure OpenAI Service. Check your department's data residency requirements before deployment.

### Intellectual property

Copilot Business and Enterprise tiers include IP indemnity, meaning GitHub provides legal protection if generated code infringes copyright. Individual tier does not include this protection.

For government projects, use Business or Enterprise tier only.

## Getting started

GitHub Copilot is available through [Crown Commercial Service G-Cloud 14](https://www.crowncommercial.gov.uk/agreements/RM1557.14) ([search for GitHub Enterprise and Copilot on the Digital Marketplace](https://www.digitalmarketplace.service.gov.uk/)) or the [TechUK Software Reseller Framework](https://www.techuk.org/) through authorised resellers.

### Installation process

The [GitHub Copilot getting started guide](https://docs.github.com/en/copilot/getting-started-with-github-copilot) covers full setup options. To get started, complete the following steps.

#### Step 1: organisation setup

1. Enable Copilot in your GitHub organisation settings.
2. Configure content exclusion policies.
3. Assign licences to pilot users.
4. Enable usage metrics collection.

#### Step 2: engineer installation

For VS Code:

```bash
# Install extensions
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

For JetBrains IDEs:

- Settings, then Plugins, then search 'GitHub Copilot', then Install

#### Step 3: authentication

Engineers authenticate using their GitHub accounts. If using Enterprise Managed Users, configure SAML single sign-on through your identity provider.

#### Step 4: verification

Test installation by opening a code file. Copilot should show inline suggestions as you type. If not, check authentication status in the extension settings.

## Training requirements

### Engineer training (45 minutes)

Module 1: basic usage (15 minutes)

This module covers:

- accepting and rejecting suggestions
- keyboard shortcuts
- enabling and disabling for specific file types
- when to trust suggestions versus manual coding

Module 2: effective prompting (15 minutes)

This module covers:

- writing comments that generate good code
- using function names and signatures strategically
- providing context through imports and surrounding code
- common patterns that work well

Module 3: security and quality (15 minutes)

This module covers:

- reviewing generated code critically
- recognising and rejecting insecure patterns
- content exclusions and when they apply
- integration with code review process

This training should be delivered as a live demonstration with hands-on practice using real project examples.

### Manager briefing (30 minutes)

This briefing covers:

- capability overview and realistic expectations
- usage metrics and how to interpret them
- policy configuration and content exclusions
- addressing team concerns about AI tools

This briefing should be delivered as a presentation with a question and answer session.

## Managing agent mode and premium credit spend

Agent mode is one of the most productive features in GitHub Copilot, but it is also the most likely to exhaust an engineer's monthly premium request allowance when used with premium models. This section gives administrators the controls they need to prevent unexpected costs across their teams.

[Agent mode is the default in Copilot Chat since VS Code 1.107](https://code.visualstudio.com/updates/v1_107). Engineers can switch to Ask mode from the mode dropdown in the Chat view. To disable agent mode entirely, set [`chat.agent.enabled`](https://code.visualstudio.com/docs/copilot/reference/copilot-settings) to `false` in your organisation's VS Code configuration. This removes access to agent mode for all engineers.

Before diving into the admin controls, it helps to understand how engineers actually use agent mode day to day and what tasks they are likely to run in it. The [GitHub Copilot advanced use guide](../../user-tool-guides/github-copilot/advanced-use.md) covers refactoring, test generation, and multi-file editing patterns. These are the tasks most likely to drive credit consumption. The [GitHub Copilot customisation guide](../../user-tool-guides/github-copilot/customisation-guide.md) covers custom agents, hooks for security and cost logging, and skills. All of these interact with agent mode and affect how your team uses it at scale.

### Understanding how agent mode consumes credits

[Each prompt an engineer sends in agent mode counts as one premium request, multiplied by the selected model's multiplier](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/asking-github-copilot-questions-in-your-ide). Internal tool calls the agent makes between prompts, such as reading files or running terminal commands, are not charged separately. Only the prompts the engineer sends trigger a charge.

Complex tasks require many messages. On a Business plan (300 requests per user per month), two or three feature implementation sessions with a premium model can exhaust an engineer's entire monthly allowance. GitHub Copilot does not warn engineers before a premium request is charged and there is no automatic notification when an individual approaches their limit.

For worked examples of credit consumption across different task types and model choices, see the [agent mode billing guide](../../user-tool-guides/github-copilot/agent-mode-billing.md).

### Restricting which models engineers can use

As an enterprise or organisation owner, you can disable premium models to prevent engineers from selecting them in agent mode and chat. [Model policies apply equally to all Copilot features including agent mode](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models). There is no separate policy for agent mode alone. [Auto model selection also respects these restrictions](https://docs.github.com/en/copilot/concepts/auto-model-selection) and will not route to a disabled model.

Disabling a model removes it from both Auto routing and manual selection. Engineers cannot use a model you have disabled, even if they choose it themselves. Administrators cannot set a default model for engineers. GitHub controls the platform-wide default, which has been GPT-4.1 since May 2025.

For the full step-by-step procedure, including how to enforce included-only model use and a middle-ground option that keeps low-cost premium models available, see [Enforcing included model use through model policies](../../user-tool-guides/github-copilot/agent-mode-billing.md#enforcing-included-model-use-through-model-policies) in the agent mode billing guide.

### Setting a hard spending limit

You can set a monthly budget and enable a hard limit to automatically block premium requests once the budget is exhausted. Once the limit is reached, engineers are switched to included models automatically and no further charges accrue. This is the recommended configuration for cost governance. The [premium request paid usage policy](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances) has been available for Business and Enterprise plans since August 2025.

Since November 2025, the Copilot coding agent has its own dedicated stock keeping unit (SKU) separate from chat and agent mode in the IDE. This allows you to set separate budgets for each feature if you want more detailed control.

For the full procedure including budget configuration, alert thresholds, and the difference between hard and soft limits, see [Managing premium credits](../../user-tool-guides/github-copilot/premium-credit-management.md#managing-premium-credits) in the premium credit management guide.

### Monitoring usage by engineer

[Download monthly usage reports](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) to identify which engineers are consuming the most premium requests and which models they are using. Filter by feature and model to identify agent mode usage specifically.

Contact engineers who are consistently near or over their allowance. Share the [premium credit management guide](../../user-tool-guides/github-copilot/premium-credit-management.md) to help them understand how to reduce consumption and choose appropriate models for each task type.

### What to communicate to engineers

Engineers may not realise how quickly agent mode sessions with premium models consume requests. You should make sure that your team understands that:

- agent mode with included models (GPT-4.1, GPT-4o, GPT-5 mini) costs nothing, so these should be used as default
- [Auto model selection stays within 0× to 1× multiplier models](https://docs.github.com/en/copilot/concepts/auto-model-selection) and gives a 10% discount on paid plans, making it a safe default if engineers want automatic model selection
- premium models such as Claude Sonnet 4.5 and Claude Opus 4.5 should be reserved for tasks that genuinely require advanced reasoning
- [the Copilot coding agent on GitHub.com uses one premium request per session](https://github.blog/changelog/2025-07-10-github-copilot-coding-agent-now-uses-one-premium-request-per-session/) regardless of task complexity, making it far more cost-effective than agent mode chat for large, multi-file tasks
- agent mode is the default when opening Copilot Chat in VS Code. Engineers who want a read-only, non-destructive chat experience should switch to Ask mode manually at the start of each session

## Measuring success

### Quality metrics

For quality metrics refer to the monitoring and evaluation framework documentation. For usage data specific to GitHub Copilot, see the [usage metrics and reporting documentation](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/reviewing-usage-data-for-github-copilot-in-your-organization).

### Common troubleshooting scenarios

#### Inline suggestions not appearing

Symptoms include:

- no autocomplete suggestions while typing
- extension appears inactive

Follow these steps to resolve the issue.

1. Verify extension is enabled and authenticated in IDE settings.
2. Check that file type is not excluded in Copilot settings.
3. Ensure inline suggestions are enabled: `"editor.inlineSuggest.enabled": true`.
4. Restart IDE and check network connectivity.
5. Sign out and sign back in to refresh authentication.

#### Copilot Chat not responding

Symptoms include:

- the chat window opening with no responses
- error messages in chat interface

Follow these steps to resolve the issue.

1. Check GitHub service status at [githubstatus.com](https://www.githubstatus.com/).
2. Verify licence is active in GitHub organisation settings.
3. Clear chat history and restart conversation.
4. Check corporate proxy or firewall allows Copilot endpoints.
5. Update to latest extension version.

#### Agent mode failures

Symptoms include:

- agent tasks failing to complete
- timeout errors or incomplete work

Follow these steps to resolve the issue.

1. Break down complex tasks into smaller, more specific requests.
2. Ensure agent has sufficient permissions for requested operations.
3. Check repository size and complexity (very large repos may struggle).
4. Review task requirements. Agent works best with clear, bounded objectives.
5. Monitor agent progress and provide clarifications when requested.

For detailed troubleshooting of Copilot agent mode specifically, see [Troubleshooting GitHub Copilot coding agent](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-coding-agent-in-your-ide/troubleshooting-github-copilot-coding-agent).

#### Poor suggestion quality

Symptoms include:

- suggestions not matching project patterns
- irrelevant or incorrect code generated

Follow these steps to resolve the issue.

1. Provide more context via descriptive comments and function signatures.
2. Ensure relevant imports and dependencies are visible in file.
3. Use more specific variable and function names.
4. Check if content exclusions are blocking helpful context.
5. Try using Copilot Chat for complex scenarios instead of inline.
6. For Enterprise customers, verify custom model fine-tuning is configured.

Understanding how to communicate with Copilot effectively can dramatically improve suggestion quality. See the [prompt library](../../prompt-library/) for tested prompts and patterns. GitHub's [Copilot best practices guide](https://github.blog/ai-and-ml/github-copilot/how-to-use-github-copilot-in-your-ide-tips-tricks-and-best-practices/) also covers effective usage patterns and tips.

#### Performance issues

Symptoms include:

- slow suggestion generation
- IDE lagging when Copilot is active

Follow these steps to resolve the issue.

1. Reduce the number of active IDE extensions.
2. Check network connectivity and latency.
3. Clear extension cache and reload IDE.
4. Update to latest Copilot extension version.
5. Check system resources (CPU, memory).

#### Enterprise-specific issues

Symptoms include:

- licence assignment not working
- policy changes not taking effect
- usage metrics not appearing

Follow these steps to resolve the issue.

1. Verify user is member of correct GitHub organisation.
2. Check seat assignment in organisation Copilot settings.
3. Allow 15 to 30 minutes for policy changes to propagate.
4. Ensure user has signed out and back in after policy updates.
5. Contact GitHub support for billing or access issues.

### Security incidents

If an engineer discovers or accepts code containing:

- hardcoded secrets or credentials
- known security vulnerabilities
- data protection violations

They must take the following immediate actions.

1. Do not commit the code.
2. Report to your security team using standard incident process.
3. Document the suggestion for analysis.
4. Update content exclusions if pattern-based.

They must follow up by:

- reviewing similar code in recent commits
- updating the team training materials
- sharing learning without blame

## Policy configuration reference

### Recommended content exclusions

```yaml
# Secrets and credentials
/.env
/.env.
/secrets/
/*.key
/*.pem
/credentials
/.aws/

# Configuration files
/config/production.yml
/config/production/
/terraform/production/

# Citizen data
/citizen-data/
/personal-identifiable-information/
/user-data/

# Security configurations
/security-configurations/
/auth-config/
/firewall-rules/

# Legacy code (if applicable)
/legacy/
/deprecated/
```

### IDE-level settings

Example VS Code configuration:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": true
  },
  "github.copilot.editor.enableAutoCompletions": true,
  "editor.inlineSuggest.enabled": true,
  "github.copilot.advanced": {
    "debug.overrideEngine": "default",
    "debug.testOverrideProxyUrl": "",
    "debug.overrideProxyUrl": ""
  }
}
```

Disable Copilot for specific file types where suggestions are not helpful or may be risky.

### Organisation-level settings

The [Managing Copilot in your organisation guide](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization) covers policy configuration and administration in detail. To configure your organisation-level settings:

1. Navigate to Settings, then Copilot.
2. Enable Copilot for organisation.
3. Configure suggestion matching (block suggestions matching public code if required).
4. Set content exclusion repository.
5. Enable telemetry collection for usage insights.

## Further reading

The NCSC [vulnerability disclosure toolkit](https://www.ncsc.gov.uk/information/vulnerability-disclosure-toolkit) covers how to handle security issues identified in your tools or projects.

## Contributing

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes. We encourage contributions from across government to keep this repository current.