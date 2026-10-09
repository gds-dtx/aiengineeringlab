# Activity: Options appraisal: renew, replace or retire (L2)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3) |
| **Inputs** | Contract summaries, cost analysis, constraints |
| **Key output** | Options appraisal (renew/replace/retire) |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
When a vendor contract has expired or is expiring, the department faces a choice: renew, replace, or retire. Without a structured side-by-side comparison, this decision is often delayed or made on incomplete information.

This activity uses the extraction register and contract summary to produce an options matrix: renew, replace, and retire scored against agreed criteria, with effort ROMs in pilot-scope bands (XS-XL) and a confidence tag. It gives the decision-maker a clear, evidence-backed rationale.

Decision enabled: choose the preferred commercial path (renew, replace, or retire) with conditions and next steps, or identify what further information is needed before deciding.


---

## 2) What we will do (scope and steps)
Description: Create a side-by-side comparison of options with pros, cons and assumptions, using pilot-scope bands.

Sub tasks:
1. Define evaluation criteria with the department decision-maker. Typical criteria include: cost (current vs projected), risk (contractual, operational, technical), continuity of service, data portability, lock-in/exit feasibility, alignment with modernisation goals, and timeline.
2. For each option (renew, replace, retire), use AI to draft a structured assessment: (a) what the option entails, (b) pros, (c) cons, (d) contractual constraints that affect it (from the extraction register), (e) key assumptions, (f) dependencies and risks.
3. Size each option using pilot-scope bands (XS-XL in person-days). Build the ROM from hour-based adders grounded in evidence from other L2 activities (e.g. decision pack 2-4h, validation 1-2h, integration touchpoint 0.5-1pd). Add a confidence tag (High plus/minus 15%, Medium plus/minus 30%, Low plus/minus 50%).
4. Compile into a single options matrix (table format): one row per option, columns for each evaluation criterion, ROM band, confidence tag, and recommendation.
5. Write a short narrative recommendation (2-3 paragraphs): preferred option, conditions, and what needs to happen next.
6. Walk through the matrix and recommendation with the decision-maker.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** depends on Contract Summarisation and Extract Constraints, Risks and Obligations outputs. May also draw on Cost Comparison Analysis if run. This is typically the culminating activity in the L2 chain. Run in Week 2-3.

> **Out of scope:**
> - Procurement execution or supplier engagement.
> - Negotiation strategy.
> - Formal business case (this is a pilot-scope options appraisal, not a full business case).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** assess each option against the evaluation criteria using evidence from the extraction register and contract summary; identify trade-offs and flag where criteria conflict.
- **Generate:** draft the options matrix, pros/cons for each option, ROM calculations with adder rationale, and the narrative recommendation.
- **Retrieve and ground:** reference specific constraints and clause references from the extraction register to ground pros/cons in evidence.
- **Human in the loop:** the decision-maker validates the evaluation criteria, reviews the scoring, and approves or adjusts the recommendation. The Solution Architect validates technical feasibility of each option.


---

## 4) Preconditions, access and governance
- Completed Contract Summarisation and Extract Constraints, Risks and Obligations outputs (L2).
- Cost Comparison Analysis output (L2) if available; otherwise note cost data as a gap.
- Named decision-maker (SRO, programme lead, or commercial lead) available for the walkthrough.
- Solution Architect available to validate technical feasibility of each option.
- ATRS trigger: Possibly, if the recommendation will drive a public-facing procurement decision. Confirm with the department. DPIA check: only if the options matrix will be shared externally.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning and drafting | an enterprise LLM (e.g. Azure OpenAI, or equivalent) grounded on the extraction register, contract summary, and cost data |  |
| Structured output | spreadsheet or Markdown table for the options matrix |  |
| Notes and reporting | Word or Markdown for the narrative recommendation |  |
| Not typically needed for this activity | code assistants, SCA/SBOM tools, SIEM tools |  |


---

## 6) Timebox
Suggested: 1.5h for a straightforward renew/replace/retire choice; 2h if multiple replacement options exist or cost data is incomplete. Schedule in Week 2-3, after the upstream L2 activities.

