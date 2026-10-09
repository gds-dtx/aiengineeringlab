# Activity: Identify recurring failure modes (L7)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | RCA summaries, incident history |
| **Key output** | Recurring failure mode register |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
The same types of failure recur because patterns are not formalised, tracked, or assigned for resolution. Structured failure mode cards make repeating issues visible, quantifiable, and assignable, turning reactive firefighting into proactive backlog items. Without this step, insights from incident analysis and RCA summaries remain observations rather than drivers of change.

Decision enabled: which recurring failure modes to address first, and who owns each remediation.


---

## 2) What we will do (scope and steps)
Description: Review cluster reports and RCA summaries for repeating patterns, draft structured failure mode cards, validate and prioritise with the ops team, and add remediation items to the team backlog.

Sub-tasks (sequenced, later steps depend on earlier outputs):
1. Gather source evidence. Collect the cluster report (from L7-Log-Clustering), pattern shortlist (from L7-Incident-Analysis), RCA summaries and action registers (from L7-RCA-Summaries), and any existing known-issues lists.
2. Identify repeating patterns. Cross-reference the sources to find errors, incidents, or failure types that appear in more than one cluster, RCA, or time period. List candidate failure modes.
3. Draft failure mode cards. For each candidate, create a structured card with the following fields:
   - ID: unique identifier (for example FM-001).
   - Name: short descriptive title.
   - Description: what happens when this failure mode triggers.
   - Trigger conditions: the circumstances or sequence that causes the failure.
   - Affected components: services, modules, or infrastructure involved.
   - Frequency: how often it has occurred in the analysis window (with incident or cluster references).
   - Impact: severity and blast radius (users affected, downtime, data risk).
   - Recommended fix: specific remediation action.
   - Owner: person or team responsible for the fix (to be assigned in step 5).
   - Target date: when the fix should be completed (to be assigned in step 5).
4. Validate cards with the ops or SRE team. Walk through each card, confirm the description is accurate, and merge or split cards where needed.
5. Prioritise by frequency multiplied by impact. Rank the failure mode cards and assign an owner and target date to each. Classify as: immediate (within 1 week), short-term (within 1 sprint), or longer-term (backlog).
6. Add to team backlog. Create backlog items (for example Jira tickets) for each failure mode card, linking back to the supporting evidence.
7. Update the evidence log and scorecard. Record the failure mode register, prioritisation rationale, and backlog links.

> **Out of scope:**
> - Implementing the fixes (tracked separately via backlog items or Fix PRs).
> - Assigning blame to teams or individuals.

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** cross-reference cluster reports, RCA summaries, and incident records to identify which failure types are genuinely recurring versus one-off events. Suggest trigger conditions and contributing factors for each failure mode.
- **Generate:** draft failure mode cards in the structured format, propose remediation actions, and suggest priority rankings based on frequency and impact data.
- **Retrieve and ground:** operate over the cluster report, RCA summaries, and incident register to ensure every failure mode card is backed by specific evidence references.
- **Human in the loop:** an SRE or senior engineer validates every card, confirms trigger conditions and impact, and approves the prioritisation before backlog items are created.


---

## 4) Preconditions, access and governance
- Cluster report from L7-Log-Clustering completed (or equivalent log analysis).
- Pattern shortlist from L7-Incident-Analysis completed (or equivalent incident analysis).
- RCA summaries from L7-RCA-Summaries completed (at least for the top patterns).
- Named SRE or senior engineer available to validate failure mode cards.
- Write access to the team backlog tool (for example Jira, Azure DevOps) for creating remediation items.
- ATRS: failure mode cards should not reproduce raw PII from incident records. Use anonymised references.
- DPIA: not typically triggered. Confirm with information governance if failure mode descriptions reference personal data.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM grounded on cluster reports, RCA summaries, and incident data |  |
| Backlog and tracking | Jira, Azure DevOps, Trello, or equivalents |  |
| Notes and reporting | Markdown or Confluence for the failure mode register and cards |  |


---

## 6) Timebox
Suggested: 1h to 1.5h (scope band XS, confidence High +/-15%). Evidence review and candidate identification (steps 1 to 2) typically take 20min to 30min. Card drafting and validation (steps 3 to 4) take 20min to 30min. Prioritisation and backlog creation (steps 5 to 6) take 20min to 30min. This activity is relatively fast because it builds on completed upstream analysis.


