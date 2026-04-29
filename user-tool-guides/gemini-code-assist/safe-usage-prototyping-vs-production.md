> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Safe usage guidance: prototyping vs production environments

## Purpose

This guidance defines safe usage boundaries for Google Gemini Code Assist across prototyping and production environments within UK government departments. It establishes differentiated controls that enable rapid experimentation during prototyping whilst ensuring appropriate security rigour for production systems.

## Who this is for

This guidance is for:

- engineering managers implementing Gemini Code Assist
- technical leads defining development workflows
- engineers using Gemini Code Assist in different environments
- security and compliance teams reviewing AI tool usage

## Before you start

Before using this guidance, ensure you have:

- read the [base guardrails](../../governance/guardrails-base.md)
- completed department-specific AI tool onboarding
- understood your team's data classification levels
- identified which environments your team uses
- reviewed the [Gemini Code Assist manager tool guide](../../manager-tool-guides/gemini-code-assist/README.md)

## Contents

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
- limited or no access to production data or Google Cloud Platform (GCP) resources
- short-lived codebases (typically days to weeks)
- isolated from production systems and networks

Examples include:

- technology spikes to evaluate frameworks or libraries
- proof of concept demonstrations
- application programming interface (API) integration experiments
- user interface and user experience (UI/UX) prototype development
- algorithm or workflow exploration
- GCP service evaluation and testing
- code transformation trials for migration planning

### Production environment

A production environment is characterised by:

- code deployed to serve live users or systems
- access to production GCP projects or resources
- long-lived codebases requiring maintenance
- integration with production systems
- subject to service level agreements (SLAs) or operational requirements

Examples include:

- public-facing services
- internal operational systems
- APIs serving production traffic
- scheduled batch processes using production data
- infrastructure as code for production GCP projects
- Cloud Functions or Cloud Run services processing production events
- BigQuery queries operating on production datasets

### Intermediate environments

Pre-production environments (such as development, test, staging, integration) should follow production-level controls unless they meet all the criteria for prototyping environments.

If an environment contains any of the following, you should apply production-level controls:
- production-like data (even if anonymised)
- connections to production GCP projects or services
- code that will be promoted to production
- infrastructure that mirrors production architecture

## Data classification and environment matrix

The table below defines which Gemini Code Assist usage is permitted based on data classification and environment type.

| Data classification | Prototyping environment | Production environment |
|---------------------|-------------------------|------------------------|
| OFFICIAL | Permitted with standard controls | Permitted with enhanced controls |
| OFFICIAL-SENSITIVE | Permitted with enhanced controls and accreditation | Permitted with strict controls and accreditation |
| SECRET | Not permitted | Not permitted |
| TOP SECRET | Not permitted | Not permitted |

### Notes on classifications

#### OFFICIAL prototyping

Standard controls apply. You should:

- use synthetic or anonymised data
- follow core guardrails

#### OFFICIAL production

Enhanced controls apply. You must:

- ensure all generated code passes security scanning
- perform a mandatory peer review before merging
- use Gemini Code Assist Enterprise for intellectual property (IP) indemnity.

#### OFFICIAL-SENSITIVE (both environments)

OFFICIAL-SENSITIVE requires Gemini Code Assist Enterprise with:

- content exclusions configured to protect sensitive repositories
- audit logging enabled via Google Cloud Logging
- Identity and Access Management (IAM) policies with least-privilege access
- data residency controls (UK or approved GCP regions)
- code customisation disabled for sensitive repositories
- no cross-project access to production from non-production tools

#### SECRET and above

Gemini Code Assist must not be used with any data classified SECRET or above in any environment.

## Prototyping environment controls

### Purpose of relaxed controls

Prototyping environments balance rapid experimentation with security. Controls are focused on preventing data exposure and GCP resource misuse rather than code quality, as prototype code is not deployed to production.

### P-01: data and GCP resource handling in prototypes

You must:

