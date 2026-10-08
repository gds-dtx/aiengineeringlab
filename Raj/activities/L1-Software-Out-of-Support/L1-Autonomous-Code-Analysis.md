# Activity: Autonomous analysis on the codebase (scoped) (L1)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1h |
| **Phase** | Assess (Week 1, Days 1-3) |
| **Inputs** | Repository, static analysis config |
| **Key output** | Hotspot shortlist + scoping note |
| **Hub activity** | Yes (feeds L4, L6) |

---

## 1) Why this activity (value and decision)
In a short pilot, the team cannot examine every file. They need a rapid, evidence-based view of where the codebase is most fragile, complex, or risky so they can direct limited time to the areas that matter most.

This activity uses AI-assisted static analysis and code exploration to surface hotspots (high complexity, high churn, poor coverage, or known vulnerability clusters) and produce a prioritised shortlist. It runs early in the pilot and directly informs which other L1 activities to prioritise and where to scope the SBOM extraction and exemplar PRs.

Decision enabled: agree which areas of the codebase the pilot will focus on and which are out of scope for this engagement.


---

## 2) What we will do (scope and steps)
Description: Run a scoped static analysis and assistant-led exploration to surface hotspots and potential issues.

Sub tasks:
1. Agree the analysis scope with the department contact: which repositories, branches, and directories to include or exclude. Confirm read-only access.
2. Configure the analysis profile: select the rule sets relevant to the legacy type (e.g. complexity metrics, code duplication, deprecated API usage, security patterns). Keep it scoped to avoid overwhelming results.
3. Run static analysis tools to produce a raw findings report. If multiple tools are available, run them in parallel and merge results.
4. Feed the findings into an AI assistant and prompt it to: (a) cluster findings by module or component, (b) rank clusters by severity and frequency, (c) identify the top 5-10 hotspots with a one-line rationale for each.
5. For each hotspot, the AI should note: which other L1 activities it is relevant to (e.g. "this module has 12 EOL dependencies, relevant to SBOM extraction"), and whether it overlaps with L6 security concerns.
6. Walk through the shortlist with a department engineer to validate: are these genuine hotspots? Are any known and already being addressed? Are any critical areas missing?
7. Produce a one-page hotspot shortlist with agreed priorities and scoping decisions.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** run this as one of the first activities in the pilot (Days 1-3, Assess phase). Its output shapes the scope for Extract SBOM, Dependency Mapping, and Exemplar PRs.

> **Cross-type links:** the hotspot shortlist is also useful for:
> - L4: Refactoring Opportunities (complexity and duplication hotspots feed directly into the refactoring shortlist).
> - L6: Triage SAST/SCA (security-related hotspots flag areas for deeper vulnerability analysis).

> **Out of scope:**
> - Deep refactor planning or executing bulk fixes (see L4 Refactoring Opportunities).
> - Full security audit (see L6 activities).
> - Remediation of any findings (this activity is analysis and prioritisation only).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** cluster raw static analysis findings by module/component, rank by severity and frequency, identify patterns across findings (e.g. multiple complexity and duplication issues concentrated in one module), and cross-reference with dependency data.
- **Generate:** produce the hotspot shortlist document with ranked entries, one-line rationales, and cross-references to relevant L1/L6 activities.
- **Retrieve and ground:** where the analysis flags deprecated APIs or patterns, retrieve documentation on the recommended replacement to validate the finding.
- **Human in the loop:** a department engineer validates the shortlist. The Solution Architect or Tech Lead confirms the scoping decisions for subsequent activities.


---

## 4) Preconditions, access and governance
- Read-only access to the target repository (or repositories). Confirm scope boundaries (branches, directories) with the department contact.
- Static analysis tooling installed or available in the department's environment, or permission to run locally.
- Named reviewer (Solution Architect or Tech Lead) and a department engineer available for the validation walkthrough.
- ATRS trigger: No. DPIA check: only if analysis output will be shared outside the pilot team (unlikely at this stage).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Static analysis | SonarQube, SonarCloud, CodeClimate, PMD, ESLint/TSLint with complexity rules | Use whatever the department already has licensed |
| AI reasoning and clustering | an enterprise LLM (e.g. GitHub Copilot Chat, Azure OpenAI, or equivalent) to cluster and rank findings |  |
| Code complexity metrics (supplementary) | radon (Python), lizard (multi-language), or built-in IDE metrics |  |
| Notes and reporting | Markdown or spreadsheet for the hotspot shortlist; stored in the shared evidence area |  |


