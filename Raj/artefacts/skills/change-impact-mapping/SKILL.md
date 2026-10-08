# Skill: Generic Change Impact Mapping

## Purpose

Produce an evidence-linked change impact map before cross-service or cross-component changes, so blast radius is visible, release risk is quantified, and go/no-go decisions are faster.

## When to Use

- A change request may affect multiple services, components, or teams.
- Consolidation, refactoring, or migration planning needs dependency and coupling visibility.
- Teams need one artifact that feeds testing, observability, and migration readiness.
- Release planning requires explicit coupled-release chain analysis.

## Do Not Use This Skill When

- The task is implementing code changes instead of change-impact analysis.
- No repository evidence exists for the affected systems.

## Inputs

### Required task inputs (must be present)

1. `SystemName`
2. `ChangeSummary` (1-3 sentences)
3. `TargetComponents` (list of services/modules)
4. `InScopeDomains` and `OutOfScopeDomains`
5. `PlannedReleaseWindow` (or `unknown`)
6. `ChangeType` (one or more): `frontend-consolidation`, `queue-contract`, `auth-session`, `shared-backend-fanout`, `schema-data`, `other`

If any required input is missing, stop and publish a minimal artifact with only `Objective and Scope`, `Scenario Set and Assumptions`, and `Open Unknowns and Owner Actions`.

### Repository evidence categories

Collect repository evidence for:

- Architecture and runtime flows (diagrams, design docs, service READMEs, sequence docs).
- Build/deploy/release pipelines (for at least one canonical chain per domain in scope).
- Cross-domain touchpoints (for example queues, APIs, shared backends, auth/session, external integrations).

## Execution Profile

Pick exactly one profile and state it in the output:

- `rapid` - Minimum evidence for same-day triage. At least 6 evidence anchors and 3 scenarios.
- `standard` - Default. At least 12 evidence anchors and 3 scenarios with full feeds.
- `deep` - Release-critical or high uncertainty. At least 20 evidence anchors, expanded unknowns table, and explicit owner actions.

## Output Contract

- Publish one artifact only at the task-specified output path.
- Output format must be:
  - Scenario tables (primary)
  - Mermaid dependency/impact diagram (supporting visualization)
- Output must include:
  - Top decision list (go/no-go support)
  - Open unknowns with owners/dates
  - CR/PR paste block for immediate adoption

## Mandatory Scenario Coverage

Include at least three representative scenarios:

1. Async/event-driven chain
   - Include producer, transport/broker, and consumer dependencies.
2. Shared-backend fan-out chain
   - Include gateway/orchestrator and downstream shared service coupling.
3. UI or API entrypoint to orchestrator to downstream chain
   - Include orchestration dependencies and downstream coupling.

Also include external or adjacent-domain touchpoints where coupling is relevant (for example publishing, queue bridges, or document integrations).

## Risk Classification Rules

Use these risk tiers in scenario rows:

- `high`
- `medium-high`
- `medium`
- `low`

At minimum, classify and explain `high` and `medium-high` rows.

### Scoring model (mandatory)

For each risk-bearing row, score:

- `Likelihood (L)` from 1 to 5
- `Impact (I)` from 1 to 5
- `Detectability (D)` from 1 to 5 (1 = hard to detect early, 5 = easy to detect early)

Compute:

- `RiskScore = (L * I) + (6 - D)`

Map score to tier:

- `22-30` -> `high`
- `15-21` -> `medium-high`
- `9-14` -> `medium`
- `2-8` -> `low`

Escalation rule:

- If row includes queue dependency, auth/session coupling, or shared-backend fan-out and score is one point below a boundary, escalate one tier (max `high`).

## Evidence Policy

- Default: file-level citations for scenario claims.
- Mandatory file+line anchors for:
  - `high` rows
  - `medium-high` rows involving queue or auth/session coupling
- Prefer repository evidence over assumptions.
- Mark assumptions explicitly when evidence is incomplete.

### Evidence confidence (mandatory)

For each risk-bearing row, assign:

- `strong` - direct evidence in repo supports claim
- `moderate` - evidence is indirect but consistent
- `weak` - assumption-heavy or partial evidence

If `weak` is used on `high` risk rows, add explicit owner action in `Open Unknowns and Owner Actions`.

## Coupled Release Pattern Requirement

Explicitly expand:

1. One canonical release chain for Domain A (build/deploy/config dependencies).
2. One canonical release chain for Domain B (build/deploy/config dependencies).

Show upstream/downstream dependencies and where coordinated release is required.

## Required Workflow

Execute in order:

1. Confirm required task inputs and execution profile.
2. Confirm scope and scenarios.
3. Build coupling inventory from architecture/runtime evidence.
4. Build release-chain dependency view for one chain in each major domain.
5. Draft scenario blast-radius tables with risk scores, tiers, and evidence references.
6. Add top decision list (highest risk decisions and gating actions).
7. Add mermaid cross-domain impact graph.
8. Add a developer-facing pre-change risk prediction workflow/checklist that tells engineers how to use the artifact before changes.
9. Map each scenario to:
   - change-request test inputs
   - observability improvement opportunities
   - migration readiness checks
