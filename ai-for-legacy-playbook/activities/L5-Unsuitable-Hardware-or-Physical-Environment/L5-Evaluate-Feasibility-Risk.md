# Activity: Evaluate feasibility and risk (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 4) |
| **Inputs** | All L5 outputs, architecture summary |
| **Key output** | Feasibility and risk assessment |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Migration plans that proceed without a structured feasibility and risk assessment often stall mid-execution when blockers emerge. The cost of discovering a showstopper after weeks of work is significant: wasted effort, delayed timelines, and eroded stakeholder confidence.

This activity consolidates findings from other L5 activities (Migration Options, Migration Readiness Assessment, Containerisation Exemplar) and any other pilot evidence into a structured feasibility evaluation and risk summary for the leading migration option. It surfaces blockers, quantifies risks, and proposes mitigations.

Decision enabled: proceed with the chosen migration path, adjust scope to address blockers, or pivot to an alternative option.


---

## 2) What we will do (scope and steps)
Description: Evaluate feasibility of the leading migration option and summarise risks.

Sub tasks:
1. Gather inputs: collect all findings from related L5 activities (Migration Options paper, Migration Readiness Assessment score, Containerisation Exemplar blockers), as well as relevant outputs from L1 (SBOM, dependency mapping), L3 (Architecture Summary), and L6 (security findings) if available.
2. Use the AI assistant to consolidate findings into a structured feasibility assessment: (a) technical feasibility (can it be done?), (b) operational feasibility (can the team support it?), (c) security and compliance feasibility (does it meet governance requirements?), (d) resourcing feasibility (does the team have the skills and capacity?).
3. Identify blockers: for each dimension, list any confirmed or likely blockers. Classify each as: showstopper (must resolve before proceeding), significant (requires mitigation plan), or manageable (can be addressed during migration).
4. Quantify risks: for each blocker or concern, assign a likelihood (high/medium/low) and impact (high/medium/low). Use the AI to draft a risk matrix.
5. Propose mitigations: for each significant or showstopper risk, draft a mitigation approach. Include effort estimate (XS/S/M) and confidence tag (High/Medium/Low).
6. Draft the feasibility report: a structured document summarising the assessment, blocker list, risk matrix, and recommended next steps.
7. Review with the Solution Architect and relevant stakeholders.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** this is typically one of the later L5 activities, run after Migration Options, Readiness Assessment, and Containerisation Exemplar have provided findings. Schedule in Week 3-4.

> **Out of scope:**
> - End-to-end migration execution.
> - Detailed implementation planning (this activity assesses whether to proceed, not how to execute).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** consolidate findings from multiple sources into structured feasibility dimensions; identify patterns and contradictions across inputs.
- **Generate:** draft the feasibility report, risk matrix, and mitigation proposals.
- **Retrieve and ground:** cross-reference findings against the codebase, architecture summary, and security scan results to verify claims.
- **Human in the loop:** the Solution Architect validates the assessment, challenges risk ratings, and approves the final report.


---

## 4) Preconditions, access and governance
- Outputs from at least one other L5 activity (Migration Options, Readiness Assessment, or Containerisation Exemplar).
- Access to related findings from L1, L3, and L6 if available.
- Named reviewer (Solution Architect) available.
- Stakeholders identified for the review step.
- ATRS trigger: No. DPIA check: No (unless the migration involves personal data handling changes, in which case flag for DPIA).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM |  |
| Notes and reporting | Markdown, Confluence, Word, spreadsheets |  |
| Risk registers | departmental risk register template, spreadsheets, Jira | if risk items are tracked as issues |
| Not typically needed | code assistants, SCA/SBOM tools, container tools, CI pipeline tools | this is primarily an analytical/reporting activity |


---

## 6) Timebox
Suggested: 2h for analysis, consolidation, and report drafting; 1h for review and revision. Total: 3h. Schedule in Week 3-4.


---

## 7) Inputs and data sources
- Migration Options paper (from L5-Generate-Migration-Options).
- Migration Readiness Assessment score and blocker list (from L5-Migration-Readiness-Assessment).
- Containerisation Exemplar findings (from L5-Containerisation-Exemplar).
- SBOM and dependency map (from L1, if available).
- Architecture Summary (from L3, if available).
- Security scan findings (from L6, if available).
- If unavailable: if only partial L5 activity outputs exist, the assessment will have lower confidence. Note which dimensions lack evidence.


---

## 8) Outputs and artefacts
- Feasibility report covering technical, operational, security/compliance, and resourcing dimensions.
- Blocker list classified by severity (showstopper/significant/manageable).
- Risk matrix with likelihood and impact ratings.
- Mitigation proposals with effort estimates and confidence tags.
- Time log entry for P1.

Audience: Solution Architect, Delivery Manager, senior stakeholders. This report is a key decision artefact for whether to proceed with the migration.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the feasibility report with AI assistance. Compare against estimate for manual analysis and report writing |
| **P2 Quality score** | reviewer rates the report on the 1-5 rubric for completeness (all dimensions covered), accuracy (risk ratings match evidence), and actionability (clear next steps) |
| **P8 Reusable artefacts** | count the feasibility report template, risk matrix format, blocker classification taxonomy |


Secondary:
- **P7 Vulnerability/risk reduction**: the assessment itself identifies risks; track how many are mitigated as a result.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incomplete input data**: if earlier L5 activities have not been completed, the feasibility assessment will have gaps | note which dimensions lack evidence; flag these as lower-confidence assessments |
| **AI over-confidence in risk ratings**: the AI may assign risk ratings based on general patterns rather than specific evidence | the Solution Architect challenges every rating and requires evidence for each |
| **Groupthink in review**: if the same team that wants to proceed with migration reviews the feasibility report, confirmation bias may lead to downplayed risks | include at least one reviewer who was not involved in the migration option selection |
| **Report not acted on**: the feasibility report may be produced but not used in decision-making | schedule a decision meeting with stakeholders as part of the activity |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Feasibility report covers technical, operational, security/compliance, and resourcing dimensions.
- [ ] Blockers are identified and classified.
- [ ] Risk matrix is complete with likelihood/impact ratings.
- [ ] Mitigation proposals are drafted for significant and showstopper risks.
- [ ] Solution Architect has reviewed and approved the report.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of consolidating findings from multiple sources; quality of the risk matrix and mitigation proposals.
- **Prerequisites to document**: availability of L5 activity outputs, stakeholder availability for review.
- **Limits and risks to document**: incomplete inputs, over-confident risk ratings, confirmation bias in review.
- **Reusable assets**: feasibility report template, four-dimension assessment framework, blocker classification taxonomy, risk matrix format.

- **Department continuation**: update the feasibility assessment as blockers are resolved or new evidence emerges. The report template and risk matrix are reusable.

Pattern candidates:
- **"Multi-source evidence consolidation"**: feeding the AI all available activity outputs (SBOM, architecture summary, exemplar findings, readiness score) produces a more comprehensive feasibility assessment than analysing each in isolation.
- **"Blocker severity classification"**: classifying blockers as showstopper/significant/manageable immediately focuses the decision on what matters most.

Anti-pattern candidates:
- **"Feasibility assessment without exemplar evidence"**: assessing migration feasibility based only on documentation analysis (without having tried to run anything) produces theoretical assessments that miss practical blockers. Always include at least one hands-on activity.
- **"Unanimous agreement as quality signal"**: if everyone agrees the migration is feasible without challenge, the assessment may be superficial. Constructive challenge improves the report.
- Reusable assets: prompts, templates, patterns for the library.