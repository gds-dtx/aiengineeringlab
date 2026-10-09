# Activity: Create automated RCA summaries (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | Incident analysis, log clusters |
| **Key output** | RCA summary per incident |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Root cause analysis (RCA) reports are essential for organisational learning after incidents, but they are time-consuming to write manually. Delays in producing RCAs mean corrective actions are deferred and the same failures recur. AI-drafted RCA summaries accelerate the loop from incident to action, giving reviewers a structured starting point rather than a blank page.

Decision enabled: which corrective actions to approve and assign, based on validated root cause narratives.


---

## 2) What we will do (scope and steps)
Description: Select incidents for RCA (from the pattern shortlist or recent high-severity events), gather evidence, draft structured RCA narratives using AI, and produce a validated action register with owners and target dates.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Select incidents for RCA. Choose 3 to 5 incidents from the Incident Analysis pattern shortlist (top-ranked patterns) or recent P1/P2 incidents that have not yet been formally analysed. Confirm selection with the delivery team.
2. Gather evidence per incident. For each selected incident, collect: incident timeline (detection, escalation, resolution), relevant log extracts, deployment or change history around the incident window, monitoring data, and any existing notes or chat transcripts.
3. Draft RCA narrative using a five-section format. For each incident, prompt the LLM to produce:
   - Summary: one-paragraph description of the incident, duration, and impact.
   - Timeline: chronological sequence of key events from trigger to resolution.
   - Root cause: the underlying technical or process failure that caused the incident.
   - Contributing factors: secondary conditions that enabled or worsened the incident (for example missing monitoring, manual deployment step, stale runbook).
   - Actions: specific corrective actions with clear descriptions.
4. Cross-reference with the cluster report and code change history. Validate that the identified root cause is consistent with log cluster patterns and that any code changes in the incident window are accounted for.
5. SRE or engineer review and correction. The reviewer checks factual accuracy, confirms the root cause, and edits the narrative where the AI draft is incorrect or incomplete.
6. Finalise action items. For each corrective action, assign an owner and a target date. Classify actions as: immediate (within 1 week), short-term (within 1 sprint), or longer-term (backlog).
7. Publish to the incident knowledge base. Store completed RCA summaries in the agreed location (for example Confluence, wiki, or Git repo).
8. Update the evidence log and scorecard. Record the RCA summaries, action register, and any patterns or playbook contributions.

> **Out of scope:**
> - Implementing the corrective actions (these are tracked separately in the backlog).
> - Skipping stakeholder or SRE validation of the AI-drafted narratives.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** synthesise incident evidence (logs, timelines, changes) into a coherent root cause narrative. Identify contributing factors that a human reviewer might not immediately connect.
- **Generate:** draft the five-section RCA narrative for each incident, propose corrective actions, and suggest owner assignments based on affected components.
- **Retrieve and ground:** operate over incident records, log extracts, deployment history, and the cluster report to ensure the RCA narrative is grounded in evidence rather than speculation.
- **Automate and orchestrate:** assemble the evidence package per incident, produce the structured RCA document, and generate the action register.
- **Human in the loop:** an SRE or senior engineer reviews every AI-drafted RCA for factual accuracy, confirms the root cause, and approves the action items before publication.


---

## 4) Preconditions, access and governance
- Incidents selected for RCA (from the Incident Analysis pattern shortlist or agreed with the delivery team).
- Read access to incident records, log exports, deployment history, and monitoring data for each selected incident.
- Cluster report from L7-Log-Clustering (if available) for cross-referencing.
- Named SRE or senior engineer available to review each RCA draft.
- ATRS: incident evidence stays within the approved environment. If evidence includes PII (for example customer-impacting details), confirm redaction approach before AI processing.
- DPIA: not typically triggered unless incident evidence contains personal data. Confirm with information governance if needed.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on incident evidence, log extracts, and deployment history |  |
| Incident management | ServiceNow, Jira Service Management, PagerDuty, or equivalents |  |
| Log and monitoring | Splunk, ELK, CloudWatch, Azure Monitor, or equivalents |  |
| Deployment history | CI/CD platform logs, Git commit history, or change management records |  |
| Notes and reporting | Markdown or Confluence for RCA publication and the action register |  |


