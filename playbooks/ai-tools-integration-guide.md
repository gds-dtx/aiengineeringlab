> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# How AI code assistants integrate into the SDLC

This guide explains how AI code assistants fit into government software development lifecycle (SDLC) environments. It covers where the tools run, how teams mature in their use of them, and where code assistants end and automated pipelines begin.

In this guide, IDE refers to an integrated development environment such as VS Code or JetBrains.

Use this guide as a starting point. Each section links to detailed guidance elsewhere in the AI Engineering Lab repository.

## Contents

[Who this is for](#who-this-is-for)

[Where AI code assistants run](#where-ai-code-assistants-run)

[Capability maturity](#capability-maturity)

[Code assistants and agentic pipelines](#code-assistants-and-agentic-pipelines)

[Related guidance](#related-guidance)

## Who this is for

Before adopting AI code assistants, consult your organisation's cyber security team to understand any department-specific AI policies or restrictions that apply.

This guide is for anyone involved in adopting AI code assistants in government, including:

- engineers wanting to understand how the tools fit into their existing workflow
- technical leads planning how to introduce AI tools to their team
- delivery managers and product owners assessing what adoption involves
- senior responsible owners needing an overview before reading detailed policy

If you are looking for phase-by-phase guidance on using AI assistants during development, read the [AI-assisted software development lifecycle playbook](ai-sdlc-playbook.md).

## Where AI code assistants run

AI code assistants follow one of three deployment patterns. The pattern affects what data leaves your machine, where processing happens, and which security controls apply.

The three patterns are:

- cloud-hosted, where your code context is sent to an external provider for processing and suggestions are returned to your IDE
- IDE integrated (hybrid), where some processing happens locally on your machine and some is sent to a cloud provider
- self-hosted, where the model runs entirely on infrastructure your organisation controls with no external data transfer

For detailed architecture diagrams and data flows for each pattern, read [threat model deployment architectures](../security/threat-modelling.md#deployment-architectures-and-data-flows-by-tool-type). For information on where each tool processes and stores data, read the [data residency guidance](../manager-tool-guides/data-residency.md).

### Choosing the right pattern

Your deployment pattern depends on your security requirements, data classification, and infrastructure.

The [comparative guidance](../manager-tool-guides/comparative-guidance.md) provides a framework for evaluating tools against your needs. The [data sovereignty and jurisdiction guidance](../policy/data-sovereignty-and-jurisdiction.md) covers the legal and compliance considerations for each pattern.

For most government teams working at OFFICIAL classification, cloud-hosted tools with enterprise licensing provide the best balance of capability and security controls. Teams handling OFFICIAL SENSITIVE data should consider self hosted options or cloud tools with UK data residency. Read the [guardrails base configuration](../governance/guardrails-base.md) for the full set of environment restrictions.

### Virtualised desktop environments

Many government organisations use virtualised desktop infrastructure (VDI) such as [Citrix](https://www.citrix.com/products/citrix-virtual-apps-and-desktops/), [Azure Virtual Desktop](https://azure.microsoft.com/en-gb/products/virtual-desktop), or [Amazon WorkSpaces](https://aws.amazon.com/workspaces/). AI code assistants can work in these environments, but there are additional considerations, including where:

- network connectivity from the virtual desktop to the AI provider must be permitted through your organisation's firewall and proxy configuration
- IDE extensions need to be installable within the virtual environment, which may require administrator approval
- performance depends on the virtual desktop specification, as AI tools add processing overhead to the IDE
- most tools store data locally that grows over time, including codebase indexes and session history
- tools consume additional memory during active use, particularly during initial codebase indexing

GitHub Copilot and [Amazon Q Developer](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/workspace-context.html) build [local workspace indexes](https://code.visualstudio.com/docs/copilot/workspace-context). [Amazon Kiro](https://kiro.dev/docs/editor/codebase-indexing/) builds a codebase index. [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) stores session history locally. Allow enough disk space on the virtual desktop for this data to grow over time.

Test tools with your actual codebase before rolling out to VDI users. Fixed memory allocations in virtualised environments leave less space for usage spikes than physical machines.

No vendor currently publishes a deployment guide for VDI environments. Check with your platform team whether AI coding tool traffic is permitted from your virtualised environment. Test tool performance before requesting licences at scale.

## Capability maturity

As teams adopt AI code assistants, their use of the tools evolves through distinct stages. This progression is about what the team does with the tools, not whether the team is ready to start.

AI Engineering Lab measures team readiness separately through the [maturity assessment framework](../assessment/maturity-assessment-framework.md), which classifies teams as starting, developing, or established. 

The capability progression described here is different. It tracks how a team's technical practice changes as they gain experience with AI tools.

Each of the following levels builds on the one before it. For example, agentic workflows at level 3 produce poor results without the shared instruction files and context engineering established at level 2. Teams that skip levels typically find AI output does not match their conventions. Without team-specific context, the AI falls back on generic patterns from its training data.

### Level 1: basic prompting

Engineers use AI code assistants for inline code completion and simple chat queries. This is the starting point for most teams.

In practice, teams at this level:

- accept or reject inline code completion suggestions as they type
- use chat to explain unfamiliar code or ask how to implement something
- work independently with the tool, without a shared team approach
- gain productivity through faster boilerplate generation and code explanation

At this level, engineers need:

- basic understanding of [how to write effective prompts](prompt-engineering/prompt-engineering-foundations.md)
- awareness of AI limitations, including hallucinated dependencies and incorrect suggestions
- knowledge of the [guardrails](../governance/guardrails-base.md) for safe use

### Level 2: team-wide context engineering

The team invests in structured context so that AI tools produce more consistent and relevant output. This is where productivity gains become significant.

In practice, teams at this level:

- create shared instruction files such as `.github/copilot-instructions.md` or `CLAUDE.md` that encode coding standards and project conventions
- optimise repository structure so the AI can find relevant context
- share prompt patterns across the team rather than each engineer working independently
- produce output that aligns with team conventions without manual correction

At this level, engineers need:

- an understanding of how AI tools consume context from files, project structure, and configuration
- an ability to write effective instruction files for the team's codebase
- familiarity with the [prompt library](../prompt-library/) for reusable patterns

Read the [context engineering playbook](context-engineering.md) for detailed techniques on structuring context. Read the [AI code assistant instructions guide](ai-code-assistant-instructions.md) for guidance on creating shared instruction files.

### Level 3: agentic workflows

Engineers use AI tools in agent mode. The tool executes multi-step tasks with human oversight at checkpoints rather than one suggestion at a time.

In practice, teams at this level:

- delegate larger tasks to the AI, such as refactoring a module or generating a test suite across multiple files
- apply AI-generated changes across several files in a single operation
- review changes at checkpoints rather than line-by-line
- complete in minutes, with review, tasks that previously took hours

At this level, engineers need:

- an understanding of how to define clear task boundaries for agentic operations
- an ability to review AI-generated changes effectively at scale
- familiarity with the [agentic AI guardrails](../governance/guardrails-base.md#agentic-ai-guardrails) including autonomy levels, checkpoint requirements, and kill switch procedures

### Level 4: pipeline integration and multi-agent systems

Teams embed AI in automated workflows beyond the developer's IDE. This is the most advanced stage and requires additional governance.

This level depends on having levels 1 to 3 in place. Without custom instructions and structured context from level 2, pipeline agents generate code based on whatever patterns they find in the repository. No developer is present to correct the output in real time.

In practice, teams at this level:

- run AI agents as part of CI/CD (continuous integration and continuous delivery) pipelines, for example to review pull requests automatically or generate documentation on commit
- chain multiple AI agents together, where the output of one feeds into the next
- use AI for automated refactoring, dependency updates, or code migration at scale
- shift human oversight from reviewing individual suggestions to monitoring system behaviour

At this level, engineers need:

- an understanding of the distinction between code assistants and agentic pipelines (see the next section)
- an ability to design and monitor automated AI workflows
- deep familiarity with the [security policies](../security/security-policies.md) covering autonomous agents, including approval requirements for level 4 and level 5 autonomy

Most teams will not reach this level during initial adoption. It is included here so teams can see where the progression leads and plan accordingly.

## Code assistants and agentic pipelines

As teams work through the capability levels, understanding the boundary between two different types of AI tooling becomes essential.

A code assistant is a tool that a developer uses interactively. The developer writes code, asks questions, and reviews suggestions in their IDE. GitHub Copilot, Claude Code, Amazon Kiro, Amazon Q, and Gemini Code Assist all function as code assistants. The developer remains in control at all times.

An agentic pipeline is AI embedded in an automated workflow. It runs without continuous developer interaction. Examples include an AI agent that reviews pull requests automatically, a pipeline step that generates release notes from commit history, or an automated refactoring job that runs overnight.

### Where each fits in the SDLC

Code assistants support developers across every phase of the software development lifecycle. The [AI-assisted SDLC playbook](ai-sdlc-playbook.md) covers this in detail, from planning through to monitoring.

Agentic pipelines typically sit in specific phases, which are:

- build and test, where agents run automated code review or generate test suites as part of CI
- release, where agents generate documentation or changelog entries
- operate, where agents monitor logs and suggest remediations

### Different governance requirements

Code assistants and agentic pipelines carry different levels of risk and require different controls.

The [guardrails base configuration](../governance/guardrails-base.md#g-ag-01-autonomy-level-classification) classifies AI tools by autonomy level from level 1 (suggestive) through to level 5 (fully autonomous). Code assistants typically operate at levels 1 to 3. Agentic pipelines operate at levels 3 to 5.

The governance requirements for each level are where:

- code assistants require standard human review before code is committed
- agentic pipelines at level 4 require checkpoint controls ([G-AG-04](../governance/guardrails-base.md#g-ag-04-checkpoint-requirements)), time limits, kill switch testing ([G-AG-03](../governance/guardrails-base.md#g-ag-03-kill-switch-requirements)), and branch isolation
- agentic pipelines at level 5 require Senior Information Risk Owner (SIRO) approval, dedicated security assessment, and dual approval for all pull requests

Read the [security policies on agentic AI governance](../security/security-policies.md) for the full set of requirements. Before implementing any agentic capabilities, consult your organisation's cyber security team to confirm what is permitted in your environment.

## Related guidance

[Getting started with GitHub Copilot](../user-tool-guides/github-copilot/getting-started.md)

[Getting started with Claude Code](../user-tool-guides/claude-code/getting-started.md)

[Getting started with Gemini Code Assist](../user-tool-guides/gemini-code-assist/getting-started.md)

[Getting started with Amazon Kiro](../manager-tool-guides/amazon-kiro/README.md)

[Getting started with Amazon Q](../manager-tool-guides/amazon-q/README.md)

[Prompt engineering guides](prompt-engineering/)

[Model selection](model-selection.md)

[Working with constrained context windows](working-with-constrained-context-windows.md)
