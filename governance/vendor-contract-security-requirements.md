> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Vendor contract security requirements for AI coding assistants

> Mandatory contract clauses and security requirements for AI coding assistant suppliers used by UK government departments.

## Purpose and scope

You must include the requirements in this document in contracts for AI coding assistant inference services.

These services process government code, prompt content and related metadata during inference. Without clear contract controls, you have limited assurance over security, data handling and compliance.

This guidance:

- applies to AI coding assistant inference services only
- does not apply to vendor research and development or general model training
- can be used with G-Cloud, Digital Outcomes and Specialists, or bespoke contracts
- sets mandatory minimum requirements

Any deviation from these requirements needs written approval from the senior information risk owner.

## Who this is for

This guidance is for you if you work in:

- procurement and commercial teams
- cyber security and AI security roles
- legal teams supporting procurement
- contract and supplier management
- governance boards approving supplier risk

## Mandatory contractual clauses

You must include all mandatory clauses in supplier contracts. Supplier standard terms must not override these clauses unless the senior information risk owner approves this in writing.

| Clause category | Manadatory requirement |
|-----------------|-------------|
| Data handling | Retention limits, secondary use prohibition, training data opt-out |
| Security obligations | Government-specific certifications, security controls, encryption |
| Breach notification | Timelines, cooperation, forensic support |
| Audit rights | Right to audit, attestation, evidence provision |
| Data deletion | Deletion on termination, verification, certification |
| Exit provisions | Data export, transition support, continuity |
| Sub-processor management | Disclosure, approval, flow-down of obligations |

## Government security requirements

### Security classifications

Suppliers must comply with [Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications).

You must ensure the contract requires suppliers to:

- train staff who access government data on official and official sensitive handling
- process data only at the agreed classification level
- support classification marking where needed
- manage and report data spillages
- avoid combining data in ways that increase its sensitivity

### NCSC cloud security principles

Suppliers must align their service with the [NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security).

You must require suppliers to provide:

- a written self assessment against all 14 principles
- evidence for each principle
- an annual update to the assessment

### Security certifications

Suppliers must provide assurance through one or more of the following:

- [ISO/IEC 27001:2022 on information security management systems](https://www.iso.org/standard/27001)
- [SOC 2 Type 2 (American Institute of Certified Public Accountants - AICPA)](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- [Plus certification level of the Cyber Essentials](https://www.ncsc.gov.uk/cyberessentials/overview)

You may accept equivalent assurance only if you record your justification.

### Data residency and legal jurisdiction

You must ensure that:

- all processing and storage of government data takes place in the UK or EU
- suppliers provide region locking controls
- suppliers give 30 days notice of location changes
- suppliers document applicable legal access regimes

## Data handling requirements

### Prompt and context data

Prompt content, retrieved code and inference responses count as government data.

You must require suppliers to:

- keep prompts separate between customers
- avoid caching prompts beyond retention limits
- clear context between user sessions
- avoid indexing prompt data for search or analytics

### Data retention

The contract must set clear retention limits.

| Data type | Maximum retention |
|---------|-------------------|
| Prompt content and responses | 30 days |
| Error logs with prompt data | 90 days |
| Usage data | Aggregated and anonymised only |

### Secondary use restrictions

Suppliers must not:

- use government data for model training or tuning
- use government data for benchmarking or evaluation
- share government data except to provide the service

Suppliers must enforce training opt out controls through technical measures and provide evidence on request.

## Security incident management

### Incident notification

You must require suppliers to:

- notify you within 72 hours of identifying an incident
- treat suspicious activity affecting government data as awareness
- provide scope and containment details in the first report
- provide a detailed report within 5 working days
- provide root cause analysis within 20 working days of resolution

### Investigation and cooperation

Suppliers must:

- support investigations and provide access to logs
- preserve forensic evidence
- support regulator investigations
- agree public communications with you

These duties apply to incidents involving sub processors.

## Audit and transparency

### Audit rights

You must include the right to audit supplier compliance.

Audits:

- may take place at least once a year
- must be risk based and proportionate
- do not limit statutory rights

### Assurance evidence

Suppliers must provide:

- annual assurance reports
- penetration testing evidence and remediation status
- vulnerability management information
- an annual security compliance statement

### Transparency

Suppliers must tell you about:

- changes to sub processors
- significant changes to models or architecture
- loss of security certifications

## Exit and transition

### Data export

You must ensure the contract allows you to:

- export your data at any time
- receive data in a standard format
- receive data within 30 days

### Data deletion

Suppliers must:

- delete all government data within 30 days of contract end
- confirm deletion of systems, logs and backups
- explain any legal retention duties

### Transition support

Suppliers must:

- support transition for 90 days
- maintain security and availability
- share knowledge to support migration
- avoid reducing service quality during exit

## Contract review and governance

### Roles

The following roles review supplier contracts.

| Role | Responsibility |
|------|----------------|
| AI security lead | Reviews security clauses and evidence |
| Data protection officer | Reviews data protection clauses |
| Procurement lead | Checks framework compliance |
| Legal adviser | Checks enforceability |
| Senior information risk owner | Accepts residual risk |

### Review points

You must review contracts:

- before supplier selection
- before service go live
- each year during the contract
- after incidents or major supplier change

### Non compliance

If a supplier does not meet requirements, you must follow departmental escalation processes. This may include remediation, suspension or termination.

## Security schedule for framework contracts

You can attach this schedule to framework call off contracts. If there is a conflict, this schedule takes precedence.

| Ref | Requirement | Evidence | Frequency |
|-----|------------|----------|-----------|
| SEC01 | SOC 2 Type II | Report | Annual |
| SEC02 | ISO IEC 27001 | Certificate | Annual |
| SEC03 | Cyber Essentials Plus | Certificate | Annual |
| SEC04 | UK and EU data residency | Written confirmation | Annual |
| SEC05 | No training use of government data | Attestation and configuration | Annual |
| SEC06 | Incident notification within 72 hours | Contract clause | On contract |
| SEC07 | Penetration testing | Report | Annual |
| SEC08 | Data deletion on exit | Deletion certificate | On termination |
| SEC09 | NCSC Cloud Security Principles alignment | Self assessment | Annual |

## Further reading

The Crown Commercial Service's (CCS) [G-Cloud 14](https://www.crowncommercial.gov.uk/agreements/RM1557.14) of the G-Cloud framework provides the procurement framework within which these contract requirements sit.

The UK government's [PPN 011: The Commercial Playbooks](https://www.gov.uk/government/publications/ppn-011-the-commercial-playbooks) provides the procurement framework within which these contract requirements sit.

The NCSC's [Supply chain security guidance](https://www.ncsc.gov.uk/collection/supply-chain-security) covers the broader risk management approach for third-party dependencies.

[Security policies](../security/security-policies.md) covers PS-09 and PS-11.

[Data sovereignty and jurisdiction](../policy/data-sovereignty-and-jurisdiction.md) provides guidance for data residency and retention requirements.

[Model assurance and transparency](model-assurance-and-transparency.md) covers vendor transparency requirements.

[Comparative guidance](../manager-tool-guides/comparative-guidance.md) supports vendor evaluation.

[Risk register template](risk-register-template.md) supports vendor risk documentation.

[DPIA guidance](../policy/dpia-ai-coding-assistants.md) covers data protection requirements.
