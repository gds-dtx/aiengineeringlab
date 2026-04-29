> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Prompt engineering for AI code assistants: a complete playbook

Practical techniques for prompting AI code assistants to get consistent, high-quality results that match your team's standards.

## Purpose

AI code assistants are powerful tools, but they require structured approaches to provide consistent value. This playbook teaches you prompt engineering and the techniques for communicating effectively with AI assistants to get better results, whether you are working solo or enabling an entire team.

Use this playbook to:

- write prompts that produce production-ready code
- apply proven techniques (chain of thought, few-shot, reverse prompting) to your daily work
- maintain code quality and consistency when using AI
- understand when and how to use AI effectively across the development lifecycle
- establish team standards for AI-assisted development

## Who this applies to

This playbook applies to all technical personnel using AI code assistants on government projects, including:

- software engineers
- technical architects
- team leads and engineering managers
- civil servants, contractors and suppliers with access to government code repositories

## Introduction

Your colleague asks an AI assistant to build an authentication system and gets production-ready code in minutes. You ask the same assistant for the same thing and get something that barely compiles.

The difference is simpler than you might think: effective prompting relies on how you communicate your requirements to the AI.

Whether you are generating code, learning new concepts, exploring design options or debugging issues, the quality of AI assistance depends on how you ask for it. This playbook teaches you prompt engineering and the structured techniques for getting consistent, high-quality results from AI assistants across all these tasks.

### The AI adoption challenge

Many organisations struggle with AI code assistant adoption and face these common issues. 

#### 1. Inconsistent results
Engineers get vastly different quality outputs depending on their prompts and understanding of how Large Language Models (LLMs) work. Some copy and paste code without understanding what it does or whether it is even correct.

#### 2. No shared standards
Each team develops their own approach, with some embracing AI assistants, others avoiding them entirely, with wildly varying code quality as a result.

#### 3. Architecture drift
AI-generated code does not follow company standards, leading to inconsistent patterns across the codebase.

#### 4. Knowledge silos
When someone figures out how to get great results, that knowledge stays trapped in their head instead of spreading across teams.

### The solution

These organisational challenges start with individual engineers not knowing how to prompt effectively. When everyone on a team learns prompt engineering, the organisational problems resolve naturally.

This playbook teaches you the foundational prompt engineering techniques. You will learn how to:

- write prompts that give AI the context it needs
- use proven patterns like chain of thought and few-shot prompting
- adapt your prompting approach to different tasks
- recognise when AI is helping and when it is not

### How to use this playbook

For individual engineers: follow the techniques through your development workflow. Start with the foundational techniques, then apply them to your daily work.

For team leads: use this as a training resource. Share relevant sections with your team, establish standards based on these patterns and create your own examples that match your tech stack.

For organisations: adapt these techniques to your context. Create internal guidelines, build example libraries and establish review processes that ensure AI-generated code meets your standards.

Throughout this guide, you will see examples that demonstrate core principles. While the specific technologies may differ from yours, the prompting patterns and techniques apply universally.

### Core content

