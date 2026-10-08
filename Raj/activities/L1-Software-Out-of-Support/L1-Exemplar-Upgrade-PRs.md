# Activity: Exemplar upgrade pull requests (L1)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-3h (1-2 PRs) |
| **Phase** | Execute (Weeks 2-3) |
| **Inputs** | Upgrade plan, repository write access, CI |
| **Key output** | 1-2 PRs + lessons-learned note |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Upgrade plans and compatibility maps are hypothetical until code is actually changed, built, and tested. Hidden blockers (unexpected test failures, undocumented integrations, build-tool incompatibilities) only surface when a real change goes through the pipeline.

This activity creates one or two real upgrade pull requests for high-value dependencies, runs them through CI, and records what happens. It validates the upgrade approach, surfaces hidden effort, and refines time estimates for the wider upgrade. The results feed directly into the Four-Box summary and provide concrete evidence for the playbook.

Decision enabled: confirm the upgrade approach works in practice, refine effort estimates, and decide whether to proceed with the remaining upgrades or adjust the plan.


---

## 2) What we will do (scope and steps)
Description: Create one or two upgrade pull requests for high value dependencies and run the pipeline.

Sub tasks:
1. Select 1-2 dependencies from the shortlist produced by the Dependency and Compatibility Mapping activity. Prioritise components that are: (a) high-risk (EOL or known CVEs), (b) representative of the broader upgrade pattern, and (c) early in the upgrade sequence so they unblock later steps.
2. Create a feature branch for each upgrade. Use the AI code assistant to: (a) update the dependency version in the manifest/lockfile, (b) apply the breaking-change mitigations from the Upgrade Plan, (c) update any affected imports, API calls, or configuration files.
3. Run the existing test suite locally or in CI. Record: number of tests passing, failing, and skipped. For each failure, note whether it is caused by the upgrade itself or by a pre-existing issue.
4. For each CI failure caused by the upgrade, use the AI assistant to propose a fix. Apply the fix, re-run CI, and record the iteration count (how many fix cycles were needed).
5. Once CI passes (or failures are documented as known issues), open the pull request with a clear description: what was upgraded, what broke, what was fixed, and any remaining known issues.
6. Request review from the named reviewer. Capture reviewer comments and time spent on review.
7. Record lessons learned: was the upgrade plan accurate? Were there surprises? Update the compatibility map and upgrade plan with corrections.
8. Log time spent for each PR (start/end timestamps) for P1 measurement. Separately log AI-assisted time versus manual fix time if distinguishable.

> **Sequencing:** depends on the Upgrade Plan and Breaking Change Notes. This is typically the final activity in the L1 chain. Run in Week 2-3 (Execute phase).

> **Out of scope:**
> - Upgrading all dependencies in scope (this activity covers 1-2 exemplars only).
> - Merging PRs to main without department approval.
> - Fixing pre-existing test failures unrelated to the upgrade.

---

## 3) How AI is used (options and modes)
- **Automate and orchestrate:** update dependency versions in manifest/lockfiles, apply known mitigations from the upgrade plan (e.g. rename API calls, update configuration keys), and generate the PR description.
- **Analyse and reason:** diagnose CI failures by reading error output, correlating failures with the specific upgrade changes, and proposing targeted fixes.
- **Generate:** draft code fixes for breaking changes, produce test adjustments where existing tests need updating for the new API, and write PR descriptions summarising what changed and why.
- **Retrieve and ground:** pull relevant Stack Overflow answers, GitHub issues, or vendor documentation when a CI failure does not match a known breaking change from the upgrade plan.
- **Human in the loop:** engineer reviews every AI-proposed code change before committing. Reviewer (Solution Architect or Tech Lead) approves the PR. No auto-merge.


---

## 4) Preconditions, access and governance
- Completed Upgrade Plan and Breaking Change Notes (L1) with agreed shortlist of exemplar candidates.
- Write access to a feature branch in the target repository (confirm branching strategy with the department).
- CI pipeline accessible and functional (confirm it can be triggered from a feature branch).
- Named reviewer (Solution Architect or Tech Lead) confirmed and available for PR review within the timebox.
- Agreement on merge policy: PRs may remain open (not merged to main) pending department approval. Clarify this before starting.
- ATRS trigger: No. DPIA check: No (code changes are internal to the repo).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistant (for generating code changes and fix proposals) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| CI/CD pipeline | GitHub Actions, Azure DevOps Pipelines, Jenkins, GitLab CI | whatever the department uses |
| Version control | Git | branch, commit, PR workflow as per department practice |
| AI reasoning (for diagnosing CI failures) | enterprise LLM (e.g. GitHub Copilot Chat, Azure OpenAI) grounded on CI output and the upgrade plan |  |
| Notes and reporting | Markdown or spreadsheet for the lessons-learned log; PR descriptions in the platform's native format |  |


---

## 6) Timebox
Suggested: 1.5h per exemplar PR (so 1.5-3h total for 1-2 PRs). If CI failures require more than 3 fix iterations, stop and document the blocker rather than exceeding the timebox. Schedule in Weeks 2-3 (Execute phase).

