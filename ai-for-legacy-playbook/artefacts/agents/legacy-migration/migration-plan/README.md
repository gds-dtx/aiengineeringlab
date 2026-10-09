# Agent: Migration Plan

## What this agent is for

Use this agent to **create the implementation plan for the approved migration target**.

It helps when you need to:
- sequence the build work
- record version uplifts and containerisation steps
- produce a practical plan for execution

## When to use it

Use this agent when:
- the target spec is approved
- you need a build plan, not just a target description

Do not use this agent when:
- the target spec is not ready
- you need to implement the migration right away

## Before you run this

- You have: approved target-spec.md
- You know: the runtime and container constraints
- You can provide: the test expert report and baseline evidence

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Migration Plan**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Create the migration plan for dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- target_spec: planning/target-spec.md
- baseline_evidence: test/baseline-evidence.md
- constraints: container build and ported test suite
```

## Inputs

Required:
- `migration_id`
- `target_spec`
- `baseline_evidence`

Optional:
- `constraints`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/planning/plan.md`
  - `.github/migrations/<migration-id>/planning/version-uplift-inventory.md`
  - `.github/migrations/<migration-id>/planning/containerization-plan.md`
- Output format: Markdown
- Status updates include:
  - plan sequence
  - uplift inventory
  - container readiness

## Example output

```text
## Planning Status
- Completed: implementation sequence and uplift inventory drafted
- Waiting on: human approval

## Next Action
1. Review plan.md
2. Approve the implementation sequence
```

## After you run this

- Review the plan with the human owner before Execution.
- Do not start implementation until the plan is approved.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: produce a buildable sequence.
- This agent must not: start Execution early.
- Human approval is required at: Planning completion.
