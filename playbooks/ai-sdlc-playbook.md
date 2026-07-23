> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# AI-assisted software development lifecycle

This playbook provides guidance on integrating AI coding assistants across all phases of the software development lifecycle. It is designed for UK government teams providing digital services and complements the 'Government Service Manual' and 'AI Playbook for the UK Government'.

## Who this is for

This guidance is for anyone involved in providing software in government, including:

- engineers
- technical architects
- delivery managers
- product managers
- quality assurance engineers
- technical leads

It assumes basic familiarity with AI coding assistant tools but accommodates teams at all maturity levels.

## Before you start

Before integrating AI coding assistants into your workflow, make sure you have:

- read [how AI code assistants integrate into the SDLC](ai-tools-integration-guide.md) to understand deployment patterns and capability maturity
- completed your department's AI Engineering Lab onboarding and received tool access
- reviewed the 'guardrails-base.md' for your organisation
- understood your team's data classification and what you can share with AI tools
- familiarised yourself with the 'context-engineering.md' approach

## Core principles

When using AI coding assistants throughout the software development lifecycle, apply these principles consistently.

Human oversight remains essential. AI coding assistants accelerate work but do not replace professional judgement. All AI-generated outputs require human review, particularly for security-sensitive code, architectural decisions and user-facing content.

Context drives quality. The effectiveness of AI coding assistant outputs depends directly on the context you provide. Invest time in context engineering to achieve better results.

Verify before committing. Never commit AI-generated code without understanding what it does. Run tests, review logic and validate against requirements.

Continuous compliance. Use Model Context Protocol (MCP) servers and guardrails to embed government standards (Technology Code of Practice, Web Content Accessibility Guidelines (WCAG), National Cyber Security Centre (NCSC), Government Service Standard) into your workflow from the start, not as an afterthought.

## Software development lifecycle phases

The following sections describe how to use AI coding assistants effectively at each phase of the software development lifecycle. Each phase includes practical guidance, example prompts and anti-patterns to avoid.

## Plan

Decide what to build next and break work into deliverable units.

### How AI coding assistants help

AI coding assistants can accelerate planning activities by helping teams analyse requirements, identify technical considerations and structure work effectively. They work best when given clear context about your service, users and constraints.

### Recommended activities

Analyse user stories and acceptance criteria. Share user stories with your AI coding assistant to identify ambiguities, missing edge cases or technical implications. This surfaces questions early rather than during development.

```
Example prompt:
'Review this user story and acceptance criteria. Identify any ambiguities, 
missing edge cases, or technical considerations we should clarify before 
development begins.

User story: [paste story]
Acceptance criteria: [paste criteria]
Our tech stack: [brief description]'
```

Generate technical approach options. When facing implementation decisions, ask your AI coding assistant to outline alternative approaches with trade-offs. Use this as input to team discussions, not as the final decision.

Estimate complexity. AI coding assistants can help identify technical complexity factors in stories, though human judgement remains essential for accurate estimation.

Create spike documentation. When investigating unknowns, use AI coding assistants to structure your spike, identify questions to answer and document findings.

### Anti-patterns to avoid

You should avoid:

- accepting AI-generated estimates without team validation
- using AI coding assistants to write user stories without user research input
- skipping human review of technical approach recommendations

### Quality indicators

You are following good practice if:

- stories have clear acceptance criteria before development starts
- the technical approach is understood and agreed by the team
- dependencies and risks are identified early

## Code

Write software that solves user problems while meeting government standards.

### How AI coding assistants help

AI coding assistants provide the most significant productivity gains during coding, offering real-time suggestions, generating boilerplate, explaining unfamiliar code and helping implement patterns correctly.

### Recommended activities

Use inline completion thoughtfully. AI coding assistant suggestions work best when you have clear intent. Write meaningful function names and comments first, then let the tool suggest implementations.

Generate boilerplate with context. When creating new components, provide your coding standards and architectural patterns as context. This produces more consistent, compliant code.

```
Example prompt:
'Create a Spring Boot REST controller for managing [resource]. 
Follow these patterns:
- use constructor injection
- apply our standard error handling approach
- include OpenAPI annotations
- follow National Cyber Security Centre secure coding guidelines

Existing controller for reference: [paste example]'
```

Explain and document existing code. When working with legacy or unfamiliar code, use AI coding assistants to generate explanations and documentation. Always verify accuracy against the actual behaviour.

Refactor with guardrails. When refactoring, provide your coding standards and ask AI coding assistants to suggest improvements. Review suggestions against your team's patterns.

Generate unit tests alongside code. Write tests as you develop, using AI coding assistants to generate test cases from your implementation. Ensure tests are meaningful, not just coverage padding.

### Context engineering for better code

The quality of AI coding assistant code suggestions depends heavily on context. Provide:

- project context: architecture decisions, coding standards, technology choices
- local context: related files, interfaces, data models
- intent context: what you are trying to achieve and why
- constraint context: security requirements, performance needs, accessibility standards

See [context engineering](context-engineering.md) for detailed guidance.

### Security considerations

You should:

