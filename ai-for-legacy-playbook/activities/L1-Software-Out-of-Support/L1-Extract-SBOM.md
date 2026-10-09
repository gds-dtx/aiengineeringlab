# Activity: Extract SBOM (L1)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 1-1.5h |
| **Phase** | Assess (Week 1, Days 3-5) |
| **Inputs** | Repository, manifests, lockfiles |
| **Key output** | SBOM file + compatibility note |
| **Hub activity** | Yes (feeds L5, L6) |

---

## 1) Why this activity (value and decision)
Legacy systems often carry unknown or end-of-life dependencies that silently increase change risk. Without a current software bill of materials, teams cannot say which components are unsupported, which have known vulnerabilities, or in what order to upgrade. This activity produces that evidence in under two hours so the team can make a defensible upgrade-versus-rewrite decision and sequence remediation by risk.

Decision enabled: approve a prioritised remediation plan and confirm whether the codebase is a candidate for incremental upgrade or requires a broader rewrite assessment.


---

## 2) What we will do (scope and steps)
Description: Generate a per-repo SBOM, analyse support status and risk, and prepare succinct outputs that feed upgrade planning and exemplar pull requests.

Sub tasks:
1. Confirm target repository paths and manifest files (e.g. package.json, pom.xml, requirements.txt, .csproj) with the department contact.
2. Run the SBOM export tool against the repository. For mono-repos, run per module and merge outputs.
3. Store the raw SBOM (SPDX JSON or CycloneDX format) in the evidence area with a timestamp.
4. Feed the SBOM into an AI assistant and prompt it to: (a) flag components past end-of-life or approaching EOL within 12 months, (b) identify version conflicts between transitive dependencies, (c) surface licence risks (e.g. copyleft in a proprietary context).
5. Cross-check AI findings against any prior vulnerability reports provided by the department.
6. Draft a one-page compatibility and upgrade-order note: list components grouped by risk (critical, moderate, low), state the recommended upgrade sequence, and note any platform prerequisites (e.g. minimum runtime version).
7. Shortlist 2-3 high-value dependencies as candidates for the Exemplar Upgrade PRs activity (L1).
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** this activity feeds directly into Dependency and Compatibility Mapping and Exemplar Upgrade PRs. Run it early in the pilot (Days 3-5 of Week 1).

> **Cross-type links:** the SBOM output is also consumed by activities in other legacy types:
> - L5: Migration Readiness Assessment, Generate Migration Options (dependency inventory for migration feasibility).
> - L6: Triage SAST/SCA (dependency context for vulnerability triage).
> If the pilot covers L1 alongside L5 or L6, the SBOM is a shared artefact; producing it once serves multiple activity chains.

> **Out of scope:**
> - Executing dependency upgrades (see Exemplar Upgrade PRs activity).
> - Full licence compliance audit beyond flagging obvious risks.
> - Remediation of vulnerabilities found (see L6 activities if applicable).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** parse the SBOM output, cross-reference component versions against known EOL dates and CVE databases, flag version conflicts between transitive dependencies, and identify licence incompatibilities.
- **Generate:** draft the one-page compatibility note, produce a ranked upgrade-order list, and create the dependency shortlist for exemplar PRs.
- **Retrieve and ground:** pull release notes, migration guides, and EOL announcements for flagged components to verify findings against authoritative sources.
- **Human in the loop:** an engineer validates AI-flagged items against the department's actual usage context before the note is finalised. The reviewer confirms the shortlist and upgrade sequence.


---

## 4) Preconditions, access and governance
- Read access to the target repository (or repositories) and their manifest/lockfiles.
- SBOM tooling installed or available in the department's CI environment.
- Named reviewer (Solution Architect or Tech Lead) confirmed and available within the timebox.
- If the SBOM output will feed a publishable report: run a quick DPIA check (does the SBOM reveal internal system names or configurations that should not be public?). ATRS trigger: No, unless SBOM findings will directly drive a public-facing remediation decision.
- Confirm the evidence area location and access permissions with the department before starting.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| SBOM generation | Microsoft SBOM Tool, Syft, CycloneDX CLI, Trivy | Must output SPDX or CycloneDX format |
| SCA and vulnerability cross-check | OWASP Dependency-Check, Snyk, Grype |  |
| AI reasoning and drafting | an enterprise LLM (e.g. GitHub Copilot Chat, Azure OpenAI, or equivalent) grounded on the SBOM output and component release notes |  |
| Notes and reporting | Markdown or spreadsheet for the compatibility note and shortlist; stored in the shared evidence area | e.g. SharePoint, Confluence, Git repo |


---

