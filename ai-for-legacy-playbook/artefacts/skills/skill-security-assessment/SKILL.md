---
name: skill-security-assessment
description: |
  Performs a security risk assessment on AI agent skills (compatible with Copilot, Claude,
  and other LLM-based agent systems) before installation or sharing with teams. Evaluates
  permissions, data flows, code execution surface, prompt-injection exposure, sensitive-data
  handling, supply-chain risk, and agency scope against OWASP Top 10 for LLM Applications (2025)
  and MITRE ATLAS. Produces a weighted risk score (0-100), severity rating (Critical/High/Medium/Low),
  and install recommendation (Block / Review Required / Approve with Conditions / Approve).
  Maintains configurable allowlist files (for example <governance_root>/approved-skills.md and
  <governance_root>/blocked-skills.md) based on 
  assessment results; checks for prior assessments and verifies with user before reassessment if no changes detected.
  Use when user asks to "assess this skill", "security review this skill",
  "is this skill safe to install", "vet this skill", "score this skill", 
  "audit skill security", or "threat model this skill".
  Do NOT use for auditing prompt quality or skill authoring best practices - use
  dedicated linting tools. Do NOT use for MCP server or connector security -
  this skill covers AI agent skill packages only.
license: MIT
compatibility: |
  Cross-platform. Works with any AI agent skill format (Copilot, Claude, etc.).
  Requires local file access to skill directory. Performs static analysis only.
argument-hint: 'Required: path to skill directory or skill manifest file. Optional: --save-to-docs, governance_root, assessment_root, approved_skills_file, blocked_skills_file.'
metadata:
  version: "1.0"
  supported-platforms: ["GitHub Copilot", "Claude", "Generic AI Agents"]
  assessment-framework: ["OWASP LLM Top 10 (2025)", "MITRE ATLAS", "STRIDE"]
---

## Overview

This skill assesses AI agent skills against a standardised security rubric before
installation into team workspaces. Compatible with Copilot, Claude, and other LLM-based
agent systems. It grounds every finding in retrievable evidence (file contents, manifest
claims, script source) and rejects speculation - if a file cannot be read, that fact is
recorded rather than assumed benign. Assessment reports are saved to `<assessment_root>/<skill-name>/assessment/`
when using the `--save-to-docs` flag.

**Framework basis:**
- **OWASP Top 10 for LLM Applications (2025)** - LLM01 Prompt Injection, LLM02 Sensitive
  Information Disclosure, LLM03 Supply Chain, LLM05 Improper Output Handling,
  LLM06 Excessive Agency, LLM08 Vector & Embedding Weaknesses, LLM09 Misinformation.
- **MITRE ATLAS** - adversarial tactics for AI systems (initial access, execution,
  exfiltration).
- **STRIDE** - threat categorisation (Spoofing, Tampering, Repudiation, Information
  Disclosure, Denial of Service, Elevation of Privilege).
- **CVSS-style weighting** - dimensions scored 0-10 then weighted to a 0-100 total.

## When to Use

- Evaluating skills from awesome-copilot, awesome-claude, GitHub, or any third party source
- Pre-install gate before adding skills to any AI agent system (Copilot, Claude, etc.)
- Periodic review of already-installed team skills
- Triage after a maintainer publishes a new version of a skill
- Building an approved-skill allowlist for the team
- Generating assessment reports in `<assessment_root>/<skill-name>/assessment/` for documentation

## When NOT to Use

- Reviewing vendor-managed built-in agent skills - those are outside scope
- Authoring-quality audit (prompt clarity, trigger phrases, code style) - use dedicated linting tools
- MCP server or connector vetting - different threat model and trust boundary
- General application security review unrelated to skill packaging/distribution

## Quick Start

```
User: "Assess this skill for me" + [pastes SKILL.md / points to path / provides repo URL]
0. Check for prior assessments and verify no changes, offer to skip reassessment if appropriate
1. Locate the skill artefacts (SKILL.md + scripts/ + references/)
2. Extract the evidence table (permissions, endpoints, scripts, claims)
3. Score each of the 8 risk dimensions (0-10) against the rubric
4. Compute weighted total (0-100) and severity band
5. Produce the Assessment Report with findings, evidence, and recommendation
6. Update configured approved/blocked skills files if user opts in
```

## Core Instructions

### Phase 0: Prior Assessment Check

Before scoring, check if an assessment already exists for this skill.

