> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Safe usage guidance: prototyping vs production environments

## Purpose

This guidance defines safe usage boundaries for GitHub Copilot across prototyping and production environments within UK government departments. It establishes differentiated controls that enable rapid experimentation during prototyping while ensuring appropriate security rigour for production systems.

## Who this is for

This guidance is intended for:

- engineering managers implementing GitHub Copilot
- technical leads defining development workflows
- engineers using GitHub Copilot in different environments
- security and compliance teams reviewing AI tool usage

## Before you start

Before using this guidance, readers should ensure they have:

- read the [base guardrails](../../governance/guardrails-base.md)
- completed department-specific AI tool onboarding
- understood their team's data classification levels
- identified which environments their team uses

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
- limited or no access to production data
- short-lived codebases (typically days to weeks)
- isolated from production systems and networks

Examples include:

- technology spikes to evaluate frameworks or libraries
- proof of concept demonstrations
- application programming interface (API) integration experiments
- user interface and user experience (UI/UX) prototype development
- algorithm or workflow exploration

### Production environment

A production environment is characterised by:

- code deployed to serve live users or systems
- access to real user data or operational data
- long-lived codebases requiring maintenance
- integration with production systems
- subject to service level agreements (SLAs) or operational requirements

Examples include:

- public-facing services
- internal operational systems
- APIs serving production traffic
- scheduled batch processes using production data
- infrastructure as code for production environments

### Intermediate environments

Pre-production environments such as development, test, staging, integration should follow production-level controls unless they meet all the criteria for prototyping environments.

If an environment contains:

- production-like data (even if anonymised)
- connections to production systems
- code that will be promoted to production

Then apply production-level controls.

## Data classification and environment matrix

The table below defines which GitHub Copilot usage is permitted based on data classification and environment type.

| Data classification | Prototyping environment | Production environment |
|---------------------|-------------------------|------------------------|
| OFFICIAL | Permitted with standard controls | Permitted with enhanced controls |
| OFFICIAL-SENSITIVE | Permitted with enhanced controls and accreditation | Permitted with strict controls and accreditation |
| SECRET | Not permitted | Not permitted |
| TOP SECRET | Not permitted | Not permitted |

### Notes on classifications

#### OFFICIAL prototyping

Standard controls apply, meaning teams should:

- use synthetic or anonymised data
- follow core guardrails

#### OFFICIAL production

Enhanced controls apply, meaning teams must:

- ensure all generated code passes security scanning
- perform a mandatory peer review before merging

#### OFFICIAL-SENSITIVE (both environments)

Enterprise GitHub Copilot is required and must be configured to ensure:

- data residency is restricted to UK or approved regions
- audit logging is enabled
- code suggestions are filtered by organisation policy
- no organisational code is used for model training (opt-out enforced)

#### SECRET and above

GitHub Copilot must not be used with any data classified SECRET or above in any environment.

## Prototyping environment controls

### Purpose of relaxed controls

Prototyping environments balance rapid experimentation with security. Controls are focused on preventing data exposure rather than code quality, as prototype code is not deployed to production.

### P-01: data handling in prototypes

You must:

- use only synthetic, anonymised or publicly available data
- not access production databases or APIs
- not include real user data in code, comments or prompts
- not test with credentials that have production access

You can:

- use faker libraries to generate realistic test data
- create minimal mock datasets for proof of concepts
- reference public documentation or open-source examples

### P-02: code review requirements

You must:

- have at least one other engineer review prototype findings
- document key technical decisions or discoveries
- delete or archive prototypes that are not progressed

You are not required to:

- conduct detailed security code reviews for every commit
- have multiple reviewers for experimental code
- scan prototype code with SAST tools if it will never reach production

### P-03: repository security

You must:

- use private repositories for all prototype work
- not commit secrets, API keys or credentials, even for development
- enable secret scanning on prototype repositories
- clearly label repositories as 'PROTOTYPE - NOT FOR PRODUCTION'

