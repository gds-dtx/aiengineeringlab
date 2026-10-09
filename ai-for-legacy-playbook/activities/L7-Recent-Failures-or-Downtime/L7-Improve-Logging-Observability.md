# Activity: Improve logging and observability (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | Architecture summary, log gap analysis |
| **Key output** | Logging improvements + config changes |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Gaps in structured logging and operational metrics extend mean time to resolution (MTTR) because engineers cannot quickly determine what happened, where it happened, or why. Filling those gaps shortens the diagnostic path for every future incident and reduces reliance on tribal knowledge during outages.

Decision enabled: which logging and observability gaps to close first, based on evidence from recent incidents.

Note: this activity focuses on incident-driven gap-filling (reactive). For proactive observability instrumentation tied to deployment safety and change management, see L4-Improve-Observability.


---

## 2) What we will do (scope and steps)
Description: Audit current logging and observability against recent incident evidence, identify diagnostic gaps, implement missing log statements and metrics, and deliver baseline dashboards for top failure categories.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Audit current logging configuration. Catalogue log levels, structured fields, and output destinations for in-scope services. Note any services with no structured logging.
2. Review recent incidents (last 3 to 6 months) for diagnostic gaps. For each incident, record where logs or metrics were missing, insufficient, or misleading. Use the Log Clustering cluster report and RCA summaries if available.
3. Compile a logging gap register. List each gap with the affected service, gap type (missing log line, missing metric, missing trace context, insufficient detail), and the incident(s) that exposed it. Rank by frequency and impact.
4. Draft a structured log format standard. Define required fields (timestamp, service, correlation ID, severity, message, error code) and recommended fields. Align with any existing organisational logging policy.
5. Implement missing log statements and metrics for the top 5 to 10 gaps. Use AI code assistants to draft log additions in context. Each change should be a separate commit referencing the gap register entry.
6. Build or update dashboards for the top 3 to 5 failure categories. Each dashboard should show error rate, latency percentiles, and the key metrics identified in step 3. Add alert rules for critical thresholds.
7. Validate with a diagnostic walkthrough. Pick a recent incident and re-run the diagnostic path using the new logs and dashboards. Confirm the issue can now be identified faster. Record time-to-diagnosis before and after.
8. Update the evidence log and scorecard. Record gap register, changes made, dashboard links, and validation results.

> **Out of scope:**
> - Organisation-wide observability platform selection or procurement.
> - Full distributed tracing rollout (capture requirements only if gaps are found).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** compare incident timelines against available logs to identify where diagnostic information was missing or insufficient. Suggest which logging gaps have the highest incident correlation.
- **Generate:** draft structured log statements in the correct framework format, propose dashboard JSON or query definitions, and scaffold alert rule configurations.
- **Retrieve and ground:** operate over application source code, logging configuration files, incident records, and existing dashboards to ensure suggestions are contextually accurate.
- **Automate and orchestrate:** prepare candidate PRs for log statement additions, generate dashboard-as-code definitions, and produce gap register entries.
- **Human in the loop:** an SRE or senior engineer validates that proposed log additions are correct, do not expose PII, and that dashboards surface actionable signals rather than noise.


---

## 4) Preconditions, access and governance
- Read access to application source code and logging configuration for in-scope services.
- Read access to incident records and post-incident reports (last 3 to 6 months).
- Access to the log aggregation platform (for example Splunk, ELK, CloudWatch Logs, Azure Monitor) to verify current coverage.
- Access to dashboarding tool (for example Grafana, Kibana, CloudWatch Dashboards) to create or update panels.
- Named SRE or senior engineer available to review log changes and dashboards.
- ATRS: log data stays within the approved environment. AI tools must not be given raw production log exports that may contain PII unless approved.
- DPIA: confirm that proposed log additions do not capture personal data beyond what is already approved in the data protection impact assessment.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on source code, logging config, and incident records |  |
| Code assistants | GitHub Copilot, Sourcegraph Cody, or equivalents for drafting log statements in context |  |
| Log aggregation and search | Splunk, ELK (Elasticsearch, Logstash, Kibana), AWS CloudWatch Logs, Azure Monitor Logs, or equivalents |  |
| Dashboarding and alerting | Grafana, Kibana, CloudWatch Dashboards, Azure Monitor Workbooks, or equivalents |  |
| Notes and reporting | Markdown or Confluence for the gap register and structured log format standard |  |


