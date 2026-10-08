# Activity: Cost comparison analysis (L2)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | Contract summaries, pricing data |
| **Key output** | Cost comparison matrix |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Options appraisals without cost data are hard to act on. Even a rough cost comparison helps stakeholders distinguish between options that look similar on qualitative criteria but differ significantly in spend.

This activity compiles a lightweight cost comparison using person-day ROMs and known unit costs. It does not aim to produce a full business case; it provides enough budget signal to support the options decision within the pilot timebox.

Decision enabled: underpin the options appraisal with cost evidence, or identify where cost data is too uncertain to inform the decision without further work.


---

## 2) What we will do (scope and steps)
Description: Compile a lightweight comparison using person-day ROMs and known unit costs where available.

Sub tasks:
1. Identify the cost drivers for each option (renew, replace, retire) from the extraction register and options appraisal criteria. Typical drivers include: licence/subscription fees, implementation effort, migration effort, transition-out costs, training, operational run costs, and risk contingency.
2. For each driver, gather available data: current contract values, published price lists, vendor quotes, or department estimates. Where data is unavailable, use person-day ROMs with the pilot-scope hour-based adders.
3. Use AI to structure the comparison: create a table with options as columns and cost drivers as rows. For each cell, state the value (in person-days or currency if available), the data source, and a confidence tag (High/Medium/Low).
4. Calculate totals per option using the available data. If mixing person-days and currency, keep them in separate rows rather than converting (to avoid false precision).
5. State all assumptions explicitly: blended day rates if used, excluded cost categories, and confidence levels.
6. Write a one-paragraph cost narrative: which option appears cheapest, where the biggest uncertainties lie, and what additional cost data would improve confidence.
7. Walk through with the commercial or programme lead.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run in parallel with or after Extract Constraints, Risks and Obligations. Feeds into the Options Appraisal. Run in Week 2.

> **Out of scope:**
> - Formal business case pricing or NPV/TCO modelling.
> - Vendor negotiation or obtaining quotes.
> - Procurement-grade cost estimates (this is a ROM-level comparison only).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** identify cost drivers from the extraction register and options context; flag where cost data is missing or uncertain.
- **Generate:** produce the structured cost comparison table, calculate totals, write the assumptions list and cost narrative.
- **Retrieve and ground:** reference specific contract values, SLA penalties, or transition-out costs cited in the extraction register.
- **Human in the loop:** a commercial or programme lead validates the cost data, assumptions, and confidence tags. AI-generated cost figures are estimates, not authoritative.


---

## 4) Preconditions, access and governance
- Extraction register and contract summary from upstream L2 activities.
- Any available cost data: current contract values, published price lists, vendor quotes, or department budget estimates.
- Named reviewer: commercial, programme, or finance lead.
- ATRS trigger: No. DPIA check: No (cost data is not personal data, but confirm with the department if specific figures are sensitive).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning and drafting | an enterprise LLM (e.g. Azure OpenAI, or equivalent) grounded on the extraction register and cost data |  |
| Spreadsheet | Excel, Google Sheets, or similar for the cost comparison table |  |
| Notes and reporting | Markdown or Word for the cost narrative |  |
| Not typically needed for this activity | code assistants, SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1h if cost data is readily available; 2h if significant estimation is needed. Schedule in Week 2, to feed into the Options Appraisal.

Expandability: this activity can be repeated per vendor decision. Each additional vendor decision adds approximately 1 to 2h.

---

## 7) Inputs and data sources
- Extraction register (for contract values, SLA penalties, transition-out costs).
- Options list from the Options Appraisal (or draft options if running in parallel).
- Any available cost data the department can provide: current spend, published pricing, vendor quotes, internal rate cards.
- If unavailable: use person-day ROMs only, state the assumption, and tag confidence as Low.


---

## 8) Outputs and artefacts
- Cost comparison table (spreadsheet or Markdown): options as columns, cost drivers as rows, with values, sources, and confidence tags.
- Assumptions list: blended rates, excluded categories, data gaps.
- Cost narrative (one paragraph): which option appears cheapest, where the uncertainties are, what additional data would improve confidence.
- Time log entry for P1.

Audience: commercial/programme/finance lead, decision-maker for the Options Appraisal.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the cost comparison. Compare against the department's estimate for a manual cost analysis |
| **P2 Quality score** | reviewer rates the comparison on the 1-5 rubric for accuracy (figures match known data), completeness (all material cost drivers covered), and actionability (useful for options decision) |
| **P8 Reusable artefacts** | count the cost comparison template, cost-driver checklist, and AI prompt if reusable |


Secondary (collect if available):
- **P7 Vulnerability/risk reduction**: if the comparison reveals previously unrecognised cost risks (e.g. hidden transition-out charges).

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **False precision from AI-generated figures**: AI may produce specific-looking numbers that are not grounded in real data | every figure must have a cited source or be explicitly labelled as an estimate with a confidence tag |
| **Missing cost drivers**: some categories (e.g. training, data migration, dual running) are easy to overlook | use a cost-driver checklist; reviewer validates completeness |
| **Commercial sensitivity**: the comparison may reveal pricing that the department considers confidential | store in the secure document area; confirm sharing permissions before including in the pilot evidence pack |
| **Comparison used as a formal business case**: stakeholders may treat the ROM-level comparison as authoritative | clearly label as "pilot-scope ROM, not a formal business case" and state where a full TCO analysis would be needed |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Cost comparison table covers all material cost drivers for each option.
- [ ] Every value has a source citation or is labelled as an estimate with a confidence tag.
- [ ] Assumptions are explicitly stated.
- [ ] Cost narrative is written.
- [ ] Commercial or programme lead has reviewed and validated the comparison.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on structuring the comparison and identifying cost drivers from the extraction register.
- **Prerequisites to document**: availability of cost data, extraction register completeness.
- **Limits and risks to document**: any cases where AI-generated figures were misleading, cost drivers that were missed, or sensitivity concerns.
- **Reusable assets**: cost comparison template, cost-driver checklist, AI prompt.

- **Department continuation**: re-run for future vendor decisions using the cost comparison template and cost-driver checklist.

Pattern candidates:
- **"Extraction-register-driven cost identification"**: using the extraction register to identify cost drivers ensures no contractual cost element is missed.
- **"Confidence-tagged cost cells"**: tagging each cell with a confidence level prevents false precision and makes it clear where more data is needed.

Anti-pattern candidates:
- **"AI-generated cost figures without sources"**: presenting AI-estimated numbers without source citations or confidence tags creates a false sense of accuracy.
- **"Mixing person-days and currency in totals"**: combining ROM-based and currency-based figures in a single total produces a meaningless number. Keep them separate.
- Pre requisites: list access and licensing assumptions.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.