You should:

- add a README stating the prototype purpose and lifespan
- include data classification labels
- set repository archive dates

### P-04: AI assistant usage

You can:

- use all GitHub Copilot features such as inline suggestions, chat, edits
- experiment with agentic or autonomous modes, where available
- iterate rapidly without extensive documentation
- ask broad exploratory questions

You must:

- still follow data classification limits, with no SECRET data
- not share restricted intellectual property
- validate any dependencies suggested by Copilot
- review generated code for obvious security anti-patterns

### P-05: dependency management

You should:

- check suggested packages exist in official repositories
- use well-known, actively maintained libraries
- note any security warnings flagged by GitHub

You are not required to:

- conduct full security audits of all suggested dependencies
- use only pre-approved dependency lists
- scan every prototype dependency with DAST tools

### P-06: transition planning

Before moving prototype code to production, you must:

- conduct full security review using production controls
- replace all mock data sources with production-ready implementations
- ensure all dependencies pass security scanning
- complete threat modelling if not already done
- apply all production-level code standards

A prototype transitioning to production must be treated as new production code and cannot skip any production controls.

## Production environment controls

### Purpose of strict controls

Production environments serve real users and handle operational data. Controls ensure that GitHub Copilot enhances—rather than undermines—code quality, security and reliability.

### PR-01: data handling in production

You must:

- classify all data accessed by production code
- never include personal data, credentials or classified information in prompts
- use parameterised queries and environment variables for configuration
- sanitise any code examples shared with GitHub Copilot

You must not:

- paste production data into chat interfaces
- include real API keys, passwords or tokens in any context
- reference specific case details, investigation data or personal information
- expose security-sensitive system architecture details

### PR-02: mandatory code review

All AI-generated code for production must undergo human review before commit. The review must verify the following aspects.

