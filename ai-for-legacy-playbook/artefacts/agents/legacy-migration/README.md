# Legacy Migration Agents

This folder defines the migration workflow for a simplified plan-and-iterate model.

## Prerequisites

Before running the migration agents, the project team must be able to perform the following on the target repository:

- Build the codebase successfully using the project-standard build command.
- Run unit, integration, and E2E tests locally or in a controlled CI-equivalent environment.
- Install and run Docker, including building images and running containers.
- Install project toolchain dependencies required by the repo (for example runtime SDKs, package managers, build tools, and test runners).
- Access repository manifests and lock files so dependency/version analysis can run.
- Provide write access for migration artefacts under .github/migrations/<migration-id>/.
- Provide approved technical preferences under target/preferences.md before baseline remediation and planning.
- Provide network and credential access needed for non-production test dependencies (such as local test databases or approved mocks).

Recommended readiness checks before kickoff:

- Verify build command returns success.
- Verify unit, integration, and E2E test commands execute and return results.
- Verify docker build and docker run commands work in the local environment.
- Verify required language/tool versions match repository expectations.
- Verify OpenRewrite execution path is available for recipe-supported uplifts where applicable.

## Lifecycle

The orchestrated lifecycle is:

1. Discover — current-state BDD spec
2. Target — architecture intent and preferences
3. Test — pyramid-wide assessment, test creation, and human sign-off
4. Planning — target spec and migration plan
5. Execution

## Human-In-The-Loop Gates

Human approval is required at:

- **Discover completion** — confirm `product-features.md` accurately describes the system (this is the testing contract; AI cannot mark its own homework without this confirmation)
- **Target completion** — approve target architecture and preferences
- **Test completion** — sign off the baseline test suite with the statement: "If this test suite passes, I am confident this application is working correctly." Recorded in `state.yaml` as `test-suite-signoff: approved`
- **Planning completion** — approve `target-spec.md` (what the migrated system will be) and `plan.md` (how to build it) before Execution starts
- **Execution completion** — final release readiness approval

## Test Policy

The Test phase is a single gate handled by the Test Expert agent.

The Test Expert:

- assesses the full test pyramid (unit, integration, E2E) against every spec entry in `product-features.md`
- classifies gaps by spec entry, not coverage percentage alone
- detects test mode and routes accordingly:
  - **Mode A** (adequate tests exist): translate existing tests to target framework; human confirms translation fidelity; AI must not invent new cases
  - **Mode B** (tests absent or inadequate): spec-driven TDD from `product-features.md`; failing tests first, then implementation code; AI must not derive cases from reading implementation
- runs build verification and records execution evidence
- raises a mandatory human sign-off gate before the Test phase can exit

Execution uses only the ported baseline test set. Execution must not create new tests for self-evaluation.

## product-features.md Role

`product-features.md` is not a documentation artefact. It is a BDD-style behavioural specification with numbered `PF-n` entries in Given/When/Then form, readable by a Business Analyst or Product Owner. It is the single source of truth for test assessment, test case derivation, and the migration target spec.

Human confirmation of this spec at Discover gate is the control that prevents AI from marking its own homework.

## Planning Policy

Planning produces two artefacts in sequence:

1. `planning/target-spec.md` — **what the migrated system should be**: behaviour contracts in the target framework, API surface, component structure, data model, acceptance criteria, and traceability from every PF-n entry to the target implementation.
2. `planning/plan.md` — **how to build it**: implementation sequence, version uplifts, containerization plan, risks.

Both require human approval before Execution starts.

OpenRewrite rule: if a public recipe exists for an uplift, OpenRewrite is mandatory. Manual path only where no recipe exists.

## Execution Policy

Execution produces a complete, self-contained `migrated-system/` output folder as the primary deliverable. The folder contains the migrated source code, the ported test suite, Dockerfile, README, and all supporting files needed for the system to build and run independently.

Execution follows a TDD sequence:

1. **Port the test suite first (TDD red phase)** — copy tests from the source system into the output folder and adapt them for target framework/library conventions only. Business logic in tests must not change. Tests must be in a failing (red) state before any implementation code is written. The tests are the source of truth for whether the migration is correct.
2. **Apply OpenRewrite uplifts** — recipe-supported version uplifts applied before any hand-written changes.
3. **Implement remaining changes** in bounded batches guided by `target-spec.md`, iterating until all ported tests are green.
4. **Containerize** — add Docker artefacts to the output folder and validate in container context.

Execution must not modify test business logic. If a test cannot pass without changing its business logic, it is a blocker requiring human decision.

OpenRewrite rule: if a public recipe exists for an uplift, OpenRewrite is mandatory. Manual path only where no recipe exists.

## Containerized End-State Criteria

Execution gate requires:

- `migrated-system/` folder exists and is complete (code, tests, Dockerfile, README)
- docker build success from within `migrated-system/`
- ported tests run and pass in container context
- documented runtime command in `migrated-system/README.md`
- any deliberate-delta planned failures reviewed by a human

## Agent Set

Each agent folder now includes a companion `README.md` with explicit invocation and after-run guidance.

Active agents:

- `migration-orchestrator.agent.md` — primary entrypoint
- `legacy-system-analyst.agent.md` — Discover phase
- `target-architecture-intent.agent.md` — Target phase
- `test-expert.agent.md` — Test phase (pyramid-wide assessment + Mode A/B creation + verification + sign-off gate)
- `migration-target-spec.agent.md` — Planning phase (what the migrated system should be)
- `migration-plan.agent.md` — Planning phase (how to build it)
- `migration-implementation.agent.md` — Execution phase (TDD test porting + OpenRewrite uplifts + iterative implementation; primary deliverable is `migrated-system/` folder)

## Evidence Contract

For command execution evidence, record:

- exact command
- exit code
- execution timestamp
- pass/fail summary
- failure classification when applicable
