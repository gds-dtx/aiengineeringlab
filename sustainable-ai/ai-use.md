> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Sustainable AI use: reducing environmental impact through better practice

Sustainable AI use is not about using AI less, it's about using it better. Clear prompts, appropriate model selection, and efficient workflows reduce environmental impact whilst improving your results.

Every AI interaction consumes compute resources. Better practices mean fewer wasted tokens, less energy consumed, and reduced environmental impact, whilst also saving time and money.

## Contents

[Purpose](#purpose)

[Who this applies to](#who-this-applies-to)

[The environmental cost of AI](#the-environmental-cost-of-ai)

[Principle 1: good prompting equals fewer wasted tokens](#principle-1-good-prompting-equals-fewer-wasted-tokens)

[Principle 2: right model for the right task](#principle-2-right-model-for-the-right-task)

[Principle 3: build sustainable habits](#principle-3-build-sustainable-habits)

[Measuring impact](#measuring-impact)

[Quick reference card](#quick-reference-card)

[Further reading](#further-reading)

## Purpose

This guide helps developers use AI code assistants more sustainably by reducing unnecessary compute through better prompting and smarter model selection.

Use this guide to:

- understand how AI usage translates to environmental impact
- write prompts that get results faster with fewer iterations
- select the right model for each task
- build sustainable AI habits into your workflow

## Who this applies to

All engineers using AI code assistants on government projects. This guidance aligns with the Continuous Improvement Plan requirement to identify opportunities for 'reduction in energy consumption' and 'measuring and reducing sustainability impacts.'

## The environmental cost of AI

AI models run on data centres that consume significant amounts of electricity, and each token generated requires compute power. The relationship is straightforward as more tokens require more energy, which results in a higher environmental impact.

AI energy consumption is driven by:

- token generation where every word the model produces costs compute
- failed iterations where unclear prompts lead to back-and-forth cycles that multiply consumption
- model size where larger premium models consume more resources than smaller ones

The good news is that the practices that reduce environmental impact also save time and improve output quality.

## Principle 1: good prompting equals fewer wasted tokens

A vague prompt leads to multiple rounds of clarification. Each round generates thousands of tokens. A clear, context-rich prompt gets the right answer first time.

### The human test

Before submitting a prompt, ask if a competent colleague could complete this task with these instructions alone.

If they would need to ask clarifying questions, your prompt needs more context.

#### Example of wasted compute

```
Prompt 1: 'Build the login system'
Response: 500 tokens (generic, wrong framework)

Prompt 2: 'Actually, we use FastAPI'
Response: 600 tokens (still missing requirements)

Prompt 3: 'It needs to use our existing Redis session store'
Response: 700 tokens (closer but wrong patterns)

Prompt 4: 'Here's an example of how we do auth...'
Response: 800 tokens (finally usable)

Total: 2,600 tokens across 4 exchanges
```

#### Efficient alternative

```
'Build a login endpoint for our FastAPI service that:

- uses PostgreSQL (existing user database)
- follows the async pattern from our registration endpoint (example below)
- implements JWT tokens matching our auth service pattern
- integrates with our Redis session store

[paste example]'

Total: 900 tokens in one exchange
```

The efficient prompt uses 65% fewer tokens whilst producing better results.

### High-impact prompting practices

| Practice | Impact | Why it reduces waste |
|----------|--------|---------------------|
| Include tech stack and versions | High | Eliminates 'which framework?' iterations |
| Provide code examples | High | Shows patterns instead of explaining them |
| State constraints upfront | Medium | Prevents rework when requirements surface later |
| Use reverse prompting | Medium | 'Ask me for any information you need' surfaces gaps early |
| Specify output format | Low | Reduces reformatting requests |

### The 70% rule

Good prompts reduce back-and-forth iterations by 70% or more. Five minutes spent crafting a detailed prompt saves hours of revision and thousands of tokens.

## Principle 2: right model for the right task

Premium models (GPT-4, Claude Opus) consume significantly more compute than smaller models. Using a premium model for simple tasks wastes resources.

### Model selection guide

| Task type | Recommended approach | Reasoning |
|-----------|---------------------|-----------|
| Complex reasoning, architecture decisions | Premium model | Worth the compute for quality |
| Code review, bug analysis | Premium model | Nuance matters |
| Boilerplate generation | Smaller or faster model | Pattern matching, not reasoning |
| Documentation, comments | Smaller or faster model | Straightforward language tasks |
| Test scaffolding | Smaller or faster model | Repetitive structure |
| Syntax questions, quick lookups | Smaller or faster model or skip AI entirely | Often faster to search docs |

### Prompt-chaining for efficiency

For complex tasks, chain prompts across model types.

1. Brainstorm with a conversational model (lower compute).
2. Plan with a reasoning model (medium compute).
3. Generate code with a specialised model (targeted compute).

This approach uses premium compute only where it adds value.

### Avoid premium model waste

Avoid common patterns that waste premium model compute, such as:

- using GPT-4 or Claude Opus for simple formatting tasks
- asking premium models to generate boilerplate that any model handles well
- running complex models for tasks where you will heavily edit the output anyway
- keeping premium model conversations open for quick questions

## Principle 3: build sustainable habits

### Before you prompt

Consider if you:

- need AI for this, or is it faster to do directly
- provided enough context for a first-time-right response
- are using the right model for this task's complexity

### Development

During development:

- batch related requests to avoid multiple prompts
- reuse effective prompts with a library of prompts shared in your team
- close idle sessions to avoid premium model contexts running unnecessarily

### Team practice

Your team should:

- share what works, adding efficient prompt patterns to the repository
- review AI usage and token efficiency during retrospectives
- set model defaults, configuring tools to default to appropriate model tiers

## Measuring impact

Track these metrics to understand your team's AI efficiency:

| Metric | What it indicates |
|--------|-------------------|
| Average prompts per task | Lower equals more efficient prompting |
| First-response acceptance rate | Higher equals better initial prompts |
| Model tier distribution | Should match task complexity distribution |
| Tokens per completed task | Overall efficiency measure |

## Quick reference card

Consider the following before each prompt.

- [ ] A colleague would understand this without questions
- [ ] You have included tech stack, examples, and constraints
- [ ] You are using the right model tier for this task

Efficient prompt template:

```
Context: [Tech stack, framework versions]
Task: [Specific request]
Constraints: [Requirements, patterns to follow]
Example: [Relevant code from your codebase]

Before proceeding, ask me any clarifying questions.
```

Model selection checklist.

- [ ] Complex reasoning to premium
- [ ] Code generation to standard
- [ ] Boilerplate or docs to fast or small
- [ ] Quick questions to consider skipping AI

## Further reading

For further information, refer to this [detailed guide on writing effective prompts](../playbooks/prompt-engineering/prompt-engineering-foundations.md) as well as this guide on 
[tool-specific recommendations](../manager-tool-guides/comparative-guidance.md), and a selection of guides on [reusable prompts that work](../prompt-library/).
