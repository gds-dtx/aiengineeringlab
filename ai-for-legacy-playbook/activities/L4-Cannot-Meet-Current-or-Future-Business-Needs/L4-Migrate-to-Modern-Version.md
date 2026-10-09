# Activity: Migrate to a modern supported version (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-4h |
| **Phase** | Execute (Weeks 2-4) |
| **Inputs** | Legacy repository, dependency manifests, architecture summary |
| **Key output** | Migration execution plan + exemplar modernisation change |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Running legacy software on unsupported or near-end-of-support versions increases operational risk, security exposure, and delivery friction. Teams often postpone upgrades because impact is unclear, compatibility issues are hard to predict, and migration effort is difficult to estimate.

This activity uses AI-assisted analysis and transformation to modernise a targeted slice of the system to a supported version, validate runtime behaviour, and capture a repeatable migration approach. It focuses on proving feasibility and producing practical artefacts for wider rollout.

Decision enabled: confirm whether migration to the target version is viable within acceptable risk, and whether to proceed with broader migration in phased increments.


---

## 2) What we will do (scope and steps)
Description: Upgrade a scoped part of the legacy application to a supported target version/platform and validate behaviour.

Agent-first execution: run this activity through the migration agent workflow using [Migration Orchestrator](../reusable-agents/legacy-migration/migration-orchestrator.agent.md), which coordinates:
- [Legacy System Analyst](../reusable-agents/legacy-migration/legacy-system-analyst.agent.md)
- [Target Architecture and Intent](../reusable-agents/legacy-migration/target-architecture-intent.agent.md)
- [Behaviour Baseline and Characterisation Testing](../reusable-agents/legacy-migration/behaviour-baseline-characterisation-testing.agent.md)
- [Migration Planner and Slice Designer](../reusable-agents/legacy-migration/migration-planner-slice-designer.agent.md)
- [Slice Implementer Agent (Worker)](../reusable-agents/legacy-migration/slice-implementer-worker.agent.md)
- [PR Quality Gate Agent](../reusable-agents/legacy-migration/pr-quality-gate-verification.agent.md)
- [Drift and Retrospective Learning Agent](../reusable-agents/legacy-migration/drift-retrospective-learning.agent.md)

How to run this activity with the migration agent:
1. Start migration session (new): ask Migration Orchestrator to initialize `.github/migrations/<migration-id>/` and enter the appropriate phase.
2. Continue migration session (existing): ask Migration Orchestrator to resume `<migration-id>` and report phase, blockers, ready work, and next action.
3. Execute one approved migration slice for this activity in execution phase.
4. Require PR Quality Gate PASS before merge recommendation.
5. Update tracker/state before moving to the next slice or phase.

Sub tasks:
1. Pre-activity gate: document current-state legacy architecture, only if existing architecture documention doesn't exist, using [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) in `mode=legacy`.
2. Define scope and target: pick the migration slice (service/module/app area), the target version, and success criteria for this activity.
3. Run readiness checks: validate runtime prerequisites, library compatibility, and deployment environment constraints.
4. Build dependency baseline: extract SBOM/dependency list and identify version blockers, deprecated packages/APIs, and likely breaking changes.
5. Apply code and configuration modernisation: use AI assistance for syntax updates, API replacements, config changes, and build file updates.
6. Handle schema/data migration where relevant: generate and review migration scripts, then validate data compatibility in a non-production environment.
7. Regenerate and run tests: create or update regression tests for migrated paths and run in CI/staging.
8. Validate deployment behaviour: execute smoke tests, basic performance checks, and rollback verification in controlled environments.
9. Produce handover artefacts: migration notes, known issues, reusable prompts/scripts, and next-slice recommendations.
10. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** architecture baseline is mandatory before migration starts. First generate/update current-state architecture using [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md), then run this activity. This can feed L4-Tests-for-Change-Requests, L4-Validate-Refactors-Exemplar, and L6 security remediation activities. Schedule during Weeks 2-4.

> **Out of scope:**
> - Full-system migration in one activity.
> - Production cutover governance and enterprise release planning.
> - Large-scale architecture redesign unrelated to version/platform support.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** assess dependency compatibility, detect deprecated APIs, identify likely breakpoints, and propose migration order.
- **Retrieve and ground:** search code/config for impacted symbols, runtime settings, and environment assumptions.
- **Generate:** draft code/config transformations, migration scripts, and regression tests for migrated components.
- **Human in the loop:** engineers review all generated changes, validate behaviour in staging, and approve readiness for broader rollout.


---

## 4) Preconditions, access and governance
- Read/write access to the target repository and deployment config.
- Target version/platform defined and approved.
- Non-production validation environment available.
- Baseline metrics captured for comparison (at least P1 and P2, plus P4/P7 where possible).
- Named reviewer (Tech Lead/Solution Architect) available for migration sign-off.
- Migration agent files available in repo (`.github/agents/` in the target codebase) and a `migration-id` agreed.
- Migration state files available or creatable: `.github/migrations/<migration-id>/state.yaml` and `.github/migrations/<migration-id>/tracker.md`.
- Current-state architecture artefacts exist and are up to date, produced via [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) (for example under `docs/architecture/<system-name>/`).
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for modernisation) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Dependency and SCA tooling | OWASP Dependency-Check, Snyk, Dependabot, osv-scanner |  |
| Build and migration tooling | npm/pnpm/yarn tooling, Maven/Gradle, Flyway, Liquibase | choose according to stack |
| CI/CD and validation | GitHub Actions, Jenkins, Azure DevOps Pipelines, GitLab CI |  |
| Not typically needed | LLM fine-tuning tools, advanced observability platforms for this activity alone |  |


