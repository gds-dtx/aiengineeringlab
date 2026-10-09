# Activity: Generate tests for change requests (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Weeks 2-3) |
| **Inputs** | Change request, repository, architecture summary |
| **Key output** | Test cases + coverage report |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
When an incoming change request targets code with low or no test coverage, the team faces a choice: merge the change without adequate tests (accepting risk) or delay while tests are written manually (accepting cost). Neither option supports fast, safe delivery.

This activity uses AI to generate tests specifically scoped to the code paths affected by an incoming change request. Unlike L3-AI-Assisted-Tests (which builds general coverage for an existing module), this activity is triggered by a specific change and targets only the areas the change will touch.

Decision enabled: merge the change with confidence that the affected paths are tested; confirm whether change-scoped test generation is effective for the team's workflow.


---

## 2) What we will do (scope and steps)
Description: Generate unit and contract tests for incoming changes.

Sub tasks:
1. Identify the change request: reference the specific ticket, user story, or PR that describes the incoming change.
2. Use the Change Impact Map (from L4-Change-Impact-Mapping, if available) or the AI assistant to identify the code paths affected by the change: direct files being modified, downstream consumers, and upstream providers.
3. For each affected path, check existing test coverage. Identify which paths have tests and which do not.
4. Use the AI code assistant to generate tests for the uncovered paths: (a) unit tests for functions/methods being modified, (b) contract or integration tests for API endpoints or service boundaries affected, (c) regression tests for downstream consumers.
5. Run the generated tests against the current code (before the change is applied). All tests should pass on the current code, confirming they test the baseline correctly.
6. Apply the change and re-run the tests. Record which tests pass and which fail. Distinguish between expected failures (the change should change the behaviour) and unexpected failures (the change broke something).
7. Fix or update tests as needed based on the change. Open a PR with both the change and the tests.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** triggered by an incoming change request. Benefits from Change Impact Mapping (L4) output. Schedule as needed during Weeks 2-4.

> **Out of scope:**
> - Complete test strategy rewrite.
> - Building general coverage for modules not affected by the change (see L3-AI-Assisted-Tests for that).
> - Performance or load testing.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** identify code paths affected by the change request; determine which paths lack test coverage.
- **Generate:** produce unit tests, contract tests, and regression tests scoped to the affected paths.
- **Automate and orchestrate:** run generated tests against current and changed code; diagnose failures and propose fixes.
- **Human in the loop:** the engineer reviews tests for correctness and relevance. The reviewer approves the PR with both the change and the tests.


---

## 4) Preconditions, access and governance
- Write access to a feature branch in the target repository.
- A specific change request or ticket to test against.
- Existing test framework and runner configured.
- CI pipeline accessible for running tests.
- Coverage tool available.
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for test generation) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Test frameworks | Jest, Mocha, pytest, JUnit, NUnit | whatever the project uses |
| Coverage tools | Istanbul/nyc, JaCoCo, coverage.py, dotnet-coverage |  |
| CI pipeline | GitHub Actions, Azure DevOps Pipelines, Jenkins, GitLab CI |  |
| Not typically needed | SCA/SBOM tools, document analysis tools, monitoring tools |  |


---

## 6) Timebox
Suggested: 1.5h per change request (scope-dependent). Schedule as needed during Weeks 2-4.

Expandability: this activity can be repeated per change request. Each additional change request adds approximately 1.5h.

---

## 7) Inputs and data sources
- Target repository with write access to a feature branch.
- The specific change request, ticket, or PR.
- Change Impact Map (from L4-Change-Impact-Mapping, if available).
- Architecture Summary (from L3, if available) for understanding which components the change touches and their boundaries.
- Existing coverage report (to identify which affected paths already have tests).
- CI pipeline access.
- If unavailable: if no impact map exists, use the AI assistant to trace affected paths from the change diff. Note this as a less thorough approach.


---

## 8) Outputs and artefacts
- PR with tests scoped to the change request's affected paths.
- Coverage report showing the change area's coverage before and after.
- Record of test results: which passed, which failed, and why (expected change vs unexpected breakage).
- Time log entry for P1.

Audience: Tech Lead, engineers working on the change. The tests travel with the change PR.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to generate, run, and stabilise change-scoped tests. Compare against estimate for manually writing equivalent tests |
| **P5 Change failure rate** | track whether changes accompanied by generated tests have lower failure rates than those without |
| **P6 Test coverage delta** | measure coverage of the change area before and after |
| **P8 Reusable artefacts** | count test generation prompt templates, change-scoped testing workflow |


Secondary:
- **P2 Quality score**: reviewer rates test quality on the 1-5 rubric.
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Tests that pass on both old and new code**: the generated tests may not actually verify the change's behaviour, rendering them ineffective as a safety net | after applying the change, check that at least some tests required updating. If zero tests are sensitive to the change, the tests are likely too shallow |
| **AI-generated tests that test the wrong thing**: the AI may generate tests for unrelated paths or test implementation details rather than behaviour | the engineer reviews every test for relevance to the change |
| **Change and tests tightly coupled**: if tests are written to match the exact implementation of the change, they become brittle | write tests against the expected behaviour (inputs and outputs), not the implementation |
| **Scope creep into general coverage**: the team may be tempted to write tests beyond the change area | scope tests strictly to the affected paths. General coverage is handled by L3-AI-Assisted-Tests |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Tests are scoped to the change request's affected paths.
- [ ] Tests pass on the current code (pre-change) to confirm baseline correctness.
- [ ] Tests are run post-change and results recorded.
- [ ] Coverage delta for the change area is recorded.
- [ ] PR has been reviewed and approved by the named reviewer.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of generating change-scoped tests; ability to cover paths that would otherwise be deployed untested.
- **Prerequisites to document**: test framework availability, CI access, change request clarity, impact map availability.
- **Limits and risks to document**: shallow tests, tests insensitive to the change, implementation-coupled tests.
- **Reusable assets**: change-scoped test generation prompt template, pre/post-change testing workflow.

- **Department continuation**: re-run for each future change using the test generation prompt template and change-scoped testing workflow.

Pattern candidates:
- **"Impact-map-driven test scoping"**: using the Change Impact Map to scope test generation ensures tests cover the right paths and avoids wasting time on unaffected areas.
- **"Pre-change baseline test run"**: running generated tests against the current code before applying the change confirms the tests actually verify the baseline behaviour.

Anti-pattern candidates:
- **"Generating tests after the change is merged"**: tests generated after merge cannot catch regressions during review. Generate tests before or alongside the change.
- **"Testing only the directly modified files"**: changes affect downstream consumers. Tests should cover downstream paths identified in the impact map, not just the files being edited.
- Reusable assets: prompts, templates, patterns for the library.