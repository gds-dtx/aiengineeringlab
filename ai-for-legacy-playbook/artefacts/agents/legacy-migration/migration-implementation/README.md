# Agent: Migration Implementation

## What this agent is for

Use this agent to **build the migrated system in a self-contained output folder**.

It helps when you need to:
- scaffold the migrated-system folder
- port tests red-first, then implement until green
- add container artefacts and execution evidence

## When to use it

Use this agent when:
- planning is approved
- you need to execute the migration

Do not use this agent when:
- the plan is not approved
- the baseline test suite has not been signed off

## Before you run this

- You have: approved plan and target spec
- You know: the test suite and container expectations
- You can provide: the signed-off baseline evidence

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Migration Implementation**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Implement migration dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- plan: planning/plan.md
- target_spec: planning/target-spec.md
- baseline_evidence: test/baseline-evidence.md
```

## Inputs

Required:
- `migration_id`
- `plan`
- `target_spec`
- `baseline_evidence`

Optional:
- `tech stack`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/execution/migrated-system/`
  - `.github/migrations/<migration-id>/execution/implementation-outcome.md`
- Output format: source files + Markdown evidence
- Status updates include:
  - red/green test progress
  - container readiness
  - planned deltas or blockers

## Example output

```text
## Execution Status
- Phase: red test port complete
- Completed: migrated-system scaffolded
- Waiting on: OpenRewrite uplift approval

## Next Action
1. Review implementation-outcome.md
2. Confirm container build passes
```

## After you run this

- Review the output folder and the implementation outcome report.
- Check that the ported tests are green and the container passes.
- Review any deliberate deltas before marking execution complete.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: start with test porting and evidence.
- This agent must not: invent new tests for self-evaluation.
- Human approval is required at: deliberate-delta review and execution gate.
