# Activity: Contract summarisation (L2)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-2h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Vendor contracts, SLAs |
| **Key output** | Contract summary |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Expired or expiring vendor contracts create commercial uncertainty that blocks modernisation decisions. Key obligations, renewal terms, exit clauses, and service levels are often buried across multiple documents, making it slow and error-prone for teams to understand what they are locked into.

This activity uses AI to rapidly ingest contract documents and produce a structured summary of constraints, risks, and open questions. It gives the team the commercial picture they need to decide whether to proceed to a full options appraisal (renew, replace, or retire).

Decision enabled: determine whether the commercial position is clear enough to proceed to options appraisal, and identify any clauses that need urgent legal or commercial attention.


---

## 2) What we will do (scope and steps)
Description: Ingest and summarise key clauses, constraints and risks from contracts.

Sub tasks:
1. Confirm which contract documents are in scope with the department commercial or programme lead. Collect all relevant files (contracts, amendments, side letters, schedules) in a secure working area.
2. Verify data handling: confirm the AI tool being used is approved for processing commercial-in-confidence material. If not, use a local/on-premise model or redact sensitive values before processing.
3. Feed each document into the AI and prompt it to extract: (a) contract parties and effective dates, (b) term and renewal provisions (auto-renewal, notice periods, break clauses), (c) key obligations on each party, (d) service levels / SLAs and penalty mechanisms, (e) exit and transition-out provisions, (f) IP ownership and data rights, (g) liability caps and indemnities, (h) any lock-in mechanisms (exclusivity, minimum spend, proprietary formats).
4. For each extracted item, note the source clause reference (e.g. "Section 14.2") so findings are traceable.
5. Compile a one-page structured summary: table of key terms and dates, bullet list of constraints and obligations, and a risk section highlighting expiry risks, lock-in concerns, and open questions.
6. Flag any clauses that are ambiguous or appear to conflict with modernisation goals (e.g. restrictive IP terms that prevent code reuse).
7. Walk through the summary with a commercial or programme lead for validation.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** this is typically the first activity in the L2 chain. Its output feeds directly into Extract Constraints, Risks and Obligations and Options Appraisal. Run in Week 1 (Assess phase) or early Week 2.

