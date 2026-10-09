# Activity: Enhance CI or CD workflows (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3) |
| **Inputs** | CI/CD config, failure patterns |
| **Key output** | CI/CD improvements + config changes |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy CI/CD pipelines often lack basic quality gates: no linting, no test enforcement, no security scanning, no build-artefact validation. Changes reach production without automated checks, increasing the change failure rate and making every deployment a manual risk assessment.

This activity reviews the existing pipeline configuration, identifies missing quality gates, and implements a small set of high-value additions (such as test enforcement, linting, or basic security scanning) as exemplar workflow updates.

Decision enabled: confirm whether the added gates catch real issues without unacceptable pipeline slowdown; decide whether to adopt the gates permanently and extend them.


---

## 2) What we will do (scope and steps)
Description: Add missing checks and gates with small workflow updates.

Sub tasks:
1. Audit the existing CI/CD configuration: review workflow files (e.g. GitHub Actions YAML, Jenkinsfiles, Azure DevOps pipelines). Document which gates currently exist (build, test, lint, scan, deploy approval) and which are missing.
2. Prioritise missing gates by impact: rank the missing checks by the risk they mitigate. Common high-value additions: (a) test execution with failure blocking merge, (b) linting or static analysis, (c) dependency vulnerability scanning (SCA), (d) build artefact validation, (e) deployment approval gates.
3. Use the AI code assistant to draft the workflow updates for the top 2-3 missing gates. The AI can generate pipeline YAML, Jenkinsfile stages, or equivalent configuration.
4. Test the workflow updates on a feature branch: trigger the pipeline and verify the new gates execute correctly. Check for false positives, excessive run time, and correct failure behaviour.
5. Iterate: fix any issues with the gates (flaky checks, incorrect thresholds, misconfigured paths). Re-run until the pipeline is stable.
6. Measure pipeline run time before and after the gate additions. Record any significant slowdown.
7. Open a PR with the workflow updates. Include a summary of what each gate does and why it was added.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run after the Architecture Summary (L3) provides pipeline context. Outputs feed into Validate Refactors (L4) and may be relevant to L6 security activities. Schedule in Week 2-3.

> **Out of scope:**
> - Full CI/CD platform migration (e.g. Jenkins to GitHub Actions).
> - Deployment automation beyond adding approval gates.
> - Performance or load testing integration.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review existing pipeline configuration to identify missing gates and suggest additions ranked by impact.
- **Generate:** draft pipeline YAML, Jenkinsfile stages, or equivalent configuration for the new gates.
- **Automate and orchestrate:** prepare candidate PR with the workflow updates, ready for review.
- **Human in the loop:** the engineer validates the generated configuration, tests it on a feature branch, and the Tech Lead approves the PR.


---

## 4) Preconditions, access and governance
- Write access to the CI/CD configuration repository (or the repository containing workflow files).
- Ability to trigger pipeline runs on a feature branch.
- Existing CI/CD platform accessible (GitHub Actions, Jenkins, Azure DevOps, GitLab CI, or equivalent).
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for generating pipeline config) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| CI/CD platforms | GitHub Actions, Jenkins, Azure DevOps Pipelines, GitLab CI |  |
| Linting and static analysis | ESLint, pylint, RuboCop, SonarQube, Checkstyle |  |
| SCA (if adding dependency scanning as a gate) | Snyk, OWASP Dependency-Check, Dependabot |  |
| Not typically needed | SBOM generation tools, log analytics tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 2h for audit, drafting, and initial testing; 1h for iteration and PR. Total: 3h. Schedule in Week 2-3.

Expandability: this activity can be repeated per pipeline. Each additional pipeline adds approximately 3h.

---

## 7) Inputs and data sources
- CI/CD configuration files (workflow YAML, Jenkinsfiles, pipeline definitions).
- Target repository (to understand the build, test, and deploy process).
- Existing pipeline run history (to identify current pass/fail patterns and run times).
- Architecture Summary (from L3, if available) for understanding the deployment topology.
- If unavailable: if the pipeline configuration is minimal or absent, budget additional time in the timebox for initial pipeline creation rather than enhancement.


---

## 8) Outputs and artefacts
- PR with updated CI/CD configuration adding the new quality gates.
- Pipeline audit summary: what gates existed before, what was added, what remains missing.
- Pipeline run time comparison: before and after adding the gates.
- Time log entry for P1.

Audience: Tech Lead, engineers, Delivery Manager (for pipeline run time impact). The audit summary informs decisions about further pipeline investment.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to audit, draft, and implement the gate additions with AI assistance. Compare against estimate for manual pipeline configuration |
| **P4 Lead time for changes** | measure pipeline run time before and after. Report whether the added gates increase lead time significantly |
| **P5 Change failure rate** | track whether changes merged after the new gates have a lower failure rate than before |
| **P8 Reusable artefacts** | count pipeline configuration snippets, audit template, gate configuration patterns |


Secondary:
- **P2 Quality score**: reviewer rates the pipeline changes on the 1-5 rubric.
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Added gates slow the pipeline significantly**: new checks increase run time, frustrating developers | measure run time before and after; consider running new checks in parallel; set a threshold (e.g. no more than 2 minutes added) |
| **False positives from new gates**: linting or scanning tools may flag issues that are not real problems | start with conservative rule sets; tune thresholds during the iteration step |
| **Breaking existing workflow**: changes to pipeline configuration may break the existing build process | test all changes on a feature branch first; do not merge until the pipeline is stable |
| **Insufficient permissions**: the engineer may not have sufficient access to modify pipeline configuration or create new workflow steps | confirm access in preconditions; involve a platform engineer if needed |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Pipeline audit is documented (existing gates, added gates, remaining gaps).
- [ ] New gates are running successfully on a feature branch.
- [ ] Pipeline run time comparison is recorded.
- [ ] PR has been reviewed and approved by the named reviewer.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of generating pipeline configuration versus manual authoring; accuracy of gate logic.
- **Prerequisites to document**: pipeline platform, access permissions, existing gate inventory.
- **Limits and risks to document**: false positives, run time impact, any gates that could not be added within the timebox.
- **Reusable assets**: pipeline audit template, gate configuration snippets, threshold-tuning notes.

- **Department continuation**: apply the gate configuration patterns to additional pipelines, or extend existing gates as the team gains confidence.

Pattern candidates:
- **"Audit-first pipeline enhancement"**: documenting existing gates before adding new ones prevents duplication and ensures the highest-impact gaps are addressed first.
- **"Feature-branch pipeline testing"**: testing all pipeline changes on a feature branch before merging prevents breaking the main pipeline.

Anti-pattern candidates:
- **"Adding all gates at once"**: implementing many new gates simultaneously makes it hard to diagnose which gate is causing failures or slowdowns. Add 2-3 at a time.
- **"Aggressive thresholds on day one"**: setting strict linting or scanning thresholds immediately results in a flood of false positives and developer frustration. Start conservative and tighten over time.
- Reusable assets: prompts, templates, patterns for the library.