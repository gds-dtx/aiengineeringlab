> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Department risk alignment framework

> Reconciling central programme risk tolerance with departmental governance requirements for AI coding assistant adoption.

## Contents

[Purpose and scope](#purpose-and-scope)

[Who this is for](#who-this-is-for)

[The alignment challenge](#the-alignment-challenge)

[Tiered adoption model](#tiered-adoption-model)

[Department risk profile assessment](#department-risk-profile-assessment)

[Controls escalation matrix](#controls-escalation-matrix)

[Governance escalation pathway](#governance-escalation-pathway)

[Consistency across government](#consistency-across-government)

[Worked example](#worked-example)

[Further reading](#further-reading)

## Purpose and scope

The AI Engineering Lab programme operates across multiple government departments. Each department has its own governance structure and risk appetite and security posture. The Department for Science, Innovation and Technology (DSIT) leads the central programme. The central programme adopts an approach appropriate for innovation programmes that supports experimentation. Individual departments may have a lower risk appetite. Operational context or regulatory environment or governance committee requirements create this lower risk appetite.

This document provides a framework for aligning programme guidance with departmental risk appetites. Departments can adopt AI coding assistants at a pace and with controls proportionate to their own governance requirements. This maintains a consistent minimum baseline across government.

---

## Who this is for

This guidance is for:

- departmental Senior Information Risk Owners (SIROs) and governance committees
- AI Security Leads navigating between programme and departmental requirements
- programme leads supporting departments with different risk profiles
- delivery managers planning AI coding assistant rollouts

---

## The alignment challenge

### Different risk appetites across government

Government departments face different risk contexts. These legitimately create different risk appetites for AI coding assistant adoption.

| Factor | Lower risk appetite (example) | Higher risk appetite (example) |
|--------|------------------------------|-------------------------------|
| Data sensitivity | Departments handling large volumes of citizen personal data | Departments working primarily with publicly available data |
| Regulatory environment | Departments under specific regulatory oversight | Departments with standard governance requirements |
| Operational impact | Systems where failure affects citizen welfare directly | Internal productivity tools with limited effect on citizens |
| Political sensitivity | Services subject to frequent public and parliamentary scrutiny | Back office or internal technical services |
| Security classification | Teams working with OFFICIAL-SENSITIVE data routinely | Teams working with OFFICIAL data only |
| Existing governance maturity | Departments with established formal governance processes | Departments with more agile governance approaches |

These differences are legitimate and expected. The programme does not require all departments to adopt the same risk position.

### Experimentation versus operational risk

The programme designs the baseline to make experimentation safe, not to prevent it. Departments running live operational services have different accountability requirements. These create a genuine tension with a programme appetite for rapid adoption.

| Dimension | Experimentation (programme orientation) | Operational (departmental requirement) |
|-----------|----------------------------------------|----------------------------------------|
| Failure tolerance | Higher, as failures generate learning and are recoverable within the programme context | Lower, as failures may harm citizens or breach regulatory obligations or affect service continuity |
| Change pace | Rapid iteration preferred with new tools and approaches piloted quickly | Structured change management is required so new approaches need formal assurance before reaching production |
| Assurance model | Code quality controls are applied at the point of use based on outputs | Formal approval gates are required before changes reach production environments based on processes |
| Governance trigger | Programme senior responsible owner (SRO) and AI Security Lead | Departmental governance committee and SIRO and in some cases the Data Protection Officer (DPO) and legal advisers |

Neither orientation is wrong. They reflect the different accountability contexts of an innovation programme and a department that runs live operational services.

### Programme baseline versus departmental requirements

The programme baseline is defined in the guardrails base configuration. It represents the minimum set of controls that all departments must implement. Departments may add stricter controls but must not weaken the baseline.

| Layer | Controls | Authority |
|-------|----------|-----------|
| Programme baseline | Guardrails base (G-DH, G-CS, G-UB, G-OV, G-MA, G-ET, G-AG series) | AI Engineering Lab programme |
| Department extensions | Additional controls per G-DEPT-XX numbering | Departmental security team with SIRO approval |
| Team level adjustments | Project specific restrictions within departmental framework | Development team lead with departmental approval |

---

## Tiered adoption model

This framework defines 3 adoption tiers. Departments classify themselves based on their risk appetite and governance requirements.

### Tier 1, standard adoption

Tier 1 is appropriate for departments that accept the programme baseline controls as sufficient for their risk context.

| Characteristic | Detail |
|----------------|--------|
| Risk appetite | Aligned with programme baseline |
| Additional controls | None beyond guardrails base |
| Governance approval | Standard departmental approval process |
| Data classification | OFFICIAL only |
| Tool restrictions | No additional restrictions beyond tools approved by the programme |
| Adoption pace | Full programme timeline |

Tier 1 is appropriate for departments where the data environment is primarily OFFICIAL. It is also appropriate where the systems supported are internal or low sensitivity. You should use Tier 1 if the departmental governance committee is comfortable with the programme baseline.

### Tier 2, enhanced controls

Tier 2 is appropriate for departments that require additional controls beyond the programme baseline. Elevated risk factors create this requirement.

| Characteristic | Detail |
|----------------|--------|
| Risk appetite | More conservative than programme baseline |
| Additional controls | Guardrails specific to the department (G-DEPT-XX) |
| Governance approval | Departmental governance committee approval with additional conditions |
| Data classification | OFFICIAL and OFFICIAL-SENSITIVE |
| Tool restrictions | May restrict to specific approved tools or features |
| Adoption pace | Departments may phase adoption with additional approval gates |

Tier 2 is appropriate for departments handling OFFICIAL-SENSITIVE data. It is also appropriate for departments with specific regulatory requirements. You should use Tier 2 if departmental governance committees require additional assurance before approval.

Tier 2 departments commonly add additional controls including:

- restricting AI tool use to specific teams or projects initially
- requiring additional training beyond the programme baseline
- implementing enhanced monitoring of AI tool usage
- requiring periodic security review of AI-generated code beyond standard CI checks
- restricting agentic features to L1 and L2 autonomy levels only

### Tier 3, restricted adoption

Tier 3 is appropriate for departments that require significantly restricted use. The high sensitivity of their operational context drives this requirement.

| Characteristic | Detail |
|----------------|--------|
| Risk appetite | Significantly more conservative than programme baseline |
| Additional controls | Extensive controls specific to the department |
| Governance approval | Formal risk assessment and SIRO approval with conditions |
| Data classification | May include systems adjacent to SECRET environments |
| Tool restrictions | May restrict to specific tools or specific features or specific use cases |
| Adoption pace | Phased with mandatory review at each stage |

Tier 3 is appropriate for departments with systems adjacent to SECRET environments. It is also appropriate for departments under specific national security oversight. You should use Tier 3 if governance committees require formal risk assessment before any AI tool adoption.

Tier 3 departments commonly add additional controls including:

- all Tier 2 controls
- restricting use to non-sensitive codebases only
- requiring self-hosted or UK-sovereign AI solutions
- mandating dual review of all AI-generated code
- prohibiting agentic features above L2
- requiring dedicated security monitoring during AI tool use
- implementing additional data loss prevention controls

---

## Department risk profile assessment

### Self classification criteria

Departments should assess their risk profile across the following dimensions to determine their appropriate tier.

| Dimension | Tier 1 indicator | Tier 2 indicator | Tier 3 indicator |
|-----------|-----------------|-----------------|-----------------|
| Highest data classification in scope | OFFICIAL | OFFICIAL-SENSITIVE | Adjacent to SECRET |
| Citizen data volume | Low or none | Moderate to high | High (including vulnerable populations) |
| Regulatory oversight | Standard | Regulation specific to the sector | National security or law enforcement |
| Political sensitivity | Low | Moderate | High |
| Existing security posture | Standard | Enhanced | Highly restricted |
| Governance committee risk tolerance | Accepts programme baseline | Requires additional assurance | Requires formal risk assessment |

### Classification process

Departments should complete the following steps to determine their tier.

1. Review the classification criteria above against the departmental context.
2. Consult the departmental SIRO and governance committee on risk appetite.
3. Select the tier that matches the highest risk dimension of the department.
4. Document the classification decision with rationale.
5. Submit to the programme team for awareness (not approval because tier selection is a departmental decision).

---

## Controls escalation matrix

The following matrix shows which controls apply at each tier. All tiers include the programme baseline. Higher tiers add additional controls.

| Control area | Tier 1 (standard) | Tier 2 (enhanced) | Tier 3 (restricted) |
|--------------|-------------------|-------------------|---------------------|
| Data handling guardrails | G-DH-01 to G-DH-05 | Baseline plus prohibited data types specific to the department | Baseline plus restricted to non-sensitive codebases |
| Code security | G-CS-01 to G-CS-05 | Baseline plus additional security review | Baseline plus mandatory dual review |
| Autonomy levels permitted | L1 to L5 (with controls per level) | L1 to L4 (L5 requires additional SIRO justification) | L1 to L2 only |
| Training requirements | Programme baseline training | Baseline plus security module specific to the department | Baseline plus enhanced security module and assessment |
| Monitoring | Standard usage logging (G-MA-01) | Enhanced monitoring with anomaly alerting | Real-time monitoring during AI tool use |
| Tool selection | All tools approved by the programme | Restricted to subset approved by the department | Restricted to specific tools after individual assessment |
| Adoption approach | Full rollout per programme timeline | Phased rollout with stage gates | Pilot with mandatory review before expansion |
| Review frequency | Quarterly (G-MA-04) | Monthly | Fortnightly during active adoption |

---

## Governance escalation pathway

### When departments and programme disagree

If a departmental governance committee considers the programme baseline insufficient for their context, the following escalation pathway applies.

1. The department documents specific concerns with the programme baseline.
2. The AI Security Lead works with the programme team to assess whether additional controls address the concerns.
3. If the department and programme agree additional controls, document them as guardrails specific to the department (G-DEPT-XX).
4. If the department requires disproportionate controls, the AI Security Lead escalates to the departmental SIRO and programme SRO.
5. The departmental SIRO has final authority over controls applied within their department. The programme cannot override departmental governance decisions.
6. The department documents decisions and rationale for learning across government.

### Department override authority

Departments retain the authority to:

- add stricter controls beyond the programme baseline at any time
- restrict tool access to specific teams, projects, or use cases
- pause adoption pending resolution of governance concerns
- require additional assurance activities before granting approval
- decline to adopt specific tools that do not meet departmental requirements

Departments do not have the authority to:

- weaken controls below the programme baseline
- bypass mandatory security scanning requirements
- waive human review requirements for AI-generated code
- approve tools for classifications above OFFICIAL-SENSITIVE without separate accreditation

---

## Consistency across government

### Minimum baseline

All departments, regardless of tier, must implement:

- data classification compliance (G-DH-01)
- prohibited data types (G-DH-02)
- mandatory human review of AI-generated code (G-CS-01)
- security scanning in CI pipeline (G-CS-02)
- no AI for cryptographic implementations (G-CS-04)
- incident reporting (PS-07)
- completion of baseline training (PS-06)

These controls are non-negotiable across all tiers and all departments.

### Areas where variation is expected

Areas that vary between departments and tiers should include:

- specific tools selected from the list approved by the programme
- additional prohibited data types beyond the baseline
- autonomy levels permitted for agentic tools
- adoption pace and phasing
- additional monitoring and review requirements
- training modules specific to the department

---

## Worked example

### Department with lower risk appetite

A department handling citizen welfare data has a governance committee that requires formal risk assessment before AI tool adoption.

The assessment outcome shows:

- data classification is OFFICIAL-SENSITIVE (citizen personal data in adjacent systems)
- regulatory environment involves Information Commissioner's Office (ICO) scrutiny on data handling
- governance committee position requires formal risk assessment and additional assurance

Tier classification: Tier 2 (enhanced controls)

Actions taken include:

- department completed risk assessment documenting AI coding assistant risks specific to their context
- department added G-DEPT-01 restricting AI tool use to non-citizen-facing codebases initially
- department added G-DEPT-02 requiring monthly security review of AI-generated code
- department restricted agentic features to L1 and L2 during initial adoption phase
- department implemented phased rollout starting with 2 teams and expanding after 8 week review
- department SIRO formally accepted residual risk with documented conditions
- governance committee approved adoption subject to the conditions above and quarterly review

---

## Further reading

[Guardrails base](guardrails-base.md) covers programme baseline controls and department extension mechanism.

[Security policies](../security/security-policies.md) covers policy framework and governance structure.

[Risk register template](risk-register-template.md) covers risk documentation.

[Maturity assessment framework](../assessment/maturity-assessment-framework.md) covers team readiness assessment.

[Comparative guidance](../manager-tool-guides/comparative-guidance.md) covers tool evaluation framework.

[UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)

[Government Security Classifications](https://www.gov.uk/government/publications/government-security-classifications)

[Government Functional Standard GovS 007: Security](https://www.gov.uk/government/publications/government-functional-standard-govs-007-security)

[HM Treasury Orange Book for risk management](https://www.gov.uk/government/publications/orange-book)
