---
name: dependency-compatibility-mapping
description: "Analyze dependency compatibility across legacy and target runtime versions, with strict forked-library risk assessment, migration blockers, and actionable upgrade/replacement guidance."
argument-hint: "Provide SBOM path(s) and static code analysis path(s). Optional: system_name, legacy_runtime, target_runtime, module scope, output_file, or output overwrite preference."
---

# Dependency Compatibility Mapping

## Purpose
Produce a complete, evidence-backed compatibility map for dependencies across a mixed legacy-to-target runtime migration window, with special emphasis on forked dependency risk and re-architecture impact.

This skill consumes SBOM + static code analysis artifacts, cross-references dependency compatibility claims where possible, and emits a single engineering-ready markdown output.

## Use This Skill When
- You need a migration-readiness map for one legacy runtime to one target runtime.
- You need a full dependency compatibility matrix with risk and mitigation.
- You need explicit fork analysis and migration blockers.
- You need architecture planning input for upgrade sequencing.

## Do Not Use This Skill When
- You are only fixing a single dependency in one service.
- You need runtime performance benchmarking.
- You need implementation changes in application code.

## Inputs
Required:
1. SBOM artifact(s) with dependency names and versions.
2. Static code analysis artifact(s) showing API usage/deprecations/internal fork usage.

Optional:
- Existing dependency policy docs.
- Prior migration notes.
- Service/module scope filters.
- system_name (default: `target-system`)
- legacy_runtime (default: `Java 8`)
- target_runtime (default: `Java 17`)
- output_file (default: `execute/exec-<system-name>-dependency-compatibility-mapping.md`)

If required inputs are missing, stop and report exactly what is missing.

## Target Runtimes
- `<legacy_runtime>` (legacy)
- `<target_runtime>` (target)

Assume hybrid operation can exist during migration. Analyze compatibility for both runtimes for every dependency.

## Core Requirements
1. Do not assume compatibility. If evidence is weak, mark as `Unknown / requires verification`.
2. Treat forked dependencies as high-risk by default unless clear evidence proves otherwise.
3. Account for all SBOM dependencies in totals and matrix.
4. Keep all counts and percentages internally consistent.
5. Prioritize migration blockers and re-architecture impacts.

## Analysis Workflow

Copy and track this checklist:

```
- [ ] Phase 1: Ingest and normalize SBOM + code analysis
- [ ] Phase 2: Build full compatibility matrix (`<legacy_runtime>` and `<target_runtime>`)
- [ ] Phase 3: Perform forked library deep analysis
- [ ] Phase 4: Compute incompatibility baseline and risk distribution
- [ ] Phase 5: Cross-reference compatibility claims with external sources
- [ ] Phase 6: Generate final markdown output and validate consistency
```

### Phase 1: Ingest and Normalize Inputs
1. Parse SBOM dependencies into a normalized list.
2. Parse code analysis findings into dependency-linked evidence.
3. Deduplicate dependencies by canonical coordinates where possible.
4. Mark known forks if indicated directly by artifacts or naming conventions.
5. Track uncertain fork detection as `Unknown (needs verification)`.

Required outputs for this phase:
- Total dependency inventory list (deduplicated)
- Fork candidate list
- Evidence map keyed by dependency

### Phase 2: Build Compatibility Matrix
Create a matrix row for every SBOM dependency.

Required columns:
- Name
- Current version
- Fork status:
  - Upstream
  - Forked (internal)
  - Forked (external)
- Java 8 compatibility:
  - Compatible
  - Partial
  - Incompatible
- Java 17 compatibility:
  - Compatible
  - Partial
  - Incompatible
- Recommended target version (if applicable)
- Overall compatibility status:
  - Compatible across both
  - Requires migration effort
  - Incompatible / blocking
  - Unknown / needs verification
- Risk level:
  - Low
  - Medium
  - High
- Reason for incompatibility
- Breaking change summary
- Suggested upgrade, replacement, or mitigation

Matrix rules:
- Every SBOM dependency must appear exactly once in matrix totals.
- If dependency metadata is incomplete, include it anyway with unknown markers.
- If compatibility differs by runtime (8 vs 17), explicitly mark mixed compatibility.

