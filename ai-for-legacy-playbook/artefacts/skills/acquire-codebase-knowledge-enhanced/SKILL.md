---
name: acquire-codebase-knowledge-enhanced
description: 'Use this skill when the user wants deeper codebase onboarding or engineering handoff artifacts. Trigger for prompts like "enhanced codebase docs", "map architecture and business logic", "analyze coverage and modernization", or "produce shareable engineering handoff docs".'
license: MIT
compatibility: 'Cross-platform. Prefer scripts/scan.py or scripts/scan.mjs when Python 3.8+ or Node.js 20+ is available. If not, fall back to read-only repository inspection with standard shell tooling plus git.'
metadata:
  version: "1.0.0"
  enhancements:
    - Engineering handoff-oriented architecture and business-logic mapping
    - Coverage assessment without executing tests
    - Modernization and dependency-risk analysis
    - Security and trust-boundary review
    - Additional structured artifacts for downstream agents
argument-hint: 'Optional: focus area, repository scope, or execution constraints such as "Git Bash only"'
---

# Acquire Codebase Knowledge Enhanced

Produces the seven core `docs/codebase/` documents plus optional structured artifacts for engineering handoff. Only document what is verifiable from files or terminal output - never infer or assume.

## Output Contract (Required)

Before finishing, all of the following must be true:

1. Exactly these files exist in `docs/codebase/`: `STACK.md`, `STRUCTURE.md`, `ARCHITECTURE.md`, `CONVENTIONS.md`, `INTEGRATIONS.md`, `TESTING.md`, `CONCERNS.md`.
2. Every claim is traceable to source files, config, or terminal output.
3. Unknowns are marked as `[TODO]`; intent-dependent decisions are marked `[ASK USER]`.
4. Every document includes a short "evidence" list with concrete file paths.
5. Final response includes numbered `[ASK USER]` questions and intent-vs-reality divergences.
6. The seven core documents include the enhanced analysis requirements in this skill, not just the base template fields.
7. When evidence is sufficient, create the additional artifacts listed in `Required Additional Artifacts`.

## Preservation Rules

- Do not remove, simplify, or replace any behavior in this workflow if an existing step already produces a more detailed or more rigorous result.
- Keep the existing `docs/codebase` structure.
- Keep the seven required markdown outputs and add to them rather than replacing them.
- Additional documents and structured artifacts may be created in `docs/codebase` when they improve developer understanding or make the output more usable by another skill or agent.

## Operating Constraints

- Do not change source files, config files, manifests, tests, or infrastructure files being analyzed.
- Do not run projects, services, builds, package managers, tests, or coverage commands.
- Do not install anything.
- If the user constrains tooling, follow that limit strictly.
- If a step in this skill would require a runtime or tool that is unavailable in the environment, do not force it. Fall back to read-only analysis using standard shell tooling and git.
- Prefer read-only commands and file inspection using tools such as `git`, `ls`, `find`, `grep`, `sed`, `awk`, `sort`, `uniq`, `xargs`, `wc`, `cat`, `head`, and `tail`.
- If a fact cannot be verified under those limits, mark it as `[TODO]` rather than inferring it.
- If an existing generated report or scanner output already exists in the repository, you may read it and cite it as evidence, but do not regenerate it unless the user permits it.

## Audience And Output Style

- Primary audience: engineers trying to understand architecture, code layout, business logic, technical risk, and likely change impact.
- Secondary audience: another skill or agent that may continue analysis later.
- Write for technical readers. Be concrete, evidence-based, and path-oriented.
- Keep conclusions traceable to repository evidence.
- For every significant section, include summary, key findings, evidence, and open questions or uncertainty markers when needed.
- When coverage, security, or dependency risk is inferred rather than directly reported by an existing tool output, say so explicitly.

## Workflow

Copy and track this checklist:

```
- [ ] Phase 1: Run scan, read intent documents
- [ ] Phase 2: Investigate each documentation area
- [ ] Phase 3: Populate all seven docs in docs/codebase/
- [ ] Phase 4: Validate docs, present findings, resolve all [ASK USER] items
```

## Focus Area Mode

If the user supplies a focus area (for example: "architecture only" or "testing and concerns"):

1. Always run Phase 1 in full.
2. Fully complete focus-area documents first.
3. For non-focus documents not yet analyzed, keep required sections present and mark unknowns as `[TODO]`.
4. Still run the Phase 4 validation loop on all seven documents before final output.

### Phase 1: Scan and Read Intent

