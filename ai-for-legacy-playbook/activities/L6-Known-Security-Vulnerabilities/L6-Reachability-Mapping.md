# Activity: Map vulnerabilities to code usage (reachability) (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | Triage list, repository |
| **Key output** | Reachability map (reachable vs unreachable vulns) |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
SCA tools report every known CVE in every dependency, regardless of whether the vulnerable function is actually called by the application. This creates a noisy backlog where 80-90% of reported vulnerabilities are not exploitable in context. Teams either waste effort fixing unreachable vulnerabilities or ignore the backlog entirely.

This activity maps reported vulnerabilities to actual code usage: for each high-priority finding, it checks whether the vulnerable function or method is invoked from the application's code paths. The result is a filtered list where every remaining item is confirmed reachable, and a set of findings that can be safely deprioritised.

Decision enabled: focus remediation effort on confirmed-reachable vulnerabilities; accept risk or defer non-reachable findings with documented justification.


---

## 2) What we will do (scope and steps)
Description: Check if vulnerable functions are actually used in the codebase.

Sub tasks:
1. Start from the prioritised triage list (from L6-Triage-SAST-SCA, Tier 1 and Tier 2 items). If no triage exists, select the top 10-20 high/critical SCA findings.
2. For each finding, identify the specific vulnerable function or method in the dependency (using CVE details, advisory notes, or the SCA tool's detail view).
3. Use the AI code assistant to trace whether the application's code calls the vulnerable function: (a) search for direct imports or calls to the vulnerable module/function, (b) trace transitive call chains from the application's entry points to the vulnerable function, (c) check whether the vulnerable code path is triggered only under specific conditions (configuration, feature flags, error paths).
4. Classify each finding: (a) confirmed reachable (the application calls the vulnerable function from an active code path), (b) likely reachable (the call chain exists but is conditional or indirect), (c) not reachable (no call chain from the application to the vulnerable function).
5. For confirmed and likely reachable items, document the call chain (entry point to vulnerable function) with file references.
6. For non-reachable items, document the evidence (no import, dead code, test-only usage) to support the decision to deprioritise.
7. Update the triage list with reachability status.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs after Triage SAST/SCA (L6). Outputs feed into Fix PRs (L6). Schedule in Week 2.

> **Out of scope:**
> - Manual line-by-line audit of the entire repository.
> - Dynamic analysis or runtime testing (this is static reachability analysis).
> - Fixing the vulnerabilities (that is L6-Fix-PRs).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** trace call chains from application entry points through to the vulnerable dependency function; determine whether the vulnerable code path is reachable.
- **Retrieve and ground:** search the codebase for imports, function calls, and transitive dependencies related to the vulnerable module.
- **Generate:** produce a reachability report with call chain documentation and classification per finding.
- **Human in the loop:** the engineer validates call chain analysis, especially for dynamic dispatch, reflection, or configuration-dependent paths. The Tech Lead reviews the final classification.


---

## 4) Preconditions, access and governance
- Prioritised SCA findings (from L6-Triage-SAST-SCA) or raw SCA scan results.
- Read access to the target repository (full codebase, not just the vulnerable dependency).
- CVE details or advisory notes for each finding (to identify the specific vulnerable function).
- Named reviewer (Tech Lead or security-focused engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| SCA with reachability features | Snyk (reachability analysis), Endor Labs, Semgrep Supply Chain |  |
| Code assistants (for call chain tracing) | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Static analysis and search | Sourcegraph search, IDE Find Usages, grep/ripgrep |  |
| CVE databases | NVD, GitHub Advisory Database, OSV.dev |  |
| Not typically needed | SAST tools (this activity focuses on dependency vulnerabilities), CI pipeline tools, container tools |  |


---

## 6) Timebox
Suggested: 1.5h for 10-20 findings. For larger backlogs, prioritise the top findings and note the remainder as unassessed. Schedule in Week 2.

Expandability: this activity can be repeated per finding. Each additional finding adds approximately 5 to 10min.

---

## 7) Inputs and data sources
- Prioritised triage list (from L6-Triage-SAST-SCA) with Tier 1 and Tier 2 SCA findings.
- Target repository (full codebase).
- CVE details and advisory notes for each finding.
- SBOM (from L1-Extract-SBOM, if available) for dependency tree context.
- If unavailable: if no triage exists, select the top 10-20 critical/high SCA findings by CVSS score. Note this as a less targeted analysis.


---

## 8) Outputs and artefacts
- Reachability report: each finding classified as confirmed reachable, likely reachable, or not reachable.
- Call chain documentation for confirmed/likely reachable items (entry point to vulnerable function with file references).
- Evidence for non-reachable items (no import, dead code, test-only usage).
- Updated triage list with reachability status.
- Time log entry for P1.

Audience: Tech Lead, security team, engineers working on fixes. The reachability classification directly informs which findings to fix (L6-Fix-PRs) and which to defer.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to perform reachability analysis with AI assistance. Compare against estimate for manual call chain tracing |
| **P7 Vulnerability/risk reduction** | report the number of findings confirmed as reachable (true positives) versus not reachable (deprioritised). The ratio indicates how much noise was removed |
| **P8 Reusable artefacts** | count the reachability analysis method, call chain documentation format, classification taxonomy |


Secondary:
- **P2 Quality score**: reviewer rates the analysis on the 1-5 rubric for accuracy (are the classifications correct?).
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI misses a reachable path**: the AI may classify a finding as non-reachable when a dynamic or indirect call chain exists (reflection, configuration-driven dispatch, plugin loading) | for critical/high findings, the engineer validates the AI's "not reachable" classification manually |
| **False sense of safety from non-reachability classification**: classifying a finding as non-reachable does not mean it is safe forever. A future code change may introduce the call chain | note non-reachable findings as "deprioritised, not resolved"; re-assess if the code changes |
| **CVE details insufficient to identify the vulnerable function**: some advisories do not specify which function is affected | if the vulnerable function cannot be identified, classify the finding as "likely reachable" and treat conservatively |
| **Reachability analysis scope limited to static analysis**: dynamic code paths (e.g. user-controlled class loading, deserialization) may not be visible to static analysis | flag any areas where dynamic dispatch is used; note these as limitations |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] All targeted findings are classified (confirmed reachable, likely reachable, or not reachable).
- [ ] Call chain documentation is complete for confirmed/likely reachable items.
- [ ] Evidence is documented for non-reachable items.
- [ ] Triage list is updated with reachability status.
- [ ] Tech Lead has reviewed and approved the classifications.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of call chain tracing versus manual code navigation; accuracy of reachability classification.
- **Prerequisites to document**: SCA findings availability, CVE detail quality, repository access.
- **Limits and risks to document**: missed dynamic paths, insufficient CVE detail, static-analysis-only limitations.
- **Reusable assets**: reachability analysis method, call chain documentation format, classification taxonomy.

- **Department continuation**: apply the reachability analysis method and call chain documentation format to new findings as they are triaged.

Pattern candidates:
- **"Triage-then-reachability pipeline"**: running triage first (L6-Triage-SAST-SCA) to reduce the backlog, then reachability analysis on the top-priority items, prevents wasting effort tracing non-critical findings.
- **"Call chain documentation"**: recording the full call chain (entry point to vulnerable function) provides evidence for both fix priority and risk acceptance decisions.

Anti-pattern candidates:
- **"Reachability analysis on the full backlog"**: attempting to trace reachability for hundreds of findings exceeds any timebox. Always triage first and analyse only top-priority items.
- **"Treating non-reachable as resolved"**: non-reachable findings can become reachable if the code changes. They should be deprioritised, not closed.
- Reusable assets: prompts, templates, patterns for the library.