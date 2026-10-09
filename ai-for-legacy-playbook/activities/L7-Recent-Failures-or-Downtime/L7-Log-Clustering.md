# Activity: Cluster log errors (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-1.5h |
| **Phase** | Assess (Week 1) |
| **Inputs** | Log data, SIEM/log platform access |
| **Key output** | Clustered error families |
| **Hub activity** | Yes (feeds L4, L3) |

---

## 1) Why this activity (value and decision)
High-volume application and system logs contain valuable diagnostic signals, but the sheer volume of entries makes it impractical to review them manually. Clustering groups similar log entries into error families, reducing thousands of lines to a manageable set of distinct patterns. This reveals which errors are most frequent, which are transient, and which correlate with known incidents.

Decision enabled: which error families to investigate first, and where to focus logging improvements or code fixes.


---

## 2) What we will do (scope and steps)
Description: Export logs from the agreed time window and services, normalise entries by stripping variable fields, cluster by message similarity, and produce a ranked cluster report of the top error families.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Define log scope. Agree the time window (for example last 7 to 30 days), target services or components, severity levels (ERROR and above, or WARN and above), and log sources.
2. Export or sample logs. Extract log data from the aggregation platform. If the volume is very large (over 100,000 entries), take a representative sample (for example 10,000 to 50,000 entries stratified by service and time).
3. Normalise log entries. Strip or replace variable fields (timestamps, request IDs, user IDs, IP addresses, stack memory addresses) with placeholders so that structurally identical messages are treated as the same.
4. AI-assisted clustering by message similarity. Prompt the LLM or use a text-similarity algorithm to group normalised entries into clusters. Aim for 10 to 20 distinct clusters. Review and split or merge clusters where groupings are too broad or too narrow.
5. Label each cluster. For each cluster, assign: a short descriptive name, the representative (most common) normalised message, entry count, percentage of total error volume, and affected service(s).
6. Sample and validate. For each cluster, extract 3 to 5 raw (un-normalised) entries and review them to confirm the cluster is coherent. Flag any clusters that contain unrelated entries for reclassification.
7. Rank clusters by frequency and estimated impact. Impact can be approximated by cross-referencing cluster timestamps with known incidents or degradation periods.
8. Produce cluster report and update evidence log. The report should include the ranked cluster table, representative samples, and recommendations for next steps (for example: investigate, fix, suppress, or improve logging).

> **Sequencing:** typically the first analytical L7 activity. Outputs feed into Incident Analysis (L7), RCA Summaries (L7), Recurring Failure Modes (L7), and Improve Logging and Observability (L7). Schedule in Week 1-2.

> **Cross-type links:** the cluster report also provides context for:
> - L4: Improve Observability (error families highlight which services need better monitoring or alerting).
> - L3: Documentation Gap Analysis (recurring errors in undocumented components signal knowledge gaps).

> **Out of scope:**
> - Broad longitudinal trend analysis across months of data.
> - Fixing the underlying issues (this feeds into downstream activities such as RCA Summaries or Recurring Failure Modes).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** group normalised log entries by message similarity, identify distinct error families, and suggest which clusters correlate with known incidents or degradation periods.
- **Generate:** draft cluster labels, representative message summaries, and next-step recommendations for each error family.
- **Retrieve and ground:** operate over exported log data and cross-reference with incident records to validate cluster significance.
- **Automate and orchestrate:** run normalisation (stripping variable fields), produce cluster assignments, and generate the ranked cluster report.
- **Human in the loop:** an SRE or engineer validates every cluster by reviewing sample entries and confirms the ranking before the report is finalised.


---

