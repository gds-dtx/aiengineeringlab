# Activity: Analyse incidents and detect patterns (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Assess/Execute (Week 1-2) |
| **Inputs** | Log clusters, incident reports |
| **Key output** | Incident analysis report |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Incident data is typically scattered across ticketing systems, chat threads, monitoring alerts, and post-incident reports, making it difficult to see patterns across events. Structured analysis surfaces the most common and costly failure patterns so the team can prioritise fixes that prevent recurrence rather than treating each incident in isolation.

Decision enabled: which incident patterns to prioritise for preventive fixes, and where to focus deeper root cause analysis.


---

## 2) What we will do (scope and steps)
Description: Ingest incident records from the agreed time window, normalise them into a structured format, use AI-assisted clustering to surface common patterns, and produce a ranked pattern shortlist with recommended next actions.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Define incident scope. Agree the time window (typically last 3 to 6 months), severity levels to include (for example P1 and P2 only, or all severities), and source systems (ticketing tool, monitoring alerts, post-incident reports).
2. Ingest incident records. Export or extract incident data into a working dataset. For each incident, capture: ID, date, severity, affected service(s), duration, summary, resolution, and any linked post-incident report.
3. Normalise into a structured register. Standardise fields, resolve duplicates, and tag each incident with consistent category labels (for example: deployment failure, infrastructure, dependency, data, security, configuration).
4. AI-assisted clustering by symptom, component, and cause. Prompt the LLM to group incidents by similarity. Review the proposed clusters and split or merge where the grouping is too broad or too narrow. Aim for 8 to 15 distinct clusters.
5. Validate clusters with the ops or SRE team. Walk through each cluster and confirm the grouping makes sense. Reclassify any mis-assigned incidents.
6. Rank clusters by frequency multiplied by impact. For each cluster, record: incident count, total downtime or degradation hours, number of affected users or services, and a severity score (high, medium, low).
7. Produce a pattern shortlist. Select the top 5 to 10 clusters and for each write: pattern name, description, contributing factors, and recommended next action (for example: deeper RCA, code fix, runbook update, monitoring improvement).
8. Update the evidence log and scorecard. Store the structured register, cluster analysis, and pattern shortlist.

> **Out of scope:**
> - Making production changes based on the analysis (these feed into downstream activities such as Fix PRs or Runbook Updates).
> - Incidents outside the agreed time window or severity threshold.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** cluster incidents by symptom similarity, component overlap, and probable cause. Identify patterns that span multiple services or time periods. Suggest contributing factors.
- **Generate:** draft pattern descriptions, recommended actions, and structured register entries from raw incident data.
- **Retrieve and ground:** operate over incident exports, post-incident reports, and monitoring alert histories to ensure clusters are grounded in actual evidence.
- **Automate and orchestrate:** normalise and deduplicate incident records, auto-tag categories, and produce the ranked pattern shortlist.
- **Human in the loop:** an SRE or senior engineer validates every cluster grouping and confirms the pattern shortlist before it is used for downstream decisions.


---

## 4) Preconditions, access and governance
- Read access to the incident ticketing system (for example ServiceNow, Jira, PagerDuty) for the agreed time window.
- Read access to post-incident reports and monitoring alert histories.
- Agreed scope: time window, severity levels, and source systems confirmed with the delivery team.
- Named SRE or senior engineer available to validate cluster groupings.
- ATRS: incident data stays within the approved environment. If incident records contain PII (for example customer names in ticket descriptions), confirm redaction approach before feeding to AI tools.
- DPIA: not typically triggered unless incident records contain personal data. Confirm with the information governance lead.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on incident records and post-incident reports |  |
| Incident management and export | ServiceNow, Jira Service Management, PagerDuty, Opsgenie, or equivalents |  |
| Log and alert search | Splunk, ELK, CloudWatch Logs, Azure Monitor, or equivalents |  |
| Data analysis (for normalisation and ranking) | Python with pandas, spreadsheets, or lightweight scripting |  |
| Notes and reporting | Markdown or Confluence for the structured register and pattern shortlist |  |


