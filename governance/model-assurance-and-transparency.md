> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Model assurance and transparency

> Vendor transparency requirements, model update governance, and independent assurance framework for AI coding assistants used in UK government.

## Purpose and scope

This document establishes requirements for assuring the artificial intelligence (AI) models that underpin coding assistants used across government. AI models are opaque by nature. Government departments cannot inspect model weights, audit training data, or independently verify how a model produces its outputs. This opacity creates a governance challenge that this document addresses.

This document defines:

- vendor transparency requirements for model training and updates
- model update governance and change management
- independent assurance approaches where direct inspection is not possible
- how to treat the AI model as a supply chain dependency

---

## Who this is for

This guidance is for:

- Senior information risk owners (SIROs) accepting residual risk from model opacity
- AI security leads conducting vendor assessments
- security teams evaluating AI coding assistant deployments
- procurement teams drafting vendor contracts

---

## The assurance problem

AI coding assistants depend on large language models (LLMs), so they present unique assurance challenges. This means that, unlike traditional software dependencies, the government cannot audit AI models through conventional means.

AI models function as unassured code dependencies in the software supply chain. An AI model introduces code patterns into government systems through a process that government cannot independently inspect. This is unlike a software library that can be pinned, scanned, and audited. This is an explicit limitation acknowledged in the [National Cyber Security Centre (NCSC) Principles for the Security of Machine Learning](https://www.ncsc.gov.uk/files/Principles-for-the-security-of-machine-learning.pdf), particularly lifecycle phase 2 (model development and training). The consuming organisation has no visibility into how a vendor built the model. They also cannot see what data it was trained on. They cannot determine what biases or vulnerabilities may have been introduced during training.

The following characteristics distinguish AI models from traditional software components:

| Characteristic | Traditional software dependency | AI model dependency |
|----------------|--------------------------------|---------------------|
| Source code inspection | Available (open source) or auditable | Not available because weights are not human-readable |
| Deterministic behaviour | Same input produces same output | Same input may produce different output |
| Change control | Pinned to a version, changelog available | Models updated without notice so behaviour may shift |
| Vulnerability scanning | Common Vulnerabilities and Exposures (CVE) databases, static analysis | No equivalent scanning capability |
| Independent audit | Code review, penetration testing | Limited to output testing and vendor attestation |
| Supply chain documentation | Software Bill of Materials (SBOM) | Machine Learning Bill of Materials (ML-BOM) is emerging but immature |

These characteristics mean that government cannot apply standard software assurance practices to AI models. This document establishes alternative assurance approaches proportionate to this limitation, addressing the gaps in independent assurance that exist across NCSC ML Security Principles lifecycle phases 2 (model development and training) and 5 (model monitoring and update).

---

## Vendor transparency requirements

### Minimum transparency expectations

AI coding assistant vendors must provide the following information to support government assurance activities. These requirements operationalise Policy Statement PS-09 (third-party and supply chain security). This mandates that AI provider supply chains are assessed and managed before and during deployment.

| Category | Requirement | Verification method |
|----------|-------------|---------------------|
| Training data | Disclosure of training data sources at a category level, such as public code repositories, licensed datasets, or proprietary data | Vendor attestation and contract terms |
| Training data opt-out | Confirmation that government prompt data is excluded from model training pipelines, with enterprise licence configuration to enforce this | Contractual clause, enterprise licence configuration, and annual vendor attestation |
| Data handling | Confirmation of whether vendors use government prompt data for model training or improvement | Contractual clause and vendor data processing agreement (DPA) |
| Model versioning | Notification of model version changes that affect behaviour (see model update governance for full notification requirements) | Vendor release notes or changelog (see model update governance) |
| Security certifications | Current security certifications such as Service Organisation Control (SOC) 2 Type II, International Organization for Standardization (ISO) 27001, or Cyber Essentials Plus | Certificate verification, annual renewal check |
| Incident disclosure | Disclosure of security incidents affecting model integrity or customer data | Contractual breach notification clause |
| Sub-processor disclosure | Identification of third parties involved in model training, hosting, or inference | Vendor DPA and sub-processor list |

### Training data assurance

Government cannot verify the contents of AI model training data directly. The following compensating controls apply.

Vendors must confirm in writing:

- whether vendors exclude government code submitted via prompts from training data
- whether enterprise licence tiers provide stronger data isolation than standard tiers
- what anonymisation or differential privacy techniques vendors apply to training pipelines
- whether training data includes content subject to export controls or classification restrictions

Where vendors cannot provide adequate transparency on training data, the AI security lead must document this as a residual risk in the risk register. The SIRO must accept this risk before approving the tool.

### Data handling attestation

Vendors must provide an annual attestation confirming:

- prompt data retention periods and deletion practices
- whether vendors use prompt data for any secondary purpose including model improvement
- data residency for inference processing and any data at rest
- encryption standards for data in transit and at rest

---

## Model update governance

### The update challenge

AI model updates differ from traditional software patches. A model update can change the behaviour of code suggestions without any visible change to the tool interface. This creates governance challenges.

Changes that may occur during a model update include:

- altered code generation patterns affecting security posture
- different dependency recommendations
- changed handling of sensitive patterns such as authentication or cryptography
- modified compliance with coding standards
- shifts in language or framework preferences

### Change notification requirements

Vendors must notify government customers of model changes according to the following schedule.

| Change type | Notification requirement | Minimum notice |
|-------------|--------------------------|----------------|
| Major model replacement, such as moving from one model family to another | Written notification to AI security lead | 30 days before change |
| Significant model update affecting code generation behaviour | Notification via release notes or changelog | 14 days before change |
| Minor model update, such as bug fixes or safety improvements | Notification via release notes | At time of change |
| Emergency security patch to the model | Notification as soon as practicable | Within 24 hours |

Where vendors do not provide adequate change notification, the AI security lead must assess whether the tool remains suitable for government use.

### Version pinning and rollback

Where the AI coding assistant platform supports version pinning, government deployments should:

- pin to a specific model version during active development sprints
- test new model versions in a non-production context before adoption
- maintain the ability to roll back to a previous model version if teams identify issues

Where version pinning is not available, document this as a residual risk. Compensating controls include increased code review scrutiny after known model updates.

### Regression testing after model updates

After a significant model update, teams should verify:

- code generation quality has not degraded
- patterns sensitive to security such as authentication and input validation remain appropriate
- dependency recommendations continue to reference maintained, secure packages
- compliance with departmental coding standards is maintained

---

## Independent assurance framework

### What can be independently verified

Despite model opacity, the following aspects can be independently assessed.

| Assurance activity | Method | Frequency |
|-------------------|--------|-----------|
| Output quality | Review of AI-generated code against coding standards | Ongoing as part of development |
| Security of output | Static application security testing (SAST) of generated code | Every commit, via Continuous Integration (CI) pipeline |
| Dependency safety | Software composition analysis (SCA) of suggested dependencies | Every commit, via CI pipeline |
| Vendor security posture | Review of SOC 2 Type II report, ISO 27001 certificate | Annually |
| Data handling compliance | Review of vendor DPA and sub-processor list | Annually and on change |
| Contractual compliance | Audit of vendor against contractual security obligations | Annually |

### What cannot be independently verified

The following aspects of AI models cannot currently be independently verified by government.

| Aspect | Why verification is not possible | Compensating control |
|--------|----------------------------------|---------------------|
| Training data contents | Proprietary and not disclosed at an item level | Vendor attestation and contractual terms |
| Model weights and architecture | Trade secret that is not inspectable | Testing based on output and vendor certifications |
| Inference processing logic | Opaque neural network operations | Treat output as untrusted and apply standard security controls |
| Real-time model behaviour changes | No external observability into model state under NCSC ML Security Principles lifecycle phase 5 | Monitor output quality trends over time |
| Data isolation between tenants | Internal architecture not visible | Enterprise licensing, vendor attestation, contractual guarantee |

### Residual risk acceptance

The SIRO must formally accept the residual risk arising from model opacity. The risk acceptance should document:

- the specific aspects of the AI model that cannot be independently assured
- the compensating controls in place as listed in this document
- the conditions under which the SIRO should review risk acceptance, such as a vendor security incident or a significant model change
- the review frequency, which should be at minimum annually

---

## AI model as supply chain dependency

### Framing the risk

AI models function as unassured code dependencies in the software supply chain. Unlike traditional dependencies that can be pinned to a version, scanned, and audited, AI models introduce code patterns into government systems. They lack the same level of supply chain assurance.

The NCSC Supply Chain Security guidance requires organisations to understand the risks that suppliers introduce. Organisations must establish what controls suppliers have in place. They must know where data is and how it is protected. The table below maps these NCSC principles to the controls in this document.

| NCSC supply chain principle | Application to AI models | Controls in this document |
|-----------------------------|--------------------------|---------------------------|
| Understand the risks that suppliers introduce | AI models may contain poisoned training data, backdoors, or unpredictable post-update behaviour (documented in T-SC-02 and T-SC-03) | Assurance problem framing and residual risk acceptance by SIRO |
| Establish what controls suppliers have in place | Government cannot inspect model weights or training pipelines directly so vendor certifications and attestations are the primary assurance mechanism | Vendor transparency requirements, vendor security certifications, and data handling attestation |
| Know where your data is and how it is protected | Prompt data sent to AI providers for inference must be accounted for, with residency, retention, and secondary use controls contractually specified | Data handling attestation and vendor contract security requirements |

These threat scenarios, T-SC-02 (compromised AI provider) and T-SC-03 (model poisoning), represent the primary supply chain risks arising from dependence on AI models. The compensating controls documented in this section, together with the vendor transparency requirements and independent assurance framework, are the principal mitigations for both threats.

### Machine Learning Bill of Materials

Where available, government should request an ML-BOM from AI coding assistant vendors. An ML-BOM should include:

- model name, version, and provider
- training data categories (not individual items)
- fine-tuning data sources if applicable
- known limitations and failure modes
- licensing terms for model outputs
- security testing results or certifications

Where vendors cannot provide an ML-BOM, the AI security lead should document the available information and note the gap.

### Supply chain risk mitigations

The following mitigations reduce supply chain risk from AI model dependencies:

- treat all AI-generated code as untrusted external input requiring review (G-CS-01)
- apply the same security scanning to AI-generated code as to human-written code (G-CS-02)
- verify all AI-suggested dependencies before use (G-CS-03)
- prohibit AI-generated code in areas critical to security such as cryptography and authentication (G-CS-04)
- maintain the capability to develop without AI tools to prevent single point of failure dependency
- assess multiple AI tools to avoid vendor lock-in (comparative guidance)

---

## Assurance activities summary

| Activity | Frequency | Owner | Scope |
|----------|-----------|-------|-------|
| Vendor security certification review | Annually | AI security lead | SOC 2, ISO 27001, Cyber Essentials |
| Vendor DPA and sub-processor review | Annually and on change | AI security lead | Data handling, residency, secondary use |
| Model update impact assessment | Per significant update | AI security lead | Output quality, security patterns |
| Output quality monitoring | Monthly | Development team leads | Code review findings, SAST results |
| ML-BOM request and review | Annually | AI security lead | Model provenance documentation |
| Residual risk review | Annually | SIRO | Risk acceptance for model opacity |
| Contractual compliance audit | Annually | AI security lead with procurement | Vendor obligations met |

---

## Further reading

The [NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security) provide relevant guidance on assuring cloud-hosted AI services, including data handling and supply chain controls. The [UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government) sets out the broader policy context for AI adoption across the public sector. For risk management frameworks applicable to AI systems, the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) provide internationally recognised standards. The [OWASP LLM Top 10 (2025)](https://genai.owasp.org/llm-top-10/) covers the most critical security risks specific to large language model applications.
