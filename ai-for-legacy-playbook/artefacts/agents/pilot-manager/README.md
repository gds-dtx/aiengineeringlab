# Agent: Pilot Orchestrator

## What this agent is for

Use this agent to **run and manage a pilot from start to finish** across one or more systems.

This agent is responsible for:
- creating and maintaining pilot tracking files
- enforcing phase gates before work moves forward
- validating that required evidence and artefacts exist

## When to use it

Use this agent when:
- you are starting or resuming a structured pilot
- you need clear status, blockers, and next actions across phases

Do not use this agent when:
- you want detailed technical execution of a single activity inside this repo

## Before you run this

- You have: pilot identifier and in-scope system list
- You know: where LITRAF reports are stored (if available)
- You can provide: human approvals at required pilot gates

## How to invoke it

This is invoked by **switching to the Pilot Orchestrator agent first**, then entering your request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app of choice.
2. Switch to **Pilot Orchestrator**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Initialize pilot dsit-pilot-001.
```

### What to type when you need context

```text
- pilot_id: dsit-pilot-001
- target_systems: [Payments API, Case Portal]
- litraf_reports: [.github/pilots/dsit-pilot-001/litraf-reports/payments.md]
```

## Inputs

Required:
- `pilot_id`: unique pilot identifier
- `target_systems`: one or more systems in scope

Optional:
- `litraf_reports`: per-system report paths (if available)
- discovery notes: used when reports are missing

## What you will get (output)

- Main output file/path:
  - `.github/pilots/<pilot-id>/state.yaml`
  - `.github/pilots/<pilot-id>/tracker.md`
- Output format: YAML + Markdown tracker + phase artefacts
- Status updates include:
  - current phase and gate status
  - completed and ready activities
  - blockers and required human actions

## Example output

```text
## Current Status
- Pilot: dsit-pilot-001
- Phase: Prepare
- Gate Status: Prepare in-progress
- Completed:
  - created `.github/pilots/dsit-pilot-001/state.yaml`
  - created `.github/pilots/dsit-pilot-001/tracker.md`
  - registered target systems: Payments API, Case Portal
- Ready Activities:
  - P1-collect-baseline-metrics
  - P2-capture-hypotheses
- Waiting on Human:
  - upload LITRAF report for Case Portal
  - confirm pilot success criteria for Evaluate phase

## Next Action
1. Add missing report at `.github/pilots/dsit-pilot-001/litraf-reports/case-portal.md`
2. Confirm whether discovery artefact should be used as temporary substitute
```

## After you run this

- Review the current phase and the waiting-on-human items.
- Open the tracker file if you need the full activity list.
- Add any missing artefacts before expecting the next gate to pass.
- Resume the pilot from the same state file when the blocker is cleared.
- If the output is insufficient or not of good enough quality, tell your AI assistant what is wrong or what you want improved and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: use tracker/state files as source of truth.
- This agent must not: mark activities complete without validated artefacts.
- Human approval is required at: phase gates and report sign-off points.
