---
name: generic-doc-gap-analysis
description: "Run a system-agnostic documentation gap analysis with mandatory discovery questions, weighted prioritization, and output contracts for docs and test planning workflows."
---

# Generic Documentation Gap Analysis Skill

## Purpose
Produce an evidence-based documentation gap register for any system so teams can:
- reduce delivery and migration risk,
- improve onboarding and maintainability,
- and generate structured inputs for documentation and test-planning activities.

## Use This Skill When
- You need a prioritized documentation gap analysis for a service, platform, or multi-repo system.
- You need a repeatable method that can be compared across teams/systems.
- You need output that can be consumed by doc generation or AI-assisted test workflows.

## Do Not Use This Skill When
- The task is implementation-only (feature work or bug fixing).
- The task is performance tuning without documentation concerns.
- The task is a one-off README cleanup without risk prioritization.

## Inputs Required
- System name and scope boundary (repos/modules/services/environments).
- Existing documentation sources (READMEs, ADRs, runbooks, architecture docs, API specs).
- Primary stakeholders (engineering, QA, security, platform, operations, product).
- Timebox and review window (default target: 2-3 days with SME support).

## Interaction Protocol (Mandatory)
This skill must run as an interactive interview, not a one-pass report.
- Ask one discovery section at a time and wait for user input before continuing.
- After each section, summarize captured answers and ask for confirmation: `confirm`, `revise`, or `unknown`.
- Do not score gaps until all required discovery sections are either `confirm` or explicitly marked `unknown`.
- If evidence is missing, ask a follow-up prompt for the exact file/source before proceeding.
- Maintain an interaction log with timestamp, question, user response, and evidence links inside the same execute report file.

## Question Flow (Ask in Order)
Run sections in this order and do not skip unless user opts out:
1. Scope and ownership
2. Architecture and runtime flows
3. Contract and integration surfaces
4. Operations and reliability
5. Security and compliance
6. Testing and quality gates
7. Onboarding and change safety
8. Final assumptions and unknowns
9. Additional useful information

## Required Discovery Questions
Ask these questions before scoring. Capture answers with evidence links.

### 1) Scope and Ownership
- What exact modules/services are in scope?
- Who owns each major area (code owner + backup)?
- What out-of-scope dependencies still affect behavior?

### 2) Architecture and Runtime Flows
- Where is the canonical end-to-end architecture documented?
- Which request, async, and data flows are critical to business outcomes?
- Which flows are currently documented only by tribal knowledge?

### 3) Contract and Integration Surfaces
- Where are API/event/schema contracts defined and versioned?
- Which consumers/producers are most sensitive to contract drift?
- What backward-compatibility and deprecation rules exist?

### 4) Operations and Reliability
- Which runbooks exist for deploy, rollback, incident triage, and recovery?
- Where are environment/configuration and secret-management policies documented?
- Which high-severity failure modes lack actionable playbooks?

### 5) Security and Compliance
- Where are AuthN/AuthZ rules and decision logic documented?
- Which compliance requirements must be traceable to docs and tests?
- Which security controls are inferred rather than explicitly documented?

### 6) Testing and Quality Gates
- What is the current test strategy across unit/integration/e2e/contract?
- Which critical behaviors lack clear acceptance criteria?
- How are release gates and parity checks documented?

### 7) Onboarding and Change Safety
- What is the expected ramp-up path for a new engineer?
- Which docs are required for safe production changes?
- Where do contributors routinely ask the same unanswered questions?

### 8) Final Assumptions and Unknowns
- What assumptions and unknowns should be explicitly carried into scoring and publish decisions?

### 9) Additional Useful Information
- Would you like to add any additional information that would be useful for this analysis?

## Response Capture Template
Capture each answer in this format:

```text
section: <section_name>
question_id: <Q1...Qn>
question: <question_text>
answer: <user_response>
evidence_links: [<path_or_url>, ...]
evidence_type: <Direct evidence|Inference|Unknown>
status: <confirm|revise|unknown>
notes: <follow_up_or_constraints>
captured_at: <ISO-8601 timestamp>
```

## Evidence Baseline Rules
Use repository-backed evidence only. Prefer:
- `*/README.md`
- `*/doc/**/*.md`
- `**/DESIGN.md`, `**/*runbook*.md`, `**/*playbook*.md`
- API/spec artifacts (`openapi*`, schema docs, interface contracts)
- Prior analysis artifacts and post-incident learnings

Mark each statement as:
- `Direct evidence` (explicit in docs), or
- `Inference` (derived from code/interviews due to missing docs).

## Gating and Confirm Prompts
Use these prompts between phases:
- Section confirm prompt: `I captured <section>. Reply with confirm, revise, or unknown.`
- Pre-scoring gate: `All discovery sections are captured. Proceed to scoring? (yes/no)`
- Pre-publish gate: `Review prioritized register and downstream feeds. Approve publish? (yes/no)`

If user responds `revise` or `no`, return to the latest unresolved section and update the in-report interaction log section.

