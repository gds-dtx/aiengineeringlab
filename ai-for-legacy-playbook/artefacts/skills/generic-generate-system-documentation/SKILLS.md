---
name: generic-generate-system-documentation
description: "Generate a single, evidence-linked system documentation artifact from an existing documentation gap analysis report."
---

# Generic System Documentation Generation Skill

## Purpose
Create one actionable, onboarding-friendly system documentation artifact for `<SYSTEM_NAME>` using a pre-existing gap analysis report as the baseline.

The artifact must help engineers understand a complex microservice system well enough to support frontend consolidation planning, including topology, coupling, and safe sequencing.

## Primary Inputs
- Gap analysis report: `<GAP_ANALYSIS_REPORT_PATH>`
- Optional architecture/runtime references: `<EVIDENCE_PATHS[]>`

## Output Contract (Single File)
- Publish exactly one artifact at:
  - `<OUTPUT_ARTIFACT_PATH>`
- Do not split output into sidecar JSON or extra notes.

## Use This Skill When
- A validated documentation gap report already exists.
- Teams need a canonical documentation baseline that closes all reported gaps.
- Onboarding, operations, testing, or modernization planning is blocked by fragmented docs.
- Frontend consolidation decisions require clear cross-layer visibility (UI/client, gateway/orchestration, backend, async/runtime dependencies).

## Do Not Use This Skill When
- The task is feature implementation or bug fixing.
- There is no approved gap analysis baseline.

## Mandatory Acceptance Criteria
1. Documentation explicitly addresses all gaps from the baseline report (`<GAP_IDS[]>`).
2. Gap-to-section traceability is present with evidence references.
3. Runtime architecture and dependency coupling are covered in actionable detail.
4. Output is reviewed by `<REVIEWER_ROLE>`.
5. Artifact is stored at `<OUTPUT_ARTIFACT_PATH>`.
6. Frontend consolidation planning is explicitly supported with service topology, coupling hotspots, risk levels, and sequencing guardrails.
7. Documentation is sufficient for a new team member to understand change blast radius across frontend-to-backend boundaries.

## Required Evidence Inputs
Use repository-backed evidence only. Prioritize:
- Gap report: `<GAP_ANALYSIS_REPORT_PATH>`
- Architecture docs/diagrams
- Runtime flow docs/journey docs
- Service-level READMEs/config/pipeline evidence
- Contract/security/testing/governance artifacts

## Minimum Depth Requirements (Mandatory)
- Use at least `<MIN_EVIDENCE_ANCHORS>` evidence anchors with file path and line references.
- Use evidence from at least `<MIN_DISTINCT_FILES>` distinct files.
- Include at least `<MIN_CRITICAL_FLOWS>` critical runtime flows.
- For each critical flow include: entrypoint, called services/components, sync/async boundaries, data stores/queues, auth boundary, and rollback/recovery checkpoint.
- Every gap entry must map to at least one section and at least two evidence anchors.
- Include at least `<MIN_UI_TO_GATEWAY_MAPPINGS>` frontend-to-gateway/orchestration mappings.
- Include at least `<MIN_CROSS_LAYER_COUPLING_EXAMPLES>` concrete cross-layer coupling examples with named components.
- Include at least `<MIN_EXTERNAL_DEPENDENCY_RISKS>` dependency-coupling risks tied to external systems with severity and rationale.

## Required Workflow
Execute in order.

### Step 1: Confirm Baseline and Scope
- Confirm approved baseline report path.
- Confirm intended audience and use case.
- Capture unknowns that remain unresolved in the baseline.

### Step 2: Build Gap-to-Section Traceability
- Map each gap ID to section(s) in the target artifact.
- Add evidence anchors and completion status for each gap.

### Step 3: Draft Canonical System Narrative
- Produce a single narrative across domains/components.
- Distinguish facts vs inferences.
- Call out external dependencies that materially affect runtime behavior.

### Step 4: Decompose System by Runtime Roles
- Build role-based decomposition matrix using repository evidence.
- Roles should include at least: UI/client, gateway/orchestration, backend, scheduler/consumer, shared.
- Capture upstream callers, downstream dependencies, data stores/queues, and auth/security touchpoints.

### Step 5: Document Coupling and Critical Flows
- Describe cross-layer coupling patterns and risk levels (`low`, `medium`, `high`) with rationale.
- Include critical runtime flow catalog meeting minimum depth requirements.

### Step 5a: Add Frontend Consolidation Planning View
- Provide frontend consolidation guardrails: sequencing strategy, blast-radius notes, and rollback checkpoints.
- Highlight hotspots where contract drift or shared auth/session behavior can impact multiple journeys.
- Identify dependencies that must be stabilized before consolidation.

### Step 6: Fill Documentation Domains
Cover baseline gaps across these domains (adapt as needed):
- Ownership/governance
- Architecture/runtime flows
- Contracts/integration surfaces
- Operations/reliability/recovery
- Security/compliance
- Testing/release gates
- Onboarding/change safety
- Freshness/review/ADR governance

### Step 7: Add Delivery Backlog
- Include prioritized actions for unresolved gaps.
- Define owner (`known`/`unknown`), dependencies, and definition-of-done checks.

### Step 8: Review Gate (Mandatory)
Before publishing, include:
- Reviewer name
- Reviewer role (`<REVIEWER_ROLE>`)
- Review date
- Decision (`approved` or `changes required`)
- Review notes

If decision is `changes required`, revise and re-run this gate.

### Step 9: Publish
- Save final approved content only to `<OUTPUT_ARTIFACT_PATH>`.

## Required Sections in Output Artifact
Use this order:
1. Objective and Audience
2. Scope, Baseline Inputs, and Assumptions
3. Gap Traceability Matrix
4. Canonical System Architecture Narrative
5. System Role Decomposition Matrix
6. Coupling Patterns and Risk Classification
7. Critical Runtime Flow Catalog
8. Frontend Consolidation Planning View (sequencing, blast radius, guardrails)
9. Contracts and Integration Surfaces
10. Operations, Reliability, and Recovery Guidance
11. Security and Compliance Controls
12. Testing Strategy and Release Gates
13. Onboarding and Safe-Change Playbook
14. Governance, Freshness, and ADR Policy
15. Review Record
16. Delivery Backlog and Next Actions
17. Acceptance Criteria Check

## Quality Bar
- Evidence-linked: key claims include source file references.
- Actionable: guidance is operational, not only descriptive.
- Onboarding-safe: new team members can follow without tribal knowledge.
- Traceability-strong: major recommendations map to cited evidence.
- Review-complete: review gate present and approved.
- Consolidation-ready: frontend topology, coupling risks, and sequencing guidance are explicit and decision-usable.

## Failure Conditions
Do not publish as final if any are true:
- Any baseline gap is missing from traceability.
- Critical flow catalog is missing or below minimum depth.
- Evidence minimums are not met.
- Review block is missing or not approved.
- Artifact path differs from `<OUTPUT_ARTIFACT_PATH>`.
- Required sections are missing.
- Frontend consolidation planning view is missing or does not include sequencing + blast-radius guidance.
- Cross-layer mapping/coupling thresholds are not met.

