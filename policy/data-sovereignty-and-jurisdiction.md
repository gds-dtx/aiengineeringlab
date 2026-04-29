> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Data sovereignty and jurisdiction

> UK government position on data sovereignty, CLOUD Act exposure, data residency, retention, and secondary use for AI coding assistant inference services.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[UK data sovereignty position](#uk-data-sovereignty-position)

[US jurisdiction and CLOUD Act exposure](#us-jurisdiction-and-cloud-act-exposure)

[UK sovereign processing](#uk-sovereign-processing)

[Data residency requirements](#data-residency-requirements)

[Data retention requirements](#data-retention-requirements)

[Secondary use prohibitions](#secondary-use-prohibitions)

[Vendor compliance assessment](#vendor-compliance-assessment)

[Further reading](#further-reading)

## Purpose

AI coding assistants transmit prompt data to cloud-based inference services. US-headquartered providers predominantly operate these services. This creates jurisdiction, sovereignty, and data handling questions that government departments must address before adoption.

This document defines:

- UK government's position on data sovereignty for AI inference (not model training or research and development)
- a legal analysis of US jurisdiction and the CLOUD Act, including how it applies to inference services and available mitigations
- requirements for data residency, retention, and secondary use
- when UK sovereign processing is required versus desirable
- vendor compliance assessment criteria

This document is intended both as implementation guidance for assurance teams and as material suitable for governance board risk approval.

## Who this is for

This guidance is for:

- Senior information risk owners (SIROs)
- AI security leads and architects
- Data protection officers (DPOs)
- Procurement and commercial teams
- Governance and assurance boards

## UK data sovereignty position

### Government position statement

The AI Engineering Lab programme acknowledges that current AI coding assistant inference services are predominantly provided by US-headquartered companies. Complete UK sovereign processing for AI inference is not currently available at equivalent capability for all tools. 

UK or European Economic Area (EEA) data residency is the minimum requirement for government AI coding assistant use at OFFICIAL classification. International transfers of personal data must be assessed in accordance with UK GDPR Chapter V and current ICO guidance.

UK sovereign processing is strongly preferred where available and should normally be required for OFFICIAL SENSITIVE data.

US jurisdiction exposure, including CLOUD Act risk, must be assessed, documented, and explicitly accepted by the departmental SIRO before tool approval.

This position aligns to the NCSC Cloud Security Principles, in particular Principle 2 (asset protection and resilience), which requires consideration of physical location and legal jurisdiction.

## US jurisdiction and CLOUD Act exposure

### What the CLOUD Act is

The Clarifying Lawful Overseas Use of Data Act (CLOUD Act) is a US federal law enacted in 2018. It amended the US Stored Communications Act to require covered US service providers to disclose electronic data in their possession, custody, or control in response to lawful US court orders, regardless of where that data is physically stored.

The Act also introduced a comity mechanism allowing providers to challenge orders that conflict with foreign law in certain circumstances.

### How the CLOUD Act applies to AI inference services

AI coding assistants process prompt content, code context, and related metadata to deliver inference responses. Where the provider is US-headquartered, this data may be considered under the provider's possession, custody, or control.

As a result, hosting inference workloads in UK or EEA regions reduces data residency risk but does not eliminate exposure to US legal process under the CLOUD Act.

### Relationship to the UK US Data Access Agreement

The UK US Bilateral Data Access Agreement (signed 2019, in force 2022) establishes a reciprocal framework for law enforcement access to electronic data for serious crime investigations. It does not remove CLOUD Act exposure, but provides additional safeguards and procedural structure for cross-border requests.

### Risk assessment for government use
| Risk factor | Assessment |
|------------|------------|
| Likelihood | Generally low for typical development prompts, or higher where sensitive operational or security-relevant content is included |
| Impact | Low for public or non-sensitive code, or higher for infrastructure, security logic, or incident-related data |
| Mitigations | Prompt hygiene, data minimisation, no classified data, enterprise contracts, encryption, retention limits |
| Residual risk | Low to medium for OFFICIAL, or medium for OFFICIAL SENSITIVE without UK sovereign processing |

### Government position on CLOUD Act risk

For OFFICIAL data, CLOUD Act risk may be accepted where appropriate guardrails are in place and the SIRO records explicit acceptance.

For OFFICIAL SENSITIVE data, additional justification is required and UK sovereign processing should be used where proportionate and available.

Vendor contracts must include commitments to challenge over-broad legal requests, provide notification where legally permitted, and prohibit secondary use of government data.

## UK sovereign processing

### Current state of UK sovereign AI inference

### Current state
UK sovereign AI inference is available primarily through self-hosted or government-hosted open-source models. Commercial tools provided by US vendors may offer UK regional hosting but remain subject to US jurisdiction.

### When UK sovereign processing is required

| Classification | Requirement |
|---------------|-------------|
| OFFICIAL | Preferred but not mandatory |
| OFFICIAL SENSITIVE | Strongly recommended, with SIRO risk acceptance required if not used |
| SECRET and above | Mandatory (AI coding assistants out of scope) |

### Roadmap

The programme will monitor UK-based providers, open-source model maturity, and government cloud offerings to expand UK sovereign options over time.

## Data residency requirements

### Mandatory requirements by classification

| Classification | Processing | Storage | Backup |
|----------------|--------------------|--------------------|-----------------|
| OFFICIAL | UK or EEA | UK or EEA | UK or EEA |
| OFFICIAL SENSITIVE | UK preferred or EEA with SIRO approval | UK preferred or EEA with SIRO approval | UK only |

See [AI code assistant data residency](../manager-tool-guides/data-residency.md) for detailed information on geographic location where data is stored and processed.

### Approved jurisdictions

Approved jurisdictions for personal data are the UK, EEA, and countries covered by UK adequacy regulations. Transfers to the US are permitted only where the recipient participates in the UK Extension to the EU US Data Privacy Framework and all controls in this guidance are met.

### Verification process

1. Obtain written confirmation of processing and storage locations.
2. Review data processing agreements and sub-processor lists.
3. Verify regional configuration and contractual commitments.
4. Record evidence in the approval decision.
5. Reverify annually.

## Data retention requirements

### Maximum retention periods

| Data type | Maximum retention |
|----------|-------------------|
| Prompt content | 30 days or less |
| Inference responses | 30 days or less |
| Usage metadata | 12 months |
| Error logs | 90 days |

### Contractual minimums

Contracts must specify retention limits, automated deletion, right to early deletion, deletion on contract termination, and audit or certification of deletion.

## Secondary use prohibitions

Government prompt data must not be used for model training, fine-tuning, benchmarking, or product improvement beyond delivering the contracted service.

Contracts must include explicit prohibitions and audit rights.

## Vendor compliance assessment

### Assessment criteria

| Area | Requirement |
|------|------------|
| Data location | UK/EEA confirmed |
| CLOUD Act | Risk assessed and accepted |
| Retention | Within defined limits |
| Secondary use | Prohibited |
| Deletion | Automated and verifiable |
| Sub-processors | Fully disclosed |
| NCSC principles | Evidence of alignment |

### Non-compliance

Non-compliance may result in corrective action, suspension of use, or contract termination depending on severity.

## Further reading

[Security policies](../policy) covers PS-02 (data classification), PS-09 (third-party and supply chain), and PS-11 (tool-type-specific requirements).

[Data Protection Impact Assessment (DPIA)](dpia-ai-coding-assistants.md) covers international transfer assessment.

[Guardrails base](../governance/guardrails-base.md) covers G-DH-01 to G-DH-05 (data handling controls).

[Threat model](../policy) covers T-CH-02 (data residency violation).

[Risk register template](../governance/risk-register-template.md) covers RISK-SEC-03 (data residency and sovereignty).

[Vendor contract security requirements](../governance/vendor-contract-security-requirements.md) covers contractual clauses.

[Comparative guidance](../manager-tool-guides/comparative-guidance.md) covers vendor evaluation Category 1.

[UK GDPR Chapter V](https://www.legislation.gov.uk/eur/2016/679/chapter/V)

[ICO International Transfers](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-guide-to-international-transfers)

[NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security)

[UK-US Data Access Agreement](https://www.gov.uk/government/publications/uk-us-data-access-agreement-factsheet)

[US CLOUD Act](https://www.congress.gov/bill/115th-congress/senate-bill/2383)

[Data Protection Act](https://www.legislation.gov.uk/ukpga/2018/12/contents)

[UK GDPR](https://www.legislation.gov.uk/eur/2016/679/contents)
