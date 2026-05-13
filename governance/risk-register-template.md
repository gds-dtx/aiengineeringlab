> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI Engineering Lab risk register template

> A standardised template for documenting and managing risks associated with AI Engineering Lab adoption.

## Purpose

This template provides a consistent approach to identifying, assessing and managing risks across all AI Engineering Lab deployments. It aligns with government risk management frameworks and ensures risks are visible, owned and actively managed.

Use this template to:

- document risks identified during assessments
- track risks throughout the adoption lifecycle
- provide assurance to senior responsible owners
- support security accreditation processes
- enable cross-government learning from risk patterns

## How to use this template

1. Copy this template for each department or programme deployment.
2. Complete the risk register using the pre-populated common risks as a starting point.
3. Add deployment-specific risks identified during assessment.
4. Assign owners for each risk.
5. Review regularly (minimum monthly during active adoption).
6. Escalate risks that exceed tolerance to programme governance.

## Risk assessment methodology

### Likelihood scoring

| Score | Likelihood | Description |
|-------|------------|-------------|
| 1 | Rare | May occur only in exceptional circumstances (less than 5% probability) |
| 2 | Unlikely | Could occur but not expected (5% to 20% probability) |
| 3 | Possible | Might occur at some point (20% to 50% probability) |
| 4 | Likely | Will probably occur in most circumstances (50% to 80% probability) |
| 5 | Almost certain | Expected to occur (more than 80% probability) |

### Impact scoring

| Score | Impact | Description |
|-------|--------|-------------|
| 1 | Negligible | Minor inconvenience, no lasting effect |
| 2 | Minor | Limited impact, resolved within normal operations |
| 3 | Moderate | Noticeable impact requiring management attention |
| 4 | Major | Significant impact on objectives, requires senior attention |
| 5 | Severe | Critical impact, potential for lasting damage or regulatory breach |

### Risk rating matrix

|              | Negligible (1) | Minor (2) | Moderate (3) | Major (4) | Severe (5) |
|--------------|----------------|-----------|--------------|-----------|------------|
| Almost certain (5) | 5 (Medium) | 10 (Medium) | 15 (High) | 20 (Very high) | 25 (Very high) |
| Likely (4) | 4 (Low) | 8 (Medium) | 12 (High) | 16 (High) | 20 (Very high) |
| Possible (3) | 3 (Low) | 6 (Medium) | 9 (Medium) | 12 (High) | 15 (High) |
| Unlikely (2) | 2 (Low) | 4 (Low) | 6 (Medium) | 8 (Medium) | 10 (Medium) |
| Rare (1) | 1 (Low) | 2 (Low) | 3 (Low) | 4 (Low) | 5 (Medium) |

### Risk tolerance thresholds

| Rating | Score range | Response required |
|--------|-------------|-------------------|
| Very high | 20 to 25 | Immediate escalation to senior responsible owner; consider stopping activity |
| High | 12 to 19 | Active management required; escalate to programme board |
| Medium | 5 to 11 | Monitor and manage; include in regular reporting |
| Low | 1 to 4 | Accept and monitor; review at next scheduled assessment |

## Risk register

### Deployment information

| Field | Value |
|-------|-------|
| Department or programme | To be confirmed |
| AI tools in scope | To be confirmed (for example, GitHub Copilot, Claude Code) |
| Risk register owner | To be confirmed |
| Created date | To be confirmed |
| Last reviewed | To be confirmed |
| Next review due | To be confirmed |

### Category 1: data and information security risks

#### RISK-SEC-01: sensitive data exposure to AI tools

| Field | Value |
|-------|-------|
| Risk ID | RISK-SEC-01 |
| Category | Security |
| Risk description | Engineers inadvertently share sensitive, classified or personal data with AI code assistants through prompts, code context or file uploads |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 4 (Likely) |
| Impact (inherent) | 4 (Major) |
| Inherent risk score | 16 (High) |
| Existing controls | Guardrails documentation and training, data classification guidance, pre-commit secret scanning |
| Likelihood (residual) | 3 (Possible) |
| Impact (residual) | 4 (Major) |
| Residual risk score | 12 (High) |
| Additional mitigations planned | To be confirmed (for example, enhanced monitoring, additional training) |
| Target risk score | 8 (Medium) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-SEC-02: credential exposure in generated code

