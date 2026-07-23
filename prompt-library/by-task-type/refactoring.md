> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Refactoring prompts

Tested prompts and techniques for AI-assisted code refactoring, covering code smell detection, constraint-driven refactoring, and diff-only output.

## Contents

[Purpose](#purpose)

[Who this is for](#who-this-is-for)

[Where to find refactoring prompts](#where-to-find-refactoring-prompts)

[Diff-only output](#diff-only-output)

[Constraint specification](#constraint-specification)

[Role switching](#role-switching)

## Purpose

This file covers prompts and guidance for engineers refactoring existing code with AI assistance. Where detailed prompt examples already exist in the repository, this file links directly to them rather than duplicating content.

Use this file to find prompts for:

- identifying code smells and anti-patterns in existing code
- generating a safe, incremental refactoring plan
- applying changes one step at a time using diff-only output
- verifying refactored code against the original behaviour

## Who this is for

This file is for engineers refactoring code in any language or framework, including:

- engineers reducing complexity in overgrown classes or functions
- engineers introducing design patterns into legacy code
- technical leads reviewing refactoring proposals before they are applied
- engineers writing the tests needed to refactor safely

---

## Where to find refactoring prompts

The main prompt examples for refactoring are in the [prompt engineering for common development tasks](../../playbooks/prompt-engineering/prompt-engineering-use-cases.md#use-case-2-refactoring-complex-code) guide. It covers the full 3-step approach with worked examples.

1. Analyse the code to identify responsibilities, code smells, and complexity before touching any code.
2. Plan an ordered refactoring strategy that maintains backwards compatibility at each step.
3. Execute one step at a time, using role switching for security review.

Read that guide before using the techniques below. The techniques in this file complement those prompts but do not replace them.

---

## Diff-only output

Diff-only output is a prompting technique that constrains the AI to produce only the lines that change, rather than rewriting an entire file. This reduces review burden significantly and makes unintended changes easier to spot.

Add the following instruction to any execution prompt.

```
Output only the lines that change, in unified diff format.
Do not rewrite unchanged sections.
Do not change formatting, comments, or variable names outside the scope of this change.
```

If the AI produces a full file rewrite when you asked for a diff, the scope of the step is likely too large. Break the step into smaller pieces and try again.

---

## Constraint specification

Tell the AI what must not change alongside what should change. Without this, the AI will often make additional improvements. These may seem reasonable in isolation but can break callers, violate team standards, or change monitored behaviour.

Add the following constraints block to any refactoring prompt. 

```
Constraints:
- do not change the public method signatures
- do not add new external dependencies
- maintain all existing log messages exactly (used by monitoring alerts)
- keep backwards compatibility with existing callers
- do not change code outside the scope of this step
```

Adjust the constraints to match your situation. The more specific they are, the less likely the AI is to make changes you did not intend.

---

## Role switching

For security-sensitive refactoring, switch the AI's role after generating the refactored code. A security engineer role often catches issues that a general code review misses. These include changed error messages that expose internal details, or altered input handling.

Add this as a follow-up prompt after any refactoring step.

```
Now act as a security engineer reviewing this refactoring.
Identify any changes that could affect authentication, authorisation, or input validation, whether intended or not.
Rate each finding as critical, high, medium, or low.
```

---

## Related guidance

[Prompt engineering for testing](../../playbooks/prompt-engineering/prompt-engineering-testing.md)

[Context engineering](../../playbooks/context-engineering.md)

[AI-assisted legacy modernisation](../../playbooks/legacy-system-modernisation.md)

[Legacy maintenance prompts](legacy-maintenance.md)

[Prompt template](../prompt-template.md)