---

## 6) Timebox
Suggested: 1h (including 15-20 minutes for the engineer validation walkthrough). Schedule in Days 1-3 of Week 1 (Assess phase) so output can shape the scope for subsequent L1 activities.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 1h.

---

## 7) Inputs and data sources
- Target repository URL(s) and branch (confirm with department contact).
- Existing static analysis reports if the department already runs them (saves re-running and provides a baseline).
- Any prior code quality or technical debt assessments.
- Department engineer available for validation (book 20 minutes during the timebox).
- If unavailable: if no prior analysis exists, run fresh analysis within the timebox. If the department engineer is not available, flag the shortlist as "unvalidated" and schedule a follow-up.


---

## 8) Outputs and artefacts
- Hotspot shortlist (Markdown or spreadsheet): top 5-10 hotspots ranked by severity, each with: module/file path, issue type (complexity, duplication, deprecated APIs, coverage gap), one-line rationale, and cross-reference to relevant subsequent activities.
- Scoping decision note: which areas the pilot will focus on and which are explicitly out of scope, agreed with the department.
- Time log entry for P1.

Audience: Solution Architect, Tech Lead, department engineering lead. The shortlist is the primary scoping input for the rest of the L1 activity chain.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the hotspot shortlist. Compare AI-assisted clustering and ranking time against the department's estimate for manual code review to achieve the same scoping result |
| **P2 Quality score** | reviewer rates the hotspot shortlist on the 1-5 rubric for accuracy (hotspots are genuine), completeness (no major areas missed), and actionability (clear enough to scope subsequent activities) |
| **P8 Reusable artefacts** | count the analysis profile configuration, the AI clustering prompt, and the hotspot shortlist template if reusable |


Secondary (collect if available):
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P7 Vulnerability/risk reduction**: if the analysis surfaces previously unknown risk areas, count them.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Noisy results drowning real hotspots**: static analysis can produce hundreds of findings, most of which are low-value | configure focused rule sets before running; use AI to cluster and rank rather than reviewing raw output |
| **False positives from analysis tools**: tools may flag patterns that are intentional or acceptable in context | the engineer validation walkthrough catches these; mark false positives to improve the analysis prompt for future runs |
| **Missing hotspots due to scope limits**: if the analysis only covers part of the codebase, genuine problem areas may be missed | confirm scope boundaries explicitly with the department; note any excluded areas in the scoping decision note |
| **Scope creep into remediation**: the temptation to start fixing issues during analysis | this activity produces a shortlist only; all remediation is deferred to subsequent activities |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Hotspot shortlist covers 5-10 prioritised items with rationale and activity cross-references.
- [ ] Department engineer has validated the shortlist (or it is marked "unvalidated" with a follow-up scheduled).
- [ ] Scoping decision is captured: which areas the pilot will and will not focus on.
- [ ] Solution Architect or Tech Lead has approved the scoping decision.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added for the scoping decision.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on clustering and ranking findings versus manual review of raw analysis output; quality of the prioritised shortlist compared to a manually curated equivalent.
- **Prerequisites to document**: tool availability, repo access level, engineer availability for validation.
- **Limits and risks to document**: false positive rate, any hotspots missed due to scope limits, rule sets that produced too much noise.
- **Reusable assets**: analysis profile configuration, AI clustering prompt, hotspot shortlist template.

- **Department continuation**: re-run on additional repositories or re-run periodically as the codebase evolves, using the analysis profile and clustering prompt.

Pattern candidates:
- **"AI-clustered analysis triage"**: using AI to cluster and rank static analysis findings is significantly faster than manual triage and produces a more consistent prioritisation. Record the time saving and the false-positive rate.
- **"Engineer validation walkthrough"**: a 20-minute walkthrough with a department engineer catches false positives and surfaces missing context that the AI cannot see.

Anti-pattern candidates:
- **"Raw dump without clustering"**: presenting unranked static analysis output to the team overwhelms and delays decision-making. Always cluster and rank before sharing.
- **"Analysis without scope boundaries"**: running analysis across the entire codebase without agreed focus areas produces a list too long to act on within the pilot timebox.