> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Token cost management

> Techniques and tools for reducing Large Language Model (LLM) token consumption and managing costs in agentic workflows.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[Why token cost matters](#why-token-cost-matters)

[Strategies overview](#strategies-overview)

[Caveman skill](#caveman-skill)

[RTK (Rust Token Killer)](#rtk-rust-token-killer)

[Advisor strategy](#advisor-strategy)

[Choosing the right approach](#choosing-the-right-approach)

[Further reading](#further-reading)

## Purpose

With usage-based billing active on GitHub Copilot (from 1 June 2026), token efficiency directly affects cost across all models. This page covers tools and techniques that reduce token consumption without sacrificing output quality.

## Who this is for

This guide is for:

- engineers and developers using AI coding tools with usage-based billing
- tech leads managing team costs on GitHub Copilot or the Anthropic Claude Platform
- teams building custom agentic pipelines and wanting to reduce token spend

## Why token cost matters

Token costs accumulate in 2 ways, where input tokens are what you send to the model, and output tokens are what the model generates.

Output tokens are typically 3 to 5 times more expensive than input tokens. Models such as Opus 4.8 and Opus 4.7 consume more tokens per task than Sonnet 4.6, even when the per-token rate is similar. The total cost per task scales with model verbosity and reasoning depth.

Reducing unnecessary tokens directly lowers spend without reducing quality. Verbose tool output, filler language, and running an expensive model for simple decisions all waste tokens.

## Strategies overview

The 4 strategies cover different parts of the stack, from output verbosity to model routing for application programming interface (API)-based pipelines.

| Strategy | What it reduces | Savings | Best for                             |
|---|---|---|--------------------------------------|
| Effort control | Output tokens and processing time | Varies by task (faster responses, lower token usage on low effort) | claude.ai and Cowork users |
| Caveman skill | Output tokens (filler language) | approximately 75% output reduction | Claude Code sessions                 |
| RTK | Input tokens (command output) | 60% to 90% per command | Any AI coding tool with shell access |
| Advisor strategy | Total cost (model routing) | approximately 12% cost reduction | API-based agentic pipelines          |

## Effort control

Effort control, introduced with Opus 4.8, allows users to choose how much effort Claude puts into a response. This control appears alongside the model selector in claude.ai and Cowork.

On higher effort settings, Claude will think more frequently and more deeply to give better responses. On lower effort settings, Claude will respond faster and use up a user's rate limits more slowly.

This control is available on all plans. For most development tasks, the default setting provides the best balance of quality and user experience. Use higher effort settings for difficult tasks and long-running asynchronous workflows.

Note: Effort control is currently available in claude.ai and Cowork. It is not yet available in Claude Code or the Messages API.

## Caveman skill

The caveman skill reduces Claude Code output tokens by approximately 75% by stripping filler language while preserving full technical accuracy. Code blocks, error messages, technical terms and git outputs remain unchanged. The savings are most significant on Opus 4.8 and Opus 4.7, which consume more tokens per task than Sonnet 4.6, but any Claude Code session benefits.

The skill is available at [https://github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman).

### Installation

Install in a Claude Code session:

```
claude install-skill JuliusBrussee/caveman
```

### Usage

Trigger with `/caveman`, 'caveman mode', or 'less tokens please'. Stop with 'normal mode'.

If you run agentic pipelines on Opus 4.8 or Opus 4.7, add this skill to your repo documentation to address token overhead.

## RTK (Rust Token Killer)

RTK is a high-performance command-line interface (CLI) proxy that reduces large language model (LLM) token consumption by 60% to 90% on common development commands. It filters and compresses command outputs before they reach your LLM context. It is a single Rust binary with support for over 100 commands and less than 10ms overhead.

RTK is available at [https://github.com/rtk-ai/rtk](https://github.com/rtk-ai/rtk).

### How it works

RTK applies 4 strategies per command type:

- smart filtering, which removes noise such as comments, whitespace and boilerplate
- grouping, which aggregates similar items such as files by directory or errors by type
- truncation, which keeps relevant context and cuts redundancy
- deduplication, which collapses repeated log lines with counts

### Example savings (30-minute Claude Code session)

| Command type | Calls | Without RTK (tokens) | With RTK (tokens) | Saving     |
|---|---|---|---|------------|
| ls or tree | 10x | 2,000 | 400 | 80% reduction |
| cat or read | 20x | 40,000 | 12,000 | 70% reduction |
| grep or rg | 8x | 16,000 | 3,200 | 80% reduction |
| git status | 10x | 3,000 | 600 | 80% reduction |
| cargo test or npm test | 5x | 25,000 | 2,500 | 90% reduction |
| Total | | approximately 118,000 | approximately 23,900 | 80% reduction |

### Installation

```bash
# Homebrew (recommended)
brew install rtk

# Quick install (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

### Setup for AI tools

```bash
rtk init -g                     # Claude Code / Copilot (default)
rtk init -g --gemini            # Gemini CLI
rtk init -g --codex             # Codex (OpenAI)
rtk init -g --agent cursor      # Cursor
```

After install, restart your AI tool. The hook transparently intercepts shell commands and rewrites them to RTK equivalents before execution. This achieves full adoption across all conversations and subagents with zero manual overhead.

### Supported AI tools

RTK supports Claude Code, GitHub Copilot (VS Code and CLI), Cursor, Gemini CLI, Codex, Windsurf, Cline, and others. See the [RTK supported agents guide](https://www.rtk-ai.app/guide/getting-started/supported-agents) for full details.

## Advisor strategy

The advisor strategy pairs Opus as an advisor with Sonnet or Haiku as an executor. The executor model runs the task end-to-end — calling tools, reading results, iterating towards a solution. When it hits a decision it cannot reasonably solve alone, it consults Opus for guidance. Opus returns a plan, correction, or stop signal, and the executor resumes.

This brings near Opus-level intelligence to agentic workflows while keeping costs near Sonnet or Haiku levels.

See the full details at [https://claude.com/blog/the-advisor-strategy](https://claude.com/blog/the-advisor-strategy).

### Results

Benchmark results show the following improvements:

- a 2.7 percentage point increase for Sonnet with Opus advisor on SWE-bench Multilingual over Sonnet alone, with 11.9% cost reduction per task
- a 41.2% score for Haiku with Opus advisor on BrowseComp, more than double Haiku solo at 19.7%, at 85% less cost per task than Sonnet solo

### How to use

The advisor tool is available on the Anthropic Claude Platform API. Add it to your Messages API request:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",  # executor
    tools=[
        {
            "type": "advisor_20260301",
            "name": "advisor",
            "model": "claude-opus-4-6",
            "max_uses": 3,
        },
        # ... your other tools
    ],
    messages=[...]
)
```

Set `max_uses` to cap advisor calls per request. GitHub bills advisor tokens at the advisor model's rates. GitHub bills executor tokens at the executor model's rates. The advisor only generates a short plan, typically 400 to 700 tokens. The executor handles the full output at its lower rate. Overall cost stays well below running the advisor model end-to-end.

### When to use

The advisor strategy is most relevant for teams building custom agentic pipelines via the Anthropic API. It is not currently available within GitHub Copilot or Claude Code directly, but applies to any custom tooling built on the Claude Platform.

### API enhancement: system entries in messages array

As of the Opus 4.8 release, the Messages API now accepts system entries inside the messages array. Developers can update Claude's instructions mid-task without breaking the prompt cache or routing the update through a user turn.

This can be used in a given harness to update permissions, token budgets, or environment context as an agent runs. This preserves prompt cache efficiency and reduces token overhead compared to previous workarounds.

Example:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    messages=[
        {"role": "user", "content": "Start analysing the logs"},
        {"role": "assistant", "content": "I'll begin the analysis..."},
        {"role": "system", "content": "Budget remaining: 50000 tokens. Prioritise critical errors."},  # Mid-task update
        {"role": "user", "content": "Continue with the critical errors"}
    ]
)
```

This feature is particularly useful for long-running agentic workflows where context or constraints need to change during execution.

## Choosing the right approach

| Scenario | Recommended approach |
|---|---|
| Claude Code interactive sessions | Caveman skill |
| Any AI tool with heavy shell usage | RTK |
| Custom agentic pipelines via API | Advisor strategy |
| High-volume Opus 4.8 or 4.7 sessions | Caveman + RTK (combine both) |
| Budget-constrained teams needing frontier reasoning | Advisor strategy (Haiku executor + Opus advisor) |

These approaches are complementary. RTK reduces input tokens from tool output. Caveman reduces output tokens from the model. The advisor strategy reduces total cost by routing expensive reasoning only to where it is needed.

## Further reading

[Model selection guide](model-selection.md) covers choosing the right model for your task.

[Working with constrained context windows](working-with-constrained-context-windows.md) covers techniques for managing limited context.

[GitHub's billing documentation](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/monitoring-your-copilot-usage-and-entitlements) covers Copilot usage-based billing details.

