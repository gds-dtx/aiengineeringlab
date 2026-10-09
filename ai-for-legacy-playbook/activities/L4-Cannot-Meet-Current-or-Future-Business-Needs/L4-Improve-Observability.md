# Activity: Improve observability (L4)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | Architecture summary, log patterns, monitoring config |
| **Key output** | Observability improvements + dashboard config |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems often lack the signals needed to understand whether a change is working correctly after deployment. Without baseline metrics, dashboards, and alerts, teams cannot detect degradation until users report problems. This makes every release a blind deployment.

This activity defines service-level objectives (SLOs) for a scoped service, implements baseline dashboards, and adds alert rules so that the team can monitor the effect of changes in near-real time. The focus is on change safety: confirming that a deployment has not degraded the service.

Decision enabled: confirm whether the dashboards and alerts provide useful signal after a change; decide whether to adopt and extend the observability setup across the service.

Note: this activity focuses on observability for change management (L4). For incident-focused logging and observability improvements, see L7-Improve-Logging-Observability.


---

## 2) What we will do (scope and steps)
Description: Propose metrics, logs and dashboards, then implement small exemplars.

Sub tasks:
1. Identify the scoped service or module to instrument. Select based on: (a) high change frequency, (b) recent incidents, or (c) upcoming changes planned during the pilot.
2. Define SLOs for the scoped service: (a) availability (e.g. percentage of successful responses), (b) latency (e.g. p50, p95, p99 response times), (c) error rate (e.g. percentage of 5xx responses). Use the AI assistant to draft SLOs based on existing logs and metrics if available.
3. Audit existing telemetry: what metrics, logs, and traces are currently collected? What is missing? Use the AI to analyse application code and infrastructure config for instrumentation gaps.
4. Implement baseline dashboards: use the AI to draft dashboard configurations (Grafana JSON, CloudWatch dashboards, Datadog configs, or equivalent) showing the defined SLOs and key health indicators.
5. Add alert rules: use the AI to draft alert configurations for the defined SLOs (e.g. error rate exceeds threshold, latency breaches p95 target). Include severity levels and notification channels.
6. Deploy the dashboards and alerts to a test or staging environment. Validate that they display accurate data and fire correctly on simulated conditions.
7. Document the setup: what SLOs are defined, where the dashboards are, what the alert thresholds are, and what action to take when an alert fires.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from running after Architecture Summary (L3). Outputs support Validate Refactors (L4) and CI/CD enhancement (L4). Schedule in Week 2-3.

> **Out of scope:**
> - Enterprise-wide observability platform rollout.
> - Application Performance Monitoring (APM) agent installation across all services.
> - Incident response process redesign (see L7 activities).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review application code and infrastructure config to identify instrumentation gaps and suggest SLOs based on existing data patterns.
- **Generate:** draft dashboard configurations (JSON, YAML, or HCL), alert rules, and SLO documentation.
- **Retrieve and ground:** read existing logs, metrics, and config files to ground the dashboards and alerts in actual system behaviour.
- **Human in the loop:** the engineer validates the SLOs against business requirements, reviews dashboard accuracy, and tests alert thresholds. The Tech Lead approves the setup.


---

## 4) Preconditions, access and governance
- Access to the monitoring/observability platform (Grafana, CloudWatch, Datadog, Prometheus, or equivalent).
- Existing telemetry data available (metrics, logs, or traces). If no telemetry exists, the activity scope expands to basic instrumentation first.
- Write access to dashboard and alert configurations.
- Named reviewer (Tech Lead or Senior Engineer) available.
- ATRS trigger: No. DPIA check: confirm that dashboards do not display personal data.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Monitoring platforms | Grafana, CloudWatch, Datadog, Azure Monitor, New Relic |  |
| Metrics collection | Prometheus, StatsD, OpenTelemetry, CloudWatch Metrics |  |
| Alerting | PagerDuty, OpsGenie, Grafana Alerting, CloudWatch Alarms |  |
| AI assistants (for drafting configs) | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Not typically needed | SCA/SBOM tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 2h for SLO definition, telemetry audit, and dashboard drafting; 1h for alert rules and validation. Total: 3h. Schedule in Week 2-3.

