# Activity: Triage SAST or SCA findings (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2h |
| **Phase** | Assess (Week 1-2) |
| **Inputs** | SAST/SCA scan results, repository, SBOM |
| **Key output** | Prioritised triage list + fix plan |
| **Hub activity** | Yes (feeds L6 chain) |

---

## 1) Why this activity (value and decision)
Legacy systems typically accumulate hundreds or thousands of SAST (static application security testing) and SCA (software composition analysis) findings over time. The sheer volume makes any individual finding invisible, and teams often ignore the backlog entirely. Without triage, the team cannot distinguish between exploitable critical vulnerabilities and low-risk informational findings.

This activity uses AI to import, cluster, and prioritise the findings from SAST/SCA tools by exploitability and business impact, producing a ranked fix plan that the team can action within the pilot timebox.

Decision enabled: select the top-priority findings for remediation (feeding into L6-Fix-PRs); decide whether the triage approach is scalable for ongoing use.


---

## 2) What we will do (scope and steps)
Description: Triages findings and groups by exploitability and impact.

Sub tasks:
1. Import findings: export SAST and/or SCA scan results from the relevant tools. If no recent scan exists, run one within this timebox.
2. Deduplicate: remove duplicate findings (same vulnerability in the same file at the same line), findings in test code or generated code (unless policy requires addressing these), and findings already marked as accepted risk.
3. Use the AI assistant to cluster findings by: (a) vulnerability type (injection, auth bypass, cryptographic weakness, dependency CVE, etc.), (b) severity (critical, high, medium, low based on CVSS or tool scoring), (c) affected component or module.
4. Enrich with exploitability context: for each cluster, use the AI to assess (a) whether the vulnerable code path is reachable from user input (cross-reference with L6-Reachability-Mapping if available), (b) whether there are existing mitigations (e.g. input validation, WAF, network isolation), (c) whether a known exploit exists.
5. Rank the clusters: produce a prioritised list ordered by exploitability multiplied by impact. Group into tiers: Tier 1 (fix immediately), Tier 2 (fix within the pilot), Tier 3 (schedule for later), Tier 4 (accept risk or defer).
6. Prepare the fix plan: for Tier 1 and Tier 2 items, identify the fix approach (dependency upgrade, code change, configuration change) and estimated effort.
7. Review the triage with the Tech Lead or Solution Architect.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** this is typically the first L6 activity. Outputs feed into Reachability Mapping (L6), Fix PRs (L6), and Translate Tech to Business Impact (L6). Schedule in Week 1-2.

> **Out of scope:**
> - Bulk auto-merge of fixes without review.
> - Deep manual code audit (beyond what the SAST tool identified).
> - Penetration testing.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** cluster findings by type, severity, and component; assess exploitability by tracing code paths from user input to the vulnerable function.
- **Retrieve and ground:** cross-reference findings against the codebase to verify they are in active code paths (not dead code, test code, or generated code).
- **Generate:** produce the prioritised triage list, tier assignments, and fix plan.
- **Human in the loop:** the engineer validates exploitability assessments. The Tech Lead approves the tier assignments and fix plan.


---

## 4) Preconditions, access and governance
- SAST and/or SCA scan results available (or ability to run a scan within the timebox).
- Read access to the target repository (to verify findings against code).
- Named reviewer (Tech Lead or Solution Architect) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| SAST tools | SonarQube, Semgrep, CodeQL, Checkmarx, Fortify |  |
| SCA tools | Snyk, OWASP Dependency-Check, Dependabot, Trivy, Grype |  |
| AI reasoning (for clustering and exploitability assessment) | an enterprise LLM grounded on the scan results and codebase |  |
| Notes and reporting | Markdown, spreadsheets, Confluence |  |
| Not typically needed | CI pipeline tools, container tools, IaC tools |  |


---

## 6) Timebox
Suggested: 1.5h for import, deduplication, clustering, and ranking; 30 minutes for fix plan and review. Total: 2h. Schedule in Week 1-2.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 2h.

---

## 7) Inputs and data sources
- SAST scan results (exported from the scanning tool).
- SCA scan results (dependency vulnerability report).
- Target repository (to verify findings against code).
- SBOM (from L1-Extract-SBOM, if available) for dependency context.
- If unavailable: if no scan results exist, run a SAST and/or SCA scan as the first step. Budget 30 minutes additional for this.


---

## 8) Outputs and artefacts
- Deduplicated findings list with cluster assignments.
- Prioritised triage list: Tier 1 (immediate), Tier 2 (within pilot), Tier 3 (schedule later), Tier 4 (accept/defer).
- Fix plan for Tier 1 and Tier 2 items (fix approach, estimated effort per item).
- Time log entry for P1.

Audience: Tech Lead, Solution Architect, security team (if applicable). The triage list feeds directly into Fix PRs (L6) and Translate Tech to Business Impact (L6).


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to triage the backlog with AI assistance. Compare against estimate for manual triage |
| **P2 Quality score** | reviewer rates the triage on the 1-5 rubric for accuracy (are the tier assignments correct?) and usefulness (does the fix plan enable action?) |
| **P7 Vulnerability/risk reduction** | report the number and severity of findings triaged, and the number of Tier 1/Tier 2 items identified for remediation |
| **P8 Reusable artefacts** | count the triage template, clustering method, exploitability assessment prompts |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI mis-prioritises findings**: the AI may rank a non-exploitable finding as Tier 1 or deprioritise an exploitable one | the engineer validates exploitability assessments against the code; the Tech Lead reviews tier assignments |
| **Excessive false positives in the scan results**: SAST tools are known for high false-positive rates | deduplicate and filter test/generated code first; use reachability analysis (L6-Reachability-Mapping) to confirm exploitability |
| **Vulnerability data sensitivity**: scan results may reveal sensitive information about the system's weaknesses | restrict access to the triage output; follow departmental information classification policies |
| **Scan results are stale**: if the scan was run against an old version of the code, the triage may not reflect the current state | verify the scan is against the current main branch; re-run if necessary |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Findings are deduplicated, clustered, and assigned to tiers.
- [ ] Fix plan is prepared for Tier 1 and Tier 2 items.
- [ ] Tech Lead or Solution Architect has reviewed and approved the triage.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of clustering and prioritising a large findings backlog; quality of exploitability assessment.
- **Prerequisites to document**: SAST/SCA tool availability, scan freshness, repository access.
- **Limits and risks to document**: false positives, mis-prioritised findings, stale scan data.
- **Reusable assets**: triage template, clustering taxonomy, exploitability assessment prompts, tier definitions.

- **Department continuation**: re-run when new scan results are produced, using the triage template and clustering method.

Pattern candidates:
- **"Exploitability-weighted triage"**: ranking findings by exploitability (reachable from user input, known exploit exists) rather than raw CVSS score focuses effort on the highest-risk items.
- **"Deduplicate and filter before clustering"**: removing duplicates, test-code findings, and accepted risks before AI analysis reduces noise and improves cluster quality.

Anti-pattern candidates:
- **"CVSS-only prioritisation"**: relying solely on CVSS scores without assessing exploitability leads to fixing high-CVSS but unreachable vulnerabilities while ignoring lower-CVSS but exploitable ones.
- **"Triaging without deduplication"**: feeding raw scanner output (with hundreds of duplicates) into the AI produces inflated counts and confusing clusters.
- Reusable assets: prompts, templates, patterns for the library.