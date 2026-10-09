# Skill: Generic Documentation Gap Analysis

## What this skill is for

Use this skill to **find missing, stale, or unclear documentation and turn it into a prioritized gap register**.

It helps when you need to:
- reduce delivery and onboarding risk
- compare docs coverage across systems
- produce outputs for downstream docs or test planning work

## When to use it

Use this skill when:
- you need a structured documentation review
- you want gaps ranked by risk and onboarding impact

Do not use this skill when:
- you only need a one-off README edit
- you are not ready to collect evidence from the repo

## Before you run this

- You have: the system scope and documentation sources
- You know: the stakeholders or owners
- You can provide: in-repo evidence only

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Generic Documentation Gap Analysis** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Generic Documentation Gap Analysis skill for the Case Portal repository.
```

### What to type when you have inputs

```text
Use the Generic Documentation Gap Analysis skill with:
- system: Case Portal
- evidence: repo docs, ADRs, runbooks, and tests
```

## Inputs

Required:
- `system`
- `evidence`

Optional:
- `stakeholders`

## What you will get (output)

- Main output file/path: a documentation gap analysis report in the documented execute path
- Output format: Markdown
- Key sections included:
  - gap register
  - prioritized backlog
  - downstream feeds

## Example output (shape)

```text
# Case Portal Documentation Gap Analysis
## Top Gaps
- No rollback runbook.
- No current architecture diagram.

## Priority
- P0: rollback runbook
- P1: architecture diagram
```

## After you run this

- Review the high-priority gaps with the system owner.
- Turn the output into a docs or test backlog.
- Add missing evidence and rerun as the system changes.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
