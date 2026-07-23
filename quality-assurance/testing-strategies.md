> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

## Who this applies to

This guide applies to engineers reviewing pull requests, tech leads setting review standards, and quality assurance (QA) engineers assessing code quality. It also applies to champions coaching teams on effective review practices.

## The reviewer's mindset

### Treat AI code like code from a new team member

AI-generated code should be treated the same way you would treat code from a talented but unfamiliar contributor. It may follow good patterns, but it does not know your codebase, your team's conventions, your security requirements, or your production constraints.

The reviewer's job is not just to check whether the code works. It is to check whether it belongs in your codebase.

### You must understand every line

The single most important rule is do not commit code you cannot explain line by line. AI can produce plausible-looking code that uses patterns you have never seen. If you cannot explain what a block of code does and why, do not approve it. Ask the author to explain it, or investigate it yourself.

This is especially important for error handling logic, where AI often adds catch blocks that silently swallow exceptions. It also matters for security-related code such as authentication, authorisation, input validation, and data sanitisation. Check database queries carefully, as AI may produce queries that work on small datasets but perform badly at scale. Check concurrency patterns, as AI frequently generates race conditions in async code.

## What AI gets right and why you still need to check

AI code assistants are generally good at producing syntactically valid code. They follow common patterns for the language and framework. They include reasonable structure and naming, and handle the happy path well.

This is precisely why review is critical. The code looks correct, passes a casual scan, and may even pass basic tests. But the problems live in the gaps between what the AI was asked for and what production actually requires.

## Common categories of issues

### 1. Shallow error handling

AI tends to generate error handling that catches exceptions without doing anything meaningful. Watch for empty catch blocks, generic error messages that leak no useful diagnostic information, and catch-all handlers that mask specific failure modes.

Does the error handling give the operations team enough information to diagnose the problem at 3am? [Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) requires appropriate monitoring with a proportionate plan to respond to problems. Error handling that swallows context makes that impossible.

### 2. Missing edge cases

AI typically handles the obvious cases well but misses boundary conditions. Common gaps include:

- empty collections
- null or undefined inputs
- concurrent access scenarios
- maximum field lengths
- Unicode and special character handling
- timezone edge cases

Consider the inputs that a user would never send on purpose but that your system will inevitably receive.

### 3. Security blind spots

AI does not know your threat model. It frequently generates code with:

- insufficient input validation
- Structured Query Language (SQL) or NoSQL injection vulnerabilities
- insecure defaults for authentication or session management
- missing rate limiting
- overly permissive Cross-Origin Resource Sharing (CORS) configurations