| Field | Value |
|-------|-------|
| Risk ID | RISK-SEC-02 |
| Category | Security |
| Risk description | AI assistants generate code containing hardcoded credentials, API keys or connection strings that are committed to repositories |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 4 (Major) |
| Inherent risk score | 12 (High) |
| Existing controls | Pre-commit hooks for secret detection, code review requirements, guardrails training |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 4 (Major) |
| Residual risk score | 8 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-SEC-03: data residency and sovereignty

| Field | Value |
|-------|-------|
| Risk ID | RISK-SEC-03 |
| Category | Security |
| Risk description | Code and prompts are processed or stored in jurisdictions outside the UK or EEA, potentially violating data sovereignty requirements |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 9 (Medium) |
| Existing controls | Vendor data residency verification, Data processing agreement (DPA) review, tool accreditation process |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 3 (Moderate) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 6 (Medium) |
| Status | Open |
| Last updated | To be confirmed |

### Category 2: code quality and security risks

#### RISK-CODE-01: security vulnerabilities in generated code

| Field | Value |
|-------|-------|
| Risk ID | RISK-CODE-01 |
| Category | Code quality |
| Risk description | AI-generated code contains security vulnerabilities (for example, SQL injection, XSS, insecure deserialisation) that are not detected before deployment |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 4 (Likely) |
| Impact (inherent) | 4 (Major) |
| Inherent risk score | 16 (High) |
| Existing controls | Mandatory code review, Static application security testing (SAST) and Dynamic application security testing (DAST) integration, security scanning in Continuous integration (CI) and Continuous deployment (CD) |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 4 (Major) |
| Residual risk score | 8 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-CODE-02: malicious or vulnerable dependencies

| Field | Value |
|-------|-------|
| Risk ID | RISK-CODE-02 |
| Category | Code quality |
| Risk description | AI assistants suggest packages or libraries that are malicious, abandoned or contain known vulnerabilities |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 4 (Major) |
| Inherent risk score | 12 (High) |
| Existing controls | Dependency scanning tools, approved package repositories, engineer verification guidance |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 3 (Moderate) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 6 (Medium) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-CODE-03: functional defects from AI hallucination

| Field | Value |
|-------|-------|
| Risk ID | RISK-CODE-03 |
| Category | Code quality |
| Risk description | AI-generated code appears correct but contains logical errors or references non-existent APIs or methods, leading to runtime failures |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 4 (Likely) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 12 (High) |
| Existing controls | Mandatory testing of AI-generated code, code review requirements, engineer training on hallucination patterns |
| Likelihood (residual) | 3 (Possible) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

### Category 3: intellectual property and legal risks

#### RISK-IP-01: licence compliance violations

| Field | Value |
|-------|-------|
| Risk ID | RISK-IP-01 |
| Category | Legal and IP |
| Risk description | AI-generated code inadvertently reproduces copyrighted or incompatibly-licensed code from training data, creating legal exposure |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 9 (Medium) |
| Existing controls | Licence compliance scanning, vendor indemnification review, code provenance documentation |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 3 (Moderate) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 6 (Medium) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-IP-02: unclear IP ownership

| Field | Value |
|-------|-------|
| Risk ID | RISK-IP-02 |
| Category | Legal and IP |
| Risk description | Uncertainty over intellectual property ownership of AI-generated code creates complications for procurement, licensing or future commercialisation |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 2 (Unlikely) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 6 (Medium) |
| Existing controls | Contract review for IP terms, legal guidance documentation, Crown copyright application |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 4 (Low) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

### Category 4: adoption and operational risks

#### RISK-ADO-01: low adoption and wasted investment

| Field | Value |
|-------|-------|
| Risk ID | RISK-ADO-01 |
| Category | Adoption |
| Risk description | Licences are procured but not activated or actively used, resulting in wasted investment and failure to realise productivity benefits |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 9 (Medium) |
| Existing controls | Daily usage monitoring, FDE support for low-maturity teams, champion network, training programme |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 3 (Moderate) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 3 (Low) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-ADO-02: engineer resistance

| Field | Value |
|-------|-------|
| Risk ID | RISK-ADO-02 |
| Category | Adoption |
| Risk description | Engineers resist using AI tools due to scepticism, concerns about job security or preference for existing workflows, undermining adoption targets |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 9 (Medium) |
| Existing controls | Resistance identification, change management approach (ADKAR), champion peer influence, success story sharing |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 4 (Low) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-ADO-03: skills degradation

