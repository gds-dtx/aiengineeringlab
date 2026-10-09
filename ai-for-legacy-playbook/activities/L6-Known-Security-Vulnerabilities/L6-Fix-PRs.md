# Activity: Generate security fix pull requests (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2h to half a day |
| **Phase** | Execute (Week 3) |
| **Inputs** | Triage list, reachability map, repository |
| **Key output** | Security fix PRs |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Triaging and mapping vulnerabilities produces a prioritised list, but findings remain open until someone writes and ships the fix. Manual remediation is slow, especially in legacy codebases where dependency upgrades cascade through multiple files and test suites.

This activity uses AI to draft fix pull requests for the highest-priority security findings: dependency version bumps for SCA items, code patches for SAST items, and configuration changes for architectural risks. Each PR runs through CI and is reviewed by an engineer before merge.

Decision enabled: merge the fixes and reduce the vulnerability count; measure whether AI-assisted remediation is faster than manual fixing.


---

## 2) What we will do (scope and steps)
Description: Draft fix pull requests for priority items and run CI.

Sub tasks:
1. Start from the prioritised fix plan (from L6-Triage-SAST-SCA, Tier 1 and Tier 2 items, filtered by L6-Reachability-Mapping if available).
2. For each finding, determine the fix type: (a) dependency version bump (SCA finding: upgrade the vulnerable package), (b) code patch (SAST finding: fix the vulnerable code pattern), (c) configuration change (architectural risk: update authentication, secrets handling, or access control configuration).
3. Use the AI code assistant to draft the fix: (a) for dependency bumps, update the dependency manifest and lockfile; check for breaking changes in the new version, (b) for code patches, generate the corrected code with the vulnerability removed, (c) for configuration changes, update the affected configuration files.
4. Open a PR with the fix. Include a description referencing the finding (CVE ID, SAST rule, or risk scan item) and a brief explanation of what was changed.
5. Run CI on the PR. If tests fail, diagnose whether the failure is caused by the fix (breaking change in an upgraded dependency, behaviour change from the code patch) or a pre-existing issue.
6. Iterate: fix CI failures, adjust the fix if needed. Record the number of iterations required.
7. Request review from the named reviewer. Do not auto-merge.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs after Triage SAST/SCA (L6) and optionally after Reachability Mapping (L6). Can also address findings from Architecture Risk Scan (L6). Schedule in Week 2-3.

> **Out of scope:**
> - Unreviewed automatic merge of fixes.
> - Fixing all findings (only Tier 1 and Tier 2 within the timebox).
> - Architectural redesign to address systemic issues.

---

## 3) How AI is used (options and modes)
- **Generate:** draft dependency version bumps, code patches, and configuration changes based on the finding details.
- **Analyse and reason:** diagnose CI failures caused by the fix; determine whether a dependency upgrade introduces breaking changes.
- **Automate and orchestrate:** prepare candidate PRs with proper descriptions and references to the finding.
- **Human in the loop:** the engineer validates every fix for correctness and tests it via CI. The named reviewer approves the PR before merge.


---

## 4) Preconditions, access and governance
- Write access to a feature branch in the target repository.
- Prioritised fix plan from L6-Triage-SAST-SCA (Tier 1 and Tier 2 items).
- CI pipeline accessible for running tests on the PR.
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for drafting fixes) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Automated fix tools | Dependabot, Snyk auto-fix, Renovate |  |
| CI pipeline | GitHub Actions, Azure DevOps Pipelines, Jenkins, GitLab CI |  |
| SCA/SAST (for verifying the fix resolves the finding) | Snyk, SonarQube, Semgrep |  |
| Not typically needed | SBOM tools, monitoring tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 30 minutes per fix (simple dependency bump) to 1.5h per fix (code patch with CI iteration). Plan for 3-5 fixes per session. Total: 2h to half a day. Schedule in Week 2-3.

Expandability: this activity can be repeated per finding. Each additional finding adds approximately 30min to 1.5h.

---

## 7) Inputs and data sources
- Prioritised fix plan (from L6-Triage-SAST-SCA, filtered by L6-Reachability-Mapping if available).
- Target repository with write access to feature branches.
- CI pipeline access.
- CVE details, SAST rule descriptions, or architecture risk scan findings (for understanding what to fix).
- If unavailable: if no triage exists, select the top critical/high findings from the raw scan results. Note this as a less targeted approach.


---

## 8) Outputs and artefacts
- PRs with security fixes (one per finding or one per logical group of related findings).
- CI results for each PR.
- Fix log: for each fix, the finding reference, fix type, number of CI iterations, and final status (merged, pending review, blocked).
- Time log entry for P1.

Audience: Tech Lead, engineers, security team. The fix log feeds into the Evaluation Scorecard and the vulnerability reduction metric (P7).


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time per fix with AI assistance. Compare against estimate for manual remediation |
| **P4 Lead time for changes** | measure time from fix draft to PR merge |
| **P7 Vulnerability/risk reduction** | count the number and severity of findings resolved by merged PRs |
| **P8 Reusable artefacts** | count fix patterns (dependency bump workflow, code patch templates), CI iteration diagnosis prompts |


Secondary:
- **P2 Quality score**: reviewer rates fix quality on the 1-5 rubric.
- **P5 Change failure rate**: track whether any fix PRs introduce regressions.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Fix introduces a regression**: upgrading a dependency may break existing functionality; a code patch may change expected behaviour | run CI before merge; if tests fail, diagnose before proceeding |
| **Fix does not actually resolve the vulnerability**: the AI may patch the wrong code path or upgrade to a version that is still vulnerable | re-run the SAST/SCA scan against the fix branch to verify the finding is resolved |
| **Cascading dependency upgrades**: upgrading one dependency may require upgrading others, expanding scope beyond the timebox | if a dependency bump cascades, log the scope as a blocker and defer to L1 upgrade activities |
| **Unreviewed merge**: pressure to reduce the vulnerability count may lead to merging fixes without adequate review | enforce the review requirement; explicitly exclude auto-merge from scope |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] PRs are open for each targeted Tier 1 and Tier 2 finding.
- [ ] CI passes on each PR (or failures are diagnosed and documented).
- [ ] Fix log is complete (finding reference, fix type, iterations, status).
- [ ] PRs are reviewed and approved by the named reviewer.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of drafting fixes; ability to diagnose CI failures after dependency upgrades.
- **Prerequisites to document**: fix plan availability, CI access, reviewer availability.
- **Limits and risks to document**: regressions introduced, incomplete fixes, cascading dependency upgrades.
- **Reusable assets**: dependency bump workflow, code patch templates, CI failure diagnosis prompts, fix log format.

- **Department continuation**: work through remaining triaged findings using the fix workflow, code patch templates, and CI diagnosis prompts.

Pattern candidates:
- **"One PR per finding"**: creating a separate PR for each finding makes review tractable and rollback simple. Avoid combining unrelated fixes.
- **"Re-scan after fix"**: running the SAST/SCA tool against the fix branch confirms the vulnerability is resolved, preventing false claims of remediation.

Anti-pattern candidates:
- **"Auto-merging security fixes"**: merging fixes without human review risks introducing regressions. Always require review.
- **"Fixing without verifying resolution"**: shipping a fix without re-scanning means the vulnerability may still be present. Always verify.
- Reusable assets: prompts, templates, patterns for the library.