---

## 7) Inputs and data sources
- Cluster report from L7-Log-Clustering (ranked error families with frequency and samples).
- Pattern shortlist from L7-Incident-Analysis (top incident patterns with frequency and impact).
- RCA summaries and action registers from L7-RCA-Summaries.
- Any existing known-issues lists or operational risk registers.

Cross-type note: failure mode cards may also feed into L4 activities. Recurring failures caused by observability gaps feed L4-Improve-Observability; failures caused by missing CI/CD gates feed L4-Enhance-CI-CD. When creating backlog items (step 6), tag items that belong to other legacy type activity chains.


---

## 8) Outputs and artefacts
- Failure mode register: structured table of all identified recurring failure modes, each as a card with ID, name, description, trigger conditions, affected components, frequency, impact, recommended fix, owner, and target date.
- Prioritised list: failure modes ranked by frequency multiplied by impact, with priority classification (immediate, short-term, longer-term).
- Backlog items: linked tickets in the team backlog tool for each failure mode remediation.
- Updated evidence log and scorecard entry.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | time to produce the failure mode register with AI assistance versus estimated manual effort. Record both values |
| **P2 Quality score** | SRE or senior engineer rates the failure mode cards on the 1 to 5 rubric (accuracy of descriptions, completeness of fields, actionability of recommended fixes) |
| **P7 Risk reduction** | number of recurring failure modes formally identified and assigned for remediation. Track over time whether addressed failure modes stop recurring |
| **P8 Reusable artefacts** | count and catalogue outputs (failure mode card template, cross-referencing checklist, prompts used) |


---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Missing upstream analysis**: if log clustering or incident analysis was incomplete, some recurring patterns may not appear | note any known gaps from upstream activities; treat the register as a living document to be updated as new evidence emerges |
| **Over-classification**: creating too many failure mode cards dilutes focus | aim for 5 to 15 cards; merge similar modes; prioritise ruthlessly |
| **Stale backlog items**: failure mode tickets may languish without action | assign each card an owner and target date; review progress in sprint ceremonies |
| **Blame framing**: failure mode descriptions may inadvertently imply individual blame | use system-level language (for example "deployment pipeline lacks rollback gate") not person-level language |


---

## 11) Review and definition of done
- [ ] Source evidence gathered from cluster report, pattern shortlist, and RCA summaries.
- [ ] Candidate recurring failure modes identified by cross-referencing sources.
- [ ] Failure mode cards drafted in the structured format (ID, name, description, trigger, components, frequency, impact, fix, owner, target date).
- [ ] Cards validated by the ops or SRE team; no inaccurate or duplicate cards remain.
- [ ] Cards prioritised by frequency multiplied by impact and classified (immediate, short-term, longer-term).
- [ ] Backlog items created and linked to failure mode cards.
- [ ] No blame-oriented language in any card.
- [ ] Evidence log and scorecard updated.
- [ ] All artefacts stored in the evidence area.


---

## 12) Playbook contribution
- **Department continuation**: update the register as new failure modes are identified. The failure mode card template and cross-referencing method are reusable.

- Pattern candidates: "structured failure mode card" (repeatable format for capturing recurring issues with all fields needed for prioritisation and assignment); "cross-reference triangulation" (using cluster report, incident patterns, and RCA evidence together to confirm a mode is genuinely recurring, not coincidental).
- Anti-pattern candidates: "catalogue without action" (producing a detailed failure mode register that is never linked to backlog items or assigned for remediation); "single-source identification" (relying on only one upstream analysis to identify failure modes, missing patterns visible only via cross-referencing).
- Where AI helped: record time saved in cross-referencing, card drafting, and prioritisation. Note accuracy of AI-proposed failure mode descriptions versus reviewers corrections.
- Prerequisites: list access and licensing assumptions validated during the activity.
- Limits and risks: record any cases where AI misidentified a pattern as recurring, merged distinct failure modes, or where the structured card format needed adaptation.
- Reusable assets: prompts, templates, patterns for the library.