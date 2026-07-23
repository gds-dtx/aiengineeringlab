> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Legacy maintenance prompts

Prompts and guidance for AI-assisted analysis of legacy codebases, covering technical debt identification, dependency mapping, codebase documentation, and characterisation test generation.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[Where to find analysis prompts](#where-to-find-analysis-prompts)

[Generate an architectural map](#generate-an-architectural-map)

[Map service and data boundaries](#map-service-and-data-boundaries)

[Evaluate modernisation patterns](#evaluate-modernisation-patterns)

[Technical debt classification](#technical-debt-classification)

[Regenerate missing documentation](#regenerate-missing-documentation)

[Characterisation tests](#characterisation-tests)

[Implicit behaviour](#implicit-behaviour)

## Purpose

This file covers prompts and guidance for understanding a legacy codebase before changing it. Where detailed examples already exist in the repository, this file links directly to them. Where gaps exist, this file provides the prompts directly.

Use this file to find prompts for:

- generating an architectural map of a system with missing or outdated documentation
- identifying service and data boundaries to understand where coupling is tight or loose
- identifying and documenting technical debt across a codebase
- mapping dependencies between components and external systems
- regenerating missing documentation from existing code
- producing characterisation tests that capture current behaviour before refactoring begins
- understanding the implicit contracts a legacy system has with its callers
- evaluating which modernisation pattern fits your system

## Who this is for

This file is for:

- engineers onboarding to an unfamiliar legacy codebase
- engineers preparing a codebase for refactoring or modernisation
- technical leads conducting a legacy system assessment

---

## Where to find analysis prompts

The following files in this repository contain prompts that apply directly to legacy analysis work, even though they are not labelled as specific to legacy work.

#### Understanding what a system does at a high level

The [prompt engineering for AI roles — fast-track onboarding section](../../playbooks/prompt-engineering/prompt-engineering-ai-roles.md#for-fast-track-onboarding) contains prompts for getting a rapid high-level understanding of an unfamiliar codebase. The "Understanding the codebase", "Tracing through flows", and "Understanding architectural decisions" prompts are directly applicable to legacy analysis. Use them when starting on a system you have not worked in before.

#### Regenerating missing documentation from code

The [prompt engineering for documentation](../../playbooks/prompt-engineering/prompt-engineering-documentation.md) guide covers generating README files, docstrings, and inline comments from existing code. Legacy systems frequently have missing or outdated documentation. Use the README and docstring prompts in that guide to rebuild a documentation baseline before planning any modernisation work.

#### Handling large codebases

The [context engineering playbook](../../playbooks/context-engineering.md) explains how to feed a large legacy codebase to an AI assistant in manageable pieces. The sections on selective file inclusion, summarising distant context, and progressive disclosure are essential when the system is too large to provide in full.

#### Class and function level analysis

The [prompt engineering for common development tasks](../../playbooks/prompt-engineering/prompt-engineering-use-cases.md#use-case-2-refactoring-complex-code) guide covers the analyse step of the 3-step refactoring approach. It prompts AI to identify responsibilities, anti-patterns, and complexity in a single class or function. Use this once you have narrowed your work to a specific component, not as a starting point for whole-system analysis.

#### Testing legacy code

The [prompt engineering for testing](../../playbooks/prompt-engineering/prompt-engineering-testing.md) guide covers generating tests for existing code, including edge case discovery and security test generation. Use this alongside the characterisation test guidance below.

---

## Generate an architectural map

Use this prompt when no architecture documentation exists and you need to understand the whole system before planning any changes. Feed the AI your directory structure, dependency manifests, and any configuration files you have, rather than source code files at this stage.

```
Act as a senior architect performing a discovery analysis of this legacy system.

I am providing you with:
[list what you are providing — for example: directory structure, package.json / pom.xml /
requirements.txt, database schema, infrastructure configuration, any README files that exist]

[paste the above]

From this information, produce:

1. System overview — what this system does in 3 to 5 sentences.
2. Component inventory — list every identifiable component, service, or module with
   a one-line description of its likely responsibility.
3. Technology stack — languages, frameworks, runtime versions, and key libraries.
4. External integrations — databases, APIs, message queues, file systems, and
   third-party services the system connects to.
5. Data flows — describe how data moves through the system at a high level.
6. Gaps in your analysis — list anything you cannot determine from the information
   provided and what additional files or information would fill those gaps.

Do not speculate beyond what the evidence supports. Flag uncertainty explicitly.
```

Use this prompt at the very start of any legacy analysis, before examining individual files. Repeat it as you gather more evidence to progressively refine the map.

Do not paste large amounts of source code at this stage. The goal is a system-level picture, not a code review. Source code analysis comes in a later step, once you know which components to concentrate on.

---

## Map service and data boundaries

Use this prompt once you have a system map and need to understand coupling. This information determines which modernisation pattern is feasible. It also shows which components can be extracted independently.

```
Act as a senior architect analysing the service and data boundaries of this legacy system.

System overview:
[paste the system overview from your architectural map]

I am providing you with the following additional files:
[list what you are providing — for example: key source files for each component,
database schema, API contracts or interface definitions, configuration files
showing how components connect]

[paste the above]

Analyse and produce:

1. Ownership boundaries — for each component, what data does it own exclusively,
   what data does it share, and what data does it read from other components.
2. Coupling assessment — identify where components are tightly coupled
   (shared database tables, direct method calls across boundaries, shared mutable state)
   and where they are loosely coupled (event-driven, API contracts, message queues).
3. Strangler fig feasibility — for each component, assess whether it could be
   extracted and replaced independently without breaking the rest of the system.
   Rate each as: independently extractable, extractable with changes, or
   tightly coupled and not currently extractable.
4. Highest-risk integration points — list the 3 to 5 integration points most
   likely to cause failures if changed, with a brief explanation of why.
5. Recommended extraction sequence — if modernisation proceeds, which components
   should be tackled first (lowest coupling, lowest risk) and which last.

Flag anything you cannot determine from the information provided.
```

Use this prompt after you have a system-level architectural map and before deciding on a modernisation pattern or sequencing the work.

Do not use this prompt in isolation. It requires the system overview from the architectural mapping step as input. Without that context the analysis will be shallow.

Include naming convention alignment as part of this work. Frontend components, database tables, and business documentation often use different naming conventions in legacy systems. This creates ambiguity about which components map to which data sources. Ask the AI to flag where names diverge across layers so you can resolve that ambiguity before sequencing the work.

---

## Evaluate modernisation patterns

Use this prompt once you have an architectural map and a boundary analysis. The goal is an evidence-based recommendation for the right modernisation pattern, not defaulting to the most familiar approach.

```
Act as a senior architect advising on a legacy modernisation strategy.

System overview:
[paste your architectural map summary]

Boundary analysis:
[paste your service and data boundary assessment]

Modernisation goal:
[describe what you are trying to achieve — for example: move to cloud-hosted infrastructure,
replace .NET Framework with .NET 8, decompose monolith into services,
replace an MS Access database with a web application]

Evaluate the following three modernisation patterns against this system and goal:

1. Strangler fig — gradually replace the legacy system component by component,
   routing traffic to new components as they are ready until the legacy system
   can be retired.
2. In-place modernisation — improve the existing codebase incrementally without
   replacing the system's outer structure.
3. Parallel run — build the new system alongside the old, compare outputs,
   and cut over once confidence is sufficient.

For each pattern:
- assess whether it is feasible given this system's coupling and boundaries
- describe the main risks and how they would be mitigated
- estimate the relative effort as low, medium, or high
- identify any pre-conditions that must be met before this pattern is viable

Then recommend the pattern that best fits this system and goal, with your reasoning.
Flag any assumptions you are making that the team should verify.
```

Use this prompt after completing system mapping and boundary analysis, before committing to a modernisation approach. It is a decision-support prompt. Use the output as a starting point for team discussion, not a final decision.

Do not use this prompt before you have completed the architectural map and boundary analysis. The recommendation will only be as good as the context you provide.

---

## Technical debt classification

When prompting an AI to identify technical debt, ask it to classify findings by type. This helps you prioritise what to address first rather than getting a long unorganised list of problems.

Common categories relevant to government systems include:

- code debt, which covers complex, duplicated, or inconsistently written code
- test debt, which covers missing or insufficient test coverage
- documentation debt, which covers undocumented behaviour or architecture
- dependency debt, which covers outdated, unsupported, or vulnerable libraries
- architectural debt, which covers patterns that no longer fit the system's needs

Dependency debt with known Common Vulnerabilities and Exposures (CVEs) requires immediate attention. Architectural debt may be deferred until the system is better understood and tested.

Include this classification instruction in any technical debt prompt:

```
Classify each finding by type: code debt, test debt, documentation debt,
dependency debt, or architectural debt.
Rate the severity of each finding as critical, high, medium, or low.
Explain the risk of leaving each finding unaddressed.
```

---

## Regenerate missing documentation

Legacy systems commonly have missing or outdated documentation. Regenerating a documentation baseline before planning any changes reduces the risk of misunderstanding what the system does. It also makes subsequent prompts more accurate because you can provide the AI with documentation as context rather than raw code.

See the [prompt engineering for documentation](../../playbooks/prompt-engineering/prompt-engineering-documentation.md) guide for detailed prompt examples. It covers generating README files, docstrings, and inline comments from existing code. The README, docstring, and documentation audit sections are the most relevant for legacy work.

When applying those prompts to legacy systems, add the following instruction to any documentation generation prompt.

```
This is a legacy system. Do not assume the code reflects the original design intent.
Document what the code currently does, not what it should do.
Flag any behaviour that appears unintentional or inconsistent with the surrounding code.
```

This instruction matters because AI assistants often infer what the code was designed to do. They then document that assumed intent rather than what the code actually does. In a legacy context, other systems depend on the current behaviour. That is true whether or not the behaviour was ever intended.

---

## Characterisation tests

A characterisation test documents what code currently does, not what it was designed to do. This includes outputs that look like bugs. This distinction matters in legacy systems where intent and actual behaviour have diverged. Write these before making any changes so you have a safety net that fails if something unexpected changes.

When asking an AI to generate characterisation tests, you should:

- instruct it to capture current behaviour, including outputs that look like bugs
- ask for narrow tests, each asserting one observable output rather than testing multiple behaviours at once
- ask it to flag any behaviour it cannot confidently test from the code alone, as these represent hidden risks

Treat a failing characterisation test as a signal that a change altered behaviour. Then decide deliberately whether that change was intended.

For prompt examples that generate meaningful tests, see the [prompt engineering for testing](../../playbooks/prompt-engineering/prompt-engineering-testing.md) guide.

---

## Implicit behaviour

Legacy code often has undocumented behaviour that callers depend on. This can include specific error message formats, result ordering, or response timings that downstream systems rely on. AI can help surface these, but only if you provide context about the calling systems.

When prompting for implicit behaviour analysis, you should:

- include calling code or consumer code alongside the code being analysed
- describe how the output is used, not just what the code produces
- ask the AI to flag behaviour that looks unintentional but may be relied upon

Behaviour that looks unintentional but may still be relied upon is the highest-risk category to change. Without context about callers, the AI can only identify what looks implicit in isolation. That is useful but incomplete.

---

## Further reading

[AI-assisted legacy modernisation](../../playbooks/legacy-system-modernisation.md)

[Non-deterministic code assurance](../../governance/non-deterministic-code-assurance.md)

[Refactoring prompts](refactoring.md)

[Prompt template](../prompt-template.md), which covers how to contribute a new prompt to this library
