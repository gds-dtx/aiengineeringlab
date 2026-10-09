# Activity: Generate AI assisted tests (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3) |
| **Inputs** | Repository, architecture summary |
| **Key output** | Test suite + coverage report |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems with low or no test coverage make every change risky. Engineers cannot tell whether a modification breaks existing functionality until it reaches production. This lack of confidence slows delivery and increases change failure rates.

This activity uses AI to generate unit and integration tests for a scoped module, focusing on the most critical code paths. The tests provide a safety net that directly enables other activities (upgrades, refactoring, feature delivery) to proceed with measurably higher confidence.

Decision enabled: merge the generated tests (increasing coverage), and confirm whether the approach is viable for extending coverage to other modules.


---

## 2) What we will do (scope and steps)
Description: Generate unit and contract tests for the scoped module.

Sub tasks:
1. Identify the scoped module(s) to target. Use one or more of: (a) code coverage reports to find lowest-coverage areas, (b) change frequency data (git log) to find most-frequently modified files, (c) output from the Documentation Gap Analysis or Architecture Summary showing high-risk areas.
2. For the selected module(s), use the AI code assistant to generate tests: (a) unit tests covering public methods and key code paths, (b) edge-case tests for error handling, boundary conditions, and null/empty inputs, (c) integration or contract tests for API endpoints or service interfaces if applicable.
3. Run the generated tests. Record: how many pass on first run, how many fail, and the reasons for failure (test bug vs production code bug vs flaky setup).
4. Fix failing tests: use the AI assistant to diagnose and correct test issues. Distinguish between AI-generated test errors (fix the test) and genuine bugs discovered (log the bug, do not fix production code in this activity).
5. Measure coverage: run the coverage tool before and after adding the tests. Record the delta.
6. Open a PR with the passing tests and the coverage report. Include a summary of any production bugs discovered.
7. Review with the named reviewer.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run after the Architecture Summary or Documentation Gap Analysis provides enough context. Feeds into L4 activities (Change Impact Mapping, Refactoring). Schedule in Week 2-3.

> **Out of scope:**
> - Full test strategy overhaul or test framework migration.
> - Fixing production bugs discovered by the tests (log and defer).
> - Performance or load testing.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** read the target module's code to understand public interfaces, code paths, and error-handling patterns; identify which paths are untested.
- **Generate:** produce unit tests, edge-case tests, and integration/contract tests with assertions that reflect the expected behaviour inferred from the code.
- **Automate and orchestrate:** diagnose test failures by reading error output, propose fixes for test bugs, and suggest regression tests for any production bugs discovered.
- **Human in the loop:** an engineer reviews every generated test for correctness (does it test the right thing?), maintainability (will future developers understand it?), and relevance (is it testing meaningful behaviour?). Reviewer approves the PR.


---

## 4) Preconditions, access and governance
- Write access to a feature branch in the target repository.
- Existing test framework and runner configured (or ability to add one within the timebox).
- CI pipeline accessible for running tests.
- Coverage tool available (e.g. Istanbul/nyc, JaCoCo, coverage.py, or equivalent).
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistant (for test generation) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Test frameworks | Jest, Mocha, pytest, JUnit, NUnit | whatever the project uses |
| Coverage tools | Istanbul/nyc, JaCoCo, coverage.py, dotnet-coverage |  |
| CI pipeline | GitHub Actions, Azure DevOps Pipelines, Jenkins, GitLab CI |  |
| Not typically needed | SCA/SBOM tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 1.5h for a single module; 2h for a larger module or if the test framework needs setup. Schedule in Week 2-3.

Expandability: this activity can be repeated per module. Each additional module adds approximately 1.5 to 2h.

---

## 7) Inputs and data sources
- Target repository with write access to a feature branch.
- Existing coverage report (to identify lowest-coverage areas). If no coverage tool is set up, use git log to identify most-changed files as a proxy.
- Architecture summary or gap register (to identify high-risk areas).
- CI pipeline access.
- If unavailable: if no test framework exists, budget the first 30 minutes of the timebox for minimal framework setup. Note this in the time log.


---

## 8) Outputs and artefacts
- PR with passing tests for the scoped module.
- Coverage report showing before/after delta.
- List of any production bugs discovered during testing (logged, not fixed in this activity).
- Time log entry for P1.

Audience: Tech Lead, engineers working on the module. Coverage data feeds into the pilot metrics.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to generate, fix, and stabilise the tests. Compare against the department's estimate for writing equivalent tests manually |
| **P2 Quality score** | reviewer rates the tests on the 1-5 rubric for correctness (tests test the right thing), coverage usefulness (tests cover meaningful paths), and maintainability |
| **P6 Test coverage delta** | measure coverage percentage before and after. This is a primary metric for this activity |
| **P8 Reusable artefacts** | count the test generation prompt template, module-targeting strategy, and any test utility code created |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P5 Change failure rate**: if the tests catch bugs, record them.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI-generated tests that pass but test nothing useful**: tests may assert trivially true conditions or mock everything away | reviewer checks that assertions are meaningful and test real behaviour |
| **Tests that encode current bugs as expected behaviour**: the AI generates tests based on what the code does, not what it should do | reviewer validates expected values against the intended behaviour; flag any "tests passing on buggy code" cases |
| **Flaky tests**: AI-generated tests may have timing dependencies or order-of-execution issues | run tests multiple times before committing; remove or fix flaky tests |
| **Scope creep into production bug fixes**: discovering bugs during testing may tempt the team to fix them immediately | log bugs and defer fixes; this activity is about adding tests, not fixing production code |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Tests are committed to a feature branch and pass in CI.
- [ ] Coverage delta is recorded (before/after).
- [ ] Any production bugs discovered are logged as separate items.
- [ ] PR has been reviewed and approved by the named reviewer.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of test generation versus manual writing; coverage improvement achieved per hour.
- **Prerequisites to document**: test framework availability, coverage tool, CI access.
- **Limits and risks to document**: any trivial or flaky tests generated, bugs encoded as expected behaviour.
- **Reusable assets**: test generation prompt template, module-targeting strategy, coverage measurement commands.

- **Department continuation**: generate tests for additional modules using the test generation prompt template and module-targeting strategy.

Pattern candidates:
- **"Coverage-targeted test generation"**: directing the AI to generate tests for the lowest-coverage or highest-churn areas maximises impact per hour.
- **"AI test generation with human assertion review"**: reviewing AI-generated assertions improves test quality significantly.

Anti-pattern candidates:
- **"Merging AI tests without running them"**: AI-generated tests frequently fail on first run. Always run and stabilise before merging.
- **"Testing everything at once"**: attempting to cover the entire codebase in one timebox produces shallow, low-quality tests. Focus on one or two modules.
- Pre requisites: list access and licensing assumptions.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.