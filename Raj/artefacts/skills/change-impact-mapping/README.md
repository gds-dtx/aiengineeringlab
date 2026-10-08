# Skill: Generic Change Impact Mapping

## What this skill is for

Use this skill to **map a planned change to the code, tests, docs, and processes it may affect**.

It helps when you need to:
- understand likely blast radius before a change starts
- identify impacted modules, routes, jobs, or docs
- plan safer implementation work

## When to use it

Use this skill when:
- you are scoping a software change
- you need a plain-language impact summary for stakeholders

Do not use this skill when:
- you need to make the change itself
- the scope is already fully known and tiny

## Before you run this

- You have: the change request or feature description
- You know: the repo or subsystem in scope
- You can provide: any related files, tickets, or design notes

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Generic Change Impact Mapping** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Generic Change Impact Mapping skill for the customer search change.
```

### What to type when you have inputs

```text
Use the Generic Change Impact Mapping skill with:
- change: customer search updates
- scope: API, UI, tests, and docs
```

## Inputs

Required:
- `change`: the proposed change

Optional:
- `scope`: folders or systems to focus on

## What you will get (output)

- Main output file/path: a Markdown impact map in the documented execute path
- Output format: Markdown
- Key sections included:
  - impacted areas
  - risk notes
  - recommended next steps

## Example output (shape)

```text
# Customer Search Change Impact Map
## Impacted Areas
- Search API, result sorting, regression tests, user docs.

## Risks
- Pagination and cache invalidation may change behaviour.

## Recommended Next Steps
1. Review API contract.
2. Add tests for sorting.
```

## After you run this

- Review the impact list before planning the change.
- Share the map with the people building and testing the change.
- Add missing context and rerun if the scope is unclear.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
