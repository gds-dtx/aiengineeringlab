# Activity: Mapping change impact (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h per change |
| **Phase** | Execute (Weeks 2-4) |
| **Inputs** | Repository, change request, architecture summary |
| **Key output** | Impact map + coverage gaps |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
In legacy systems, making a change in one module can have unexpected effects in others due to tightly coupled code, undocumented dependencies, and missing tests. Engineers either spend significant time tracing impact manually or accept a higher risk of breakage.

This activity uses AI to trace call chains, data flows, and dependency relationships from a proposed change, producing an impact map that lists every module, file, and test affected. This gives the team a clear blast radius before any code is written.

Decision enabled: confirm the change scope is understood and manageable; decide whether to proceed, split the change, or defer it based on the mapped blast radius.


---

## 2) What we will do (scope and steps)
Description: Identify modules and dependencies affected by a given change.

Sub tasks:
1. Define the proposed change clearly: what is being modified, added, or removed? Reference the specific ticket, user story, or change request.
2. Use the AI code assistant to trace downstream dependencies from the change point: (a) call chains (what calls this code?), (b) data flows (what data structures are affected?), (c) configuration references (what config files reference affected modules?).
3. Use the AI to trace upstream dependencies: what does this code call or depend on? Are those dependencies stable or are they also candidates for change?
4. Cross-reference with the test suite: which existing tests cover the impacted areas? Which impacted areas have no test coverage? Flag untested areas as higher risk.
5. Compile the impact map: a structured document listing each affected file/module, the nature of the impact (direct change, downstream consumer, upstream provider), test coverage status, and risk level (high/medium/low).
6. Identify secondary effects: deployment changes, configuration changes, database migrations, or documentation updates required as a result.
7. Review the impact map with the Tech Lead or Solution Architect. Agree whether the blast radius is acceptable, whether to split the change, or whether to defer.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs when a specific change request or ticket is being planned. Outputs feed into Tests for Change Requests (L4) and Validate Refactors (L4). Schedule as needed during Weeks 2-4.

> **Out of scope:**
> - Full-scale refactoring plan.
> - Implementing the change itself (this activity maps the impact, not executes the change).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** trace call chains, data flows, and dependency graphs from the proposed change point through the codebase. Identify affected modules and flag coupling patterns.
- **Retrieve and ground:** search across the repository for references to affected functions, classes, configuration keys, and data structures.
- **Generate:** produce a structured impact map document with risk ratings and coverage status per affected area.
- **Human in the loop:** the engineer validates the AI's dependency trace against their system knowledge. The Tech Lead or Solution Architect reviews the final impact map.


---

## 4) Preconditions, access and governance
- Read access to the full target repository (all modules, not just the change area).
- A clearly defined change request or ticket to map.
- Test suite available (to cross-reference coverage against impacted areas).
- Named reviewer (Tech Lead or Solution Architect) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Code assistants (for dependency tracing) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Reusable architecture agent | [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) | Use the orchestrator as the only entrypoint; it will update architecture context and run internal review/governance gates if needed |
| Static analysis and dependency graphing | IDE dependency features (Find Usages, Call Hierarchy), Sourcegraph search, madge (JS), pydeps (Python), NDepend | .NET |
| Test coverage tools | Istanbul/nyc, JaCoCo, coverage.py | to identify which impacted areas have tests |
| Notes and reporting | Markdown, Confluence, spreadsheets |  |
| Not typically needed | SCA/SBOM tools (unless the change involves dependency updates), security scanning tools |  |


---

## 6) Timebox
Suggested: 1.5h per change request. For changes crossing multiple services, allow 2h. Schedule as needed during Weeks 2-4.

Expandability: this activity can be repeated per change request. Each additional change request adds approximately 1.5 to 2h.

---

## 7) Inputs and data sources
- Target repository (full codebase, not just the change area).
- The specific change request, ticket, or user story being analysed.
- Test suite and coverage reports (to cross-reference).
- Architecture Summary (from L3, if available) for system-level context.
- SBOM or dependency map (from L1, if available) for dependency-level context.
- If unavailable: if no architecture summary exists, the AI will trace dependencies from code alone. Note this as a lower-confidence analysis.


---

## 8) Outputs and artefacts
- Impact map document: a structured list of every affected file/module with columns for impact type (direct/downstream/upstream), test coverage status, risk level, and required follow-up actions.
- Coverage gap list: areas impacted by the change that have no test coverage.
- Secondary effects note: any deployment, configuration, migration, or documentation changes required.
- Time log entry for P1.

Audience: Tech Lead, Solution Architect, engineers working on the change. The impact map informs sprint planning and risk assessment.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the impact map with AI assistance. Compare against an estimate for manual dependency tracing |
| **P2 Quality score** | reviewer rates the impact map on the 1-5 rubric for completeness (did it find all affected areas?) and accuracy (are the identified impacts real?) |
| **P5 Change failure rate** | track whether changes that used impact mapping have lower failure rates than those that did not |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P8 Reusable artefacts**: count the impact map template, tracing prompt templates.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI misses dependencies**: the AI may not trace all call chains, especially for dynamic dispatch, runtime configuration, or reflection-based patterns | engineer validates the trace against their system knowledge; cross-reference with IDE dependency tools |
| **Overestimating blast radius**: the AI may flag every transitive dependency as impacted, making the map overwhelming | categorise impacts as direct, likely, and possible; focus review on direct and likely |
| **False sense of completeness**: the map may lead the team to believe all impacts are known when some are missed | frame the map as "best available analysis" and include confidence notes. Flag areas where the AI could not trace further |
| **Stale architecture context**: if the Architecture Summary or dependency map is outdated, the impact analysis may be inaccurate | verify critical dependencies directly in the code |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Impact map covers all identified affected modules with impact type, coverage status, and risk level.
- [ ] Coverage gaps are documented.
- [ ] Secondary effects (deployment, config, migration) are noted.
- [ ] Tech Lead or Solution Architect has reviewed and accepted the map.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed and completeness of dependency tracing versus manual analysis.
- **Prerequisites to document**: repository access, change request clarity, availability of architecture context.
- **Limits and risks to document**: missed dependencies (dynamic dispatch, reflection), overestimated blast radius, confidence gaps.
- **Reusable assets**: impact map template, dependency tracing prompt templates.

- **Department continuation**: re-run for each new change request using the impact map template and tracing prompts.

Pattern candidates:
- **"AI-assisted blast radius analysis"**: using the AI to trace call chains and data flows from a change point produces a more complete impact map than manual tracing alone.
- **"Coverage-annotated impact map"**: overlaying test coverage data onto the impact map immediately highlights the highest-risk areas.

Anti-pattern candidates:
- **"Impact mapping without a defined change"**: running impact analysis on a vague or unscoped change produces an unfocused, unhelpful map. Always start with a specific ticket or change request.
- **"Trusting the trace completely"**: AI dependency tracing misses dynamic and reflection-based patterns. Always validate critical paths manually.
- Reusable assets: prompts, templates, patterns for the library.