Expandability: this activity can be repeated per service. Each additional service adds approximately 3h.

---

## 7) Inputs and data sources
- Target repository (application code and infrastructure config for instrumentation analysis).
- Existing monitoring platform access (dashboards, metrics, logs).
- Architecture Summary (from L3, if available) for service topology context.
- Incident history (if available) to identify which services have had problems and need monitoring most.
- If unavailable: if no monitoring platform exists, the activity should focus on recommending a platform and drafting dashboard specs rather than implementing them. Note this limitation.


---

## 8) Outputs and artefacts
- SLO definitions for the scoped service (availability, latency, error rate targets).
- Baseline dashboards (deployed or as configuration files ready to deploy).
- Alert rules with severity levels and notification channels.
- Telemetry gap report: what instrumentation is missing and what is needed to close the gaps.
- Time log entry for P1.

Audience: Tech Lead, engineers, on-call team. Dashboards and alerts also feed into L7 incident analysis activities.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to define SLOs, create dashboards, and set up alerts with AI assistance. Compare against estimate for manual configuration |
| **P2 Quality score** | reviewer rates the SLO definitions, dashboard usefulness, and alert appropriateness on the 1-5 rubric |
| **P5 Change failure rate** | after dashboards are in place, track whether deployments with monitoring have faster detection and lower blast radius than before |
| **P8 Reusable artefacts** | count SLO templates, dashboard configurations, alert rule patterns |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P4 Lead time**: if alerts reduce time-to-detection of deployment issues, note qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Alert fatigue from noisy rules**: poorly tuned alert thresholds generate excessive notifications | start with conservative thresholds; tune based on initial data; use severity levels to distinguish actionable from informational alerts |
| **SLOs that do not reflect real user experience**: AI-suggested SLOs may be based on infrastructure metrics rather than user-facing indicators | validate SLOs against business requirements and user impact |
| **Dashboard data inaccuracy**: dashboards may display incorrect data if metric sources are misconfigured | compare dashboard data against raw logs or known values during validation |
| **No existing telemetry to build on**: if the system produces no metrics or structured logs, the activity scope exceeds the timebox | if no telemetry exists, produce a recommendation report instead of implemented dashboards |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] SLOs are defined and documented for the scoped service.
- [ ] At least one baseline dashboard is deployed or ready to deploy.
- [ ] Alert rules are configured with severity levels and notification channels.
- [ ] Telemetry gap report is documented.
- [ ] Tech Lead or Senior Engineer has reviewed and approved the setup.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of drafting dashboard configs and alert rules; quality of suggested SLOs.
- **Prerequisites to document**: monitoring platform access, existing telemetry availability, dashboard write permissions.
- **Limits and risks to document**: alert noise, SLOs not matching user experience, missing telemetry.
- **Reusable assets**: SLO template, dashboard configuration files, alert rule patterns, telemetry audit checklist.

- **Department continuation**: extend the SLO definitions, dashboards, and alert rules to additional services using the templates produced.

Pattern candidates:
- **"SLO-first observability"**: defining SLOs before building dashboards ensures the monitoring answers the right questions instead of displaying arbitrary metrics.
- **"AI-drafted dashboard configs"**: using AI to generate Grafana JSON or equivalent from SLO definitions significantly speeds up dashboard creation.

Anti-pattern candidates:
- **"Dashboard without alerts"**: dashboards alone are passive. Without alerts, nobody looks at them until after a problem is reported. Always pair dashboards with alert rules.
- **"Alerting on everything"**: setting up alerts for every metric creates noise. Focus alerts on the defined SLOs and critical health indicators only.
- Reusable assets: prompts, templates, patterns for the library.