| Field | Value |
|-------|-------|
| Risk ID | RISK-ADO-03 |
| Category | Adoption |
| Risk description | Over-reliance on AI assistants leads to degradation of fundamental coding skills, particularly among junior engineers |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 3 (Moderate) |
| Inherent risk score | 9 (Medium) |
| Existing controls | Training emphasis on AI as augmentation, code review requirements, balanced use guidance |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 4 (Low) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

### Category 5: service and vendor risks

#### RISK-VEN-01: service availability and dependency

| Field | Value |
|-------|-------|
| Risk ID | RISK-VEN-01 |
| Category | Vendor |
| Risk description | AI assistant service outages disrupt engineer productivity, particularly for teams that have become highly dependent on the tools |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 2 (Minor) |
| Inherent risk score | 6 (Medium) |
| Existing controls | Vendor Service level agreement (SLA) monitoring, training on working without AI, multiple tool familiarity |
| Likelihood (residual) | 3 (Possible) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 6 (Medium) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 6 (Medium) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-VEN-02: vendor lock-in

| Field | Value |
|-------|-------|
| Risk ID | RISK-VEN-02 |
| Category | Vendor |
| Risk description | Deep integration with a specific AI tool creates switching costs and dependency, reducing negotiating leverage and flexibility |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 2 (Minor) |
| Inherent risk score | 6 (Medium) |
| Existing controls | Tool-agnostic training, exit strategy requirements, multi-tool exposure |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 4 (Low) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

#### RISK-VEN-03: premium credit exhaustion

| Field | Value |
|-------|-------|
| Risk ID | RISK-VEN-03 |
| Category | Vendor |
| Risk description | Teams exhaust allocated premium model credits faster than anticipated, leading to service degradation or unexpected costs |
| Risk owner | To be confirmed |
| Likelihood (inherent) | 3 (Possible) |
| Impact (inherent) | 2 (Minor) |
| Inherent risk score | 6 (Medium) |
| Existing controls | Credit usage monitoring, allocation policies, intervention triggers |
| Likelihood (residual) | 2 (Unlikely) |
| Impact (residual) | 2 (Minor) |
| Residual risk score | 4 (Low) |
| Additional mitigations planned | To be confirmed |
| Target risk score | 4 (Low) |
| Status | Open |
| Last updated | To be confirmed |

## Adding deployment-specific risks

Use this template for risks unique to your deployment.

| Field | Value |
|-------|-------|
| Risk ID | RISK-[CAT]-[NN] |
| Category | Security, code quality, legal and IP, adoption, vendor or other |
| Risk description | Clear description of what could go wrong |
| Risk owner | Name and role |
| Likelihood (inherent) | 1 to 5 |
| Impact (inherent) | 1 to 5 |
| Inherent risk score | Likelihood × impact |
| Existing controls | What's already in place |
| Likelihood (residual) | 1 to 5 after controls |
| Impact (residual) | 1 to 5 after controls |
| Residual risk score | Likelihood × impact |
| Additional mitigations planned | What else will be done |
| Target risk score | Desired end state |
| Status | Open, mitigating, closed or accepted |
| Last updated | Date |

## Risk review log

| Review date | Reviewer | Changes made | Next review |
|-------------|----------|--------------|-------------|
| To be confirmed | To be confirmed | Initial register created | To be confirmed |
| | | | |
| | | | |

## Escalation record

| Date | Risk ID | Escalated to | Reason | Outcome |
|------|---------|--------------|--------|---------|
| | | | | |
| | | | | |

## Summary dashboard

### Current risk profile

| Rating | Count | Risk IDs |
|--------|-------|----------|
| Very high (20 to 25) | 0 | Not applicable |
| High (12 to 19) | 0 | Not applicable |
| Medium (5 to 11) | To be confirmed | To be confirmed |
| Low (1 to 4) | To be confirmed | To be confirmed |

### Trend

| Period | Very high | High | Medium | Low | Direction |
|--------|-----------|------|--------|-----|-----------|
| Current | | | | | |
| Previous | | | | | |
| Change | | | | | ↑↓→ |

## Further reading

[Guardrails Base](guardrails-base.md) covers security controls.

[Incident Response Playbook](incident-response-playbook.md) covers when risks materialise.

[Quality Strategy](../quality-metrics/quality-strategy.md) covers metrics for monitoring.

[GOV.UK Orange Book](https://www.gov.uk/government/publications/orange-book) provides risk management guidance.

[Government Functional Standard GovS 002](https://www.gov.uk/government/publications/project-delivery-functional-standard) covers project delivery.

[NCSC Risk Management Guidance](https://www.ncsc.gov.uk/collection/risk-management-collection)
