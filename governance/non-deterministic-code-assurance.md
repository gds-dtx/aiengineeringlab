> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Non-deterministic code assurance

> Governance position and assurance approaches for managing the non-deterministic nature of AI-generated code in UK government.

## Purpose and scope

AI coding assistants produce non-deterministic output. The same prompt submitted at different times may produce different code. This characteristic undermines traditional approaches to reproducibility, audit evidence, and formal assurance.

This document establishes:

- the governance position on how teams handle non-determinism in AI-generated code
- mitigations to improve reproducibility where possible
- assurance approaches that work with non-deterministic outputs
- evidence gathering requirements for audit and compliance

---

## Who this is for

This guidance is for:

- security teams conducting assurance of AI-assisted development
- development team leads responsible for code quality and compliance
- auditors reviewing AI-assisted software delivery
- governance committees assessing AI coding assistant adoption

---

## The reproducibility challenge

### Why AI code generation is non-deterministic

AI coding assistants use large language models that produce output through probabilistic token selection. Several factors contribute to this non-deterministic behaviour.

| Factor | Description | Impact on reproducibility |
|--------|-------------|--------------------------|
| Temperature setting | Controls randomness in token selection where higher values produce more varied output | Direct because higher temperature means less reproducible output |
| Sampling strategy | Top-k, top-p, and nucleus sampling introduce controlled randomness | Direct because different sampling may select different tokens |
| Model version changes | Vendors update models, changing internal weights and behaviour | Significant because the same prompt on a new model version may produce different code |
| Context window contents | Surrounding code, open files, and session history influence output | Moderate because different context produces different suggestions |
| Infrastructure variations | Load balancing across graphics processing unit (GPU) clusters may produce subtle differences | Minor and usually negligible but not zero |
| Factors based on time | Some providers route to different model instances based on load | Minor and can produce variation between identical requests |

---

## Impact on formal assurance

Traditional software assurance relies on reproducibility. If a build is reproducible, auditors can verify that the deployed code matches the reviewed code. AI-generated code breaks this assumption.

As a result, assurance is impacted because:

- audit evidence cannot demonstrate that a specific prompt will always produce the same code
- regression testing of the AI tool itself is not possible in the traditional sense
- change control processes cannot predict the effect of model updates on code output
- compliance evidence based on process alone is insufficient because the process does not guarantee a specific output

---

## Mitigations for reproducibility

Whilst you cannot eliminate non-determinism, the following measures reduce variability and improve consistency.

### Tool configuration

Where the AI coding assistant platform supports configuration, teams should apply the following settings.

| Setting | Recommended configuration | Effect |
|---------|--------------------------|--------|
| Temperature | Set to lowest available value for production code generation | Reduces randomness in output |
| Model version | Pin to a specific version where supported | Prevents variation from model updates |
| Seed parameter | Set a fixed seed where supported | May improve reproducibility for identical prompts |
| System instructions | Use instruction files for the repository to standardise patterns | Reduces variation in coding style and patterns |

Not all AI coding assistants expose these settings. Where settings are not available, teams should document this and rely on controls based on output.

### Session context management

Consistent context improves output consistency. Teams should:

- use repository instruction files, such as the [AI code assistant instructions playbook](../playbooks/ai-code-assistant-instructions.md), to provide consistent project context
- start new sessions for distinct tasks to avoid context contamination
- provide explicit requirements in prompts rather than relying on implicit context
- document the model and version used when generating significant code sections

---

## Assurance approaches for non-deterministic output

You cannot reproduce the generation process, so assurance shifts from process to output. Passing mandatory quality gates becomes the functional equivalent of reproducibility. If committed code passes all required checks, it is assured regardless of how it was generated. This is what makes non-determinism manageable in practice. You do not eliminate variability in generation, but you control what gets committed.

### Assurance based on output

The following assurance controls apply to all AI-generated code.

| Assurance control | Purpose | Requirement |
|-------------------|---------|-------------|
| Human code review (G-CS-01) | Verify code correctness, security, and standards compliance | Mandatory before merge |
| Static analysis (G-CS-02) | Detect security vulnerabilities automatically | Mandatory in Continuous Integration (CI) pipeline |
| Dependency scanning (G-CS-02) | Verify suggested dependencies are safe | Mandatory in CI pipeline |
| Secret detection (G-CS-02) | Prevent credential exposure | Mandatory as pre-commit hook |
| Automated testing | Verify code behaves as intended | Mandatory. Tests must pass before merge |
| Security testing | Verify security controls function correctly | Required for code that is sensitive to security |
| Hallucination detection (G-OV-04) | Identify references to packages that do not exist, fabricated APIs, or invented configuration options | Applied during code review and automated scanning |

