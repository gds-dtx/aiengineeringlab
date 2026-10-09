# Activity: Produce upgrade plan and breaking change notes (L1)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-1.5h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Compatibility map, release notes, repo |
| **Key output** | Upgrade plan + breaking-change notes |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Developers attempting upgrades without a clear breaking-change summary often discover issues late, after code has been written against removed APIs or changed configuration formats. This causes rework, delays, and erodes confidence in the upgrade path.

This activity consolidates release notes, migration guides, and the compatibility map into a concise, developer-ready upgrade plan with breaking-change notes. It gives the team a checklist they can follow during the Exemplar Upgrade PRs activity and beyond.

Decision enabled: confirm that the upgrade path is feasible, that the team understands the breaking changes, and that they are ready to begin code-level remediation.


---

## 2) What we will do (scope and steps)
Description: Produce a short summary of breaking changes and mitigations for the target upgrade path and consolidate an upgrade plan.

Sub tasks:
1. Gather the compatibility map and shortlist from the Dependency and Compatibility Mapping activity.
2. For each component in the upgrade sequence, use AI to extract from release notes and migration guides: (a) removed or renamed APIs, (b) changed method signatures or return types, (c) configuration format changes (e.g. YAML schema changes, renamed environment variables), (d) new required dependencies or peer dependencies.
3. For each breaking change, draft a one-line mitigation: what the developer needs to do (e.g. "replace call to `getUser()` with `fetchUser()` and update return type handling").
4. Where possible, include a short before/after code snippet showing the change (AI-generated, engineer-validated).
5. Consolidate into a structured upgrade plan: ordered list of steps matching the compatibility map sequence, with each step listing its breaking changes, mitigations, estimated effort (trivial/minor/significant), and test areas to verify.
6. Flag any steps where the breaking-change impact is unclear and tag confidence as Low; recommend a spike or exemplar PR to clarify.
7. Review the plan with the Solution Architect or Tech Lead and confirm it is ready for developer handover.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** depends on Dependency and Compatibility Mapping output. Produces the reference document used during Exemplar Upgrade PRs. Run in Week 2 (Execute phase), shortly after the compatibility map is approved.

> **Out of scope:**
> - Executing the upgrades or writing production-ready migration code.
> - Full rewrite of developer documentation beyond the upgrade-specific notes.
> - Performance or load testing of upgraded components.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** pull official release notes, migration guides, changelogs, and Stack Overflow/GitHub issues for each component upgrade to identify breaking changes and known workarounds.
- **Analyse and reason:** compare current codebase usage (from the repo) against the breaking changes to assess which ones actually affect this system versus which are irrelevant.
- **Generate:** draft the breaking-change summary, mitigation notes, before/after code snippets, and the consolidated upgrade plan document.
- **Human in the loop:** an engineer validates that cited breaking changes are real, that mitigations are correct for this codebase, and that code snippets compile/make sense in context. Solution Architect or Tech Lead approves the plan.


---

## 4) Preconditions, access and governance
- Completed compatibility map from the Dependency and Compatibility Mapping activity (L1).
- Read access to the target repository to verify actual API usage against breaking changes.
- Internet access (or cached documentation) for the AI to retrieve release notes and migration guides.
- Named reviewer (Solution Architect or Tech Lead) confirmed and available within the timebox.
- ATRS trigger: No. DPIA check: only if the upgrade plan will be shared externally (unlikely at this stage).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning and drafting | an enterprise LLM (e.g. GitHub Copilot Chat, Azure OpenAI, or equivalent) grounded on release notes, migration guides, and the target repository code |  |
| Code search (to verify actual usage of breaking APIs) | IDE search, grep/ripgrep, GitHub code search, Sourcegraph |  |
| Notes and reporting | Markdown or Word for the upgrade plan and breaking-change notes; stored in the shared evidence area |  |


---

