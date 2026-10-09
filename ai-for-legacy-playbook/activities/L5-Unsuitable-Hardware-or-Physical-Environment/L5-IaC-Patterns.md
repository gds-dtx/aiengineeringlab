# Activity: Draft infrastructure as code patterns (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3) |
| **Inputs** | Architecture summary, target platform |
| **Key output** | IaC templates + patterns |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems are often provisioned manually or through undocumented scripts, making environment reproduction unreliable and deployment risky. Without infrastructure as code (IaC), every environment setup is a one-off process prone to configuration drift.

This activity uses AI to draft starter IaC templates (Terraform, Bicep, CloudFormation, or equivalent) for the target landing zone. The templates cover the minimum infrastructure needed to support the migration option chosen in L5-Generate-Migration-Options, providing repeatable provisioning scaffolds.

Decision enabled: confirm whether IaC patterns are viable for the target environment; adopt the templates as a baseline for infrastructure provisioning.


---

## 2) What we will do (scope and steps)
Description: Draft simple Terraform or Bicep patterns for target landing zone.

Sub tasks:
1. Define the target landing zone: what infrastructure resources are needed? Typical resources include: compute (VMs, containers, serverless), networking (VPC/VNet, subnets, load balancers), storage (databases, object storage), identity and access (IAM roles, service accounts), and monitoring.
2. Identify existing infrastructure provisioning: are there existing scripts, manual runbooks, or IaC templates? Assess what can be reused versus what must be created from scratch.
3. Use the AI assistant to generate starter IaC templates for the identified resources. Feed in the Architecture Summary (L3), migration option details (L5), and any existing infrastructure scripts as context.
4. Run static checks on the generated templates: terraform validate, tflint, Bicep linting, cfn-lint, or equivalent. Fix any issues.
5. If possible, plan a dry run (terraform plan, Bicep what-if, or equivalent) against a sandbox environment to verify the templates produce the expected resources. If no sandbox is available, document this as a validation gap.
6. Publish the templates in the agreed location (repo, infrastructure repo, or shared docs). Include a README explaining the template structure, required variables, and how to run them.
7. Review with the Solution Architect or platform engineer.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from Migration Options (L5) and Architecture Summary (L3). Outputs feed into Containerisation Exemplar (L5) and CI/CD Enhancement (L4). Schedule in Week 3-4.

> **Out of scope:**
> - Organisation-wide IaC standardisation.
> - Provisioning production infrastructure.
> - Managing state files or backend configuration for production use.

---

## 3) How AI is used (options and modes)
- **Generate:** produce IaC templates (Terraform, Bicep, CloudFormation) tailored to the target landing zone and migration option.
- **Analyse and reason:** review existing infrastructure scripts or manual provisioning steps and translate them into IaC patterns.
- **Automate and orchestrate:** diagnose static check failures and propose fixes.
- **Human in the loop:** the engineer validates generated templates against infrastructure requirements. The Solution Architect or platform engineer reviews the final templates.


---

## 4) Preconditions, access and governance
- Target cloud or infrastructure platform identified (AWS, Azure, GCP, on-premises Kubernetes, or equivalent).
- Migration option selected or shortlisted (from L5-Generate-Migration-Options).
- Access to a sandbox environment for dry-run validation (recommended, not mandatory).
- Named reviewer (Solution Architect or platform engineer) available.
- ATRS trigger: Possibly, if provisioning infrastructure in a new environment. DPIA check: No (infrastructure templates do not process personal data, but the provisioned resources may).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| IaC authoring | Terraform, Bicep, CloudFormation, Pulumi |  |
| Static analysis for IaC | tflint, terraform validate, Bicep linter, cfn-lint, checkov, tfsec |  |
| Code assistants (for template generation) | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Sandbox environments | AWS sandbox account, Azure subscription, GCP project |  |
| Not typically needed | SCA/SBOM tools, log analytics tools, test frameworks |  |


---

## 6) Timebox
Suggested: 2h for template generation and static checks; 1h for dry-run validation (if sandbox available) and documentation. Total: 3h. Schedule in Week 3-4.


---

## 7) Inputs and data sources
- Target landing zone requirements (compute, networking, storage, identity, monitoring).
- Migration Options paper (from L5-Generate-Migration-Options).
- Architecture Summary (from L3, if available).
- Existing infrastructure scripts or manual provisioning documentation (if any).
- Departmental IaC standards or security baselines (if documented).
- If unavailable: if no architecture summary or migration option is available, generate a generic landing zone template for the target platform. Note this as a lower-specificity output.


---

## 8) Outputs and artefacts
- Starter IaC templates (Terraform modules, Bicep files, CloudFormation templates, or equivalent).
- Static check results (all checks passing or with documented exceptions).
- Dry-run output (terraform plan or equivalent), if sandbox is available.
- README documenting template structure, required variables, and usage instructions.
- Time log entry for P1.

Audience: platform engineers, Solution Architect, engineers involved in the migration. Templates serve as the baseline for infrastructure provisioning.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce IaC templates with AI assistance. Compare against estimate for manual template authoring |
| **P2 Quality score** | reviewer rates the templates on the 1-5 rubric for correctness (static checks pass), security compliance (follows baselines), and reusability (parameterised, documented) |
| **P8 Reusable artefacts** | count the IaC templates, module structure, README, static check configuration |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P7 Vulnerability/risk reduction**: if security-focused IaC scanning (checkov, tfsec) is run, report findings.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI-generated templates with security issues**: the AI may produce templates with overly permissive IAM roles, public network exposure, or unencrypted storage | run security-focused IaC scanning (checkov, tfsec); apply departmental security baselines |
| **Templates do not work in the target environment**: differences in cloud provider versions, region availability, or organisational policies may cause failures | validate with a dry run (terraform plan) in a sandbox if possible |
| **Over-engineered templates**: the AI may generate complex module structures that exceed the current need | keep templates simple; focus on the minimum resources needed for the migration option |
| **State management not addressed**: starter templates do not include backend configuration for state files, which is needed for production use | document state management as a follow-up item, not in scope for starter templates |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] IaC templates cover the minimum required resources for the target landing zone.
- [ ] Static checks pass (or exceptions are documented).
- [ ] Dry-run output is recorded (if sandbox available).
- [ ] README documents template structure, variables, and usage.
- [ ] Solution Architect or platform engineer has reviewed and approved.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of IaC template generation; anti-pattern detection via static analysis.
- **Prerequisites to document**: target platform, migration option, sandbox availability, departmental security baselines.
- **Limits and risks to document**: security issues in generated templates, environment-specific failures, over-engineered modules.
- **Reusable assets**: IaC starter templates, module structure patterns, static check configuration, README template.

- **Department continuation**: extend or adapt the IaC templates as the target environment evolves. The module structure and parameterisation are documented.

Pattern candidates:
- **"Security-scanned IaC generation"**: running security-focused scanning (checkov, tfsec) immediately after AI generation catches the most common IaC security issues.
- **"Architecture-grounded IaC"**: feeding the AI the Architecture Summary and migration option produces templates tailored to the specific system rather than generic cloud scaffolds.

Anti-pattern candidates:
- **"Deploying AI-generated IaC without static checks"**: AI-generated templates frequently contain overly permissive IAM, public endpoints, or unencrypted storage. Always run static checks.
- **"Production state management in starter templates"**: starter templates should not include production backend configuration for state files. This adds complexity and risk during the initial scaffold phase.
- Reusable assets: prompts, templates, patterns for the library.