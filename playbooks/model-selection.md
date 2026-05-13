> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.
# Model selection guide

> Guidance on selecting the right AI code assistant and model for your task.

## Contents

[Purpose](#purpose)

[Tools in scope](#tools-in-scope)

[Selection by work type](#selection-by-work-type)

[Important considerations when selecting models](#important-considerations-when-selecting-models)

[Model recommendations by use case](#model-recommendations-by-use-case)

[Model personality comparison](#model-personality-comparison)

[Multi-model approach](#multi-model-approach)

[Practical tips for model selection](#practical-tips-for-model-selection)

[Working with constrained model access](#working-with-constrained-model-access)

[Premium credit management](#premium-credit-management)

[Comparative analysis](#comparative-analysis)

[Advanced considerations](#advanced-considerations)

[Getting started](#getting-started)

[Further reading](#further-reading)

## Purpose

This guide helps engineers and teams choose appropriate AI code assistants and models based on their work type, task requirements and cost considerations. It supports the programme's goal of optimising cost to use trade-offs while maintaining productivity gains.

The AI landscape changes rapidly. Always verify pricing and capabilities against vendor documentation before making decisions. Pricing shown in GBP is converted at approximately £0.74 per $1 USD.

## Tools in scope

The AI Engineering Lab programme includes 4 core AI code assistants: GitHub Copilot Enterprise by Microsoft and GitHub, Claude Code by Anthropic, Amazon Q Developer by AWS, and Gemini Code Assist by Google.

Each tool has different strengths, pricing models and model options. This guide will be updated as comparative evidence emerges from programme deployments.

## Selection by work type

Teams are cohorted by work type during assessment. Different work types may benefit from different tools or approaches.

### Modernisation projects

Work involving legacy system updates, language migrations and refactoring.

Evidence from deployments:

| Project | Tool used | Task | Result |
|---------|-----------|------|--------|
| Celink Loan Boarding | Amazon Q | EGL to Java migration | 33 days saved, £12,580 net saving |
| Sucden Financial | GitHub Copilot | Windows services to cloud microservices, SOAP to REST | 30% to 35% productivity gain |
| SCA Project | Cursor (Claude 3.7) | VB6 to .NET and Blazor modernisation | 10% to 25% efficiency gains |

### Application development

New application development, feature building.

Evidence from deployments:

| Project | Tool used | Task | Result |
|---------|-----------|------|--------|
| CAFCASS | GitHub Copilot | Angular, .NET, TypeScript development | 20% average productivity gain |
| Department of Transport | GitHub Copilot | General development and prototyping | 30% to 40% for prototyping |

### Test generation

Unit tests, integration tests, Behaviour-Driven Development (BDD) and Playwright tests.

Evidence from deployments:

| Project | Tool used | Task | Result |
|---------|-----------|------|--------|
| Celink | Amazon Q | Manual test case writing | 30 days reduced to 10 to 12 days (60% saving) |
| Department of Transport | GitHub Copilot | Test automation | 70% to 80% productivity gain |
| NEPO | GitHub Copilot (Claude 3.7 Sonnet) | Unit testing | 1 day reduced to 1.5 to 2 hours (75% saving) |
| Wood Project | GitHub Copilot | Unit testing | 20% to 30% gain |

### Legacy system maintenance

Maintaining and enhancing existing systems.

Evidence from deployments:

| Project | Tool used | Task | Result |
|---------|-----------|------|--------|
| Wood Project | GitHub Copilot | Legacy system maintenance | 10% to 20% overall gain |
| Sucden Financial | GitHub Copilot | Working with legacy code during migration | Particularly effective |

### Data and infrastructure

Data engineering, infrastructure automation, platform work.

Evidence: Limited specific evidence in current programme data. Will be updated as data and infrastructure teams are onboarded.

## Important considerations when selecting models

When choosing an AI model for your tool, consider these 2 primary characteristics.

### Model curiosity level

Model curiosity levels include:

- high curiosity: models that ask questions, dive deeper and explore problems broadly
- low curiosity: models that stick closely to instructions without much exploration

### Model agency level

Model agency levels include:

- high agency: models willing to go beyond your prompt and solve problems independently
- low agency: models that execute exactly what you ask without going further

## Model recommendations by use case

### Fast, iterative development

Best models are Claude 4.5 Haiku, Gemini 3 Flash, GPT-5.2 Instant.

Characteristics: fast response times, solid code quality, medium agency.

Use these models for:

- making quick code changes
- simple bug fixes
- rapid prototyping
- straightforward implementations
- high-frequency iterative workflows

### Deep problem analysis and new projects

Best models are Claude Opus 4.6, Claude Opus 4.5.

Characteristics: very high curiosity, excellent at reasoning through complex problems, strong multimodal understanding.

Use these models for:

- approaching a new codebase
- working on unfamiliar technologies
- broad exploration of solutions
- complex architectural decisions
- thinking outside the box
- long-horizon agentic tasks

### Daily driver for most tasks

Best model: Claude 4.5 Sonnet.

Characteristics: strong reasoning, excellent code generation, balanced agency.

Use this model for:

- general development work
- building features
- code reviews and explanations
- coding tasks that need reliable, high quality output

### Precise, instruction-following tasks

Best model: Claude 4.5 Sonnet or older versions for lower agency.

Characteristics: balanced agency, executes what you ask for.

Use this model for:

- stricter adherence to requirements
- simple, well defined tasks
- avoiding extra features
- more predictable outputs

### Creative problem solving

Best models: Claude 4.5 Opus, Claude Opus 4.6, GPT-5.3-Codex.

Characteristics: higher agency, goes above and beyond, validates solutions.

Use these models for:

- suggesting improvements
- exploring alternative approaches
- additional testing and validation
- comprehensive solutions

### Long-running agentic workflows

Best models: Claude Opus 4.6, GPT-5.3-Codex.

Characteristics: exceptional at sustained multi-step tasks, maintains context over extended sessions.

Use these models for:

- large refactors spanning multiple files
- code migrations across codebases
- complex feature builds requiring iteration
- production-ready assistants for operational workflows

## Model personality comparison

| Model | Speed | Curiosity | Agency | Best for |
|-------|-------|-----------|---------|----------|
| GPT-5.2 Instant | Very fast | Medium | Medium | Rapid development, everyday work |
| GPT-5.2 Thinking | Medium | High | High | Complex reasoning, professional work |
| GPT-5.2-Codex | Medium | High | High | Agentic coding, long-context tasks |
| GPT-5.3-Codex | Fast | Very high | Very high | Long-running development, multi-day projects |
| Gemini 3 Flash | Very fast | Medium | Medium to high | Speed-optimised coding, fast iterations |
| Gemini 3 Pro | Fast | High | High | Complex multimodal tasks, reasoning-first workflows |
| Claude 4.5 Haiku | Fast | Medium | Medium | Fast tasks with reasoning |
| Claude 4.5 Sonnet | Medium | Medium | Medium | Stable, predictable coding |
| Claude 4.5 Opus | Medium to slow | High | Very high | Comprehensive solutions, deep reasoning |
| Claude Opus 4.6 | Medium | Very high | Very high | Enterprise agents, long-running workflows |

### Model notes

GPT-5.3-Codex (February 2026) is 25% faster than GPT-5.2-Codex and the first model to help build itself. API access being rolled out.

Claude Opus 4.6 (February 2026) is the latest flagship, best for coding and enterprise agents. It includes agent team capabilities, 1M token context (beta) and discovered 500+ zero-day vulnerabilities in security testing.

Gemini 3 Flash (January 2026) is 3x faster than Gemini 2.5 Pro while outperforming it.

Gemini 3 Pro (November 2025) is a reasoning-first model with 1M token context window. It uses thinking levels (low/high) for controlling reasoning depth.

## Multi-model approach

For complex problems, consider using multiple models to validate solutions.

Technique: present the same problem to different AI assistants, then have each evaluate the other's solution.

To use multi-model validation, complete the following steps.

1. Present the problem to Model A, for example GitHub Copilot.
2. Present the same problem to Model B, for example Claude.
3. Ask Model A to evaluate Model B's solution.
4. Ask Model B to evaluate Model A's solution.
5. Create the best approach based on their analysis.

Each model will evaluate and return analysis. This approach adds overhead but can improve solution quality for important problems.

## Practical tips for model selection

### When you are unsure

When you are unsure which model to use, you should:

- start with auto mode as many platforms offer automatic model selection based on task and capacity
- use your daily driver, for example, Claude 4.5 Sonnet works well for most tasks
- switch models mid conversation if you are not getting the results you want

### Common switching scenarios

You should switch models when you:

- are stuck in a loop and need a different model for a fresh perspective
- need more creativity from high agency models
- want faster responses from GPT-5.2 Instant or Gemini 3 Flash
- need deeper analysis from Claude Opus 4.6, GPT-5.3-Codex, or other deep reasoning models
- require sustained multi-step work from GPT-5.3-Codex or Claude Opus 4.6

## Working with constrained model access

Not all teams can access the latest models. Government departments may be limited by procurement timelines, cost controls, data residency rules, or availability of on-premises deployments. In these situations, you may need to work with models that have significantly smaller context windows or fewer capabilities than current flagship models.

### Capability versus context size trade-offs

When choosing between a more capable model with a smaller context window and a less capable model with a larger one, the right choice depends on the task.

| Scenario | Recommendation |
|----------|----------------|
| Complex reasoning on a single small file | Use the more capable model — capability matters more than context size here |
| Refactoring across many files at once | Use the larger-context model — you need to share multiple files simultaneously |
| Long agentic workflow spanning many steps | Use the larger-context model — conversation history accumulates quickly |
| Generating a single well-defined function | Use the more capable model — the task fits in any context window |
| Analysing a large log file or test output | Use the larger-context model — the input itself may exceed a smaller window |
| Simple, repetitive code generation | Use the smaller, faster model — capability needs are low, context needs are small |

There is no universal answer. Match the model to the task, and apply context optimisation techniques when the task exceeds a model's natural capacity.

### Fallback strategies when access to large-context models is restricted

If your team's access to large-context models changes — for example, due to a procurement decision, cost controls, or a data residency requirement — follow these steps to adapt your workflow.

1. Identify which tasks in your current workflow relied on large context windows, such as whole-codebase refactors or long agentic sessions.
2. Apply chunking and summarisation techniques to break those tasks into smaller, context-appropriate units of work.
3. Use structured handoff notes between sessions to preserve progress without consuming context.
4. Update your team's AI usage standards to reflect the new constraints.

For detailed techniques, see [Working with constrained context windows](working-with-constrained-context-windows.md).

### Context and efficiency

For context and efficiency, consider:

- separate chat sessions, using different models for different types of tasks
- response time, balancing quality needs with speed requirements
- matching verbosity preference, some models are more verbose than others
- context window size: Gemini 3 Pro (1M), Claude Opus 4.6 (1M with beta), GPT-5.2 (400K)

Context window size is particularly important when your tasks involve multiple files, long conversations, or agentic workflows. A model with a larger context window can consider more of your codebase at once, but may be less capable or more expensive than a smaller-window alternative.

For teams with access restrictions — for example, those using older procured models, on-premises deployments, or models available under data residency constraints — context windows may be as small as 4,096 to 32,768 tokens. In these situations, see [Working with constrained context windows](working-with-constrained-context-windows.md) for techniques to adapt your workflow.

#### Context window size by task type

| Task type | Minimum recommended context window | Reason |
|-----------|-------------------------------------|--------|
| Inline code completion | 8,000 tokens | Needs current file and immediate neighbours |
| Chat-based coding assistance | 32,000 tokens | Needs file under edit and related interfaces |
| Multi-file refactoring | 128,000 tokens | Needs several files simultaneously |
| Agentic workflows spanning many steps | 200,000 tokens or more | Accumulated conversation history grows rapidly |
| Whole-codebase analysis or migration | 200,000 tokens or more | Needs broad codebase visibility |

## Premium credit management

Teams learn which AI code assistant models and approaches suit different tasks, optimising cost to use trade-offs and preventing licence waste.

Principle: use premium models for complex reasoning tasks and smaller or standard models for specialist or routine tasks.

Sustainable usage patterns across billing periods ensure that premium model calls are distributed effectively without exhausting limits early, maintaining consistent impact throughout the period.

Credit allocation is based on team size and maturity, with monitoring set up to track usage. Intervention occurs if burn rate is unsustainable.

## Comparative analysis

The programme is designed to generate evidence-based recommendations for tool to task matching.

The programme is structured so that:

- teams are cohorted by work type, including modernisation, application development, legacy maintenance, data projects and infrastructure
- different tools are deployed across similar cohorts
- differential impact is tracked as teams progress through maturity levels
- evidence feeds back into this guide

Current status: comparative data collection is ongoing. This section will be updated with findings as evidence accumulates.

## Advanced considerations

### Task-specific optimisation

Model recommendations should be task-specific and include:

- a code explanation using high curiosity models such as Claude 4.5 Opus or Claude Opus 4.6
- advice on bug fixing using balanced models such as Claude 4.5 Sonnet
- advice feature implementation using lower agency models for precision
- architecture design using high curiosity and high agency models
- advice on applying long-running refactors using GPT-5.3-Codex or Claude Opus 4.6
- advice on agentic workflows using Gemini 3 Pro or Claude Opus 4.6

### Team considerations

You should consider:

- consistency by establishing team standards for model selection
- documentation through models that excel at generating comprehensive documentation
- code reviews by models with higher agency that can provide more thorough feedback

### Cost and capacity

Cost and capacity factors include:

- auto mode, considering model availability and cost
- peak usage with backup model preferences
- budget constraints that balance model capability with usage costs
- batch processing for non-urgent tasks (50% cost savings available for GPT and Claude models)
- prompt caching for repeated contexts (up to 90% savings on Claude models)
- Gemini 3 thinking levels - use 'low' for faster, cheaper responses when complex reasoning is not required

## Getting started

1. Begin with a balanced model such as Claude Sonnet 4.5.
2. Experiment with different models for the same task.
3. Note which models work best for your specific use cases.
4. Build your personal quiver of 3 to 4 go-to models.
5. Do not be afraid to switch if you are not getting good results.

Model selection is highly personal and task dependent. What works best for one developer or use case may not work for another. The important thing is experimentation and building familiarity with different model characteristics.

## Further reading

### Internal resources

[GitHub Copilot guide](../manager-tool-guides/github-copilot/)

[Amazon Q Developer guide](../manager-tool-guides/amazon-q/)

[Tool comparative guidance](../manager-tool-guides/comparative-guidance.md) helps select appropriate tools.

[Prompt library](../prompt-library/) provides ready to use examples.

[Working with constrained context windows](working-with-constrained-context-windows.md) provides guidance on adapting workflows when access to large-context models is restricted.

### Model documentation

[Claude API Documentation](https://docs.anthropic.com/claude/docs) is the official Anthropic Claude documentation.

[OpenAI API Documentation](https://platform.openai.com/docs) covers GPT models and API reference.

[Google AI Studio Documentation](https://ai.google.dev/gemini-api/docs) covers Gemini model documentation.

[Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering) covers Claude specific prompting techniques.

[OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) covers best practice for GPT models.