10. Add open unknowns with owner + due date.
11. Add CR/PR paste block.
12. Add acceptance-criteria traceability table and finalize artifact path.

## Required Sections in Output Artifact

Use this section order:

1. Objective and Scope
2. Change Request Intake Snapshot
3. Scenario Set and Assumptions
4. Cross-Service Dependency and Coupling Baseline
5. Coupled Release Patterns (Domain A and Domain B)
6. Scenario Blast Radius Tables
7. Top Decision List
8. Cross-Domain Mermaid Impact View
9. Developer Pre-Change Risk Prediction Workflow
10. Test Impact Feed for Change Requests
11. Observability Improvement Feed
12. Migration Readiness Feed
13. Open Unknowns and Owner Actions
14. CR/PR Paste Block
15. Acceptance Criteria Traceability

## Structured Table Standards (Mandatory)

All report tables must follow these rules:

1. Keep column names consistent with the templates in this skill.
2. Keep risk values normalized to: `low`, `medium`, `medium-high`, `high`.
3. Include `Risk score`, `L`, `I`, `D`, and `Evidence confidence` in all risk-bearing tables.
4. Sort rows by risk severity first (`high` -> `medium-high` -> `medium` -> `low`), then by business impact.
5. Use concise, decision-ready text (short phrases, not paragraphs) in table cells.
6. Every risk-bearing row must include an `Evidence` cell.
7. Evidence format:
   - file-level allowed for general rows: `path/to/file.md`
   - file+line required for `high` and queue/auth `medium-high` rows: `path/to/file.md:line-line`
8. Avoid mixed column order across sections; use the exact template order below.

## Section Table Templates (Mandatory)

Use these exact column structures when generating the artifact:

1. Change Request Intake Snapshot
   - `Input key | Value | Status (`provided`/`missing`) | Notes`
2. Cross-Service Dependency and Coupling Baseline
   - `Coupling ID | Coupling pattern | Representative chain | L | I | D | Risk score | Risk tier | Evidence confidence | Blast-radius cause | Primary impacted domains | Evidence`
3. Coupled Release Patterns (Domain A and Domain B)
   - `Release ID | Domain | Stage | Pipeline/component | Dependency edge | Coupling implication | Coordination required | Evidence`
4. Scenario Blast Radius Tables
   - `Scenario ID | Impact dimension | Affected services/components | L | I | D | Risk score | Risk | Evidence confidence | Change effect | Detection signal | Required mitigation/check | Evidence`
5. Top Decision List
   - `Decision ID | Decision statement | Risk driver | Required action before go-live | Owner | Due date | Evidence`
6. Developer Pre-Change Risk Prediction Workflow
   - `Workflow step | Developer action | Section input to use | Output artifact in CR/PR | Required gate`
7. Test Impact Feed for Change Requests
   - `Scenario ID | Must-run test scope | Failure mode covered | Priority | Exit criteria`
8. Observability Improvement Feed
   - `Scenario ID | Signal gap | Metric/trace/log requirement | Alert/check | Priority | Owner`
9. Migration Readiness Feed
   - `Readiness ID | Area | Readiness gate | L | I | D | Risk score | Risk tier | Status (`ready`/`at-risk`/`blocked`) | Evidence-backed reason | Evidence`
10. Open Unknowns and Owner Actions
   - `Unknown ID | Unknown statement | Impacted scenario(s) | Risk implication | Owner | Due date | Closure evidence expected`
11. CR/PR Paste Block
   - `Field | Value`
12. Acceptance Criteria Traceability
   - `Acceptance criterion | Section reference | Result (`met`/`partial`/`not met`) | Evidence`

## Acceptance Criteria Mapping (Mandatory)

The final artifact must explicitly show:

- Blast radius mapped for representative multi-service scenarios.
- Coupled release patterns spanning multiple services reflected in the map.
- Output feeds tests for change requests, observability improvements, and migration readiness activities.
- Top decisions and unknowns are explicit and owner-assigned.
- Artifact stored at the task-defined output path.

## Quality Bar

- Scenario-focused and decision-usable.
- Evidence-linked and traceable.
- Scope includes primary systems and cross-domain touchpoints.
- Risks are prioritized and operationally actionable.
- Release coupling is explicit, not implied.
- Includes a concise developer runbook/checklist for pre-change risk prediction.
- Includes a CR/PR-ready summary block for immediate usage.
- Tables are consistently structured using the mandatory templates and normalized risk/evidence formatting.

## Failure Conditions

Do not publish final artifact if any are true:

- Any required task input is missing without `Open Unknowns and Owner Actions` coverage.
- Any mandatory scenario is missing.
- No mermaid view is included.
- Both canonical release chains are not expanded.
- Any risk-bearing row is missing `L`, `I`, `D`, `Risk score`, or `Evidence confidence`.
- `high`/`medium-high` queue/auth rows do not have file+line evidence.
- `high` rows with `weak` evidence confidence have no owner action.
- Top Decision List section is missing or not actionable.
- Developer pre-change risk prediction workflow section is missing or not actionable.
- Output tables do not follow the mandatory section templates.
- Risk labels or evidence formatting are inconsistent with the Structured Table Standards.
- Acceptance criteria are not mapped explicitly.
- Output path differs from the task-defined output contract.

