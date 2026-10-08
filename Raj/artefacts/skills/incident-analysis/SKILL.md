---
name: incident-analysis
description: "Analyze recurring errors from a log clustering report and generate RCA summaries, recurring failure modes, observability improvements, and runbook updates."
argument-hint: "Required: path to log clustering markdown report. Optional: system_name, output_file, incident scope window, service/module filter, evidence source roots/log paths."
---

# Skill: Incident Analysis from Log Clustering

## Purpose
Use this skill to convert a log clustering report into a practical incident-analysis artifact with:
- RCA summaries for recurring error families
- recurring failure mode patterns
- observability improvement proposals
- actionable runbook updates

## Use This Skill When
- You already have a clustering report of recurring errors.
- You need incident triage output that can drive engineering and operations work.
- You need one deterministic markdown artifact for handoff.

## Do Not Use This Skill When
- You do not have a clustering report yet.
- You need raw log clustering (use `log-clustering` first).

## Input Contract
Required:
1. Log clustering report markdown path.

Optional:
- Incident period or date window.
- Service, module, or domain filters.
- Environment scope (for example dev, nxt, oat, prd).
- Evidence source file roots (application logs, service logs, stack traces, runbooks).

If required input is missing, stop and report exactly what is missing.

## Evidence Rules
- Use the provided clustering report as primary evidence.
- Use repository docs/config/code only to strengthen RCA and runbook context.
- Scan error-specific evidence source files referenced in the clustering report (especially top source files) before finalizing RCA and fixes.
- Prefer direct evidence snippets/signatures and file-path references over pattern-only assumptions.
- Do not use external sources.
- Do not invent root causes; mark uncertain items as hypotheses with confidence.

## Solution Specificity Rules (Mandatory)
- Do not provide generic fixes that are not mapped to a specific error family.
- Each RCA corrective action must reference at least one concrete evidence anchor (log signature, source file path, service/module, or config path).
- For each error family (not only high-priority), include a targeted fix scope (what component to change first, and why).
- If only partial evidence is available, provide a hypothesis fix marked with explicit validation steps.

## Coverage Rules (Mandatory)
- Include all error families listed in the clustering report `Error Family Clusters` table.
- Do not omit low-frequency families; classify them as `High`, `Medium`, or `Low` action priority.
- If a family has weak evidence, keep it in the report as `Hypothesis` with reduced confidence and explicit follow-up validation.

## Detail Depth Rules (Mandatory)
- Every family entry must include: symptom signature, likely cause, containment action, corrective action, and validation step.
- Distinguish evidence quality per family as one of:
  - `Direct log evidence`
  - `Cluster-derived evidence`
  - `Hypothesis (evidence gap)`
- For `Hypothesis` families, include at least one concrete next diagnostic step and expected confirmation signal.

## Output Contract
Generate exactly one markdown file at:
- `execute/exec-<system-slug>-incident-analysis.md` (default) or `<output_file>` when provided

The report must feed:
1. RCA summaries
2. recurring failure modes
3. observability improvements
4. runbook updates

## Workflow
Copy and track this checklist:

```text
- [ ] Phase 1: Validate clustering input and scope
- [ ] Phase 2: Extract all recurring error families and outage signals
- [ ] Phase 2B: Scan evidence source files for all families and capture traceability
- [ ] Phase 3: Build RCA summaries with confidence and evidence for all families
- [ ] Phase 4: Derive recurring failure modes and classify patterns
- [ ] Phase 5: Define observability improvements (logs, metrics, traces, alerts)
- [ ] Phase 6: Propose runbook updates with owner-ready actions
- [ ] Phase 7: Produce final artifact and validate quality gates
```

### Phase 1: Validate Inputs
- Confirm clustering report path exists and is readable.
- Capture report metadata (generation date, log scope, total clustered lines, unclassified share).
- Capture scope assumptions in the final artifact.

### Phase 2: Extract Recurring Signals
- Pull all families from the clustering output, including low-frequency tails.
- Include dominant source files/services where available.
- Prioritize families by frequency, impact, and user-facing risk while retaining full-family coverage in tables.
- In `## Recurring Error Signals (from Clustering)`, provide a concise narrative or bullet summary only (no table).

### Phase 2B: Source Evidence Scan (Mandatory)
- Parse the `Top Source Files` section from the clustering report and select files linked to all reported families where feasible.
- Scan source evidence files for repeating signatures, exception types, endpoints, dependency names, and component identifiers.
- Build an evidence map per family with:
  - `family -> source file path(s)`
  - `family -> signature/exception markers`
  - `family -> likely component/owner boundary`
- If source files are outside repo boundaries, still use their paths/signatures from the clustering artifact and link to closest in-repo component evidence.

### Phase 3: RCA Summaries
For each error family, provide:
- probable root cause statement
- contributing factors
- evidence references from clustering output and in-repo context
- confidence level (`High`, `Medium`, `Low`)
- blast radius and affected journeys/services
- immediate containment action
- long-term corrective action
- validation step to confirm fix effectiveness