Important: Copilot code review does not satisfy mandatory human code review requirements. Copilot reviews are marked as 'Comment' reviews, not 'Approve' reviews. They do not count toward required approvals and will not block merging. See [Pull request capabilities](pull-request-capabilities.md#copilot-review-and-mandatory-code-review-requirements) for full details on Copilot PR review limitations.

| Review aspect | Requirement |
|---------------|-------------|
| Logic correctness | Code performs intended function correctly |
| Security | No vulnerabilities (injection, XSS, auth bypass) |
| Error handling | Appropriate exception handling and logging |
| Dependencies | All packages verified and approved |
| Test coverage | Adequate tests exist for generated code |
| Accessibility | WCAG compliance for user-facing code |
| Standards compliance | Follows GDS Service Standard and Technology Code of Practice |
| Documentation | Code is maintainable and documented |

You can use Copilot code review as an additional automated scan before human review. However, it does not replace any mandatory human review step. See [Pull request capabilities](pull-request-capabilities.md) for guidance on when to use Copilot PR review and how to interpret its suggestions.

### PR-03: security scanning requirements

All AI-generated production code must pass the following requirements.

| Scan type | Timing | Action on failure |
|-----------|--------|-------------------|
| Secret detection | Pre-commit hook | Block commit |
| SAST (static analysis) | CI pipeline | Block merge |
| Dependency scanning | CI pipeline | Block merge if high/critical CVE |
| Licence compliance | CI pipeline | Block merge if incompatible |
| Container scanning | Pre-deployment | Block deployment if high/critical CVE |
| DAST (dynamic analysis) | Post-deployment to test environment | Must pass before production deployment |

Do not disable or bypass these scans because code was AI-generated. AI-generated code must meet the same standards as human-written code.

### PR-04: restricted AI assistant features

In production codebases, you must:

- review all inline suggestions before accepting
- carefully scope multi-file edits to intended changes only
- test agent-generated code thoroughly before committing
- maintain detailed audit logs for agentic actions

You should:

- use GitHub Copilot primarily for routine tasks (tests, documentation, refactoring)
- rely on human judgement for architectural decisions
- prefer smaller, reviewable AI-generated changes over large rewrites

### PR-05: prohibited use cases in production

You must not use GitHub Copilot to generate any of the following.

| Prohibited area | Rationale |
|-----------------|-----------|
| Cryptographic algorithms | Requires specialist implementation and formal verification |
| Authentication/authorisation logic | Security-critical; requires security architect review |
| Security headers or CORS configuration | Misconfiguration creates vulnerabilities |
| Input validation for security-sensitive features | Subtle errors create major risks |
| Payment processing logic | Financial and Payment Card Industry Data Security Standard (PCI-DSS) compliance requirements |
| Safety-critical system logic | Life-safety implications |
| Autonomous agent features with system control | Computer-using agents must not access production accounts or systems |

For these areas, use established libraries or consult security specialists.

#### Computer-using agents and autonomous features

GitHub Copilot and other AI tools increasingly offer autonomous or agentic features that can execute actions on your behalf. You must not:

- grant AI agents access to production accounts or credentials
- allow autonomous features to make commits, deployments or configuration changes without human approval
- use computer-using agents that interact with graphical user interfaces for production systems
- enable AI features that can execute terminal commands on production infrastructure

All agentic actions must:

- require explicit human approval before execution
- be logged and auditable
- be scoped to minimal necessary permissions
- be disabled by default and explicitly enabled only when needed

#### OWASP AI security guidance

Engineers working with AI-generated code should consult:

- the [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) covering top security risks for large language model applications
- the [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) covering security considerations for autonomous AI systems

These resources help identify vulnerabilities specific to AI-generated code and applications that integrate AI.

### PR-06: dependency verification

When GitHub Copilot suggests dependencies for production, you must follow these steps.

1. Verify the package is from an official, trusted source.
2. Check the package has no known high or critical CVEs.
3. Confirm the package is actively maintained (updated within 12 months).
4. Verify licence compatibility with your project.
5. Assess whether the package is necessary (avoid dependency bloat).
6. Check your department has not explicitly blocklisted the package.
7. Review the package's security scorecard (if available).

Warning signs requiring escalation include:

- packages with fewer than 1,000 downloads per month
- packages last updated more than 12 months ago
- packages with open critical security issues
- packages from unfamiliar or unofficial registries
- packages with unclear or conflicting licences

### PR-07: test requirements

AI-generated code must include or be covered by:

- unit tests with meaningful assertions (not just to pass coverage)
- integration tests for external system interactions
- contract tests for APIs
- accessibility tests for user-facing components (WCAG 2.2 AA minimum)
- security tests for authentication or input handling

Do not accept AI-generated tests without reviewing them for quality and coverage. AI may generate tests that pass but do not adequately verify behaviour.

### PR-08: documentation standards

AI-generated production code must include:

- inline comments explaining complex logic or non-obvious decisions
- API documentation such as OpenAPI/Swagger for REST APIs
- README updates if new features or dependencies are added
- architectural decision records (ADRs) for significant choices
- runbooks for operational processes

AI can help draft documentation, but it must be reviewed for accuracy and completeness.

### PR-09: incident response

If AI-generated code causes a production incident, follow these steps.

1. Follow your department's standard incident response process.
2. Document that code was AI-generated in incident report.
3. Review whether guardrails were followed correctly.
4. Identify whether the incident reveals a gap in controls.
5. Share learnings with the AI Engineering Lab team.

Do not hide that code was AI-generated. Transparency helps the community learn and improve.

### PR-10: audit and compliance

For audit purposes, you should:

- maintain records of which code was AI-generated (commit messages, PR labels)
- enable GitHub Copilot audit logging (enterprise feature)
- retain evidence of security scanning results
- document major AI-assisted architectural decisions

This ensures traceability and supports compliance requirements.

### PR-11: citizen transparency and disclosure

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

The general principles to observe are that:

- transparency builds public trust in digital government services
- citizens have a right to know when AI influences decisions affecting them
- AI should augment human decision-making and not replace accountability

Consult your department's data protection officer before deploying AI-assisted features that process personal data.

## Transition from prototype to production

### When to apply production controls

Apply production controls when:

- prototype code is considered for production deployment
- prototype receives production data access
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
| Data handling | All mock/synthetic data replaced with production-ready code | [ ] |
| Architecture review | Technical architect or lead engineer approval | [ ] |
| Peer review | Detailed code review by at least 2 engineers | [ ] |
| Operational readiness | Monitoring, logging, alerting configured | [ ] |

### Recommended transition approach

Rather than directly promoting prototype code, you should:

1. Rewrite with production intent, using the prototype as a reference implementation but write production code with full controls.
2. Do incremental migration, moving small, well-tested components over time.
3. Take a hybrid approach, keeping the prototype running alongside production during validation phase.

Do not simply rename 'prototype' repositories to 'production' without applying appropriate controls.

### Pre-use due diligence checklist

Before using GitHub Copilot in any environment, complete this due diligence assessment.

| Question | Consideration |
|----------|---------------|
| Does this comply with department policy? | Check your department's AI tool approval process and approved tool list |
| What data classification will be used? | Ensure GitHub Copilot is approved for that classification level |
| Are there data sovereignty restrictions? | Verify data residency requirements (UK-only, EU, etc.) |
| Is the intended use lawful? | Ensure compliance with relevant legislation (GDPR, Computer Misuse Act, etc.) |
| Are there ethical concerns? | Consider if use requires ethics review (see ethics section below) |
| Does customer policy allow AI use? | If working on customer projects, verify their AI policy permits GitHub Copilot |
| What security controls are needed? | Identify which controls from this guidance apply |
| Who has approved this use? | Ensure appropriate management sign-off is obtained |

Document your answers and retain them for audit purposes. Escalate concerns to your technical lead or security team.

## Common scenarios and guidance

### Scenario 1: spike for API integration

Context: engineer needs to explore integrating with a third-party API.

Environment: prototyping

#### Appropriate controls

You can:

- use test API keys provided by the vendor
- use GitHub Copilot to generate integration code rapidly
- test with mock responses or sandbox environment
- document findings in a spike report

You must not:

- use production API keys
- commit API keys to repository (even test keys)

Transition: if integrating, rewrite integration with production keys from secrets manager, add error handling, monitoring and alerting.

### Scenario 2: building GOV.UK frontend prototype

Context: team building prototype for user research using GOV.UK Design System.

Environment: prototyping (if no real user data collected)

#### Appropriate controls

You can:

- use GitHub Copilot to generate components quickly
- use fake data for examples
- focus on speed over code quality

You should ensure accessibility basics (for representative testing).

You must not:

- collect real user data without production controls
- use production analytics or tracking

Transition: rebuild with production code standards, full WCAG 2.2 AA compliance, production security headers, analytics and operational monitoring.

### Scenario 3: refactoring production code

Context: engineer refactoring production codebase for improved maintainability.

Environment: production

#### Required controls

You must:

- apply all production code review requirements
- maintain or improve test coverage
- ensure backward compatibility or planned migration
- run full security scanning
- document architectural changes in ADRs

You must not:

- accept large AI-generated refactors without thorough review
- skip tests because 'code behaviour is unchanged'

### Scenario 4: creating test data generators

Context: engineer building data generators for testing.

Environment: depends on data classification

Engineers in this scenario should:

- refer to prototyping controls if generators create synthetic data for prototypes
- refer to production controls if generators create test data for pre-production environments
- ensure generated data does not inadvertently resemble real users
- not use AI to synthesise data based on production datasets
- use established libraries such as Faker or Bogus over custom AI-generated approaches

### Scenario 5: infrastructure as code (IaC)

Context: engineer using GitHub Copilot to write Terraform or CloudFormation.

Environment: production (infrastructure is always production)

#### Required controls

You must:

- apply all production code review requirements
- validate all permissions and security group rules
- ensure least privilege access configured
- review for security misconfigurations (public S3 buckets, open security groups)
- use department-approved base modules where available
- pay particular attention to Identity and Access Management (IAM) policies and network configurations

You must not accept infrastructure code without security review.

Rationale: infrastructure misconfigurations can expose entire systems.

## Ethics review framework

### When ethics review is required

Seek ethics review from your department's governance board or senior leadership before using GitHub Copilot in these scenarios:

When AI is replacing or augmenting human decision-making, seek a review for:

- code that automates decisions affecting citizens (benefits, licensing, enforcement)
- systems that triage, prioritise or route cases or applications
- algorithms that score, rank or classify individuals or organisations

For ethically sensitive domains, seek review for:

- healthcare and medical systems
- law enforcement and criminal justice
- immigration and border control
- child protection and safeguarding
- national security and intelligence
- military and defence systems

For politically or socially sensitive applications, seek review for:

- systems subject to public debate or controversy
- use cases at odds with government values (fairness, transparency, accountability)
- applications that may face legal challenge or judicial review

### Ethics assessment questions

When submitting for ethics review, address the following questions.

| Question | Why it matters |
|----------|----------------|
| What decisions will the AI-assisted system make? | Understand scope and impact |
| Who will be affected by those decisions? | Identify stakeholders and vulnerable groups |
| Could the system create unfair outcomes? | Assess bias and discrimination risks |
| Is human oversight maintained? | Ensure accountability |
| Can decisions be explained and challenged? | Support transparency and due process |
| What happens if the system fails? | Understand safety implications |
| Are there less intrusive alternatives? | Principle of necessity |

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

Your department should maintain an approved AI tool list ('allow list') specifying:

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
If GitHub Copilot is not on the approved list, you should consider the following.

When engaged in prototyping or research, teams should note that:

- unapproved tools may be used for non-production activities such as training, proof of concept work, or research
- no department or citizen data must be used
- the tool use and purpose must be documented
- results must not be deployed to production

When seeking an exception for production use, teams must:

- submit an exception request to the AI governance board or equivalent body
- provide a business justification and a risk mitigation plan
- obtain senior management approval
- note that approval will be time-bound (for example, three months, pending completion of the full approval process)
- re-assess if tool terms or usage change

### Denied tool list

Some tools may be explicitly denied by your department due to:

- unacceptable security or privacy risks
- incompatible terms of service
- geopolitical concerns (for example, jurisdiction, ownership)
- previous security incidents

Do not use tools on the denied list under any circumstances. Contact your security team if you need alternatives.

### Annual governance review

Departments should review AI tool governance annually by:

- reviewing the approved tool list for continued compliance
- assessing changes to terms and conditions of approved tools
- reviewing training and awareness effectiveness
- analysing incidents and near-misses
- updating policies based on lessons learned
- producing annual reports on AI usage and compliance

This ensures governance keeps pace with evolving AI technology and risks.

## Policy configuration recommendations

### GitHub Copilot enterprise policy settings

For UK government departments, configure GitHub Copilot enterprise policies as follows.

| Setting | Prototyping | Production | Rationale |
|---------|-------------|------------|-----------|
| Suggestions matching public code | Allowed | Blocked | Prevents licence issues in production |
| Data opt-out | Enabled | Enabled | Prevents training on your code |
| Content exclusions | Minimal | Comprehensive | Protects production repositories |
| Audit log retention | 90 days | 12+ months | Compliance and incident investigation |
| Allowed IDE extensions | Default | Approved list only | Reduces supply chain risk |

### Content exclusion patterns for production

Enterprise or organisation administrators can configure GitHub Copilot content exclusions to prevent sensitive repository patterns from being used in suggestions. See [configuring content exclusions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot). This requires a Copilot Business or Copilot Enterprise plan.

Content exclusions have significant limitations. They are not enforced in agent mode, edit mode, Copilot CLI, or the Copilot cloud agent. For a full explanation of all mechanisms, what they guarantee, and recommended patterns, see the [content exclusions guide](content-exclusions.md).

Recommended patterns to exclude in production environments:

```
**/secrets/**
**/keys/**
**/.env
**/.env.*
**/config/production.*
**/config/secrets.*
**/terraform.tfstate
**/ansible/vault/**
```

This reduces the risk of accidentally exposing sensitive configurations.

## Measuring safe usage compliance

### Compliance indicators

You can assess whether your team is following safe usage guidance by checking the following indicators.

| Indicator | Target | How to measure |
|-----------|--------|----------------|
| Prototype repositories labelled | 100% | GitHub repository topics/labels |
| Production code reviews completed | 100% | Pull request approvals |
| Security scans passing | 100% | CI/CD pipeline status |
| Incidents linked to AI-generated code | Trend downward | Incident reports |
| Engineers trained on safe usage | 100% | Training records |
| GitHub Copilot audit log reviews | Monthly | Audit process evidence |

### Red flags requiring action

Escalate immediately if you identify:

- AI-generated code committed without review
- secrets or credentials in code generated with GitHub Copilot assistance
- production incidents caused by AI-generated security vulnerabilities
- engineers bypassing security scans for AI-generated code
- prototype code deployed to production without transition process
- OFFICIAL-SENSITIVE or higher data shared with GitHub Copilot

## Roles and responsibilities

| Role | Prototyping responsibilities | Production responsibilities |
|------|------------------------------|----------------------------|
| Engineer | Follow prototyping controls, document findings, delete unused prototypes | Follow all production controls, complete security scanning, thorough code review |
| Technical lead | Review prototype direction, approve transition to production | Approve production code, ensure compliance, participate in security reviews |
| Engineering manager | Ensure team trained on safe usage, allocate time for compliance | Enforce production controls, track compliance metrics, escalate issues |
| Security team | Review transition plans, advise on risk | Review production security scanning, investigate incidents, audit compliance |
| Service owner | Decide whether prototypes progress to production | Accountable for service security and compliance |

## Further reading

### Internal documentation

[Base guardrails](../../governance/guardrails-base.md) defines foundational security controls for AI tools.

[Content exclusions guide](content-exclusions.md) explains how file exclusion works, what guarantees exist, and how to configure exclusions for OFFICIAL-SENSITIVE environments.

[AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers integrating AI across development lifecycle.

[Incident response playbook](../../governance/incident-response-playbook.md) covers responding to AI tool incidents.

[GitHub Copilot manager guide](../../manager-tool-guides/github-copilot/README.md) defines implementation guidance for managers.

### Government guidance

[Government Service Manual](https://www.gov.uk/service-manual) sets principles for digital services.

[Government Service Standard](https://www.gov.uk/service-manual/service-standard) sets a point checklist for services.

[Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice) provides technology decisions guidance.

[Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications) advises on data classification levels.

[NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) describes cloud security standards.

### GitHub resources

[GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/) describes data security and privacy.

[GitHub Copilot Business Data Security](https://docs.github.com/en/copilot/overview-of-github-copilot/about-github-copilot-business#data-security) explains enterprise security features.

[Managing GitHub Copilot Policies](https://docs.github.com/en/copilot/managing-copilot/managing-policies-for-copilot-in-your-organization) advises on policy configuration.

### AI security resources

[OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) describes top security risks for language models.

[OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) describes autonomous AI system security.

[NCSC AI and Machine Learning Security](https://www.ncsc.gov.uk/collection/machine-learning) provides UK AI security guidance.
