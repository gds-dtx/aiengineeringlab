# Skill: SBOM Generation

## What this skill is for

Use this skill to **generate a deterministic SBOM from repository build artefacts**.

It helps when you need to:
- understand package and component inventory
- produce CycloneDX output
- avoid host-machine contamination in the report

## When to use it

Use this skill when:
- you need a repo-scoped SBOM
- you want a repeatable dependency inventory for sharing or review

Do not use this skill when:
- you need a live environment scan
- the target build artefacts are missing

## Before you run this

- You have: the repository or build output scope
- You know: which build artefacts to include
- You can provide: access to manifests and lock files

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **SBOM Generation** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the SBOM Generation skill for the service repository.
```

### What to type when you have inputs

```text
Use the SBOM Generation skill with:
- scope: repository build artefacts
- format: CycloneDX
```

## Inputs

Required:
- `scope`

Optional:
- `format`

## What you will get (output)

- Main output file/path: a deterministic SBOM in the documented execute path
- Output format: JSON or XML CycloneDX
- Key sections included:
  - components
  - dependencies
  - provenance notes

## Example output (shape)

```text
# SBOM Summary
## Components
- React
- .NET SDK

## Notes
- Generated from lock files only.
```

## After you run this

- Review the SBOM against the repo’s manifests.
- Share it with the security or compliance owner if needed.
- Regenerate it after dependency changes.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