Expandability: this activity can be repeated per dependency. Each additional dependency adds approximately 1.5h.

---

## 7) Inputs and data sources
- Upgrade Plan and Breaking Change Notes (L1): the reference document for expected changes and mitigations.
- Compatibility map with the agreed upgrade sequence and shortlisted exemplar candidates.
- Target repository with write access to a feature branch.
- CI pipeline access (ability to trigger builds from the feature branch).
- If unavailable: if CI is not accessible from a feature branch, document the limitation and run local builds as a proxy (tag confidence as Low for P4/P5 data).


---

## 8) Outputs and artefacts
- 1-2 pull request URLs with descriptive PR bodies (what was upgraded, what broke, what was fixed, remaining known issues).
- CI results summary: tests passing/failing/skipped before and after the upgrade, with failure root causes noted.
- Lessons-learned note: upgrade plan accuracy, unexpected blockers, iteration count, and corrected estimates for the remaining upgrade scope.
- Updated compatibility map and upgrade plan (corrections based on what was discovered).
- Time log entries for P1 (per PR, distinguishing AI-assisted versus manual fix time if possible).

Audience: Solution Architect, Tech Lead, department engineering team. The PR itself and the lessons-learned note feed into the Four-Box summary and playbook.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time per PR. Compare AI-assisted upgrade time against the department's estimate for doing the same upgrade manually. If possible, separately log time spent on AI-assisted code generation versus manual debugging |
| **P2 Quality score** | reviewer rates each PR on the 1-5 rubric for correctness (code compiles and tests pass), completeness (all breaking changes addressed), and production-readiness (code meets the department's standards) |
| **P4 Lead time for changes** | measure time from first commit on the feature branch to PR approval (or to merge if the department approves merge) |
| **P7 Vulnerability/risk reduction** | count of EOL or vulnerable components remediated by the exemplar upgrade |
| **P8 Reusable artefacts** | count the upgrade prompt template, PR description template, and lessons-learned format if reusable |


Secondary (collect if available):
- **P5 Change failure rate**: did the PR introduce any new test failures or regressions beyond the upgrade scope?
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI-generated code introduces regressions**: the AI fix for a breaking change may break other functionality | run the full test suite after every change; reviewer checks for unintended side effects before approval |
| **CI failures unrelated to the upgrade**: pre-existing flaky tests or infrastructure issues may obscure upgrade-related failures | record the baseline CI status before the upgrade branch; distinguish pre-existing failures from new ones |
| **Timebox overrun from cascading failures**: one upgrade may trigger a chain of failures | if more than 3 fix iterations are needed, stop, document the blocker, and defer to a follow-on option rather than exceeding the timebox |
| **Premature merge to main**: the PR may be merged without department approval | agree merge policy before starting; use branch protection rules if available; leave PRs in "open" state until explicitly approved |
| **Inaccurate effort extrapolation**: one exemplar may not represent the complexity of remaining upgrades | note the representativeness of the chosen dependency in the lessons-learned note; recommend a second exemplar if the first was unusually simple or complex |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] 1-2 PRs are open with descriptive bodies covering what was upgraded, what broke, and what was fixed.
- [ ] CI results are captured (pass/fail counts before and after).
- [ ] Each PR has been reviewed and approved (or feedback recorded) by the Solution Architect or Tech Lead.
- [ ] Lessons-learned note is written, covering: plan accuracy, unexpected blockers, iteration count, and corrected estimates.
- [ ] Compatibility map and upgrade plan are updated with corrections.
- [ ] Time log entries are recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added if the upgrade approach needs to change based on findings.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on code changes, fix proposals for CI failures, and PR description drafting. Compare AI-assisted PR creation time against estimated manual effort.
- **Prerequisites to document**: write access to a feature branch, CI pipeline accessibility, merge policy agreement.
- **Limits and risks to document**: any cases where AI-generated fixes were incorrect, where cascading failures required manual intervention, or where the exemplar was not representative.
- **Reusable assets**: upgrade PR prompt template, PR description template, lessons-learned format, CI failure diagnosis prompt.

- **Department continuation**: use the upgrade prompt template and PR description format to tackle remaining dependencies from the shortlist at the department's pace.

Pattern candidates:
- **"Exemplar-first estimation"**: creating a real PR before estimating the full upgrade provides far more accurate effort data than abstract analysis alone. Record the delta between the plan estimate and actual effort.
- **"AI-assisted CI failure diagnosis"**: feeding CI error output into the AI to propose fixes is faster than manual debugging for straightforward upgrade-related failures.

Anti-pattern candidates:
- **"Upgrading without a plan"**: attempting exemplar PRs before the compatibility map and breaking-change notes are ready leads to wasted effort and missed dependencies.
- **"Extrapolating from one exemplar"**: a single upgrade may be unrepresentatively easy or hard. Always note representativeness and recommend a second exemplar if needed.