1. **Locate prior assessment** at `<assessment_root>/<skill-name>/assessment/`:
   - If `report.md` exists, read it and extract:
     - Original assessment date
     - Previous severity and recommendation
     - Previous dimensions scores

2. **Determine if skill has changed** by comparing:
   - Manifest file hash/content (has SKILL.md, skill.yml been modified?)
   - Script file count and sizes (do scripts/ still contain the same files?)
   - References directory (do references/ match?)
   - Any `.md` documentation in the skill root
   
   Use file modification time or content hash to detect changes.

3. **If no changes detected:**
   - Present the prior assessment to user with timestamp
   - Ask: "An assessment for this skill already exists from [DATE] with verdict [SEVERITY/RECOMMENDATION]. Files appear unchanged. Would you like to:\n  (a) View the existing assessment\n  (b) Run a new assessment anyway\n  (c) Cancel"
   - If user selects (a), display the prior report and skip to Phase 6
   - If user selects (b), proceed to Phase 1
   - If user selects (c), stop

4. **If changes detected:**
   - Alert user: "Files have changed since assessment on [DATE]. Running fresh assessment."
  - Create timestamped backup: `<assessment_root>/<skill-name>/assessment/.previous/<skill-name>-<timestamp>.md`
   - Proceed to Phase 1

### Phase 1: Intake & Artefact Discovery

Before scoring, gather every file the skill ships with. Do not score a skill from
its description alone - read the actual files.

1. **Determine the input type** and normalise to a local path list:
  - Pasted manifest file content (SKILL.md, skill.yml, etc.) -> save to `<assessment_root>/assessment/manifest`
   - Local path (skill directory or file path) -> read directly
   - GitHub/awesome-copilot/awesome-claude URL -> ask the user to download and upload the skill folder
     (or paste the raw files). Do not fabricate file contents from URLs.
   - Archive (.zip) -> ask the user to extract first.
2. **Enumerate the package** with `Glob` over the skill root:
   - `SKILL.md` (required)
   - `scripts/**/*` (any language)
   - `references/**/*`
   - Any file outside these conventions -> **flag as anomaly** (score penalty).
3. **Read every file.** If any file cannot be read, record `UNVERIFIED` for the
   affected dimension rather than assuming it is benign.

### Phase 2: Evidence Extraction

For each artefact, extract and tabulate the following evidence. Keep quotes short
and cite line numbers.

| Evidence Item | Where to Look | Example |
|---------------|---------------|---------|
| Declared triggers | manifest `description` or equivalent | "send email", "post message" |
| Declared category | manifest metadata or README | `communication`, `productivity` |
| Tool/MCP calls named | SKILL.md body + scripts | `SendEmailWithAttachments`, `PostMessage` |
| Bash commands | SKILL.md body + scripts | `curl`, `rm`, `pip install` |
| Network endpoints | scripts (URLs, hosts) | `https://api.example.com/webhook` |
| File paths written | SKILL.md + scripts | `/mnt/user-config/...`, `output/...` |
| Credentials/secrets | scripts, env var reads | `os.environ["API_KEY"]` |
| Dynamic code | scripts | `eval`, `exec`, `subprocess`, obfuscated strings |
| External downloads | scripts | `pip install`, `wget`, `git clone` |
| Scheduled prompts | `SetupScheduledPrompt` usage | recurring execution |
| Data exfil paths | network + file writes | POST to non-M365 host |
| Claims vs behaviour | description text vs scripts | e.g. "read-only" but calls `DeleteMessage` |

### Phase 3: Scoring Dimensions

Score each dimension 0-10 where **0 = no risk, 10 = maximum risk**. Apply the
listed weight to compute the contribution to the total. Always cite the evidence
that drives the score.

| # | Dimension | Weight | OWASP/ATLAS Mapping |
|---|-----------|:------:|---------------------|
| 1 | Permission Scope | 15% | LLM06 Excessive Agency |
| 2 | Data Egress | 20% | LLM02 Sensitive Info Disclosure, LLM03 Supply Chain, STRIDE-I |
| 3 | Code Execution | 15% | LLM05 Improper Output Handling, ATLAS Execution, STRIDE-T/E |
| 4 | Prompt Injection Surface | 10% | LLM01 Prompt Injection |
| 5 | Sensitive Data Handling | 10% | LLM02 |
| 6 | Supply Chain | 10% | LLM03 Supply Chain |
| 7 | Agency & Autonomy | 10% | LLM06, LLM05 Improper Output Handling |
| 8 | Transparency & Intent Integrity | 10% | LLM09 Misinformation, STRIDE-R |

