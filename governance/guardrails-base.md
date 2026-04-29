> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI Engineering Lab guardrails - base configuration

> Baseline security and usage boundaries for AI Engineering Lab deployments across government.

## Contents

[Purpose](#purpose)

[Who this applies to](#who-this-applies-to)

[In this document](#in-this-document)

[Data handling guardrails](#data-handling-guardrails)

[Code security guardrails](#code-security-guardrails)

[Usage boundary guardrails](#usage-boundary-guardrails)

[Output validation guardrails](#output-validation-guardrails)

[Ethical use guardrails](#ethical-use-guardrails)

[Monitoring and audit guardrails](#monitoring-and-audit-guardrails)

[Creating department-specific guardrails](#creating-department-specific-guardrails)

[Checks before using AI coding assistants](#checks-before-using-ai-coding-assistants)

[Agentic AI guardrails](#agentic-ai-guardrails)

[Further reading](#further-reading)

## Purpose

This document defines the foundational guardrails that apply to all AI Engineering Lab deployments. These guardrails protect government systems, data and intellectual property while enabling productive use of AI tools.

Departments should use this as a starting point and create department-specific variants where additional controls are required. See [creating department specific guardrails](#creating-department-specific-guardrails) for guidance.

## Who this applies to

These guardrails apply to all personnel using AI coding assistants on government projects, including civil servants, contractors and suppliers with access to government code repositories or development environments.

## In this document

Use the links below to navigate to each guardrail category.

| Category | Purpose |
|----------|---------|
| [Data handling](#data-handling-guardrails) | What you can and cannot share with AI tools |
| [Code security](#code-security-guardrails) | How to secure AI-generated code |
| [Usage boundaries](#usage-boundary-guardrails) | Where you should not use AI assistants |
| [Output validation](#output-validation-guardrails) | How to verify AI-generated content |
| [Monitoring and audit](#monitoring-and-audit-guardrails) | Tracking and accountability |

## Data handling guardrails

### G-DH-01: data classification limits

You must only use AI coding assistants with data classified at OFFICIAL or below, unless the specific tool has been accredited for higher classifications.

| Classification | AI assistant usage |
|----------------|-------------------|
| OFFICIAL | Permitted with standard controls |
| OFFICIAL-SENSITIVE | Permitted with enhanced controls and tool-specific accreditation |
| SECRET | Not permitted |
| TOP SECRET | Not permitted |

Cloud-based AI assistants transmit data to external servers. Organisations handling OFFICIAL-SENSITIVE data must assess whether their AI tool's enterprise licence provides adequate security controls (such as data residency, encryption, access controls and audit logging) and ensure deployment aligns with the Government security policy framework and National cyber security centre (NCSC) cloud security principles.

### G-DH-02: prohibited data types

You must never include the following data types in prompts, code comments or context provided to AI assistants.

| Prohibited data | Examples |
|-----------------|----------|
| Personal data (PII) | Names, addresses, NI numbers, dates of birth |
| Authentication credentials | API keys, passwords, tokens, certificates |
| Security configurations | Firewall rules, security group configs, WAF rules |
| Classified information | Information marked above OFFICIAL |
| Protected operational data | Case details, investigation information, intelligence |
| Financial account data | Bank details, payment card numbers |
| Health information | Medical records, health identifiers |
| Biometric data | Fingerprints, facial recognition data |
| Case or investigation data | Active case details, investigation notes, suspect information |
| Critical IP or algorithms | Proprietary algorithms identified during assessment stage |
| Export-controlled content | Code subject to ITAR, EAR or UK export controls |

If prohibited data is accidentally shared with an AI tool, report immediately through your department's security incident process and refer to the [Incident Response Playbook](incident-response-playbook.md).

### G-DH-03: code repository restrictions

Before using AI assistants with code from a repository, you must verify the following.

1. The repository does not contain embedded secrets or credentials.
2. The repository does not contain data above OFFICIAL classification.
3. The repository is not subject to export control restrictions.
4. You have authorisation to share the code with third-party services.

### G-DH-04: prompt hygiene

When creating prompts, you should use anonymised or synthetic data in examples and avoid exposing real system architecture or security-relevant patterns.

Specific actions you should take include:

- replacing real identifiers with placeholders (for example, `USER_ID_123`, `example@gov.uk`)
- stripping comments containing sensitive context before sharing code
- avoiding referencing specific system names, IP addresses or internal URLs

Example - before (problematic):
```python
# Connects to the case management API at https://internal-api.department.gov.uk:8443
# Uses service account: svc_case_processor / Password: CaseProc2024!
# Contact John Smith (john.smith@department.gov.uk) if issues
def get_case_details(case_id):
    ...
```

Example - after (safe):
```python
# Connects to case management API
# Uses service account credentials from environment
def get_case_details(case_id):
    ...
```

### G-DH-05: context window awareness

AI assistants may retain context within a session.

You must:

- start new sessions when switching between projects with different classification levels
- not assume previous prompts are forgotten within a session
- clear context explicitly when available in the tool
- avoid mixing work across multiple departments in a single session

## Code security guardrails

### G-CS-01: mandatory human review

You must review all AI-generated code before:

- committing to a shared repository
- deploying to any environment (including development)
- using in security-sensitive functions

The minimum review scope should include:

| Check | Description |
|-------|-------------|
| Logic correctness | Does the code do what was intended |
| Security vulnerabilities | SQL injection, XSS, path traversal and similar |
| Dependency safety | Are suggested packages from trusted sources |
| Credential exposure | No hardcoded secrets or credentials |
| Licence compliance | Compatible with project licensing |

### G-CS-02: security scanning requirements

AI-generated code must pass through the same security tooling as human-written code.

| Tool type | Requirement | Timing |
|-----------|-------------|--------|
| Static application security testing (SAST) | Mandatory | Pre-commit or CI pipeline |
| Dependency scanning | Mandatory | Pre-commit or CI pipeline |
| Secret detection | Mandatory | Pre-commit hook |
| Dynamic application security testing (DAST) | Where applicable | Pre-deployment |
| Container scanning | Where applicable | Pre-deployment |

Do not bypass security scanning because code was AI-generated. AI-generated code may contain vulnerabilities that automated tools can detect.

### G-CS-03: dependency verification

When AI assistants suggest external packages or libraries, you should take the following steps.

1. Verify the package exists and is actively maintained.
2. Check the package source (prefer official repositories).
3. Review the package's security history.
4. Confirm licence compatibility.
5. Check for known vulnerabilities in the suggested version.

Warning signs to look out for include:

- packages with very few downloads or stars
- packages not updated in over 12 months
- packages with known Common vulnerabilities and exposures (CVEs) in suggested version
- packages from unofficial or mirrored repositories

### G-CS-04: no AI in cryptographic implementations

Do not use AI assistants to:

- implement cryptographic algorithms
- generate cryptographic keys
- design authentication or authorisation logic
- create security token handling code

Cryptographic code requires specialist knowledge. Subtle errors can create severe vulnerabilities that may not be detected by standard testing.

Instead, use established, audited libraries and follow NCSC guidance on cryptographic implementations.

### G-CS-05: prompt injection awareness

AI-generated code may be vulnerable to prompt injection if it processes user input that is later sent to AI systems.

When building systems that use AI, you should take the following precautions:

- sanitise all user input before including in prompts
- use parameterised prompts where possible
- implement input length limits
- monitor for unusual prompt patterns

## Usage boundary guardrails

### G-UB-01: prohibited use cases

You must not use AI code assistants for the following purposes.

| Prohibited use | Rationale |
|----------------|-----------|
| Security-critical system core logic | Requires specialist security review |
| Safety-critical systems | Life-safety implications require formal methods |
| Cryptographic implementations | See [G-CS-04](#g-cs-04-no-ai-in-cryptographic-implementations) |
| Systems handling SECRET or above data | Classification restrictions |
| Generating malicious code or exploits | Ethical and legal restrictions |
| Circumventing security controls | Violation of security policy |
| Air-gapped or isolated environments | Network connectivity restrictions |

### G-UB-02: appropriate use cases

AI code assistants are well-suited for the following purposes.

| Appropriate use | Notes |
|-----------------|-------|
| Boilerplate code generation | Tests, CRUD operations, data models |
| Code explanation and documentation | Understanding legacy code |
| Refactoring suggestions | Improving code structure |
| Test case generation | Unit tests, integration tests |
| Learning and exploration | Understanding new frameworks |
| Code review assistance | Secondary review, not replacement |
| Prototyping and proofs of concept | Rapid iteration, non-production |

### G-UB-03: tool-specific boundaries

Some AI assistants have specific restrictions based on their accreditation status.

| Tool | Current status | Restrictions |
|------|----------------|--------------|
| GitHub Copilot Enterprise | To be confirmed | To be confirmed |
| Claude Code | To be confirmed | To be confirmed |
| Amazon Q Engineer | To be confirmed | To be confirmed |
| Gemini Code Assist | To be confirmed | To be confirmed |

Check with your department's security team for current accreditation status before deployment.

### G-UB-04: environment restrictions

| Environment | AI assistant usage |
|-------------|-------------------|
| Local development | Permitted |
| Cloud development environments | Permitted with approved tools |
| CI/CD pipelines | Requires security review |
| Production environments | Not permitted for real-time code generation |
| Air-gapped networks | Not permitted (no connectivity) |
| Secure enclaves | Not permitted without specific accreditation |

### G-UB-05: agentic AI and autonomous features

Agentic AI refers to AI models that can execute multi-step tasks autonomously, interact with external systems or take actions without human approval at each step. This includes background agents, Bugbot, computer-using agents (CUAs) and similar capabilities.

You may use agentic AI features (for example, autonomous development assistants or background agents) for development tasks under controlled conditions, operating within defined task boundaries and subject to interruption, but they require additional oversight.

#### Permitted uses (with standard controls)

| Feature type | Status | Notes |
|--------------|--------|-------|
| Code completion and suggestions | Permitted | Standard review applies |
| Chat-based assistance | Permitted | Standard review applies |
| Automated code review suggestions | Permitted | Human decision on actions |
| Agent-assisted scaffolding | Permitted | Review output before use |
| Agent-assisted test generation | Permitted | Review and validate tests |
| Background agents for refactoring | Permitted with approval | Requires team lead approval, review all changes |

#### Restricted uses (require security lead approval)

| Feature type | Status | Approval required |
|--------------|--------|-------------------|
| Agents creating repositories | Restricted | Team lead and security lead |
| Agents with file system write access | Restricted | Security lead |
| Agents executing shell commands | Restricted | Security lead |
| Agents interacting with external APIs | Restricted | Security lead |

#### Prohibited uses

| Feature type | Status | Rationale |
|--------------|--------|-----------|
| Autonomous access to production systems | Prohibited | Unacceptable risk |
| Agents with access to credentials or secrets | Prohibited | Security risk |
| Computer use or screen control on government systems | Prohibited | Accountability and audit gaps |
| Unattended task execution without human checkpoints | Prohibited | Lack of oversight |
| Agents granted access to government accounts | Prohibited | Authentication and authorisation bypass |

The programme supports controlled experimentation with agentic features for productivity gains (evidence shows 10% to 25% efficiency improvements in brownfield modernisation). However, autonomous access to government systems creates accountability gaps and unacceptable security risks, including the potential for indirect privilege escalation where combinations of otherwise permitted tools or actions could result in restricted outcomes.

For experimentation with restricted features, take the following steps.

1. Document the use case and expected benefits.
2. Identify specific controls and human checkpoints.
3. Obtain security lead approval before use.
4. Work in isolated or sandboxed environments where possible.
5. Log all agent actions for audit purposes.
6. Review and commit all outputs manually.

## Output validation guardrails

### G-OV-01: factual verification

AI assistants may generate plausible but incorrect information.

You must always verify:

- API signatures and method names against official documentation
- configuration syntax against current tool versions
- security recommendations against NCSC or vendor guidance
- regulatory claims against authoritative sources

### G-OV-02: code functionality testing

You must test all AI-generated code before use.

| Test type | Requirement |
|-----------|-------------|
| Unit tests | Mandatory for all generated functions |
| Integration tests | Required when interacting with other systems |
| Edge case testing | Required for input validation logic |
| Security testing | Required for authentication or authorisation code |

Do not assume AI-generated code is correct because it looks reasonable or compiles successfully.

### G-OV-03: licence compliance verification

AI-generated code may inadvertently reproduce licensed content. Before using generated code, take the following steps.

1. Review for unusual similarity to known open source projects.
2. Run through licence compliance tooling where available.
3. Document the AI tool used for provenance tracking.
4. Consult legal team if uncertain about licence implications.

### G-OV-04: hallucination detection

Watch for common AI hallucination patterns.

| Pattern | Example | Action |
|---------|---------|--------|
| Non-existent packages | `import gov_uk_utils` (does not exist) | Verify package exists |
| Fabricated APIs | `response.get_secure_data()` (not a real method) | Check documentation |
| Outdated syntax | Deprecated method calls | Verify against current version |
| Invented configuration | Non-existent config options | Test in isolated environment |

## Ethical use guardrails

### G-ET-01: ethical review triggers

Identify whether any teams work on systems that require additional ethical consideration.

| System type | Ethical review required | Review owner |
|-------------|------------------------|--------------|
| Citizen-facing services | Yes - document AI usage | Department lead |
| Decision-support systems | Yes - assess impact on decisions | Department lead and security lead |
| Automated decision-making | Yes - General data protection regulation (GDPR) Article 22 assessment | Department Data protection officer (DPO) |
| Benefits or entitlements processing | Yes - fairness review | Department lead |
| Law enforcement or justice systems | Yes - legal and ethical review | Department legal and security lead |
| Healthcare or clinical systems | Yes - clinical safety review | Clinical safety officer |
| Critical national infrastructure | Yes - impact assessment | Security lead |
| AI-assisted systems where outputs materially influence human decisions affecting individuals, even where final decisions remain human-made | Yes - assess degree of reliance and impact | Department lead and security lead |

During assessment, record which teams work on these system types in the security posture review. Flag for additional controls in department-specific guardrails.

### G-ET-02: transparency and documentation

When AI code assistants are used in developing systems that affect citizens or public decisions, take the following actions.

1. Document AI involvement in technical records and architecture decision records.
2. Assess output bias risk particularly for systems processing citizen data.
3. Ensure human review of AI-generated code in citizen-facing logic paths.
4. Consider disclosure requirements based on department transparency policies.
5. Retain sufficient documentation and decision records to support audit, assurance and post-hoc review.

Government has a responsibility to be transparent about how services are built. Departments should be able to answer questions about AI usage in service development.

### G-ET-03: human judgment requirements

AI code assistants support but do not replace professional judgment. Human review must be informed and contextual, meaning reviewers understand the system's purpose, limitations and potential impacts relevant to their decision.

You must make final decisions for the following areas.

| Area | Requirement |
|------|-------------|
| Security architecture | Security professional sign-off |
| Legal or compliance logic | Legal team review |
| Clinical or safety-critical code | Appropriate professional review |
| Policy implementation | Policy owner verification |
| Accessibility compliance | Accessibility specialist review |

AI may assist with research, drafting, code generation, test creation and documentation. Humans must decide on architecture choices, compliance interpretations, policy implementation and safety-critical logic.

### G-ET-04: escalation for novel use cases

If a proposed use of AI code assistants raises ethical concerns not covered by these guardrails, take the following steps.

1. Raise with department lead and security lead.
2. Document the concern and proposed approach.
3. Escalate to programme governance if cross-department implications.
4. Do not proceed until guidance is provided.

Examples requiring escalation include AI-generated code for algorithmic decision-making about individuals, use in politically sensitive systems and novel agentic AI applications not covered by G-UB-05.

Outcomes of escalations should be recorded to support consistent handling of similar novel use cases across teams.

## Monitoring and audit guardrails

### G-MA-01: usage logging

Departments should maintain logs of AI assistant usage with the following elements.

| Log element | Purpose |
|-------------|---------|
| User identity | Accountability |
| Tool used | Audit trail |
| Timestamp | Timeline reconstruction |
| Project or repository | Scope identification |

Do not log prompt content as it may contain sensitive information.

### G-MA-02: telemetry configuration

Configure AI assistant telemetry settings according to department policy.

| Setting | Recommendation |
|---------|----------------|
| Code snippet sharing | Disable unless required and approved |
| Prompt logging by vendor | Understand vendor policy before enabling |
| Usage analytics | Enable for adoption metrics |
| Error reporting | Enable for support purposes |

Review vendor data handling policies and ensure they meet government requirements.

### G-MA-03: incident reporting

You must report the following incidents to your security team:

- accidental exposure of classified or sensitive data
- AI-generated code that introduced a security vulnerability
- suspected prompt injection attempts
- unusual AI behaviour or responses suggesting compromise

Use existing security incident reporting channels. Read the [incident response playbook](incident-response-playbook.md) for detailed procedures.

### G-MA-04: periodic review

AI assistant usage should be reviewed according to the following schedule.

| Review | Frequency | Scope |
|--------|-----------|-------|
| Usage metrics | Monthly | Adoption, active users, patterns |
| Security incidents | Monthly | AI-related incidents, near-misses |
| Guardrails effectiveness | Quarterly | Policy compliance, gaps identified |
| Tool accreditation | Annually | Continued suitability |

## Creating department-specific guardrails

This base configuration may be extended for department-specific requirements.

### Extension process

1. Copy guardrails-base.md as your starting point.
2. Review additional requirements with your security team.
3. Add department-specific controls using the G-DEPT-XX numbering convention.
4. Ensure department guardrails are equal to or stricter than base controls.
5. Document the rationale explaining why additional controls are needed.
6. Obtain security lead sign-off before deployment.
7. Submit to AI Engineering Lab repository for cross-government visibility.

### Common department extensions

| Department context | Typical additional controls |
|--------------------|-----------------------------|
| Law enforcement | Enhanced logging, additional prohibited data types |
| Defence-adjacent | Export control verification, nationality restrictions |
| Healthcare | Additional Personally identifiable information (PII) categories, clinical safety review |
| Financial | PCI-DSS alignment, fraud prevention considerations |
| Critical infrastructure | Air-gap considerations, OT and IT boundary controls |

### Template for department extension

```markdown
---
title: AI Engineering Lab guardrails - [Department Name]
version: 0.1.0
extends: guardrails-base.md v0.1.0
status: Draft
owner: [Department Security Team]
classification: [OFFICIAL or OFFICIAL-SENSITIVE]
---

# Department-specific guardrails

## Additional controls

### G-DEPT-01: [Control name]
[Description]

Rationale: [Why this is needed for your department]

## Modified controls

### G-XX-XX: [Original control reference]
Base requirement: [Original text]
Department modification: [How it differs]
Rationale: [Why modification is needed]
```

## Checks before using AI coding assistants

### Self-assessment checklist

Before using AI code assistants, verify the following items.

- [ ] I have completed AI code assistant training
- [ ] I understand the data classification of my project
- [ ] The tool I am using is approved for my department
- [ ] I know how to report security incidents
- [ ] I have reviewed department-specific guardrails (if any)

### Manager verification

Team leads should verify the following items.

- [ ] All team members have completed training
- [ ] Department-specific guardrails are documented and communicated
- [ ] Security scanning is integrated into the development pipeline
- [ ] Code review processes include AI-generated code verification
- [ ] Incident reporting channels are established

## Agentic AI guardrails

This section provides security controls for AI coding tools with agentic capabilities. These are tools that operate autonomously, execute multi-step tasks, and make decisions without continuous human oversight.

### G-AG-01: autonomy level classification

You must classify AI coding tools by their autonomy level before use.

| Level (L) | Name | Description | Examples |
|-------|------|-------------|----------|
| L1 | Suggestive | Human accepts each suggestion | Copilot inline |
| L2 | Assistive | Human reviews before apply | Copilot Chat |
| L3 | Collaborative | Multi-step with checkpoints | Copilot Edits, Cursor Composer |
| L4 | Autonomous | Extended operation with check-ins | Amazon Kiro, Claude Code agentic |
| L5 | Fully Autonomous | Hours/days operation | Devin |

Level 5 tools require SIRO approval before deployment.

### G-AG-02: proportionate controls

Controls must be proportionate to the autonomy level.

| Control | L1 to 2 | L3 | L4 | L5 |
|---------|-------|----|----|-----|
| Human review | Each suggestion | At checkpoints | At checkpoints and time | Continuous monitor |
| Branch isolation | Not required | Recommended | Required | Required |
| Time limits | None | 15 min | 30 min | 2 hours |
| Kill switch | Not required | Recommended | Required and tested | Required and multiple |
| SIRO approval | No | No | No | Yes |

### G-AG-03: kill switch requirements

For L4 and L5 tools, operators must have accessible kill switches.

1. Primary: IDE/CLI kill command (Ctrl+C or equivalent)
2. Secondary: session termination
3. Tertiary: network disconnection

Test kill switches before extended autonomous sessions.

### G-AG-04: checkpoint requirements

For L3 to L5 tools, checkpoints must occur after:

- creating more than 5 files
- modifying more than 10 files
- deleting any files
- any external API call
- any dependency installation
- the maximum time limit is reached

### G-AG-05: prohibited agentic actions

Regardless of autonomy level, agentic tools must not do any of the following actions.

| Prohibited action | Rationale |
|-------------------|-----------|
| Deploy to production | Requires human approval |
| Modify auth/authz code | Security-critical |
| Access SECRET+ data | Classification restrictions |
| Commit to main/master | Branch protection |
| Bypass CI/CD checks | Quality gates |
| Access .env files with secrets | Credential protection |

### G-AG-06: human in the loop (HiTL) escalation matrix

Human approval is required for the following triggers and autonomy levels.

| Trigger | L3 | L4 | L5 |
|---------|----|----|-----|
| Security-sensitive file modification | Explicit approval | Explicit approval | Explicit approval |
| CI/CD modification | Explicit approval | Explicit approval | Not permitted |
| External API call | Approval | Approval | Approval |
| Time limit (30 min) | - | Mandatory review | Mandatory review |
| Time limit (2 hours) | - | - | Mandatory review |
| Production deployment | Not permitted | Not permitted | Not permitted |

### G-AG-07: meaningful human review

For the human review to be meaningful:

- you must allocate minimum 1 minute per 50 lines of changed code
- the reviewer must be able to explain what the code does
- the reviewer must verify no obvious security issues
- the reviewer must confirm tests pass and are meaningful

Rubber-stamping of AI output does not constitute meaningful review.

### G-AG-08: session documentation

For L4 and L5 sessions, you must document the:

- session start time and purpose
- autonomy level used
- checkpoints and reviews
- session end time
- review attestation

## Further reading

### UK government (tier 1)

[UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html) replaces the CDDO GenAI Framework.

[NCSC AI Security Guidance](https://www.ncsc.gov.uk/collection/ai)

[NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security)

[NCSC Zero Trust Architecture](https://www.ncsc.gov.uk/collection/zero-trust-architecture)

[NCSC Secure Development Guidance](https://www.ncsc.gov.uk/collection/developers-collection)

[Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications)

[Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

[Cyber Essentials Scheme](https://www.ncsc.gov.uk/cyberessentials/overview)

### Standards (tier 3)

[OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

[OWASP LLM Top 10 (2025)](https://genai.owasp.org/llm-top-10/)

[OWASP Agentic AI Threats](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
