# Activity: Documentation gap analysis (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-1.5h |
| **Phase** | Assess (Week 1) |
| **Inputs** | Repository, existing docs |
| **Key output** | Gap register |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems with poor documentation create a single-point-of-failure risk: only a few people know how the system works, onboarding is slow, and every change carries hidden risk. Before generating new documentation, the team needs to know what exists, what is missing, and what is outdated.

This activity scans the repository and existing documentation, compares what is present against a standard checklist, and produces a prioritised gap list. This tells the team exactly what to document next (via the Generate System Documentation and Architecture Summary activities) versus what can wait.

Decision enabled: agree which documentation gaps to fill within the pilot and which to defer, with owners assigned.


---

## 2) What we will do (scope and steps)
Description: Identify missing or conflicting documentation and create a remedial plan.

Sub tasks:
1. Define the documentation checklist: what a well-documented system should have. Standard categories include: (a) architecture overview, (b) component/service descriptions, (c) API documentation, (d) data model/schema docs, (e) deployment and infrastructure notes, (f) runbooks and operational procedures, (g) onboarding guide, (h) ADRs or decision records, (i) test strategy and coverage notes.
2. Inventory existing documentation: scan the repository (READMEs, /docs folders, inline comments, wiki links) and any external documentation stores (Confluence, SharePoint, etc.).
3. Use AI to compare the inventory against the checklist and produce a gap matrix: for each checklist item, note whether documentation exists (present/partial/absent), its last-updated date if discoverable, and a one-line quality note (e.g. "README exists but describes a previous version of the API").
4. Walk through the gap matrix with a subject matter expert (SME). For each gap, ask: is this a genuine gap or is the knowledge documented elsewhere? Is this critical for onboarding or change safety?
5. Prioritise gaps: tag each as high (needed for the pilot), medium (needed soon), or low (can wait). Assign an owner for each high-priority gap.
6. Produce a one-page gap register with priorities, owners, and recommended next activities (e.g. "Architecture overview: absent, high priority, owner: [name], fill via Architecture Summary activity").
	- If architecture gaps are high priority, recommend [Architecture Docs and Governance Orchestrator](../reusable-agents/architecture/architecture-docs-governance.agent.md) as the architecture workflow entrypoint.
	- If architecture docs already exist but need challenge or validation, still route users to the orchestrator and let it invoke the internal review stages.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** run this as the first L3 activity. Its output shapes the scope for Generate System Documentation, Architecture Summary, and other L3 activities. Schedule in Week 1 (Assess phase).

> **Out of scope:**
> - Writing the missing documentation (see Generate System Documentation and Architecture Summary).
> - Full documentation audit across all department systems (scope to the pilot system only).
> - Enforcing documentation standards beyond the pilot.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** scan the repository structure, READMEs, /docs folders, inline comments, and any linked documentation stores to build an inventory of what exists.
- **Analyse and reason:** compare the inventory against the documentation checklist, identify gaps, assess staleness (last-modified dates), and flag contradictions between different documentation sources.
- **Generate:** produce the gap matrix and the prioritised gap register.
- **Human in the loop:** an SME validates the gap matrix to catch false positives (docs that exist elsewhere) and confirm priority. Solution Architect or Tech Lead approves the gap register and owner assignments.


---

## 4) Preconditions, access and governance
- Read access to the target repository/repositories and any external documentation stores.
- An SME available for a 20-30 minute walkthrough of the gap matrix.
- Named reviewer (Solution Architect or Tech Lead) to approve the gap register.
- ATRS trigger: No. DPIA check: No (inventory only, no new content generated).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning and analysis | an enterprise LLM (e.g. GitHub Copilot Chat, Azure OpenAI, or equivalent) for scanning and comparing documentation inventory against the checklist |  |
| Repository search | IDE search, grep/ripgrep, or GitHub/GitLab search to locate documentation files and inline comments |  |
| Notes and reporting | Markdown or spreadsheet for the gap matrix and register; stored in the shared evidence area |  |
| Not typically needed for this activity | SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1h for a well-structured repository; 2h if documentation is scattered across multiple stores. Schedule in Week 1 (Assess phase).

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 1 to 2h.

---

## 7) Inputs and data sources
- Repository URL(s) and branch.
- Locations of any external documentation (Confluence spaces, SharePoint sites, wiki links, shared drives).
- An SME who knows the system for the validation walkthrough (book 20-30 minutes).
- If unavailable: if no SME is available, produce the gap matrix from the repository scan alone and mark it as "unvalidated". Schedule a follow-up walkthrough.


---

## 8) Outputs and artefacts
- Gap matrix (spreadsheet or Markdown table): one row per checklist category, columns for status (present/partial/absent), last-modified date, quality note, and source location.
- Prioritised gap register (one page): high/medium/low priority per gap, assigned owner for high-priority items, and recommended L3 activity to fill each gap.
- Agent routing note for architecture-related gaps: generation vs independent review.
- Time log entry for P1.

Audience: Solution Architect, Tech Lead, department engineering lead. The gap register is the primary scoping input for subsequent L3 activities.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the gap register. Compare against the department's estimate for a manual documentation audit |
| **P2 Quality score** | reviewer rates the gap register on the 1-5 rubric for accuracy (gaps are genuine), completeness (all categories checked), and actionability (priorities and owners are clear) |
| **P8 Reusable artefacts** | count the documentation checklist template, AI scanning prompt, and gap register format if reusable |


Secondary (collect if available):
- **P3 Developer sentiment**: include in the post-pilot SPACE survey; this activity directly addresses onboarding pain.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **False gaps**: AI may miss documentation that exists in non-standard locations (e.g. embedded in Jira tickets, Slack channels, or personal notes) | the SME walkthrough catches these; ask explicitly about informal knowledge sources |
| **Stale documentation counted as present**: a document may exist but be years out of date | include last-modified date in the gap matrix; flag anything older than 12 months for SME review |
| **Scope creep into writing documentation**: the temptation to start filling gaps during the analysis | this activity produces the gap register only; all writing is deferred to subsequent L3 activities |
| **SME unavailability**: if no SME is available, the gap register may have false positives | mark as "unvalidated" and schedule a follow-up |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Gap matrix covers all checklist categories with status, date, quality note, and source.
- [ ] SME has validated the matrix (or it is marked "unvalidated" with follow-up scheduled).
- [ ] Gap register is prioritised with owners for high-priority items.
- [ ] Solution Architect or Tech Lead has approved the register.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added for the scoping decision (which gaps to fill in the pilot).


---

## 12) Playbook contribution
- **Where AI helped**: speed of inventory scanning and gap identification versus manual audit; ability to cross-check multiple documentation stores.
- **Prerequisites to document**: repo access, documentation store locations, SME availability.
- **Limits and risks to document**: any false gaps, stale documentation issues, or informal knowledge sources the AI could not access.
- **Reusable assets**: documentation checklist template, AI scanning prompt, gap register format.

- **Department continuation**: re-run on additional repositories or schedule a periodic review using the documentation checklist and gap register format.

Pattern candidates:
- **"Checklist-driven gap analysis"**: defining what good documentation looks like before scanning produces a structured, comparable result across different systems.
- **"SME validation catches hidden docs"**: informal documentation (Slack, Jira, personal notes) is common in legacy systems and is only discoverable through human input.

Anti-pattern candidates:
- **"Repository-only scan"**: scanning only the repo misses documentation stored in external systems (Confluence, SharePoint, wikis). Always ask about external documentation stores.
- **"Gap analysis without prioritisation"**: a flat list of gaps without priority and owners leads to no action being taken.
- Reusable assets: prompts, templates, patterns for the library.