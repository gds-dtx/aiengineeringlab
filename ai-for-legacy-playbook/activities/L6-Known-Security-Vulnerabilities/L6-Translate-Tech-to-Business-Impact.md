# Activity: Translate technical vulnerabilities to business impact (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | Triage list, reachability map, fix PRs |
| **Key output** | Business impact summary for stakeholders |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Technical vulnerability reports are written for engineers: CVE IDs, CVSS scores, affected library versions, and code references. Senior stakeholders, risk owners, and decision-makers need to understand the same findings in terms of business impact: what could happen to the service, the data, or the users if this vulnerability is exploited?

This activity takes the prioritised technical findings (from Triage, Reachability Mapping, or Architecture Risk Scan) and produces short, plain-English narratives that explain the business risk, potential impact, and recommended action for each.

Decision enabled: stakeholders can prioritise mitigation funding and resources based on business impact rather than technical severity alone.


---

## 2) What we will do (scope and steps)
Description: Produce short narratives that explain business risk from technical findings.

Sub tasks:
1. Select the findings to translate: focus on Tier 1 and Tier 2 items from the triage, confirmed-reachable items from the reachability mapping, and critical/high items from the architecture risk scan.
2. For each finding, identify the business context: (a) what service or function does the affected component support? (b) who uses it (internal users, public users, other services)? (c) what data does it handle (personal data, financial data, operational data)?
3. Use the AI assistant to draft a business impact narrative for each finding: (a) what could happen if this vulnerability is exploited (data breach, service outage, unauthorised access, compliance violation), (b) who would be affected (users, the department, partner organisations), (c) what is the likelihood (based on reachability and exploitability), (d) what is the recommended action and urgency.
4. Write each narrative in plain English, avoiding technical jargon. Use a consistent format: Finding Summary, Business Impact, Likelihood, Recommended Action.
5. Peer review: have an engineer verify the technical accuracy and a business-side contact verify the business framing.
6. Share the narratives with the identified risk owners. Record acknowledgement.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs after Triage SAST/SCA (L6), Reachability Mapping (L6), or Architecture Risk Scan (L6) have produced findings. Schedule in Week 3-4.

> **Out of scope:**
> - Full security policy rewrite.
> - Producing a formal risk register (though narratives may feed into one).
> - Communicating with external parties without departmental approval.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** interpret technical vulnerability details (CVE, CVSS, code reference) and infer the business impact based on what the affected component does and what data it handles.
- **Generate:** produce plain-English business impact narratives using a consistent format.
- **Retrieve and ground:** cross-reference findings against the Architecture Summary and system documentation to understand the business context of each component.
- **Human in the loop:** the engineer verifies technical accuracy; the BA or business contact verifies the business framing. Risk owners review and acknowledge.


---

## 4) Preconditions, access and governance
- Prioritised technical findings (from L6 triage, reachability, or architecture risk scan).
- Understanding of the business context of affected components (what they do, who uses them, what data they handle).
- Identified risk owners or senior stakeholders to receive the narratives.
- Named reviewer (engineer for technical accuracy, BA or business contact for business framing).
- ATRS trigger: No. DPIA check: No (but confirm narratives do not disclose sensitive vulnerability details to unauthorised recipients).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM |  |
| Architecture and system context | Architecture Summary (L3), system documentation, service catalogues |  |
| Notes and reporting | Markdown, Confluence, Word |  |
| Not typically needed | code assistants, SCA/SAST tools, CI pipeline tools, container tools |  |


---

## 6) Timebox
Suggested: 1.5h for drafting narratives for 5-10 findings; 30 minutes for peer review and sharing. Total: 2h. Schedule in Week 3-4.

Expandability: this activity can be repeated per finding. Each additional finding adds approximately 15 to 20min.

---

## 7) Inputs and data sources
- Prioritised technical findings (from L6-Triage-SAST-SCA, L6-Reachability-Mapping, or L6-Architecture-Risk-Scan).
- Architecture Summary (from L3, if available) for understanding which components support which business functions.
- Service catalogue or system documentation describing user base and data handling.
- Risk owner contact details.
- If unavailable: if no business context is available, draft the narrative based on what the code does and flag sections that need business-side validation.


---

## 8) Outputs and artefacts
- Business impact narratives (one per finding or per finding group) using the format: Finding Summary, Business Impact, Likelihood, Recommended Action.
- Record of risk owner acknowledgement.
- Time log entry for P1.

Audience: risk owners, senior stakeholders, Delivery Manager. The narratives bridge the gap between technical security findings and business decision-making.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce business impact narratives with AI assistance. Compare against estimate for manual translation |
| **P2 Quality score** | both the engineer (technical accuracy) and the business reviewer (business framing accuracy) rate the narratives on the 1-5 rubric |
| **P7 Vulnerability/risk reduction** | track whether the narratives result in stakeholder action (funding, prioritisation, risk acceptance decisions) |
| **P8 Reusable artefacts** | count the narrative template, business impact framing guide |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI overstates or understates business impact**: the AI may dramatise low-risk findings or downplay critical ones | the engineer verifies technical accuracy and the business reviewer verifies impact framing |
| **Narratives contain too much technical detail**: the point of the translation is to be accessible to non-technical stakeholders | enforce plain English; remove CVE IDs, CVSS scores, and code references from the narrative body (include them in a technical appendix if needed) |
| **Narratives shared with the wrong audience**: vulnerability details in the wrong hands could increase risk | confirm the distribution list with the Tech Lead; follow departmental information classification policies |
| **Stakeholders do not act on the narratives**: producing narratives that are read but not acted on wastes the effort | include a clear "Recommended Action" and urgency for each narrative; schedule a review meeting with risk owners |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Business impact narratives are drafted for all selected findings.
- [ ] Engineer has verified technical accuracy.
- [ ] Business reviewer has verified business framing.
- [ ] Narratives have been shared with identified risk owners.
- [ ] Acknowledgement is recorded.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of translating technical findings to business language; consistency of narrative format.
- **Prerequisites to document**: technical findings availability, business context understanding, risk owner identification.
- **Limits and risks to document**: overstated/understated impact, technical jargon leakage, wrong audience distribution.
- **Reusable assets**: narrative template (Finding Summary / Business Impact / Likelihood / Recommended Action), business impact framing guide.

- **Department continuation**: produce narratives for new findings using the narrative template and business impact framing guide.

Pattern candidates:
- **"Structured narrative format"**: using a consistent four-section format (Summary, Impact, Likelihood, Action) makes narratives scannable and comparable across findings.
- **"Dual review (technical and business)"**: having both an engineer and a business contact review each narrative catches both technical inaccuracies and business framing errors.

Anti-pattern candidates:
- **"CVE-heavy narratives"**: filling the narrative with CVE IDs, CVSS vectors, and library versions makes it inaccessible to the target audience. Keep technical details in an appendix.
- **"Translating all findings"**: translating hundreds of low-priority findings produces information overload for stakeholders. Focus on Tier 1 and Tier 2 items only.
- Reusable assets: prompts, templates, patterns for the library.