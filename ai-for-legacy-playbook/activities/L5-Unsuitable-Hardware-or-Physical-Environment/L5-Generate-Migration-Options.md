# Activity: Generate migration options (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1.5-2h |
| **Phase** | Execute (Week 2-3) |
| **Inputs** | Architecture summary, SBOM, migration readiness |
| **Key output** | Migration options with effort estimates |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Legacy migration discussions often default to one approach ("we should containerise" or "we should lift and shift") without systematically evaluating alternatives. This leads to plans that do not account for constraints, risks, or trade-offs.

This activity generates 2-3 concrete migration options for the scoped system, each with pros, cons, assumptions, effort estimates (using pilot-scope bands), and risk profiles. The options are structured to enable an evidence-based decision rather than a default choice.

Decision enabled: pick a preferred migration option (or decide to validate two in parallel); proceed to Evaluate Feasibility and Risk (L5) with a chosen path.


---

## 2) What we will do (scope and steps)
Description: Draft 2 to 3 options with pros, cons and assumptions, using pilot-scope bands.

Sub tasks:
1. Define the migration context: what is being migrated (component, service, data store?), what are the current constraints (hosting, licensing, compliance, team skills?), and what is the target state (cloud, containerised, re-platformed?).
2. Use the AI assistant to generate 2-3 migration options. Typical options include: (a) containerise in place (Dockerise and orchestrate on current or new infrastructure), (b) lift and shift (move to cloud IaaS with minimal code change), (c) re-platform (adapt the application to use cloud-native services), (d) partial re-write (re-implement the riskiest or most problematic components). The options should reflect the specific system, not be generic templates.
3. For each option, document: (a) description (what does this involve?), (b) pros (benefits, risk reduction, modernisation progress), (c) cons (cost, complexity, skill gaps, timeline), (d) assumptions (what must be true for this option to work?), (e) effort estimate using pilot-scope bands (XS 1-2pd, S 3-5pd, M 6-10pd, L 11-16pd, XL 17-25pd) with confidence tags (High, Medium, Low).
4. Score each option against the identified constraints. Use a simple evaluation matrix: for each constraint (hosting, licensing, compliance, skills, timeline), rate each option as green (no issue), amber (manageable risk), or red (significant blocker).
5. Draft a recommendation narrative: which option best fits the constraints and goals? Why? What is the key risk of the recommended option?
6. Review with the Solution Architect and relevant stakeholders. Record the decision.
7. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from Migration Readiness Assessment (L5) for blocker context and Architecture Summary (L3) for system understanding. Outputs feed into Evaluate Feasibility and Risk (L5). Schedule in Week 2.

> **Out of scope:**
> - Delivery of the chosen migration path.
> - Detailed implementation planning (this activity selects the option, not plans the execution).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** review the system architecture, constraints, and dependencies to generate migration options tailored to the specific system rather than generic templates.
- **Generate:** produce structured option descriptions with pros, cons, assumptions, and effort estimates.
- **Retrieve and ground:** cross-reference options against the codebase, Architecture Summary, and dependency map to verify feasibility claims.
- **Human in the loop:** the Solution Architect validates each option for realism and completeness. Stakeholders participate in the decision.


---

## 4) Preconditions, access and governance
- Understanding of the current system architecture (Architecture Summary from L3, or equivalent context).
- Identified constraints: hosting, licensing, compliance, team skills, timeline.
- Read access to the target repository.
- Named reviewer (Solution Architect) available.
- ATRS trigger: Possibly, if the migration options involve moving to a new hosting platform. DPIA check: flag if any option involves changing how personal data is stored or processed.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| AI reasoning over artefacts | an enterprise LLM |  |
| Notes and reporting | Markdown, Confluence, Word, spreadsheets |  |
| Architecture and dependency context | Architecture Summary (L3), SBOM/dependency map | L1 |
| Not typically needed | code assistants (unless cross-referencing options against code), SCA tools, CI pipeline tools, container tools |  |


---

## 6) Timebox
Suggested: 2h for option generation, scoring, and drafting; 1h for review and revision. Total: 3h. Schedule in Week 2.


---

## 7) Inputs and data sources
- Architecture Summary (from L3, if available).
- Migration Readiness Assessment (from L5, if available).
- SBOM and dependency map (from L1, if available).
- System constraints: hosting environment, licensing terms, compliance requirements, team skills, timeline.
- Stakeholder priorities (if documented).
- If unavailable: if no architecture summary exists, the AI will generate options from repository analysis alone. Note this as a lower-confidence analysis.


---

## 8) Outputs and artefacts
- Migration options paper: 2-3 structured options with pros, cons, assumptions, effort estimates (pilot-scope bands), and confidence tags.
- Evaluation matrix: each option scored against identified constraints (green/amber/red per constraint).
- Recommendation narrative: which option and why.
- Time log entry for P1.

Audience: Solution Architect, Delivery Manager, senior stakeholders. This paper is a key input to the Evaluate Feasibility and Risk activity (L5).


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce the options paper with AI assistance. Compare against estimate for manual option analysis |
| **P2 Quality score** | reviewer rates the paper on the 1-5 rubric for completeness (all options well-described), realism (effort estimates and assumptions are reasonable), and usefulness (the paper enables a decision) |
| **P8 Reusable artefacts** | count the options paper template, evaluation matrix format, constraint scoring method |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI generates generic options**: the options may be boilerplate ("containerise, lift-and-shift, re-write") without reflecting the specific system's constraints | feed the AI the system architecture, dependency map, and constraints explicitly. Review each option for specificity |
| **Effort estimates are unreliable**: AI-generated effort estimates may not reflect real complexity | use pilot-scope bands (XS-XL) with confidence tags; validate estimates with engineers who know the system |
| **Options paper not used for decision-making**: the paper may be produced but bypassed in favour of an informal decision | schedule a decision meeting and use the evaluation matrix to structure the discussion |
| **Missing constraint discovery**: important constraints (licensing, compliance, data residency) may not be known at the time of analysis | include an "assumptions" section per option; flag areas where constraint confirmation is needed |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] 2-3 migration options are documented with pros, cons, assumptions, and effort estimates.
- [ ] Evaluation matrix scores each option against identified constraints.
- [ ] Recommendation narrative is drafted.
- [ ] Solution Architect has reviewed and approved the paper.
- [ ] Decision is recorded (option selected, or two options shortlisted for validation).
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of generating structured migration options; quality of the evaluation matrix and recommendation.
- **Prerequisites to document**: architecture context availability, constraint identification, stakeholder availability.
- **Limits and risks to document**: generic options, unreliable effort estimates, missing constraints.
- **Reusable assets**: options paper template, evaluation matrix format, effort estimation guidance (pilot-scope bands).

- **Department continuation**: reuse the options paper format and evaluation matrix for future migration decisions.

Pattern candidates:
- **"Constraint-scored options"**: scoring each option against identified constraints using a simple green/amber/red matrix makes the trade-offs immediately visible.
- **"System-specific option generation"**: feeding the AI the full architecture and dependency context produces options tailored to the system rather than generic migration patterns.

Anti-pattern candidates:
- **"Single-option analysis"**: presenting only the preferred option without alternatives makes it impossible to assess trade-offs. Always present at least two options.
- **"Effort estimates without confidence tags"**: presenting a single effort number without a confidence range (High/Medium/Low) implies false precision. Always include confidence tags.
- Limits and risks: record any failures or false positives.
- Reusable assets: prompts, templates, patterns for the library.