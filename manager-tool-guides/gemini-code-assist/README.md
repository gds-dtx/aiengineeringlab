> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Google Gemini Code Assist: manager tool guide

## Purpose

This guide helps engineering managers implement Google Gemini Code Assist within UK government departments. It covers capability assessment, security considerations, phased rollout, and how to measure success.

## Who this is for

This guide is for:

- engineering managers responsible for AI Engineering Lab adoption in their teams
- technical leads overseeing tool implementation and developer workflows
- delivery managers coordinating rollout and measuring adoption success

## Contents

- [what Gemini Code Assist does](#what-gemini-code-assist-does)
- [how it compares with other tools](#how-it-compares-with-other-ai-engineering-lab-tools)
- [government-specific considerations](#government-specific-considerations)
- [getting started](#getting-started)
- [phased rollout approach](#phased-rollout-approach)
- [training requirements](#training-requirements)
- [measuring success](#measuring-success)
- [common implementation challenges](#common-implementation-challenges)
- [integration with development workflow](#integration-with-development-workflow)
- [security best practices](#security-best-practices)
- [support and escalation](#support-and-escalation)
- [contributing](#contributing) - how to improve this guide

## Before you start

Before reading this guide, you should understand:

- your team's current development workflow and tooling
- your department's security classification requirements
- the [AI Engineering Lab maturity assessment](../../assessment/maturity-assessment-framework.md) framework
- basic software development lifecycle concepts

## What Gemini Code Assist does

Google Gemini Code Assist provides AI-powered assistance throughout the software development lifecycle. It generates code suggestions, explains existing code, and helps with development tasks directly in your integrated development environment (IDE). It has deep integration with Google Cloud Platform (GCP) services.

Gemini Code Assist can:

- autocomplete code as engineers type
- generate code from comments or function signatures
- create and update unit tests
- explain code and answer technical questions
- assist with GCP service integration
- transform and refactor code across multiple files
- index and understand entire codebases (up to 1 million token context window)

### Editions

| Edition | Target audience | Differences |
|---------|-----------------|-------------|
| Individual (free) | Students, hobbyists, freelancers | 6,000 completions per day, 240 chat sessions per day |
| Standard | Teams and businesses | Enterprise security, management tools, intellectual property (IP) indemnification |
| Enterprise | Large organisations | All Standard features plus code customisation from private repositories |

### Interaction modes

| Mode | Best for |
|------|----------|
| Inline suggestions | Daily coding, implementing patterns, writing boilerplate |
| Next edit predictions | Related changes across a file |
| Gemini Chat | Explanations, debugging, architecture questions |
| Agent mode | Complex multi-file refactoring, feature implementation |

### Agent mode

Agent mode handles complex tasks spanning multiple files. It analyses your codebase, proposes a plan for your review, then executes changes with your oversight at each step. The documentation on how to [Code with Gemini Code Assist](https://developers.google.com/gemini-code-assist/docs/write-code-gemini) covers the full range of capabilities.

Gemini Code Assist tools were deprecated on 14 October 2025. External service integrations now use Model Context Protocol (MCP) servers in agent mode. See the [Developer Knowledge API and MCP server guidance](./developer-knowledge-api-and-mcp-server-guidance.md) for configuration details.

## How it compares with other AI Engineering Lab tools

For a detailed comparison of Gemini Code Assist with other AI coding assistants, see the [comparative guidance](../comparative-guidance.md).

## Government-specific considerations

### Security classification

Gemini Code Assist processes code through Google Cloud Platform services. The following security classifications apply:

- OFFICIAL: generally acceptable with content exclusions configured
- OFFICIAL-SENSITIVE: requires risk assessment and strict content exclusions
- SECRET and above: not appropriate

Check the [base guardrails](../../governance/guardrails-base.md) for departmental policy on AI tool usage and security boundaries. Check with your security team before you start. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment and [NCSC secure development guidance](https://www.ncsc.gov.uk/collection/developers-collection) for security best practices.

### Content exclusions

You must configure Gemini Code Assist to exclude sensitive files. See the [policy configuration reference](#policy-configuration-reference) for recommended exclusion patterns.

### Data residency

Data residency considerations state:

- code suggestions are processed in configurable GCP regions
- customer code is not stored or used for model training
- UK and EU data residency options are available

Check your department's data residency requirements before deployment.

### Central deployment model

The AI Engineering Lab uses a central deployment model including:

- a central GCP enterprise account managed by the Department for Science, Innovation and Technology (DSIT)
- users receiving credentials to plug into their IDEs
- individual departments controlling access and usage

### Intellectual property

Gemini Code Assist Enterprise includes IP indemnity. For government projects, use the Enterprise edition only.

## Getting started

### Licensing options

#### Standard

Standard includes:

- AI coding assistance with enterprise-grade security
- code completion, generation, and chat
- agent mode

#### Enterprise

Enterprise is a paid plan and includes:

- all Standard features
- code customisation from private repositories
- IP indemnity
- usage analytics and reporting

Prices are listed on [Cloud Platform SKUs](https://cloud.google.com/skus). Check [Gemini for Google Cloud pricing](https://cloud.google.com/products/gemini/pricing) for current rates. Gemini Code Assist is available through [Crown Commercial Service G-Cloud 14](https://www.crowncommercial.gov.uk/agreements/RM1557.14) for government departments.

### Installation process

1. Receive credentials from the central GCP enterprise account.
2. Authenticate with provided project credentials.
3. Verify that your Gemini Code Assist licence is assigned.
4. Configure content exclusion policies via GCP console.
5. Install the Cloud Code extension in your IDE.
6. Test by opening a code file and checking that suggestions appear.

For detailed installation steps, see the [Gemini Code Assist getting started guide](https://cloud.google.com/gemini/docs/codeassist/getting-started).

## Phased rollout approach

### Phase 1: pilot (weeks 1 to 4)

Check the tool works and find any problems.

#### Activities

1. Select 5 to 10 engineers across different experience levels.
2. Focus on GCP-related projects or cloud infrastructure work.
3. Schedule weekly feedback sessions.
4. Document effective usage patterns, especially for GCP tasks.
5. Test agent mode and code transformation features on real codebases.

#### Success criteria

- [ ] 70% or more of pilot users actively using Gemini Code Assist
- [ ] No security incidents
- [ ] Documented productivity benefits for GCP tasks
- [ ] Clear implementation guidance for wider rollout
- [ ] Positive feedback on agent mode and code transformation capabilities

### Phase 2: team expansion (weeks 5 to 12)

Scale to full engineering team.

#### Activities

1. Roll out to entire team in groups of 10 to 15.
2. Deliver 60-minute training sessions per group.
3. Share pilot user success stories, especially GCP and agent mode use cases.
4. Establish support channels (Slack, Teams, or email).
5. Create internal knowledge base of effective prompts.

#### Success criteria

- [ ] 80% or more licence activation rate
- [ ] Acceptance rate above 20%
- [ ] Engineers report time savings on GCP tasks
- [ ] No increase in security vulnerabilities
- [ ] Active use of agent mode and transformation features

### Phase 3: optimisation (ongoing)

Get the most from the tool and fix any problems.

#### Activities

1. Review monthly usage analytics via GCP console.
2. Refine content exclusion policies based on incidents.
3. Update training materials based on common questions.
4. Share wins across department.
5. Explore advanced features (MCP integration, multimodal capabilities).

#### Success criteria

- [ ] Consistent month-on-month usage
- [ ] Fewer support tickets
- [ ] Measurable productivity improvements
- [ ] Positive engineer satisfaction scores
- [ ] Successful use of advanced features

## Training requirements

### Engineer training (60 minutes)

#### Module 1: basic usage (20 minutes)

Module 1 covers:

- accepting and rejecting suggestions
- using Gemini Chat for questions
- keyboard shortcuts

#### Module 2: GCP-specific features (20 minutes)

Module 2 covers:

- generating Terraform and infrastructure code
- troubleshooting GCP software development kit (SDK) integration

#### Module 3: advanced features and security (20 minutes)

Module 3 covers:

- using agent mode for multi-step tasks
- reviewing generated code critically
- content exclusions

Training is delivered as a live demonstration with hands-on practice. Multiple formats are available including in-person bootcamps, self-paced videos, and hackathons.

### Manager briefing (30 minutes)

This briefing covers:

- capability overview and realistic expectations
- usage metrics and how to interpret them
- addressing team concerns about AI tools

## Measuring success

For in-depth information on measuring quality metrics, refer to the [monitoring and evaluation framework](../../quality-metrics/measurement-playbook.md).

### Quantitative metrics

#### Adoption metrics

Adoption metrics include:

- licence activation rate (target: 90% or higher)
- daily active users (target: 80% or higher of activated licences)
- suggestion acceptance rate (target: 20% to 30%)
- agent mode usage (target: weekly per engineer)

#### Productivity metrics

Productivity metrics include:

- lines of code accepted per engineer per day
- time spent on GCP integration tasks (via engineer survey)
- Terraform and infrastructure code generation time
- pull request (PR) cycle time
- test coverage increase rate

#### Quality metrics

Quality metrics include:

- code issues detected via Gemini reviews
- code review comments per PR (should remain stable)
- bug escape rate (should not increase)
- GCP best practice compliance

### Qualitative feedback

You should run monthly surveys with engineers.

1. How often do you use Gemini Code Assist?
2. For which tasks is Gemini Code Assist most helpful?
3. How helpful are the GCP-specific features?
4. Has Gemini Code Assist affected your productivity?
5. Do you feel confident reviewing Gemini-generated code?
6. How useful is agent mode for complex tasks?

## Common implementation challenges

### Engineers not using the tool

Symptoms include low activation rates, acceptance rates below 15%, and feedback that suggestions are not helpful.

1. Check that content exclusions are not too restrictive.
2. Provide pairing sessions with effective users.
3. Share specific use case examples.

### Security concerns from team

Symptoms include engineers questioning suggestions and reluctance to accept generated code.

1. Clarify that the code review process remains unchanged.
2. Share Google Cloud data protection commitments.
3. Conduct a security workshop with examples.

### Over-reliance on suggestions

Symptoms include decreased code review thoroughness and accepting suggestions without understanding.

1. Reinforce code review standards.
2. Include 'understanding of implementation' in review checklists.
3. Pair junior engineers with seniors during adoption.

### Resistance to adoption

| Persona | Characteristics | What to do |
|---------|-----------------|------------|
| Sceptical | Doubt the value, need proof | Live demonstrations, show small wins |
| Worried | Fear job loss or skill devaluation | Reframe as helping with repetitive tasks |
| Overloaded | Too much change happening | Go slower, show quick wins that save time |
| Opposed | Actively resistant | Peer influence first, escalation if needed |

### Troubleshooting

| Issue | Common causes | First steps |
|-------|---------------|-------------|
| Suggestions not appearing | Extension disabled, authentication expired, file type excluded | Check extension is enabled, sign out and back in, verify file type is supported |
| Chat not responding | Service outage, licence inactive, firewall blocking | Check GCP status, verify licence in console, check firewall rules |
| Agent mode failures | Task too complex, insufficient permissions, MCP misconfigured | Break task into smaller requests, check permissions, verify MCP connections |
| Poor suggestion quality | Limited context, exclusions too restrictive | Add descriptive comments, check exclusion settings, open relevant files |
| Performance issues | Too many extensions, network latency | Reduce active extensions, check network connectivity |

For persistent issues, contact your team's champion or raise a support ticket.

### Security incidents

If an engineer discovers code containing hardcoded secrets, vulnerabilities, or data protection issues, follow the [incident response playbook](../../governance/incident-response-playbook.md) for structured handling.

- do not commit the code
- report to your security team using the standard incident process
- document the suggestion for analysis
- update content exclusions if the issue is pattern-based

## Integration with development workflow

The [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers integrating AI coding assistants across the full software development lifecycle.

### Code review process

Gemini Code Assist-generated code should pass through the same review process as human-written code.

Reviewers should check:

- logic correctness and edge case handling
- if there are hardcoded secrets or sensitive data
- compliance with team coding standards
- that the reviewer understands the implementation

### Git workflow

You do not need to change your Git workflow. Gemini Code Assist works in your IDE and does not affect commits, branches, or merges.

### Testing strategy

Treat generated code as untested until you have tested it.

1. Generate test scaffolding via Gemini, then review and enhance.
2. Manually verify GCP service interactions.
3. Run static application security testing (SAST) tools on all code.
4. Code review remains mandatory.

### Continuous integration and continuous deployment pipeline

No changes required. Ensure existing quality gates remain in place. Generated code must pass all gates before merging.

## Security best practices

### For managers

Managers should:

- configure content exclusions before any engineer access
- review exclusion patterns quarterly or after incidents
- enable usage analytics via GCP console
- establish a clear escalation path for security concerns
- maintain an approved MCP server registry for your department

### For engineers

Engineers should:

- never accept suggestions containing API keys, passwords, or tokens
- review security-critical code with extra scrutiny
- verify generated SQL queries for injection vulnerabilities
- review agent mode plans before approval
- only use MCP servers from your department's approved registry

### When to avoid Gemini Code Assist

Avoid using Gemini Code Assist for:

- implementing cryptographic algorithms
- writing security controls (authentication, authorisation)
- processing citizen data or personal information
- configuring production Identity and Access Management (IAM) policies without validation

The [safe usage guidance for Gemini Code Assist](../../user-tool-guides/gemini-code-assist/safe-usage-prototyping-vs-production.md) provides detailed guidance for engineers on the distinction between prototyping and production use.

## Policy configuration reference

### Recommended content exclusions

Configure in GCP console under Gemini Code Assist settings.

Exclude the following:

- environment and secrets files (`.env`, `secrets/`, `*.key`, `*.pem`)
- GCP credentials (`service-account-*.json`, `.gcloud/`)
- production configuration (`config/production/`, `terraform/production/`)
- citizen data directories
- security configurations

For the full exclusion pattern list, see the [content exclusions documentation](https://cloud.google.com/gemini/docs/codeassist/content-exclusions).

### Organisation-level settings

Configure the organisation-level settings in GCP console.

1. Go to GCP Console, then Gemini Code Assist.
2. Assign users via IAM.
3. Configure content exclusions.
4. Set up usage analytics.
5. Configure data residency preferences.

## Support and escalation

### Support tiers

#### Tier 1: self-service

Self-service resources includes:

- [Gemini Code Assist documentation](https://cloud.google.com/gemini/docs/codeassist)
- [getting started guide](https://cloud.google.com/gemini/docs/codeassist/getting-started)
- internal knowledge base (if established)

#### Tier 2: team support

Team support options includes:

- internal Slack or Teams channel
- champion network
- weekly office hours

#### Tier 3: DSIT and Google support

For escalated issues, contact:

- DSIT project team for licence and access issues
- Google Cloud Support via enterprise support plan

## Contributing

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes. We encourage contributions from across government to keep this repository current.