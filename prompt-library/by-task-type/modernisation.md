> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Modernisation prompts

Prompts and guidance for AI-assisted application modernisation, covering migration planning, dependency upgrades, framework migration, and scope decomposition.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[Where to find modernisation prompts](#where-to-find-modernisation-prompts)

[Backwards compatibility](#backwards-compatibility)

[Staged rollout](#staged-rollout)

[Compliance at each step](#compliance-at-each-step)

## Purpose

This file covers prompts and guidance for engineers planning and executing application modernisation with AI assistance. Modernisation is distinct from routine refactoring. It involves moving a system to a new technology, framework, platform, or architectural pattern, rather than improving existing code in place. Where detailed examples already exist in the repository, this file links directly to them.

Use this file to find prompts for:

- assessing an application's readiness for modernisation
- generating a migration strategy with ordered, independently deployable steps
- planning dependency upgrades, including identifying breaking changes
- decomposing a large modernisation goal into small, verifiable tasks
- migrating from one framework, language version, or platform to another

## Who this is for

This file is for:

- engineers migrating applications to newer language versions or frameworks
- engineers moving applications from on-premises infrastructure to cloud platforms
- technical leads scoping modernisation programmes
- forward deployed engineers (FDEs) supporting large-scale legacy modernisation engagements

---

## Where to find modernisation prompts

#### Planning and scoping modernisation work

The [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers using AI assistants during the Plan phase of the development lifecycle, including generating technical approach options, identifying complexity, and structuring spike documentation for unknown areas. This applies directly to scoping a modernisation programme.

#### All four phases of legacy modernisation

The [AI-assisted legacy modernisation](../../playbooks/legacy-system-modernisation.md) guide is the primary reference for AI-assisted legacy work. It covers analysis, planning, incremental execution, and behaviour preservation, and includes tool-specific guidance for GitHub Copilot .NET modernisation, Amazon Q, and Claude Code.

#### Analysis before modernisation begins

Start with [legacy maintenance prompts](legacy-maintenance.md) before planning any modernisation. Understanding the current state, including dependencies, technical debt, and implicit behaviour, is a prerequisite for producing a realistic migration strategy.

#### Tool-specific modernisation agents

Some AI tools include dedicated modernisation agents that go beyond general-purpose prompting. Read the [tool-specific capabilities](../../playbooks/legacy-system-modernisation.md#tool-specific-capabilities) section of the legacy modernisation guide for details on:

- GitHub Copilot app modernisation for .NET, which covers automated assessment, planning, and execution within Visual Studio
- Amazon Q, which covers Java and .NET modernisation capabilities for teams on AWS

---

## Backwards compatibility

Government services often have multiple consumers, including internal systems, partner APIs, and citizen-facing products. A modernisation that breaks an undocumented contract can cause failures that are difficult to trace and may affect live services.

When prompting for migration strategies, explicitly include backwards compatibility as a requirement. Ask the AI to identify all places where existing callers may be affected. Do not assume the AI knows about your consumers unless you tell it.

Include the following instruction in any migration planning prompt.

```
Identify all places where this change could affect existing callers or consumers.
For each, describe the backwards compatibility risk and how to mitigate it.
Flag any step that cannot be made backwards compatible without a deprecation period.
```

---

## Staged rollout

Modernisation of live services must be deployable in stages. Each increment should leave the service in a fully working state without requiring the next increment to function correctly. An increment that depends on the next step before the service works is a risk to live users.

When decomposing modernisation scope, verify with the AI that each proposed increment is independently deployable. If it is not, break it down further before proceeding.

You can use this check to include in decomposition prompts.

```
For each increment, confirm it leaves the service in a fully working,
deployable state without the following increment.
Flag any increment that cannot meet this requirement and explain why.
```

---

## Compliance at each step

Government standards apply to every deployed state of a service, not just the final modernised version. Each increment must meet [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG22/), [National Cyber Security Centre (NCSC)](https://www.ncsc.gov.uk/) security requirements, and the [Technology Code of Practice (TCoP)](https://www.gov.uk/guidance/the-technology-code-of-practice).

When prompting for migration strategies or decomposed scope, ask the AI to flag compliance implications at each step. Do not just check the end state. This prevents a situation where a partially modernised service is live but not compliant with government standards.

---

## Related guidance

[Refactoring prompts](refactoring.md)

[Context engineering](../../playbooks/context-engineering.md)

[Non-deterministic code assurance](../../governance/non-deterministic-code-assurance.md)

[Prompt template](../prompt-template.md)
