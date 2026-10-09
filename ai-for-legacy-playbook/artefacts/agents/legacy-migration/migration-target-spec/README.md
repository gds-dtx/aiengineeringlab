# Agent: Migration Target Spec

## What this agent is for

Use this agent to **turn the approved target direction into a concrete migration target specification**.

It helps when you need to:
- define the migrated system’s behaviour and structure
- map PF-n entries into implementation expectations
- produce the document the implementation agents build toward

## When to use it

Use this agent when:
- Target and Test phases are complete
- you need the Planning artefact that says what the migrated system should be

Do not use this agent when:
- the target architecture is not approved
- you need an implementation plan instead

## Before you run this

- You have: all Discover and Target artefacts
- You know: the test-expert report and baseline evidence
- You can provide: the approved target preferences

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open your Copilot client or app.
2. Switch to **Migration Target Spec**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
Create the migration target spec for dsit-migration-001.
```

### What to type when you need context

```text
- migration_id: dsit-migration-001
- discover: discover/product-features.md, discover/behaviour-catalogue.md
- target: target/architecture.md, target/preferences.md
- test evidence: test/test-expert-report.md, test/baseline-evidence.md
```

## Inputs

Required:
- `migration_id`
- Discover artefacts
- Target artefacts
- Test artefacts

Optional:
- `notes`

## What you will get (output)

- Main output file/path:
  - `.github/migrations/<migration-id>/planning/target-spec.md`
- Output format: Markdown
- Status updates include:
  - traceability coverage
  - gaps
  - approval readiness

## Example output

```text
## Planning Status
- Completed: target spec drafted for all PF-n entries
- Waiting on: human confirmation

## Next Action
1. Review target-spec.md
2. Confirm all behaviour entries are addressed
```

## After you run this

- Check that every PF-n entry is covered.
- Get human confirmation before the plan agent starts.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.

## Guardrails and boundaries

- This agent must: stay aligned to approved target artefacts.
- This agent must not: omit PF-n coverage.
- Human approval is required at: Target Spec completion.