- never paste secrets, credentials or API keys into AI coding assistant prompts
- review generated code for security vulnerabilities before committing
- use static application security testing tools to validate AI-generated code
- be cautious with AI-generated SQL, authentication and authorisation code
- validate input handling and output encoding in generated code
- configure coding agents to exclude sensitive files

Agentic coding tools should be configured to avoid reading .env files, .env.local, credential files or any other files containing environment variables or secrets. Add these patterns to your agent's ignore configuration to prevent accidental exposure of sensitive data.

### Anti-patterns to avoid

You should avoid:

- accepting suggestions without understanding the code
- ignoring security implications of generated code
- using AI coding assistants as a substitute for understanding your codebase
- generating large amounts of code without incremental testing
- copying AI suggestions that violate your coding standards

### Quality indicators

You are following good practice if:

- the code follows team conventions and passes linting
- the generated code has appropriate test coverage
- security-sensitive code receives additional review
- engineers can explain what their code does

## Build

Prepare code changes for testing by compiling, packaging and validating.

### How AI coding assistants help

AI coding assistants work with build configuration, dependency management and resolving build failures. They can explain error messages and suggest fixes, reducing time spent debugging build issues.

### Recommended activities

Diagnose build failures. Share build error logs with your AI coding assistant to get explanations and suggested fixes. Include relevant configuration files for context.

```
Example prompt:
'This Maven build is failing with the following error. Explain the cause 
and suggest how to fix it.

Error log: [paste log]
Relevant pom.xml section: [paste section]'
```

Optimise build configuration. AI coding assistants can suggest improvements to build scripts, dependency management and continuous integration pipeline configuration.

Generate build documentation. Create clear build instructions for your repository, ensuring new team members can get started quickly.

Resolve dependency conflicts. When facing dependency issues, AI coding assistants can help analyse conflicts and suggest resolution strategies.

### Anti-patterns to avoid

You should avoid:

- applying suggested fixes without understanding the root cause
- ignoring security warnings in dependency suggestions
- making build configuration changes without testing

### Quality indicators

You are following good practice if:

- builds are completed successfully and consistently
- build times are reasonable and optimised
- dependencies are up to date and secure
- the build process is documented and reproducible

## Test

Ensure everything works properly and meets quality standards.

### How AI coding assistants help

AI coding assistants significantly accelerate test creation, helping generate unit tests, integration tests and test data. They can identify edge cases and suggest test scenarios humans might miss.

### Recommended activities

Generate unit tests from implementation. After writing code, use AI coding assistants to generate comprehensive unit tests. Specify your testing framework and conventions.

```
Example prompt:
'Generate JUnit 5 tests for this service class. Include:
- happy path scenarios
- edge cases and boundary conditions
- error handling paths
- use Mockito for dependencies
- follow AAA (Arrange-Act-Assert) pattern

Class to test: [paste class]
Dependencies to mock: [list]'
```

Identify missing test scenarios. Share your code and existing tests, asking the AI coding assistant to identify gaps in coverage.

Generate test data. Create realistic test data sets that cover various scenarios, including edge cases and invalid inputs.

Write behaviour-driven development scenarios. Generate Gherkin scenarios from requirements, ensuring comprehensive coverage of user journeys.

Create accessibility test cases. Generate test cases that verify Web Content Accessibility Guidelines compliance for user-facing components.

### Test quality considerations

AI-generated tests require careful review. Check that tests:

- actually verify meaningful behaviour, not just achieve coverage
- use appropriate assertions (not just checking for no exceptions)
- are maintainable and readable
- do not duplicate existing tests
- cover security-relevant scenarios

### Anti-patterns to avoid

You should avoid:

- generating tests purely to increase coverage metrics
- accepting tests without verifying they test the right behaviour
- using AI-generated test data that contains realistic personal data
- skipping review of test assertions

### Quality indicators

You are following good practice if:

- tests verify actual requirements, not just implementation
- coverage is meaningful, not just numerical
- tests run reliably without flakiness
- edge cases and error paths are covered

## Release

Coordinate launching new features safely.

### How AI coding assistants help

AI coding assistants work with release preparation, including generating release notes, creating deployment checklists and documenting changes.

### Recommended activities

Generate release notes. Summarise changes from commit history or ticket descriptions into user-friendly release notes.

```
Example prompt:
'Generate release notes for version [X.Y.Z] based on these changes. 
Write for a technical audience but keep it clear and scannable.

Changes:
[paste commit messages or ticket summaries]

Previous version notes for style reference:
[paste previous notes]'
```

Create deployment checklists. Generate environment-specific checklists to ensure consistent, safe deployments.

Document breaking changes. Identify and clearly document any breaking changes, including migration steps for consumers.

Prepare rollback procedures. Document rollback steps for each significant change in the release.

### Anti-patterns to avoid

You should avoid:

- publishing AI-generated release notes without review
- automating release decisions without human approval
- skipping rollback planning for complex changes

### Quality indicators

You are following good practice if:

- release notes are accurate and complete
- deployment checklists are followed consistently
- breaking changes are communicated in advance
- rollback procedures are tested and documented