1. Run the scan script from the target project root (choose one):
   ```bash
   python3 "$SKILL_ROOT/scripts/scan.py" --output docs/codebase/.codebase-scan.txt
   ```
  ```bash
  node "$SKILL_ROOT/scripts/scan.mjs" --output docs/codebase/.codebase-scan.txt
  ```
   Where `$SKILL_ROOT` is the absolute path to the skill folder. Works on Windows, macOS, and Linux.

  **Quick start:** If you have the path inline:
   ```bash
  python3 /absolute/path/to/skills/acquire-codebase-knowledge-enhanced/scripts/scan.py --output docs/codebase/.codebase-scan.txt
   ```
  ```bash
  node /absolute/path/to/skills/acquire-codebase-knowledge-enhanced/scripts/scan.mjs --output docs/codebase/.codebase-scan.txt
  ```

   If neither runtime is available, perform an equivalent read-only repository survey with standard shell tooling and direct file inspection. Record the limitation in the final response.

2. Search for `PRD`, `TRD`, `README`, `ROADMAP`, `SPEC`, `DESIGN` files and read them.
3. Summarise the stated project intent before reading any source code.

### Phase 2: Investigate

Use the scan output to answer questions for each of the seven templates. Load [`references/inquiry-checkpoints.md`](references/inquiry-checkpoints.md) for the full per-template question list.

If the stack is ambiguous (multiple manifest files, unfamiliar file types, no `package.json`), load [`references/stack-detection.md`](references/stack-detection.md).

### Phase 3: Populate Templates

Copy each template from `assets/templates/` into `docs/codebase/`. Fill in this order:

1. [STACK.md](assets/templates/STACK.md) - language, runtime, frameworks, all dependencies
2. [STRUCTURE.md](assets/templates/STRUCTURE.md) - directory layout, entry points, key files
3. [ARCHITECTURE.md](assets/templates/ARCHITECTURE.md) - layers, patterns, data flow
4. [CONVENTIONS.md](assets/templates/CONVENTIONS.md) - naming, formatting, error handling, imports
5. [INTEGRATIONS.md](assets/templates/INTEGRATIONS.md) - external APIs, databases, auth, monitoring
6. [TESTING.md](assets/templates/TESTING.md) - frameworks, file organization, mocking strategy
7. [CONCERNS.md](assets/templates/CONCERNS.md) - tech debt, bugs, security risks, perf bottlenecks

Use `[TODO]` for anything that cannot be determined from code. Use `[ASK USER]` where the right answer requires team intent.

## Required Additions To The Seven Core Documents

### 1. STACK.md

- Add a dependency modernization section.
- Identify legacy, outdated, or end-of-life libraries or frameworks visible from manifests, lockfiles, build files, Dockerfiles, or existing scanner outputs.
- For each legacy library, provide current library, why it appears legacy or risky, likely modern replacement, whether there is no clear replacement, and whether replacement appears low, medium, or high rework.
- Distinguish production dependencies from test, build, and dev-only dependencies.
- Highlight vulnerable libraries only when supported by existing repo evidence such as lockfiles, NVD reports, suppressions, scanner outputs, or clearly obsolete pinned versions. If based on heuristic age rather than a scanner result, label that clearly.

### 2. STRUCTURE.md

- Add quantitative code layout analysis.
- Summarize approximate code-file counts by major language, approximate namespace or module counts where practical, largest source files, and rough file size bands.
- Highlight the main directories containing business logic versus infrastructure, delivery, test, and support code.
- Identify the main code locations for frontend, backend, database-facing code, integration code, and shared utilities.

### 3. ARCHITECTURE.md

- Add a business logic map.
- Identify where the main business logic lives, including validation logic, eligibility rules, workflow decisions, transformation rules, and state transitions.
- Identify the main areas that control non-business-specific behavior such as routing, persistence plumbing, messaging, logging, auth, config, serialization, and scheduling.
- Identify async logic, event-driven flows, queues, jobs, background workers, timers, futures or promises, channels, callbacks, or polling.
- Identify likely downstream dependencies and explain the evidence for that conclusion.
- Highlight particularly complex code paths, especially files or namespaces with many responsibilities, high branching, orchestration-heavy flows, or cross-module coupling.
- If possible, point out places where validations seem likely to be missing by comparing data-entry boundaries, schema definitions, handlers or controllers, and downstream assumptions. Mark these as possible gaps, not facts, unless directly evidenced.

### 4. CONVENTIONS.md

