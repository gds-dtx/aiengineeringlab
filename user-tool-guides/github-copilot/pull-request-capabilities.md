> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# GitHub Copilot pull request capabilities

## Contents

[Code review](#1-code-review)

[Interacting with @Copilot in pull requests](#2-interacting-with-copilot-in-pull-requests)

[Assigning issues to Copilot for autonomous implementation](#3-assigning-issues-to-copilot-for-autonomous-implementation)

[Practical guidance for government teams](#4-practical-guidance-for-government-teams)

[What Copilot cannot do](#5-what-copilot-cannot-do)

[Credit usage and billing](#6-credit-usage-and-billing)

[Official documentation](#7-official-documentation)

This guide explains what GitHub Copilot can and cannot do in pull request workflows. It covers automated code review, responding to @Copilot mentions in PR comments, and autonomous issue implementation, with practical examples for common use cases.

## Who this guide is for

The intended audience for this guide includes:

- developers working with pull requests in GitHub
- engineers reviewing or creating PRs in government teams
- teams evaluating Copilot PR capabilities for their workflow

You should already be familiar with GitHub pull request workflows and basic Copilot usage in your IDE.

## What GitHub Copilot offers for pull requests

GitHub Copilot provides several capabilities to assist with pull request workflows. These include:

- automated code review that identifies potential bugs, security issues, and quality concerns
- interactive assistance through @Copilot mentions in PR comments
- autonomous implementation of issues assigned to Copilot

These capabilities are available on GitHub.com for repositories with Copilot Business or Enterprise licences.

## 1. Code review

Copilot can review pull requests and provide feedback on code quality, potential bugs, and adherence to common patterns. You request a review by commenting on the PR or using the Copilot code review interface on GitHub.com.

### How to request a code review

On GitHub.com:

1. Open your pull request.
2. Select Copilot from the reviewers list, or comment `@copilot review` in the PR conversation.

Copilot analyses the changes and provides review comments directly in the PR, similar to a human reviewer.

Copilot always leaves a 'Comment' review. It never creates an 'Approve' or 'Request changes' review. This means Copilot reviews do not count toward required approvals and will not block merging. Human review remains mandatory.

### What code review covers

Copilot code review typically identifies:

- potential bugs or logic errors
- security vulnerabilities such as SQL injection or XSS
- code quality issues including duplication or complexity
- adherence to common coding patterns
- missing error handling or edge cases
- performance concerns in obvious cases

### How thorough are Copilot reviews

Copilot reviews focus on the changed code in the PR. Reviews typically complete in under 30 seconds.

Copilot provides:

- line-specific comments on issues it identifies
- suggested code changes you can apply with one click where possible
- general feedback on the overall PR approach

The review depth is comparable to a quick automated scan rather than a thorough human review. Copilot does not:

- deeply analyse architectural fit within the wider codebase
- verify adherence to project-specific conventions unless told to do so via custom instructions
- test the code or verify tests are adequate
- understand business logic or domain-specific requirements

### Example use case

You have opened a PR that adds a new API endpoint handling user input. You want to check for common security issues before requesting human review.

Action: Comment `@copilot review` on the PR.

Result: Copilot analyses the changes and comments on the PR, flagging:

- missing input validation on a query parameter
- a potential SQL injection risk in a database query
- inconsistent error handling compared to existing endpoints

You can then address these issues before requesting review from colleagues.

### Language and framework support

Copilot code review works with most popular programming languages and frameworks. Quality varies.

Well-supported languages include:

- JavaScript
- TypeScript
- Python
- Java
- C#
- Go
- Ruby
- PHP

Good support languages include:

- C
- C++
- Rust
- Kotlin
- Swift

Less common languages and domain-specific languages may receive generic or less accurate feedback.

Framework-specific patterns such as React, Django, and Spring are generally well understood. However, Copilot may suggest outdated patterns if the framework has evolved significantly.

### Configuring review criteria with custom instructions

You can customise what Copilot reviews by adding a `.github/copilot-instructions.md` file to your repository. This allows you to enforce specific review criteria.

Example:

```markdown
When performing a code review, apply the checks in the /security/security-checklist.md file.

When performing a code review, focus on readability and avoid nested ternary operators.

When performing a code review, ensure all database queries use parameterised statements.
```

Copilot code review reads the first 4,000 characters of custom instruction files. Copilot ignores instructions beyond this limit.

Custom instructions are read from the base branch of the PR. This is typically `main`, not the feature branch.

### Large versus small pull requests

Copilot handles small, focused PRs more effectively than large multi-file changes.

Small PRs (1 to 5 files, less than 500 lines): Copilot typically provides targeted, relevant feedback.

Large PRs (10 or more files, more than 1000 lines): Review quality may decline. Copilot may:

- miss issues in less prominent files
- provide generic rather than specific feedback
- focus on superficial issues rather than structural concerns

For best results, keep PRs small and focused. If you must review a large PR, consider requesting multiple focused reviews on specific files or components.

### Limitations and common mistakes

Copilot code review consistently misses or gets wrong certain types of issues.

Copilot commonly misses:

- business logic errors (Copilot does not understand domain requirements)
- architectural mismatches (it does not know your system design)
- incomplete test coverage (it may not identify missing test scenarios)
- accessibility issues in frontend code (WCAG compliance, ARIA attributes)
- data protection violations (GDPR, UK GDPR considerations)
- performance issues that require profiling or load testing

Common false positives that Copilot may generate include:

- flagging intentional patterns as errors when they are valid in context
- suggesting changes that conflict with project conventions
- recommending refactoring that reduces readability
- identifying 'security issues' that are already mitigated elsewhere in the stack

Always verify Copilot suggestions before applying them. Treat review comments as prompts for investigation, not definitive findings.

Always conduct human code review in addition to Copilot review, particularly for production code. See [Safe usage guidance: prototyping vs production](safe-usage-prototyping-vs-production.md) for differentiated code review requirements.

## 2. Interacting with @Copilot in pull requests

You can mention `@copilot` in PR comments to request specific actions or ask questions about the changes. Copilot responds directly in the comment thread.

### Common interactions

Request an explanation:

```
@copilot explain why this change was necessary
```

Copilot provides context about the changes in the PR.

Ask about failing checks:

```
@copilot the linter is failing, can you suggest a fix?
```

Copilot analyses the failing check and suggests how to resolve it. Note that Copilot cannot directly push fixes to the PR branch. You must apply suggested changes yourself or push commits from your local environment.

Request improvements:

```
@copilot can you suggest a more efficient way to handle this loop?
```

Copilot suggests alternative implementations. You review the suggestion and decide whether to apply it.

Ask about test coverage:

```
@copilot are there any edge cases we should test?
```

Copilot reviews the code and suggests additional test scenarios.

### Example workflow

You receive feedback on a PR that a function is too complex. You comment:

```
@copilot this function has been flagged as too complex. Can you suggest a refactoring that breaks it into smaller functions?
```

Copilot responds with a suggested refactoring. You review the suggestion, implement it locally, and push the updated code to the PR branch.

### @Copilot in different contexts

`@copilot` mentions work differently depending on where you use them.

In pull request comments, Copilot:

- responds in the comment thread
- can explain changes, suggest improvements, or answer questions about the pull request
- cannot push commits to the branch
- provides responses that reflect the current pull request state

In issue comments, Copilot:

- can provide implementation guidance or clarify requirements
- cannot autonomously implement solutions unless formally assigned the issue
- provides responses that help you plan work but do not trigger autonomous action

In GitHub Discussions, Copilot:

- can answer general questions about code or best practices
- has limited context about your specific repository
- is primarily useful for learning or exploring approaches

Assigning an issue to `@copilot`, rather than simply mentioning it, causes the agent to:

- trigger autonomous implementation via a coding agent session
- create a pull request without human intervention
- consume one premium request per session (see section 3 for details)

### When does @Copilot trigger the coding agent?

A simple `@copilot` mention in a comment does not always trigger the autonomous coding agent.

The coding agent activates when:

- formally assigning an issue to `@copilot` using the assignees dropdown
- commenting `@copilot implement this` or a similar implementation directive on an issue
- clicking "Implement suggestion" on a Copilot code review comment (if enabled)

The coding agent is not triggered when:

- asking `@copilot` to explain something in a pull request comment
- requesting suggestions or asking questions without requesting implementation
- mentioning `@copilot` in a discussion or general comment

When the coding agent runs, it consumes 1 premium request. Monitor your usage if your team frequently assigns issues to Copilot.

### Repository instructions and content exclusions

Custom instructions: `@copilot` in PR comments and code review does respect repository custom instructions in `.github/copilot-instructions.md`. You can use custom instructions to enforce project-specific conventions or review criteria.

Content exclusions: Copilot code review respects content exclusion settings. Excluded files are not sent to Copilot and do not appear in review comments. The following important exceptions apply:

- the autonomous coding agent (invoked when issues are assigned to `@copilot`) does not respect content exclusions
- agent mode in the IDE does not respect content exclusions
- excluded files remain accessible to the coding agent when it creates pull requests

See [Content exclusions](content-exclusions.md) for full details on where exclusions apply and where they do not.

### Important constraints

When you interact with `@copilot` in a PR:

- it cannot directly modify code in the pull request; it can only suggest changes
- suggested changes must be applied manually by pushing new commits
- it does not have write access to repository branches
- responses reflect the current state of the pull request and may not include very recent commits

## 3. Assigning issues to Copilot for autonomous implementation

GitHub Copilot can autonomously implement solutions for issues you assign to it. When you assign an issue to `@copilot`, it analyses the issue description and makes the necessary code changes. It then runs tests and opens a pull request for your review.

### How to assign an issue

1. Create a GitHub issue describing the task, feature, or bug fix.
2. Provide clear context including affected files, expected behaviour, or acceptance criteria.
3. Assign the issue to `@copilot` using the assignees dropdown or by commenting `@copilot implement this`.

Copilot works autonomously in its own environment. Once complete, it opens a pull request with you as the reviewer.

### Example use case

You have a bug report: 'The user search endpoint returns a 500 error when the query parameter is empty'.

Action:

1. Create an issue titled 'Fix 500 error on empty search query'.
2. Describe expected behaviour: 'The endpoint should return an empty array when the query is empty'.
3. Assign to `@copilot`.

Copilot responds by performing actions, such as:

- analysing the issue and identifying the affected endpoint
- adding input validation to handle empty query parameters
- writing tests to verify the fix
- opening a pull request with the changes

You review the PR, test locally, and either merge or request changes by mentioning `@copilot` in a comment.

### When to use issue assignment

Issue assignment works well for:

- well-defined bug fixes with clear reproduction steps
- adding small features with explicit requirements
- implementing tests for existing functionality
- making isolated changes that do not require architectural decisions

Issue assignment should not be used for tasks that require:

- understanding of organisational standards or policies
- decisions about system architecture or design patterns
- changes spanning multiple systems or repositories
- knowledge of security or compliance requirements specific to government services

### Reviewing Copilot-generated pull requests

Upon receiving a Copilot-generated pull request, reviewers should:

- review all changes carefully, as they would with any other pull request
- verify that the implementation matches the issue requirements
- run tests locally to confirm behaviour
- check for security or compliance concerns that Copilot may have missed

You can request changes by commenting on the PR:

```
@copilot the input validation is too permissive. Please restrict the query parameter to alphanumeric characters only.
```

Copilot updates the PR based on your feedback.

## 4. Practical guidance for government teams

This section provides specific guidance for government development teams using Copilot PR capabilities within controlled environments.

### When to use Copilot PR review

Use Copilot review when:

- performing a quick automated scan before human review
- working on a small, focused pull request (1 to 5 files)
- catching common security issues such as SQL injection or XSS
- identifying code quality issues before requesting colleague review
- prototyping and requiring rapid feedback

Do not rely solely on Copilot review when:

- the pull request modifies security-critical code (authentication, authorisation, cryptography)
- the pull request handles personal data or OFFICIAL-SENSITIVE information
- the pull request makes architectural changes affecting multiple systems
- the pull request implements compliance requirements (WCAG, GDPR, departmental standards)
- the pull request is large or touches many files (more than 10 files, more than 1,000 lines)

Always conduct human code review for production code. Copilot review is a supplement, not a replacement.

### How to interpret Copilot review comments

Copilot review comments should be treated as suggestions requiring verification rather than definitive findings.

High-confidence signals, which are usually accurate, include:

- missing input validation
- obvious SQL injection or XSS vulnerabilities
- syntax errors or type mismatches
- unused variables or imports

Medium-confidence signals, which require verification, include:

- code quality suggestions (complexity, duplication)
- performance concerns
- missing error handling

Low-confidence signals, which are often false positives, include:

- architectural recommendations
- suggestions that conflict with project conventions
- refactoring suggestions that reduce clarity
- 'security issues' already mitigated elsewhere

Upon identifying a flagged issue, reviewers should take the following steps:

1. Read the comment and understand its claim.
2. Verify whether the issue exists in the specific context.
3. Check whether existing controls already mitigate the concern.
4. Apply the suggestion only if it genuinely improves the code.
5. Dismiss false positives and document the reasoning.

### Copilot review and mandatory code review requirements

Copilot code review does not satisfy mandatory human code review requirements.

GitHub marks Copilot reviews as 'Comment' reviews, not 'Approve' reviews. They do not count toward required approvals and do not block merging.

Government services may require:

- two-person review before production deployment
- senior engineer sign-off for security changes
- compliance verification for data handling

Copilot review provides an additional automated scan but does not replace any human review step.

Always configure branch protection rules to require human approvals. Do not count Copilot as a reviewer for mandatory review policies.

### Using @Copilot to accelerate PR turnaround

You can use `@copilot` mentions to speed up review cycles without compromising quality.

Quick explanation requests:

```
@copilot explain why we needed to change the database schema in this PR
```

Useful for onboarding new reviewers or providing context.

Rapid iteration on feedback:

Instead of waiting for human reviewers to clarify feedback, ask Copilot:

```
@copilot the reviewer wants better error handling. Can you suggest an approach?
```

Apply the suggestion, then request re-review from the human reviewer.

Pre-review checks:

Before requesting human review:

```
@copilot are there any obvious security issues in this authentication code?
```

Address any issues found, then request human review with greater confidence.

Do not:

- use `@copilot` suggestions as justification to skip human review
- assume `@copilot` has caught all issues
- merge PRs based solely on Copilot feedback

### Security considerations with content exclusions

Copilot enforces content exclusions for code review but not for the autonomous coding agent.

When you request a code review from Copilot:

- excluded files are not sent to Copilot servers
- excluded content does not appear in review comments
- this protects OFFICIAL-SENSITIVE files during review

When you assign an issue to `@copilot` for autonomous implementation:

- content exclusions do not apply
- the coding agent can read, modify, and commit excluded files
- this applies to all files in the repository

Implications for government teams:

If your repository contains OFFICIAL-SENSITIVE files protected by content exclusions:

- code review is safe to use (exclusions apply)
- assigning issues to `@copilot` is not safe (exclusions do not apply)

Recommended approach for repositories with sensitive content:

1. Use Copilot code review freely (it respects exclusions).
2. Do not assign issues to `@copilot` for autonomous implementation.
3. Do not use agent mode in your IDE (it ignores exclusions).
4. Rely on manual development or chat-based assistance instead.

In repositories containing no sensitive content:

- all Copilot features are safe to use
- credit usage should be monitored when autonomous features are used frequently

See [Content exclusions](content-exclusions.md) for comprehensive details.

## 5. What Copilot cannot do

Copilot pull request capabilities have clear limitations. Understanding these helps you use Copilot effectively without creating unrealistic expectations.

Copilot cannot:

- approve or merge pull requests, as it is only able to review and comment, and all approvals and merges remain the responsibility of a human
- directly modify pull request branches, as it is unable to push commits to feature branches, and any suggested changes must be applied manually by the developer
- understand organisational context, as it has no knowledge of an organisation's coding standards, architectural decisions or security policies, and is unable to verify compliance with government-specific requirements such as data residency or accessibility standards
- make architectural decisions, as it is unable to evaluate or choose between different design patterns or approaches, and all complex technical decisions require human judgement
- access external systems or services, as it is unable to interact with deployment pipelines, monitoring tools or internal APIs, and operates solely within the code and context of the GitHub repository
- guarantee security or correctness, as it may fail to identify security vulnerabilities or logic errors, and all code must be reviewed by a human, particularly for production systems
- work across multiple repositories, as it operates within a single repository context, and any changes spanning multiple repositories require manual coordination

## 6. Credit usage and billing

Different Copilot features consume credits differently. Understanding credit usage helps you manage budgets effectively.

### Code review

Each code review request uses 1 premium request. This is a fixed cost regardless of PR size or review complexity.

If you have zero premium requests remaining, code review is unavailable until your allowance resets or you increase your budget.

### Coding agent (issue assignment)

Each coding agent session uses 1 premium request per session. This is true regardless of how many files Copilot modifies or how complex the task is.

For substantial multi-file work, this flat rate is more cost-effective than a long agent mode session with a premium model in your IDE.

### @Copilot mentions in PR comments

Interactions with `@copilot` in PR comments do not directly consume premium requests. However, complex requests may trigger the coding agent, which uses 1 premium request per session.

### Managing credit usage

Teams that frequently use pull request capabilities should:

- monitor premium request usage in their GitHub organisation settings
- set appropriate monthly budgets for the team
- consider whether to enable code review and coding agent features for all repositories or only selected ones

See [Premium credit management](premium-credit-management.md) for detailed guidance on managing credits and budgets.

## 7. Official documentation

GitHub provides comprehensive documentation for Copilot pull request capabilities:

- [Using Copilot code review](https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review)
- [Copilot in pull requests](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-for-pull-requests)
- [Using the Copilot coding agent in your IDE](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-coding-agent-in-your-ide)
- [Using Copilot coding agent for GitHub issues](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-coding-agent-in-your-ide/using-copilot-coding-agent-for-github-issues)

Refer to these sources for the most current information, as Copilot capabilities evolve regularly.

## Next steps

These capabilities now enable teams to:

- request Copilot code review on pull requests to identify potential issues before human review
- interact with @Copilot in pull request comments to request explanations or improvements
- assign well-defined issues to Copilot for autonomous implementation
- integrate these capabilities into an existing team workflow

Copilot is a tool to assist your workflow, not replace human review and decision-making. You remain accountable for the code you merge.
