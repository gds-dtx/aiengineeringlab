# Activity: Migration readiness assessment (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2) |
| **Inputs** | Repository, SBOM, architecture summary |
| **Key output** | Migration readiness scorecard |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Before investing in migration options or containerisation, the team needs a rapid, structured view of whether the system is ready to move. Platform blockers (unsupported features, hardcoded dependencies, licensing restrictions, missing automation) often surface late, derailing migration plans that looked feasible on paper.

This activity runs a short readiness checklist and scan against the scoped system, producing a readiness score and a categorised blocker list. It answers the question: "How ready is this system to migrate, and what must be resolved first?"

Decision enabled: proceed to detailed migration planning, address identified blockers first, or defer migration. This is typically one of the first L5 activities.


---

## 2) What we will do (scope and steps)
Description: Assess readiness to move with a short checklist and scan.

Sub tasks:
1. Classify the workload: what type of application is this? (web application, batch process, data pipeline, API service, desktop application, monolith, microservices). Use the Architecture Summary (L3) if available.
2. Run the readiness checklist against the system. Use the AI assistant to assess each category: (a) compute compatibility (does the application require specific OS, hardware, or kernel features?), (b) storage and data (are databases portable? are there file-system dependencies?), (c) networking (are there hardcoded IPs, host-specific DNS, or non-standard ports?), (d) dependencies and licensing (are all dependencies available on the target platform? are there licenses tied to specific hosts?), (e) automation maturity (is there CI/CD? automated testing? IaC?), (f) security and compliance (are there compliance requirements that constrain where the system can run?).
3. Score each category: green (ready), amber (blockers that can be resolved), red (showstopper blockers). Compute an overall readiness score.
4. Document identified blockers: for each amber or red item, describe the blocker, its severity, and an initial mitigation approach.
5. Cross-reference with the SBOM and dependency map (from L1, if available) to identify dependency-specific blockers (e.g. libraries not available on the target platform).
6. Draft the readiness report: workload classification, category scores, overall readiness score, and blocker list.
7. Review with the Solution Architect.
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** this is typically one of the first L5 activities. Outputs feed into Generate Migration Options (L5) and Evaluate Feasibility and Risk (L5). Schedule in Week 1-2.

> **Out of scope:**
> - Deep non-functional testing (performance, load, failover).
> - Resolving the identified blockers (this activity identifies them; resolution is separate).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review the codebase, configuration, and infrastructure context to assess each readiness category. Identify platform-specific dependencies, hardcoded values, and compatibility issues.
- **Retrieve and ground:** cross-reference the readiness assessment against the SBOM, dependency map, and Architecture Summary.
- **Generate:** produce the readiness report with category scores, blocker descriptions, and mitigation suggestions.
- **Human in the loop:** the engineer validates each score against their system knowledge. The Solution Architect reviews the overall assessment.


---

## 4) Preconditions, access and governance
- Read access to the target repository and infrastructure configuration.
- Architecture Summary (from L3) or equivalent system-level context.
- SBOM and dependency map (from L1, if available).
- Named reviewer (Solution Architect) available.
- ATRS trigger: No. DPIA check: No (the assessment does not process personal data).


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM |  |
| Code assistants | GitHub Copilot, Sourcegraph Cody |  |
| SCA (for dependency compatibility) | Snyk, OWASP Dependency-Check, Dependabot |  |
| Notes and reporting | Markdown, Confluence, spreadsheets |  |
| Not typically needed | container tools, CI pipeline tools, IaC tools | those come later in the L5 sequence |


---

## 6) Timebox
Suggested: 1.5h for the checklist assessment and scoring; 30 minutes for report drafting and review. Total: 2h. Schedule in Week 1-2.

Expandability: this activity can be repeated per workload. Each additional workload adds approximately 2h.

---

## 7) Inputs and data sources
- Target repository (source code, configuration files, deployment scripts).
- Architecture Summary (from L3, if available).
- SBOM and dependency map (from L1, if available).
- Infrastructure documentation or runbooks (if they exist).
- If unavailable: if no architecture summary exists, run the assessment from code and configuration analysis alone. Note this as a lower-confidence assessment.


---

## 8) Outputs and artefacts
- Readiness report: workload classification, category scores (green/amber/red), overall readiness score.
- Blocker list: each amber/red item with description, severity, and initial mitigation approach.
- Time log entry for P1.

Audience: Solution Architect, Delivery Manager, engineers planning the migration. This is the first input to the migration planning sequence.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the readiness assessment with AI assistance. Compare against estimate for manual assessment |
| **P2 Quality score** | reviewer rates the assessment on the 1-5 rubric for completeness (all categories covered), accuracy (scores match evidence), and usefulness (blockers are actionable) |
| **P8 Reusable artefacts** | count the readiness checklist template, scoring framework, blocker documentation format |


Secondary:
- **P7 Vulnerability/risk reduction**: the assessment identifies migration risks; track how many are addressed.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI misses platform-specific issues**: the AI may not detect all hardcoded dependencies, OS-specific features, or licensing constraints | supplement AI analysis with engineer knowledge; check known problem areas (file paths, registry access, host-specific DNS, licensed components) |
| **Overly optimistic scoring**: the AI may rate categories as green when there are subtle blockers | the Solution Architect challenges each green rating and asks for evidence |
| **Assessment performed without sufficient context**: if no architecture summary or SBOM is available, the assessment will miss dependency and architecture-level blockers | note which categories lack evidence; flag these as lower-confidence scores |
| **Assessment not updated when new information arrives**: as other L5 activities produce findings (exemplar blockers, IaC issues), the readiness score should be updated | treat the readiness assessment as a living document; update when significant new findings emerge |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Workload is classified.
- [ ] All six readiness categories are scored (green/amber/red).
- [ ] Blockers are documented with severity and initial mitigation.
- [ ] Overall readiness score is computed.
- [ ] Solution Architect has reviewed and approved the assessment.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of assessing readiness categories from code and configuration; quality of blocker identification.
- **Prerequisites to document**: repository access, architecture context, SBOM availability.
- **Limits and risks to document**: missed platform-specific issues, optimistic scoring, categories lacking evidence.
- **Reusable assets**: readiness checklist template, six-category scoring framework, blocker documentation format.

- **Department continuation**: re-assess additional workloads using the readiness checklist and scoring framework.

Pattern candidates:
- **"Six-category readiness checklist"**: assessing compute, storage, networking, dependencies, automation maturity, and security/compliance provides comprehensive coverage with minimal overhead.
- **"Living readiness document"**: updating the readiness score as new findings emerge (from exemplar, IaC, or feasibility activities) keeps the assessment current.

Anti-pattern candidates:
- **"Single-dimension readiness assessment"**: assessing only technical compatibility without considering automation maturity, licensing, or compliance misses common migration blockers.
- **"Readiness assessment after migration starts"**: running the assessment after work has begun defeats its purpose. Always assess readiness before committing to a migration path.
- Reusable assets: prompts, templates, patterns for the library.