---

## 6) Timebox
Suggested: 1.5h to 2.5h for a batch of 3 to 5 incidents (scope band S, confidence Medium +/-30%). Evidence gathering (step 2) typically takes 30min to 1h across the batch. AI drafting and cross-referencing (steps 3 to 4) take 30min. Review, correction, and action finalisation (steps 5 to 6) take 30min to 1h. Adjust upward if evidence is scattered across multiple systems or if incidents are complex.

Expandability: this activity can be repeated per incident. Each additional incident adds approximately 30min.

---

## 7) Inputs and data sources
- Incident records for selected incidents (from the pattern shortlist or recent P1/P2 events).
- Log extracts covering the incident window for each selected incident.
- Deployment and change history around each incident window.
- Monitoring data (dashboards, alert timelines) for each incident.
- Cluster report from L7-Log-Clustering (if available).
- Pattern shortlist from L7-Incident-Analysis (if available).
- Existing post-incident notes or chat transcripts.


---

## 8) Outputs and artefacts
- RCA summaries: one per incident, each following the five-section format (Summary, Timeline, Root Cause, Contributing Factors, Actions).
- Action register: table of corrective actions with columns for action description, owner, target date, priority (immediate, short-term, longer-term), and status.
- Published RCAs in the incident knowledge base.
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to produce the batch of RCA summaries with AI assistance versus estimated manual effort. Record both values (target: at least 40% reduction) |
| **P2 Quality score** | SRE or senior engineer rates each RCA summary on the 1 to 5 rubric (factual accuracy, root cause identification correctness, completeness of contributing factors, actionability of recommended actions) |
| **P8 Reusable artefacts** | count and catalogue outputs (five-section RCA template, prompting strategy, evidence-gathering checklist) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incorrect root cause identification**: AI may attribute the incident to a plausible but wrong cause if the evidence is ambiguous | every RCA must be reviewed and confirmed by an SRE or engineer who was involved in the incident or has deep system knowledge |
| **Hallucinated timeline events**: AI may infer events that did not happen if log coverage is incomplete | cross-reference every timeline entry against at least one primary source (log line, alert, or deployment record) |
| **Blame-oriented language**: AI drafts may inadvertently assign blame to individuals | enforce blameless RCA principles in the prompt; reviewer checks for and removes any blame-oriented language |
| **Stale actions**: corrective actions may languish without follow-up | assign each action an owner and target date; add to the team backlog for tracking |


---

## 11) Review and definition of done
- [ ] 3 to 5 incidents selected for RCA, confirmed with the delivery team.
- [ ] Evidence gathered for each incident (timeline, logs, changes, monitoring data).
- [ ] AI-drafted RCA summary produced for each incident in the five-section format.
- [ ] Each RCA reviewed and corrected by an SRE or senior engineer; root cause confirmed.
- [ ] Action register produced with owner, target date, and priority for every corrective action.
- [ ] RCA summaries published to the incident knowledge base.
- [ ] No blame-oriented language in any published RCA.
- [ ] Evidence log and scorecard updated. Decision log entry added if systemic recommendations are made.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: produce RCA summaries for future incidents using the five-section template and evidence-gathering checklist.

- Pattern candidates: "five-section RCA template" (Summary, Timeline, Root Cause, Contributing Factors, Actions as a repeatable structure); "evidence-first drafting" (gather all primary sources before prompting the AI, to reduce hallucination).
- Anti-pattern candidates: "AI-only RCA" (publishing AI-drafted root cause analysis without SRE review risks propagating incorrect conclusions); "action without owner" (corrective actions that lack an assigned owner and target date are rarely completed).
- Where AI helped: record time saved in evidence synthesis, narrative drafting, and action item generation. Note proportion of AI-drafted content retained versus edited during review.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI identified the wrong root cause, hallucinated timeline events, or where the five-section format did not fit a particular incident type.
- Reusable assets: prompts, templates, patterns for the library.