# Activity: Create repo Q and A assistant (L3)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3-4) |
| **Inputs** | Repository, documentation outputs |
| **Key output** | Configured QA assistant + test queries |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
In legacy systems the answers to common questions ("how does the payment flow work?", "where is the config for X?", "why was this pattern chosen?") live in the heads of one or two senior engineers. Every interruption costs the expert context-switch time and creates a bottleneck.

This activity creates a repository-grounded Q and A assistant that engineers can query privately against the indexed codebase and documentation. The assistant returns cited answers, reducing reliance on individuals and creating an auditable knowledge surface.

Decision enabled: confirm whether the Q and A assistant provides accurate, useful answers; decide whether to keep it running for the team beyond the pilot.


---

## 2) What we will do (scope and steps)
Description: Index code and docs to support private questions and answers.

Sub tasks:
1. Identify the sources to index: repository source code, README files, CI/CD config, existing documentation (wiki, Confluence), architecture diagrams, and any outputs from other L3 activities (Architecture Summary, Documentation Gap Analysis, Onboarding Pack).
2. Set up the search or embeddings index: configure the chosen tool to ingest the identified sources. Verify the index covers the intended scope and does not include out-of-scope data (credentials, personal data, external repositories).
3. Configure the chat surface: set up a private interface where team members can ask questions. Ensure it is restricted to authorised users only.
4. Create a validation question set: draft 10-15 curated questions spanning different areas of the system (architecture, build process, key modules, deployment, common errors). Include questions where the answer is known so accuracy can be measured.
5. Run the validation: submit each question, record the answer and citation, and score for accuracy (correct/partially correct/incorrect/hallucinated).
6. Identify gaps: where answers are incorrect or missing, note whether the issue is (a) missing source material, (b) poor indexing, or (c) model limitations. Address (a) and (b) within the timebox if possible.
7. Share the assistant link with the team. Collect initial feedback on usefulness and answer quality.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from running after other L3 activities that produce documentation (Architecture Summary, Gap Analysis, Onboarding Pack) since those outputs improve the index quality. Schedule in Week 3.

> **Out of scope:**
> - Connecting external data sources without governance approval.
> - Building a custom chatbot or fine-tuned model.
> - Public-facing deployment.

---

## 3) How AI is used (options and modes)
- **Retrieve and ground:** the assistant indexes the repository and documentation, then retrieves relevant code and text snippets to answer questions with citations.
- **Analyse and reason:** the assistant synthesises information from multiple files to answer questions that span several areas of the codebase.
- **Generate:** the assistant generates natural-language answers grounded in the indexed sources.
- **Human in the loop:** engineers validate answers against their knowledge during the curated question test. The validation scorecard records accuracy.


---

## 4) Preconditions, access and governance
- Read access to the repository and all documentation to be indexed.
- Approved AI tool that supports repository indexing and Q and A (see tooling section).
- Team members available to submit validation questions and provide feedback.
- Named reviewer (Tech Lead or Solution Architect) available to approve the index scope.
- ATRS trigger: Possibly, if the tool sends code to an external API. Check data residency requirements. DPIA check: confirm the index does not include personal data or credentials.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Repository-grounded Q and A tools | Sourcegraph Cody, GitHub Copilot Chat (workspace mode), Cursor, Continue.dev |  |
| Embeddings and search | if building a custom index, tools like LangChain, LlamaIndex, or Azure AI Search |  |
| Documentation hosting | Confluence, GitHub Wiki, MkDocs | sources to be indexed |
| Not typically needed | SCA/SBOM tools, security scanning tools, CI pipeline tools |  |


---

## 6) Timebox
Suggested: 2h for setup and indexing; 1h for validation and gap fixing. Total: 3h. Schedule in Week 3.


---

## 7) Inputs and data sources
- Target repository (source code, README, CI/CD config).
- Existing documentation: wiki pages, Confluence spaces, architecture diagrams.
- Outputs from other L3 activities (Architecture Summary, Documentation Gap Analysis, Onboarding Pack) if available.
- If unavailable: if documentation is sparse, the index will rely primarily on source code. Note this as a limitation in the validation report.


---

## 8) Outputs and artefacts
- Configured Q and A assistant accessible to the team.
- Validation question set with scored results (correct/partially correct/incorrect/hallucinated per question).
- Gap report noting where the assistant failed and why.
- Time log entry for P1.

Audience: engineering team (as users of the assistant), Tech Lead (for validation results and adoption decision).


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to set up and validate the assistant. Also measure time saved per question answered by the assistant versus asking an expert (estimate from team feedback) |
| **P2 Quality score** | score each validation question answer on the 1-5 rubric for accuracy and usefulness. Report the aggregate score |
| **P3 Developer sentiment** | include Q and A assistant experience in the post-pilot SPACE survey |
| **P8 Reusable artefacts** | count the index configuration, validation question set, and any prompt templates |


Secondary:
- **P4 Lead time**: if the assistant reduces time spent searching for answers during development, note qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Hallucinated answers**: the assistant may generate plausible-sounding but incorrect answers, especially for areas with sparse documentation | the validation question set tests accuracy before team rollout; instruct users to verify answers against the cited source |
| **Data exposure via the index**: if the index includes credentials, secrets, or personal data, the assistant could surface them | review the index scope before creation; exclude .env files, secrets, and personal data. Confirm with DPIA check |
| **Over-reliance on the assistant**: engineers may trust answers without verification, especially for complex architectural questions | frame the assistant as a starting point, not an authority. Include a disclaimer in the chat surface |
| **Tool approval and data residency**: if the tool sends code to an external API, it may not meet departmental data handling requirements | confirm tool approval and data residency before setup |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Q and A assistant is configured and accessible to team members.
- [ ] Validation question set (10-15 questions) has been run and scored.
- [ ] Aggregate accuracy score meets acceptable threshold (discuss with Tech Lead).
- [ ] Gap report is documented.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of setting up a repo-grounded Q and A surface; accuracy of answers versus manual expert lookup.
- **Prerequisites to document**: tool approval, data residency confirmation, documentation availability.
- **Limits and risks to document**: hallucination rate, areas where the assistant fails, data scope concerns.
- **Reusable assets**: index configuration, validation question set template, accuracy scoring method.

- **Department continuation**: keep the assistant running and update its index as the codebase and documentation evolve. The configuration and validation question set are documented.

Pattern candidates:
- **"Documentation-enriched indexing"**: indexing L3 outputs (Architecture Summary, Gap Analysis, Onboarding Pack) alongside code significantly improves answer quality.
- **"Curated validation before rollout"**: testing with a known-answer question set before team rollout catches accuracy problems early.

Anti-pattern candidates:
- **"Indexing everything without scope review"**: including secrets, credentials, or out-of-scope repositories creates data exposure risk.
- **"Deploying without accuracy measurement"**: if the assistant hallucinates on core questions, team trust erodes quickly. Always validate first.
- Reusable assets: prompts, templates, patterns for the library.