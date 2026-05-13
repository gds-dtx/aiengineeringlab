> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Data protection impact assessment guidance for AI coding assistants

> Guidance on conducting Data Protection Impact Assessments (DPIAs) for AI coding assistant deployments, including proportionality and necessity analysis under UK GDPR.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[When a DPIA is required](#when-a-dpia-is-required)

[Proportionality and necessity framework](#proportionality-and-necessity-framework)

[Lawful basis analysis](#lawful-basis-analysis)

[Data protection risks specific to AI coding assistants](#data-protection-risks-specific-to-ai-coding-assistants)

[DPIA template for AI coding assistant deployment](#dpia-template-for-ai-coding-assistant-deployment)

[DPO consultation guidance](#dpo-consultation-guidance)

[Further guidance](#further-guidance)

## Purpose

AI coding assistants process data that may include personal data. Prompt content, code context, and metadata are transmitted to AI providers for inference. This processing may engage UK GDPR requirements, particularly where prompts contain or reference personal data.

This document provides:

- guidance on when a DPIA is required for AI coding assistant use
- a framework for demonstrating proportionality and necessity
- analysis of lawful basis for processing
- a prepopulated DPIA template for departments to complete
- guidance on consulting the data protection officer (DPO)

## Who this is for

This guidance is for:

- Data protection officers (DPOs) advising on AI coding assistant deployments
- AI security leads preparing governance documentation
- Senior Information Risk Owners (SIROs) approving AI tool adoption
- legal and compliance teams assessing GDPR implications

## When a DPIA is required

### UK GDPR Article 35 triggers

A DPIA is required when processing is likely to result in a high risk to the rights and freedoms of individuals. For AI coding assistants, the following scenarios may trigger the requirement.

| Scenario | DPIA likely required | Rationale |
|----------|---------------------|-----------|
| Development teams working on systems that process citizen personal data, where code context may contain data structures, schemas, or sample data referencing Personally Identifiable Information (PII) | Yes | Personal data may be included in prompts sent to AI providers |
| Development teams working on anonymised or synthetic data only, with no PII in code or comments | Unlikely, but assessment should still be documented | Low risk, but new technology factor may still apply |
| Development teams using AI tools with enterprise agreements that contractually exclude data retention | Recommended as good practice | Reduced risk, but international transfer considerations remain |
| Any use of AI coding assistants where prompt data is transmitted to a non-UK jurisdiction | Yes | International transfer of potentially personal data |

### ICO criteria for DPIA requirement

The Information Commissioner's Office (ICO) identifies criteria that indicate when a DPIA is needed. The following criteria are relevant to AI coding assistant use.

| ICO criterion | Applicability to AI coding assistants |
|---------------|---------------------------------------|
| New technologies | Yes, because AI coding assistants are a new technology in government development |
| Automated decision-making | Generally no, AI coding assistants suggest code but do not make decisions about individuals, but this criterion may apply to the wider system if AI-generated code is used in automated decision-making systems |
| Large-scale processing | Depending on context, such as many developers submitting prompts containing personal data, which could constitute large-scale processing |
| Systematic monitoring | Generally no, unless AI tool usage logging constitutes monitoring of employees |

Even where a formal DPIA is not strictly required, conducting one is recommended as good practice for AI coding assistant deployments. This demonstrates accountability and supports governance approval.

## Proportionality and necessity framework

### The proportionality argument

UK GDPR requires that processing of personal data is proportionate to the legitimate aim pursued. For AI coding assistants, the proportionality argument considers whether the benefits justify the data protection risks.

Proportionality is supported by:

- AI coding assistants, which improves developer productivity, enabling faster delivery of government digital services to citizens
- improved code quality and security testing, which reduces the risk of vulnerabilities in citizen-facing systems
- the programme implementing comprehensive guardrails (G-DH-01 through G-DH-05), which minimises personal data exposure
- enterprise licensing agreements, which provides contractual protection for data handling

Arguments that governance committees may raise against proportionality include:

Governance committees may have an issue with the proportionality argument if:

- personal data is transmitted to third-party providers outside departmental control
- data is processed in non-UK jurisdictions
- the degree of personal data exposure is dependent on individual developer behaviour, which is variable
- vendor data handling practices are not fully transparent

### Necessity test

The necessity test asks whether the same objective could be achieved with less intrusive processing of personal data.

| Alternative | Assessment |
|-------------|------------|
| Do not use AI coding assistants | Achieves zero data processing risk but sacrifices significant productivity and quality benefits, which is not proportionate where guardrails adequately mitigate risk |
| Use self-hosted AI models only | Eliminates data transfer to third parties, though current self-hosted models are significantly less capable, which may still be appropriate for Tier 3 departments |
| Restrict AI use to codebases with no personal data | Reduces risk but limits the benefit of AI tools which may be appropriate as an initial adoption measure |
| Use AI tools with enterprise agreements and guardrails | Balances productivity benefits with data protection controls, which is the approach adopted by this programme |

### Proportionality evidence template

Departments should complete the following template to document their proportionality assessment.

| Element | Department response |
|---------|---------------------|
| Legitimate aim | Improving developer productivity and code quality for government digital services |
| Necessity | AI coding assistants provide capabilities not achievable through alternative means at comparable cost and speed |
| Data minimisation measures | Guardrails G-DH-01 to G-DH-05 prohibit personal data in prompts, with training completed by all users and pre-commit scanning for secrets |
| Safeguards | Enterprise licensing, contractual data handling terms, security scanning and human code review |
| Balancing test outcome | Benefits to government service delivery outweigh residual data protection risks given the safeguards in place |
| Less intrusive alternatives considered | Self-hosted models (insufficient capability), restricted use (disproportionate limitation) and no use (disproportionate to aim) |
| Residual risk | Variable developer behaviour may result in incidental personal data in prompts despite guardrails which can be mitigated with training, monitoring and incident response |

## Lawful basis analysis

### Identifying the lawful basis

For AI coding assistant use in government, the most likely lawful bases under UK GDPR Article 6 are as follows.

| Lawful basis | Applicability | Assessment |
|-------------|---------------|------------|
| Article 6(1)(e), public task | Primary basis for most government departments | Processing is necessary for the performance of a task carried out in the public interest, government digital service delivery is a public task, and AI tools that improve this delivery support the public task |
| Article 6(1)(f), legitimate interests | Alternative basis where public task does not apply | The organisation has a legitimate interest in improving developer productivity which must be balanced against data subject rights |
| Article 6(1)(a), consent | Not appropriate | Consent is not freely given in an employment context which is not recommended as the lawful basis |

### Controller and processor roles

| Role | Entity | Basis |
|------|--------|-------|
| Data controller | The government department using the AI coding assistant | The department determines the purposes and means of processing |
| Data processor | The AI coding assistant vendor (like GitHub, Anthropic, AWS or Google) | The vendor processes data on instructions from the department via the tool |

The department must have a Data Processing Agreement (DPA) in place with each AI coding assistant vendor before use. The DPA must cover the requirements in Article 28 of UK GDPR.

## Data protection risks specific to AI coding assistants

### Risk assessment

| Risk | Likelihood | Impact | Mitigation | Residual risk |
|------|------------|--------|------------|---------------|
| Personal data included in prompts by developers | Medium | Medium | G-DH-02 (prohibited data types), G-DH-04 (prompt hygiene), PS-06 (training) | Low to medium |
| Prompt data retained by vendor beyond necessary period | Low (with enterprise agreement) | Medium | Contractual retention limits, vendor DPA | Low |
| Prompt data used for model training | Low (with enterprise agreement) | High | Contractual prohibition, opt-out configuration, vendor attestation | Low |
| International transfer of prompt data to non-adequate jurisdiction | Medium | Medium | Standard contractual clauses (SCCs), adequacy assessment, vendor region configuration | Low to medium |
| Inability to respond to data subject access request for data held by vendor | Low | Low | Vendor contractual obligation to support data subject rights | Low |
| Re-identification of anonymised data by AI model | Very low | Medium | G-DH-04 (use synthetic data), model limitations make re-identification unlikely | Very low |

### Data minimisation

The programme's guardrails implement data minimisation by design.

| Guardrail | Description |
|-----------|-------------|
| G-DH-02 | Prohibits personal data in prompts |
| G-DH-04 | Requires anonymised or synthetic data in examples |
| G-DH-03 | Requires verification that repositories do not contain embedded personal data |
| G-DH-05 | Requires new sessions when switching contexts to prevent data accumulation |

These controls mean that personal data processing should be incidental rather than systematic. Where personal data is inadvertently included in prompts, the incident response playbook provides procedures including ICO notification assessment.

### International transfers

Where AI coding assistant vendors process data outside the UK, the department must ensure that adequate safeguards are in place for international data transfers under UK GDPR Chapter V.

| Transfer mechanism | When applicable |
|--------------------|-----------------|
| UK adequacy decision | Where the destination country has a UK adequacy decision |
| Standard Contractual Clauses (SCCs) | Where no adequacy decision exists which is common for US based providers |
| Supplementary measures | Where SCCs alone may not provide adequate protection which is required for US providers subject to Foreign Intelligence Surveillance Act (FISA) Section 702 |

For further information on jurisdiction and international transfers, see this programme's guidance on [data sovereignty and jurisdiction](data-sovereignty-and-jurisdiction.md).

## DPIA template for AI coding assistant deployment

Departments should complete the following templates. Fields marked with an asterisk are mandatory.

### Section 1: processing description

| Field                                 | Response      |
|---------------------------------------|---------------|
| Department name*                      | [description] |
| AI coding assistant tool(s) in scope* | [description] |
| Vendor(s)*                            | [description] |
| Number of users*                      | [number]      |
| Data processing location(s)*          | [description] |
| Date of assessment*                   | [date]        |
| DPO consulted*                        | [yes or no]   |

### Section 2: nature of processing

| Field                                | Response |
|--------------------------------------|----------|
| What personal data may be processed* | [code context that may reference data structures containing personal data fields, developer metadata (usernames, activity logs)] |
| How is personal data collected*      | [incidentally, through code context included in prompts, developer metadata collected automatically by the tool] |
| How is personal data used*           | [processed by AI model for inference (code generation), not used for model training (enterprise agreement)] |
| Who has access to the data*          | [AI vendor (as processor) and department security team (usage logs)] |
| Data retention period*               | [prompts retained for [vendor retention period]. Usage logs retained for (department policy)] |


### Section 3: necessity and proportionality

| Field | Response |
|-------|----------|
| Lawful basis* | [Article 6(1)(e) public task or Article 6(1)(f) legitimate interests] |
| Purpose of processing* | [improving developer productivity and code quality for government digital service delivery] |
| Is the processing necessary for this purpose* | [Yes, and see necessity test in this guidance document] |
| Is the processing proportionate* | [Yes, and see proportionality evidence template in this guidance document] |
| Less intrusive alternatives considered* | [see necessity test table in this guidance document] |

### Section 4: risks and mitigations

| Risk | Likelihood | Severity | Mitigation | Residual risk |
|------|------------|----------|------------|---------------|
| Personal data in prompts | [low, medium or high] | [low, medium or high] | [G-DH-02, G-DH-04, PS-06 training] | [low, medium or high] |
| Data retention by vendor | [low, medium or high] | [low, medium or high] | [contractual terms, DPA] | [low, medium or high] |
| International transfer | [low, medium or high]| [low, medium or high] | [SCCs, supplementary measures] | [low, medium or high] |
| Vendor breach | [low, medium or high] | [low, medium or high] | [PS-07 incident response, vendor breach notification clause] | [low, medium or high] |
| [Department specific risks] | [low, medium or high]| [low, medium or high]| [description] | [low, medium or high] |

### Section 5: approval

| Field                  | Response      |
|------------------------|---------------|
| DPO recommendation     | [description] |
| SIRO decision          | [description] |
| Conditions of approval | [description] |
| Review date            | [date]        |

## DPO consultation guidance

### When to consult the DPO

Consult the departmental DPO:

- before deploying any AI coding assistant tool
- when changing the AI tool or vendor
- when expanding use to teams handling personal data
- after any incident involving personal data exposure to an AI tool
- when vendor terms or data handling practices change

### Information to provide to the DPO

When consulting the DPO, you must provide:

- a completed DPIA template as detailed in sections 1 to 4
- a vendor DPA
- vendor privacy policy and trust centre documentation
- programme guardrails applicable to the deployment
- department specific guardrails if applicable
- incident response procedures for data exposure

## Further guidance

Use the following sources when completing the DPIA and related governance steps.

| Assessment | Source | How to apply  |
|---|---|---|
| Determine whether a DPIA is required and how to structure it | [ICO Guide to Data Protection Impact Assessments](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/) | Use ICO trigger criteria, process steps, and documentation expectations to evidence the DPIA decision. |
| Assess lawful basis where public task does not apply | [ICO Legitimate Interests Assessment guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/legitimate-interests/) | Complete and record a Legitimate Interests Assessment (purpose, necessity, and balancing test). |
| Confirm legal basis and statutory obligations | [UK GDPR](https://www.legislation.gov.uk/eur/2016/679/contents) and [Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents) | Validate controller/processor roles, Article 6 basis, Article 28 processor terms, and data subject rights obligations. |
| Align with public sector AI delivery expectations | [UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government) | Cross-check delivery, assurance, procurement, and responsible AI practices for government deployments. |
| Align risk and management controls | [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and [ISO/IEC 42001:2023 AI Management System](https://www.iso.org/standard/81230.html) | Map technical and organisational controls to recognised AI risk and management system practices. |