### Code review as the primary assurance artefact

The code review record serves as the primary evidence that reviewers have assessed AI-generated code for quality and security. For code review to function as a valid assurance artefact, the following conditions must apply.

The reviewer must:

- understand what the code does and confirm it meets requirements
- verify that no obvious security vulnerabilities are present
- confirm that the code follows departmental coding standards
- check that tests are meaningful and cover the intended behaviour
- document the review decision in the version control system

This aligns with the meaningful review requirements in [G-AG-07](./guardrails-base.md#g-ag-07-meaningful-human-review).

### Treating AI output as external contribution

Government should treat AI-generated code the same way it treats code from an external contributor. This means:

- you do not trust the code by default
- contributions must pass the same quality gates as any other code
- someone with appropriate authority and expertise must review it
- contributions must pass all automated security checks
- the reviewer takes responsibility for the code they approve

---

## Evidence gathering framework

### What to record per AI-assisted change

Teams should maintain the following evidence for AI-assisted code changes to support audit and compliance activities.

| Evidence item | Where recorded | Purpose |
|---------------|----------------|---------|
| AI tool used | Commit message or pull request (PR) description | Attribution and traceability |
| Model and version (where known) | Commit message or PR description | Version tracking for impact assessment |
| Code review record | Version control system (PR approval) | Primary assurance artefact |
| Automated test results | CI pipeline logs | Functional verification |
| Static Application Security Testing (SAST) scan results | CI pipeline logs | Security verification |
| Dependency scan results | CI pipeline logs | Supply chain verification |

### Commit message convention

Teams should adopt a convention for identifying AI-assisted code in commit messages. A recommended approach is to include a tag like this:

```
feat: add input validation for user registration

AI-assisted: GitHub Copilot (Generative Pre-trained Transformer (GPT)-4.1)
Reviewed-by: [reviewer name]
```

This creates a searchable record of AI-assisted changes across the codebase.

### Documentation template for changes that are AI-assisted and significant

For significant AI-assisted changes, like new modules or code relevant to security, teams should complete the following documentation.

| Field | Content |
|-------|---------|
| Change description | What was changed and why |
| AI tool and model | Which tool and model version were used |
| Human modifications | What changes the human reviewer made to the AI output |
| Testing approach | How the code was tested including edge cases |
| Security review | Summary of security review findings |
| Reviewer attestation | Confirmation that the reviewer understands and approves the code |

### Mapping to Secure by Design principles

The assurance approaches in this document support Secure by Design compliance in the following ways.

| Secure by Design principle | How non-deterministic assurance supports it |
|----------------------------|---------------------------------------------|
| Security is a core requirement | AI-generated code passes the same security controls as human-written code |
| Technology choices consider security | Model selection and configuration documented. Security implications assessed |
| Threats are understood and mitigated | Non-determinism documented as a risk with compensating controls |
| Secure design is verified | Verification based on output through SAST, testing, and code review |
| Security is maintained | Ongoing monitoring of AI output quality. Model update impact assessment |

---

## Governance position statement

The AI Engineering Lab programme accepts that non-determinism is an inherent characteristic of AI code generation that teams cannot eliminate. The governance position is that:

- non-determinism does not prevent the use of AI coding assistants in government
- teams must base assurance on output controls rather than process reproducibility
- the code that developers commit, review, test, and deploy is the assurance artefact, not the prompt that generated it
- AI-generated code must meet the same quality and security standards as human-written code regardless of how developers produced it
- departments must treat AI-generated code as an external contribution that requires independent verification

This position is consistent with the existing requirement in G-CS-01 that a human must review all AI-generated code before deployment.

---

## Further guidance

[Guardrails base](guardrails-base.md) for G-CS-01 (human review), G-CS-02 (security scanning), G-OV-04 (hallucination detection).

[Security policies](../security/security-policies.md) for PS-03 (mandatory human oversight) and PS-04 (secure development integration).

[Secure by Design AI evidence](secure-by-design-ai-evidence.md) for evidence framework for AI-assisted code.

[AI-assisted software development lifecycle](../playbooks/ai-sdlc-playbook.md) for SDLC integration guidance.

## Further reading

[NCSC Secure Development and Deployment](https://www.ncsc.gov.uk/collection/developers-collection)

[NCSC Principles for the Security of Machine Learning](https://www.ncsc.gov.uk/files/Principles-for-the-security-of-machine-learning.pdf)

[UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)

[OWASP LLM Top 10 (2025) - LLM09 Misinformation](https://genai.owasp.org/llm-top-10/)

[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

