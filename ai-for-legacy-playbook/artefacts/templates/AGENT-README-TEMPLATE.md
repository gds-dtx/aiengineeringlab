# Agent: <Agent Name>

## What this agent is for

Use this agent to **<plain-language outcome>**.

This agent is responsible for:
- <responsibility 1>
- <responsibility 2>
- <responsibility 3>

## When to use it

Use this agent when:
- <trigger/need in simple words>
- <another trigger>

Do not use this agent when:
- <out-of-scope case>

## Before you run this

- You have: <required access/files/context>
- You know: <required parameters>
- You can provide: <required approvals or constraints>

## How to invoke it

Agents are invoked by **switching to the agent first**, then giving it the task in plain language.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that lets you switch agents
- an agent picker inside a developer tool

### Step-by-step

1. Open the Copilot client or app you normally use.
2. Switch to **<Agent Name>**.
3. Paste or type the request below.
4. Press enter or run.

### What to type after switching to this agent

```text
<task>
```

### What to type when you need context

```text
- scope: <value>
- inputs: <paths/artefacts>
- constraints: <must/must-not items>
```

## Inputs

Required:
- `<input_name>`: <what it means>

Optional:
- `<input_name>`: <what changes if provided>

## What you will get (output)

- Main output file/path: `<path or artifact>`
- Output format: `<markdown/table/checklist/etc.>`
- Status updates include:
  - <phase/status summary>
  - <completed work>
  - <next action or blocker>

## Example output (shape)

```text
## Current Status
- Phase: <phase>
- Completed: <summary>
- Waiting on: <human/input>

## Next Action
1. <step>
2. <step>
```

## After you run this

- Check whether the agent is waiting on a human answer or file.
- Review the next action and any blockers before you stop.
- Share the status update with the team if the work is part of a larger flow.
- Resume from the same agent state if the job is not finished.

## Guardrails and boundaries

- This agent must: <critical rule>
- This agent must not: <critical rule>
- Human approval is required at: <gate>

## Maintainer notes (optional)

- Owner: <team/person>
- Last reviewed: <YYYY-MM-DD>
- Related files: <paths>