# Skill: Dependency Compatibility Mapping

## What this skill is for

Use this skill to **check dependency compatibility between legacy and target runtimes**.

It helps when you need to:
- spot upgrade blockers early
- assess forked-library risk
- decide whether to upgrade, replace, or defer a dependency

## When to use it

Use this skill when:
- you are planning a runtime or framework migration
- you need a compatibility view for libraries and transitive dependencies

Do not use this skill when:
- you need a package update applied directly
- you only want a general architecture summary

## Before you run this

- You have: manifests and lock files from the repo
- You know: the source and target runtime versions
- You can provide: the repository scope or dependency set

## How to invoke it

Open the Copilot client or app you normally use, then pick this skill before typing the request.

Examples of places you might use this:
- GitHub Copilot CLI
- a Copilot chat surface that supports skills
- a repo workflow or extension that lets you choose a skill first

### Step-by-step

1. Open your Copilot client or app.
2. Select **Dependency Compatibility Mapping** from the skills list.
3. Paste or type the request below.
4. Press enter or run.

### What to type

```text
Use the Dependency Compatibility Mapping skill for the backend migration to .NET 8.
```

### What to type when you have inputs

```text
Use the Dependency Compatibility Mapping skill with:
- source runtime: .NET 6
- target runtime: .NET 8
- scope: api project and its shared libraries
```

## Inputs

Required:
- `source runtime`
- `target runtime`

Optional:
- `scope`: specific projects or packages

## What you will get (output)

- Main output file/path: a compatibility report in the documented execute path
- Output format: Markdown
- Key sections included:
  - compatibility matrix
  - blockers
  - migration notes

## Example output (shape)

```text
# .NET 6 to .NET 8 Compatibility Map
## Blockers
- Package X has no .NET 8 release.

## Notes
- Package Y can be upgraded without code changes.

## Recommended Next Steps
1. Replace Package X or pin a safe version.
2. Re-run the compatibility check.
```

## After you run this

- Review the blockers before planning the upgrade.
- Share the matrix with the migration owner and test owner.
- Re-run after any dependency manifest changes.
- If the output is insufficient or not of good enough quality, describe to your AI assistant of choice what the issue is or what you want to improve and ask it to plan remediations.
