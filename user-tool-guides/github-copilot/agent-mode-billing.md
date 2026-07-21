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

[How to constrain agent mode to lower-cost models](#how-to-constrain-agent-mode-to-lower-cost-models)

[How administrators can control agent mode model access](#how-administrators-can-control-agent-mode-model-access)

[Choosing the right model for your task](#choosing-the-right-model-for-your-task)

[Practical tips for using agent mode without exhausting your allowance](#practical-tips-for-using-agent-mode-without-exhausting-your-allowance)

## Who this is for

This guide is for:

- engineers who use agent mode and want to understand how it affects their credit consumption
- enterprise administrators and organisation owners who need to control model access and prevent unexpected costs

## Before you start

Before reading this guide, you should understand how credits work and how usage-based billing applies to your plan. Read the [GitHub Copilot premium credit management guide](premium-credit-management.md) for legacy background and then use the current [GitHub models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) for up-to-date token pricing.

As of 1 June 2026, GitHub uses usage-based billing through GitHub AI Credits (1 credit = $0.01). Usage is charged from token consumption (input, output, and cached tokens) at model-specific rates. For Copilot Business and Copilot Enterprise, included AI Credit allowances are pooled at the billing-entity level. See the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) for governance details.

## How agent mode charges credits

Each prompt you enter in agent mode consumes tokens that are billed in AI Credits based on the selected model and total token volume. Internal agent work contributes to token usage for that interaction. This includes:

- reading files
- running terminal commands
- searching the codebase

Read more about [agent mode](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide#using-agent-mode).

Agent mode does not switch to a different model mid-session, regardless of task complexity. If you select GPT-5 mini, all responses use GPT-5 mini.

This matters because complex tasks require many messages and larger context windows. A multi-file refactoring job might involve 20 or more back-and-forth exchanges, which increases total token consumption and credit usage.

The table below compares typical agent mode sessions across different task types and model choices. These figures are illustrative estimates based on our experience. Your actual usage will vary depending on:

- how you prompt
- how precise your instructions are
- how much iteration the task requires

| Task | Typical messages | Primary token drivers | Cost behaviour |
|------|-----------------|-----------------------|----------------|
| Single-file bug fix | 3 to 5 | Short prompts, limited context | Usually low credit consumption on lower-cost models |
| Multi-file refactoring | 15 to 25 | Repeated context retrieval across files | Moderate to high consumption depending on model and prompt discipline |
| Feature implementation | 20 to 40 | Long iterative chats, growing context | High consumption risk if you use high-cost models for the full session |
| Test generation for a module | 5 to 10 | Source plus test output tokens | Low to moderate consumption depending on output size |

> The above is true as of 1 June 2026

Engineers who regularly use premium models on complex tasks can exhaust their credit allowance within a few focused sessions.

## What auto model selection does in agent mode

When you select 'Auto', it [automatically chooses a model](https://docs.github.com/en/copilot/concepts/auto-model-selection) based on current availability and Copilot's routing logic.

The models it may currently select include:

- GPT-5 mini
- Claude Haiku 4.5
- Claude Sonnet 4.5
- Claude Sonnet 4.6

Auto model selection does not guarantee a zero-cost model. Under usage-based billing, model use is priced per token. Included plan allowances can absorb costs up to the allowance limit, after which additional usage is billed in AI Credits.

When using auto model selection:

- it selects one model and uses it for the entire chat session
- you cannot preview which model it will choose before sending your prompt
- hover over the response after it is generated to see which model was used
- start a new chat session to switch to a different model

If you are using auto model selection outside VS Code, read the [about Copilot auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) guide for current feature and billing behaviour.

Auto model selection is generally available in VS Code. It is in public preview for Visual Studio, JetBrains, Xcode, and Eclipse. For those IDEs, your administrator must enable the 'Editor preview features' policy before 'Auto' appears in the model picker.

Auto model selection respects administrator model policies and will not route to any model your organisation has disabled.

## Whether you are warned before agent mode uses a premium model

Agent mode does not prompt you before it charges credits. The charge occurs when you send each message. You can see the model currently selected in the model picker before you send a message. You can also see which model processed each response by hovering over it in the chat window after it is generated. [Check your usage dashboard in GitHub settings](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests) to monitor your current consumption.

## How to constrain agent mode to lower-cost models

You can reduce agent mode credit consumption by selecting a lower-cost model in the model picker before starting your session.

Follow these steps to select a lower-cost model.

1. Open the Copilot Chat panel in your IDE.
2. Select the mode dropdown and choose Agent.
3. Open the model picker and select GPT-5 mini.
4. Send your prompt and monitor usage against your included allowance.

You can also select auto model selection on a paid plan, but treat it as dynamic routing rather than a guaranteed low-cost option.

## How administrators can control agent mode model access

Enterprise and organisation administrators can restrict which models are available in agent mode using the model policy in GitHub Copilot settings. [Model policies apply equally to both chat and agent mode](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models) because both use the same model picker.

Read [Managing agent mode and premium credit spend](../../manager-tool-guides/github-copilot/README.md#managing-agent-mode-and-premium-credit-spend) in the GitHub Copilot manager tool guide. It covers restricting models, setting spending limits, and monitoring usage by engineer.

Model policies have 3 states, which are enabled, disabled, and unconfigured. Unconfigured defaults to disabled. You can use model policies to:

- enable or disable individual models for all Copilot features across your organisation
- disable Autopilot mode in VS Code for all engineers by enabling the ChatToolsAutoApprove policy in your Copilot settings

There is no way to exclude a model from auto routing only while keeping it available for manual selection. Administrators cannot set a default model for engineers.

For full guidance on model policy configuration, read [configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models).

### Enforcing lower-cost model use through model policies

While administrators cannot set a default model for engineers, they can disable higher-cost models to reduce cost exposure. This limits both manual model selection and model choices available to Auto.

Follow these steps to enforce lower-cost model use.

1. Navigate to your organisation settings on GitHub.com.
2. Select Copilot, then Policies, then AI models.
3. Disable models above your organisation's approved cost threshold.
4. Save your changes, which apply immediately across all features and IDEs.

Use the current [models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) to decide which models fall inside your threshold.

Engineers lose manual access to any model you disable, so consider which approach suits your team.

| Approach | Disable these models | Engineers can use | Cost outcome |
|----------|---------------------|-------------------|-------------|
| Strict cost control | All high-cost models above an agreed threshold | A limited set of lower-cost models | Lower and more predictable spend, with capability trade-offs |
| Balanced capability and cost | Only the highest-cost models | Low-to-mid-cost models and selected higher-capability models | Moderate spend with stronger quality for complex tasks |

Both options affect manual selection and Auto routing.

### Controlling auto model selection in preview IDEs

For preview IDEs, you can remove auto model selection as an option by disabling the 'Editor preview features' policy. Engineers will then need to select a model manually and retain access to all models you have not disabled.

### Adding custom models

Organisation owners can integrate custom models from supported AI providers using their own API keys. Enterprise owners can further control which organisations have access to custom models. Read [Configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models) for setup steps.

## Choosing the right model for your task

Selecting the right model for the type of work you are doing is the most effective way to control credit consumption. The table below maps common task types to the recommended model and its cost. For a full technical comparison of all available models, including context window sizes and capability details, read the [GitHub Copilot model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison).

| Task type | Recommended model | Cost on paid plan |
|-----------|------------------|-------------------|
| Writing functions, tests, refactoring, documentation, debugging | GPT-5 mini | Lower token rates relative to frontier models; still billed per token |
| Complex business logic where a lower-cost model gave insufficient output | Claude Sonnet 4.6 | Mid-range token rates |
| Complex problem-solving, sophisticated reasoning, and architecture decisions | Claude Opus 4.6 | High token rates |
| Precision execution, 150+ step agentic tasks, and long-horizon reasoning | Claude Opus 4.7 | High token rates |

Use lower-cost models as your default. Move to higher-cost models only when the lower-cost option cannot meet your need.

## Practical tips for using agent mode without exhausting your allowance

Write precise prompts that give Copilot enough context in one go. Fewer messages means fewer credits consumed.

For multi-file implementation, consider the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) when it better fits the workflow, but review its current billing behaviour before use.

Start a new chat session for each distinct task. Prior messages build up in context and make responses longer.

Before a long session, check your remaining allowance in GitHub settings under Copilot. This helps you decide whether to use a lower-cost or higher-cost model.

[Monitor your usage dashboard after each session](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests) to see how many credits it consumed. This helps you calibrate future model choices.

You can also enforce cost controls at the repository level using hooks. The [GitHub Copilot customisation guide](customisation-guide.md#hooks) covers how to set up hooks for cost tracking, security validation, and audit logging.

## Further reading

[Auto model selection generally available in VS Code](https://github.blog/changelog/2025-12-10-auto-model-selection-is-generally-available-in-github-copilot-in-visual-studio-code/) announced the December 2025 release

[GitHub Copilot advanced use guide](advanced-use.md) describes agent mode workflows including refactoring and test generation

[Copilot CLI billing guide](copilot-cli-billing.md) explains how CLI autopilot billing differs from IDE agent mode