---

## 6) Timebox
Suggested: 2h to 3h (scope band S, confidence Medium +/-30%). Scoping and ingestion (steps 1 to 3) typically take 45min to 1h. Clustering and validation (steps 4 to 5) take 45min to 1h. Ranking and shortlist production (steps 6 to 7) take 30min. Adjust upward if the incident volume exceeds 100 records or if multiple source systems require manual reconciliation.


---

## 7) Inputs and data sources
- Incident tickets from the agreed time window and severity levels.
- Post-incident reports and blameless retrospective notes.
- Monitoring alert histories and escalation records.
- Chat transcripts from incident channels (if accessible and approved).
- Log Clustering cluster report (from L7-Log-Clustering, if available, to cross-reference with incident patterns).


---

## 8) Outputs and artefacts
- Normalised incident register: structured table of all in-scope incidents with consistent category labels.
- Cluster analysis: 8 to 15 incident clusters with representative incidents, frequency, and severity.
- Pattern shortlist: top 5 to 10 patterns ranked by frequency multiplied by impact, each with a description, contributing factors, and recommended next action.
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to produce the normalised register and pattern shortlist with AI assistance versus estimated manual effort. Record both values |
| **P2 Quality score** | SRE or senior engineer rates the cluster analysis and pattern shortlist on the 1 to 5 rubric (accuracy of groupings, completeness, actionability of recommended actions) |
| **P7 Risk reduction** | proportion of in-scope incidents covered by the pattern shortlist (target: top 5 to 10 patterns cover at least 60% of incidents by count). Track whether identified patterns lead to preventive action in downstream activities |
| **P8 Reusable artefacts** | count and catalogue outputs (incident analysis template, clustering prompts, normalisation script or queries) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incomplete incident data**: not all incidents are formally recorded, leading to blind spots in the analysis | cross-reference ticketing data with monitoring alert histories; note known gaps in the register |
| **Mis-clustering**: AI may group unrelated incidents or split a single pattern across multiple clusters | ops or SRE team validates every cluster before the shortlist is finalised |
| **PII in incident records**: ticket descriptions or chat transcripts may contain personal data | redact or anonymise before feeding to AI tools; confirm approach with information governance |
| **Analysis paralysis**: spending too long refining clusters rather than producing an actionable shortlist | timebox clustering to 1h; accept that 80% accuracy is sufficient for a prioritisation exercise |


---

## 11) Review and definition of done
- [ ] Incident scope agreed (time window, severity levels, source systems) and documented.
- [ ] Normalised incident register produced with consistent category labels and no unresolved duplicates.
- [ ] 8 to 15 incident clusters identified and validated by the ops or SRE team.
- [ ] Pattern shortlist of top 5 to 10 patterns produced, each with description, frequency, impact, contributing factors, and recommended next action.
- [ ] SRE or senior engineer has reviewed and approved the cluster analysis and shortlist.
- [ ] Evidence log and scorecard updated. Decision log entry added if prioritisation recommendations are made.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: re-run for a new time window using the incident analysis template and normalisation approach.

- Pattern candidates: "structured incident ingestion and normalisation" (repeatable method for turning scattered incident data into an analysable register); "frequency-times-impact ranking" (simple scoring model for prioritising incident patterns).
- Anti-pattern candidates: "cluster without validation" (accepting AI-generated clusters without ops team review leads to incorrect prioritisation); "all incidents equal" (analysing all severities without filtering wastes time on noise and dilutes the pattern signal).
- Where AI helped: record time saved in normalisation, clustering, and shortlist generation. Note accuracy of AI-proposed clusters versus manual corrections.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI mis-clustered incidents, missed a significant pattern, or where PII handling required additional steps.
- Reusable assets: prompts, templates, patterns for the library.