Part 1: Foundational prompting techniques
- [The human test: can someone else do this task](./prompt-engineering-foundations.md#the-human-test-can-someone-else-do-this-task)
- [The 5 core techniques](./prompt-engineering-foundations.md#the-5-core-techniques)
- [Combining techniques: the power prompt](./prompt-engineering-foundations.md#combining-techniques-the-power-prompt)
- [Context: the secret weapon](./prompt-engineering-foundations.md#context-the-secret-weapon)

Part 2: Prompt engineering for different AI assistant roles
- [As a coach and mentor](./prompt-engineering-ai-roles.md#as-a-coach-and-mentor)
- [As a design consultant](./prompt-engineering-ai-roles.md#as-a-design-consultant)
- [For fast-track onboarding](./prompt-engineering-ai-roles.md#for-fast-track-onboarding)
- [Using instruction files (project context)](./prompt-engineering-ai-roles.md#using-instruction-files-project-context)

Part 3: Prompt engineering for common development tasks
- [Use case 1: 'I need to write a new function'](./prompt-engineering-use-cases.md#use-case-1-i-need-to-write-a-new-function)
- [Use case 2: 'This code is a mess - help me refactor'](./prompt-engineering-use-cases.md#use-case-2-this-code-is-a-mess-help-me-refactor)
- [Use case 3: 'Something's broken - help me debug'](./prompt-engineering-use-cases.md#use-case-3-somethings-broken-help-me-debug)
- [When AI gets it wrong (and what to do about it)](./prompt-engineering-use-cases.md#when-ai-gets-it-wrong-and-what-to-do-about-it)
- [AI-generated code checklist](./prompt-engineering-use-cases.md#ai-generated-code-checklist)

Part 4: Prompt engineering for testing: getting comprehensive coverage
- [Types of tests to generate](./prompt-engineering-testing.md#types-of-tests-to-generate)
- [Security testing - critical for government projects](./prompt-engineering-testing.md#security-testing-critical-for-government-projects)
- [Accessibility testing - meeting WCAG standards](./prompt-engineering-testing.md#accessibility-testing-meeting-wcag-standards)
- [Performance testing](./prompt-engineering-testing.md#performance-testing)
- [Edge case discovery](./prompt-engineering-testing.md#edge-case-discovery)
- [Maintaining test suites](./prompt-engineering-testing.md#maintaining-test-suites)
- [Common testing mistakes](./prompt-engineering-testing.md#common-testing-mistakes)

Part 5: Prompt engineering for code documentation
- [The documentation hierarchy](./prompt-engineering-documentation.md#the-documentation-hierarchy)
- [Level 2: docstrings - the primary documentation](./prompt-engineering-documentation.md#level-2-docstrings-the-primary-documentation)
- [Level 3: README files - project overview](./prompt-engineering-documentation.md#level-3-readme-files-project-overview)
- [Level 4: API documentation](./prompt-engineering-documentation.md#level-4-api-documentation)
- [Maintaining documentation](./prompt-engineering-documentation.md#maintaining-documentation)
- [Automating documentation with Sphinx](./prompt-engineering-documentation.md#automating-documentation-with-sphinx)
- [Common documentation mistakes](./prompt-engineering-documentation.md#common-documentation-mistakes)

Part 6: Prompt engineering for AI coding agents
- [Chat vs agentic systems: how to prompt each](./prompt-engineering-agents.md#chat-vs-agentic-systems-how-to-prompt-each)
- [The human-in-the-loop principle](./prompt-engineering-agents.md#the-human-in-the-loop-principle)
- [How to prompt agents safely](./prompt-engineering-agents.md#how-to-prompt-agents-safely)
- [Tech debt from AI](./prompt-engineering-agents.md#tech-debt-from-ai)

## Conclusion: the professional's AI workflow

### Key principles revisited

1. Provide comprehensive context including tech stack, constraints and patterns to help AI understand your requirements.
2. Build functionality iteratively in layers rather than expecting perfect code immediately.
3. Match your prompting technique to task complexity and specific requirements.
4. Use chat-based AI for learning and critical code, and agents for repetitive mechanical tasks.
5. Always understand, test and review all AI-generated code before accepting it.
6. Step away when AI stops helping after several iterations or when tasks are faster without AI.

## Solving the adoption challenges

Remember the problems we started with? Here is how these techniques solve them.

#### 1. Inconsistent results
Fixed by establishing standard prompting patterns. When everyone uses the human test and provides rich context, output quality becomes consistent.

#### 2. No shared standards
Create a team prompting guide based on these techniques. Share example prompts that work well. Review AI-generated code in pull requests just like human code.

#### 3. Architecture drift
 Use few-shot prompting with your existing patterns. AI matches your team's style when you show it examples.

#### 4. Knowledge silos
Document your effective prompts. When someone discovers a great technique, add it to your team's playbook.

### The competitive advantage

Engineers who thrive are not those who avoid AI or blindly trust it. They are the ones who:

- communicate clearly and specifically
- provide rich context
- apply the right prompting technique for the task
- review with domain expertise
- test everything
- understand before accepting
- use AI to handle the tedious work while they focus on architecture, design and critical thinking

AI coding assistants do not replace the need for skill, they amplify it. The better you understand software development, the better you can direct AI to help you.

### Your next steps

1. Pick one technique from this guide to try this week.
2. Apply it to your current work.
3. Compare results before and after using the technique.
4. Share what works with your team.
5. Build your own examples that match your tech stack.

The future belongs to engineers who can think clearly, communicate precisely and use AI effectively.

## Further reading

This playbook works best when combined with the wider resources in this repository.

### Start here

[Maturity assessment framework](../../assessment/maturity-assessment-framework.md) helps you understand your starting point.

[AI tool comparative guidance](../../manager-tool-guides/comparative-guidance.md) helps you choose an assistant and rollout approach.

### Prompts and reuse

[Prompt library](../../prompt-library/) provides reusable prompts by task and language.

[Prompt template](../../prompt-library/prompt-template.md) provides the standard structure for new prompts.

### Quality and governance

[Measurement playbook](../../quality-metrics/measurement-playbook.md) helps you track progress and demonstrate value.

### Next playbooks

[AI SDLC playbook](../ai-sdlc-playbook.md) covers embedding AI into delivery practices.

[Context engineering](../context-engineering.md) covers advanced context techniques.

### Tool guides (pick the one you use)

[GitHub Copilot guide](../../manager-tool-guides/github-copilot/)