Expandability: this activity can be repeated per vendor decision. Each additional vendor decision adds approximately 1.5 to 2h.

---

## 7) Inputs and data sources
- Contract summary and extraction register from the upstream L2 activities.
- Cost comparison data if available (from Cost Comparison Analysis).
- Department context: strategic direction, modernisation priorities, and any pre-existing preferences.
- Decision-maker and Solution Architect available for the walkthrough.
- If unavailable: if cost data is missing, note it as a gap and size based on person-day ROMs only. Tag cost confidence as Low.


---

## 8) Outputs and artefacts
- Options matrix (spreadsheet or Markdown table): one row per option, columns for each evaluation criterion, score, ROM band (XS-XL), confidence tag, and key assumptions.
- Narrative recommendation (2-3 paragraphs): preferred option, conditions, dependencies, and next steps.
- Time log entry for P1.

Audience: SRO/programme lead (decision-maker), Solution Architect, commercial lead, pilot Delivery Manager.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the options matrix and recommendation. Compare against the department's estimate for producing a similar analysis manually |
| **P2 Quality score** | decision-maker rates the options matrix on the 1-5 rubric for accuracy (options correctly characterised), completeness (all relevant criteria covered), and actionability (clear enough to make a decision) |
| **P8 Reusable artefacts** | count the options matrix template, evaluation criteria checklist, and AI prompt if reusable |


Secondary (collect if available):
- **P4 Lead time for changes**: if the decision leads to a contract change, measure time from decision to execution start.
- **P7 Vulnerability/risk reduction**: if the recommended option reduces commercial or operational risk.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI bias toward a particular option**: the AI may draft a recommendation that favours one option without sufficient justification | present all options neutrally in the matrix; the narrative recommendation is written with explicit rationale tied to criteria scores |
| **Incomplete evidence base**: if upstream activities are incomplete, the appraisal may rest on assumptions | tag assumptions explicitly with confidence levels; highlight any missing inputs |
| **Stakeholder disagreement on criteria**: different stakeholders may weight criteria differently | agree criteria and weightings with the decision-maker before scoring |
| **Scope inflation**: the options appraisal may expand into full business case writing | keep to the pilot-scope matrix and narrative format; note where a full business case would be needed as a separate option |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Options matrix covers renew, replace, and retire (or equivalent options) scored against agreed criteria.
- [ ] Each option has a ROM band (XS-XL) with adder rationale and confidence tag.
- [ ] Narrative recommendation is written with explicit rationale.
- [ ] Decision-maker has reviewed and provided a decision or identified what further information is needed.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.
- [ ] Decision Log entry added with the decision (or deferred-decision rationale).


---

## 12) Playbook contribution
- **Where AI helped**: time saving on structuring and drafting the options comparison; consistency of scoring approach.
- **Prerequisites to document**: contract summary, extraction register, cost data availability, decision-maker engagement.
- **Limits and risks to document**: any cases where AI bias was detected, where incomplete evidence led to low-confidence scores, or where the appraisal was insufficient for a decision.
- **Reusable assets**: options matrix template, evaluation criteria checklist, ROM adder rationale format, AI appraisal prompt.

- **Department continuation**: re-run for future commercial decisions using the options matrix template and evaluation criteria checklist.

Pattern candidates:
- **"Evidence-grounded options scoring"**: linking each pro/con to a specific clause reference or extraction register item builds trust in the appraisal and makes review faster.
- **"ROM from hour-based adders"**: building option ROMs from small, evidence-based adders (rather than top-down guesses) produces more credible and comparable estimates.

Anti-pattern candidates:
- **"Options appraisal without extraction"**: running the appraisal directly from the contract summary (skipping structured extraction) produces less rigorous scoring.
- **"AI-generated recommendation without human judgment"**: the AI can draft, but the decision must be made by a human with commercial context.
- Where AI helped: capture the concrete speed and quality signals.
- Pre requisites: list access and licensing assumptions.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.