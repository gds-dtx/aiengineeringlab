# Activity: Run architectural risk scan (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Repository, architecture summary |
| **Key output** | Architecture risk register |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
SAST and SCA tools catch code-level and dependency-level vulnerabilities, but they do not detect architectural security weaknesses: insecure authentication patterns, hardcoded secrets, weak cryptographic choices, improper data storage, missing access controls, or insecure network configurations. These systemic risks are often the most dangerous because they affect the entire system.

This activity uses AI to scan the system architecture for these higher-level security risks, producing a categorised finding list with severity ratings and mitigation recommendations.

Decision enabled: prioritise architectural security mitigations; confirm whether the system meets baseline security expectations before proceeding with migration or change activities.


---

## 2) What we will do (scope and steps)
Description: Scan the application architecture for systemic security risks across authentication, secrets management, cryptography, data storage, access control, and network configuration.

Sub tasks:
1. Define the scan scope: which components, services, and infrastructure configurations to include. Use the Architecture Summary (L3) if available.
2. Use the AI assistant to scan across the following risk categories: (a) authentication and authorisation (how are users/services authenticated? are there bypass paths? are tokens handled securely?), (b) secrets management (are secrets hardcoded? are they stored in environment variables, config files, or a secrets manager?), (c) cryptography (what algorithms are used? are any deprecated or weak? are keys stored securely?), (d) data storage (is sensitive data encrypted at rest? are there SQL injection or injection risks? are backups secured?), (e) access control (is the principle of least privilege applied? are there overly permissive roles or policies?), (f) network configuration (are services exposed unnecessarily? is TLS enforced? are there open ports?).
3. For each finding, classify severity (critical, high, medium, low) and provide a brief description and evidence (file reference, code snippet, or configuration line).
4. Draft mitigation recommendations for each finding, with effort estimates (XS/S/M).
5. Compile the findings into a structured risk scan report.
6. Review with the Solution Architect.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from Architecture Summary (L3). Can run in parallel with Triage SAST/SCA (L6). Outputs feed into Fix PRs (L6) and Translate Tech to Business Impact (L6). Schedule in Week 1-2.

> **Out of scope:**
> - Deep redesign to fix architectural issues (this activity identifies risks, not resolves them).
> - Penetration testing or dynamic analysis.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review source code, configuration files, and infrastructure definitions to identify architectural security patterns and anti-patterns across the six risk categories.
- **Retrieve and ground:** search the codebase for secrets, cryptographic function calls, authentication patterns, access control checks, and network configuration.
- **Generate:** produce the risk scan report with categorised findings, severity ratings, and mitigation recommendations.
- **Human in the loop:** the Solution Architect validates each finding for accuracy and relevance. The Tech Lead reviews the mitigation recommendations.


---

## 4) Preconditions, access and governance
- Read access to the target repository (source code, configuration files, infrastructure definitions).
- Architecture Summary (from L3) or equivalent system context.
- Named reviewer (Solution Architect) available.
- ATRS trigger: No. DPIA check: confirm the scan does not expose personal data in its report.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on the codebase and architecture context |  |
| Reusable architecture agent | [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) | Use the orchestrator as the only entrypoint; it will establish the architecture baseline and invoke internal security review automatically |
| Secret scanning | git-secrets, gitleaks, truffleHog, GitHub secret scanning |  |
| SAST (for code-level security patterns) | Semgrep, CodeQL, SonarQube |  |
| Code assistants | GitHub Copilot, Sourcegraph Cody |  |
| Not typically needed | SCA tools (dependency vulnerabilities are covered by L6-Triage-SAST-SCA), CI pipeline tools, container tools |  |


---

## 6) Timebox
Suggested: 2h for scanning across all six risk categories; 1h for report compilation and review. Total: 3h. Schedule in Week 1-2.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 2 to 3h.

---

## 7) Inputs and data sources
- Target repository (source code, configuration files, infrastructure definitions).
- Architecture Summary (from L3, if available).
- Infrastructure configuration (Terraform, Bicep, Kubernetes manifests, cloud console exports).
- If unavailable: if no architecture summary exists, the AI will scan the code directly. Budget additional time and note this as a less structured analysis.


---

## 8) Outputs and artefacts
- Risk scan report: findings categorised by the six risk categories (auth, secrets, crypto, storage, access control, network) with severity ratings, evidence, and mitigation recommendations.
- Summary of critical and high findings for immediate attention.
- If architecture baseline docs are generated in this pilot, reference `docs/architecture/<system-name>/` in the report.
- Time log entry for P1.

Audience: Solution Architect, Tech Lead, security team. Findings feed into Fix PRs (L6), Translate Tech to Business Impact (L6), and the wider risk management process.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the risk scan report with AI assistance. Compare against estimate for manual architectural security review |
| **P2 Quality score** | reviewer rates the report on the 1-5 rubric for completeness (all six categories covered), accuracy (findings verified against code), and actionability (mitigations are practical) |
| **P7 Vulnerability/risk reduction** | report the number and severity of architectural risks identified. Track how many are addressed subsequently |
| **P8 Reusable artefacts** | count the six-category scan checklist, risk report template, mitigation patterns |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI misses architectural risks**: the AI may not detect risks that are implicit in the architecture (e.g. reliance on network isolation without explicit access control) | the Solution Architect reviews the report and adds findings from their knowledge of the system |
| **False positives from pattern matching**: the AI may flag code patterns as risks when they are actually mitigated elsewhere (e.g. a hardcoded string that is not a secret) | the engineer verifies each finding against the code |
| **Report sensitivity**: the risk scan report contains detailed vulnerability information | restrict access to the report; follow departmental information classification policies |
| **Scope too broad for the timebox**: scanning a large system across all six categories may exceed the timebox | prioritise categories based on the system type (e.g. web application: prioritise auth and input validation; data system: prioritise storage and access control) |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] All six risk categories have been assessed (or justified exclusions noted).
- [ ] Findings are documented with severity, evidence, and mitigation recommendations.
- [ ] Critical and high findings are summarised for immediate attention.
- [ ] Solution Architect has reviewed and approved the report.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of systematic scanning across six risk categories; completeness compared to ad-hoc manual review.
- **Prerequisites to document**: repository access, architecture context, infrastructure configuration availability.
- **Limits and risks to document**: missed implicit risks, false positives, scope constraints.
- **Reusable assets**: six-category risk scan checklist, risk report template, mitigation pattern library.

- **Department continuation**: re-run periodically or on new repositories using the six-category scan checklist and risk report template.

Pattern candidates:
- **"Six-category architectural risk scan"**: systematically scanning auth, secrets, crypto, storage, access control, and network ensures comprehensive coverage rather than ad-hoc spot checks.
- **"Evidence-linked findings"**: including file references and code snippets for every finding makes verification and remediation faster.

Anti-pattern candidates:
- **"Scanning without architecture context"**: running the scan without understanding the system's architecture (services, data flows, trust boundaries) produces findings that lack context. Always include the Architecture Summary.
- **"Reporting without mitigation recommendations"**: a list of findings without practical mitigation suggestions is less actionable. Always propose a fix approach and effort estimate.
- Reusable assets: prompts, templates, patterns for the library.