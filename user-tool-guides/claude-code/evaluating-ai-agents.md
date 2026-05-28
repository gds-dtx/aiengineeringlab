> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Evaluating AI agents

## Purpose

This guide explains how to design and run evaluations for AI agents. It covers evaluation types, how to use a language model as a judge, and common pitfalls to avoid.

## Who this is for

This guide is for:

- engineers building or assessing AI agents with Claude
- teams wanting a practical framework for measuring whether agents work

## Contents

[Types of evaluation](#types-of-evaluation)

[Using a language model as a judge](#using-a-language-model-as-a-judge)

[Common pitfalls](#common-pitfalls)

[Further reading](#further-reading)

## Types of evaluation

Anthropic's engineering post [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) explains how to design and run evaluations for agentic systems.

You can use 3 main types of evaluation:

- task-completion evals to measure whether an agent achieves a goal
- trajectory evals to assess the steps an agent takes to reach its goal
- component evals to test individual parts of the agent in isolation

## Using a language model as a judge

You can use a language model (LLM) to assess the quality of an agent's output. This approach scales better than manual review for large evaluation sets.

When using an LLM as a judge, you should:

- provide clear, specific criteria for what counts as a good response
- use structured output formats to make results easier to analyse
- validate the judge's decisions against human ratings on a sample

## Common pitfalls

### Overfitting to the eval

This happens when you optimise an agent for a specific benchmark rather than real-world performance. The agent may appear to improve on tests but does not improve in practice.

### Single-metric thinking

This is when you measure only one aspect of performance. Use multiple evals to get a complete picture of agent behaviour.

## Further reading

Anthropic's [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) covers evaluation design in detail.

The [advanced use guide](advanced-use.md) covers writing better prompts, managing context for long-running work, and security practices.