RCA specificity requirement:
- corrective action must be component-targeted (service/module/config) and traceable to scanned evidence, not platform-generic guidance.

If evidence is insufficient, keep as `Hypothesis` and record in `Gaps and Questions`.

### Phase 4: Recurring Failure Modes
Group RCA outcomes into reusable failure modes, for example:
- dependency/connectivity failures
- validation/data quality failures
- timeout/retry/circuit-breaker failures
- queue/backpressure and async processing failures
- configuration/feature-flag/environment drift

For each mode, provide triggering conditions, detection signals, and prevention strategy.

### Phase 5: Observability Improvements
Propose concrete improvements by pillar:
- Logs: structured keys, correlation IDs, noise reduction, severity consistency.
- Metrics: service-level indicators, error-rate/latency counters, queue lag, retry saturation.
- Traces: span coverage for gateway to downstream boundaries.
- Alerts: symptom-based and burn-rate style alerts with anti-noise tuning.

Each improvement must include expected benefit and implementation priority (`P0`, `P1`, `P2`).

### Phase 6: Runbook Updates
Create runbook-ready updates for each high-priority failure mode, and include condensed handling notes for medium/low modes:
- trigger condition and alert mapping
- first 15-minute triage steps
- diagnostic commands/queries placeholders (repo-known only)
- rollback/containment decision points
- escalation path and ownership (or `unknown` if missing evidence)

### Phase 7: Finalization
- Ensure all major claims are evidence-backed.
- Ensure uncertain items are explicitly marked.
- Ensure action plan is sequence-aware and owner-oriented.

## Required Markdown Structure
Use this section order exactly:

1. `# <SYSTEM_NAME> Incident Analysis`
2. `## Scope and Inputs`
3. `## Executive Summary`
4. `## Recurring Error Signals (from Clustering)`
5. `## Family Coverage Matrix`
6. `## Evidence Traceability`
7. `## RCA Summaries`
8. `## Recurring Failure Modes`
9. `## Observability Improvements`
10. `## Runbook Updates`
11. `## Prioritized Action Plan`
12. `## Gaps and Questions`

Formatting note for section 4:
- `## Recurring Error Signals (from Clustering)` must be summary text (bullets/paragraph), not a table.
- Full tabular family coverage belongs in `## Family Coverage Matrix`.

## Required Tables
### RCA Summaries table
Columns:
- Error family
- Frequency/Share
- Likely root cause
- Contributing factors
- Evidence
- Evidence quality
- Confidence
- Blast radius
- Immediate containment
- Corrective action
- Validation step
- Action priority (`High`/`Medium`/`Low`)

### Family Coverage Matrix table
Columns:
- Error family
- Count
- Share
- Outage signal
- Evidence quality
- RCA status (`Completed`/`Hypothesis`)
- Action priority

Do not add a table under `## Recurring Error Signals (from Clustering)`.

### Evidence Traceability table
Columns:
- Error family
- Source evidence file(s)
- Key signature(s)
- Mapped component/service
- Proposed code/config/runbook touchpoint

### Failure Modes table
Columns:
- Failure mode
- Mapped error families
- Trigger conditions
- Detection signals
- Prevention strategy

### Observability Improvements table
Columns:
- Improvement
- Pillar (logs/metrics/traces/alerts)
- Why needed
- Priority
- Owner (or unknown)
- Verification signal

### Runbook Updates table
Columns:
- Runbook item
- Trigger or alert
- Triage steps
- Decision point
- Escalation path
- Owner (or unknown)

### Prioritized Action Plan table
Columns:
- Priority
- Action
- Dependency
- Target window
- Success criteria

## Quality Gates (Must Pass)
- Input clustering report is clearly referenced in scope.
- Family Coverage Matrix includes every family from clustering output.
- `Recurring Error Signals (from Clustering)` is present as non-tabular summary.
- All families from clustering output are represented in RCA table.
- All families from clustering output are represented in Evidence Traceability table (use `evidence missing` when needed).
- Each high-priority family has source evidence references from Phase 2B.
- Corrective actions are error-specific and component-targeted (not generic).
- Every RCA row includes validation step and evidence-quality classification.
- Every family maps to at least one failure mode (directly or grouped mode mapping).
- Observability improvements are concrete and testable.
- Runbook updates are operationally actionable.
- Missing evidence is listed in `Gaps and Questions`.
- Exactly one output markdown file is produced at the required path.

## Failure and Uncertainty Handling
- If clustering report cannot be read, stop and report attempted path.
- If referenced source evidence files cannot be accessed, record attempted paths and continue with reduced-confidence recommendations.
- If family descriptions are ambiguous, keep hypothesis status and lower confidence.
- If ownership/escalation data is missing, set owner to `unknown` and record the gap.
- Never present assumptions as confirmed facts.

## Deliverable Rule
Return only the markdown content intended for:
`<output_file>`

