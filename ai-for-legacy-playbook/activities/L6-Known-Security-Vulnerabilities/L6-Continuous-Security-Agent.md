# Activity: Run a continuous security agent (L6)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | Repository, CI pipeline, triage output |
| **Key output** | Configured security agent + alert rules |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Security scanning typically runs on an ad-hoc basis or during periodic audits. Between scans, new vulnerabilities are disclosed, new code is committed, and the security posture drifts. A continuous security agent monitors the repository and raises alerts or PRs automatically when new issues are detected.

This activity pilots a lightweight continuous security agent for the scoped repository: configuring it, observing its outputs over a defined period, and evaluating whether the signal-to-noise ratio justifies permanent adoption.

Decision enabled: keep the agent running permanently, adjust its configuration (rules, thresholds, notification channels), or retire it if the noise outweighs the value.


---

## 2) What we will do (scope and steps)
Description: Pilot a lightweight agent to raise PRs or alerts continuously.

Sub tasks:
1. Select the agent tool: choose an approved continuous security tool that can monitor the repository for new vulnerabilities (dependency updates, SAST findings on new commits, secret detection).
2. Configure the agent: (a) set the scan scope (which repository, which branches), (b) configure rule sets (start with high/critical only to reduce noise), (c) set notification channels (PR comments, Slack, email, or equivalent), (d) configure auto-PR behaviour if available (e.g. Dependabot auto-PRs for dependency updates).
3. Deploy the agent: enable the agent on the target repository. Verify it runs on the expected triggers (push, schedule, new CVE disclosure).
4. Observe outputs over a defined period (minimum 1 week, ideally 2 weeks): (a) count the number of alerts/PRs raised, (b) classify each as true positive (actionable finding), false positive (noise), or informational (valid but low priority), (c) record the time taken by engineers to triage or act on each alert.
5. Evaluate the agent: (a) signal-to-noise ratio (true positives / total alerts), (b) mean time to detection (how quickly after a vulnerability is disclosed does the agent flag it?), (c) developer disruption (is the alert volume manageable?).
6. Draft a recommendation: keep (with current config), adjust (change rules/thresholds), or retire (noise exceeds value).
7. Review with the Tech Lead.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run in parallel with other L6 activities. The observation period spans Weeks 2-4. Configure early and evaluate late.

> **Out of scope:**
> - Permanent adoption without evaluation.
> - Custom agent development or fine-tuning.
> - Replacing the team's existing security scanning pipeline.

---

## 3) How AI is used (options and modes)
- **Automate and orchestrate:** the agent runs continuously, scanning for new vulnerabilities and raising PRs or alerts without manual intervention.
- **Analyse and reason:** evaluate the agent's outputs to classify true positives versus false positives; assess the signal-to-noise ratio.
- **Generate:** produce the evaluation report with metrics and recommendation.
- **Human in the loop:** engineers triage each alert/PR raised by the agent. The Tech Lead reviews the evaluation and adoption recommendation.


---

## 4) Preconditions, access and governance
- Write access to the target repository (for agent configuration and PR creation).
- Approved continuous security tool available (see tooling section).
- Named reviewer (Tech Lead) available for the evaluation step.
- ATRS trigger: Possibly, if the agent sends code to an external API. Check data residency requirements. DPIA check: confirm the agent does not process or store personal data.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Continuous dependency updates | Dependabot, Renovate, Snyk auto-fix |  |
| Continuous SAST | Semgrep CI, SonarQube (continuous mode), CodeQL | GitHub code scanning |
| Secret detection (continuous) | GitHub secret scanning, gitleaks (pre-commit or CI), GitGuardian |  |
| Notification channels | GitHub PR comments, Slack, email, Teams |  |
| Not typically needed | SBOM tools, document analysis tools, monitoring tools |  |


---

## 6) Timebox
Suggested: 1h for configuration and deployment; observation period runs passively over 1-2 weeks; 1h for evaluation and recommendation. Total active time: 2h. Schedule configuration in Week 1-2, evaluation in Week 4.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 2h for setup and initial evaluation.

---

## 7) Inputs and data sources
- Target repository.
- Approved continuous security tool(s).
- Agent outputs (alerts, PRs) collected over the observation period.
- If unavailable: if no approved tool is available, the activity should evaluate candidate tools and recommend one for approval. Document this as the output instead of a live pilot.


---

## 8) Outputs and artefacts
- Agent configuration (rule sets, scan scope, notification channels).
- Observation log: each alert/PR classified as true positive, false positive, or informational.
- Evaluation report: signal-to-noise ratio, detection speed, developer disruption, and adoption recommendation (keep/adjust/retire).
- Time log entry for P1.

Audience: Tech Lead, Delivery Manager, security team. The evaluation report informs the decision on permanent adoption.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record setup time and per-alert triage time. Compare against estimate for periodic manual scanning |
| **P7 Vulnerability/risk reduction** | count the number of true-positive findings detected during the observation period that would not have been caught by periodic scanning |
| **P8 Reusable artefacts** | count the agent configuration, observation log format, evaluation template |


Secondary:
- **P2 Quality score**: reviewer rates the agent's signal-to-noise ratio on the 1-5 rubric.
- **P3 Developer sentiment**: include agent experience in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Alert fatigue**: if the agent raises too many low-value alerts, developers will start ignoring all alerts | start with high/critical-only rule sets; tune thresholds during the observation period |
| **False positive PRs merged without review**: auto-PRs from the agent may be merged without adequate review | do not enable auto-merge during the pilot; require human review for every agent-generated PR |
| **Agent sends code to an external service**: some tools send code snippets or metadata to external APIs | confirm data residency and tool approval before deployment; restrict to on-premise or approved cloud instances |
| **Agent disrupts the development workflow**: excessive notifications or PRs may slow down the team | configure notification channels to avoid interrupt-driven workflows (e.g. daily digest rather than per-finding alerts) |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Agent is configured and running on the target repository.
- [ ] Observation period (minimum 1 week) is complete.
- [ ] Observation log classifies each alert/PR.
- [ ] Evaluation report is drafted with signal-to-noise ratio and recommendation.
- [ ] Tech Lead has reviewed and approved the recommendation.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: continuous detection versus periodic scanning; auto-PR generation for dependency updates.
- **Prerequisites to document**: tool approval, data residency confirmation, repository write access.
- **Limits and risks to document**: alert fatigue, false positive rate, data residency concerns.
- **Reusable assets**: agent configuration template, observation log format, evaluation template, recommended rule sets.

- **Department continuation**: keep the agent running beyond the pilot. The configuration, alert review cadence, and evaluation method are documented for ongoing use.

Pattern candidates:
- **"High-severity-only initial configuration"**: starting with critical/high-only rules and expanding later produces a manageable alert volume and builds team confidence in the agent.
- **"Observation-before-adoption"**: running the agent for 1-2 weeks before deciding on permanent adoption provides evidence-based adoption rather than assumption-based.

Anti-pattern candidates:
- **"All-rules-on from day one"**: enabling every rule set immediately floods the team with alerts and guarantees alert fatigue.
- **"Permanent adoption without evaluation"**: adopting the agent without measuring signal-to-noise ratio risks embedding a tool that creates more work than it saves.
- Reusable assets: prompts, templates, patterns for the library.