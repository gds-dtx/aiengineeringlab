# Skill: Incident Analysis from Log Clustering

## What this skill is for

Use this skill to **turn a log clustering report into incident analysis and RCA notes**.

It helps when you need to:
- explain repeated failures in plain language
- turn clustered errors into likely root causes
- suggest observability and runbook improvements

## When to use it

Use this skill when:
- you have a log clustering report from the log-clustering skill
- you need a summary for incident follow-up or problem management

Do not use this skill when:
- you do not have log evidence
- you need a live incident commander workflow

## Before you run this

- You have: a clustering report or log summary
- You know: the incident or system scope
- You can provide: relevant timestamps or error families

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Incident Analysis from Log Clustering** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Incident Analysis from Log Clustering skill for the API outage log report.
```

### What to type when you have inputs

```text
Use the Incident Analysis from Log Clustering skill with:
- source report: execute/exec-api-outage-log-clustering.md
- scope: API outage on 2026-07-09
```

## Inputs

Required:
- `source report`: clustering or log report

Optional:
- `scope`: incident name or timestamp range

## What you will get (output)

- Main output file/path: an incident analysis Markdown report in the documented execute path
- Output format: Markdown
- Key sections included:
  - summary
  - recurring failure modes
  - probable causes
  - follow-up actions

## Example output (shape)

```text
# API Outage Incident Analysis
## Summary
- Most failures came from database timeout retries.

## Probable Cause
- Connection pool exhaustion during peak load.

## Recommended Next Steps
1. Add pool metrics to dashboards.
2. Update the rollback runbook.
```

## After you run this

- Review the proposed root cause before sharing it.
- Pass the follow-up actions to the service owner.
- Update runbooks or dashboards if the report highlights repeated gaps.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
