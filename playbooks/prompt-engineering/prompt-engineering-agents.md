> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Prompt engineering for AI coding agents

Understanding the differences between chat-based and agentic AI systems, and how to prompt autonomous coding agents safely and effectively.

## Purpose

AI coding agents can autonomously make changes across your codebase, offering powerful productivity gains but requiring careful prompting and oversight. This guide helps you understand how to prompt agents effectively and safely.

Use this guide to:

- understand how prompting agents differs from prompting chat systems
- apply the human-in-the-loop principle when prompting for safe agent usage
- write effective prompts for agents on repetitive tasks while maintaining code quality
- prevent technical debt from accumulating through poorly prompted AI-generated code

## Who this applies to

Advanced AI tools should be used by:

- engineers using agentic coding tools (GitHub Copilot Workspace, Cursor Composer and similar)
- team leads evaluating agent-based tools
- anyone responsible for code quality and maintainability

### Chat vs agentic systems: how to prompt each

Understanding the difference and how your prompting approach should change.

Chat-based assistants:
1. You paste code snippets.
2. AI suggests changes.
3. You apply changes manually.
4. You have full control over every modification.

Agentic systems:
1. AI can read and write multiple files.
2. The AI makes changes directly.
3. It has greater automation.
4. It sees more project context.

#### When to use each

Use chat-based for:

- learning and exploration
- complex business logic
- security-critical code
- novel algorithms
- architecture decisions
- when you need to understand every change

Use agents for:

- renaming across codebase
- formatting and linting fixes
- repetitive refactoring
- adding logging throughout
- updating imports
- migration tasks

### The human-in-the-loop principle

Never blindly accept agentic changes.

Before accepting agentic code changes, complete these steps.

1. Read through every file changed.
2. Understand why each change was made.
3. Check for unintended side effects.
4. Verify tests still pass.
5. Look for introduced bugs.
6. Check if it follows your patterns.
7. Ensure it does not add tech debt.

Agents struggle in these areas:

- context beyond code (business logic, domain knowledge, user intent)
- non-obvious dependencies (implicit contracts, external integrations)
- style consistency (your team's specific preferences)
- testing implications (what additional tests are now needed)

Common agent mistakes include:

- over-abstracting code
- adding unnecessary complexity
- breaking existing behaviour
- inconsistent error handling
- mixing coding styles

### How to prompt agents safely

1. Start with specific instructions, such as 'Add type hints to all functions in the auth/ directory using Python 3.11 syntax' instead of just 'Improve this codebase'.
2. Review changes incrementally by asking the agent to make changes one file at a time, stopping after each file for your review before proceeding.
3. Test between changes by instructing the agent to ensure all tests pass after each refactoring. Do this before moving to the next change.
4. Understand changes before accepting them by asking questions like 'Why did you change this specific code, what problem does this solve, and are there any risks or trade-offs with this approach' if you see something unclear.
5. Preserve important context by providing constraints upfront, such as telling the agent 'Before refactoring, note that we have this important business rule, this performance requirement, and this integration constraint, so ensure your changes respect these'.

### Tech debt from AI

Tech debt accumulates through:

- accepting code without understanding it
- letting AI make decisions without guidance
- not reviewing code for consistency
- allowing quick fixes without proper solutions

To prevent tech debt from AI-generated code, complete these steps after the agent makes changes.

1. Run your linter and formatter.
2. Check for new TODO comments.
3. Look for duplicated code.
4. Verify error handling is consistent.
5. Ensure documentation is updated.
6. Check if new tests are needed.

If you do not understand code well enough to maintain it, do not merge it.