- use only synthetic, anonymised or publicly available data
- not access production GCP projects or resources
- not include real user data in code, comments or prompts
- use separate, isolated GCP projects for prototyping
- not test with service accounts that have production access

You can:

- use GCP free tier services for experimentation
- create temporary GCP resources for testing
- use GCP sandbox projects designated for prototyping
- reference public GCP documentation or examples
- experiment with large code contexts in non-sensitive repositories

### P-02: code review requirements

You must:

- have at least one other engineer review prototype findings
- document key technical decisions or discoveries
- delete or archive prototypes that are not progressed
- review agent-generated code plans before execution

You are not required to:

- conduct detailed security code reviews for every commit
- have multiple reviewers for experimental code
- scan prototype code with all production security tools if it will never reach production

### P-03: repository and GCP project security

You must:

- use private repositories for all prototype work
- not commit secrets, API keys, GCP service account keys or tokens
- enable secret scanning on prototype repositories
- clearly label repositories as 'PROTOTYPE - NOT FOR PRODUCTION'
- use separate GCP projects with guardrails for prototyping
- configure GCP Organisation policies to limit prototype project permissions

You should:

- add a README stating the prototype purpose and lifespan
- include data classification labels
- set repository archive dates
- use GCP resource labelling to identify prototype resources
- implement billing alerts for prototype GCP projects

### P-04: AI assistant usage

You can:

- use Gemini Code Assist inline suggestions, chat and agent mode features
- experiment with code transformation for migration planning
- iterate rapidly without extensive documentation
- ask broad exploratory questions about GCP services
- use large context windows with non-sensitive code
- test code customisation features with non-production repositories

You must:

- still follow data classification limits (no SECRET data)
- not share restricted intellectual property
- validate any GCP service configurations suggested by Gemini
- review generated IAM policies before applying them
- check Terraform or Deployment Manager templates for misconfigurations
- not enable code customisation for repositories containing sensitive data

### P-05: GCP service and dependency management

You should:

- check suggested GCP services are appropriate for UK government use
- prefer well-known, actively maintained libraries
- verify GCP resource costs before creating resources
- understand billing implications of AI-suggested architectures

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
- migrate to production GCP projects with appropriate controls
- review and harden all IAM policies and resource configurations
- disable code customisation if it was used with sensitive data

A prototype transitioning to production must be treated as new production code and cannot skip any production controls.

## Production environment controls

### Purpose of strict controls

Production environments serve real users and handle operational data. Controls ensure that Gemini Code Assist enhances rather than undermines code quality, security and reliability.

### PR-01: data and GCP resource handling in production

You must:

- classify all data accessed by production code
- never include personal data, credentials or classified information in prompts
- use GCP Secret Manager for sensitive configuration
- sanitise any code examples shared with Gemini Code Assist
- ensure production GCP projects have appropriate organisation policies and guardrails

You must not:

- paste production data into chat interfaces
- include real API keys, passwords or GCP service account keys in any context
- reference specific case details, investigation data or personal information
- expose security-sensitive architecture details
- enable code customisation for repositories containing production code or sensitive data

### PR-02: mandatory code review

All AI-generated code for production must undergo human review before commit.

| Review aspect | Requirement |
|---------------|-------------|
| Logic correctness | Code performs intended function correctly |
| Security | No vulnerabilities (injection, XSS, authentication bypass, etc.) |
| GCP best practices | Follows Google Cloud Architecture Framework principles |
| Error handling | Appropriate exception handling and logging |
| Dependencies | All packages verified and approved |
| Test coverage | Adequate tests exist for generated code |
| Accessibility | Web Content Accessibility Guidelines (WCAG) compliance for user-facing code |
| Standards compliance | Follows GDS Service Standard and Technology Code of Practice |
| Cost implications | GCP resource usage is appropriate and cost-effective |
| Documentation | Code is maintainable and documented |

### PR-03: security scanning requirements

All AI-generated production code must pass:

