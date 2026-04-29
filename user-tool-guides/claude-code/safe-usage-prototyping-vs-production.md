> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Safe usage guidance: prototyping vs production environments

## Purpose

This guidance explains how to use Claude Code safely in both prototyping and production environments across UK government departments. It sets different controls for each, allowing teams to experiment quickly during prototyping while maintaining strong security for production systems.

## Who this is for

This guidance is for:

- engineering managers implementing Claude Code
- technical leads defining development workflows
- engineers using Claude Code in different environments
- security and compliance teams reviewing AI tool usage

## Before you start

Before using this guidance, make sure you:

- read the [base guardrails](../../governance/guardrails-base.md)
- complete department-specific AI tool onboarding
- understand your team's data classification levels
- identify which environments your team uses

## Quick navigation

[Environment definitions](#environment-definitions)

[Data classification and environment matrix](#data-classification-and-environment-matrix)

[Prototyping environment controls](#prototyping-environment-controls)

[Production environment controls](#production-environment-controls)

[Transition from prototype to production](#transition-from-prototype-to-production)

[Common scenarios](#common-scenarios-and-guidance)

[Ethics review framework](#ethics-review-framework)

[Departmental AI tool governance](#departmental-ai-tool-governance)

[Policy configuration](#policy-configuration-recommendations)

[Measuring compliance](#measuring-safe-usage-compliance)

## Environment definitions

### Prototyping environment

A prototyping environment is characterised by:

- exploration of technical approaches or proof of concepts
- code not intended for production deployment
- limited or no access to production data or systems
- short-lived codebases (typically days to weeks)
- systems and networks isolated from production

Examples include:

- technology spikes to evaluate frameworks or libraries
- proof of concept demonstrations
- application programming interface (API) integration experiments
- user interface and user experience (UI/UX) prototype development
- algorithm or workflow exploration
- architectural design exploration
- code transformation trials for migration planning

### Production environment

A production environment is characterised by:

- code deployed to serve live users or systems
- access to production systems or data
- long-lived codebases requiring maintenance
- integration with production systems
- subject to service level agreements (SLAs) or operational requirements

Examples include:

- public-facing services
- internal operational systems
- APIs serving production traffic
- scheduled batch processes using production data
- infrastructure as code for production environments
- continuous integration and continuous deployment (CI/CD) pipeline code
- operational automation scripts

### Intermediate environments

Pre-production environments (such as development, test, staging, integration) should follow production-level controls unless they meet all the criteria for prototyping environments.

Apply production-level controls if an environment contains:

- production-like data (even if anonymised)
- connections to production systems or services
- code that will be promoted to production
- infrastructure that mirrors production architecture

## Data classification and environment matrix

The table below defines which Claude Code usage is permitted based on data classification and environment type.

| Data classification | Prototyping environment | Production environment |
|---------------------|-------------------------|------------------------|
| OFFICIAL | Permitted with standard controls | Permitted with enhanced controls |
| OFFICIAL-SENSITIVE | Permitted with enhanced controls and accreditation | Permitted with strict controls and accreditation |
| SECRET | Not permitted | Not permitted |
| TOP SECRET | Not permitted | Not permitted |

### Notes on classifications

#### OFFICIAL – prototyping

Standard controls apply. You must:

- use synthetic or anonymised data
- follow core guardrails

#### OFFICIAL – production

Enhanced controls apply. You must:

- ensure all generated code passes security scanning
- complete a mandatory peer review before merging
- consider data residency requirements

#### OFFICIAL-SENSITIVE – all environments

A risk assessment is required. It must include:

- evaluation of data residency constraints (Claude Code processes data in the United States by default)
- consideration of the EU regional option, when available
- audit logging requirements
- controls for large context windows
- restrictions on agentic features when handling sensitive data
- a review of the CLAUDE.md file for sensitive information

#### SECRET and above

You must not use Claude Code with data classified as SECRET or above in any environment.

## Prototyping environment controls

### Purpose of relaxed controls

Prototyping environments balance rapid experimentation with security. Controls are focused on preventing data exposure rather than code quality, as prototype code is not deployed to production.

### P-01: data handling in prototypes

You must:

- use only synthetic, anonymised or publicly available data
- not access production systems or data sources
- not include real user data in code, comments or prompts
- use separate, isolated environments for prototyping
- not test with credentials that have production access

You can:

- use publicly available datasets for testing
- create mock data that resembles production structure
- reference public documentation or examples
- experiment with large context windows in non-sensitive repositories

### P-02: code review requirements

You must:

- have at least one other engineer review prototype findings
- document key technical decisions or discoveries
- delete or archive prototypes that are not progressed
- review Claude's execution plans before approving agentic actions

You are not required to:

- conduct detailed security code reviews for every commit
- have multiple reviewers for experimental code
- scan prototype code with all production security tools if it will never reach production

### P-03: repository security

You must:

- use private repositories for all prototype work
- not commit secrets, API keys, authentication tokens or credentials
- enable secret scanning on prototype repositories
- clearly label repositories as 'PROTOTYPE - NOT FOR PRODUCTION'
- review CLAUDE.md files for sensitive information before committing

You should:

- add a README stating the prototype purpose and lifespan
- include data classification labels
- set repository archive dates
- use repository labels to identify prototype projects

### P-04: AI assistant usage

You can:

- use Claude Code's chat, CLI and agentic features
- experiment with code transformation for migration planning
- iterate rapidly without extensive documentation
- ask broad exploratory questions
- use large context windows with non-sensitive code
- test extended thinking capabilities for complex problems

You must:

- still follow data classification limits (no SECRET data)
- not share restricted intellectual property
- review all agentic execution plans before approval
- validate architectural suggestions from Claude
- check infrastructure configurations suggested by Claude
- understand what files are in Claude's context window

### P-05: dependency management

You should:

- check suggested libraries are appropriate for UK government use
- prefer well-known, actively maintained libraries
- verify licensing compatibility
- understand security implications of suggested dependencies

You are not required to:

- conduct full security audits of all suggested dependencies
- use only pre-approved dependency lists
- perform penetration testing on prototype infrastructure

### P-06: transition planning

Before moving prototype code to production, you must:

- conduct full security review using production controls
- replace all mock data sources with production-ready implementations
- ensure all dependencies pass security scanning
- complete threat modelling if not already done
- apply all production-level code standards
- migrate to production environments with appropriate controls
- review and harden all configurations
- sanitise CLAUDE.md files of any prototype-specific context

A prototype transitioning to production must be treated as new production code and cannot skip any production controls.

## Production environment controls

### Purpose of strict controls

Production environments serve real users and handle operational data. Controls ensure that Claude Code enhances, rather than undermines, code quality, security and reliability.

### PR-01: data handling in production

You must:

- classify all data accessed by production code
- never include personal data, credentials or classified information in prompts
- use secure secret management for sensitive configuration
- sanitise any code examples shared with Claude Code
- understand where Claude processes your data (United States by default, EU option when available)

You must not:

- paste production data into chat interfaces
- include real API keys, passwords or authentication tokens in any context
- reference specific case details, investigation data or personal information
- expose security-sensitive architecture details in CLAUDE.md
- include production credentials in project context files

### PR-02: mandatory code review

All AI-generated code for production must undergo human review before commit. The review must verify:

| Review aspect | Requirement |
|---------------|-------------|
| Logic correctness | Code performs intended function correctly |
| Security | No vulnerabilities (injection, cross-site scripting (XSS), authentication bypass, etc.) |
| Error handling | Appropriate exception handling and logging |
| Dependencies | All packages verified and approved |
| Test coverage | Adequate tests exist for generated code |
| Accessibility | Web Content Accessibility Guidelines (WCAG) compliance for user-facing code |
| Standards compliance | Follows GDS Service Standard and Technology Code of Practice |
| Performance | Code is efficient and scalable |
| Documentation | Code is maintainable and documented |

### PR-03: security scanning requirements

All AI-generated production code must pass:

| Scan type | Timing | Action on failure |
|-----------|--------|-------------------|
| Secret detection | Pre-commit hook | Block commit |
| SAST (static analysis) | CI pipeline | Block merge |
| Dependency scanning | CI pipeline | Block merge if high or critical CVE |
| Licence compliance | CI pipeline | Block merge if incompatible |
| Container scanning | Pre-deployment | Block deployment if high or critical CVE |
| DAST (dynamic analysis) | Post-deployment to test environment | Must pass before production deployment |

Do not disable or bypass these scans because code was AI-generated. AI-generated code must meet the same standards as human-written code.

### PR-04: restricted AI assistant features

In production codebases, you must:

- review all suggestions and generated code before accepting
- carefully scope agentic tasks to intended areas only
- review and approve execution plans before implementation
- test AI-generated code thoroughly before committing
- maintain detailed audit logs for AI-assisted actions
- validate all configurations before applying
- limit context window size to necessary files only
- review extended thinking outputs for sensitive information

You should:

- use Claude Code primarily for routine tasks (tests, documentation, refactoring)
- rely on human judgement for architectural decisions
- prefer smaller, reviewable AI-generated changes over large rewrites
- use Claude's reasoning capabilities to understand complex problems before implementing solutions

### PR-05: context window management

Claude Code's large context window (up to 1 million tokens, with 2 million tokens in beta) requires careful management in production:

You must:

- limit context to only necessary files for the task
- exclude sensitive configuration files from context
- avoid including entire production codebases unnecessarily
- review what files are being sent as context before accepting suggestions
- be aware that larger context windows increase risk of inadvertent data exposure
- understand that all context is sent to Anthropic's servers (United States by default)

You should:

- use targeted file selection rather than workspace-wide context
- configure .gitignore-style exclusions for sensitive files
- regularly audit which files are being used for context
- use CLAUDE.md strategically without including sensitive details

### PR-06: agentic mode controls

Claude Code has strong agentic capabilities that can execute multi-step tasks.

Before enabling agentic features, you must:

- make sure the engineer understands what actions Claude can take
- verify workspace does not contain production credentials or secrets
- confirm appropriate scope and boundaries are set
- review and approve execution plan before starting

During agentic execution, you must:

- monitor progress and be prepared to cancel if needed
- review each significant change before approval
- maintain version control with clean git state for easy rollback
- not leave agentic tasks running unattended

Never allow agentic mode to:

- access production systems or databases
- modify production infrastructure
- execute commands with privileged credentials
- make changes without explicit human approval of execution plans
- access files outside the defined project scope

#### Computer-using agents and autonomous features

You must not:

- grant Claude Code access to production systems or accounts
- allow agents to create, modify or delete production resources without human approval
- use agents to make infrastructure changes in production
- enable agents to execute commands with privileged credentials
- allow agents to access production databases or APIs

All agent actions must:

- require explicit human approval of execution plans before proceeding
- be logged and auditable
- be scoped to minimal necessary permissions
- be disabled by default and explicitly enabled only when needed for non-production tasks

#### OWASP AI security guidance

Engineers working with AI-generated code should be familiar with:

- [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) top security risks for large language model applications
- [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/), security considerations for autonomous AI systems

These resources help identify vulnerabilities specific to AI-generated code and applications that integrate AI.

### PR-07: prohibited use cases in production

You must not use Claude Code to generate:

| Prohibited area | Rationale |
|-----------------|-----------|
| Cryptographic algorithms | Requires specialist implementation and formal verification |
| Authentication or authorisation logic | Security-critical, requires security architect review |
| Firewall rules or network policies without review | Network misconfiguration creates vulnerabilities |
| Input validation for security-sensitive features | Subtle errors create major risks |
| Payment processing logic | Financial and Payment Card Industry Data Security Standard (PCI-DSS) compliance requirements |
| Safety-critical system logic | Life-safety implications |
| Autonomous agent features with production access | Computer-using agents must not access production accounts or resources |

For these areas, use established libraries or consult security specialists.

### PR-08: CLAUDE.md security

The CLAUDE.md file provides project context to Claude Code. In production repositories, you must meet the following requirements.

For content restrictions, you must:

- never include production credentials, API keys or secrets
- avoid detailed security architecture information
- not include production system URLs or endpoints
- exclude information about vulnerabilities or security incidents
- avoid listing production environment details

You should include:

- general architectural patterns and conventions
- coding standards and style guidelines
- common development workflows
- testing requirements and patterns
- documentation standards
- British English and GDS Service Standard requirements

For reviews, you must:

- treat CLAUDE.md as code and subject to peer review
- scan CLAUDE.md for secrets before committing
- regularly audit content for appropriateness
- remove outdated or sensitive context

### PR-09: dependency verification

When Claude Code suggests dependencies for production, you must follow these steps.

1. Verify the package is from an official, trusted source.
2. Check the package has no known high or critical CVEs.
3. Confirm the package is actively maintained (updated within 12 months).
4. Verify licence compatibility with your project.
5. Assess whether the package is necessary (avoid dependency bloat).
6. Check your department has not explicitly blocklisted the package.
7. Review the package's security scorecard (if available).

Warning signs requiring escalation include:

- packages with fewer than 1,000 downloads per month
- packages were last updated more than 12 months ago
- packages with open critical security issues
- packages from unfamiliar or unofficial registries
- packages with unclear or conflicting licences

### PR-10: test requirements

AI-generated code must include or be covered by:

- unit tests with meaningful assertions (not just to pass coverage)
- integration tests for external service interactions
- contract tests for APIs
- accessibility tests for user-facing components (WCAG 2.2 AA minimum)
- security tests for authentication or input handling
- performance tests for critical paths
- error handling and edge case tests

Do not accept AI-generated tests without reviewing them for quality and coverage. AI may generate tests that pass but do not adequately verify behaviour.

### PR-11: documentation standards

AI-generated production code must include:

- inline comments explaining complex logic or non-obvious decisions
- API documentation (OpenAPI/Swagger for REST APIs)
- README updates if new features or dependencies are added
- architectural decision records (ADRs) for significant choices
- runbooks for operational processes
- deployment documentation

Claude can help draft documentation, but it must be reviewed for accuracy and completeness.

### PR-12: data residency considerations

When using Claude Code for production systems, you must consider the following requirements.

Data residency requirements where:

- Claude Code processes data in the United States by default
- EU regional option is planned but not currently in general availability
- UK data residency is not currently available
- all prompts and code sent to Claude transit through Anthropic's infrastructure

Risk assessments must:

- determine if United States data processing is acceptable for your classification
- document data residency considerations in your risk register
- consider alternative tools if UK or EU residency is mandatory
- review your department's data protection impact assessment (DPIA) requirements

You should escalate when:

- OFFICIAL-SENSITIVE data requires UK or EU residency
- contractual obligations require specific data residency
- department policy mandates UK-only processing
- regulatory requirements mandate data sovereignty

### PR-13: incident response

If AI-generated code causes a production incident, you should follow these steps. 

1. Follow your department's standard incident response process.
2. Document that code was AI-generated in incident report.
3. Review whether guardrails were followed correctly.
4. Identify whether the incident reveals a gap in controls.
5. Document what context was provided to Claude Code.
6. Review whether agentic features contributed to the issue.
7. Share learnings with the AI Engineering Lab team.

Do not hide that code was AI-generated. Transparency helps the community learn and improve.

### PR-14: audit and compliance

For audit purposes, you should:

- maintain records of which code was AI-generated (commit messages, pull request labels)
- capture relevant Claude Code interactions for significant changes
- retain evidence of security scanning results
- document major AI-assisted architectural decisions
- maintain records of agentic task approvals
- log what files were included in context for significant decisions

This ensures traceability and supports compliance requirements.

### PR-15: citizen transparency and disclosure

When AI-generated code is used in public-facing services, you must consider transparency requirements.

For services processing citizen data, you should:

- disclose in privacy notices if AI is used to process personal data
- document AI usage in Data Protection Impact Assessments (DPIAs)
- be prepared to explain AI-assisted decisions if challenged
- ensure citizens can request human review of automated decisions where required by UK General Data Protection Regulation (GDPR)

For internal services, you must:

- inform users if AI assists with their requests or case handling
- maintain clear records of where AI is used in decision-making processes
- ensure AI usage does not conflict with departmental transparency commitments

General principles include:

- transparency builds public trust in digital government services
- citizens have a right to know when AI influences decisions affecting them
- AI should augment human decision-making, not replace accountability

Consult your department's data protection officer before deploying AI-assisted features that process personal data.

## Transition from prototype to production

### When to apply production controls

Apply production controls when the:

- prototype code is considered for production deployment
- prototype receives production system access
- prototype is integrated with production systems
- prototype moves from proof of concept to minimum viable product (MVP)

### Transition checklist

Before promoting prototype code to production, complete this checklist.

| Area | Requirement | Status |
|------|-------------|--------|
| Security review | Full security review by engineering team | [ ] |
| Threat modelling | Threat model completed or updated | [ ] |
| Code standards | Code refactored to meet department standards | [ ] |
| Test coverage | Adequate automated tests written and passing | [ ] |
| Security scanning | All scans (SAST, dependency, secrets) passing | [ ] |
| Dependency audit | All dependencies verified and approved | [ ] |
| Documentation | Production-quality documentation completed | [ ] |
| Accessibility | WCAG 2.2 AA compliance verified (if user-facing) | [ ] |
| Data handling | All mock or synthetic data replaced with production-ready code | [ ] |
| Architecture review | Technical architect or lead engineer approval | [ ] |
| Data residency | Data residency requirements assessed and met | [ ] |
| CLAUDE.md sanitised | Project context file reviewed for sensitive information | [ ] |
| Context window review | Verified appropriate file scope for production use | [ ] |
| Agentic features review | Assessed and configured appropriate boundaries | [ ] |
| Peer review | Detailed code review by at least 2 engineers | [ ] |
| Operational readiness | Monitoring, logging, alerting configured | [ ] |

### Recommended transition approach

Instead of directly promoting prototype code, you should:

- rewrite with production intent, using the prototype as a reference implementation but write production code with full controls
- do incremental migration, moving small, well-tested components over time
- take a hybrid approach, keeping the prototype running alongside production during validation phase

Do not simply rename 'prototype' repositories to 'production' without applying appropriate controls.

### Pre-use due diligence checklist

Before using Claude Code in any environment, complete this due diligence assessment.

| Question | Consideration |
|----------|---------------|
| Does this comply with department policy? | Check your department's AI tool approval process and approved tool list |
| What data classification will be used? | Ensure Claude Code is approved for that classification level |
| Are there data sovereignty restrictions? | Verify data residency requirements (United States default, EU planned, UK not available) |
| Is the intended use lawful? | Ensure compliance with relevant legislation (GDPR, Computer Misuse Act, etc.) |
| Are there ethical concerns? | Consider if use requires ethics review (see ethics section below) |
| Does customer policy allow AI use? | If working on customer projects, verify their AI policy permits Claude Code |
| What security controls are needed? | Identify which controls from this guidance apply |
| Who has approved this use? | Ensure appropriate management sign-off is obtained |
| What systems will be accessed? | Verify appropriate boundaries and access controls |
| What context will be shared? | Assess what files and information will be in Claude's context window |
| What is the cost impact? | Understand licensing costs and usage-based pricing |

Document your answers and retain them for audit purposes. Escalate concerns to your technical lead or security team.

## Common scenarios and guidance

### Scenario 1: architectural design exploration

Engineer exploring microservices architecture options for new service.

Environment: prototyping

#### Appropriate controls

You can:

- use Claude Code's reasoning capabilities to explore options
- discuss architectural trade-offs with Claude
- generate proof-of-concept code to test approaches
- use extended thinking for complex design problems
- document findings in architectural decision records

You must not:

- include production system details in context
- share sensitive security requirements
- include real production configurations
- use production credentials for testing

Transition: if proceeding, conduct formal architecture review, complete threat model, and rebuild with production controls.

### Scenario 2: code migration from legacy framework

Team migrating large Python 2.7 codebase to Python 3.12.

Environment: production (upgrading existing production code)

#### Appropriate controls

You must:

- use Claude's agentic capabilities in non-production environment first
- review all transformed code thoroughly
- test extensively before deploying to production
- maintain rollback plan
- update all dependencies to secure versions
- verify application behaviour unchanged (or document intended changes)
- perform performance testing after transformation
- review execution plans before approving multi-file changes

You should:

- pilot transformation on smaller, less critical components first
- document transformation decisions and any manual changes required
- involve your technical architect in the migration strategy
- break large transformations into smaller, reviewable chunks
- use Claude's large context window to understand codebase relationships

Special considerations include:

- code transformation operates at scale, increasing review burden
- automated transformation may not catch all compatibility issues
- legacy code patterns may require manual intervention
- large context windows useful but require careful scoping

### Scenario 3: building GOV.UK service with test-driven development

Engineer implementing new feature using test-driven development approach.

Environment: production

#### Required controls

You must:

- generate tests before implementation code
- review all generated tests for quality and coverage
- ensure tests follow GDS Service Manual guidance
- verify accessibility requirements in tests (WCAG 2.2 AA)
- apply all production code review requirements
- scan code with production security tools
- document approach in CLAUDE.md for consistency

You should:

- use Claude to generate comprehensive test cases including edge cases
- use Claude's reasoning to identify security test scenarios
- have Claude explain test rationale for complex cases
- use British English in all test descriptions and messages

Special considerations include:

- AI-generated tests may pass without adequately validating behaviour
- review test assertions carefully for meaningful checks
- ensure accessibility tests actually verify WCAG compliance
- consider using Claude to explain existing test patterns before generating new ones

### Scenario 4: infrastructure as code development

Engineer creating Terraform modules for new infrastructure.

Environment: production (infrastructure is always production)

#### Required controls

You must:

- apply all production code review requirements
- validate with terraform validate and tflint
- check for security misconfigurations (public access, open ports)
- review all access controls and permissions
- ensure encryption is enabled where appropriate
- verify logging and monitoring are configured
- test infrastructure code in non-production first
- document infrastructure decisions in ADRs

You should:

- use department-approved infrastructure patterns where available
- follow cloud provider best practices (AWS Well-Architected, GCP Architecture Framework, Azure Well-Architected)
- implement cost controls and resource tagging
- use Claude to understand infrastructure best practices before implementing

You must not:

- accept infrastructure code without security review
- deploy infrastructure directly to production without testing
- include production credentials in CLAUDE.md
- share sensitive network topology in context

Infrastructure misconfigurations can expose entire systems and generate unexpected costs.

### Scenario 5: API security review

using Claude Code to review existing API for security vulnerabilities.

Environment: production

#### Required controls

You must:

- sanitise any production code examples before sharing with Claude
- not include production API keys or authentication tokens
- not share specific vulnerability details in external systems
- verify any security findings with security team
- not rely solely on AI for security assurance

You should:

- use Claude's reasoning to understand potential attack vectors
- ask Claude to explain OWASP Top 10 risks in your context
- review authentication and authorisation logic carefully
- consider using Claude to generate security test cases
- document security findings and remediation

You must not:

- paste production code with embedded secrets
- share details of active vulnerabilities before remediation
- use Claude as sole security review mechanism
- assume AI-identified issues are comprehensive

Security review requires human expertise; AI is a tool to augment, not replace, security analysis.

## Ethics review framework

### When ethics review is required

Seek ethics review from your department's governance board or senior leadership before using Claude Code in the following scenarios.

When AI is replacing or augmenting human decision-making, seek a review for:

- code that automates decisions affecting citizens (benefits, licensing, enforcement)
- systems that triage, prioritise or route cases or applications
- algorithms that score, rank or classify individuals or organisations

For ethically sensitive domains, you should seek review for:

- healthcare and medical systems
- law enforcement and criminal justice
- immigration and border control
- child protection and safeguarding
- national security and intelligence
- military and defence systems

For politically or socially sensitive applications, you should seek review for:

- systems subject to public debate or controversy
- use cases at odds with government values (fairness, transparency, accountability)
- applications that may face legal challenge or judicial review

For agentic features in sensitive contexts, you should seek review when:

- enabling agentic mode for systems handling vulnerable populations data
- using autonomous features in decision-making systems

### Ethics assessment questions

When submitting for ethics review, you must address these questions.

| Question | Why it matters |
|----------|----------------|
| What decisions will the AI-assisted system make? | Understand scope and impact |
| Who will be affected by those decisions? | Identify stakeholders and vulnerable groups |
| Could the system create unfair outcomes? | Assess bias and discrimination risks |
| Is human oversight maintained? | Ensure accountability |
| Can decisions be explained and challenged? | Support transparency and due process |
| What happens if the system fails? | Understand safety implications |
| Are there less intrusive alternatives? | Principle of necessity |
| How are agentic features being used? | Assess autonomous decision-making risks |

### Ethics principles for AI use

Government use of AI should adhere to the following principles.

#### 1. Fairness

AI must not discriminate or create unjust outcomes. Consider impact on protected characteristics (age, disability, race, religion, sex, etc.).

#### 2. Accountability

Humans remain responsible for AI-assisted decisions. AI is a tool, not a decision-maker.

#### 3. Transparency

Be open about where and how AI is used. Provide meaningful explanations of AI-assisted decisions.

#### 4. Safety and security

Ensure AI systems are reliable, secure and fail safely. Protect against manipulation or misuse.

#### 5. Proportionality

 Use AI only where benefits outweigh risks. Consider less intrusive alternatives.

### Escalation process

Follow these steps if you believe an ethics review is needed.

1. Discuss with your technical lead or service owner.
2. Document the use case and ethical considerations.
3. Submit to your department's AI governance board or ethics committee.
4. Do not proceed until approval is granted.
5. Document the decision and any conditions imposed.

If your department lacks an ethics review process, escalate to your chief technology officer or equivalent senior responsible officer.

## Departmental AI tool governance

### Approved tool lists

Your department should maintain an approved AI tool 'allow list' specifying:

- which AI tools are approved for use
- what data classifications each tool is approved for
- any specific conditions or limitations
- approval dates and review schedules

Engineers must only use tools on the approved list unless an exception has been granted.

### Tool approval process 

1. Propose the tool by submitting a business case explaining need and benefits.
2. Security team evaluates data handling, residency, encryption.
3. Legal team reviews terms of service, liability, intellectual property.
4. Data protection officer assesses GDPR compliance including data residency.
5. Confirm licensing and commercial arrangements for procurement.
6. Perform a risk assessment, documenting and accepting residual risks (including data residency constraints)
7. Senior responsible officer approves or rejects.
8. Tool added to approved list with conditions.

### Exception and waiver process

If Claude Code is not on your departments approved list, you should consider the following things. 

For prototyping and research:

- unapproved AI tools may be used for non-production activities (training, proof of concept, research)
- no department or citizen data must be used
- no production systems may be accessed
- agentic features must be used cautiously
- document the tool use and purpose
- results must not be deployed to production

For production use:

- submit exception request to AI governance board or equivalent
- provide business justification and risk mitigation
- obtain senior management approval
- time-bound approval (for example, 3 months pending full approval process)
- re-assessment required if tool terms or usage change

### Denied tool list

Some tools may be explicitly denied by your department due to:

- unacceptable security or privacy risks
- incompatible terms of service
- data residency constraints
- previous security incidents

Do not use tools on the denied list under any circumstances. Contact your security team if you need alternatives.

### Annual governance review

Departments should review AI tool governance annually, to:

- review approved tool list for continued compliance
- assess changes to terms and conditions of approved tools
- review data residency options (monitor EU regional availability for Claude Code)
- analyse incidents and near-misses
- update policies based on lessons learned
- produce annual report on AI usage and compliance

This ensures governance keeps pace with evolving AI technology and risks.

## Policy configuration recommendations

### Claude Code settings

For UK government departments, configure Claude Code as follows.

| Setting | Prototyping | Production | Rationale |
|---------|-------------|------------|-----------|
| Edition | Pro | Pro or Team/Enterprise | Advanced features and higher limits needed |
| Context window | Moderate | Strictly limited | Controls data exposure |
| Agentic features | Enabled with caution | Enabled with strict controls | Powerful but requires oversight |
| CLAUDE.md | Project-specific | Sanitised, no secrets | Provides context without exposing sensitive data |
| Extended thinking | Enabled | Enabled for complex tasks | Useful for reasoning but review outputs |
| CLI access | Enabled | Controlled | Convenient but requires audit |

### CLAUDE.md recommendations

Create a CLAUDE.md file in your repository root with appropriate project context.

You should include:

- general architectural patterns
- coding standards and conventions
- testing requirements
- documentation standards
- British English requirements
- GDS Service Standard reminders
- common workflow guidance

You must not include:

- production credentials or API keys
- production URLs or endpoints
- detailed security architecture
- information about vulnerabilities
- production environment details
- personally identifiable information

### File exclusion patterns

Configure exclusions (similar to .gitignore) to protect these patterns:

```
**/secrets/**
**/keys/**
**/.env
**/.env.*
**/config/production.*
**/config/secrets.*
**/credentials/**
**/kubeconfig
**/terraform.tfstate
**/terraform.tfvars
**/.aws/credentials
**/.gcp/credentials
**/service-account-keys/**
```

## Measuring safe usage compliance

### Compliance indicators

You can assess whether your team is following safe usage guidance by checking the following indicators.

| Indicator | Target | How to measure |
|-----------|--------|----------------|
| Prototype repositories labelled | 100 percent | Repository topics or labels |
| Production code reviews completed | 100 percent | Pull request approvals |
| Security scans passing | 100 percent | CI or CD pipeline status |
| Incidents linked to AI-generated code | Trend downward | Incident reports |
| Engineers trained on safe usage | 100 percent | Training records |
| CLAUDE.md files reviewed | 100 percent | Audit of production repositories |
| Agentic task approvals documented | 100 percent | Manual audit of agentic usage |

### Red flags requiring action

Escalate immediately if you identify:

- AI-generated code committed without review
- secrets or credentials in code generated with Claude assistance
- production incidents caused by AI-generated security vulnerabilities
- engineers bypassing security scans for AI-generated code
- prototype code deployed to production without transition process
- OFFICIAL-SENSITIVE or higher data shared with Claude Code
- production credentials or secrets in CLAUDE.md files
- agentic features accessing production systems without approval
- large context windows used without justification exposing sensitive data
- data residency requirements violated

## Roles and responsibilities

| Role | Prototyping responsibilities | Production responsibilities |
|------|------------------------------|----------------------------|
| Engineer | Follow prototyping controls, document findings, delete unused prototypes | Follow all production controls, complete security scanning, thorough code review, manage context windows appropriately, review agentic execution plans |
| Technical lead | Review prototype direction, approve transition to production | Approve production code, ensure compliance, participate in security reviews, approve agentic feature usage, review CLAUDE.md content |
| Engineering manager | Ensure team trained on safe usage, allocate time for compliance | Enforce production controls, track compliance metrics, escalate issues, approve architectural changes, oversee agentic feature governance |
| Security team | Review transition plans, advise on risk, assess data residency implications | Review production security scanning, investigate incidents, audit compliance, validate architectures, audit CLAUDE.md files |
| Service owner | Decide whether prototypes progress to production | Accountable for service security, compliance and data protection |

## Keeping this guidance up to date

AI tools evolve rapidly. This guidance should be reviewed:

- every 6 months as a minimum
- after major Claude Code feature releases
- following incidents involving AI-generated code
- when government policy or security guidance changes
- when data residency options change (monitor EU regional availability)

## Further reading

### Internal documentation

[Base guardrails](../../governance/guardrails-base.md) covers foundational security controls.

[AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) describes integrating AI tools across development lifecycle.

[Incident response playbook](../../governance/incident-response-playbook.md) describes responding to AI tool incidents.

[Model selection guide](../../playbooks/model-selection.md) covers choosing appropriate AI models.

[Context engineering](../../playbooks/context-engineering.md) describes managing CLAUDE.md and project context.

### Government guidance

[Government Service Manual](https://www.gov.uk/service-manual)

[Government Service Standard](https://www.gov.uk/service-manual/service-standard)

[Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

[Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications)

[NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles)

### Claude Code resources

[Anthropic documentation](https://docs.anthropic.com/)

[Claude Code best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

[Anthropic security and privacy](https://www.anthropic.com/security)

[Claude regional compliance](https://claude.com/regional-compliance)

[CLAUDE.md guidance](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-case-guides/code-assistant)

### AI security resources

[OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) describes top security risks for large language model applications.

[OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) covers security considerations for autonomous AI systems.

[NCSC AI and Machine Learning Security](https://www.ncsc.gov.uk/collection/machine-learning) provides UK guidance on securing AI systems.
