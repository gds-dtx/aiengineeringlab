# Skill: Integration Catalogue

## What this skill is for

Use this skill to **build a catalogue of a system’s integrations from repository evidence only**.

It helps when you need to:
- map adapters, endpoints, and message flows
- understand publish/subscribe relationships
- capture stakeholders and dependencies in one place

## When to use it

Use this skill when:
- you need an integration inventory for one source system
- you want to see where messages go and what depends on them

Do not use this skill when:
- you need to inspect live traffic
- the source system is unknown

## Before you run this

- You have: the source system name
- You know: the repository scope or path
- You can provide: access to docs, manifests, and code

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Integration Catalogue** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Integration Catalogue skill for the Case Portal repository.
```

### What to type when you have inputs

```text
Use the Integration Catalogue skill with:
- source system: Case Portal
- scope: API adapters, queues, external services, and webhooks
```

## Inputs

Required:
- `source system`

Optional:
- `scope`: integration types to prioritise

## What you will get (output)

- Main output file/path: an integration catalogue Markdown report in the documented execute path
- Output format: Markdown tables
- Key sections included:
  - integration list
  - producers and consumers
  - notes and gaps

## Example output (shape)

```text
# Case Portal Integration Catalogue
## Integrations
- GOV Notify adapter
- Identity provider
- Payments API

## Notes
- One webhook route is documented only in code.
```

## After you run this

- Review the catalogue for missing consumers or undocumented adapters.
- Share it with the people who own each integration.
- Add missing evidence and rerun if a connection is unclear.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