| Scan type | Timing | Action on failure |
|-----------|--------|-------------------|
| Secret detection | Pre-commit hook | Block commit |
| SAST (static analysis) | CI pipeline | Block merge |
| Dependency scanning | CI pipeline | Block merge if high or critical CVE |
| Licence compliance | CI pipeline | Block merge if incompatible |
| GCP Security Command Center findings | Post-deployment | Alert and remediate |
| Container scanning | Pre-deployment | Block deployment if high or critical CVE |
| DAST (dynamic analysis) | Post-deployment to test environment | Must pass before production deployment |

Do not disable or bypass these scans because code was AI-generated. AI-generated code must meet the same standards as human-written code.

### PR-04: restricted AI assistant features

In production codebases, you must:

- review all inline suggestions before accepting
- carefully scope agent-generated changes to intended scope only
- review and approve agent execution plans before implementation
- test agent-generated code thoroughly before committing
- maintain detailed audit logs for AI-assisted actions
- validate all GCP resource configurations before applying
- limit context window size to necessary files only

You should:

- use Gemini Code Assist primarily for routine tasks (tests, documentation, refactoring)
- rely on human judgement for architectural decisions
- prefer smaller, reviewable AI-generated changes over large rewrites
- use Gemini Chat to understand GCP best practices before implementing

### PR-05: code customisation controls

Code customisation allows Gemini Code Assist to learn from your private repositories.

For assessment before enabling, follow these steps.

1. Verify all repositories in scope contain only OFFICIAL data.
2. Ensure no secrets or credentials are committed to these repositories.
3. Confirm repositories do not contain commercially sensitive algorithms.
4. Review with security team before enabling for production codebases.
5. Document which repositories are included and why.

For ongoing management:

- regularly audit which repositories are included in code customisation
- remove repositories that no longer require customisation
- monitor for accidental inclusion of sensitive repositories
- disable immediately if sensitive data is discovered

Never enable code customisation for:

- repositories containing OFFICIAL-SENSITIVE or higher data
- repositories with embedded secrets or credentials
- third-party or customer codebases
- repositories subject to export control restrictions

### PR-06: prohibited use cases in production

You must not use Gemini Code Assist to generate any of the following.

| Prohibited area | Rationale |
|-----------------|-----------|
| Cryptographic algorithms | Requires specialist implementation and formal verification |
| Authentication or authorisation logic | Security-critical; requires security architect review |
| VPC firewall rules or network policies without review | Network misconfiguration creates vulnerabilities |
| Input validation for security-sensitive features | Subtle errors create major risks |
| Payment processing logic | Financial and Payment Card Industry Data Security Standard (PCI-DSS) compliance requirements |
| Safety-critical system logic | Life-safety implications |
| Production IAM policies without security review | Excessive permissions expose resources |
| Autonomous agent features with production GCP access | Computer-using agents must not access production accounts or resources |

For these areas, use established libraries or consult security specialists.

#### Computer-using agents and autonomous features

Gemini Code Assist agent mode can execute complex multi-step tasks. You must not:

- grant agent mode access to production GCP projects
- allow agents to create, modify or delete production resources without human approval
- use agents to make infrastructure changes in production
- enable agents to execute commands with privileged service accounts

All agent actions must:

- require explicit human approval of execution plans before proceeding
- be logged and auditable in Google Cloud Logging
- be scoped to minimal necessary permissions
- be disabled by default and explicitly enabled only when needed for non-production tasks

#### OWASP AI security guidance

Engineers working with AI-generated code should be familiar with:

- [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) top security risks for large language model applications
- [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/), security considerations for autonomous AI systems

These resources help identify vulnerabilities specific to AI-generated code and applications that integrate AI.

### PR-07: GCP-specific security controls

When using Gemini Code Assist for GCP code, you must comply with the following security controls. 

#### IAM policies

You must:

