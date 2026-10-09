# Activity: Identify refactoring opportunities (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Repository, hotspot shortlist, architecture summary |
| **Key output** | Refactoring shortlist with effort estimates |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Technical debt in legacy systems accumulates as code smells, high cyclomatic complexity, duplicated logic, and tightly coupled modules. Engineers work around these problems daily, but without a structured analysis the team cannot prioritise which debt to pay down first.

This activity uses AI-assisted static analysis and code review to identify the highest-impact refactoring opportunities: the places where complexity, duplication, or coupling are actively slowing delivery or increasing risk. The output is a prioritised shortlist, not a comprehensive debt register.

Decision enabled: select which refactoring items to tackle in the pilot (feeding into Validate Refactors, L4); decide whether the AI-assisted analysis approach is repeatable for future sprints.


---

## 2) What we will do (scope and steps)
Description: Use analysis to find code smells and complexity hotspots.

Sub tasks:
1. Run automated code analysis: use static analysis tools to measure cyclomatic complexity, code duplication, coupling metrics, and code smell counts per module. If no static analysis tool is configured, use the AI assistant to scan the codebase directly.
2. Correlate with change frequency: use git log data to identify which high-complexity or high-duplication files are also the most frequently changed. These are the highest-impact targets (files that are both complex and frequently modified).
3. Use the AI assistant to review the top 10 hotspots and classify each as: (a) extractable duplication (code can be consolidated), (b) decomposable complexity (functions or classes can be split), (c) decoupling opportunity (tight coupling can be reduced), (d) naming/structure improvement (readability improvement with low risk).
4. For each candidate, estimate the effort (XS/S/M) and risk (low/medium/high) of the refactoring. Flag any that require test coverage to be added first.
5. Compile a prioritised shortlist of 5-10 actionable items, ranked by impact (change frequency multiplied by complexity) and feasibility.
6. Review the shortlist with the Tech Lead. Select 1-3 items for Validate Refactors (L4).
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from L1-Autonomous-Code-Analysis output and Architecture Summary (L3). Feeds directly into Validate Refactors (L4). Schedule in Week 2.

> **Out of scope:**
> - Large-scale architectural redesign.
> - Executing any refactoring (this activity identifies opportunities, L4-Validate-Refactors executes them).
> - Framework or language migration.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** scan the codebase for complexity hotspots, duplication patterns, coupling issues, and code smells. Classify each finding.
- **Retrieve and ground:** cross-reference static analysis results with git log data to identify high-churn areas.
- **Generate:** produce a prioritised shortlist document with effort/risk estimates per item.
- **Human in the loop:** the engineer validates each finding (is it a real problem? is the classification correct?) and the Tech Lead prioritises the shortlist.


---

## 4) Preconditions, access and governance
- Read access to the target repository.
- Git history available (for change frequency analysis).
- Static analysis tool configured (or willingness to use AI-only analysis).
- Named reviewer (Tech Lead or Solution Architect) available.
- ATRS trigger: No. DPIA check: No.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Static analysis | SonarQube, CodeClimate, ESLint complexity rules, Radon (Python), NDepend (.NET), PMD | Java |
| Code assistants (for AI-driven analysis) | GitHub Copilot, Sourcegraph Cody, Cursor, JetBrains AI |  |
| Git analytics | git log (built-in), gitinspector, CodeScene, git-of-theseus |  |
| Notes and reporting | Markdown, spreadsheets |  |
| Not typically needed | SCA/SBOM tools, security scanning tools, monitoring tools |  |


---

## 6) Timebox
Suggested: 1.5h for analysis and classification; 30 minutes for shortlist compilation and review. Total: 2h. Schedule in Week 2.

Expandability: this activity can be repeated per repository or codebase area. Each additional repository or codebase area adds approximately 1.5 to 2h.

---

## 7) Inputs and data sources
- Target repository (source code and git history).
- Static analysis output (if a tool is already configured).
- L1-Autonomous-Code-Analysis output (if completed) for code quality findings.
- Architecture Summary (from L3, if available) for structural context.
- Test coverage report (to flag items that need tests before refactoring).
- If unavailable: if no static analysis tool is configured, rely on AI-driven analysis of the codebase. Note this as a lower-confidence analysis.


---

## 8) Outputs and artefacts
- Prioritised refactoring shortlist (5-10 items) with: file/module, issue type (duplication/complexity/coupling/naming), change frequency, effort estimate (XS/S/M), risk level (low/medium/high), and whether test coverage is needed first.
- Top 10 hotspot analysis (complexity x change frequency).
- Time log entry for P1.

Audience: Tech Lead, Solution Architect, engineers. The shortlist directly feeds into L4-Validate-Refactors for execution.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the prioritised shortlist with AI assistance. Compare against estimate for manual code review and analysis |
| **P2 Quality score** | reviewer rates the shortlist on the 1-5 rubric for accuracy (are these real problems?) and usefulness (does the prioritisation make sense?) |
| **P8 Reusable artefacts** | count the shortlist template, analysis prompt templates, hotspot identification method |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P4 Lead time**: if refactoring the identified items reduces development time for subsequent changes, note qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI identifies cosmetic issues rather than real problems**: the AI may focus on naming conventions or formatting rather than structural issues that affect delivery | classify findings by type and prioritise structural issues (duplication, complexity, coupling) over cosmetic ones |
| **Overestimating refactoring ease**: the AI may underestimate the risk of refactoring tightly coupled code | include risk estimates per item; flag items that require test coverage before refactoring |
| **Analysis without action**: producing a shortlist that is never acted on wastes the effort | the shortlist feeds directly into L4-Validate-Refactors; select 1-3 items for immediate execution |
| **Missing context from git history**: if the repository was migrated or has a truncated history, change frequency data may be incomplete | note the limitation; supplement with team knowledge of frequently modified areas |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Hotspot analysis is complete (top 10 by complexity x change frequency).
- [ ] Each hotspot is classified by issue type and estimated for effort and risk.
- [ ] Prioritised shortlist (5-10 items) is compiled and reviewed by the Tech Lead.
- [ ] 1-3 items are selected for Validate Refactors (L4).
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of hotspot identification and classification versus manual code review.
- **Prerequisites to document**: repository access, git history availability, static analysis tool presence.
- **Limits and risks to document**: cosmetic vs structural findings, incomplete git history, underestimated refactoring risk.
- **Reusable assets**: hotspot analysis method, shortlist template, classification taxonomy.

- **Department continuation**: work through remaining shortlist items using the analysis prompt templates and hotspot identification method.

Pattern candidates:
- **"Complexity x churn prioritisation"**: ranking refactoring targets by the product of their complexity score and change frequency ensures effort is focused on the areas that slow delivery most.
- **"Prerequisite test coverage flagging"**: flagging refactoring items that need test coverage added first prevents risky refactors without a safety net.

Anti-pattern candidates:
- **"Refactoring everything"**: attempting to address all identified debt at once exceeds any timebox and dilutes impact. Always select 1-3 items for immediate action.
- **"Cosmetic-first refactoring"**: prioritising naming and formatting improvements over structural issues (duplication, coupling) delivers low value relative to effort.
- Reusable assets: prompts, templates, patterns for the library.