# Skill: Generic System Documentation Generation

## What this skill is for

Use this skill to **turn an existing documentation gap analysis into a single evidence-linked system document**.

It helps when you need to:
- produce one canonical system document
- keep claims tied to repository evidence
- convert analysis into a shareable artefact

## When to use it

Use this skill when:
- you already have a gap analysis report
- you want a final system document rather than a gap list

Do not use this skill when:
- you have not done the gap analysis yet
- the source report is missing

## Before you run this

- You have: a completed gap analysis report
- You know: the system name and output path
- You can provide: the source report and supporting evidence

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Generic System Documentation Generation** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Generic System Documentation Generation skill for the Case Portal repository.
```

### What to type when you have inputs

```text
Use the Generic System Documentation Generation skill with:
- source report: exec-case-portal-documentation-gap-analysis.md
- system: Case Portal
```

## Inputs

Required:
- `source report`
- `system`

Optional:
- `output path`

## What you will get (output)

- Main output file/path: a system documentation Markdown artefact in the documented execute path
- Output format: Markdown
- Key sections included:
  - system overview
  - architecture
  - gaps and questions

## Example output (shape)

```text
# Case Portal System Documentation
## System Overview
- Case Portal is a React and .NET application for case handling.

## Gaps and Questions
- No explicit rollout plan found for new joiners.
```

## After you run this

- Review the final document for unsupported claims.
- Share it with the team as the system reference.
- Update the source gap analysis if new evidence appears.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
