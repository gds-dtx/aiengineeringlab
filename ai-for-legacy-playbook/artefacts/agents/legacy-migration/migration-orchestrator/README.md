# Agent: Migration Orchestrator

## What this agent is for

Use this agent to **run and manage the migration lifecycle from Discover through Execution**.

It helps when you need to:
- initialize migration state
- enforce phase gates
- keep tracker files accurate and resumable

## When to use it

Use this agent when:
- you need to start or resume a migration
- you need phase control and tracker/state management

Do not use this agent when:
- you want to do the detailed implementation work yourself

## Before you run this

- You have: migration ID, target systems, and repo context
- You know: the build and test commands
- You can provide: human approvals at phase gates

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Migration Orchestrator**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Start migration dsit-migration-001 for Payments API.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- target_systems: [Payments API, Case Portal]
- build_command: npm test
- test_command: npm run test:all
```

## Inputs

Required:
- `migration_id`
- `target_systems`

Optional:
- `build_command`
- `test_command`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/state.yaml`
  - `.github/migrations/<migration-id>/tracker.md`
- Output format: YAML + Markdown tracker
- Status updates include:
  - current phase and gate status
  - ready work and blockers
  - next human action

## Example output

```text
## Migration Status
- Phase: Test
- Gate: waiting for human sign-off
- Ready: baseline tests and evidence review
- Blocked: target preferences still need approval

## Next Action
1. Review the test evidence
2. Confirm test-suite sign-off
```

## After you run this

- Review the current phase and blockers.
- Open the tracker file for the full activity list.
- Resume from the same state files when the migration continues.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: keep state and tracker files as source of truth.
- This agent must not: advance a phase without the required artefacts.
- Human approval is required at: each phase gate.