- review all AI-generated IAM policies against least-privilege principles
- never apply IAM policies to production without security team review
- use IAM Policy Analyser to validate policies before applying
- avoid wildcard permissions in production IAM roles
- ensure service accounts have appropriate constraints

#### Infrastructure as code

You must:

- validate Deployment Manager or Terraform templates with security linters
- check for publicly accessible resources (Cloud Storage, Cloud SQL, Compute Engine)
- ensure encryption at rest and in transit is configured
- verify logging and monitoring are enabled (Cloud Logging, Cloud Monitoring)
- review VPC configurations for proper network segmentation

#### Security configurations

You must:

- verify VPC firewall rules follow least-privilege network access
- check that Cloud Storage buckets have appropriate IAM policies and encryption
- ensure Cloud KMS encryption keys have correct policies
- validate Cloud Functions or Cloud Run service permissions and environment variables
- review Security Command Center findings

#### Google Cloud Architecture Framework

You must:

- validate AI-generated architecture against the framework pillars (operational excellence, security, reliability, performance optimisation, cost optimisation)
- use Security Command Center to review implementations
- ensure compliance with GCP security best practices

### PR-08: dependency verification

When Gemini Code Assist suggests dependencies for production, you must follow these steps.

1. Verify the package is from an official, trusted source.
2. Check the package has no known high or critical CVEs.
3. Confirm the package is actively maintained (updated within 12 months).
4. Verify licence compatibility with your project.
5. Assess whether the package is necessary (avoid dependency bloat).
6. Check your department has not explicitly blocklisted the package.
7. Review the package's security scorecard (if available).
8. For GCP client libraries, use official Google packages.

Warning signs requiring escalation include:

- packages with fewer than 1,000 downloads per month
- packages last updated more than 12 months ago
- packages with open critical security issues
- packages from unfamiliar or unofficial registries
- packages with unclear or conflicting licences
- unofficial GCP client library implementations

### PR-09: context window management

Gemini Code Assist's large context window (up to 2 million tokens) requires careful management in production.

You must:

- limit context to only necessary files for the task
- exclude sensitive configuration files from context
- avoid including entire codebases in context unnecessarily
- review what files are being sent as context before accepting suggestions
- be aware that larger context windows increase risk of inadvertent data exposure

You should:

- use targeted file selection rather than workspace-wide context
- configure content exclusions to prevent sensitive files being included
- regularly audit which files are being used for context

### PR-10: test requirements

AI-generated code must include or be covered by:

- unit tests with meaningful assertions (not just to pass coverage)
- integration tests for GCP service interactions
- contract tests for APIs
- accessibility tests for user-facing components (WCAG 2.2 AA minimum)
- security tests for authentication or input handling
- GCP-specific tests (IAM policy testing, Deployment Manager validation)
- cost impact analysis for resource-intensive operations
- load testing for Cloud Functions or Cloud Run services

Do not accept AI-generated tests without reviewing them for quality and coverage. AI may generate tests that pass but do not adequately verify behaviour.

### PR-11: documentation standards

AI-generated production code must include:

- inline comments explaining complex logic or non-obvious decisions
- API documentation (OpenAPI/Swagger for REST APIs)
- README updates if new features, dependencies or GCP services are added
- architectural decision records (ADRs) for significant choices
- runbooks for operational processes
- GCP resource documentation (architecture diagrams, service dependencies)
- cost estimation and optimisation notes for GCP resources

AI can help draft documentation, but it must be reviewed for accuracy and completeness.

### PR-12: cost management

When using Gemini Code Assist to generate GCP resource code, you must:

- estimate costs for AI-suggested GCP resources before deployment
- implement billing alerts and budgets for resources created from AI-generated code
- review GCP Billing reports for unexpected spend from AI-suggested architectures
- consider cost-effective alternatives (for example, Cloud Functions vs Compute Engine)
- use GCP Budgets and alerts to prevent cost surprises
- document expected costs in pull requests for infrastructure changes
- understand Gemini Code Assist usage costs based on context size and interactions

