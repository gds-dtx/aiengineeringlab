> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# AI-assisted legacy modernisation

Guidance for engineers using AI assistants to analyse, plan, and safely modernise legacy codebases.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[Before you start](#before-you-start)

[Phase 1: analyse your codebase](#phase-1-analyse-your-codebase)

[Phase 2: plan safe modernisation](#phase-2-plan-safe-modernisation)

[Phase 3: execute incrementally](#phase-3-execute-incrementally)

[Phase 4: preserve behaviour and deploy](#phase-4-preserve-behaviour-and-deploy)

[Tool-specific capabilities](#tool-specific-capabilities)

[External playbooks and further reading](#external-playbooks-and-further-reading)

---

## Purpose

Legacy codebases present specific challenges for AI-assisted development. Unlike greenfield work, modernisation can cause silent behaviour change, cascading dependencies, and technical debt. These problems are often invisible until something breaks in production.

This page brings together all guidance, prompts, and patterns in this repository that help engineers approach legacy modernisation safely and systematically. It covers the four phases of AI-assisted legacy work: analysis, planning, incremental execution, and behaviour preservation and deployment.

---

## Who this is for

This guidance is for:

- engineers maintaining or improving legacy government systems
- technical leads planning modernisation programmes

---

## Before you start

Before using AI assistants on a legacy codebase, you should:

- identify a subject matter expert (SME) — someone who knows the business domain and how the system is used in practice
- remember that AI cannot replace this knowledge, so without an SME, you cannot tell which behaviours are intentional, which are bugs, and which business rules are hidden in the code
- understand your data classification and what you can share with AI tools — never paste code containing credentials, personally identifiable information (PII), or sensitive configuration (see [PS-02: data classification compliance](../security/security-policies.md#ps-02-data-classification-compliance))
- review the [guardrails base](../governance/guardrails-base.md) for your organisation
- read the [non-deterministic code assurance guidance](../governance/non-deterministic-code-assurance.md), which is particularly relevant when AI is generating changes to existing production behaviour
- set up appropriate repository context so your AI assistant understands the existing codebase — see [context engineering](context-engineering.md)

---

## Phase 1: analyse your codebase

The first phase is understanding what the code actually does before touching it. AI assistants are effective at analysing large volumes of code quickly, surfacing patterns, and identifying areas of risk.

### Guidance and prompts

Legacy system analysis is top-down, not bottom-up. Do not start by picking a class or function to examine. Start by building an architectural map of the whole system, then steadily narrow your scope.

Analysis works at three levels.

1. You should understand the full landscape at system level before touching any code.
2. You should work component by component at module or service level, using the system map.
3. You should analyse specific classes and functions at class or function level once a module is scoped for change.

At system level, feed the AI architecture documents, dependency manifests, and directory structures to produce an overview before examining individual modules or files.

The [context engineering playbook](context-engineering.md) is the primary reference for feeding a large legacy codebase to an AI assistant progressively. Read it before prompting at any level.

Before running full analysis prompts, verify that your AI assistant has correctly understood the documentation you have provided. You should do this by asking it business-specific questions that you or your SME already know the answers to. Start with simple business jargon and build up to more complex business processes. For example, ask it to explain an important business term, describe a core workflow, or identify who uses a specific part of the system. If answers are wrong or incomplete, refine the documentation and repeat. Break complex concepts into simpler components if the AI continues to misunderstand. Do not proceed to architectural analysis on a misunderstood codebase.

Documentation gathering is an ongoing activity throughout modernisation, not a one-off step. New gaps will surface as you work through later phases. Revisit and improve documentation each time you encounter them.

The [legacy maintenance prompts](../prompt-library/by-task-type/legacy-maintenance.md) file covers:

- [generating an architectural map](../prompt-library/by-task-type/legacy-maintenance.md#generate-an-architectural-map) from directory structures and dependency manifests
- [mapping service and data boundaries](../prompt-library/by-task-type/legacy-maintenance.md#map-service-and-data-boundaries) to identify which components can be extracted independently
- [regenerating missing documentation](../prompt-library/by-task-type/legacy-maintenance.md#regenerate-missing-documentation) from existing code
- [fast-track onboarding prompts](prompt-engineering/prompt-engineering-ai-roles.md#for-fast-track-onboarding) for understanding unfamiliar codebases and tracing flows
- [class and function level analysis](../prompt-library/by-task-type/legacy-maintenance.md#where-to-find-analysis-prompts) using the 3-step refactoring approach

---

## Phase 2: plan safe modernisation

Once you understand the codebase, the planning phase determines what to change, in what order, and how to do it without breaking production.

### Guidance and prompts

Do not replicate the legacy system like-for-like. A direct copy of legacy functionality is sometimes called a lift and shift. It reproduces existing problems alongside existing features. You should use the planning phase to identify where the system can be improved, simplified, or changed, not just ported.

Legacy modernisation planning must happen firstly at system-level, then compoment-level. 

#### System-level planning

System-level planning happens first. This is where you select a modernisation pattern and sequence the work across the whole system. Common patterns include:

- strangler fig (a software architecture pattern), which gradually replaces the legacy system component by component until you can retire the old system
- in-place modernisation, which improves the existing codebase incrementally without replacing the system
- parallel run, which runs the old and new systems side by side and compares outputs before cutting over

AI assistants can help you evaluate which pattern fits your system. Provide your system-level analysis from Phase 1 as context. Ask the AI to analyse the coupling between components, the risk of each integration point, and how feasible incremental extraction is.

#### Component-level planning

Once you have selected a pattern, sequence which modules, services, or subsystems to address first, working from lowest risk and least coupled to highest risk and most coupled.

#### High-level system overview

Before generating epics, use AI to produce a comprehensive overview of the modernised system based on the documentation gathered in Phase 1. The overview should cover:

- the system's purpose and aims
- user needs and who the users are
- the high-level structure of the system
- non-functional requirements such as performance, security, and accessibility
- compliance or regulatory requirements
- integration points with other systems
- areas where the legacy system can be improved rather than replicated

Validate this overview with your SME and stakeholders before proceeding.

#### Epics and user stories

Epics and user stories are the output of component-level planning. Once you have a sequenced component list, use AI to break each component into high-level epics, then into individual user stories. Provide your architectural map and boundary analysis as context. Ask the AI to prioritise user stories from simplest to most complex, and to flag any story with a hidden dependency on another component.

Each user story becomes an independently testable unit of work that feeds directly into Phase 3 execution. Review all AI-generated stories with your SME and end-users before committing them. The AI will not know which business rules are implicit or which edge cases matter most.

The [AI SDLC playbook](ai-sdlc-playbook.md) covers how to use AI assistants at each stage of the software development life cycle (SDLC), including the Plan phase.

The [legacy maintenance prompts](../prompt-library/by-task-type/legacy-maintenance.md) file includes an [evaluating modernisation patterns](../prompt-library/by-task-type/legacy-maintenance.md#evaluate-modernisation-patterns) prompt, which recommends whether strangler fig, in-place modernisation, or parallel run fits your system.

### Keeping steps small

Small, independently testable steps are the single most important risk control in legacy modernisation. Each step should:

- change one thing
- leave the system in a working state
- have a clear, testable outcome
- be deployable without the next step depending on it

AI assistants can help you decompose large modernisation goals into small steps, but you must verify that each proposed step is genuinely independent. Review AI-generated plans with the assumption that the AI does not know what you cannot afford to break.

---

## Phase 3: execute incrementally

Incremental execution means applying changes one step at a time, testing between each step, and never committing more than you understand. This is the phase where coding happens. Take user stories from Phase 2 one at a time and use each one as input to generate, review, and commit code.

### Characterisation tests

A characterisation test captures what code currently does, not what it was designed to do. Write these before making any changes so you have a safety net that fails if anything changes unexpectedly. Do not start coding until you have a passing test suite for the component you are about to change.

For how to prompt an AI to generate characterisation tests, including what to ask it to flag and how to validate the results with your SME and end-users, read [Characterisation tests](../prompt-library/by-task-type/legacy-maintenance.md#characterisation-tests) in the legacy maintenance prompts.

### Coding from user stories

Take each user story from Phase 2 in priority order, with the simplest first. Provide the user story, the relevant section of your architectural map, and any existing code in that component as context. Ask the AI to generate the implementation and corresponding tests together. Do not move to the next story until the current one passes its tests and has been reviewed by a human.

If the first output is not right, you should:

- tell the AI what is wrong and ask for a correction rather than starting from scratch
- keep each generation scoped to the single story
- stop and refine the prompt if the AI starts touching code outside the story's scope

AI applies standard conventions by default. If your legacy system intentionally deviates from a standard pattern, state that deviation as an explicit constraint in your prompt. A database table without a primary key is one example. See [constraint specification](../prompt-library/by-task-type/refactoring.md#constraint-specification) for how to structure these constraints.

Review the [non-deterministic code assurance](../governance/non-deterministic-code-assurance.md) governance document before generating code changes. It is directly relevant to behaviour preservation when AI modifies existing production behaviour.

### Guidance and prompts

Diff-only output is a technique that constrains AI to produce only the lines that change rather than rewriting an entire file, which makes unintended changes easier to spot. See [diff-only output](../prompt-library/by-task-type/refactoring.md#diff-only-output) in the refactoring prompts for the full technique and prompt template.

The [refactoring prompts](../prompt-library/by-task-type/refactoring.md) file contains all prompt templates for Phase 3 execution, including:

- [diff-only output](../prompt-library/by-task-type/refactoring.md#diff-only-output), which constrains AI to only the lines that need to change
- [constraint specification](../prompt-library/by-task-type/refactoring.md#constraint-specification), which tells AI what must not change alongside what should change
- [role switching](../prompt-library/by-task-type/refactoring.md#role-switching), which reviews refactored code from a security engineer perspective

The [prompt engineering for common development tasks](prompt-engineering/prompt-engineering-use-cases.md#use-case-2-refactoring-complex-code) guide covers step 3 of the 3-step refactoring approach: execute one step at a time. It includes anti-patterns to avoid, such as refactoring without tests and trying to change everything at once.

The [context engineering playbook](context-engineering.md) covers the constraint-driven approach for refactoring. It covers specifying what the AI must not change alongside what it should change.

Read [modernisation prompts](../prompt-library/by-task-type/modernisation.md) for government-specific execution requirements, including:

- [backwards compatibility](../prompt-library/by-task-type/modernisation.md#backwards-compatibility), which protects existing consumers throughout execution
- [staged rollout](../prompt-library/by-task-type/modernisation.md#staged-rollout), which ensures each increment is independently deployable
- [compliance at each step](../prompt-library/by-task-type/modernisation.md#compliance-at-each-step), which covers Web Content Accessibility Guidelines (WCAG), National Cyber Security Centre (NCSC), and Technology Code of Practice (TCoP) requirements at every deployed state

---

## Phase 4: preserve behaviour and deploy

Behaviour preservation means ensuring that existing functionality works exactly as before after each change. In legacy systems this is especially important because undocumented behaviour is often relied upon by other systems or users. This phase also covers QA and testing with your SME and end-users, and deploying the modernised system.

### QA and testing

Before deploying, test thoroughly with your SME and end-users. Your SME will confirm whether the modernised system matches the business rules they know. End-users will surface edge cases and workflows that automated tests alone cannot cover. Do not proceed to deployment until both your SME and end-users have confirmed the system behaves as expected.

### Deployment

Deploy each component once its user stories have passed testing and your SME and end-users have signed off for that component. Do not wait for the full modernisation to complete before deploying. Each independently tested component can go to production as it is ready. Follow your organisation's deployment standards and pipeline requirements for your platform.

---

## Tool-specific capabilities

The four phases above apply regardless of which AI assistant your team uses. The following tool-specific capabilities are worth knowing about if you are working on modernisation at scale.

### GitHub Copilot — .NET app modernisation (preview)

GitHub Copilot includes a dedicated app modernisation agent for .NET projects. It automates a structured three-stage workflow: assessment, planning, and execution. The agent runs inside Visual Studio. It produces Markdown documentation at each stage for you to review before continuing, and commits changes to a working branch so you can test incrementally.

It is currently available for C# projects and supports upgrading from .NET Framework and older .NET versions, as well as migration to Azure services.

#### Further reading:

[What the agent does and how it works to modernise app](https://learn.microsoft.com/en-us/dotnet/core/porting/github-copilot-app-modernization/overview)

[How to upgrade a .NET app](https://learn.microsoft.com/en-us/dotnet/core/porting/github-copilot-app-modernization/how-to-upgrade-with-github-copilot)

[Contoso University migration sample](https://learn.microsoft.com/en-us/dotnet/azure/migration/appmod/sample)

For GitHub Copilot setup and general usage guidance, see the [GitHub Copilot user guide](../user-tool-guides/github-copilot/).

### Amazon Q — Java and .NET modernisation

Amazon Q Developer includes dedicated modernisation capabilities for Java and .NET applications, particularly relevant for teams working on Amazon Web Services (AWS) infrastructure. It can automatically [upgrade Java 8 and 11 applications to Java 17](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/transform-java.html). It can also [port .NET applications from Windows to Linux](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/transform-dotnet-IDE.html). The .NET porting feature runs inside Visual Studio.

See the [Amazon Q manager guide](../manager-tool-guides/amazon-q/) for setup and capability details.

### Claude Code — whole-project codebase analysis

Unlike inline code assistants that only see the current file, [Claude Code understands your entire codebase and can work across multiple files](https://code.claude.com/docs/en/overview), which makes it useful during the analysis phase when legacy behaviour is spread across many components. The official documentation covers [understanding new codebases](https://code.claude.com/docs/en/common-workflows#understand-new-codebases) and [refactoring code](https://code.claude.com/docs/en/common-workflows#refactor-code) safely with tests. 

See the [Claude Code user guide](../user-tool-guides/claude-code/) and the [Claude Code advanced use](../user-tool-guides/claude-code/advanced-use.md) guide for techniques relevant to legacy work.

### Gemini Code Assist — understanding existing codebases

[Gemini Code Assist](https://docs.cloud.google.com/gemini/docs/codeassist/overview) provides an in-IDE conversational assistant that can help with [understanding and documenting code](https://docs.cloud.google.com/gemini/docs/codeassist/overview#supported-features) by letting you select code in your editor and ask questions about it. This is useful during the analysis phase when mapping undocumented behaviour in a legacy codebase. 

See the [Gemini Code Assist user guide](../user-tool-guides/gemini-code-assist/) for setup guidance.

---

## External playbooks and further reading

### Defra AI legacy modernisation playbook

The [Defra AI legacy modernisation playbook](https://defra.github.io/defra-ai-legacy-modernisation/) is a government-produced open source reference for teams modernising legacy systems using AI tools. It covers responsible practices, discovery and analysis methodology, a prompt library, and lessons learnt from real modernisation work.

The playbook includes step-by-step migration pathways for specific legacy technologies.

The [MS Access migration pathway](https://defra.github.io/defra-ai-legacy-modernisation/pages/pathways/ms-access/) covers both frontend and database migration. Frontend migration includes documenting forms, building GDS-compliant views, and connecting to a backend API. Database migration uses SQL Server Migration Assistant and SQL refactoring.

The [SQL Server migration pathway](https://defra.github.io/defra-ai-legacy-modernisation/pages/pathways/sql-server/) covers schema extraction and changelog refactoring. It includes a decision point between staying relational or migrating to MongoDB, followed by OpenAPI specification and API development.

### Microsoft .NET modernisation sample

The [Contoso University migration sample](https://learn.microsoft.com/en-us/dotnet/azure/migration/appmod/sample) is a worked example of a .NET Framework 4.8 application modernised to cloud-native Azure services using GitHub Copilot. It replaces SQL Server LocalDB with Azure SQL Database, local file storage with Azure Blob Storage, and Microsoft Message Queue (MSMQ) with Azure Service Bus. It is useful as a concrete before-and-after reference for teams modernising .NET applications.
