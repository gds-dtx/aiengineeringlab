# Activity: Prepare onboarding material for new vendors (L2)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | All L2 outputs, system docs |
| **Key output** | Vendor onboarding pack |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
When a vendor contract is replaced, new suppliers need to ramp up quickly on the existing system. Without a usable onboarding pack, the first weeks are spent asking basic questions, reading scattered documentation, and building context that could have been provided upfront. This wastes time and creates early friction.

This activity produces an AI-drafted onboarding pack (system overview, API map, key runbooks, contact points) that a new supplier can use from day one. It validates the pack through a walkthrough and measures how much it reduces ramp-up uncertainty.

Decision enabled: adopt the onboarding pack as the starting point for vendor transition, or identify gaps that need filling before a new vendor can be productive.


---

## 2) What we will do (scope and steps)
Description: Create an onboarding pack covering system overview, API map and runbooks.

Sub tasks:
1. Identify the target audience for the onboarding pack: incoming vendor technical team, their delivery/project manager, or both. Confirm with the department.
2. Gather existing inputs: current documentation (architecture diagrams, API specs, runbooks, deployment guides), repository README files, and any existing onboarding notes from the department's team.
3. Use AI to ingest all available documentation and produce a structured onboarding pack covering: (a) system overview (purpose, users, key business processes supported), (b) high-level architecture (components, integrations, data flows), (c) API map (key endpoints, authentication, versioning), (d) operational runbooks (deploy process, incident response, common tasks), (e) key contacts and escalation paths, (f) known issues, workarounds, and gotchas.
4. For each section, the AI should flag where information is missing or incomplete, so the department can fill gaps.
5. Run a validation walkthrough: present the pack to a team member who is relatively new to the system (or simulate a new-joiner perspective). Record questions and confusion points.
6. Update the pack based on walkthrough feedback.
7. Publish in the department's documentation area.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run in parallel with the Options Appraisal or after a "replace" decision is made. Most useful in Week 2-3 when there is enough system context from other activities.

> **Out of scope:**
> - End-to-end supplier mobilisation (contract, security, access provisioning).
> - Writing new architectural or technical documentation from scratch (see L3 activities for that).
> - Ongoing maintenance of the pack beyond the pilot.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** ingest existing documentation, repository READMEs, API specs, and runbooks to build a comprehensive base for the pack.
- **Generate:** produce the structured onboarding pack from the ingested material, filling in standard sections and formatting consistently. Flag gaps where source material is missing.
- **Analyse and reason:** identify inconsistencies between different documentation sources (e.g. architecture diagram shows a component not mentioned in the API spec) and flag them.
- **Human in the loop:** a department team member validates the pack content. The walkthrough with a new-joiner (or proxy) tests whether the pack is actually usable. Final version is reviewed by the Solution Architect or Tech Lead.


---

## 4) Preconditions, access and governance
- Access to existing documentation, repository READMEs, API specs, and runbooks.
- A department team member available for content validation.
- Ideally a relatively new team member (or someone willing to simulate a new-joiner perspective) for the walkthrough.
- AI tool approved for processing the system documentation (check whether any documentation contains sensitive or classified information).
- ATRS trigger: No. DPIA check: only if the onboarding pack will be shared with an external vendor and contains personal data or sensitive system details. Accessibility check: if the pack will be published externally, confirm it meets basic accessibility standards (headings, alt text for diagrams).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI document generation | an enterprise LLM (e.g. Azure OpenAI, GitHub Copilot Chat, or equivalent) grounded on the existing documentation and repository |  |
| Documentation platform | Markdown (in repo), Confluence, SharePoint, or the department's standard documentation tool |  |
| Diagramming (if needed) | Mermaid, draw.io, or existing architecture diagram tools |  |
| Not typically needed for this activity | SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1.5h for the draft and walkthrough; up to 2h if the existing documentation is sparse and significant gap-filling is needed. Schedule in Week 2-3.

Expandability: this activity can be repeated per system under transition. Each additional system under transition adds approximately 1.5 to 2h.

---

## 7) Inputs and data sources
- Existing documentation: architecture diagrams, API specs, deployment guides, runbooks, README files.
- Repository access (for READMEs, configuration examples, folder structure).
- Department team member for content validation.
- Walkthrough participant (ideally someone new to the system).
- If unavailable: if documentation is very sparse, note the pack as "draft, requires department input" and list specific gaps. This is itself a useful finding for the playbook.


---

## 8) Outputs and artefacts
- Onboarding pack (Markdown, Word, or Confluence page): system overview, architecture summary, API map, operational runbooks, key contacts, known issues and gotchas.
- Gap list: sections where information was missing or incomplete, with owners if assigned.
- Walkthrough feedback notes.
- Time log entry for P1.

Audience: incoming vendor technical team and their delivery manager. Secondary audience: department's own new starters.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the onboarding pack. Compare AI-assisted drafting time against the department's estimate for producing similar material manually |
| **P2 Quality score** | walkthrough participant and reviewer rate the pack on the 1-5 rubric for accuracy (content matches reality), completeness (new joiner could get started), and clarity (understandable without further explanation) |
| **P8 Reusable artefacts** | count the onboarding pack template, AI prompt, and gap-list format if reusable |


Secondary (collect if available):
- **P3 Developer sentiment**: if the walkthrough participant is an engineer, capture their feedback on usefulness.
- **P7 Vulnerability/risk reduction**: if the pack surfaces previously undocumented operational risks or known issues.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI hallucinating system details**: the AI may generate plausible-sounding but incorrect descriptions of system behaviour | every section must be validated by a department team member who knows the system |
| **Stale or contradictory source documentation**: existing docs may be outdated, leading the AI to produce inaccurate content | flag contradictions during generation; note "based on documentation as of [date]" and highlight sections that need department confirmation |
| **Sensitive information in the pack**: the pack may inadvertently include credentials, internal URLs, or security-sensitive architecture details | review the pack for sensitive content before sharing externally; remove or redact as needed |
| **Pack not maintained after pilot**: the onboarding pack may become stale if no one owns it | assign an owner and flag pack maintenance as a separate follow-on option if the department wants it kept current |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Onboarding pack covers all standard sections (system overview, architecture, API map, runbooks, contacts, known issues).
- [ ] Gap list is produced for sections where information was missing.
- [ ] Walkthrough has been conducted and feedback incorporated.
- [ ] Department team member has validated the content.
- [ ] Pack is published in the department's documentation area.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on drafting the pack from scattered documentation; ability to surface gaps and contradictions across multiple sources.
- **Prerequisites to document**: documentation availability, AI tool approval, walkthrough participant availability.
- **Limits and risks to document**: any hallucinated content caught in review, stale documentation issues, sensitive information handling.
- **Reusable assets**: onboarding pack template, AI drafting prompt, gap-list format, walkthrough feedback template.

- **Department continuation**: update the onboarding pack as the vendor situation changes, or adapt it for other systems under transition.

Pattern candidates:
- **"AI-drafted onboarding from existing docs"**: using AI to consolidate scattered documentation into a structured pack is significantly faster than manual authoring and catches gaps.
- **"New-joiner walkthrough validation"**: testing the pack with someone unfamiliar with the system catches assumptions and jargon that the authoring team takes for granted.

Anti-pattern candidates:
- **"Publishing without walkthrough"**: releasing the pack without testing it on a new-joiner proxy risks shipping content that looks complete but is unusable in practice.
- **"AI-generated architecture descriptions without validation"**: AI produces plausible but sometimes incorrect system descriptions. Always validate with someone who knows the system.
- Pre requisites: list access and licensing assumptions.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.