### PR-13: incident response

If AI-generated code causes a production incident, follow these steps.

1. Follow your department's standard incident response process.
2. Document that code was AI-generated in incident report.
3. Review whether guardrails were followed correctly.
4. Identify whether the incident reveals a gap in controls.
5. Check Google Cloud Logging for AI-assisted actions.
6. Review whether code customisation contributed to the issue.
7. Share learnings with the AI Engineering Lab team.

Do not hide that code was AI-generated. Transparency helps the community learn and improve.

### PR-14: audit and compliance

For audit purposes, you should:

- maintain records of which code was AI-generated (commit messages, PR labels)
- enable Google Cloud Logging for all Gemini Code Assist usage
- retain evidence of security scanning results
- document major AI-assisted architectural decisions
- maintain Security Command Center compliance records
- log IAM policy changes with justifications
- document which repositories have code customisation enabled and why

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

Transparency builds public trust in digital government services. Citizens have a right to know when AI influences decisions affecting them. AI should augment human decision-making, not replace accountability.

Consult your department's data protection officer before deploying AI-assisted features that process personal data.

## Transition from prototype to production

### When to apply production controls

Apply production controls when:

- prototype code is considered for production deployment
- prototype receives production GCP project access
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
| GCP architecture review | Technical architect or lead engineer approval | [ ] |
| IAM policies hardened | Production IAM policies follow least-privilege | [ ] |
| GCP Architecture Framework review | Architecture reviewed against GCP best practices | [ ] |
| Cost analysis | GCP costs estimated and approved | [ ] |
| Code customisation audit | Verified no sensitive data in customisation scope | [ ] |
| Context window review | Verified appropriate file scope for production use | [ ] |
| Peer review | Detailed code review by at least 2 engineers | [ ] |
| Operational readiness | Monitoring, logging, alerting configured | [ ] |

### Recommended transition approach

Instead of promoting prototype code:

- rewrite with production intent, using the prototype as a reference implementation but write production code with full controls
- do incremental migration, moving small, well-tested components over time
- take a hybrid approach, keeping the prototype running alongside production during validation phase

Do not simply rename 'prototype' repositories or GCP projects to 'production' without applying appropriate controls.

### Pre-use due diligence checklist

Before using Gemini Code Assist in any environment, complete this due diligence assessment.

| Question | Consideration |
|----------|---------------|
| Does this comply with department policy? | Check your department's AI tool approval process and approved tool list |
| What data classification will be used? | Ensure Gemini Code Assist is approved for that classification level |
| Are there data sovereignty restrictions? | Verify GCP data residency requirements (UK or approved regions) |
| Is the intended use lawful? | Ensure compliance with relevant legislation (GDPR, Computer Misuse Act, etc.) |
| Are there ethical concerns? | Consider if use requires ethics review (see ethics section below) |
| Does customer policy allow AI use? | If working on customer projects, verify their AI policy permits Gemini Code Assist |
| What security controls are needed? | Identify which controls from this guidance apply |
| Who has approved this use? | Ensure appropriate management sign-off is obtained |
| What GCP projects will be accessed? | Verify appropriate project boundaries and IAM controls |
| Should code customisation be enabled? | Assess necessity and security implications |
| What is the cost impact? | Understand licensing costs, GCP resource costs, and context window usage costs |

Document your answers and retain them for audit purposes. Escalate concerns to your technical lead or security team.

## Common scenarios and guidance

### Scenario 1: spike for GCP service integration

Engineer needs to explore integrating with Cloud Functions and Firestore.

Environment: prototyping

#### Appropriate controls

You can:

- use GCP sandbox project for testing
- use Gemini Code Assist to generate Cloud Functions code rapidly
- test with Firestore collections in sandbox project
- document findings in a spike report
- experiment with agent mode for multi-file implementations

You must not:

- use production GCP projects or service accounts
- access production Firestore databases
- commit GCP service account keys to repository
- create resources without billing controls
- enable code customisation for production repositories during exploration

If integrating, rewrite with production IAM roles, add error handling, Cloud Logging integration and cost monitoring.

### Scenario 2: building GOV.UK frontend prototype

Team building prototype for user research using GOV.UK Design System.

Environment: prototyping (if no real user data collected)

#### Appropriate controls

You can:

- use Gemini Code Assist to generate components quickly
- use fake data for examples
- focus on speed over code quality
- use large context window for design system consistency

You should:

- ensure accessibility basics (for representative testing)

You must not:

- collect real user data without production controls
- use production analytics or tracking
- deploy to production GCP infrastructure
- enable code customisation with user-facing repositories

Rebuild with production code standards, full WCAG 2.2 AA compliance, production security headers, analytics and operational monitoring.

### Scenario 3: refactoring production Cloud Function

Engineer refactoring production Cloud Function for improved performance using Gemini agent mode.

Environment: production

#### Required controls

You must:

- apply all production code review requirements
- review agent execution plan before approving
- maintain or improve test coverage
- ensure backward compatibility or planned migration
- run full security scanning
- document changes in ADRs
- test performance improvements in non-production environment first
- review IAM permissions for least-privilege
- monitor costs before and after refactoring
- limit context window to necessary files only

You must not:

- accept large AI-generated refactors without thorough review
- skip tests because 'code behaviour is unchanged'
- deploy directly to production without testing
- allow agent to execute without reviewing plan

### Scenario 4: code transformation for Python upgrade

Team using Gemini Code Assist to upgrade Python 2.7 code to Python 3.12.

Environment: production (upgrading existing production code)

#### Required controls

You must:

- use code transformation in non-production environment first
- review all transformed code thoroughly
- test extensively before deploying to production
- maintain rollback plan
- update all dependencies to secure versions
- verify application behaviour unchanged (or document intended changes)
- perform performance testing after transformation
- review agent execution plan before starting transformation

You should:

- pilot transformation on smaller, less critical applications first
- document transformation decisions and any manual changes required
- involve your technical architect in the upgrade plan
- break large transformations into smaller, reviewable chunks

You must ensure:

- code transformation operates at scale, increasing review burden
- automated transformation may not catch all compatibility issues
- legacy code patterns may require manual intervention
- large context windows useful but require careful scoping

### Scenario 5: creating GCP infrastructure with Terraform

Engineer using Gemini Code Assist to write Terraform for new GCP service.

Environment: production (infrastructure is always production)

#### Required controls

You must:

- apply all production code review requirements
- validate with terraform validate and tflint
- check for security misconfigurations (public resources, open firewall rules)
- review IAM roles and service accounts created by the Terraform
- ensure encryption is enabled where appropriate
- verify logging and monitoring are configured
- test Terraform in non-production project first
- review Security Command Center findings after deployment

You should:

- use department-approved Terraform modules where available
- follow Google Cloud Architecture Framework principles
- implement cost controls and resource labelling
- use Gemini Chat to understand GCP best practices before implementing

You must not:

- accept infrastructure code without security review
- deploy Terraform directly to production without testing
- enable code customisation for infrastructure repositories without assessment

Infrastructure misconfigurations can expose entire systems and generate unexpected costs.

## Ethics review framework

### When ethics review is required

Seek ethics review from your department's governance board or senior leadership before using Gemini Code Assist in these scenarios.

When AI is replacing or augmenting human decision-making, seek a review for: 

- code that automates decisions affecting citizens (benefits, licensing, enforcement)
- systems that triage, prioritise or route cases or applications
- algorithms that score, rank or classify individuals or organisations

For ethically sensitive domains, seek a review for:

- healthcare and medical systems
- law enforcement and criminal justice
- immigration and border control
- child protection and safeguarding
- national security and intelligence
- military and defence systems

For politically or socially sensitive applications, seek a review for:

