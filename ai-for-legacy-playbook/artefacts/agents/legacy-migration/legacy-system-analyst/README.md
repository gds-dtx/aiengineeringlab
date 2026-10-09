# Agent: Legacy System Analyst

## What this agent is for

Use this agent to **build a reviewable understanding of a legacy codebase from repository evidence**.

It helps when you need to:
- document a legacy system
- map source code, CI/CD, and manifests
- produce the Discover artefacts for a migration

## When to use it

Use this agent when:
- you are starting the Discover phase
- you need a system map without changing any code

Do not use this agent when:
- you want to implement the migration
- you only need a quick summary without evidence

## Before you run this

- You have: the repository path and migration ID
- You know: the target system or scope
- You can provide: access to source, manifests, and docs

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Legacy System Analyst**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Analyse the Payments API repository and produce Discover artefacts for migration dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- target_system: Payments API
- scope: source code, CI/CD, manifests, and docs
```

## Inputs

Required:
- `migration_id`
- `target_system`

Optional:
- `scope`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/discover/product-features.md`
  - `.github/migrations/<migration-id>/discover/behaviour-catalogue.md`
  - `.github/migrations/<migration-id>/discover/context.md`
  - `.github/migrations/<migration-id>/discover/inventory.md`
- Output format: Markdown
- Status updates include:
  - discovered behaviours
  - evidence-backed context
  - gaps and assumptions

## Example output

```text
## Discover Status
- Migration: dsit-migration-001
- Phase: Discover
- Completed: source inventory and behaviour catalogue drafted
- Waiting on: human confirmation of product-features.md

## Next Action
1. Review product-features.md
2. Confirm the behaviour spec is accurate
```

## After you run this

- Review the Discover artefacts for unsupported assumptions.
- Share `product-features.md` with a human for confirmation.
- Add any missing evidence before moving to Target.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: use repository evidence only.
- This agent must not: modify production code.
- Human approval is required at: Discover completion.