- Add cross-cutting implementation conventions.
- Document how the codebase handles validation, error translation, auth checks, logging, retries, resilience, serialization, and config access when those are patterned across the codebase.
- Note any inconsistent conventions that raise maintenance risk.

### 5. INTEGRATIONS.md

- Expand the integration map to clearly separate database access, frontend or UI code, external service calls, queues or async messaging, auth or identity providers, file or blob storage, and observability or monitoring integrations.
- For downstream dependencies, identify likely providers, clients, adapters, HTTP layers, SDKs, database drivers, or message-bus touchpoints.
- Where possible, name the local abstraction layers that sit between business logic and external systems.

### 6. TESTING.md

- Assess coverage without executing tests.
- Separate directly evidenced coverage from inferred coverage based on test presence, layout, naming, and source-to-test mapping.
- Highlight poorly covered areas, especially for business logic.
- State how much of the business logic appears to be covered by unit tests, integration tests, and end-to-end tests.
- Call out important logic that appears weakly tested or only indirectly tested.
- Identify whether validations, security-sensitive paths, async flows, integrations, and error handling appear adequately tested.

### 7. CONCERNS.md

- Prioritize weakly tested business logic, complex and high-risk hotspots, security issues, dependency risks, poor coding practices, and system design risks.
- For security concerns, include both vulnerable libraries supported by existing evidence and code or design concerns such as missing validation, weak trust boundaries, broad exception swallowing, leaky error handling, insecure defaults, or fragile auth assumptions.
- Highlight when the concern is confirmed evidence versus an architectural suspicion.
- Include safe next actions that do not require speculative rewrites.

## Required Additional Artifacts

Create these additional artifacts when evidence is sufficient:

### docs/codebase/CODE_METRICS.md

Include file counts, namespace or module counts, large-file inventory, and a shortlist of complexity hotspots.

### docs/codebase/BUSINESS_LOGIC_MAP.md

Map the major business domains, validation points, orchestration flows, and likely missing validation candidates.

### docs/codebase/MODERNIZATION_SECURITY.md

Combine legacy dependency analysis, replacement guidance, vulnerable-library evidence, and code or design security concerns.

### docs/codebase/AGENT_HANDOFF.md

Produce a compact handoff for another skill or agent with top modules to inspect next, major business logic locations, risky integrations, weak coverage areas, unresolved `[ASK USER]` items, and recommended next-read file paths.

### docs/codebase/CODEBASE_FACTS.json

Produce a machine-friendly summary with stable keys where possible, such as `projects`, `languages`, `code_file_counts`, `namespace_counts`, `top_large_files`, `business_logic_paths`, `validation_paths`, `async_paths`, `database_paths`, `frontend_paths`, `external_service_paths`, `test_paths`, `poor_coverage_paths`, `legacy_dependencies`, `vulnerable_dependencies`, `downstream_dependencies`, `security_concerns`, and `open_questions`.

Only include facts supported by evidence. Use `null` or empty arrays for unknowns rather than inventing values.

## Method Expectations

- Preserve the evidence-driven workflow and validation loop from the base skill.
- If the scan step would require unavailable tooling, do not block on it. Perform an equivalent read-only repository survey using available shell tooling and direct file reads.
- Prefer repository evidence in this order:
  1. existing docs and design docs
  2. manifests and lockfiles
  3. build files and CI files
  4. source tree layout
  5. representative source files
  6. test files and coverage artifacts already present
  7. existing security or dependency scan outputs already present
  8. recent git history if helpful and available
- Never present inferred architecture or dependency claims as facts.
- Do not document generated output as if it were source architecture.
- If multiple subprojects exist, analyze them separately first, then provide a combined repo-level view.

### Phase 4: Validate, Repair, Verify

Run this mandatory validation loop before finalizing:

1. Validate each doc against `references/inquiry-checkpoints.md`.
2. For each non-trivial claim, confirm at least one evidence reference exists.
3. If any required section is missing or unsupported:
  - Fix the document.
  - Re-run validation.
4. Repeat until all seven docs pass.

Then present a summary of all seven documents, list every `[ASK USER]` item as a numbered question, and highlight any Intent vs. Reality divergences from Phase 1.

## Final Response Requirements

- Preserve the base skill's final summary style, `[ASK USER]` handling, and intent-vs-reality divergence reporting.
- Also include a short developer-oriented executive summary, the worst-covered business logic areas, the most complex code hotspots, the most important downstream dependencies, the highest-confidence security concerns, and the highest-priority modernization targets.
- Clearly state any analysis limitations caused by environment constraints.