## 6) Timebox
Suggested: 1h for a straightforward upgrade path (fewer than 5 components); 1.5h if the compatibility map includes complex chains or Low-confidence steps. Schedule in Week 2 (Execute phase), after the compatibility map is approved.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 1 to 1.5h.

---

## 7) Inputs and data sources
- Compatibility map and upgrade sequence from the Dependency and Compatibility Mapping activity.
- Release notes, changelogs, and official migration guides for each component in scope (AI retrieves; confirm internet access or provide cached copies).
- Target repository source code (to verify which breaking changes actually affect this codebase).
- Any department ADRs or existing upgrade notes.
- If unavailable: state assumptions and tag confidence accordingly.


---

## 8) Outputs and artefacts
- Upgrade plan document (Markdown or Word): ordered steps matching the compatibility map, each listing breaking changes, mitigations, estimated effort, and test areas.
- Breaking-change summary with before/after code snippets where applicable.
- Low-confidence flags on any steps where the impact is unclear, with recommendations for spikes or exemplar PRs.
- Time log entry for P1.

Audience: developers who will execute the upgrades, Solution Architect, Tech Lead. The plan serves as the reference document during the Exemplar Upgrade PRs activity.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the upgrade plan. Compare AI-assisted time against the department's estimate for manually researching and summarising the same breaking changes |
| **P2 Quality score** | reviewer rates the upgrade plan on the 1-5 rubric for accuracy (breaking changes correctly identified), completeness (all upgrade steps covered), and actionability (a developer could follow this without additional research) |
| **P8 Reusable artefacts** | count the upgrade plan template, AI prompt for breaking-change extraction, and any reusable code snippet patterns |


Secondary (collect if available):
- **P7 Vulnerability/risk reduction**: if the upgrade plan reveals previously unidentified risk areas.
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Hallucinated breaking changes**: AI may cite API changes that do not exist in the actual release | cross-check each flagged breaking change against the official changelog or release notes page; reviewer validates before handover |
| **Missed breaking changes**: AI may not capture all breaking changes, especially for minor or point releases with subtle deprecations | supplement AI output with a manual scan of the changelog for releases between the current and target versions |
| **Code snippets that do not compile**: AI-generated before/after examples may contain syntax errors or use incorrect API signatures | reviewer spot-checks snippets; mark them as "illustrative, verify before use" in the plan |
| **Scope creep into execution**: the temptation to start fixing issues while writing the plan | defer all code changes to the Exemplar Upgrade PRs activity |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Upgrade plan covers all components in the compatibility map sequence.
- [ ] Each step lists breaking changes, mitigations, estimated effort tier, and test areas.
- [ ] Low-confidence steps are flagged with spike or exemplar PR recommendations.
- [ ] Solution Architect or Tech Lead has reviewed and approved the plan as ready for developer handover.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added if feasibility or scope adjustments are recommended.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on release-note research and breaking-change extraction; quality comparison of AI-drafted plan versus a manually researched equivalent.
- **Prerequisites to document**: compatibility map availability, internet access for release notes, repo read access.
- **Limits and risks to document**: any hallucinated breaking changes, missed deprecations, or incorrect code snippets.
- **Reusable assets**: upgrade plan template, AI prompt for breaking-change extraction, before/after snippet format.

- **Department continuation**: re-run for additional dependency sets using the upgrade plan template and breaking-change extraction prompt.

Pattern candidates:
- **"AI-drafted breaking-change notes"**: using AI to extract and summarise breaking changes from multiple release notes is significantly faster than manual research. Record the time saving and accuracy rate.
- **"Before/after snippet validation"**: including code snippets makes the plan more actionable for developers; validating them catches AI errors early.

Anti-pattern candidates:
- **"Trusting AI code snippets without review"**: AI-generated migration code frequently contains subtle errors. Always mark snippets as illustrative and require developer verification.
- **"Planning without the compatibility map"**: writing breaking-change notes without the sequenced map leads to an unordered list that developers cannot follow efficiently.