> **Out of scope:**
> - Legal advice or legal interpretation of clauses (flag ambiguities for the department's legal team).
> - Negotiation strategy or supplier engagement.
> - Financial modelling (see Cost Comparison Analysis).

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** ingest contract PDFs or Word documents, parse clause structures, and extract specific provisions (dates, obligations, SLAs, exit terms) with source references.
- **Analyse and reason:** identify potential conflicts between contract terms and modernisation objectives, flag lock-in mechanisms, and highlight expiry risks based on current date versus contract timelines.
- **Generate:** produce the structured summary document with a key-terms table, obligation bullets, and risk flags.
- **Human in the loop:** a commercial or programme lead validates the summary for accuracy and completeness. AI output is a draft; it does not constitute legal advice.


---

## 4) Preconditions, access and governance
- Contract documents collected and accessible in a secure working area (not uploaded to unapproved cloud services).
- Confirmation that the AI tool is approved for commercial-in-confidence material. If not, use a local model or redact sensitive values first.
- Named reviewer: a commercial, programme, or procurement lead who can validate the summary.
- ATRS trigger: No (internal analysis). DPIA check: Yes, if the AI tool processes personal data within the contracts (e.g. named individuals, pricing data). Confirm with the department's data protection lead before processing.
- Quick security check: confirm that contract documents will not be retained by the AI tool beyond the session.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI document analysis | an enterprise LLM with document ingestion capability (e.g. Azure OpenAI with document grounding, or equivalent) | Must be approved for commercial-in-confidence material |
| Document conversion (if needed) | PDF-to-text extraction tools to prepare inputs for the AI |  |
| Notes and reporting | Markdown, Word, or spreadsheet for the structured summary; stored in the department's secure document area |  |
| Not typically needed for this activity | code assistants, SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1h for a single contract with fewer than 50 pages; 2h for multiple contracts or contracts with extensive schedules and amendments. Schedule in Week 1 (Assess phase) or early Week 2.

Expandability: this activity can be repeated per contract. Each additional contract adds approximately 1 to 2h.

---

## 7) Inputs and data sources
- Contract documents: master agreement, amendments, side letters, schedules, and any related correspondence the department considers relevant.
- Format: PDF or Word. If scanned PDFs (image-based), confirm OCR quality before processing.
- Department contact: commercial, programme, or procurement lead who can answer questions about context and validate output.
- If unavailable: if contracts cannot be shared with the pilot team (e.g. sensitivity restrictions), ask the department to run the prompts themselves and share the AI output. Document this constraint and tag confidence as Low.


---

## 8) Outputs and artefacts
- Structured contract summary (Markdown or Word): key-terms table (parties, dates, term, renewal, notice periods), obligation list, SLA summary, exit/transition provisions, IP and data rights, lock-in flags, and open questions.
- Risk flags: clauses that may conflict with modernisation goals, with source references.
- Time log entry for P1.

Audience: commercial/programme lead, Solution Architect, pilot Delivery Manager. The summary feeds directly into the Extract Constraints, Risks and Obligations activity and the Options Appraisal.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the contract summary. Compare AI-assisted time against the department's estimate for how long a commercial analyst would take to manually read and summarise the same documents |
| **P2 Quality score** | reviewer (commercial or programme lead) rates the summary on the 1-5 rubric for accuracy (extracted terms match the actual contracts), completeness (no major clauses missed), and actionability (clear enough to inform the options appraisal) |
| **P8 Reusable artefacts** | count the AI extraction prompt template, the summary document template, and the extraction checklist if reusable |


Secondary (collect if available):
- **P7 Vulnerability/risk reduction**: count of previously unrecognised commercial risks or lock-in mechanisms surfaced by the analysis.
- **P3 Developer sentiment**: not directly applicable; capture commercial team feedback informally if available.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Misinterpretation of legal language**: AI may misread complex or ambiguous contract clauses | always cite the source clause reference so the reviewer can verify; mark the output as "draft summary, not legal advice." |
| **Commercial confidentiality breach**: contract contents uploaded to an unapproved AI service | confirm tool approval for commercial-in-confidence data before starting; use local/on-premise models or redaction if needed |
| **OCR quality for scanned PDFs**: scanned documents may produce garbled text, leading to missed or incorrect extractions | spot-check OCR output quality before feeding to AI; flag any unreadable sections |
| **Incomplete document set**: if not all amendments or side letters are provided, the summary may miss overriding provisions | ask the department to confirm the document set is complete; note any gaps and tag confidence as Medium or Low |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Structured summary covers all in-scope contract documents.
- [ ] Key terms, obligations, SLAs, exit provisions, IP rights, and lock-in mechanisms are extracted with source clause references.
- [ ] Risk flags are listed with rationale.
- [ ] Commercial or programme lead has reviewed and validated the summary.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added if the summary reveals issues requiring urgent commercial or legal attention.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on document ingestion and clause extraction versus manual reading; ability to cross-reference multiple documents quickly.
- **Prerequisites to document**: tool approval for commercial-in-confidence material, document format quality (OCR), complete document set.
- **Limits and risks to document**: any misinterpreted clauses, missed provisions, or confidentiality concerns encountered.
- **Reusable assets**: AI extraction prompt template, contract summary template, extraction checklist.

- **Department continuation**: re-run for newly expired or expiring contracts using the extraction prompt and summary template.

Pattern candidates:
- **"AI-assisted clause extraction with source references"**: prompting the AI to cite clause numbers alongside extracted terms makes validation faster and builds trust in the output. Record accuracy rate.
- **"Scanned PDF pre-check"**: checking OCR quality before AI processing avoids wasted time on garbled inputs.

Anti-pattern candidates:
- **"Treating AI contract summaries as legal advice"**: AI output is a structured draft, not a legal opinion. Always mark as "draft, not legal advice" and route ambiguities to the department's legal team.
- **"Processing contracts on unapproved tools"**: uploading commercial-in-confidence documents to consumer AI tools creates a data breach risk. Always confirm tool approval first.
- Reusable assets: prompts, templates, patterns for the library.