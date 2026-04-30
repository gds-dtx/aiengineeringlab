> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI Engineering Lab comparative guidance

> A consolidated, tool-agnostic framework for evaluating, selecting, and managing AI coding assistants across government.

## Purpose

This guide helps technical leads, delivery managers, and senior decision-makers evaluate AI coding assistants for their teams and departments. It provides objective comparison criteria, consolidated data from all tool-specific guides, questions to ask vendors, and guidance on matching tools to team contexts.

This guide does not recommend specific tools. Instead, it equips you to make informed decisions based on your team's needs, security requirements, and ways of working. This approach is consistent with the [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice), which sets standards for government technology decisions.

## Contents

[Tools in scope](#tools-in-scope)

[Consolidated tool comparison](#consolidated-tool-comparison)

[Security and compliance](#category-1-security-and-compliance)

[Capabilities and features](#category-2-capabilities-and-features)

[Language and framework support](#category-3-language-and-framework-support)

[Integration and deployment](#category-4-integration-and-deployment)

[Data residency](#category-5-data-residency)

[Cost and licensing](#category-6-cost-and-licensing)

[Models and task suitability](#category-7-models-and-task-suitability)

[Support and ecosystem](#category-8-support-and-ecosystem)

[Matching tools to team context](#matching-tools-to-team-context)

[Multi-tool strategies](#multi-tool-strategies)

[Tool selection for common scenarios](#tool-selection-for-common-scenarios)

[Questions to ask vendors](#questions-to-ask-vendors)

[Ongoing tool management](#ongoing-tool-management)

---

## Tools in scope

The Department for Science, Innovation and Technology (DSIT) AI Engineering Lab Programme Phase 1 includes licences for:

| Tool | Vendor | Primary interface | Recommended tier |
|------|--------|-------------------|------------------|
| GitHub Copilot Enterprise | Microsoft and GitHub | IDE extension, chat, CLI | Business or Enterprise |
| Claude Code | Anthropic | CLI, IDE extension, API | Paid subscription via LiteLLM gateway |
| Amazon Kiro | AWS | IDE (VS Code based), CLI | Enterprise |
| Amazon Q Developer | AWS | IDE extension, CLI, console | Pro |
| Gemini Code Assist | Google | IDE extension, cloud console | Enterprise |

For tool-specific implementation guidance, see:

- [GitHub Copilot guide](github-copilot/)
- [Amazon Q Developer guide](amazon-q/)
- [Amazon Kiro guide](amazon-kiro/)
- [Claude Code guide](claude-code/)
- [Gemini Code Assist guide](gemini-code-assist/)

---

## Consolidated tool comparison

The table below provides a single view of how all five tools compare across the most important dimensions for government teams. Detailed breakdowns follow in each category section.

| Dimension | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|-----------|----------------|-------------|-------------|--------------------|--------------------|
| Primary strength | Broad IDE support, fast inline completion, GitHub integration | Deep reasoning, agentic multi-step tasks, MCP integration | Specification-driven workflows, agent hooks, steering files | AWS native integration, security scanning, Java transformation | GCP integration, large context window, UK data residency |
| Inline completion | excellent | via IDE extension | strong | good | excellent |
| Chat interface | Copilot Chat | native CLI and IDE | chat and spec modes | Q Chat | Gemini Chat |
| Agentic mode | Copilot Agent (Enterprise) | strong (native) | autopilot mode | preview (Pro) | yes |
| Context window | repo indexing | large (200,000 tokens) | workspace context | large (100,000 or more tokens) | up to 2 million tokens |
| Multi-file edits | Copilot Edits | native | native | limited | yes |
| CLI interface | Copilot CLI | native | Kiro CLI | Q CLI | Gemini CLI |
| PR and code review | native GitHub integration | manual | not available | native | limited |
| Security scanning | separate tool | not available | via MCP servers | built-in | not available |
| Cloud provider focus | Azure and GitHub | provider agnostic | AWS (Bedrock) | AWS native | GCP native |
| IP indemnity | yes (Business and Enterprise) | verify subscription terms | yes (AWS terms) | yes (Pro only) | yes (Enterprise only) |
| UK data residency | no (EU only) | no (US default) | no (US and EU only) | yes (when pinned to London) | yes (UK storage and processing) |
| Security classification | OFFICIAL with exclusions | OFFICIAL with exclusions | OFFICIAL with exclusions | OFFICIAL with exclusions | OFFICIAL with exclusions |
| Procurement route | G-Cloud 14, Digital Marketplace | via AWS Bedrock and LiteLLM gateway | AWS agreement | G-Cloud 14, AWS Marketplace | G-Cloud 14 |

---

## Category 1: security and compliance

The table below shows criteria you should consider when evaluating security and compliance aspects:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| Data residency | Where is data processed and stored? UK or EEA options available? | high |
| Data retention | How long are prompts and code retained? Can retention be disabled? | high |
| Training data usage | Is your code used to train models? Can this be disabled? | high |
| Security certifications | ISO 27001, SOC 2 Type II, Cyber Essentials Plus? | high |
| Government accreditation | Approved on [G-Cloud](https://www.digitalmarketplace.service.gov.uk/g-cloud)? Any department-specific approvals? | high |
| Encryption | In-transit and at-rest encryption standards? | medium |
| Access controls | Single sign-on (SSO) integration, multi-factor authentication (MFA) support, role-based access control (RBAC) capabilities? | medium |
| Audit logging | What usage logs are available? Export capabilities? | medium |
| Vulnerability disclosure | Clear process for reporting and handling security issues? | medium |

The 'weight' column indicates the relative importance of each criterion when making your evaluation decision. Reference the [NCSC cloud security guidance](https://www.ncsc.gov.uk/collection/cloud-security) when assessing cloud service providers against these criteria.

### Security classification comparison

| Classification | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|----------------|----------------|-------------|-------------|--------------------|--------------------|
| OFFICIAL | acceptable with content exclusions | acceptable with content exclusions | acceptable with content exclusions | acceptable with content exclusions | acceptable with content exclusions |
| OFFICIAL-SENSITIVE | requires risk assessment | requires risk assessment | requires risk assessment | requires risk assessment | requires risk assessment |
| SECRET and above | not appropriate | not appropriate | not appropriate | not appropriate | not appropriate |

Consult your departmental security team before deployment. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment.

---

## Category 2: capabilities and features

The table below shows criteria you should consider when evaluating capabilities and features:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| Code completion | Inline suggestions quality and speed? | high |
| Chat interface | Natural language interaction for explanations and refactoring? | high |
| Context awareness | How much codebase context can it use? | high |
| Multi-file editing | Can it modify multiple files in one operation? | medium |
| Test generation | Quality of generated unit and integration tests? | medium |
| Documentation | Can it generate meaningful documentation? | medium |
| Code review | Can it review pull requests (PRs) and suggest improvements? | medium |
| Agentic capabilities | Can it run multi-step tasks autonomously? | medium |
| Custom instructions | Can you configure coding standards and preferences? | medium |

### Capability comparison matrix

| Capability | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|------------|----------------|-------------|-------------|--------------------|--------------------|
| Inline completion | excellent | via IDE extension | strong | good | excellent |
| Chat interface | Copilot Chat | native CLI | chat and spec modes | Q Chat | Gemini Chat |
| Codebase context | repo indexing | large context (200,000 tokens) | workspace and steering files | repository-wide | up to 2 million tokens |
| Multi-file edits | Copilot Edits | native | native | limited | yes |
| Test generation | good | strong | good | good (Pro) | good |
| PR and code review | native GitHub | manual | not available | native | limited |
| Agentic mode | Copilot Agent (Enterprise) | strong (native) | autopilot mode | preview (Pro) | yes |
| CLI interface | Copilot CLI | native | Kiro CLI | Q CLI | Gemini CLI |
| Security scanning | separate tool | not available | via MCP servers | built-in | not available |
| Code transformation | not available | manual refactoring | not available | Java upgrades (Pro) | yes |
| Custom instructions | copilot-instructions.md | CLAUDE.md | steering files (.kiro/steering/) | limited | settings and MCP |
| Specification-driven development | not available | not available | native (specs to tasks) | not available | not available |
| Agent hooks and automation | custom agents and hooks | MCP servers | agent hooks (event-driven) | limited | MCP servers |

### Interaction modes comparison

| Mode | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|------|----------------|-------------|-------------|--------------------|--------------------|
| Inline suggestions | yes (all tiers) | via IDE extension | yes | yes (all tiers) | yes |
| Chat | Copilot Chat (all tiers) | native CLI and IDE | chat and conversational | Q Chat (all tiers) | Gemini Chat |
| Multi-file editing | Copilot Edits (Business and above) | native | native | /dev command (Pro) | agent mode |
| Workspace planning | Copilot Workspace (Enterprise) | not available | spec and planning mode | not available | not available |
| Autonomous agent | agent mode (Enterprise) | strong | autopilot mode | agent mode (Pro) | agent mode |
| Command line | Copilot CLI | native | Kiro CLI | Q CLI | Gemini CLI |
| Code review | native GitHub PR review | manual | not available | /review command (Pro) | limited |
| Code transformation | not available | manual | not available | /transform command (Pro) | yes |
| Test generation | yes | yes | test generation mode | /test command (Pro) | yes |
| Documentation generation | yes | yes | documentation mode | /doc command | yes |
| Web browser access | yes (github.com) | yes (claude.ai/code) | no | yes (AWS console) | no |

---

## Category 3: language and framework support

The table below shows criteria you should consider when evaluating language and framework support:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| Primary languages | Support quality for your main languages? | high |
| Framework awareness | Understanding of frameworks you use? | high |
| Legacy languages | Support for COBOL, VB6, older Java versions? | varies |
| Infrastructure as code | Terraform, CloudFormation, Ansible support? | medium |
| Markup and config | YAML, JSON, XML, Markdown support? | low |

### Language support matrix

| Language or framework | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|-----------------------|----------------|-------------|-------------|--------------------|--------------------|
| Java and Spring | excellent | excellent | excellent | excellent | excellent |
| .NET and C# | excellent | excellent | good | good | good |
| Python | excellent | excellent | excellent | excellent | excellent |
| JavaScript and TypeScript | excellent | excellent | excellent | excellent | excellent |
| Go | good | good | good | good | good |
| Ruby | good | good | moderate | moderate | moderate |
| Kotlin | good | good | good | good | good |
| Rust | good | good | moderate | good | moderate |
| COBOL | limited | limited | limited | good (mainframe focus) | limited |
| Terraform | good | good | good | excellent (AWS) | good (GCP) |
| CloudFormation | moderate | moderate | moderate | excellent | limited |
| GOV.UK Frontend | moderate | moderate | limited | limited | limited |
| SQL | good | good | good | good | good |
| Shell scripting | good | good | good | good | good |

Note: quality varies by specific use case. Conduct proof-of-concept testing with your actual codebase.

---

## Category 4: integration and deployment

The table below shows criteria you should consider when evaluating integration and deployment:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| IDE support | Works with your team's IDEs? | high |
| Git integration | GitHub, GitLab, Azure DevOps, Bitbucket? | high |
| CI and CD integration | Can it integrate with pipelines? | medium |
| API availability | Programmatic access for custom tooling? | low to medium |
| Offline capability | Can it work without internet? (usually no) | low |

### IDE support matrix

| IDE | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|-----|----------------|-------------|-------------|--------------------|--------------------|
| VS Code | yes | yes | native (Kiro IDE based on VS Code) | yes | yes |
| JetBrains (IntelliJ and similar) | yes | yes | limited (depending on rollout) | yes | yes |
| Visual Studio | yes | limited | not available | yes | limited |
| Neovim and Vim | yes | yes (CLI) | not available | limited | limited |
| Eclipse | limited | no | not available | yes | limited |
| AWS Cloud9 | limited | no | not available | native | no |
| Web browser | yes (github.com) | yes (claude.ai/code) | no | yes (AWS console) | no |

### Git platform integration

| Platform | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|----------|----------------|-------------|-------------|--------------------|--------------------|
| GitHub | native | via MCP | limited | limited | limited |
| GitLab | limited | via MCP | limited | limited | limited |
| Azure DevOps | limited | limited | limited | limited | limited |
| AWS CodeCommit | limited | limited | limited | native | limited |
| Bitbucket | limited | limited | limited | limited | limited |

---

## Category 5: data residency

Data residency refers to the geographic location where data is processed and stored. This is critical for compliance with UK data protection laws and organisational security requirements.

For the full data residency analysis for each tool, see the [data residency guidance](data-residency.md).

### Data residency comparison

| Tool | Explicit UK data residency | UK residency assurance | Processing region | Summary |
|------|----------------------------|------------------------|-------------------|---------|
| GitHub Copilot | no | low | EU and US | EU only for enterprise with no UK option |
| Claude Code | no | medium | US (default) | EU regional option planned but UK not available. Accessed via LiteLLM gateway in eu-west-2 |
| Amazon Kiro | no explicit guarantee | low to medium | US East and Europe (Frankfurt) | Implicit through AWS, no contractual UK guarantee |
| Amazon Q Developer | yes (when configured) | medium to high | configurable (UK London available) | UK London region when tightly pinned |
| Gemini Code Assist Enterprise | yes | high | configurable (UK available) | UK storage and processing available |

If you must make a defensible claim of UK-only data residency, the strongest options currently available are:

- Gemini Code Assist Enterprise on Google Cloud
- Amazon Q Developer when explicitly pinned to the AWS London region

---

## Category 6: cost and licensing

The table below shows criteria you should consider when evaluating cost and licensing:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| Licence model | Per-user, per-organisation, consumption-based? | high |
| Tier options | Different tiers for different needs? | medium |
| Premium features | What requires additional payment? | medium |
| Volume discounts | Available for large deployments? | medium |
| True-up process | How are additional users handled? | low |

### Pricing model overview

| Aspect | GitHub Copilot | Claude Code | Amazon Kiro | Amazon Q Developer | Gemini Code Assist |
|--------|----------------|-------------|-------------|--------------------|--------------------|
| Model | per user per month | consumption plus subscription | per user per month | per user per month | per user per month |
| Free tier | yes (limited) | yes (limited) | yes (free tier) | yes (limited) | yes (6,000 completions per day) |
| Enterprise tier | available | via LiteLLM gateway | available | Pro ($19 per user per month) | Standard and Enterprise |
| IP indemnity | yes (Business and Enterprise) | verify terms | yes (AWS terms) | yes (Pro only) | yes (Enterprise only) |
| Premium models | included allowance plus overage | additional credits | included | included | included |
| Government procurement | G-Cloud 14, Digital Marketplace | via AWS Bedrock and LiteLLM | AWS Enterprise Agreement | G-Cloud 14, AWS Marketplace | G-Cloud 14 |

Note: DSIT is procuring licences centrally for Phase 1. Pricing details are for future reference and business case development.

---

## Category 7: models and task suitability

Each tool uses different underlying models. Understanding model capabilities helps to set appropriate expectations so that you can choose the right approach. The [model selection playbook](../playbooks/model-selection.md) provides broader guidance on choosing the right AI model for different tasks.

### Underlying models by tool

| Tool | Primary models | Model selection |
|------|---------------|-----------------|
| GitHub Copilot | GPT-4.1, GPT-5 mini (included). Claude Sonnet 4.5, Claude Opus 4.5, Gemini 2.5 Pro (premium) | user selectable via model picker. Auto mode stays within 0x to 1x cost models |
| Claude Code | Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5 | user selectable via /model command |
| Amazon Kiro | Claude Sonnet 4.0, Claude Sonnet 3.7 (via Bedrock) | auto-routing for efficiency |
| Amazon Q Developer | AWS proprietary models | automatic selection based on task |
| Gemini Code Assist | Gemini models | automatic |

### Recommended tool by task type

| Task | Best suited tools | Why |
|------|-------------------|-----|
| Fast inline autocompletion | GitHub Copilot, Gemini Code Assist | optimised for speed and low latency |
| Complex reasoning and debugging | Claude Code (Opus), GitHub Copilot (Claude Opus or GPT-5.2) | superior reasoning about multi-layer problems |
| Large-scale refactoring | Claude Code, Amazon Kiro | agentic multi-step execution with deep context |
| Specification-driven development | Amazon Kiro | native spec-to-task workflow |
| AWS infrastructure tasks | Amazon Q Developer | native AWS service integration and CloudFormation |
| GCP infrastructure tasks | Gemini Code Assist | native GCP integration and Terraform for GCP |
| Java modernisation | Amazon Q Developer | specialised Java transformation feature |
| Security code scanning | Amazon Q Developer | built-in security scanning |
| PR review automation | GitHub Copilot | native GitHub PR integration |
| Legacy COBOL maintenance | Amazon Q Developer | mainframe focus and COBOL features |
| Quick boilerplate generation | GitHub Copilot (GPT-4.1), Claude Code (Haiku) | fast and cost-effective |
| Multi-file feature implementation | Claude Code, Amazon Kiro, GitHub Copilot (agent mode) | strong agentic capabilities |
| Documentation generation | all tools | comparable across tools |
| Test generation | Claude Code, GitHub Copilot, Amazon Q Developer | strong test scaffolding |

---

## Category 8: support and ecosystem

The table below shows criteria you should consider when evaluating support and ecosystem:

| Criterion | Questions to consider | Weight |
|-----------|----------------------|--------|
| Vendor support | Service level agreement (SLA), support channels, response times? | high |
| Documentation | Quality and currency of documentation? | medium |
| Community | Active community, forums, resources? | medium |
| Training resources | Vendor-provided training available? | medium |
| Partner ecosystem | Integration partners, consultancies? | low |

### Training time comparison

| Tool | Engineer training | Manager briefing | Notes |
|------|-------------------|------------------|-------|
| GitHub Copilot | 45 minutes (3 modules) | 30 minutes | live demonstration with hands-on practice |
| Claude Code | 45 minutes (3 modules) | 30 minutes | live demonstration with hands-on practice |
| Amazon Kiro | 4.5 to 8.5 hours (3 modules plus advanced) | included in Module 1 | significant setup training for AWS and Bedrock |
| Amazon Q Developer | 60 minutes (3 modules) | 30 minutes | includes AWS-specific features module |
| Gemini Code Assist | 60 minutes (3 modules) | 30 minutes | includes GCP-specific features module |

---

## Matching tools to team context

### Decision factors

Different tools suit different contexts. The [model selection playbook](../playbooks/model-selection.md) provides complementary guidance on choosing appropriate AI models for specific tasks once you have selected a tool. The table below shows factors to consider:

| Factor | Implications |
|--------|--------------|
| Existing ecosystem | Teams on Azure and GitHub may benefit from Copilot. AWS-heavy teams may benefit from Q or Kiro. GCP teams may benefit from Gemini. |
| Primary languages | Some tools excel at specific languages |
| Work type | Greenfield compared to legacy modernisation compared to maintenance |
| Security posture | Some departments have stricter data residency requirements |
| Team maturity | Starting teams may need simpler tools with less setup |
| Agentic needs | Complex refactoring may benefit from Claude Code or Kiro's agentic capabilities |
| Data residency | UK-only requirement narrows options to Gemini and Amazon Q |

### Recommended evaluation approach

#### Step 1: define requirements (week 1)

1. Document must-have security requirements including data residency.
2. List primary languages and frameworks.
3. Identify integration requirements (IDE, Git, CI and CD).
4. Determine budget constraints.
5. Capture any department-specific restrictions.

#### Step 2: shortlist tools (week 1)

Using this guide and security requirements, identify one to two tools for proof of concept.

#### Step 3: conduct proof of concept (weeks 2 to 4)

The table below shows activities to complete during your proof of concept:

| Activity | Purpose |
|----------|---------|
| Install and configure | Validate integration with your environment |
| Test with real code | Assess quality on your actual codebase |
| Evaluate multiple use cases | Code completion, testing, documentation, refactoring |
| Gather engineer feedback | Assess usability and satisfaction |
| Review security logs | Confirm compliance with requirements |

Proof-of-concept evaluation template:

```
| Criterion                | Weight | Tool A score (1 to 5) | Tool B score (1 to 5) |
|--------------------------|--------|------------------------|-----------------------|
| Code completion quality  | 20%    | [score 1 to 5]         | [score 1 to 5]        |
| Security compliance      | 25%    | [score 1 to 5]         | [score 1 to 5]        |
| Language support         | 15%    | [score 1 to 5]         | [score 1 to 5]        |
| Integration ease         | 15%    | [score 1 to 5]         | [score 1 to 5]        |
| Engineer satisfaction    | 15%    | [score 1 to 5]         | [score 1 to 5]        |
| Support quality          | 10%    | [score 1 to 5]         | [score 1 to 5]        |
| Weighted total           | 100%   | [calculate]            | [calculate]           |
```

#### Step 4: make recommendation (week 5)

You should make a recommendation that documents the following information.

1. Evaluation criteria and weighting.
2. Proof-of-concept findings and scores.
3. Engineer feedback summary.
4. Security assessment outcome.
5. Recommendation with rationale.
6. Implementation considerations.

---

## Multi-tool strategies

### When to consider multiple tools

The table below shows scenarios where multiple tools may be appropriate:

| Scenario | Rationale |
|----------|-----------|
| Different team needs | Legacy team needs COBOL support (Amazon Q). Modern team needs agentic features (Claude Code or Kiro). |
| Cloud provider alignment | AWS teams use Q or Kiro. GCP teams use Gemini. All teams use Copilot for inline completion. |
| Risk mitigation | Avoid single-vendor dependency |
| Best-of-breed | Use each tool for its strengths |
| Pilot comparison | Test tools before standardising |

### Multi-tool considerations

The table below shows considerations when using multiple tools:

| Consideration | Guidance |
|---------------|----------|
| Training complexity | Multiple tools mean more training burden |
| Support complexity | Multiple vendor relationships to manage |
| Context sharing | Custom instructions and learnings may not transfer between tools |
| Cost management | Track usage across multiple platforms |
| Guardrails consistency | Ensure consistent security controls across all tools |

### Recommended approach

For most departments, start with a single tool for initial adoption, then consider introducing additional tools once the first is embedded. This allows:

- focused training and support
- clear metrics attribution
- simpler change management
- easier troubleshooting

---

## Tool selection for common scenarios

### Scenario 1: Java modernisation team

Context: this example team is modernising legacy Java 8 applications to Java 17 and 21 with Spring Boot.

Key requirements include:

- strong Java and Spring understanding
- refactoring capabilities
- test generation

You should consider the following:

- all tools have good Java support
- Amazon Q Developer has specific Java modernisation features via /transform
- Claude Code's agentic mode suits large refactoring
- Amazon Kiro's spec-driven workflow helps plan modernisation steps

### Scenario 2: full-stack GOV.UK service team

Context: this example team is building a citizen-facing service using GOV.UK Frontend and a Node.js backend.

Key requirements include:

- JavaScript and TypeScript excellence
- understanding of GOV.UK patterns
- accessibility awareness

You should consider the following:

- Model Context Protocol (MCP) servers with GOV.UK standards for compliance
- all tools handle JavaScript and TypeScript well
- GitHub Copilot provides strong inline completion for daily coding
- you may need custom context for GOV.UK Frontend patterns via CLAUDE.md or steering files

### Scenario 3: data engineering team

Context: this example team is building data pipelines with Python, SQL, and cloud services.

Key requirements include:

- Python data libraries such as pandas
- SQL generation and optimisation
- cloud service integration

You should consider the following:

- Amazon Q Developer integrates well with AWS data services
- Gemini Code Assist integrates with BigQuery and GCP
- all tools handle Python well
- Gemini's large context window (up to 2 million tokens) helps with complex pipeline code

### Scenario 4: legacy COBOL maintenance

Context: this example team is maintaining critical COBOL systems with occasional modernisation.

Key requirements include:

- COBOL understanding
- mainframe context
- modernisation assistance

You should consider the following:

- Amazon Q Developer has specific mainframe and COBOL features
- there is limited COBOL support across other tools
- you may need specialised prompting

### Scenario 5: infrastructure and platform team

Context: this example team is managing cloud infrastructure with Terraform, Kubernetes, and CI/CD.

Key requirements include:

- infrastructure as code (IaC) support (Terraform, CloudFormation)
- Kubernetes and Helm understanding
- pipeline scripting

You should consider the following:

- Amazon Q Developer is excellent for AWS CloudFormation
- Gemini Code Assist is excellent for GCP resources
- GitHub Copilot is good for general Terraform
- your tool choice may align with your cloud provider

### Scenario 6: team requiring UK data residency

Context: this example team has strict UK data sovereignty requirements.

Key requirements include:

- all data processed and stored within the UK
- defensible compliance position
- audit trail for data location

You should consider the following:

- Gemini Code Assist Enterprise provides the strongest UK residency option
- Amazon Q Developer can meet UK residency when pinned to the London region
- GitHub Copilot, Claude Code, and Amazon Kiro do not currently offer UK residency
- see the [data residency guidance](data-residency.md) for detailed analysis

---

## Questions to ask vendors

### Security and compliance

1. Where are prompts and code processed geographically?
2. What is your data retention policy? Can it be customised?
3. Is customer code used to train or improve models?
4. What security certifications do you hold?
5. Can you provide a SOC 2 Type II report?
6. What is your vulnerability disclosure process?
7. How do you handle security incidents affecting customers?
8. What audit logs are available and for how long?

### Technical capabilities

1. What is the context window size for code understanding?
2. How does the tool handle large monorepos?
3. What languages and frameworks have the best support?
4. Can custom instructions and rules be configured organisation-wide?
5. What API access is available for custom integrations?
6. How often are the underlying models updated?
7. What MCP server support is available?

### Commercial and support

1. What support SLAs are available?
2. What training resources do you provide?
3. How are new users provisioned and deprovisioned?
4. What usage analytics and reporting is available?
5. What is the contract exit process?
6. Can we pilot before full commitment?

---

## Ongoing tool management

### Usage monitoring

The table below shows metrics to monitor and their purpose:

| Metric | Purpose | Frequency |
|--------|---------|-----------|
| Active users | Licence utilisation | weekly |
| Suggestions accepted | Tool effectiveness | weekly |
| Features used | Adoption depth | monthly |
| Cost per user | Value assessment | monthly |
| Premium model usage | Cost governance | weekly |

### Periodic review

The table below shows reviews to conduct and their frequency:

| Review | Frequency | Focus |
|--------|-----------|-------|
| Usage review | monthly | Adoption, utilisation, issues |
| Security review | quarterly | Compliance, incidents, updates |
| Value assessment | quarterly | Productivity impact, return on investment |
| Tool reassessment | annually | Market changes, new options |

### Exit planning

Regardless of tool selection, you should maintain exit capability by:

- documenting tool-specific configurations
- avoiding deep proprietary integrations where possible
- ensuring code works without AI assistance
- maintaining tool-agnostic training materials
- tracking contract end dates and renewal terms

---

## Related guidance

[Data residency guidance](data-residency.md)

[Model selection playbook](../playbooks/model-selection.md)

[AI SDLC playbook](../playbooks/ai-sdlc-playbook.md)

[Base guardrails](../governance/guardrails-base.md)

[Maturity assessment framework](../assessment/maturity-assessment-framework.md)
