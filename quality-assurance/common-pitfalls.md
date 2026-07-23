> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Common problems and anti-patterns

Known failure modes when working with AI code assistants and how to avoid them.


## Contents

---

[Service Standard references](#service-standard-references)

[Who this applies to](#who-this-applies-to)

[Problem 1: Committing code you do not fully understand](#problem-1-committing-code-you-do-not-fully-understand)

[Problem 2: Iterating on AI fixes without understanding the root cause](#problem-2-iterating-on-ai-fixes-without-understanding-the-root-cause)

[Problem 3: High-coverage low-value tests](#problem-3-high-coverage-low-value-tests)

[Problem 4: Recreating existing functionality](#problem-4-recreating-existing-functionality)

[Problem 5: Generating code that looks secure but isn't](#problem-5-generating-code-that-looks-secure-but-isnt)

[Problem 6: Accessibility as an afterthought](#problem-6-accessibility-as-an-afterthought)

[Problem 7: Context drift in long sessions](#problem-7-context-drift-in-long-sessions)

[Problem 8: Treating AI output as authoritative](#problem-8-treating-ai-output-as-authoritative)

[Building a team awareness culture](#building-a-team-awareness-culture)

[Evidencing awareness at service assessments](#evidencing-awareness-at-service-assessments)

## Service Standard references

| Point | How this guide helps |
|-------|----------------------|
| [Point 5. Make sure everyone can use the service](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service) | Documents accessibility pitfalls that AI commonly introduces |
| [Point 8. Iterate and improve frequently](https://www.gov.uk/service-manual/service-standard/point-8-iterate-and-improve-frequently) | Learning from known pitfalls is continuous improvement. Teams that understand failure patterns avoid repeating them |
| [Point 9. Create a secure service which protects users' privacy](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) | Documents security-specific pitfalls and how Secure by Design principles prevent them |
| [Point 14. Operate a reliable service](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) | Avoiding known pitfalls directly contributes to service reliability and uptime |

## Who this applies to

This guide applies to engineers using AI code assistants in their daily work. It also applies to tech leads coaching teams on effective AI usage, champions supporting adoption within their teams, and quality assurance (QA) engineers understanding what to watch for in reviews.

## Problem 1: Committing code you do not fully understand

### What happens

AI generates code that looks correct and passes a quick visual scan. The engineer commits it without fully understanding what it does. The code works in basic testing but contains subtle issues that surface later in production.

### Why it happens

AI-generated code is typically well-formatted, follows common patterns, and reads naturally. This creates a false sense of confidence. Engineers who would carefully scrutinise code from an unfamiliar colleague accept AI output with less scrutiny because it looks right.

### Service Standard relevance

Point 14 expects teams to operate a reliable service. Code that is not fully understood by the team is a reliability risk. Point 9 requires security throughout the lifecycle. Unreviewed code may contain vulnerabilities.

### How to avoid it

Apply the fundamental rule, which is do not commit code you cannot explain line by line. If a section of AI-generated code uses a pattern you have not seen before, investigate it. If you cannot explain why the AI chose a particular approach, question it.

Build a team habit of asking in code review whether the author can walk you through what this section does and why. If the author cannot answer, the code is not ready to merge.

## Problem 2: Iterating on AI fixes without understanding the root cause

### What happens

AI suggests a fix for a problem. It does not work. The engineer asks for another fix. That makes things worse. The engineer keeps iterating. After 20 minutes they are deep into a solution that is increasingly complex and decreasingly understandable.

### Why it happens

Each iteration, the AI tries to fix the immediate symptom without understanding the root cause. The context drifts further from the original problem, and the suggestions become progressively less relevant.

### Service Standard relevance

Point 8 expects teams to iterate and improve frequently. However, effective iteration means making informed improvements based on understanding, not blindly cycling through AI suggestions. Uncontrolled iteration produces technical debt and undermines the reliability expected by point 14.

### How to avoid it

Set a hard limit. If the AI has not helped after 3 or 4 iterations, stop. Step away from the AI, look at the actual problem with fresh eyes, and consider whether a different approach is needed entirely.

Warning signs you are in the loop include:

- the AI's suggestions getting increasingly complex
- you not understanding the changes anymore
- the code drifting further from your codebase patterns
- each iteration introducing new issues

## Problem 3: High-coverage low-value tests

### What happens

AI generates a test suite with impressive coverage numbers. The tests all pass. But they are testing implementation details rather than behaviour. They assert only that code executes without throwing exceptions. Or they use mocks so extensively that the tests do not actually verify real integration behaviour.

### Why it happens

AI optimises for coverage because that is typically what the prompt asks for. It does not understand which tests actually protect against regressions and which are merely exercising code paths without verifying outcomes.

### Real example

An engineer flagged AI generating unit tests with high coverage but invalid assertions that passed code review. The tests looked thorough but did not actually validate the code's correctness. The response was to update code review guidance and create validation prompts for the shared library. The team also provided paired review coaching.

### Service Standard relevance

Point 14 expects regular quality assurance and performance testing. Tests that provide false confidence undermine this. Point 10 expects teams to define what success looks like. Misleading coverage metrics create a false picture of quality.

### How to avoid it

Review AI-generated tests with the same rigour as AI-generated production code. Check that every test has at least one meaningful assertion that would fail if the behaviour changed. Ask yourself whether the test would catch a bug if you introduced one in this function.

Use mutation testing tools to verify that your test suite actually detects changes in the code under test.

## Problem 4: Recreating existing functionality

### What happens

AI generates a utility function, helper class, or service that already exists in your codebase. The team now has two implementations of the same logic, leading to inconsistency and maintenance burden.

### Why it happens

AI does not have full awareness of your codebase unless you explicitly provide the relevant context. Even with IDE-integrated tools that can reference open files, the AI may not find existing implementations in other parts of the project.

### Service Standard relevance

Point 13 encourages teams to use and contribute to open standards, common components, and patterns. Duplicating existing functionality violates this principle and creates maintenance overhead that undermines the reliability expected by point 14.

### How to avoid it

Before asking AI to generate new functionality, search your codebase for existing implementations. When prompting the AI, include information about existing utilities and patterns. In code review, specifically check whether the pull request introduces functionality that duplicates something already in the codebase.

## Problem 5: Generating code that looks secure but isn't

### What happens

AI generates code that follows security patterns superficially. It includes input validation, authentication checks, and error handling, but the implementation has subtle weaknesses. The validation checks format but not content, the authentication handles the happy path but not token expiry, or the error handling catches exceptions but leaks internal information.

### Why it happens

AI produces code based on statistical patterns in its training data, which includes both secure and insecure examples. The generated code looks secure on inspection because it includes the right structural elements, but the details are not aligned to your specific security requirements.

### Service Standard relevance

This is a direct risk to point 9. The Secure by Design principles require that security is built in from the start. Code that looks secure but is not provides false assurance. Point 9 also requires due diligence on third-party software, and AI-generated code should be treated as third-party for this purpose.

### How to avoid it

Never rely on visual inspection alone for security-critical code. Run all AI-generated code through your security scanning toolchain. This includes SonarQube, static application security testing (SAST), dynamic application security testing (DAST), and dependency scanning. For code touching authentication, authorisation, or sensitive data, require manual security review in addition to automated scanning.

Use Model Context Protocol (MCP) servers to embed your security standards into the AI's context. This improves the quality of generated security patterns at source.

## Problem 6: Accessibility as an afterthought

### What happens

AI generates front-end code that works visually but fails accessibility requirements. Common issues include missing Accessible Rich Internet Applications (ARIA) attributes. They also include incorrect heading hierarchies, non-keyboard-accessible interactions, insufficient colour contrast, and forms without programmatically associated labels.

### Why it happens

AI tools prioritise visual correctness and functional behaviour. Accessibility requirements are rarely the primary pattern in training data, so AI-generated UI code consistently underserves users of assistive technologies.

### Service Standard relevance

Point 5 requires that everyone can use the service. [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) Level AA is the minimum standard for government services. Accessibility is not optional and is assessed at every stage, which includes alpha, beta, and live. Services that fail accessibility requirements fail the assessment.

### How to avoid it

Include accessibility requirements explicitly in every prompt for user interface (UI) code. Specify WCAG 2.2 Level AA compliance, semantic HTML requirements, and keyboard navigation expectations. Run automated accessibility checks such as axe-core and Lighthouse on every UI change. Supplement these with manual testing using keyboard navigation and screen readers.

Use MCP servers to embed WCAG requirements into the AI's context. This makes generated code more likely to be accessible by default.

## Problem 7: Context drift in long sessions

### What happens

During a long AI-assisted development session, the AI's suggestions gradually drift away from your codebase's patterns. Early suggestions match your conventions, but later suggestions introduce different naming patterns, error handling styles, or architectural approaches.

### Why it happens

As the conversation grows, the AI's attention to your initial context instructions weakens. Newer prompts in the conversation carry more weight than earlier context-setting prompts.

### How to avoid it

For long development sessions, periodically restate your context and conventions. Start new conversations rather than extending very long ones. When you notice the AI's style drifting, correct it explicitly and provide a fresh example of your codebase patterns.

## Problem 8: Treating AI output as authoritative

### What happens

AI generates code with a confident explanation of why it works. The engineer treats this explanation as authoritative and does not verify the claims. The code contains incorrect assumptions about library behaviour, API contracts, or language features.

### Why it happens

AI communicates with the same confidence regardless of whether its output is correct. It does not signal uncertainty in the way a human colleague might. For example, a colleague might say they think something works but it should probably be tested.

### How to avoid it

Treat AI explanations as hypotheses, not facts. Verify claims about library behaviour by checking official documentation. Test edge cases that the AI's explanation says should work. If the AI says something is thread-safe, prove it with a concurrent test.

## Building a team awareness culture

### Share failures openly

The programme's approach emphasises psychological safety so that quality issues are surfaced quickly. When someone finds a problem with AI-generated code, treat it as a learning opportunity, not a failure. Document the issue, share it through your team's Lessons Learned process, and use it to improve guidance and guardrails. Service Standard point 8 expects continuous improvement. Learning from failures is how teams improve.

### Capture and curate

Every significant problem encountered should be documented and added to this repository. You can also add your learnings on the [Knowledge Hub discussion board](https://khub.net/group/ai-engineering-lab/group-home). 

### Track recurrence

Monitor whether the same issues happen over time. If a particular pattern keeps appearing, it indicates that the current prevention measures are not working and need strengthening through better prompts, additional quality gates, MCP server rules, or targeted training. Service Standard point 10 expects teams to use performance data to make decisions. Recurrence data is performance data.

## Evidencing awareness at service assessments

At assessment, teams may be asked how they manage the quality risks of AI-assisted development. Be prepared to show:

- awareness of the specific failure modes associated with AI-generated code
- documented examples of issues caught and how the team responded
- how lessons learned have been fed back into team processes and guidance
- evidence that the same categories of issue are declining over time (point 8)
- how security-specific pitfalls are managed in line with Secure by Design (point 9)