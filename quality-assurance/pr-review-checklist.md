> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# PR review checklists

Complete the following checklists when reviewing PRs. 

## Who this applies to

This checklist applies to anyone reviewing pull requests in an AI-assisted engineering environment. It also applies to tech leads setting review standards for their teams, and engineers submitting AI-assisted code for review.

## Before you start reviewing

Ask the author or check the pull request description for the following questions.

Was AI used to generate any of this code and if so which parts? What tool was used and what context or prompts were provided? Were any of the AI suggestions modified after generation? Has the author manually tested the AI-generated code beyond automated tests?

If the pull request description does not address these questions, ask before beginning your review.

## Checklists

### Comprehension

- [ ] I can explain what every function and block does.
- [ ] The code solves the stated problem.
- [ ] There is no unnecessary complexity.

### Codebase fit
This relates to [Service Standard point 13](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns): use and contribute to open standards, common components and patterns.

- [ ] Naming follows team conventions.
- [ ] Architecture aligns with existing patterns.
- [ ] No duplicate functionality.
- [ ] Imports and dependencies are appropriate.

### Error handling
This relates to [Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service): operate a reliable service.

- [ ] All error paths are handled meaningfully.
- [ ] Errors are logged with sufficient context.
- [ ] Failure modes are graceful.
- [ ] Retry logic has appropriate limits.

### Security
This relates to [Service Standard point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service): create a secure service which protects users' privacy. 

- [ ] All user inputs are validated and sanitised.
- [ ] No hardcoded secrets, keys, or credentials.
- [ ] Authentication and authorisation checks are present.
- [ ] Sensitive data is not logged or exposed in responses.
- [ ] Structured Query Language (SQL) and NoSQL queries use parameterised inputs.
- [ ] Third-party dependencies are from trusted sources.

### Testing

- [ ] Tests exist for the new code.
- [ ] Tests verify behaviour, not just execution.
- [ ] Edge cases are covered.
- [ ] Test names describe the scenario.
- [ ] No test-only code in production paths.

### Accessibility
This relates to [Service Standard point 5](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service): make sure everyone can use the service.

For any changes affecting the user interface (UI)

- [ ] Semantic HTML is used correctly.
- [ ] Interactive elements are keyboard accessible.
- [ ] Accessible Rich Internet Applications (ARIA) attributes are correct and necessary.
- [ ] Colour contrast meets Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
- [ ] Form inputs have visible labels.
- [ ] Error messages are clear and helpful.

### Performance 
This relates to [Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service): operate a reliable service.

- [ ] No obvious N+1 query patterns.
- [ ] Collections are bounded.
- [ ] Async patterns are used correctly.

### Documentation and openness
This relates to [Service Standard point 12](https://www.gov.uk/service-manual/service-standard/point-12-make-new-source-code-open): make new source code open.

- [ ] Complex logic is commented.
- [ ] Public application programming interfaces (APIs) have documentation.
- [ ] No AI-generated placeholder comments.
- [ ] No sensitive information in comments or code.

### Data protection
This relates to [Service Standard point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service): create a secure service which protects users' privacy. 

- [ ] Data handling complies with retention policies.
- [ ] Logging does not capture personal data.
- [ ] Data minimisation is practised.

## Decision tree

Can you explain every line of the code?

If no, request changes and ask the author to explain or simplify.

Does the code solve the right problem?

If no, reject or request significant changes with clear guidance on what the requirement actually is.

Do all automated checks pass?

If no, request changes. Automated checks must pass before human review time is spent.

Are there security concerns?

If yes, request changes with specific details about the vulnerability and how to fix it. Do not approve with a fix-later comment. Point 9 requires security throughout the service lifecycle.

Are there accessibility concerns for UI changes?

If yes, request changes. Point 5 requires that everyone can use the service. Accessibility issues are not optional fixes.

Does the code fit your codebase patterns?

If no but the new approach is better, discuss with the team. If agreed, approve and document the pattern change.

If no and the existing approach is fine, request changes to align with team conventions.

Are tests adequate?

If no, request changes with specific guidance on what scenarios need coverage.

Everything checks out?

Approve.

## Adding this checklist to your workflow

Add a condensed version to your repository's pull request template. This ensures that authors self-check before requesting review and reviewers have a consistent structure to follow.

Review this checklist in a team session. Adjust it for your specific context and technology stack. Agree on which items are mandatory versus advisory. Revisit quarterly as your team's experience with AI tools matures. Service Standard point 8 expects continuous improvement.