## 4) Preconditions, access and governance
- Read access to the log aggregation platform (for example Splunk, ELK, CloudWatch Logs, Azure Monitor) for the target services and time window.
- Agreed scope: time window, services, and severity levels confirmed with the delivery team.
- Named SRE or engineer available to validate cluster groupings.
- ATRS: log exports must remain within the approved environment. If logs are processed outside the aggregation platform (for example exported to a local file for AI analysis), confirm this is permitted.
- DPIA: confirm that log exports do not contain personal data beyond what is already covered by the existing DPIA. Apply redaction if needed before AI processing.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM for clustering by message similarity and generating cluster labels |  |
| Log aggregation and search | Splunk, ELK (Elasticsearch, Logstash, Kibana), AWS CloudWatch Logs, Azure Monitor Logs, or equivalents |  |
| Data analysis and scripting | Python with pandas, scikit-learn (for example TF-IDF plus k-means), or simple regex-based grouping scripts for normalisation |  |
| Notes and reporting | Markdown or Confluence for the cluster report |  |


---

## 6) Timebox
Suggested: 1.5h to 2.5h (scope band S, confidence Medium +/-30%). Scoping and export (steps 1 to 2) typically take 30min. Normalisation and clustering (steps 3 to 4) take 30min to 1h. Validation and report (steps 5 to 8) take 30min to 1h. If the log volume is very large, the export and normalisation steps may take longer.

Expandability: this activity can be repeated per service or log source. Each additional service or log source adds approximately 1.5 to 2.5h.

---

## 7) Inputs and data sources
- Log exports from the aggregation platform for the agreed time window and services.
- Incident records (for cross-referencing cluster timestamps with known incidents).
- Existing log format documentation or structured logging schema (if available, to assist normalisation).


---

## 8) Outputs and artefacts
- Cluster report: ranked table of 10 to 20 error families, each with: cluster name, representative normalised message, entry count, percentage of total error volume, affected service(s), 3 to 5 raw sample entries, and recommended next step.
- Normalisation rules: documented regex or script used to strip variable fields (reusable for future runs).
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to produce the cluster report with AI assistance versus estimated manual effort. Record both values |
| **P2 Quality score** | SRE or engineer rates the cluster report on the 1 to 5 rubric (cluster coherence, accuracy of labels, usefulness of ranking and recommendations) |
| **P8 Reusable artefacts** | count and catalogue outputs (normalisation script, clustering prompts, cluster report template) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Normalisation strips too much context**: over-aggressive variable replacement may merge genuinely different error types into one cluster | validate each cluster against 3 to 5 raw samples; refine normalisation rules where clusters are incoherent |
| **Sampling bias**: if the log sample is not representative (for example taken only during low-traffic hours), important error families may be missed | stratify the sample by time-of-day and service; note any known gaps |
| **PII in log exports**: raw logs may contain user identifiers, IP addresses, or other personal data | redact personal data before AI processing; confirm approach with information governance |
| **Over-clustering or under-clustering**: too many clusters make the report unwieldy; too few hide important distinctions | aim for 10 to 20 clusters; split or merge during validation |


---

## 11) Review and definition of done
- [ ] Log scope agreed (time window, services, severity levels) and documented.
- [ ] Log export or sample obtained and normalised.
- [ ] 10 to 20 error clusters identified, each labelled with a descriptive name and representative message.
- [ ] Each cluster validated against 3 to 5 raw sample entries; no incoherent clusters remain.
- [ ] Clusters ranked by frequency and estimated impact.
- [ ] Cluster report produced with per-cluster recommendations (investigate, fix, suppress, or improve logging).
- [ ] SRE or engineer has reviewed and approved the cluster report.
- [ ] Evidence log and scorecard updated.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: re-run on additional services or re-run periodically using the normalisation rules and clustering prompts.

- Pattern candidates: "normalise-then-cluster" (systematic approach: strip variables, cluster by similarity, validate with samples); "frequency-times-impact ranking for log clusters" (simple scoring model to focus investigation on the noisiest and most impactful error families).
- Anti-pattern candidates: "cluster raw logs without normalisation" (variable fields like timestamps and request IDs cause every entry to look unique, producing thousands of spurious clusters); "cluster everything" (including INFO and DEBUG entries drowns error signals in noise).
- Where AI helped: record time saved in normalisation, clustering, and labelling. Note accuracy of AI-proposed clusters versus manual corrections.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI mis-clustered entries, where normalisation rules needed refinement, or where PII handling required additional steps.
- Reusable assets: prompts, templates, patterns for the library.