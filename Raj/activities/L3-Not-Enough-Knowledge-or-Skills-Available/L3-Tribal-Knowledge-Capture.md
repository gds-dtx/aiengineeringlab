# Activity: Capture tribal knowledge (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | Half a day to 1 day |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | SME interviews, repository |
| **Key output** | Knowledge cards |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy systems accumulate undocumented decisions, workarounds, and operational know-how that live only in the heads of a small number of people. When those individuals leave, change roles, or are unavailable, the team loses the ability to maintain and evolve the system safely. This is a single point of failure for continuity.

This activity uses structured interviews and AI-assisted note-taking to extract tacit knowledge from subject-matter experts and convert it into explicit, searchable, version-controlled artefacts.

Decision enabled: confirm whether the captured knowledge is accurate and useful; decide whether to continue the capture process for additional topics or systems.


---

## 2) What we will do (scope and steps)
Description: Turn tacit knowledge into explicit artefacts, tagged and stored.

Sub tasks:
1. Identify subject-matter experts (SMEs) and the knowledge topics to capture. Prioritise by risk: which knowledge, if lost, would cause the most disruption? Good candidates include: deployment procedures, incident response steps, undocumented integrations, historical design decisions, known failure modes, and workarounds.
2. Prepare an interview guide: draft 8-12 open-ended questions per topic. Use the AI assistant to generate initial questions based on the codebase and existing documentation (e.g. "The deployment script references a manual step at line X. What does this do and why?").
3. Conduct the interview (30-45 minutes per SME per topic). Record notes in real time. If the SME consents, record the session for AI-assisted transcription.
4. Use the AI assistant to draft structured knowledge cards from the interview notes or transcript. Each card should include: topic, context, the knowledge itself (step by step or decision rationale), related code/config references, and any caveats.
5. Review the drafted cards with the SME to verify accuracy. Correct any misinterpretations. Flag areas where the SME's knowledge conflicts with what the code appears to do.
6. Tag and store the cards in the agreed location (wiki, Confluence, repo docs folder). Use consistent tags: topic, system area, SME name, date captured.
7. Cross-reference: link the cards to relevant code, architecture diagrams, runbooks, or other L3 outputs where applicable.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** can run in parallel with other L3 activities. Outputs feed into the Onboarding Pack (L3), Repo QA Assistant (L3), and Runbook Updates (L7). Schedule interviews in Week 2-3.

> **Out of scope:**
> - Organisation-wide knowledge management programme.
> - Redesigning the system based on captured knowledge.
> - Recording personal opinions or grievances.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** read the codebase and existing documentation to generate targeted interview questions specific to the system.
- **Generate:** draft structured knowledge cards from interview notes or transcripts, organising information into a consistent format.
- **Analyse and reason:** identify gaps or contradictions between what the SME says and what the code shows; flag these for follow-up.
- **Human in the loop:** the SME validates every drafted card for accuracy. The engineer reviews for completeness and relevance.


---

## 4) Preconditions, access and governance
- Identified SMEs available and willing to participate (30-45 minutes per session).
- Read access to the target repository and existing documentation.
- Storage location agreed for knowledge cards (wiki, Confluence, repo docs folder).
- If recording interviews: SME consent obtained. Recording stored securely and deleted after transcription.
- Named reviewer (Tech Lead or Solution Architect) available.
- ATRS trigger: No. DPIA check: confirm that interview transcripts and knowledge cards do not contain personal data beyond SME attribution.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM |  |
| Transcription (if recording) | Otter.ai, Microsoft Teams transcription, Whisper |  |
| Documentation platform | Confluence, GitHub Wiki, MkDocs, Notion |  |
| Code assistants | GitHub Copilot, Sourcegraph Cody |  |
| Not typically needed | SCA/SBOM tools, security scanning tools, CI pipeline tools |  |


---

## 6) Timebox
Suggested: 1h preparation (questions), 45 minutes per interview, 1h for card drafting and review per interview. Plan for 2-3 interviews in the pilot. Total: approximately half a day to 1 day across multiple sessions. Schedule interviews in Week 2-3.

Expandability: this activity can be repeated per SME interview. Each additional SME interview adds approximately 2h.

---

## 7) Inputs and data sources
- Target repository (source code, README, deployment scripts, CI config) for generating interview questions.
- Existing documentation: wiki pages, Confluence spaces, runbooks, architecture diagrams.
- SME availability and willingness.
- Outputs from other L3 activities (Architecture Summary, Documentation Gap Analysis) if available, to identify what is already documented and what gaps remain.
- If unavailable: if no documentation exists, focus interview questions on the highest-risk undocumented areas (deployment, incident response, integrations).


---

## 8) Outputs and artefacts
- Structured knowledge cards (one per topic, with consistent tags and cross-references).
- Interview question template (reusable for future capture sessions).
- Summary of knowledge gaps remaining after capture.
- Time log entry for P1.

Audience: engineering team, new joiners, Tech Lead. Cards feed into the Onboarding Pack, Repo QA Assistant, and Runbook Updates.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to conduct interviews and produce knowledge cards with AI assistance. Compare against estimate for producing equivalent documentation manually |
| **P2 Quality score** | SME and reviewer rate each knowledge card on the 1-5 rubric for accuracy, completeness, and usefulness |
| **P3 Developer sentiment** | include knowledge accessibility questions in the post-pilot SPACE survey |
| **P8 Reusable artefacts** | count knowledge cards produced, interview template, and any prompt templates |


Secondary:
- **P4 Lead time**: if the cards reduce time spent searching for answers, note qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI misinterprets interview content**: the AI may draft cards that distort what the SME said, especially for nuanced or contradictory explanations | every card is reviewed and approved by the SME before storage |
| **SME unavailability or reluctance**: key individuals may not have time or may be reluctant to share knowledge | schedule sessions early; keep sessions short (30-45 minutes); frame the activity as protecting the SME from being the single point of contact |
| **Captured knowledge becomes stale**: if the system changes, the cards may become inaccurate | store cards in version control alongside the code; tag with a capture date and review cadence |
| **Recording and privacy concerns**: recording interviews may raise privacy or consent issues | obtain explicit consent; delete recordings after transcription; do not record if SME objects |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] At least 2-3 interview sessions completed with identified SMEs.
- [ ] Knowledge cards drafted, reviewed by the SME, and stored in the agreed location.
- [ ] Cards are tagged consistently and cross-referenced to code/documentation.
- [ ] Interview question template is stored as a reusable asset.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of generating targeted interview questions from code; quality and consistency of drafted knowledge cards.
- **Prerequisites to document**: SME availability, repository access, documentation platform access, consent process for recordings.
- **Limits and risks to document**: misinterpretations in AI-drafted cards, SME reluctance, knowledge areas that remain undocumented.
- **Reusable assets**: interview question template, knowledge card template, tagging taxonomy.

- **Department continuation**: conduct additional SME interviews using the interview template and knowledge card format as new topics arise or new SMEs become available.

Pattern candidates:
- **"Code-grounded interview questions"**: generating interview questions from the actual codebase (e.g. referencing specific scripts, config files, or undocumented steps) produces more targeted and useful interviews than generic questions.
- **"SME review loop"**: having the SME review and correct AI-drafted cards in a short feedback loop (same day) produces higher accuracy than delayed review.

Anti-pattern candidates:
- **"Recording without consent"**: recording interviews without explicit SME consent creates trust and governance issues. Always ask first.
- **"Capturing everything at once"**: attempting to extract all knowledge in a single long session produces fatigue and diminishing quality. Keep sessions to 30-45 minutes and focus on one topic each.
- Reusable assets: prompts, templates, patterns for the library.