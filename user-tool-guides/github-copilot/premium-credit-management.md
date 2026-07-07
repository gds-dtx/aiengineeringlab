> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# GitHub Copilot premium credit management

This page describes the premium request billing system that was in place before 1 June 2026. On 1 June 2026, GitHub moved all Copilot plans to usage-based billing tracked in GitHub AI Credits (1 credit = $0.01 USD) based on token consumption per model. For current billing guidance, see the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) and the [agent mode billing guide](agent-mode-billing.md).

The budget management, model multiplier, and cost control sections below remain relevant because the new system uses the same budget infrastructure. Model multipliers and spending caps work the same way under usage-based billing.

---

The guidance below describes how the premium request system worked and how to manage budgets effectively.

## Who this is for

This guide is for:

- engineers who need to understand credit usage and what happens when they run out
- enterprise administrators and organisation owners managing GitHub Copilot and configuring billing policies

## Before you start

Before using this guidance, you should:

- have GitHub Copilot Business or Enterprise enabled for your organisation
- understand your organisation's billing structure
- have administrator or owner permissions to manage policies

See also [billing for GitHub Copilot in organisations and enterprises](https://docs.github.com/en/copilot/concepts/billing/organizations-and-enterprises).

## Contents

[What are enterprise premium credits](#what-are-enterprise-premium-credits)

[Managing premium credits](#managing-premium-credits)

[When you run out of credits](#when-you-run-out-of-credits)

[Monitoring and optimising usage](#monitoring-and-optimising-usage)

## What are enterprise premium credits

### Understanding premium credits

Premium credits, also called premium requests, are a unit of measurement for using advanced AI capabilities in GitHub Copilot. Think of them as credits you spend when you use more powerful models or advanced features that require additional computing resources.

A premium request is any interaction where you ask Copilot to use premium features. Examples include:

- generating code with a premium AI model
- getting a pull request reviewed
- using autonomous coding features

Each time you use these capabilities, you consume premium requests based on the feature and model complexity.

### What your plan includes

All paid Copilot plans include unlimited:

- code completions using included models (GPT-5 mini)
- chat interactions using included models
- basic code suggestions and explanations

Your monthly premium request allowance includes a set number of premium requests to use advanced models and features. The exact number depends on your plan (see table below). Allowances reset on the first of each month at 00:00:00 Coordinated Universal Time (UTC). Unused requests do not carry over to the next month.

The included model (GPT-5 mini) does not consume premium requests on paid plans. You can use it unlimited times for everyday coding tasks.

For more detail on how requests are counted and billed, see [Requests in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests).

### Plans and premium request allowances

Different Copilot plans include different monthly premium request allowances per user. For the full and current breakdown, see [Plans for GitHub Copilot](https://github.com/features/copilot/plans).

All prices are shown in US dollars (USD).

| Plan | Monthly cost per user | Premium requests included |
|------|----------------------|--------------------------|
| Free | $0 USD | 50 premium requests |
| Pro | $10 USD | 300 premium requests |
| Pro+ | $39 USD | 1,500 premium requests |
| Business | $19 USD | 300 premium requests |
| Enterprise | $39 USD | 1,000 premium requests |

### What consumes premium requests

Premium requests power advanced Copilot features and models. The number consumed varies based on the model complexity and feature used.

#### Advanced AI models

When you select a more powerful AI model beyond the included ones, each interaction consumes premium requests based on its multiplier. The multiplier reflects how much more computing power the model requires. Some models have a multiplier below 1. This means one chat uses a fraction of a premium request. For example, 0.33 times means about one-third of a request per chat.

The table below shows current models and their multipliers. For the latest model list and current multipliers, check the [requests in GitHub Copilot documentation](https://docs.github.com/en/copilot/concepts/billing/copilot-requests), as these values change over time.

| Model | Type | Multiplier | Premium requests per chat |
|-------|------|------------|---------------------------|
| Claude Opus 4.8 | Premium (not enterprise-enabled) | 15x | 15 |
| Claude Opus 4.7 | Premium (not enterprise-enabled) | 15x | 15 |
| Claude Opus 4.6 | Premium | 3x | 3 |
| Claude Opus 4.5 | Premium | 3x | 3 |
| Claude Sonnet 4.6 | Premium | 1x | 1 |
| Claude Sonnet 4.5 | Premium | 1x | 1 |
| Claude Haiku 4.5 | Premium | 0.33x | 0.33 |
| Gemini 2.5 Pro | Premium | Check GitHub docs | Check GitHub docs |
| Gemini 3 Flash (Preview) | Premium | Check GitHub docs | Check GitHub docs |
| Gemini 3.1 Pro (Preview) | Premium | Check GitHub docs | Check GitHub docs |
| GPT-5.4 | Premium | Check GitHub docs | Check GitHub docs |
| GPT-5.4 mini | Premium | Check GitHub docs | Check GitHub docs |
| GPT-5.4 nano | Premium | Check GitHub docs | Codex VS Code extension only — not available in Copilot Chat |
| GPT-5.3-Codex | Premium | 1x | 1 |
| GPT-5 mini | Included | 0x | Unlimited on paid plans |

Claude Opus 4.8 and Claude Opus 4.6 fast mode (preview) are not currently enabled in the enterprise. See the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md) for the full enabled model list.

The included model (0x multiplier) is suitable for most everyday development tasks. For tasks that need advanced reasoning, see the [model selection guide](../../playbooks/model-selection.md).

On Copilot Free, all models consume at least one premium request per interaction. This applies even to models that are free for paid subscribers. See [requests in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) for the full breakdown by plan.

Your organisation or enterprise administrator can control which models are available to you through Copilot policies. You may not see a model listed above in your integrated development environment (IDE) because:

- your administrator may have restricted access to certain models to control costs or meet governance requirements
- your plan may not include access to that specific model
- the model may be in preview and not yet available to your organisation

Enterprise owners can define model policies that apply across the entire enterprise, or delegate control to individual organisation owners. These policies determine which AI models are accessible beyond the basic included models.

If you need access to a specific model that is not available, contact your organisation administrator or Copilot administrator.

For details on controlling which models and features are available to your users, see [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/policies).

Model availability and multipliers may change. Always check the model picker in your IDE for current options.

#### Features that consume premium requests

The table below shows which features consume premium requests and whether you can avoid costs by using included models. See [Requests in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) for the full official feature breakdown.

| Feature | Where you use it | Free with included models? | Premium request cost |
|---------|------------------|---------------------------|---------------------|
| Code completions | Your IDE | Yes (always free) | 0 requests |
| [Copilot Chat](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) | Your IDE | Yes | 0 with included models. 1 per message with others |
| Agent mode | Your IDE chat | Yes | 0 with included models. Multiplier rate with premium models |
| [Code Review](https://docs.github.com/en/copilot/concepts/agents/code-review) | GitHub.com or IDE | No | 1 request per review (always) |
| [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) | GitHub.com | No | 1 request per session |
| [Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli) | Your terminal | Yes, with included models | 0 with included models. Multiplier rate with premium models |
| Spark | GitHub.com | No | 4 requests per prompt (fixed) |
| Spaces | GitHub.com | No | 1 request per message |

Costs shown are before model multipliers. Premium models multiply the base cost (for example, Claude Opus 4.6 at 3x means 3 requests per use).

For detailed guidance on Copilot code review and autonomous coding agent capabilities in pull requests, including when to use them and their limitations, see [Pull request capabilities](pull-request-capabilities.md).

### Understanding agent mode, coding agent, and Copilot CLI

These three features all involve autonomous or agentic behaviour but work differently and GitHub bills them differently.

Agent mode works in your IDE as part of Copilot Chat. Each prompt you send counts as one premium request, multiplied by the selected model's multiplier. Internal tool calls are not charged separately. These include:

- reading files
- running commands
- searching the codebase

Using agent mode with an included model costs nothing. For full billing detail, model selection guidance, and admin controls, see the [agent mode billing guide](agent-mode-billing.md).

Copilot coding agent works on GitHub.com autonomously. You assign it a task and it creates a pull request without your involvement. [Each coding agent session uses one premium request](https://github.blog/changelog/2025-07-10-github-copilot-coding-agent-now-uses-one-premium-request-per-session/). This is true regardless of how many files it modifies or how complex the task is. For substantial multi-file work, this flat rate is more cost-effective than a long agent mode session with a premium model.

Copilot CLI is a terminal-based agent that reached general availability on 25 February 2026. Its autopilot mode bills per autonomous step rather than per user prompt. This means costs can accumulate faster than in IDE agent mode. For full billing detail, plan requirements, and a cost comparison table, see the [Copilot CLI billing guide](copilot-cli-billing.md).

For example, sending 10 messages in agent mode using GPT-5 mini costs 0 premium requests. Triggering one coding agent session on GitHub.com costs 1 premium request, regardless of how many files it changes. Running a 10-step CLI autopilot session with Claude Sonnet 4.5 costs 10 premium requests.

### Important notes on specific features

Since November 2025, the Copilot coding agent has had a dedicated billing stock keeping unit (SKU) separate from chat. This allows more detailed budget control per feature.

Copilot CLI supports included models. When you run out of premium requests, CLI falls back to included models in the same way as IDE chat. See the [Copilot CLI billing guide](copilot-cli-billing.md) for the full billing model.

## Managing premium credits

Enterprise administrators should configure policies and budgets to control spending. Development teams should monitor their individual usage.

### Step 1: review current usage

Before making changes, [download a usage report](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) to see which developers frequently hit limits. Use the report to:

- identify power users
- understand their requirements
- analyse which models and features cause the most usage

### Step 2: configure billing policies

Navigate to your [enterprise or organisation policy settings](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances) and review the 'Premium request paid usage' policy.

The policy options are:

- enabled (default) to allow users to exceed their allowance with charges at $0.04 USD per request
- enabled for specific products to allow paid usage only for selected AI tools (Copilot, Spark, coding agent)
- disabled to block all premium requests beyond the included allowance

### Step 3: set budgets

[Set up budgets](https://docs.github.com/en/billing/how-tos/set-up-budgets) to control spending. Navigate to your enterprise or organisation settings. Select Billing and licensing, then Budgets and alerts. Create a new budget for the Copilot premium requests product.

You have two budget options. A bundled premium requests budget (recommended) manages all premium request SKUs together in one view. Individual SKU budgets set separate limits for each AI tool (Copilot, Spark, coding agent). Since November 2025, the coding agent has had its own dedicated SKU. This makes individual SKU budgets more useful for teams that use the coding agent heavily.

### Step 4: choose hard or soft limits

The 'Stop usage when budget limit is reached' setting can be:

- enabled to create a hard limit (blocks usage when budget exhausted, no surprise charges)
- disabled to create a soft limit (allows overages with charges at $0.04 USD per request)

See [when you run out of credits](#when-you-run-out-of-credits) for detailed comparison, benefits and example costs.

### Step 5: enable budget alerts

Enable budget threshold alerts at 75%, 90% and 100% of budget consumption. Configure these in your billing settings to notify administrators before you reach limits. You will receive email notifications and a banner on GitHub when you reach each threshold.

### Step 6: enable additional paid requests (if needed)

Check that the 'Premium request paid usage' policy is enabled. It is on by default. Then set a budget to control how much you spend above your allowance.

For individual users, navigate to GitHub profile settings, select billing, and [set a budget for additional premium requests](https://docs.github.com/en/billing/how-tos/set-up-budgets).

For enterprises and organisations, ensure the policy is enabled and [configure budgets](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances) at enterprise, organisation or cost centre level.

If you receive licences from multiple sources, you must [select a billing entity](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/multiple-licences) using the 'Usage billed to' dropdown. If you do not select one, premium requests will be blocked.

### First-time setup checklist

The 'Premium request paid usage' policy is enabled by default. This means users can exceed their allowance and charges accrue automatically at $0.04 USD per request. Without setting a budget, costs can grow throughout the billing cycle with no automatic limit.

When you first configure Copilot, you should:

- set budget caps immediately to control spending (see [step 3: set budgets](#step-3-set-budgets))
- enable budget threshold alerts at 75%, 90% and 100% for early warning (see [step 5: enable budget alerts](#step-5-enable-budget-alerts))
- [download usage reports](https://docs.github.com/en/billing/understanding-billing-for-your-enterprise/billing-reports-reference) weekly during initial deployment to establish baseline patterns
- monitor the billing dashboard at least monthly

Without budget limits, users continue using premium models beyond their allowance and charges accrue throughout the billing cycle. You will not receive notification until the bill arrives at the end of the cycle. Set budget caps and alerts immediately to regain control.

### Important change to $0 budgets

Accounts created before 22 August 2025 previously had a default $0 USD budget that automatically blocked premium requests over the allowance. [GitHub removed all $0 USD budgets in December 2025](https://github.blog/changelog/2025-09-17-upcoming-removal-of-copilot-premium-request-0-budgets-for-enterprise-and-team-accounts/). If your account was created before that date, paid overages are now enabled by default. Review your budget settings and set explicit caps if you have not already done so.

## When you run out of credits

GitHub Copilot's behaviour when you exceed your premium request allowance depends on whether you configured a budget cap. See [GitHub Copilot premium requests](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests) for the full official guidance.

### With a budget cap (hard limit)

Enabling 'Stop usage when budget limit is reached' means:

- premium request usage stops when you exhaust the budget
- users automatically switch to included models (GPT-5 mini)
- no charges beyond the budget
- usage resumes when the budget resets or you increase it

Benefits include:

- predictable costs
- no unexpected billing
- clear spending controls

You should be aware that:

- workflows may be disrupted if limits are reached unexpectedly
- active budget management is needed
- engineers need clear communication about the limits

### Without a budget cap (soft limit by default)

Without a budget cap:

- Copilot automatically switches you to included models (GPT-5 mini) for the remainder of the billing cycle
- you can still use Copilot with included models, and basic code completions and chat remain available
- additional premium requests are billed at $0.04 USD per request after model multipliers (for example, Claude Opus 4.6 at 3x means each use costs $0.12 USD)
- access to premium models and Code Review is restricted until your allowance resets or you increase your budget

Benefits include:

- uninterrupted workflow
- flexibility for varying needs
- better support for unpredictable usage patterns

You should be aware that:

- costs can escalate without regular monitoring
- close usage tracking is needed
- unexpected bills are possible

You will see this message in your IDE:

> 'You have exceeded your premium request allowance. We have automatically switched you to an included model (GPT-5 mini). Enable additional paid premium requests to continue using premium models.'

This is not an error. It is how the system maintains service availability while controlling costs.

### What remains available

When premium requests are exhausted, you retain access to:

- unlimited code completions with included models (GPT-5 mini)
- Copilot Chat with included models
- agent mode with included models
- Copilot CLI with included models
- all basic IDE integrations
- standard code suggestions

You cannot use:

- premium AI models (Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Opus 4.5, Claude Sonnet 4.6, Claude Sonnet 4.5, Gemini 2.5 Pro, GPT-5.4)
- Copilot Code Review on pull requests
- Copilot coding agent for autonomous issue implementation
- features requiring premium model access

For full details on what Copilot can and cannot do in pull request workflows, see [Pull request capabilities](pull-request-capabilities.md).

[Response times for included models may vary during periods of high usage and may be subject to rate limiting](https://docs.github.com/en/copilot/concepts/rate-limits).

### Enterprise budget hierarchy

Enterprise-level budgets act as a failsafe for all spending. The budget hierarchy includes:

- cost centre budgets for specific teams or departments
- organisation budgets for individual organisations within the enterprise
- enterprise budget as an overall limit applying to all usage

If the enterprise budget is exhausted, usage is blocked even if lower-level budgets have remaining funds. Creating new budgets does not override existing budgets. If any applicable budget with 'Stop usage when budget limit is reached' enabled is exhausted, additional premium requests are blocked.

### Example scenario

```
A development team of 50 users on Copilot Business (300 premium requests per user per month):

Without budget cap:

- included: 15,000 premium requests
- actual usage: 30,000 premium requests
- overage: 15,000 × $0.04 USD = $600 USD
- total: $950 USD subscription + $600 USD overage = $1,550 USD

With $200 USD budget cap:

- included: 15,000 premium requests
- budget allows: additional 5,000 requests ($200 USD ÷ $0.04 USD)
- total available: 20,000 requests
- once reached: premium features stop, basic features continue
- total: $950 USD subscription + $200 USD budget = $1,150 USD (controlled)
```

## Monitoring and optimising usage

Control costs while maintaining developer productivity through monitoring and smart model selection.

### Track your usage

#### In your IDE

Click the Copilot status icon to:

- view current consumption
- see which models you are using
- check remaining allowance

#### On GitHub.com

Navigate to Settings, then Copilot to:

- view your [monthly usage dashboard](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-premium-requests)
- download reports
- configure billing preferences

### Optimise your usage

#### Choose the right model for each task

GPT-5 mini is free on paid plans and capable for the majority of everyday work. Reserve premium models for tasks that genuinely need advanced reasoning. For a full task-to-model mapping table, see [Choosing the right model for your task](agent-mode-billing.md#choosing-the-right-model-for-your-task) in the agent mode billing guide and the [model selection guide](../../playbooks/model-selection.md).

#### Costs per interaction at a glance

- $0 USD — GPT-5 mini (included model, paid plans)
- $0.04 USD — Claude Sonnet 4.6 and other 1x models (at overage rate)
- $0.12 USD — Claude Opus 4.6 or 4.5 (3x models, at overage rate)

#### Use coding agent for multi-file tasks

[Coding agent uses one request per session](https://github.blog/changelog/2025-07-10-github-copilot-coding-agent-now-uses-one-premium-request-per-session/), making it cost-effective for complex work. Enable it in repositories where autonomous pull request creation provides value. Disable it where you prefer manual development.

#### Monitor and communicate

Download usage reports monthly to identify high consumers. Contact them to understand workflows and share best practices. Explain to your teams:

- how premium requests work
- when to use included versus premium models
- the cost implications of different choices

GitHub Copilot models, pricing, and features are subject to change. This guidance was last updated May 2026. Always verify current information against the [official GitHub Copilot documentation](https://docs.github.com/en/copilot) and the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md).

GitHub Copilot is billed in US dollars (USD). UK government departments should apply current exchange rates when converting to pounds (GBP) for budget planning. All pricing in this document is shown in USD as per GitHub's official pricing.

## Further reading

### Change log and updates

[GitHub Copilot changelog](https://github.blog/changelog/label/copilot/) provides the latest feature updates

### Related guidance

[GitHub Copilot getting started guide](getting-started.md) covers initial setup and safe usage

[Pull request capabilities](pull-request-capabilities.md) explains code review, @Copilot mentions, and autonomous issue implementation in PRs

[GitHub Copilot advanced use guide](advanced-use.md) describes advanced features and techniques including agent mode workflows
