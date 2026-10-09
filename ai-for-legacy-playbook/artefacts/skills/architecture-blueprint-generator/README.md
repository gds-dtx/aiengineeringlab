# Skill: Comprehensive Project Architecture Blueprint Generator

## What this skill is for

Use this skill to **turn a codebase into a detailed architecture blueprint**.

It helps when you need to:
- detect technology stacks and architectural patterns
- generate diagrams and implementation-pattern notes
- create a blueprint that supports future development

## When to use it

Use this skill when:
- you need a structured architecture summary for a repository
- you want a blueprint that new engineers can follow

Do not use this skill when:
- you only need a small change plan
- you do not have repository access

## Before you run this

- You have: the repo or subsystem to analyse
- You know: the scope and any important folders
- You can provide: access to manifests, source, and docs

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Comprehensive Project Architecture Blueprint Generator** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Comprehensive Project Architecture Blueprint Generator skill for the Case Portal repository.
```

### What to type when you have inputs

```text
Use the Comprehensive Project Architecture Blueprint Generator skill with:
- scope: Case Portal
- inputs: source files, build files, docs, and deployment manifests
```

## Inputs

Required:
- `scope`: the repo or application to map

Optional:
- `inputs`: priority folders or file types

## What you will get (output)

- Main output file/path: a Markdown architecture blueprint in the documented execute path
- Output format: Markdown with diagrams and tables
- Key sections included:
  - stack summary
  - architecture patterns
  - diagrams
  - implementation conventions

## Example output (shape)

```text
# Case Portal Architecture Blueprint
## Stack Summary
- React frontend, .NET API, PostgreSQL database.

## Architecture Notes
- Thin UI layer, API-driven business logic, shared auth boundary.

## Recommended Next Steps
1. Confirm deployment topology.
2. Add missing runtime diagram.
```

## After you run this

- Review the blueprint for missing components or unsupported assumptions.
- Share it with the team as the reference architecture view.
- Add missing diagrams or docs if the blueprint is incomplete.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