**Dimension rubrics:**

**1. Permission Scope** - which tool families does the skill invoke?
- 0-2: Read-only, single domain (e.g. just `ListCalendarView`)
- 3-5: Read across domains, no writes
- 6-8: Writes scoped to M365 (send email, create events)
- 9-10: Destructive writes (delete, cancel, bulk modify), cross-domain writes, or
  bash with filesystem modification outside `output/`/`working/`.

**2. Data Egress** - where does data leave to?
- 0-2: Stays within the agent's local environment only
- 3-5: Writes to `output/` or designated local directories only (user-visible, expected)
- 6-8: Calls external third-party APIs with user content as payload
- 9-10: POSTs to hard-coded third-party webhooks, ingests + transmits PII, or uses
  obfuscated/dynamic URLs to exfiltrate data.

**3. Code Execution** - what runs on the host?
- 0-2: No scripts, pure instructions
- 3-5: Scripts limited to pure functions / data transformation
- 6-8: Shell execution, file system writes, package installs from pinned versions
- 9-10: `eval`/`exec`, dynamic imports, unpinned installs, root/privileged calls,
  base64-decoded-then-executed payloads.

**4. Prompt Injection Surface** - how much untrusted text reaches the model?
- 0-2: No external text ingested
- 3-5: Ingests user-owned M365 content only (inherent trust boundary)
- 6-8: Ingests public web content, attachments, or third-party feeds without
  sanitisation guidance
- 9-10: Feeds retrieved content directly into tool-calling decisions with no
  confirmation gate (OWASP LLM01 high-risk pattern).

**5. Sensitive Data Handling** - PII, secrets, credentials
- 0-2: Does not touch sensitive fields
- 3-5: Reads sensitive data but keeps it in-tenant
- 6-8: Logs sensitive data to files or stdout without redaction
- 9-10: Transmits secrets off-host, reads env vars for credentials, or stores
  tokens unencrypted.

**6. Supply Chain** - external dependencies
- 0-2: Standard library only, no fetches
- 3-5: Named, pinned dependencies from well-known registries
- 6-8: Unpinned dependencies, multiple third-party registries
- 9-10: Fetches and runs code from arbitrary URLs at invocation time, typosquat
  candidates, or dependency names mimicking known packages.

**7. Agency & Autonomy** - confirmation gates and blast radius
- 0-2: Every write or external call is user-confirmed
- 3-5: Confirmation required for destructive operations only
- 6-8: Auto-send/auto-post without user confirmation gates
- 9-10: Scheduled/recurring operations with destructive capability, bulk actions without
  limits, or no confirmation gates anywhere.

**8. Transparency & Intent Integrity** - does behaviour match claims?
- 0-2: Description matches scripts exactly, scope bounded
- 3-5: Minor mismatch (claims read-only, does harmless writes)
- 6-8: Undeclared capabilities (e.g. network calls not mentioned)
- 9-10: Active deception (claims one thing, does another), obfuscated strings,
  hidden triggers, overly broad description to capture unintended prompts.

### Phase 4: Score Computation & Severity Band

Compute: `total_score = SUM(dimension_score x weight) x 10` -> scale 0-100 where
**higher = higher risk**.

| Total | Severity | Recommendation |
|:-----:|----------|----------------|
| 0-19  | **Low**      | Approve |
| 20-39 | **Medium**   | Approve with Conditions (document mitigations) |
| 40-69 | **High**     | Review Required (human security sign-off before install) |
| 70-100| **Critical** | Block (do not install) |

**Automatic Block conditions** (override numeric score to Critical):
- Any dimension scored 9-10 in Code Execution, Data Egress, Supply Chain, or
  Transparency
- Presence of `eval` / `exec` / base64-decoded execution in scripts
- Hard-coded credentials or tokens
- Network egress to non-allowlisted domains carrying user content
- Active deception between description and behaviour
- Any file cannot be read AND it would materially change the score - mark
  `UNVERIFIED` and refuse to approve

### Phase 5: Assessment Report

Present the report in this exact structure:

```markdown
# Skill Security Assessment - {skill-name}

**Source:** {path or provided location}
**Assessed:** {current date}
**Framework:** OWASP LLM Top 10 (2025), MITRE ATLAS, STRIDE

## Verdict
- **Overall score:** {total}/100
- **Severity:** {Low|Medium|High|Critical}
- **Recommendation:** {Approve | Approve with Conditions | Review Required | Block}

## Dimension Scores

| # | Dimension | Score | Weight | Contribution | Evidence |
|---|-----------|:-----:|:------:|:------------:|----------|
| 1 | Permission Scope | x/10 | 15% | x.x | ... |
| 2 | Data Egress | x/10 | 20% | x.x | ... |
| ... |

## Key Findings

### Critical / High Issues
- **[ID]** {finding} - *evidence*: {quote + file:line}
  - **Impact:** {what could go wrong}
  - **Mitigation:** {what would make this acceptable}

### Medium / Low Issues
- ...

## Required Conditions (if Approve with Conditions)
- [ ] {specific change, e.g. "remove hard-coded webhook URL"}
- [ ] {e.g. "add user confirmation before PostMessage"}

## Unverified Areas
- {anything that could not be read or determined; why it matters}

## Automatic Block Triggers Fired
- {none} OR {list}
```

### Phase 6: Assessment Report Output & Allowlist Maintenance

When `--save-to-docs` flag is provided, save the assessment report to:
```
<assessment_root>/<skill-name>/assessment/
|-- report.md                  # Full assessment report (markdown)
|-- dimension-scores.json      # Structured dimension scores for tracking/trending
|-- verdict.json               # Quick-reference verdict (platform-agnostic JSON)
|-- manifest-copy.{yml,md}     # Copy of original skill manifest for reference
`-- .previous/                 # Archive of prior assessments (auto-created if reassessment)
    `-- <skill-name>-<timestamp>.md
```

If the skill is **Blocked** or **Review Required**, also create:
- `docs/skills/<skill-name>/assessment/BLOCKERS.md` - detailed block reasons and evidence

#### Allowlist Maintenance Workflow

After producing the assessment report, based on the recommendation, offer to record the skill:

**If Severity = Low (0-19) and Recommendation = "Approve":**
- Ask user: "Add this skill to `<approved_skills_file>`?"
- If yes, append row to `<approved_skills_file>` with format:
  ```
  | skill-name | version | assessed-date | severity | recommendation | notes |
  | --- | --- | --- | --- | --- | --- |
  | {name} | {version or "unversioned"} | {YYYY-MM-DD} | Low | Approve | [link to assessment] |
  ```
- Create row if file doesn't exist with header

**If Severity = Medium (20-39) and Recommendation = "Approve with Conditions":**
- Ask user: "Record conditional approval in `<approved_skills_file>`?"
- If yes, append with note containing required conditions and link to BLOCKERS.md

**If Severity = High (40-69) and Recommendation = "Review Required":**
- Ask user: "Record for review in `<blocked_skills_file>`?"
- If yes, append with format:
  ```
  | skill-name | version | assessed-date | severity | reason | link |
  | --- | --- | --- | --- | --- | --- |
  | {name} | {version or "unversioned"} | {YYYY-MM-DD} | High | Review Required | [link to BLOCKERS.md] |
  ```

**If Severity = Critical (70-100) or Recommendation = "Block":**
- Auto-alert user: "This skill is recommended for BLOCK. Consider adding to `<blocked_skills_file>`."
- Ask user: "Add to blocked-skills.md with block reason?"
- If yes, append with reason from BLOCKERS.md

**Files maintain this structure:**
```
<governance_root>/
|-- approved-skills.md         # Table of approved skills (read-only tracking)
|-- blocked-skills.md          # Table of blocked/review-required skills (read-only tracking)
`-- <skill-name>/
    `-- assessment/
        |-- report.md
        |-- verdict.json
        `-- ...
