# Activity: Update runbooks (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 3) |
| **Inputs** | RCA summaries, existing runbooks, tribal knowledge |
| **Key output** | Updated runbooks |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Runbooks drift from reality as systems evolve, configuration changes, and new failure modes emerge. When an incident occurs, operators reach for the runbook only to find outdated commands, missing steps, or procedures for components that no longer exist. Keeping runbooks current reduces mean time to resolution (MTTR) and lowers the cognitive load on on-call engineers during high-pressure situations.

Decision enabled: which runbook sections to update or create, based on evidence from recent incidents and failure mode analysis.


---

## 2) What we will do (scope and steps)
Description: Inventory existing runbooks, cross-reference with RCA summaries and failure mode cards to identify stale or missing sections, draft updates using a structured runbook format, validate through dry-run walkthroughs, and publish.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Inventory existing runbooks. List all current runbooks and map each to the service(s) or failure mode(s) it covers. Note the last-updated date for each.
2. Cross-reference with RCA summaries and failure mode cards. For each RCA action and failure mode card, check whether a corresponding runbook exists and whether it covers the relevant diagnosis and resolution steps. Flag runbooks that are stale (last updated before a relevant system change) or missing entirely.
3. Produce a runbook gap and staleness register. For each gap or stale section, record: affected runbook, gap type (missing runbook, missing section, outdated command, outdated architecture reference), and the evidence source (RCA ID, failure mode card ID).
4. Draft updates using a structured runbook format. For each gap, draft the updated or new section following a four-part structure:
   - Trigger: what symptom or alert signals that this runbook should be used.
   - Diagnosis steps: ordered commands and checks to confirm the issue and determine scope.
   - Resolution steps: ordered actions to resolve the issue, including rollback steps.
   - Escalation and verification: when to escalate, to whom, and how to confirm the issue is resolved.
5. AI-assist to generate diagnostic commands and resolution steps. Prompt the LLM with the system architecture, recent incident evidence, and current configuration to draft concrete commands, queries, and verification checks.
6. SRE or ops review and correction. The reviewer checks every command for accuracy, confirms the escalation path, and edits where the AI draft is incorrect or incomplete.
7. Dry-run validation. Pick a recent incident that the updated runbook should cover. Walk through the updated steps as if diagnosing that incident and confirm they lead to the correct resolution. Record any steps that need further adjustment.
8. Publish to the runbook store and update the evidence log. Store updated runbooks with versioning (so the previous version is still accessible). Record the gap register, changes made, and validation results.

> **Out of scope:**
> - Unreviewed changes to production processes.
> - Creating runbooks for services not covered by the current pilot scope.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** compare existing runbook content against current system architecture, recent incidents, and failure mode cards to identify stale or missing sections.
- **Generate:** draft updated runbook sections including diagnostic commands, resolution steps, escalation paths, and verification checks grounded in recent incident evidence.
- **Retrieve and ground:** operate over existing runbooks, system architecture documentation, deployment configuration, and incident evidence to ensure drafted commands and steps are accurate for the current environment.
- **Automate and orchestrate:** produce the gap and staleness register, generate structured runbook sections in the four-part format, and assemble the updated runbook documents.
- **Human in the loop:** an SRE or ops engineer reviews every drafted command and step for accuracy before publication. Dry-run validation confirms the runbook works against a real incident scenario.


---

## 4) Preconditions, access and governance
- Read access to the existing runbook store (for example Confluence, wiki, Git repo, or shared drive).
- RCA summaries from L7-RCA-Summaries (at least for the top patterns).
- Failure mode cards from L7-Recurring-Failure-Modes (or equivalent known-issues list).
- System architecture documentation and current deployment configuration.
- Named SRE or ops engineer available to review and validate updates.
- Write access to the runbook store for publishing updates.
- ATRS: runbook content stays within the approved environment. If runbooks contain infrastructure details (IP addresses, hostnames, credentials references), confirm classification level.
- DPIA: not typically triggered. Confirm with information governance if runbook content references personal data handling procedures.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on existing runbooks, system architecture, and incident evidence |  |
| Runbook store | Confluence, wiki, Git repository, or shared drive |  |
| System documentation | architecture diagrams, deployment configuration, infrastructure-as-code repositories |  |
| Notes and reporting | Markdown or Confluence for the gap register and updated runbook sections |  |


---