- systems subject to public debate or controversy
- use cases at odds with government values (fairness, transparency, accountability)
- applications that may face legal challenge or judicial review

For code customisation in sensitive contexts, seek a review for:

- enabling code customisation for repositories containing citizen-facing decision logic
- using code customisation with repositories that handle vulnerable populations data

### Ethics assessment questions

When submitting for ethics review, address these questions.

| Question | Why it matters |
|----------|----------------|
| What decisions will the AI-assisted system make? | Understand scope and impact |
| Who will be affected by those decisions? | Identify stakeholders and vulnerable groups |
| Could the system create unfair outcomes? | Assess bias and discrimination risks |
| Is human oversight maintained? | Ensure accountability |
| Can decisions be explained and challenged? | Support transparency and due process |
| What happens if the system fails? | Understand safety implications |
| Are there less intrusive alternatives? | Principle of necessity |
| How is code customisation being used? | Assess learning from sensitive codebases |

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
6. Perform a risk assessment, documenting and accepting residual risks, including data residency constraints.
7. Senior responsible officer approves or rejects.
8. Tool added to approved list with conditions.

### Exception and waiver process

If Gemini Code Assist is not on the approved list, you should consider the following things.

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
- geopolitical concerns (for example, jurisdiction, ownership)
- previous security incidents

Do not use tools on the denied list under any circumstances. Contact your security team if you need alternatives.

### Annual governance review

Departments should review AI tool governance annually, to:

- review approved tool list for continued compliance
- assess changes to terms and conditions of approved tools
- review training and awareness effectiveness
- analyse incidents and near-misses
- update policies based on lessons learned
- produce annual report on AI usage and compliance

This ensures governance keeps pace with evolving AI technology and risks.

## Policy configuration recommendations

### Gemini Code Assist settings

For UK government departments, configure Gemini Code Assist as follows.

| Setting | Prototyping | Production | Rationale |
|---------|-------------|------------|-----------|
| Edition | Enterprise recommended | Enterprise required | IP indemnity and security features needed |
| Content exclusions | Minimal | Comprehensive | Protects production code and secrets |
| Google Cloud Logging | Enabled | Enabled | Audit trail for compliance |
| IAM policies | Restricted to sandbox projects | Least-privilege access only | Prevents unintended resource access |
| Code customisation | Disabled or limited | Disabled unless specifically approved | Prevents learning from sensitive code |
| Context window limits | Moderate | Strictly limited | Controls data exposure and costs |
| Data residency | UK or EU regions | UK or EU regions | Meets government data requirements |

### Content exclusion patterns for production

Configure Gemini Code Assist content exclusions to protect these repository patterns.

```
**/secrets/**
**/keys/**
**/.env
**/.env.*
**/config/production.*
**/config/secrets.*
**/terraform.tfstate
**/terraform.tfvars
**/ansible/vault/**
**/.gcp/credentials
**/service-account-keys/**
**/kubeconfig
```

### IAM policy recommendations

Create dedicated IAM policies for Gemini Code Assist usage.

Prototyping environment:
```
# Limit to specific GCP projects and UK region
- Resource: projects/prototype-project-*
- Condition: request.region_code == "europe-west2"
- Deny access to production projects
```

Production environment:
```
# Further restrict permissions based on roles
- Require MFA for code customisation access
- Prevent cross-project resource access
- Log all API calls via Cloud Logging
- Implement VPC Service Controls where appropriate
```

### GCP organisation policies

Use GCP organisation policies to enforce guardrails to:

- create separate folders for prototyping and production projects
- apply policies to prevent cross-environment access
- enforce resource labelling requirements
- implement cost controls and budgets by folder
- centrally manage Cloud Logging and Security Command Center

## Measuring safe usage compliance

### Compliance indicators

Assess whether your team is following safe usage guidance by checking the following.

