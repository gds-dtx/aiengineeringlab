# Agent: Target Architecture and Intent

## What this agent is for

Use this agent to **define the intended end state of a legacy system before migration work starts**.

It helps when you need to:
- capture the architecture direction
- decide upgrade vs rewrite vs replace
- record the constraints and success measures

## When to use it

Use this agent when:
- Discover is complete and you need Target phase artefacts
- you want an explicit architecture decision before planning

Do not use this agent when:
- the target direction has not been discussed yet
- you need implementation tasks rather than intent

## Before you run this

- You have: Discover outputs and system context
- You know: the target systems and constraints
- You can provide: approval decisions from the human owner

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Target Architecture and Intent**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Define the target architecture intent for migration dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- discover artefacts: discover/product-features.md, discover/context.md
- decision: upgrade vs rewrite vs replace
```

## Inputs

Required:
- `migration_id`
- Discover artefacts

Optional:
- `decision hints`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/target/context.md`
  - `.github/migrations/<migration-id>/target/architecture.md`
  - `.github/migrations/<migration-id>/target/preferences.md`
  - `.github/migrations/<migration-id>/target/adrs/`
  - `.github/migrations/<migration-id>/target/nfrs.md`
- Output format: Markdown
- Status updates include:
  - architecture intent
  - trade-offs
  - approval needed

## Example output

```text
## Target Status
- Decision: upgrade with minimal behavioural change
- Completed: architecture intent and preferences drafted
- Waiting on: human approval

## Next Action
1. Review preferences.md
2. Confirm the architecture direction
```

## After you run this

- Review the target artefacts with the human owner.
- Do not move to Test until the target direction is approved.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: make architecture intent explicit.
- This agent must not: skip approval gates.
- Human approval is required at: Target completion.