## 6) Timebox
Suggested: 1.5h to 2h (scope band S, confidence Medium +/-30%). Inventory and cross-referencing (steps 1 to 3) typically take 30min. Drafting updates (steps 4 to 5) take 30min to 45min. Review and dry-run validation (steps 6 to 7) take 30min to 45min. Adjust upward if many runbooks are stale or if the system has no existing runbooks.

Expandability: this activity can be repeated per failure mode. Each additional failure mode adds approximately 20 to 30min.

---

## 7) Inputs and data sources
- Existing runbooks from the runbook store.
- RCA summaries and action registers from L7-RCA-Summaries.
- Failure mode cards from L7-Recurring-Failure-Modes.
- Knowledge cards from L3-Tribal-Knowledge-Capture (if available) for undocumented operational procedures and workarounds.
- System architecture documentation and deployment configuration.
- Architecture Summary (from L3, if available) for service topology and escalation path context.
- Incident records and log extracts (for dry-run validation against a real scenario).


---

## 8) Outputs and artefacts
- Runbook gap and staleness register: table listing each gap or stale section with the affected runbook, gap type, and evidence source.
- Updated runbooks: versioned documents with new or revised sections in the four-part format (Trigger, Diagnosis, Resolution, Escalation and Verification).
- Runbook coverage matrix: mapping of services and failure modes to runbooks, showing which are now covered and which gaps remain.
- Dry-run validation record: results from walking through the updated runbook against a recent incident.
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to produce updated runbook sections with AI assistance versus estimated manual effort. Record both values |
| **P2 Quality score** | SRE or ops engineer rates the updated runbook sections on the 1 to 5 rubric (accuracy of commands, completeness of diagnosis and resolution steps, clarity for an on-call engineer) |
| **P7 Risk reduction** | proportion of top failure modes now covered by a current, validated runbook. Track whether MTTR improves for incidents where updated runbooks are used |
| **P8 Reusable artefacts** | count and catalogue outputs (four-part runbook section template, gap register template, prompts used for command generation) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incorrect commands in runbooks**: AI-generated diagnostic or resolution commands may be syntactically correct but semantically wrong for the target environment | every command must be reviewed by an SRE who knows the environment; dry-run validation confirms commands work |
| **Runbook drift resumes after pilot**: updated runbooks will become stale again if there is no ongoing maintenance process | recommend a runbook review trigger (for example after every P1/P2 incident or quarterly) |
| **Over-detailed runbooks**: excessively long runbooks slow down on-call engineers | keep each section concise; use step-by-step format with numbered commands; aim for a runbook that can be followed in under 15 minutes |
| **Sensitive infrastructure details**: runbooks may contain hostnames, endpoints, or credential references | confirm classification level with information governance; use variable placeholders for credentials and reference a secrets manager |


---

## 11) Review and definition of done
- [ ] Existing runbooks inventoried and mapped to services and failure modes.
- [ ] Cross-reference completed against RCA summaries and failure mode cards; gap and staleness register produced.
- [ ] Updated or new runbook sections drafted in the four-part format (Trigger, Diagnosis, Resolution, Escalation and Verification).
- [ ] Every command and step reviewed by an SRE or ops engineer for accuracy.
- [ ] Dry-run validation completed for at least one updated runbook against a recent incident; results recorded.
- [ ] Updated runbooks published to the runbook store with versioning.
- [ ] Runbook coverage matrix updated.
- [ ] No unredacted credentials or sensitive details in published runbooks.
- [ ] Evidence log and scorecard updated. Decision log entry added if a runbook maintenance process is recommended.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: update additional runbook sections as new failure modes are documented, using the four-part runbook section template.

- Pattern candidates: "four-part runbook section" (Trigger, Diagnosis, Resolution, Escalation and Verification as a repeatable structure for every runbook entry); "incident-driven runbook review" (using RCA evidence and failure mode cards as the trigger for runbook updates rather than arbitrary schedules).
- Anti-pattern candidates: "copy-paste from incident notes" (pasting raw incident chat or log snippets into runbooks without structuring them into reproducible steps); "update without validation" (publishing runbook changes without a dry-run walkthrough against a real incident scenario).
- Where AI helped: record time saved in gap identification, command generation, and section drafting. Note accuracy of AI-generated commands versus corrections during review.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI-generated commands were incorrect, where the four-part format did not fit a particular scenario, or where sensitive details required redaction.
- Reusable assets: prompts, templates, patterns for the library.