## Deploy

Put your service live for users safely and reliably.

### How AI coding assistants help

AI coding assistants work with infrastructure configuration, deployment scripts and troubleshooting deployment issues. They can generate and review infrastructure-as-code.

### Recommended activities

Generate infrastructure configuration. Create Terraform, CloudFormation or Kubernetes configurations with appropriate security settings.

```
Example prompt:
'Generate a Terraform configuration for an AWS ECS service with:
- application load balancer
- auto-scaling based on CPU utilisation
- CloudWatch logging
- security groups following least-privilege principles
- tags for cost allocation

Follow National Cyber Security Centre cloud security principles.'
```

Review infrastructure changes. Before applying infrastructure changes, use AI coding assistants to review configurations for security issues and best practices.

Troubleshoot deployment failures. Share deployment logs and configuration to diagnose issues quickly.

Generate deployment runbooks. Create step-by-step deployment guides for operations teams.

### Security considerations

You should:

- review all generated infrastructure code for security misconfigurations
- never include credentials in infrastructure-as-code
- validate network configurations and access controls
- make sure logging and monitoring are properly configured

### Anti-patterns to avoid

You should avoid:

- deploying AI-generated infrastructure without security review
- using overly permissive security configurations from suggestions
- skipping testing of deployment scripts

### Quality indicators

You are following good practice if:

- deployments are automated and repeatable
- infrastructure follows security best practices
- rollback procedures work reliably
- deployment time is minimised

## Operate

Keep your service running smoothly for users.

### How AI coding assistants help

AI coding assistants work with incident response, operational documentation and analysing system behaviour. They can help interpret logs, suggest remediation steps and document incidents.

### Recommended activities

Analyse incidents. During incidents, use AI coding assistants to quickly interpret error logs and suggest investigation paths.

```
Example prompt:
'We're experiencing increased latency on our API. Analyse these logs 
and metrics to suggest likely causes and investigation steps.

Error logs: [paste relevant logs]
Metrics: [describe current vs normal values]
Recent changes: [list recent deployments]'
```

Generate runbooks. Create operational runbooks for common scenarios, including monitoring alerts and their remediation steps.

Document incidents. After resolution, generate incident reports that capture timeline, root cause and preventive actions.

Optimise performance. Analyse performance data and suggest optimisation opportunities.

### Anti-patterns to avoid

You should avoid:

- relying solely on AI suggestions during critical incidents
- implementing suggested fixes without understanding the problem
- generating runbooks without validation by operations teams

### Quality indicators

You are following good practice if:

- incidents are resolved quickly with clear documentation
- runbooks are accurate and up to date
- the service meets availability and performance targets
- on-call burden is manageable

## Monitor

Learn from real usage to improve the service.

### How AI coding assistants help

AI coding assistants work with interpreting monitoring data, identifying patterns and suggesting improvements based on observed behaviour.

### Recommended activities

Analyse usage patterns. Use AI coding assistants to identify trends, anomalies and opportunities in service metrics.

```
Example prompt:
'Analyse these service metrics from the past month. Identify:
- unusual patterns or anomalies
- performance degradation trends
- opportunities for optimisation
- potential capacity concerns

Metrics data: [paste or describe data]'
```

Generate dashboards. Create monitoring dashboard configurations that surface the most important metrics.

Define alerts. Develop alerting rules that catch real problems without causing alert fatigue.

Summarise user feedback. Analyse support tickets, feedback and error reports to identify improvement priorities.

### Anti-patterns to avoid

You should avoid:

- acting on AI-identified patterns without validation
- creating excessive alerts based on suggestions
- ignoring context that the AI cannot see

### Quality indicators

You are following good practice if:

- dashboards show actionable information
- alerts indicate real problems requiring attention
- service improvements are driven by data
- user satisfaction is measured and improving

## Continuous compliance

Throughout all software development lifecycle phases, use Model Context Protocol servers to maintain continuous compliance with government standards. This includes:

- Technology Code of Practice: architecture and technology choices
- Web Content Accessibility Guidelines 2.2 AA: accessibility requirements
- National Cyber Security Centre (NCSC) guidelines: security practices
- government service standard: service design and delivery

Configure your AI Engineering Lab tools to reference these standards automatically, catching compliance issues during development rather than at assessment.

## Getting help

If you encounter challenges using AI coding assistants effectively, complete the following steps.

1. Check the prompt library for tested prompts for common scenarios.
2. Consult your team's AI Engineering Lab champion for guidance.
3. Raise questions in the cross-government AI Engineering Lab community channels.
4. Request support from the Forward Deployed Engineering team for complex adoption challenges.

## Further reading

### Internal resources

- [Context engineering playbook](context-engineering.md)
- [Model selection guidance](model-selection.md)
- [Guardrails base configuration](../governance/guardrails-base.md)

### External resources

- [Government AI Playbook](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)
- [Service manual](https://www.gov.uk/service-manual)
- [Version 1 UK Gov Example AI SDLC](https://github.com/Version1/uk-gov-example-ai-sdlc)