---

## 6) Timebox
Suggested: 2h for analysis and implementation of a scoped migration slice; up to 2h for testing, validation, and handover artefacts. Total: 2-4h for one exemplar slice.

Expandability: repeat per service/module/slice. Each additional slice adds approximately 2-4h depending on dependency complexity and test readiness.

---

## 7) Inputs and data sources
- Target legacy codebase and build configuration.
- Dependency manifests and lockfiles.
- Current-state architecture artefacts from [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) and change impact context (from L4-Change-Impact-Mapping, if available).
- CI pipeline definitions and recent run history.
- Existing test suites and coverage reports.
- If unavailable: stop and run the architecture pre-activity first. Do not start migration implementation without current-state architecture documentation.


---

## 8) Outputs and artefacts
- Migration execution plan for the scoped slice: target version, blockers, sequence, and rollback notes.
- Exemplar modernisation change (PR/commit set) with code/config updates.
- Validation evidence: test results, smoke checks, and compatibility outcomes.
- Updated architecture/migration notes and reusable prompt/script snippets.
- Time log entry for P1.
- Reference link/path to the architecture baseline used as migration input.
- Migration orchestration state updates for this activity in:
	- `.github/migrations/<migration-id>/state.yaml`
	- `.github/migrations/<migration-id>/tracker.md`
	- `.github/migrations/<migration-id>/execution/<slice-id>/outcome.md`
	- `.github/migrations/<migration-id>/execution/<slice-id>/pr-quality-gate.md`

Audience: Tech Lead, Solution Architect, delivery team, and platform/operations stakeholders. Outputs support decisions on phased migration rollout.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to complete one scoped migration slice with AI assistance. Compare against estimate for manual migration work |
| **P2 Quality score** | reviewer rates migration artefacts and implementation quality on the 1-5 rubric (correctness, completeness, maintainability) |
| **P4 Lead time for changes** | compare delivery time for migrated changes versus pre-migration baseline where available |
| **P7 Risk reduction** | count deprecated APIs/packages removed and supported-version coverage gained in the migrated scope |
| **P8 Reusable artefacts** | count prompts, migration scripts, templates, and runbook notes produced |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI introduces incorrect transformations**: generated changes compile but alter behaviour | enforce code review, regression testing, and staged validation before merge |
| **Hidden compatibility issues**: transitive dependencies or runtime assumptions break after upgrade | run dependency compatibility checks and smoke tests in environment-matched staging |
| **Data/schema migration defects**: migration scripts may be incomplete or unsafe | require backup/rollback path and review scripts before execution |
| **Scope creep**: migration slice expands into full-system effort | lock scope at start and defer non-essential changes to follow-on slices |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Current-state architecture has been documented via Architecture Docs and Governance Orchestrator before migration implementation started.
- [ ] Scoped migration target and success criteria are documented.
- [ ] Exemplar modernisation change is implemented and reviewed.
- [ ] Functional/regression tests for migrated paths pass.
- [ ] Validation evidence (smoke checks and compatibility outcomes) is recorded.
- [ ] Migration execution plan and handover notes are published.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Migration Orchestrator state/tracker are updated for this slice.
- [ ] PR Quality Gate Agent returned PASS, or FAIL actions are captured and routed back to implementation.


---

## 12) Playbook contribution
- **Where AI helped**: dependency analysis speed, transformation drafting quality, and test generation utility.
- **Prerequisites to document**: access needs, target-version prerequisites, and validation environment requirements.
- **Limits and risks to document**: inaccurate transformations, hidden compatibility gaps, and migration failure modes.
- **Reusable assets**: prompts, migration templates, compatibility checklists, and rollback/runbook patterns.

- **Department continuation**: apply the same migration pattern slice-by-slice and refine templates with each iteration.

Pattern candidates:
- **"Slice-first modernisation"**: delivering one validated migration slice reduces uncertainty before wider rollout.
- **"Evidence-backed migration gate"**: requiring test and smoke evidence before expansion improves migration quality.

Anti-pattern candidates:
- **"Big-bang migration in one pass"**: attempting full-system migration in one activity increases risk and delay.
- **"Transformation without validation"**: accepting AI-generated changes without staged verification causes regressions.
- Reusable assets: prompts, templates, patterns for the library.

---

### References
- [Pilot Activity Template & Planning Guide](https://kainossoftware.atlassian.net/wiki/spaces/DACLLMC/pages/5858263041/Pilot+Evidence+Pack+-+Template)
- [Activity Catalogue (DSIT GitHub)](https://github.com/KainosSoftwareLtd/dsit-legacy-pilot-activities)
- [AI Legacy Modernisation Playbook](https://kainossoftware.atlassian.net/wiki/spaces/DACLLMC/pages/5859344391/Sample+Playbook)