| Indicator | Target | How to measure |
|-----------|--------|----------------|
| Prototype repositories labelled | 100% | GitHub or GitLab repository topics or labels |
| Production code reviews completed | 100% | Pull request approvals |
| Security scans passing | 100% | CI or CD pipeline status |
| Incidents linked to AI-generated code | Trend downward | Incident reports |
| Engineers trained on safe usage | 100% | Training records |
| Google Cloud Logging enabled | 100% | GCP audit check |
| IAM policies follow least-privilege | 90% or more | IAM Policy Analyzer findings |
| Code customisation appropriately scoped | 100% | Manual audit of customisation settings |

### Red flags requiring action

Escalate immediately if you identify:

- AI-generated code committed without review
- secrets, credentials or GCP service account keys in code generated with Gemini assistance
- production incidents caused by AI-generated security vulnerabilities
- engineers bypassing security scans for AI-generated code
- prototype code deployed to production without transition process
- OFFICIAL-SENSITIVE or higher data shared with Gemini Code Assist
- code customisation enabled for sensitive repositories
- production IAM policies applied without security review
- excessive GCP costs from AI-suggested architectures
- large context windows used without justification

## Roles and responsibilities

| Role | Prototyping responsibilities | Production responsibilities |
|------|------------------------------|----------------------------|
| Engineer | Follow prototyping controls, document findings, delete unused prototypes and GCP resources | Follow all production controls, complete security scanning, thorough code review, manage context windows appropriately |
| Technical lead | Review prototype direction, approve transition to production, monitor GCP costs | Approve production code, ensure compliance, participate in security reviews, review IAM policies; approve code customisation scope |
| Engineering manager | Ensure team trained on safe usage, allocate time for compliance, monitor GCP spending | Enforce production controls, track compliance metrics, escalate issues, approve GCP architecture changes, oversee code customisation governance |
| Security team | Review transition plans, advise on risk, review IAM policies, assess code customisation proposals | Review production security scanning, investigate incidents, audit compliance, validate GCP architecture, audit code customisation scope |
| Service owner | Decide whether prototypes progress to production | Accountable for service security, compliance and GCP costs |

## Further reading

### Internal documentation

[Base guardrails](../../governance/guardrails-base.md) covers foundational security controls.

[AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) describes integrating AI tools across development lifecycle.

[Incident response playbook](../../governance/incident-response-playbook.md) provides guidance on responding to AI tool incidents.

[Gemini Code Assist manager guide](../../manager-tool-guides/gemini-code-assist/README.md) covers broader implementation guidance.

[Developer Knowledge API and MCP server guidance](../../manager-tool-guides/gemini-code-assist/developer-knowledge-api-and-mcp-server-guidance.md) covers extending Gemini capabilities.

### Government guidance

[Government Service Manual](https://www.gov.uk/service-manual)

[Government Service Standard](https://www.gov.uk/service-manual/service-standard)

[Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

[Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications)

[NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles)

### Google Cloud resources

[Gemini Code Assist documentation](https://cloud.google.com/gemini/docs/codeassist)

[Gemini Code Assist security](https://cloud.google.com/gemini/docs/codeassist/security-and-privacy)

[Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)

[GCP Security Best Practices](https://cloud.google.com/security/best-practices)

[Security Command Center](https://cloud.google.com/security-command-center)

### AI security resources

[OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) lists top security risks for large language model applications.

[OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) describes security considerations for autonomous AI systems.

[NCSC AI and Machine Learning Security](https://www.ncsc.gov.uk/collection/machine-learning) provides UK guidance on securing AI systems.

### GCP governance resources

[GCP Organisation policy documentation](https://cloud.google.com/resource-manager/docs/organization-policy)

[VPC Service Controls](https://cloud.google.com/vpc-service-controls)

[Cloud Logging](https://cloud.google.com/logging)

[Cloud Monitoring](https://cloud.google.com/monitoring)

[IAM Policy Analyzer](https://cloud.google.com/iam/docs/policy-intelligence)