---

## 6) Timebox
Suggested: 2h to 3h (scope band S, confidence Medium +/-30%). The audit and gap register (steps 1 to 3) typically take 1h. Implementation and dashboard creation (steps 5 to 6) take 1h to 1.5h. Validation walkthrough (step 7) takes 30min. Larger estates may require a second pass.

Expandability: this activity can be repeated per service. Each additional service adds approximately 2 to 3h.

---

## 7) Inputs and data sources
- Application source code and logging configuration files for in-scope services.
- Incident records and post-incident reports (last 3 to 6 months).
- Existing dashboards, alert rules, and SLO definitions.
- Log Clustering cluster report (from L7-Log-Clustering, if available).
- RCA summaries (from L7-RCA-Summaries, if available).
- Architecture Summary (from L3, if available) for service topology and understanding which services are most critical.
- Any existing organisational logging standards or policies.


---

## 8) Outputs and artefacts
- Logging gap register: table of gaps ranked by frequency and impact, with affected service, gap type, and linked incident(s).
- Structured log format standard: document defining required and recommended log fields.
- Pull request(s) adding missing log statements and metrics (one commit per gap register entry).
- Baseline dashboards (3 to 5) covering top failure categories, with alert rules for critical thresholds.
- Validation walkthrough record: before and after diagnostic time for a replayed incident.
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to complete the logging gap audit and implementation with AI assistance versus estimated manual effort. Record both values |
| **P2 Quality score** | SRE or senior engineer rates the gap register, log additions, and dashboards on the 1 to 5 rubric (accuracy, completeness, actionability) |
| **P7 Risk reduction** | record baseline MTTR for a sample incident before improvements and projected MTTR after. Track whether diagnostic gaps remain for any recent incident class |
| **P8 Reusable artefacts** | count and catalogue reusable outputs (structured log format standard, dashboard templates, logging gap audit checklist, prompts used) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **PII in logs**: new log statements may inadvertently capture personal data | review each log addition against the data protection impact assessment; use field-level redaction for sensitive values |
| **Over-logging and storage cost increase**: adding too many log lines increases storage and processing costs | focus on the top 5 to 10 gaps; set log retention policies; review volume impact after deployment |
| **Alert fatigue**: poorly tuned alert thresholds generate excessive notifications that get ignored | start with conservative thresholds and tune based on a 1-week observation period before widening |
| **Dashboard clutter**: dashboards that show too many panels become unusable | limit each dashboard to 6 to 8 panels focused on a single failure category; validate with the on-call team |


---

## 11) Review and definition of done
- [ ] Logging gap register produced with at least 5 entries ranked by frequency and impact.
- [ ] Structured log format standard documented and reviewed.
- [ ] Log statement additions implemented for the top 5 to 10 gaps, each in a separate commit referencing the gap register.
- [ ] At least 3 baseline dashboards created with alert rules for critical thresholds.
- [ ] Diagnostic walkthrough completed for at least one recent incident, with before and after time-to-diagnosis recorded.
- [ ] SRE or senior engineer has reviewed and approved all log changes and dashboards.
- [ ] No PII captured in new log statements (confirmed against DPIA).
- [ ] Evidence log and scorecard updated. Decision log entry added if a logging standard or tooling recommendation is made.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: extend to additional services using the structured log format standard, dashboard templates, and gap audit checklist.

- Pattern candidates: "incident-driven logging gap audit" (systematic method for identifying and closing diagnostic gaps); "structured log format standard" (reusable template for consistent logging across services).
- Anti-pattern candidates: "log everything" (adding verbose logging without targeting specific diagnostic gaps increases cost and noise); "dashboard without alerts" (dashboards that nobody watches provide no operational value without alert rules).
- Where AI helped: record time saved in gap identification, log statement drafting, and dashboard generation. Note accuracy of AI-suggested log placements versus manual review corrections.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI-suggested log additions were incorrect, captured PII, or where dashboard queries were inaccurate.
- Reusable assets: prompts, templates, patterns for the library.