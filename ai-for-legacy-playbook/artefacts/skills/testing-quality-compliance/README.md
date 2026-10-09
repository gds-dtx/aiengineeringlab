# Skill: Testing Quality Compliance

## What this skill is for

Use this skill to **compare a repository’s testing approach against a written standard and find gaps**.

It helps when you need to:
- explain where testing is compliant or missing
- create a remediation plan for coverage and quality
- support release-readiness conversations

## When to use it

Use this skill when:
- you have a testing standard to compare against
- you need a compliance view instead of raw test metrics

Do not use this skill when:
- you only want to run tests
- no testing standard has been supplied

## Before you run this

- You have: the repo scope and the testing standard document
- You know: which parts of the system are in scope
- You can provide: access to test files, CI config, and docs

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Testing Quality Compliance** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Testing Quality Compliance skill for the Payments API repository and this testing standard.
```

### What to type when you have inputs

```text
Use the Testing Quality Compliance skill with:
- scope: Payments API
- standard: uploaded testing standards document
```

## Inputs

Required:
- `scope`
- `standard`

Optional:
- `focus areas`

## What you will get (output)

- Main output file/path: a compliance report in the documented execute path
- Output format: Markdown
- Key sections included:
  - compliance gaps
  - risks
  - remediation plan

## Example output (shape)

```text
# Payments API Testing Compliance Report
## Gaps
- No contract tests for payment callbacks.

## Remediation
- Add contract coverage and smoke checks.
```

## After you run this

- Review the gaps with the team that owns testing.
- Turn the remediation plan into backlog items.
- Re-run after the missing tests are added.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