```

Output format is platform-agnostic JSON/YAML to support any AI agent system.
Never modify the installed skills directory - assessment is a read-only, non-modifying operation.

## Guardrails

- **Evidence-led only.** Every finding must cite a file path, line number, and
  short quote. Never invent capabilities from the description alone.
- **Prior assessment deduplication.** Always check for existing assessments before running
  a new one. If files are unchanged, present the prior report first and ask user to confirm
  they want to reassess. This saves time and avoids duplicate effort.
- **Change detection accuracy.** When comparing current state to prior assessment, check
  file hashes, modification times, file counts, and directory structure. Minor whitespace
  changes in comments don't require reassessment; code logic changes do.
- **Refuse to score from URLs.** If given a link (GitHub, GitLab, etc.), ask the user
  to download the files locally first. Do not fabricate repository contents from URLs.
- **Unverified != safe.** A file that cannot be read is scored as the worst plausible
  value for its dimension, not the best.
- **No execution.** Never execute the skill's code or scripts as part of assessment -
  static analysis only. Running potentially malicious code would replicate the exact
  harm being assessed.
- **No credential prompts.** If the skill appears to need secrets to evaluate,
  stop and flag it - do not request credentials from the user to "test" it.
- **Present the full report.** Do not truncate findings to make a skill look acceptable;
  surface every High/Critical finding, even if numerous.
- **User opt-in for allowlist.** Never auto-add skills to approved-skills.md or blocked-skills.md
  without explicit user consent. Always ask with clear context (severity, recommendation).
- **Allowlist as read-only tracking.** The approved-skills.md and blocked-skills.md files
  are user-facing allowlist records, not configuration files. Do not delete or modify entries
  from these lists - they serve as team decision history.
- **User as asset owner.** When findings conflict with the user's stated desire to use
  a skill, escalate the risk clearly rather than soften the recommendation.
- **Reproducibility.** Two runs of this skill on identical skill files must produce the
  same severity band and findings. If scoring feels ambiguous, prefer the higher-risk
  score and document the ambiguity explicitly.

## Allowlist File Format and Maintenance

### <approved_skills_file>

Maintains a record of approved skills that have passed security assessment. Example format:

```markdown
# Approved Skills

| Skill Name | Version | Assessed Date | Severity | Recommendation | Assessment Link | Notes |
|---|---|---|---|---|---|---|
| acquire-codebase-knowledge | 1.3 | 2026-04-22 | Low | Approve | [assessment](acquire-codebase-knowledge/assessment/report.md) | Read-only discovery, no external calls |
| my-email-skill | 2.1 | 2026-04-20 | Medium | Approve with Conditions | [assessment](my-email-skill/assessment/report.md) | Requires user confirmation before send |
```

**File management:**
- Create file on first approval entry
- Append new rows for each approved skill
- Do NOT delete rows - assessments are permanent records
- If a skill is re-assessed and verdict changes, add a new row with updated date/severity
- Keep file sorted by assessment date (newest first) or by skill name

### <blocked_skills_file>

Maintains a record of skills that are blocked or require review. Example format:

```markdown
# Blocked or Review-Required Skills

| Skill Name | Version | Assessed Date | Severity | Status | Reason | Evidence Link |
|---|---|---|---|---|---|---|
| malicious-exfil-skill | 1.0 | 2026-04-21 | Critical | Block | Hard-coded credentials, network egress to external webhooks | [evidence](malicious-exfil-skill/assessment/BLOCKERS.md) |
| unreviewed-skill | 0.5 | 2026-04-19 | High | Review Required | Destructive file operations without confirmation gates | [evidence](unreviewed-skill/assessment/BLOCKERS.md) |
```

**File management:**
- Create file on first blocked/review-required entry
- Append new rows for each blocked skill
- Do NOT delete rows - decisions are permanent records
- If a skill is re-assessed after fixes and now approved, keep row and add comment: "(Reassessed 2026-04-25: now APPROVED)"
- Keep file sorted by severity (Critical first) then by assessment date

### Shared Metadata Fields

Both allowlist files should include:
- **Skill Name:** Exact name from skill manifest
- **Version:** Version from skill metadata, or "unversioned" if not present
- **Assessed Date:** ISO format (YYYY-MM-DD)
- **Severity:** Low | Medium | High | Critical
- **Assessment Link:** Relative link to report.md or BLOCKERS.md
- **Notes/Reason:** Brief one-line summary of verdict or key finding

### Handling Version Updates

If the same skill name is assessed again with a different version:
- Add a new row with the new version, new assessment date, and new severity/recommendation
- Do NOT overwrite previous entries - keep full history
- This creates a version audit trail for team reference

## References

**Frameworks:**
- **OWASP Top 10 for LLM Applications (2025):** Prompt injection, sensitive info
  disclosure, supply chain, improper output handling, excessive agency, vector injection,
  insecure plugin design, misinformation/hallucinations.
- **MITRE ATLAS (Adversarial Threat Landscape for AI Systems):** Adversarial tactics,
  techniques, and procedures specific to AI/LLM systems.
- **NIST AI RMF (Artificial Intelligence Risk Management Framework):** Govern, map,
  measure, and manage AI system risks.
- **STRIDE (Microsoft SDL):** Threat categorisation for software security.
- **CVSS 4.0:** Weighted scoring methodology for risk quantification.

**Compatibility:**
This skill's assessment framework is platform-agnostic and applies to any AI agent
skill format (GitHub Copilot, Claude, Anthropic Claude API, or custom LLM agents).