## Gap Scoring Model
Score each documentation area from 1 to 5:
- `CR` (Criticality Relevance): impact on delivery/migration safety and production risk
- `OR` (Onboarding Risk): probability of misimplementation by new or rotating engineers
- `CD` (Coverage Deficit): missing, stale, contradictory, or fragmented documentation

Priority formula:
- `PriorityScore = (2 * CR) + OR + CD`

Priority bands:
- `P0` (13-20): Immediate
- `P1` (10-12): Near-term
- `P2` (7-9): Planned
- `P3` (4-6): Backlog

## Analysis Workflow
Run these steps in order.

### Step 1: Scope and Documentation Area Inventory
1. Confirm scope boundary and stakeholders.
2. Define documentation areas to assess (architecture, contracts, operations, security, testing, onboarding, governance).
3. Ask Section 1 discovery questions and wait for confirmation.

Output:
- Scope map and area inventory

### Step 2: Evidence Collection and Freshness Check
1. Collect evidence per area with file-level references.
2. Record freshness indicators (last update, drift signs, ownership clarity).
3. Flag duplication and contradictions.
4. Ask Sections 2-9 questions in order, capturing confirmations for each section.

Output:
- Area-to-evidence matrix

### Step 3: Gap Identification
1. Declare a gap when docs are missing, partial, stale, contradictory, or non-actionable.
2. Assign `gap_id`, risk statement, and affected system areas.
3. Record unresolved `unknown` items as explicit assumptions.

Output:
- Draft gap register

### Step 4: Prioritization
1. Score each gap (`CR`, `OR`, `CD`).
2. Compute `priority_score` and assign `P0`-`P3`.
3. Sort by priority, then CR, then OR.
4. Run pre-scoring gate confirmation.

Output:
- Prioritized gap register

### Step 5: Action and Downstream Feed Definition
1. Define target artifacts and owner hints per gap.
2. Define test-planning hooks and acceptance checks per gap.
3. Capture dependencies and sequencing constraints.

Output:
- Actionable register with downstream contracts

### Step 6: Review and Confidence
1. Run stakeholder/SME review.
2. Resolve open questions or explicitly log unknowns.
3. Assign confidence score (target around 3/5 for first baseline).
4. Run pre-publish gate confirmation.

Output:
- Reviewed baseline with confidence statement

## Required Output Contract
Always return sections in this order:
1. Objective
2. Scope and Assumptions
3. Method and Prioritization Model
4. Gap Register (all assessed areas)
5. Prioritized Backlog (P0/P1/P2/P3)
6. Output Interface for Downstream Activities
7. Delivery Plan (2-3 days with SME)
8. Review and Confidence Statement
9. Captured Responses (full interaction table)
10. Interaction Log Summary
11. Acceptance Criteria Mapping

For each gap include:
- `gap_id`
- `documentation_area`
- `current_state_evidence[]`
- `gap_description`
- `risk_statement`
- `CR`, `OR`, `CD`
- `priority_score`
- `priority`
- `owner_hint`
- `dependencies[]`
- `definition_of_done`
- `feed_generate_docs`
- `feed_ai_tests`

Include an interaction summary block:
- `sections_completed[]`
- `unknowns[]`
- `decision_gates[]`
- `pending_followups[]`

Single-file rule:
- Store the complete output contract, captured responses, and interaction summary in one execute report file only.
- Do not create companion `.json`, handoff, or standalone interaction-log files for this skill run.

## Downstream Field Contracts

### generate-docs contract
- `gap_id`
- `documentation_area`
- `priority`
- `target_artifacts[]`
- `source_evidence[]`
- `owner_hint`
- `definition_of_done`

### AI-assisted test contract
- `gap_id`
- `risk_statement`
- `affected_components[]`
- `expected_behaviors[]`
- `test_types[]` (`contract`, `authz`, `migration-safety`, `parity`, `smoke`, `recovery`)
- `acceptance_checks[]`

## Confidence Model
- `5/5`: Multi-stakeholder validated, traceable evidence, no major unknowns
- `4/5`: Strong evidence with minor open questions
- `3/5`: Actionable baseline with known unknowns (target first pass)
- `2/5`: Partial evidence, high inference rate
- `1/5`: Early draft, substantial uncertainty

Trigger follow-up review when:
- Any `P0` gap has unclear ownership.
- Security/contract/operations behavior relies on inference.
- `definition_of_done` is not testable.

## 2-3 Day Execution Cadence
### Day 1
- Confirm scope, discovery answers, and scoring rubric.
- Complete evidence collection and draft register.

### Day 2
- Finalize prioritization, owners, and downstream feed fields.
- Review with engineering, QA, and platform/security stakeholders.

### Day 3 (optional)
- Incorporate feedback, close open questions, and freeze baseline.

## Artifact Naming
Use a single-file pattern:
- `exec-<system>-documentation-gap-analysis-<YYYY-MM-DD>.md`

This single file must include: gap register, downstream interfaces, decision gates, and full captured response log.

## Acceptance Criteria Checklist
- Gap register covers all assessed documentation areas.
- Prioritization reflects system criticality and onboarding risk.
- Output contracts are consumable by documentation and test-planning workflows.
- Plan is executable in 2-3 days with stakeholder support.
- Confidence statement is explicit and justified by evidence quality.

