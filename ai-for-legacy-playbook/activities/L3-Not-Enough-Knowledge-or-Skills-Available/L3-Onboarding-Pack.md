# Activity: Create onboarding pack (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | All L3 outputs |
| **Key output** | Onboarding pack |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
New joiners to legacy systems often lose their first one to two weeks navigating an undocumented codebase, discovering tribal knowledge through trial and error, and asking the same questions of senior engineers. This time cost repeats with every onboarding event and is a direct drag on team velocity.

This activity uses AI to draft a structured onboarding pack that brings a new joiner to productive contribution faster. The pack consolidates system context, architectural overview, development environment setup, and key workflows into a single document.

Decision enabled: adopt or adapt the pack as the standard onboarding resource and confirm whether AI-assisted onboarding material is faster and more effective than the previous approach.


---

## 2) What we will do (scope and steps)
Description: Bundle docs, Q and A, tests and diagrams into a single pack.

Sub tasks:
1. Gather existing onboarding material (if any): wiki pages, README files, setup guides, architecture diagrams. Identify what already exists and what is missing.
2. Define the pack structure (use the following as a starting template): (a) Service overview and business context, (b) Architecture summary (reference the L3-Architecture-Summary output if available), (c) Development environment setup step by step, (d) Key code areas and module responsibilities, (e) Common workflows (build, test, deploy, debug), (f) Access and permissions checklist, (g) Contacts and escalation paths, (h) Glossary of domain or system-specific terms.
3. Use the AI assistant with repository context to draft each section: feed in source code, README files, CI config, and any existing documentation. Prompt the AI to explain the system as if to a new joiner with general engineering experience but no system-specific knowledge.
4. Review each section for accuracy. Correct any AI-generated errors, especially in setup instructions and architecture descriptions. Verify setup instructions by running them in a clean environment if possible.
5. Conduct a walkthrough with a new joiner (or the most recently onboarded team member). Record questions asked, confusion points, and missing information.
6. Revise the pack based on the walkthrough feedback.
7. Publish the pack in the agreed location (wiki, Confluence, repo docs folder). Note any accessibility requirements.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from running after Architecture Summary (L3) and Documentation Gap Analysis (L3). Can run in parallel with other L3 activities. Schedule in Week 2-3.

> **Out of scope:**
> - Comprehensive training programme design.
> - Role-specific or security-clearance-specific onboarding procedures.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** read the repository (source code, README, CI config, existing docs) to understand the system and extract onboarding-relevant information.
- **Generate:** draft each section of the onboarding pack, explaining the system in plain language for a new joiner.
- **Analyse and reason:** identify gaps in the pack by comparing its coverage against the defined structure; flag areas where source material is insufficient.
- **Human in the loop:** an engineer reviews every section for accuracy. A new joiner or recent onboardee validates the pack during a walkthrough.


---

## 4) Preconditions, access and governance
- Read access to the target repository and any existing documentation (wiki, Confluence, shared drives).
- A new joiner or recently onboarded team member available for the walkthrough step.
- Named reviewer (Tech Lead or Senior Engineer with system knowledge) available.
- Publication location agreed (wiki, repo docs folder, Confluence).
- ATRS trigger: No. DPIA check: No (assuming pack does not contain personal data or credentials).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on the repository and existing docs |  |
| Code assistants | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Documentation platform | Confluence, GitHub Wiki, MkDocs, Notion, or equivalent |  |
| Diagramming | Mermaid, draw.io, Lucidchart |  |
| Not typically needed | SCA/SBOM tools, security scanning tools |  |


---

## 6) Timebox
Suggested: 2h for initial draft and review; 1h for walkthrough and revision. Total: 3h. Schedule in Week 2-3.


---

## 7) Inputs and data sources
- Target repository (source code, README, CI/CD config, existing docs folder).
- Existing documentation: wiki pages, Confluence spaces, setup guides, architecture diagrams.
- Architecture Summary output (from L3-Architecture-Summary, if completed).
- Documentation Gap Analysis register (from L3-Documentation-Gap-Analysis, if completed).
- If unavailable: if no existing documentation exists, the AI will draft sections from source code analysis alone. Note in the pack which sections are draft-only and need subject-matter expert validation.


---

## 8) Outputs and artefacts
- Onboarding pack document (structured per the template in sub-task 2).
- Walkthrough feedback notes (questions raised, confusion points, missing information).
- Time log entry for P1.

Audience: new joiners, hiring managers. The pack also serves as a living reference for the wider team.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the pack with AI assistance. Compare against an estimate for producing equivalent material manually |
| **P2 Quality score** | reviewer and walkthrough participant rate the pack on the 1-5 rubric for completeness, accuracy, and usefulness |
| **P3 Developer sentiment** | include onboarding experience questions in the post-pilot SPACE survey |
| **P8 Reusable artefacts** | count the pack itself plus any prompt templates used to generate sections |


Secondary:
- **P4 Lead time**: if the pack reduces time-to-first-contribution for new joiners, note this qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI-generated setup instructions that do not work**: the AI may hallucinate configuration steps or omit prerequisites | verify setup instructions by running them in a clean environment; mark any unverified steps clearly |
| **Pack becomes stale quickly**: if the system changes, the pack drifts out of date | store the pack in version control alongside the code; assign an owner for periodic review |
| **Over-reliance on AI for domain context**: the AI cannot know business context, team norms, or organisational processes that are not in the code | supplement AI-drafted sections with subject-matter expert input |
| **Accessibility and format issues**: the pack may not meet accessibility standards for all readers | check formatting against departmental accessibility guidelines before publication |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Onboarding pack covers all sections in the defined structure.
- [ ] At least one engineer has reviewed the pack for accuracy.
- [ ] Walkthrough has been conducted with a new joiner or recent onboardee, and feedback incorporated.
- [ ] Pack is published in the agreed location.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of drafting onboarding material from source code; quality and completeness of the generated sections.
- **Prerequisites to document**: repository access, existing documentation availability, walkthrough participant.
- **Limits and risks to document**: any inaccurate setup instructions, missing business context, sections requiring manual input.
- **Reusable assets**: onboarding pack template structure, section-generation prompt templates, walkthrough feedback form.

- **Department continuation**: update the pack as the system or team changes. The pack template and assembly process are documented for department use.

Pattern candidates:
- **"Repository-grounded onboarding generation"**: feeding the AI the full repo context (code, config, README) produces more accurate onboarding material than prompting from memory.
- **"Walkthrough-driven validation"**: testing the pack with a real new joiner catches gaps that expert reviewers miss.

Anti-pattern candidates:
- **"AI-only onboarding pack without expert review"**: AI cannot capture team norms, organisational context, or undocumented processes. Expert input is essential.
- **"Monolithic pack with no structure"**: a single unstructured document is harder to maintain and navigate. Use the defined section template.

Pattern candidates:
- **"Repository-grounded onboarding generation"**: feeding the AI the full repo context (code, config, README) produces more accurate onboarding material than prompting from memory.
- **"Walkthrough-driven validation"**: testing the pack with a real new joiner catches gaps that expert reviewers miss.

Anti-pattern candidates:
- **"AI-only onboarding pack without expert review"**: AI cannot capture team norms, organisational context, or undocumented processes. Expert input is essential.
- **"Monolithic pack with no structure"**: a single unstructured document is harder to maintain and navigate. Use the defined section template.
- Pre requisites: list access and licensing assumptions.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.