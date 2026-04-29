> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Prompt engineering for testing: getting comprehensive test coverage

Techniques for using AI assistants to generate thorough test suites including security, accessibility and performance testing.

## Purpose

AI assistants excel at generating comprehensive test suites when given the right prompts. This guide shows you how to write effective prompts to get AI to create different types of tests, particularly critical for government projects.

Use this guide to learn how to prompt AI for:

- unit, integration and end-to-end tests
- security tests aligned with National Cyber Security Centre (NCSC) guidance
- accessibility tests meeting Web Content Accessibility Guidelines (WCAG) standards
- performance tests and edge case discovery
- maintaining test suites as code evolves

## Who this applies to

This guide applies to all engineers responsible for code quality:

- engineers writing new features
- quality assurance (QA) engineers building test automation
- security-conscious engineers on government projects
- teams implementing accessibility requirements


### Types of tests to generate

#### Unit tests - isolating individual components

Use this example prompt for unit tests.
```
Write unit tests for this user profile update function:

[paste function]

Include:
- happy path: successful update
- boundary conditions: empty strings, max length fields
- error cases: duplicate email (unique constraint), invalid email format, database connection failure, transaction rollback scenarios
  
Mock external dependencies:
- database session
- email validation service  
- audit logger

Use pytest fixtures for:
- test database session
- sample user objects
- mock email validator

Follow AAA pattern (Arrange, Act, Assert) and include descriptive test names.
```

#### Integration tests - testing components working together

Use this example prompt for integration tests.
```
This API endpoint interacts with multiple systems:

[paste endpoint code]

Write integration tests that verify:

End-to-end flow:
- submit valid application
- verify database record created
- verify file uploaded to S3
- verify notification queued
- verify audit log entry

Error scenarios:
- database transaction rollback on S3 failure
- notification failure does not block application
- concurrent submission attempts

Cache behaviour:
- cache invalidation after update
- cache warming for frequently accessed data

Use pytest-asyncio for async testing and real test database (not mocks - we are testing integration).
```

### Security testing - critical for government projects

Use this example prompt for security testing.
```
Act as a security tester. Write tests that attempt to exploit this form submission endpoint:

[paste endpoint code]

Test for:

Input validation:
- SQL injection in text fields
- XSS payloads in description
- path traversal in file names
- script injection in uploaded files

Authentication and authorisation:
- accessing without valid session
- CSRF token bypass attempts
- accessing other users' submissions
- privilege escalation attempts

Rate limiting:
- submitting faster than allowed rate
- distributed rate limit bypass (multiple IPs)

File upload security:
- malicious file types (.exe disguised as .pdf)
- files exceeding size limit
- zip bombs
- files with malicious content

For each test:
- attempt the attack
- verify it is blocked
- check that security event is logged
- verify user sees appropriate error message (not internal details)

Use pytest with requests library for HTTP tests.
```

Why this matters: government services handle sensitive citizen data. Security testing is not optional.

### Accessibility testing - meeting WCAG standards

Use this example prompt for accessibility testing.
```
Write automated accessibility tests for this citizen-facing form:

[paste form HTML or code]

Test for WCAG 2.1 AA compliance:

Form structure:
- all inputs have associated labels
- labels use for and id correctly
- required fields marked with aria-required
- error messages linked with aria-describedby

Error handling:
- error summary at top has role="alert"
- focus moves to error summary on validation failure
- individual field errors visible and screen-reader accessible
- error messages are clear and helpful

Keyboard navigation:
- all interactive elements accessible via keyboard
- tab order is logical
- focus indicators visible
- no keyboard traps

Contrast:
- text meets 4.5 to 1 contrast ratio
- interactive elements meet 3 to 1 contrast ratio
- error states clearly visible

Use pytest with playwright for browser testing and axe-core for automated accessibility scanning.
```

### Performance testing

Use this example prompt for performance testing.
```
Write performance tests for this public-facing endpoint:

[paste endpoint code]

Context:
- typical load: 100 requests per second
- peak load: 500 requests per second (Monday mornings)
- service level agreement (SLA): 95th percentile response time less than 200ms

Test scenarios:

Normal load:
- 100 concurrent users
- verify response time less than 200ms for 95% of requests
- verify no memory leaks over 5 minute test
- monitor database connection pool usage

Peak load:
- 500 concurrent users  
- verify system remains responsive
- verify error rate stays below 1%
- verify graceful degradation if overwhelmed

Stress test:
- gradually increase load until system breaks
- identify breaking point
- verify system recovers after load decreases

Use locust for load testing and include:
- realistic user behaviour (think time between requests)
- mix of successful and error scenarios
- monitoring hooks for metrics collection
```

### Edge case discovery

This is where AI really excels.

Use this example prompt for edge case discovery.
```
Act as an expert QA engineer. For this function:

[paste function that processes citizen applications]

List every edge case you can think of. Consider:

Data validity:
- boundary values (minimum and maximum lengths)
- empty, null, undefined inputs
- whitespace-only inputs
- special characters, unicode, emojis
- very long inputs (buffer overflow attempts)

Business logic:
- applications submitted outside business hours
- duplicate submissions (same user, same data)
- partial submissions (timeout mid-process)
- applications that exactly match disqualification criteria

System state:
- database connection lost mid-transaction
- cache unavailable
- external API (GOV.UK Notify) down
- disk full (cannot write files)
- rate limit already exceeded

Concurrency:
- 2 users submitting at exact same time
- user submission while admin processing
- cache invalidation during read

Then write tests for the 10 most critical edge cases.
```

What you get: edge cases you never thought of. The AI combines common software failure modes, domain-specific issues (government applications), concurrency problems and resource exhaustion scenarios.

### Maintaining test suites

Tests rot as code evolves. Keep them fresh.

Use this example prompt for updating tests after code changes.
```
I have refactored this function:

Old version:
[paste old code]

New version:
[paste new code]

Update the existing test suite:
[paste existing tests]

Changes needed:
- remove tests for deleted functionality
- update tests for changed behaviour
- add tests for new functionality
- ensure test names still match what they test
- update fixtures if data structures changed

Mark obsolete tests clearly with comments explaining why they were removed.
```

Use this example prompt for test coverage analysis.
```
Here is my function and its tests:

Function:
[paste code]

Tests:
[paste tests]

Analyse test coverage:

1. What code paths are not being tested?
2. What error conditions are missing?
3. What edge cases are not covered?
4. Are there any untestable sections? (If so, they need refactoring)

Write additional tests to achieve greater than 90% coverage of meaningful code paths.

Do not chase 100% coverage - some code (like __repr__ or logging statements) does not need tests. Focus on business logic and error handling.
```

### Common testing mistakes

You should avoid:

- only testing the happy path as real users find the unhappy paths
- mocking everything in integration tests as then you are not actually testing integration
- tests that depend on external services as tests should be reliable and fast
- not testing accessibility as accessibility violations often surface in production

The comprehensive approach includes:

- testing happy path and error cases
- testing edge cases exhaustively
- testing security implications
- testing accessibility requirements
- keeping tests maintainable and fast
- updating tests as code evolves
