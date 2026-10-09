# Skill: Skill Security Assessment

## What this skill is for

Use this skill to **assess an AI agent skill for security risk before installation or sharing**.

It helps when you need to:
- score the skill’s risk exposure
- identify prompt-injection and supply-chain concerns
- decide whether to block, review, or approve it

## When to use it

Use this skill when:
- you are evaluating a skill package for your team
- you need a security view before anyone installs it

Do not use this skill when:
- you are auditing prompt quality or style
- you are assessing an MCP server or connector

## Before you run this

- You have: the skill directory or manifest file
- You know: the assessment scope
- You can provide: access to the skill package contents

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Skill Security Assessment** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Skill Security Assessment skill for the onboarding-pack skill directory.
```

### What to type when you have inputs

```text
Use the Skill Security Assessment skill with:
- skill path: artefacts/skills/onboarding-pack
- save to docs: yes
```

## Inputs

Required:
- `skill path`

Optional:
- `save to docs`
- `governance root`

## What you will get (output)

- Main output file/path: a security assessment report in the configured assessment folder
- Output format: Markdown
- Key sections included:
  - risk score
  - severity
  - findings
  - recommendation

## Example output (shape)

```text
# Onboarding Pack Skill Security Assessment
## Verdict
- Risk score: 28/100
- Recommendation: Approve with Conditions

## Findings
- No external network calls found.
- One script needs prompt-injection review.
```

## After you run this

- Review the verdict before allowing others to install the skill.
- Add the skill to the approved or blocked list if your process uses one.
- Re-run the assessment if the skill files change.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
