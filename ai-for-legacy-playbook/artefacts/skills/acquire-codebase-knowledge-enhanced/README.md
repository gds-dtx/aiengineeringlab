# Skill: Acquire Codebase Knowledge Enhanced

## What this skill is for

Use this skill to **build deeper codebase onboarding and handoff material** from repository evidence only.

It helps when you need to:
- map architecture and business logic
- analyse coverage, risks, and modernization concerns
- produce a shareable engineering handoff

## When to use it

Use this skill when:
- you need a richer onboarding pack than a simple README
- you want a code-backed summary of structure, conventions, concerns, and integrations

Do not use this skill when:
- you need outside research or assumptions
- you only need a quick file list

## Before you run this

- You have: access to the repository and its docs
- You know: the codebase or subsystem you want to analyse
- You can provide: the repo path or a clear scope

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Acquire Codebase Knowledge Enhanced** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Acquire Codebase Knowledge Enhanced skill for the Payments API repository.
```

### What to type when you have inputs

```text
Use the Acquire Codebase Knowledge Enhanced skill with:
- scope: Payments API
- inputs: repository path, docs, manifests, and CI files
```

## Inputs

Required:
- `scope`: the repo or subsystem to analyse

Optional:
- `inputs`: extra context or folders to prioritise

## What you will get (output)

- Main output file/path: a Markdown handoff artifact in the documented execute path
- Output format: Markdown
- Key sections included:
  - conventions
  - architecture
  - concerns
  - stack and structure

## Example output (shape)

```text
# Payments API Codebase Handoff
## Summary
- .NET API with SQL Server persistence and GitHub Actions CI.

## Key Concerns
- Missing rollback runbook for schema changes.

## Recommended Next Steps
1. Review migration scripts.
2. Confirm deployment window procedure.
```

## After you run this

- Review the handoff for missing evidence or weakly supported claims.
- Share it with the person who needs the onboarding or migration context.
- Add any missing repo evidence and rerun if the handoff is incomplete.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