### Phase 3: Forked Library Analysis (Critical)
For every forked dependency:
1. Identify known divergence from upstream.
2. Determine maintenance state (active, unclear, unmaintained).
3. Determine whether upstream has caught up or diverged further.
4. Provide replacement options in order:
  - Upstream library (preferred when viable)
  - Supported alternative libraries
  - Internal refactor options when no replacement exists

Must clearly flag:
- High-risk forks (unmaintained or target-runtime incompatible)
- Forks that block migration or re-architecture

If divergence/maintenance data is unavailable, mark explicitly as verification required and keep risk elevated.

### Phase 4: Incompatibility Baseline
Compute and report:
- Total dependencies
- `<legacy_runtime>` incompatible count
- `<target_runtime>` incompatible count
- Mixed compatibility issues count (works on legacy runtime but not target runtime)
- Forked dependency count
- High-risk forked dependency count
- Overall incompatibility percentage
- Risk distribution (Low / Medium / High)

Also provide:
- Critical blockers for target-runtime migration
- Forks with no viable upgrade path

Consistency rules:
- Counts must match matrix row totals.
- Percentages must be reproducible from reported counts.
- If some rows are unknown, report unknown count separately.

### Phase 5: Legacy-to-Target Runtime Migration Analysis
Assess dependencies impacted by:
- JDK removals (for example JAXB, CORBA)
- Module system restrictions (JPMS)
- Illegal reflective access
- Deprecated or removed APIs

Assess cross-runtime concerns:
- Different behavior between `<legacy_runtime>` and `<target_runtime>`
- Binary incompatibilities
- Build/runtime environment mismatches
- Risks during hybrid runtime transition

Provide direct migration implications for platform re-architecture.

### Phase 6: Automated Compatibility Cross-Referencing
Where possible, cross-check with:
- Maven Central metadata
- Official release notes/changelogs
- Known compatibility matrices from library maintainers

Validation guidelines:
- Cross-check declared Java compatibility against evidence.
- Flag outdated/unmaintained libraries.
- Flag mismatches between declared and observed compatibility.
- If no reliable source exists, mark as `Requires verification`.

Do not present unverifiable claims as facts.

## Risk Classification Guidance
- Low:
  - Compatible in both runtimes or minor safe upgrade path
- Medium:
  - Requires code changes, configuration changes, or moderate refactor
- High:
  - Breaking change, unmaintained fork, no viable upgrade path, or blocker for target runtime

Fork guidance:
- Default fork risk = High until maintenance and compatibility are evidenced.

## Output Contract
Generate exactly one markdown document:
- `<output_file>`

Required structure:

```markdown
# <SYSTEM_NAME> Dependency Compatibility Mapping

## Summary
- Total dependencies
- <legacy_runtime> incompatible count
- <target_runtime> incompatible count
- Forked dependency count
- High-risk fork count
- Risk distribution
- Key migration and re-architecture risks

## Compatibility Matrix
(Detailed table including fork status and dual-runtime compatibility)

## Forked Library Analysis
(Replacement strategies and risk classification)

## Critical Incompatibilities
(Blockers for target-runtime migration and system redesign)

## Risk Analysis
(High and medium risk dependencies and forks)

## Upgrade & Replacement Recommendations
(Actionable steps grouped by priority)

## Re-architecture Notes
- Areas requiring redesign due to dependency constraints
- Opportunities to remove technical debt
- Suggested sequencing for migration
```

Formatting expectations:
- Use a markdown table for the compatibility matrix.
- Keep status terms consistent across sections.
- Include concise rationale for each high-risk item.
- Make recommendations actionable and sequence-aware.

## Validation Checklist (Must Pass Before Finalizing)
- Every SBOM dependency appears in matrix and totals.
- Matrix totals match summary counts.
- Fork counts match fork analysis section.
- High-risk counts match risk analysis section.
- Critical blockers are explicitly listed and justified.
- Unknowns are explicitly marked as verification required.
- No section is empty.

## Failure and Uncertainty Handling
- If SBOM is incomplete, continue analysis with explicit limitations.
- If code analysis is incomplete, mark affected rows as verification required.
- If external compatibility metadata is unavailable, keep unknown classification and elevated risk where appropriate.
- Never downgrade risk due to missing evidence.

## Suggested Execution Notes
- Prefer deterministic parsing and normalization before scoring.
- Preserve raw evidence links/path references for each major claim.
- Keep a temporary reconciliation map to guarantee metric consistency.
- Prioritize blockers first, then high-risk forks, then medium-risk migration effort.
