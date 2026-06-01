> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Copilot CLI billing and credit consumption

This guide explains how GitHub Copilot CLI (command-line interface) consumes GitHub AI Credits. It covers how its autopilot mode billing differs from agent mode in the IDE and what administrators need to do before engineers can use it.

## Contents

[Who this is for](#who-this-is-for)

[Before you start](#before-you-start)

[What Copilot CLI is](#what-copilot-cli-is)

[How Copilot CLI billing works](#how-copilot-cli-billing-works)

[Using included models in Copilot CLI](#using-included-models-in-copilot-cli)

[Autopilot mode in Copilot CLI](#autopilot-mode-in-copilot-cli)

[Plan availability and policy requirements](#plan-availability-and-policy-requirements)

[CLI worked example: cost comparison across models](#cli-worked-example-cost-comparison-across-models)

## Who this is for

This guide is for:

- engineers who use or plan to use Copilot CLI from the terminal
- enterprise administrators and organisation owners on Business or Enterprise plans who need to enable CLI access

## Before you start

Before reading this guide, you should understand how credits work and what your plan includes. Read the [GitHub Copilot premium credit management guide](premium-credit-management.md) for the foundational concepts, plan details, and model multiplier table.

GitHub Copilot uses usage-based billing through GitHub AI Credits (1 credit = $0.01 USD). See the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) for details.

## What Copilot CLI is

GitHub Copilot CLI is a standalone terminal-based agent. It is a distinct product from the older `gh copilot suggest` and `gh copilot explain` commands, which have been retired.

## How Copilot CLI billing works

Each prompt you submit in Copilot CLI consumes [credits](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#premium-features) based on the selected model's multiplier.

The [default model is Claude Sonnet 4.5](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli#model-usage) (1x multiplier). You can change the model at any time using the `/model` command in interactive mode or the `--model` flag when running non-interactively.

Copilot CLI does not use auto model selection. You must choose your model explicitly, either in the CLI config file or per session.

## Using included models in Copilot CLI

Copilot CLI supports [included models](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#model-multipliers). On paid plans, GPT-5 mini consumes 0 credits per prompt.

To switch to an included model in an interactive session, type `/model` and select GPT-5 mini from the list. To set a persistent default, update your CLI config file to specify the model.

When your credit budget is exhausted, Copilot CLI falls back to included models. The CLI displays a message confirming you have been switched to an included model.

## Autopilot mode in Copilot CLI

Copilot CLI includes an autopilot mode. It lets the agent work through a task from start to finish without asking you to approve each step.

In [IDE agent mode](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#premium-features), only the prompts you enter are billed. The agent's follow-up tool calls, file reads, and reasoning steps between your messages are free. In [CLI autopilot mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot#things-to-consider), the agent keeps working after your initial prompt. Each continuation step consumes credits at the selected model's multiplier.

For example, consider a CLI autopilot session that completes a task in 12 autonomous steps using Claude Sonnet 4.5 (1x). That session will consume 12 credits, not 1. The same session using Claude Opus 4.5 (3x) would consume 36 credits.

The [`--max-autopilot-continues` flag](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-line-options) limits how many autonomous continuation steps the agent can take after your initial prompt. It does not count the initial prompt itself. Always set this when using autopilot with a premium model to prevent a session from consuming more credits than intended.

Follow these steps to activate autopilot mode.

1. Open your terminal and start Copilot CLI.
2. Press Shift+Tab to cycle through modes until 'autopilot' appears in the status bar.
3. Enter your task prompt.
4. Review the changes the agent made when the session ends.

For scripted or automated use, run `copilot --autopilot --max-autopilot-continues 10 -p "your task here"`

With `--max-autopilot-continues 10`, the agent can take up to 10 autonomous continuation steps after the initial prompt. This gives a maximum of 11 total model interactions and 11 credits at a 1x model multiplier.

Autopilot mode is also available as a permission level in VS Code (preview). Administrators can disable it for all engineers using the ChatToolsAutoApprove policy.

## Plan availability and policy requirements

Copilot CLI is available on [all Copilot plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot) including Free, Pro, Pro+, Business, and Enterprise. On Business and Enterprise plans, your organisation administrator must enable the Copilot CLI policy before engineers can use it.

Copilot CLI does not have its own dedicated billing stock keeping unit (SKU). Only the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#premium-features) and Spark have separate SKUs.

Usage reports for Copilot CLI are available in the Copilot usage metrics dashboard. Enterprise-level reporting has been available since 27 February 2026. User-level reporting has been available since 5 March 2026.

## CLI worked example: cost comparison across models

The table below shows how model choice affects cost for a typical CLI autopilot session. It assumes 10 total model interactions to complete a task. Each step represents one call to the AI model. This includes the initial prompt (1 step) and all subsequent autonomous continuation steps.

In autopilot mode, [each continuation step consumes credits](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot) at the selected model's multiplier. To cap a session at 10 total model interactions, set `--max-autopilot-continues 9` (9 continuation steps after the initial prompt).

| Model | Multiplier | Cost per step | Total for 10 steps |
|-------|-----------|--------------|--------------------|
| GPT-5 mini | 0x | 0 credits | 0 credits |
| Claude Sonnet 4.6 | 1x | 1 credit | 10 credits |
| Claude Sonnet 4.5 | 1x | 1 credit | 10 credits |
| Claude Opus 4.5 | 3x | 3 credits | 30 credits |
| Claude Opus 4.6 | 3x | 3 credits | 30 credits |
| Claude Opus 4.7 | 15x | 15 credits | 150 credits |

> The above is true as of 1 June 2026

Multipliers are from the [Requests in GitHub Copilot documentation](https://docs.github.com/en/copilot/concepts/billing/copilot-requests). For current rates, see the [individual plan billing page](https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals).

Use GPT-5 mini for routine CLI tasks. Reserve premium models for tasks where you have confirmed an included model produced insufficient output. For multi-file implementation tasks, consider using the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) on GitHub.com instead. It charges once per session at the model's multiplier. This is usually more cost-effective than a CLI autopilot session with a premium model.

## Further reading

For more on how IDE agent mode billing differs from CLI autopilot billing, read the [agent mode billing guide](agent-mode-billing.md).