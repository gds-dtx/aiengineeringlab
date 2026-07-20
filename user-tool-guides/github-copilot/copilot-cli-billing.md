> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Copilot CLI billing and credit consumption

This guide explains how GitHub Copilot CLI (command-line interface) consumes GitHub AI Credits. It covers how its autopilot mode billing differs from agent mode in the IDE and what administrators need to do before engineers can use it.

## Contents

[Who this is for](#who-this-is-for)

[Before you start](#before-you-start)

[What Copilot CLI is](#what-copilot-cli-is)

[How Copilot CLI billing works](#how-copilot-cli-billing-works)

[Using lower-cost models in Copilot CLI](#using-lower-cost-models-in-copilot-cli)

[Autopilot mode in Copilot CLI](#autopilot-mode-in-copilot-cli)

[Plan availability and policy requirements](#plan-availability-and-policy-requirements)

[CLI worked example: cost comparison across models](#cli-worked-example-cost-comparison-across-models)

## Who this is for

This guide is for:

- engineers who use or plan to use Copilot CLI from the terminal
- enterprise administrators and organisation owners on Business or Enterprise plans who need to enable CLI access

## Before you start

Before reading this guide, you should understand how credits work and what your plan includes. Read the [GitHub models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) for the current per-token pricing model.

GitHub Copilot uses usage-based billing through GitHub AI Credits (1 credit = $0.01). Usage is charged from token consumption at model-specific rates. For Copilot Business and Copilot Enterprise, included AI Credit allowances are pooled at the billing-entity level. See the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) for governance details.

## What Copilot CLI is

GitHub Copilot CLI is a standalone terminal-based agent. It is a distinct product from the older `gh copilot suggest` and `gh copilot explain` commands, which have been retired.

## How Copilot CLI billing works

Each prompt you submit in Copilot CLI consumes tokens that are billed in AI Credits according to the selected model and total token volume.

The [default model is Claude Sonnet 4.5](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli#model-usage). You can change the model at any time using the `/model` command in interactive mode or the `--model` flag when running non-interactively.

Copilot CLI does not use auto model selection. You must choose your model explicitly, either in the CLI config file or per session.

## Using lower-cost models in Copilot CLI

Copilot CLI supports a range of models, including lower-cost options such as GPT-5 mini. Under usage-based billing, all model use is priced per token, so model choice and prompt size both affect spend.

To switch to a lower-cost model in an interactive session, type `/model` and select GPT-5 mini from the list. To set a persistent default, update your CLI config file to specify the model.

Do not assume Copilot CLI will fall back automatically to a zero-cost model when an allowance or budget is exhausted. Check GitHub's current billing documentation and your organisation policy settings for the behaviour that applies to your plan.

## Autopilot mode in Copilot CLI

Copilot CLI includes an autopilot mode. It lets the agent work through a task from start to finish without asking you to approve each step.

In [IDE agent mode](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide#using-agent-mode), the billing unit is the prompt-response interaction and token volume generated in that interaction. In [CLI autopilot mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot#things-to-consider), the agent keeps working after your initial prompt. Each continuation step adds more model interactions and therefore more token consumption.

For example, consider a CLI autopilot session that completes a task in 12 autonomous steps. That session will usually cost materially more than a short interactive session because each continuation step adds more prompts, responses, and context.

The [`--max-autopilot-continues` flag](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-line-options) limits how many autonomous continuation steps the agent can take after your initial prompt. It does not count the initial prompt itself. Always set this when using autopilot to prevent a session from consuming more credits than intended.

Follow these steps to activate autopilot mode.

1. Open your terminal and start Copilot CLI.
2. Press Shift+Tab to cycle through modes until 'autopilot' appears in the status bar.
3. Enter your task prompt.
4. Review the changes the agent made when the session ends.

For scripted or automated use, run `copilot --autopilot --max-autopilot-continues 10 -p "your task here"`

With `--max-autopilot-continues 10`, the agent can take up to 10 autonomous continuation steps after the initial prompt. This gives a maximum of 11 total model interactions, which helps you cap the likely cost of the session.

Autopilot mode is also available as a permission level in VS Code (preview). Administrators can disable it for all engineers using the ChatToolsAutoApprove policy.

## Plan availability and policy requirements

Copilot CLI is available on [all Copilot plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot) including Free, Pro, Pro+, Business, and Enterprise. On Business and Enterprise plans, your organisation administrator must enable the Copilot CLI policy before engineers can use it.

Copilot CLI does not have its own dedicated billing stock keeping unit (SKU). Only the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#premium-features) and Spark have separate SKUs.

Usage reports for Copilot CLI are available in the Copilot usage metrics dashboard. Enterprise-level reporting has been available since 27 February 2026. User-level reporting has been available since 5 March 2026.

## CLI worked example: cost comparison across models

The table below shows how model choice affects cost for a typical CLI autopilot session. It assumes 10 total model interactions to complete a task. Each step represents one interaction with the model, including the initial prompt and all subsequent autonomous continuation steps.

In autopilot mode, [each continuation step adds more model usage](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot). To cap a session at 10 total model interactions, set `--max-autopilot-continues 9` (9 continuation steps after the initial prompt).

| Model | Relative cost position | Typical use | Cost behaviour over 10 interactions |
|-------|------------------------|-------------|-------------------------------------|
| GPT-5 mini | Lower-cost | Routine terminal tasks | Usually lowest spend among chat-capable models |
| Claude Sonnet 4.6 | Mid-range | Strong general coding tasks | Moderate spend that scales with prompt size and output size |
| Claude Sonnet 4.5 | Mid-range | General coding tasks | Moderate spend that scales with prompt size and output size |
| Claude Opus 4.5 | High-cost | Complex reasoning tasks | High spend if used for long autopilot sessions |
| Claude Opus 4.6 | High-cost | Complex reasoning tasks | High spend if used for long autopilot sessions |
| Claude Opus 4.7 | Highest-cost | Precision and long-horizon reasoning | Very high spend risk over many continuation steps |

> The above is true as of 1 June 2026

For current rates, see the [GitHub models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing).

Use GPT-5 mini for routine CLI tasks. Reserve higher-cost models for tasks where you have confirmed a lower-cost model produced insufficient output. For multi-file implementation tasks, consider using the [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) on GitHub.com instead, but check its current billing behaviour before assuming it is cheaper than CLI autopilot.

## Further reading

For more on how IDE agent mode billing differs from CLI autopilot billing, read the [agent mode billing guide](agent-mode-billing.md).