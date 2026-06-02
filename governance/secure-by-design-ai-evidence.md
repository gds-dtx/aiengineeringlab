> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Secure by Design (SbD) evidence for AI-assisted development

> Guidance on evidence, audit and forensics for software that uses AI assistants.

## Purpose and scope

You must evidence that teams build and run software in line with SbD principles. AI assistants change how code is written and reviewed. This guidance sets out what evidence to record, how to maintain an audit trail, and how to run incident forensics when AI-assisted code is involved. This document aligns with National Cyber Security Centre guidance on secure development and design, and with cross government security standards. 

This document covers:

- how to apply SbD to AI-assisted development
- what evidence to record and how to attribute AI-generated code
- what auditors can and cannot see and how to handle the audit gap
- the governance position on prompt content logging
- how to run incident forensics for AI-related issues
- the assurance artefacts you must keep by sprint, release and assessment

## Who this guidance is for

This guidance is for you if you work in:

- security assurance and governance
- software delivery teams
- audit and risk
- incident response

## SbD principles applied to AI-assisted development

You must apply SbD and secure development principles to work that uses AI assistants. The National Cyber Security Centre sets out principles for secure development and design. Use them to guide threat modelling, architecture, coding and testing.

The following practices apply.

| SbD principle | How it applies to AI-assisted code | Evidence required |
|----------------------------|-------------------------------------|-------------------|
| Security ownership | The developer and reviewer remain responsible for all code, including AI-generated code | Code review records showing human approval |
| Threat understanding | Teams document threats specific to AI-generated code in the threat model | Threat model entries for AI-specific threats, T-CS series |
| Secure architecture | AI tools do not make architectural decisions autonomously | Architecture decision records, human oversight evidence |
| Secure coding | AI-generated code meets the same standards as human-written code | SAST scan results, code review records |
| Security testing | AI-generated code undergoes the same testing as human-written code | Teams provide test results, Dynamic Application Security Testing (DAST) reports, penetration testing findings |
| Security monitoring | Teams monitor AI tool usage for anomalous behaviour | Usage logs, anomaly reports |
| Incident preparedness | Incident procedures cover AI-related code issues | Incident response playbook, post-incident reports |
| Continuous improvement | Teams review AI tool configuration and usage patterns regularly | Quarterly review records, quality metrics |

These practices reflect secure development and monitoring guidance.

## Evidence framework for AI-assisted code

You must record evidence that shows SbD in practice for AI-assisted changes.

### What to record

For each change you should record:

- which AI tool and model the developer used
- who reviewed the change and the decision
- static analysis, software composition and secret scan results
- test results for unit, integration and security tests
- what the reviewer changed in the AI output
- a short attestation from the reviewer

This aligns with secure development and deployment guidance.

### How to attribute AI-generated code in version control
Use a consistent commit and pull request format so teams can search for AI-assisted changes and build reports.

Example commit message template:

```
feat: add input validation for registration endpoint
ai assisted: GitHub Copilot, claude-sonnet-4.6
human changes: added rate limiting and corrected error handling
reviewed by: Firstname Lastname
```

Record the same fields in the pull request description. This supports traceability and later audits of human oversight. It aligns with NCSC guidance that stresses version control and peer review as core controls.

### Per release evidence package

You must show the security posture of code that includes AI-assisted changes. Build a release evidence package with:

- a summary of AI-assisted changes in the release
- aggregate static analysis results
- code review completion records
- a test coverage report
- any security findings and how you resolved them

## Audit trail requirements and limitations

### What can be audited

Auditors can access:

- who used the AI tool and when for enterprise licences
- which features were used where vendors expose this data
- what code was committed and who reviewed it
- security scan results and test results

This aligns with device logging and monitoring guidance and with government security monitoring expectations.

### What cannot be audited

In most deployments you cannot see full prompt content or the original AI suggestion. Tools do not retain this data by default. You cannot fully reconstruct the interaction between the developer and the AI. This is a known gap that affects audit and forensics.

### Compensating controls for the audit gap

Apply the following controls to balance privacy and accountability and to meet monitoring expectations:

- a mandatory human code review with clear approval records
- automated security scanning and tests in the pipeline
- AI attribution in commits and pull requests
- enterprise usage logs to show who used the tool and when
- training completion records for developers who use AI tools

These controls align with secure development and monitoring guidance and with government security standards.

## Prompt audit governance position

### Position statement

You do not need to log prompt content by default. Prompt content can include sensitive business logic or personal data. Logging would create a second store of sensitive data and new risks. Most enterprise tools do not expose prompt level logs. The control benefit is limited when you apply the other measures in this guidance. This position is consistent with a risk-based approach in government security standards.

### When prompt logging may be appropriate

Only consider prompt logging:

- during a specific investigation after a security incident, using a short retention period and strict access controls
- as a time bound pilot with explicit participant consent and a data protection assessment
- where a governance board requires it and you can apply proportionate safeguards

## Incident forensics for AI-assisted code

You must plan for incident response that includes AI-assisted changes. This follows NCSC incident management guidance.

### Forensic capability and known limitations

Investigators can use:

- version control history
- pipeline logs for scans and tests
- vendor usage logs that show who used the tool and when
- pull request comments and review notes

Limits include missing prompt content, missing original suggestions, non deterministic generation and model changes over time. Focus on the committed code, reviews and scans. This mirrors NCSC guidance that stresses preparation, defined processes and use of available logs.

### Evidence preservation requirements

Take these steps when an incident may involve AI-assisted code.

1. Freeze the version control history for the affected repositories.
2. Preserve pipeline logs and security scan artefacts for all related builds.
3. Request vendor usage logs for relevant users and time periods.
4. Record developer accounts of their AI interactions while memory is fresh.
5. Capture AI tool configuration and model version in use at the time.

### Forensic investigation procedure

Follow these ordered steps.

1. Identify the specific code that caused or contributed to the incident.
2. Check version control to confirm who committed and who reviewed the change.
3. Check commits and pull requests for AI attribution.
4. Review the code review record to assess oversight quality.
5. Review pipeline logs to see whether scanning flagged the issue.
6. Update scanning rules if the issue was not detected.
7. Interview the developer on the AI interaction. Record what they recall.
8. Document findings and lessons in the incident report.

## Assurance artefacts checklist

Use this checklist to prepare for assurance reviews.

### Per sprint evidence

- [ ] AI-attributed commits with review records
- [ ] Static analysis results for all commits
- [ ] Test coverage for new and changed code
- [ ] Security review findings and resolution status if applicable

### Per release evidence

- [ ] Summary of ai assisted changes
- [ ] Aggregate security scan report
- [ ] Code review completion for all changes
- [ ] Release security assessment if required by the department

### Per assessment evidence

- [ ] Vendor ai tool usage report
- [ ] Quality metric trends
- [ ] Incident reports involving ai assisted code if applicable
- [ ] Guardrails compliance review
- [ ] Training completion records

## Further reading

[NCSC Secure Development and Deployment](https://www.ncsc.gov.uk/collection/developers-collection) covers version control, peer review and security testing as core controls for development teams.

[NCSC Cyber Security Design Principles](https://www.ncsc.gov.uk/collection/cyber-security-design-principles) underpins the SbD approach applied throughout this document.

[UK Government Secure by Design policy](https://www.security.gov.uk/policy-and-guidance/secure-by-design/) sets out the cross-government requirement to embed security from the outset of service delivery.

[Government Functional Standard GovS 007: Security](https://www.gov.uk/government/publications/government-functional-standard-govs-007-security) provides the broader security governance framework within which this guidance sits.

[UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government) sets out Principle 4 on meaningful human control, which this guidance operationalises for AI-assisted development.

[Security policies](../security/security-policies.md) covers PS-03, PS-04 and PS-08.

[Guardrails base](guardrails-base.md) covers code security and usage logging controls.

[Incident response playbook](incident-response-playbook.md) covers incident classification and response procedures.

[Non-deterministic code assurance](non-deterministic-code-assurance.md) provides guidance for evidence on non-deterministic output.

[Threat model](../security/threat-modelling.md) covers the T-CS series of code security threats.

[AI-assisted SDLC playbook](../playbooks/ai-sdlc-playbook.md) covers SDLC integration.