## 6) Timebox
Suggested: 1h for a single-module repository; 1.5h for a multi-module mono-repository. Schedule in Days 3-5 of Week 1 (Assess phase) so outputs are available for Dependency Mapping and Upgrade Planning in Week 2.

Expandability: this activity can be repeated per repository. Each additional repository adds approximately 1h (single-module) to 1.5h (mono-repo).

---

## 7) Inputs and data sources
- Repository URL(s) and branch to scan (confirm with department contact; default to main/trunk).
- Manifest and lockfiles: e.g. package.json + package-lock.json, pom.xml, requirements.txt + Pipfile.lock, .csproj + packages.lock.json.
- Any prior vulnerability or SCA reports the department already holds (for cross-check; request in Week 1 prep).
- Evidence area path and write permissions (confirm before starting).
- If unavailable: state the assumption (e.g. "manifests only, no lockfile available") and tag confidence as Low.


---

## 8) Outputs and artefacts
- SBOM file in SPDX JSON or CycloneDX format, committed to the evidence area.
- One-page compatibility and upgrade-order note (Markdown or Word): components grouped by risk tier (critical/moderate/low), recommended upgrade sequence, platform prerequisites, and confidence tag.
- Shortlist of 2-3 unsupported or high-risk components tagged as candidates for exemplar PRs.
- Time log entry (start and end timestamps) for P1 baseline calculation.

Audience: Solution Architect, Tech Lead, and pilot Delivery Manager. The compatibility note may also be shared with the department's architecture or security team.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record wall-clock time to produce the SBOM and compatibility note. Compare AI-assisted time against the department's estimate of how long this would take manually (capture the manual estimate during Week 1 baseline). Use median if repeated across repos |
| **P2 Quality score** | reviewer (Solution Architect or Tech Lead) rates the compatibility note on the 1-5 rubric for accuracy, completeness, and actionability |
| **P7 Vulnerability/risk reduction** | count of previously unknown EOL or vulnerable components surfaced by this activity. Compare against the department's prior known-risk baseline (zero if no prior SBOM existed) |
| **P8 Reusable artefacts** | count the SBOM export prompt/script, the analysis prompt template, and the compatibility note template if reusable |


Secondary (collect if available):
- **P3 Developer sentiment**: include in the post-pilot SPACE survey; no separate measurement for this activity alone.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Incomplete SBOM**: lockfiles missing or out of date, producing a partial component list | check for lockfile presence before running; if absent, note the gap and tag confidence as Low in the compatibility note |
| **False positives on EOL status**: AI may incorrectly flag a component as unsupported if its training data is stale | cross-check flagged components against the vendor's official release/support page; reviewer validates before the note is finalised |
| **Licence misclassification**: AI may misidentify licence type for components with non-standard licence files | spot-check the top 5 flagged licence risks against the actual licence text in the repository |
| **Data sensitivity**: SBOM output may reveal internal system architecture or component names that should not be published | store in the agreed evidence area with appropriate access controls; apply DPIA check before any external sharing |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] SBOM file (SPDX JSON or CycloneDX) is committed to the evidence area with a timestamp.
- [ ] All components are tagged as supported, approaching-EOL, EOL, or unknown.
- [ ] One-page compatibility and upgrade-order note has been reviewed and approved by the Solution Architect or Tech Lead.
- [ ] Shortlist of exemplar PR candidates is agreed.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated with this activity's results.
- [ ] Decision Log entry added if an upgrade-versus-rewrite recommendation is made.


---

## 12) Playbook contribution
- **Where AI helped**: time saving on SBOM analysis and risk classification versus manual triage; quality of the compatibility note compared to a manually drafted equivalent.
- **Prerequisites to document**: minimum repo access level, lockfile availability, SBOM tool installation.
- **Limits and risks to document**: any false positives on EOL status, licence misclassifications, or components the AI could not classify.
- **Reusable assets**: SBOM generation script/command, AI analysis prompt template, compatibility note template, upgrade-order note format.

- **Department continuation**: re-run on new repositories as they are onboarded, using the SBOM generation command and analysis prompt template. The process is designed for department self-service.

Pattern candidates:
- **"SBOM-first triage"**: generating the SBOM before any manual code review gives a faster, more complete risk picture. Record time saving and coverage.
- **"AI cross-reference for EOL"**: using AI to check component versions against known support timelines surfaces risks that manual scans often miss.

Anti-pattern candidates:
- **"Trusting AI EOL dates without verification"**: AI training data may be months behind actual vendor announcements. Always cross-check the top flagged items.
- **"SBOM without lockfiles"**: running SBOM generation on manifests alone (without lockfiles) produces an incomplete and potentially misleading component list.