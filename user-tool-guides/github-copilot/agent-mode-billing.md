> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Agent mode billing and credit consumption

This guide explains how agent mode in the integrated development environment (IDE) consumes GitHub AI Credits. It covers how to choose the right model for each task and how administrators can control which models engineers can use.

## Contents

[Who this is for](#who-this-is-for)

[Before you start](#before-you-start)

[How agent mode charges credits](#how-agent-mode-charges-credits)

[What auto model selection does in agent mode](#what-auto-model-selection-does-in-agent-mode)

[Whether you are warned before agent mode uses a premium model](#whether-you-are-warned-before-agent-mode-uses-a-premium-model)

[How to constrain agent mode to included models](#how-to-constrain-agent-mode-to-included-models)

[How administrators can control agent mode model access](#how-administrators-can-control-agent-mode-model-access)

[Choosing the right model for your task](#choosing-the-right-model-for-your-task)

[Practical tips for using agent mode without exhausting your allowance](#practical-tips-for-using-agent-mode-without-exhausting-your-allowance)

## Who this is for

This guide is for:

- engineers who use agent mode and want to understand how it affects their credit consumption
- enterprise administrators and organisation owners who need to control model access and prevent unexpected costs

## Before you start

Before reading this guide, you should understand how credits work and how usage-based billing applies to your plan. Read the [GitHub Copilot premium credit management guide](premium-credit-management.md) for the foundational concepts, plan details, and model multiplier table.

As of 1 June 2026, GitHub uses usage-based billing through GitHub AI Credits (1 credit = $0.01 USD). Usage is based on token consumption per model with multipliers determining relative cost. See the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) for details.

## How agent mode charges credits

Each prompt you enter in agent mode consumes credits based on the model's multiplier. Internal tool calls made during a single response do not count as separate charges. These include:

- reading files
- running terminal commands
- searching the codebase

Only the prompts you enter are billed. Tool calls or background steps taken by the agent are not charged. Read more about [agent mode](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide#using-agent-mode).

Agent mode does not switch to a different model mid-session, regardless of task complexity. If you select GPT-5 mini, all responses use GPT-5 mini and no credits are consumed.

This matters because complex tasks require many messages. A multi-file refactoring job might involve 20 or more back-and-forth exchanges. Each one consumes credits if you are using a premium model.

The table below compares typical agent mode sessions across different task types and model choices. These figures are illustrative estimates based on our experience. Your actual usage will vary depending on:

- how you prompt
- how precise your instructions are
- how much iteration the task requires

| Task | Typical messages | Included model (0x) | Claude Sonnet 4.6 (1x) | Claude Opus 4.6 (3x) | Claude Opus 4.7 (15x) |
|------|-----------------|---------------------|------------------------|----------------------|------------------------|
| Single-file bug fix | 3 to 5 | 0 credits | 3 to 5 credits | 9 to 15 credits | 45 to 75 credits |
| Multi-file refactoring | 15 to 25 | 0 credits | 15 to 25 credits | 45 to 75 credits | 225 to 375 credits |
| Feature implementation | 20 to 40 | 0 credits | 20 to 40 credits | 60 to 120 credits | 300 to 600 credits |
| Test generation for a module | 5 to 10 | 0 credits | 5 to 10 credits | 15 to 30 credits | 75 to 150 credits |

> The above is true as of 1 June 2026

Engineers who regularly use premium models on complex tasks can exhaust their credit allowance within a few focused sessions.

## What auto model selection does in agent mode

When you select 'Auto', it [automatically chooses a model](https://docs.github.com/en/copilot/concepts/auto-model-selection) based on current availability. It only selects models with multipliers of 1x or below, so it will never select Claude Opus or other high-cost models.

The models it may currently select include:

- GPT-5 mini
- Claude Haiku 4.5
- Claude Sonnet 4.5
- Claude Sonnet 4.6

Auto model selection can select free included models, so not every message costs credits. If your allowance runs out, it will switch to a 0x included model automatically.

When using auto model selection:

- it selects one model and uses it for the entire chat session
- you cannot preview which model it will choose before sending your prompt
- hover over the response after it is generated to see which model was used
- start a new chat session to switch to a different model

On paid plans, [auto model selection applies a 10% discount to the model multiplier](https://docs.github.com/en/copilot/concepts/billing/copilot-requests). For example, if Auto selects Claude Sonnet 4.5 (normally 1x), you are charged 0.9x credits per message. This discount applies to Copilot Chat and agent mode in the IDE, but not to the Copilot coding agent on GitHub.com. If you are using auto model selection outside VS Code, read the [about Copilot auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) guide to confirm whether the discount applies.

Auto model selection is generally available in VS Code. It is in public preview for Visual Studio, JetBrains, Xcode, and Eclipse. For those IDEs, your administrator must enable the 'Editor preview features' policy before 'Auto' appears in the model picker.

Auto model selection respects administrator model policies and will not route to any model your organisation has disabled.

## Whether you are warned before agent mode uses a premium model

Agent mode does not prompt you before it charges credits. The charge occurs when you send each message. You can see the model currently selected in the model picker before you send a message. You can also see which model processed each response by hovering over it in the chat window after it is generated. [Check your usage dashboard in GitHub settings](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests) to monitor your current consumption.

## How to constrain agent mode to included models

You can use agent mode without consuming any credits by selecting an included model in the model picker before starting your session.

Follow these steps to select an included model.

1. Open the Copilot Chat panel in your IDE.
2. Select the mode dropdown and choose Agent.
3. Open the model picker and select GPT-5 mini.
4. Send your prompt, which consumes no credits.

You can also select auto model selection on a paid plan. As described in [What auto model selection does in agent mode](#what-auto-model-selection-does-in-agent-mode), it will not select Opus-class or other high-cost models.

## How administrators can control agent mode model access

Enterprise and organisation administrators can restrict which models are available in agent mode using the model policy in GitHub Copilot settings. [Model policies apply equally to both chat and agent mode](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models) because both use the same model picker.

Read [Managing agent mode and premium credit spend](../../manager-tool-guides/github-copilot/README.md#managing-agent-mode-and-premium-credit-spend) in the GitHub Copilot manager tool guide. It covers restricting models, setting spending limits, and monitoring usage by engineer.

Model policies have 3 states, which are enabled, disabled, and unconfigured. Unconfigured defaults to disabled. You can use model policies to:

- enable or disable individual models for all Copilot features across your organisation
- disable Autopilot mode in VS Code for all engineers by enabling the ChatToolsAutoApprove policy in your Copilot settings

There is no way to exclude a model from auto routing only while keeping it available for manual selection. Administrators cannot set a default model for engineers.

For full guidance on model policy configuration, read [configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models).

### Enforcing included model use through model policies

While administrators cannot set a default model for engineers, they can disable all premium models to prevent engineers from using any model that consumes credits. Auto model selection will then only route to the remaining free included model, GPT-5 mini.

Follow these steps to enforce included-only model use.

1. Navigate to your organisation settings on GitHub.com.
2. Select Copilot, then Policies, then AI models.
3. Disable every model with a multiplier above 0x.
4. Save your changes, which apply immediately across all features and IDEs.

Note that 'above 0x' includes any premium model, even low-cost ones such as Claude Haiku 4.5 (0.33x) and Grok Code Fast 1 (0.25x).

Engineers lose manual access to any model you disable, so consider which approach suits your team.

| Approach | Disable these models | Engineers can use | Auto cost per message |
|----------|---------------------|-------------------|-----------------------|
| Strict (zero premium cost) | All models above 0x | GPT-5 mini only | Not applicable |
| Middle-ground (near-zero cost) | All models at 1x and above | Sub-1x models (for example, Claude Haiku 4.5) also available | Approximately 0.30 per message |

Both options affect manual selection and Auto routing.

### Controlling auto model selection in preview IDEs

For preview IDEs, you can remove auto model selection as an option by disabling the 'Editor preview features' policy. Engineers will then need to select a model manually and retain access to all models you have not disabled.

### Adding custom models

Organisation owners can integrate custom models from supported AI providers using their own API keys. Enterprise owners can further control which organisations have access to custom models. Read [Configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models) for setup steps.

## Choosing the right model for your task

Selecting the right model for the type of work you are doing is the most effective way to control credit consumption. The table below maps common task types to the recommended model and its cost. For a full technical comparison of all available models, including context window sizes and capability details, read the [GitHub Copilot model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison).

| Task type | Recommended model | Cost on paid plan |
|-----------|------------------|-------------------|
| Writing functions, tests, refactoring, documentation, debugging | GPT-5 mini | Free (no credits consumed) |
| Complex business logic where an included model gave insufficient output | Claude Sonnet 4.6 | 1x multiplier per message |
| Complex problem-solving, sophisticated reasoning, and architecture decisions | Claude Opus 4.6 | 3x multiplier per message |
| Precision execution, 150+ step agentic tasks, and long-horizon reasoning | Claude Opus 4.7 | 15x multiplier per message |

Use included models as your default. Move to a premium model only when the included model cannot meet your need.

## Practical tips for using agent mode without exhausting your allowance

Write precise prompts that give Copilot enough context in one go. Fewer messages means fewer credits consumed.

For multi-file implementation, use the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) instead of agent mode with a premium model. It charges once for the entire session.

Start a new chat session for each distinct task. Prior messages build up in context and make responses longer.

Before a long session, check your remaining allowance in GitHub settings under Copilot. This helps you decide whether to use an included model or a premium one.

[Monitor your usage dashboard after each session](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests) to see how many credits it consumed. This helps you calibrate future model choices.

You can also enforce cost controls at the repository level using hooks. The [GitHub Copilot customisation guide](customisation-guide.md#hooks) covers how to set up hooks for cost tracking, security validation, and audit logging.

## Further reading

[Auto model selection generally available in VS Code](https://github.blog/changelog/2025-12-10-auto-model-selection-is-generally-available-in-github-copilot-in-visual-studio-code/) announced the December 2025 release

[GitHub Copilot advanced use guide](advanced-use.md) describes agent mode workflows including refactoring and test generation

[Copilot CLI billing guide](copilot-cli-billing.md) explains how CLI autopilot billing differs from IDE agent mode