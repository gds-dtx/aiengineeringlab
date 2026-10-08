# Activity: Generate system documentation (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | Repository, gap register, architecture summary |
| **Key output** | System documentation set |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems often lack up-to-date technical narratives: architecture descriptions, data-flow diagrams, and interface catalogues. Without these, every change requires reverse-engineering from code, which is slow and error-prone.

This activity uses AI grounded on the repository to generate a documentation set covering the highest-priority gaps identified in the Documentation Gap Analysis. The output is a living document set that becomes the baseline for future changes.

Decision enabled: adopt the generated documentation as the system baseline and proceed with changes that previously required tribal knowledge.


---

## 2) What we will do (scope and steps)
Description: Create architecture, dataflow and interface notes grounded in the repo.

Sub tasks:
1. Review the gap register from the Documentation Gap Analysis and confirm which gaps this activity will address (focus on high-priority items).
2. For each gap, use the AI code assistant grounded on the repository to generate draft documentation: (a) system overview covering purpose, users, and business context, (b) component/service descriptions with responsibilities and boundaries, (c) data-flow notes covering key data paths, transformations, and storage, (d) interface catalogue covering key APIs, events, or integration points with request/response formats.
3. For each generated section, prompt the AI to cite the source files or modules it derived the information from so reviewers can verify.
4. Compile drafts into a single documentation set in the department's preferred format (Markdown in repo, Confluence, or Word).
	- Standard path for in-repo artefacts: `docs/architecture/<system-name>/`.
5. Peer review: a department engineer or SME reviews each section for accuracy, corrects any AI hallucinations, and fills in context the AI could not infer (e.g. business rules, historical decisions).
6. Publish the reviewed documentation in the agreed location and link it from the repository README.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** depends on Documentation Gap Analysis output. Runs alongside or after Architecture Summary. Schedule in Week 2 (Execute phase).

> **Out of scope:**
> - Comprehensive documentation of every module (focus on high-priority gaps only).
> - Ongoing documentation maintenance (flag as a follow-on option).
> - User-facing documentation (this covers technical/developer documentation only).

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** ingest the repository structure, source code, configuration files, READMEs, and any existing documentation to build a factual base.
- **Analyse and reason:** infer component boundaries, data flows, and integration points from code structure, imports, and configuration; identify areas where the code contradicts existing documentation.
- **Generate:** produce draft documentation sections with source-file citations for each claim.
- **Human in the loop:** an SME or engineer reviews every section for accuracy, corrects hallucinations, and adds context (business rules, historical decisions) that cannot be inferred from code alone.


---

## 4) Preconditions, access and governance
- Completed Documentation Gap Analysis with a prioritised gap register.
- Read access to the target repository.
- An SME or engineer available for peer review.
- Named reviewer (Solution Architect or Tech Lead) to approve the final documentation.
- ATRS trigger: No. DPIA check: only if documentation will be published externally. Accessibility: if published, ensure headings, alt text for any diagrams, and plain language.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI code reasoning | an enterprise LLM with repository access |  |
| Reusable architecture agent | [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) | Use the orchestrator as the only entrypoint; it will generate baseline docs and run required internal gates |
| Documentation platform | Markdown (in repo /docs), Confluence, SharePoint, or the department's standard |  |
| Diagramming (if needed) | Mermaid (AI can generate), draw.io, PlantUML |  |
| Not typically needed | SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1.5h for 2-3 documentation sections; 2h if the codebase is large or the gaps are extensive. Schedule in Week 2 (Execute phase).

Expandability: this activity can be repeated per documentation section. Each additional documentation section adds approximately 45min.

---

## 7) Inputs and data sources
- Gap register from Documentation Gap Analysis (to scope which sections to generate).
- Repository source code, configuration files, and existing documentation.
- SME or engineer available for peer review (book 30 minutes).
- If unavailable: if the code is too opaque for the AI to infer reliable documentation, note the gap as "requires SME interview" and defer to the Tribal Knowledge Capture activity.


---

## 8) Outputs and artefacts
- Documentation set covering the selected high-priority gaps: system overview, component descriptions, data-flow notes, and/or interface catalogue (as applicable).
- Each section includes source-file citations.
- Store architecture artefacts under `docs/architecture/<system-name>/`.
- Published in the agreed location with links from the repository README.
- Time log entry for P1.

Audience: engineers working on the system, new joiners, Solution Architect. The documentation set becomes the system baseline.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to generate and review the documentation. Compare against the department's estimate for writing the same documentation from scratch |
| **P2 Quality score** | reviewer rates each documentation section on the 1-5 rubric for accuracy (matches the actual system), completeness (covers the gap adequately), and clarity (a new engineer could understand it) |
| **P8 Reusable artefacts** | count the documentation generation prompts, section templates, and output format if reusable |


Secondary (collect if available):
- **P3 Developer sentiment**: include in the post-pilot SPACE survey; this directly addresses knowledge/skills gaps.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI hallucination**: the AI may describe components or data flows that do not exist, or misrepresent how the system works | require source-file citations for every claim; SME reviews every section |
| **Stale code producing misleading docs**: dead code or unused modules may be documented as active | cross-check with the SME; note any sections marked as "uncertain, verify with runtime evidence." |
| **Over-scoping the documentation**: the temptation to document everything rather than focusing on high-priority gaps | scope strictly to the gap register; note additional gaps as future work |
| **Documentation drift**: generated documentation will become stale if not maintained | flag ongoing maintenance as a follow-on option; recommend storing documentation close to the code (e.g. in-repo /docs) |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Documentation sections cover all selected high-priority gaps from the gap register.
- [ ] Each section has been reviewed by an SME or engineer and corrected where needed.
- [ ] Source-file citations are included.
- [ ] Documentation is published in the agreed location and linked from the repo README.
- [ ] Solution Architect or Tech Lead has approved the documentation set.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on drafting documentation from code versus manual authoring; coverage of documentation generated in one pass.
- **Prerequisites to document**: gap register, repo access, SME availability.
- **Limits and risks to document**: any hallucinated content caught in review, areas where code was too opaque for AI to document.
- **Reusable assets**: documentation generation prompts, section templates, output format.

- **Department continuation**: generate additional sections using the documentation prompts and section templates as new gaps are identified.

Pattern candidates:
- **"Code-grounded documentation with citations"**: requiring the AI to cite source files for each claim makes review faster and builds trust.
- **"Gap-register-scoped generation"**: generating documentation only for prioritised gaps keeps the activity focused and within timebox.

Anti-pattern candidates:
- **"AI-generated docs without review"**: publishing AI-drafted documentation without SME validation risks embedding inaccuracies as official truth.
- **"Documenting everything at once"**: attempting to generate comprehensive documentation in a single timebox leads to shallow, unvalidated output.
- Reusable assets: prompts, templates, patterns for the library.