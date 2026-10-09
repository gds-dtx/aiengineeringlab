# Skill: Software Change Planner

## What this skill is for

Use this skill to **turn a change request into a structured implementation plan**.

It helps when you need to:
- break a change into tasks
- sequence the work safely
- capture risks and dependencies

## When to use it

Use this skill when:
- you already know the change you want to make
- you need a plan before implementation starts

Do not use this skill when:
- you still need architecture or code discovery first
- you need the change applied directly

## Before you run this

- You have: a change description or ticket
- You know: the codebase or system scope
- You can provide: any constraints, deadlines, or dependencies

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Software Change Planner** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Software Change Planner skill for the customer search change.
```

### What to type when you have inputs

```text
Use the Software Change Planner skill with:
- change: customer search improvement
- inputs: architecture summary, code analysis, and requirements
```

## Inputs

Required:
- `change`

Optional:
- `inputs`

## What you will get (output)

- Main output file/path: a plan Markdown report in the documented execute path
- Output format: Markdown
- Key sections included:
  - tasks
  - sequencing
  - risks
  - follow-up actions

## Example output (shape)

```text
# Customer Search Change Plan
## Tasks
1. Update API contract.
2. Add UI support.
3. Add regression tests.

## Risks
- Search performance may regress.
```

## After you run this

- Review the plan before any coding starts.
- Share it with the engineer and reviewer assigned to the change.
- Update the plan if requirements or scope change.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
