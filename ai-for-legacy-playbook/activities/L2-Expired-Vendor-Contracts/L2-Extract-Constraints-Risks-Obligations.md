# Activity: Extract constraints, risks and obligations (L2)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-2h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Vendor contracts, SLAs |
| **Key output** | Constraints/risks/obligations register |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
The contract summary gives a broad commercial picture, but options appraisal requires a structured, item-level view of constraints, risks, and obligations that can be scored and compared across options. Without this, teams make decisions based on a general sense of the contract rather than specific evidence.

This activity takes the contract summary and source documents and produces a structured extraction: a checklist of every constraint, obligation, and risk that could affect a renew/replace/retire decision, each tagged with severity and source reference.

Decision enabled: provides the structured input needed to score options in the Options Appraisal activity, and highlights any obligations requiring urgent attention.


---

## 2) What we will do (scope and steps)
Description: Systematically extract key constraints, risks and obligations to feed into options appraisal.

Sub tasks:
1. Define the extraction checklist before processing. Categories should include: (a) contractual obligations on each party, (b) service level commitments and penalty mechanisms, (c) data ownership and IP restrictions, (d) exit/transition provisions and associated costs, (e) lock-in mechanisms (exclusivity, minimum spend, proprietary formats), (f) termination triggers and notice periods, (g) liability caps and indemnities, (h) compliance or regulatory requirements embedded in the contract.
2. Using the contract summary from the Contract Summarisation activity as a starting point, feed source documents into the AI with the checklist and prompt it to extract items against each category, citing clause references.
3. For each extracted item, tag: severity (high/medium/low impact on options), whether it is a hard constraint (legally binding) or a soft constraint (negotiable), and which options it affects (renew, replace, retire).
4. Flag any items where the wording is ambiguous or contradictory; mark these for review by the department's commercial or legal contact.
5. Compile into a structured extraction register (spreadsheet or table): one row per item, with columns for category, description, clause reference, severity, constraint type, affected options, and status (confirmed/ambiguous).
6. Walk through the register with the commercial or programme lead, focusing on ambiguous items and high-severity constraints.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** depends on Contract Summarisation output. Feeds directly into the Options Appraisal. Run shortly after Contract Summarisation, in Week 1-2.

> **Out of scope:**
> - Legal interpretation of ambiguous clauses (flag for the department's legal team).
> - Negotiation strategy or supplier engagement.
> - Cost quantification (see Cost Comparison Analysis).

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** parse contract documents against the extraction checklist, citing specific clause references for each finding.
- **Analyse and reason:** categorise each extracted item by type, assess severity, identify which options (renew/replace/retire) each constraint affects, and flag ambiguous or contradictory wording.
- **Generate:** produce the structured extraction register with tagged items and the ambiguity flag list.
- **Human in the loop:** a commercial or programme lead validates high-severity findings and resolves ambiguities. AI output is factual extraction, not legal advice.


---

## 4) Preconditions, access and governance
- Completed Contract Summarisation output (L2).
- Access to the full contract document set (same set as used for summarisation).
- AI tool approved for commercial-in-confidence material (same approval as Contract Summarisation).
- Named reviewer: commercial, programme, or procurement lead.
- ATRS trigger: No. DPIA check: same as Contract Summarisation (confirm before processing).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI document analysis | an enterprise LLM with document ingestion capability (e.g. Azure OpenAI with document grounding, or equivalent) | Must be approved for commercial-in-confidence material |
| Structured output | spreadsheet (Excel, Google Sheets) or Markdown table for the extraction register |  |
| Notes and reporting | stored in the department's secure document area |  |
| Not typically needed for this activity | code assistants, SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1h if the contract summary is thorough and the document set is small; 2h for multiple contracts with extensive schedules. Schedule shortly after Contract Summarisation.

Expandability: this activity can be repeated per contract. Each additional contract adds approximately 1 to 2h.

---

## 7) Inputs and data sources
- Contract Summarisation output (L2): the structured summary document.
- Full contract document set (master agreement, amendments, schedules, side letters).
- Department commercial or programme lead available for the validation walkthrough.
- If unavailable: if the contract summary has not been produced, run both activities in sequence within a combined timebox.


---

## 8) Outputs and artefacts
- Extraction register (spreadsheet or Markdown table): one row per item with category, description, clause reference, severity, constraint type (hard/soft), affected options (renew/replace/retire), and status (confirmed/ambiguous).
- Ambiguity flag list: items requiring legal or commercial clarification, with specific questions.
- Time log entry for P1.

Audience: commercial/programme lead, Solution Architect, pilot Delivery Manager. The register is the primary input for the Options Appraisal activity.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the extraction register. Compare AI-assisted time against the department's estimate for manual extraction |
| **P2 Quality score** | reviewer rates the register on the 1-5 rubric for accuracy (items match actual contract wording), completeness (all checklist categories covered), and actionability (severity and option tags are useful for the options appraisal) |
| **P8 Reusable artefacts** | count the extraction checklist template, AI prompt, and register format if reusable |


Secondary (collect if available):
- **P7 Vulnerability/risk reduction**: count of previously unrecognised constraints or risks surfaced.
- **P3 Developer sentiment**: not directly applicable; capture commercial team feedback informally.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Missed obligations due to scattered provisions**: key obligations may be split across the main body, schedules, and amendments | process all document parts, not just the main agreement; prompt the AI to check for overriding provisions in amendments |
| **Misclassification of severity**: AI may under- or over-rate the impact of a constraint | reviewer validates all high-severity items and spot-checks medium items |
| **Ambiguous clauses reported as definitive**: AI may present uncertain interpretations as facts | require the AI to flag confidence level for each extraction; mark ambiguous items for legal review |
| **Commercial confidentiality**: same risk and mitigations as Contract Summarisation (confirmed tool approval, secure storage) |  |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Extraction register covers all categories in the checklist with at least one pass through every document.
- [ ] Each item has a clause reference, severity tag, constraint type, and affected options.
- [ ] Ambiguous items are flagged with specific questions for legal/commercial clarification.
- [ ] Commercial or programme lead has validated the register.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added if urgent obligations are discovered.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on systematic extraction versus manual reading; consistency of categorisation across multiple documents.
- **Prerequisites to document**: complete document set, tool approval for commercial data, contract summary as input.
- **Limits and risks to document**: any misclassified items, missed provisions, or ambiguities the AI failed to flag.
- **Reusable assets**: extraction checklist template, AI extraction prompt, register format.

- **Department continuation**: re-run for additional contracts using the extraction checklist and register format.

Pattern candidates:
- **"Checklist-driven extraction"**: defining the extraction categories before running the AI produces more complete and consistent results than open-ended prompting.
- **"Severity and option tagging"**: tagging each constraint with severity and affected options makes the register directly usable in options scoring.

Anti-pattern candidates:
- **"Open-ended contract Q&A"**: asking the AI general questions about the contract produces narrative answers that are hard to compare and score. Use structured extraction instead.
- **"Skipping amendments and schedules"**: processing only the main agreement misses overriding provisions in later amendments.
- Reusable assets: prompts, templates, patterns for the library.