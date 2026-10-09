# Activity: Validate refactors with exemplar change (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | Half a day |
| **Phase** | Execute (Week 3) |
| **Inputs** | Refactoring shortlist, repository, CI pipeline |
| **Key output** | 1-2 refactor PRs + validation report |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Identifying refactoring opportunities (L4-Refactoring-Opportunities) is valuable only if the refactoring actually improves delivery. Without executing a refactor and measuring the result, the team is making assumptions about its value.

This activity takes one or two items from the prioritised refactoring shortlist and executes them as exemplar changes: small, measured refactors that demonstrate whether the improvement is real. Before and after metrics (complexity, test coverage, change time) provide evidence rather than opinion.

Decision enabled: proceed with further refactoring from the shortlist, adjust the approach, or stop if the measured benefit is insufficient.


---

## 2) What we will do (scope and steps)
Description: Apply a small refactor and deliver one exemplar change.

Sub tasks:
1. Select 1-2 items from the Refactoring Opportunities shortlist (L4). Choose items with the best combination of high impact, low risk, and clear measurability.
2. Record before-state metrics for the selected item(s): cyclomatic complexity, lines of code, duplication count, test coverage of the affected area, and (if available) average time to make a change in this area.
3. Use the AI code assistant to plan and draft the refactoring: extract duplicated code, decompose complex functions, reduce coupling, or improve naming/structure depending on the item type.
4. Review the AI-generated refactoring plan before implementation. Validate that the proposed changes are correct, do not change observable behaviour, and are consistent with the codebase style.
5. Implement the refactoring. Run existing tests to confirm no behaviour change. If tests fail, diagnose whether the failure is a test bug or a genuine regression.
6. Record after-state metrics: complexity, lines of code, duplication count, test coverage.
7. Open a PR with the refactored code, before/after metrics, and a brief note explaining what was changed and why.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs after Refactoring Opportunities (L4) provides the shortlist. Benefits from Tests for Change Requests (L4) if coverage of the refactoring area needs improving first. Schedule in Week 3-4.

> **Out of scope:**
> - Refactoring more than 2 items from the shortlist in this activity.
> - Framework or language migration.
> - Refactoring without before/after measurement (unvalidated refactoring).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review the selected hotspot(s) and propose a refactoring approach (extract, decompose, decouple).
- **Generate:** draft the refactored code, maintaining existing tests and API contracts.
- **Automate and orchestrate:** run tests pre- and post-refactoring to verify no behaviour change.
- **Human in the loop:** the engineer reviews the refactoring plan before implementation; the Tech Lead reviews the PR with before/after metrics.


---

## 4) Preconditions, access and governance
- Write access to a feature branch in the target repository.
- Prioritised refactoring shortlist from L4-Refactoring-Opportunities.
- Existing test suite covering the refactoring area (or tests added via L3/L4 test activities first).
- CI pipeline accessible for running tests.
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for refactoring) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Static analysis (for before/after metrics) | SonarQube, CodeClimate, Radon, NDepend |  |
| Test frameworks | Jest, Mocha, pytest, JUnit, NUnit | whatever the project uses |
| Coverage tools | Istanbul/nyc, JaCoCo, coverage.py |  |
| CI pipeline | GitHub Actions, Azure DevOps Pipelines, Jenkins, GitLab CI |  |
| Not typically needed | SCA/SBOM tools, monitoring tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 2h per refactoring item (including measurement). For 2 items, allow half a day total. Schedule in Week 3-4.

Expandability: this activity can be repeated per refactoring item. Each additional refactoring item adds approximately 2h.

---

## 7) Inputs and data sources
- Prioritised refactoring shortlist from L4-Refactoring-Opportunities.
- Target repository with write access to a feature branch.
- Architecture Summary (from L3, if available) for understanding component boundaries and dependencies of the refactoring target.
- Static analysis tools or metrics (for before/after measurement).
- Test suite and coverage tools.
- CI pipeline access.
- If unavailable: if test coverage is insufficient for the selected item, run L3-AI-Assisted-Tests or L4-Tests-for-Change-Requests first to establish a safety net.


---

## 8) Outputs and artefacts
- PR with the refactored code.
- Before/after metrics comparison: complexity, lines of code, duplication, test coverage.
- Brief refactoring notes: what was changed, why, and the measured result.
- Time log entry for P1.

Audience: Tech Lead, Solution Architect, engineers. The before/after metrics directly feed into the Evaluation Scorecard and inform the decision to continue refactoring.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to execute the refactoring with AI assistance. Compare against estimate for manual refactoring |
| **P2 Quality score** | reviewer rates the refactoring on the 1-5 rubric for correctness (no behaviour change), readability improvement, and maintainability improvement |
| **P4 Lead time** | if measurable, compare time to make a subsequent change in the refactored area versus the un-refactored baseline |
| **P8 Reusable artefacts** | count the refactoring pattern used, before/after measurement template |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P6 Test coverage delta**: record if new tests were added as part of the refactoring.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Refactoring introduces a regression**: the refactored code changes observable behaviour | run all existing tests before and after; if any test fails after refactoring that passed before, investigate before merging |
| **Refactoring improves metrics but not delivery**: the complexity score drops but developers do not find the code easier to work with | include qualitative feedback from the reviewing engineer alongside the quantitative metrics |
| **AI suggests unsafe refactoring**: the AI may propose changes that break API contracts, remove error handling, or change concurrency behaviour | the engineer reviews the full diff before committing; ensure test coverage of the affected area |
| **Insufficient test coverage to validate safely**: if the refactoring area has no tests, there is no safety net | confirm test coverage in preconditions; add tests first if needed (via L3/L4 test activities) |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] 1-2 refactoring items from the shortlist are implemented.
- [ ] Before/after metrics are recorded and compared.
- [ ] All existing tests pass after the refactoring.
- [ ] PR has been reviewed and approved by the named reviewer.
- [ ] Refactoring notes are documented.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of planning and executing the refactoring; quality of the refactored code.
- **Prerequisites to document**: shortlist availability, test coverage of the refactoring area, static analysis tools.
- **Limits and risks to document**: regressions introduced, metrics improvement without delivery improvement, unsafe AI suggestions.
- **Reusable assets**: before/after measurement template, refactoring patterns used, review checklist.

- **Department continuation**: apply the refactoring pattern and before/after measurement template to additional shortlist items at the department's pace.

Pattern candidates:
- **"Measured refactoring"**: recording before/after metrics for every refactoring provides evidence-based decisions about whether to continue. This pattern should become standard practice.
- **"Test-first refactoring"**: ensuring test coverage exists before refactoring reduces regression risk to near zero.

Anti-pattern candidates:
- **"Refactoring without measurement"**: executing refactoring work without recording before/after metrics makes it impossible to assess value. Always measure.
- **"AI-generated refactoring without review"**: AI may propose structurally valid but semantically incorrect changes. The engineer must review the full diff.
- Reusable assets: prompts, templates, patterns for the library.