[Service Standard point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) requires teams to follow the [Secure by Design principles](https://www.security.gov.uk/policy-and-guidance/secure-by-design/). Teams must also perform due diligence on the security of third-party software. Run the code through your organisation's security scanning tools. These include SonarQube, Open Web Application Security Project (OWASP) Dependency-Check, static application security testing (SAST), and dynamic application security testing (DAST). Do this regardless of how secure it looks on inspection. AI-generated code is effectively third-party code and should be treated accordingly.

### 4. Performance assumptions

AI generates code that works at demo scale but may struggle in production. Watch for:

- N+1 query patterns
- unbounded collection processing
- missing pagination
- unnecessary object creation in loops
- synchronous operations that should be asynchronous

Service Standard point 14 expects services to maximise uptime and speed of response. Consider what happens when this code processes 10,000 records instead of 10.

### 5. Inconsistency with codebase patterns

AI follows general language conventions rather than your team's specific patterns. This results in:

- different naming conventions
- unfamiliar architectural patterns
- alternative library usage for functionality you already have
- inconsistent error response formats

[Service Standard point 13](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns) encourages use of common components and patterns. Does this code reuse existing patterns, or does it introduce something new without justification?

### 6. Accessibility gaps in generated user interface code

When AI generates front-end code, it frequently omits or incorrectly implements accessibility requirements. Common issues include:

- missing Accessible Rich Internet Applications (ARIA) attributes
- incorrect heading hierarchies
- insufficient colour contrast
- absent keyboard navigation support

[Service Standard point 5](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service) requires that everyone can use the service. Web Content Accessibility Guidelines (WCAG) 2.2 Level AA is the minimum standard for government services. Check that AI-generated user interface (UI) code includes semantic HTML, keyboard operability, screen reader support, and adequate colour contrast (4.5:1 or above for normal text).

### 7. Test quality issues

AI can generate tests with high coverage but low value. Watch for:

- tests that merely assert the code runs without checking behaviour
- overly specific assertions tied to implementation details rather than outcomes
- missing negative test cases
- mocked dependencies that hide integration problems

If you changed the implementation, would these tests catch a real regression?

### 8. Open source readiness

[Service Standard point 12](https://www.gov.uk/service-manual/service-standard/point-12-make-new-source-code-open) requires that new source code is made open. AI-generated code may include:

- hardcoded configuration values
- placeholder secrets or API keys
- comments containing internal system details
- references to proprietary libraries

Before committing, check that the code is suitable for an open repository. Remove anything that should be in environment variables or secrets management.

## Review workflow for AI-assisted pull requests

### Step 1: Context check

Before reading the code, understand what was asked of the AI and what constraints were provided. If the pull request description does not explain this, ask the author. The quality of AI output depends heavily on the quality of the prompt and context provided.

### Step 2: Architecture review

Does the change fit the existing architecture? AI frequently introduces new patterns or libraries when existing ones would suffice. Point 13 of the Service Standard encourages teams to use and contribute to open standards, common components and patterns. Check that the solution aligns with your team's agreed approaches.

### Step 3: Line-by-line with focus areas

Review the code with particular attention to the categories listed above. Spend extra time on error handling paths, security-relevant code, database interactions, and external service calls.

### Step 4: Run the tests critically

Do not just check that tests pass. Read the test code. Are the assertions meaningful? Do the tests cover failure scenarios? Would they catch a regression if the implementation changed?

### Step 5: Check automated scan results

Verify that the code has passed through your continuous integration and continuous deployment quality gates. These include linting, static analysis, security scanning, and test coverage thresholds. If your pipeline does not include these, see the [quality gates and continuous integration and continuous deployment](quality-gates-ci-cd.md) guide.

### Step 6: Accessibility review for user interface changes

For any changes that affect the user interface, verify that the code meets WCAG 2.2 Level AA requirements. Use automated tools such as axe and Lighthouse as a starting point. Remember that automated checks alone are not sufficient. Manual testing with keyboard navigation and screen readers is also necessary.

## Evidencing review at service assessments

At beta and live service assessments, teams are expected to demonstrate how they maintain code quality and security. For AI-assisted development, be prepared to show:

- how your team reviews AI-generated code differently from human-written code
- examples of issues caught during review that AI introduced
- how review standards are documented and consistently applied
- how review findings feed back into improved prompting practices and team guidance

This evidence supports points [8 (iterate and improve)](https://www.gov.uk/service-manual/service-standard/point-8-iterate-and-improve-frequently), [9 (security)](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service), and [14 (reliability)](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) of the Service Standard.

## Coaching your team

When providing feedback on AI-generated code, focus on the why rather than just the what. Engineers are learning to work with AI tools. Understanding why a particular AI suggestion is problematic helps them write better prompts and make better judgments in the future.

Instead of 'This error handling is wrong', try 'The AI has generated a generic catch block here. In our codebase, we need to handle database connection failures separately from validation errors. This is because our monitoring system categorises alerts differently. Here is how we typically structure this...'

Document your team's specific review expectations for AI-assisted code. Include examples of AI-generated code you have accepted and rejected, with explanations. Add these to your team's contributing guide and reference them in pull request templates. [Service Standard point 8](https://www.gov.uk/service-manual/service-standard/point-8-iterate-and-improve-frequently) expects teams to iterate and improve frequently. Your review standards should evolve as your team's experience with AI tools matures.