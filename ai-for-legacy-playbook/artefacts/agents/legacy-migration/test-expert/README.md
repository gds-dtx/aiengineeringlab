# Agent: Test Expert

## What this agent is for

Use this agent to **assess the test pyramid against the behaviour spec and establish the signed-off baseline suite**.

It helps when you need to:
- assess unit, integration, and E2E coverage
- create or translate the baseline test set
- prepare evidence for human sign-off

## When to use it

Use this agent when:
- Discover and Target are complete
- you need Test phase assessment and baseline evidence

Do not use this agent when:
- you are still changing architecture intent
- you want to invent new behaviours

## Before you run this

- You have: product-features.md, behaviour-catalogue.md, and preferences.md
- You know: the test commands and existing test files
- You can provide: human sign-off for the baseline suite

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Test Expert**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Assess the test pyramid for migration dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- product_features: discover/product-features.md
- behaviour_catalogue: discover/behaviour-catalogue.md
- preferences: target/preferences.md
```

## Inputs

Required:
- `migration_id`
- `product_features`
- `behaviour_catalogue`
- `preferences`

Optional:
- `existing_tests`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/test/test-expert-report.md`
  - `.github/migrations/<migration-id>/test/baseline-evidence.md`
- Output format: Markdown + evidence notes
- Status updates include:
  - test mode
  - coverage gaps
  - sign-off readiness

## Example output

```text
## Test Status
- Mode: A
- Completed: baseline suite translated and executed
- Waiting on: human sign-off

## Next Action
1. Review baseline-evidence.md
2. Confirm the sign-off statement
```

## After you run this

- Review the report for missing coverage or unsupported assumptions.
- Obtain the human sign-off before Planning starts.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: use the behaviour spec as the source of truth.
- This agent must not: invent new business behaviour.
- Human approval is required at: Test completion.