Validation pass criteria:

- No unsupported claims.
- No empty required sections.
- Unknowns use `[TODO]` rather than assumptions.
- Team-intent gaps are explicitly marked `[ASK USER]`.

---

## Gotchas

**Monorepos:** Root `package.json` may have no source - check for `workspaces`, `packages/`, or `apps/` directories. Each workspace may have independent dependencies and conventions. Map each sub-package separately.

**Outdated README:** README often describes intended architecture, not the current one. Cross-reference with actual file structure before treating any README claim as fact.

**TypeScript path aliases:** `tsconfig.json` `paths` config means imports like `@/foo` don't map directly to the filesystem. Map aliases to real paths before documenting structure.

**Generated/compiled output:** Never document patterns from `dist/`, `build/`, `generated/`, `.next/`, `out/`, or `__pycache__/`. These are artefacts - document source conventions only.

**`.env.example` reveals required config:** Secrets are never committed. Read `.env.example`, `.env.template`, or `.env.sample` to discover required environment variables.

**`devDependencies` != production stack:** Only `dependencies` (or equivalent, e.g. `[tool.poetry.dependencies]`) runs in production. Document linters, formatters, and test frameworks separately as dev tooling.

**Test TODOs != production debt:** TODOs inside `test/`, `tests/`, `__tests__/`, or `spec/` are coverage gaps, not production technical debt. Separate them in `CONCERNS.md`.

**High-churn files = fragile areas:** Files appearing most in recent git history have the highest modification rate and likely hidden complexity. Always note them in `CONCERNS.md`.

---

## Anti-Patterns

| [NO] Don't | [OK] Do instead |
|---------|--------------|
| "Uses Clean Architecture with Domain/Data layers." (when no such directories exist) | State only what directory structure actually shows. |
| "This is a Next.js project." (without checking `package.json`) | Check `dependencies` first. State what's actually there. |
| Guess the database from a variable name like `dbUrl` | Check manifest for `pg`, `mysql2`, `mongoose`, `prisma`, etc. |
| Document `dist/` or `build/` naming patterns as conventions | Source files only. |

---

## Enhanced Scan Output Sections

The scan scripts now produce the following sections in addition to the original output:

- **CODE METRICS** - Total files, lines of code by language, largest files (complexity signals)
- **CI/CD PIPELINES** - Detected GitHub Actions, GitLab CI, Jenkins, CircleCI, etc.
- **CONTAINERS & ORCHESTRATION** - Docker, Docker Compose, Kubernetes, Vagrant configs
- **SECURITY & COMPLIANCE** - Snyk, Dependabot, SECURITY.md, SBOM, security policies
- **PERFORMANCE & TESTING** - Benchmark configs, profiling markers, load testing tools

Use these sections during Phase 2 to inform investigation questions and identify tool-specific patterns.

---

## Bundled Assets

| Asset | When to load |
|-------|-------------|
| [`scripts/scan.py`](scripts/scan.py) | Phase 1 - run first, before reading any code (Python 3.8+ required) |
| [`scripts/scan.mjs`](scripts/scan.mjs) | Phase 1 alternative - run first when Python is unavailable (Node.js 20+ required) |

| [`references/inquiry-checkpoints.md`](references/inquiry-checkpoints.md) | Phase 2 - load for per-template investigation questions |
| [`references/stack-detection.md`](references/stack-detection.md) | Phase 2 - only if stack is ambiguous |
| [`assets/templates/STACK.md`](assets/templates/STACK.md) | Phase 3 step 1 |
| [`assets/templates/STRUCTURE.md`](assets/templates/STRUCTURE.md) | Phase 3 step 2 |
| [`assets/templates/ARCHITECTURE.md`](assets/templates/ARCHITECTURE.md) | Phase 3 step 3 |
| [`assets/templates/CONVENTIONS.md`](assets/templates/CONVENTIONS.md) | Phase 3 step 4 |
| [`assets/templates/INTEGRATIONS.md`](assets/templates/INTEGRATIONS.md) | Phase 3 step 5 |
| [`assets/templates/TESTING.md`](assets/templates/TESTING.md) | Phase 3 step 6 |
| [`assets/templates/CONCERNS.md`](assets/templates/CONCERNS.md) | Phase 3 step 7 |

Template usage mode:

- Default mode: complete only the "Core Sections (Required)" in each template.
- Extended mode: add optional sections only when the repo complexity justifies them.
