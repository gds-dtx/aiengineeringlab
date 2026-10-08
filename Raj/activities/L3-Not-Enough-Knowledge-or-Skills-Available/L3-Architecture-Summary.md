# Activity: Produce architecture summary (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-1.5h |
| **Phase** | Assess (Week 1-2) |
| **Inputs** | Repository, gap register, SME |
| **Key output** | Architecture summary + component diagram |
| **Hub activity** | Yes (feeds L4, L5, L6, L7) |

---

## 1) Why this activity (value and decision)
New engineers joining a legacy system typically spend days or weeks building a mental model of how the system is structured. Without a concise architecture overview, this understanding comes through scattered code reading and ad-hoc questions to busy team members.

This activity produces a 1-2 page architecture summary from the repository: key components, their responsibilities, how they interact, major dependencies, and known hotspots. It becomes the entry point for any new engineer and the reference for change-impact analysis.

Decision enabled: approve the summary as the official system entry point and use it to scope subsequent activities.


---

## 2) What we will do (scope and steps)
Description: Produce a concise 1 to 2 page architecture overview.

Sub tasks:
1. Review the gap register to confirm whether an architecture overview exists. If partial, use it as a starting point.
2. Use the AI code assistant grounded on the repository to produce a draft architecture summary covering: (a) system purpose and key user groups, (b) major components/services with responsibilities and boundaries, (c) component interaction patterns (synchronous calls, async messaging, shared databases), (d) external integrations and APIs, (e) key dependencies (frameworks, runtimes, databases, message brokers), (f) known hotspots, risks, and technical debt areas.
3. If the codebase supports it, generate a high-level component diagram (Mermaid or similar) showing the main components and their connections.
4. Walk through the draft with an SME to validate accuracy, correct any misrepresentations, and add context the AI could not infer (e.g. "this service was originally part of the monolith and still has tight coupling").
5. Finalise the summary (1-2 pages plus diagram) and publish in the agreed documentation location.
	- Standard path: `docs/architecture/<system-name>/`.
6. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run in parallel with or shortly after Documentation Gap Analysis. Schedule in Week 1-2.

> **Cross-type links:** this is the most widely consumed output across legacy types. Downstream consumers include:
> - L4: Change Impact Mapping, Enhance CI/CD, Improve Observability, Refactoring Opportunities, Tests for Change Requests, Validate Refactors Exemplar (system-level context for scoping changes).
> - L5: Migration Readiness Assessment, Generate Migration Options, Containerisation Exemplar, IaC Patterns, Evaluate Feasibility and Risk (workload classification and dependency context).
> - L6: Triage SAST/SCA, Architecture Risk Scan (scan scoping and component context).
> - L7: Improve Logging and Observability (service topology for gap analysis).
> If the pilot covers multiple legacy types, prioritise this activity in Week 1 so downstream activities can build on it.

> **Out of scope:**
> - Detailed design documentation for individual components.
> - Architecture decision records (ADRs) unless they already exist and need summarising.
> - Performance or capacity analysis.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** scan the repository structure, entry points, configuration files, and dependency graph to identify components, services, and integration points.
- **Analyse and reason:** infer component boundaries and interaction patterns from imports, API routes, message queue configurations, and database connections; flag areas of high complexity or tight coupling.
- **Generate:** produce the architecture summary text and a component diagram (Mermaid or similar).
- **Human in the loop:** an SME validates the component list, corrects interaction patterns, and adds historical context. Solution Architect or Tech Lead approves the summary.


---

## 4) Preconditions, access and governance
- Read access to the target repository.
- An SME available for a 15-20 minute validation walkthrough.
- Named reviewer (Solution Architect or Tech Lead).
- ATRS trigger: No. DPIA check: only if the summary will be published externally.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI code reasoning | an enterprise LLM with repository access |  |
| Reusable architecture agent | [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) | Use the orchestrator as the only entrypoint; it will run any required internal review and governance stages |
| Diagramming | Mermaid (AI can generate), draw.io, PlantUML |  |
| Documentation platform | Markdown (in repo), Confluence, SharePoint |  |
| Not typically needed | SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1h for a small/medium codebase; 1.5h for a large or multi-service system. Schedule in Week 1-2.

Expandability: this activity can be repeated per system or service. Each additional system or service adds approximately 1 to 1.5h.

---

## 7) Inputs and data sources
- Repository source code, configuration files, and existing documentation (if any).
- Gap register from Documentation Gap Analysis (to confirm priority).
- SME available for validation (book 15-20 minutes).
- Any existing architecture diagrams or notes from the department.
- If unavailable: if no SME is available, produce the draft and mark as "unvalidated, requires SME review."


---

## 8) Outputs and artefacts
- Architecture summary (1-2 pages, Markdown or Word): components, responsibilities, interaction patterns, external integrations, dependencies, and hotspots.
- Component diagram (Mermaid or similar) if the codebase supports it.
- Store artefacts under `docs/architecture/<system-name>/`.
- Time log entry for P1.

Audience: new engineers, Solution Architect, Tech Lead. This becomes the system entry point.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time versus department estimate for manually producing the same summary |
| **P2 Quality score** | reviewer rates the summary on the 1-5 rubric for accuracy, completeness, and usefulness as an entry point |
| **P8 Reusable artefacts** | count the summary template, generation prompt, and diagram format |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incorrect component boundaries**: AI may group code incorrectly or merge distinct services into one | SME validates the component list |
| **Missing external integrations**: AI may not detect integrations configured outside the repo (e.g. environment variables, external config) | ask the SME to confirm the integration list |
| **Diagram complexity**: auto-generated diagrams may be too detailed or too abstract | aim for 5-10 boxes; simplify with the SME |
| **Hallucinated interaction patterns**: AI may infer flows that do not exist | require source-file citations for each interaction described |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Architecture summary covers components, interactions, dependencies, and hotspots.
- [ ] SME has validated the content.
- [ ] Diagram is included (if feasible).
- [ ] Published in the agreed location.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of producing an architecture overview from code alone; quality comparison versus manually authored equivalents.
- **Prerequisites to document**: repo access, SME availability.
- **Limits and risks to document**: any hallucinated components or interactions.
- **Reusable assets**: summary template, generation prompt, diagram format.

- **Department continuation**: update the summary as the system evolves or produce summaries for additional systems using the generation prompt and diagram format.

Pattern candidates:
- **"Repo-to-architecture-summary in one pass"**: AI can produce a usable first draft from the repository alone, which the SME then refines. This is faster than interviewing the SME from scratch.

Anti-pattern candidates:
- **"Publishing the AI draft as-is"**: AI architecture summaries frequently contain errors in component boundaries and interaction flows. SME validation is essential.
- Reusable assets: prompts, templates, patterns for the library.