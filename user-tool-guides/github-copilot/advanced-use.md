> ALPHA
> This is a new service. Your https://github.com/govuk-digital-backbone/aiengineeringlab/discussions will help us to improve it.

# Advanced use of GitHub Copilot

This guide builds on the [getting started guide for GitHub Copilot](getting-started.md). It is for developers who already use Copilot regularly and want to use it more effectively and safely.

Follow the steps in order. Each step focuses on a specific capability.

## Contents

[Improve how you write prompts](#1-improve-how-you-write-prompts)

[Use Copilot with existing code](#2-use-copilot-with-existing-code)

[Generate tests and documentation](#3-generate-tests-and-documentation)

[Refactor code safely](#4-refactor-code-safely)

[Understand limits and failure modes](#5-understand-limits-and-failure-modes)

## Who this guide is for

This guide is for:

- developers who already use GitHub Copilot day to day
- engineers working on production codebases
- developers supporting or mentoring others

You should already be comfortable reviewing and committing Copilot generated code.

## Contents

[Improve how you write prompts](#1-improve-how-you-write-prompts)

[Use Copilot with existing code](#2-use-copilot-with-existing-code)

[Generate tests and documentation](#3-generate-tests-and-documentation)

[Refactor code safely](#4-refactor-code-safely)

[Understand limits and failure modes](#5-understand-limits-and-failure-modes)

## 1. Improve how you write prompts

Good prompts lead to better results.

You can [improve prompt quality](../../playbooks/prompt-engineering/) by describing clearly what the code should do rather than how it should be written. Include any relevant constraints such as performance or readability. Reference existing functions or patterns already used in the codebase.

You can prompt Copilot effectively by:

- describing behaviour in a comment before writing code
- asking Copilot to explain code before asking it to change it
- asking for small changes rather than large rewrites

Consider:

- treating Copilot like a junior developer
- always reviewing suggestions before accepting them

### References
[Prompt engineering playbooks](../../playbooks/prompt-engineering/)

[Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

[How to write better prompts for GitHub Copilot](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/) 

[Introduction to prompt engineering with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/)


## 2. Use Copilot with existing code

Copilot is most valuable in real codebases, not empty files.

You can use Copilot to understand unfamiliar code, summarise files or functions, and suggest potential improvements or fixes before making changes yourself. You should provide your feedback on BizChat.

Work more effectively with existing code by:

- asking Copilot to explain a file before editing it
- asking Copilot to describe the impact of a proposed change
- using Copilot Chat to explore options rather than make final decisions

Reduce risk when working with Copilot by:

- never assuming Copilot understands business context
- verifying behaviour with tests and local runs

### References
[Refactoring code with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/refactor-code)

[Advanced GitHub Copilot patterns and workflows](https://github.com/microsoft/advanced-github-copilot)

## 3. Generate tests and documentation

Copilot can help create tests and documentation, but only with guidance.

Use Copilot to generate tests for existing functions. You should explicitly specify the test framework used by your project. Then, manually review the resulting tests to make sure they provide meaningful coverage and handle important edge cases.

For documentation:

- ask Copilot to summarise code behaviour
- use it to draft README content
- rewrite generated documentation in plain English

You can improve the quality of outputs by:

- ensuring generated tests still fail when code breaks
- ensuring documentation reflects real behaviour rather than intent

If you use agent mode to generate tests across multiple files, the number of messages you send determines how many premium requests you consume. See [Agent mode billing](agent-mode-billing.md) for worked examples showing credit usage for test generation sessions, including how to keep costs to zero using included models.

### References
[Generate unit tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/generate-unit-tests)

[How to generate unit tests with GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/how-to-generate-unit-tests-with-github-copilot-tips-and-examples/)

[Test with GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/guides/test-with-copilot)

## 4. Refactor code safely

Copilot can assist with refactoring, but it should not drive it.

Safe refactoring practices include making one logical change at a time. Ask Copilot to suggest options rather than applying changes without review. Run tests after each change to confirm behaviour remains correct.

You can use Copilot effectively during refactoring by:

- identifying duplication
- suggesting smaller functions
- renaming variables for clarity

You can refactor more safely by:

- avoiding large multi-file changes generated in one step
- keeping changes reviewable in pull requests

Multi-file refactoring is one of the most credit-intensive agent mode tasks. A complex refactoring job can involve 15 to 25 messages, which adds up quickly if you use a premium model. See [Agent mode billing](agent-mode-billing.md) for a cost comparison across model choices, including how to use agent mode for refactoring at zero premium cost with included models.

### References
[Refactoring code with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/refactor-code)

## 5. Understand limits and failure modes

Copilot is not aware of organisational standards, architectural decisions, or security and compliance requirements, so its suggestions must always be reviewed in the context of your organisation's policies and constraints.

Common failure modes include:

- confident but incorrect code
- insecure defaults
- outdated patterns

Build good habits when using Copilot by:

- questioning suggestions that look complex
- checking dependencies and licences
- preferring simple readable code

### References
[Demystifying GitHub Copilot security controls](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/demystifying-github-copilot-security-controls-easing-concerns-for-organizational/4468193)

[GitHub Copilot security and privacy risks](https://blog.gitguardian.com/github-copilot-security-and-privacy/)

[can GitHub Copilot code review spot security flaws? (academic study)](https://arxiv.org/pdf/2509.13650)

## Working with others

When using Copilot in team environments, be open about when Copilot has been used, continue to follow existing review processes, and never bypass established checks or approval requirements.

Copilot should support collaboration, not replace it.

### References
[GitHub Copilot documentation for teams and enterprises](https://docs.github.com/en/copilot)

## Next steps

You can now:

- refine your prompt style over time
- help others learn effective usage
- contribute feedback and improvements

GitHub Copilot is a tool. You remain accountable for the code you ship.

Once you are comfortable with the techniques in this guide, the [GitHub Copilot customisation guide](customisation-guide.md) covers how to go further, including setting up custom agents, repository instructions, hooks for security and compliance, and skills for repeatable workflows.
